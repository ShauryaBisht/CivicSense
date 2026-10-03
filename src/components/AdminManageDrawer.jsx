import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import { DEPARTMENTS, STATUSES } from '../data/mockIssues';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Upload,
  UserCheck,
  Phone,
  FileText,
  AlertTriangle,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function AdminManageDrawer({ issue, onClose }) {
  const {
    updateIssueStatus,
    reassignIssue,
    submitProofOfWork,
    addToast
  } = useCivic();

  if (!issue) return null;

  // Form State
  const [currentStatus, setCurrentStatus] = useState(issue.status);
  const [officialNote, setOfficialNote] = useState('');
  const [eta, setEta] = useState(issue.eta || 'Within 24 Hours');
  const [selectedDept, setSelectedDept] = useState(issue.department || DEPARTMENTS[0]);
  const [teamName, setTeamName] = useState(issue.assignedTeam?.name || '');
  const [leadWorker, setLeadWorker] = useState(issue.assignedTeam?.leadWorker || '');
  const [contactNumber, setContactNumber] = useState(issue.assignedTeam?.contactNumber || '');
  const [proofPhotoUrl, setProofPhotoUrl] = useState(
    issue.afterPhotoUrl || 'https://images.unsplash.com/photo-1528323273322-d81458248d40?auto=format&fit=crop&w=900&q=80'
  );

  // Field Team Presets by department
  const TEAM_PRESETS = {
    'Department of Public Works': [
      { name: 'Asphalt Rapid Response Crew #3', lead: 'Supervisor Dave Miller', phone: '+1 (555) 438-9921' },
      { name: 'Heavy Paving Squad Beta', lead: 'Officer Frank Castle', phone: '+1 (555) 234-5678' }
    ],
    'Department of Sanitation': [
      { name: 'Heavy Waste Compactor Squad 12', lead: 'Officer Ray Reynolds', phone: '+1 (555) 778-1200' },
      { name: 'Bulk Debris Removal Unit 4', lead: 'Supervisor Maya Lin', phone: '+1 (555) 889-1122' }
    ],
    'Water & Sewer Authority': [
      { name: 'Emergency Hydraulics Unit A', lead: 'Chief Engineer Carlos Diaz', phone: '+1 (555) 302-8819' },
      { name: 'Drainage Jet-Vac Crew B', lead: 'Tech Marcus Cole', phone: '+1 (555) 662-3118' }
    ],
    'Bureau of Electrical Grid & Lighting': [
      { name: 'Grid Safety Unit 07', lead: 'Lineman Scott Peterson', phone: '+1 (555) 901-4432' },
      { name: 'Substation Diagnostic Team', lead: 'Engineer Priya Sharma', phone: '+1 (555) 345-6789' }
    ],
    'Department of Transportation & Safety': [
      { name: 'Traffic Guardrail Repair Crew', lead: 'Inspector Tom Hardy', phone: '+1 (555) 987-6543' }
    ],
    'Parks & Recreation Maintenance': [
      { name: 'Playground Safety Specialists', lead: 'Officer Liam O\'Connor', phone: '+1 (555) 441-2390' }
    ]
  };

  const handleApplyTeamPreset = (preset) => {
    setTeamName(preset.name);
    setLeadWorker(preset.lead);
    setContactNumber(preset.phone);
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    updateIssueStatus(issue.id, currentStatus, officialNote, eta);
    onClose();
  };

  const handleSaveAssignment = (e) => {
    e.preventDefault();
    reassignIssue(issue.id, selectedDept, teamName, leadWorker, contactNumber);
    onClose();
  };

  const handleUploadProof = (e) => {
    e.preventDefault();
    submitProofOfWork(
      issue.id,
      proofPhotoUrl,
      officialNote || 'Resolution verified by municipal supervisor. Proof of work photos archived.'
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity">
      <div
        className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 overflow-y-auto animate-in slide-in-from-right duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">Municipal Work Order</span>
                <span className="font-mono text-xs text-amber-300 font-bold bg-amber-400/20 px-2 py-0.5 rounded">
                  {issue.ticketId}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Dispatch, Routing & Proof of Work</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 space-y-6">
          {/* Quick Issue Info Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-800">{issue.category}</span>
              <span
                className={`font-bold px-2 py-0.5 rounded text-white ${
                  issue.urgency === 'Emergency'
                    ? 'bg-red-600'
                    : issue.urgency === 'High'
                    ? 'bg-amber-500'
                    : 'bg-teal-600'
                }`}
              >
                {issue.urgency}
              </span>
            </div>
            <h3 className="font-bold text-sm text-slate-900 leading-snug">{issue.title}</h3>
            <p className="text-xs text-slate-500">📍 {issue.location.address}</p>
          </div>

          {/* Section 1: Update Status */}
          <form onSubmit={handleSaveStatus} className="space-y-3 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>Update Workflow Status & ETA</span>
            </h4>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Status
                </label>
                <select
                  value={currentStatus}
                  onChange={(e) => setCurrentStatus(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 font-semibold bg-white"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Target ETA
                </label>
                <input
                  type="text"
                  value={eta}
                  onChange={(e) => setEta(e.target.value)}
                  placeholder="e.g. Today by 5:00 PM"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Official Dispatch Note
              </label>
              <input
                type="text"
                value={officialNote}
                onChange={(e) => setOfficialNote(e.target.value)}
                placeholder="Audit log reason or progress report..."
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2 rounded-xl transition-colors shadow-xs"
            >
              Update Status & Log Audit
            </button>
          </form>

          {/* Section 2: Reassign Department & Field Team */}
          <form onSubmit={handleSaveAssignment} className="space-y-3 p-4 rounded-2xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-teal-600" />
              <span>Department Routing & Crew Assignment</span>
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Responsible Department
              </label>
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300 bg-white font-medium"
              >
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Crew Presets */}
            {TEAM_PRESETS[selectedDept] && (
              <div>
                <span className="text-[11px] font-semibold text-slate-500 mb-1 block">
                  Quick Assign Field Crews:
                </span>
                <div className="flex flex-col gap-1.5">
                  {TEAM_PRESETS[selectedDept].map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleApplyTeamPreset(preset)}
                      className="text-left text-xs p-2 rounded-xl bg-slate-50 hover:bg-teal-50 border border-slate-200 hover:border-teal-300 transition-colors flex items-center justify-between"
                    >
                      <div>
                        <span className="font-bold text-slate-800">{preset.name}</span>
                        <div className="text-[10px] text-slate-500">Lead: {preset.lead}</div>
                      </div>
                      <span className="text-[10px] font-bold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded">
                        Assign
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-2 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Team Name
                </label>
                <input
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  placeholder="Crew name"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Lead Worker
                </label>
                <input
                  type="text"
                  value={leadWorker}
                  onChange={(e) => setLeadWorker(e.target.value)}
                  placeholder="Supervisor name"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-300"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 rounded-xl transition-colors shadow-xs"
            >
              Confirm Crew Dispatch Order
            </button>
          </form>

          {/* Section 3: Upload Proof of Work (Resolves issue) */}
          <form onSubmit={handleUploadProof} className="space-y-3 p-4 rounded-2xl border border-emerald-200 bg-emerald-50/40">
            <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Upload "Proof of Work" (Mark as Resolved)</span>
            </h4>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Resolved Photo Evidence URL
              </label>
              <input
                type="text"
                value={proofPhotoUrl}
                onChange={(e) => setProofPhotoUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs px-3 py-2 rounded-xl border border-emerald-300 bg-white"
              />
            </div>

            {proofPhotoUrl && (
              <div className="aspect-video w-full rounded-xl overflow-hidden border border-emerald-200">
                <img src={proofPhotoUrl} alt="Proof" className="w-full h-full object-cover" />
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verify Resolution & Close Ticket</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
