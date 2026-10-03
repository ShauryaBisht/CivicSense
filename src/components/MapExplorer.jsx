import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import { CATEGORIES, URGENCIES } from '../data/mockIssues';
import InteractiveMap from './InteractiveMap';
import {
  Compass,
  Filter,
  Search,
  ThumbsUp,
  MapPin,
  Clock,
  ChevronRight,
  ShieldAlert,
  Plus
} from 'lucide-react';

export default function MapExplorer() {
  const {
    issues,
    filter,
    setFilter,
    setSelectedIssue,
    upvoteIssue,
    setIsReportModalOpen
  } = useCivic();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUrgency, setSelectedUrgency] = useState('All');
  const [mapSearch, setMapSearch] = useState('');

  const mapIssues = issues.filter((issue) => {
    if (selectedCategory !== 'All' && issue.category !== selectedCategory) return false;
    if (selectedUrgency !== 'All' && issue.urgency !== selectedUrgency) return false;
    if (mapSearch.trim()) {
      const q = mapSearch.toLowerCase();
      const matches =
        issue.title.toLowerCase().includes(q) ||
        issue.ticketId.toLowerCase().includes(q) ||
        issue.location.address.toLowerCase().includes(q);
      if (!matches) return false;
    }
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Top Map Filter Controls */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-slate-900">Metropolitan Incident Heatmap</h2>
            <p className="text-[11px] text-slate-500">Live GPS tracking across all city sectors</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={mapSearch}
              onChange={(e) => setMapSearch(e.target.value)}
              placeholder="Search location or title..."
              className="w-full text-xs pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedUrgency}
            onChange={(e) => setSelectedUrgency(e.target.value)}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-slate-200 bg-white"
          >
            <option value="All">All Urgencies</option>
            {URGENCIES.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>

          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Pin Incident</span>
          </button>
        </div>
      </div>

      {/* Main Map + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[720px]">
        {/* Left Sidebar List */}
        <div className="hidden lg:flex lg:col-span-4 flex-col bg-white rounded-3xl border border-slate-200 p-4 shadow-sm h-full overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
            <span className="font-bold text-slate-800">
              Showing {mapIssues.length} Incidents
            </span>
            <span className="text-[11px] text-teal-600 font-semibold">
              Live Coordinates
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pt-3 pr-1">
            {mapIssues.map((issue) => (
              <div
                key={issue.id}
                onClick={() => setSelectedIssue(issue)}
                className="p-3 rounded-2xl border border-slate-100 bg-slate-50/70 hover:bg-teal-50/60 hover:border-teal-200 cursor-pointer transition-all space-y-2 group"
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className="font-mono font-bold text-slate-700 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {issue.ticketId}
                  </span>
                  <span
                    className={`font-bold px-1.5 py-0.2 rounded text-white ${
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

                <h4 className="font-bold text-xs text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1">
                  {issue.title}
                </h4>

                <div className="text-[11px] text-slate-500 flex items-center gap-1 truncate">
                  <MapPin className="w-3 h-3 text-teal-600 flex-shrink-0" />
                  <span className="truncate">{issue.location.address}</span>
                </div>

                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                  <span>▲ {issue.upvotes} endorsements</span>
                  <span className="text-teal-700 font-bold group-hover:translate-x-0.5 transition-transform">
                    Inspect Pin →
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Map Canvas */}
        <div className="col-span-12 lg:col-span-8 h-full rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <InteractiveMap
            issues={mapIssues}
            mode="explorer"
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            height="100%"
          />
        </div>
      </div>
    </div>
  );
}
