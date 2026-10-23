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
  Cpu
} from 'lucide-react';
import NeuraXlabLogo from '../components/NeuraXlabLogo';
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
        <p className="text-[#0F2537]/80 text-base sm:text-lg">
          Explore the academic pedigree of Dr. Venkata Prasuja Nakka alongside our active postdoctoral fellows, doctoral scholars, and graduate trainees.
        </p>

        {/* Tab Switcher: Group Leader vs Team Members & Supervision */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white border-2 border-[#C59B27]/40 shadow-sm text-sm font-bold mt-4">
          <button
            onClick={() => setActiveTabSub('groupleader')}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTabSub === 'groupleader'
                ? 'bg-[#8B1E24] text-white shadow-md'
                : 'text-[#0F2537]/75 hover:text-[#8B1E24]'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            <span>Group Leader Dossier</span>
          </button>
          <button
            onClick={() => setActiveTabSub('members')}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
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
          TAB 1: GROUP LEADER DOSSIER (COMPLETE CV DOSSIER OF DR. NAKKA)
          ========================================================================= */}
      {activeTabSub === 'groupleader' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          {/* 1. Spotlight Hero Profile Card */}
          <div className="bg-white rounded-3xl border-2 border-[#C59B27]/60 shadow-xl overflow-hidden">
            <div className="bg-[#8B1E24] text-white px-8 py-5 flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#C59B27]">
              <div className="flex items-center gap-3">
                <Award className="w-7 h-7 text-[#E0B84C]" />
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#E0B84C] font-mono">
                    Principal Investigator &amp; Lab Director
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                    Dr. Venkata Prasuja Nakka, Ph.D.
                  </h2>
                </div>
              </div>
              <div className="text-xs font-mono bg-white/10 px-4 py-2 rounded-xl border border-white/20 text-[#E0B84C] font-bold">
                UGC-Assistant Professor (Level-11)
              </div>
            </div>

            <div className="p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Portrait & Official Location Card */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="relative rounded-2xl overflow-hidden border-4 border-[#C59B27] shadow-xl bg-[#0F2537] aspect-square max-w-[320px] mx-auto">
                    <img
                      src={pi.avatar}
                      alt={pi.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-gray-200 space-y-3 text-xs text-[#0F2537]">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#8B1E24] mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-bold text-[#0F2537]">Room No. F75C, SLS Annex Building</p>
                        <p className="text-[#0F2537]/70">School of Life Sciences, University of Hyderabad</p>
                        <p className="text-[#0F2537]/70">Prof. C.R. Rao Road, Gachibowli, Hyderabad – 500046</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 pt-1">
                      <Phone className="w-4 h-4 text-[#8B1E24] flex-shrink-0" />
                      <a href="tel:+914023134581" className="font-mono hover:text-[#8B1E24]">
                        +91-40-23134581
                      </a>
                    </div>

                    <div className="flex items-start gap-2.5 pt-1">
                      <Mail className="w-4 h-4 text-[#8B1E24] mt-0.5 flex-shrink-0" />
                      <div className="space-y-0.5">
                        <a href="mailto:prasuja@uohyd.ac.in" className="font-mono hover:text-[#8B1E24] block">
                          prasuja@uohyd.ac.in
                        </a>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
                      <a
                        href={LAB_INFO.pi.scholarUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between text-[#8B1E24] hover:underline font-semibold"
                      >
                        <span>Google Scholar (1,573+ Citations)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href="https://www.scopus.com/authid/detail.uri?authorId=24329688400"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-between text-[#0F2537]/80 hover:underline"
                      >
                        <span>Scopus Profile (1,196+ Citations)</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Narrative, Appointments & Metrics */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold uppercase text-[#8B1E24] bg-[#8B1E24]/10 px-3 py-1 rounded-md">
                      Curriculum Vitae Dossier
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                      Systems Neurobiologist &amp; Translational Investigator
                    </h3>
                    <p className="text-sm sm:text-base text-[#0F2537]/85 leading-relaxed font-light">
                      Dr. Venkata Prasuja Nakka is a nationally recruited Level-11 UGC-Assistant Professor in the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad. He earned his Ph.D. from the premier Central Drug Research Institute (CSIR-CDRI) / Jawaharlal Nehru University (JNU), New Delhi, investigating organellar endoplasmic reticulum stress and apoptotic signaling in cerebral ischemia. He subsequently conducted extensive postdoctoral investigations at the University of Wisconsin–Madison (USA), the National University of Singapore (NUS), and UoH, pioneering discoveries in long non-coding RNAs, piRNAs, and post-translational ISGylation in stroke neuroprotection.
                    </p>
                  </div>

                  {/* High Impact Pedigree Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gray-200 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-[#8B1E24] uppercase">Current Appointment</span>
                      <p className="text-sm font-bold text-[#0F2537]">UGC-Assistant Professor (Level-11)</p>
                      <p className="text-xs text-[#0F2537]/70">School of Life Sciences, University of Hyderabad (Institution of Eminence).</p>
                    </div>

                    <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gray-200 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-[#C59B27] uppercase">Doctorate (Ph.D., 2009)</span>
                      <p className="text-sm font-bold text-[#0F2537]">CSIR-CDRI / JNU New Delhi</p>
                      <p className="text-xs text-[#0F2537]/70">Endoplasmic reticulum stress and caspase-12 apoptotic cascades in stroke.</p>
                    </div>

                    <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gray-200 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-[#8B1E24] uppercase">US Postdoctoral Fellow</span>
                      <p className="text-sm font-bold text-[#0F2537]">University of Wisconsin–Madison</p>
                      <p className="text-xs text-[#0F2537]/70">Dept. of Neurological Surgery (Prof. Raghu Vemuganti Lab). Stroke epigenomics.</p>
                    </div>

                    <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-gray-200 space-y-1">
                      <span className="text-[11px] font-mono font-bold text-[#C59B27] uppercase">International Postdoc</span>
                      <p className="text-sm font-bold text-[#0F2537]">National University of Singapore (NUS)</p>
                      <p className="text-xs text-[#0F2537]/70">Neurobiology and pharmacology of neurovascular unit injury.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Educational Timeline & Qualifications */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-md space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <GraduationCap className="w-6 h-6 text-[#8B1E24]" />
              <h3 className="font-serif text-2xl font-bold text-[#0F2537]">
                Chronological Education &amp; Fellowship Milestones
              </h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  period: "2003 – 2009",
                  degree: "Doctor of Philosophy (Ph.D.) in Neuroscience & Biochemistry",
                  institution: "CSIR – Central Drug Research Institute (CDRI), Lucknow / Jawaharlal Nehru University (JNU), New Delhi",
                  details: "Thesis: 'Studies on Endoplasmic Reticulum-Mediated Survival and Death Mechanisms in Cerebral Ischemia'. Mentored by Dr. Ram Raghubir, Division of Pharmacology.",
                  badge: "Doctorate"
                },
                {
                  period: "2003",
                  degree: "CSIR-UGC National Eligibility Test (NET) for Junior Research Fellowship (JRF)",
                  institution: "Council of Scientific and Industrial Research (CSIR), Govt. of India",
                  details: "Awarded national research fellowship and eligibility for lectureship in chemical and life sciences.",
                  badge: "National Competitive Exam"
                },
                {
                  period: "2000 – 2002",
                  degree: "Master of Science (M.Sc.) in Biochemistry",
                  institution: "Acharya Nagarjuna University (ANU), Guntur, Andhra Pradesh",
                  details: "Graduated with distinction; coursework in molecular enzymology, biophysical chemistry, and neurochemistry.",
                  badge: "Postgraduate"
                },
                {
                  period: "1997 – 2000",
                  degree: "Bachelor of Science (B.Sc.) in Life Sciences",
                  institution: "Acharya Nagarjuna University (ANU), Guntur, Andhra Pradesh",
                  details: "Foundational studies in chemistry, botany, and zoology.",
                  badge: "Undergraduate"
                }
              ].map((edu, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-2xl bg-[#FAF8F5] border border-gray-100">
                  <div className="font-mono text-xs font-bold text-[#8B1E24] bg-white px-3 py-1.5 rounded-lg border border-gray-200 whitespace-nowrap">
                    {edu.period}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase bg-[#8B1E24]/10 text-[#8B1E24] font-bold px-2 py-0.5 rounded">
                        {edu.badge}
                      </span>
                      <h4 className="font-serif text-lg font-bold text-[#0F2537]">
                        {edu.degree}
                      </h4>
                    </div>
                    <p className="text-xs font-semibold text-[#C59B27]">{edu.institution}</p>
                    <p className="text-xs text-[#0F2537]/75">{edu.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Teaching Experience, Awards & Animal Certifications */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Column 1: Teaching Experience */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#8B1E24]" />
                <h4 className="font-serif text-xl font-bold text-[#0F2537]">
                  Teaching Experience
                </h4>
              </div>
              <p className="text-xs text-[#0F2537]/75">
                Graduate and postgraduate course instruction at University of Hyderabad and Acharya Nagarjuna University:
              </p>
              <ul className="space-y-2 text-xs text-[#0F2537]/80">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E24] flex-shrink-0 mt-0.5" />
                  <span>Systems Biology of Acute CNS Diseases</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E24] flex-shrink-0 mt-0.5" />
                  <span>Molecular Neurobiology &amp; Cellular Signaling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E24] flex-shrink-0 mt-0.5" />
                  <span>Advanced Enzymology &amp; Proteostasis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E24] flex-shrink-0 mt-0.5" />
                  <span>Preclinical Stroke Surgical Models &amp; Stereotaxy</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Honors & Awards */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#C59B27]" />
                <h4 className="font-serif text-xl font-bold text-[#0F2537]">
                  Honors &amp; Awards
                </h4>
              </div>
              <ul className="space-y-2.5 text-xs text-[#0F2537]/80">
                <li className="p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-100 space-y-0.5">
                  <strong className="text-[#8B1E24] font-mono text-[11px] block">ICIPBI-2017 Gold Medal</strong>
                  <span>Awarded for seminal contributions to pharmaceutical biotechnology and stroke neurotherapeutics.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-100 space-y-0.5">
                  <strong className="text-[#8B1E24] font-mono text-[11px] block">UGC FRP National Selection (Level-11)</strong>
                  <span>Prestigious central faculty recharge appointment to foster premier biomedical research.</span>
                </li>
                <li className="p-2.5 rounded-xl bg-[#FAF8F5] border border-gray-100 space-y-0.5">
                  <strong className="text-[#8B1E24] font-mono text-[11px] block">SERB Young Scientist Project Award</strong>
                  <span>Fast Track Scheme for Young Scientists, Department of Science &amp; Technology, Govt. of India.</span>
                </li>
              </ul>
            </div>

            {/* Column 3: Animal Trainings & Reviewer Service */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#8B1E24]" />
                <h4 className="font-serif text-xl font-bold text-[#0F2537]">
                  Certifications &amp; Reviewer Service
                </h4>
              </div>
              <div className="space-y-3 text-xs text-[#0F2537]/80">
                <div>
                  <strong className="text-[#0F2537] block font-mono text-[11px] text-[#8B1E24]">Animal Welfare Certifications:</strong>
                  <p className="text-[11px] text-[#0F2537]/75 mt-0.5">
                    • RARC Certification, Univ. of Wisconsin–Madison (USA)<br/>
                    • NUS IACUC Rodent Handling Training, Singapore<br/>
                    • CPCSEA Small Animal Stereotaxy Accreditation, India
                  </p>
                </div>
                <div className="pt-2 border-t border-gray-100">
                  <strong className="text-[#0F2537] block font-mono text-[11px] text-[#8B1E24]">Journal Peer Reviewer Service:</strong>
                  <p className="text-[11px] text-[#0F2537]/75 mt-0.5">
                    Stroke (AHA) • Molecular Neurobiology • Neurotoxicity Research • Brain Research Bulletin • Journal of Neurochemistry • Scientific Reports.
                  </p>
                </div>
              </div>
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
                <div className="text-xs font-bold text-white uppercase tracking-wider mt-1">
                  Ph.D. Thesis Submitted
                </div>
                <div className="text-[11px] text-white/60 mt-0.5">
                  Focal cerebral ischemia &amp; ER stress
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  15
                </div>
                <div className="text-xs font-bold text-[#E0B84C] uppercase tracking-wider mt-1">
                  M.Sc. Projects
                </div>
                <div className="text-[11px] text-white/60 mt-0.5">
                  Systems biology &amp; biochemistry dissertations
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  4
                </div>
                <div className="text-xs font-bold text-[#E0B84C] uppercase tracking-wider mt-1">
                  M.Pharm Projects
                </div>
                <div className="text-[11px] text-white/60 mt-0.5">
                  Pharmacology &amp; nanotherapy formulations
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 text-center">
                <div className="font-serif text-3xl sm:text-4xl font-bold text-white">
                  8
                </div>
                <div className="text-xs font-bold text-[#E0B84C] uppercase tracking-wider mt-1">
                  B.Sc. Interns
                </div>
                <div className="text-[11px] text-white/60 mt-0.5">
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
                <p className="text-xs text-[#0F2537]/70 mt-1">
                  Filter by doctoral scholars, postdoctoral associates, master's trainees, or alumni destinations.
                </p>
              </div>

              {/* Filter Buttons */}
              <div className="inline-flex flex-wrap p-1 rounded-xl bg-white border border-gray-200 text-xs font-semibold gap-1">
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
                    className={`px-3 py-1.5 rounded-lg transition-all ${
                      memberFilter === btn.id
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
                  className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-[#C59B27] shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
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
                        <span className="text-[10px] font-mono font-bold uppercase text-[#8B1E24] bg-[#8B1E24]/10 px-2 py-0.5 rounded">
                          {member.category}
                        </span>
                        <h4 className="font-serif text-xl font-bold text-[#0F2537] mt-1">
                          {member.name}
                        </h4>
                        <p className="text-xs font-medium text-[#C59B27]">
                          {member.role}
                        </p>
                        <p className="text-[11px] text-[#0F2537]/60">
                          {member.qualification}
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-[#0F2537]/80 leading-relaxed border-t border-gray-100 pt-3">
                      {member.bio}
                    </p>

                    {member.researchInterests && (
                      <div className="space-y-1.5">
                        <p className="text-[11px] font-bold text-[#0F2537] uppercase tracking-wider">
                          Research Focus:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {member.researchInterests.map((int, i) => (
                            <span
                              key={i}
                              className="text-[10px] px-2 py-0.5 rounded bg-[#FAF8F5] text-[#0F2537]/80 border border-gray-200"
                            >
                              {int}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {member.contact && (
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-[#0F2537]/70">
                      <span className="font-mono text-[11px]">{member.contact.email}</span>
                      <a
                        href={`mailto:${member.contact.email}`}
                        className="p-1 rounded hover:bg-gray-100 text-[#8B1E24]"
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
