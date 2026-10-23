import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Award, 
  Camera, 
  Maximize2, 
  CheckCircle2, 
  Mic, 
  Users, 
  Presentation,
  Globe2
} from 'lucide-react';
import { ACTIVITIES } from '../data/labData';
import ImageLightboxModal from '../components/ImageLightboxModal';

export default function ActivitiesView() {
  const [filter, setFilter] = useState('All');
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', caption: '' });

  const categories = ['All', 'National Workshop', 'Symposium', 'Invited Talk', 'International Conference'];

  const filteredActivities =
    filter === 'All'
      ? ACTIVITIES
      : ACTIVITIES.filter((act) => act.category === filter);

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Lightbox Modal */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        imageSrc={lightboxData.src}
        title={lightboxData.title}
        caption={lightboxData.caption}
        onClose={closeLightbox}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <Calendar className="w-3.5 h-3.5" />
          <span>Symposia, Keynotes &amp; Outreach</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Activities, Workshops &amp; Gallery
        </h1>
        <p className="text-[#0F2537]/80 text-base sm:text-lg">
          Convening national skill development workshops in biosciences, delivering invited neuroscience lectures at SNCI and NEHU, and presenting at international Society for Neuroscience (SfN) conventions.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              filter === cat
                ? 'bg-[#8B1E24] text-white shadow-md'
                : 'bg-white text-[#0F2537]/80 hover:bg-[#FAF8F5] border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Chronological Event Showcase Grid */}
      <div id="events" className="grid grid-cols-1 lg:grid-cols-2 gap-8 scroll-mt-28">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#C59B27] shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
          >
            <div>
              {/* Event Image Banner with Lightbox Trigger */}
              <div className="relative h-60 w-full overflow-hidden bg-[#0F2537]">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <span className="absolute top-4 left-4 text-xs font-mono font-bold uppercase bg-[#8B1E24] text-white px-3 py-1 rounded-full shadow">
                  {act.category}
                </span>
                <button
                  onClick={() =>
                    openLightbox(
                      act.image,
                      act.title,
                      `${act.venue} • ${act.date}. Organized / Presented by Dr. Venkata Prasuja Nakka.`
                    )
                  }
                  className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 text-white hover:bg-[#8B1E24] transition-colors"
                  title="Enlarge Event Photograph"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
              </div>

              {/* Event Text Body */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#8B1E24]">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                    <span>{act.venue}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#0F2537] leading-snug">
                    {act.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-[#0F2537]/60 font-mono pt-1">
                    <span>Role: {act.role}</span>
                    <span>•</span>
                    <span>Date: {act.date}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#0F2537]/80 leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-gray-100">
                  {act.summary}
                </p>

                {/* Highlights */}
                {act.highlights && (
                  <div className="space-y-2 pt-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#0F2537]">
                      Event Key Highlights:
                    </p>
                    <ul className="space-y-1.5">
                      {act.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-[#0F2537]/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E24] flex-shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 sm:px-8 py-4 bg-[#FAF8F5] border-t border-gray-100 text-xs text-[#0F2537]/60 flex items-center justify-between">
              <span>NeuraXlab Academic Outreach Archive</span>
              <span className="font-medium text-[#8B1E24]">University of Hyderabad</span>
            </div>
          </div>
        ))}
      </div>

      {/* Laboratory Life & Research Facilities Photo Gallery */}
      <section id="gallery" className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 space-y-6 scroll-mt-28">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#8B1E24]" />
              <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
                Laboratory Facilities &amp; Campus Glimpses
              </h2>
            </div>
            <p className="text-xs text-[#0F2537]/70 mt-1">
              Visual glimpses of research suites, stereotaxic stroke surgery workstations, and UoH campus life.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Stereotaxic Surgery & Laser Doppler Suite",
              desc: "Dedicated workstations for intraluminal filament MCAO and cerebral blood flow telemetry.",
              img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80",
              tag: "Surgical Suite"
            },
            {
              title: "Nanoparticle Synthesis & DLS Characterization",
              desc: "Formulation suites for SCFA and edaravone biocompatible polymeric nanocarriers.",
              img: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80",
              tag: "Nanomedicine Lab"
            },
            {
              title: "Molecular Proteostasis & Western Blot Suites",
              desc: "Assessment of unfolded protein response (BiP, p-eIF2α, ATF6, XBP1s) and autophagic markers.",
              img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80",
              tag: "Molecular Biology"
            },
            {
              title: "Gut Metagenomic Sequencing & Bioinformatics Hub",
              desc: "High-performance computational pipelines for 16S microbiome taxonomy and SCFA profiling.",
              img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80",
              tag: "Computational Hub"
            },
            {
              title: "SLS Annex Building & Academic Seminars",
              desc: "Department of Systems and Computational Biology, School of Life Sciences, UoH.",
              img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
              tag: "SLS Annex"
            },
            {
              title: "University of Hyderabad Campus Fauna & Greenery",
              desc: "Scenic 2,300-acre biodiversity campus at Prof. C.R. Rao Road, Gachibowli.",
              img: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&auto=format&fit=crop&q=80",
              tag: "UoH Campus"
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden border border-gray-200 bg-[#0F2537] shadow-sm hover:shadow-lg transition-all cursor-pointer"
              onClick={() => openLightbox(item.img, item.title, item.desc)}
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] font-mono uppercase bg-[#8B1E24] px-2 py-0.5 rounded font-bold">
                  {item.tag}
                </span>
                <p className="font-serif text-base font-bold text-white mt-1">
                  {item.title}
                </p>
                <p className="text-[11px] text-white/75 truncate">
                  {item.desc}
                </p>
              </div>
              <div className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
