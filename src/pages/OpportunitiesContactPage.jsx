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
  Calendar
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
  const [selectedTrackId, setSelectedTrackId] = useState('track-grant-2026');

  const recruitmentTracks = [
    {
      id: 'track-grant-2026',
      num: '01',
      icon: Flame,
      title: 'Project Fellows (JRF / SRF / Postdoc)',
      formTrackValue: 'Project Fellow (JRF / SRF) - 2026–2029 Nano-SCFA & Edaravone Grant',
      project: '2026–2029 Extramural Nano-SCFA & Edaravone Grant',
      duration: '3 Years (27-Jan-2026 to 26-Jan-2029)',
      stipend: '₹37,000/mo + HRA (JRF/SRF) • ₹58,000/mo + HRA (Postdoc)',
      eligibility:
        'M.Sc. / M.Tech in Systems Biology, Biochemistry, Biotechnology, Neuroscience, or Nanotechnology with valid CSIR-UGC NET (JRF/LS), GATE, DBT-BET, or ICMR-JRF qualification. Ph.D. for Postdoc track.',
      desirable:
        'Prior experience in small animal stroke models (MCAO intraluminal suture), laser Doppler flowmetry, nanoparticle synthesis (DLS/Zeta), or 16S microbiome bioinformatics.',
      badge: 'Active Extramural Funded Project',
      badgeStyle: 'bg-[#8B1E24] text-white border-[#8B1E24]',
      statusDot: 'bg-emerald-500',
      featured: true
    },
    {
      id: 'track-phd',
      num: '02',
      icon: GraduationCap,
      title: 'Ph.D. Doctoral Research Scholars',
      formTrackValue: 'Ph.D. Doctoral Admissions (CSIR/UGC/DBT/ICMR Fellow)',
      project: 'Direct Ph.D. Admissions (Dept. of Systems & Computational Biology, UoH)',
      duration: '5 Years Doctoral Degree Program',
      stipend: 'As per National Fellowship Agency (CSIR / UGC / DBT / ICMR / PMRF)',
      eligibility:
        'Candidates with independent national junior research fellowships (CSIR-JRF, UGC-JRF, DBT-JRF, ICMR-JRF, or PMRF) eligible to activate fellowship at University of Hyderabad.',
      desirable:
        'Strong inclination toward organelle proteostasis, unfolded protein response signaling, non-coding RNA genomics, or gut-brain metabolomics.',
      badge: 'Doctoral Fellowship Track',
      badgeStyle: 'bg-[#0F2537] text-white border-[#0F2537]',
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
      duration: '6 Months (Jan–Jun or Jul–Dec Cycles)',
      stipend: 'Institutional Dissertation Training',
      eligibility:
        'Enrolled in 2nd year M.Sc. or M.Tech in Systems Biology, Bioinformatics, Biochemistry, or Life Sciences at recognized Central/State universities.',
      desirable:
        'Basic wet-lab pipetting skills, Western blotting familiarity, or Python/R bioinformatics scripting.',
      badge: 'Graduate Dissertation',
      badgeStyle: 'bg-[#FAF8F5] text-[#0F2537] border-[#C59B27]/50',
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
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 border border-white/15 text-white/90 text-xs font-medium">
                <Building2 className="w-3.5 h-3.5 text-[#E0B84C]" />
                Room F-75C, School of Life Sciences, UoH
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
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Active Funded Openings</span>
            </div>
            <span className="text-xs font-mono text-slate-400 font-semibold uppercase hidden sm:inline">
              Select a Track to Pre-Fill Application
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#0F2537] tracking-tight">
                Recruitment Tracks & Eligibility Criteria
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              We welcome motivated scholars passionate about experimental stroke neurobiology, nanomedicine, and multi-omics systems biology.
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
                className={`group relative bg-white rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between overflow-hidden ${trk.featured
                  ? 'border-2 border-[#8B1E24]/80 shadow-xl hover:shadow-2xl'
                  : 'border border-slate-200/90 hover:border-[#8B1E24]/60 shadow-md hover:shadow-xl'
                  } ${isSelected ? 'ring-2 ring-[#C59B27]' : ''}`}
              >
                {/* Top Accent Strip */}
                <div
                  className={`absolute top-0 inset-x-0 h-1.5 ${trk.featured
                    ? 'bg-gradient-to-r from-[#8B1E24] via-[#C59B27] to-[#8B1E24]'
                    : 'bg-gradient-to-r from-[#0F2537] via-[#C59B27] to-[#0F2537] opacity-80'
                    }`}
                />

                <div className="space-y-5 pt-1">
                  {/* Top Row: Badge & Track Number */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase px-3 py-1 rounded-full border ${trk.badgeStyle}`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${trk.statusDot}`} />
                      {trk.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-400 tracking-widest">
                      TRACK {trk.num}
                    </span>
                  </div>

                  {/* Icon + Title + Project Subtitle */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-colors ${trk.featured
                          ? 'bg-[#8B1E24] text-white border-[#8B1E24]'
                          : 'bg-[#FAF8F5] text-[#8B1E24] border-slate-200 group-hover:bg-[#8B1E24] group-hover:text-white'
                          }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] leading-snug">
                          {trk.title}
                        </h3>
                        <p className="text-xs font-bold text-[#977313] mt-1 leading-relaxed">
                          {trk.project}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics Box: Stipend & Duration */}
                  <div className="grid grid-cols-1 gap-2.5 bg-[#FAF8F5] p-3.5 rounded-2xl border border-slate-200/80">
                    <div className="flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-[#8B1E24] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                          Stipend / Fellowship Emoluments
                        </span>
                        <span className="text-xs font-bold text-[#0F2537] leading-snug block">
                          {trk.stipend}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-slate-200/70 pt-2 flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-[#C59B27] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                          Tenure / Duration
                        </span>
                        <span className="text-xs font-semibold text-[#0F2537] leading-snug block">
                          {trk.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Eligibility & Desirable Skills */}
                  <div className="space-y-3 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    <div>
                      <span className="text-xs font-bold text-[#0F2537] flex items-center gap-1.5 mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        Minimum Eligibility:
                      </span>
                      <p className="pl-5 text-slate-600">{trk.eligibility}</p>
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <span className="text-xs font-bold text-[#0F2537] flex items-center gap-1.5 mb-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                        Desirable Skills:
                      </span>
                      <p className="pl-5 text-slate-500 italic">{trk.desirable}</p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-5 mt-6 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => handleSelectTrackAndScroll(trk)}
                    className={`w-full py-3 px-4 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm ${trk.featured
                      ? 'bg-[#8B1E24] hover:bg-[#641318] text-white shadow-md'
                      : 'bg-[#0F2537] hover:bg-[#8B1E24] text-white'
                      }`}
                  >
                    <span>Apply for this Track</span>
                    <ArrowRight className="w-4 h-4 text-[#E0B84C] group-hover:translate-x-1 transition-transform" />
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
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start scroll-mt-24"
      >
        {/* Left Column: Interactive Application Form (7 Columns on Desktop) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border-2 border-[#C59B27]/40 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#8B1E24] via-[#C59B27] to-[#0F2537]" />

          <div className="space-y-6">
            {/* Form Header */}
            <div className="space-y-2 border-b border-slate-200 pb-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase text-[#8B1E24] bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#C59B27]/40">
                  <FileText className="w-3.5 h-3.5 text-[#C59B27]" />
                  Interactive Submission Portal
                </span>
                <span className="text-[11px] font-mono text-slate-400 font-semibold">
                  Direct PI Dispatch • No Third-Party Tracking
                </span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537] pt-1">
                Candidate Application & Research Inquiry
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Completing this form formats a standardized academic dossier and opens your email client pre-addressed to{' '}
                <span className="font-mono text-[#8B1E24] font-bold">nvprasuja@uohyd.ac.in</span>.
              </p>
            </div>

            {submitted ? (
              <div className="bg-emerald-50/90 border-2 border-emerald-300 rounded-2xl p-6 sm:p-8 text-center space-y-5 animate-in fade-in">
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
                    <span>Open Email Client & Send to PI</span>
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
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1: Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#0F2537]">
                      Candidate Full Name <span className="text-[#8B1E24]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Dr. / Mr. / Ms. A. Sharma"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] focus:border-[#8B1E24] text-sm bg-[#FAF8F5]/60 text-[#0F2537] placeholder:text-slate-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#0F2537]">
                      Contact Email Address <span className="text-[#8B1E24]">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="candidate@university.edu.in"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] focus:border-[#8B1E24] text-sm bg-[#FAF8F5]/60 text-[#0F2537] placeholder:text-slate-400 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 2: Phone & Recruitment Track */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#0F2537]">
                      Phone / Mobile Number <span className="text-[#8B1E24]">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91-9876543210"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] focus:border-[#8B1E24] text-sm bg-[#FAF8F5]/60 text-[#0F2537] placeholder:text-slate-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#0F2537]">
                      Recruitment Track <span className="text-[#8B1E24]">*</span>
                    </label>
                    <select
                      name="track"
                      value={formData.track}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] focus:border-[#8B1E24] text-sm bg-[#FAF8F5]/60 text-[#0F2537] font-medium transition-all"
                    >
                      <option>Project Fellow (JRF / SRF) - 2026–2029 Nano-SCFA & Edaravone Grant</option>
                      <option>Postdoctoral Research Fellow (2026–2029 Grant)</option>
                      <option>Ph.D. Doctoral Admissions (CSIR/UGC/DBT/ICMR Fellow)</option>
                      <option>M.Sc. / M.Tech 6-Month Dissertation Trainee</option>
                      <option>Academic Collaborative Inquiry</option>
                    </select>
                  </div>
                </div>

                {/* Row 3: Qualification & National Fellowship */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#0F2537]">
                      Highest Qualification & Institution <span className="text-[#8B1E24]">*</span>
                    </label>
                    <div className="relative">
                      <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="qualification"
                        required
                        value={formData.qualification}
                        onChange={handleChange}
                        placeholder="e.g. M.Sc. Biochemistry (UoH, 2025)"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] focus:border-[#8B1E24] text-sm bg-[#FAF8F5]/60 text-[#0F2537] placeholder:text-slate-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#0F2537]">
                      National Fellowship / Examination <span className="text-[#8B1E24]">*</span>
                    </label>
                    <div className="relative">
                      <Award className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        name="nationalExam"
                        required
                        value={formData.nationalExam}
                        onChange={handleChange}
                        placeholder="e.g. CSIR-UGC NET JRF / DBT-BET / GATE"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] focus:border-[#8B1E24] text-sm bg-[#FAF8F5]/60 text-[#0F2537] placeholder:text-slate-400 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Row 4: CV Link */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#0F2537]">
                    Curriculum Vitae Link (Google Drive / Dropbox / OneDrive) <span className="text-[#8B1E24]">*</span>
                  </label>
                  <div className="relative">
                    <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="url"
                      name="cvUrl"
                      required
                      value={formData.cvUrl}
                      onChange={handleChange}
                      placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] focus:border-[#8B1E24] text-sm bg-[#FAF8F5]/60 text-[#0F2537] placeholder:text-slate-400 transition-all"
                    />
                  </div>
                  <span className="text-[11px] text-slate-500 flex items-center gap-1 pt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-[#C59B27]" />
                    Please ensure link sharing permission is set to “Anyone with the link can view”.
                  </span>
                </div>

                {/* Row 5: Research Statement */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-[#0F2537]">
                    Brief Statement of Research Interest (2–3 sentences) <span className="text-[#8B1E24]">*</span>
                  </label>
                  <textarea
                    name="statement"
                    rows={4}
                    required
                    value={formData.statement}
                    onChange={handleChange}
                    placeholder="Briefly state your prior experience in MCAO surgery, nanoparticle synthesis, Western blotting, or 16S microbiome analysis and your research motivation..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] focus:border-[#8B1E24] text-sm bg-[#FAF8F5]/60 text-[#0F2537] placeholder:text-slate-400 leading-relaxed transition-all"
                  />
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#641318] border border-[#C59B27]/40 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Formatting Application Dossier...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#E0B84C]" />
                      <span>Submit & Generate Pre-Addressed Email</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Right Column: Official Institutional Address & Transit Dossier (5 Columns on Desktop) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Official Institutional Laboratory Headquarters */}
          <div className="bg-[#0F2537] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#C59B27]/60 shadow-xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#C59B27] via-[#E0B84C] to-[#C59B27]" />

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#E0B84C] font-mono font-bold block">
                Official Institutional Laboratory Address
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                NeuroXlab Headquarters
              </h3>
            </div>

            <div className="space-y-4 text-sm text-white/90 leading-relaxed">
              {/* Physical Address Block */}
              <div className="flex items-start gap-3.5 bg-white/5 p-4 rounded-2xl border border-white/10">
                <MapPin className="w-5 h-5 text-[#E0B84C] mt-0.5 shrink-0" />
                <div className="space-y-0.5 text-xs sm:text-sm">
                  <p className="font-bold text-white text-sm sm:text-base">
                    Dr. N. Venkata Prasuja
                  </p>
                  <p className="text-[#E0B84C] font-semibold">
                    Room No. F-75C, Dept. of Systems & Computational Biology
                  </p>
                  <p className="text-white/95">
                    School of Life Sciences, University of Hyderabad
                  </p>
                  <p className="text-white/80">
                    Prof. C.R. Rao Road, Gachibowli
                  </p>
                  <p className="text-white/75 font-mono text-xs pt-0.5">
                    Hyderabad – 500046, Telangana, India
                  </p>
                </div>
              </div>

              {/* Direct Phone Row with Copy Button */}
              <div className="flex items-center justify-between gap-3 bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#C59B27]/15 border border-[#C59B27]/40 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[#E0B84C]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">
                      Direct Laboratory Phone
                    </span>
                    <a
                      href="tel:+914023134581"
                      className="font-mono hover:text-[#E0B84C] font-bold text-xs sm:text-sm text-white transition-colors"
                    >
                      +91-40-23134581
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyPhoneToClipboard('+91-40-23134581')}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Copy phone number"
                >
                  {copiedPhone ? (
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

              {/* Official Email Row with Copy Button */}
              <div className="flex items-center justify-between gap-3 bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#C59B27]/15 border border-[#C59B27]/40 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[#E0B84C]" />
                  </div>
                  <div className="truncate">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/60 block">
                      Official Email Contact
                    </span>
                    <a
                      href="mailto:nvprasuja@uohyd.ac.in"
                      className="font-mono hover:text-[#E0B84C] font-bold text-xs sm:text-sm text-white transition-colors truncate block"
                    >
                      nvprasuja@uohyd.ac.in
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => copyEmailToClipboard('nvprasuja@uohyd.ac.in')}
                  className="px-2.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                  title="Copy email address"
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

            {/* Google Maps Navigation CTA */}
            <div className="pt-1">
              <a
                href="https://maps.google.com/?q=School+of+Life+Sciences+University+of+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#8B1E24] hover:bg-[#A82931] text-xs sm:text-sm font-bold text-white flex items-center justify-center gap-2 transition-all border border-[#C59B27]/50 shadow-lg"
              >
                <Navigation className="w-4 h-4 text-[#E0B84C]" />
                <span>Navigate via Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 text-white/70 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Card 2: Campus Transit & Route Guide */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3.5">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center shrink-0">
                  <Navigation className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    Visitor Logistics
                  </span>
                  <h4 className="font-serif text-lg sm:text-xl font-bold text-[#0F2537]">
                    Campus Transit & Route Guide
                  </h4>
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold text-[#977313] bg-[#C59B27]/15 px-2.5 py-1 rounded-md">
                Gachibowli
              </span>
            </div>

            <div className="space-y-3.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200/70">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Plane className="w-4 h-4 text-[#8B1E24]" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-[#0F2537] font-bold">
                      Rajiv Gandhi Int'l Airport (RGIA)
                    </strong>
                    <span className="text-[11px] font-mono font-bold text-[#8B1E24]">~36 km</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    35–40 mins via Nehru Outer Ring Road (ORR) exit towards Gachibowli / ISB Road.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200/70">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Train className="w-4 h-4 text-[#C59B27]" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-[#0F2537] font-bold">
                      Lingampally Railway Station / MMTS
                    </strong>
                    <span className="text-[11px] font-mono font-bold text-[#977313]">~6 km</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Closest railhead to University of Hyderabad South Gate (15 mins via auto/bus).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F5] border border-slate-200/70">
                <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                  <Car className="w-4 h-4 text-[#0F2537]" />
                </div>
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <strong className="text-[#0F2537] font-bold">
                      Secunderabad / Nampally Hub
                    </strong>
                    <span className="text-[11px] font-mono font-bold text-slate-500">~22-26 km</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    Accessible via Raidurg Metro Station or Mehdipatnam – Gachibowli – Prof. C.R. Rao Road.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}