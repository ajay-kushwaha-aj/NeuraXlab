import React, { useState, useEffect } from 'react';
import {
  BookOpen, Plus, Search, Filter, Edit2, Trash2, Download,
  Upload, ExternalLink, Check, AlertCircle, FileText
} from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmDialog from '../components/ConfirmDialog';
import { constructDoiUrl, normalizeDoi } from '../utils/formatters';
import { exportPublicationsToCsv, parseCsv } from '../utils/exportImport';

const PUB_TYPES = [
  { id: 'journal_article', label: 'Journal Article' },
  { id: 'review_article', label: 'Review Article' },
  { id: 'book_chapter', label: 'Book Chapter' },
  { id: 'conference_proceeding', label: 'Conference Proceeding' },
  { id: 'other', label: 'Other Scholarly Work' }
];

export default function PublicationsAdmin() {
  const { user } = useAuth();
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPub, setEditingPub] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    pubType: 'journal_article',
    authors: '',
    journalOrBook: '',
    pubYear: new Date().getFullYear(),
    volume: '',
    issue: '',
    pages: '',
    doi: '',
    pmid: '',
    isbn: '',
    abstract: '',
    keywords: '',
    publisherUrl: '',
    impactFactor: '',
    citationsCount: 0,
    isFeatured: false,
    status: 'published'
  });
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, item: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // CSV Import State
  const [isCsvImportOpen, setIsCsvImportOpen] = useState(false);
  const [csvPreviewRecords, setCsvPreviewRecords] = useState([]);
  const [csvError, setCsvError] = useState('');

  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    setLoading(true);
    try {
      const list = await cmsService.getPublications(true);
      setPublications(list);
    } catch (err) {
      console.warn('Error loading publications:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingPub(null);
    setFormData({
      title: '',
      pubType: 'journal_article',
      authors: 'Dr. Venkata Prasuja Nakka',
      journalOrBook: '',
      pubYear: new Date().getFullYear(),
      volume: '',
      issue: '',
      pages: '',
      doi: '',
      pmid: '',
      isbn: '',
      abstract: '',
      keywords: '',
      publisherUrl: '',
      impactFactor: '',
      citationsCount: 0,
      isFeatured: false,
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (pub) => {
    setEditingPub(pub);
    setFormData({
      title: pub.title || '',
      pubType: pub.pubType || 'journal_article',
      authors: Array.isArray(pub.authors) ? pub.authors.join(', ') : (pub.authors || ''),
      journalOrBook: pub.journalOrBook || pub.journal || '',
      pubYear: pub.pubYear || pub.year || new Date().getFullYear(),
      volume: pub.volume || '',
      issue: pub.issue || '',
      pages: pub.pages || '',
      doi: pub.doi || '',
      pmid: pub.pmid || '',
      isbn: pub.isbn || '',
      abstract: pub.abstract || '',
      keywords: Array.isArray(pub.keywords) ? pub.keywords.join(', ') : (pub.keywords || ''),
      publisherUrl: pub.publisherUrl || pub.link || '',
      impactFactor: pub.impactFactor || '',
      citationsCount: pub.citationsCount || pub.citations || 0,
      isFeatured: !!pub.isFeatured,
      status: pub.status || 'published'
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
      const doiUrl = formData.doi ? constructDoiUrl(formData.doi) : '';
      const payload = {
        ...formData,
        doi: normalizeDoi(formData.doi),
        doiUrl,
        pubYear: parseInt(formData.pubYear, 10) || new Date().getFullYear(),
        keywords: formData.keywords ? formData.keywords.split(',').map(s => s.trim()).filter(Boolean) : []
      };

      if (editingPub) {
        await cmsService.updatePublication(editingPub.id, payload, user);
      } else {
        await cmsService.createPublication(payload, user);
      }
      setIsModalOpen(false);
      await loadPublications();
    } catch (err) {
      alert(err.message || 'Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.item) return;
    try {
      await cmsService.deletePublication(deleteDialog.item.id, user);
      setDeleteDialog({ isOpen: false, item: null });
      await loadPublications();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  const handleExportCsv = () => {
    exportPublicationsToCsv(filteredPublications);
  };

  const handleCsvFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const parsed = parseCsv(text);
        if (parsed.length === 0) {
          setCsvError('No valid rows found in CSV file. Ensure header matches expected fields.');
        } else {
          setCsvError('');
          setCsvPreviewRecords(parsed);
        }
      } catch (err) {
        setCsvError('Failed to parse CSV file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const handleConfirmCsvImport = async () => {
    if (!csvPreviewRecords.length) return;
    setIsSubmitting(true);
    try {
      for (const row of csvPreviewRecords) {
        await cmsService.createPublication({
          title: row.title || 'Untitled Publication',
          pubType: row.type || 'journal_article',
          authors: row.authors || 'NeuroXLab',
          journalOrBook: row.journalbook || row.journal || '',
          pubYear: parseInt(row.year, 10) || new Date().getFullYear(),
          volume: row.volume || '',
          issue: row.issue || '',
          pages: row.pages || '',
          doi: row.doi || '',
          pmid: row.pmid || '',
          isbn: row.isbn || '',
          publisherUrl: row.publisherurl || '',
          status: 'published'
        }, user);
      }
      setIsCsvImportOpen(false);
      setCsvPreviewRecords([]);
      await loadPublications();
    } catch (err) {
      alert(err.message || 'CSV Import failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPublications = publications.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.authors || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.journalOrBook || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          String(item.pubYear || '').includes(searchTerm);
    const matchesType = typeFilter === 'all' || item.pubType === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Research Articles &amp; Publications
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Authoritative scientific bibliography, DOI linkages, book chapters, and proceedings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs cursor-pointer"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={() => setIsCsvImportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 shadow-xs cursor-pointer"
            title="Import from CSV"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Import CSV</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-[#E0B84C]" />
            <span>Add Publication</span>
          </button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by title, author, journal, year..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="py-1.5 px-3 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          >
            <option value="all">All Types</option>
            {PUB_TYPES.map(t => (
              <option key={t.id} value={t.id}>{t.label}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="py-1.5 px-3 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Publications Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading scientific publications...
          </div>
        ) : filteredPublications.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-600">No publications found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-slate-600 uppercase font-mono font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Publication Title &amp; Authors</th>
                  <th className="py-3 px-3">Journal / Book</th>
                  <th className="py-3 px-3">Year</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3">DOI / Link</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPublications.map(pub => (
                  <tr key={pub.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 max-w-md">
                      <div className="space-y-1">
                        <span className="font-bold text-[#0F2537] text-sm line-clamp-2">
                          {pub.title}
                        </span>
                        <p className="text-slate-500 line-clamp-1 font-sans text-xs">
                          {Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-serif italic text-slate-700 max-w-xs truncate">
                      {pub.journalOrBook || pub.journal}
                    </td>
                    <td className="py-3 px-3 font-mono font-bold text-slate-700">
                      {pub.pubYear || pub.year}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-600">
                        {pub.pubType?.replace('_', ' ') || 'Article'}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {pub.doi ? (
                        <a
                          href={pub.doiUrl || constructDoiUrl(pub.doi)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[#8B1E24] hover:underline font-mono text-[11px]"
                        >
                          <span>DOI</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : pub.publisherUrl ? (
                        <a
                          href={pub.publisherUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-slate-600 hover:underline text-[11px]"
                        >
                          <span>Link</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <StatusBadge status={pub.status} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(pub)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        title="Edit Record"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteDialog({ isOpen: true, item: pub })}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Delete Record"
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

      {/* Publication Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#8B1E24]" />
                <h3 className="font-serif text-xl font-bold text-[#0F2537]">
                  {editingPub ? 'Edit Publication Record' : 'Add Scholarly Publication'}
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
                  Publication Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Endoplasmic reticulum stress in cerebral ischemia..."
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Full Author List (in publication order) *
                </label>
                <input
                  type="text"
                  value={formData.authors}
                  onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
                  placeholder="V. P. Nakka, P. Prakash-Babu, Raghu Vemuganti..."
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Journal / Publisher / Book Title *
                  </label>
                  <input
                    type="text"
                    value={formData.journalOrBook}
                    onChange={(e) => setFormData({ ...formData, journalOrBook: e.target.value })}
                    placeholder="e.g. Stroke (American Heart Association) or Academic Press"
                    required
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Year *
                  </label>
                  <input
                    type="number"
                    value={formData.pubYear}
                    onChange={(e) => setFormData({ ...formData, pubYear: e.target.value })}
                    required
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Volume
                  </label>
                  <input
                    type="text"
                    value={formData.volume}
                    onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                    placeholder="41"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Issue
                  </label>
                  <input
                    type="text"
                    value={formData.issue}
                    onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
                    placeholder="3"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Page Range
                  </label>
                  <input
                    type="text"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    placeholder="788-794"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    DOI (e.g. 10.1161/STROKEAHA.109.570770)
                  </label>
                  <input
                    type="text"
                    value={formData.doi}
                    onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
                    placeholder="10.1161/STROKEAHA..."
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Publication Type
                  </label>
                  <select
                    value={formData.pubType}
                    onChange={(e) => setFormData({ ...formData, pubType: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  >
                    {PUB_TYPES.map(t => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Abstract
                </label>
                <textarea
                  value={formData.abstract}
                  onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                  placeholder="Abstract text..."
                  rows={3}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Publisher / Direct URL
                  </label>
                  <input
                    type="url"
                    value={formData.publisherUrl}
                    onChange={(e) => setFormData({ ...formData, publisherUrl: e.target.value })}
                    placeholder="https://"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  >
                    <option value="published">Published (Live)</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
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
                  {isSubmitting ? 'Saving...' : editingPub ? 'Save Changes' : 'Add Publication'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CSV Import Modal */}
      {isCsvImportOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#8B1E24]" />
                <h3 className="font-serif text-xl font-bold text-[#0F2537]">
                  Import Publications from CSV
                </h3>
              </div>
              <button
                onClick={() => setIsCsvImportOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-200"
              >
                &times;
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              <p className="text-xs text-slate-600">
                Select a CSV file containing columns: <code>Title, Type, Authors, Journal/Book, Year, DOI</code>. You will have an opportunity to review parsed records before importing.
              </p>

              <div>
                <input
                  type="file"
                  accept=".csv,text/csv"
                  onChange={handleCsvFileChange}
                  className="text-xs text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-[#8B1E24] hover:file:bg-red-100 cursor-pointer"
                />
              </div>

              {csvError && (
                <div className="p-3 rounded-xl bg-red-50 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{csvError}</span>
                </div>
              )}

              {csvPreviewRecords.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 font-mono uppercase">
                    Preview: {csvPreviewRecords.length} records ready to import
                  </span>
                  <div className="max-h-60 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100 text-xs">
                    {csvPreviewRecords.map((r, i) => (
                      <div key={i} className="p-2.5 space-y-0.5">
                        <p className="font-bold text-[#0F2537] truncate">{r.title}</p>
                        <p className="text-slate-500 text-[11px] truncate">{r.authors} • {r.journalbook || r.journal} ({r.year})</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-3 border-t border-slate-100 bg-[#FAF8F5] flex items-center justify-end gap-3">
              <button
                onClick={() => setIsCsvImportOpen(false)}
                className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCsvImport}
                disabled={isSubmitting || csvPreviewRecords.length === 0}
                className="px-5 py-2 text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] rounded-xl shadow-md cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Importing...' : `Import ${csvPreviewRecords.length} Records`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Publication Record"
        message={`Are you sure you want to permanently delete "${deleteDialog.item?.title}"?`}
        confirmText="Delete Record"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, item: null })}
      />
    </div>
  );
}

