import React from 'react';
import { Globe } from 'lucide-react';

export default function SeoFields({
  seoTitle = '',
  seoDescription = '',
  keywords = '',
  onChangeTitle,
  onChangeDescription,
  onChangeKeywords
}) {
  return (
    <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-4">
      <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase tracking-wider text-[#8B1E24]">
        <Globe className="w-4 h-4 text-[#C59B27]" />
        <span>Search Engine Optimization (SEO) Metadata</span>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            SEO Title Tag (Recommended: 50-60 characters)
          </label>
          <input
            type="text"
            value={seoTitle}
            onChange={(e) => onChangeTitle(e.target.value)}
            placeholder="e.g. Ischemic Stroke & Gut Dysbiosis Research | NeuroXLab"
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Meta Description (Recommended: 120-160 characters)
          </label>
          <textarea
            value={seoDescription}
            onChange={(e) => onChangeDescription(e.target.value)}
            placeholder="Brief scientific summary for Google and social previews..."
            rows={2}
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Keywords (Comma separated)
          </label>
          <input
            type="text"
            value={keywords}
            onChange={(e) => onChangeKeywords(e.target.value)}
            placeholder="stroke, ER stress, gut-brain axis, nanomedicine"
            className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          />
        </div>
      </div>
    </div>
  );
}

