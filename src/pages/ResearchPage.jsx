import React, { useState } from 'react';
import {
  Activity,
  Dna,
  Cpu,
  Layers,
  ArrowRight,
  Maximize2,
  FileCheck2,
  Globe2,
  Building2,
  Calendar,
  ExternalLink,
  ChevronRight,
  AlertCircle,
  FlaskConical,
  Award,
  Compass,
  FileText,
  Mail,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import {
  RESEARCH_HERO,
  RESEARCH_OVERVIEW,
  FEATURED_RESEARCH_DIRECTIONS,
  ONGOING_PROJECTS,
  RESEARCH_COLLABORATORS,
  PAST_GRANTS,
  LAB_INFO
} from '../data/labData';
import { useCMS } from '../cms/context/CMSContext';
import ImageLightboxModal from '../components/ImageLightboxModal';

export default function ResearchPage({ setActiveTab }) {
  const { researchAreas: cmsAreas, projects: cmsProjects } = useCMS();
  const effectiveProjects = cmsProjects && cmsProjects.length > 0 ? cmsProjects : ONGOING_PROJECTS;

  const [lightboxData, setLightboxData] = useState({
    isOpen: false,
    src: '',
    title: '',
    caption: ''
  });

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navSections = [
    { id: 'research-overview', label: 'Overview' },
    { id: 'research-directions', label: 'Featured Directions' },
    { id: 'ongoing-projects', label: 'Ongoing Projects' },
    { id: 'collaborators', label: 'Collaborators' },
    { id: 'funding-archive', label: 'Past Grants' },
    { id: 'contact-cta', label: 'Join the Lab' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-20 space-y-16 sm:space-y-20 w-full max-w-full overflow-x-hidden">
      {/* Lightbox Modal for Scientific Schematics */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        imageSrc={lightboxData.src}
        title={lightboxData.title}
        caption={lightboxData.caption}
        onClose={closeLightbox}
      />

      {/* =========================================================================
          1. RESEARCH DOSSIER HERO
          ========================================================================= */}
      <section className="text-center max-w-3xl mx-auto space-y-4 pt-2">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-xs font-mono font-medium text-slate-700">
          <FlaskConical className="w-3.5 h-3.5 text-[#8B1E24]" />
          <span>Academic research dossier</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
          Understanding the Neurobiology of Disease and Stroke
        </h1>

        {/* Subtitle */}
        <p className="font-serif italic text-base sm:text-lg text-slate-600 font-normal">
          From bench to bedside: Investigating ischemic stroke, the microbiota–gut–brain axis, ER proteostasis, and translational nanomedicine.
        </p>

        {/* Supporting Abstract */}
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal max-w-2xl mx-auto pt-1">
          {RESEARCH_HERO.paragraph}
        </p>

        {/* Core Themes Pills */}
        <div className="pt-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {RESEARCH_HERO.themes.map((theme, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-700 shadow-2xs hover:border-[#8B1E24] hover:text-[#8B1E24] transition-colors"
              >
                {theme}
              </span>
            ))}
          </div>
        </div>

        {/* Subtle Decorative Underline */}
        <div className="w-12 h-0.5 bg-[#8B1E24] mx-auto mt-4" />
      </section>

      {/* =========================================================================
          IN-PAGE QUICK ANCHOR NAVIGATION
          ========================================================================= */}
      <nav
        aria-label="Research sections"
        className="sticky top-20 z-20 bg-white/95 backdrop-blur-md rounded-xl border border-slate-200 p-1.5 shadow-2xs flex items-center justify-start sm:justify-center gap-1 overflow-x-auto w-full max-w-full"
      >
        {navSections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors whitespace-nowrap cursor-pointer shrink-0"
          >
            {sec.label}
          </button>
        ))}
      </nav>

      {/* =========================================================================
          2. RESEARCH OVERVIEW & 3 CORE PILLARS
          ========================================================================= */}
      <section id="research-overview" className="space-y-8 scroll-mt-28">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600">
            <Compass className="w-3.5 h-3.5 text-slate-500" />
            <span>Theoretical &amp; experimental foundation</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Research Overview
          </h2>
          <div className="w-12 h-0.5 bg-[#8B1E24] mt-2" />
        </div>

        {/* Narrative Synthesis Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
          {RESEARCH_OVERVIEW.paragraphs.map((para, pIdx) => (
            <p key={pIdx}>
              {para}
            </p>
          ))}
        </div>

        {/* 3 Core Scientific Pillars */}
        <div className="space-y-3">
          <span className="text-xs font-mono font-medium text-slate-500 block">
            Three Core Scientific Pillars
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-slate-400">
                    Pillar 01
                  </span>
                  <Activity className="w-4 h-4 text-[#8B1E24]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#8B1E24] transition-colors leading-snug">
                    {RESEARCH_OVERVIEW.pillars[0].title}
                  </h3>
                  <p className="text-xs font-medium text-[#8B1E24] mt-0.5">
                    {RESEARCH_OVERVIEW.pillars[0].subtitle}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {RESEARCH_OVERVIEW.pillars[0].description}
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-slate-400">
                    Pillar 02
                  </span>
                  <Dna className="w-4 h-4 text-[#8B1E24]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#8B1E24] transition-colors leading-snug">
                    {RESEARCH_OVERVIEW.pillars[1].title}
                  </h3>
                  <p className="text-xs font-medium text-[#8B1E24] mt-0.5">
                    {RESEARCH_OVERVIEW.pillars[1].subtitle}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {RESEARCH_OVERVIEW.pillars[1].description}
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-medium text-slate-400">
                    Pillar 03
                  </span>
                  <Cpu className="w-4 h-4 text-[#8B1E24]" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-slate-900 group-hover:text-[#8B1E24] transition-colors leading-snug">
                    {RESEARCH_OVERVIEW.pillars[2].title}
                  </h3>
                  <p className="text-xs font-medium text-[#8B1E24] mt-0.5">
                    {RESEARCH_OVERVIEW.pillars[2].subtitle}
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {RESEARCH_OVERVIEW.pillars[2].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. FEATURED RESEARCH DIRECTIONS
          ========================================================================= */}
      <section id="research-directions" className="space-y-8 scroll-mt-28">
        <div id="research-pillars" className="scroll-mt-28" />

        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>Programmatic research thrusts</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Featured Research Directions
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Detailed investigation tracks integrating experimental rodent stroke models, metagenomic sequencing, organellar proteostasis, and translational nanomedicine.
          </p>
          <div className="w-12 h-0.5 bg-[#8B1E24] mt-2" />
        </div>

        <div className="space-y-8">
          {/* DIRECTION 1 */}
          <article
            id="direction-1"
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors overflow-hidden scroll-mt-28"
          >
            <div id="pillar-gut-brain" className="scroll-mt-28" />
            {/* Top Clean Header */}
            <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono font-medium text-[#8B1E24]">
                Direction 01 • {FEATURED_RESEARCH_DIRECTIONS[0].category}
              </span>
              <span className="font-mono text-slate-500 text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200">
                Experimental &amp; Metagenomics
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Text & Takeaway */}
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {FEATURED_RESEARCH_DIRECTIONS[0].fullTitle}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {FEATURED_RESEARCH_DIRECTIONS[0].description}
                  </p>

                  {/* Scientific Takeaway Callout */}
                  <div className="p-4 rounded-xl bg-slate-50 border-l-2 border-[#8B1E24] border-y border-r border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                    <span className="font-mono text-[11px] uppercase text-slate-500 font-semibold block">
                      Key Scientific Finding / Focus
                    </span>
                    <p className="font-medium text-slate-900 leading-relaxed">
                      {FEATURED_RESEARCH_DIRECTIONS[0].takeaway}
                    </p>
                  </div>

                  {/* Action Link to Ongoing Project */}
                  <div className="pt-1">
                    <button
                      onClick={() => scrollToSection('ongoing-projects')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1E24] hover:text-[#73181D] cursor-pointer group"
                    >
                      <span>View associated extramural award (ICMR 2026–2029)</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right: Scientific Visual */}
                <div className="lg:col-span-6 space-y-2">
                  <div
                    onClick={() =>
                      openLightbox(
                        FEATURED_RESEARCH_DIRECTIONS[0].image,
                        FEATURED_RESEARCH_DIRECTIONS[0].fullTitle,
                        FEATURED_RESEARCH_DIRECTIONS[0].imageCaption
                      )
                    }
                    className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-[16/10] group cursor-pointer"
                  >
                    <img
                      src={FEATURED_RESEARCH_DIRECTIONS[0].image}
                      alt={FEATURED_RESEARCH_DIRECTIONS[0].imageAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/images/neurobiology_stroke_disease.jpg';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-medium border border-white/20 inline-flex items-center gap-1.5 shadow-sm transition-colors">
                        <Maximize2 className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>Enlarge diagram</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic leading-snug px-1">
                    {FEATURED_RESEARCH_DIRECTIONS[0].imageCaption}
                  </p>
                </div>
              </div>
            </div>
          </article>

          {/* DIRECTION 2 */}
          <article
            id="direction-2"
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors overflow-hidden scroll-mt-28"
          >
            <div id="pillar-nanomedicine" className="scroll-mt-28" />
            <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono font-medium text-[#8B1E24]">
                Direction 02 • {FEATURED_RESEARCH_DIRECTIONS[1].category}
              </span>
              <span className="font-mono text-slate-500 text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200">
                Translational Nanotherapeutics
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left on Desktop: Scientific Visual */}
                <div className="lg:col-span-6 order-2 lg:order-1 space-y-2">
                  <div
                    onClick={() =>
                      openLightbox(
                        FEATURED_RESEARCH_DIRECTIONS[1].image,
                        FEATURED_RESEARCH_DIRECTIONS[1].fullTitle,
                        FEATURED_RESEARCH_DIRECTIONS[1].imageCaption
                      )
                    }
                    className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-[16/10] group cursor-pointer"
                  >
                    <img
                      src={FEATURED_RESEARCH_DIRECTIONS[1].image}
                      alt={FEATURED_RESEARCH_DIRECTIONS[1].imageAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/images/neurobiology_stroke_disease.jpg';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-medium border border-white/20 inline-flex items-center gap-1.5 shadow-sm transition-colors">
                        <Maximize2 className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>Enlarge diagram</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic leading-snug px-1">
                    {FEATURED_RESEARCH_DIRECTIONS[1].imageCaption}
                  </p>
                </div>

                {/* Right on Desktop: Text, Scope & Takeaway */}
                <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {FEATURED_RESEARCH_DIRECTIONS[1].fullTitle}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {FEATURED_RESEARCH_DIRECTIONS[1].description}
                  </p>

                  {/* Preclinical Scope Notice */}
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-[#8B1E24] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      <strong className="font-semibold text-slate-800">Preclinical scope:</strong> {FEATURED_RESEARCH_DIRECTIONS[1].scopeNote}
                    </p>
                  </div>

                  {/* Scientific Takeaway Callout */}
                  <div className="p-4 rounded-xl bg-slate-50 border-l-2 border-[#8B1E24] border-y border-r border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                    <span className="font-mono text-[11px] uppercase text-slate-500 font-semibold block">
                      Key Scientific Finding / Focus
                    </span>
                    <p className="font-medium text-slate-900 leading-relaxed">
                      {FEATURED_RESEARCH_DIRECTIONS[1].takeaway}
                    </p>
                  </div>

                  {/* Action Link to Ongoing Projects */}
                  <div className="pt-1">
                    <button
                      onClick={() => scrollToSection('ongoing-projects')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1E24] hover:text-[#73181D] cursor-pointer group"
                    >
                      <span>View associated nanomaterial project (ICMR Co-PI)</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* DIRECTION 3 */}
          <article
            id="direction-3"
            className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-colors overflow-hidden scroll-mt-28"
          >
            <div id="pillar-er-stress" className="scroll-mt-28" />
            <div className="px-6 py-3.5 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-mono font-medium text-[#8B1E24]">
                Direction 03 • {FEATURED_RESEARCH_DIRECTIONS[2].category}
              </span>
              <span className="font-mono text-slate-500 text-[11px] px-2 py-0.5 rounded bg-white border border-slate-200">
                Organellar Proteostasis
              </span>
            </div>

            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                {/* Left: Text & Takeaway */}
                <div className="lg:col-span-6 space-y-4">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                    {FEATURED_RESEARCH_DIRECTIONS[2].fullTitle}
                  </h3>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-normal">
                    {FEATURED_RESEARCH_DIRECTIONS[2].description}
                  </p>

                  {/* Scientific Takeaway Callout */}
                  <div className="p-4 rounded-xl bg-slate-50 border-l-2 border-[#8B1E24] border-y border-r border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1">
                    <span className="font-mono text-[11px] uppercase text-slate-500 font-semibold block">
                      Key Scientific Finding / Focus
                    </span>
                    <p className="font-medium text-slate-900 leading-relaxed">
                      {FEATURED_RESEARCH_DIRECTIONS[2].takeaway}
                    </p>
                  </div>

                  {/* Action Link to Ongoing Projects */}
                  <div className="pt-1">
                    <button
                      onClick={() => scrollToSection('ongoing-projects')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B1E24] hover:text-[#73181D] cursor-pointer group"
                    >
                      <span>View associated extramural award (ANRF-PAIR)</span>
                      <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right: Scientific Visual */}
                <div className="lg:col-span-6 space-y-2">
                  <div
                    onClick={() =>
                      openLightbox(
                        FEATURED_RESEARCH_DIRECTIONS[2].image,
                        FEATURED_RESEARCH_DIRECTIONS[2].fullTitle,
                        FEATURED_RESEARCH_DIRECTIONS[2].imageCaption
                      )
                    }
                    className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-[16/10] group cursor-pointer"
                  >
                    <img
                      src={FEATURED_RESEARCH_DIRECTIONS[2].image}
                      alt={FEATURED_RESEARCH_DIRECTIONS[2].imageAlt}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = '/images/er_stress_organelle.jpg';
                      }}
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-md bg-black/70 hover:bg-black/90 backdrop-blur-md text-white text-xs font-medium border border-white/20 inline-flex items-center gap-1.5 shadow-sm transition-colors">
                        <Maximize2 className="w-3.5 h-3.5 text-[#C59B27]" />
                        <span>Enlarge diagram</span>
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 italic leading-snug px-1">
                    {FEATURED_RESEARCH_DIRECTIONS[2].imageCaption}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================================
          4. ONGOING RESEARCH PROJECTS (EXTRAMURAL GRANTS)
          ========================================================================= */}
      <section id="ongoing-projects" className="space-y-8 scroll-mt-28">
        <div id="flagship-grant" className="scroll-mt-28" />

        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600">
            <FileCheck2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Extramural grants &amp; investigations</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Ongoing Research Projects
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Funded extramural research projects active at the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad.
          </p>
          <div className="w-12 h-0.5 bg-[#8B1E24] mt-2" />
        </div>

        {/* Data-Verification Advisory Card */}
        <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-semibold text-amber-950">Data verification notice:</strong> Institutional records register identifier <code className="font-mono font-semibold">IRPGS-2025-01-02193</code> for both the gut dysbiosis award (2026–2029; PI) and the engineered nanomaterials project (2024–2027; Co-PI). These reflect distinct investigation scopes and sanction timelines.
          </p>
        </div>

        {/* 2x2 Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
          {effectiveProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:border-slate-300 transition-colors flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                {/* Header Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-medium bg-slate-100 text-slate-800 border border-slate-200">
                      {project.fundingAgency}
                    </span>
                    <span className="text-xs font-mono text-slate-500 tabular-nums">
                      {project.duration}
                    </span>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-emerald-50 text-emerald-800 border border-emerald-200/80">
                    {project.role}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-serif text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-[#8B1E24] transition-colors">
                  {project.title}
                </h3>

                {/* Structured Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Agency</span>
                    <span className="font-semibold text-slate-800">{project.fundingAgencyFull}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase font-semibold">Appointment</span>
                    <span className="font-semibold text-[#8B1E24]">{project.role}</span>
                  </div>
                  {project.projectId && (
                    <div className="sm:col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between gap-2">
                      <span className="text-slate-400 text-[10px] uppercase font-semibold">Project ID:</span>
                      <span className="text-slate-700 font-semibold">{project.projectId}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {project.description}
                </p>
              </div>

              {/* Card Footer: Explore Link */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 font-mono text-[11px] truncate max-w-[200px]">
                  Focus: {project.relatedDirectionTitle}
                </span>
                <button
                  onClick={() => scrollToSection(project.relatedDirectionId)}
                  className="inline-flex items-center gap-1 font-semibold text-[#8B1E24] hover:text-[#73181D] cursor-pointer group/btn shrink-0"
                >
                  <span>Explore direction</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. RESEARCH COLLABORATORS
          ========================================================================= */}
      <section id="collaborators" className="space-y-8 scroll-mt-28">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600">
            <Globe2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Academic synergies &amp; research network</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Research Collaborators
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm leading-relaxed max-w-3xl">
            Active and verified scientific partnerships with leading neuroscience institutes, national apex centres, and central university investigators.
          </p>
          <div className="w-12 h-0.5 bg-[#8B1E24] mt-2" />
        </div>

        {/* 4-Col Grid of Collaborators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
          {RESEARCH_COLLABORATORS.map((collab) => (
            <div
              key={collab.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-200 flex flex-col justify-between space-y-3 group"
            >
              <div className="space-y-2.5">
                {/* Header Tag */}
                <div className="flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 text-slate-700 border border-slate-200">
                    {collab.badge}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    {collab.country}
                  </span>
                </div>

                {/* Collaborator Name & Title */}
                <div>
                  <h3 className="font-serif text-base font-bold text-slate-900 group-hover:text-[#8B1E24] transition-colors leading-snug">
                    {collab.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#8B1E24] mt-0.5">
                    {collab.title}
                  </p>
                </div>

                {/* Institutional Affiliation */}
                <div className="text-xs text-slate-600 space-y-0.5 pt-2 border-t border-slate-100">
                  <p className="font-medium text-slate-800">
                    {collab.department}
                  </p>
                  <p className="text-slate-500">
                    {collab.institution}
                  </p>
                  <p className="text-slate-400 text-[11px]">
                    {collab.location}
                  </p>
                </div>
              </div>

              {/* Collaborative Area */}
              <div className="pt-2.5 border-t border-slate-100">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block mb-0.5">
                  Collaborative area
                </span>
                <p className="text-xs text-slate-700 leading-relaxed font-normal">
                  {collab.collaborativeFocus}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. PAST EXTRAMURAL GRANTS & INSTITUTIONAL SCHEMES ARCHIVE
          ========================================================================= */}
      <section id="funding-archive" className="space-y-6 scroll-mt-28">
        <div className="space-y-1.5 border-b border-slate-200 pb-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-slate-600">
            <Award className="w-3.5 h-3.5 text-slate-500" />
            <span>Funding track record</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900">
            Past Extramural Grants &amp; Institutional Awards
          </h2>
          <div className="w-12 h-0.5 bg-[#8B1E24] mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {PAST_GRANTS.map((grant, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[11px] font-mono text-[#8B1E24] font-medium">
                    {grant.scheme}
                  </span>
                  <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/80">
                    {grant.period}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-slate-900 leading-snug">
                  {grant.title}
                </h3>
                <p className="text-xs text-slate-600">
                  <strong className="text-slate-800">Agency:</strong> {grant.agency}
                </p>
                <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {grant.impact}
                </p>
              </div>

              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100">
                Role: {grant.role}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. TRANSLATIONAL INQUIRIES & CALL-TO-ACTION
          ========================================================================= */}
      <section
        id="contact-cta"
        className="bg-[#0F2537] text-white rounded-2xl p-8 sm:p-10 border border-[#C59B27]/40 shadow-md space-y-6 scroll-mt-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <span className="text-xs font-mono font-medium uppercase tracking-wider text-[#C59B27]">
              Translational Collaboration &amp; Trainee Opportunities
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Interested in Collaborating or Joining NeuroXlab?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-normal">
              We welcome scientific inquiries from prospective doctoral scholars with national fellowships (CSIR/UGC-NET JRF, DBT, ICMR), postdoctoral applicants, and academic or clinical collaborators. Direct inquiries can be addressed to Dr. Venkata Prasuja Nakka at{' '}
              <a href="mailto:nvprasuja@uohyd.ac.in" className="font-mono text-[#C59B27] hover:underline font-medium">
                nvprasuja@uohyd.ac.in
              </a>.
            </p>
          </div>

          <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-center lg:items-end">
            <button
              onClick={() => {
                if (setActiveTab) {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#8B1E24] hover:bg-[#73181D] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer border border-white/10 min-h-[44px] shadow-xs hover:shadow-sm"
            >
              <span>Explore open positions</span>
              <ArrowRight className="w-4 h-4 text-[#C59B27]" />
            </button>
            <a
              href="mailto:nvprasuja@uohyd.ac.in"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-medium transition-colors border border-white/15 min-h-[44px]"
            >
              <Mail className="w-4 h-4 text-white/70" />
              <span>Email laboratory PI</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
