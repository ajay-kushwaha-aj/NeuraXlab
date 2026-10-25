import React from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Bookmark, 
  FileText, 
  CheckCircle2, 
  Share2, 
  Download, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { BOOK_CHAPTERS, RESEARCH_METHODOLOGY_ARTICLES } from '../data/labData';

export default function ArticlesView() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Academic Compendia &amp; Protocols</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Research Articles &amp; Book Chapters
        </h1>
        <p className="text-[#0F2537]/80 text-sm sm:text-base leading-relaxed">
          Scholarly treatises, authoritative methodology chapters, and standardized laboratory protocols authored by Dr. Venkata Prasuja Nakka across leading international publishers.
        </p>
      </div>

      {/* 1. Authoritative Book Chapters Repository */}
      <section className="space-y-8">
        <div className="flex items-center justify-between border-b border-gray-200 pb-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
              Authored Books &amp; Specialized Chapters
            </h2>
            <p className="text-sm sm:text-base text-[#0F2537]/70 mt-1">
              Published with Cambridge Scholars Publishing, Elsevier (Methods in Enzymology), and Springer Nature.
            </p>
          </div>
          <span className="hidden sm:inline-block text-xs sm:text-sm font-mono font-semibold text-[#8B1E24] bg-[#FAF8F5] px-3.5 py-1.5 rounded-lg border border-[#C59B27]/40">
            {BOOK_CHAPTERS.length} Volumes Documented
          </span>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {BOOK_CHAPTERS.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 hover:border-[#C59B27] shadow-md hover:shadow-xl transition-all space-y-6"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs sm:text-sm font-mono font-bold text-white bg-[#8B1E24] px-3 py-1 rounded-full uppercase">
                      {book.category}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-[#0F2537]/70 bg-[#FAF8F5] px-2.5 py-1 rounded border border-gray-200">
                      {book.publisher}
                    </span>
                    <span className="text-xs sm:text-sm font-mono text-[#0F2537]/70">
                      Year: {book.year}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537] leading-snug">
                    {book.title}
                  </h3>

                  <p className="text-sm sm:text-base text-[#8B1E24] font-semibold">
                    Authors / Editors: {book.authors}
                  </p>
                </div>

                {book.link && (
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#0F2537] hover:bg-[#8B1E24] transition-colors shadow flex-shrink-0"
                  >
                    <span>Publisher Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#E0B84C]" />
                  </a>
                )}
              </div>

              <p className="text-sm sm:text-base text-[#0F2537]/85 leading-relaxed bg-[#FAF8F5] p-4 sm:p-5 rounded-2xl border border-gray-100">
                {book.summary}
              </p>

              {/* Highlights & Table of Contents Topics */}
              <div className="space-y-3">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#0F2537]">
                  Key Thematic Sections &amp; Protocols Covered:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {book.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-[#0F2537]/85">
                      <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bibliographic Telemetry */}
              <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs sm:text-sm text-[#0F2537]/70 font-mono gap-2">
                <span>ISBN: {book.isbn}</span>
                {book.doi && <span>DOI: {book.doi}</span>}
                <span>Location: SLS Annex Library / UoH Institutional Repository</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Standardized Laboratory Methodologies & Protocols */}
      <section className="space-y-8">
        <div className="space-y-2 border-b border-gray-200 pb-4">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#8B1E24]">
            Preclinical Experimental Platform
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
            Standard Operating Procedures &amp; Methodologies
          </h2>
          <p className="text-sm sm:text-base text-[#0F2537]/70">
            Validated bench protocols optimized at NeuroXlab for reproducibility in translational stroke research.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_METHODOLOGY_ARTICLES.map((method) => (
            <div
              key={method.id}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-[#8B1E24] bg-[#8B1E24]/10 px-2.5 py-1 rounded-md">
                    {method.topic}
                  </span>
                  <FileText className="w-4 h-4 text-[#C59B27]" />
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] leading-snug">
                  {method.title}
                </h3>

                <p className="text-sm text-[#0F2537]/85 leading-relaxed">
                  {method.description}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {method.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-[#FAF8F5] text-[#0F2537]/75 border border-gray-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-[#8B1E24] font-semibold pt-1">
                  <span>NeuroXlab SOP Repository</span>
                  <span className="text-xs text-[#0F2537]/60">SLS Annex Lab F75C</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Open Access Notice */}
      <section className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-gray-200 text-center space-y-2">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537]">
          Open Science &amp; Resource Sharing Policy
        </h3>
        <p className="text-sm text-[#0F2537]/80 max-w-2xl mx-auto leading-relaxed">
          NeuroXlab adheres to the open science principles endorsed by the University of Hyderabad. All protocols, bioinformatic workflows, and 16S microbiome pipeline scripts are accessible to academic researchers upon request to <a href="mailto:prasuja@uohyd.ac.in" className="text-[#8B1E24] font-mono underline">prasuja@uohyd.ac.in</a>.
        </p>
      </section>
    </div>
  );
}
