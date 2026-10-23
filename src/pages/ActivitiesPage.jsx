import React, { useState } from 'react';
import { 
  Calendar, 
  MapPin, 
  Award, 
  Camera, 
  Maximize2, 
  CheckCircle2, 
  Mic, 
  Globe2, 
  BookOpen, 
  Cpu, 
  Layers, 
  Activity, 
  GraduationCap, 
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import ImageLightboxModal from '../components/ImageLightboxModal';

export default function ActivitiesPage() {
  const [activeTabSub, setActiveTabSub] = useState('events'); // 'events' or 'gallery'
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', caption: '' });

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  // 1. National Workshops & Symposia Organized
  const organizedEvents = [
    {
      title: "National Workshop on Skill Development & Start-up Ecosystem in Biosciences",
      role: "Organizing Secretary & Lead Convener",
      date: "January 18–20, 2024",
      venue: "Acharya Nagarjuna University (ANU College of Sciences)",
      description: "Convened over 280 faculty, postdoctoral researchers, and bio-entrepreneurs. Conducted hands-on masterclasses in animal stroke stereotaxy, preclinical assay validation, IP commercialization, and bioscience startup incubation funded under national skill development schemes.",
      badge: "National Workshop (Organizing Secretary)"
    },
    {
      title: "National Symposium on Metabolic Disorders, Diabetes, and Neurological Complications",
      role: "Scientific Co-Convener & Chair",
      date: "December 12–13, 2023",
      venue: "School of Life Sciences, University of Hyderabad & ANU",
      description: "Explored the pathophysiological nexus between insulin resistance, microvascular endothelial inflammation, gut dysbiosis, and accelerated post-stroke ischemic damage. Featured clinical keynotes from AIIMS and NII.",
      badge: "National Symposium"
    },
    {
      title: "National Hands-on Workshop on Small Animal Stroke Stereotaxy & Microvascular Clamping",
      role: "Course Director & Surgical Trainer",
      date: "August 2022",
      venue: "Preclinical Surgical Suite, School of Life Sciences, UoH",
      description: "Intensive training for doctoral scholars across India on intraluminal suture Middle Cerebral Artery Occlusion (MCAO), Laser Doppler Flowmetry validation, and neurobehavioral scoring (mNSS, rotarod).",
      badge: "Hands-on Surgical Workshop"
    },
    {
      title: "National Symposium on Advances in Systems Biology and Neurotherapeutics",
      role: "Convener & Organizing Committee Member",
      date: "November 2021",
      venue: "Department of Systems and Computational Biology, UoH",
      description: "Addressed multiscale computational modeling of metabolic networks, single-cell transcriptomics in neurodegeneration, and organelle proteostasis therapeutics.",
      badge: "National Symposium"
    }
  ];

  // 2. Invited Scientific Talks & Lectures
  const invitedTalks = [
    {
      venue: "North-Eastern Hill University (NEHU), Shillong",
      date: "May 2023",
      topic: "Non-coding RNAs: Epigenetic Master Orchestrators in Cerebral Ischemia",
      host: "Department of Biochemistry, NEHU, Meghalaya",
      summary: "Delivered keynote lecture detailing the discovery of brain-expressed piRNAs, stroke-responsive lncRNAs, and targeted antisense oligonucleotide strategies."
    },
    {
      venue: "Society for Neurochemistry, India (SNCI)",
      date: "November 2021",
      topic: "Endoplasmic Reticulum Stress and Autophagic Flux in Acute CNS Injuries",
      host: "Annual National Conference of SNCI, Kolkata",
      summary: "Chaired scientific session on organellar proteostasis and presented molecular evidence linking BiP/GRP78 dissociation to downstream caspase-12 activation."
    },
    {
      venue: "Department of Systems & Computational Biology (DoSCB), UoH",
      date: "March 2022",
      topic: "Systems Biology of Organellar Crosstalk in Ischemia-Reperfusion",
      host: "School of Life Sciences Faculty Seminar Series, University of Hyderabad",
      summary: "Presented computational and biochemical models of UPR signaling, mitochondrial ROS generation, and the brain-kidney TRPC6 axis."
    }
  ];

  // 3. International Conferences Attended
  const internationalConferences = [
    {
      conference: "Society for Neuroscience (SfN) Annual Meeting",
      location: "San Diego, California, USA (2010)",
      presentation: "Cerebral ISGylation and Non-coding RNA Epigenetics in Focal Stroke",
      collaborators: "With Prof. Raghu Vemuganti, Department of Neurological Surgery, Univ. of Wisconsin–Madison",
      badge: "Global SfN Convention"
    },
    {
      conference: "Indo-Taiwan Joint Neuroscience Symposium",
      location: "Taipei, Taiwan",
      presentation: "Organellar Stress and Apoptotic Pathways in Ischemic Brain Damage",
      collaborators: "Asian-Pacific Society for Neurochemistry (APSN) Delegate",
      badge: "Indo-Taiwan Bilateral"
    },
    {
      conference: "Indian Pharmacological Society (IPS) National Congress",
      location: "New Delhi, India",
      presentation: "Neuroprotection & Target Identification in Acute Central Nervous System Injuries",
      collaborators: "Pharmacology & Toxicology Division, CSIR-CDRI",
      badge: "Apex National Congress"
    },
    {
      conference: "National Brain Research Centre (NBRC) Neuroscience Symposium",
      location: "Manesar, Haryana, India",
      presentation: "Molecular Targets of Reperfusion Injury and Autophagy Flux",
      collaborators: "Indian Neuroscience Faculty Initiative",
      badge: "NBRC Symposium"
    }
  ];

  // 4. UGC-HRDC Career Development Courses
  const hrdcCourses = [
    {
      course: "UGC-HRDC Refresher Course in Life Sciences & Biotechnology",
      institution: "UGC-Human Resource Development Centre, University of Hyderabad",
      period: "3-Week Advanced Refresher",
      focus: "Curriculum innovation, advanced omics technologies, and student-centered pedagogy in translational neurobiology."
    },
    {
      course: "Faculty Induction Programme (FIP) on Higher Education Pedagogy",
      institution: "UGC-HRDC Centre for Educational Technologies, Hyderabad",
      period: "4-Week National Induction",
      focus: "National Education Policy (NEP 2020) frameworks, institutional research grant management, and academic governance."
    }
  ];

  // Gallery Facilities Specifications
  const galleryFacilities = [
    {
      id: 'fac-surgery',
      title: 'Preclinical Stroke & TBI Microsurgery Suite',
      room: 'Room F75C, SLS Annex Building',
      badge: 'In Vivo Surgical Core',
      specifications: [
        'Stereotaxic surgical frame with digital micro-manipulators',
        'Laser Doppler Flowmetry (moorVMS-LDF) for real-time cerebral blood flow monitoring',
        'Temperature-regulated homeothermic rodent heating pads with rectal telemetry feedback',
        'Intraluminal monofilament suture MCAO workstation with binocular surgical microscope',
        'Automated neurobehavioral battery: Computerized Rotarod, mNSS, and elevated body swing test'
      ],
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'fac-nano',
      title: 'Nano-Formulation & UPR/Proteostasis Core',
      room: 'Room F75C, SLS Annex Building',
      badge: 'Nanomedicine & Biochemistry',
      specifications: [
        'Malvern Zetasizer Nano ZS for Dynamic Light Scattering (DLS) & Zeta Potential profiling',
        'High-intensity ultrasonic probe sonicator for nanoparticle homogenization',
        'ChemiDoc MP Multi-channel Western Blot Imaging suite for UPR phospho-proteins',
        'Preparative ultracentrifuges for microsomal organelle fractionation',
        'Real-time quantitative RT-qPCR thermal cyclers (CFX96) for lncRNA/piRNA validation'
      ],
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'fac-computational',
      title: 'Computational Systems Biology Cluster',
      room: 'Dept. of Systems & Computational Biology, SLS',
      badge: 'Metagenomics & High-Performance Computing',
      specifications: [
        'High-memory multi-core compute nodes configured with Ubuntu Linux & Slurm scheduler',
        'QIIME2 / dada2 bioinformatics pipelines for longitudinal 16S microbiome taxonomy',
        'Transcriptome differential gene expression workflows (DESeq2, edgeR, Salmon)',
        'Molecular dynamics (GROMACS) & protein-ligand docking suites (AutoDock Vina)',
        'Network biology reconstruction tools (Cytoscape, STRING, Bioconductor)'
      ],
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop&q=80'
    },
    {
      id: 'fac-symposia',
      title: 'National Symposia & Campus Scientific Exchange',
      room: 'School of Life Sciences Auditorium, UoH',
      badge: 'Academic Symposia Archive',
      specifications: [
        '280+ bio-entrepreneurs and students convened under Dr. Nakka as Organizing Secretary',
        'Keynote addresses from AIIMS, NII, and CDRI neurobiologists',
        'Hands-on laboratory training sessions for graduate scholars from 14 Indian states',
        'Annual Research Day oral presentations and poster exhibitions',
        'Institutional outreach fostering skill development and startup innovation in Andhra & Telangana'
      ],
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80'
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
          <Calendar className="w-3.5 h-3.5" />
          <span>Workshops, Outreach &amp; Infrastructure</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Activities &amp; Facilities Gallery
        </h1>
        <p className="text-[#0F2537]/80 text-base sm:text-lg">
          Chronicle of national workshops and symposia organized by Dr. Venkata Prasuja Nakka, invited scientific lectures, and technical specifications of our laboratory suites.
        </p>

        {/* Tab Switcher: Events vs Gallery */}
        <div className="inline-flex p-1.5 rounded-2xl bg-white border-2 border-[#C59B27]/40 shadow-sm text-sm font-bold mt-4">
          <button
            onClick={() => setActiveTabSub('events')}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTabSub === 'events'
                ? 'bg-[#8B1E24] text-white shadow-md'
                : 'text-[#0F2537]/75 hover:text-[#8B1E24]'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events &amp; Symposia</span>
          </button>
          <button
            onClick={() => setActiveTabSub('gallery')}
            className={`px-6 py-2.5 rounded-xl transition-all flex items-center gap-2 ${
              activeTabSub === 'gallery'
                ? 'bg-[#8B1E24] text-white shadow-md'
                : 'text-[#0F2537]/75 hover:text-[#8B1E24]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Facilities &amp; Core Gallery</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: EVENTS & SYMPOSIA
          ========================================================================= */}
      {activeTabSub === 'events' && (
        <div className="space-y-16 animate-in fade-in duration-300">
          {/* Section 1: 4 National Workshops & Symposia Organized */}
          <section className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-mono font-bold uppercase text-[#8B1E24]">
                Academic Leadership
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
                National Workshops &amp; Symposia Organized
              </h2>
              <p className="text-xs text-[#0F2537]/70 mt-1">
                Major national platforms convened by Dr. Nakka fostering hands-on bioscience skills and entrepreneurship.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {organizedEvents.map((ev, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-xl transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-white bg-[#8B1E24] px-3 py-1 rounded-full uppercase">
                        {ev.badge}
                      </span>
                      <span className="text-xs font-mono text-[#C59B27] font-bold">
                        {ev.date}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-[#0F2537] leading-snug">
                      {ev.title}
                    </h3>

                    <div className="space-y-1 text-xs text-[#0F2537]/80">
                      <p><strong className="text-[#0F2537]">Role:</strong> {ev.role}</p>
                      <p className="flex items-center gap-1.5 text-[#8B1E24] font-medium">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        <span>{ev.venue}</span>
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-[#0F2537]/75 leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-gray-100">
                      {ev.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-gray-100 text-[11px] text-[#0F2537]/60 font-mono">
                    Official Institutional Event • University of Hyderabad
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Invited Talks & Keynote Lectures */}
          <section className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-mono font-bold uppercase text-[#8B1E24]">
                Scientific Keynotes
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
                Invited Talks &amp; Keynote Addresses
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {invitedTalks.map((talk, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 border-2 border-[#C59B27]/40 shadow-sm hover:shadow-lg transition-all space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs font-mono text-[#8B1E24] font-bold">
                      <span className="flex items-center gap-1">
                        <Mic className="w-3.5 h-3.5" />
                        <span>Invited Keynote</span>
                      </span>
                      <span>{talk.date}</span>
                    </div>

                    <h3 className="font-serif text-xl font-bold text-[#0F2537] leading-snug">
                      "{talk.topic}"
                    </h3>

                    <p className="text-xs font-semibold text-[#C59B27]">
                      {talk.venue}
                    </p>

                    <p className="text-xs text-[#0F2537]/75 leading-relaxed">
                      {talk.summary}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-gray-100 text-[10px] text-[#0F2537]/60 font-mono">
                    Host: {talk.host}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: International Conferences Attended */}
          <section className="space-y-6">
            <div className="border-b border-gray-200 pb-4">
              <span className="text-xs font-mono font-bold uppercase text-[#8B1E24]">
                Global Congresses
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
                International Conferences Attended
              </h2>
              <p className="text-xs text-[#0F2537]/70 mt-1">
                SfN San Diego, Indo-Taiwan Symposium, IPS National Congress, and NBRC Neuroscience Conventions.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {internationalConferences.map((conf, idx) => (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] rounded-2xl p-5 border border-gray-200 space-y-2.5 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-[#8B1E24] bg-white px-2 py-0.5 rounded border border-gray-200">
                      {conf.badge}
                    </span>
                    <h4 className="font-serif text-base font-bold text-[#0F2537] leading-snug">
                      {conf.conference}
                    </h4>
                    <p className="text-xs font-semibold text-[#C59B27]">{conf.location}</p>
                    <p className="text-xs text-[#0F2537]/75 italic">"{conf.presentation}"</p>
                  </div>
                  <div className="pt-2 border-t border-gray-200 text-[10px] text-[#0F2537]/60 font-mono">
                    {conf.collaborators}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 4: UGC-HRDC Career Development Courses */}
          <section className="bg-white rounded-3xl p-8 border border-gray-200 shadow-md space-y-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-6 h-6 text-[#8B1E24]" />
              <h3 className="font-serif text-2xl font-bold text-[#0F2537]">
                UGC-HRDC Faculty &amp; Career Development Courses
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {hrdcCourses.map((c, i) => (
                <div key={i} className="p-4 rounded-2xl bg-[#FAF8F5] border border-gray-200 space-y-1.5">
                  <span className="text-xs font-mono font-bold text-[#8B1E24] uppercase">{c.period}</span>
                  <h4 className="font-serif text-lg font-bold text-[#0F2537]">{c.course}</h4>
                  <p className="text-xs font-semibold text-[#C59B27]">{c.institution}</p>
                  <p className="text-xs text-[#0F2537]/75">{c.focus}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* =========================================================================
          TAB 2: FACILITIES & CORE GALLERY (CUSTOM VECTOR ILLUSTRATIONS & SPECS)
          ========================================================================= */}
      {activeTabSub === 'gallery' && (
        <div className="space-y-12 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4">
            <span className="text-xs font-mono font-bold uppercase text-[#8B1E24]">
              Experimental Infrastructure
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
              Laboratory Facilities &amp; Technical Specifications
            </h2>
            <p className="text-xs text-[#0F2537]/70 mt-1">
              Room F75C, SLS Annex Building, School of Life Sciences, University of Hyderabad.
            </p>
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
                          `${fac.room} • Technical Specifications Core Facility at NeuraXlab.`
                        )
                      }
                      className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/60 text-white hover:bg-[#8B1E24] transition-colors"
                      title="Enlarge Facility Photograph"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-3 left-4 text-white">
                      <span className="text-[11px] font-mono text-[#E0B84C] font-semibold">{fac.room}</span>
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
                      <ul className="space-y-2">
                        {fac.specifications.map((spec, i) => (
                          <li key={i} className="flex items-start gap-2.5 text-xs text-[#0F2537]/85 leading-relaxed">
                            <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0 mt-0.5" />
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="px-6 sm:px-8 py-3.5 bg-[#FAF8F5] border-t border-gray-100 text-xs font-mono text-[#0F2537]/60 flex items-center justify-between">
                  <span>NeuraXlab Core Instrumentation</span>
                  <span className="text-[#8B1E24] font-bold">Room F75C SLS Annex</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
