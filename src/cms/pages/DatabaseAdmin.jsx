import React, { useState } from 'react';
import { Database, Download, Upload, RefreshCw, CheckCircle2, AlertTriangle, FileCode } from 'lucide-react';
import { localDb } from '../services/localDb';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { useAuth } from '../context/AuthContext';
import { downloadJson } from '../utils/exportImport';
import ConfirmDialog from '../components/ConfirmDialog';

export default function DatabaseAdmin() {
  const { user } = useAuth();
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState('');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const data = await localDb.exportFullDatabase();
      downloadJson(data, `neuroxlab-backup-${new Date().toISOString().split('T')[0]}.json`);
    } catch (err) {
      alert('Export failed: ' + err.message);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImportFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      setIsImporting(true);
      setImportStatus('');
      try {
        const json = JSON.parse(event.target.result);
        await localDb.importFullDatabase(json, user);
        setImportStatus('Database successfully restored from JSON backup!');
      } catch (err) {
        setImportStatus('Import failed: ' + err.message);
      } finally {
        setIsImporting(false);
      }
    };
    reader.readAsText(file);
  };

  const handleResetToDefaults = async () => {
    try {
      await localDb.seedInitialDatabase();
      setResetDialogOpen(false);
      alert('Database successfully refreshed with authentic laboratory records!');
      window.location.reload();
    } catch (err) {
      alert('Reset failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      <div>
        <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
          Database Synchronization, Backup &amp; Migration
        </h2>
        <p className="text-xs text-slate-500 font-sans">
          Manage database backups, import snapshots, inspect backend status, and view Supabase PostgreSQL migration scripts.
        </p>
      </div>

      {/* Backend Status Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#8B1E24] uppercase border-b border-slate-100 pb-2">
          <Database className="w-4 h-4 text-[#C59B27]" />
          <span>Active Backend Infrastructure</span>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200">
          <div>
            <h4 className="font-serif text-base font-bold text-[#0F2537] flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>{isSupabaseConfigured ? 'Supabase PostgreSQL Cloud Engine' : 'High-Performance Local Persistent Engine (IndexedDB)'}</span>
            </h4>
            <p className="text-xs text-slate-600 mt-1">
              {isSupabaseConfigured
                ? 'Your project is connected to Supabase cloud database with active Row-Level Security policies.'
                : 'Zero-dependency local persistence with cryptographic PBKDF2/SHA-256 hashing. All changes persist across restarts and reloads.'}
            </p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            HEALTHY
          </span>
        </div>
      </div>

      {/* Export & Import Backup */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#8B1E24] uppercase border-b border-slate-100 pb-2">
          <Download className="w-4 h-4 text-[#C59B27]" />
          <span>Data Portability &amp; Snapshot Management</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <h4 className="font-serif text-sm font-bold text-[#0F2537]">
                Export Full Database Snapshot
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download a complete JSON export of all announcements, projects, publications, team profiles, and settings.
              </p>
            </div>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#0F2537] hover:bg-[#1E3E5B] transition-all cursor-pointer disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-[#E0B84C]" />
              <span>{isExporting ? 'Generating JSON...' : 'Download Full JSON Backup'}</span>
            </button>
          </div>

          <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-1">
              <h4 className="font-serif text-sm font-bold text-[#0F2537]">
                Restore from JSON Snapshot
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload a previous JSON backup file to restore records into your CMS database.
              </p>
            </div>
            <div>
              <label className="inline-flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 transition-all cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-[#8B1E24]" />
                <span>{isImporting ? 'Restoring...' : 'Select JSON File to Restore'}</span>
                <input
                  type="file"
                  accept=".json,application/json"
                  onChange={handleImportFile}
                  disabled={isImporting}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>

        {importStatus && (
          <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-800 text-xs font-medium">
            {importStatus}
          </div>
        )}
      </div>

      {/* Supabase Schema Reference */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#8B1E24] uppercase border-b border-slate-100 pb-2">
          <FileCode className="w-4 h-4 text-[#C59B27]" />
          <span>PostgreSQL Production Schema &amp; RLS Policies</span>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-sans">
          The production PostgreSQL schema with Row-Level Security (RLS) is located at <code>supabase/schema.sql</code>. Whenever connecting to a new cloud Supabase instance, execute that script in the Supabase SQL Editor.
        </p>
      </div>

      {/* Danger Zone: Reset to Authentic Defaults */}
      <div className="bg-red-50/50 rounded-3xl p-6 border border-red-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-red-800 uppercase">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          <span>Reset Laboratory Database to Verified Defaults</span>
        </div>
        <p className="text-xs text-red-700 leading-relaxed font-sans">
          This operation will re-populate all collections with authentic lab records from <code>src/data/labData.js</code> (verified papers, flagship ₹38.5 Lakhs grant, Dr. Nakka PI profile, and official team roster).
        </p>
        <button
          onClick={() => setResetDialogOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-red-700 hover:bg-red-800 transition-colors cursor-pointer"
        >
          Re-seed Authentic Laboratory Records
        </button>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        isOpen={resetDialogOpen}
        title="Reset Laboratory Database"
        message="Are you sure you want to re-seed the database with the verified default records? Any unexported custom records may be overwritten."
        confirmText="Confirm Re-seed"
        onConfirm={handleResetToDefaults}
        onCancel={() => setResetDialogOpen(false)}
      />
    </div>
  );
}

