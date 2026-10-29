import React from 'react';

export default function StatusBadge({ status, className = '' }) {
  const norm = (status || '').toLowerCase();

  switch (norm) {
    case 'published':
    case 'active':
    case 'open':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="capitalize">{status}</span>
        </span>
      );

    case 'draft':
    case 'planned':
    case 'upcoming':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono bg-amber-50 text-amber-700 border border-amber-200 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span className="capitalize">{status}</span>
        </span>
      );

    case 'archived':
    case 'closed':
    case 'completed':
    case 'on_hold':
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono bg-slate-100 text-slate-700 border border-slate-300 ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span className="capitalize">{status.replace('_', ' ')}</span>
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold font-mono bg-slate-50 text-slate-600 border border-slate-200 ${className}`}>
          <span className="capitalize">{status}</span>
        </span>
      );
  }
}

