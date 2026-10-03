import React, { useState } from 'react';
import { useCivic } from '../context/CivicContext';
import {
  ShieldAlert,
  MapPin,
  ListFilter,
  PlusCircle,
  Bell,
  User,
  ShieldCheck,
  RotateCcw,
  Menu,
  X,
  Compass,
  LayoutDashboard
} from 'lucide-react';
import NotificationDrawer from './NotificationDrawer';

export default function Header() {
  const {
    role,
    setRole,
    activeTab,
    setActiveTab,
    setIsReportModalOpen,
    unreadNotifCount,
    resetToDefaultData,
    issues
  } = useCivic();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeReportsCount = issues.filter((i) => i.status !== 'Resolved').length;

  const handleRoleToggle = () => {
    if (role === 'citizen') {
      setRole('admin');
      setActiveTab('admin');
    } else {
      setRole('citizen');
      setActiveTab('feed');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md text-white border-b border-slate-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and Brand */}
            <div className="flex items-center gap-6">
              <div
                onClick={() => {
                  setActiveTab(role === 'admin' ? 'admin' : 'feed');
                }}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-900/40 group-hover:scale-105 transition-transform">
                  <ShieldAlert className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-xl tracking-tight text-white font-sans">
                      Civic<span className="text-teal-400">Fix</span>
                    </span>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      LIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                    Intelligent Municipal Resolution Platform
                  </p>
                </div>
              </div>

              {/* Main Navigation Desktop */}
              <nav className="hidden md:flex items-center gap-1 ml-4 bg-slate-800/60 p-1 rounded-xl border border-slate-700/60">
                <button
                  onClick={() => {
                    setActiveTab('feed');
                    if (role === 'admin') setRole('citizen');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'feed' && role === 'citizen'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <ListFilter className="w-3.5 h-3.5" />
                  <span>Public Feed</span>
                  <span className="bg-slate-900/70 text-teal-300 text-[10px] px-1.5 py-0.2 rounded-full font-mono">
                    {activeReportsCount}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('map');
                    if (role === 'admin') setRole('citizen');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'map' && role === 'citizen'
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Live Map Explorer</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('admin');
                    setRole('admin');
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    role === 'admin'
                      ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Admin Portal</span>
                  <span className="bg-amber-400/20 text-amber-200 text-[9px] px-1 py-0.2 rounded uppercase font-bold tracking-wider">
                    Ops
                  </span>
                </button>
              </nav>
            </div>

            {/* Right Action Items */}
            <div className="flex items-center gap-2.5 sm:gap-3.5">
              {/* Role Switcher Pill */}
              <div className="hidden lg:flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700">
                <button
                  onClick={() => {
                    setRole('citizen');
                    if (activeTab === 'admin') setActiveTab('feed');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    role === 'citizen'
                      ? 'bg-slate-900 text-teal-300 shadow font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  Citizen
                </button>
                <button
                  onClick={() => {
                    setRole('admin');
                    setActiveTab('admin');
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    role === 'admin'
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                </button>
              </div>

              {/* Reset Demo Data Helper */}
              <button
                onClick={resetToDefaultData}
                title="Reset sample data"
                className="hidden sm:flex items-center text-slate-400 hover:text-slate-200 p-2 rounded-lg hover:bg-slate-800 transition-colors text-xs"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              {/* Notification Bell */}
              <button
                onClick={() => setIsNotifOpen(true)}
                className="relative p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-[10px] font-bold text-white rounded-full flex items-center justify-center animate-bounce">
                    {unreadNotifCount}
                  </span>
                )}
              </button>

              {/* Report Issue CTA Button */}
              <button
                onClick={() => setIsReportModalOpen(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm px-3.5 sm:px-4 py-2 rounded-xl shadow-lg shadow-teal-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report Issue</span>
              </button>

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-slate-900 px-4 pt-3 pb-5 space-y-2">
            <button
              onClick={() => {
                setActiveTab('feed');
                setRole('citizen');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === 'feed' ? 'bg-teal-600 text-white' : 'text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <ListFilter className="w-4 h-4" />
                <span>Public Feed</span>
              </div>
              <span className="text-xs bg-slate-800 px-2 py-0.5 rounded-full">{issues.length}</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('map');
                setRole('citizen');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium ${
                activeTab === 'map' ? 'bg-teal-600 text-white' : 'text-slate-300'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Live Map Explorer</span>
            </button>

            <button
              onClick={() => {
                setActiveTab('admin');
                setRole('admin');
                setMobileMenuOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium ${
                role === 'admin' ? 'bg-amber-600 text-white' : 'text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                <span>Municipal Admin Portal</span>
              </div>
              <span className="text-xs bg-amber-500/30 text-amber-200 px-2 py-0.5 rounded-full">Staff</span>
            </button>

            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400">Current Role Mode:</span>
              <button
                onClick={handleRoleToggle}
                className="text-xs font-bold px-3 py-1 rounded-lg bg-slate-800 text-teal-400 border border-slate-700"
              >
                Switch to {role === 'citizen' ? 'Admin Ops' : 'Citizen'}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Slide-out Notification Drawer */}
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
}
