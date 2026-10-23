import React, { useState } from 'react';
import { X, Copy, Check, ExternalLink, BookOpen, Quote } from 'lucide-react';

export default function BibtexModal({ publication, isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const [citationFormat, setCitationFormat] = useState('bibtex'); // 'bibtex', 'apa', 'ieee'

  if (!isOpen || !publication) return null;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const apaText = `${publication.authors} (${publication.year}). ${publication.title}. ${publication.journal}, ${publication.volume}, ${publication.pages}. https://doi.org/${publication.doi}`;
  const ieeeText = `${publication.authors}, "${publication.title}," ${publication.journal}, vol. ${publication.volume}, pp. ${publication.pages}, ${publication.year}, doi: ${publication.doi}.`;

  const currentText =
    citationFormat === 'bibtex'
      ? publication.bibtex
      : citationFormat === 'apa'
      ? apaText
      : ieeeText;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2537]/75 backdrop-blur-sm transition-all"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bibtex-modal-title"
    >
      <div className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-2xl shadow-2xl border border-[#C59B27]/40 overflow-hidden transform transition-all">
        {/* Header Ribbon */}
        <div className="bg-[#8B1E24] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Quote className="w-5 h-5 text-[#C59B27]" />
            <div>
              <h3 id="bibtex-modal-title" className="font-serif text-xl tracking-wide font-normal">
                Citation &amp; BibTeX Generator
              </h3>
              <p className="text-xs text-white/80 font-mono">
                DOI: {publication.doi}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-white/90 hover:text-white transition-colors"
            aria-label="Close citation modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5">
          {/* Paper Title & Journal info */}
          <div className="border-b border-[#FAF8F5] pb-4">
            <h4 className="font-serif text-xl font-bold text-[#0F2537] leading-snug">
              {publication.title}
            </h4>
            <p className="text-sm text-[#0F2537]/70 mt-1">
              <span className="font-medium text-[#8B1E24]">{publication.journal}</span> • {publication.year} • Vol. {publication.volume}
            </p>
            <p className="text-xs text-[#0F2537]/60 mt-0.5">
              Authors: {publication.authors}
            </p>
          </div>

          {/* Format Selector Tabs */}
          <div className="flex items-center justify-between">
            <div className="inline-flex p-1 rounded-xl bg-[#FAF8F5] border border-gray-200 text-xs font-semibold">
              <button
                onClick={() => setCitationFormat('bibtex')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  citationFormat === 'bibtex'
                    ? 'bg-[#8B1E24] text-white shadow-sm'
                    : 'text-[#0F2537]/70 hover:text-[#0F2537]'
                }`}
              >
                BibTeX
              </button>
              <button
                onClick={() => setCitationFormat('apa')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  citationFormat === 'apa'
                    ? 'bg-[#8B1E24] text-white shadow-sm'
                    : 'text-[#0F2537]/70 hover:text-[#0F2537]'
                }`}
              >
                APA 7th
              </button>
              <button
                onClick={() => setCitationFormat('ieee')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  citationFormat === 'ieee'
                    ? 'bg-[#8B1E24] text-white shadow-sm'
                    : 'text-[#0F2537]/70 hover:text-[#0F2537]'
                }`}
              >
                IEEE
              </button>
            </div>

            {/* Direct External Links */}
            <div className="flex items-center gap-2">
              <a
                href={`https://doi.org/${publication.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#8B1E24] hover:text-[#641318] font-medium"
              >
                <span>Publisher Link</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              {publication.pubmedId && (
                <a
                  href={`https://pubmed.ncbi.nlm.nih.gov/${publication.pubmedId}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-[#0F2537]/70 hover:text-[#0F2537] font-medium ml-2"
                >
                  <span>PubMed</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Code / Reference Display */}
          <div className="relative">
            <pre className="font-mono text-xs text-[#0F2537] bg-[#FAF8F5] p-4 rounded-xl border border-gray-200 overflow-x-auto max-h-56 whitespace-pre-wrap leading-relaxed select-all">
              {currentText}
            </pre>
            <button
              onClick={() => copyToClipboard(currentText)}
              className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#8B1E24] hover:bg-[#641318] text-white text-xs font-semibold rounded-lg shadow-md transition-all active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy {citationFormat.toUpperCase()}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF8F5] px-6 py-3.5 border-t border-gray-200 flex items-center justify-between text-xs text-[#0F2537]/70">
          <span>NeuraXlab Reference Repository • University of Hyderabad</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 text-[#0F2537] font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
