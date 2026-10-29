import React, { useState, useEffect } from 'react';
import { Activity, Plus, Search, Edit2, Trash2, ArrowUpDown } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmDialog from '../components/ConfirmDialog';
import SeoFields from '../components/SeoFields';

export default function ResearchAreasAdmin() {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    numberLabel: '01',
    leadSummary: '',
    fullDescription: '',
    iconName: 'Activity',
    keyQuestions: '',
    experimentalTools: '',
    keywords: '',
    displayOrder: 1,
    status: 'published',
    seoTitle: '',
    seoDescription: ''
  });
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, item: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);
    try {
      const list = await cmsService.getResearchAreas(true);
      setItems(list);
    } catch (err) {
      console.warn('Error loading research areas:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingItem(null);
    setFormData({
      title: '',
      slug: '',
      numberLabel: `0${items.length + 1}`,
      leadSummary: '',
      fullDescription: '',
      iconName: 'Activity',
      keyQuestions: '',
      experimentalTools: '',
      keywords: '',
      displayOrder: items.length + 1,
      status: 'published',
      seoTitle: '',
      seoDescription: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setFormData({
      title: item.title || '',
      slug: item.slug || '',
      numberLabel: item.numberLabel || '01',
      leadSummary: item.leadSummary || '',
      fullDescription: item.fullDescription || '',
      iconName: item.iconName || 'Activity',
      keyQuestions: Array.isArray(item.keyQuestions) ? item.keyQuestions.join('\n') : (item.keyQuestions || ''),
      experimentalTools: Array.isArray(item.experimentalTools) ? item.experimentalTools.join(', ') : (item.experimentalTools || ''),
      keywords: Array.isArray(item.keywords) ? item.keywords.join(', ') : (item.keywords || ''),
      displayOrder: item.displayOrder || 1,
      status: item.status || 'published',
      seoTitle: item.seoTitle || '',
      seoDescription: item.seoDescription || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a research area title.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        keyQuestions: formData.keyQuestions ? formData.keyQuestions.split('\n').filter(Boolean) : [],
        experimentalTools: formData.experimentalTools ? formData.experimentalTools.split(',').map(s => s.trim()).filter(Boolean) : [],
        keywords: formData.keywords ? formData.keywords.split(',').map(s => s.trim()).filter(Boolean) : []
      };

      if (editingItem) {
        await cmsService.updateResearchArea(editingItem.id, payload, user);
      } else {
        await cmsService.createResearchArea(payload, user);
      }
      setIsModalOpen(false);
      await loadItems();
    } catch (err) {
      alert(err.message || 'Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.item) return;
    try {
      await cmsService.deleteResearchArea(deleteDialog.item.id, user);
      setDeleteDialog({ isOpen: false, item: null });
      await loadItems();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  const filteredItems = items.filter(item =>
    (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.leadSummary || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Research Areas &amp; Scientific Thrusts
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Manage the core scientific research pillars, key questions, and experimental pipelines displayed on the Research page.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E0B84C]" />
          <span>New Research Area</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search research areas..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          />
        </div>
      </div>

      {/* Grid of Areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading ? (
          <div className="col-span-2 py-16 text-center text-slate-400 text-sm">
            Loading research areas...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="col-span-2 py-16 text-center text-slate-400 text-sm">
            No research areas found.
          </div>
        ) : (
          filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#8B1E24]/60 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#8B1E24] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    Pillar {item.numberLabel || '01'}
                  </span>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} />
                    <button
                      onClick={() => handleOpenEdit(item)}
                      className="p-1 text-slate-500 hover:text-[#8B1E24] hover:bg-slate-100 rounded-lg"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteDialog({ isOpen: true, item })}
                      className="p-1 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-serif text-lg font-bold text-[#0F2537]">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-sans">
                  {item.leadSummary}
                </p>

                {item.experimentalTools && item.experimentalTools.length > 0 && (
                  <div className="pt-2 border-t border-slate-100 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                      Experimental Tools:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {item.experimentalTools.map((t, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded text-[11px] bg-[#FAF8F5] text-slate-700 border border-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-100 flex items-center justify-between">
                <span>Display Order: {item.displayOrder}</span>
                <span>Slug: /{item.slug}</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-[#8B1E24]" />
                <h3 className="font-serif text-xl font-bold text-[#0F2537]">
                  {editingItem ? 'Edit Research Area' : 'New Research Area'}
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
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Area Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Microbiota-Gut-Brain Axis in Ischemic Stroke"
                    required
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Label (e.g. 01)
                  </label>
                  <input
                    type="text"
                    value={formData.numberLabel}
                    onChange={(e) => setFormData({ ...formData, numberLabel: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Lead Summary / Overview
                </label>
                <textarea
                  value={formData.leadSummary}
                  onChange={(e) => setFormData({ ...formData, leadSummary: e.target.value })}
                  placeholder="Summary of this scientific direction..."
                  rows={3}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Key Research Questions (One question per line)
                </label>
                <textarea
                  value={formData.keyQuestions}
                  onChange={(e) => setFormData({ ...formData, keyQuestions: e.target.value })}
                  placeholder="How does stroke trigger gut barrier breakdown?&#10;What are the non-coding RNA switches in ischemia?"
                  rows={4}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Experimental Tools &amp; Methods (Comma-separated)
                </label>
                <input
                  type="text"
                  value={formData.experimentalTools}
                  onChange={(e) => setFormData({ ...formData, experimentalTools: e.target.value })}
                  placeholder="16S Metagenomics, MCAO Rodent Models, Western Blotting, Confocal"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.displayOrder}
                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value, 10) || 1 })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <SeoFields
                seoTitle={formData.seoTitle}
                seoDescription={formData.seoDescription}
                keywords={formData.keywords}
                onChangeTitle={(v) => setFormData({ ...formData, seoTitle: v })}
                onChangeDescription={(v) => setFormData({ ...formData, seoDescription: v })}
                onChangeKeywords={(v) => setFormData({ ...formData, keywords: v })}
              />

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
                  {isSubmitting ? 'Saving...' : editingItem ? 'Save Changes' : 'Create Area'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Research Area"
        message={`Are you sure you want to delete "${deleteDialog.item?.title}"?`}
        confirmText="Delete Area"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, item: null })}
      />
    </div>
  );
}

