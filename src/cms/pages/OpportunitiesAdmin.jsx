import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Search, Filter, Edit2, Trash2, Calendar, Mail } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmDialog from '../components/ConfirmDialog';
import { formatDate } from '../utils/formatters';

const OPP_TYPES = [
  { id: 'phd_position', label: 'Doctoral (Ph.D.) Scholar' },
  { id: 'postdoc_fellowship', label: 'Postdoctoral Fellowship' },
  { id: 'project_associate', label: 'Project Associate / Staff' },
  { id: 'internship', label: 'Master\'s Trainee / Intern' }
];

export default function OpportunitiesAdmin() {
  const { user } = useAuth();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOpp, setEditingOpp] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    oppType: 'phd_position',
    eligibility: '',
    description: '',
    qualifications: '',
    applicationInstructions: '',
    contactEmail: 'nvprasuja@uohyd.ac.in',
    applicationUrl: '',
    openingDate: new Date().toISOString().split('T')[0],
    closingDate: '',
    status: 'open'
  });
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, item: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    setLoading(true);
    try {
      const list = await cmsService.getOpportunities(true);
      setOpportunities(list);
    } catch (err) {
      console.warn('Error loading opportunities:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingOpp(null);
    setFormData({
      title: '',
      oppType: 'phd_position',
      eligibility: 'Valid CSIR-JRF / UGC-JRF / DBT-JRF / ICMR-JRF fellowship required.',
      description: 'Doctoral research investigating molecular stroke mechanisms, organellar stress, and nanomedicine.',
      qualifications: 'M.Sc. in Life Sciences, Biochemistry, Biotechnology, or Neuroscience\nIndependent National Fellowship Award Letter',
      applicationInstructions: 'Email your complete CV, fellowship award letter, and brief statement of research interests to nvprasuja@uohyd.ac.in',
      contactEmail: 'nvprasuja@uohyd.ac.in',
      applicationUrl: '',
      openingDate: new Date().toISOString().split('T')[0],
      closingDate: '',
      status: 'open'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (opp) => {
    setEditingOpp(opp);
    setFormData({
      title: opp.title || '',
      oppType: opp.oppType || 'phd_position',
      eligibility: opp.eligibility || '',
      description: opp.description || '',
      qualifications: Array.isArray(opp.qualifications) ? opp.qualifications.join('\n') : (opp.qualifications || ''),
      applicationInstructions: opp.applicationInstructions || '',
      contactEmail: opp.contactEmail || 'nvprasuja@uohyd.ac.in',
      applicationUrl: opp.applicationUrl || '',
      openingDate: opp.openingDate || '',
      closingDate: opp.closingDate || '',
      status: opp.status || 'open'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Title is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        qualifications: formData.qualifications ? formData.qualifications.split('\n').filter(Boolean) : []
      };

      if (editingOpp) {
        await cmsService.updateOpportunity(editingOpp.id, payload, user);
      } else {
        await cmsService.createOpportunity(payload, user);
      }
      setIsModalOpen(false);
      await loadOpportunities();
    } catch (err) {
      alert(err.message || 'Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.item) return;
    try {
      await cmsService.deleteOpportunity(deleteDialog.item.id, user);
      setDeleteDialog({ isOpen: false, item: null });
      await loadOpportunities();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  const filteredOpportunities = opportunities.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.eligibility || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Recruitment &amp; Research Openings
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Manage doctoral admissions, postdoctoral openings, and project staff vacancies.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E0B84C]" />
          <span>New Opening</span>
        </button>
      </div>

      {/* Search & Filter */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search openings..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-1.5 px-3 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          >
            <option value="all">All Statuses</option>
            <option value="open">Open</option>
            <option value="upcoming">Upcoming</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading opportunities...
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Briefcase className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-600">No recruitment openings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-slate-600 uppercase font-mono font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Position Title</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">Eligibility Requirement</th>
                  <th className="py-3 px-3">Deadline</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredOpportunities.map(opp => (
                  <tr key={opp.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="space-y-0.5">
                        <span className="font-bold text-[#0F2537] text-sm line-clamp-1">
                          {opp.title}
                        </span>
                        <p className="text-slate-500 line-clamp-1 text-xs">{opp.description}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                        {opp.oppType?.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-3 max-w-xs text-slate-600 truncate text-xs">
                      {opp.eligibility}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-600">
                      {opp.closingDate ? formatDate(opp.closingDate) : 'Open Rolling'}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <StatusBadge status={opp.status} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(opp)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        title="Edit Opportunity"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteDialog({ isOpen: true, item: opp })}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Delete Opportunity"
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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-[#8B1E24]" />
                <h3 className="font-serif text-xl font-bold text-[#0F2537]">
                  {editingOpp ? 'Edit Opening' : 'New Research Opening'}
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
                  Position Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Doctoral Research Scholar (CSIR/UGC-JRF)"
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Position Type
                  </label>
                  <select
                    value={formData.oppType}
                    onChange={(e) => setFormData({ ...formData, oppType: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                  >
                    {OPP_TYPES.map(t => (
                      <option key={t.id} value={t.id}>{t.label}</option>
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
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                  >
                    <option value="open">Open (Accepting Applications)</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="closed">Closed / Filled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Eligibility Criteria
                </label>
                <input
                  type="text"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  placeholder="Valid CSIR/UGC-NET JRF or DBT-JRF required..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Required Qualifications (One per line)
                </label>
                <textarea
                  value={formData.qualifications}
                  onChange={(e) => setFormData({ ...formData, qualifications: e.target.value })}
                  rows={3}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Application Instructions
                </label>
                <textarea
                  value={formData.applicationInstructions}
                  onChange={(e) => setFormData({ ...formData, applicationInstructions: e.target.value })}
                  rows={2}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Closing Date (Leave blank for rolling)
                  </label>
                  <input
                    type="date"
                    value={formData.closingDate}
                    onChange={(e) => setFormData({ ...formData, closingDate: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
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
                  {isSubmitting ? 'Saving...' : editingOpp ? 'Save Changes' : 'Create Opening'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Opportunity Record"
        message={`Are you sure you want to delete "${deleteDialog.item?.title}"?`}
        confirmText="Delete Opening"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, item: null })}
      />
    </div>
  );
}

