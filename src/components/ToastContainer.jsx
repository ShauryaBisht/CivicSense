import React from 'react';
import { useCivic } from '../context/CivicContext';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useCivic();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let bgStyle = 'bg-slate-900 text-white border-slate-700';
        let Icon = Info;
        let iconColor = 'text-teal-400';

        if (toast.type === 'success') {
          bgStyle = 'bg-teal-950/95 text-teal-100 border-teal-600/50 shadow-teal-900/30';
          Icon = CheckCircle2;
          iconColor = 'text-teal-400';
        } else if (toast.type === 'warning') {
          bgStyle = 'bg-amber-950/95 text-amber-100 border-amber-600/50 shadow-amber-900/30';
          Icon = AlertTriangle;
          iconColor = 'text-amber-400';
        } else if (toast.type === 'danger') {
          bgStyle = 'bg-red-950/95 text-red-100 border-red-600/50 shadow-red-900/30';
          Icon = AlertCircle;
          iconColor = 'text-red-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 transform translate-y-0 opacity-100 ${bgStyle}`}
          >
            <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-sm font-medium leading-snug">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-0.5"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
