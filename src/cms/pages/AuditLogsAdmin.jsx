import React, { useState, useEffect } from 'react';
import { FileText, Search, Filter, RefreshCw } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { formatDateTime } from '../utils/formatters';

export default function AuditLogsAdmin() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [moduleFilter, setModuleFilter] = useState('all');

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    setLoading(true);
    try {
      const data = await cmsService.getAuditLogs(150);
      setLogs(data);
    } catch (err) {
      console.warn('Failed to load audit logs:', err);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action) => {
    switch (action?.toLowerCase()) {
      case 'create':
      case 'publish':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'update':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delete':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'login':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  const filteredLogs = logs.filter(item => {
    const matchesSearch = (item.actorEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.recordTitle || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.action || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === 'all' || item.module === moduleFilter;
    return matchesSearch && matchesModule;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Audit Logs &amp; Activity Trail
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Immutable tracking of content creations, modifications, publications, and administrative access.
          </p>
        </div>
        <button
          onClick={loadLogs}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Logs</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by actor email, record title..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={moduleFilter}
            onChange={(e) => setModuleFilter(e.target.value)}
            className="py-1.5 px-3 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          >
            <option value="all">All Modules</option>
            <option value="announcements">Announcements</option>
            <option value="projects">Projects</option>
            <option value="publications">Publications</option>
            <option value="team_members">Team Members</option>
            <option value="media_assets">Media Assets</option>
            <option value="activities_events">Events</option>
            <option value="opportunities">Opportunities</option>
            <option value="site_settings">Settings</option>
            <option value="auth">Authentication</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading audit trails...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <FileText className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-600">No logs found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-slate-600 uppercase font-mono font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-3">Administrator</th>
                  <th className="py-3 px-3">Action</th>
                  <th className="py-3 px-3">Module</th>
                  <th className="py-3 px-4">Target Record / Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap text-slate-500">
                      {formatDateTime(log.createdAt)}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-bold text-[#0F2537]">
                      {log.actorEmail}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded border uppercase text-[10px] font-bold ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap capitalize text-slate-600">
                      {log.module?.replace('_', ' ')}
                    </td>
                    <td className="py-3 px-4 max-w-sm truncate text-slate-700 font-sans text-xs">
                      {log.recordTitle || log.recordId || '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
