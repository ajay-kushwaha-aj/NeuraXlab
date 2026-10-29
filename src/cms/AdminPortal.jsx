import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import AdminLogin from './pages/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AnnouncementsAdmin from './pages/AnnouncementsAdmin';
import ResearchAreasAdmin from './pages/ResearchAreasAdmin';
import ProjectsAdmin from './pages/ProjectsAdmin';
import PublicationsAdmin from './pages/PublicationsAdmin';
import TeamAdmin from './pages/TeamAdmin';
import MediaAdmin from './pages/MediaAdmin';
import EventsAdmin from './pages/EventsAdmin';
import OpportunitiesAdmin from './pages/OpportunitiesAdmin';
import SiteSettingsAdmin from './pages/SiteSettingsAdmin';
import AuditLogsAdmin from './pages/AuditLogsAdmin';
import UsersAdmin from './pages/UsersAdmin';
import DatabaseAdmin from './pages/DatabaseAdmin';

export default function AdminPortal({ onBackToPublic }) {
  const { isAuthenticated, loading } = useAuth();
  const [activeModule, setActiveModule] = useState('overview');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F2537] flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-3 border-[#E0B84C] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-mono text-[#E0B84C]">Initializing Secure Admin Environment...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => setActiveModule('overview')}
        onBackToPublic={onBackToPublic}
      />
    );
  }

  return (
    <AdminLayout
      activeModule={activeModule}
      setActiveModule={setActiveModule}
      onNavigatePublic={onBackToPublic}
    >
      {activeModule === 'overview' && (
        <AdminDashboard onNavigateModule={setActiveModule} />
      )}
      {activeModule === 'announcements' && <AnnouncementsAdmin />}
      {activeModule === 'areas' && <ResearchAreasAdmin />}
      {activeModule === 'projects' && <ProjectsAdmin />}
      {activeModule === 'publications' && <PublicationsAdmin />}
      {activeModule === 'team' && <TeamAdmin />}
      {activeModule === 'media' && <MediaAdmin />}
      {activeModule === 'events' && <EventsAdmin />}
      {activeModule === 'opportunities' && <OpportunitiesAdmin />}
      {activeModule === 'settings' && <SiteSettingsAdmin />}
      {activeModule === 'audit' && <AuditLogsAdmin />}
      {activeModule === 'users' && <UsersAdmin />}
      {activeModule === 'backup' && <DatabaseAdmin />}
    </AdminLayout>
  );
}

