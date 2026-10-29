import React, { useState, useEffect } from 'react';
import { FolderGit2, Plus, Search, Filter, Edit2, Trash2, Calendar, Award } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmDialog from '../components/ConfirmDialog';
import { formatDate } from '../utils/formatters';

export default function ProjectsAdmin() {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    grantNumber: '',
    fundingAgency: '',
    budget: '',
    projectType: 'extramural',
    piName: 'Dr. Venkata Prasuja Nakka',
    coPiName: '',
    collaborators: '',
    startDate: '',
    endDate: '',
    summary: '',
    objectives: '',
    methodologies: '',
    status: 'active',
    isFeatured: false,
    displayOrder: 1
  });
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, item: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const list = await cmsService.getProjects(true);
      setProjects(list);
    } catch (err) {
      console.warn('Error loading projects:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      slug: '',
      grantNumber: '',
      fundingAgency: '',
      budget: '',
      projectType: 'extramural',
      piName: 'Dr. Venkata Prasuja Nakka',
      coPiName: '',
      collaborators: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      summary: '',
      objectives: '',
      methodologies: '',
      status: 'active',
      isFeatured: false,
      displayOrder: projects.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title || '',
      slug: proj.slug || '',
      grantNumber: proj.grantNumber || '',
      fundingAgency: proj.fundingAgency || '',
      budget: proj.budget || '',
      projectType: proj.projectType || 'extramural',
      piName: proj.piName || 'Dr. Venkata Prasuja Nakka',
      coPiName: proj.coPiName || '',
      collaborators: proj.collaborators || '',
      startDate: proj.startDate || '',
      endDate: proj.endDate || '',
      summary: proj.summary || '',
      objectives: Array.isArray(proj.objectives) ? proj.objectives.join('\n') : (proj.objectives || ''),
      methodologies: Array.isArray(proj.methodologies) ? proj.methodologies.join('\n') : (proj.methodologies || ''),
      status: proj.status || 'active',
      isFeatured: !!proj.isFeatured,
      displayOrder: proj.displayOrder || 1
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Project title is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ...formData,
        objectives: formData.objectives ? formData.objectives.split('\n').filter(Boolean) : [],
        methodologies: formData.methodologies ? formData.methodologies.split('\n').filter(Boolean) : []
      };

      if (editingProject) {
        await cmsService.updateProject(editingProject.id, payload, user);
      } else {
        await cmsService.createProject(payload, user);
      }
      setIsModalOpen(false);
      await loadProjects();
    } catch (err) {
      alert(err.message || 'Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.item) return;
    try {
      await cmsService.deleteProject(deleteDialog.item.id, user);
      setDeleteDialog({ isOpen: false, item: null });
      await loadProjects();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  const filteredProjects = projects.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.fundingAgency || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Research Projects &amp; Funding Grants
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Manage extramural, flagship, and collaborative funded projects.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E0B84C]" />
          <span>New Project</span>
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
            placeholder="Search projects by title, agency..."
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
            <option value="all">All Statuses ({projects.length})</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="planned">Planned</option>
            <option value="on_hold">On Hold</option>
          </select>
        </div>
      </div>

      {/* Projects List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading research projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <FolderGit2 className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-600">No projects found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-slate-600 uppercase font-mono font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Project Title &amp; Grant ID</th>
                  <th className="py-3 px-3">Funding Agency</th>
                  <th className="py-3 px-3">Budget</th>
                  <th className="py-3 px-3">Tenure</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProjects.map(proj => (
                  <tr key={proj.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          {proj.projectType === 'flagship' && (
                            <span className="text-[10px] font-mono text-[#8B1E24] bg-red-50 border border-red-200 px-1.5 py-0.2 rounded font-bold">
                              Flagship
                            </span>
                          )}
                          <span className="font-bold text-[#0F2537] text-sm line-clamp-1">
                            {proj.title}
                          </span>
                        </div>
                        <p className="text-slate-500 font-mono text-[11px]">
                          Grant No: {proj.grantNumber || 'N/A'} • PI: {proj.piName}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-700">
                      {proj.fundingAgency || 'Extramural Agency'}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono font-bold text-[#8B1E24]">
                      {proj.budget || '—'}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                      {proj.startDate ? formatDate(proj.startDate) : ''} – {proj.endDate ? formatDate(proj.endDate) : 'Present'}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <StatusBadge status={proj.status} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(proj)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteDialog({ isOpen: true, item: proj })}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Delete Project"
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
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-5 h-5 text-[#8B1E24]" />
                <h3 className="font-serif text-xl font-bold text-[#0F2537]">
                  {editingProject ? 'Edit Project' : 'New Research Project'}
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
                  Official Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Therapeutic potential of nano-formulated SCFAs..."
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Grant / Project ID
                  </label>
                  <input
                    type="text"
                    value={formData.grantNumber}
                    onChange={(e) => setFormData({ ...formData, grantNumber: e.target.value })}
                    placeholder="e.g. EMR/2026/00145"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Funding Agency
                  </label>
                  <input
                    type="text"
                    value={formData.fundingAgency}
                    onChange={(e) => setFormData({ ...formData, fundingAgency: e.target.value })}
                    placeholder="e.g. Extramural Research Council"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Total Budget / Grant
                  </label>
                  <input
                    type="text"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    placeholder="₹38,50,000 INR"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Principal Investigator
                  </label>
                  <input
                    type="text"
                    value={formData.piName}
                    onChange={(e) => setFormData({ ...formData, piName: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Project Summary &amp; Scientific Abstract
                </label>
                <textarea
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  placeholder="Comprehensive scientific abstract..."
                  rows={4}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Specific Aims &amp; Objectives (One aim per line)
                </label>
                <textarea
                  value={formData.objectives}
                  onChange={(e) => setFormData({ ...formData, objectives: e.target.value })}
                  placeholder="1. Physicochemical synthesis of ligand-engineered nanoparticles...&#10;2. Elucidate stroke-induced gut dysbiosis dynamics via 16S metagenomics..."
                  rows={3}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                  >
                    <option value="extramural">Extramural Funded</option>
                    <option value="flagship">Flagship Extramural</option>
                    <option value="intramural">Intramural / IoE</option>
                    <option value="collaborative">Collaborative</option>
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
                    <option value="active">Active (Ongoing)</option>
                    <option value="completed">Completed</option>
                    <option value="planned">Planned</option>
                    <option value="on_hold">On Hold</option>
                  </select>
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
                  {isSubmitting ? 'Saving...' : editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Project"
        message={`Are you sure you want to delete "${deleteDialog.item?.title}"?`}
        confirmText="Delete Project"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, item: null })}
      />
    </div>
  );
}

