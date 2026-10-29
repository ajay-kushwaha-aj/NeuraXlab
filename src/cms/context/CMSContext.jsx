import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { cmsService, subscribeToCmsUpdates } from '../services/cmsService';
import {
  LAB_INFO,
  RESEARCH_PILLARS,
  FLAGSHIP_GRANT,
  ONGOING_PROJECTS,
  PUBLICATIONS,
  BOOK_CHAPTERS,
  CONFERENCE_PROCEEDINGS,
  TEAM_MEMBERS,
  ALUMNI_MEMBERS,
  ACTIVITIES,
  OPEN_POSITIONS
} from '../../data/labData';

const CMSContext = createContext(null);

export function CMSProvider({ children }) {
  const [data, setData] = useState({
    announcements: [],
    researchAreas: [],
    projects: [],
    publications: [],
    teamMembers: [],
    alumniMembers: [],
    activities: [],
    opportunities: [],
    settings: null,
    loading: true,
    error: null
  });

  const fetchPublishedContent = useCallback(async () => {
    try {
      const [
        announcements,
        researchAreas,
        projects,
        publications,
        allTeam,
        activities,
        opportunities,
        settings
      ] = await Promise.all([
        cmsService.getAnnouncements(false),
        cmsService.getResearchAreas(false),
        cmsService.getProjects(false),
        cmsService.getPublications(false),
        cmsService.getTeamMembers(false),
        cmsService.getActivities(false),
        cmsService.getOpportunities(false),
        cmsService.getSettings()
      ]);

      // Merge static members and CMS members so newly added static records (like Dr. Suvarna Annapureddy) are never omitted
      const cmsList = allTeam && Array.isArray(allTeam) ? allTeam : [];
      const mergedMap = new Map();

      // Seed with static members first
      [...TEAM_MEMBERS, ...ALUMNI_MEMBERS].forEach((item) => {
        if (item && item.id) {
          mergedMap.set(item.id, { ...item });
        }
      });

      // Layer CMS items over static records (or add any newly created CMS members)
      cmsList.forEach((item) => {
        if (item && item.id) {
          const existing = mergedMap.get(item.id) || {};
          mergedMap.set(item.id, { ...existing, ...item });
        }
      });

      const combinedTeamList = Array.from(mergedMap.values());

      // Normalize team members to ensure both name & fullName, avatar & avatarUrl, and valid email
      const normalizedTeam = combinedTeamList.map((m) => {
        const staticMatch = TEAM_MEMBERS.find((t) => t.id === m.id) || ALUMNI_MEMBERS.find((a) => a.id === m.id);
        const name = m.name || m.fullName || staticMatch?.name || 'Lab Researcher';
        const avatar = m.avatar || m.avatarUrl || staticMatch?.avatar || '/images/default_avatar.jpg';
        const email = m.email || m.contact?.email || staticMatch?.contact?.email || '';
        return {
          ...staticMatch,
          ...m,
          id: m.id,
          name,
          fullName: name,
          avatar,
          avatarUrl: avatar,
          role: m.role || staticMatch?.role || '',
          qualification: m.qualification || staticMatch?.qualification || '',
          qualificationFull: m.qualificationFull || staticMatch?.qualificationFull || m.qualification || '',
          category: m.category || staticMatch?.category || 'phd',
          summaryBio: m.summaryBio || staticMatch?.summaryBio || m.fullBio || m.bio || '',
          fullBio: m.fullBio || staticMatch?.fullBio || m.summaryBio || m.bio || '',
          bio: m.fullBio || m.summaryBio || staticMatch?.bio || '',
          description: m.description || m.summaryBio || staticMatch?.description || '',
          period: m.period || m.alumniPeriod || staticMatch?.period || '',
          currentDestination: m.currentDestination || staticMatch?.currentDestination || '',
          researchInterests: Array.isArray(m.researchInterests)
            ? m.researchInterests
            : typeof m.researchInterests === 'string' && m.researchInterests.trim()
            ? m.researchInterests.split(',').map((s) => s.trim()).filter(Boolean)
            : Array.isArray(staticMatch?.researchInterests)
            ? staticMatch.researchInterests
            : [],
          email,
          contact: {
            email,
            personalEmail: m.altEmail || staticMatch?.contact?.personalEmail || '',
            altEmail: m.altEmail || staticMatch?.contact?.altEmail || '',
            office: staticMatch?.contact?.office || '',
            phone: staticMatch?.contact?.phone || '',
            ...(m.contact || {})
          }
        };
      });

      const currentTeam = normalizedTeam.filter(m => m.category !== 'alumni');
      const alumni = normalizedTeam.filter(m => m.category === 'alumni');

      setData({
        announcements: announcements.length > 0 ? announcements : [],
        researchAreas: researchAreas.length > 0 ? researchAreas : RESEARCH_PILLARS,
        projects: projects.length > 0 ? projects : [FLAGSHIP_GRANT, ...ONGOING_PROJECTS],
        publications: publications.length > 0 ? publications : [...PUBLICATIONS, ...BOOK_CHAPTERS, ...CONFERENCE_PROCEEDINGS],
        teamMembers: currentTeam.length > 0 ? currentTeam : TEAM_MEMBERS,
        alumniMembers: alumni.length > 0 ? alumni : ALUMNI_MEMBERS,
        activities: activities.length > 0 ? activities : ACTIVITIES,
        opportunities: opportunities.length > 0 ? opportunities : OPEN_POSITIONS,
        settings: settings && Object.keys(settings).length > 0 ? settings : null,
        loading: false,
        error: null
      });
    } catch (err) {
      console.warn('Error loading CMS data; falling back to authentic static records:', err);
      setData(prev => ({
        ...prev,
        researchAreas: RESEARCH_PILLARS,
        projects: [FLAGSHIP_GRANT, ...ONGOING_PROJECTS],
        publications: [...PUBLICATIONS, ...BOOK_CHAPTERS, ...CONFERENCE_PROCEEDINGS],
        teamMembers: TEAM_MEMBERS,
        alumniMembers: ALUMNI_MEMBERS,
        activities: ACTIVITIES,
        opportunities: OPEN_POSITIONS,
        loading: false,
        error: err.message
      }));
    }
  }, []);

  useEffect(() => {
    fetchPublishedContent();
    // Subscribe to live CMS updates
    const unsubscribe = subscribeToCmsUpdates(() => {
      fetchPublishedContent();
    });
    return unsubscribe;
  }, [fetchPublishedContent]);

  return (
    <CMSContext.Provider
      value={{
        ...data,
        refresh: fetchPublishedContent,
        labInfo: LAB_INFO
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}

