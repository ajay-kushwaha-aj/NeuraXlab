import React, { useState, useEffect } from 'react';
import {
  Bell,
  BookOpen,
  FolderGit2,
  Users,
  Image as ImageIcon,
  Calendar,
  Briefcase,
  FileCheck2,
  FileClock,
  ArrowRight,
  Database,
  PlusCircle,
  Clock,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { formatDateTime } from '../utils/formatters';

export default function AdminDashboard({ onNavigateModule }) {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadMetrics();
  }, []);

  const loadMetrics = async () => {
    setLoading(true);
    try {
      const data = await cmsService.getDashboardMetrics();
      setMetrics(data);
    } catch (err) {
      console.warn('Failed to load dashboard metrics:', err);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Published Content',
      value: metrics?.publishedCount ?? 0,
      sub: 'Live on public website',
      icon: FileCheck2,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      border: 'border-emerald-200'
    },
    {
      title: 'Pending Drafts',
      value: metrics?.draftCount ?? 0,
      sub: 'Awaiting publication',
      icon: FileClock,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      border: 'border-amber-200'
    },
    {
      title: 'Active Projects',
      value: metrics?.activeProjectsCount ?? 0,
      sub: 'Funded research grants',
      icon: FolderGit2,
      color: 'text-[#8B1E24]',
      bg: 'bg-red-50',
      border: 'border-red-200',
      action: () => onNavigateModule('projects')
    },
    {
      title: 'Publications',
      value: metrics?.publicationsCount ?? 0,
      sub: 'Articles & chapters',
      icon: BookOpen,
      color: 'text-indigo-700',
      bg: 'bg-indigo-50',
      border: 'border-indigo-200',
      action: () => onNavigateModule('publications')
    },
    {
      title: 'Team Researchers',
      value: metrics?.teamMembersCount ?? 0,
      sub: `+ ${metrics?.alumniCount ?? 0} alumni`,
      icon: Users,
      color: 'text-sky-700',
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      action: () => onNavigateModule('team')
    },
    {
      title: 'Media Assets',
      value: metrics?.mediaCount ?? 0,
      sub: 'Figures & portraits',
      icon: ImageIcon,
      color: 'text-teal-700',
      bg: 'bg-teal-50',
      border: 'border-teal-200',
      action: () => onNavigateModule('media')
    },
    {
      title: 'Upcoming Events',
      value: metrics?.upcomingEventsCount ?? 0,
      sub: 'Conferences & talks',
      icon: Calendar,
      color: 'text-purple-700',
      bg: 'bg-purple-50',
      border: 'border-purple-200',
      action: () => onNavigateModule('events')
    },
    {
      title: 'Open Opportunities',
      value: metrics?.openOpportunitiesCount ?? 0,
      sub: 'Active recruitment',
      icon: Briefcase,
      color: 'text-amber-800',
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      action: () => onNavigateModule('opportunities')
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0F2537] to-[#142E44] rounded-3xl p-6 sm:p-8 text-white border-2 border-[#C59B27]/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E0B84C] text-xs font-mono font-semibold border border-white/15">
            <ShieldCheck className="w-3.5 h-3.5 text-[#E0B84C]" />
            <span>CENTRAL ADMINISTRATIVE CONSOLE</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight">
            NeuroXLab Content Management System
          </h2>
          <p className="text-white/80 text-xs sm:text-sm font-sans leading-relaxed">
            Manage announcements, research projects, publications, team dossiers, media library, and homepage content. Approved updates appear immediately across the public website.
          </p>
        </div>

        {/* Database Status Badge */}
        <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/20 text-xs space-y-1.5 shrink-0 min-w-[220px]">
          <div className="flex items-center gap-2 font-mono font-bold text-[#E0B84C] uppercase text-[11px]">
            <Database className="w-3.5 h-3.5" />
            <span>Database Backend:</span>
          </div>
          <p className="text-white font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{isSupabaseConfigured ? 'Supabase PostgreSQL' : 'Local Persistent Engine (IndexedDB)'}</span>
          </p>
          <p className="text-[10px] text-white/60">
            {isSupabaseConfigured ? 'Cloud synchronized' : 'Zero-dependency local persistence'}
          </p>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-bold text-[#0F2537]">
          Quick Administrative Actions
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          <button
            onClick={() => onNavigateModule('announcements')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#8B1E24] shadow-xs hover:shadow-md transition-all group flex flex-col items-center text-center space-y-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1E24] group-hover:bg-[#8B1E24] group-hover:text-white transition-colors flex items-center justify-center">
              <Bell className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0F2537] group-hover:text-[#8B1E24]">New Announcement</span>
          </button>

          <button
            onClick={() => onNavigateModule('projects')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#8B1E24] shadow-xs hover:shadow-md transition-all group flex flex-col items-center text-center space-y-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#8B1E24] group-hover:bg-[#8B1E24] group-hover:text-white transition-colors flex items-center justify-center">
              <FolderGit2 className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0F2537] group-hover:text-[#8B1E24]">New Project</span>
          </button>

          <button
            onClick={() => onNavigateModule('publications')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#8B1E24] shadow-xs hover:shadow-md transition-all group flex flex-col items-center text-center space-y-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 group-hover:bg-indigo-700 group-hover:text-white transition-colors flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0F2537] group-hover:text-indigo-700">Add Publication</span>
          </button>

          <button
            onClick={() => onNavigateModule('team')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#8B1E24] shadow-xs hover:shadow-md transition-all group flex flex-col items-center text-center space-y-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 group-hover:bg-sky-700 group-hover:text-white transition-colors flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0F2537] group-hover:text-sky-700">Add Team Member</span>
          </button>

          <button
            onClick={() => onNavigateModule('media')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#8B1E24] shadow-xs hover:shadow-md transition-all group flex flex-col items-center text-center space-y-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-700 group-hover:text-white transition-colors flex items-center justify-center">
              <ImageIcon className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0F2537] group-hover:text-teal-700">Upload Media</span>
          </button>

          <button
            onClick={() => onNavigateModule('opportunities')}
            className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-[#8B1E24] shadow-xs hover:shadow-md transition-all group flex flex-col items-center text-center space-y-2 cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-700 group-hover:text-white transition-colors flex items-center justify-center">
              <Briefcase className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-[#0F2537] group-hover:text-amber-700">New Opening</span>
          </button>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="space-y-3">
        <h3 className="font-serif text-lg font-bold text-[#0F2537]">
          Live Content Statistics
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {statCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={card.action}
                className={`bg-white rounded-2xl p-5 border ${card.border} shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-2 ${card.action ? 'cursor-pointer hover:scale-[1.02]' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">{card.title}</span>
                  <div className={`w-8 h-8 rounded-lg ${card.bg} ${card.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                    {loading ? '...' : card.value}
                  </div>
                  <p className="text-[11px] font-mono text-slate-500 pt-0.5">{card.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Audit Activities */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#8B1E24]" />
            <h3 className="font-serif text-xl font-bold text-[#0F2537]">
              Recent Activity &amp; Audit Trail
            </h3>
          </div>
          <button
            onClick={() => onNavigateModule('audit')}
            className="text-xs font-bold text-[#8B1E24] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Logs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="py-8 text-center text-xs text-slate-400">Loading recent actions...</div>
        ) : !metrics?.recentLogs || metrics.recentLogs.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-400">No activity logged yet.</div>
        ) : (
          <div className="space-y-2.5">
            {metrics.recentLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-2 h-2 rounded-full bg-[#8B1E24] shrink-0" />
                  <div className="min-w-0">
                    <span className="font-bold text-[#0F2537] truncate block">
                      {log.recordTitle || `${log.action} in ${log.module}`}
                    </span>
                    <span className="text-[11px] text-slate-500 font-mono">
                      By {log.actorEmail} • <strong className="uppercase">{log.action}</strong> ({log.module})
                    </span>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">
                  {formatDateTime(log.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

