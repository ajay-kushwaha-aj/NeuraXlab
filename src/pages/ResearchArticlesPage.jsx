import React, { useState } from 'react';
import { 
  BookOpen, 
  ExternalLink, 
  Dna, 
  Activity, 
  Cpu, 
  CheckCircle2, 
  Globe2, 
  Sparkles, 
  FileText,
  Calendar,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { BOOK_CHAPTERS, RESEARCH_METHODOLOGY_ARTICLES } from '../data/labData';

export default function ResearchArticlesPage() {
  const [selectedDeepDive, setSelectedDeepDive] = useState('lncrna');

  const deepDives = [
    {
      id: 'lncrna',
      title: 'Non-coding RNAs (lncRNAs & piRNAs) in Stroke',
      citation: 'Stroke (AHA) 2011, 2012; PLoS ONE 2013',
      impact: 'Pioneered the very first genome-wide transcriptome characterization of long non-coding RNAs and PIWI-interacting RNAs in the ischemic mammalian brain.',
      mechanisms: [
        'Discovered that transient focal ischemia in adult rats drastically alters the expression profiles of hundreds of previously uncharacterized lncRNAs.',
        'Demonstrated that piRNAs, previously thought to be exclusive to germline cells, are abundantly expressed in the adult cerebral cortex and respond dynamically to ischemic insult.',
        'Characterized the miR-29c / DNMT3a epigenetic regulatory loop, where ischemic miR-29c down-regulation promotes aberrant DNA hypermethylation and cell death.'
      ],
      leadAuthor: 'Nakka et al. (with Prof. Raghu Vemuganti, Univ. of Wisconsin–Madison)',
      tag: 'Stroke Epigenetics'
    },
    {
      id: 'apocynin',
      title: 'Apocynin & UPR (eIF2α / XBP-1) Modulation',
      citation: 'Brain Research Bulletin (2022) & Neurotoxicity Research (2010)',
      impact: 'Demonstrated that low-dose apocynin post-treatment exerts profound neuroprotection by selective modulation of the Unfolded Protein Response arms.',
      mechanisms: [
        'Proved that apocynin stabilizes the endoplasmic reticulum chaperone BiP/GRP78, mitigating catastrophic eIF2α hyperphosphorylation.',
        'Regulates the splicing of XBP-1 mRNA via the IRE1α endoribonuclease domain, promoting adaptive protein-folding homeostasis in penumbral neurons.',
        'Reduces reactive oxygen species (ROS) mediated Caspase-12 and CHOP translocation to the nucleus.'
      ],
      leadAuthor: 'Nakka et al.',
      tag: 'Organelle Stress & UPR'
    },
    {
      id: 'trpc6',
      title: 'Brain–Kidney Crosstalk (HIF1α–ZEB2–TRPC6 Axis)',
      citation: 'Scientific Reports (2021) & Neurochemical Research (2020)',
      impact: 'Unveiled the multi-organ pathological communication between acute ischemic cerebral insults and distant organ failure, specifically renal podocyte and microvascular collapse.',
      mechanisms: [
        'Identified that systemic hypoxia and circulating cytokines post-stroke induce renal TRPC6 cation channel overexpression.',
        'Mapped the upstream HIF1α–ZEB2 transcriptional axis dictating podocyte foot process effacement and acute kidney injury.',
        'Demonstrated that selective TRPC6 channel inhibition rescues both cerebral microvascular barrier function and distant glomerular filtration.'
      ],
      leadAuthor: 'Nakka et al.',
      tag: 'Distant Organ Crosstalk'
    },
    {
      id: 'limk1',
      title: 'LIMK-1 / Cofilin-1 Pathway & Cytoskeletal Remodeling',
      citation: 'Annals of Neurology (2017) & Molecular Neurobiology',
      impact: 'Identified the molecular signaling mechanisms governing actin filament dynamics and neuronal morphological deterioration under acute neuroinflammatory challenge.',
      mechanisms: [
        'Uncovered the dysregulation of the LIM-kinase-1 (LIMK-1) and cofilin-1 phosphorylation cycle leading to dendritic spine loss.',
        'Characterized actin filament destabilization as a primary anatomical substrate for rapid neurological deficit progression.',
        'Provided a molecular rationale for actin-stabilizing therapeutics in protecting synaptic architecture.'
      ],
      leadAuthor: 'Nakka et al.',
      tag: 'Cytoskeletal Dynamics'
    }
  ];

  // Complete 5 Book Chapters & Edited Books (Items 15–19)
  const allFiveBookChapters = [
    {
      itemNum: 'Item 15',
      title: 'Pharmaco-Biotechnology and Nanotechnology: Therapeutic Applications and Strategies',
      authors: 'Raghu Gogada, Praveen Boddana, Pradipta Banerjee, and Venkata Prasuja Nakka',
      publisher: 'Cambridge Scholars Publishing, Newcastle upon Tyne, UK',
      year: '2019',
      isbn: '978-1-5275-3850-4',
      badge: 'Authored / Edited International Book',
      link: 'https://www.cambridgescholars.com/product/978-1-5275-3850-4',
      summary: 'Comprehensive academic treatise covering pharmaceutical biotechnology, nanobiotechnology for targeted drug delivery across blood-brain barriers, biosensors, pharmacogenetics, and nutrigenetic interactions.'
    },
    {
      itemNum: 'Item 16',
      title: 'Endoplasmic Reticulum Stress in Brain Damage',
      authors: 'Ram Raghubir, V. P. Nakka, and S. L. Mehta',
      publisher: 'Academic Press / Elsevier (Methods in Enzymology, Vol. 489)',
      year: '2011',
      isbn: '978-0-12-386037-8',
      doi: '10.1016/B978-0-12-386037-8.00014-9',
      badge: 'Methods in Enzymology Compendium',
      link: 'https://doi.org/10.1016/B978-0-12-386037-8.00014-9',
      summary: 'Standardized protocols and biochemical procedures for isolating brain microsomal fractions, quantifying ER chaperone kinetics (BiP, PDI, Calreticulin), and measuring Caspase-12 cleavage after focal ischemia.'
    },
    {
      itemNum: 'Item 17',
      title: 'Neuroprotective Strategies and Organellar Stress Interplay in Acute CNS Injuries',
      authors: 'V. P. Nakka, P. Prakash-Babu, and Raghu Vemuganti',
      publisher: 'Springer Nature (Advances in Neurobiology)',
      year: '2017',
      isbn: '978-3-319-45345-3',
      doi: '10.1007/978-3-319-45345-3_18',
      badge: 'Springer Nature Book Chapter',
      link: 'https://link.springer.com',
      summary: 'Examines the intracellular and systemic crosstalk between the endoplasmic reticulum, mitochondria, and autophagic machinery in acute cerebral insults, providing a roadmap for multi-target neuroprotection.'
    },
    {
      itemNum: 'Item 18',
      title: 'Targeted Nanomedicine and Drug Delivery Vectors Across the Blood-Brain Barrier',
      authors: 'Venkata Prasuja Nakka and Collaborators',
      publisher: 'Academic Press / Elsevier',
      year: '2021',
      isbn: '978-0-12-822456-4',
      doi: '10.1016/B978-0-12-822456-4.00008-2',
      badge: 'Academic Press Book Chapter',
      link: 'https://www.sciencedirect.com',
      summary: 'Explores ligand-engineered polymeric and lipid nanoparticles designed to circumvent the tight endothelial junctions of the blood-brain barrier to deliver antioxidants and short-chain fatty acids.'
    },
    {
      itemNum: 'Item 19',
      title: 'Oxidative Stress and Autophagy in Cerebrovascular Pathophysiology',
      authors: 'V. P. Nakka, Ram Raghubir, and Raghu Vemuganti',
      publisher: 'Springer Science & Business Media',
      year: '2023',
      isbn: '978-981-19-8742-1',
      doi: '10.1007/978-981-19-8742-1_12',
      badge: 'Springer Science Book Chapter',
      link: 'https://link.springer.com',
      summary: 'Detailed molecular synthesis of free-radical generation during ischemic reperfusion and the protective versus maladaptive signaling thresholds of autophagic flux in penumbral tissue.'
    }
  ];

  // The 3 International Conference Proceedings
  const conferenceProceedings = [
    {
      id: 'conf-berlin',
      city: 'Berlin, Germany',
      conference: 'Joint Meeting of the International Society for Neurochemistry (ISN) and European Society for Neurochemistry (ESN)',
      title: 'Endoplasmic Reticulum Stress and Caspase-12 Activation in Focal Cerebral Ischemia',
      authors: 'V. P. Nakka and Ram Raghubir',
      date: 'ISN-ESN Biennial Conference, Berlin',
      scope: 'International European Keynote Presentation'
    },
    {
      id: 'conf-san-francisco',
      city: 'San Francisco, California, USA',
      conference: 'Society for Neuroscience (SfN) Annual Meeting & American Stroke Association Sessions',
      title: 'Genome-Wide Profiling of Long Noncoding RNAs and piRNAs in the Rat Brain Following Transient Ischemia',
      authors: 'A. Dharap, V. P. Nakka, and Raghu Vemuganti',
      date: 'SfN Global Meeting, San Francisco',
      scope: 'International US Convention Presentation'
    },
    {
      id: 'conf-taiwan',
      city: 'Taipei, Taiwan',
      conference: 'Asian-Pacific Society for Neurochemistry (APSN) Biennial Meeting',
      title: 'ISGylation and Post-Translational Ubiquitin-Like Modifiers in Preconditioned Neuroprotection',
      authors: 'V. P. Nakka, B. T. Lang, and Raghu Vemuganti',
      date: 'APSN Congress, Taipei',
      scope: 'Asia-Pacific Regional Neuroscience Congress'
    }
  ];

  const activeDive = deepDives.find((d) => d.id === selectedDeepDive) || deepDives[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 space-y-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Thematic Syntheses &amp; Academic Compendia</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Research Articles &amp; Book Chapters
        </h1>
        <p className="text-[#0F2537]/80 text-base sm:text-lg">
          Thematic deep-dives into Dr. Venkata Prasuja Nakka's landmark molecular discoveries, 5 authoritative authored book chapters, and international conference proceedings.
        </p>
      </div>

      {/* =========================================================================
          SECTION 1: THEMATIC DEEP-DIVES ON DR. NAKKA'S LANDMARK DISCOVERIES
          ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-[#8B1E24]">
              Seminal Preclinical Breakthroughs
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
              Thematic Deep-Dives on Landmark Discoveries
            </h2>
          </div>
          <span className="text-xs font-mono text-[#0F2537]/60">
            Select a discovery below to inspect molecular cascades
          </span>
        </div>

        {/* Deep Dive Switcher Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {deepDives.map((d) => {
            const isSel = selectedDeepDive === d.id;
            return (
              <button
                key={d.id}
                onClick={() => setSelectedDeepDive(d.id)}
                className={`p-4 rounded-2xl text-left border-2 transition-all flex flex-col justify-between ${
                  isSel
                    ? 'bg-[#8B1E24] text-white border-[#C59B27] shadow-lg'
                    : 'bg-white text-[#0F2537] border-gray-200 hover:border-[#8B1E24]'
                }`}
              >
                <div>
                  <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${isSel ? 'bg-white/20 text-[#E0B84C]' : 'bg-[#FAF8F5] text-[#8B1E24]'}`}>
                    {d.tag}
                  </span>
                  <h3 className="font-serif text-lg font-bold mt-2 leading-snug">
                    {d.title}
                  </h3>
                </div>
                <p className={`text-[11px] font-mono mt-3 ${isSel ? 'text-white/80' : 'text-[#0F2537]/60'}`}>
                  {d.citation}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Deep Dive Inspection Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-[#C59B27]/50 shadow-xl space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-5">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-[#8B1E24] bg-[#FAF8F5] px-3 py-1 rounded-md border border-[#C59B27]/40">
                {activeDive.tag}
              </span>
              <h3 className="font-serif text-3xl font-bold text-[#0F2537] mt-2">
                {activeDive.title}
              </h3>
              <p className="text-xs font-semibold text-[#C59B27] mt-1">
                Published across: {activeDive.citation}
              </p>
            </div>
            <div className="text-xs font-mono text-[#0F2537]/70 bg-[#FAF8F5] px-3 py-2 rounded-xl border border-gray-200">
              {activeDive.leadAuthor}
            </div>
          </div>

          <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-200 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B1E24]">
              Translational Impact &amp; Paradigm Shift:
            </span>
            <p className="text-sm text-[#0F2537]/85 leading-relaxed">
              {activeDive.impact}
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F2537]">
              Key Mechanistic Insights:
            </h4>
            <div className="grid grid-cols-1 gap-2.5">
              {activeDive.mechanisms.map((mech, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100 text-xs sm:text-sm text-[#0F2537]/85">
                  <CheckCircle2 className="w-4 h-4 text-[#8B1E24] flex-shrink-0 mt-0.5" />
                  <span>{mech}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ALL 5 BOOK CHAPTERS & EDITED BOOKS (ITEMS 15–19)
          ========================================================================= */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-200 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase text-[#8B1E24]">
              Scholarly Treatises
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
              All 5 Book Chapters &amp; Edited Books (Items 15–19)
            </h2>
          </div>
          <span className="text-xs font-mono bg-[#8B1E24]/10 text-[#8B1E24] font-bold px-3 py-1 rounded-full">
            Cambridge Scholars • Elsevier • Springer
          </span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {allFiveBookChapters.map((book) => (
            <div
              key={book.itemNum}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 hover:border-[#C59B27] shadow-md hover:shadow-xl transition-all space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-mono font-bold text-white bg-[#8B1E24] px-2.5 py-0.5 rounded uppercase">
                      {book.itemNum}
                    </span>
                    <span className="text-xs font-mono text-[#8B1E24] bg-[#FAF8F5] px-2.5 py-0.5 rounded border border-[#C59B27]/40 font-semibold">
                      {book.badge}
                    </span>
                    <span className="text-xs font-mono text-[#0F2537]/60">
                      {book.publisher} • {book.year}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#0F2537] leading-snug">
                    {book.title}
                  </h3>

                  <p className="text-xs text-[#8B1E24] font-semibold">
                    {book.authors}
                  </p>
                </div>

                {book.link && (
                  <a
                    href={book.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#0F2537] hover:bg-[#8B1E24] transition-colors shadow flex-shrink-0"
                  >
                    <span>Publisher Portal</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#E0B84C]" />
                  </a>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#0F2537]/80 leading-relaxed bg-[#FAF8F5] p-4 rounded-xl border border-gray-100">
                {book.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between text-xs text-[#0F2537]/60 font-mono pt-2 border-t border-gray-100 gap-2">
                <span>ISBN: {book.isbn}</span>
                {book.doi && <span>DOI: {book.doi}</span>}
                <span>Indexed in Scopus &amp; Google Scholar</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: THE 3 INTERNATIONAL CONFERENCE PROCEEDINGS
          ========================================================================= */}
      <section className="space-y-6">
        <div className="border-b border-gray-200 pb-4">
          <span className="text-xs font-mono font-bold uppercase text-[#8B1E24]">
            Global Scientific Presentations
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#0F2537]">
            International Conference Proceedings (Berlin, San Francisco, Taiwan)
          </h2>
          <p className="text-xs text-[#0F2537]/70 mt-1">
            Major peer-reviewed presentations delivered at apex international neuroscience conferences.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {conferenceProceedings.map((conf) => (
            <div
              key={conf.id}
              className="bg-white rounded-3xl p-6 border-2 border-gray-200 hover:border-[#8B1E24] shadow-sm hover:shadow-lg transition-all space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase bg-[#8B1E24] text-white px-2 py-0.5 rounded">
                    {conf.scope}
                  </span>
                  <Globe2 className="w-4 h-4 text-[#C59B27]" />
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-[#8B1E24]">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>{conf.city}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[#0F2537] leading-snug">
                  {conf.title}
                </h3>

                <p className="text-xs text-[#0F2537]/75">
                  <strong>Congress:</strong> {conf.conference}
                </p>

                <p className="text-xs text-[#0F2537]/60">
                  <strong>Authors:</strong> {conf.authors}
                </p>
              </div>

              <div className="pt-3 border-t border-gray-100 text-[11px] font-mono text-[#C59B27] font-semibold">
                {conf.date}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
