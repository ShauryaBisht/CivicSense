import React from 'react';
import { useCivic } from '../context/CivicContext';
import { Bell, AlertTriangle, CheckCircle, Clock, ShieldAlert, X } from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose }) {
  const { notifications, markNotifsRead, issues, setSelectedIssue, setActiveTab } = useCivic();

  if (!isOpen) return null;

  const handleSelectTicket = (ticketId) => {
    if (!ticketId) return;
    const found = issues.find((i) => i.ticketId === ticketId);
    if (found) {
      setSelectedIssue(found);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-black/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm tracking-wide">Municipal Alert Feed</h3>
              <p className="text-[11px] text-slate-400">Live city dispatches & issue updates</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markNotifsRead}
              className="text-xs text-teal-400 hover:text-teal-300 font-medium px-2 py-1 rounded hover:bg-slate-800 transition-colors"
            >
              Mark Read
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-sm">
              <CheckCircle className="w-10 h-10 mx-auto text-teal-500/40 mb-2" />
              No new alerts. All systems normal.
            </div>
          ) : (
            notifications.map((notif) => {
              const isUrgent = notif.type === 'high_priority';
              return (
                <div
                  key={notif.id}
                  onClick={() => notif.ticketId && handleSelectTicket(notif.ticketId)}
                  className={`p-3.5 rounded-xl transition-all cursor-pointer hover:bg-slate-50 relative group ${
                    !notif.read ? 'bg-teal-50/50' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${
                        isUrgent
                          ? 'bg-red-100 text-red-600'
                          : notif.type === 'community'
                          ? 'bg-emerald-100 text-emerald-600'
                          : 'bg-teal-100 text-teal-700'
                      }`}
                    >
                      {isUrgent ? (
                        <ShieldAlert className="w-4 h-4 animate-pulse" />
                      ) : notif.type === 'community' ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {notif.message}
                      </p>
                      {notif.ticketId && (
                        <div className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-teal-700 group-hover:text-teal-900">
                          <span>View Ticket {notif.ticketId}</span>
                          <span>→</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 text-center flex items-center justify-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Real-time Municipal Dispatch Webhook Active</span>
        </div>
      </div>
    </div>
  );
}
