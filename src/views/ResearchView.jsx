import React, { useState } from 'react';
import { 
  Flame, 
  CheckCircle2, 
  ExternalLink, 
  Maximize2, 
  Layers, 
  Globe2, 
  ArrowRight, 
  Dna, 
  Activity, 
  Cpu, 
  Sparkles,
  Calendar,
  Building2,
  FileCheck2
} from 'lucide-react';
import { FLAGSHIP_GRANT, RESEARCH_PILLARS, COLLABORATIONS, PAST_GRANTS } from '../data/labData';
import ImageLightboxModal from '../components/ImageLightboxModal';

export default function ResearchView({ setActiveTab }) {
  const [activePillarTab, setActivePillarTab] = useState('pillar-gut-brain');
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', caption: '' });

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  const selectedPillar = RESEARCH_PILLARS.find((p) => p.id === activePillarTab) || RESEARCH_PILLARS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 space-y-20">
      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        imageSrc={lightboxData.src}
        title={lightboxData.title}
        caption={lightboxData.caption}
        onClose={closeLightbox}
      />

      {/* Page Header Header */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5" />
          <span>Department of Systems and Computational Biology</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Research Projects &amp; Collaborations
        </h1>
        <p className="text-[#0F2537]/80 text-sm sm:text-base leading-relaxed">
          Advancing preclinical stroke neuroprotection through the convergence of gut microbiome ecology, organellar stress resolution, non-coding RNA epigenetics, and nanomedicine.
        </p>
      </div>

      {/* 1. Flagship 2026–2029 Extramural Grant In-Depth */}
      <section id="flagship-grant" className="bg-white rounded-3xl border-2 border-[#C59B27]/50 shadow-2xl overflow-hidden scroll-mt-28">
        {/* Grant Header Bar */}
        <div className="bg-[#8B1E24] text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-[#E0B84C] text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5" />
              <span>{FLAGSHIP_GRANT.status}</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white pt-2">
              Flagship Extramural Nanotherapy Project
            </h2>
            <p className="text-xs text-white/80 font-mono">
              Grant Term: {FLAGSHIP_GRANT.grantPeriod} • Principal Investigator: {FLAGSHIP_GRANT.pi}
            </p>
          </div>

          <div className="flex-shrink-0 bg-white/10 rounded-2xl p-4 border border-white/20 text-center md:text-right">
            <span className="text-[11px] uppercase tracking-wider text-[#E0B84C] font-mono">Project Budget</span>
            <div className="text-2xl font-bold font-serif text-white">{FLAGSHIP_GRANT.budget}</div>
            <span className="text-[10px] text-emerald-300 font-semibold">Active Multi-Year Funding</span>
          </div>
        </div>

        {/* Grant Content Grid */}
        <div className="p-6 sm:p-10 space-y-10">
          {/* Title & Biological Rationale */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537] leading-snug">
              "{FLAGSHIP_GRANT.title}"
            </h3>
            <p className="text-[#0F2537]/85 text-base sm:text-lg leading-relaxed">
              {FLAGSHIP_GRANT.summary}
            </p>
          </div>

          {/* Interactive Scientific Diagram Card */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#C59B27] bg-[#0F2537] shadow-xl group">
            <img
              src="/images/nanotherapy_gut_brain.jpg"
              alt="Microbiota-Gut-Brain Axis Nanotherapy Diagram"
              className="w-full h-auto max-h-[550px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold text-[#E0B84C]">
                  Dual-Action Nanotherapy: Gut Microbiota &amp; Cerebral Protection
                </p>
                <p className="text-xs sm:text-sm text-white/90">
                  Microbiome restoration, mucosal tight junction repair, blood-brain barrier rescue, and suppression of neuronal ER stress.
                </p>
              </div>
              <button
                onClick={() =>
                  openLightbox(
                    '/images/nanotherapy_gut_brain.jpg',
                    'Microbiota-Gut-Brain Axis & SCFA Nanotherapy in Stroke',
                    'High-resolution biomedical schematic illustrating the bidirectional loop between stroke-induced gut dysbiosis, systemic endotoxemia, and targeted nano-formulated SCFA and edaravone neuroprotection.'
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B1E24] hover:bg-[#A82931] text-white text-sm font-semibold shadow transition-all flex-shrink-0"
              >
                <Maximize2 className="w-4 h-4" />
                <span>Enlarge Scientific Schematic</span>
              </button>
            </div>
          </div>

          {/* Core Objectives & Methodological Pipeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            {/* Objectives */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-4">
              <div className="flex items-center gap-2">
                <FileCheck2 className="w-5 h-5 text-[#8B1E24]" />
                <h4 className="font-serif text-xl font-bold text-[#0F2537]">
                  Core Scientific Objectives
                </h4>
              </div>
              <ul className="space-y-3">
                {FLAGSHIP_GRANT.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#0F2537]/85 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-[#8B1E24] text-white text-xs flex items-center justify-center flex-shrink-0 mt-1 font-bold">
                      {i + 1}
                    </span>
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Methodologies */}
            <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-[#C59B27]" />
                <h4 className="font-serif text-xl font-bold text-[#0F2537]">
                  Experimental Methodologies &amp; Pipeline
                </h4>
              </div>
              <ul className="space-y-3">
                {FLAGSHIP_GRANT.methodologies.map((m, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#0F2537]/85 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-1" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Quick Opportunity Callout */}
          <div className="bg-[#0F2537] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#C59B27]/40">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#E0B84C] font-mono">Fellowship Openings</span>
              <p className="font-serif text-base sm:text-lg font-bold">
                Junior Research Fellow (JRF) &amp; Postdoc positions are currently open under this grant.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('contact')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#8B1E24] hover:bg-[#A82931] text-sm font-bold text-white transition-all shadow whitespace-nowrap"
            >
              <span>Apply for Project Positions</span>
              <ArrowRight className="w-4 h-4 text-[#E0B84C]" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. 4 Core Research Pillars (Interactive Tabs & Deep Dive) */}
      <section id="research-pillars" className="space-y-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            Comprehensive Scientific Framework
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2537]">
            The 4 Core Research Pillars
          </h2>
          <p className="text-base sm:text-lg text-[#0F2537]/80 leading-relaxed">
            Select a pillar below to inspect detailed biological questions, organellar mechanisms, and experimental platforms.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {RESEARCH_PILLARS.map((p) => {
            const isActive = activePillarTab === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setActivePillarTab(p.id)}
                className={`px-4 sm:px-6 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-[#8B1E24] text-white shadow-lg border border-[#C59B27]'
                    : 'bg-white text-[#0F2537]/80 hover:bg-[#FAF8F5] border border-gray-200 hover:border-[#8B1E24]'
                }`}
              >
                <span className="font-mono text-[11px] opacity-75">Pillar {p.number}</span>
                <span className="hidden md:inline">•</span>
                <span className="truncate max-w-[200px]">{p.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#C59B27]/40 shadow-xl space-y-8 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
            <div>
              <span className="font-mono text-xs font-bold text-[#8B1E24] bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#C59B27]/40 uppercase">
                Core Pillar {selectedPillar.number}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537] mt-2">
                {selectedPillar.title}
              </h3>
              <p className="text-sm text-[#C59B27] font-semibold uppercase tracking-wider mt-1">
                {selectedPillar.subtitle}
              </p>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center flex-shrink-0">
              {selectedPillar.number === '01' && <Activity className="w-8 h-8" />}
              {selectedPillar.number === '02' && <Cpu className="w-8 h-8" />}
              {selectedPillar.number === '03' && <Dna className="w-8 h-8" />}
              {selectedPillar.number === '04' && <Sparkles className="w-8 h-8" />}
            </div>
          </div>

          {/* Lead Summary */}
          <p className="text-base sm:text-lg text-[#0F2537]/85 leading-relaxed">
            {selectedPillar.leadSummary}
          </p>

          {/* If Pillar 2, show the ER stress cellular illustration */}
          {selectedPillar.id === 'pillar-er-stress' && (
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#C59B27] bg-[#0F2537] shadow-xl group my-6">
              <img
                src="/images/er_stress_organelle.jpg"
                alt="ER Stress & UPR Organellar Biology Diagram"
                className="w-full h-auto max-h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-white">
                <div>
                  <p className="font-serif text-xl sm:text-2xl font-bold text-[#E0B84C]">
                    Organelle Proteostasis: ER Stress, BiP/GRP78 &amp; UPR Signaling
                  </p>
                  <p className="text-xs sm:text-sm text-white/90">
                    The molecular triad of PERK, IRE1α, and ATF6 dictating neuronal survival vs. apoptosis.
                  </p>
                </div>
                <button
                  onClick={() =>
                    openLightbox(
                      '/images/er_stress_organelle.jpg',
                      'Endoplasmic Reticulum Stress & UPR Signaling in Ischemia',
                      'Detailed cellular biology render depicting BiP/GRP78 dissociation, phospho-eIF2α translation inhibition, and autophagosomal clearance mechanisms during cerebral ischemia-reperfusion.'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8B1E24] hover:bg-[#A82931] text-white text-sm font-semibold shadow transition-all flex-shrink-0"
                >
                  <Maximize2 className="w-4 h-4" />
                  <span>Enlarge Cellular Render</span>
                </button>
              </div>
            </div>
          )}

          {/* Two-Column Breakdown: Inquiries vs Experimental Tools */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-4">
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] flex items-center gap-2">
                <span>Biological Inquiries</span>
              </h4>
              <ul className="space-y-3">
                {selectedPillar.keyQuestions.map((q, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-[#0F2537]/85 leading-relaxed">
                    <span className="text-[#8B1E24] font-bold text-lg">•</span>
                    <span>{q}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FAF8F5] rounded-2xl p-6 sm:p-8 border border-gray-200 space-y-4">
              <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] flex items-center gap-2">
                <span>Specialized Experimental Platforms</span>
              </h4>
              <ul className="space-y-3">
                {selectedPillar.experimentalTools.map((tool, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 text-sm text-[#0F2537]/85 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0" />
                    <span>{tool}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. National & International Collaborations */}
      <section id="collaborations" className="space-y-8 scroll-mt-28">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            Global Academic Synergies
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2537]">
            Research Collaborations
          </h2>
          <p className="text-base sm:text-lg text-[#0F2537]/80 leading-relaxed">
            Translational partnerships with world-renowned neurological research institutions and national apex laboratories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COLLABORATIONS.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 hover:border-[#C59B27] shadow-sm hover:shadow-lg transition-all space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-[#FAF8F5] text-[#8B1E24] border border-[#C59B27]/40 uppercase tracking-wide">
                  {c.badge}
                </span>
                <span className="text-xs sm:text-sm font-mono text-[#0F2537]/70">
                  {c.location}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                  {c.institution}
                </h3>
                <p className="text-sm text-[#8B1E24] font-semibold mt-0.5">
                  {c.department}
                </p>
              </div>

              <div className="space-y-2.5 text-sm text-[#0F2537]/80 pt-3 border-t border-gray-100 leading-relaxed">
                <p>
                  <strong className="text-[#0F2537]">Collaborator:</strong> {c.leadCollaborator}
                </p>
                <p>
                  <strong className="text-[#0F2537]">Focus:</strong> {c.focus}
                </p>
                <p className="italic text-[#0F2537]/75">
                  <strong className="text-[#0F2537] not-italic">Milestones:</strong> {c.landmarkJointWork}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Past Extramural Grants Archive */}
      <section className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-gray-200 space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
            Funding Track Record
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
            Past Extramural Grants &amp; Institutional Awards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PAST_GRANTS.map((grant, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 shadow-sm space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <span className="text-xs font-mono text-[#8B1E24] font-bold uppercase block">
                  {grant.scheme}
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0F2537] leading-snug">
                  {grant.title}
                </h3>
                <p className="text-sm text-[#0F2537]/75">
                  <strong>Agency:</strong> {grant.agency}
                </p>
                <p className="text-sm text-[#0F2537]/80 leading-relaxed pt-2.5 border-t border-gray-100">
                  {grant.impact}
                </p>
              </div>
              <div className="text-xs sm:text-sm text-emerald-700 font-semibold font-mono pt-3">
                Status: {grant.period}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
