import React, { useState, useEffect } from 'react';
import {
  Bell, Plus, Search, Filter, Edit2, Trash2, CheckCircle2,
  XCircle, Archive, Pin, Calendar, ExternalLink, Image as ImageIcon
} from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmDialog from '../components/ConfirmDialog';
import RichTextEditor from '../components/RichTextEditor';
import MediaPickerModal from '../components/MediaPickerModal';
import { formatDate } from '../utils/formatters';

const CATEGORIES = [
  { id: 'general_news', label: 'General News' },
  { id: 'research_highlight', label: 'Research Highlight' },
  { id: 'grant_announcement', label: 'Grant Announcement' },
  { id: 'recruitment', label: 'Recruitment Notice' },
  { id: 'conference', label: 'Conference / Event' },
  { id: 'publication', label: 'Publication Highlight' }
];

export default function AnnouncementsAdmin() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'general_news',
    summary: '',
    bodyHtml: '',
    imageUrl: '',
    destinationUrl: '',
    isPinned: false,
    publishedAt: new Date().toISOString().split('T')[0],
    expiresAt: '',
    status: 'draft'
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Confirm delete dialog
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, item: null });

  // Media picker modal
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const list = await cmsService.getAnnouncements(true);
      setItems(list);
    } catch (err) {
      console.warn('Error loading announcements:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      category: 'general_news',
      summary: '',
      bodyHtml: '',
      imageUrl: '',
      destinationUrl: '',
      isPinned: false,
      publishedAt: new Date().toISOString().split('T')[0],
      expiresAt: '',
      status: 'draft'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      slug: item.slug || '',
      category: item.category || 'general_news',
      summary: item.summary || '',
      bodyHtml: item.bodyHtml || '',
      imageUrl: item.imageUrl || '',
      destinationUrl: item.destinationUrl || '',
      isPinned: !!item.isPinned,
      publishedAt: item.publishedAt ? item.publishedAt.split('T')[0] : '',
      expiresAt: item.expiresAt ? item.expiresAt.split('T')[0] : '',
      status: item.status || 'draft'
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.summary.trim()) errors.summary = 'Summary is required';
    if (!formData.bodyHtml.trim()) errors.bodyHtml = 'Body description is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (editingItem) {
        await cmsService.updateAnnouncement(editingItem.id, formData, user);
      } else {
        await cmsService.createAnnouncement(formData, user);
      }
      setIsModalOpen(false);
      await loadItems();
    } catch (err) {
      alert(err.message || 'Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (item, newStatus) => {
    try {
      await cmsService.updateAnnouncement(item.id, { status: newStatus }, user);
      await loadItems();
    } catch (err) {
      alert(err.message || 'Status change failed.');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.item) return;
    try {
      await cmsService.deleteAnnouncement(deleteDialog.item.id, user);
      setDeleteDialog({ isOpen: false, item: null });
      await loadItems();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.summary || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Announcements &amp; News
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Manage laboratory news, grant updates, recruitment calls, and homepage headlines.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E0B84C]" />
          <span>New Announcement</span>
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
            placeholder="Search announcements..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs text-slate-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-1.5 px-3 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          >
            <option value="all">All Statuses ({items.length})</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Table / List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading announcements...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Bell className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-600">No announcements found</p>
            <p className="text-xs text-slate-400">Click &quot;New Announcement&quot; to create one.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-slate-600 uppercase font-mono font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Title &amp; Summary</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 max-w-md">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          {item.isPinned && (
                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#8B1E24] bg-red-50 px-1.5 py-0.5 rounded border border-red-200 font-bold">
                              <Pin className="w-2.5 h-2.5" /> Pinned
                            </span>
                          )}
                          <span className="font-bold text-[#0F2537] text-sm line-clamp-1">
                            {item.title}
                          </span>
                        </div>
                        <p className="text-slate-500 line-clamp-1 text-xs">{item.summary}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="capitalize px-2 py-0.5 rounded-md bg-slate-100 font-mono text-[10px] text-slate-700">
                        {item.category?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {formatDate(item.publishedAt)}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right space-x-1">
                      {item.status === 'draft' ? (
                        <button
                          onClick={() => handleToggleStatus(item, 'published')}
                          title="Publish"
                          className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleToggleStatus(item, 'draft')}
                          title="Unpublish (Save as Draft)"
                          className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenEdit(item)}
                        title="Edit"
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setDeleteDialog({ isOpen: true, item })}
                        title="Delete"
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#8B1E24]" />
                <h3 className="font-serif text-xl font-bold text-[#0F2537]">
                  {editingItem ? 'Edit Announcement' : 'Create Announcement'}
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
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Flagship Extramural Grant Awarded"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                />
                {formErrors.title && <p className="text-red-600 text-xs mt-1">{formErrors.title}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                  >
                    <option value="draft">Draft (Private)</option>
                    <option value="published">Published (Live)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Short Summary *
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="One or two sentences summarizing the news..."
                  rows={2}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                />
                {formErrors.summary && <p className="text-red-600 text-xs mt-1">{formErrors.summary}</p>}
              </div>

              <RichTextEditor
                label="Full Description / Body HTML *"
                value={formData.bodyHtml}
                onChange={(val) => setFormData({ ...formData, bodyHtml: val })}
                placeholder="Write full announcement details..."
                rows={6}
              />
              {formErrors.bodyHtml && <p className="text-red-600 text-xs mt-1">{formErrors.bodyHtml}</p>}

              {/* Image & URL */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Featured Image URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.imageUrl}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      placeholder="/images/example.jpg"
                      className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                    />
                    <button
                      type="button"
                      onClick={() => setIsMediaPickerOpen(true)}
                      className="px-3 py-1.5 text-xs font-bold text-[#8B1E24] bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 shrink-0"
                    >
                      Browse
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    External / Destination Link
                  </label>
                  <input
                    type="url"
                    value={formData.destinationUrl}
                    onChange={(e) => setFormData({ ...formData, destinationUrl: e.target.value })}
                    placeholder="https://"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                  />
                </div>
              </div>

              {/* Dates & Pinning */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Publication Date
                  </label>
                  <input
                    type="date"
                    value={formData.publishedAt}
                    onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Expiry Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.expiresAt}
                    onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPinned}
                      onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                      className="rounded text-[#8B1E24] focus:ring-[#8B1E24]"
                    />
                    <span className="text-xs font-bold text-slate-700">Pin to Top of Homepage</span>
                  </label>
                </div>
              </div>

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
                  {isSubmitting ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Announcement'}
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
        onSelect={(url) => setFormData(prev => ({ ...prev, imageUrl: url }))}
        currentValue={formData.imageUrl}
        title="Select Featured Announcement Image"
      />

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Announcement"
        message={`Are you sure you want to permanently delete "${deleteDialog.item?.title}"?`}
        confirmText="Delete Announcement"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, item: null })}
      />
    </div>
  );
}

