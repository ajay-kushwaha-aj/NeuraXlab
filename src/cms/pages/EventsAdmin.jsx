import React, { useState, useEffect } from 'react';
import { Calendar, Plus, Search, Filter, Edit2, Trash2, MapPin, Users, ExternalLink } from 'lucide-react';
import { cmsService } from '../services/cmsService';
import { useAuth } from '../context/AuthContext';
import StatusBadge from '../components/StatusBadge';
import ConfirmDialog from '../components/ConfirmDialog';
import { formatDate } from '../utils/formatters';

const EVENT_CATEGORIES = [
  { id: 'conference', label: 'Scientific Conference' },
  { id: 'symposium', label: 'National Symposium' },
  { id: 'workshop', label: 'Hands-on Workshop' },
  { id: 'seminar', label: 'Invited Seminar' },
  { id: 'award', label: 'Academic Award' }
];

export default function EventsAdmin() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'conference',
    description: '',
    eventDate: new Date().toISOString().split('T')[0],
    endDate: '',
    venue: '',
    associatedResearchers: '',
    registrationUrl: '',
    imageUrl: '',
    isUpcoming: false,
    status: 'published'
  });
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, item: null });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    setLoading(true);
    try {
      const list = await cmsService.getActivities(true);
      setEvents(list);
    } catch (err) {
      console.warn('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingEvent(null);
    setFormData({
      title: '',
      category: 'conference',
      description: '',
      eventDate: new Date().toISOString().split('T')[0],
      endDate: '',
      venue: 'School of Life Sciences, University of Hyderabad',
      associatedResearchers: 'Dr. Venkata Prasuja Nakka',
      registrationUrl: '',
      imageUrl: '',
      isUpcoming: false,
      status: 'published'
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (eItem) => {
    setEditingEvent(eItem);
    setFormData({
      title: eItem.title || '',
      category: eItem.category || 'conference',
      description: eItem.description || '',
      eventDate: eItem.eventDate || '',
      endDate: eItem.endDate || '',
      venue: eItem.venue || '',
      associatedResearchers: eItem.associatedResearchers || '',
      registrationUrl: eItem.registrationUrl || '',
      imageUrl: eItem.imageUrl || '',
      isUpcoming: !!eItem.isUpcoming,
      status: eItem.status || 'published'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Event title is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      if (editingEvent) {
        await cmsService.updateActivity(editingEvent.id, formData, user);
      } else {
        await cmsService.createActivity(formData, user);
      }
      setIsModalOpen(false);
      await loadEvents();
    } catch (err) {
      alert(err.message || 'Operation failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteDialog.item) return;
    try {
      await cmsService.deleteActivity(deleteDialog.item.id, user);
      setDeleteDialog({ isOpen: false, item: null });
      await loadEvents();
    } catch (err) {
      alert(err.message || 'Delete failed.');
    }
  };

  const filteredEvents = events.filter(item => {
    const matchesSearch = (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.venue || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl font-bold text-[#0F2537]">
            Activities, Events &amp; Conference Highlights
          </h2>
          <p className="text-xs text-slate-500 font-sans">
            Manage academic conferences, symposiums, workshops, and invited research presentations.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow-sm transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 text-[#E0B84C]" />
          <span>New Event</span>
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
            placeholder="Search events by title, venue..."
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
            {EVENT_CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Loading events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Calendar className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="text-sm font-semibold text-slate-600">No events found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] text-slate-600 uppercase font-mono font-bold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Event Title &amp; Description</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Venue</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEvents.map(ev => (
                  <tr key={ev.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 max-w-sm">
                      <div className="space-y-1">
                        <span className="font-bold text-[#0F2537] text-sm line-clamp-1">
                          {ev.title}
                        </span>
                        <p className="text-slate-500 line-clamp-1 text-xs">{ev.description}</p>
                      </div>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-mono text-[11px] text-slate-600">
                      {formatDate(ev.eventDate)}
                    </td>
                    <td className="py-3 px-3 text-slate-600 max-w-xs truncate">
                      {ev.venue}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="capitalize px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] text-slate-700">
                        {ev.category}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <StatusBadge status={ev.isUpcoming ? 'upcoming' : ev.status} />
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-right space-x-1">
                      <button
                        onClick={() => handleOpenEdit(ev)}
                        className="p-1.5 text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
                        title="Edit Event"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteDialog({ isOpen: true, item: ev })}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        title="Delete Event"
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
                <Calendar className="w-5 h-5 text-[#8B1E24]" />
                <h3 className="font-serif text-xl font-bold text-[#0F2537]">
                  {editingEvent ? 'Edit Activity' : 'Add Activity / Event'}
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
                  Event Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 42nd Annual Meeting of Indian Academy of Neurosciences (IAN)"
                  required
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#8B1E24]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                  >
                    {EVENT_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    required
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Venue / Location
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="e.g. School of Life Sciences, University of Hyderabad"
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                  Description / Proceedings Summary
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Details regarding presentation, keynotes, or workshops..."
                  rows={3}
                  className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase font-mono mb-1">
                    External / Registration Link
                  </label>
                  <input
                    type="url"
                    value={formData.registrationUrl}
                    onChange={(e) => setFormData({ ...formData, registrationUrl: e.target.value })}
                    placeholder="https://"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-xl"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isUpcoming}
                      onChange={(e) => setFormData({ ...formData, isUpcoming: e.target.checked })}
                      className="rounded text-[#8B1E24]"
                    />
                    <span className="text-xs font-bold text-slate-700">Flag as Upcoming Event</span>
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
                  {isSubmitting ? 'Saving...' : editingEvent ? 'Save Changes' : 'Create Event'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Dialog */}
      <ConfirmDialog
        isOpen={deleteDialog.isOpen}
        title="Delete Activity Record"
        message={`Are you sure you want to delete "${deleteDialog.item?.title}"?`}
        confirmText="Delete Event"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteDialog({ isOpen: false, item: null })}
      />
    </div>
  );
}

