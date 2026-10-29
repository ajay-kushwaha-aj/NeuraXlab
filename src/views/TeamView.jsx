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
                Dr. Venkata Prasuja Nakka
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
              <div className="relative rounded-2xl overflow-hidden border-4 border-[#C59B27] shadow-xl bg-[#0F2537] aspect-[3/4] max-w-[300px] mx-auto group">
                <img
                  src={pi.avatar}
                  alt={pi.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Direct Office & Contact Card */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-gray-200 space-y-3 text-xs text-[#0F2537]">
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

            {/* Right Column: Pedigree, Biography & Research Philosophy */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-3">
                {/* Section label */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
                  <Award className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Principal Investigator &amp; Lab Director</span>
                </div>

                {/* Heading */}
                <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F2537] tracking-tight">
                  Dr. Venkata Prasuja Nakka, Ph.D.
                </h2>

                {/* Subtitle */}
                <p className="font-serif italic text-lg sm:text-xl font-medium text-[#8B1E24]">
                  Systems Neurobiologist &amp; Translational Researcher
                </p>

                {/* Intro paragraphs */}
                <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed font-normal pt-1">
                  <p>
                    Dr. Venkata Prasuja Nakka is an Assistant Professor in the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad. He earned his Ph.D. through Jawaharlal Nehru University, New Delhi, with research conducted at the Central Drug Research Institute, Lucknow. His research focuses on the molecular mechanisms of ischemic stroke, cellular stress signaling, neuroinflammation, gut–brain interactions, and stroke-induced systemic injury.
                  </p>
                  <p>
                    His postdoctoral research experience includes the University of Wisconsin–Madison, the National University of Singapore, and the University of Hyderabad, where he held SERB-Young Scientist and UGC-Postdoctoral Fellow positions. At NeuroXLab, he integrates experimental neuroscience with computational and systems-level approaches to investigate stroke pathology and advance translational therapeutic strategies, including nanotechnology-based drug delivery and neuroprotection.
                  </p>
                </div>

                {/* Button: Explore His Research */}
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

              {/* Academic Qualifications & Postdoctoral Experience */}
              <div className="space-y-4 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Education */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#8B1E24] uppercase">
                      <GraduationCap className="w-4 h-4" />
                      <span>Education</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <strong className="text-[#0F2537] block font-semibold">Ph.D.</strong>
                        <p className="text-[#0F2537]/75">Jawaharlal Nehru University, New Delhi / Central Drug Research Institute, Lucknow, India.</p>
                      </div>
                      <div className="pt-1 border-t border-gray-200/60">
                        <strong className="text-[#0F2537] block font-semibold">M.Sc.</strong>
                        <p className="text-[#0F2537]/75">Acharya Nagarjuna University, Andhra Pradesh, India.</p>
                      </div>
                    </div>
                  </div>

                  {/* Postdoctoral Research */}
                  <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#8B1E24] uppercase">
                      <Award className="w-4 h-4 text-[#C59B27]" />
                      <span>Postdoctoral Research</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div>
                        <strong className="text-[#0F2537] block font-semibold">University of Wisconsin–Madison, USA</strong>
                        <p className="text-[#0F2537]/75">Department of Neurological Surgery, School of Medicine and Public Health.</p>
                      </div>
                      <div className="pt-1 border-t border-gray-200/60">
                        <strong className="text-[#0F2537] block font-semibold">National University of Singapore, Singapore</strong>
                        <p className="text-[#0F2537]/75">Department of Pharmacy.</p>
                      </div>
                      <div className="pt-1 border-t border-gray-200/60">
                        <strong className="text-[#0F2537] block font-semibold">University of Hyderabad, India</strong>
                        <p className="text-[#0F2537]/75">SERB-Young Scientist and UGC-Postdoctoral Fellow, School of Life Sciences.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Research Interests (5 Cards) */}
              <div className="space-y-3 pt-2">
                <h4 className="font-serif text-lg font-bold text-[#0F2537]">
                  Research Interests
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-0.5">
                    <strong className="text-[#8B1E24] font-semibold block">Stroke Biology &amp; Neuroprotection</strong>
                    <p className="text-[#0F2537]/75">Molecular mechanisms and experimental neuroprotective strategies.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-0.5">
                    <strong className="text-[#8B1E24] font-semibold block">Cellular Stress &amp; Signaling</strong>
                    <p className="text-[#0F2537]/75">ER stress, UPR, oxidative stress, and inflammatory cascades.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-0.5">
                    <strong className="text-[#8B1E24] font-semibold block">Gut–Brain Axis &amp; Metagenomics</strong>
                    <p className="text-[#0F2537]/75">Microbiome dynamics and computational metagenomic integration.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-0.5">
                    <strong className="text-[#8B1E24] font-semibold block">Brain–Organ Crosstalk</strong>
                    <p className="text-[#0F2537]/75">Distal organ damage and systemic neuroimmune signaling.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-gray-200 space-y-0.5 sm:col-span-2 lg:col-span-1">
                    <strong className="text-[#8B1E24] font-semibold block">Translational Therapeutics</strong>
                    <p className="text-[#0F2537]/75">Nanotechnology-based drug delivery and neuroprotection.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Verified Direct Contact Strip */}
        <div className="border-t border-gray-200 bg-[#FAF8F5] px-6 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 shrink-0">
              <Mail className="w-4 h-4 text-[#8B1E24]" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8B1E24]">
                Contact the Principal Investigator:
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <a href="mailto:nvprasuja@uohyd.ac.in" className="inline-flex items-center gap-1.5 font-bold text-[#8B1E24] hover:underline">
                <span>Institutional: nvprasuja@uohyd.ac.in</span>
              </a>
              <span className="text-gray-300">•</span>
              <a href="mailto:nvprasuja@gmail.com" className="inline-flex items-center gap-1.5 font-semibold text-slate-700 hover:text-[#8B1E24] hover:underline">
                <span>Primary: nvprasuja@gmail.com</span>
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
                className={`px-3 py-1.5 rounded-lg transition-all ${filter === btn.id
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
