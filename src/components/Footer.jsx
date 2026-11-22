import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ArrowUp,
  GraduationCap,
  ShieldCheck,
  Award
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
    <footer className="bg-[#0A1926] text-white border-t border-white/10 mt-20 sm:mt-24 w-full max-w-full overflow-x-hidden">
      {/* 1. Top Brand & Institutional Accreditations Strip */}
      <div className="bg-[#07131E] py-6 sm:py-8 border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand & Motto */}
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="h-12 w-12 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-white/20 shadow-xs">
              <NeuroXlabLogo className="h-full w-full object-contain" withFrame={false} />
            </div>
            <div>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
                Neuro<span className="text-[#C59B27]">X</span>lab
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 font-medium mt-1">
                Department of Systems and Computational Biology • School of Life Sciences
              </p>
              <p className="text-xs font-serif italic text-slate-400 mt-0.5 max-w-xl">
                "{LAB_INFO.motto}"
              </p>
            </div>
          </div>

          {/* Institutional Badges & Back to Top */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-2.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
              <Award className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Institution of Eminence</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>NAAC A+ (CGPA 3.28/4)</span>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/10 hover:bg-[#8B1E24] text-white transition-all border border-white/15 shadow-xs cursor-pointer focus:outline-hidden focus-visible:ring-2 focus-visible:ring-[#C59B27] ml-1"
              aria-label="Scroll back to top"
              title="Back to top"
            >
              <ArrowUp className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main 4-Column Editorial Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

          {/* Column 1: Institutional Affiliation (4 cols on lg) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase">
              Institutional Affiliation
            </h4>

            {/* University Crest & Description */}
            <div className="flex items-start gap-3 pt-0.5">
              <div className="w-11 h-11 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-white/15 shadow-xs">
                <img
                  src={uohSeal}
                  alt="University of Hyderabad Crest"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="space-y-0.5">
                <p className="font-semibold text-white text-sm leading-snug">
                  School of Life Sciences
                </p>
                <p className="text-[#C59B27] font-medium text-xs">
                  University of Hyderabad
                </p>
                <span className="text-[11px] font-mono text-slate-400 block">
                  Central University • Established 1974
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Autonomous apex central university accredited with NAAC A++ grade. Located at Prof. C.R. Rao Road, Gachibowli, Hyderabad, Telangana, India.
            </p>

            <div className="pt-1 space-y-1.5 text-xs">
              <div>
                <a
                  href="https://uohyd.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#C59B27] hover:text-white transition-colors"
                >
                  <span>University of Hyderabad Portal</span>
                  <ExternalLink className="w-3 h-3 text-[#C59B27]" />
                </a>
              </div>
              <div>
                <a
                  href="https://scholar.google.co.in/citations?user=mVnNpwIAAAAJ&hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Dr. Nakka on Google Scholar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {quickLinks.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigateTo(item.id)}
                    className="hover:text-white transition-colors text-left cursor-pointer focus:outline-hidden focus-visible:text-white"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Research Thrusts (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase">
              Research Thrusts
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
              {researchThemes.map((theme, i) => (
                <li key={i}>
                  <button
                    onClick={() => navigateTo('research', theme.sectionId)}
                    className="hover:text-white transition-colors text-left cursor-pointer focus:outline-hidden focus-visible:text-white"
                  >
                    {theme.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Postal Logistics (3 cols on lg) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-serif text-sm font-semibold text-white tracking-wide uppercase">
              Laboratory Contact
            </h4>
            <div className="text-xs sm:text-sm text-slate-300 space-y-3 leading-relaxed">
              {/* Postal Location */}
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C59B27] mt-0.5 shrink-0" />
                <div className="space-y-0.5 text-xs leading-relaxed">
                  <p className="font-semibold text-white">Dr. Venkata Prasuja Nakka</p>
                  <p className="text-slate-300">Room No. F-75C, Dept. of Systems &amp; Computational Biology</p>
                  <p className="text-slate-400">School of Life Sciences, University of Hyderabad</p>
                  <p className="text-slate-400">Hyderabad – 500046, Telangana, India</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-2.5 pt-0.5">
                <Phone className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <a
                  href="tel:+914023134581"
                  className="font-mono text-xs text-slate-300 hover:text-white transition-colors"
                >
                  +91-40-23134581
                </a>
              </div>

              {/* Email */}
              <div className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <a
                  href="mailto:nvprasuja@uohyd.ac.in"
                  className="font-mono text-xs text-slate-300 hover:text-white transition-colors"
                >
                  nvprasuja@uohyd.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Bar: Dynamic Copyright, Identity Acknowledgment & Discretionary Admin Access */}
        <div className="border-t border-white/10 mt-12 pt-6 pb-2 space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
            <p className="text-center sm:text-left">
              © {new Date().getFullYear()} NeuroXlab (Dr. Venkata Prasuja Nakka). All rights reserved.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-2 gap-y-1 text-slate-400 text-xs">
              <span className="text-slate-300">Department of Systems and Computational Biology</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span>School of Life Sciences</span>
              <span className="text-white/20 hidden sm:inline">•</span>
              <span>University of Hyderabad</span>
            </div>
          </div>

          {/* Admin CMS Access & Engineering Credit */}
          <div className="flex flex-col sm:flex-row items-center justify-between pt-1 gap-2 text-[11px] text-slate-500">
            <button
              onClick={() => navigateTo('admin')}
              className="hover:text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer font-mono"
              title="Administrator CMS Access"
            >
              <ShieldCheck className="w-3 h-3 text-slate-500" />
              <span>Admin CMS Portal</span>
            </button>

            <p>
              Designed &amp; Developed by{' '}
              <a
                href="https://ajaykushwaha.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white underline underline-offset-2 transition-colors font-medium"
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
