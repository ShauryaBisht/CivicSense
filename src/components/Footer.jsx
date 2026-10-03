import React from 'react';
import { ShieldCheck, Phone, Heart, ExternalLink, HelpCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
                CF
              </div>
              <span className="font-extrabold text-base text-white">CivicFix</span>
              <span className="bg-teal-500/20 text-teal-300 text-[10px] px-1.5 py-0.5 rounded font-bold">
                OPEN MUNICIPALITY
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-md leading-relaxed">
              CivicFix is a modern public infrastructure transparency platform. We believe in visible civic accountability, real-time routing algorithms, and community-verified solutions.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-teal-400 pt-1">
              <ShieldCheck className="w-4 h-4" />
              <span>WCAG 2.1 AA Compliant • Real-time SLA Tracking Enabled</span>
            </div>
          </div>

          {/* Quick Helplines */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
              Emergency Hotlines
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li className="flex items-center justify-between py-1 border-b border-slate-800">
                <span>Immediate Danger / Fire</span>
                <span className="font-bold text-red-400">911</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-800">
                <span>Municipal Services (Non-Emergency)</span>
                <span className="font-bold text-teal-300">311</span>
              </li>
              <li className="flex items-center justify-between py-1 border-b border-slate-800">
                <span>Gas / Electrical Leak Hazard</span>
                <span className="font-bold text-amber-300">1-800-GAS-LEAK</span>
              </li>
              <li className="flex items-center justify-between py-1">
                <span>Water Main Burst Rapid Dispatch</span>
                <span className="font-bold text-teal-300">1-800-WATER-OK</span>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-200 text-xs uppercase tracking-wider">
              Civic Transparency
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li className="hover:text-white cursor-pointer transition-colors">
                Municipal Code of Transparency
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                SLA Guarantee & Turnaround Metrics
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Public Open Data API (GeoJSON)
              </li>
              <li className="hover:text-white cursor-pointer transition-colors">
                Citizen Privacy & Anonymity Policy
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-3">
          <p>© {new Date().getFullYear()} CivicFix Municipal Systems Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Built with care for accountable, safer, and cleaner cities</span>
            <Heart className="w-3.5 h-3.5 text-teal-500 fill-teal-500 inline" />
          </div>
        </div>
      </div>
    </footer>
  );
}
