import React from 'react';
import { Phone, Heart, Shield, Building2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-14 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Project Details */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-base text-white tracking-tight">CivicFix</span>
              <span className="bg-slate-800 text-slate-400 text-[10px] px-2 py-0.5 rounded-full font-mono border border-slate-700">
                v1.2.0
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              CivicFix is an online municipal grievance reporting and public works monitoring system designed to bridge citizens and ward division engineers with transparent real-time tracking.
            </p>
            <p className="text-slate-500 text-[11px]">
              Built with React, Tailwind CSS, Leaflet OpenStreetMap, and LocalStorage persistence.
            </p>
          </div>

          {/* Emergency Helplines */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-blue-400" />
              <span>Bengaluru Municipal Helplines</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center justify-between py-1 border-b border-slate-800">
                <span>Emergency Police / Ambulance:</span>
                <span className="font-bold text-rose-400">112</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-800">
                <span>BBMP Grievance Control Room:</span>
                <span className="font-semibold text-blue-300">1533 / 080-22660000</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-800">
                <span>BWSSB Water & Sewage Helpline:</span>
                <span className="font-semibold text-blue-300">1916</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-800">
                <span>BESCOM Electricity Helpline:</span>
                <span className="font-semibold text-amber-300">1912</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span>Bengaluru Traffic Police (BTP):</span>
                <span className="font-semibold text-blue-300">1095</span>
              </li>
            </ul>
          </div>

          {/* Quick Demo Instructions */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Portal Operations Guide</span>
            </h4>
            <div className="space-y-2 text-slate-400 text-xs leading-relaxed">
              <p>
                • <strong>Citizen View:</strong> Log new grievances with photos, GPS map pinpointing, and automated category matching. Endorse neighbors' tickets.
              </p>
              <p>
                • <strong>Admin Operations:</strong> Toggle role to Admin in the top bar to inspect the Kanban board, dispatch maintenance crews, and attach resolution proof photos.
              </p>
              <p>
                • <strong>Theme Controls:</strong> Toggle the Sun/Moon button in the top navigation bar anytime to toggle between professional light and dark modes.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} CivicFix • Municipal Public Works Grievance System</p>
          <p>Designed and developed for civic transparency and community problem redressal</p>
        </div>
      </div>
    </footer>
  );
}
