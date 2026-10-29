import React, { useState } from 'react';
import {
  LayoutDashboard,
  Bell,
  Activity,
  FolderGit2,
  BookOpen,
  Users,
  Image as ImageIcon,
  Calendar,
  Briefcase,
  Settings,
  ShieldCheck,
  FileText,
  Database,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AdminLayout({
  activeModule,
  setActiveModule,
  onNavigatePublic,
  children
}) {
  const { user, logout, isSuperAdmin } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'announcements', label: 'Announcements & News', icon: Bell },
    { id: 'areas', label: 'Research Areas & Pillars', icon: Activity },
    { id: 'projects', label: 'Projects & Grants', icon: FolderGit2 },
    { id: 'publications', label: 'Publications & Articles', icon: BookOpen },
    { id: 'team', label: 'Team Members & PI', icon: Users },
    { id: 'media', label: 'Media Library & Gallery', icon: ImageIcon },
    { id: 'events', label: 'Activities & Events', icon: Calendar },
    { id: 'opportunities', label: 'Recruitment & Openings', icon: Briefcase },
    { id: 'settings', label: 'Site Settings & Homepage', icon: Settings },
    { id: 'audit', label: 'Audit Logs & History', icon: FileText },
    ...(isSuperAdmin ? [{ id: 'users', label: 'Administrators & Roles', icon: ShieldCheck }] : []),
    { id: 'backup', label: 'Database Backup & Sync', icon: Database }
  ];

  const currentItem = navigationItems.find(item => item.id === activeModule) || navigationItems[0];

  return (
    <div className="min-h-screen bg-[#F4F1EA] flex flex-col md:flex-row font-sans text-slate-800">
      {/* Mobile Top Navigation */}
      <div className="md:hidden bg-[#0F2537] text-white p-4 flex items-center justify-between border-b border-[#C59B27]/40 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs">
            <img src="/images/neuroxlab_logo.png" alt="NeuroXLab" className="w-full h-full object-contain" />
          </div>
          <span className="font-serif font-bold text-lg text-[#E0B84C]">NeuroXLab CMS</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Persistent Sidebar */}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-72 bg-[#0F2537] text-white flex flex-col justify-between border-r border-[#C59B27]/30 shadow-xl transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Masthead */}
          <div className="p-6 border-b border-white/10 bg-[#0A1A27]">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white p-1 border border-[#C59B27]/50 flex items-center justify-center shrink-0 shadow-sm">
                <img src="/images/neuroxlab_logo.png" alt="NeuroXLab" className="w-full h-full object-contain" />
              </div>
              <div className="min-w-0">
                <h1 className="font-serif font-bold text-lg text-white tracking-wide truncate">
                  NeuroXLab CMS
                </h1>
                <p className="text-[11px] font-mono text-[#E0B84C] truncate">
                  Univ. of Hyderabad
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin">
            <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold px-3 py-1.5">
              Content Modules
            </div>
            {navigationItems.map(item => {
              const Icon = item.icon;
              const isActive = activeModule === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveModule(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                    isActive
                      ? 'bg-[#8B1E24] text-white shadow-md font-bold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#E0B84C]' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Sidebar Footer: User Profile & Public Site */}
          <div className="p-4 border-t border-white/10 bg-[#0A1A27] space-y-3">
            <button
              onClick={onNavigatePublic}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-[#E0B84C] bg-white/5 hover:bg-white/10 border border-[#C59B27]/40 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Public Website</span>
            </button>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-full bg-[#8B1E24] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  {user?.fullName?.charAt(0) || 'A'}
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-white truncate">{user?.fullName || 'Administrator'}</p>
                  <span className="text-[10px] font-mono text-[#E0B84C] uppercase tracking-wider block">
                    {user?.role === 'super_admin' ? 'Super Admin' : 'Editor'}
                  </span>
                </div>
              </div>

              <button
                onClick={logout}
                title="Sign Out"
                className="p-2 text-slate-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-xs border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
            <span className="text-slate-400 font-mono text-xs">CMS</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-bold text-[#0F2537] font-serif text-base sm:text-lg">
              {currentItem.label}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold bg-[#FAF8F5] text-slate-700 border border-slate-200">
              <UserCheck className="w-3.5 h-3.5 text-[#8B1E24]" />
              <span>{user?.email}</span>
            </div>

            <button
              onClick={onNavigatePublic}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#0F2537] bg-[#FAF8F5] hover:bg-slate-200 border border-slate-300 transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#8B1E24]" />
              <span className="hidden sm:inline">Live Website</span>
            </button>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {children}
        </main>
      </div>
    </div>
  );
}

