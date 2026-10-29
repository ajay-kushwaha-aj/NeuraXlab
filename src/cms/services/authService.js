import { supabase, isSupabaseConfigured } from './supabaseClient';
import { localDb } from './localDb';

const SESSION_KEY = 'neuroxlab_admin_session';

export const authService = {
  /**
   * Returns current active administrator session or null
   */
  async getSession() {
    if (isSupabaseConfigured) {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) return null;
        
        // Fetch role from admin_users profile table
        const { data: profile } = await supabase
          .from('admin_users')
          .select('*')
          .eq('email', session.user.email)
          .single();

        return {
          user: {
            id: session.user.id,
            email: session.user.email,
            fullName: profile?.full_name || session.user.user_metadata?.full_name || 'Admin',
            role: profile?.role || 'editor'
          },
          token: session.access_token,
          expiresAt: session.expires_at ? new Date(session.expires_at * 1000).toISOString() : null
        };
      } catch (err) {
        console.warn('Supabase getSession error:', err);
      }
    }

    // Local / fallback session
    try {
      const stored = localStorage.getItem(SESSION_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (new Date(parsed.expiresAt) < new Date()) {
        localStorage.removeItem(SESSION_KEY);
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  },

  /**
   * Log in with Email and Password
   */
  async login(email, password) {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password
      });
      if (error) throw error;

      const { data: profile } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', data.user.email)
        .single();

      const sessionObj = {
        user: {
          id: data.user.id,
          email: data.user.email,
          fullName: profile?.full_name || 'Admin',
          role: profile?.role || 'super_admin'
        },
        token: data.session.access_token,
        expiresAt: new Date(data.session.expires_at * 1000).toISOString()
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj));
      return sessionObj;
    }

    // Local DB authentication
    const user = await localDb.verifyCredentials(email, password);
    if (!user) {
      throw new Error('Invalid email address or password.');
    }

    // Create session valid for 12 hours
    const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000).toISOString();
    const sessionObj = {
      user,
      token: `local-token-${Date.now()}-${Math.random().toString(36).substring(2)}`,
      expiresAt
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionObj));
    return sessionObj;
  },

  /**
   * Sign out current administrator
   */
  async logout(currentUser) {
    if (currentUser) {
      try {
        await localDb.createAuditLog({
          actorId: currentUser.id,
          actorEmail: currentUser.email,
          action: 'logout',
          module: 'auth',
          recordId: currentUser.id,
          recordTitle: `Logged out: ${currentUser.fullName}`,
          details: {}
        });
      } catch (err) {
        console.warn('Logout audit log error:', err);
      }
    }

    if (isSupabaseConfigured) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.warn('Supabase signOut error:', err);
      }
    }

    localStorage.removeItem(SESSION_KEY);
  },

  /**
   * Request password reset
   */
  async requestPasswordReset(email) {
    if (isSupabaseConfigured) {
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo: `${window.location.origin}/admin/reset-password`
      });
      if (error) throw error;
      return true;
    }

    // Local DB check
    const users = await localDb.getAll('admin_users');
    const exists = users.some(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!exists) {
      throw new Error('No administrator registered with this email.');
    }
    return true;
  },

  /**
   * Reset password with new password
   */
  async updatePassword(email, newPassword) {
    return localDb.resetPassword(email, newPassword);
  },

  /**
   * Get all registered administrators (Super Admin only)
   */
  async getAdmins() {
    await localDb.init();
    const users = await localDb.getAll('admin_users');
    return users.map(u => {
      const { salt: _, passwordHash: __, ...safe } = u;
      return safe;
    });
  },

  /**
   * Create new administrator (Super Admin only)
   */
  async createAdmin(payload, currentUser) {
    return localDb.createUser({ ...payload, creatorUser: currentUser });
  },

  /**
   * Toggle administrator active status or update role
   */
  async updateAdmin(id, updates, currentUser) {
    await localDb.init();
    const user = await localDb.getById('admin_users', id);
    if (!user) throw new Error('Administrator not found.');

    const updated = {
      ...user,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    await localDb.put('admin_users', updated);

    await localDb.createAuditLog({
      actorId: currentUser?.id,
      actorEmail: currentUser?.email,
      action: 'update',
      module: 'admin_users',
      recordId: id,
      recordTitle: `Updated admin: ${user.fullName}`,
      details: updates
    });

    const { salt: _, passwordHash: __, ...safe } = updated;
    return safe;
  },

  /**
   * Delete administrator
   */
  async deleteAdmin(id, currentUser) {
    if (id === currentUser?.id) {
      throw new Error('You cannot delete your own active administrator account.');
    }
    const user = await localDb.getById('admin_users', id);
    await localDb.delete('admin_users', id);
    await localDb.createAuditLog({
      actorId: currentUser?.id,
      actorEmail: currentUser?.email,
      action: 'delete',
      module: 'admin_users',
      recordId: id,
      recordTitle: `Deleted admin: ${user?.fullName || id}`,
      details: {}
    });
    return true;
  }
};

