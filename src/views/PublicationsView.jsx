import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Quote, 
  ExternalLink, 
  FileText, 
  Check, 
  SlidersHorizontal,
  Award,
  Sparkles,
  Layers
} from 'lucide-react';
import { PUBLICATIONS, LAB_INFO } from '../data/labData';
import BibtexModal from '../components/BibtexModal';

export default function PublicationsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeBibtexPub, setActiveBibtexPub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Landmark Papers', 'Stroke & Ischemia', 'Non-coding RNAs'];

  const filteredPublications = useMemo(() => {
    return PUBLICATIONS.filter((pub) => {
      const matchesCategory =
        selectedCategory === 'All' || pub.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        pub.title.toLowerCase().includes(q) ||
        pub.authors.toLowerCase().includes(q) ||
        pub.journal.toLowerCase().includes(q) ||
        pub.year.toString().includes(q) ||
        (pub.abstract && pub.abstract.toLowerCase().includes(q)) ||
        (pub.tags && pub.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleOpenBibtex = (pub) => {
    setActiveBibtexPub(pub);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* BibTeX Citation Modal */}
      <BibtexModal
        publication={activeBibtexPub}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Peer-Reviewed Literature</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Research Publications
        </h1>
        <p className="text-[#0F2537]/80 text-base sm:text-lg">
          Discover our peer-reviewed findings in high-impact journals including Stroke (AHA), Molecular Neurobiology, and JCBFM, with one-click BibTeX export.
        </p>
      </div>

      {/* Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl p-6 border border-[#C59B27]/40 shadow-sm text-center">
        <div>
          <div className="font-serif text-3xl font-bold text-[#8B1E24]">
            {LAB_INFO.metrics.citations}
          </div>
          <div className="text-xs text-[#0F2537]/70 font-semibold uppercase mt-0.5">
            Total Citations
          </div>
        </div>
        <div>
          <div className="font-serif text-3xl font-bold text-[#0F2537]">
            {LAB_INFO.metrics.hIndex}
          </div>
          <div className="text-xs text-[#0F2537]/70 font-semibold uppercase mt-0.5">
            h-Index
          </div>
        </div>
        <div>
          <div className="font-serif text-3xl font-bold text-[#0F2537]">
            {LAB_INFO.metrics.i10Index}
          </div>
          <div className="text-xs text-[#0F2537]/70 font-semibold uppercase mt-0.5">
            i10-Index
          </div>
        </div>
        <div>
          <div className="font-serif text-3xl font-bold text-[#8B1E24]">
            8.3+
          </div>
          <div className="text-xs text-[#0F2537]/70 font-semibold uppercase mt-0.5">
            Top Journal Impact Factor
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Real-time Search Input */}
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, author, journal, or topic..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] focus:border-transparent text-sm bg-[#FAF8F5]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#8B1E24] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#0F2537]/70 hover:text-[#0F2537] hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-[#0F2537]/60 flex items-center justify-between pt-1">
          <span>
            Showing <strong>{filteredPublications.length}</strong> of {PUBLICATIONS.length} indexed articles
          </span>
          <span className="font-mono">SLS Annex Research Database</span>
        </div>
      </div>

      {/* Publications List */}
      <div className="space-y-6">
        {filteredPublications.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-200 space-y-3">
            <p className="font-serif text-xl font-bold text-[#0F2537]">
              No publications match your search query.
            </p>
            <p className="text-xs text-[#0F2537]/70">
              Try searching for "ER stress", "stroke", "noncoding", "ISGylation", or clear filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#8B1E24]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPublications.map((pub) => (
            <div
              key={pub.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 hover:border-[#C59B27] shadow-sm hover:shadow-lg transition-all space-y-4"
            >
              {/* Top Row: Journal & Metric Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#8B1E24] bg-[#8B1E24]/10 px-3 py-1 rounded-full">
                    {pub.journal}
                  </span>
                  <span className="text-xs font-mono text-[#0F2537]/70">
                    Year: {pub.year}
                  </span>
                  {pub.impactFactor && (
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      IF: {pub.impactFactor}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#C59B27] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#C59B27]/40">
                    {pub.citations} Citations
                  </span>
                  <span className="text-xs font-mono text-[#0F2537]/60 hidden sm:inline">
                    Vol. {pub.volume}
                  </span>
                </div>
              </div>

              {/* Title & Authors */}
              <div className="space-y-1.5">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] leading-snug">
                  {pub.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#0F2537]/80">
                  <strong className="text-[#0F2537]">Authors:</strong> {pub.authors}
                </p>
              </div>

              {/* Abstract Preview */}
              {pub.abstract && (
                <p className="text-xs sm:text-sm text-[#0F2537]/75 leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-gray-100">
                  {pub.abstract}
                </p>
              )}

              {/* Action Buttons & Tags */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5">
                  {pub.tags.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-gray-100 text-[#0F2537]/70"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  {/* BibTeX Trigger */}
                  <button
                    onClick={() => handleOpenBibtex(pub)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-[#8B1E24] bg-[#8B1E24]/10 hover:bg-[#8B1E24] hover:text-white transition-all shadow-sm"
                  >
                    <Quote className="w-3.5 h-3.5" />
                    <span>Cite / BibTeX</span>
                  </button>

                  {/* External DOI Link */}
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F2537] hover:bg-[#FAF8F5] border border-gray-200 transition-colors"
                  >
                    <span>DOI Link</span>
                    <ExternalLink className="w-3 h-3 text-[#C59B27]" />
                  </a>

                  {pub.pubmedId && (
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${pub.pubmedId}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#0F2537] hover:bg-[#FAF8F5] border border-gray-200 transition-colors hidden sm:inline-flex"
                    >
                      <span>PubMed</span>
                      <ExternalLink className="w-3 h-3 text-[#C59B27]" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* External Repository Reference */}
      <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#0F2537]/80">
        <div>
          <p className="font-bold text-[#0F2537]">
            Looking for older conference proceedings or full-text reprints?
          </p>
          <p className="text-[#0F2537]/70 mt-0.5">
            Visit Dr. Venkata Prasuja Nakka's Google Scholar profile or email the laboratory for authorized pre-prints.
          </p>
        </div>
        <a
          href={LAB_INFO.pi.scholarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B1E24] text-white font-bold whitespace-nowrap hover:bg-[#641318] transition-colors"
        >
          <span>Open Google Scholar</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#E0B84C]" />
        </a>
      </div>
    </div>
  );
}
