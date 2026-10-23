import React from 'react';
import { 
  ArrowRight, 
  Sparkles, 
  Dna, 
  Activity, 
  Cpu, 
  BookOpen, 
  Users, 
  Award, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Quote,
  Flame,
  CheckCircle2
} from 'lucide-react';
import NeuralCanvas from '../components/NeuralCanvas';
import NeuraXlabLogo from '../components/NeuraXlabLogo';
import uohSeal from '../assets/uoh_seal.png';
import { LAB_INFO, FLAGSHIP_GRANT, RESEARCH_PILLARS, TEAM_MEMBERS, PUBLICATIONS } from '../data/labData';

export default function HomeView({ setActiveTab }) {
  const pi = TEAM_MEMBERS.find((m) => m.id === 'pi') || TEAM_MEMBERS[0];

  const navigateTo = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-20 pb-12">
      {/* 1. Hero Section with Live Neural Canvas */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0F2537] via-[#142e44] to-[#0A1926] text-white px-4 sm:px-6 lg:px-8 border-b-4 border-[#C59B27]">
        {/* Interactive Neural Canvas Background */}
        <NeuralCanvas />

        {/* Ambient Gradient Overlays for contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2537] via-transparent to-black/30 pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto pt-24 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32 text-center space-y-10">
          {/* Institutional Crest Shield */}
          <div className="flex items-center justify-center gap-6 sm:gap-8 mb-6 sm:mb-8">
            <a
              href="https://uohyd.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-24 w-24 sm:h-28 sm:w-28 rounded-xl overflow-hidden border-2 border-[#C59B27] bg-white shadow-xl hover:scale-105 transition-transform duration-300 shrink-0 p-2"
              title="University of Hyderabad (Institution of Eminence)"
            >
              <img
                src={uohSeal}
                alt="University of Hyderabad"
                className="h-full w-full object-contain"
              />
            </a>

            {/* Little vertical line in between the logos */}
            <div className="h-16 sm:h-20 w-px bg-white/30 mx-1 sm:mx-2" aria-hidden="true" />

            <NeuraXlabLogo className="h-20 w-20 sm:h-22 sm:w-22" withFrame={true} />
          </div>

          {/* Main Editorial Hero Headings */}
          <div className="space-y-6 max-w-4xl mx-auto">
            <h1 className="brand-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none drop-shadow-md">
              Neura<span className="text-[#E0B84C]">X</span>lab
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-white/85 max-w-2xl mx-auto font-sans font-light leading-relaxed pt-2">
              Deciphering the microbiota-gut-brain axis, resolving endoplasmic reticulum stress, and developing next-generation nano-therapeutics for ischemic stroke recovery.
            </p>
          </div>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6">
            <button
              onClick={() => navigateTo('research')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl text-base font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] border border-[#C59B27]/50 shadow-lg hover:shadow-xl transition-all active:scale-95 group"
            >
              <span>Explore 2026–2029 Grant</span>
              <ArrowRight className="w-5 h-5 text-[#E0B84C] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('team')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:border-[#C59B27]"
            >
              <Users className="w-5 h-5 text-[#C59B27]" />
              <span>Meet the Team</span>
            </button>

            <button
              onClick={() => navigateTo('publications')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:border-[#C59B27]"
            >
              <BookOpen className="w-5 h-5 text-[#C59B27]" />
              <span>Publications &amp; BibTeX</span>
            </button>
          </div>

          {/* Interactive Canvas Physics Instruction Tooltip */}
          <div className="pt-6">
            <span className="inline-block text-[11px] text-[#FAF8F5]/60 font-mono tracking-wider bg-black/30 px-3 py-1 rounded-full border border-white/10">
              Interactive Synaptic Canvas: Move cursor to stimulate action potentials &amp; neural nodes
            </span>
          </div>
        </div>
      </section>

      {/* 2. Key Telemetry & Metric Counters */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#8B1E24] text-center transform hover:-translate-y-1 transition-all">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#8B1E24]">
              {LAB_INFO.metrics.citations}
            </div>
            <div className="text-xs font-semibold text-[#0F2537]/70 uppercase tracking-wider mt-1">
              Google Citations
            </div>
            <div className="text-[11px] text-[#0F2537]/50 mt-1 font-mono">
              Stroke &amp; Mol Neurobiol
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#C59B27] text-center transform hover:-translate-y-1 transition-all">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
              {LAB_INFO.metrics.hIndex}
            </div>
            <div className="text-xs font-semibold text-[#0F2537]/70 uppercase tracking-wider mt-1">
              h-index / i10-index
            </div>
            <div className="text-[11px] text-[#0F2537]/50 mt-1 font-mono">
              i10-index: {LAB_INFO.metrics.i10Index}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#8B1E24] text-center transform hover:-translate-y-1 transition-all">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#8B1E24]">
              {LAB_INFO.metrics.flagshipGrantAmount}
            </div>
            <div className="text-xs font-semibold text-[#0F2537]/70 uppercase tracking-wider mt-1">
              Flagship Grant
            </div>
            <div className="text-[11px] text-emerald-700 font-semibold mt-1 font-mono">
              Active: {LAB_INFO.metrics.activeGrantPeriod}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#C59B27] text-center transform hover:-translate-y-1 transition-all">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
              {LAB_INFO.metrics.totalPublications}
            </div>
            <div className="text-xs font-semibold text-[#0F2537]/70 uppercase tracking-wider mt-1">
              Papers &amp; Books
            </div>
            <div className="text-[11px] text-[#0F2537]/50 mt-1 font-mono">
              Springer, Elsevier &amp; AHA
            </div>
          </div>

          <div className="col-span-2 md:col-span-1 bg-white rounded-2xl p-6 shadow-xl border-t-4 border-[#0F2537] text-center transform hover:-translate-y-1 transition-all">
            <div className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
              {LAB_INFO.metrics.collaboratingInstitutions}
            </div>
            <div className="text-xs font-semibold text-[#0F2537]/70 uppercase tracking-wider mt-1">
              Global Collaborators
            </div>
            <div className="text-[11px] text-[#0F2537]/50 mt-1 font-mono">
              UW-Madison, NUS &amp; CDRI
            </div>
          </div>
        </div>
      </section>

      {/* 3. Flagship 2026-2029 Grant Spotlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#FAF8F5] via-white to-[#F5EFE6] rounded-3xl p-8 sm:p-12 border border-[#C59B27]/40 shadow-xl relative overflow-hidden">
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#8B1E24]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B1E24] text-white text-xs font-bold uppercase tracking-wider shadow">
                <Flame className="w-3.5 h-3.5 text-[#E0B84C]" />
                <span>Active 3-Year Flagship Grant (2026 – 2029)</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537] leading-tight">
                Therapeutic Potential of Nano-Formulated Short-Chain Fatty Acids and Edaravone in Stroke-Induced Gut Dysbiosis
              </h2>

              <p className="text-[#0F2537]/80 text-base sm:text-lg leading-relaxed">
                Acute ischemic stroke triggers a bidirectional inflammatory cascade: cerebral injury compromises the intestinal barrier, provoking gut dysbiosis that amplifies post-stroke brain damage. NeuraXlab is engineering targeted nanoparticle delivery systems to restore the gut-brain axis and accelerate neurovascular recovery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-[#0F2537]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0" />
                  <span>Dual Encapsulation of SCFAs &amp; Edaravone</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#0F2537]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0" />
                  <span>16S Metagenomic Microbiome Sequencing</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#0F2537]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0" />
                  <span>Blood-Brain Barrier (BBB) Preservation</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-[#0F2537]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0" />
                  <span>ER Stress &amp; UPR Signaling Mitigation</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => navigateTo('research')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#641318] shadow transition-all group"
                >
                  <span>Read Full Grant Details &amp; Objectives</span>
                  <ArrowRight className="w-4 h-4 text-[#E0B84C] group-hover:translate-x-1 transition-transform" />
                </button>
                <span className="text-xs font-mono text-[#0F2537]/60">
                  Grant Period: 27-Jan-2026 to 26-Jan-2029
                </span>
              </div>
            </div>

            {/* Right Visual Column */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#C59B27] shadow-2xl group bg-[#0F2537]">
                <img
                  src="/images/nanotherapy_gut_brain.jpg"
                  alt="Microbiota-Gut-Brain Axis Nanotherapy"
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs">
                  <p className="font-semibold text-[#E0B84C]">
                    Scientific Schematic: Gut-Brain Axis &amp; SCFA Nanomedicine
                  </p>
                  <p className="text-[11px] text-white/80">
                    Dual action on intestinal dysbiosis and cerebral ER stress
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. The 4 Core Research Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
            <span>Research Excellence</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F2537]">
            Core Scientific Pillars
          </h2>
          <p className="text-[#0F2537]/75 text-base sm:text-lg">
            Investigating molecular, cellular, organellar, and systems-level neurobiology to uncover therapeutic targets for acute central nervous system injuries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESEARCH_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="bg-white rounded-3xl p-8 border border-gray-200 hover:border-[#C59B27] shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#8B1E24] bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#C59B27]/30">
                    PILLAR {pillar.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                    {pillar.number === '01' && <Activity className="w-5 h-5" />}
                    {pillar.number === '02' && <Cpu className="w-5 h-5" />}
                    {pillar.number === '03' && <Dna className="w-5 h-5" />}
                    {pillar.number === '04' && <Sparkles className="w-5 h-5" />}
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-xs font-semibold text-[#C59B27] uppercase tracking-wide">
                  {pillar.subtitle}
                </p>

                <p className="text-sm text-[#0F2537]/80 leading-relaxed">
                  {pillar.leadSummary}
                </p>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <p className="text-xs font-bold text-[#0F2537] uppercase tracking-wider">
                    Key Biological Inquiries:
                  </p>
                  <ul className="space-y-1.5 text-xs text-[#0F2537]/70">
                    {pillar.keyQuestions.slice(0, 2).map((q, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#8B1E24] font-bold">•</span>
                        <span>{q}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => navigateTo('research')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E24] hover:text-[#641318] group-hover:underline"
                >
                  <span>Explore Methodologies &amp; Schematics</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Group Leader Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0F2537] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#C59B27]/40 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* PI Portrait / Crest Card */}
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-4">
              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden border-4 border-[#C59B27] shadow-xl bg-[#8B1E24]">
                <img
                  src={pi.avatar}
                  alt={pi.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#FAF8F5]">
                  {pi.name}
                </h3>
                <p className="text-sm text-[#E0B84C] font-medium">
                  {pi.role}
                </p>
                <p className="text-xs text-white/70">
                  {pi.qualification}
                </p>
              </div>
              <button
                onClick={() => navigateTo('team')}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] border border-[#C59B27]/40 transition-all"
              >
                View Full Academic CV &amp; Bio
              </button>
            </div>

            {/* Pedigree & Mission Narrative */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-[#E0B84C] uppercase tracking-wider">
                <Quote className="w-3.5 h-3.5" />
                <span>Group Leader Spotlight</span>
              </div>

              <h3 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                Pioneering Translational Insights into Acute Cerebral Ischemia
              </h3>

              <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
                {pi.bio}
              </p>

              {/* Pedigree Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-[11px] font-mono text-[#C59B27] uppercase">Doctorate (2009)</div>
                  <div className="text-xs font-semibold text-white mt-1">CSIR-CDRI / JNU New Delhi</div>
                  <div className="text-[10px] text-white/60">ER stress in brain damage</div>
                </div>

                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-[11px] font-mono text-[#C59B27] uppercase">Postdoc Fellowship</div>
                  <div className="text-xs font-semibold text-white mt-1">Univ. of Wisconsin–Madison</div>
                  <div className="text-[10px] text-white/60">Neurological Surgery (USA)</div>
                </div>

                <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                  <div className="text-[11px] font-mono text-[#C59B27] uppercase">International Postdoc</div>
                  <div className="text-xs font-semibold text-white mt-1">National Univ. of Singapore</div>
                  <div className="text-[10px] text-white/60">Pharmacology &amp; Neurobiology</div>
                </div>
              </div>

              <div className="pt-2 text-xs text-white/70 flex flex-wrap items-center gap-4">
                <span>📍 Room F75C, SLS Annex, University of Hyderabad</span>
                <span>✉️ prasuja@uohyd.ac.in</span>
                <span>📞 +91-40-23134581</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Interactive Portal Directory */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537]">
            Laboratory Directory
          </h2>
          <p className="text-sm text-[#0F2537]/75">
            Quick access to our research facilities, publication repositories, academic events, and fellowship opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            onClick={() => navigateTo('research')}
            className="cursor-pointer bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center mb-4 group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
              Research &amp; Collaborations
            </h3>
            <p className="text-xs text-[#0F2537]/70 mt-2 leading-relaxed">
              Explore the 2026–2029 Nanotherapy grant, 4 research pillars, and international partnerships with UW-Madison and NUS.
            </p>
          </div>

          <div
            onClick={() => navigateTo('publications')}
            className="cursor-pointer bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center mb-4 group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
              Peer-Reviewed Publications
            </h3>
            <p className="text-xs text-[#0F2537]/70 mt-2 leading-relaxed">
              Search all landmark papers (Stroke, Mol Neurobiol, JCBFM) with our interactive one-click BibTeX citation copy generator.
            </p>
          </div>

          <div
            onClick={() => navigateTo('articles')}
            className="cursor-pointer bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center mb-4 group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
              <Dna className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
              Book Chapters &amp; Protocols
            </h3>
            <p className="text-xs text-[#0F2537]/70 mt-2 leading-relaxed">
              Comprehensive volumes from Cambridge Scholars Publishing, Academic Press (Methods in Enzymology), and Springer.
            </p>
          </div>

          <div
            onClick={() => navigateTo('team')}
            className="cursor-pointer bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center mb-4 group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
              Meet the Team
            </h3>
            <p className="text-xs text-[#0F2537]/70 mt-2 leading-relaxed">
              Browse profiles of Postdoctoral fellows, CSIR/DBT Ph.D. scholars, Master's trainees, and prestigious alumni destinations.
            </p>
          </div>

          <div
            onClick={() => navigateTo('activities')}
            className="cursor-pointer bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center mb-4 group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
              Activities &amp; Workshops
            </h3>
            <p className="text-xs text-[#0F2537]/70 mt-2 leading-relaxed">
              Chronicle of national skill development workshops, invited keynotes at SNCI, NEHU, and international SfN conferences.
            </p>
          </div>

          <div
            onClick={() => navigateTo('contact')}
            className="cursor-pointer bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center mb-4 group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors">
              Opportunities &amp; Contact
            </h3>
            <p className="text-xs text-[#0F2537]/70 mt-2 leading-relaxed">
              Open JRF/SRF/Postdoc positions under the active 2026–2029 grant, applicant submission portal, and laboratory coordinates.
            </p>
          </div>
        </div>
      </section>

      {/* 7. Institutional Endorsement & Central University Footer Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#8B1E24] text-white flex items-center justify-center font-serif text-xl font-bold border border-[#C59B27]">
              UoH
            </div>
            <div>
              <p className="text-xs font-bold text-[#8B1E24] uppercase tracking-wider">
                University of Hyderabad
              </p>
              <p className="text-sm font-semibold text-[#0F2537]">
                Ranked Among India's Top Central Universities (Institution of Eminence)
              </p>
            </div>
          </div>
          <div className="text-xs text-[#0F2537]/70">
            School of Life Sciences • Dept. of Systems &amp; Computational Biology
          </div>
        </div>
      </section>
    </div>
  );
}
