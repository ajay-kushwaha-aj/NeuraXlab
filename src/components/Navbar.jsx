import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  Home,
  ChevronRight
} from 'lucide-react';
import NeuroXlabLogo from './NeuroXlabLogo';
import uohSeal from '../assets/uoh_seal.png';
import { LAB_INFO } from '../data/labData';

export default function Navbar({ activeTab, setActiveTab, activeSubSection, setActiveSubSection }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [openMobileSubmenus, setOpenMobileSubmenus] = useState({});
  const dropdownTimeoutRef = useRef(null);
  const headerRef = useRef(null);

  // Dynamically compute and expose the exact sticky header height as a CSS variable
  useEffect(() => {
    const updateHeaderHeight = () => {
      if (headerRef.current) {
        const height = headerRef.current.getBoundingClientRect().height;
        document.documentElement.style.setProperty('--navbar-height', `${Math.round(height)}px`);
      }
    };

    updateHeaderHeight();

    let resizeObserver = null;
    if (typeof ResizeObserver !== 'undefined' && headerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        updateHeaderHeight();
      });
      resizeObserver.observe(headerRef.current);
    }

    window.addEventListener('resize', updateHeaderHeight);
    return () => {
      window.removeEventListener('resize', updateHeaderHeight);
      if (resizeObserver) resizeObserver.disconnect();
    };
  }, []);

  const navItems = [
    {
      id: 'home',
      label: 'Home'
    },
    {
      id: 'research',
      label: 'Research',
      hasDropdown: true,
      subItems: [
        { id: 'overview', label: 'Research Overview', sectionId: 'research-overview' },
        { id: 'directions', label: 'Featured Research Directions', sectionId: 'research-directions' },
        { id: 'projects', label: 'Ongoing Research Projects', sectionId: 'ongoing-projects' },
        { id: 'collaborations', label: 'Research Collaborators', sectionId: 'collaborators' },
      ]
    },
    {
      id: 'team',
      label: 'Meet the Team',
      hasDropdown: true,
      subItems: [
        { id: 'group-leader', label: 'Group Leader Dossier', sectionId: 'group-leader' },
        { id: 'team-roster', label: 'Team Members & Alumni', sectionId: 'team-roster' },
      ]
    },
    {
      id: 'articles',
      label: 'Research Articles'
    },
    {
      id: 'publications',
      label: 'Publications'
    },
    {
      id: 'activities',
      label: 'Activities'
    },
    {
      id: 'contact',
      label: 'Opportunities / Contact'
    },
  ];

  const handleNavClick = (tabId, sectionId = null) => {
    if (typeof setActiveTab === 'function') {
      setActiveTab(tabId, sectionId);
    }
    if (setActiveSubSection) {
      setActiveSubSection(sectionId);
    }
    setMobileMenuOpen(false);
    setHoveredMenu(null);

    // Scroll handling: for top-level tabs, scroll to top smoothly
    if (sectionId === 'group-leader' || sectionId === 'team-roster' || !sectionId) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 120);
    }
  };

  const toggleMobileSubmenu = (menuId, e) => {
    e.stopPropagation();
    setOpenMobileSubmenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleMouseEnter = (menuId) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setHoveredMenu(menuId);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setHoveredMenu(null);
    }, 150);
  };

  // Find active item label for breadcrumbs
  const currentNavItem = navItems.find(i => i.id === activeTab);
  const currentSubItem = currentNavItem?.subItems?.find(s => s.sectionId === activeSubSection);

  return (
    <header ref={headerRef} className="sticky top-0 z-40 w-full shadow-2xs bg-white">
      {/* 1. Top Institutional Ribbon in #8B1E24 with subtle border */}
      <div className="bg-[#8B1E24] text-white border-b border-black/10 py-1.5 px-4 sm:px-6 lg:px-8 text-xs select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          {/* Institutional Affirmation */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 sm:gap-2 text-center sm:text-left tracking-wide font-sans">
            <span className="font-semibold text-white">
              University of Hyderabad
            </span>
            <span className="text-white/40" aria-hidden="true">•</span>
            <span className="text-white/90">
              School of Life Sciences
            </span>
          </div>

          {/* External Scholarly & Institutional Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-white/75 font-mono text-[11px] sm:text-xs">
            <a
              href="https://uohyd.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>uohyd.ac.in</span>
              <ExternalLink className="w-2.5 h-2.5 text-white/50" />
            </a>
            <span className="text-white/30" aria-hidden="true">•</span>
            <a
              href={LAB_INFO.pi.scholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
              title="Dr. Nakka on Google Scholar"
            >
              <span>Scholar</span>
              <ExternalLink className="w-2.5 h-2.5 text-white/50" />
            </a>
            <span className="text-white/30" aria-hidden="true">•</span>
            <a
              href={LAB_INFO.pi.researchGateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
              title="Dr. Nakka on ResearchGate"
            >
              <span>ResearchGate</span>
              <ExternalLink className="w-2.5 h-2.5 text-white/50" />
            </a>
            <span className="text-white/30" aria-hidden="true">•</span>
            <a
              href={LAB_INFO.pi.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
              title="Dr. Nakka on LinkedIn"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-2.5 h-2.5 text-white/50" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Brand Masthead & Desktop Navigation */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-[68px] gap-4">
            
            {/* Left Group: Dual Institutional Badges & Brand Masthead */}
            <div className="flex items-center gap-3 sm:gap-4 xl:gap-6 min-w-0">
              <div className="flex items-center shrink-0 pr-1 sm:pr-2 gap-2 sm:gap-2.5">
                {/* UoH Seal */}
                <a
                  href="https://uohyd.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 transition-opacity hover:opacity-90 shrink-0"
                  title="University of Hyderabad"
                >
                  <img
                    src={uohSeal}
                    alt="University of Hyderabad"
                    className="h-full w-full object-contain"
                  />
                </a>

                {/* Subtle vertical hairline divider */}
                <div className="h-6 w-px bg-slate-200 mx-0.5" aria-hidden="true" />

                {/* NeuroXlab Brand Link */}
                <button
                  onClick={() => handleNavClick('home')}
                  className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none cursor-pointer"
                  aria-label="NeuroXlab Home"
                >
                  <NeuroXlabLogo className="h-10 w-10 sm:h-11 sm:w-11 shrink-0" />
                  <div className="flex flex-col">
                    <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-slate-900 group-hover:text-[#8B1E24] transition-colors leading-none">
                      Neuro<span className="text-[#C59B27]">X</span>lab
                    </span>
                    <span className="text-[11px] font-mono text-slate-500 tracking-tight leading-tight hidden sm:block mt-0.5">
                      Systems &amp; Computational Biology
                    </span>
                  </div>
                </button>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center gap-0.5 xl:gap-1 shrink-0">
                {navItems.map((item) => {
                  const isActive = activeTab === item.id;
                  const isHovered = hoveredMenu === item.id;

                  if (item.hasDropdown) {
                    return (
                      <div
                        key={item.id}
                        className="relative"
                        onMouseEnter={() => handleMouseEnter(item.id)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <button
                          onClick={() => handleNavClick(item.id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors cursor-pointer ${
                            isActive
                              ? 'text-[#8B1E24] bg-[#8B1E24]/8 font-semibold'
                              : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                          }`}
                          aria-expanded={isHovered}
                          aria-haspopup="true"
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isHovered ? 'rotate-180 text-[#8B1E24]' : 'text-slate-400'
                            }`}
                          />
                        </button>

                        {/* Dropdown Menu */}
                        {isHovered && (
                          <div className="absolute left-0 mt-1 w-72 bg-white rounded-xl shadow-lg border border-slate-200 p-1.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                            <div className="px-3 py-1.5 mb-1 border-b border-slate-100 flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase font-semibold">
                              <span>{item.label}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E24]" />
                            </div>
                            {item.subItems.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNavClick(item.id, sub.sectionId);
                                }}
                                className="w-full text-left px-3 py-2 text-xs font-normal text-slate-700 hover:bg-slate-50 hover:text-[#8B1E24] rounded-lg transition-colors flex items-center justify-between group/sub cursor-pointer"
                              >
                                <span>{sub.label}</span>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover/sub:text-[#8B1E24] group-hover/sub:translate-x-0.5 transition-transform" />
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition-colors cursor-pointer ${
                        isActive
                          ? 'text-[#8B1E24] bg-[#8B1E24]/8 font-semibold'
                          : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-hidden focus:ring-2 focus:ring-[#8B1E24]"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#8B1E24]" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Mobile Responsive Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-3 pb-6 space-y-1 shadow-xl animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const hasSub = item.hasDropdown && item.subItems;
              const isSubOpen = openMobileSubmenus[item.id];

              return (
                <div key={item.id} className="border-b border-slate-100 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`flex-grow text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                        isActive
                          ? 'text-[#8B1E24] bg-[#8B1E24]/8 font-semibold'
                          : 'text-slate-800 hover:bg-slate-50'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && !hasSub && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E24]" />
                      )}
                    </button>

                    {hasSub && (
                      <button
                        onClick={(e) => toggleMobileSubmenu(item.id, e)}
                        className="p-2.5 text-slate-400 hover:text-[#8B1E24]"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isSubOpen ? 'rotate-180 text-[#8B1E24]' : ''
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Collapsible Submenu */}
                  {hasSub && isSubOpen && (
                    <div className="pl-4 pr-2 py-1 space-y-1 bg-slate-50 rounded-lg my-1 border border-slate-100">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(item.id, sub.sectionId)}
                          className="w-full text-left py-2 px-3 text-xs font-normal text-slate-700 hover:text-[#8B1E24] hover:bg-white rounded-md transition-colors flex items-center justify-between"
                        >
                          <span>{sub.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Footer Credit */}
            <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500 py-1">
              <div>Department of Systems and Computational Biology</div>
              <div className="text-[11px] text-slate-400">School of Life Sciences • University of Hyderabad</div>
            </div>
          </div>
        )}
      </nav>

      {/* 4. Breadcrumb Bar for Inner Pages */}
      {activeTab !== 'home' && (
        <div className="bg-slate-50 border-b border-slate-200 py-2 px-4 sm:px-6 lg:px-8 text-xs font-medium text-slate-600">
          <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto w-full max-w-full">
            <button
              onClick={() => handleNavClick('home')}
              className="inline-flex items-center gap-1 text-slate-500 hover:text-[#8B1E24] transition-colors shrink-0"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </button>
            <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
            <button
              onClick={() => handleNavClick(activeTab)}
              className={`transition-colors shrink-0 ${
                currentSubItem ? 'text-slate-600 hover:text-[#8B1E24]' : 'text-[#8B1E24] font-semibold'
              }`}
            >
              {currentNavItem?.label || activeTab}
            </button>
            {currentSubItem && (
              <>
                <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" />
                <span className="text-[#8B1E24] font-semibold truncate shrink-0">
                  {currentSubItem.label}
                </span>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
