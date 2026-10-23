import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Briefcase, 
  GraduationCap, 
  FileText, 
  ExternalLink,
  Navigation,
  Train,
  Plane,
  Car,
  Clock,
  Sparkles
} from 'lucide-react';
import { LAB_INFO, OPEN_POSITIONS } from '../data/labData';

export default function ContactView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Junior Research Fellow (JRF / SRF) - 2026–2029 Grant',
    qualification: '',
    statement: '',
    cvUrl: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission delay and show confirmation state
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Extramural Grants &amp; Inquiries</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Opportunities &amp; Contact
        </h1>
        <p className="text-[#0F2537]/80 text-base sm:text-lg">
          Join NeuraXlab under our active 2026–2029 extramural nanotherapy grant, apply for graduate research positions, or connect with Dr. Venkata Prasuja Nakka.
        </p>
      </div>

      {/* 1. Open Positions Cards */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
            Active Funded Openings &amp; Fellowships
          </h2>
          <p className="text-xs text-[#0F2537]/70 mt-1">
            Funded under the 2026–2029 Nanotherapy Extramural Project and University of Hyderabad institutional fellowships.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {OPEN_POSITIONS.map((pos) => (
            <div
              key={pos.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-bold text-[#8B1E24] bg-[#8B1E24]/10 px-2.5 py-1 rounded-full uppercase inline-block">
                  {pos.openings}
                </span>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] leading-snug">
                  {pos.title}
                </h3>

                <p className="text-xs text-[#C59B27] font-semibold">
                  {pos.project}
                </p>

                <div className="space-y-2 text-xs text-[#0F2537]/80 pt-2 border-t border-gray-100">
                  <p>
                    <strong className="text-[#0F2537]">Fellowship:</strong> {pos.fellowship}
                  </p>
                  <p>
                    <strong className="text-[#0F2537]">Duration:</strong> {pos.duration}
                  </p>
                  <p>
                    <strong className="text-[#0F2537]">Eligibility:</strong> {pos.eligibility}
                  </p>
                  {pos.desirable && (
                    <p className="text-[#0F2537]/70 italic">
                      <strong className="text-[#0F2537] not-italic">Desirable:</strong> {pos.desirable}
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                  {pos.deadline}
                </span>
                <a
                  href="#application-form"
                  className="px-3 py-1.5 rounded-lg bg-[#8B1E24] text-white text-xs font-bold hover:bg-[#641318] transition-colors"
                >
                  Apply Below
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Interactive Applicant Inquiry Form & Lab Coordinates */}
      <section id="application-form" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Interactive Application Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#C59B27]/40 shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase text-[#8B1E24] bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#C59B27]/30">
              Online Candidate Portal
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
              Submit Your Fellowship or Research Inquiry
            </h2>
            <p className="text-xs text-[#0F2537]/75">
              Applications are reviewed continuously by Dr. Venkata Prasuja Nakka and shortlisted candidates are invited for institutional interviews.
            </p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border-2 border-emerald-300 rounded-2xl p-8 text-center space-y-4 animate-in fade-in">
              <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-emerald-900">
                Application Submitted Successfully!
              </h3>
              <p className="text-sm text-emerald-800 max-w-md mx-auto leading-relaxed">
                Thank you, <strong>{formData.name}</strong>. Your inquiry for <strong>{formData.position}</strong> has been logged. We have prepared a direct confirmation copy addressed to Dr. Nakka at <span className="font-mono text-xs">prasuja@uohyd.ac.in</span>.
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:prasuja@uohyd.ac.in?subject=NeuraXlab Application: ${encodeURIComponent(formData.position)} - ${encodeURIComponent(formData.name)}&body=Dear Dr. Nakka,%0D%0A%0D%0AI have submitted my inquiry for the ${encodeURIComponent(formData.position)} position.%0D%0A%0D%0AQualification: ${encodeURIComponent(formData.qualification)}%0D%0APhone: ${encodeURIComponent(formData.phone)}%0D%0ACV Link: ${encodeURIComponent(formData.cvUrl)}%0D%0A%0D%0AStatement:%0D%0A${encodeURIComponent(formData.statement)}%0D%0A%0D%0ASincerely,%0D%0A${encodeURIComponent(formData.name)}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8B1E24] text-white text-xs font-bold hover:bg-[#641318] shadow transition-all"
                >
                  <Mail className="w-4 h-4" />
                  <span>Send Direct Email Copy to PI</span>
                </a>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="text-xs text-emerald-700 underline block mx-auto pt-2"
              >
                Submit another inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2537] mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Rajesh Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F2537] mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="applicant@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#0F2537] mb-1">
                    Contact Phone Number *
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
                    Position Interested In *
                  </label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                  >
                    <option>Junior Research Fellow (JRF / SRF) - 2026–2029 Grant</option>
                    <option>Postdoctoral Research Fellow (PDF)</option>
                    <option>M.Sc. / M.Tech Master's Project Trainee (6 Months)</option>
                    <option>Visiting Researcher / Academic Collaborative Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2537] mb-1">
                  Highest Degree &amp; National Exam Qualification (NET/GATE/DBT/ICMR) *
                </label>
                <input
                  type="text"
                  name="qualification"
                  required
                  value={formData.qualification}
                  onChange={handleChange}
                  placeholder="e.g., M.Sc. Biochemistry (UoH, 2025) with CSIR-UGC NET JRF Rank 42"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2537] mb-1">
                  Curriculum Vitae (Google Drive / Dropbox / Web Link) *
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
                  Please ensure link sharing permissions are set to 'Anyone with link can view'.
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F2537] mb-1">
                  Research Statement / Statement of Purpose (Brief) *
                </label>
                <textarea
                  name="statement"
                  rows={4}
                  required
                  value={formData.statement}
                  onChange={handleChange}
                  placeholder="Summarize your prior research background in animal stroke surgery, nanoparticles, Western blotting, or metagenomics, and why you wish to join NeuraXlab..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50 leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#641318] shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#E0B84C]" />
                    <span>Submit Formal Application Inquiry</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Laboratory Coordinates & Campus Access Guide */}
        <div className="lg:col-span-5 space-y-6">
          {/* Official Location Card */}
          <div className="bg-[#0F2537] text-white rounded-3xl p-8 border-2 border-[#C59B27]/50 shadow-xl space-y-6">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-widest text-[#E0B84C] font-mono">
                Official Laboratory Headquarters
              </span>
              <h3 className="font-serif text-2xl font-bold text-white">
                SLS Annex Building
              </h3>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-white/85">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-bold text-white">Room No. F75C, First Floor</p>
                  <p>SLS Annex Building, School of Life Sciences</p>
                  <p className="text-[#E0B84C]">University of Hyderabad</p>
                  <p>Prof. C.R. Rao Road, Gachibowli</p>
                  <p>Hyderabad – 500046, Telangana, India</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2 border-t border-white/10">
                <Phone className="w-5 h-5 text-[#C59B27] flex-shrink-0" />
                <div>
                  <p className="text-[11px] text-white/60">Direct Office Telephone</p>
                  <a href="tel:+914023134581" className="font-mono hover:text-[#E0B84C]">
                    +91-40-23134581
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-2 border-t border-white/10">
                <Mail className="w-5 h-5 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-[11px] text-white/60">Official Correspondence</p>
                  <a href="mailto:prasuja@uohyd.ac.in" className="font-mono hover:text-[#E0B84C] block">
                    prasuja@uohyd.ac.in
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.google.com/?q=School+of+Life+Sciences+University+of+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#8B1E24] hover:bg-[#A82931] text-xs font-bold text-white flex items-center justify-center gap-2 transition-all border border-[#C59B27]/40"
              >
                <Navigation className="w-4 h-4 text-[#E0B84C]" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* How to Reach Campus Transit Guide */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-md space-y-4">
            <h4 className="font-serif text-xl font-bold text-[#0F2537] flex items-center gap-2">
              <Navigation className="w-5 h-5 text-[#8B1E24]" />
              <span>Campus Transit &amp; Access Guide</span>
            </h4>

            <div className="space-y-3 text-xs text-[#0F2537]/80">
              <div className="flex items-start gap-3">
                <Plane className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#0F2537]">Rajiv Gandhi Int'l Airport (RGIA):</strong>
                  <p className="text-[#0F2537]/70">~32 km via Outer Ring Road (ORR) Exit 19 towards Gachibowli (approx. 40 mins by prepaid taxi).</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Train className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#0F2537]">Nearest Railway Station (Lingampally):</strong>
                  <p className="text-[#0F2537]/70">~3.5 km from Main Campus Gate. Auto-rickshaws and city buses operate frequently.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#0F2537]">Secunderabad / Nampally Hub:</strong>
                  <p className="text-[#0F2537]/70">~22 km via Mehdipatnam - Gachibowli - Prof. C.R. Rao Road.</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <strong className="text-[#0F2537]">Lab Visiting Hours:</strong>
                  <p className="text-[#0F2537]/70">Monday – Friday: 09:30 AM to 05:30 PM (Prior appointment recommended).</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
