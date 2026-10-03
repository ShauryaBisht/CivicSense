import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useCivic } from '../context/CivicContext';
import { analyzeIssueContent } from '../utils/aiDetector';
import { CATEGORIES, URGENCIES, SAMPLE_PRESET_IMAGES } from '../data/mockIssues';
import InteractiveMap from './InteractiveMap';
import {
  X,
  UploadCloud,
  MapPin,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Camera,
  Navigation,
  Check,
  ShieldAlert,
  Loader2,
  HelpCircle
} from 'lucide-react';

export default function ReportWizardModal({ isOpen, onClose }) {
  const { addIssue, setSelectedIssue } = useCivic();

  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAnalyzingAi, setIsAnalyzingAi] = useState(false);

  // Form State
  const [mediaUrl, setMediaUrl] = useState(SAMPLE_PRESET_IMAGES[0].url);
  const [imageFileName, setImageFileName] = useState('');
  const [location, setLocation] = useState({
    lat: 40.7180,
    lng: -74.0020,
    address: '88 Grand St & Mercer Way',
    neighborhood: 'SoHo Commons'
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Infrastructure');
  const [urgency, setUrgency] = useState('Medium');
  const [reporterName, setReporterName] = useState('');
  const [reporterContact, setReporterContact] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);

  // AI Diagnostic metadata
  const [aiReport, setAiReport] = useState(null);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setTitle('');
      setDescription('');
      setCategory('Infrastructure');
      setUrgency('Medium');
      setAiReport(null);
      setMediaUrl(SAMPLE_PRESET_IMAGES[0].url);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle local image upload preview
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setMediaUrl(uploadEvent.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Run AI analysis
  const runAiAnalysis = () => {
    if (!title && !description) return;
    setIsAnalyzingAi(true);

    setTimeout(() => {
      const result = analyzeIssueContent(title, description);
      setAiReport(result);
      setCategory(result.category);
      setUrgency(result.urgency);
      setIsAnalyzingAi(false);
    }, 700);
  };

  // Auto trigger AI analysis when user finishes typing title or description
  const handleDetailsBlur = () => {
    if ((title.length > 5 || description.length > 10) && !aiReport) {
      runAiAnalysis();
    }
  };

  // Auto detect current location via Geolocation API
  const handleAutoDetectLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = parseFloat(pos.coords.latitude.toFixed(5));
          const lng = parseFloat(pos.coords.longitude.toFixed(5));
          setLocation({
            lat,
            lng,
            address: `GPS Pin: ${lat}, ${lng}`,
            neighborhood: 'Detected Current Location'
          });
        },
        () => {
          // Fallback to random spot in metropolitan area
          const randomOffsetLat = (Math.random() - 0.5) * 0.02;
          const randomOffsetLng = (Math.random() - 0.5) * 0.02;
          setLocation({
            lat: parseFloat((40.718 + randomOffsetLat).toFixed(5)),
            lng: parseFloat((-74.002 + randomOffsetLng).toFixed(5)),
            address: 'Central Metro Hub',
            neighborhood: 'Downtown Hub'
          });
        }
      );
    }
  };

  // Final Submit
  const handleSubmitReport = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      // Create issue
      const newIssue = addIssue({
        title: title || 'Reported Civic Incident',
        description: description || 'No extra description provided by citizen.',
        category,
        urgency,
        location,
        mediaUrl,
        reporter: {
          name: reporterName,
          contact: reporterContact,
          isAnonymous
        },
        isAnonymous,
        aiMetadata: aiReport || {
          confidence: 91,
          detectedKeywords: [category.toLowerCase()],
          reasoning: `Auto-routed to ${category} municipal field unit.`
        }
      });

      // Confetti burst!
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // graceful fallback
      }

      setIsSubmitting(false);
      onClose();
      // Directly open in modal for immediate live tracking experience!
      setSelectedIssue(newIssue);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Wizard Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
              <h2 className="text-lg font-bold">Report a Civic Issue</h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Step {step} of 4: {step === 1 ? 'Media Evidence' : step === 2 ? 'Location Pin' : step === 3 ? 'Issue Details & AI' : 'Review & Submit'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stepper Progress Bar */}
        <div className="grid grid-cols-4 h-1.5 bg-slate-100">
          <div className={`transition-all duration-300 ${step >= 1 ? 'bg-teal-500' : 'bg-slate-200'}`} />
          <div className={`transition-all duration-300 ${step >= 2 ? 'bg-teal-500' : 'bg-slate-200'}`} />
          <div className={`transition-all duration-300 ${step >= 3 ? 'bg-teal-500' : 'bg-slate-200'}`} />
          <div className={`transition-all duration-300 ${step >= 4 ? 'bg-teal-500' : 'bg-slate-200'}`} />
        </div>

        {/* Wizard Content Body */}
        <div className="p-5 sm:p-6 flex-1 max-h-[72vh] overflow-y-auto">
          {/* STEP 1: MEDIA UPLOAD */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-1">
                  Upload Photo or Evidence
                </label>
                <p className="text-xs text-slate-500">
                  Visual proof assists municipal crews in identifying equipment and material requirements.
                </p>
              </div>

              {/* Drag & drop upload box */}
              <div className="border-2 border-dashed border-slate-300 hover:border-teal-500 rounded-2xl p-6 text-center transition-colors relative bg-slate-50/50 group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-slate-700">
                    Click to browse or drop an image here
                  </div>
                  <div className="text-xs text-slate-400">
                    Supports JPG, PNG, WEBP up to 10MB
                  </div>
                </div>
              </div>

              {/* Quick sample image presets for fast testing */}
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2 flex items-center gap-1.5">
                  <Camera className="w-3.5 h-3.5 text-teal-600" />
                  <span>Or Quick-Pick a Sample Incident Photo:</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SAMPLE_PRESET_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setMediaUrl(preset.url)}
                      className={`relative rounded-xl overflow-hidden border text-left p-1 transition-all ${
                        mediaUrl === preset.url
                          ? 'border-teal-600 ring-2 ring-teal-500/30'
                          : 'border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-full h-16 object-cover rounded-lg"
                      />
                      <div className="p-1 text-[11px] font-medium text-slate-700 truncate">
                        {preset.label}
                      </div>
                      {mediaUrl === preset.url && (
                        <div className="absolute top-2 right-2 bg-teal-600 text-white rounded-full p-0.5 shadow">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Preview */}
              {mediaUrl && (
                <div className="rounded-2xl overflow-hidden border border-slate-200 relative aspect-video bg-slate-900">
                  <img src={mediaUrl} alt="Selected Preview" className="w-full h-full object-cover" />
                  <div className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-md text-white text-[11px] px-2.5 py-1 rounded-lg">
                    ✓ Photo Loaded for Inspection
                  </div>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: LOCATION PICKER */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <label className="block text-sm font-bold text-slate-900">
                    Pin Exact Incident Location
                  </label>
                  <p className="text-xs text-slate-500">
                    Click anywhere on the map or drag the pin to set the coordinates.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleAutoDetectLocation}
                  className="flex items-center gap-1.5 bg-teal-50 text-teal-700 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded-xl text-xs font-semibold self-start sm:self-auto transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Auto-detect GPS</span>
                </button>
              </div>

              {/* Leaflet Map Picker Component */}
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
                <InteractiveMap
                  mode="picker"
                  selectedLocation={location}
                  onLocationSelect={(newLoc) => setLocation(newLoc)}
                  zoom={14}
                  height="100%"
                />
              </div>

              {/* Location Input & Address Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Street Address / Landmark
                  </label>
                  <input
                    type="text"
                    value={location.address}
                    onChange={(e) => setLocation({ ...location, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. 142 Elm St, near corner"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Neighborhood / Ward
                  </label>
                  <input
                    type="text"
                    value={location.neighborhood}
                    onChange={(e) => setLocation({ ...location, neighborhood: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="e.g. Downtown Ward 4"
                  />
                </div>
              </div>

              {/* Quick Neighborhood Presets */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-semibold text-slate-500">Quick Areas:</span>
                {[
                  { name: 'Downtown Center', lat: 40.7128, lng: -74.006 },
                  { name: 'SoHo Commons', lat: 40.718, lng: -74.001 },
                  { name: 'East Village', lat: 40.728, lng: -73.992 },
                  { name: 'Market District', lat: 40.725, lng: -74.009 }
                ].map((area) => (
                  <button
                    key={area.name}
                    type="button"
                    onClick={() =>
                      setLocation({
                        lat: area.lat,
                        lng: area.lng,
                        address: `${area.name} Area`,
                        neighborhood: area.name
                      })
                    }
                    className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-medium transition-colors"
                  >
                    {area.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: DETAILS & SMART AI SCANNER */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Issue Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onBlur={handleDetailsBlur}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                  placeholder="e.g. Deep pothole causing rim punctures, or Exposed streetlight wire"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Detailed Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={handleDetailsBlur}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 leading-relaxed"
                  placeholder="Describe dimensions, nearby hazards (schools, elderly care, high traffic), how long it has persisted..."
                  required
                />
              </div>

              {/* AI Categorization & Urgency Auto-Detection Banner */}
              <div className="bg-gradient-to-r from-teal-50 via-emerald-50 to-blue-50 border border-teal-200/70 p-4 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        Smart AI Triage & Severity Classifier
                      </h4>
                      <p className="text-[10px] text-slate-500">
                        Analyzes report text against municipal hazard databases
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={runAiAnalysis}
                    disabled={isAnalyzingAi || (!title && !description)}
                    className="flex items-center gap-1.5 text-xs font-bold bg-white text-teal-800 hover:bg-teal-50 border border-teal-300 px-3 py-1.5 rounded-xl shadow-xs transition-all disabled:opacity-50"
                  >
                    {isAnalyzingAi ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                        <span>Run AI Scan</span>
                      </>
                    )}
                  </button>
                </div>

                {aiReport ? (
                  <div className="mt-3 pt-3 border-t border-teal-200/60 space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs text-slate-600">Suggested Category:</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-teal-600 text-white">
                        {aiReport.category}
                      </span>
                      <span className="text-xs text-slate-600">Urgency:</span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md text-white ${
                          aiReport.urgency === 'Emergency'
                            ? 'bg-red-600'
                            : aiReport.urgency === 'High'
                            ? 'bg-amber-500'
                            : 'bg-teal-700'
                        }`}
                      >
                        {aiReport.urgency}
                      </span>
                      <span className="text-[11px] font-semibold text-teal-700 bg-teal-100/80 px-2 py-0.5 rounded-md">
                        {aiReport.confidence}% AI Confidence
                      </span>
                    </div>

                    <p className="text-xs text-slate-700 leading-snug">
                      <span className="font-semibold">AI Rationale:</span> {aiReport.reasoning}
                    </p>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <span>Detected Signals:</span>
                      {aiReport.detectedKeywords.map((kw, i) => (
                        <span key={i} className="bg-white/80 border border-teal-200 px-1.5 py-0.2 rounded text-slate-700">
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 mt-1">
                    Type your title & description above or click "Run AI Scan" to auto-determine category and safety urgency.
                  </div>
                )}
              </div>

              {/* Category & Urgency Pickers (User can override AI) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Category (Confirmed)
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Urgency Level
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white font-medium"
                  >
                    {URGENCIES.map((urg) => (
                      <option key={urg} value={urg}>
                        {urg === 'Emergency' ? '🚨 Emergency (Immediate Danger)' : urg}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Reporter Contact Info */}
              <div className="pt-2 border-t border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">Reporter Contact (Optional)</span>
                  <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span>Submit Anonymously</span>
                  </label>
                </div>

                {!isAnonymous && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={reporterName}
                      onChange={(e) => setReporterName(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                    <input
                      type="text"
                      placeholder="Email or Phone for SMS updates"
                      value={reporterContact}
                      onChange={(e) => setReporterContact(e.target.value)}
                      className="px-3 py-2 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: REVIEW & SUBMIT */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-700 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-teal-950">Ready for Municipal Dispatch</h4>
                  <p className="text-xs text-teal-800 mt-0.5">
                    Upon submission, a unique public tracking ticket will be generated, and your local municipal response team will be automatically alerted.
                  </p>
                </div>
              </div>

              {/* Summary Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={mediaUrl}
                    alt="Issue Evidence"
                    className="w-20 h-20 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-800">
                        {category}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-md text-white ${
                          urgency === 'Emergency'
                            ? 'bg-red-600'
                            : urgency === 'High'
                            ? 'bg-amber-500'
                            : 'bg-teal-600'
                        }`}
                      >
                        {urgency} Priority
                      </span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {title || 'Untitled Civic Incident'}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">
                      {description || 'No description provided.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-slate-400 font-medium">Location:</span>
                    <p className="font-semibold text-slate-800 truncate">
                      {location.address}
                    </p>
                    <p className="text-[11px] text-slate-500">{location.neighborhood}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 font-medium">Reporter:</span>
                    <p className="font-semibold text-slate-800">
                      {isAnonymous ? 'Anonymous Citizen' : (reporterName || 'Citizen Member')}
                    </p>
                    <p className="text-[11px] text-teal-600 font-medium">Tracking enabled</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Wizard Footer Controls */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              type="button"
              onClick={() => {
                if (step === 3 && !title.trim()) {
                  alert('Please enter a brief title for the issue.');
                  return;
                }
                setStep(step + 1);
              }}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmitReport}
              disabled={isSubmitting}
              className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Transmitting Ticket...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Submit & Launch Ticket</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
