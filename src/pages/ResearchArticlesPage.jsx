import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Quote,
  Sparkles,
  Layers,
  Calendar,
  Globe2,
  FileText,
  RotateCcw,
  Compass,
  CheckCircle2,
  Activity,
  Dna,
  Cpu,
  GraduationCap
} from 'lucide-react';
import BibtexModal from '../components/BibtexModal';
import {
  PUBLICATIONS,
  BOOK_CHAPTERS,
  CONFERENCE_PROCEEDINGS,
  REPRESENTATIVE_HIGHLIGHTS,
  LAB_INFO
} from '../data/labData';

export default function ResearchArticlesPage() {
  // Navigation active tab: 'all', 'articles', 'books', 'conferences'
  const [activeCategory, setActiveCategory] = useState('all');

  // Search and filter state for Research Articles library
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('All Topics');
  const [selectedYear, setSelectedYear] = useState('All Years');

  // Expanded abstracts mapping: { [pubId]: boolean }
  const [expandedAbstracts, setExpandedAbstracts] = useState({});

  // Citation modal state
  const [activeBibtexPub, setActiveBibtexPub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Available topics derived from verified dataset
  const topics = [
    'All Topics',
    'Stroke Biology & Neuroprotection',
    'Non-coding RNAs & Epigenetics',
    'Cellular Stress & ER Stress/UPR',
    'Neuroinflammation & Microglia–Macrophage Dynamics',
    'Brain–Organ Crosstalk'
  ];

  // Available years sorted descending
  const years = useMemo(() => {
    const setYears = new Set(PUBLICATIONS.map((p) => p.year));
    return ['All Years', ...Array.from(setYears).sort((a, b) => b - a)];
  }, []);

  // Filtered publications
  const filteredArticles = useMemo(() => {
    return PUBLICATIONS.filter((item) => {
      // Topic match
      const matchesTopic = selectedTopic === 'All Topics' || item.topic === selectedTopic;

      // Year match
      const matchesYear = selectedYear === 'All Years' || item.year.toString() === selectedYear.toString();

      // Search match across Title, Authors, Journal, Year, and Abstract
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesTopic && matchesYear;

      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.authors.toLowerCase().includes(q) ||
        item.journal.toLowerCase().includes(q) ||
        item.year.toString().includes(q) ||
        (item.abstract && item.abstract.toLowerCase().includes(q));

      return matchesTopic && matchesYear && matchesSearch;
    });
  }, [searchQuery, selectedTopic, selectedYear]);

  const toggleAbstract = (id) => {
    setExpandedAbstracts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenCitation = (pub) => {
    setActiveBibtexPub(pub);
    setIsModalOpen(true);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedTopic('All Topics');
    setSelectedYear('All Years');
  };

  const isFiltered = searchQuery !== '' || selectedTopic !== 'All Topics' || selectedYear !== 'All Years';

  const scrollToAnchor = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 space-y-16">
      {/* Citation Generator Modal */}
      <BibtexModal
        publication={activeBibtexPub}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* =========================================================================
          1. CLEAN PAGE HEADER
          ========================================================================= */}
      <section className="text-center max-w-4xl mx-auto space-y-4">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider border border-[#8B1E24]/20">
          <BookOpen className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>NEUROXLAB · RESEARCH OUTPUTS</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0F2537] tracking-tight leading-[1.15]">
          Publications &amp; Scholarly Contributions
        </h1>

        {/* Description */}
        <p className="text-slate-700 text-sm sm:text-base md:text-lg leading-relaxed font-normal max-w-3xl mx-auto">
          Explore the laboratory's peer-reviewed research articles, scholarly book chapters, and scientific conference contributions in stroke biology, neuroprotection, cellular stress signaling, neuroinflammation, and translational neuroscience.
        </p>

        {/* Compact Category Navigation */}
        <div className="pt-2">
          <nav
            aria-label="Publication Categories"
            className="inline-flex p-1.5 rounded-2xl bg-white border border-slate-200/90 shadow-xs flex-wrap justify-center gap-1"
          >
            {[
              { id: 'all', label: 'All Publications', anchor: null },
              { id: 'articles', label: 'Research Articles', anchor: 'research-articles' },
              { id: 'books', label: 'Book Chapters', anchor: 'book-chapters' },
              { id: 'conferences', label: 'Conference Contributions', anchor: 'conference-proceedings' }
            ].map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    if (cat.anchor) {
                      scrollToAnchor(cat.anchor);
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#8B1E24] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#8B1E24] hover:bg-[#FAF8F5]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Subtle Decorative Underline */}
        <div className="w-20 h-1 bg-[#8B1E24] rounded-full mx-auto mt-4" />
      </section>

      {/* =========================================================================
          2. RESEARCH HIGHLIGHTS (REPLACES CLUTTERED THEMATIC DISCOVERY)
          ========================================================================= */}
      {(activeCategory === 'all' || activeCategory === 'articles') && (
        <section id="research-highlights" className="space-y-6">
          <div className="space-y-1.5 border-b-2 border-slate-200 pb-3">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Representative Scholarly Milestones</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
              Research Highlights
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Three verified representative landmark publications from Dr. Nakka's research career in stroke epigenetics, organellar proteostasis, and multi-organ crosstalk.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {REPRESENTATIVE_HIGHLIGHTS.map((hl) => (
              <div
                key={hl.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:border-[#8B1E24]/60 hover:shadow-sm transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Topic Badge & Year */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#8B1E24]/10 text-[#8B1E24] border border-[#8B1E24]/20 truncate">
                      {hl.topic}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {hl.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                    {hl.title}
                  </h3>

                  {/* Authors & Journal */}
                  <div className="text-xs text-slate-600 space-y-0.5">
                    <p className="font-medium text-slate-700">
                      {hl.authors}
                    </p>
                    <p className="italic text-[#8B1E24] font-medium">
                      {hl.journal}
                    </p>
                  </div>

                  {/* Concise Evidence-Based Summary */}
                  <p className="text-xs text-slate-600 leading-relaxed font-normal pt-2 border-t border-slate-100">
                    {hl.summary}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">
                    DOI: {hl.doi.replace('10.1161/', '').replace('10.1007/', '').replace('10.1038/', '')}
                  </span>
                  <a
                    href={hl.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline"
                  >
                    <span>Read Article</span>
                    <ExternalLink className="w-3 h-3 text-[#C59B27]" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          3. PRIMARY SECTION: SEARCHABLE RESEARCH ARTICLES LIBRARY
          ========================================================================= */}
      {(activeCategory === 'all' || activeCategory === 'articles') && (
        <section id="research-articles" className="space-y-6 scroll-mt-28">
          <div className="space-y-2 border-b-2 border-slate-200 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
              <FileText className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Peer-Reviewed Journal Articles</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
              Research Articles
            </h2>
            <div className="w-16 h-1 bg-[#8B1E24] rounded-full mt-1" />
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-2xs space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search Box */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, author, journal, or year..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#FAF8F5] border border-slate-200 text-xs sm:text-sm text-[#0F2537] focus:outline-hidden focus:border-[#8B1E24] focus:ring-1 focus:ring-[#8B1E24] transition-all"
                  aria-label="Search articles"
                />
              </div>

              {/* Topic Filter */}
              <div className="md:col-span-4">
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-slate-200 text-xs sm:text-sm text-[#0F2537] focus:outline-hidden focus:border-[#8B1E24] font-medium"
                  aria-label="Filter by Topic"
                >
                  {topics.map((t, idx) => (
                    <option key={idx} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="md:col-span-2">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#FAF8F5] border border-slate-200 text-xs sm:text-sm text-[#0F2537] focus:outline-hidden focus:border-[#8B1E24] font-medium"
                  aria-label="Filter by Year"
                >
                  {years.map((y, idx) => (
                    <option key={idx} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Counter & Clear Filters Action */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
              <span className="font-mono text-slate-600 font-medium">
                Showing <strong className="text-[#0F2537]">{filteredArticles.length}</strong> of {PUBLICATIONS.length} peer-reviewed articles
              </span>

              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 font-mono font-bold text-[#8B1E24] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Clean List-Based Publications Layout */}
          {filteredArticles.length > 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200/90 shadow-2xs divide-y divide-slate-100 overflow-hidden">
              {filteredArticles.map((pub, idx) => {
                const isExpanded = !!expandedAbstracts[pub.id];
                return (
                  <article
                    key={pub.id}
                    className="p-5 sm:p-7 hover:bg-[#FAF8F5]/60 transition-colors space-y-3"
                  >
                    {/* Top Row: Topic Badge & Year */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#8B1E24]/10 text-[#8B1E24] border border-[#8B1E24]/20">
                        {pub.topic}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-500">
                        {pub.year}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F2537] leading-snug">
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-[#8B1E24] transition-colors"
                      >
                        {pub.title}
                      </a>
                    </h3>

                    {/* Authors, Journal, Volume & Pages */}
                    <div className="space-y-1 text-xs sm:text-sm text-slate-600">
                      <p className="font-medium text-slate-800">
                        {pub.authors}
                      </p>
                      <p className="text-slate-500">
                        <em className="font-serif font-bold text-[#8B1E24] not-italic mr-1">
                          {pub.journal}
                        </em>
                        {pub.volume && <span>· Vol. {pub.volume} </span>}
                        {pub.pages && <span>· pp. {pub.pages} </span>}
                        <span>({pub.year})</span>
                      </p>
                      <p className="font-mono text-xs text-slate-500">
                        DOI:{' '}
                        <a
                          href={`https://doi.org/${pub.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8B1E24] hover:underline"
                        >
                          https://doi.org/{pub.doi}
                        </a>
                      </p>
                    </div>

                    {/* Expandable Abstract Preview */}
                    {isExpanded && pub.abstract && (
                      <div className="pt-2">
                        <div className="p-4 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          <span className="font-mono text-slate-500 uppercase font-bold text-[11px] block mb-1">
                            Abstract
                          </span>
                          <p>{pub.abstract}</p>
                        </div>
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        href={`https://doi.org/${pub.doi}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-2xs transition-all"
                      >
                        <span>Read Publication</span>
                        <ExternalLink className="w-3 h-3 text-[#E0B84C]" />
                      </a>

                      {pub.abstract && (
                        <button
                          onClick={() => toggleAbstract(pub.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-[#8B1E24] hover:text-[#8B1E24] transition-all cursor-pointer"
                        >
                          <span>{isExpanded ? 'Hide Abstract' : 'View Abstract'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenCitation(pub)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-[#8B1E24] hover:text-[#8B1E24] transition-all cursor-pointer"
                      >
                        <Quote className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>Cite / BibTeX</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0F2537]">
                No publications match your search criteria
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Please try adjusting your search terms, selecting a different topic, or resetting the filters.
              </p>
              <div className="pt-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-xl bg-[#8B1E24] text-white text-xs font-bold hover:bg-[#A82931] shadow transition-all cursor-pointer"
                >
                  Reset All Filters
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* =========================================================================
          4. SEPARATE SECTION: BOOK CHAPTERS & SCHOLARLY CONTRIBUTIONS (5 VERIFIED RECORDS)
          ========================================================================= */}
      {(activeCategory === 'all' || activeCategory === 'books') && (
        <section id="book-chapters" className="space-y-6 scroll-mt-28">
          <div className="space-y-2 border-b-2 border-slate-200 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
              <Layers className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Authored Books &amp; Protocol Compendia</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
              Book Chapters &amp; Scholarly Contributions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Five verified international monographs, laboratory methods volumes, and academic treatises authored or edited with leading scientific publishers.
            </p>
            <div className="w-16 h-1 bg-[#8B1E24] rounded-full mt-1" />
          </div>

          <div className="grid grid-cols-1 gap-5">
            {BOOK_CHAPTERS.map((book, idx) => (
              <div
                key={book.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:border-[#8B1E24]/60 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* Top Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider bg-[#8B1E24]/10 text-[#8B1E24] border border-[#8B1E24]/20">
                        {book.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-semibold">
                        {book.publisher}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      Year: {book.year}
                    </span>
                  </div>

                  {/* Chapter / Book Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F2537] leading-snug group-hover:text-[#8B1E24] transition-colors">
                    {book.title}
                  </h3>

                  {/* Authors & Book Title if applicable */}
                  <div className="text-xs sm:text-sm text-slate-600 space-y-0.5">
                    <p className="font-medium text-slate-800">
                      Authors / Editors: {book.authors}
                    </p>
                    {book.bookTitle && (
                      <p className="italic text-[#8B1E24]">
                        In: {book.bookTitle}
                      </p>
                    )}
                  </div>

                  {/* Concise Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal bg-[#FAF8F5] p-3.5 rounded-xl border border-slate-200/70">
                    {book.summary}
                  </p>
                </div>

                {/* Footer Identifiers & Publisher Link */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-slate-500">
                    {book.isbn && <span>ISBN: {book.isbn}</span>}
                    {book.doi && (
                      <span>
                        DOI:{' '}
                        <a
                          href={`https://doi.org/${book.doi}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#8B1E24] hover:underline"
                        >
                          {book.doi}
                        </a>
                      </span>
                    )}
                  </div>

                  {book.link && (
                    <a
                      href={book.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#8B1E24] bg-[#8B1E24]/10 hover:bg-[#8B1E24] hover:text-white transition-colors"
                    >
                      <span>Publisher Portal</span>
                      <ExternalLink className="w-3 h-3 text-[#C59B27]" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          5. CONFERENCE CONTRIBUTIONS ARCHIVE (3 VERIFIED INTERNATIONAL MEETINGS)
          ========================================================================= */}
      {(activeCategory === 'all' || activeCategory === 'conferences') && (
        <section id="conference-proceedings" className="space-y-6 scroll-mt-28">
          <div className="space-y-2 border-b-2 border-slate-200 pb-4">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
              <Globe2 className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>International Symposia &amp; Proceedings</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
              Conference Contributions &amp; Proceedings
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Verified scientific presentations and published abstracts presented at international neuroscience congresses across Europe, North America, and Asia.
            </p>
            <div className="w-16 h-1 bg-[#8B1E24] rounded-full mt-1" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {CONFERENCE_PROCEEDINGS.map((conf) => (
              <div
                key={conf.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:border-[#8B1E24]/60 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  {/* City, Country & Year */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-[#8B1E24]/10 text-[#8B1E24] border border-[#8B1E24]/20">
                      {conf.city}, {conf.country}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500">
                      {conf.year}
                    </span>
                  </div>

                  {/* Presentation Title */}
                  <h3 className="font-serif text-base font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                    {conf.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-xs text-slate-700 font-medium">
                    {conf.authors}
                  </p>

                  {/* Conference Name & Details */}
                  <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                    <p className="font-semibold text-[#0F2537]">
                      {conf.conference}
                    </p>
                    <p className="text-slate-500 text-[11px]">
                      Contribution: {conf.type}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-400">
                  {conf.scope}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================================
          6. EXTERNAL SCHOLARLY PROFILES STRIP
          ========================================================================= */}
      <section className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-slate-200/90 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E24] block">
              Bibliometric Databases
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537]">
              Author Profiles &amp; External Repositories
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
              Access Dr. Venkata Prasuja Nakka's verified scholarly records and preprint archives on official repositories.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={LAB_INFO.pi.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0F2537] hover:bg-[#8B1E24] transition-colors shadow-2xs"
            >
              <span>Google Scholar</span>
              <ExternalLink className="w-3 h-3 text-[#E0B84C]" />
            </a>

            <a
              href={LAB_INFO.pi.researchGateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#8B1E24] hover:text-[#8B1E24] transition-colors"
            >
              <span>ResearchGate</span>
              <ExternalLink className="w-3 h-3 text-[#C59B27]" />
            </a>

            <a
              href={LAB_INFO.pi.scopusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white border border-slate-200 hover:border-[#8B1E24] hover:text-[#8B1E24] transition-colors"
            >
              <span>Scopus Author</span>
              <ExternalLink className="w-3 h-3 text-[#C59B27]" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
