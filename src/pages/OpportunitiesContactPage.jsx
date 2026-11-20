import React, { useState } from 'react';
import {
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  GraduationCap,
  ExternalLink,
  Navigation,
  Clock,
  Plane,
  Train,
  Car,
  Flame,
  FileText,
  Copy,
  Check,
  Sparkles,
  Award,
  User,
  Building2,
  ShieldCheck,
  ArrowRight,
  Link as LinkIcon,
  BookOpen,
  Calendar,
  ChevronDown
} from 'lucide-react';

export default function OpportunitiesContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    track: 'Project Fellow (JRF / SRF) - 2026–2029 Nano-SCFA & Edaravone Grant',
    qualification: '',
    nationalExam: 'CSIR-UGC NET JRF',
    cvUrl: '',
    statement: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState(null);

  const recruitmentTracks = [
    {
      id: 'track-grant-2026',
      num: '01',
      icon: Flame,
      title: 'Project Fellows (JRF / SRF / Postdoc)',
      formTrackValue: 'Project Fellow (JRF / SRF) - 2026–2029 Nano-SCFA & Edaravone Grant',
      project: '2026–2029 Extramural Nano-SCFA & Edaravone Grant',
      duration: '3 Years (2026–2029)',
      stipend: '₹37,000/mo (JRF/SRF) • ₹58,000/mo (Postdoc)',
      degree: 'M.Sc. / M.Tech in Life Sciences, Systems Biology, Biotech, or Ph.D.',
      exam: 'Valid CSIR-UGC NET (JRF/LS), GATE, DBT-BET, or ICMR-JRF',
      desirable: 'Stroke models (MCAO), nanoparticles (DLS), or 16S bioinformatics',
      badge: 'Active Funded Project',
      badgeStyle: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
      statusDot: 'bg-emerald-500',
      featured: false
    },
    {
      id: 'track-phd',
      num: '02',
      icon: GraduationCap,
      title: 'Ph.D. Doctoral Research Scholars',
      formTrackValue: 'Ph.D. Doctoral Admissions (CSIR/UGC/DBT/ICMR Fellow)',
      project: 'Dept. of Systems & Computational Biology, UoH',
      duration: '5 Years Doctoral Degree Program',
      stipend: 'Full National Fellowship (CSIR / UGC / PMRF)',
      degree: 'M.Sc. in Systems Biology, Biochemistry, or Allied Life Sciences',
      exam: 'Independent National JRF (CSIR, UGC, DBT, ICMR, or PMRF)',
      desirable: 'UPR stress signaling, non-coding RNAs, or gut-brain metabolomics',
      badge: 'Doctoral Track',
      badgeStyle: 'bg-amber-50 text-amber-900 border-amber-200/80',
      statusDot: 'bg-[#C59B27]',
      featured: false
    },
    {
      id: 'track-msc',
      num: '03',
      icon: BookOpen,
      title: 'M.Sc. / M.Tech Dissertation Trainees',
      formTrackValue: 'M.Sc. / M.Tech 6-Month Dissertation Trainee',
      project: "Academic Master's 6-Month Research Project",
      duration: '6 Months (Jan–Jun / Jul–Dec Cycles)',
      stipend: 'Institutional Training Program',
      degree: 'Enrolled in 2nd year M.Sc. or M.Tech in Life Sciences / Bioinformatics',
      exam: 'Institutional Bonafide / Recommendation letter from HoD',
      desirable: 'Wet-lab pipetting, Western blotting, or Python/R scripting',
      badge: 'Dissertation Track',
      badgeStyle: 'bg-sky-50 text-sky-900 border-sky-200/80',
      statusDot: 'bg-sky-500',
      featured: false
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectTrackAndScroll = (track) => {
    setSelectedTrackId(track.id);
    setFormData((prev) => ({
      ...prev,
      track: track.formTrackValue
    }));
    setSubmitted(false);

    const portalElem = document.getElementById('application-portal');
    if (portalElem) {
      portalElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const copyEmailToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhoneToClipboard = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const mailtoLink = `mailto:nvprasuja@uohyd.ac.in?subject=${encodeURIComponent(
    `[NeuroXlab Application] ${formData.track} - ${formData.name}`
  )}&body=${encodeURIComponent(
    `Dear Dr. Venkata Prasuja Nakka,\n\nI am formally applying for the position: ${formData.track}.\n\nFull Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nHighest Degree / Institute: ${formData.qualification}\nNational Fellowship / Exam Qualified: ${formData.nationalExam}\nCV Link: ${formData.cvUrl}\n\nBrief Research Statement:\n${formData.statement}\n\nSincerely,\n${formData.name}`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-24 space-y-16 sm:space-y-20">
      {/* 1. Editorial Hero Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0F2537] via-[#132c42] to-[#0A1926] text-white border-2 border-[#C59B27]/50 shadow-2xl p-6 sm:p-10 lg:p-12">
        {/* Subtle Decorative Radial Accents */}
        <div
          className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#C59B27]/10 blur-3xl pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-[#8B1E24]/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#C59B27]/40 text-xs font-bold uppercase tracking-wider text-[#E0B84C]">
              <Briefcase className="w-3.5 h-3.5 text-[#E0B84C]" />
              <span>Extramural Grants, Fellowships & Lab Inquiries</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Opportunities & <span className="text-[#E0B84C]">Contact</span>
            </h1>

            <p className="text-white/85 text-sm sm:text-base lg:text-[17px] leading-relaxed font-normal max-w-2xl">
              Join <strong className="text-white font-semibold">NeuroXlab</strong> under our active 2026–2029 Nano-SCFA & Edaravone Extramural Project, pursue direct doctoral admissions at the University of Hyderabad, or initiate academic collaborations.
            </p>

            {/* Quick Highlight Pills */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active 2026–2029 JRF/SRF Opening
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white/90 text-xs font-medium">
                <Award className="w-3.5 h-3.5 text-[#E0B84C]" />
                CSIR / UGC / DBT / ICMR / GATE Eligible
              </span>
            </div>
          </div>

          {/* Right Quick-Dispatch Card inside Hero */}
          <div className="lg:w-[340px] shrink-0 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-[#C59B27]/40 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-white/15 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#E0B84C] block font-bold">
                  Principal Investigator Desk
                </span>
                <h2 className="font-serif text-lg font-bold text-white">
                  Dr. Venkata Prasuja Nakka
                </h2>
              </div>
              <div className="w-10 h-10 rounded-xl bg-[#8B1E24] border border-[#C59B27]/50 flex items-center justify-center shrink-0 shadow">
                <Mail className="w-5 h-5 text-[#E0B84C]" />
              </div>
            </div>

            <div className="space-y-2 text-xs text-white/85">
              <div className="flex items-center justify-between gap-2 bg-[#0A1926]/70 px-3 py-2.5 rounded-xl border border-white/10">
                <div className="truncate">
                  <span className="text-[10px] font-mono text-white/50 uppercase block">
                    Official Submission Email
                  </span>
                  <span className="font-mono font-bold text-[#E0B84C] text-xs sm:text-sm">
                    nvprasuja@uohyd.ac.in
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => copyEmailToClipboard('nvprasuja@uohyd.ac.in')}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Copy official email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#E0B84C]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <a
              href="#application-portal"
              className="w-full py-2.5 px-4 rounded-xl bg-[#8B1E24] hover:bg-[#A82931] border border-[#C59B27]/50 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Jump to Application Portal</span>
              <ArrowRight className="w-4 h-4 text-[#E0B84C]" />
            </a>
          </div>
        </div>
      </section>

      {/* 2. Open Recruitment Tracks Section */}
      <section className="space-y-8">
        <div className="space-y-3 border-b border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/5 border border-[#8B1E24]/15 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Open Positions &amp; Fellowships</span>
            </div>
            <span className="text-xs font-mono text-slate-400 font-medium hidden sm:inline">
              Select a track to pre-fill application
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#0F2537] tracking-tight">
                Recruitment Tracks &amp; Eligibility
              </h2>
              <div className="w-16 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm text-slate-500 max-w-lg leading-relaxed">
              Explore available research positions across funded extramural grants, direct doctoral admissions, and master's dissertations.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {recruitmentTracks.map((trk) => {
            const Icon = trk.icon;
            const isSelected = selectedTrackId === trk.id;
            return (
              <div
                key={trk.id}
                onClick={() => handleSelectTrackAndScroll(trk)}
                className={`group relative bg-white rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-[#8B1E24]/60 hover:-translate-y-1.5 cursor-pointer ${
                  isSelected ? 'ring-2 ring-[#8B1E24] border-[#8B1E24] shadow-xl' : ''
                }`}
              >
                {/* Top Accent Strip with Hover Expansion */}
                <div
                  className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 group-hover:from-[#8B1E24] group-hover:via-[#C59B27] group-hover:to-[#0F2537] group-hover:h-1.5 transition-all duration-300"
                />

                <div className="space-y-5 pt-1">
                  {/* Top Row: Badge & Track Number */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full border ${trk.badgeStyle} transition-colors`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${trk.statusDot} ${trk.id === 'track-grant-2026' ? 'animate-pulse' : ''}`} />
                      {trk.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400 tracking-wider group-hover:text-slate-600 transition-colors">
                      TRACK {trk.num}
                    </span>
                  </div>

                  {/* Icon + Title + Project */}
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border border-slate-200 bg-slate-50 text-[#8B1E24] group-hover:bg-[#8B1E24] group-hover:text-white group-hover:border-[#8B1E24] group-hover:scale-105 transition-all duration-300 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                        {trk.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#8B1E24] mt-1">
                        {trk.project}
                      </p>
                    </div>
                  </div>

                  {/* Key Stipend & Duration Banner */}
                  <div className="grid grid-cols-2 gap-3 bg-slate-50/80 group-hover:bg-rose-50/30 p-3.5 rounded-2xl border border-slate-100 group-hover:border-rose-100/60 transition-colors duration-300 text-xs">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        Fellowship / Stipend
                      </span>
                      <span className="font-bold text-[#0F2537] text-xs leading-tight block mt-0.5">
                        {trk.stipend}
                      </span>
                    </div>
                    <div className="border-l border-slate-200/80 pl-3">
                      <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                        Duration
                      </span>
                      <span className="font-semibold text-slate-700 text-xs leading-tight block mt-0.5">
                        {trk.duration}
                      </span>
                    </div>
                  </div>

                  {/* Requirements List (Clean, Structured, Highly Scannable) */}
                  <div className="space-y-3 pt-1 text-xs">
                    <div className="flex items-start gap-2.5">
                      <GraduationCap className="w-4 h-4 text-[#8B1E24] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Degree Requirement
                        </span>
                        <p className="text-slate-700 font-medium leading-relaxed">
                          {trk.degree}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          National Eligibility
                        </span>
                        <p className="text-slate-700 font-medium leading-relaxed">
                          {trk.exam}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div className="space-y-0.5">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Preferred Research Experience
                        </span>
                        <p className="text-slate-600 italic leading-relaxed">
                          {trk.desirable}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-4 mt-5 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTrackAndScroll(trk);
                    }}
                    className="w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 bg-[#0F2537] group-hover:bg-[#8B1E24] text-white shadow-sm group-hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <span>Apply for this Track</span>
                    <ArrowRight className="w-4 h-4 text-[#E0B84C] group-hover:translate-x-1.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Interactive Application Portal & Headquarters Contact Dossier */}
      <section
        id="application-portal"
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch scroll-mt-24"
      >
        {/* Left Column: Interactive Application Form (7 Columns on Desktop) */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-9 border border-slate-200/90 shadow-xl shadow-slate-200/50 relative overflow-hidden flex-1 flex flex-col justify-between">
            {/* Top Sleek Accent Line */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8B1E24] via-[#C59B27] to-[#0F2537]" />

            <div className="space-y-6">
              {/* Form Header */}
              <div className="space-y-2 border-b border-slate-100 pb-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase text-[#8B1E24] bg-[#8B1E24]/5 px-3 py-1 rounded-full border border-[#8B1E24]/15">
                    <FileText className="w-3.5 h-3.5 text-[#8B1E24]" />
                    Interactive Submission Portal
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Direct PI Dispatch • Verified Secure
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537] pt-1">
                  Candidate Application &amp; Research Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  Completing this form formats a standardized academic dossier and opens your email client pre-addressed to{' '}
                  <a
                    href="mailto:nvprasuja@uohyd.ac.in"
                    className="font-mono text-[#8B1E24] font-semibold hover:underline"
                  >
                    nvprasuja@uohyd.ac.in
                  </a>.
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50/90 border border-emerald-300 rounded-2xl p-6 sm:p-8 text-center space-y-5 animate-in fade-in">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                      Dossier Ready for Dispatch
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl font-bold text-emerald-950">
                      Application Drafted Successfully!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-900/85 max-w-lg mx-auto leading-relaxed">
                      Thank you, <strong>{formData.name}</strong>. Your application for{' '}
                      <strong className="underline decoration-emerald-500">{formData.track}</strong> has been formatted. Click the button below to launch your email client and send it to Dr. Nakka.
                    </p>
                  </div>

                  {/* Preview Box of Formatted Dossier */}
                  <div className="text-left bg-white rounded-xl p-4 border border-emerald-200 text-xs font-mono text-slate-700 space-y-1 max-h-48 overflow-y-auto shadow-inner">
                    <p className="text-[#8B1E24] font-bold">
                      To: nvprasuja@uohyd.ac.in
                    </p>
                    <p className="text-[#0F2537] font-bold border-b border-slate-100 pb-1.5 mb-1.5">
                      Subject: [NeuroXlab Application] {formData.track} - {formData.name}
                    </p>
                    <p>Candidate: {formData.name} ({formData.email} | {formData.phone})</p>
                    <p>Qualification: {formData.qualification}</p>
                    <p>National Exam: {formData.nationalExam}</p>
                    <p className="truncate">CV URL: {formData.cvUrl}</p>
                    <p className="pt-1 text-slate-600">Statement: {formData.statement}</p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={mailtoLink}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#8B1E24] hover:bg-[#641318] text-white text-xs sm:text-sm font-bold shadow-md transition-all active:scale-95"
                    >
                      <Mail className="w-4 h-4 text-[#E0B84C]" />
                      <span>Open Email Client &amp; Send to PI</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => copyEmailToClipboard('nvprasuja@uohyd.ac.in')}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-xl bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      {copiedEmail ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>Email Address Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-emerald-700" />
                          <span>Copy PI Email Address</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-semibold text-emerald-800 hover:text-emerald-950 underline block mx-auto pt-2 cursor-pointer"
                  >
                    ← Edit application details or submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 group">
                      <label className="block text-[13px] font-semibold text-slate-700">
                        Candidate Full Name <span className="text-[#8B1E24]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 group-focus-within:text-[#8B1E24] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Dr. / Mr. / Ms. Full Name"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-[#8B1E24] focus:ring-4 focus:ring-[#8B1E24]/10 text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="block text-[13px] font-semibold text-slate-700">
                        Contact Email Address <span className="text-[#8B1E24]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 group-focus-within:text-[#8B1E24] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="candidate@university.edu"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-[#8B1E24] focus:ring-4 focus:ring-[#8B1E24]/10 text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Phone & Recruitment Track */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 group">
                      <label className="block text-[13px] font-semibold text-slate-700">
                        Phone / Mobile Number <span className="text-[#8B1E24]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 group-focus-within:text-[#8B1E24] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91-9876543210"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-[#8B1E24] focus:ring-4 focus:ring-[#8B1E24]/10 text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="block text-[13px] font-semibold text-slate-700">
                        Recruitment Track <span className="text-[#8B1E24]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          name="track"
                          value={formData.track}
                          onChange={handleChange}
                          className="w-full pl-3.5 pr-10 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-[#8B1E24] focus:ring-4 focus:ring-[#8B1E24]/10 text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 font-medium outline-none transition-all duration-200 appearance-none truncate cursor-pointer"
                        >
                          <option value="Project Fellow (JRF / SRF) - 2026–2029 Nano-SCFA & Edaravone Grant">
                            Project Fellow (JRF/SRF) • 2026–2029 Grant
                          </option>
                          <option value="Postdoctoral Research Fellow (2026–2029 Grant)">
                            Postdoctoral Fellow (PDF) • 2026–2029 Grant
                          </option>
                          <option value="Ph.D. Doctoral Admissions (CSIR/UGC/DBT/ICMR Fellow)">
                            Ph.D. Admissions • CSIR/UGC/DBT Fellow
                          </option>
                          <option value="M.Sc. / M.Tech 6-Month Dissertation Trainee">
                            M.Sc. / M.Tech Dissertation (6 Months)
                          </option>
                          <option value="Academic Collaborative Inquiry">
                            Academic Collaborative Inquiry
                          </option>
                        </select>
                        <ChevronDown className="w-4 h-4 text-slate-400 group-focus-within:text-[#8B1E24] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                      </div>
                    </div>
                  </div>

                  {/* Row 3: Qualification & National Fellowship */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5 group">
                      <label className="block text-[13px] font-semibold text-slate-700">
                        Highest Qualification &amp; Institution <span className="text-[#8B1E24]">*</span>
                      </label>
                      <div className="relative">
                        <GraduationCap className="w-4 h-4 text-slate-400 group-focus-within:text-[#8B1E24] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                        <input
                          type="text"
                          name="qualification"
                          required
                          value={formData.qualification}
                          onChange={handleChange}
                          placeholder="e.g. M.Sc. Biochemistry (UoH, 2025)"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-[#8B1E24] focus:ring-4 focus:ring-[#8B1E24]/10 text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5 group">
                      <label className="block text-[13px] font-semibold text-slate-700">
                        National Fellowship / Examination <span className="text-[#8B1E24]">*</span>
                      </label>
                      <div className="relative">
                        <Award className="w-4 h-4 text-slate-400 group-focus-within:text-[#8B1E24] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                        <input
                          type="text"
                          name="nationalExam"
                          required
                          value={formData.nationalExam}
                          onChange={handleChange}
                          placeholder="e.g. CSIR-UGC NET JRF / GATE / DBT-BET"
                          className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-[#8B1E24] focus:ring-4 focus:ring-[#8B1E24]/10 text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Row 4: CV Link */}
                  <div className="space-y-1.5 group">
                    <label className="block text-[13px] font-semibold text-slate-700">
                      Curriculum Vitae Link (Drive / Dropbox / OneDrive) <span className="text-[#8B1E24]">*</span>
                    </label>
                    <div className="relative">
                      <LinkIcon className="w-4 h-4 text-slate-400 group-focus-within:text-[#8B1E24] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none transition-colors" />
                      <input
                        type="url"
                        name="cvUrl"
                        required
                        value={formData.cvUrl}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-[#8B1E24] focus:ring-4 focus:ring-[#8B1E24]/10 text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 outline-none transition-all duration-200"
                      />
                    </div>
                    <p className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Please ensure link sharing permission is set to <strong>"Anyone with the link can view"</strong>.</span>
                    </p>
                  </div>

                  {/* Row 5: Research Statement */}
                  <div className="space-y-1.5 group">
                    <div className="flex items-center justify-between">
                      <label className="block text-[13px] font-semibold text-slate-700">
                        Brief Statement of Research Interest <span className="text-[#8B1E24]">*</span>
                      </label>
                      <span className="text-[11px] text-slate-400">2–3 sentences</span>
                    </div>
                    <textarea
                      name="statement"
                      rows={3}
                      required
                      value={formData.statement}
                      onChange={handleChange}
                      placeholder="Briefly state your prior experience (e.g. MCAO surgery, nanoparticle synthesis, Western blotting, or 16S microbiome analysis) and motivation..."
                      className="w-full p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 focus:border-[#8B1E24] focus:ring-4 focus:ring-[#8B1E24]/10 text-sm bg-slate-50/50 hover:bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 leading-relaxed outline-none transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#8B1E24] to-[#A3232A] hover:from-[#72181D] hover:to-[#8B1E24] shadow-md hover:shadow-lg hover:shadow-[#8B1E24]/20 transition-all duration-200 flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Formatting Application Dossier...</span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#E0B84C]" />
                        <span>Submit &amp; Generate Pre-Addressed Email</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Official Institutional Address & Transit Dossier (5 Columns on Desktop) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
          {/* Card 1: Official Institutional Laboratory Headquarters */}
          <div className="bg-[#0F2537] text-white rounded-3xl p-6 sm:p-7 border border-[#C59B27]/50 shadow-xl space-y-4 relative overflow-hidden shrink-0">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#C59B27] via-[#E0B84C] to-[#C59B27]" />

            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest text-[#E0B84C] font-mono font-bold block">
                Official Institutional Laboratory Address
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                NeuroXlab Headquarters
              </h3>
            </div>

            <div className="space-y-3 text-sm text-white/90 leading-relaxed">
              {/* Physical Address Block */}
              <div className="flex items-start gap-3 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                <MapPin className="w-4 h-4 text-[#E0B84C] mt-1 shrink-0" />
                <div className="space-y-0.5 text-xs">
                  <p className="font-bold text-white text-sm">
                    Dr. N. Venkata Prasuja
                  </p>
                  <p className="text-[#E0B84C] font-medium">
                    Room No. F-75C, Dept. of Systems &amp; Computational Biology
                  </p>
                  <p className="text-white/90">
                    School of Life Sciences, University of Hyderabad
                  </p>
                  <p className="text-white/70">
                    Prof. C.R. Rao Road, Gachibowli, Hyderabad – 500046
                  </p>
                </div>
              </div>

              {/* Direct Phone Row */}
              <div className="flex items-center justify-between gap-3 bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#C59B27]/15 border border-[#C59B27]/40 flex items-center justify-center shrink-0">
                    <Phone className="w-3.5 h-3.5 text-[#E0B84C]" />
                  </div>
                  <div className="truncate">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                      Direct Lab Phone
                    </span>
                    <a
                      href="tel:+914023134581"
                      className="font-mono hover:text-[#E0B84C] font-bold text-xs text-white transition-colors"
                    >
                      +91-40-23134581
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyPhoneToClipboard('+91-40-23134581')}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Copy phone number"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#E0B84C]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Official Email Row */}
              <div className="flex items-center justify-between gap-3 bg-white/5 px-3.5 py-2.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-[#C59B27]/15 border border-[#C59B27]/40 flex items-center justify-center shrink-0">
                    <Mail className="w-3.5 h-3.5 text-[#E0B84C]" />
                  </div>
                  <div className="truncate">
                    <span className="text-[9px] font-mono uppercase tracking-wider text-white/50 block">
                      Official Email
                    </span>
                    <a
                      href="mailto:nvprasuja@uohyd.ac.in"
                      className="font-mono hover:text-[#E0B84C] font-bold text-xs text-white transition-colors truncate block"
                    >
                      nvprasuja@uohyd.ac.in
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyEmailToClipboard('nvprasuja@uohyd.ac.in')}
                  className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Copy email address"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-300">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-[#E0B84C]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Google Maps Navigation CTA */}
            <a
              href="https://maps.google.com/?q=School+of+Life+Sciences+University+of+Hyderabad"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#8B1E24] hover:bg-[#A82931] text-xs font-bold text-white flex items-center justify-center gap-2 transition-all border border-[#C59B27]/40 shadow-md"
            >
              <Navigation className="w-3.5 h-3.5 text-[#E0B84C]" />
              <span>Navigate via Google Maps</span>
              <ExternalLink className="w-3 h-3 text-white/70 ml-0.5" />
            </a>
          </div>

          {/* Card 2: Campus Transit & Route Guide (Visitor Logistics) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-md space-y-4 flex-1 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Visitor Logistics
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#0F2537]">
                    Campus Transit &amp; Route Guide
                  </h4>
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold text-[#8B1E24] bg-[#8B1E24]/5 border border-[#8B1E24]/15 px-2.5 py-0.5 rounded-full">
                UoH Campus
              </span>
            </div>

            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed flex-1 flex flex-col justify-around">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Plane className="w-3.5 h-3.5 text-[#8B1E24]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-slate-800 font-bold text-xs truncate">
                      Rajiv Gandhi Int'l Airport (RGIA)
                    </strong>
                    <span className="text-[11px] font-mono font-bold text-[#8B1E24] shrink-0">~36 km</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    35–40 mins via Nehru ORR exit towards Gachibowli / Financial District.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Train className="w-3.5 h-3.5 text-[#C59B27]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-slate-800 font-bold text-xs truncate">
                      Lingampally Railway Station / MMTS
                    </strong>
                    <span className="text-[11px] font-mono font-bold text-[#977313] shrink-0">~6 km</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Closest railhead to University South Gate (15 mins via auto/cab).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50/70 border border-slate-100">
                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Car className="w-3.5 h-3.5 text-[#0F2537]" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-slate-800 font-bold text-xs truncate">
                      Secunderabad / Nampally Hub
                    </strong>
                    <span className="text-[11px] font-mono font-bold text-slate-500 shrink-0">~22-26 km</span>
                  </div>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    Accessible via Raidurg Metro Station or Mehdipatnam – Gachibowli corridor.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-400 flex items-center justify-between font-mono">
              <span>South Gate Entry • School of Life Sciences</span>
              <span className="text-emerald-600 font-semibold">Visitor Parking Available</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}