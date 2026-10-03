import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import BeforeAfterSlider from './BeforeAfterSlider';
import {
  X,
  ThumbsUp,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  User,
  Phone,
  Calendar,
  Sparkles,
  Share2,
  Printer,
  Star,
  RotateCcw,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function IssueDetailModal({ issue, onClose }) {
  const { upvoteIssue, addComment, rateResolution, role, addToast } = useCivic();

  const [newComment, setNewComment] = useState('');
  const [citizenRating, setCitizenRating] = useState(5);
  const [feedbackNote, setFeedbackNote] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  if (!issue) return null;

  const isResolved = issue.status === 'Resolved';
  const isEmergency = issue.urgency === 'Emergency';
  const isHigh = issue.urgency === 'High';

  const handleSendComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(issue.id, newComment, 'Community Member');
    setNewComment('');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Ticket tracking link copied to clipboard!', 'info');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleConfirmFix = () => {
    rateResolution(issue.id, citizenRating, feedbackNote || 'Resolution verified by resident.', true);
    setIsVerifying(false);
  };

  const handleFlagPersists = () => {
    rateResolution(
      issue.id,
      1,
      feedbackNote || 'Citizen reports issue is still present and unresolved.',
      false
    );
    setIsVerifying(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div
        className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col my-auto max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40">
              {issue.ticketId}
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                {issue.category}
              </span>
              <span
                className={`text-xs font-bold px-2 py-0.5 rounded-md text-white ${
                  isEmergency
                    ? 'bg-red-600 animate-pulse'
                    : isHigh
                    ? 'bg-amber-500'
                    : 'bg-teal-600'
                }`}
              >
                {issue.urgency}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share tracking link"
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={handlePrint}
              title="Print work order"
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto space-y-6">
          {/* Title & Metadata */}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
              {issue.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-2">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-teal-600" />
                <span className="font-medium text-slate-700">{issue.location.address}</span> ({issue.location.neighborhood})
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Logged {new Date(issue.reportedAt).toLocaleDateString()}</span>
              </span>
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>By {issue.reporter?.isAnonymous ? 'Anonymous Citizen' : (issue.reporter?.name || 'Citizen')}</span>
              </span>
            </div>
          </div>

          {/* Before & After Interactive Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Visual Evidence & Resolution Proof
              </h3>
              {isResolved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Completion
                </span>
              )}
            </div>
            <BeforeAfterSlider
              beforeUrl={issue.beforePhotoUrl || issue.mediaUrl}
              afterUrl={issue.afterPhotoUrl}
              title={issue.title}
            />
          </div>

          {/* Description & AI Diagnostic Box */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Report Description
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {issue.description}
              </p>

              {/* Endorse Action Bar */}
              <div className="flex items-center gap-3 pt-1">
                <button
                  onClick={() => upvoteIssue(issue.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                    issue.hasUpvoted
                      ? 'bg-teal-600 text-white shadow-teal-600/30'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${issue.hasUpvoted ? 'fill-current' : ''}`} />
                  <span>{issue.hasUpvoted ? 'Endorsed by You' : 'Endorse Priority'}</span>
                  <span className="bg-black/20 text-white px-2 py-0.5 rounded-full text-xs font-mono ml-1">
                    {issue.upvotes}
                  </span>
                </button>

                <div className="text-xs text-slate-500">
                  {issue.upvotes > 20
                    ? '🔥 High community engagement. Escalated to department supervisor.'
                    : 'Upvoting signals community importance to city planners.'}
                </div>
              </div>
            </div>

            {/* Assigned Department & Field Crew Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Municipal Routing
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">
                  {issue.department || 'Department of Public Works'}
                </h4>

                <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2 text-xs">
                  {issue.assignedTeam ? (
                    <>
                      <div>
                        <span className="text-slate-400">Assigned Team:</span>
                        <p className="font-semibold text-slate-800">{issue.assignedTeam.name}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Crew Supervisor:</span>
                        <p className="font-semibold text-slate-800">{issue.assignedTeam.leadWorker}</p>
                      </div>
                      {issue.assignedTeam.contactNumber && (
                        <div className="flex items-center gap-1.5 text-teal-700 font-semibold">
                          <Phone className="w-3 h-3" />
                          <span>{issue.assignedTeam.contactNumber}</span>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 text-[11px]">
                      Awaiting squad dispatch by central triage coordinator.
                    </div>
                  )}

                  <div className="pt-2">
                    <span className="text-slate-400">Target ETA:</span>
                    <p className="font-bold text-teal-700">{issue.eta || 'Within 48 hours'}</p>
                  </div>
                </div>
              </div>

              {issue.aiMetadata && (
                <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  <span>AI Classified ({issue.aiMetadata.confidence}% confidence)</span>
                </div>
              )}
            </div>
          </div>

          {/* Resolution Lifecycle Timeline Tracker */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Resolution Timeline
            </h3>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {issue.timeline?.map((event, idx) => {
                const isLatest = idx === issue.timeline.length - 1;
                return (
                  <div key={event.id || idx} className="relative group">
                    {/* Circle beacon */}
                    <div
                      className={`absolute -left-6 top-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isLatest
                          ? 'border-teal-500 bg-teal-500 text-white shadow-sm ring-4 ring-teal-100'
                          : 'border-slate-300 bg-white text-slate-500'
                      }`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    </div>

                    <div className="bg-slate-50 hover:bg-slate-100/80 transition-colors p-3.5 rounded-xl border border-slate-200/80">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900">{event.title}</span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                            {event.role}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium">
                          {new Date(event.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Citizen Verification & Feedback Section (For Resolved Issues) */}
          {isResolved && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                  <h4 className="font-bold text-sm text-emerald-950">Citizen Quality Verification</h4>
                </div>
                {issue.feedback && (
                  <div className="flex items-center gap-1 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-4 h-4 ${
                          star <= (issue.feedback?.rating || 5) ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {issue.feedback ? (
                <div className="text-xs text-emerald-900 bg-white/70 p-3 rounded-xl border border-emerald-200/60">
                  <p className="font-semibold">"{issue.feedback.feedbackText}"</p>
                  <p className="text-[10px] text-emerald-700 mt-1">
                    Verified by {issue.feedback.citizenName} on {new Date(issue.feedback.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ) : (
                <div className="space-y-3 pt-1">
                  <p className="text-xs text-emerald-800">
                    Did municipal crew successfully resolve this issue? Rate their workmanship:
                  </p>
                  <div className="flex items-center gap-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setCitizenRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= citizenRating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-700 ml-2">
                      {citizenRating} / 5 Stars
                    </span>
                  </div>

                  <input
                    type="text"
                    value={feedbackNote}
                    onChange={(e) => setFeedbackNote(e.target.value)}
                    placeholder="Add brief feedback on quality or speed..."
                    className="w-full text-xs px-3 py-2 rounded-xl border border-emerald-200 bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={handleConfirmFix}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm"
                    >
                      ✓ Confirm Resolution
                    </button>
                    <button
                      onClick={handleFlagPersists}
                      className="bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-bold px-4 py-2 rounded-xl transition-all"
                    >
                      ⚠️ Issue Persists (Re-open Ticket)
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Community Discussion Thread */}
          <div className="space-y-3 pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Community Comments ({issue.comments?.length || 0})</span>
              </h3>
            </div>

            {/* Comments List */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {(!issue.comments || issue.comments.length === 0) ? (
                <div className="text-xs text-slate-400 italic py-2">
                  No community comments yet. Be the first to add an update.
                </div>
              ) : (
                issue.comments.map((comm) => (
                  <div
                    key={comm.id}
                    className={`p-3 rounded-xl text-xs space-y-1 ${
                      comm.isOfficial
                        ? 'bg-teal-50/80 border border-teal-200/80'
                        : 'bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={comm.avatar}
                          alt={comm.author}
                          className="w-5 h-5 rounded-full object-cover"
                        />
                        <span className="font-bold text-slate-900">{comm.author}</span>
                        {comm.isOfficial && (
                          <span className="text-[10px] font-bold bg-teal-600 text-white px-1.5 py-0.2 rounded">
                            Official
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(comm.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-700 pl-7">{comm.content}</p>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleSendComment} className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share a condition update or note for neighbors..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post</span>
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>CivicFix Public Transparency Guarantee</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
