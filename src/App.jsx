import React from 'react';
import { CivicProvider, useCivic } from './context/CivicContext';
import Header from './components/Header';
import CitizenFeed from './components/CitizenFeed';
import MapExplorer from './components/MapExplorer';
import AdminDashboard from './components/AdminDashboard';
import ReportWizardModal from './components/ReportWizardModal';
import IssueDetailModal from './components/IssueDetailModal';
import ToastContainer from './components/ToastContainer';
import Footer from './components/Footer';

function MainLayout() {
  const {
    activeTab,
    isReportModalOpen,
    setIsReportModalOpen,
    selectedIssue,
    setSelectedIssue
  } = useCivic();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Global Header & Nav */}
      <Header />

      {/* Main View Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'feed' && <CitizenFeed />}
        {activeTab === 'map' && <MapExplorer />}
        {activeTab === 'admin' && <AdminDashboard />}
      </main>

      {/* Global Modals */}
      <ReportWizardModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
      />

      {selectedIssue && (
        <IssueDetailModal
          issue={selectedIssue}
          onClose={() => setSelectedIssue(null)}
        />
      )}

      {/* Floating Alerts Container */}
      <ToastContainer />

      {/* Trust & Transparency Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CivicProvider>
      <MainLayout />
    </CivicProvider>
  );
}
