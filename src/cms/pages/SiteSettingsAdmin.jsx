import React, { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Globe, Sparkles, Building, Phone, Mail } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import SeoFields from '../components/SeoFields';

export default function SiteSettingsAdmin() {
  const { user } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      const s = await cmsService.getSettings();
      setSettings(s);
    } catch (err) {
      console.warn('Failed to load site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      for (const [key, val] of Object.entries(settings)) {
        await cmsService.updateSettings(key, val, user);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      alert(err.message || 'Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-slate-400 text-sm">
        Loading site configuration...
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-4xl animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Site Settings &amp; Homepage Configuration
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Customize homepage hero text, laboratory contact information, institutional address, and global SEO.
          </p>
        </div>
        <button
          type="submit"
          disabled={isSaving}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-md transition-all active:scale-95 cursor-pointer disabled:opacity-60"
        >
          <Save className="w-4 h-4 text-[#E0B84C]" />
          <span>{isSaving ? 'Saving Changes...' : 'Save All Settings'}</span>
        </button>
      </div>

      {saveSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Settings saved and published successfully! Changes are live across the public site.</span>
        </div>
      )}

      {/* General Institutional Details */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#8B1E24] uppercase border-b border-slate-100 pb-2">
          <Building className="w-4 h-4 text-[#C59B27]" />
          <span>General Laboratory &amp; Institutional Identification</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
              Laboratory Name
            </label>
            <input
              type="text"
              value={settings?.general?.siteName || ''}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings?.general, siteName: e.target.value }
              })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
              Scientific Tagline
            </label>
            <input
              type="text"
              value={settings?.general?.tagline || ''}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings?.general, tagline: e.target.value }
              })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
            Laboratory Motto
          </label>
          <input
            type="text"
            value={settings?.general?.motto || ''}
            onChange={(e) => setSettings({
              ...settings,
              general: { ...settings?.general, motto: e.target.value }
            })}
            className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
              Room / Office
            </label>
            <input
              type="text"
              value={settings?.general?.roomNumber || ''}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings?.general, roomNumber: e.target.value }
              })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
              Institutional Email
            </label>
            <input
              type="email"
              value={settings?.general?.contactEmail || ''}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings?.general, contactEmail: e.target.value }
              })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
              Phone
            </label>
            <input
              type="text"
              value={settings?.general?.contactPhone || ''}
              onChange={(e) => setSettings({
                ...settings,
                general: { ...settings?.general, contactPhone: e.target.value }
              })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
            Formal Postal Address
          </label>
          <textarea
            value={settings?.general?.formalAddress || ''}
            onChange={(e) => setSettings({
              ...settings,
              general: { ...settings?.general, formalAddress: e.target.value }
            })}
            rows={2}
            className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
          />
        </div>
      </div>

      {/* Hero Section Texts */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#8B1E24] uppercase border-b border-slate-100 pb-2">
          <Sparkles className="w-4 h-4 text-[#C59B27]" />
          <span>Interactive Hero &amp; Mission Statement</span>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
            Hero Eyebrow Text
          </label>
          <input
            type="text"
            value={settings?.hero?.eyebrow || ''}
            onChange={(e) => setSettings({
              ...settings,
              hero: { ...settings?.hero, eyebrow: e.target.value }
            })}
            className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
            Main Mission Statement / Paragraph
          </label>
          <textarea
            value={settings?.hero?.description || ''}
            onChange={(e) => setSettings({
              ...settings,
              hero: { ...settings?.hero, description: e.target.value }
            })}
            rows={4}
            className="w-full px-3.5 py-2 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
          />
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={settings?.hero?.showInteractiveNeuron ?? true}
              onChange={(e) => setSettings({
                ...settings,
                hero: { ...settings?.hero, showInteractiveNeuron: e.target.checked }
              })}
              className="rounded text-[#8B1E24]"
            />
            <span className="text-xs font-bold text-slate-700">Enable Interactive Neuron Canvas Hero Animation</span>
          </label>
        </div>
      </div>

      {/* Flagship Statistics */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#8B1E24] uppercase border-b border-slate-100 pb-2">
          <Globe className="w-4 h-4 text-[#C59B27]" />
          <span>Academic Metrics Displayed on Public Pages</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
              Citations
            </label>
            <input
              type="text"
              value={settings?.metrics?.citations || '1,900+'}
              onChange={(e) => setSettings({
                ...settings,
                metrics: { ...settings?.metrics, citations: e.target.value }
              })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
              h-index
            </label>
            <input
              type="text"
              value={settings?.metrics?.hIndex || '12+'}
              onChange={(e) => setSettings({
                ...settings,
                metrics: { ...settings?.metrics, hIndex: e.target.value }
              })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
              i10-index
            </label>
            <input
              type="text"
              value={settings?.metrics?.i10Index || '15+'}
              onChange={(e) => setSettings({
                ...settings,
                metrics: { ...settings?.metrics, i10Index: e.target.value }
              })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
              Flagship Grant
            </label>
            <input
              type="text"
              value={settings?.metrics?.flagshipGrant || '₹38.5 Lakhs'}
              onChange={(e) => setSettings({
                ...settings,
                metrics: { ...settings?.metrics, flagshipGrant: e.target.value }
              })}
              className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-slate-200 rounded-xl"
            />
          </div>
        </div>
      </div>

      {/* SEO Defaults */}
      <SeoFields
        seoTitle={settings?.seo?.metaTitle || ''}
        seoDescription={settings?.seo?.metaDescription || ''}
        keywords={settings?.seo?.keywords || ''}
        onChangeTitle={(val) => setSettings({
          ...settings,
          seo: { ...settings?.seo, metaTitle: val }
        })}
        onChangeDescription={(val) => setSettings({
          ...settings,
          seo: { ...settings?.seo, metaDescription: val }
        })}
        onChangeKeywords={(val) => setSettings({
          ...settings,
          seo: { ...settings?.seo, keywords: val }
        })}
      />
    </form>
  );
}

