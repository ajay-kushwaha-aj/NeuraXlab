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
  BookOpen,
  ChevronRight
} from 'lucide-react';
import NeuraXlabLogo from './NeuraXlabLogo';
import { LAB_INFO } from '../data/labData';

export default function Footer({ setActiveTab }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateTo = (tabId, sectionId = null) => {
    setActiveTab(tabId);
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

  return (
    <footer className="bg-[#0F2537] text-white border-t-4 border-[#C59B27] mt-24">
      {/* Top Footer Banner */}
      <div className="bg-[#081521] py-8 border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <NeuraXlabLogo className="w-13 h-13" withFrame={true} />
            <div>
              <h3 className="brand-title text-2xl font-extrabold text-white tracking-tight">
                Neura<span className="text-[#C59B27]">X</span>lab
              </h3>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/90">
              <Award className="w-4 h-4 text-[#C59B27]" />
              <span>Institution of Eminence (IoE)</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white/90">
              <ShieldCheck className="w-4 h-4 text-[#C59B27]" />
              <span>NAAC A++ Accredited</span>
            </div>
            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-lg bg-[#8B1E24] hover:bg-[#641318] text-white transition-all hover:scale-105 border border-[#C59B27]/40 shadow"
              aria-label="Scroll to top of page"
            >
              <ArrowUp className="w-4 h-4 text-[#E0B84C]" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Institutional Rationale & Affiliation */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#C59B27] tracking-wider uppercase">
              Affiliation
            </h4>
            <div className="text-sm text-white/80 space-y-2 leading-relaxed">
              <p className="font-semibold text-white">
                School of Life Sciences
              </p>
              <p className="text-[#E0B84C]">
                University of Hyderabad (IoE)
              </p>
              <p className="text-xs text-white/60">
                Central University established by an Act of Parliament, 1974 • NAAC A++ (CGPA 3.72)
              </p>
            </div>
            <div className="pt-2 space-y-1.5 text-xs">
              <a
                href="https://uohyd.ac.in"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#C59B27] hover:underline"
              >
                <span>Visit uohyd.ac.in Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <div className="flex items-center gap-3 pt-1 text-white/70">
                <a
                  href="https://scholar.google.com/citations?user=f3v4i5IAAAAJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[#C59B27]"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Google Scholar</span>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Clean Site Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#C59B27] tracking-wider uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-white/80">
              {[
                { id: 'home', label: 'Home' },
                { id: 'research', label: 'Research' },
                { id: 'team', label: 'Meet the Team' },
                { id: 'articles', label: 'Research Articles' },
                { id: 'publications', label: 'Publication' },
                { id: 'activities', label: 'Activities' },
                { id: 'contact', label: 'Opportunities / Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => navigateTo(item.id)}
                    className="group inline-flex items-center gap-2 hover:text-[#E0B84C] transition-colors text-left font-medium"
                  >
                    <ChevronRight className="w-3 h-3 text-[#C59B27]/70 group-hover:text-[#E0B84C] group-hover:translate-x-0.5 transition-all shrink-0" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Research Directives */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#C59B27] tracking-wider uppercase">
              Core Thrust Areas
            </h4>
            <ul className="space-y-2 text-xs text-white/75">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mt-1.5 flex-shrink-0" />
                <span>Microbiota-Gut-Brain Axis in Ischemic Stroke</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mt-1.5 flex-shrink-0" />
                <span>Endoplasmic Reticulum (ER) Stress &amp; UPR Signaling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mt-1.5 flex-shrink-0" />
                <span>Nano-Formulated SCFAs &amp; Edaravone (2026–2029 Grant)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mt-1.5 flex-shrink-0" />
                <span>Non-coding RNAs (lncRNAs, piRNAs, miR-29c)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] mt-1.5 flex-shrink-0" />
                <span>Brain-Kidney Crosstalk (HIF1α–ZEB2–TRPC6 Axis)</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Physical Location & Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-bold text-[#C59B27] tracking-wider uppercase">
              Laboratory Office
            </h4>
            <div className="text-xs text-white/80 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-white">Room No. F75C, SLS Annex Building</p>
                  <p>School of Life Sciences, University of Hyderabad</p>
                  <p>Prof. C.R. Rao Road, Gachibowli</p>
                  <p>Hyderabad – 500046, Telangana, India</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Phone className="w-4 h-4 text-[#C59B27] flex-shrink-0" />
                <a href="tel:+914023134581" className="hover:text-white transition-colors">
                  +91-40-23134581
                </a>
              </div>

              <div className="flex items-start gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[#C59B27] mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:prasuja@uohyd.ac.in" className="block hover:text-white transition-colors font-mono">
                    prasuja@uohyd.ac.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Attribution */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>
            © {new Date().getFullYear()} NeuraXlab (Dr. Venkata Prasuja Nakka). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span>School of Life Sciences</span>
            <span>•</span>
            <span>University of Hyderabad (Institution of Eminence)</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
