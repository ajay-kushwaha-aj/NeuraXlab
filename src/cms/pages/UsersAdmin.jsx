import React, { useState, useEffect } from 'react';
import { ShieldCheck, Plus, Trash2, Edit2, Lock, UserCheck, UserX } from 'lucide-react';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import ConfirmDialog from '../components/ConfirmDialog';
import { formatDateTime } from '../utils/formatters';

export default function UsersAdmin() {
  const { user: currentUser } = useAuth();
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    role: 'editor',
    password: ''
  });
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, item: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    loadAdmins();
  }, []);

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const list = await authService.getAdmins();
      setAdmins(list);
    } catch (err) {
      console.warn('Failed to load administrators:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setFormData({
      email: '',
      fullName: '',
      role: 'editor',
      password: ''
    });
    setErrorMsg('');
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.password.trim() || !formData.fullName.trim()) {
      setErrorMsg('All fields are required.');
      return;
    }
    if (formData.password.length < 8) {
      setErrorMsg('Password must be at least 8 characters.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');
    try {
      await authService.createAdmin(formData, currentUser);
      setIsModalOpen(false);
      await loadAdmins();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create administrator.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleActive = async (admin) => {
    if (admin.id === currentUser.id) {
      alert('You cannot deactivate your own active session.');
      return;
    }
    try {
      await authService.updateAdmin(admin.id, { isActive: !admin.isActive }, currentUser);
      await loadAdmins();
    } catch (err) {
      alert(err.message || 'Operation failed.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.item) return;
    try {
      await authService.deleteAdmin(deleteDialog.item.id, currentUser);
      setDeleteDialog({ isOpen: false, item: null });
      await loadAdmins();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Administrators &amp; Role-Based Access Control
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Manage authenticated users with Super Admin (full control) and Content Editor privileges.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E0B84C]" />
          <span>Provision New Administrator</span>
        </button>
      </div>

      {/* Admin Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading administrators...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-slate-600 uppercase font-mono font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Name &amp; Email</th>
                  <th className="py-3 px-3">Role</th>
                  <th className="py-3 px-3">Account Status</th>
                  <th className="py-3 px-3">Last Login</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {admins.map(adm => {
                  const isCurrent = adm.id === currentUser?.id;
                  return (
                    <tr key={adm.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-[#0F2537] text-white flex items-center justify-center font-bold text-xs">
                            {adm.fullName?.charAt(0) || 'A'}
                          </div>
                          <div>
                            <span className="font-bold text-[#0F2537] text-sm block">
                              {adm.fullName} {isCurrent && <span className="text-[10px] text-[#8B1E24] font-mono">(You)</span>}
                            </span>
                            <span className="text-slate-500 font-mono text-xs">{adm.email}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                          adm.role === 'super_admin' ? 'bg-[#8B1E24]/10 text-[#8B1E24]' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {adm.role === 'super_admin' ? 'Super Admin' : 'Editor'}
                        </span>
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap">
                        {adm.isActive ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 text-xs font-semibold">
                            <UserCheck className="w-3.5 h-3.5" /> Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600 text-xs font-semibold">
                            <UserX className="w-3.5 h-3.5" /> Inactive
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-500">
                        {adm.lastLoginAt ? formatDateTime(adm.lastLoginAt) : 'Never'}
                      </td>
                      <td className="py-3 px-4 whitespace-nowrap text-right space-x-1">
                        {!isCurrent && (
                          <>
                            <button
                              onClick={() => handleToggleActive(adm)}
                              className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                              title={adm.isActive ? 'Deactivate' : 'Activate'}
                            >
                              {adm.isActive ? <UserX className="w-4 h-4 text-amber-600" /> : <UserCheck className="w-4 h-4 text-emerald-600" />}
                            </button>
                            <button
                              onClick={() => setDeleteDialog({ isOpen: true, item: adm })}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                              title="Delete Administrator"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#8B1E24]" />
                <h3 className="font-serif text-lg font-bold text-[#0F2537]">
                  Provision Administrator
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                &times;
              </button>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Dr. Jane Doe"
                  required
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Institutional Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="editor@neuroxlab.uohyd.ac.in"
                  required
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Administrative Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
                >
                  <option value="editor">Content Editor (Manage Content &amp; Media)</option>
                  <option value="super_admin">Super Admin (Full Administrative Access)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Temporary Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Minimum 8 characters"
                  required
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] rounded-xl shadow-md cursor-pointer disabled:opacity-60"
                >
                  {isSubmitting ? 'Creating...' : 'Create Account'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Revoke Administrator Access"
        message={`Are you sure you want to delete administrator "${deleteDialog.item?.fullName}" (${deleteDialog.item?.email})?`}
        confirmText="Revoke Access"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, item: null })}
      />
    </div>
  );
}

