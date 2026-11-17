import React from 'react';
import { useCivic } from '../context/CivicContext';
import { CheckCircle, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts, removeToast } = useCivic();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-3 sm:px-0">
      {toasts.map((toast) => {
        let borderClass = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 shadow-lg';
        let Icon = Info;
        let iconColor = 'text-blue-600 dark:text-blue-400';

        if (toast.type === 'success') {
          borderClass = 'border-emerald-200 dark:border-emerald-800/80 bg-emerald-50 dark:bg-slate-800 text-emerald-950 dark:text-emerald-300 shadow-emerald-950/10';
          Icon = CheckCircle;
          iconColor = 'text-emerald-600 dark:text-emerald-400';
        } else if (toast.type === 'warning') {
          borderClass = 'border-amber-200 dark:border-amber-800/80 bg-amber-50 dark:bg-slate-800 text-amber-950 dark:text-amber-300 shadow-amber-950/10';
          Icon = AlertTriangle;
          iconColor = 'text-amber-600 dark:text-amber-400';
        } else if (toast.type === 'danger') {
          borderClass = 'border-rose-200 dark:border-rose-800/80 bg-rose-50 dark:bg-slate-800 text-rose-950 dark:text-rose-300 shadow-rose-950/10';
          Icon = AlertCircle;
          iconColor = 'text-rose-600 dark:text-rose-400';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-md transition-all text-xs font-semibold backdrop-blur-xs ${borderClass}`}
          >
            <Icon className={`w-4 h-4 flex-shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 leading-snug">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5 transition-colors"
              aria-label="Dismiss alert"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
