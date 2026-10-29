import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronDown,
  Menu,
  X,
  ExternalLink,
  BookOpen,
  Home,
  ChevronRight,
  ArrowUpRight,
  Sparkles
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
        { id: 'collaborations', label: 'Research Collaborators', sectionId: 'collaborations' },
      ]
    },
    {
      id: 'team',
      label: 'Meet the Team',
      hasDropdown: true,
      subItems: [
        { id: 'group-leader', label: 'Group Leader', sectionId: 'group-leader' },
        { id: 'team-roster', label: 'Team Members & Supervision', sectionId: 'team-roster' },
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
    setActiveTab(tabId);
    if (setActiveSubSection) {
      setActiveSubSection(sectionId);
    }
    setMobileMenuOpen(false);
    setHoveredMenu(null);

    // Scroll handling
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
    <header ref={headerRef} className="sticky top-0 z-40 w-full shadow-md bg-white">
      {/* 1. Top Utility Bar in #8B1E24 with #C59B27 bottom border */}
      <div className="bg-[#8B1E24] text-white border-b-2 border-[#C59B27] py-1.5 px-4 sm:px-6 lg:px-8 text-[12px] sm:text-[13px] select-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1.5 sm:gap-4">
          {/* Institutional Affirmation */}
          <div className="flex items-center gap-2 text-center sm:text-left tracking-wide font-sans">
            <span className="font-semibold text-white">
              University of Hyderabad
            </span>
            <span className="text-white/40" aria-hidden="true">•</span>
            <span className="text-white/85">
              School of Life Sciences
            </span>
          </div>

          {/* External Scholarly & Institutional Links */}
          <div className="flex items-center gap-2.5 sm:gap-3 text-white/70">
            <a
              href="https://uohyd.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <span>uohyd.ac.in</span>
              <ExternalLink className="w-3 h-3 text-white/40" />
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
              <ExternalLink className="w-3 h-3 text-white/40" />
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
              <ExternalLink className="w-3 h-3 text-white/40" />
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
              <ExternalLink className="w-3 h-3 text-white/40" />
            </a>
          </div>
        </div>
      </div>

      {/* 2. Brand Masthead & Navigation Bar */}
      <nav className="bg-[#FFFFFF] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[72px] gap-4">
            {/* Left Group: Brand Masthead + Desktop Navigation Links closely adjacent */}
            <div className="flex items-center gap-3 sm:gap-4 xl:gap-6 min-w-0">
              {/* Brand Masthead: University of Hyderabad Logo + NeuroXlab Logo & Title */}
              <div className="flex items-center shrink-0 pr-1 sm:pr-2 gap-2 sm:gap-2.5">
                <a
                  href="https://uohyd.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-10 w-10 sm:h-11 sm:w-11 hover:scale-105 transition-transform shrink-0"
                  title="University of Hyderabad - Official Website"
                >
                  <img
                    src={uohSeal}
                    alt="University of Hyderabad"
                    className="h-full w-full object-contain"
                  />
                </a>

                {/* Little vertical line in between the logos */}
                <div className="h-6 sm:h-7 w-px bg-gray-300 mx-0.5 sm:mx-1" aria-hidden="true" />

                <button
                  onClick={() => handleNavClick('home')}
                  className="flex items-center gap-2 sm:gap-2.5 text-left group focus:outline-none"
                  aria-label="NeuroXlab Home"
                >
                  <NeuroXlabLogo className="h-10 w-10 sm:h-11 sm:w-11 drop-shadow-sm group-hover:scale-105 transition-transform" />
                  <div className="flex flex-col">
                    <span className="brand-title text-xl sm:text-2xl font-extrabold tracking-tight text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-none">
                      Neuro<span className="text-[#C59B27]">X</span>lab
                    </span>
                    <span className="text-xs font-semibold text-[#8B1E24] tracking-tight leading-tight hidden sm:block mt-0.5">
                      Systems &amp; Computational Biology
                    </span>
                  </div>
                </button>
              </div>

              {/* Desktop Navigation Links directly adjacent to the Brand Title */}
              <div className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 shrink-0">
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
                          className={`inline-flex items-center gap-1.5 px-3 xl:px-3.5 py-2 rounded-lg text-sm xl:text-base font-semibold transition-all whitespace-nowrap ${isActive
                            ? 'text-[#8B1E24] bg-[#8B1E24]/8 font-bold'
                            : 'text-[#0F2537]/85 hover:text-[#8B1E24] hover:bg-[#FAF8F5]'
                            }`}
                          aria-expanded={isHovered}
                          aria-haspopup="true"
                        >
                          <span>{item.label}</span>
                          <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isHovered ? 'rotate-180 text-[#8B1E24]' : 'text-gray-400'}`} />
                          {isActive && (
                            <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#8B1E24] rounded-full shadow-[0_1px_4px_rgba(139,30,36,0.6)]" />
                          )}
                        </button>

                        {/* Hover Dropdown Submenu */}
                        {isHovered && (
                          <div
                            className="absolute left-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-[#C59B27]/40 py-2.5 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
                          >
                            <div className="px-3.5 pb-2 mb-1 border-b border-gray-100 flex items-center justify-between text-xs font-mono font-semibold text-[#8B1E24]">
                              <span>{item.label} Explorer</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27]" />
                            </div>
                            {item.subItems.map((sub) => (
                              <button
                                key={sub.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleNavClick(item.id, sub.sectionId);
                                }}
                                className="w-full text-left px-3.5 py-2 text-sm font-medium text-[#0F2537] hover:bg-[#FAF8F5] hover:text-[#8B1E24] transition-colors flex items-center justify-between group/sub"
                              >
                                <span>{sub.label}</span>
                                <ChevronRight className="w-4 h-4 text-gray-400 group-hover/sub:text-[#8B1E24] group-hover/sub:translate-x-0.5 transition-all" />
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
                      className={`relative px-3 xl:px-3.5 py-2 rounded-lg text-sm xl:text-base font-semibold transition-all whitespace-nowrap ${isActive
                        ? 'text-[#8B1E24] bg-[#8B1E24]/8 font-bold'
                        : 'text-[#0F2537]/85 hover:text-[#8B1E24] hover:bg-[#FAF8F5]'
                        }`}
                    >
                      {item.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#8B1E24] rounded-full shadow-[0_1px_4px_rgba(139,30,36,0.6)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#0F2537] hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#8B1E24]"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-[#8B1E24]" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* 3. Mobile Responsive Drawer with Collapsible Submenu Accordions */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 px-4 pt-3 pb-6 space-y-1 shadow-2xl animate-in slide-in-from-top duration-200">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const hasSub = item.hasDropdown && item.subItems;
              const isSubOpen = openMobileSubmenus[item.id];

              return (
                <div key={item.id} className="border-b border-gray-50 last:border-b-0">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleNavClick(item.id)}
                      className={`flex-grow text-left px-3 py-2.5 rounded-lg text-base font-semibold transition-colors flex items-center justify-between ${isActive
                        ? 'text-[#8B1E24] bg-[#8B1E24]/10 font-bold border-l-4 border-[#8B1E24]'
                        : 'text-[#0F2537] hover:bg-[#FAF8F5]'
                        }`}
                    >
                      <span>{item.label}</span>
                      {isActive && !hasSub && (
                        <span className="w-2 h-2 rounded-full bg-[#8B1E24]" />
                      )}
                    </button>

                    {hasSub && (
                      <button
                        onClick={(e) => toggleMobileSubmenu(item.id, e)}
                        className="p-2.5 text-gray-500 hover:text-[#8B1E24] focus:outline-none"
                        aria-label={`Toggle ${item.label} submenu`}
                      >
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isSubOpen ? 'rotate-180 text-[#8B1E24]' : ''}`} />
                      </button>
                    )}
                  </div>

                  {/* Collapsible Submenu Accordion */}
                  {hasSub && isSubOpen && (
                    <div className="pl-6 pr-2 py-1.5 space-y-1 bg-[#FAF8F5] rounded-xl my-1 border border-gray-200">
                      {item.subItems.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleNavClick(item.id, sub.sectionId)}
                          className="w-full text-left py-2.5 px-3 text-sm font-medium text-[#0F2537]/80 hover:text-[#8B1E24] hover:bg-white rounded-lg transition-colors flex items-center justify-between"
                        >
                          <span>{sub.label}</span>
                          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Mobile Footer */}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-1 text-center text-xs sm:text-sm text-[#0F2537]/70 py-1">
              <div>School of Life Sciences • University of Hyderabad</div>
            </div>
          </div>
        )}
      </nav>

      {/* 4. Breadcrumb Bar for Inner Pages */}
      {
        activeTab !== 'home' && (
          <div className="bg-[#FAF8F5] border-b border-gray-200 py-2.5 px-4 sm:px-6 lg:px-8 xl:px-10 text-sm font-medium text-[#0F2537]/75">
            <div className="max-w-[1536px] mx-auto flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => handleNavClick('home')}
                className="inline-flex items-center gap-1 text-[#0F2537]/60 hover:text-[#8B1E24] transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home</span>
              </button>
              <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <button
                onClick={() => handleNavClick(activeTab)}
                className={`font-semibold transition-colors ${currentSubItem ? 'text-[#0F2537]/70 hover:text-[#8B1E24]' : 'text-[#8B1E24]'}`}
              >
                {currentNavItem?.label || activeTab}
              </button>
              {currentSubItem && (
                <>
                  <ChevronRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
                  <span className="text-[#8B1E24] font-bold truncate">
                    {currentSubItem.label}
                  </span>
                </>
              )}
            </div>
          </div>
        )
      }
    </header >
  );
}
