import React, { useState, useRef, useEffect, useCallback } from 'react';
import { SlidersHorizontal, CheckCircle2, Clock } from 'lucide-react';

export default function BeforeAfterSlider({ beforeUrl, afterUrl, title = "Issue Comparison" }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef(null);

  const defaultBefore = beforeUrl || 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=900&q=80';
  const hasAfter = Boolean(afterUrl);
  const defaultAfter = afterUrl || 'https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=900&q=80';

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    let percentage = (x / rect.width) * 100;
    if (percentage < 2) percentage = 2;
    if (percentage > 98) percentage = 98;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  if (!hasAfter) {
    return (
      <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/60 aspect-video group">
        <img
          src={defaultBefore}
          alt="Reported Issue Evidence"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute top-3 left-3 bg-red-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow-md backdrop-blur-sm flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          Original Issue Evidence
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-700/50">
          <span className="flex items-center gap-1.5 text-amber-300 font-medium">
            <Clock className="w-3.5 h-3.5" />
            Proof of work pending resolution
          </span>
          <span className="text-slate-400">Resolution photo will be uploaded upon work order completion</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-2xl overflow-hidden select-none cursor-ew-resize border border-slate-700/60 shadow-xl bg-slate-950"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* "After" Image (Underneath, full size) */}
        <img
          src={defaultAfter}
          alt="Verified Resolution"
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* "Before" Image (Clipped layer on top) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
        >
          <img
            src={defaultBefore}
            alt="Before Issue"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          />
          {/* Label Before */}
          <div className="absolute top-3 left-3 bg-red-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow backdrop-blur-sm flex items-center gap-1">
            <span>BEFORE</span>
            <span className="text-[10px] font-normal opacity-80">(Reported)</span>
          </div>
        </div>

        {/* Label After */}
        <div className="absolute top-3 right-3 bg-teal-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow backdrop-blur-sm flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-teal-200" />
          <span>AFTER</span>
          <span className="text-[10px] font-normal opacity-80">(Resolved)</span>
        </div>

        {/* Divider Line & Draggable Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-2 border-teal-600 shadow-xl flex items-center justify-center text-slate-700">
            <SlidersHorizontal className="w-4 h-4 rotate-90 text-teal-700" />
          </div>
        </div>

        {/* Drag Helper Overlay */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-slate-900/75 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-medium text-slate-200 border border-slate-700/50 pointer-events-none">
          Drag slider to compare Before & After
        </div>
      </div>
    </div>
  );
}
