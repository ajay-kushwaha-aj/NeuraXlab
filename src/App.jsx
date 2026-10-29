import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResearchPage from './pages/ResearchPage';
import TeamPage from './pages/TeamPage';
import ResearchArticlesPage from './pages/ResearchArticlesPage';
import ActivitiesPage from './pages/ActivitiesPage';
import OpportunitiesContactPage from './pages/OpportunitiesContactPage';
import AdminPortal from './cms/AdminPortal';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './cms/context/AuthContext';
import { CMSProvider } from './cms/context/CMSContext';

function AppContent() {
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/admin') || hash.startsWith('#admin')) {
        return 'admin';
      }
    }
    return 'home';
  });

  const [activeSubSection, setActiveSubSection] = useState(null);

  // Sync browser URL / Hash navigation
  useEffect(() => {
    const handleUrlChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path.startsWith('/admin') || hash.startsWith('#admin')) {
        setActiveTab('admin');
      } else if (activeTab === 'admin') {
        setActiveTab('home');
      }
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [activeTab]);

  // Handle Tab changes and smooth scrolling
  const handleTabChange = (tabId, sectionId = null) => {
    setActiveTab(tabId);
    if (tabId === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
    } else {
      if (window.location.pathname.startsWith('/admin')) {
        window.history.pushState(null, '', '/');
      }
    }

    if (sectionId) {
      setActiveSubSection(sectionId);
      if (sectionId === 'group-leader' || sectionId === 'team-roster') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setTimeout(() => {
          const elem = document.getElementById(sectionId);
          if (elem) {
            elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 100);
      }
    } else {
      setActiveSubSection(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Scroll to top with smooth transition on view change unless sub-section scroll handled
  useEffect(() => {
    if (!activeSubSection && activeTab !== 'admin') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab, activeSubSection]);

  // If Admin Tab is active, render full-screen Admin Portal
  if (activeTab === 'admin') {
    return (
      <AdminPortal
        onBackToPublic={() => {
          handleTabChange('home');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0F2537]">
      {/* Institutional Top Ribbon, Brand Masthead & Dropdown Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleTabChange} 
        activeSubSection={activeSubSection}
        setActiveSubSection={setActiveSubSection}
      />

      {/* Main Dedicated Page Router */}
      <main className="flex-grow">
        <ErrorBoundary>
          {activeTab === 'home' && <HomePage setActiveTab={handleTabChange} />}
          {activeTab === 'research' && <ResearchPage setActiveTab={handleTabChange} />}
          {activeTab === 'team' && (
            <TeamPage
              setActiveTab={handleTabChange}
              activeSubSection={activeSubSection}
              setActiveSubSection={setActiveSubSection}
            />
          )}
          {(activeTab === 'articles' || activeTab === 'publications') && <ResearchArticlesPage />}
          {activeTab === 'activities' && <ActivitiesPage />}
          {activeTab === 'contact' && <OpportunitiesContactPage />}
        </ErrorBoundary>
      </main>

      {/* Institutional Academic Footer */}
      <Footer setActiveTab={handleTabChange} />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CMSProvider>
        <AppContent />
      </CMSProvider>
    </AuthProvider>
  );
}
