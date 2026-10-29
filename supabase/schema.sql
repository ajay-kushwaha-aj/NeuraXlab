-- =========================================================================
-- NEUROXLAB ACADEMIC CMS & ADMIN PORTAL
-- PostgreSQL Database Schema & Row-Level Security (RLS) Policies
-- Department of Systems and Computational Biology, School of Life Sciences
-- University of Hyderabad
-- =========================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -------------------------------------------------------------------------
-- 1. ADMINISTRATORS & ROLES (RBAC)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('super_admin', 'editor')),
    password_hash TEXT, -- Used for self-hosted / fallback mode
    is_active BOOLEAN DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 2. ANNOUNCEMENTS & NOTIFICATIONS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    summary TEXT NOT NULL,
    body_html TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'general_news', 'research_highlight', 'grant_announcement',
        'recruitment', 'conference', 'publication', 'event'
    )),
    image_url TEXT,
    is_pinned BOOLEAN DEFAULT FALSE,
    destination_url TEXT,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    author_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 3. RESEARCH AREAS & DIRECTIONS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS research_areas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    number_label TEXT, -- e.g., '01', '02'
    lead_summary TEXT NOT NULL,
    full_description TEXT NOT NULL,
    icon_name TEXT DEFAULT 'Activity',
    cover_image_url TEXT,
    key_questions TEXT[],
    experimental_tools TEXT[],
    keywords TEXT[],
    display_order INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT TRUE,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 4. RESEARCH PROJECTS & FUNDING
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    grant_number TEXT,
    funding_agency TEXT NOT NULL,
    budget TEXT,
    project_type TEXT DEFAULT 'extramural' CHECK (project_type IN ('flagship', 'extramural', 'intramural', 'collaborative')),
    pi_name TEXT NOT NULL,
    co_pi_name TEXT,
    collaborators TEXT,
    start_date DATE,
    end_date DATE,
    summary TEXT NOT NULL,
    full_description TEXT,
    objectives TEXT[],
    methodologies TEXT[],
    featured_image_url TEXT,
    official_url TEXT,
    research_area_id UUID REFERENCES research_areas(id) ON DELETE SET NULL,
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('planned', 'active', 'completed', 'on_hold', 'archived')),
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 5. PUBLICATIONS & ARTICLES
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS publications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    pub_type TEXT NOT NULL CHECK (pub_type IN (
        'journal_article', 'review_article', 'book_chapter',
        'conference_proceeding', 'other'
    )),
    authors TEXT NOT NULL,
    journal_or_book TEXT NOT NULL,
    pub_year INT NOT NULL,
    volume TEXT,
    issue TEXT,
    pages TEXT,
    doi TEXT,
    pmid TEXT,
    isbn TEXT,
    abstract TEXT,
    keywords TEXT[],
    cover_image_url TEXT,
    publisher_url TEXT,
    doi_url TEXT,
    impact_factor TEXT,
    citations_count INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 6. TEAM MEMBERS & PRINCIPAL INVESTIGATOR
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS team_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    academic_title TEXT,
    role TEXT NOT NULL,
    qualification TEXT NOT NULL,
    qualification_full TEXT,
    category TEXT NOT NULL CHECK (category IN (
        'pi', 'postdoc', 'phd', 'staff', 'collaborator', 'alumni'
    )),
    avatar_url TEXT NOT NULL,
    summary_bio TEXT NOT NULL,
    full_bio TEXT,
    research_interests TEXT[],
    email TEXT,
    alt_email TEXT,
    external_links JSONB DEFAULT '{}'::jsonb, -- scholarUrl, researchGateUrl, linkedInUrl, etc.
    alumni_period TEXT,
    current_destination TEXT,
    display_order INT DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 7. MEDIA LIBRARY & GALLERY ASSETS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    caption TEXT,
    alt_text TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN (
        'laboratory', 'team', 'conferences', 'research_activities',
        'scientific_illustrations', 'publications_posters', 'general'
    )),
    url TEXT NOT NULL,
    storage_path TEXT,
    file_type TEXT NOT NULL,
    file_size_bytes BIGINT,
    dimensions TEXT,
    is_public BOOLEAN DEFAULT TRUE,
    uploaded_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 8. ACTIVITIES, EVENTS & CONFERENCES
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS activities_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('conference', 'symposium', 'workshop', 'seminar', 'award')),
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    end_date DATE,
    venue TEXT NOT NULL,
    associated_researchers TEXT,
    image_url TEXT,
    registration_url TEXT,
    is_upcoming BOOLEAN DEFAULT FALSE,
    is_featured BOOLEAN DEFAULT FALSE,
    status TEXT NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 9. OPPORTUNITIES & RECRUITMENT
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    opp_type TEXT NOT NULL CHECK (opp_type IN (
        'phd_position', 'postdoc_fellowship', 'project_associate', 'internship', 'other'
    )),
    eligibility TEXT NOT NULL,
    description TEXT NOT NULL,
    qualifications TEXT[],
    application_instructions TEXT NOT NULL,
    application_url TEXT,
    contact_email TEXT NOT NULL,
    opening_date DATE,
    closing_date DATE,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'upcoming', 'archived')),
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 10. SITE SETTINGS & HOMEPAGE CONFIGURATION
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS site_settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    description TEXT,
    updated_by UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- -------------------------------------------------------------------------
-- 11. AUDIT LOGS
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    actor_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    actor_email TEXT NOT NULL,
    action TEXT NOT NULL, -- 'create', 'update', 'delete', 'publish', 'unpublish', 'archive', 'login'
    module TEXT NOT NULL, -- 'announcements', 'projects', 'publications', 'team', etc.
    record_id TEXT,
    record_title TEXT,
    details JSONB DEFAULT '{}'::jsonb,
    ip_address TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- INDEXES FOR HIGH-PERFORMANCE QUERYING & SEARCH
-- =========================================================================
CREATE INDEX IF NOT EXISTS idx_announcements_status ON announcements(status, is_pinned, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_research_areas_order ON research_areas(status, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_publications_search ON publications(status, pub_year DESC, pub_type);
CREATE INDEX IF NOT EXISTS idx_team_category ON team_members(status, category, display_order ASC);
CREATE INDEX IF NOT EXISTS idx_media_category ON media_assets(category, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON activities_events(status, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON opportunities(status, closing_date);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at DESC);

-- =========================================================================
-- ROW-LEVEL SECURITY (RLS) POLICIES
-- Strict access control: Public read-only for published content;
-- Authenticated admins have full CRUD access.
-- =========================================================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE research_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE activities_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- 1. Announcements Policies
CREATE POLICY "Public can view published announcements"
    ON announcements FOR SELECT
    USING (status = 'published' AND (expires_at IS NULL OR expires_at > NOW()));

CREATE POLICY "Admins have full access to announcements"
    ON announcements FOR ALL
    USING (auth.role() = 'authenticated');

-- 2. Research Areas Policies
CREATE POLICY "Public can view published research areas"
    ON research_areas FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins have full access to research areas"
    ON research_areas FOR ALL
    USING (auth.role() = 'authenticated');

-- 3. Projects Policies
CREATE POLICY "Public can view non-archived projects"
    ON projects FOR SELECT
    USING (status IN ('planned', 'active', 'completed'));

CREATE POLICY "Admins have full access to projects"
    ON projects FOR ALL
    USING (auth.role() = 'authenticated');

-- 4. Publications Policies
CREATE POLICY "Public can view published publications"
    ON publications FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins have full access to publications"
    ON publications FOR ALL
    USING (auth.role() = 'authenticated');

-- 5. Team Members Policies
CREATE POLICY "Public can view published team members"
    ON team_members FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins have full access to team members"
    ON team_members FOR ALL
    USING (auth.role() = 'authenticated');

-- 6. Media Assets Policies
CREATE POLICY "Public can view public media"
    ON media_assets FOR SELECT
    USING (is_public = TRUE);

CREATE POLICY "Admins have full access to media"
    ON media_assets FOR ALL
    USING (auth.role() = 'authenticated');

-- 7. Activities Policies
CREATE POLICY "Public can view published events"
    ON activities_events FOR SELECT
    USING (status = 'published');

CREATE POLICY "Admins have full access to events"
    ON activities_events FOR ALL
    USING (auth.role() = 'authenticated');

-- 8. Opportunities Policies
CREATE POLICY "Public can view open or upcoming opportunities"
    ON opportunities FOR SELECT
    USING (status IN ('open', 'upcoming'));

CREATE POLICY "Admins have full access to opportunities"
    ON opportunities FOR ALL
    USING (auth.role() = 'authenticated');

-- 9. Site Settings Policies
CREATE POLICY "Public can view site settings"
    ON site_settings FOR SELECT
    USING (TRUE);

CREATE POLICY "Admins have full access to site settings"
    ON site_settings FOR ALL
    USING (auth.role() = 'authenticated');

-- 10. Audit Logs Policies
CREATE POLICY "Admins can view audit logs"
    ON audit_logs FOR SELECT
    USING (auth.role() = 'authenticated');

CREATE POLICY "Admins can insert audit logs"
    ON audit_logs FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

-- =========================================================================
-- STORAGE BUCKET CONFIGURATION (Supabase Storage)
-- Bucket: neuroxlab-media
-- =========================================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('neuroxlab-media', 'neuroxlab-media', true)
-- ON CONFLICT (id) DO NOTHING;
--
-- CREATE POLICY "Public read media" ON storage.objects FOR SELECT
-- USING (bucket_id = 'neuroxlab-media');
--
-- CREATE POLICY "Admin upload media" ON storage.objects FOR INSERT
-- WITH CHECK (bucket_id = 'neuroxlab-media' AND auth.role() = 'authenticated');
--
-- CREATE POLICY "Admin update media" ON storage.objects FOR UPDATE
-- USING (bucket_id = 'neuroxlab-media' AND auth.role() = 'authenticated');
--
-- CREATE POLICY "Admin delete media" ON storage.objects FOR DELETE
-- USING (bucket_id = 'neuroxlab-media' AND auth.role() = 'authenticated');

