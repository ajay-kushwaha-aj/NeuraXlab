import { localDb } from './localDb';
import { supabase, isSupabaseConfigured, STORAGE_BUCKET } from './supabaseClient';
import { slugify } from '../utils/formatters';

// Simple event bus for notifying components of data mutations
const subscribers = new Set();
export function subscribeToCmsUpdates(callback) {
  subscribers.add(callback);
  return () => subscribers.delete(callback);
}
function notifyCmsUpdate(entity, action, id) {
  subscribers.forEach(cb => {
    try {
      cb({ entity, action, id, timestamp: Date.now() });
    } catch (e) {
      console.error('CMS update subscriber error:', e);
    }
  });
}

export const cmsService = {
  // Ensure DB is initialized
  async ensureInit() {
    await localDb.init();
  },

  // Generic Get All (for Admin Panel)
  async getAll(collection) {
    await this.ensureInit();
    return localDb.getAll(collection);
  },

  // Generic Get Single Record
  async getById(collection, id) {
    await this.ensureInit();
    return localDb.getById(collection, id);
  },

  // -----------------------------------------------------------------------
  // ANNOUNCEMENTS
  // -----------------------------------------------------------------------
  async getAnnouncements(includeAll = false) {
    await this.ensureInit();
    const list = await localDb.getAll('announcements');
    if (includeAll) return list;
    const now = new Date();
    return list
      .filter(item => {
        if (item.status !== 'published') return false;
        if (item.expiresAt && new Date(item.expiresAt) < now) return false;
        if (item.publishedAt && new Date(item.publishedAt) > now) return false;
        return true;
      })
      .sort((a, b) => {
        // Pinned first, then publication date desc
        if (a.isPinned && !b.isPinned) return -1;
        if (!a.isPinned && b.isPinned) return 1;
        return new Date(b.publishedAt || b.createdAt) - new Date(a.publishedAt || a.createdAt);
      });
  },

  async createAnnouncement(data, user) {
    await this.ensureInit();
    const id = data.id || `ann-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const slug = data.slug || slugify(data.title);
    const now = new Date().toISOString();

    const record = {
      ...data,
      id,
      slug,
      status: data.status || 'draft',
      createdAt: now,
      updatedAt: now,
      authorId: user?.id,
      authorEmail: user?.email
    };

    await localDb.put('announcements', record);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'create',
      module: 'announcements',
      recordId: id,
      recordTitle: record.title,
      details: { status: record.status }
    });

    notifyCmsUpdate('announcements', 'create', id);
    return record;
  },

  async updateAnnouncement(id, updates, user) {
    await this.ensureInit();
    const existing = await localDb.getById('announcements', id);
    if (!existing) throw new Error('Announcement not found.');

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await localDb.put('announcements', updated);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: updates.status && updates.status !== existing.status ? updates.status : 'update',
      module: 'announcements',
      recordId: id,
      recordTitle: updated.title,
      details: updates
    });

    notifyCmsUpdate('announcements', 'update', id);
    return updated;
  },

  async deleteAnnouncement(id, user) {
    await this.ensureInit();
    const item = await localDb.getById('announcements', id);
    await localDb.delete('announcements', id);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'delete',
      module: 'announcements',
      recordId: id,
      recordTitle: item?.title || id,
      details: {}
    });
    notifyCmsUpdate('announcements', 'delete', id);
    return true;
  },

  // -----------------------------------------------------------------------
  // RESEARCH AREAS & PILLARS
  // -----------------------------------------------------------------------
  async getResearchAreas(includeAll = false) {
    await this.ensureInit();
    const list = await localDb.getAll('research_areas');
    if (includeAll) return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    return list
      .filter(item => item.status === 'published')
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  async createResearchArea(data, user) {
    await this.ensureInit();
    const id = data.id || `pillar-${Date.now()}`;
    const slug = data.slug || slugify(data.title);
    const now = new Date().toISOString();

    const record = {
      ...data,
      id,
      slug,
      status: data.status || 'published',
      createdAt: now,
      updatedAt: now
    };

    await localDb.put('research_areas', record);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'create',
      module: 'research_areas',
      recordId: id,
      recordTitle: record.title,
      details: { status: record.status }
    });
    notifyCmsUpdate('research_areas', 'create', id);
    return record;
  },

  async updateResearchArea(id, updates, user) {
    await this.ensureInit();
    const existing = await localDb.getById('research_areas', id);
    if (!existing) throw new Error('Research Area not found.');

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await localDb.put('research_areas', updated);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'update',
      module: 'research_areas',
      recordId: id,
      recordTitle: updated.title,
      details: updates
    });
    notifyCmsUpdate('research_areas', 'update', id);
    return updated;
  },

  async deleteResearchArea(id, user) {
    await this.ensureInit();
    // Check if any project is linked
    const projects = await localDb.getAll('projects');
    const linked = projects.some(p => p.researchAreaId === id);
    if (linked) {
      throw new Error('Cannot delete this research area because active projects are linked to it. Reassign those projects first.');
    }

    const item = await localDb.getById('research_areas', id);
    await localDb.delete('research_areas', id);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'delete',
      module: 'research_areas',
      recordId: id,
      recordTitle: item?.title || id,
      details: {}
    });
    notifyCmsUpdate('research_areas', 'delete', id);
    return true;
  },

  // -----------------------------------------------------------------------
  // PROJECTS & FUNDING
  // -----------------------------------------------------------------------
  async getProjects(includeAll = false) {
    await this.ensureInit();
    const list = await localDb.getAll('projects');
    if (includeAll) return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    return list
      .filter(item => item.status !== 'archived')
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  async createProject(data, user) {
    await this.ensureInit();
    const id = data.id || `proj-${Date.now()}`;
    const slug = data.slug || slugify(data.title);
    const now = new Date().toISOString();

    const record = {
      ...data,
      id,
      slug,
      status: data.status || 'active',
      createdAt: now,
      updatedAt: now
    };

    await localDb.put('projects', record);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'create',
      module: 'projects',
      recordId: id,
      recordTitle: record.title,
      details: { fundingAgency: record.fundingAgency, status: record.status }
    });
    notifyCmsUpdate('projects', 'create', id);
    return record;
  },

  async updateProject(id, updates, user) {
    await this.ensureInit();
    const existing = await localDb.getById('projects', id);
    if (!existing) throw new Error('Project not found.');

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await localDb.put('projects', updated);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'update',
      module: 'projects',
      recordId: id,
      recordTitle: updated.title,
      details: updates
    });
    notifyCmsUpdate('projects', 'update', id);
    return updated;
  },

  async deleteProject(id, user) {
    await this.ensureInit();
    const item = await localDb.getById('projects', id);
    await localDb.delete('projects', id);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'delete',
      module: 'projects',
      recordId: id,
      recordTitle: item?.title || id,
      details: {}
    });
    notifyCmsUpdate('projects', 'delete', id);
    return true;
  },

  // -----------------------------------------------------------------------
  // PUBLICATIONS & ARTICLES
  // -----------------------------------------------------------------------
  async getPublications(includeAll = false) {
    await this.ensureInit();
    const list = await localDb.getAll('publications');
    if (includeAll) return list.sort((a, b) => (b.pubYear || 0) - (a.pubYear || 0));
    return list
      .filter(item => item.status === 'published')
      .sort((a, b) => (b.pubYear || 0) - (a.pubYear || 0));
  },

  async createPublication(data, user) {
    await this.ensureInit();
    const id = data.id || `pub-${Date.now()}`;
    const now = new Date().toISOString();

    const record = {
      ...data,
      id,
      status: data.status || 'published',
      createdAt: now,
      updatedAt: now
    };

    await localDb.put('publications', record);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'create',
      module: 'publications',
      recordId: id,
      recordTitle: record.title,
      details: { pubType: record.pubType, year: record.pubYear }
    });
    notifyCmsUpdate('publications', 'create', id);
    return record;
  },

  async updatePublication(id, updates, user) {
    await this.ensureInit();
    const existing = await localDb.getById('publications', id);
    if (!existing) throw new Error('Publication not found.');

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await localDb.put('publications', updated);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'update',
      module: 'publications',
      recordId: id,
      recordTitle: updated.title,
      details: updates
    });
    notifyCmsUpdate('publications', 'update', id);
    return updated;
  },

  async deletePublication(id, user) {
    await this.ensureInit();
    const item = await localDb.getById('publications', id);
    await localDb.delete('publications', id);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'delete',
      module: 'publications',
      recordId: id,
      recordTitle: item?.title || id,
      details: {}
    });
    notifyCmsUpdate('publications', 'delete', id);
    return true;
  },

  // -----------------------------------------------------------------------
  // TEAM MEMBERS & PI PROFILE
  // -----------------------------------------------------------------------
  async getTeamMembers(includeAll = false) {
    await this.ensureInit();
    const list = await localDb.getAll('team_members');
    if (includeAll) return list.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
    return list
      .filter(item => item.status === 'published')
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  },

  async createTeamMember(data, user) {
    await this.ensureInit();
    const id = data.id || `member-${Date.now()}`;
    const slug = data.slug || slugify(data.fullName);
    const now = new Date().toISOString();

    const record = {
      ...data,
      id,
      slug,
      status: data.status || 'published',
      createdAt: now,
      updatedAt: now
    };

    await localDb.put('team_members', record);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'create',
      module: 'team_members',
      recordId: id,
      recordTitle: record.fullName,
      details: { role: record.role, category: record.category }
    });
    notifyCmsUpdate('team_members', 'create', id);
    return record;
  },

  async updateTeamMember(id, updates, user) {
    await this.ensureInit();
    const existing = await localDb.getById('team_members', id);
    if (!existing) throw new Error('Team member not found.');

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await localDb.put('team_members', updated);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'update',
      module: 'team_members',
      recordId: id,
      recordTitle: updated.fullName,
      details: updates
    });
    notifyCmsUpdate('team_members', 'update', id);
    return updated;
  },

  async deleteTeamMember(id, user) {
    await this.ensureInit();
    const item = await localDb.getById('team_members', id);
    if (item?.category === 'pi') {
      throw new Error('The Principal Investigator profile cannot be deleted; you may update its fields.');
    }
    await localDb.delete('team_members', id);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'delete',
      module: 'team_members',
      recordId: id,
      recordTitle: item?.fullName || id,
      details: {}
    });
    notifyCmsUpdate('team_members', 'delete', id);
    return true;
  },

  // -----------------------------------------------------------------------
  // MEDIA ASSETS & UPLOADS
  // -----------------------------------------------------------------------
  async getMediaAssets() {
    await this.ensureInit();
    const list = await localDb.getAll('media_assets');
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  async uploadMedia(file, metadata, user) {
    await this.ensureInit();
    const id = `media-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    // Max 10MB limit
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File exceeds maximum allowable limit of 10MB.');
    }

    let url = '';
    let storagePath = '';

    // If Supabase Storage is configured, upload to bucket
    if (isSupabaseConfigured) {
      try {
        const fileExt = file.name.split('.').pop();
        storagePath = `uploads/${Date.now()}_${slugify(metadata.title || file.name)}.${fileExt}`;
        const { error: uploadError } = await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(storagePath, file, { upsert: true });

        if (!uploadError) {
          const { data: pubData } = supabase.storage
            .from(STORAGE_BUCKET)
            .getPublicUrl(storagePath);
          url = pubData.publicUrl;
        }
      } catch (err) {
        console.warn('Supabase media upload fallback:', err);
      }
    }

    // If not uploaded to Supabase or offline, store as local Data URL Blob
    if (!url) {
      url = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      storagePath = `local-storage/${file.name}`;
    }

    const record = {
      id,
      title: metadata.title || file.name.replace(/\.[^/.]+$/, ''),
      caption: metadata.caption || '',
      altText: metadata.altText || metadata.title || 'NeuroXLab laboratory asset',
      category: metadata.category || 'general',
      url,
      storagePath,
      fileType: file.type || 'image/jpeg',
      fileSizeBytes: file.size,
      dimensions: metadata.dimensions || '',
      isPublic: true,
      uploadedById: user?.id,
      uploadedByEmail: user?.email,
      createdAt: now,
      updatedAt: now
    };

    await localDb.put('media_assets', record);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'upload',
      module: 'media_assets',
      recordId: id,
      recordTitle: record.title,
      details: { fileType: record.fileType, size: record.fileSizeBytes }
    });
    notifyCmsUpdate('media_assets', 'create', id);
    return record;
  },

  async deleteMedia(id, user) {
    await this.ensureInit();
    // Check if referenced in team members or announcements
    const team = await localDb.getAll('team_members');
    const announcements = await localDb.getAll('announcements');
    const media = await localDb.getById('media_assets', id);

    if (media) {
      const inTeam = team.some(m => m.avatarUrl === media.url);
      const inAnn = announcements.some(a => a.imageUrl === media.url);
      if (inTeam || inAnn) {
        throw new Error('This image is currently used by published content (team profile or announcement). Replace it in that content before deleting.');
      }
    }

    await localDb.delete('media_assets', id);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'delete',
      module: 'media_assets',
      recordId: id,
      recordTitle: media?.title || id,
      details: {}
    });
    notifyCmsUpdate('media_assets', 'delete', id);
    return true;
  },

  // -----------------------------------------------------------------------
  // ACTIVITIES & EVENTS
  // -----------------------------------------------------------------------
  async getActivities(includeAll = false) {
    await this.ensureInit();
    const list = await localDb.getAll('activities_events');
    if (includeAll) return list.sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
    return list
      .filter(item => item.status === 'published')
      .sort((a, b) => new Date(b.eventDate) - new Date(a.eventDate));
  },

  async createActivity(data, user) {
    await this.ensureInit();
    const id = data.id || `act-${Date.now()}`;
    const now = new Date().toISOString();

    const record = {
      ...data,
      id,
      status: data.status || 'published',
      createdAt: now,
      updatedAt: now
    };

    await localDb.put('activities_events', record);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'create',
      module: 'activities_events',
      recordId: id,
      recordTitle: record.title,
      details: { category: record.category, date: record.eventDate }
    });
    notifyCmsUpdate('activities_events', 'create', id);
    return record;
  },

  async updateActivity(id, updates, user) {
    await this.ensureInit();
    const existing = await localDb.getById('activities_events', id);
    if (!existing) throw new Error('Event not found.');

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await localDb.put('activities_events', updated);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'update',
      module: 'activities_events',
      recordId: id,
      recordTitle: updated.title,
      details: updates
    });
    notifyCmsUpdate('activities_events', 'update', id);
    return updated;
  },

  async deleteActivity(id, user) {
    await this.ensureInit();
    const item = await localDb.getById('activities_events', id);
    await localDb.delete('activities_events', id);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'delete',
      module: 'activities_events',
      recordId: id,
      recordTitle: item?.title || id,
      details: {}
    });
    notifyCmsUpdate('activities_events', 'delete', id);
    return true;
  },

  // -----------------------------------------------------------------------
  // OPPORTUNITIES & RECRUITMENT
  // -----------------------------------------------------------------------
  async getOpportunities(includeAll = false) {
    await this.ensureInit();
    const list = await localDb.getAll('opportunities');
    if (includeAll) return list;
    const now = new Date();
    return list.filter(item => {
      if (item.status === 'closed' || item.status === 'archived') return false;
      if (item.closingDate && new Date(item.closingDate) < now) return false;
      return true;
    });
  },

  async createOpportunity(data, user) {
    await this.ensureInit();
    const id = data.id || `opp-${Date.now()}`;
    const now = new Date().toISOString();

    const record = {
      ...data,
      id,
      status: data.status || 'open',
      createdAt: now,
      updatedAt: now
    };

    await localDb.put('opportunities', record);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'create',
      module: 'opportunities',
      recordId: id,
      recordTitle: record.title,
      details: { oppType: record.oppType, status: record.status }
    });
    notifyCmsUpdate('opportunities', 'create', id);
    return record;
  },

  async updateOpportunity(id, updates, user) {
    await this.ensureInit();
    const existing = await localDb.getById('opportunities', id);
    if (!existing) throw new Error('Opportunity not found.');

    const updated = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await localDb.put('opportunities', updated);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'update',
      module: 'opportunities',
      recordId: id,
      recordTitle: updated.title,
      details: updates
    });
    notifyCmsUpdate('opportunities', 'update', id);
    return updated;
  },

  async deleteOpportunity(id, user) {
    await this.ensureInit();
    const item = await localDb.getById('opportunities', id);
    await localDb.delete('opportunities', id);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'delete',
      module: 'opportunities',
      recordId: id,
      recordTitle: item?.title || id,
      details: {}
    });
    notifyCmsUpdate('opportunities', 'delete', id);
    return true;
  },

  // -----------------------------------------------------------------------
  // SITE SETTINGS
  // -----------------------------------------------------------------------
  async getSettings() {
    await this.ensureInit();
    const list = await localDb.getAll('site_settings');
    const settings = {};
    list.forEach(item => {
      settings[item.key] = item.value;
    });
    return settings;
  },

  async updateSettings(key, value, user) {
    await this.ensureInit();
    const record = {
      key,
      value,
      updatedAt: new Date().toISOString()
    };
    await localDb.put('site_settings', record);
    await localDb.createAuditLog({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'update',
      module: 'site_settings',
      recordId: key,
      recordTitle: `Settings: ${key}`,
      details: {}
    });
    notifyCmsUpdate('site_settings', 'update', key);
    return value;
  },

  // -----------------------------------------------------------------------
  // AUDIT LOGS
  // -----------------------------------------------------------------------
  async getAuditLogs(limit = 100) {
    await this.ensureInit();
    const logs = await localDb.getAll('audit_logs');
    return logs
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  },

  // -----------------------------------------------------------------------
  // DASHBOARD LIVE METRICS
  // -----------------------------------------------------------------------
  async getDashboardMetrics() {
    await this.ensureInit();
    const announcements = await localDb.getAll('announcements');
    const areas = await localDb.getAll('research_areas');
    const projects = await localDb.getAll('projects');
    const publications = await localDb.getAll('publications');
    const team = await localDb.getAll('team_members');
    const media = await localDb.getAll('media_assets');
    const events = await localDb.getAll('activities_events');
    const opportunities = await localDb.getAll('opportunities');
    const recentLogs = await this.getAuditLogs(8);

    const totalRecords = announcements.length + areas.length + projects.length + publications.length + team.length;
    const publishedCount = 
      announcements.filter(a => a.status === 'published').length +
      projects.filter(p => p.status === 'active' || p.status === 'completed').length +
      publications.filter(p => p.status === 'published').length +
      team.filter(t => t.status === 'published').length;

    const draftCount = 
      announcements.filter(a => a.status === 'draft').length +
      publications.filter(p => p.status === 'draft').length +
      areas.filter(a => a.status === 'draft').length;

    return {
      totalRecords,
      publishedCount,
      draftCount,
      activeProjectsCount: projects.filter(p => p.status === 'active').length,
      publicationsCount: publications.length,
      teamMembersCount: team.filter(t => t.category !== 'alumni').length,
      alumniCount: team.filter(t => t.category === 'alumni').length,
      mediaCount: media.length,
      upcomingEventsCount: events.filter(e => e.isUpcoming || new Date(e.eventDate) >= new Date()).length,
      openOpportunitiesCount: opportunities.filter(o => o.status === 'open').length,
      recentLogs
    };
  }
};

