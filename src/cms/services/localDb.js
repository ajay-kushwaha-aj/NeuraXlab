import { getInitialSeedData } from './initialData';

const DB_NAME = 'neuroxlab_cms_v1';
const DB_VERSION = 1;

const COLLECTIONS = [
  'admin_users',
  'announcements',
  'research_areas',
  'projects',
  'publications',
  'team_members',
  'media_assets',
  'activities_events',
  'opportunities',
  'site_settings',
  'audit_logs'
];

/**
 * Web Crypto API Helper for PBKDF2 / SHA-256 Password Hashing
 */
async function generateSalt() {
  const array = new Uint8Array(16);
  window.crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function hashPassword(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await window.crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  );

  const saltBuffer = enc.encode(salt);
  const derivedKey = await window.crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: saltBuffer,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    { name: 'HMAC', hash: 'SHA-256', length: 256 },
    true,
    ['sign']
  );

  const exported = await window.crypto.subtle.exportKey('raw', derivedKey);
  const hashArray = Array.from(new Uint8Array(exported));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * IndexedDB Connection Manager
 */
function openDatabase() {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser.'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      COLLECTIONS.forEach(colName => {
        if (!db.objectStoreNames.contains(colName)) {
          const keyPath = colName === 'site_settings' ? 'key' : 'id';
          db.createObjectStore(colName, { keyPath });
        }
      });
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

class LocalDatabaseManager {
  constructor() {
    this.isInitialized = false;
    this.initPromise = null;
  }

  async init() {
    if (this.isInitialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        const db = await openDatabase();
        // Check if admin_users or publications is populated
        const existingUsers = await this.getAll('admin_users');
        if (existingUsers.length === 0) {
          await this.seedInitialDatabase();
        }
        this.isInitialized = true;
        db.close();
      } catch (err) {
        console.warn('LocalDB initialization fallback:', err);
      }
    })();

    return this.initPromise;
  }

  async seedInitialDatabase() {
    const seed = getInitialSeedData();
    const now = new Date().toISOString();

    // Create initial Super Admin (Default Administrator)
    const salt = await generateSalt();
    const passwordHash = await hashPassword('NeuroXlab@2026', salt);

    const defaultAdmin = {
      id: 'admin-super-01',
      email: 'nvprasuja@uohyd.ac.in',
      fullName: 'Dr. Venkata Prasuja Nakka',
      role: 'super_admin',
      salt,
      passwordHash,
      isActive: true,
      lastLoginAt: null,
      createdAt: now,
      updatedAt: now
    };

    // Also create secondary lab editor account
    const saltEditor = await generateSalt();
    const editorHash = await hashPassword('NeuroXlabEditor@2026', saltEditor);
    const defaultEditor = {
      id: 'admin-editor-01',
      email: 'editor@neuroxlab.uohyd.ac.in',
      fullName: 'NeuroXLab Content Editor',
      role: 'editor',
      salt: saltEditor,
      passwordHash: editorHash,
      isActive: true,
      lastLoginAt: null,
      createdAt: now,
      updatedAt: now
    };

    await this.putBatch('admin_users', [defaultAdmin, defaultEditor]);
    await this.putBatch('announcements', seed.announcements);
    await this.putBatch('research_areas', seed.researchAreas);
    await this.putBatch('projects', seed.projects);
    await this.putBatch('publications', seed.publications);
    await this.putBatch('team_members', seed.teamMembers);
    await this.putBatch('media_assets', seed.mediaAssets);
    await this.putBatch('activities_events', seed.activitiesEvents);
    await this.putBatch('opportunities', seed.opportunities);

    // Site settings
    const settingsList = Object.entries(seed.siteSettings).map(([key, value]) => ({
      key,
      value,
      updatedAt: now
    }));
    await this.putBatch('site_settings', settingsList);

    // Initial audit log entry
    await this.createAuditLog({
      actorId: 'system',
      actorEmail: 'system@neuroxlab.uohyd.ac.in',
      action: 'init',
      module: 'system',
      recordId: 'seed',
      recordTitle: 'Initial Authentic Database Seed',
      details: { recordCounts: 'Announcements, Pillars, Projects, Publications, Team seeded' }
    });
  }

  async getAll(collection) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(collection, 'readonly');
      const store = tx.objectStore(collection);
      const req = store.getAll();
      req.onsuccess = () => {
        db.close();
        resolve(req.result || []);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  }

  async getById(collection, id) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(collection, 'readonly');
      const store = tx.objectStore(collection);
      const req = store.get(id);
      req.onsuccess = () => {
        db.close();
        resolve(req.result || null);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  }

  async put(collection, record) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(collection, 'readwrite');
      const store = tx.objectStore(collection);
      const req = store.put(record);
      req.onsuccess = () => {
        db.close();
        resolve(record);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  }

  async putBatch(collection, records) {
    if (!records || !records.length) return;
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(collection, 'readwrite');
      const store = tx.objectStore(collection);
      records.forEach(item => store.put(item));
      tx.oncomplete = () => {
        db.close();
        resolve();
      };
      tx.onerror = () => {
        db.close();
        reject(tx.error);
      };
    });
  }

  async delete(collection, id) {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(collection, 'readwrite');
      const store = tx.objectStore(collection);
      const req = store.delete(id);
      req.onsuccess = () => {
        db.close();
        resolve(true);
      };
      req.onerror = () => {
        db.close();
        reject(req.error);
      };
    });
  }

  async createAuditLog({ actorId, actorEmail, action, module, recordId, recordTitle, details }) {
    const logEntry = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      actorId: actorId || 'unknown',
      actorEmail: actorEmail || 'system',
      action,
      module,
      recordId: recordId || '',
      recordTitle: recordTitle || '',
      details: details || {},
      createdAt: new Date().toISOString()
    };
    return this.put('audit_logs', logEntry);
  }

  async verifyCredentials(email, rawPassword) {
    await this.init();
    const users = await this.getAll('admin_users');
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user || !user.isActive) return null;

    const hash = await hashPassword(rawPassword, user.salt);
    if (hash === user.passwordHash) {
      // Update lastLoginAt
      user.lastLoginAt = new Date().toISOString();
      await this.put('admin_users', user);
      await this.createAuditLog({
        actorId: user.id,
        actorEmail: user.email,
        action: 'login',
        module: 'auth',
        recordId: user.id,
        recordTitle: `Successful login: ${user.fullName}`,
        details: { role: user.role }
      });
      // Return user without passwordHash & salt
      const { salt, passwordHash: _, ...safeUser } = user;
      return safeUser;
    }
    return null;
  }

  async createUser({ email, fullName, role, password, creatorUser }) {
    await this.init();
    const users = await this.getAll('admin_users');
    const exists = users.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (exists) {
      throw new Error('An administrator account with this email already exists.');
    }

    const salt = await generateSalt();
    const passwordHash = await hashPassword(password, salt);
    const newUser = {
      id: `admin-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      email: email.trim().toLowerCase(),
      fullName: fullName.trim(),
      role: role || 'editor',
      salt,
      passwordHash,
      isActive: true,
      lastLoginAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    await this.put('admin_users', newUser);
    await this.createAuditLog({
      actorId: creatorUser?.id || 'admin',
      actorEmail: creatorUser?.email || 'admin',
      action: 'create',
      module: 'admin_users',
      recordId: newUser.id,
      recordTitle: `Created administrator: ${newUser.fullName} (${newUser.role})`,
      details: { email: newUser.email, role: newUser.role }
    });

    const { salt: _, passwordHash: __, ...safeUser } = newUser;
    return safeUser;
  }

  async resetPassword(email, newPassword) {
    await this.init();
    const users = await this.getAll('admin_users');
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user) throw new Error('No administrator found with this email.');

    const salt = await generateSalt();
    const passwordHash = await hashPassword(newPassword, salt);
    user.salt = salt;
    user.passwordHash = passwordHash;
    user.updatedAt = new Date().toISOString();

    await this.put('admin_users', user);
    await this.createAuditLog({
      actorId: user.id,
      actorEmail: user.email,
      action: 'update',
      module: 'auth',
      recordId: user.id,
      recordTitle: `Password updated for ${user.fullName}`,
      details: {}
    });
    return true;
  }

  async exportFullDatabase() {
    await this.init();
    const exportData = {
      exportedAt: new Date().toISOString(),
      version: '1.0.0',
      database: {}
    };

    for (const col of COLLECTIONS) {
      if (col === 'admin_users') {
        // Redact password hash and salt for security
        const users = await this.getAll(col);
        exportData.database[col] = users.map(u => {
          const { salt: _, passwordHash: __, ...safe } = u;
          return safe;
        });
      } else {
        exportData.database[col] = await this.getAll(col);
      }
    }

    return exportData;
  }

  async importFullDatabase(data, currentUser) {
    if (!data || !data.database) {
      throw new Error('Invalid database backup JSON format.');
    }

    for (const col of COLLECTIONS) {
      if (col !== 'admin_users' && Array.isArray(data.database[col])) {
        await this.putBatch(col, data.database[col]);
      }
    }

    await this.createAuditLog({
      actorId: currentUser?.id || 'admin',
      actorEmail: currentUser?.email || 'admin',
      action: 'import',
      module: 'system',
      recordId: 'full_import',
      recordTitle: 'Database Imported from Backup',
      details: { timestamp: data.exportedAt }
    });

    return true;
  }
}

export const localDb = new LocalDatabaseManager();

