import React, { useState, useMemo } from 'react';
import { useCivic } from '../context/CivicContext';
import { CATEGORIES, URGENCIES, STATUSES } from '../data/mockIssues';
import InteractiveMap from './InteractiveMap';
import {
  Search,
  SlidersHorizontal,
  ThumbsUp,
  MapPin,
  Clock,
  MessageSquare,
  ShieldAlert,
  CheckCircle2,
  Sparkles,
  LayoutGrid,
  Map as MapIcon,
  Columns,
  ArrowUpRight,
  Filter,
  Check,
  ChevronDown,
  PhoneCall
} from 'lucide-react';

export default function CitizenFeed() {
  const {
    issues,
    filter,
    setFilter,
    setSelectedIssue,
    upvoteIssue,
    setIsReportModalOpen
  } = useCivic();

  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'map' | 'split'

  // Filter & Search Logic
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      // 1. Search Query
      if (filter.search.trim()) {
        const query = filter.search.toLowerCase();
        const matchesTitle = issue.title.toLowerCase().includes(query);
        const matchesDesc = issue.description.toLowerCase().includes(query);
        const matchesTicket = issue.ticketId.toLowerCase().includes(query);
        const matchesLoc = (
          (issue.location.address || '') +
          ' ' +
          (issue.location.neighborhood || '')
        )
          .toLowerCase()
          .includes(query);

        if (!matchesTitle && !matchesDesc && !matchesTicket && !matchesLoc) {
          return false;
        }
      }

      // 2. Category Filter
      if (filter.category !== 'All' && issue.category !== filter.category) {
        return false;
      }

      // 3. Urgency Filter
      if (filter.urgency !== 'All' && issue.urgency !== filter.urgency) {
        return false;
      }

      // 4. Status Filter
      if (filter.status !== 'All' && issue.status !== filter.status) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filter.sortBy === 'upvotes') {
        return b.upvotes - a.upvotes;
      }
      if (filter.sortBy === 'newest') {
        return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
      }
      if (filter.sortBy === 'urgency') {
        const priorityOrder = { Emergency: 4, High: 3, Medium: 2, Low: 1 };
        return (priorityOrder[b.urgency] || 0) - (priorityOrder[a.urgency] || 0);
      }
      return 0;
    });
  }, [issues, filter]);

  // Aggregate Stats
  const totalReports = issues.length;
  const resolvedCount = issues.filter((i) => i.status === 'Resolved').length;
  const activeEmergencies = issues.filter(
    (i) => i.urgency === 'Emergency' && i.status !== 'Resolved'
  ).length;
  const totalUpvotes = issues.reduce((acc, curr) => acc + (curr.upvotes || 0), 0);

  return (
    <div className="space-y-6">
      {/* Hero Quick Stats Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-850 to-slate-900 border border-slate-800 text-white p-6 sm:p-8 shadow-xl">
        {/* Subtle decorative grid/glow */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              Community Civic Transparency Hub
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight">
              Report. Track. <span className="text-teal-400">Resolve Together.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              CivicFix bridges the gap between citizens and municipal maintenance crews. Log road damage, sanitation hazards, broken streetlights, and track live resolution proof.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3">
            <button
              onClick={() => setIsReportModalOpen(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-extrabold text-sm px-6 py-3 rounded-2xl shadow-xl shadow-teal-500/25 transition-all hover:scale-105 active:scale-95"
            >
              <Sparkles className="w-4 h-4" />
              <span>Report an Issue Now</span>
            </button>
          </div>
        </div>

        {/* Live Counters Metric Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60">
            <div className="text-[11px] font-semibold text-slate-400">Total Logged Incidents</div>
            <div className="text-2xl font-black text-white mt-1">{totalReports}</div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60">
            <div className="text-[11px] font-semibold text-slate-400">Active Emergencies</div>
            <div className="text-2xl font-black text-red-400 mt-1 flex items-center gap-1.5">
              <span>{activeEmergencies}</span>
              {activeEmergencies > 0 && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60">
            <div className="text-[11px] font-semibold text-slate-400">Resolved Rate</div>
            <div className="text-2xl font-black text-emerald-400 mt-1">
              {totalReports > 0 ? Math.round((resolvedCount / totalReports) * 100) : 0}%
            </div>
          </div>

          <div className="bg-slate-800/50 backdrop-blur-md p-3.5 rounded-2xl border border-slate-700/60">
            <div className="text-[11px] font-semibold text-slate-400">Citizen Endorsements</div>
            <div className="text-2xl font-black text-teal-400 mt-1">
              ▲ {totalUpvotes}
            </div>
          </div>
        </div>
      </div>

      {/* Control Toolbar: Search, Filters & View Toggle */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={filter.search}
              onChange={(e) => setFilter({ ...filter, search: e.target.value })}
              placeholder="Search by keywords, street address, or #CIVIC ticket ID..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 bg-slate-50/50"
            />
            {filter.search && (
              <button
                onClick={() => setFilter({ ...filter, search: '' })}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Dropdown Selectors */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Urgency Filter */}
            <select
              value={filter.urgency}
              onChange={(e) => setFilter({ ...filter, urgency: e.target.value })}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="All">All Urgencies</option>
              {URGENCIES.map((u) => (
                <option key={u} value={u}>
                  {u}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="All">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={filter.sortBy}
              onChange={(e) => setFilter({ ...filter, sortBy: e.target.value })}
              className="px-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="upvotes">▲ Most Endorsed</option>
              <option value="newest">🕒 Newest First</option>
              <option value="urgency">🚨 Highest Urgency</option>
            </select>

            {/* View Switcher (Grid vs Map vs Split) */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                onClick={() => setViewMode('grid')}
                title="Grid cards view"
                className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'grid'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('map')}
                title="Map view"
                className={`p-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'map'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <MapIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('split')}
                title="Split screen view"
                className={`hidden lg:block p-1.5 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'split'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <Columns className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 pt-1 scrollbar-none text-xs">
          <button
            onClick={() => setFilter({ ...filter, category: 'All' })}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition-all ${
              filter.category === 'All'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }`}
          >
            All Categories ({issues.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = issues.filter((i) => i.category === cat).length;
            const isSelected = filter.category === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter({ ...filter, category: cat })}
                className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    isSelected ? 'bg-teal-800 text-white' : 'bg-slate-200 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Rendering: Grid, Map or Split */}
      {viewMode === 'map' ? (
        <div className="h-[680px] rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <InteractiveMap
            issues={filteredIssues}
            mode="explorer"
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            height="100%"
          />
        </div>
      ) : viewMode === 'split' ? (
        <div className="grid grid-cols-12 gap-6 h-[720px]">
          {/* Left Feed Column */}
          <div className="col-span-5 h-full overflow-y-auto pr-2 space-y-4">
            {filteredIssues.map((issue) => (
              <IssueCard
                key={issue.id}
                issue={issue}
                onSelect={() => setSelectedIssue(issue)}
                onUpvote={() => upvoteIssue(issue.id)}
              />
            ))}
          </div>

          {/* Right Map Column */}
          <div className="col-span-7 h-full rounded-3xl overflow-hidden border border-slate-200 shadow-md">
            <InteractiveMap
              issues={filteredIssues}
              mode="explorer"
              onSelectIssue={(issue) => setSelectedIssue(issue)}
              height="100%"
            />
          </div>
        </div>
      ) : (
        /* Standard Grid View */
        <div className="space-y-4">
          {filteredIssues.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
              <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="font-bold text-slate-800 text-base">No Matching Civic Incidents</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No tickets match your active filter settings. Try relaxing search keywords or resetting filters.
              </p>
              <button
                onClick={() =>
                  setFilter({
                    search: '',
                    category: 'All',
                    urgency: 'All',
                    status: 'All',
                    sortBy: 'upvotes',
                    radiusKm: 15
                  })
                }
                className="text-xs font-bold text-teal-600 hover:text-teal-700 underline"
              >
                Reset all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredIssues.map((issue) => (
                <IssueCard
                  key={issue.id}
                  issue={issue}
                  onSelect={() => setSelectedIssue(issue)}
                  onUpvote={() => upvoteIssue(issue.id)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Single Issue Card Component
function IssueCard({ issue, onSelect, onUpvote }) {
  const isEmergency = issue.urgency === 'Emergency';
  const isHigh = issue.urgency === 'High';
  const isResolved = issue.status === 'Resolved';

  return (
    <div
      onClick={onSelect}
      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-0.5"
    >
      {/* Photo with Overlay Badges */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
        <img
          src={issue.mediaUrl}
          alt={issue.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-900/85 backdrop-blur-md text-white border border-slate-700/60 shadow-xs">
            {issue.ticketId}
          </span>
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-slate-800 shadow-xs">
            {issue.category}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span
            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md backdrop-blur-md flex items-center gap-1 ${
              isEmergency
                ? 'bg-red-600 text-white animate-pulse'
                : isHigh
                ? 'bg-amber-500 text-slate-900 font-extrabold'
                : 'bg-teal-600 text-white'
            }`}
          >
            {isEmergency && <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
            {issue.urgency}
          </span>
        </div>

        {/* Bottom Overlay: Status pill */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-xs">
          <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold shadow-xs backdrop-blur-md flex items-center gap-1 ${
              isResolved
                ? 'bg-emerald-500/90 text-white'
                : issue.status === 'In Progress'
                ? 'bg-blue-600/90 text-white'
                : 'bg-slate-800/90 text-teal-300'
            }`}
          >
            {isResolved && <CheckCircle2 className="w-3 h-3 text-white" />}
            {issue.status}
          </span>

          <span className="text-[10px] text-slate-300 font-medium">
            {new Date(issue.reportedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors line-clamp-1 leading-snug">
            {issue.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
            {issue.description}
          </p>
        </div>

        {/* Address & Assigned Info */}
        <div className="space-y-1.5 text-xs text-slate-500 pt-1 border-t border-slate-100">
          <div className="flex items-center gap-1.5 truncate">
            <MapPin className="w-3.5 h-3.5 text-teal-600 flex-shrink-0" />
            <span className="truncate">{issue.location.address}</span>
          </div>

          {issue.assignedTeam && (
            <div className="text-[11px] text-slate-600 font-medium truncate flex items-center gap-1">
              <span className="text-teal-700 font-semibold">Crew:</span>
              <span className="truncate">{issue.assignedTeam.name}</span>
            </div>
          )}
        </div>

        {/* Action Row: Upvote & View Details */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onUpvote();
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              issue.hasUpvoted
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-700'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${issue.hasUpvoted ? 'fill-current' : ''}`} />
            <span>{issue.upvotes}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              <span>{issue.comments?.length || 0}</span>
            </span>

            <span className="text-xs font-bold text-teal-700 group-hover:translate-x-0.5 transition-transform flex items-center">
              Details →
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
