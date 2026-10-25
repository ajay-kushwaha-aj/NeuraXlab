import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  Mail, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Award, 
  Briefcase, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { TEAM_MEMBERS, LAB_INFO } from '../data/labData';

export default function TeamView({ setActiveTab }) {
  const [filter, setFilter] = useState('all');

  const pi = TEAM_MEMBERS.find((m) => m.id === 'pi') || TEAM_MEMBERS[0];

  const filteredMembers =
    filter === 'all'
      ? TEAM_MEMBERS.filter((m) => m.id !== 'pi')
      : TEAM_MEMBERS.filter((m) => m.category === filter && m.id !== 'pi');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <Users className="w-3.5 h-3.5" />
          <span>Scientific Investigators &amp; Scholars</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Meet the Team
        </h1>
        <p className="text-[#0F2537]/80 text-sm sm:text-base leading-relaxed">
          A multidisciplinary collective of neurobiologists, nanotechnologists, biochemists, and systems biologists dedicated to unravelling acute CNS injury mechanisms.
        </p>
      </div>

      {/* 1. Group Leader Spotlight Profile */}
      <section id="group-leader" className="bg-white rounded-3xl border-2 border-[#C59B27]/60 shadow-2xl overflow-hidden scroll-mt-28">
        {/* Top Header Strip */}
        <div className="bg-[#8B1E24] text-white px-8 py-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-[#E0B84C]" />
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E0B84C] font-mono">
                Principal Investigator &amp; Lab Director
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Dr. Venkata Prasuja Nakka, Ph.D.
              </h2>
            </div>
          </div>
          <div className="text-xs font-mono bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 text-[#E0B84C]">
            UGC-Assistant Professor (Level-11)
          </div>
        </div>

        {/* Detailed Profile Grid */}
        <div className="p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left Column: Photo & Contact Telemetry */}
            <div className="lg:col-span-4 space-y-6">
              <div className="relative rounded-2xl overflow-hidden border-4 border-[#C59B27] shadow-xl bg-[#0F2537] aspect-square max-w-[320px] mx-auto group">
                <img
                  src={pi.avatar}
                  alt={pi.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Direct Office & Contact Card */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-gray-200 space-y-3 text-xs text-[#0F2537]">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#8B1E24] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-bold text-[#0F2537]">Room No. F75C, SLS Annex Building</p>
                    <p className="font-semibold text-[#8B1E24]">Department of Systems and Computational Biology</p>
                    <p className="text-[#0F2537]/75 font-medium">School of Life Sciences, University of Hyderabad</p>
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
                  <div>
                    <a href="mailto:prasuja@uohyd.ac.in" className="font-mono hover:text-[#8B1E24] block">
                      prasuja@uohyd.ac.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Pedigree, Biography & Research Philosophy */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                  Academic Journey &amp; Research Leadership
                </h3>
                <p className="text-sm sm:text-base text-[#0F2537]/85 leading-relaxed">
                  {pi.bio}
                </p>
              </div>

              {/* Pedigree Timeline Cards */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif text-lg font-bold text-[#0F2537] flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#8B1E24]" />
                  <span>Academic Qualifications &amp; Appointments</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-1">
                    <span className="font-mono text-[#8B1E24] font-bold">Doctor of Philosophy (Ph.D., 2009)</span>
                    <p className="font-semibold text-[#0F2537]">CSIR – Central Drug Research Institute (CDRI) / JNU</p>
                    <p className="text-[#0F2537]/70">Thesis on endoplasmic reticulum stress &amp; neuronal apoptosis in cerebral ischemia.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-1">
                    <span className="font-mono text-[#8B1E24] font-bold">Postdoctoral Fellow (USA)</span>
                    <p className="font-semibold text-[#0F2537]">University of Wisconsin–Madison</p>
                    <p className="text-[#0F2537]/70">Department of Neurological Surgery (Prof. Raghu Vemuganti Lab). Pioneered non-coding RNA stroke profiling.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-1">
                    <span className="font-mono text-[#8B1E24] font-bold">Postdoctoral Fellow (Singapore)</span>
                    <p className="font-semibold text-[#0F2537]">National University of Singapore (NUS)</p>
                    <p className="text-[#0F2537]/70">Neurobiology and pharmacology of neurovascular unit damage and cellular stress responses.</p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-1">
                    <span className="font-mono text-[#8B1E24] font-bold">National Faculty Selection (Level-11)</span>
                    <p className="font-semibold text-[#0F2537]">UGC Faculty Recharge Programme (FRP)</p>
                    <p className="text-[#0F2537]/70">Recruited nationwide by UGC to drive translational neurobiology at University of Hyderabad.</p>
                  </div>
                </div>
              </div>

              {/* Research Thrusts / Badges */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif text-lg font-bold text-[#0F2537]">
                  Primary Areas of Investigation
                </h4>
                <div className="flex flex-wrap gap-2">
                  {pi.researchInterests.map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-[#FAF8F5] text-[#8B1E24] border border-[#C59B27]/40"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal Bottom Bar: Scholarly & Professional Profiles */}
        <div className="border-t border-gray-200 bg-[#FAF8F5] px-6 sm:px-8 py-4">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#8B1E24]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E24]">
                Scholarly &amp; Professional Profiles:
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 flex-grow">
              <a
                href={LAB_INFO.pi.scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#4285F4] hover:bg-[#4285F4]/5 transition-all text-[#0F2537] shadow-sm group"
                title="View Google Scholar Citations"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[#4285F4]/10 text-[#4285F4] flex items-center justify-center font-bold text-xs shrink-0">G</span>
                  <span className="font-semibold text-xs text-[#0F2537] group-hover:text-[#4285F4] truncate">Google Scholar</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#4285F4] shrink-0" />
              </a>

              <a
                href={LAB_INFO.pi.researchGateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#00CCBB] hover:bg-[#00CCBB]/5 transition-all text-[#0F2537] shadow-sm group"
                title="View ResearchGate Profile"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[#00CCBB]/10 text-[#009B8D] flex items-center justify-center font-bold text-xs shrink-0">RG</span>
                  <span className="font-semibold text-xs text-[#0F2537] group-hover:text-[#009B8D] truncate">ResearchGate</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#009B8D] shrink-0" />
              </a>

              <a
                href={LAB_INFO.pi.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#0077B5] hover:bg-[#0077B5]/5 transition-all text-[#0F2537] shadow-sm group"
                title="View LinkedIn Profile"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[#0077B5]/10 text-[#0077B5] flex items-center justify-center font-bold text-xs shrink-0">in</span>
                  <span className="font-semibold text-xs text-[#0F2537] group-hover:text-[#0077B5] truncate">LinkedIn</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0077B5] shrink-0" />
              </a>

              <div className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-gray-50 border border-dashed border-gray-300 text-[#0F2537]/80 shadow-sm">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[#A6CE39]/20 text-[#6B8E23] flex items-center justify-center font-bold text-[11px] shrink-0">iD</span>
                  <span className="font-medium text-xs truncate">ORCID</span>
                </div>
                <span className="text-[10px] font-mono bg-amber-50 text-amber-700 px-2 py-0.5 rounded border border-amber-200 font-semibold shrink-0">will provide</span>
              </div>

              <a
                href={LAB_INFO.pi.scopusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white border border-gray-200 hover:border-[#E86C00] hover:bg-[#E86C00]/5 transition-all text-[#0F2537] shadow-sm group"
                title="View Scopus Profile"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-5 h-5 rounded-full bg-[#E86C00]/10 text-[#E86C00] flex items-center justify-center font-bold text-xs shrink-0">Sc</span>
                  <span className="font-semibold text-xs text-[#0F2537] group-hover:text-[#E86C00] truncate">Scopus Profile</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#E86C00] shrink-0" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Research Roster & Category Filters */}
      <section id="team-roster" className="space-y-8 scroll-mt-28">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
              Laboratory Members &amp; Scholars
            </h2>
            <p className="text-xs text-[#0F2537]/70 mt-1">
              Postdoctoral fellows, doctoral candidates, graduate trainees, and alumni network.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-white border border-gray-200 text-xs font-semibold">
            {[
              { id: 'all', label: 'All Members' },
              { id: 'postdoc', label: 'Postdoc' },
              { id: 'phd', label: 'Ph.D. Scholars' },
              { id: 'trainee', label: 'Trainees' },
              { id: 'alumni', label: 'Alumni' },
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filter === btn.id
                    ? 'bg-[#8B1E24] text-white shadow-sm'
                    : 'text-[#0F2537]/70 hover:text-[#0F2537]'
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        {/* Member Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-[#C59B27] shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-[#C59B27] bg-[#FAF8F5] flex-shrink-0">
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
                    <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] mt-1">
                      {member.name}
                    </h3>
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
                      Specialization:
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
      </section>

      {/* 3. Join the NeuroXlab Banner */}
      <section className="bg-gradient-to-r from-[#8B1E24] to-[#641318] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#C59B27] shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Interested in Joining NeuroXlab?
            </h3>
            <p className="text-sm text-white/85 max-w-2xl leading-relaxed">
              We welcome motivated CSIR/UGC-NET JRFs, DBT-BET fellows, PMRF scholars, and postdoctoral applicants who are eager to conduct breakthrough research in systems neuroscience.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('contact')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#8B1E24] hover:bg-[#FAF8F5] font-bold text-sm shadow transition-all whitespace-nowrap active:scale-95"
          >
            <span>View Open Positions &amp; Apply</span>
            <ArrowRight className="w-4 h-4 text-[#8B1E24]" />
          </button>
        </div>
      </section>
    </div>
  );
}
