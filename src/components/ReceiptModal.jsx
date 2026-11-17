import React from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Printer,
  X,
  Share2,
  CheckCircle2,
  Shield,
  MapPin,
  Calendar,
  Building,
  AlertTriangle,
  FileText,
  QrCode
} from 'lucide-react';

export default function ReceiptModal({ issue, onClose }) {
  const { addToast } = useCivic();

  if (!issue) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(issue.ticketId);
      addToast(`Copied ${issue.ticketId} to clipboard!`, 'info');
    }
  };

  const formatDate = (iso) => {
    if (!iso) return 'N/A';
    return new Date(iso).toLocaleString('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/80 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white">
      <div
        className="w-full max-w-xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-300 dark:border-slate-700 overflow-hidden flex flex-col my-auto print:border-none print:shadow-none print:max-w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar (Hidden when printing) */}
        <div className="p-3.5 bg-slate-800 text-white flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold">Official Grievance Acknowledgement Slip</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Slip Content */}
        <div className="p-6 sm:p-8 space-y-6 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-900 print:text-black print:bg-white print:p-4">
          
          {/* Official Document Header */}
          <div className="text-center pb-4 border-b-2 border-slate-900 dark:border-slate-400 print:border-black space-y-1">
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-9 h-9 rounded-full bg-blue-900 dark:bg-slate-800 text-white flex items-center justify-center font-bold text-xs border border-blue-700">
                <Shield className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div className="text-[11px] font-bold tracking-widest text-slate-600 dark:text-slate-400 uppercase">
              Bruhat Bengaluru Mahanagara Palike (BBMP)
            </div>
            <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-950 dark:text-white print:text-black uppercase">
              Public Works & Civic Grievance Redressal Cell
            </h1>
            <div className="inline-block text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 px-3 py-0.5 rounded-full border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              OFFICIAL ACKNOWLEDGEMENT & DISPATCH RECORD
            </div>
          </div>

          {/* Ticket Key Highlight Bar */}
          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3 print:bg-gray-50 print:border-gray-300">
            <div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold tracking-wider">
                Permanent Tracking Ticket ID
              </div>
              <div className="font-mono text-xl sm:text-2xl font-black text-blue-700 dark:text-blue-400 print:text-blue-900 tracking-tight">
                {issue.ticketId}
              </div>
            </div>

            {/* Simulated QR Code / Barcode block */}
            <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-2 rounded-lg border border-slate-200 dark:border-slate-700">
              <QrCode className="w-10 h-10 text-slate-800 dark:text-slate-200" />
              <div className="text-[9px] font-mono leading-tight text-slate-500 dark:text-slate-400">
                <div>GEO-TAGGED</div>
                <div>{issue.location.lat.toFixed(3)}N, {issue.location.lng.toFixed(3)}E</div>
                <div className="text-emerald-600 font-bold">DIGITALLY LOGGED</div>
              </div>
            </div>
          </div>

          {/* Core Grievance Metadata Grid */}
          <div className="grid grid-cols-2 gap-3.5 text-xs">
            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Category</span>
              <div className="font-bold text-slate-900 dark:text-slate-100">{issue.category}</div>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Dispatch Priority</span>
              <div className="font-bold text-rose-600 dark:text-rose-400">{issue.urgency} Priority</div>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Registration Timestamp</span>
              <div className="font-semibold text-slate-800 dark:text-slate-200">{formatDate(issue.reportedAt)}</div>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-lg p-2.5 space-y-0.5">
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Target Resolution SLA</span>
              <div className="font-semibold text-slate-800 dark:text-slate-200">{issue.eta || 'Standard SLA (24-48 Hours)'}</div>
            </div>
          </div>

          {/* Details & Location */}
          <div className="space-y-3 border-t border-slate-200 dark:border-slate-700 pt-3 text-xs">
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Grievance Subject</span>
              <div className="font-bold text-slate-900 dark:text-slate-100 text-sm mt-0.5">{issue.title}</div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Ward & Incident Location</span>
              <div className="font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                {issue.location.address} ({issue.location.neighborhood})
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Jurisdiction Department Assigned</span>
              <div className="font-semibold text-blue-700 dark:text-blue-300 mt-0.5">
                {issue.department}
              </div>
            </div>

            <div>
              <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400">Citizen Complainant</span>
              <div className="text-slate-800 dark:text-slate-200 mt-0.5">
                {issue.reporter?.isAnonymous ? 'Anonymous Citizen' : issue.reporter?.name || 'Registered Citizen'}
                {issue.reporter?.contact ? ` • ${issue.reporter.contact}` : ''}
              </div>
            </div>
          </div>

          {/* Official Verification Seal & Helpline Footer */}
          <div className="pt-3 border-t-2 border-slate-900 dark:border-slate-600 print:border-black flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-600 dark:text-slate-400">
            <div>
              <div className="font-bold text-slate-900 dark:text-slate-200">BBMP Helpline: 1533 / 080-22660000</div>
              <div>Emergency Services: 112 • BESCOM: 1912 • BWSSB: 1916</div>
            </div>

            <div className="text-right border-2 border-emerald-700 text-emerald-800 dark:text-emerald-400 dark:border-emerald-500 px-3 py-1 rounded font-mono font-bold text-[10px] uppercase tracking-wider">
              ✓ OFFICIAL DIGITAL SLIP
            </div>
          </div>
        </div>

        {/* Modal Bottom (Hidden when printing) */}
        <div className="p-3.5 bg-slate-100 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs print:hidden">
          <button
            onClick={handleCopy}
            className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
          >
            Copy Ticket ID
          </button>
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold px-4 py-1.5 rounded-lg transition-colors cursor-pointer"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
}
