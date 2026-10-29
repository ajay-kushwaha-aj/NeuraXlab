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
  Check
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

  const recruitmentTracks = [
    {
      id: 'track-grant-2026',
      title: 'Project Fellows (JRF / SRF / Postdoc)',
      project: '2026–2029 Extramural Nano-SCFA & Edaravone Grant',
      duration: '3 Years (Co-terminus with project: 27-Jan-2026 to 26-Jan-2029)',
      stipend: '₹37,000 / month + HRA (JRF/SRF) | ₹58,000 / month + HRA (Postdoc)',
      eligibility: 'M.Sc. / M.Tech in Systems Biology, Biochemistry, Biotechnology, Neuroscience, or Nanotechnology with valid CSIR-UGC NET (JRF/LS), GATE, DBT-BET, or ICMR-JRF qualification. Ph.D. for Postdoc track.',
      desirable: 'Prior experience in small animal stroke models (MCAO intraluminal suture), laser Doppler flowmetry, nanoparticle synthesis (DLS/Zeta), or 16S microbiome bioinformatics.',
      badge: 'Active Extramural Funded Project'
    },
    {
      id: 'track-phd',
      title: 'Ph.D. Doctoral Research Scholars',
      project: 'Direct Ph.D. Admissions (Department of Systems and Computational Biology, UoH)',
      duration: '5 Years Doctoral Degree',
      stipend: 'As per National Fellowship Agency (CSIR / UGC / DBT / ICMR / PMRF)',
      eligibility: 'Candidates with independent national junior research fellowships (CSIR-JRF, UGC-JRF, DBT-JRF, ICMR-JRF, or PMRF) eligible to activate fellowship at University of Hyderabad.',
      desirable: 'Strong inclination toward organelle proteostasis, unfolded protein response signaling, non-coding RNA genomics, or gut-brain metabolomics.',
      badge: 'Doctoral Fellowship'
    },
    {
      id: 'track-msc',
      title: 'M.Sc. / M.Tech Dissertation Trainees',
      project: 'Academic Master\'s 6-Month Research Project',
      duration: '6 Months (January–June or July–December cycles)',
      stipend: 'Institutional dissertation training',
      eligibility: 'Enrolled in 2nd year M.Sc. or M.Tech in Systems Biology, Bioinformatics, Biochemistry, or Life Sciences at recognized Central/State universities.',
      desirable: 'Basic wet-lab pipetting skills, Western blotting familiarity, or Python/R bioinformatics scripting.',
      badge: 'Graduate Dissertation'
    }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 700);
  };

  const copyEmailToClipboard = (email) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const mailtoLink = `mailto:nvprasuja@uohyd.ac.in?subject=${encodeURIComponent(
    `[NeuroXlab Application] ${formData.track} - ${formData.name}`
  )}&body=${encodeURIComponent(
    `Dear Dr. Venkata Prasuja Nakka,\n\nI am formally applying for the position: ${formData.track}.\n\nFull Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nHighest Degree / Institute: ${formData.qualification}\nNational Fellowship / Exam Qualified: ${formData.nationalExam}\nCV Link: ${formData.cvUrl}\n\nBrief Research Statement:\n${formData.statement}\n\nSincerely,\n${formData.name}`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Extramural Grants &amp; Fellowships</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Opportunities &amp; Contact
        </h1>
        <p className="text-[#0F2537]/80 text-sm sm:text-base leading-relaxed">
          Join NeuroXlab under our active 2026–2029 Nano-SCFA &amp; Edaravone Extramural Project, pursue direct doctoral admissions, or submit research inquiries.
        </p>
      </div>

      {/* 1. Open Recruitment Tracks Cards */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <span className="text-xs font-mono font-bold uppercase text-[#8B1E24]">
            Active Funded Openings
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
            Recruitment Tracks &amp; Eligibility Criteria
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {recruitmentTracks.map((trk) => (
            <div
              key={trk.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold uppercase bg-[#8B1E24] text-white px-2.5 py-1 rounded-full inline-block">
                  {trk.badge}
                </span>

                <h3 className="font-serif text-2xl font-bold text-[#0F2537] leading-snug">
                  {trk.title}
                </h3>

                <p className="text-xs font-semibold text-[#C59B27]">
                  {trk.project}
                </p>

                <div className="space-y-2 text-sm text-[#0F2537]/85 pt-3 border-t border-gray-100 leading-relaxed">
                  <p>
                    <strong className="text-[#0F2537]">Stipend / Emoluments:</strong> {trk.stipend}
                  </p>
                  <p>
                    <strong className="text-[#0F2537]">Duration:</strong> {trk.duration}
                  </p>
                  <p>
                    <strong className="text-[#0F2537]">Minimum Eligibility:</strong> {trk.eligibility}
                  </p>
                  <p className="text-[#0F2537]/75 italic">
                    <strong className="text-[#0F2537] not-italic">Desirable Skills:</strong> {trk.desirable}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100">
                <a
                  href="#application-portal"
                  className="w-full text-center py-2.5 px-4 rounded-xl bg-[#8B1E24] hover:bg-[#641318] text-white text-sm font-bold block transition-colors"
                >
                  Apply for this Track Below
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Interactive Application Form & Official Address Card */}
      <section id="application-portal" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Application Form (Lg: 7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#C59B27]/40 shadow-xl space-y-6">
          <div className="space-y-2 border-b border-gray-100 pb-4">
            <span className="text-xs font-mono font-bold uppercase text-[#8B1E24] bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#C59B27]/30">
              Interactive Submission Portal
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
              Candidate Application &amp; Inquiries
            </h2>
            <p className="text-xs text-[#0F2537]/75">
              Generates a pre-addressed submission to <span className="font-mono text-[#8B1E24] font-bold">nvprasuja@uohyd.ac.in</span>.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-8 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-emerald-900">
                Application Drafted Successfully!
              </h3>
              <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your inquiry has been compiled for <strong>{formData.track}</strong>. Click below to dispatch your pre-formatted application directly to Dr. Nakka's official inboxes.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={mailtoLink}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#8B1E24] hover:bg-[#641318] text-white text-xs font-bold shadow-md transition-all active:scale-95"
                >
                  <Mail className="w-4 h-4 text-[#E0B84C]" />
                  <span>Dispatch Email to nvprasuja@uohyd.ac.in</span>
                </a>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-emerald-700 underline block mx-auto pt-3"
              >
                Submit another application or edit details
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2537] mb-1">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. / Mr. / Ms. A. Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2537] mb-1">
                    Contact Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="candidate@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2537] mb-1">
                    Phone / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91-9876543210"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2537] mb-1">
                    Recruitment Track *
                  </label>
                  <select
                    name="track"
                    value={formData.track}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                  >
                    <option>Project Fellow (JRF / SRF) - 2026–2029 Nano-SCFA &amp; Edaravone Grant</option>
                    <option>Postdoctoral Research Fellow (2026–2029 Grant)</option>
                    <option>Ph.D. Doctoral Admissions (CSIR/UGC/DBT/ICMR Fellow)</option>
                    <option>M.Sc. / M.Tech 6-Month Dissertation Trainee</option>
                    <option>Academic Collaborative Inquiry</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2537] mb-1">
                    Highest Qualification &amp; Institution *
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    required
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="e.g. M.Sc. Biochemistry (UoH, 2025)"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2537] mb-1">
                    National Fellowship / Examination *
                  </label>
                  <input
                    type="text"
                    name="nationalExam"
                    required
                    value={formData.nationalExam}
                    onChange={handleChange}
                    placeholder="e.g. CSIR-UGC NET JRF / DBT-BET / GATE"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2537] mb-1">
                  Curriculum Vitae Link (Google Drive / Dropbox) *
                </label>
                <input
                  type="url"
                  name="cvUrl"
                  required
                  value={formData.cvUrl}
                  onChange={handleChange}
                  placeholder="https://drive.google.com/file/d/.../view?usp=sharing"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                />
                <span className="text-[11px] text-[#0F2537]/60 block mt-0.5">
                  Ensure link sharing is set to 'Anyone with link can view'.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2537] mb-1">
                  Brief Statement of Research Interest (2–3 sentences) *
                </label>
                <textarea
                  name="statement"
                  rows={4}
                  required
                  value={formData.statement}
                  onChange={handleChange}
                  placeholder="Briefly state your prior experience in MCAO surgery, nanoparticle synthesis, Western blotting, or 16S microbiome analysis and your research motivation..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#641318] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Submission...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#E0B84C]" />
                    <span>Submit &amp; Open Pre-addressed Email</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Official Institutional Address Card (Lg: 5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Institutional Address Card */}
          <div className="bg-[#0F2537] text-white rounded-3xl p-8 border-2 border-[#C59B27]/60 shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#E0B84C] font-mono">
                Official Institutional Laboratory Address
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                NeuroXlab Headquarters
              </h3>
            </div>

            <div className="space-y-4 text-sm text-white/90 leading-relaxed">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C59B27] mt-1 flex-shrink-0" />
                <div className="space-y-0.5">
                  <p className="font-bold text-white">Dr. N. Venkata Prasuja</p>
                  <p className="text-[#E0B84C] font-semibold">Room No. F-75C, Dept. of Systems &amp; Computational Biology</p>
                  <p className="text-white/95">School of Life Sciences, University of Hyderabad</p>
                  <p className="text-white/90">Prof CR Rao Road, Gachibowli</p>
                  <p className="text-white/80">Hyderabad – 500046, Telangana, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <Phone className="w-5 h-5 text-[#C59B27] flex-shrink-0" />
                <div>
                  <span className="text-xs text-white/70 block">Direct Laboratory Phone</span>
                  <a href="tel:+914023134581" className="font-mono hover:text-[#E0B84C] font-bold text-sm">
                    +91-40-23134581
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-white/10">
                <Mail className="w-5 h-5 text-[#C59B27] mt-1 flex-shrink-0" />
                <div className="space-y-1">
                  <span className="text-xs text-white/70 block">Official Email Contact</span>
                  <div className="flex items-center gap-2">
                    <a href="mailto:nvprasuja@uohyd.ac.in" className="font-mono hover:text-[#E0B84C] font-bold text-sm">
                      nvprasuja@uohyd.ac.in
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=School+of+Life+Sciences+University+of+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#8B1E24] hover:bg-[#A82931] text-sm font-bold text-white flex items-center justify-center gap-2 transition-all border border-[#C59B27]/40 shadow"
              >
                <Navigation className="w-4 h-4 text-[#E0B84C]" />
                <span>Navigate via Google Maps</span>
              </a>
            </div>
          </div>

          {/* Transit & Access Guide */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-4">
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#8B1E24]" />
              <span>Campus Transit &amp; Route Guide</span>
            </h4>

            <div className="space-y-3.5 text-sm text-[#0F2537]/85 leading-relaxed">
              <div className="flex items-start gap-3">
                <Plane className="w-4 h-4 text-[#C59B27] mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-[#0F2537]">Rajiv Gandhi Int'l Airport (RGIA):</strong>
                  <p className="text-[#0F2537]/75">~32 km via Outer Ring Road (ORR) towards Gachibowli.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Train className="w-4 h-4 text-[#C59B27] mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-[#0F2537]">Lingampally Railway Station:</strong>
                  <p className="text-[#0F2537]/75">~3.5 km from Campus Main Gate (10 mins via auto/bus).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-4 h-4 text-[#C59B27] mt-1 flex-shrink-0" />
                <div>
                  <strong className="text-[#0F2537]">Secunderabad / Nampally Hub:</strong>
                  <p className="text-[#0F2537]/75">~22 km via Mehdipatnam - Gachibowli - Prof. C.R. Rao Road.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
