import React from 'react';
import { useCivic } from '../context/CivicContext';
import {
  Award,
  ShieldCheck,
  Star,
  ThumbsUp,
  CheckCircle,
  Flame,
  Zap,
  X,
  TrendingUp,
  Medal,
  Users
} from 'lucide-react';

export default function CivicKarmaModal({ isOpen, onClose }) {
  const { userKarma } = useCivic();

  if (!isOpen) return null;

  const points = userKarma?.points || 120;
  const reportsCount = userKarma?.reportsCount || 2;
  const endorsementsCount = userKarma?.endorsementsCount || 7;
  const verificationsCount = userKarma?.verificationsCount || 1;
  const badges = userKarma?.badges || ['ward_watchdog', 'community_champion'];

  // Calculate Level (Every 100 points is 1 Level)
  const level = Math.floor(points / 100) + 1;
  const currentLevelProgress = points % 100;
  const pointsToNextLevel = 100 - currentLevelProgress;

  const ALL_BADGES = [
    {
      id: 'ward_watchdog',
      title: 'Ward Watchdog',
      desc: 'Reported 2+ civic issues to ward engineers',
      icon: Medal,
      color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/60 border-amber-300 dark:border-amber-800',
      unlocked: badges.includes('ward_watchdog')
    },
    {
      id: 'community_champion',
      title: 'Community Champion',
      desc: 'Endorsed 5+ neighbor grievances',
      icon: Star,
      color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/60 border-blue-300 dark:border-blue-800',
      unlocked: badges.includes('community_champion')
    },
    {
      id: 'ground_auditor',
      title: 'Ground Auditor',
      desc: 'Audited & verified completed municipal repairs',
      icon: ShieldCheck,
      color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300 dark:border-emerald-800',
      unlocked: badges.includes('ground_auditor')
    },
    {
      id: 'civic_sentinel',
      title: 'Civic Sentinel',
      desc: 'Reported 5+ verified infrastructure grievances',
      icon: Zap,
      color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/60 border-purple-300 dark:border-purple-800',
      unlocked: badges.includes('civic_sentinel')
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto transition-opacity">
      <div
        className="w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700/80 overflow-hidden flex flex-col my-auto transition-colors"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="p-4 bg-gradient-to-r from-blue-700 to-indigo-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-300 border border-white/20">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Civic Karma & Citizen Impact</h3>
              <p className="text-[11px] text-blue-200">Public contributions in Bengaluru wards</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 text-xs text-slate-800 dark:text-slate-200 overflow-y-auto">
          
          {/* Level & Points Banner */}
          <div className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-4.5 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                  Citizen Recognition Tier
                </span>
                <div className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <span>Level {level}: Active Ward Watchdog</span>
                  <span className="text-xs bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">
                    Tier {level}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">{points}</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-semibold">KARMA PTS</span>
              </div>
            </div>

            {/* Level Progress Bar */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                <span>Progress to Level {level + 1}</span>
                <span>{pointsToNextLevel} pts needed</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${currentLevelProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Activity Breakdown Metric Cards */}
          <div className="grid grid-cols-3 gap-2.5 text-center">
            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">{reportsCount}</span>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Issues Lodged</div>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">+50 pts each</span>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">{endorsementsCount}</span>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Endorsements</div>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">+10 pts each</span>
            </div>

            <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/40">
              <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">{verificationsCount}</span>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Fixes Audited</div>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">+30 pts each</span>
            </div>
          </div>

          {/* Badges Collection */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-xs flex items-center justify-between">
              <span>Earned Civic Badges</span>
              <span className="text-slate-400 text-[11px] font-normal">
                {badges.length} of {ALL_BADGES.length} unlocked
              </span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ALL_BADGES.map((b) => {
                const Icon = b.icon;
                return (
                  <div
                    key={b.id}
                    className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${
                      b.unlocked
                        ? 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-xs'
                        : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 opacity-50'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${b.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 dark:text-slate-100 text-xs flex items-center gap-1.5">
                        <span>{b.title}</span>
                        {b.unlocked && <span className="text-[9px] text-emerald-600 font-bold">✓ Active</span>}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                        {b.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Community Impact Callout */}
          <div className="bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 rounded-xl p-3 flex items-center gap-3">
            <span className="text-xl">🌟</span>
            <div className="text-[11px] text-blue-900 dark:text-blue-200 leading-snug">
              <strong>Ward Redressal Impact:</strong> Your active reporting has helped BBMP crews locate and resolve road and drainage hazards faster.
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end">
          <button
            onClick={onClose}
            className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-200 font-semibold px-4 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
