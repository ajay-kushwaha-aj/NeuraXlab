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
import { useCMS } from '../cms/context/CMSContext';

export default function ResearchArticlesPage() {
  const { publications: cmsPubs } = useCMS();
  const rawPubs = cmsPubs && cmsPubs.length > 0 ? cmsPubs : [];
  const effectiveArticles = rawPubs.length > 0
    ? rawPubs.filter(p => !p.pubType || p.pubType === 'journal_article' || p.pubType === 'review_article')
    : PUBLICATIONS;
  const effectiveBooks = rawPubs.length > 0
    ? rawPubs.filter(p => p.pubType === 'book_chapter')
    : BOOK_CHAPTERS;
  const effectiveConfs = rawPubs.length > 0
    ? rawPubs.filter(p => p.pubType === 'conference_proceeding')
    : CONFERENCE_PROCEEDINGS;

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
    const setYears = new Set(effectiveArticles.map((p) => p.pubYear || p.year));
    return ['All Years', ...Array.from(setYears).sort((a, b) => b - a)];
  }, [effectiveArticles]);

  // Filtered publications
  const filteredArticles = useMemo(() => {
    return effectiveArticles.filter((item) => {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
          <BookOpen className="w-3.5 h-3.5 text-slate-500" />
          <span>NeuroXlab research outputs</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          Publications &amp; Scholarly Contributions
        </h1>

        {/* Description */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Explore the laboratory's peer-reviewed research articles, scholarly book chapters, and scientific conference contributions in stroke biology, neuroprotection, cellular stress signaling, neuroinflammation, and translational neuroscience.
        </p>

        {/* Compact Category Navigation */}
        <div className="pt-2">
          <nav
            aria-label="Publication Categories"
            className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 flex-wrap justify-center gap-1 text-xs sm:text-sm font-semibold"
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
                  className={`px-4 py-2 rounded-lg transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-white text-slate-900 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Subtle Decorative Underline */}
        <div className="w-12 h-0.5 bg-[#8B1E24] mx-auto mt-4" />
      </section>

      {/* =========================================================================
          2. RESEARCH HIGHLIGHTS (REPLACES CLUTTERED THEMATIC DISCOVERY)
          ========================================================================= */}
      {(activeCategory === 'all' || activeCategory === 'articles') && (
        <section id="research-highlights" className="space-y-6">
          <div className="space-y-1.5 border-b border-slate-200 pb-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <BookOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Representative scholarly milestones</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
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
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Topic Badge & Year */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200 truncate">
                      {hl.topic}
                    </span>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">
                      {hl.year}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {hl.title}
                  </h3>

                  {/* Authors & Journal */}
                  <div className="text-xs text-slate-600 space-y-0.5">
                    <p className="font-medium text-slate-800">
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
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#8B1E24] hover:underline"
                  >
                    <span>Read article</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
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
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Peer-reviewed journal articles</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Research Articles
            </h2>
            <div className="w-12 h-0.5 bg-[#8B1E24] mt-2" />
          </div>

          {/* Search & Filter Toolbar */}
          <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
              {/* Search Box */}
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles by title, author, journal, or year..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#8B1E24] focus:ring-1 focus:ring-[#8B1E24] transition-colors"
                  aria-label="Search articles"
                />
              </div>

              {/* Topic Filter */}
              <div className="md:col-span-4">
                <select
                  value={selectedTopic}
                  onChange={(e) => setSelectedTopic(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#8B1E24] font-medium"
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
                  className="w-full px-3 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 focus:outline-hidden focus:border-[#8B1E24] font-medium"
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
              <span className="font-mono text-slate-600 font-medium tabular-nums">
                Showing <strong className="text-slate-900">{filteredArticles.length}</strong> of {effectiveArticles.length} peer-reviewed articles
              </span>

              {isFiltered && (
                <button
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 font-mono font-medium text-[#8B1E24] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset All Filters</span>
                </button>
              )}
            </div>
          </div>

          {/* Clean List-Based Publications Layout */}
          {filteredArticles.length > 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
              {filteredArticles.map((pub, idx) => {
                const isExpanded = !!expandedAbstracts[pub.id];
                return (
                  <article
                    key={pub.id}
                    className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors space-y-3"
                  >
                    {/* Top Row: Topic Badge & Year */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {pub.topic}
                      </span>
                      <span className="text-xs font-mono text-slate-500 tabular-nums">
                        {pub.year}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
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
                        <span className="tabular-nums">({pub.year})</span>
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
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                          <span className="font-mono text-slate-500 uppercase font-medium text-[11px] block mb-1">
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-xs transition-colors"
                      >
                        <span>Read publication</span>
                        <ExternalLink className="w-3 h-3 text-white" />
                      </a>

                      {pub.abstract && (
                        <button
                          onClick={() => toggleAbstract(pub.id)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
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
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
                      >
                        <Quote className="w-3.5 h-3.5 text-slate-500" />
                        <span>Cite / BibTeX</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
                <Search className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                No publications match your search criteria
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                Please try adjusting your search terms, selecting a different topic, or resetting the filters.
              </p>
              <div className="pt-2">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 rounded-lg bg-[#8B1E24] text-white text-xs font-semibold hover:bg-[#A82931] shadow-xs transition-colors cursor-pointer"
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
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <Layers className="w-3.5 h-3.5 text-slate-500" />
              <span>Authored books &amp; protocol compendia</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Book Chapters &amp; Scholarly Contributions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Five verified international monographs, laboratory methods volumes, and academic treatises authored or edited with leading scientific publishers.
            </p>
            <div className="w-12 h-0.5 bg-[#8B1E24] mt-2" />
          </div>

          <div className="grid grid-cols-1 gap-5">
            {effectiveBooks.map((book, idx) => (
              <div
                key={book.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Top Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                        {book.category}
                      </span>
                      <span className="text-xs font-mono text-slate-500 font-medium">
                        {book.publisher}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">
                      Year: {book.year}
                    </span>
                  </div>

                  {/* Chapter / Book Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-slate-900 leading-snug">
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
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal bg-slate-50 p-3.5 rounded-xl border border-slate-200">
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
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-[#8B1E24] bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      <span>Publisher portal</span>
                      <ExternalLink className="w-3 h-3 text-slate-500" />
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
          <div className="space-y-2 border-b border-slate-200 pb-4">
            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600">
              <Globe2 className="w-3.5 h-3.5 text-slate-500" />
              <span>International symposia &amp; proceedings</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">
              Conference Contributions &amp; Proceedings
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Verified scientific presentations and published abstracts presented at international neuroscience congresses across Europe, North America, and Asia.
            </p>
            <div className="w-12 h-0.5 bg-[#8B1E24] mt-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {effectiveConfs.map((conf) => (
              <div
                key={conf.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* City, Country & Year */}
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                      {conf.city}, {conf.country}
                    </span>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">
                      {conf.year}
                    </span>
                  </div>

                  {/* Presentation Title */}
                  <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                    {conf.title}
                  </h3>

                  {/* Authors */}
                  <p className="text-xs text-slate-700 font-medium">
                    {conf.authors}
                  </p>

                  {/* Conference Name & Details */}
                  <div className="text-xs text-slate-600 space-y-1 pt-2 border-t border-slate-100">
                    <p className="font-semibold text-slate-900">
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
      <section className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-medium text-slate-600 block">
              Bibliometric databases
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
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
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#0F2537] hover:bg-[#8B1E24] transition-colors shadow-xs"
            >
              <span>Google Scholar</span>
              <ExternalLink className="w-3 h-3 text-white" />
            </a>

            <a
              href={LAB_INFO.pi.researchGateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:border-slate-300 transition-colors shadow-xs"
            >
              <span>ResearchGate</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>

            <a
              href={LAB_INFO.pi.scopusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:border-slate-300 transition-colors shadow-xs"
            >
              <span>Scopus Author</span>
              <ExternalLink className="w-3 h-3 text-slate-500" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
