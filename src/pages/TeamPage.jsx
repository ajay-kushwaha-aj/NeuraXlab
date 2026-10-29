import React, { useState, useEffect } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  Mail,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Building2,
  ArrowRight,
  ShieldCheck,
  FileText,
  Activity,
  Cpu,
  Dna,
  Network,
  Sparkles,
  Globe2,
  ZoomIn
} from 'lucide-react';
import { LAB_INFO, TEAM_MEMBERS, ALUMNI_MEMBERS } from '../data/labData';
import { useCMS } from '../cms/context/CMSContext';
import ImageLightboxModal from '../components/ImageLightboxModal';

// Member Editorial Card matching academic institute styling (Reference Image 2)
function MemberEditorialCard({ member, openLightbox }) {
  if (!member) return null;
  const avatar = member.avatar || member.avatarUrl || '/images/default_avatar.jpg';
  const name = member.name || member.fullName || 'Lab Member';
  const email = member.email || member.contact?.email || '';
  const bio = member.fullBio || member.summaryBio || member.bio || '';
  const qualification = member.qualification || '';

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all p-6 sm:p-8 lg:p-10">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left Column: Authentic Portrait */}
        <div className="md:col-span-4 lg:col-span-3 flex justify-center md:justify-start">
          <div
            onClick={() => {
              if (typeof openLightbox === 'function') {
                openLightbox(
                  avatar,
                  name,
                  `${member.role || ''} (${qualification}) — NeuroXLab`
                );
              }
            }}
            className="relative w-44 sm:w-52 aspect-[3/4] rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 group cursor-pointer shrink-0"
            title="Click to view portrait"
          >
            <img
              src={avatar}
              alt={`${name}, ${qualification}`}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.src = '/images/default_avatar.jpg';
              }}
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <ZoomIn className="w-5 h-5 text-[#E0B84C]" />
            </div>
          </div>
        </div>

        {/* Right Column: Name, Qualification, Rule, Email, Full Bio */}
        <div className="md:col-span-8 lg:col-span-9 space-y-3">
          {/* Top Divider Line (Reference Image 2) */}
          <div className="w-full h-px bg-slate-200 mb-4" />

          {/* Header with Name and Degree */}
          <div>
            <h3 className="font-serif text-2xl sm:text-3xl lg:text-[32px] font-bold text-[#8B1E24] tracking-tight">
              {name}
              {qualification && (
                <>
                  <span className="text-[#8B1E24]">, </span>
                  <span className="font-serif text-xl sm:text-2xl font-normal text-[#8B1E24]">
                    {qualification}
                  </span>
                </>
              )}
            </h3>
          </div>

          {/* Divider Line directly below name (Reference Image 2) */}
          <div className="w-full h-px bg-slate-200 my-2.5" />

          {/* Email */}
          {email && (
            <div className="text-sm sm:text-base font-sans text-slate-800">
              <span className="font-medium text-slate-700">Email : </span>
              <a
                href={`mailto:${email}`}
                className="text-[#0F2537] hover:text-[#8B1E24] underline underline-offset-2 font-mono text-xs sm:text-sm"
              >
                {email}
              </a>
            </div>
          )}

          {/* Full Bio Paragraph */}
          {bio && (
            <p className="text-xs sm:text-sm sm:leading-relaxed text-slate-700 font-sans text-justify pt-2">
              {bio}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function TeamPage({ setActiveTab, activeSubSection, setActiveSubSection }) {
  const { teamMembers: cmsTeam, alumniMembers: cmsAlumni } = useCMS();
  const allTeam = cmsTeam && cmsTeam.length > 0 ? cmsTeam : TEAM_MEMBERS;
  const allAlumni = cmsAlumni && cmsAlumni.length > 0 ? cmsAlumni : ALUMNI_MEMBERS;

  const isMembersSubSection = (section) => {
    return (
      section === 'team-roster' ||
      section === 'members' ||
      section === 'team-members' ||
      section === 'postdoctoral-researchers' ||
      section === 'doctoral-researchers' ||
      section === 'project-staff' ||
      section === 'alumni-network'
    );
  };

  // Directly derive active view: 'groupleader' or 'members' from activeSubSection
  const activeTabSub = isMembersSubSection(activeSubSection) ? 'members' : 'groupleader';

  const handleTabSwitch = (targetTab) => {
    if (setActiveSubSection) {
      if (targetTab === 'members') {
        setActiveSubSection('team-roster');
      } else {
        setActiveSubSection('group-leader');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to active section when activeSubSection prop changes to an in-page section
  useEffect(() => {
    if (activeSubSection && activeSubSection !== 'group-leader' && activeSubSection !== 'team-roster') {
      setTimeout(() => {
        const elem = document.getElementById(activeSubSection);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [activeSubSection]);

  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', caption: '' });

  const pi = (allTeam && allTeam.find((m) => m && (m.id === 'pi' || m.category === 'pi'))) || TEAM_MEMBERS[0];
  const postdocs = (allTeam && allTeam.filter((m) => m && m.category === 'postdoc')) || [];
  const doctoralResearchers = (allTeam && allTeam.filter((m) => m && m.category === 'phd')) || [];
  const projectStaff = (allTeam && allTeam.filter((m) => m && m.category === 'staff')) || [];

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-20 space-y-12">
      {/* Lightbox Modal for enlarged portraits */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        imageSrc={lightboxData.src}
        title={lightboxData.title}
        caption={lightboxData.caption}
        onClose={closeLightbox}
      />

      {/* 1. Page Header matching exact design reference */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5 text-[#C59B27]" />
          <span>ACADEMIC LEADERSHIP &amp; SCIENTIFIC ROSTER</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Meet the Team
        </h1>
        <p className="text-[#0F2537]/80 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Explore the academic pedigree of Dr. Venkata Prasuja Nakka alongside our active postdoctoral fellows, doctoral scholars, and graduate trainees.
        </p>

        {/* Tab Switcher: Group Leader Dossier vs Team Members & Supervision */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white border-2 border-[#C59B27]/40 shadow-sm text-sm font-bold mt-4">
          <button
            onClick={() => handleTabSwitch('groupleader')}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTabSub === 'groupleader'
                ? 'bg-[#8B1E24] text-white shadow-md'
                : 'text-[#0F2537]/75 hover:text-[#8B1E24]'
            }`}
          >
            <GraduationCap className="w-4 h-4 text-[#E0B84C]" />
            <span>Group Leader Dossier</span>
          </button>
          <button
            onClick={() => handleTabSwitch('members')}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 cursor-pointer ${
              activeTabSub === 'members'
                ? 'bg-[#8B1E24] text-white shadow-md'
                : 'text-[#0F2537]/75 hover:text-[#8B1E24]'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Team Members &amp; Supervision</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: GROUP LEADER DOSSIER (COMPLETE DETAILED PROFILE OF DR. NAKKA)
          ========================================================================= */}
      {activeTabSub === 'groupleader' && (
        <div id="group-leader" className="space-y-12 animate-in fade-in duration-300 scroll-mt-28">
          {/* 1. Profile Header & Introduction Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md overflow-hidden">
            {/* Top Accent Strip */}
            <div className="bg-[#8B1E24] text-white px-6 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#C59B27]">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#E0B84C]" />
                <span className="text-xs uppercase tracking-widest text-[#E0B84C] font-mono font-semibold">
                  PRINCIPAL INVESTIGATOR &amp; LAB DIRECTOR
                </span>
              </div>
              <span className="text-xs font-mono bg-white/10 px-3 py-1 rounded-lg border border-white/20 text-white font-medium">
                University of Hyderabad (IoE)
              </span>
            </div>

            <div className="p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                {/* Left Column: Authentic Professional Portrait & Quick Contact */}
                <div className="lg:col-span-4 flex flex-col items-center space-y-5">
                  <div
                    onClick={() =>
                      openLightbox(
                        pi.avatar || pi.avatarUrl || '/images/dr_prasuja_nakka.jpg',
                        pi.name || pi.fullName || 'Dr. Venkata Prasuja Nakka',
                        `${pi.role || 'Principal Investigator'} — ${pi.affiliation || 'University of Hyderabad'}`
                      )
                    }
                    className="relative rounded-2xl overflow-hidden border-2 border-[#C59B27]/70 shadow-lg bg-[#0F2537] aspect-[3/4] w-full max-w-[280px] sm:max-w-[300px] group cursor-pointer"
                    title="Click to enlarge portrait"
                  >
                    <img
                      src={pi.avatar || pi.avatarUrl || '/images/dr_prasuja_nakka.jpg'}
                      alt="Dr. Venkata Prasuja Nakka, Ph.D. - Official Institutional Portrait, University of Hyderabad"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = '/images/dr_prasuja_nakka.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white gap-2 font-medium text-xs">
                      <ZoomIn className="w-4 h-4 text-[#E0B84C]" />
                      <span>Enlarge Portrait</span>
                    </div>
                  </div>

                  <div className="w-full max-w-[300px] p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-2.5 text-xs">
                    <div className="space-y-1">
                      <span className="font-mono text-slate-500 uppercase block font-semibold">Institutional Email</span>
                      <a href="mailto:nvprasuja@uohyd.ac.in" className="font-mono text-[#8B1E24] font-semibold hover:underline block truncate">
                        nvprasuja@uohyd.ac.in
                      </a>
                    </div>
                    <div className="space-y-1 pt-1.5 border-t border-slate-200/60">
                      <span className="font-mono text-slate-500 uppercase block font-semibold">Primary Email</span>
                      <a href="mailto:nvprasuja@gmail.com" className="font-mono text-slate-700 font-semibold hover:text-[#8B1E24] hover:underline block truncate">
                        nvprasuja@gmail.com
                      </a>
                    </div>
                    <div className="space-y-1 pt-1.5 border-t border-slate-200/60">
                      <span className="font-mono text-slate-500 uppercase block font-semibold">Office Coordinates</span>
                      <p className="text-slate-700 leading-snug">
                        Room No. F-75C, School of Life Sciences, University of Hyderabad, Prof CR Rao Road, Gachibowli, Hyderabad – 500046.
                      </p>
                    </div>
                  </div>

                  {/* Scholarly Links */}
                  <div className="w-full max-w-[300px] flex items-center justify-center gap-3 text-xs text-slate-600 pt-1">
                    <a
                      href={LAB_INFO.pi.scholarUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[#8B1E24] font-semibold transition-colors"
                    >
                      <span>Google Scholar</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                    <span className="text-slate-300">•</span>
                    <a
                      href={LAB_INFO.pi.researchGateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-[#8B1E24] font-semibold transition-colors"
                    >
                      <span>ResearchGate</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  </div>
                </div>

                {/* Right Column: Name, Subtitle, Affiliation & Complete Introduction */}
                <div className="lg:col-span-8 space-y-4">
                  <div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E24] bg-[#8B1E24]/10 px-2.5 py-1 rounded-md mb-2">
                      Academic Leadership
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F2537] tracking-tight">
                      Dr. Venkata Prasuja Nakka, Ph.D.
                    </h2>
                    <p className="font-serif italic text-lg sm:text-xl font-medium text-[#8B1E24] mt-1">
                      Systems Neurobiologist &amp; Translational Researcher
                    </p>
                    <p className="text-sm font-semibold text-slate-600 mt-1">
                      Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad.
                    </p>
                  </div>

                  <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed font-normal pt-2 border-t border-slate-100">
                    <p>
                      Dr. Venkata Prasuja Nakka is a Level-11 UGC Assistant Professor in the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad. He earned his Ph.D. from the Central Drug Research Institute (CSIR-CDRI) and Jawaharlal Nehru University (JNU), New Delhi, investigating endoplasmic reticulum stress and apoptotic signaling in cerebral ischemia.
                    </p>
                    <p>
                      His postdoctoral research experience spans the University of Wisconsin–Madison, the National University of Singapore, and the University of Hyderabad. His research focuses on the molecular and cellular mechanisms underlying ischemic brain injury, including organellar stress, oxidative stress, neuroinflammation, and neuroprotective signaling. His work also explores non-coding RNAs, piRNAs, ISGylation, and gut–brain interactions in stroke pathology.
                    </p>
                    <p>
                      At NeuroXLab, he integrates experimental neuroscience with computational biology and systems-level approaches to understand stroke mechanisms and advance translational therapeutic strategies, including nanomedicine-based interventions for neuroprotection.
                    </p>
                  </div>

                  {/* Core Research Domains Badges */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 block">
                      Core Scientific Thrusts:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Microbiota-Gut-Brain Axis",
                        "Endoplasmic Reticulum Stress & UPR",
                        "Translational Nanomedicine & SCFAs",
                        "Non-coding RNAs (lncRNAs, piRNAs)",
                        "Neuroprotection & Stroke Biology"
                      ].map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#0F2537] border border-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Research Interests */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-md space-y-6">
            <div className="space-y-2 border-b-2 border-slate-200 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
                <Activity className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Primary Scientific Thrusts</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                Research Interests
              </h3>
              <div className="w-16 h-1 bg-[#8B1E24] rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Card 1 */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-slate-200/80 hover:border-[#8B1E24]/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                    <Activity className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                    Stroke Biology &amp; Neuroprotection
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Understanding the molecular mechanisms of ischemic stroke and developing neuroprotective strategies using experimental models.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-slate-200/80 hover:border-[#8B1E24]/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                    Cellular Stress &amp; Signaling
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Investigating endoplasmic reticulum stress, the unfolded protein response, oxidative stress, and inflammatory pathways involved in neuronal injury and recovery.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-slate-200/80 hover:border-[#8B1E24]/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                    <Dna className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                    Gut–Brain Axis &amp; Metagenomics
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Exploring microbiome dynamics and gut–brain interactions in stroke using metagenomic and computational approaches.
                  </p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-slate-200/80 hover:border-[#8B1E24]/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                    <Network className="w-5 h-5" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                    Brain–Organ Crosstalk
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Investigating stroke-induced systemic effects, including distal organ damage and immune signaling networks.
                  </p>
                </div>
              </div>

              {/* Card 5 */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-slate-200/80 hover:border-[#8B1E24]/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group md:col-span-2 lg:col-span-1">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#8B1E24] flex items-center justify-center group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                    <Sparkles className="w-5 h-5 text-[#C59B27]" />
                  </div>
                  <h4 className="font-serif text-base sm:text-lg font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                    Translational Therapeutics
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    Developing nanotechnology-based drug-delivery strategies and translational interventions for neuroprotection.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Education & Postdoctoral Experience */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-md space-y-6">
            <div className="space-y-2 border-b-2 border-slate-200 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
                <GraduationCap className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Academic Trajectory</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                Education &amp; Postdoctoral Experience
              </h3>
              <div className="w-16 h-1 bg-[#8B1E24] rounded-full" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Education Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <GraduationCap className="w-5 h-5 text-[#8B1E24]" />
                  <h4 className="font-serif text-xl font-bold text-[#0F2537]">
                    Education
                  </h4>
                </div>

                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1">
                    <span className="text-xs font-mono font-bold text-[#8B1E24] uppercase block">Doctor of Philosophy (Ph.D.)</span>
                    <p className="font-serif text-base font-bold text-[#0F2537]">Jawaharlal Nehru University, New Delhi</p>
                    <p className="text-xs sm:text-sm text-slate-600">Research conducted at Central Drug Research Institute (CDRI), Lucknow, India.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1">
                    <span className="text-xs font-mono font-bold text-[#C59B27] uppercase block">Master of Science (M.Sc.)</span>
                    <p className="font-serif text-base font-bold text-[#0F2537]">Acharya Nagarjuna University</p>
                    <p className="text-xs sm:text-sm text-slate-600">Andhra Pradesh, India.</p>
                  </div>
                </div>
              </div>

              {/* Postdoctoral Research Column */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                  <Globe2 className="w-5 h-5 text-[#8B1E24]" />
                  <h4 className="font-serif text-xl font-bold text-[#0F2537]">
                    Postdoctoral Research
                  </h4>
                </div>

                <div className="space-y-3.5">
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1">
                    <span className="text-xs font-mono font-bold text-[#8B1E24] uppercase block">United States</span>
                    <p className="font-serif text-base font-bold text-[#0F2537]">University of Wisconsin–Madison, USA</p>
                    <p className="text-xs sm:text-sm text-slate-600">Department of Neurological Surgery, School of Medicine and Public Health.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1">
                    <span className="text-xs font-mono font-bold text-[#8B1E24] uppercase block">Singapore</span>
                    <p className="font-serif text-base font-bold text-[#0F2537]">National University of Singapore, Singapore</p>
                    <p className="text-xs sm:text-sm text-slate-600">Department of Pharmacy.</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1">
                    <span className="text-xs font-mono font-bold text-[#8B1E24] uppercase block">India</span>
                    <p className="font-serif text-base font-bold text-[#0F2537]">University of Hyderabad, India</p>
                    <p className="text-xs sm:text-sm text-slate-600">SERB-Young Scientist and UGC-Postdoctoral Fellow, School of Life Sciences.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Awards & Fellowships */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-md space-y-6">
            <div className="space-y-2 border-b-2 border-slate-200 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
                <Award className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Honors &amp; Appointments</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                Awards &amp; Fellowships
              </h3>
              <div className="w-16 h-1 bg-[#8B1E24] rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1.5 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-[#8B1E24] uppercase bg-[#8B1E24]/10 px-2 py-0.5 rounded">
                    National Fellowship
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#0F2537] pt-1">
                    CSIR Junior Research Fellowship
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Awarded by the Council of Scientific and Industrial Research (CSIR), Govt. of India.
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-slate-500 pt-2 border-t border-slate-200/60">
                  Period: 2003 – 2005
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1.5 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-[#8B1E24] uppercase bg-[#8B1E24]/10 px-2 py-0.5 rounded">
                    National Fellowship
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#0F2537] pt-1">
                    CSIR Senior Research Fellowship
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Awarded by the Council of Scientific and Industrial Research (CSIR), Govt. of India.
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-slate-500 pt-2 border-t border-slate-200/60">
                  Period: 2005 – 2008
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1.5 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-[#C59B27] uppercase bg-[#C59B27]/15 px-2 py-0.5 rounded">
                    Faculty Appointment
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#0F2537] pt-1">
                    UGC Faculty Recharge Programme
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Selected under the UGC Faculty Recharge Programme as Assistant Professor, Cycle III.
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-slate-500 pt-2 border-t border-slate-200/60">
                  University Grants Commission (UGC)
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1.5 flex flex-col justify-between">
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-[#C59B27] uppercase bg-[#C59B27]/15 px-2 py-0.5 rounded">
                    Conference Distinction
                  </span>
                  <h4 className="font-serif text-base font-bold text-[#0F2537] pt-1">
                    Young Scientist Award (Gold Medal)
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    Conferred for oral presentation at the International Conference on Innovations in Pharma and Biopharma Industry (ICIPBI 2017), University of Hyderabad, India.
                  </p>
                </div>
                <div className="text-xs font-mono font-bold text-slate-500 pt-2 border-t border-slate-200/60">
                  ICIPBI 2017
                </div>
              </div>
            </div>
          </div>

          {/* 5. Professional Service & Recognition */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-md space-y-6">
            <div className="space-y-2 border-b-2 border-slate-200 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Scholarly Contributions</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                Professional Service &amp; Recognition
              </h3>
              <div className="w-16 h-1 bg-[#8B1E24] rounded-full" />
            </div>

            <div className="space-y-6">
              {/* Editorial and Peer-Review Contributions */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#8B1E24]" />
                  <h4 className="font-serif text-lg font-bold text-[#0F2537]">
                    Editorial &amp; Peer-Review Contributions
                  </h4>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">
                  Peer-review contributions for internationally recognized scientific journals:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {[
                    "Metabolic Brain Disease",
                    "Translational Stroke Research",
                    "Neurochemistry International",
                    "Molecular and Cellular Biochemistry",
                    "Mathews Journal of Case Reports",
                    "Journal of Pediatric Neurology",
                    "Biochimica et Biophysica Acta (BBA) – General Subjects",
                    "Brain Research Bulletin",
                    "FASEB Journal",
                    "Molecular Neurobiology",
                    "Scientific Reports",
                    "European Journal of Medical Research",
                    "Journal of Molecular Neuroscience",
                    "Stem Cell Research & Therapy",
                    "Neurochemical Research"
                  ].map((journal, jIdx) => (
                    <span
                      key={jIdx}
                      className="px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-slate-200 text-xs font-medium text-[#0F2537] hover:border-[#8B1E24]/50 transition-colors"
                    >
                      {journal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Research Project Review, Invited Book Chapters, Leadership */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                {/* Research Project Review */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B1E24] block">
                    Grant &amp; Project Review
                  </span>
                  <h5 className="font-serif text-base font-bold text-[#0F2537]">
                    Research Project Review
                  </h5>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Science and Engineering Research Board (SERB) / Anusandhan National Research Foundation (ANRF).
                  </p>
                </div>

                {/* Invited Book Chapters */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#C59B27] block">
                    Academic Publishers
                  </span>
                  <h5 className="font-serif text-base font-bold text-[#0F2537]">
                    Invited Book Chapters
                  </h5>
                  <ul className="text-xs text-slate-600 space-y-1">
                    <li>• Springer Nature</li>
                    <li>• Methods in Enzymology</li>
                    <li>• Translational Stroke Research</li>
                    <li>• Academic Press / Elsevier</li>
                  </ul>
                </div>

                {/* Professional Leadership */}
                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-2">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B1E24] block">
                    Elected Office
                  </span>
                  <h5 className="font-serif text-base font-bold text-[#0F2537]">
                    Professional Leadership
                  </h5>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong className="text-[#0F2537] font-semibold">Treasurer</strong>, Society for Neurochemistry, India (SNCI), since December 2024.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 6. Professional Society Memberships */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-md space-y-6">
            <div className="space-y-2 border-b-2 border-slate-200 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
                <Users className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Learned Societies</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                Professional Memberships
              </h3>
              <div className="w-16 h-1 bg-[#8B1E24] rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#8B1E24] uppercase block">Life Membership</span>
                <h4 className="font-serif text-base font-bold text-[#0F2537]">Indian Academy of Neurosciences (IAN)</h4>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#8B1E24] uppercase block">Life Membership</span>
                <h4 className="font-serif text-base font-bold text-[#0F2537]">Society for Neurochemistry, India (SNCI)</h4>
              </div>
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 space-y-1">
                <span className="text-[11px] font-mono font-bold text-[#8B1E24] uppercase block">Life Membership</span>
                <h4 className="font-serif text-base font-bold text-[#0F2537]">Society for Biological Chemists, India (SBC)</h4>
              </div>
            </div>
          </div>

          {/* 7. Contact Section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-md space-y-6">
            <div className="space-y-2 border-b-2 border-slate-200 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
                <Mail className="w-3.5 h-3.5 text-[#C59B27]" />
                <span>Direct Correspondence</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                Contact the Principal Investigator
              </h3>
              <div className="w-16 h-1 bg-[#8B1E24] rounded-full" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:nvprasuja@gmail.com"
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 hover:border-[#8B1E24] transition-all group flex items-start gap-3.5 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#8B1E24] flex items-center justify-center shrink-0 group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs font-mono font-bold uppercase text-slate-500 block">Personal / Primary Email</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors truncate block">
                    nvprasuja@gmail.com
                  </span>
                </div>
              </a>

              <a
                href="mailto:nvprasuja@uohyd.ac.in"
                className="p-5 rounded-2xl bg-[#FAF8F5] border border-slate-200 hover:border-[#8B1E24] transition-all group flex items-start gap-3.5 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-[#8B1E24] flex items-center justify-center shrink-0 group-hover:bg-[#8B1E24] group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5 min-w-0">
                  <span className="text-xs font-mono font-bold uppercase text-[#8B1E24] block">Institutional Email</span>
                  <span className="font-mono text-sm sm:text-base font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors truncate block">
                    nvprasuja@uohyd.ac.in
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: TEAM MEMBERS & SUPERVISION (AUTHENTIC TEAM FROM TEAM.PDF)
          ========================================================================= */}
      {activeTabSub === 'members' && (
        <div id="team-roster" className="space-y-12 animate-in fade-in duration-300 scroll-mt-28">
          {/* Postdoctoral Researchers & Research Fellows Section */}
          {postdocs.length > 0 && (
            <section id="postdoctoral-researchers" className="space-y-6 scroll-mt-24">
              <div className="border-b-2 border-slate-200 pb-3 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#8B1E24]">
                    Postdoctoral Scholars &amp; Research Scientists
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                    Postdoctoral Researchers &amp; Fellows
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {postdocs.length} Research Fellow{postdocs.length > 1 ? 's' : ''}
                </span>
              </div>

              {/* Member Editorial Cards matching Institute standard */}
              <div className="space-y-6">
                {postdocs.map((researcher) => (
                  <MemberEditorialCard
                    key={researcher.id}
                    member={researcher}
                    openLightbox={openLightbox}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Doctoral Researchers Section */}
          <section id="doctoral-researchers" className="space-y-6 scroll-mt-24">
            <div className="border-b-2 border-slate-200 pb-3 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#8B1E24]">
                  Doctoral Program
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                  Doctoral Researchers
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500 font-medium">
                {doctoralResearchers.length} Ph.D. Scholar{doctoralResearchers.length > 1 ? 's' : ''}
              </span>
            </div>

            <div className="space-y-6">
              {doctoralResearchers.map((researcher) => (
                <MemberEditorialCard
                  key={researcher.id}
                  member={researcher}
                  openLightbox={openLightbox}
                />
              ))}
            </div>
          </section>

          {/* Research Associates & Project Staff Section */}
          {projectStaff.length > 0 && (
            <section id="project-staff" className="space-y-6 scroll-mt-24">
              <div className="border-b-2 border-slate-200 pb-3 flex items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#8B1E24]">
                    Scientific &amp; Technical Personnel
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                    Research Associates &amp; Project Staff
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-500 font-medium">
                  {projectStaff.length} Project Associate{projectStaff.length > 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-6">
                {projectStaff.map((staffMember) => (
                  <MemberEditorialCard
                    key={staffMember.id}
                    member={staffMember}
                    openLightbox={openLightbox}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Alumni Network Section */}
          <section id="alumni-network" className="space-y-6 scroll-mt-24">
            <div className="border-b-2 border-slate-200 pb-3 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-xs uppercase font-mono font-bold tracking-widest text-[#8B1E24]">
                  Scholars &amp; Trainee Destinations
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                  Alumni Network
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-500 font-medium">
                Former Scholars &amp; Trainees
              </span>
            </div>

            {/* 2-Column Grid on Desktop, 1-Column on Mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              {(allAlumni || []).map((alumnus, idx) => {
                if (!alumnus) return null;
                const rawInterests = alumnus.researchInterests;
                const interests = Array.isArray(rawInterests)
                  ? rawInterests
                  : typeof rawInterests === 'string' && rawInterests.trim()
                  ? rawInterests.split(',').map((s) => s.trim()).filter(Boolean)
                  : [];
                const name = alumnus.name || alumnus.fullName || 'Alumnus';
                const role = alumnus.role || 'Former Researcher';
                const period = alumnus.period || alumnus.alumniPeriod || '';
                const currentDestination = alumnus.currentDestination || '';
                const description = alumnus.description || alumnus.summaryBio || alumnus.fullBio || '';

                return (
                  <div
                    key={alumnus.id || `alumnus-${idx}`}
                    className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#C59B27]/70 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3.5">
                      {/* Header: Name, former role, graduation period */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          {period && (
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[11px] font-bold font-mono border border-slate-200 mb-1">
                              <span>{period}</span>
                            </div>
                          )}
                          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] leading-tight">
                            {name}
                          </h3>
                          <p className="text-xs sm:text-sm font-semibold text-[#8B1E24]">
                            {role}
                          </p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center shrink-0">
                          <GraduationCap className="w-5 h-5 text-[#C59B27]" />
                        </div>
                      </div>

                      {/* Current Placement / Destination Pill */}
                      {currentDestination && (
                        <div className="p-3 rounded-xl bg-[#FAF8F5] border border-slate-200/80 space-y-1">
                          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-bold block">
                            Subsequent / Current Position:
                          </span>
                          <p className="text-xs sm:text-[13px] font-bold text-[#0F2537]">
                            {currentDestination}
                          </p>
                        </div>
                      )}

                      {/* Past Work Description */}
                      {description && (
                        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-sans">
                          {description}
                        </p>
                      )}
                    </div>

                    {/* Research Focus Tags */}
                    {interests.length > 0 && (
                      <div className="pt-3 border-t border-slate-100 space-y-1.5">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 block">
                          Past NeuroXLab Focus:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {interests.map((tag, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-[#FAF8F5] text-[#0F2537] border border-slate-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Interested in Working with Us? Section */}
          <section className="bg-gradient-to-r from-[#0F2537] to-[#142e44] text-white rounded-3xl p-8 sm:p-10 border-2 border-[#C59B27]/50 shadow-xl">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E0B84C] text-xs font-mono font-semibold border border-white/15">
                <GraduationCap className="w-3.5 h-3.5 text-[#E0B84C]" />
                <span>JOIN OUR LABORATORY</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
                Interested in working with us?
              </h3>
              <p className="text-white/85 text-sm sm:text-base leading-relaxed font-sans max-w-xl mx-auto">
                Explore research opportunities and learn more about joining NeuroXLab.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (typeof setActiveTab === 'function') {
                      setActiveTab('contact');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] border border-[#E0B84C]/50 shadow-lg hover:shadow-xl transition-all active:scale-95 cursor-pointer min-h-[44px]"
                >
                  <span>Explore Opportunities &amp; Contact</span>
                  <ArrowRight className="w-4 h-4 text-[#E0B84C]" />
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
