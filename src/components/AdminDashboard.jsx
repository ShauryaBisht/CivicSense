import React, { useState, useMemo } from 'react';
import { useCivic } from '../context/CivicContext';
import { DEPARTMENTS, CATEGORIES, URGENCIES, STATUSES } from '../data/mockIssues';
import InteractiveMap from './InteractiveMap';
import AdminManageDrawer from './AdminManageDrawer';
import {
  ShieldAlert,
  Kanban,
  Table as TableIcon,
  Map as MapIcon,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Users,
  Building2,
  Download,
  Filter,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  PhoneCall,
  SlidersHorizontal,
  Plus
} from 'lucide-react';

export default function AdminDashboard() {
  const {
    issues,
    updateIssueStatus,
    setSelectedIssue,
    selectedForManage,
    setSelectedForManage,
    addToast
  } = useCivic();

  const [adminView, setAdminView] = useState('kanban'); // 'kanban' | 'table' | 'map'
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Key Metrics
  const totalIssues = issues.length;
  const activeIssues = issues.filter((i) => i.status !== 'Resolved').length;
  const resolvedIssues = issues.filter((i) => i.status === 'Resolved').length;
  const emergencyIssues = issues.filter((i) => i.urgency === 'Emergency' && i.status !== 'Resolved');
  const highPriorityIssues = issues.filter((i) => i.urgency === 'High' && i.status !== 'Resolved');

  // Filtered Issues for table / kanban
  const displayedIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (selectedDeptFilter !== 'All' && issue.department !== selectedDeptFilter) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = issue.title.toLowerCase().includes(q);
        const matchesTicket = issue.ticketId.toLowerCase().includes(q);
        const matchesAddress = (issue.location.address || '').toLowerCase().includes(q);
        if (!matchesTitle && !matchesTicket && !matchesAddress) return false;
      }
      return true;
    });
  }, [issues, selectedDeptFilter, searchQuery]);

  // Export Table Data to CSV
  const handleExportCsv = () => {
    const headers = ['Ticket ID', 'Title', 'Category', 'Urgency', 'Status', 'Department', 'Address', 'Reported At'];
    const rows = displayedIssues.map((i) => [
      i.ticketId,
      `"${i.title.replace(/"/g, '""')}"`,
      i.category,
      i.urgency,
      i.status,
      `"${i.department}"`,
      `"${i.location.address}"`,
      i.reportedAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `civicfix_work_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    addToast('Work orders exported to CSV successfully.', 'success');
  };

  // Department Workload calculations
  const deptWorkload = useMemo(() => {
    return DEPARTMENTS.map((dept) => {
      const deptIssues = issues.filter((i) => i.department === dept);
      const active = deptIssues.filter((i) => i.status !== 'Resolved').length;
      const emergency = deptIssues.filter((i) => i.urgency === 'Emergency' && i.status !== 'Resolved').length;
      return {
        department: dept,
        total: deptIssues.length,
        active,
        emergency
      };
    });
  }, [issues]);

  return (
    <div className="space-y-6">
      {/* Admin Command Header & Stats */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                Municipal Operations Command Center
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              Field Triage & Work Order Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Real-time telemetry, automated ticket routing, workforce allocation, and resolution compliance audit.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCsv}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => {
                if (emergencyIssues.length > 0) {
                  setSelectedForManage(emergencyIssues[0]);
                } else {
                  addToast('No emergency alerts pending dispatch!', 'info');
                }
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-lg shadow-red-900/30"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Emergency Dispatch ({emergencyIssues.length})</span>
            </button>
          </div>
        </div>

        {/* Command Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mt-6 pt-6 border-t border-slate-800">
          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400">Total Incidents</span>
            <div className="text-2xl font-black text-white mt-1">{totalIssues}</div>
            <span className="text-[10px] text-teal-400 font-medium">All municipal wards</span>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400">Active Work Orders</span>
            <div className="text-2xl font-black text-amber-400 mt-1">{activeIssues}</div>
            <span className="text-[10px] text-amber-300 font-medium">In triage or field action</span>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400">Code Crimson Alerts</span>
            <div className="text-2xl font-black text-red-400 mt-1 flex items-center gap-1.5">
              <span>{emergencyIssues.length}</span>
              {emergencyIssues.length > 0 && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
            </div>
            <span className="text-[10px] text-red-300 font-medium">Immediate dispatch required</span>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60">
            <span className="text-[11px] font-semibold text-slate-400">Resolved Today</span>
            <div className="text-2xl font-black text-emerald-400 mt-1">{resolvedIssues}</div>
            <span className="text-[10px] text-emerald-300 font-medium">
              {Math.round((resolvedIssues / (totalIssues || 1)) * 100)}% SLA completion rate
            </span>
          </div>

          <div className="bg-slate-800/60 p-3.5 rounded-2xl border border-slate-700/60 col-span-2 lg:col-span-1">
            <span className="text-[11px] font-semibold text-slate-400">Avg. Turnaround</span>
            <div className="text-2xl font-black text-teal-300 mt-1">26.4 hrs</div>
            <span className="text-[10px] text-teal-400 font-medium">-18% faster than SLA target</span>
          </div>
        </div>
      </div>

      {/* Code Crimson Emergency Alert Banner */}
      {emergencyIssues.length > 0 && (
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 text-white rounded-2xl p-4 shadow-lg shadow-red-600/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-sm">
                CRITICAL SAFETY ALERT: {emergencyIssues.length} Emergency Hazard(s) Active
              </div>
              <div className="text-xs text-red-100 line-clamp-1">
                {emergencyIssues.map((e) => `${e.ticketId}: ${e.title}`).join(' | ')}
              </div>
            </div>
          </div>
          <button
            onClick={() => setSelectedForManage(emergencyIssues[0])}
            className="self-start sm:self-auto bg-white text-red-700 hover:bg-red-50 text-xs font-black px-4 py-2 rounded-xl transition-all shadow-md whitespace-nowrap"
          >
            Dispatch First Emergency →
          </button>
        </div>
      )}

      {/* Department Workload Summary Bars */}
      <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-teal-600" />
            <span>Department Load & Capacity Allocation</span>
          </h3>
          <span className="text-xs text-slate-500">6 Municipal Agencies</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {deptWorkload.map((dept) => {
            const percentage = Math.min(100, dept.active * 25);
            return (
              <div
                key={dept.department}
                className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800 truncate" title={dept.department}>
                    {dept.department.replace('Department of ', '')}
                  </span>
                  <span className="font-bold text-slate-600">{dept.active} Active</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      dept.emergency > 0
                        ? 'bg-red-500'
                        : dept.active > 2
                        ? 'bg-amber-500'
                        : 'bg-teal-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>{dept.total} Total Logged</span>
                  {dept.emergency > 0 && (
                    <span className="text-red-600 font-bold">🚨 {dept.emergency} Emergency</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View Toolbar: Kanban vs Table vs Map & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2 flex-1">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search work orders..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Department Filter */}
          <select
            value={selectedDeptFilter}
            onChange={(e) => setSelectedDeptFilter(e.target.value)}
            className="text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700"
          >
            <option value="All">All Departments</option>
            {DEPARTMENTS.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* View Switcher */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-end sm:self-auto">
          <button
            onClick={() => setAdminView('kanban')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              adminView === 'kanban'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" />
            <span>Kanban Board</span>
          </button>
          <button
            onClick={() => setAdminView('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              adminView === 'table'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <TableIcon className="w-3.5 h-3.5" />
            <span>Data Table</span>
          </button>
          <button
            onClick={() => setAdminView('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              adminView === 'map'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            <span>Tactical Map</span>
          </button>
        </div>
      </div>

      {/* ADMIN CONTENT: KANBAN vs TABLE vs MAP */}
      {adminView === 'kanban' ? (
        /* KANBAN BOARD */
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {STATUSES.map((statusColumn) => {
            const columnTickets = displayedIssues.filter((i) => i.status === statusColumn);

            let headerBg = 'bg-slate-100 text-slate-800 border-slate-200';
            if (statusColumn === 'Submitted') headerBg = 'bg-purple-50 text-purple-900 border-purple-200';
            if (statusColumn === 'Under Review') headerBg = 'bg-blue-50 text-blue-900 border-blue-200';
            if (statusColumn === 'Assigned') headerBg = 'bg-amber-50 text-amber-900 border-amber-200';
            if (statusColumn === 'In Progress') headerBg = 'bg-teal-50 text-teal-900 border-teal-200';
            if (statusColumn === 'Resolved') headerBg = 'bg-emerald-50 text-emerald-900 border-emerald-200';

            return (
              <div
                key={statusColumn}
                className="bg-slate-100/70 rounded-2xl p-3 border border-slate-200/80 flex flex-col min-w-[240px]"
              >
                {/* Column Header */}
                <div className={`p-2.5 rounded-xl border font-bold text-xs flex items-center justify-between mb-3 ${headerBg}`}>
                  <span>{statusColumn}</span>
                  <span className="font-mono text-[11px] px-1.5 py-0.2 rounded-full bg-white/80">
                    {columnTickets.length}
                  </span>
                </div>

                {/* Cards Container */}
                <div className="space-y-3 flex-1 overflow-y-auto max-h-[640px] pr-1">
                  {columnTickets.length === 0 ? (
                    <div className="text-center py-8 text-xs text-slate-400 italic">
                      No tickets in {statusColumn}
                    </div>
                  ) : (
                    columnTickets.map((issue) => (
                      <div
                        key={issue.id}
                        className="bg-white rounded-xl border border-slate-200 p-3 shadow-xs hover:shadow-md transition-shadow space-y-2 group"
                      >
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">
                            {issue.ticketId}
                          </span>
                          <span
                            className={`font-bold px-1.5 py-0.2 rounded ${
                              issue.urgency === 'Emergency'
                                ? 'bg-red-100 text-red-700 animate-pulse'
                                : issue.urgency === 'High'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-teal-100 text-teal-800'
                            }`}
                          >
                            {issue.urgency}
                          </span>
                        </div>

                        <h4
                          onClick={() => setSelectedIssue(issue)}
                          className="font-bold text-xs text-slate-900 line-clamp-2 hover:text-teal-700 cursor-pointer"
                        >
                          {issue.title}
                        </h4>

                        <div className="text-[11px] text-slate-500 truncate">
                          📍 {issue.location.neighborhood}
                        </div>

                        {issue.assignedTeam && (
                          <div className="text-[10px] text-teal-700 font-semibold bg-teal-50 p-1.5 rounded-lg truncate">
                            👷 {issue.assignedTeam.name}
                          </div>
                        )}

                        {/* Quick Action Footer */}
                        <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                          <button
                            onClick={() => setSelectedIssue(issue)}
                            className="text-[11px] font-semibold text-slate-500 hover:text-slate-800"
                          >
                            View
                          </button>

                          <button
                            onClick={() => setSelectedForManage(issue)}
                            className="text-[11px] font-bold text-amber-600 hover:text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded transition-colors"
                          >
                            Manage →
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : adminView === 'table' ? (
        /* DATA TABLE VIEW */
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-4">Ticket</th>
                  <th className="p-4">Incident Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Urgency</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Department & Crew</th>
                  <th className="p-4">Reported</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {displayedIssues.map((issue) => (
                  <tr key={issue.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                      {issue.ticketId}
                    </td>
                    <td className="p-4 max-w-xs">
                      <div
                        onClick={() => setSelectedIssue(issue)}
                        className="font-bold text-slate-900 hover:text-teal-700 cursor-pointer line-clamp-1"
                      >
                        {issue.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {issue.location.address}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap font-medium text-slate-700">
                      {issue.category}
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span
                        className={`font-bold px-2 py-0.5 rounded text-[10px] text-white ${
                          issue.urgency === 'Emergency'
                            ? 'bg-red-600 animate-pulse'
                            : issue.urgency === 'High'
                            ? 'bg-amber-500'
                            : 'bg-teal-600'
                        }`}
                      >
                        {issue.urgency}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <select
                        value={issue.status}
                        onChange={(e) => updateIssueStatus(issue.id, e.target.value)}
                        className="text-xs font-semibold px-2 py-1 rounded-lg border border-slate-300 bg-white"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <div className="font-semibold text-slate-800 text-[11px]">
                        {issue.department.replace('Department of ', '')}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {issue.assignedTeam?.leadWorker || 'Unassigned'}
                      </div>
                    </td>
                    <td className="p-4 whitespace-nowrap text-slate-500">
                      {new Date(issue.reportedAt).toLocaleDateString()}
                    </td>
                    <td className="p-4 whitespace-nowrap text-right space-x-2">
                      <button
                        onClick={() => setSelectedIssue(issue)}
                        className="text-xs font-bold text-slate-600 hover:text-slate-900 underline"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => setSelectedForManage(issue)}
                        className="text-xs font-bold text-amber-600 hover:text-amber-800 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
                      >
                        Dispatch
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* TACTICAL MAP VIEW */
        <div className="h-[680px] rounded-3xl overflow-hidden border border-slate-200 shadow-md">
          <InteractiveMap
            issues={displayedIssues}
            mode="explorer"
            onSelectIssue={(issue) => setSelectedIssue(issue)}
            height="100%"
          />
        </div>
      )}

      {/* Admin Manage Drawer */}
      {selectedForManage && (
        <AdminManageDrawer
          issue={selectedForManage}
          onClose={() => setSelectedForManage(null)}
        />
      )}
    </div>
  );
}
