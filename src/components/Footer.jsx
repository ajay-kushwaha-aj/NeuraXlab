import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ArrowUp,
  GraduationCap,
  ShieldCheck,
  Award,
  ChevronRight
} from 'lucide-react';
import NeuroXlabLogo from './NeuroXlabLogo';
import uohSeal from '../assets/uoh_seal.png';
import { LAB_INFO } from '../data/labData';

export default function Footer({ setActiveTab }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tabId, sectionId = null) => {
    if (setActiveTab) {
      setActiveTab(tabId);
    }
    if (sectionId) {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const quickLinks = [
    { id: 'home', label: 'Home' },
    { id: 'research', label: 'Research Dossier' },
    { id: 'team', label: 'Meet the Team' },
    { id: 'articles', label: 'Research Articles' },
    { id: 'publications', label: 'Publications' },
    { id: 'activities', label: 'Facilities Gallery' },
    { id: 'contact', label: 'Opportunities & Contact' }
  ];

  const researchThemes = [
    { label: 'Stroke Biology & Neuroprotection', sectionId: 'research-directions' },
    { label: 'Gut–Brain Axis & Metagenomics', sectionId: 'direction-1' },
    { label: 'Microglia & Nanomaterials', sectionId: 'direction-2' },
    { label: 'Cellular Stress & ER Signaling', sectionId: 'direction-3' },
    { label: 'Brain–Organ Crosstalk', sectionId: 'research-overview' }
  ];

  return (
    <footer className="bg-[#0F2537] text-white border-t-4 border-[#C59B27] mt-24">
      {/* 1. Top Brand & Institution Strip */}
      <div className="bg-[#081521] py-8 border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <NeuroXlabLogo className="w-13 h-13 shrink-0" withFrame={true} />
            <div>
              <h3 className="brand-title text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-none">
                Neuro<span className="text-[#C59B27]">X</span>lab
              </h3>
              <p className="text-xs sm:text-sm text-[#E0B84C] font-semibold mt-1.5">
                Department of Systems and Computational Biology • School of Life Sciences
              </p>
              <p className="text-xs sm:text-sm font-serif italic text-white/80 mt-1 font-medium max-w-2xl">
                "{LAB_INFO.motto}"
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/90">
              <Award className="w-4 h-4 text-[#C59B27]" />
              <span>Institution of Eminence (IoE)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-white/90">
              <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
              <span>NAAC A++ Accredited</span>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-xl bg-[#8B1E24] hover:bg-[#A82931] text-white transition-all hover:scale-105 border border-[#C59B27]/40 shadow-md cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E0B84C]"
              aria-label="Scroll back to top of page"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4 text-[#E0B84C]" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Columns: Responsive 4-Cols on Desktop, 2-Cols on Tablets, 1-Col on Mobile */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-10">
          
          {/* Column 1: Affiliation */}
          <div className="space-y-4">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#C59B27] tracking-wider uppercase">
              Affiliation
            </h4>

            {/* University Crest & Institutional Heading */}
            <div className="flex items-start gap-3.5 pt-1">
              <img
                src={uohSeal}
                alt="University of Hyderabad Crest"
                className="w-12 h-12 object-contain shrink-0 rounded-lg p-1 bg-white/10 border border-white/15 shadow-sm"
              />
              <div className="space-y-0.5">
                <p className="font-semibold text-white text-[15px] leading-snug">
                  School of Life Sciences
                </p>
                <p className="text-[#E0B84C] font-medium text-sm">
                  University of Hyderabad
                </p>
                <span className="text-[11px] font-mono text-white/70 block uppercase tracking-wider">
                  Institution of Eminence
                </span>
              </div>
            </div>

            <p className="text-sm text-white/80 leading-relaxed pt-1">
              Central University established by an Act of Parliament, 1974 • NAAC A++ (CGPA 3.72) • Prof. C.R. Rao Road, Gachibowli, Hyderabad, Telangana, India.
            </p>

            <div className="pt-2 space-y-2 text-sm">
              <a
                href="https://uohyd.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#C59B27] hover:text-[#E0B84C] hover:underline font-medium transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E0B84C] rounded-sm"
              >
                <span>Visit uohyd.ac.in Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="pt-0.5">
                <a
                  href="https://scholar.google.co.in/citations?user=mVnNpwIAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-white/85 hover:text-[#C59B27] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E0B84C] rounded-sm"
                >
                  <GraduationCap className="w-4 h-4 text-[#C59B27]" />
                  <span>Google Scholar Profile</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#C59B27] tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/85">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigateTo(item.id)}
                    className="group inline-flex items-center gap-2 py-1 hover:text-[#E0B84C] transition-colors text-left font-medium cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E0B84C] rounded-sm"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#C59B27]/80 group-hover:text-[#E0B84C] group-hover:translate-x-1 transition-transform shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Core Research Areas */}
          <div className="space-y-4">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#C59B27] tracking-wider uppercase">
              Core Research Areas
            </h4>
            <ul className="space-y-2 text-sm text-white/85">
              {researchThemes.map((theme, i) => (
                <li key={i}>
                  <button
                    onClick={() => navigateTo('research', theme.sectionId)}
                    className="group inline-flex items-center gap-2 py-1 hover:text-[#E0B84C] transition-colors text-left font-medium cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E0B84C] rounded-sm"
                    title={`Explore ${theme.label} on Research Page`}
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#C59B27]/80 group-hover:text-[#E0B84C] group-hover:translate-x-1 transition-transform shrink-0" />
                    <span>{theme.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Laboratory Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#C59B27] tracking-wider uppercase">
              Laboratory Contact
            </h4>
            <div className="text-sm text-white/85 space-y-3.5 leading-relaxed">
              {/* Postal Address */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C59B27] mt-1 shrink-0" />
                <div className="space-y-0.5">
                  <p className="font-semibold text-white">Dr. N. Venkata Prasuja</p>
                  <p className="text-[#E0B84C] font-medium">Room No. F-75C, Dept. of Systems &amp; Computational Biology</p>
                  <p>School of Life Sciences, University of Hyderabad</p>
                  <p>Prof. CR Rao Road, Gachibowli</p>
                  <p>Hyderabad – 500046, Telangana, India</p>
                </div>
              </div>

              {/* Telephone */}
              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a
                  href="tel:+914023134581"
                  className="font-mono hover:text-[#E0B84C] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E0B84C] rounded-sm"
                  title="Call NeuroXlab Laboratory Office"
                >
                  +91-40-23134581
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <Mail className="w-4 h-4 text-[#C59B27] shrink-0" />
                <a
                  href="mailto:nvprasuja@uohyd.ac.in"
                  className="font-mono hover:text-[#E0B84C] transition-colors focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#E0B84C] rounded-sm"
                  title="Send email to Dr. Venkata Prasuja Nakka"
                >
                  nvprasuja@uohyd.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar: Subtle Divider, Dynamic Copyright, Institutional Line & Developer Credit */}
        <div className="border-t border-white/10 mt-12 pt-6 pb-2 space-y-3">
          <div className="flex flex-col lg:flex-row items-center justify-between text-xs sm:text-sm text-white/75 gap-3">
            {/* Left: Lab Copyright with Dynamic Year */}
            <p className="text-center lg:text-left text-white/80">
              © {new Date().getFullYear()} NeuroXlab (Dr. Venkata Prasuja Nakka). All rights reserved.
            </p>

            {/* Right: Institutional Line */}
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-2.5 gap-y-1 text-white/80 text-xs sm:text-sm">
              <span className="text-[#E0B84C] font-medium">Department of Systems and Computational Biology</span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span>School of Life Sciences</span>
              <span className="text-white/40 hidden sm:inline">•</span>
              <span>University of Hyderabad (IoE)</span>
            </div>
          </div>

          {/* Understated Developer Credit & Discreet Admin CMS Access */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-1 gap-2">
            <button
              onClick={() => navigateTo('admin')}
              className="text-[11px] sm:text-xs text-white/40 hover:text-[#E0B84C] transition-colors flex items-center gap-1 cursor-pointer font-mono"
              title="Administrator CMS Login"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]/70" />
              <span>Admin CMS Portal</span>
            </button>

            <p className="text-[11px] sm:text-xs text-white/50 tracking-wide">
              Designed &amp; Developed by{' '}
              <a
                href="https://ajaykushwaha.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E0B84C]/90 hover:text-white underline underline-offset-2 transition-colors font-medium focus:outline-hidden focus-visible:ring-1 focus-visible:ring-[#E0B84C]"
              >
                Ajay Kushwaha
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
