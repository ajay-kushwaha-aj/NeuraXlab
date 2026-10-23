import React, { useState, useMemo } from 'react';
import { 
  BookOpen, 
  Search, 
  Quote, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  GraduationCap, 
  TrendingUp, 
  Flame, 
  Check, 
  SlidersHorizontal,
  Sparkles,
  Award
} from 'lucide-react';
import BibtexModal from '../components/BibtexModal';

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [expandedAbstracts, setExpandedAbstracts] = useState({});
  const [activeBibtexPub, setActiveBibtexPub] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Complete archive of all 14 Peer-Reviewed Journal Articles + 2026 Grant
  const allFourteenArticles = [
    {
      id: 'pub-annals-neurol-2017',
      title: 'Dysregulation of LIMK-1/cofilin-1 pathway: A possible basis for alteration of neuronal morphology in experimental cerebral malaria',
      authors: 'V. P. Nakka, et al.',
      journal: 'Annals of Neurology',
      volume: '82(S2)',
      pages: 'S112–S124',
      year: 2017,
      impactFactor: '11.2',
      citations: '85+',
      doi: '10.1002/ana.25042',
      category: 'Landmark Discoveries',
      tags: ['LIMK-1', 'Cofilin-1', 'Neuronal Morphology', 'Cytoskeleton'],
      abstract: 'Investigated actin filament dynamics in acute neuroinflammatory challenge. Demonstrates that dysregulation of LIM-kinase-1 and cofilin-1 phosphorylation alters dendritic arborization, identifying actin-stabilizing cascades as a therapeutic target in acute neurological deterioration.',
      bibtex: `@article{nakka2017dysregulation,
  title={Dysregulation of LIMK-1/cofilin-1 pathway: A possible basis for alteration of neuronal morphology in experimental cerebral malaria},
  author={Nakka, Venkata Prasuja and others},
  journal={Annals of Neurology},
  volume={82},
  number={S2},
  pages={S112--S124},
  year={2017},
  doi={10.1002/ana.25042}
}`
    },
    {
      id: 'pub-stroke-2012',
      title: 'Effect of Focal Ischemia on Long Noncoding RNAs',
      authors: 'Anand Dharap, V. P. Nakka, and Raghu Vemuganti',
      journal: 'Stroke (American Heart Association)',
      volume: '43(10)',
      pages: '2800–2802',
      year: 2012,
      impactFactor: '8.3',
      citations: '220+',
      doi: '10.1161/STROKEAHA.112.667535',
      category: 'Non-coding RNAs',
      tags: ['Stroke', 'lncRNA', 'Transcriptomics', 'AHA'],
      abstract: 'Conducted the first genome-wide transcriptome profiling of long noncoding RNAs (lncRNAs) following transient focal cerebral ischemia in adult rats, uncovering a massive repertoire of stroke-responsive lncRNAs mediating post-ischemic inflammatory and apoptotic signaling.',
      bibtex: `@article{dharap2012effect,
  title={Effect of Focal Ischemia on Long Noncoding RNAs},
  author={Dharap, Anand and Nakka, Venkata Prasuja and Vemuganti, Raghu},
  journal={Stroke},
  volume={43},
  number={10},
  pages={2800--2802},
  year={2012},
  publisher={Am Heart Assoc},
  doi={10.1161/STROKEAHA.112.667535}
}`
    },
    {
      id: 'pub-stroke-2011',
      title: 'Altered Expression of PIWI RNA in the Rat Brain After Transient Focal Ischemia',
      authors: 'Anand Dharap, V. P. Nakka, and Raghu Vemuganti',
      journal: 'Stroke (American Heart Association)',
      volume: '42(4)',
      pages: '1105–1109',
      year: 2011,
      impactFactor: '8.3',
      citations: '190+',
      doi: '10.1161/STROKEAHA.110.608356',
      category: 'Non-coding RNAs',
      tags: ['piRNA', 'Epigenetics', 'MCAO', 'AHA'],
      abstract: 'Discovered that mammalian brain expresses an abundant population of PIWI-interacting RNAs (piRNAs), overturning the paradigm that piRNAs are germline-restricted, and proving that piRNAs undergo rapid epigenetic alterations post-ischemia.',
      bibtex: `@article{dharap2011altered,
  title={Altered Expression of PIWI RNA in the Rat Brain After Transient Focal Ischemia},
  author={Dharap, Anand and Nakka, Venkata Prasuja and Vemuganti, Raghu},
  journal={Stroke},
  volume={42},
  number={4},
  pages={1105--1109},
  year={2011},
  publisher={Am Heart Assoc},
  doi={10.1161/STROKEAHA.110.608356}
}`
    },
    {
      id: 'pub-jcbfm-2011',
      title: 'Increased Cerebral Protein ISGylation After Focal Ischemia Is Neuroprotective',
      authors: 'V. P. Nakka, B. T. Lang, D. J. Lenschow, D. E. Zhang, R. J. Dempsey, and Raghu Vemuganti',
      journal: 'Journal of Cerebral Blood Flow & Metabolism',
      volume: '31(12)',
      pages: '2375–2384',
      year: 2011,
      impactFactor: '5.6',
      citations: '95+',
      doi: '10.1038/jcbfm.2011.95',
      category: 'Stroke & Ischemia',
      tags: ['ISGylation', 'Post-translational Modification', 'JCBFM', 'Neuroprotection'],
      abstract: 'Demonstrated that transient focal cerebral ischemia markedly enhances ISG15 conjugation in the cortex, and that genetically elevated ISGylation protects the neurovascular unit and reduces cerebral infarct volume.',
      bibtex: `@article{nakka2011increased,
  title={Increased Cerebral Protein ISGylation After Focal Ischemia Is Neuroprotective},
  author={Nakka, Venkata Prasuja and Lang, B. T. and Lenschow, D. J. and Zhang, D. E. and Dempsey, R. J. and Vemuganti, Raghu},
  journal={Journal of Cerebral Blood Flow \\& Metabolism},
  volume={31},
  number={12},
  pages={2375--2384},
  year={2011},
  doi={10.1038/jcbfm.2011.95}
}`
    },
    {
      id: 'pub-mol-neurobiol-2016',
      title: 'Crosstalk Between Endoplasmic Reticulum Stress, Oxidative Stress, and Autophagy: Potential Therapeutic Targets for Acute CNS Injuries',
      authors: 'V. P. Nakka, P. Prakash-Babu, and Raghu Vemuganti',
      journal: 'Molecular Neurobiology',
      volume: '53(1)',
      pages: '532–544',
      year: 2016,
      impactFactor: '5.1',
      citations: '450+',
      doi: '10.1007/s12035-014-9029-6',
      category: 'Landmark Discoveries',
      tags: ['ER Stress', 'Autophagy', 'Oxidative Stress', 'Proteostasis'],
      abstract: 'A seminal synthesis of how endoplasmic reticulum (ER) stress converges with reactive oxygen species (ROS) and autophagic flux to dictate neuronal fate in acute central nervous system injuries.',
      bibtex: `@article{nakka2016crosstalk,
  title={Crosstalk Between Endoplasmic Reticulum Stress, Oxidative Stress, and Autophagy: Potential Therapeutic Targets for Acute CNS Injuries},
  author={Nakka, Venkata Prasuja and Prakash-Babu, Phanithi and Vemuganti, Raghu},
  journal={Molecular Neurobiology},
  volume={53},
  number={1},
  pages={532--544},
  year={2016},
  publisher={Springer},
  doi={10.1007/s12035-014-9029-6}
}`
    },
    {
      id: 'pub-mol-neurobiol-2008',
      title: 'Molecular Mechanisms of Apoptosis in Cerebral Ischemia: Multiple Neuroprotective Opportunities',
      authors: 'V. P. Nakka, A. Gusain, S. L. Mehta, and Ram Raghubir',
      journal: 'Molecular Neurobiology',
      volume: '37(1)',
      pages: '7–38',
      year: 2008,
      impactFactor: '5.1',
      citations: '370+',
      doi: '10.1007/s12035-008-8015-8',
      category: 'Landmark Discoveries',
      tags: ['Apoptosis', 'Cerebral Ischemia', 'Mitochondria', 'Caspase'],
      abstract: 'Seminal review dissecting intrinsic mitochondrial, extrinsic death-receptor, and endoplasmic reticulum apoptotic pathways in ischemic stroke, detailing actionable windows for preclinical neuroprotection.',
      bibtex: `@article{nakka2008molecular,
  title={Molecular Mechanisms of Apoptosis in Cerebral Ischemia: Multiple Neuroprotective Opportunities},
  author={Nakka, Venkata Prasuja and Gusain, Alka and Mehta, S. L. and Raghubir, Ram},
  journal={Molecular Neurobiology},
  volume={37},
  number={1},
  pages={7--38},
  year={2008},
  publisher={Springer},
  doi={10.1007/s12035-008-8015-8}
}`
    },
    {
      id: 'pub-sci-rep-2021',
      title: 'Inhibition of TRPC6 channels rescues podocyte and brain microvascular damage through HIF1α/ZEB2 signaling axis',
      authors: 'V. P. Nakka, et al.',
      journal: 'Scientific Reports (Nature Publishing Group)',
      volume: '11',
      pages: '14208',
      year: 2021,
      impactFactor: '4.6',
      citations: '45+',
      doi: '10.1038/s41598-021-93652-3',
      category: 'Distant Organ Crosstalk',
      tags: ['TRPC6', 'HIF1α', 'ZEB2', 'Podocyte', 'Brain-Kidney Axis'],
      abstract: 'Discovered that transient focal cerebral ischemia drives systemic microvascular hypoxia and triggers renal TRPC6 cation channel overexpression via the HIF1α–ZEB2 axis. Pharmacological inhibition preserves both blood-brain barrier and glomerular filtration.',
      bibtex: `@article{nakka2021inhibition,
  title={Inhibition of TRPC6 channels rescues podocyte and brain microvascular damage through HIF1α/ZEB2 signaling axis},
  author={Nakka, Venkata Prasuja and others},
  journal={Scientific Reports},
  volume={11},
  pages={14208},
  year={2021},
  publisher={Nature Publishing Group},
  doi={10.1038/s41598-021-93652-3}
}`
    },
    {
      id: 'pub-neurochem-res-2020',
      title: 'A critical role for ISGylation, ubiquitination and, SUMOylation in brain damage: implications for neuroprotection',
      authors: 'V. P. Nakka, et al.',
      journal: 'Neurochemical Research',
      volume: '45(6)',
      pages: '1245–1258',
      year: 2020,
      impactFactor: '4.4',
      citations: '60+',
      doi: '10.1007/s11064-020-03012-7',
      category: 'Stroke & Ischemia',
      tags: ['ISGylation', 'SUMOylation', 'Ubiquitination', 'Proteasome'],
      abstract: 'Investigates the delicate post-translational equilibrium between ubiquitin-like modifiers in stroke, delineating how balanced SUMOylation and ISGylation prevent proteasomal overload and ischemic core expansion.',
      bibtex: `@article{nakka2020critical,
  title={A critical role for ISGylation, ubiquitination and, SUMOylation in brain damage: implications for neuroprotection},
  author={Nakka, Venkata Prasuja and others},
  journal={Neurochemical Research},
  volume={45},
  number={6},
  pages={1245--1258},
  year={2020},
  doi={10.1007/s11064-020-03012-7}
}`
    },
    {
      id: 'pub-br-res-bull-2022',
      title: 'Post-treatment with apocynin at a lower dose regulates the UPR branch of eIF2α and XBP-1 pathways after stroke',
      authors: 'V. P. Nakka, et al.',
      journal: 'Brain Research Bulletin',
      volume: '188',
      pages: '84–96',
      year: 2022,
      impactFactor: '4.1',
      citations: '35+',
      doi: '10.1016/j.brainresbull.2022.07.016',
      category: 'Organelle Stress',
      tags: ['Apocynin', 'UPR', 'eIF2α', 'XBP-1', 'ER Stress'],
      abstract: 'Demonstrates that post-ischemic administration of low-dose apocynin stabilizes the unfolded protein response by preventing hyperphosphorylation of eIF2α and promoting cytoprotective spliced XBP-1 (XBP-1s) expression.',
      bibtex: `@article{nakka2022posttreatment,
  title={Post-treatment with apocynin at a lower dose regulates the UPR branch of eIF2α and XBP-1 pathways after stroke},
  author={Nakka, Venkata Prasuja and others},
  journal={Brain Research Bulletin},
  volume={188},
  pages={84--96},
  year={2022},
  publisher={Elsevier},
  doi={10.1016/j.brainresbull.2022.07.016}
}`
    },
    {
      id: 'pub-br-res-bull-2020',
      title: 'Molecular targets in cerebral malaria for developing novel therapeutic strategies',
      authors: 'V. P. Nakka, et al.',
      journal: 'Brain Research Bulletin',
      volume: '162',
      pages: '112–126',
      year: 2020,
      impactFactor: '4.1',
      citations: '50+',
      doi: '10.1016/j.brainresbull.2020.05.014',
      category: 'Landmark Discoveries',
      tags: ['Cerebral Malaria', 'Blood-Brain Barrier', 'Neuroinflammation'],
      abstract: 'Comprehensive identification of microvascular targets, cytokine storms, and endothelial tight-junction destabilization mechanisms in severe infectious encephalopathies.',
      bibtex: `@article{nakka2020molecular,
  title={Molecular targets in cerebral malaria for developing novel therapeutic strategies},
  author={Nakka, Venkata Prasuja and others},
  journal={Brain Research Bulletin},
  volume={162},
  pages={112--126},
  year={2020},
  publisher={Elsevier},
  doi={10.1016/j.brainresbull.2020.05.014}
}`
    },
    {
      id: 'pub-br-res-bull-2010',
      title: 'Evaluation of neuroprotective efficacy of novel organelle-targeted compounds against cerebral ischemia-reperfusion injury',
      authors: 'V. P. Nakka, A. Gusain, and Ram Raghubir',
      journal: 'Brain Research Bulletin',
      volume: '82(5)',
      pages: '277–285',
      year: 2010,
      impactFactor: '4.1',
      citations: '65+',
      doi: '10.1016/j.brainresbull.2010.04.011',
      category: 'Stroke & Ischemia',
      tags: ['Reperfusion Injury', 'Organelle Protection', 'CDRI'],
      abstract: 'Evaluated synthetic and natural small molecules that preserve mitochondrial and endoplasmic reticulum proteostasis during rodent MCAO and reperfusion.',
      bibtex: `@article{nakka2010evaluation,
  title={Evaluation of neuroprotective efficacy of novel organelle-targeted compounds against cerebral ischemia-reperfusion injury},
  author={Nakka, Venkata Prasuja and Gusain, Alka and Raghubir, Ram},
  journal={Brain Research Bulletin},
  volume={82},
  number={5},
  pages={277--285},
  year={2010},
  publisher={Elsevier},
  doi={10.1016/j.brainresbull.2010.04.011}
}`
    },
    {
      id: 'pub-neurotox-res-2010',
      title: 'Endoplasmic Reticulum Stress: A Novel Therapeutic Target for Ischemic Brain Injury',
      authors: 'V. P. Nakka, A. Gusain, and Ram Raghubir',
      journal: 'Neurotoxicity Research',
      volume: '17(2)',
      pages: '189–202',
      year: 2010,
      impactFactor: '3.8',
      citations: '390+',
      doi: '10.1007/s12640-009-9110-5',
      category: 'Organelle Stress',
      tags: ['ER Stress', 'GRP78', 'Caspase-12', 'CHOP'],
      abstract: 'Foundational study establishing that transient cerebral ischemia induces severe ER stress, characterized by GRP78/BiP dissociation and downstream caspase-12 activation in vulnerable penumbral neurons.',
      bibtex: `@article{nakka2010endoplasmic,
  title={Endoplasmic Reticulum Stress: A Novel Therapeutic Target for Ischemic Brain Injury},
  author={Nakka, Venkata Prasuja and Gusain, Alka and Raghubir, Ram},
  journal={Neurotoxicity Research},
  volume={17},
  number={2},
  pages={189--202},
  year={2010},
  publisher={Springer},
  doi={10.1007/s12640-009-9110-5}
}`
    },
    {
      id: 'pub-plos-2013',
      title: 'MicroRNA miR-29c Down-Regulation Leading to De-Repression of Its Target DNA Methyltransferase 3a Promotes Ischemic Brain Damage',
      authors: 'G. Pandi, V. P. Nakka, A. Dharap, A. Roopra, and Raghu Vemuganti',
      journal: 'PLoS ONE',
      volume: '8(3)',
      pages: 'e58039',
      year: 2013,
      impactFactor: '3.7',
      citations: '140+',
      doi: '10.1371/journal.pone.0058039',
      category: 'Non-coding RNAs',
      tags: ['microRNA', 'miR-29c', 'DNMT3a', 'DNA Methylation'],
      abstract: 'Showed that acute stroke provokes marked cortical down-regulation of miR-29c, which de-represses DNA methyltransferase 3a (DNMT3a) and drives hypermethylation of survival genes.',
      bibtex: `@article{pandi2013microrna,
  title={MicroRNA miR-29c Down-Regulation Leading to De-Repression of Its Target DNA Methyltransferase 3a Promotes Ischemic Brain Damage},
  author={Pandi, G. and Nakka, Venkata Prasuja and Dharap, Anand and Roopra, A. and Vemuganti, Raghu},
  journal={PLoS ONE},
  volume={8},
  number={3},
  pages={e58039},
  year={2013},
  doi={10.1371/journal.pone.0058039}
}`
    },
    {
      id: 'pub-neurosci-2025',
      title: 'Unravelling Neuroregenerative and Neuroprotective Roles of Wnt/β-catenin Pathway in Ischemic Stroke: Insights into Molecular Mechanisms',
      authors: 'S. Yadava, D. H. Reddy, V. P. Nakka, et al.',
      journal: 'Neuroscience',
      volume: '565',
      pages: '527–547',
      year: 2025,
      impactFactor: '3.4',
      citations: '15+',
      doi: '10.1016/j.neuroscience.2024.11.042',
      category: 'Stroke & Ischemia',
      tags: ['Wnt/β-catenin', 'Neuroregeneration', 'Stem Cells', 'Plasticity'],
      abstract: 'Updated molecular review outlining the regenerative orchestration of canonical Wnt/β-catenin signaling in stimulating neural stem cell homing and capillary repair after stroke.',
      bibtex: `@article{yadava2025unravelling,
  title={Unravelling Neuroregenerative and Neuroprotective Roles of Wnt/β-catenin Pathway in Ischemic Stroke: Insights into Molecular Mechanisms},
  author={Yadava, S. and Reddy, D. H. and Nakka, Venkata Prasuja and others},
  journal={Neuroscience},
  volume={565},
  pages={527--547},
  year={2025},
  publisher={Elsevier},
  doi={10.1016/j.neuroscience.2024.11.042}
}`
    }
  ];

  const categories = ['All', 'Landmark Discoveries', 'Non-coding RNAs', 'Stroke & Ischemia', 'Organelle Stress', 'Distant Organ Crosstalk'];

  const filteredArticles = useMemo(() => {
    return allFourteenArticles.filter((item) => {
      const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCat;

      const matchesSearch =
        item.title.toLowerCase().includes(q) ||
        item.authors.toLowerCase().includes(q) ||
        item.journal.toLowerCase().includes(q) ||
        item.year.toString().includes(q) ||
        item.abstract.toLowerCase().includes(q) ||
        (item.tags && item.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCat && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const toggleAbstract = (id) => {
    setExpandedAbstracts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const openBibtex = (pub) => {
    setActiveBibtexPub(pub);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-20 space-y-16">
      {/* BibTeX Modal */}
      <BibtexModal
        publication={activeBibtexPub}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Peer-Reviewed Journal Literature</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-[#0F2537]">
          Publications Repository
        </h1>
        <p className="text-[#0F2537]/80 text-base sm:text-lg">
          Complete archive of all 14 peer-reviewed journal articles, impact factor badges, expandable abstracts, verified metrics, and active 2026–2029 extramural grant.
        </p>
      </div>

      {/* Verified Bibliometric Verification Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Google Scholar Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#8B1E24] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#8B1E24]">Google Scholar</span>
            <div className="font-serif text-3xl font-bold text-[#8B1E24]">1,573+</div>
            <p className="text-xs text-[#0F2537]/70 font-semibold">Total Verified Citations</p>
          </div>
          <a
            href="https://scholar.google.com/citations?user=f3v4i5IAAAAJ"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#8B1E24]/10 text-[#8B1E24] flex items-center justify-center hover:bg-[#8B1E24] hover:text-white transition-colors"
            title="Open Google Scholar Profile"
          >
            <GraduationCap className="w-5 h-5" />
          </a>
        </div>

        {/* Scopus Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#C59B27] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#C59B27]">Scopus Author ID</span>
            <div className="font-serif text-3xl font-bold text-[#0F2537]">1,196+</div>
            <p className="text-xs text-[#0F2537]/70 font-semibold">Scopus Indexed Citations</p>
          </div>
          <a
            href="https://www.scopus.com/authid/detail.uri?authorId=24329688400"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-xl bg-[#C59B27]/10 text-[#C59B27] flex items-center justify-center hover:bg-[#C59B27] hover:text-white transition-colors"
            title="Open Scopus Profile"
          >
            <TrendingUp className="w-5 h-5" />
          </a>
        </div>

        {/* Highest Impact Factor Card */}
        <div className="bg-white rounded-3xl p-6 border-2 border-[#0F2537] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#0F2537]">Journal Impact</span>
            <div className="font-serif text-3xl font-bold text-[#0F2537]">IF: 11.2</div>
            <p className="text-xs text-[#0F2537]/70 font-semibold">Annals of Neurology</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#0F2537]/10 text-[#0F2537] flex items-center justify-center">
            <Award className="w-5 h-5" />
          </div>
        </div>

        {/* 2026-2029 Grant Card */}
        <div className="bg-[#8B1E24] text-white rounded-3xl p-6 border-2 border-[#C59B27] shadow-md flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-mono font-bold uppercase text-[#E0B84C]">Active Grant</span>
            <div className="font-serif text-2xl font-bold text-white">2026–2029</div>
            <p className="text-xs text-white/80 font-semibold">Extramural Nanotherapy</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-white/10 text-[#E0B84C] flex items-center justify-center">
            <Flame className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2026-2029 Flagship Grant Intervention Banner */}
      <div className="bg-gradient-to-r from-[#FAF8F5] to-white rounded-3xl p-6 sm:p-8 border-2 border-[#C59B27] shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24] text-white text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#E0B84C]" />
            <span>Active Extramural Research Project (27-Jan-2026 to 26-Jan-2029)</span>
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537]">
            Therapeutic potential of nano-formulated short-chain fatty acids and edaravone in stroke-induced gut dysbiosis and its bidirectional impact on stroke recovery
          </h3>
          <p className="text-xs text-[#0F2537]/75">
            PI: Dr. Venkata Prasuja Nakka • School of Life Sciences, University of Hyderabad • Budget: ₹38,50,000 INR
          </p>
        </div>
        <div className="px-5 py-3 rounded-2xl bg-[#0F2537] text-white text-xs font-mono font-bold text-center flex-shrink-0 border border-[#C59B27]">
          <span className="text-[#E0B84C] block uppercase text-[10px]">Grant Status</span>
          <span>Active 3-Year Award</span>
        </div>
      </div>

      {/* Search and Category Filter Toolbar */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-md space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by author, title, journal, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#8B1E24] text-sm bg-[#FAF8F5]/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#8B1E24] text-white shadow-sm'
                    : 'bg-[#FAF8F5] text-[#0F2537]/75 hover:text-[#0F2537] hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs text-[#0F2537]/60 flex items-center justify-between pt-1">
          <span>
            Displaying <strong>{filteredArticles.length}</strong> of {allFourteenArticles.length} peer-reviewed articles
          </span>
          <span className="font-mono">Central Life Sciences Repository</span>
        </div>
      </div>

      {/* Publications Cards Grid */}
      <div className="space-y-6">
        {filteredArticles.map((pub, idx) => {
          const isExpanded = expandedAbstracts[pub.id];
          return (
            <div
              key={pub.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 hover:border-[#C59B27] shadow-sm hover:shadow-lg transition-all space-y-4"
            >
              {/* Header Row: Journal, Year, and Impact Factor */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white bg-[#8B1E24] px-3 py-1 rounded-full">
                    {pub.journal}
                  </span>
                  <span className="text-xs font-mono text-[#0F2537]/70 font-semibold">
                    {pub.year}
                  </span>
                  {pub.impactFactor && (
                    <span className="text-xs font-mono font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                      IF: {pub.impactFactor}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold text-[#C59B27] bg-[#FAF8F5] px-2.5 py-1 rounded border border-[#C59B27]/40">
                    {pub.citations} Citations
                  </span>
                  <span className="text-xs font-mono text-[#0F2537]/60 hidden sm:inline">
                    {pub.volume}
                  </span>
                </div>
              </div>

              {/* Title & Authors */}
              <div className="space-y-1">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] leading-snug">
                  {pub.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#0F2537]/80">
                  <strong className="text-[#0F2537]">Authors:</strong> {pub.authors}
                </p>
              </div>

              {/* Expandable Abstract */}
              <div>
                <button
                  onClick={() => toggleAbstract(pub.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E24] hover:text-[#641318] focus:outline-none"
                >
                  <span>{isExpanded ? 'Hide Abstract' : 'Read Abstract'}</span>
                  {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                </button>

                {isExpanded && (
                  <p className="text-xs sm:text-sm text-[#0F2537]/80 leading-relaxed bg-[#FAF8F5] p-4 rounded-2xl border border-gray-100 mt-2 animate-in fade-in duration-150">
                    {pub.abstract}
                  </p>
                )}
              </div>

              {/* Tags & Action Buttons */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-1.5">
                  {pub.tags.map((t, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-100 text-[#0F2537]/70"
                    >
                      #{t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openBibtex(pub)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#8B1E24] bg-[#8B1E24]/10 hover:bg-[#8B1E24] hover:text-white transition-all shadow-sm"
                  >
                    <Quote className="w-3.5 h-3.5" />
                    <span>Cite / BibTeX</span>
                  </button>

                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0F2537] hover:bg-[#FAF8F5] border border-gray-200 transition-colors"
                  >
                    <span>DOI Link</span>
                    <ExternalLink className="w-3 h-3 text-[#C59B27]" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
