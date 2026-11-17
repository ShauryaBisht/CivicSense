import React from 'react';
import { useCivic } from '../context/CivicContext';
import { Bell, AlertTriangle, CheckCircle, Clock, X, ExternalLink } from 'lucide-react';

export default function NotificationDrawer({ isOpen, onClose }) {
  const { notifications, markNotifsRead, issues, setSelectedIssue } = useCivic();

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
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-xs transition-opacity">
      <div
        className="w-full max-w-sm bg-white dark:bg-slate-800 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-700/80 transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-blue-700 dark:bg-slate-900 text-white flex items-center justify-between border-b border-blue-800 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/80 dark:bg-blue-900/60 flex items-center justify-center text-blue-200">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm">System Notifications</h3>
              <p className="text-[11px] text-blue-200 dark:text-slate-400">Grievance updates & ward dispatch alerts</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markNotifsRead}
              className="text-xs text-blue-100 dark:text-blue-300 hover:text-white underline cursor-pointer"
            >
              Mark read
            </button>
            <button
              onClick={onClose}
              className="text-blue-200 dark:text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/60 p-2.5">
          {notifications.length === 0 ? (
            <div className="p-12 text-center text-slate-400 dark:text-slate-500 text-xs">
              No recent notifications logged.
            </div>
          ) : (
            notifications.map((notif) => {
              const isUrgent = notif.type === 'high_priority';

              return (
                <div
                  key={notif.id}
                  onClick={() => notif.ticketId && handleSelectTicket(notif.ticketId)}
                  className={`p-3 rounded-xl transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 text-xs ${
                    !notif.read
                      ? 'bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40'
                      : 'border border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex-shrink-0">
                      {isUrgent ? (
                        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="font-bold text-slate-900 dark:text-slate-100 truncate">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 leading-snug">
                        {notif.message}
                      </p>
                      {notif.ticketId && (
                        <span className="text-blue-600 dark:text-blue-400 font-bold text-[11px] inline-flex items-center gap-1 mt-1.5 hover:underline">
                          <span>Inspect Ticket {notif.ticketId}</span>
                          <ExternalLink className="w-3 h-3" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
