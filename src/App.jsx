import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ResearchView from './views/ResearchView';
import TeamPage from './pages/TeamPage';
import ResearchArticlesPage from './pages/ResearchArticlesPage';
import PublicationsPage from './pages/PublicationsPage';
import ActivitiesPage from './pages/ActivitiesPage';
import OpportunitiesContactPage from './pages/OpportunitiesContactPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [activeSubSection, setActiveSubSection] = useState(null);

  // Scroll to top with smooth transition on view change unless sub-section scroll handled
  useEffect(() => {
    if (!activeSubSection) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#0F2537]">
      {/* Institutional Top Ribbon, Brand Masthead & Dropdown Navigation */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        activeSubSection={activeSubSection}
        setActiveSubSection={setActiveSubSection}
      />

      {/* Main Dedicated Page Router */}
      <main className="flex-grow">
        {activeTab === 'home' && <HomePage setActiveTab={setActiveTab} />}
        {activeTab === 'research' && <ResearchView setActiveTab={setActiveTab} />}
        {activeTab === 'team' && <TeamPage setActiveTab={setActiveTab} />}
        {activeTab === 'articles' && <ResearchArticlesPage />}
        {activeTab === 'publications' && <PublicationsPage />}
        {activeTab === 'activities' && <ActivitiesPage />}
        {activeTab === 'contact' && <OpportunitiesContactPage />}
      </main>

      {/* Institutional Academic Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
