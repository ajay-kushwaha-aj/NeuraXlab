import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon, Upload, Search, Filter, Trash2,
  Copy, Check, ExternalLink, AlertCircle, FileText
} from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import { formatBytes, formatDateTime } from '../utils/formatters';
import ConfirmDialog from '../components/ConfirmDialog';

const MEDIA_CATEGORIES = [
  { id: 'all', label: 'All Assets' },
  { id: 'team', label: 'Team Portraits' },
  { id: 'scientific_illustrations', label: 'Scientific Illustrations' },
  { id: 'conferences', label: 'Conferences & Events' },
  { id: 'laboratory', label: 'Laboratory & Equipment' },
  { id: 'publications_posters', label: 'Publications & Posters' },
  { id: 'general', label: 'General Insignia' }
];

export default function MediaAdmin() {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [copiedId, setCopiedId] = useState(null);

  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, item: null });

  useEffect(() => {
    loadAssets();
  }, []);

  const loadAssets = async () => {
    setLoading(true);
    try {
      const list = await cmsService.getMediaAssets();
      setAssets(list);
    } catch (err) {
      console.warn('Failed to load media assets:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadError('');

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (!file.type.startsWith('image/')) {
          throw new Error(`File ${file.name} is not an image.`);
        }
        await cmsService.uploadMedia(
          file,
          {
            title: file.name.replace(/\.[^/.]+$/, ''),
            category: selectedCategory !== 'all' ? selectedCategory : 'general',
            altText: file.name
          },
          user
        );
      }
      await loadAssets();
    } catch (err) {
      setUploadError(err.message || 'Media upload failed.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCopyUrl = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.item) return;
    try {
      await cmsService.deleteMedia(deleteDialog.item.id, user);
      setDeleteDialog({ isOpen: false, item: null });
      await loadAssets();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  const filteredAssets = assets.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.altText || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Media Library &amp; Gallery Assets
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Central repository for figures, portraits, conference photos, and laboratory illustrations.
          </p>
        </div>

        <div>
          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-sm transition-all active:scale-95 cursor-pointer">
            <Upload className="w-4 h-4 text-[#E0B84C]" />
            <span>{isUploading ? 'Uploading...' : 'Upload Media Files'}</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              disabled={isUploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {uploadError && (
        <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search media by title or alt text..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="py-1.5 px-3 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
          >
            {MEDIA_CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Media Grid */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading media assets...
          </div>
        ) : filteredAssets.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-600">No media assets found</p>
            <p className="text-xs text-slate-400">Click &quot;Upload Media Files&quot; to upload images.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredAssets.map(item => (
              <div
                key={item.id}
                className="group relative rounded-2xl border border-slate-200 hover:border-[#8B1E24] overflow-hidden bg-[#FAF8F5] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="aspect-square bg-slate-100 overflow-hidden relative">
                  <img
                    src={item.url}
                    alt={item.altText || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleCopyUrl(item.url, item.id)}
                      className="p-2 rounded-xl bg-white/90 text-slate-800 hover:bg-white transition-colors cursor-pointer"
                      title="Copy URL"
                    >
                      {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl bg-white/90 text-slate-800 hover:bg-white transition-colors"
                      title="View Full Size"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setDeleteDialog({ isOpen: true, item })}
                      className="p-2 rounded-xl bg-red-600/90 text-white hover:bg-red-700 transition-colors cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-white border-t border-slate-100 space-y-1">
                  <p className="text-xs font-bold text-[#0F2537] truncate" title={item.title}>
                    {item.title}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                    <span className="capitalize">{item.category?.replace('_', ' ')}</span>
                    <span>{formatBytes(item.fileSizeBytes)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Media Asset"
        message={`Are you sure you want to delete "${deleteDialog.item?.title}"? This cannot be undone.`}
        confirmText="Delete Asset"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, item: null })}
      />
    </div>
  );
}

