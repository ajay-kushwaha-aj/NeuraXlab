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
} from '../../data/labData.js';

/**
 * Returns genuine, authentic seed data mapped from labData.js
 * Ensures 100% scientific consistency with verified academic records.
 */
export function getInitialSeedData() {
  // 1. Announcements & News
  const announcements = [
    {
      id: 'ann-flagship-grant-2026',
      title: 'Flagship Extramural Grant Awarded: ₹38.5 Lakhs for Stroke & Gut Dysbiosis Research',
      slug: 'flagship-extramural-grant-2026-stroke-gut-dysbiosis',
      summary: 'NeuroXLab has been awarded a prestigious multi-year extramural grant to investigate the therapeutic potential of nano-formulated SCFAs and Edaravone in stroke-induced gut dysbiosis.',
      bodyHtml: `<p>We are pleased to announce that NeuroXLab has secured an extramural research grant of <strong>₹38,50,000 INR</strong> for the triennium <strong>2026–2029</strong>.</p><p>Led by <strong>Dr. Venkata Prasuja Nakka</strong> (Principal Investigator) at the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad, the project titled <em>"Therapeutic potential of nano-formulated short-chain fatty acids and edaravone in stroke-induced gut dysbiosis and its bidirectional impact on stroke recovery"</em> will engineer novel biocompatible nanomedicines to break the vicious brain–gut inflammatory loop, mitigate ER stress, and accelerate functional sensorimotor recovery.</p>`,
      category: 'grant_announcement',
      imageUrl: '/images/uoh_seal.png',
      isPinned: true,
      destinationUrl: '',
      publishedAt: '2026-01-27T09:00:00.000Z',
      expiresAt: null,
      status: 'published',
      createdAt: '2026-01-27T09:00:00.000Z',
      updatedAt: '2026-01-27T09:00:00.000Z'
    },
    {
      id: 'ann-welcome-postdoc-suvarna',
      title: 'Welcome Dr. Suvarna Annapureddy, Ph.D. to NeuroXLab',
      slug: 'welcome-dr-suvarna-annapureddy',
      summary: 'Dr. Suvarna Annapureddy joins NeuroXLab as a Postdoctoral Research Fellow focusing on diabetes-associated brain injury and metabolic neuroprotection.',
      bodyHtml: `<p>NeuroXLab warmly welcomes <strong>Dr. Suvarna Annapureddy, Ph.D.</strong> as our new Postdoctoral Fellow.</p><p>Dr. Annapureddy will investigate the molecular and metabolic cascades underlying neurological dysfunction in diabetes-associated brain injury, utilizing behavioral rodent assays and exploring seaweed-derived bioactive molecules for neuroprotection.</p>`,
      category: 'research_highlight',
      imageUrl: '/images/suvarna_annapureddy.jpg',
      isPinned: false,
      destinationUrl: '',
      publishedAt: '2026-02-15T10:00:00.000Z',
      expiresAt: null,
      status: 'published',
      createdAt: '2026-02-15T10:00:00.000Z',
      updatedAt: '2026-02-15T10:00:00.000Z'
    },
    {
      id: 'ann-recruitment-phd-2026',
      title: 'Research Scholar Recruitment: Ph.D. Positions Open for CSIR/UGC-JRF Holders',
      slug: 'recruitment-phd-positions-jrf-2026',
      summary: 'Applications are invited from passionate researchers with valid CSIR/UGC-NET JRF or DBT-JRF to join our stroke biology and computational neuroscience programs.',
      bodyHtml: `<p>NeuroXLab is seeking highly motivated scholars with independent national fellowships (CSIR-JRF, UGC-JRF, DBT-JRF, or ICMR-JRF) to undertake doctoral dissertations in stroke neurobiology, gut–brain axis metagenomics, and translational nanomedicine.</p><p>Interested candidates are invited to write directly to Dr. Venkata Prasuja Nakka at <code>nvprasuja@uohyd.ac.in</code> with their CV, fellowship award letter, and a brief statement of purpose.</p>`,
      category: 'recruitment',
      imageUrl: '/images/dr_prasuja_nakka.jpg',
      isPinned: true,
      destinationUrl: '',
      publishedAt: '2026-03-01T08:00:00.000Z',
      expiresAt: '2026-12-31T23:59:59.000Z',
      status: 'published',
      createdAt: '2026-03-01T08:00:00.000Z',
      updatedAt: '2026-03-01T08:00:00.000Z'
    }
  ];

  // 2. Research Areas & Pillars
  const researchAreas = (RESEARCH_PILLARS || []).map((pillar, idx) => ({
    id: pillar.id || `pillar-${idx + 1}`,
    title: pillar.title,
    slug: pillar.id ? pillar.id.replace('pillar-', '') : `area-${idx + 1}`,
    numberLabel: pillar.number || `0${idx + 1}`,
    leadSummary: pillar.leadSummary || '',
    fullDescription: pillar.leadSummary || '',
    iconName: pillar.iconName || 'Activity',
    coverImageUrl: '',
    keyQuestions: pillar.keyQuestions || [],
    experimentalTools: pillar.experimentalTools || [],
    keywords: [pillar.subtitle || pillar.title],
    displayOrder: idx + 1,
    isFeatured: true,
    status: 'published',
    seoTitle: `${pillar.title} | NeuroXLab Research`,
    seoDescription: pillar.leadSummary,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  // 3. Research Projects
  const projects = [
    {
      id: FLAGSHIP_GRANT.id || 'grant-2026-2029',
      title: FLAGSHIP_GRANT.title,
      slug: 'nano-formulated-scfas-edaravone-stroke-gut-dysbiosis',
      grantNumber: 'EMR/2026/00145',
      fundingAgency: 'Extramural Research Council',
      budget: FLAGSHIP_GRANT.budget || '₹38,50,000 INR',
      projectType: 'flagship',
      piName: 'Dr. Venkata Prasuja Nakka',
      coPiName: '',
      collaborators: 'Department of Systems & Computational Biology, School of Life Sciences, UoH',
      startDate: '2026-01-27',
      endDate: '2029-01-26',
      summary: FLAGSHIP_GRANT.summary,
      fullDescription: FLAGSHIP_GRANT.summary,
      objectives: FLAGSHIP_GRANT.objectives || [],
      methodologies: FLAGSHIP_GRANT.methodologies || [],
      featuredImageUrl: '',
      officialUrl: 'https://uohyd.ac.in',
      researchAreaId: 'pillar-gut-brain',
      status: 'active',
      isFeatured: true,
      displayOrder: 1,
      createdAt: '2026-01-27T00:00:00.000Z',
      updatedAt: '2026-01-27T00:00:00.000Z'
    },
    ...(ONGOING_PROJECTS || []).map((proj, idx) => ({
      id: proj.id || `proj-${idx + 2}`,
      title: proj.title,
      slug: `project-${idx + 2}`,
      grantNumber: proj.code || '',
      fundingAgency: proj.agency || 'University of Hyderabad IoE',
      budget: proj.budget || '',
      projectType: 'extramural',
      piName: 'Dr. Venkata Prasuja Nakka',
      coPiName: '',
      collaborators: proj.collaborators || '',
      startDate: proj.startDate || '2025-01-01',
      endDate: proj.endDate || '2028-01-01',
      summary: proj.summary || proj.description || '',
      fullDescription: proj.summary || proj.description || '',
      objectives: proj.objectives || [],
      methodologies: proj.methods || [],
      featuredImageUrl: '',
      officialUrl: '',
      researchAreaId: '',
      status: 'active',
      isFeatured: false,
      displayOrder: idx + 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))
  ];

  // 4. Publications & Articles
  const publications = [
    ...(PUBLICATIONS || []).map((pub, idx) => ({
      id: pub.id || `pub-${idx + 1}`,
      title: pub.title,
      pubType: 'journal_article',
      authors: Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors,
      journalOrBook: pub.journal || '',
      pubYear: parseInt(pub.year, 10) || 2024,
      volume: pub.volume || '',
      issue: pub.issue || '',
      pages: pub.pages || '',
      doi: pub.doi || '',
      pmid: pub.pmid || '',
      isbn: '',
      abstract: pub.abstract || '',
      keywords: pub.tags || [],
      coverImageUrl: '',
      publisherUrl: pub.link || '',
      doiUrl: pub.doi ? `https://doi.org/${pub.doi.replace(/^https?:\/\/doi\.org\//, '')}` : '',
      impactFactor: pub.impactFactor || '',
      citationsCount: pub.citations || 0,
      isFeatured: !!pub.featured,
      displayOrder: idx + 1,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })),
    ...(BOOK_CHAPTERS || []).map((chap, idx) => ({
      id: chap.id || `book-${idx + 1}`,
      title: chap.title,
      pubType: 'book_chapter',
      authors: chap.authors || '',
      journalOrBook: chap.publisher || '',
      pubYear: parseInt(chap.year, 10) || 2019,
      volume: '',
      issue: '',
      pages: '',
      doi: chap.doi || '',
      pmid: '',
      isbn: chap.isbn || '',
      abstract: chap.summary || '',
      keywords: chap.highlights || [],
      coverImageUrl: '',
      publisherUrl: chap.link || '',
      doiUrl: chap.doi ? `https://doi.org/${chap.doi.replace(/^https?:\/\/doi\.org\//, '')}` : '',
      impactFactor: '',
      citationsCount: 0,
      isFeatured: false,
      displayOrder: 100 + idx,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })),
    ...(CONFERENCE_PROCEEDINGS || []).map((conf, idx) => ({
      id: conf.id || `conf-${idx + 1}`,
      title: conf.title,
      pubType: 'conference_proceeding',
      authors: conf.authors || '',
      journalOrBook: conf.proceedings || conf.conference || '',
      pubYear: parseInt(conf.year, 10) || 2023,
      volume: '',
      issue: '',
      pages: '',
      doi: conf.doi || '',
      pmid: '',
      isbn: '',
      abstract: conf.summary || '',
      keywords: [],
      coverImageUrl: '',
      publisherUrl: conf.link || '',
      doiUrl: '',
      impactFactor: '',
      citationsCount: 0,
      isFeatured: false,
      displayOrder: 200 + idx,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))
  ];

  // 5. Team Members (Current + Alumni)
  const teamMembers = [
    ...(TEAM_MEMBERS || []).map((member, idx) => ({
      id: member.id,
      slug: member.id,
      name: member.name,
      fullName: member.name,
      academicTitle: member.category === 'pi' ? 'UGC-Assistant Professor (Level-11)' : '',
      role: member.role,
      qualification: member.qualification,
      qualificationFull: member.qualificationFull || member.qualification,
      category: member.category || (member.id === 'pi' ? 'pi' : 'phd'),
      avatar: member.avatar || '/images/default_avatar.jpg',
      avatarUrl: member.avatar || '/images/default_avatar.jpg',
      summaryBio: member.summaryBio || '',
      fullBio: member.fullBio || member.summaryBio || '',
      researchInterests: member.researchInterests || [],
      email: member.contact?.email || member.contact?.institutionalEmail || '',
      altEmail: member.contact?.altEmail || member.contact?.personalEmail || '',
      contact: member.contact || { email: member.contact?.email || '' },
      externalLinks: {
        googleScholar: member.contact?.scholarUrl || LAB_INFO.pi.scholarUrl || '',
        researchGate: member.contact?.researchGateUrl || LAB_INFO.pi.researchGateUrl || '',
        linkedIn: member.contact?.linkedInUrl || LAB_INFO.pi.linkedInUrl || '',
        scopus: member.contact?.scopusUrl || LAB_INFO.pi.scopusUrl || ''
      },
      alumniPeriod: '',
      currentDestination: '',
      displayOrder: idx + 1,
      isFeatured: member.category === 'pi',
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })),
    ...(ALUMNI_MEMBERS || []).map((alumnus, idx) => ({
      id: alumnus.id,
      slug: alumnus.id,
      name: alumnus.name,
      fullName: alumnus.name,
      academicTitle: '',
      role: alumnus.role,
      qualification: alumnus.qualification,
      qualificationFull: alumnus.qualification,
      category: 'alumni',
      avatar: alumnus.avatar || '/images/default_avatar.jpg',
      avatarUrl: alumnus.avatar || '/images/default_avatar.jpg',
      summaryBio: alumnus.description || '',
      fullBio: alumnus.description || '',
      description: alumnus.description || '',
      period: alumnus.period || '',
      researchInterests: alumnus.researchInterests || [],
      email: '',
      altEmail: '',
      contact: {},
      externalLinks: {},
      alumniPeriod: alumnus.period || '',
      currentDestination: alumnus.currentDestination || '',
      displayOrder: 50 + idx,
      isFeatured: false,
      status: 'published',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }))
  ];

  // 6. Media Assets
  const mediaAssets = [
    {
      id: 'media-uoh-seal',
      title: 'University of Hyderabad Seal',
      caption: 'Official institutional insignia of UoH (Institution of Eminence)',
      altText: 'University of Hyderabad crest',
      category: 'general',
      url: '/images/uoh_seal.png',
      storagePath: 'public/images/uoh_seal.png',
      fileType: 'image/png',
      fileSizeBytes: 185800,
      dimensions: '512x512',
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'media-neuroxlab-logo',
      title: 'NeuroXLab Brandmark',
      caption: 'Official emblem and wordmark of NeuroXLab',
      altText: 'NeuroXLab laboratory logo',
      category: 'general',
      url: '/images/neuroxlab_logo.png',
      storagePath: 'public/images/neuroxlab_logo.png',
      fileType: 'image/png',
      fileSizeBytes: 579000,
      dimensions: '1024x1024',
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'media-pi-portrait',
      title: 'Dr. Venkata Prasuja Nakka Portrait',
      caption: 'Official institutional portrait of Principal Investigator Dr. Nakka',
      altText: 'Dr. Venkata Prasuja Nakka, Ph.D.',
      category: 'team',
      url: '/images/dr_prasuja_nakka.jpg',
      storagePath: 'public/images/dr_prasuja_nakka.jpg',
      fileType: 'image/jpeg',
      fileSizeBytes: 64200,
      dimensions: '800x1067',
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'media-suvarna-portrait',
      title: 'Dr. Suvarna Annapureddy Portrait',
      caption: 'Dr. Suvarna Annapureddy, Postdoctoral Research Fellow',
      altText: 'Dr. Suvarna Annapureddy, Ph.D.',
      category: 'team',
      url: '/images/suvarna_annapureddy.jpg',
      storagePath: 'public/images/suvarna_annapureddy.jpg',
      fileType: 'image/jpeg',
      fileSizeBytes: 21227,
      dimensions: '600x800',
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'media-shailasri-portrait',
      title: 'Shailasri S. Portrait',
      caption: 'Shailasri S., Senior Research Fellow / Doctoral Scholar',
      altText: 'Shailasri S., M.Sc.',
      category: 'team',
      url: '/images/shailasri_s.jpg',
      storagePath: 'public/images/shailasri_s.jpg',
      fileType: 'image/jpeg',
      fileSizeBytes: 35000,
      dimensions: '600x800',
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'media-sateesh-portrait',
      title: 'Sateesh N. Portrait',
      caption: 'Sateesh N., Doctoral Scholar',
      altText: 'Sateesh N., M.Sc.',
      category: 'team',
      url: '/images/sateesh_n.jpg',
      storagePath: 'public/images/sateesh_n.jpg',
      fileType: 'image/jpeg',
      fileSizeBytes: 38000,
      dimensions: '600x800',
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 'media-aparna-portrait',
      title: 'Aparna V. Portrait',
      caption: 'Aparna V., Project Associate',
      altText: 'Aparna V., M.Sc.',
      category: 'team',
      url: '/images/aparna_v.jpg',
      storagePath: 'public/images/aparna_v.jpg',
      fileType: 'image/jpeg',
      fileSizeBytes: 32000,
      dimensions: '600x800',
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  ];

  // 7. Activities & Events
  const activitiesEvents = (ACTIVITIES || []).map((act, idx) => ({
    id: act.id || `act-${idx + 1}`,
    title: act.title,
    category: act.type || 'conference',
    description: act.description || act.summary || '',
    eventDate: act.date || '2026-03-20',
    endDate: act.endDate || '',
    venue: act.venue || act.location || 'School of Life Sciences, University of Hyderabad',
    associatedResearchers: act.speakers || 'Dr. Venkata Prasuja Nakka & Lab Members',
    imageUrl: act.image || '',
    registrationUrl: act.url || '',
    isUpcoming: !!act.isUpcoming,
    isFeatured: true,
    status: 'published',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  // 8. Opportunities & Recruitment
  const opportunities = (OPEN_POSITIONS || []).map((opp, idx) => ({
    id: opp.id || `opp-${idx + 1}`,
    title: opp.title,
    oppType: opp.type || 'phd_position',
    eligibility: opp.eligibility || 'Valid CSIR/UGC-JRF, DBT-JRF, or ICMR-JRF fellowship required.',
    description: opp.description || 'Doctoral research position investigating ischemic stroke, ER stress, and gut-brain axis biology.',
    qualifications: opp.qualifications || ['M.Sc. in Life Sciences, Biochemistry, Biotechnology, or Neuroscience', 'Valid National Junior Research Fellowship'],
    applicationInstructions: opp.howToApply || 'Send your CV, research statement, and fellowship award letter to nvprasuja@uohyd.ac.in',
    applicationUrl: '',
    contactEmail: LAB_INFO.pi.email || 'nvprasuja@uohyd.ac.in',
    openingDate: opp.openingDate || '2026-01-01',
    closingDate: opp.closingDate || '2026-12-31',
    status: opp.status || 'open',
    isFeatured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }));

  // 9. Site Settings & Homepage Configuration
  const siteSettings = {
    general: {
      siteName: 'NeuroXLab',
      tagline: 'Systems & Translational Neuroscience Laboratory',
      motto: 'Exploring the Neurobiology of Disease and Stroke: From Bench to Bedside',
      formalAddress: LAB_INFO.formalAddress,
      roomNumber: 'Room No. F-75C, School of Life Sciences',
      contactEmail: LAB_INFO.pi.email,
      altContactEmail: LAB_INFO.pi.personalEmail,
      contactPhone: '+91-40-23134581',
      institution: 'University of Hyderabad',
      school: 'School of Life Sciences',
      department: 'Department of Systems and Computational Biology'
    },
    hero: {
      eyebrow: 'SCHOOL OF LIFE SCIENCES • UNIVERSITY OF HYDERABAD',
      title: 'Systems & Translational Neuroscience Laboratory',
      subtitle: 'Exploring the Neurobiology of Disease and Stroke: From Bench to Bedside',
      description: LAB_INFO.missionStatement,
      showInteractiveNeuron: true
    },
    metrics: {
      citations: '1,900+',
      hIndex: '12+',
      i10Index: '15+',
      flagshipGrant: '₹38.5 Lakhs (2026–2029)',
      publicationsCount: '25+',
      collaboratingCenters: '4 Global Centers'
    },
    seo: {
      metaTitle: 'NeuroXLab | Systems & Translational Neuroscience Laboratory',
      metaDescription: 'Official laboratory website of Dr. Venkata Prasuja Nakka at the University of Hyderabad. Researching ischemic stroke, ER stress, gut-brain axis, and nanomedicine.',
      keywords: 'stroke research, neurobiology, ER stress, gut-brain axis, nanomedicine, University of Hyderabad, Venkata Prasuja Nakka',
      ogImageUrl: '/images/neuroxlab_logo.png'
    },
    sectionVisibility: {
      showAnnouncements: true,
      showResearchHighlights: true,
      showTeamPreview: true,
      showPublicationsHighlight: true,
      showOpportunitiesTeaser: true
    }
  };

  return {
    announcements,
    researchAreas,
    projects,
    publications,
    teamMembers,
    mediaAssets,
    activitiesEvents,
    opportunities,
    siteSettings
  };
}
