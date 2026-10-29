import React, { useState, useEffect } from 'react';
import {
  Users, Plus, Search, Filter, Edit2, Trash2, Mail,
  ExternalLink, GraduationCap, Image as ImageIcon, CheckCircle2
} from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmDialog from '../components/ConfirmDialog';
import MediaPickerModal from '../components/MediaPickerModal';

const CATEGORIES = [
  { id: 'pi', label: 'Principal Investigator / Lab Director' },
  { id: 'postdoc', label: 'Postdoctoral Research Fellow' },
  { id: 'phd', label: 'Doctoral Scholar (Ph.D.)' },
  { id: 'staff', label: 'Project Associate / Staff' },
  { id: 'collaborator', label: 'Collaborator' },
  { id: 'alumni', label: 'Alumni Network' }
];

export default function TeamAdmin() {
  const { user } = useAuth();
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    academicTitle: '',
    qualification: '',
    qualificationFull: '',
    category: 'phd',
    avatarUrl: '/images/default_avatar.jpg',
    summaryBio: '',
    fullBio: '',
    researchInterests: '',
    email: '',
    altEmail: '',
    scholarUrl: '',
    researchGateUrl: '',
    linkedInUrl: '',
    scopusUrl: '',
    alumniPeriod: '',
    currentDestination: '',
    displayOrder: 1,
    status: 'published'
  });
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, item: null });
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadMembers();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const list = await cmsService.getTeamMembers(true);
      setMembers(list);
    } catch (err) {
      console.warn('Error loading team members:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingMember(null);
    setFormData({
      fullName: '',
      role: 'Doctoral Scholar',
      academicTitle: '',
      qualification: 'M.Sc.',
      qualificationFull: 'M.Sc. in Life Sciences',
      category: 'phd',
      avatarUrl: '/images/default_avatar.jpg',
      summaryBio: '',
      fullBio: '',
      researchInterests: '',
      email: '',
      altEmail: '',
      scholarUrl: '',
      researchGateUrl: '',
      linkedInUrl: '',
      scopusUrl: '',
      alumniPeriod: '',
      currentDestination: '',
      displayOrder: members.length + 1,
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (m) => {
    setEditingMember(m);
    setFormData({
      fullName: m.fullName || '',
      role: m.role || '',
      academicTitle: m.academicTitle || '',
      qualification: m.qualification || '',
      qualificationFull: m.qualificationFull || '',
      category: m.category || 'phd',
      avatarUrl: m.avatarUrl || '/images/default_avatar.jpg',
      summaryBio: m.summaryBio || '',
      fullBio: m.fullBio || '',
      researchInterests: Array.isArray(m.researchInterests) ? m.researchInterests.join(', ') : (m.researchInterests || ''),
      email: m.email || '',
      altEmail: m.altEmail || '',
      scholarUrl: m.externalLinks?.googleScholar || '',
      researchGateUrl: m.externalLinks?.researchGate || '',
      linkedInUrl: m.externalLinks?.linkedIn || '',
      scopusUrl: m.externalLinks?.scopus || '',
      alumniPeriod: m.alumniPeriod || '',
      currentDestination: m.currentDestination || '',
      displayOrder: m.displayOrder || 1,
      status: m.status || 'published'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      alert('Full Name is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        researchInterests: formData.researchInterests ? formData.researchInterests.split(',').map(s => s.trim()).filter(Boolean) : [],
        externalLinks: {
          googleScholar: formData.scholarUrl,
          researchGate: formData.researchGateUrl,
          linkedIn: formData.linkedInUrl,
          scopus: formData.scopusUrl
        }
      };

      if (editingMember) {
        await cmsService.updateTeamMember(editingMember.id, payload, user);
      } else {
        await cmsService.createTeamMember(payload, user);
      }
      setIsModalOpen(false);
      await loadMembers();
    } catch (err) {
      alert(err.message || 'Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.item) return;
    try {
      await cmsService.deleteTeamMember(deleteDialog.item.id, user);
      setDeleteDialog({ isOpen: false, item: null });
      await loadMembers();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  const filteredMembers = members.filter(item => {
    const matchesSearch = (item.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.role || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Team Members &amp; Principal Investigator
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Manage lab leadership, postdoctoral fellows, doctoral scholars, project associates, and alumni.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E0B84C]" />
          <span>Add Team Member</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, role, email..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="py-1.5 px-3 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          >
            <option value="all">All Categories</option>
            {CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Team Members */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full py-16 text-center text-slate-400 text-sm">
            Loading team dossiers...
          </div>
        ) : filteredMembers.length === 0 ? (
          <div className="col-span-full py-16 text-center text-slate-400 text-sm">
            No team members found.
          </div>
        ) : (
          filteredMembers.map(m => (
            <div
              key={m.id}
              className={`bg-white rounded-3xl p-5 border shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                m.category === 'pi'
                  ? 'border-2 border-[#C59B27]/70 bg-gradient-to-b from-[#FAF8F5] to-white'
                  : 'border-slate-200 hover:border-[#8B1E24]/60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-20 rounded-xl overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                    <img
                      src={m.avatarUrl}
                      alt={m.fullName}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#8B1E24] bg-red-50 px-2 py-0.5 rounded">
                        {m.qualification}
                      </span>
                      <StatusBadge status={m.status} />
                    </div>
                    <h3 className="font-serif text-base font-bold text-[#0F2537] truncate">
                      {m.fullName}
                    </h3>
                    <p className="text-xs text-slate-600 truncate">{m.role}</p>
                    {m.email && (
                      <p className="text-[11px] font-mono text-slate-500 truncate flex items-center gap-1">
                        <Mail className="w-3 h-3 text-slate-400" />
                        <span>{m.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-sans">
                  {m.summaryBio || m.fullBio}
                </p>

                {m.researchInterests && m.researchInterests.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {m.researchInterests.slice(0, 3).map((tag, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-[#FAF8F5] text-slate-600 border border-slate-200">
                        {tag}
                      </span>
                    ))}
                    {m.researchInterests.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{m.researchInterests.length - 3} more
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-mono capitalize text-slate-400">
                  {m.category?.replace('_', ' ')}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(m)}
                    className="p-1.5 text-slate-600 hover:text-[#8B1E24] hover:bg-slate-100 rounded-lg cursor-pointer"
                    title="Edit Member"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  {m.category !== 'pi' && (
                    <button
                      onClick={() => setDeleteDialog({ isOpen: true, item: m })}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      title="Delete Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[#8B1E24]" />
                <h3 className="font-serif text-xl font-bold text-[#0F2537]">
                  {editingMember ? `Edit ${editingMember.fullName}` : 'Add New Team Member'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-200"
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Dr. Suvarna Annapureddy"
                    required
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    disabled={editingMember?.category === 'pi'}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Role / Designation *
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="Postdoctoral Fellow"
                    required
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Qualification (Short)
                  </label>
                  <input
                    type="text"
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    placeholder="Ph.D."
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Portrait & Media Picker */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Profile Photograph / Portrait URL
                </label>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shrink-0">
                    <img
                      src={formData.avatarUrl || '/images/default_avatar.jpg'}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="text"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    placeholder="/images/example.jpg"
                    className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setIsMediaPickerOpen(true)}
                    className="px-3.5 py-2 text-xs font-bold text-[#8B1E24] bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 shrink-0 cursor-pointer"
                  >
                    Select Portrait
                  </button>
                </div>
              </div>

              {/* Biographies */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Concise Summary Bio (Shown by default on cards)
                </label>
                <textarea
                  value={formData.summaryBio}
                  onChange={(e) => setFormData({ ...formData, summaryBio: e.target.value })}
                  placeholder="2-3 sentence overview..."
                  rows={2}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Full Research Biography (Expanded on click)
                </label>
                <textarea
                  value={formData.fullBio}
                  onChange={(e) => setFormData({ ...formData, fullBio: e.target.value })}
                  placeholder="Comprehensive scientific background, techniques, and projects..."
                  rows={4}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Research Interests &amp; Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={formData.researchInterests}
                  onChange={(e) => setFormData({ ...formData, researchInterests: e.target.value })}
                  placeholder="In Vivo MCAO, Neuroinflammation, ER Stress, Metagenomics"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              {/* Contact & Emails */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Institutional Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="scholar@uohyd.ac.in"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Personal / Alternative Email
                  </label>
                  <input
                    type="email"
                    value={formData.altEmail}
                    onChange={(e) => setFormData({ ...formData, altEmail: e.target.value })}
                    placeholder="scholar@gmail.com"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Alumni Specific Fields */}
              {formData.category === 'alumni' && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-900 font-mono uppercase">
                    <GraduationCap className="w-4 h-4" />
                    <span>Alumni Specific Details</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-amber-900 mb-1">
                        Graduation Period
                      </label>
                      <input
                        type="text"
                        value={formData.alumniPeriod}
                        onChange={(e) => setFormData({ ...formData, alumniPeriod: e.target.value })}
                        placeholder="e.g. Ph.D. Awarded 2024"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-xl"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-amber-900 mb-1">
                        Current Destination / Placement
                      </label>
                      <input
                        type="text"
                        value={formData.currentDestination}
                        onChange={(e) => setFormData({ ...formData, currentDestination: e.target.value })}
                        placeholder="e.g. Postdoctoral Fellow, Max Planck Institute"
                        className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
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
                  {isSubmitting ? 'Saving...' : editingMember ? 'Save Changes' : 'Create Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Media Picker Modal */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        onSelect={(url) => setFormData(prev => ({ ...prev, avatarUrl: url }))}
        currentValue={formData.avatarUrl}
        title="Select Team Member Portrait"
      />

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Team Member"
        message={`Are you sure you want to remove "${deleteDialog.item?.fullName}" from the team directory?`}
        confirmText="Remove Member"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, item: null })}
      />
    </div>
  );
}

