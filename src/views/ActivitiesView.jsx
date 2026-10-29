import React, { useState } from 'react';
import { 
  Camera, 
  Maximize2, 
  CheckCircle2, 
  Building2
} from 'lucide-react';
import ImageLightboxModal from '../components/ImageLightboxModal';

export default function ActivitiesView() {
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', caption: '' });

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
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
          <Camera className="w-3.5 h-3.5" />
          <span>Laboratory Suites &amp; Infrastructure</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Facilities &amp; Infrastructure Gallery
        </h1>
        <p className="text-[#0F2537]/80 text-sm sm:text-base leading-relaxed">
          Visual glimpses of research suites, stereotaxic stroke surgery workstations, nanomedicine formulation platforms, and campus facilities at the University of Hyderabad.
        </p>
      </div>

      {/* Laboratory Life & Research Facilities Photo Gallery */}
      <section id="gallery" className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-200 space-y-6 scroll-mt-28">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-[#8B1E24]" />
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
                Laboratory Facilities &amp; Campus Glimpses
              </h2>
            </div>
            <p className="text-sm sm:text-base text-[#0F2537]/70 mt-1">
              Visual glimpses of research suites, stereotaxic stroke surgery workstations, and UoH campus life.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono border border-slate-200">
            <Building2 className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>School of Life Sciences</span>
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
              title: "School of Life Sciences & Academic Seminars",
              desc: "Department of Systems and Computational Biology, School of Life Sciences, UoH.",
              img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=80",
              tag: "School of Life Sciences"
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
                <span className="text-xs font-mono uppercase bg-[#8B1E24] px-2 py-0.5 rounded font-bold">
                  {item.tag}
                </span>
                <p className="font-serif text-base sm:text-lg font-bold text-white mt-1">
                  {item.title}
                </p>
                <p className="text-xs sm:text-sm text-white/80 line-clamp-2">
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
