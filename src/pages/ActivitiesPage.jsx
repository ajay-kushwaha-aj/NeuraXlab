import React, { useState } from 'react';
import { 
  Camera, 
  Maximize2, 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Activity, 
  Sparkles,
  Building2,
  Dna,
  ShieldCheck
} from 'lucide-react';
import ImageLightboxModal from '../components/ImageLightboxModal';

export default function ActivitiesPage() {
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', caption: '' });

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  // Dedicated Laboratory Facilities & Infrastructure Suites
  const galleryFacilities = [
    {
      id: 'fac-surgery',
      title: 'Preclinical Stroke & TBI Microsurgery Suite',
      room: 'Room F75C, School of Life Sciences',
      badge: 'In Vivo Surgical Core',
      specifications: [
        'Stereotaxic surgical frame with digital micro-manipulators for precision cerebral targeting',
        'Laser Doppler Flowmetry (moorVMS-LDF) for real-time cortical blood flow monitoring',
        'Temperature-regulated homeothermic rodent heating pads with continuous rectal telemetry feedback',
        'Intraluminal monofilament suture MCAO workstation equipped with binocular surgical microscope',
        'Standardized neurobehavioral testing batteries: Computerized Rotarod, mNSS, and elevated body swing test'
      ],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'fac-nano',
      title: 'Nano-Formulation & UPR/Proteostasis Core',
      room: 'Room F75C, School of Life Sciences',
      badge: 'Nanomedicine & Biochemistry',
      specifications: [
        'Malvern Zetasizer Nano ZS for Dynamic Light Scattering (DLS) & Zeta Potential profiling',
        'High-intensity ultrasonic probe sonicator for polymeric nanoparticle encapsulation & homogenization',
        'ChemiDoc MP Multi-channel Western Blot Imaging suite for UPR phospho-proteins and organelle markers',
        'Preparative ultracentrifuges for microsomal organelle fractionation and purity verification',
        'Real-time quantitative RT-qPCR thermal cyclers (CFX96) for lncRNA/piRNA expression profiling'
      ],
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'fac-computational',
      title: 'Computational Systems Biology Cluster',
      room: 'Dept. of Systems & Computational Biology, SLS',
      badge: 'Metagenomics & High-Performance Computing',
      specifications: [
        'High-memory multi-core compute nodes configured with Ubuntu Linux & Slurm workload manager',
        'QIIME2 / dada2 bioinformatics pipelines for longitudinal 16S rRNA microbiome taxonomy',
        'Transcriptome differential gene expression workflows (DESeq2, edgeR, Salmon)',
        'Molecular dynamics (GROMACS) & protein-ligand docking suites (AutoDock Vina)',
        'Systems network reconstruction tools (Cytoscape, STRING, Bioconductor packages)'
      ],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'fac-golgi',
      title: 'Neuronal Dendritic Architecture & Golgi-Cox Histology',
      room: 'Histopathology & Confocal Core, School of Life Sciences',
      badge: 'Neurohistology Archive',
      specifications: [
        'Authentic Golgi–Cox stained pyramidal neuron preparations demonstrating dendritic arborization',
        'Dendritic spine density quantification and penumbral synaptic plasticity evaluation',
        'Validation of neuronal cytoskeletal integrity post-transient middle cerebral artery occlusion (MCAO)',
        'Correlative histomorphometry following neuroprotective nanotherapy administration',
        'Fluorescence and brightfield high-resolution digital slide scanning'
      ],
      image: '/images/golgi_cox_neuron.png'
    },
    {
      id: 'fac-imaging',
      title: 'Advanced Confocal Laser Scanning & Live-Cell Imaging Suite',
      room: 'Central Instrumentation Core, School of Life Sciences',
      badge: 'Advanced Bio-Imaging',
      specifications: [
        'Multi-laser confocal scanning microscope configured for 4-channel spectral immunofluorescence',
        'Deep penumbral imaging of NeuN, GFAP, Iba1 microglia, and tight junction proteins (Claudin-5, ZO-1)',
        'In vitro oxygen-glucose deprivation (OGD/R) live-cell calcium flux and mitochondrial ROS probes',
        'Super-resolution 3D deconvolution for blood-brain barrier microvascular junction profiling',
        'Automated multi-tile montage imaging for entire hemispheric infarct volume assessment'
      ],
      image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'fac-behavior',
      title: 'In Vivo Neurobehavioral & Preclinical Rehabilitation Core',
      room: 'Central Animal Facility & School of Life Sciences, UoH',
      badge: 'Behavioral & Functional Recovery',
      specifications: [
        'Automated accelerating Rotarod apparatus for sensorimotor coordination and endurance scoring',
        'Modified Neurological Deficit Score (mNSS) testing arena for focal neurological recovery',
        'Elevated body swing test (EBST) and cylinder test setups for asymmetric motor deficit evaluation',
        'Standardized SPF pathogen-free housing suites conforming to CPCSEA guidelines',
        'Longitudinal post-stroke cognitive assessment (Morris Water Maze, Novel Object Recognition)'
      ],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 space-y-12">
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
          Explore the experimental suites, surgical workstations, nanomedicine formulation platforms, and high-performance computational clusters powering NeuroXlab investigations at the University of Hyderabad.
        </p>
      </div>

      {/* =========================================================================
          FACILITIES & CORE GALLERY (CUSTOM VECTOR ILLUSTRATIONS & SPECS)
          ========================================================================= */}
      <section id="gallery" className="space-y-12 animate-in fade-in duration-300 scroll-mt-24">
        <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-[#8B1E24]">
              Experimental Infrastructure
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F2537]">
              Laboratory Facilities &amp; Technical Specifications
            </h2>
            <p className="text-sm text-[#0F2537]/75 mt-1">
              Room F75C, School of Life Sciences, University of Hyderabad.
            </p>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono self-start sm:self-auto border border-slate-200">
            <Building2 className="w-3.5 h-3.5 text-[#C59B27]" />
            <span>School of Life Sciences</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {galleryFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-3xl overflow-hidden border-2 border-gray-200 hover:border-[#C59B27] shadow-md hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header */}
                <div className="relative h-60 w-full overflow-hidden bg-[#0F2537]">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = '/images/golgi_cox_neuron.png';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />
                  <span className="absolute top-4 left-4 text-xs font-mono font-bold uppercase bg-[#8B1E24] text-white px-3 py-1 rounded-full shadow">
                    {fac.badge}
                  </span>
                  <button
                    onClick={() =>
                      openLightbox(
                        fac.image,
                        fac.title,
                        `${fac.room} • Technical Specifications Core Facility at NeuroXlab.`
                      )
                    }
                    className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 text-white hover:bg-[#8B1E24] transition-colors"
                    title="Enlarge Facility Photograph"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-4 text-white">
                    <span className="text-xs font-mono text-[#E0B84C] font-semibold">{fac.room}</span>
                  </div>
                </div>

                {/* Specifications Body */}
                <div className="p-6 sm:p-8 space-y-4">
                  <h3 className="font-serif text-2xl font-bold text-[#0F2537] leading-snug">
                    {fac.title}
                  </h3>

                  <div className="space-y-2 pt-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
                      Core Instrument Configurations &amp; Capabilities:
                    </span>
                    <ul className="space-y-2.5">
                      {fac.specifications.map((spec, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-sm text-[#0F2537]/85 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0 mt-1" />
                          <span>{spec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="px-6 sm:px-8 py-3.5 bg-[#FAF8F5] border-t border-gray-100 text-xs font-mono text-[#0F2537]/60 flex items-center justify-between">
                <span>NeuroXlab Core Instrumentation</span>
                <span className="text-[#8B1E24] font-bold">Room F75C School of Life Sciences</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
