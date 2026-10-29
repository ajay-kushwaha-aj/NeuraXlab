import React, { useState, useRef } from 'react';
import {
  Bold, Italic, Heading2, Heading3, List, ListOrdered,
  Quote, Link as LinkIcon, Image as ImageIcon, Eye, Edit3
} from 'lucide-react';
import { sanitizeHtml } from '../utils/sanitizer';
import MediaPickerModal from './MediaPickerModal';

const SCIENTIFIC_SYMBOLS = [
  'α', 'β', 'γ', 'δ', 'ε', 'λ', 'μ', 'π', 'σ', 'ω',
  'Δ', '±', '°', '²', '³', '→', '←', '⇌', '≈', '≤', '≥'
];

export default function RichTextEditor({
  value = '',
  onChange,
  label = 'Content Body',
  placeholder = 'Write content here...',
  rows = 8
}) {
  const [activeTab, setActiveTab] = useState('write'); // 'write' or 'preview'
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const textareaRef = useRef(null);

  const insertText = (before, after = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selectedText = previousText.substring(start, end);

    const replacement = `${before}${selectedText || 'text'}${after}`;
    const newText = previousText.substring(0, start) + replacement + previousText.substring(end);

    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + (selectedText.length || 4));
    }, 0);
  };

  const insertSymbol = (sym) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;

    const newText = previousText.substring(0, start) + sym + previousText.substring(end);
    onChange(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + sym.length, start + sym.length);
    }, 0);
  };

  const handleMediaSelected = (url) => {
    insertText(`<img src="${url}" alt="Figure" class="my-4 rounded-xl max-w-full h-auto border border-slate-200" />\n`);
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider font-mono">
          {label}
        </label>
        <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg border border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab('write')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'write' ? 'bg-white text-[#8B1E24] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Write</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'preview' ? 'bg-white text-[#8B1E24] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Preview</span>
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden focus-within:border-[#8B1E24] focus-within:ring-1 focus-within:ring-[#8B1E24]/20 transition-all">
        {activeTab === 'write' ? (
          <>
            {/* Formatting Toolbar */}
            <div className="p-2 border-b border-slate-100 bg-[#FAF8F5] flex flex-wrap items-center gap-1 text-slate-600">
              <button
                type="button"
                onClick={() => insertText('<strong>', '</strong>')}
                className="p-1.5 hover:bg-slate-200 rounded-lg hover:text-slate-900"
                title="Bold"
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertText('<em>', '</em>')}
                className="p-1.5 hover:bg-slate-200 rounded-lg hover:text-slate-900"
                title="Italic"
              >
                <Italic className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-slate-300 mx-1" />
              <button
                type="button"
                onClick={() => insertText('<h2>', '</h2>')}
                className="p-1.5 hover:bg-slate-200 rounded-lg hover:text-slate-900"
                title="Heading 2"
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertText('<h3>', '</h3>')}
                className="p-1.5 hover:bg-slate-200 rounded-lg hover:text-slate-900"
                title="Heading 3"
              >
                <Heading3 className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-slate-300 mx-1" />
              <button
                type="button"
                onClick={() => insertText('<ul>\n  <li>', '</li>\n</ul>')}
                className="p-1.5 hover:bg-slate-200 rounded-lg hover:text-slate-900"
                title="Bulleted List"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertText('<ol>\n  <li>', '</li>\n</ol>')}
                className="p-1.5 hover:bg-slate-200 rounded-lg hover:text-slate-900"
                title="Numbered List"
              >
                <ListOrdered className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertText('<blockquote>', '</blockquote>')}
                className="p-1.5 hover:bg-slate-200 rounded-lg hover:text-slate-900"
                title="Blockquote"
              >
                <Quote className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => insertText('<a href="https://" target="_blank" rel="noopener noreferrer">', '</a>')}
                className="p-1.5 hover:bg-slate-200 rounded-lg hover:text-slate-900"
                title="Hyperlink"
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <div className="w-px h-4 bg-slate-300 mx-1" />
              <button
                type="button"
                onClick={() => setIsMediaPickerOpen(true)}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-[#8B1E24] hover:bg-[#8B1E24]/10 rounded-lg transition-colors"
                title="Insert Media Asset"
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Insert Media</span>
              </button>
            </div>

            {/* Scientific Characters Toolbar */}
            <div className="px-2 py-1 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs font-serif text-slate-700">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold shrink-0">Symbols:</span>
              {SCIENTIFIC_SYMBOLS.map((sym, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => insertSymbol(sym)}
                  className="px-1.5 py-0.5 rounded hover:bg-slate-200 hover:text-[#8B1E24] transition-colors"
                >
                  {sym}
                </button>
              ))}
            </div>

            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder}
              rows={rows}
              className="w-full p-4 text-sm font-sans text-slate-800 leading-relaxed focus:outline-none resize-y"
            />
          </>
        ) : (
          <div className="p-5 min-h-[220px] max-h-[400px] overflow-y-auto bg-white font-sans text-sm text-slate-800 prose prose-slate max-w-none">
            {value ? (
              <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) }} />
            ) : (
              <p className="text-slate-400 italic">No content to preview.</p>
            )}
          </div>
        )}
      </div>

      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={handleMediaSelected}
        title="Insert Image into Content"
      />
    </div>
  );
}

