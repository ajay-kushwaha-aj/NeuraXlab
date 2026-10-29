import React, { useState, useEffect } from 'react';
import { X, Upload, Search, Image as ImageIcon, Check } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import { formatBytes } from '../utils/formatters';

export default function MediaPickerModal({
  isOpen,
  onClose,
  onSelect,
  currentValue = '',
  title = 'Select Media Asset'
}) {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (isOpen) {
      loadAssets();
    }
  }, [isOpen]);

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
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Only image files (JPEG, PNG, WebP, SVG) are permitted.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setUploadError('File size exceeds 10MB limit.');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    try {
      const uploaded = await cmsService.uploadMedia(
        file,
        {
          title: file.name.replace(/\.[^/.]+$/, ''),
          category: 'general',
          altText: file.name
        },
        user
      );
      setAssets(prev => [uploaded, ...prev]);
      onSelect(uploaded.url);
      onClose();
    } catch (err) {
      setUploadError(err.message || 'Failed to upload media.');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  const filteredAssets = assets.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.altText || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[85vh] flex flex-col border border-slate-200 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-[#8B1E24]" />
            <h3 className="font-serif text-xl font-bold text-[#0F2537]">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar: Search, Filters, Inline Upload */}
        <div className="p-4 sm:p-6 border-b border-slate-100 bg-[#FAF8F5] flex flex-col sm:flex-row items-center gap-3 justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto flex-1">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search media..."
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="py-1.5 px-3 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
            >
              <option value="all">All Categories</option>
              <option value="team">Team Portraits</option>
              <option value="scientific_illustrations">Scientific Figures</option>
              <option value="conferences">Conferences</option>
              <option value="laboratory">Laboratory</option>
              <option value="general">General</option>
            </select>
          </div>

          <div>
            <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-sm cursor-pointer transition-all active:scale-95">
              <Upload className="w-3.5 h-3.5" />
              <span>{isUploading ? 'Uploading...' : 'Upload Image'}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={isUploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {uploadError && (
          <div className="px-6 py-2 bg-red-50 text-red-700 text-xs font-medium border-b border-red-100">
            {uploadError}
          </div>
        )}

        {/* Media Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="py-16 text-center text-slate-400 text-sm">
              Loading media library...
            </div>
          ) : filteredAssets.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
              <p className="text-sm font-semibold text-slate-600">No media assets found</p>
              <p className="text-xs text-slate-400">Upload a new image using the button above.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredAssets.map(item => {
                const isSelected = currentValue === item.url;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelect(item.url);
                      onClose();
                    }}
                    className={`group relative rounded-2xl border overflow-hidden cursor-pointer transition-all ${
                      isSelected
                        ? 'border-2 border-[#8B1E24] ring-2 ring-[#8B1E24]/20 shadow-md'
                        : 'border-slate-200 hover:border-[#8B1E24]/60 hover:shadow-md'
                    }`}
                  >
                    <div className="aspect-square bg-slate-100 overflow-hidden relative">
                      <img
                        src={item.url}
                        alt={item.altText || item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#8B1E24] text-white flex items-center justify-center shadow-md">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <div className="p-2.5 bg-white border-t border-slate-100 space-y-0.5">
                      <p className="text-xs font-semibold text-[#0F2537] truncate" title={item.title}>
                        {item.title}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                        <span className="capitalize">{item.category}</span>
                        <span>{formatBytes(item.fileSizeBytes)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-100 bg-[#FAF8F5] flex items-center justify-between text-xs text-slate-500">
          <span>{filteredAssets.length} asset{filteredAssets.length !== 1 ? 's' : ''} available</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

