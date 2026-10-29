import React, { useState } from 'react';
import {
  Users,
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Calendar,
  Briefcase,
  ShieldCheck,
  FileText,
  ChevronRight,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Compass,
  Globe2,
  Activity,
  Dna,
  Network
} from 'lucide-react';
import NeuroXlabLogo from '../components/NeuroXlabLogo';
import { LAB_INFO, TEAM_MEMBERS } from '../data/labData';

export default function TeamPage({ setActiveTab }) {
  const [activeTabSub, setActiveTabSub] = useState('groupleader'); // 'groupleader' or 'members'
  const [memberFilter, setMemberFilter] = useState('all');

  const pi = TEAM_MEMBERS.find((m) => m.id === 'pi') || TEAM_MEMBERS[0];

  const filteredMembers =
    memberFilter === 'all'
      ? TEAM_MEMBERS.filter((m) => m.id !== 'pi')
      : TEAM_MEMBERS.filter((m) => m.category === memberFilter && m.id !== 'pi');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>Academic Leadership &amp; Scientific Roster</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Meet the Team
        </h1>
        <p className="text-[#0F2537]/80 text-sm sm:text-base leading-relaxed">
          Explore the academic pedigree of Dr. Venkata Prasuja Nakka alongside our active postdoctoral fellows, doctoral scholars, and graduate trainees.
        </p>

        {/* Tab Switcher: Group Leader vs Team Members & Supervision */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white border-2 border-[#C59B27]/40 shadow-sm text-sm font-bold mt-4">
          <button
            onClick={() => setActiveTabSub('groupleader')}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${activeTabSub === 'groupleader'
                ? 'bg-[#8B1E24] text-white shadow-md'
                : 'text-[#0F2537]/75 hover:text-[#8B1E24]'
              }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Group Leader Dossier</span>
          </button>
          <button
            onClick={() => setActiveTabSub('members')}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${activeTabSub === 'members'
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
          TAB 1: GROUP LEADER DOSSIER (VERIFIED ACADEMIC PROFILE OF DR. NAKKA)
          ========================================================================= */}
      {activeTabSub === 'groupleader' && (
        <div className="space-y-12 animate-in fade-in duration-300">
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
                  <div className="relative rounded-2xl overflow-hidden border-2 border-[#C59B27]/70 shadow-lg bg-[#0F2537] aspect-[3/4] w-full max-w-[280px] sm:max-w-[300px] group">
                    <img
                      src="/images/dr_prasuja_nakka.jpg"
                      alt="Dr. Venkata Prasuja Nakka, Ph.D. - Official Institutional Portrait, University of Hyderabad"
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
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
                  </div>
                </div>

                {/* Right Column: Name, Subtitle, Affiliation & Introduction */}
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
                      Dr. Venkata Prasuja Nakka is an Assistant Professor in the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad. He earned his Ph.D. through Jawaharlal Nehru University, New Delhi, with research conducted at the Central Drug Research Institute, Lucknow. His research focuses on the molecular mechanisms of ischemic stroke, cellular stress signaling, neuroinflammation, gut–brain interactions, and stroke-induced systemic injury.
                    </p>
                    <p>
                      His postdoctoral research experience includes the University of Wisconsin–Madison, the National University of Singapore, and the University of Hyderabad, where he held SERB-Young Scientist and UGC-Postdoctoral Fellow positions. At NeuroXLab, he integrates experimental neuroscience with computational and systems-level approaches to investigate stroke pathology and advance translational therapeutic strategies, including nanotechnology-based drug delivery and neuroprotection.
                    </p>
                  </div>

                  {/* Call to Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        if (setActiveTab) {
                          setActiveTab('research');
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] border border-[#C59B27]/50 shadow-md hover:shadow-lg transition-all cursor-pointer min-h-[44px] group"
                    >
                      <span>Explore His Research</span>
                      <ArrowRight className="w-4 h-4 text-[#E0B84C] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Research Interests - Exactly 5 Verified Themes */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-md space-y-6">
            <div className="space-y-2 border-b-2 border-slate-200 pb-4">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
                <Compass className="w-3.5 h-3.5 text-[#C59B27]" />
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
          TAB 2: TEAM MEMBERS & SUPERVISION
          ========================================================================= */}
      {activeTabSub === 'members' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          {/* Supervision Summary Banner */}
          <div className="bg-gradient-to-r from-[#0F2537] to-[#142e44] text-white rounded-3xl p-8 sm:p-10 border-2 border-[#C59B27] shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-[#E0B84C] font-mono">
                  Mentorship &amp; Research Supervision Record
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Academic Supervision &amp; Trainee Guidance
                </h3>
              </div>
              <div className="px-4 py-2 rounded-xl bg-[#8B1E24] text-white text-xs font-mono font-bold border border-[#C59B27]">
                Total: 28+ Mentored Trainees
              </div>
            </div>

            {/* The 4 Exact Supervision Metric Blocks */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#E0B84C]">
                  1
                </div>
                <div className="text-sm font-bold text-white uppercase tracking-wider mt-1">
                  Ph.D. Thesis Submitted
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Focal cerebral ischemia &amp; ER stress
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  15
                </div>
                <div className="text-sm font-bold text-[#E0B84C] uppercase tracking-wider mt-1">
                  M.Sc. Projects
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Systems biology &amp; biochemistry dissertations
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  4
                </div>
                <div className="text-sm font-bold text-[#E0B84C] uppercase tracking-wider mt-1">
                  M.Pharm Projects
                </div>
                <div className="text-xs text-white/70 mt-1">
                  Pharmacology &amp; nanotherapy formulations
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  8
                </div>
                <div className="text-sm font-bold text-[#E0B84C] uppercase tracking-wider mt-1">
                  B.Sc. Interns
                </div>
                <div className="text-xs text-white/70 mt-1">
                  National summer research fellowships
                </div>
              </div>
            </div>
          </div>

          {/* Filterable Roster Section */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
              <div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                  Current Scholars &amp; Alumni Network
                </h3>
                <p className="text-sm text-[#0F2537]/75 mt-1">
                  Filter by doctoral scholars, postdoctoral associates, master's trainees, or alumni destinations.
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="inline-flex flex-wrap p-1 rounded-xl bg-white border border-gray-200 text-sm font-semibold gap-1">
                {[
                  { id: 'all', label: 'All Roster' },
                  { id: 'postdoc', label: 'Postdoc & Fellows' },
                  { id: 'phd', label: 'Ph.D. Scholars' },
                  { id: 'trainee', label: 'M.Sc. Trainees' },
                  { id: 'alumni', label: 'Alumni Network' },
                ].map((btn) => (
                  <button
                    key={btn.id}
                    onClick={() => setMemberFilter(btn.id)}
                    className={`px-3.5 py-1.5 rounded-lg transition-all ${memberFilter === btn.id
                        ? 'bg-[#8B1E24] text-white shadow-sm'
                        : 'text-[#0F2537]/70 hover:text-[#0F2537]'
                      }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Member Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-200 hover:border-[#C59B27] shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#C59B27] bg-[#FAF8F5] flex-shrink-0">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-mono font-bold uppercase text-[#8B1E24] bg-[#8B1E24]/10 px-2.5 py-0.5 rounded-md">
                          {member.category}
                        </span>
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] mt-1">
                          {member.name}
                        </h4>
                        <p className="text-sm font-bold text-[#C59B27]">
                          {member.role}
                        </p>
                        <p className="text-xs sm:text-sm text-[#0F2537]/70 font-medium">
                          {member.qualification}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-[#0F2537]/80 leading-relaxed border-t border-gray-100 pt-3">
                      {member.bio}
                    </p>

                    {member.researchInterests && (
                      <div className="space-y-1.5">
                        <p className="text-xs font-bold text-[#0F2537] uppercase tracking-wider">
                          Research Focus:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {member.researchInterests.map((int, i) => (
                            <span
                              key={i}
                              className="text-xs px-2.5 py-1 rounded bg-[#FAF8F5] text-[#0F2537]/80 border border-gray-200 font-medium"
                            >
                              {int}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {member.contact && (
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm text-[#0F2537]/75">
                      <span className="font-mono text-xs sm:text-sm">{member.contact.email}</span>
                      <a
                        href={`mailto:${member.contact.email}`}
                        className="p-1.5 rounded hover:bg-gray-100 text-[#8B1E24]"
                        title="Send Email"
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
