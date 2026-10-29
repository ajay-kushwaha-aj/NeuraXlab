import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  Cpu, 
  Sparkles, 
  ShieldCheck, 
  Dna, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Info,
  ChevronRight
} from 'lucide-react';

/**
 * GutBrainSystemsCanvas: A clean, minimal, high-aesthetic neural simulation
 * positioned strictly in vacant peripheral areas (left & right flanks)
 * outside the central editorial text column. Muted, sophisticated palette
 * matching University of Hyderabad & NeuroXlab identities.
 */
export function GutBrainSystemsCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = 0;
    let height = 0;
    let dpr = 1;

    // Refined, Restrained Academic Scientific Palette
    const THEMES = [
      {
        soma: 'rgba(212, 175, 55, 0.48)',      // Muted Heritage Gold
        halo: 'rgba(212, 175, 55, 0.07)',
        fiber: 'rgba(212, 175, 55, 0.13)',
        dendrite: 'rgba(212, 175, 55, 0.20)',
        spine: 'rgba(224, 184, 76, 0.32)',
        signal: 'rgba(253, 224, 71, 0.50)',
        r: 212, g: 175, b: 55
      },
      {
        soma: 'rgba(147, 197, 253, 0.42)',     // Academic Slate-Azure
        halo: 'rgba(147, 197, 253, 0.06)',
        fiber: 'rgba(147, 197, 253, 0.11)',
        dendrite: 'rgba(147, 197, 253, 0.18)',
        spine: 'rgba(186, 230, 253, 0.28)',
        signal: 'rgba(186, 230, 253, 0.45)',
        r: 147, g: 197, b: 253
      },
      {
        soma: 'rgba(203, 213, 225, 0.38)',     // Platinum / Ivory
        halo: 'rgba(203, 213, 225, 0.05)',
        fiber: 'rgba(203, 213, 225, 0.09)',
        dendrite: 'rgba(203, 213, 225, 0.15)',
        spine: 'rgba(241, 245, 249, 0.25)',
        signal: 'rgba(248, 250, 252, 0.40)',
        r: 203, g: 213, b: 225
      },
      {
        soma: 'rgba(168, 65, 73, 0.36)',       // Muted UoH Crimson Accent
        halo: 'rgba(168, 65, 73, 0.05)',
        fiber: 'rgba(168, 65, 73, 0.09)',
        dendrite: 'rgba(168, 65, 73, 0.15)',
        spine: 'rgba(244, 163, 168, 0.25)',
        signal: 'rgba(254, 202, 202, 0.40)',
        r: 168, g: 65, b: 73
      }
    ];

    const neurons = [];
    const pathways = [];
    const signals = [];
    const maxSignals = 2;

    // Central Text Exclusion Zone Mask parameters
    const getTextMask = (w, h) => ({
      cx: w / 2,
      cy: h * 0.48,
      rx: Math.min(w * 0.34, 500),
      ry: h * 0.44,
    });

    const isInsideTextZone = (px, py, mask, padding = 1.0) => {
      const dx = px - mask.cx;
      const dy = py - mask.cy;
      return (dx * dx) / (mask.rx * mask.rx * padding * padding) + 
             (dy * dy) / (mask.ry * mask.ry * padding * padding) < 1.0;
    };

    const initNeurons = (w, h) => {
      neurons.length = 0;
      pathways.length = 0;
      signals.length = 0;

      // Restrained count: strictly placed in outer flanks
      const perFlank = w < 640 ? 4 : 6;

      for (let side = 0; side < 2; side++) {
        for (let i = 0; i < perFlank; i++) {
          const theme = THEMES[(side * perFlank + i) % THEMES.length];
          const isPyramidal = i === 0 || i === 3;
          const radius = isPyramidal ? 3.6 : 2.4;

          const flankW = Math.min(w * 0.20, 240);
          const x = side === 0
            ? Math.random() * (flankW - 40) + 30
            : w - (Math.random() * (flankW - 40) + 30);
          const y = ((i + 0.6 + (Math.random() - 0.5) * 0.4) / (perFlank + 0.5)) * h;

          // Realistic Cajal-inspired dendritic trees with spines
          const dendrites = [];
          const numBranches = isPyramidal ? 4 : 3;

          for (let b = 0; b < numBranches; b++) {
            const isApical = isPyramidal && b === 0;
            const baseAngle = isApical
              ? (side === 0 ? -0.3 + (Math.random() - 0.5) * 0.3 : Math.PI + 0.3 + (Math.random() - 0.5) * 0.3)
              : (b / numBranches) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
            const length = isApical ? 38 + Math.random() * 18 : 18 + Math.random() * 12;

            // Microscopic dendritic spines along the branch
            const spines = [];
            const numSpines = isApical ? 5 : 3;
            for (let s = 0; s < numSpines; s++) {
              spines.push({
                pos: 0.3 + (s / numSpines) * 0.6,
                side: s % 2 === 0 ? 1 : -1,
                len: 2.2 + Math.random() * 1.2,
              });
            }

            dendrites.push({
              baseAngle,
              length,
              swaySpeed: 0.006 + Math.random() * 0.006,
              swayAmp: 0.04 + Math.random() * 0.03,
              phase: Math.random() * Math.PI * 2,
              hasBifurcation: isApical || Math.random() > 0.5,
              bifurcationOffset: 0.30,
              spines,
            });
          }

          neurons.push({
            id: side * perFlank + i,
            side,
            x,
            y,
            originX: x,
            originY: y,
            vx: (Math.random() - 0.5) * 0.06,
            vy: (Math.random() - 0.5) * 0.06,
            phaseX: Math.random() * Math.PI * 2,
            phaseY: Math.random() * Math.PI * 2,
            radius,
            theme,
            isPyramidal,
            dendrites,
            zoneAlpha: 1.0,
            pulsePhase: Math.random() * Math.PI * 2,
            connectionCount: 0,
          });
        }
      }

      // Build PRUNED, intentional connections:
      // In each flank, connect each neuron to ONLY 1 or 2 closest neighbors
      // forming clean axonal pathways without messy spiderweb crossovers.
      for (let i = 0; i < neurons.length; i++) {
        const n1 = neurons[i];
        const candidates = [];

        for (let j = i + 1; j < neurons.length; j++) {
          const n2 = neurons[j];
          if (n1.side !== n2.side) continue;
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 30 && dist < 200) {
            candidates.push({ target: n2, dist });
          }
        }

        candidates.sort((a, b) => a.dist - b.dist);
        const maxConns = n1.isPyramidal ? 2 : 1;
        for (let c = 0; c < candidates.length; c++) {
          if (n1.connectionCount >= maxConns) break;
          const target = candidates[c].target;
          if (target.connectionCount >= 2) continue;

          n1.connectionCount++;
          target.connectionCount++;

          const midX = (n1.x + target.x) / 2 + (Math.random() - 0.5) * 16;
          const midY = (n1.y + target.y) / 2 + (Math.random() - 0.5) * 16;

          pathways.push({
            from: n1,
            to: target,
            midX,
            midY,
            theme: n1.theme,
          });
        }
      }
    };

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width || window.innerWidth || 1200;
      height = rect.height || window.innerHeight || 800;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      initNeurons(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const mouse = { x: null, y: null };
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);
      const mask = getTextMask(width, height);

      // 1. Update Neurons with slow organic drift and central text repulsion
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];

        // Extremely slow, peaceful microscopic drift
        n.x += n.vx + Math.sin(time * 0.3 + n.phaseX) * 0.05;
        n.y += n.vy + Math.cos(time * 0.3 + n.phaseY) * 0.05;

        // Keep strictly away from central editorial text
        const dx = n.x - mask.cx;
        const dy = n.y - mask.cy;
        const normDist = Math.sqrt((dx * dx) / (mask.rx * mask.rx) + (dy * dy) / (mask.ry * mask.ry));

        if (normDist < 1.12) {
          const steer = (1.12 - normDist) * 0.3;
          n.x += (dx >= 0 ? 1 : -1) * steer * 1.5;
          n.y += (dy >= 0 ? 0.2 : -0.2) * steer;
        }

        // Soft visibility alpha
        n.zoneAlpha = normDist < 1.2 ? Math.max(0, (normDist - 0.98) / 0.22) : 1.0;

        // Gentle interactive mouse deflection (subtle, non-jarring)
        if (mouse.x !== null && !isInsideTextZone(mouse.x, mouse.y, mask, 0.95)) {
          const mdx = n.x - mouse.x;
          const mdy = n.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 120 && mdist > 1) {
            const force = (120 - mdist) / 120;
            n.x += (mdx / mdist) * force * 0.35;
            n.y += (mdy / mdist) * force * 0.35;
          }
        }
      }

      // 2. Render Pruned, Hairline Axonal Pathways
      for (let p = 0; p < pathways.length; p++) {
        const path = pathways[p];
        const alpha = Math.min(path.from.zoneAlpha, path.to.zoneAlpha);
        if (alpha < 0.05) continue;

        ctx.beginPath();
        ctx.moveTo(path.from.x, path.from.y);
        ctx.quadraticCurveTo(path.midX, path.midY, path.to.x, path.to.y);
        ctx.strokeStyle = path.theme.fiber;
        ctx.lineWidth = 0.6;
        ctx.stroke();

        // Occasional very rare, calm synaptic signal (smooth and soft)
        if (signals.length < maxSignals && Math.random() < 0.0012) {
          signals.push({
            pathway: path,
            progress: 0,
            speed: 0.005 + Math.random() * 0.003,
            color: path.theme.signal,
          });
        }
      }

      // 3. Render Restrained Synaptic Signals
      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          signals.splice(s, 1);
          continue;
        }

        // Quadratic Bezier interpolation
        const t = sig.progress;
        const p0 = sig.pathway.from;
        const p1 = { x: sig.pathway.midX, y: sig.pathway.midY };
        const p2 = sig.pathway.to;

        const bx = (1 - t) * (1 - t) * p0.x + 2 * (1 - t) * t * p1.x + t * t * p2.x;
        const by = (1 - t) * (1 - t) * p0.y + 2 * (1 - t) * t * p1.y + t * t * p2.y;

        const sigAlpha = Math.sin(t * Math.PI) * 0.55;

        ctx.beginPath();
        ctx.arc(bx, by, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = sig.color;
        ctx.globalAlpha = sigAlpha;
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      // 4. Render Neurons with Cajal Morphological Fidelity
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        if (n.zoneAlpha < 0.05) continue;

        const alpha = n.zoneAlpha;

        // Render Dendritic Arbors & Spines
        for (let d = 0; d < n.dendrites.length; d++) {
          const dendrite = n.dendrites[d];
          const sway = Math.sin(time * dendrite.swaySpeed + dendrite.phase) * dendrite.swayAmp;
          const angle = dendrite.baseAngle + sway;

          const tipX = n.x + Math.cos(angle) * dendrite.length;
          const tipY = n.y + Math.sin(angle) * dendrite.length;

          const ctrlX = n.x + Math.cos(angle + 0.12) * (dendrite.length * 0.5);
          const ctrlY = n.y + Math.sin(angle + 0.12) * (dendrite.length * 0.5);

          // Curving dendritic branch
          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);
          ctx.strokeStyle = n.theme.dendrite;
          ctx.lineWidth = 0.65;
          ctx.stroke();

          // Dendritic Spines along branch
          for (let sp = 0; sp < dendrite.spines.length; sp++) {
            const spine = dendrite.spines[sp];
            const spBaseX = n.x + (tipX - n.x) * spine.pos;
            const spBaseY = n.y + (tipY - n.y) * spine.pos;
            const spAngle = angle + (Math.PI / 2) * spine.side;
            const spTipX = spBaseX + Math.cos(spAngle) * spine.len;
            const spTipY = spBaseY + Math.sin(spAngle) * spine.len;

            ctx.beginPath();
            ctx.moveTo(spBaseX, spBaseY);
            ctx.lineTo(spTipX, spTipY);
            ctx.strokeStyle = n.theme.spine;
            ctx.lineWidth = 0.45;
            ctx.stroke();

            // Tiny spine head (gemmule)
            ctx.beginPath();
            ctx.arc(spTipX, spTipY, 0.65, 0, Math.PI * 2);
            ctx.fillStyle = n.theme.spine;
            ctx.fill();
          }

          // Subtle bifurcation
          if (dendrite.hasBifurcation) {
            const bifStartX = n.x + (tipX - n.x) * 0.6;
            const bifStartY = n.y + (tipY - n.y) * 0.6;
            const bifAngle = angle + dendrite.bifurcationOffset;
            const bifLen = dendrite.length * 0.45;
            const bifTipX = bifStartX + Math.cos(bifAngle) * bifLen;
            const bifTipY = bifStartY + Math.sin(bifAngle) * bifLen;

            ctx.beginPath();
            ctx.moveTo(bifStartX, bifStartY);
            ctx.lineTo(bifTipX, bifTipY);
            ctx.strokeStyle = n.theme.dendrite;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }

          // Terminal bouton
          ctx.beginPath();
          ctx.arc(tipX, tipY, 0.85, 0, Math.PI * 2);
          ctx.fillStyle = n.theme.spine;
          ctx.fill();
        }

        // Soft, very gentle low-intensity ambient halo (not bright/neon)
        const haloRadius = n.radius * 1.5;
        const grad = ctx.createRadialGradient(n.x, n.y, n.radius * 0.6, n.x, n.y, haloRadius);
        grad.addColorStop(0, n.theme.halo);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(n.x, n.y, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Organic soma disc
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.theme.soma;
        ctx.fill();

        // Muted central nucleolus
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-75"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

/**
 * InteractiveGutBrainAtlas: An interactive SVG anatomical diagram
 * of the Bidirectional Microbiota–Gut–Brain–Nanotherapy Axis with 4 clickable nodes.
 */
export function InteractiveGutBrainAtlas() {
  const [selectedNode, setSelectedNode] = useState('nodeA');

  const nodesData = {
    nodeA: {
      id: 'nodeA',
      letter: 'Node A',
      title: 'Ischemic Brain Penumbra (MCAO)',
      subtitle: 'Acute Cerebral Infarction & Organelle Proteostasis Breakdown',
      color: '#8B1E24',
      badge: 'Cerebral Microenvironment',
      pathway: 'Focal Middle Cerebral Artery Occlusion (MCAO) initiates rapid ATP exhaustion, excessive glutamate excitotoxicity, and blood-brain barrier (BBB) hyperpermeability.',
      mechanisms: [
        'Massive Reactive Oxygen Species (ROS) generation and mitochondrial transmembrane potential collapse.',
        'Endoplasmic Reticulum (ER) stress triggering the Unfolded Protein Response (UPR): sustained phosphorylation of eIF2α, BiP/GRP78 dissociation, and XBP-1s mRNA splicing.',
        'Altered post-translational ISGylation and SUMOylation protecting against early penumbral apoptosis.',
        'Profound transcriptional reprogramming of long non-coding RNAs (lncRNAs) and PIWI-interacting RNAs (piRNAs) regulating chromatin structure.'
      ],
      biomarkers: ['BiP/GRP78', 'p-eIF2α', 'XBP-1s', 'CHOP', 'ISG15', 'miR-29c', 'lncRNA-Malat1'],
      evidence: 'Published in Stroke (AHA), Molecular Neurobiology, and Journal of Cerebral Blood Flow & Metabolism (Nakka et al.).'
    },
    nodeB: {
      id: 'nodeB',
      letter: 'Node B',
      title: 'Bidirectional Vagus, Autonomic & Systemic Immune Axis',
      subtitle: 'Systemic Leukocyte Priming & Brain-Kidney Crosstalk',
      color: '#0F2537',
      badge: 'Neuro-Immune Highway',
      pathway: 'Stroke-induced sympathetic hyperactivity discharges catecholamines into secondary lymphoid organs (spleen, gut mesenteric lymph nodes), triggering systemic inflammatory response syndrome (SIRS).',
      mechanisms: [
        'Cholinergic Anti-inflammatory Pathway (CAP) dysregulation via the afferent/efferent vagus nerve fibers.',
        'Inversion of the Th17/Treg balance: pro-inflammatory IL-17A-producing Th17 cells traffic from the gut lamina propria into the cerebral ischemic penumbra.',
        'Distant organ crosstalk: Systemic hypoxia and oxidative stress activate the renal HIF1α–ZEB2–TRPC6 signaling axis, accelerating acute kidney injury.',
        'Systemic circulation of endotoxins (LPS) and peptidoglycans crossing leaky mucosal barriers.'
      ],
      biomarkers: ['Vagus Cholinergic Signal', 'Th17 / Treg Ratio', 'HIF1α', 'ZEB2', 'TRPC6', 'TNF-α', 'IL-1β'],
      evidence: 'Investigated under NeuroXlab Systems Biology & Distant Organ Pathophysiology Program.'
    },
    nodeC: {
      id: 'nodeC',
      letter: 'Node C',
      title: 'Nano-Formulated SCFAs + Edaravone Co-Delivery Carrier',
      subtitle: 'Engineered Multi-Target Nanotherapeutic Intervention',
      color: '#C59B27',
      badge: '2026–2029 Flagship Grant Intervention',
      pathway: 'Flagship 3-year Extramural Grant (27-Jan-2026 to 26-Jan-2029) engineered to overcome blood-brain barrier and mucosal bioavailability bottlenecks.',
      mechanisms: [
        'Biocompatible polymer-lipid hybrid nanoparticles co-encapsulating short-chain fatty acids (SCFAs: acetate, butyrate) and the free-radical scavenger Edaravone.',
        'Direct scavenging of peroxyl, hydroxyl, and superoxide free radicals at both intestinal mucosa and cerebral microvasculature.',
        'Inhibition of ER stress-driven apoptotic cascades through restoration of protein folding chaperones and suppression of Caspase-12.',
        'Enhancement of SCFA receptor (GPR41, GPR43, GPR109A) signaling on microvascular endothelial cells to restore basal cerebral blood flow.'
      ],
      biomarkers: ['Nanoparticle DLS Size (110 nm)', 'Zeta Potential (-24 mV)', 'Edaravone Bioavailability', 'SCFA GC-MS Titers', 'GRP78 Stabilization'],
      evidence: 'Funded under Dr. Venkata Prasuja Nakka Extramural Grant (2026–2029), School of Life Sciences, UoH.'
    },
    nodeD: {
      id: 'nodeD',
      letter: 'Node D',
      title: 'Intestinal Microbiome & Epithelial Tight-Junction Barrier',
      subtitle: 'Gut Dysbiosis & Mucosal Permeability Restoration',
      color: '#8B1E24',
      badge: 'Enteric Microenvironment',
      pathway: 'Acute focal cerebral ischemia disrupts gut motility within 6 hours, depleting beneficial commensal anaerobes and collapsing the protective mucosal seal.',
      mechanisms: [
        'Rapid post-stroke dysbiosis characterized by dramatic loss of SCFA-producing Firmicutes, Roseburia, and Akkermansia, with opportunistic expansion of Enterobacteriaceae.',
        'Disruption of epithelial tight junctions: marked down-regulation of Zonula Occludens-1 (ZO-1), Occludin, and Claudin-1 causing leaky gut syndrome.',
        'Translocation of bacterial pathogen-associated molecular patterns (PAMPs) into mesenteric circulation.',
        'Nanotherapy rescue: SCFA supplementation promotes mucosal stem cell proliferation, enhances mucin secretion, and tightens ZO-1/Occludin assemblies.'
      ],
      biomarkers: ['ZO-1', 'Occludin', 'Claudin-1', '16S Shannon Diversity', 'Bacteroidetes/Firmicutes Ratio', 'Fecal Butyrate'],
      evidence: 'Documented in NeuroXlab Metagenomic Profiling & Cambridge Scholars Publishing treatises.'
    }
  };

  const activeData = nodesData[selectedNode];

  return (
    <div className="bg-white rounded-3xl border-2 border-[#C59B27]/40 shadow-xl overflow-hidden">
      {/* Top Banner Strip */}
      <div className="bg-[#0F2537] text-white px-6 py-4 border-b-2 border-[#C59B27] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#8B1E24] text-white flex items-center justify-center font-serif font-bold text-base border border-[#C59B27]">
            Ω
          </div>
          <div>
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
              Interactive Systems Atlas: Bidirectional Microbiota–Gut–Brain–Nanotherapy Axis
            </h3>
            <p className="text-xs text-[#E0B84C] font-mono">
              Click any anatomical node (A, B, C, D) below to inspect live molecular telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {Object.keys(nodesData).map((key) => {
            const isCur = selectedNode === key;
            return (
              <button
                key={key}
                onClick={() => setSelectedNode(key)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all ${
                  isCur
                    ? 'bg-[#8B1E24] text-white shadow border border-[#C59B27]'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                {key.replace('node', 'Node ')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: SVG Diagram + Live Telemetry Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 items-stretch">
        {/* Left Column: Interactive Vector Diagram (Lg: 7 cols) */}
        <div className="lg:col-span-7 bg-[#FAF8F5] rounded-2xl p-4 sm:p-6 border border-gray-200 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Background Circuit Graphics */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#8B1E24_1px,transparent_1px)] [background-size:16px_16px]" />

          <div className="relative z-10 w-full flex items-center justify-center">
            <svg
              viewBox="0 0 520 620"
              className="w-full max-w-[480px] h-auto drop-shadow-md select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#8B1E24" />
                  <stop offset="100%" stopColor="#5A1116" />
                </linearGradient>
                <linearGradient id="gutGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0F2537" />
                  <stop offset="100%" stopColor="#8B1E24" />
                </linearGradient>
                <linearGradient id="nanoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F3D17A" />
                  <stop offset="100%" stopColor="#C59B27" />
                </linearGradient>
                <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* 1. BRAIN REGION (TOP) */}
              <g className="cursor-pointer" onClick={() => setSelectedNode('nodeA')}>
                {/* Brain Silhouette Outline */}
                <path
                  d="M170,110 C150,70 200,30 260,30 C320,30 370,70 350,110 C375,130 365,180 325,190 C300,195 285,180 260,185 C235,180 220,195 195,190 C155,180 145,130 170,110 Z"
                  fill="url(#brainGrad)"
                  stroke="#C59B27"
                  strokeWidth="2.5"
                  opacity={selectedNode === 'nodeA' ? '1' : '0.85'}
                />
                {/* Left/Right Hemisphere demarcation */}
                <path d="M260,35 Q255,110 260,185" stroke="#F3D17A" strokeWidth="2" strokeDasharray="3,3" opacity="0.8" />
                {/* Penumbra Ischemic Core representation */}
                <circle cx="310" cy="115" r="28" fill="#FAF8F5" fillOpacity="0.25" stroke="#F3D17A" strokeWidth="1.5" />
                <text x="310" y="118" textAnchor="middle" fontSize="10" fill="#FFFFFF" fontWeight="bold">MCAO Infarct</text>
              </g>

              {/* 2. BIDIRECTIONAL AXIS CONDUITS (MIDDLE) */}
              {/* Vagus Nerve & Sympathetic Highway */}
              <g className="cursor-pointer" onClick={() => setSelectedNode('nodeB')}>
                {/* Descending Sympathetic / Vagus Pathway */}
                <path
                  d="M230,190 Q170,300 210,410"
                  fill="none"
                  stroke="#8B1E24"
                  strokeWidth="3.5"
                  strokeDasharray="6,4"
                  opacity={selectedNode === 'nodeB' ? '1' : '0.6'}
                />
                {/* Ascending Immune / Cytokine Pathway */}
                <path
                  d="M290,190 Q350,300 310,410"
                  fill="none"
                  stroke="#C59B27"
                  strokeWidth="3.5"
                  strokeDasharray="6,4"
                  opacity={selectedNode === 'nodeB' ? '1' : '0.6'}
                />
                {/* Central Distant Organ: Kidney Silhouette Accent */}
                <rect x="220" y="275" width="80" height="48" rx="12" fill="#0F2537" stroke="#C59B27" strokeWidth="1.5" />
                <text x="260" y="296" textAnchor="middle" fontSize="9" fill="#E0B84C" fontWeight="bold">HIF1α–TRPC6</text>
                <text x="260" y="310" textAnchor="middle" fontSize="8" fill="#FFFFFF">Kidney Axis</text>
              </g>

              {/* 3. NANOTHERAPY CARRIER (NODE C) */}
              <g className="cursor-pointer" onClick={() => setSelectedNode('nodeC')}>
                {/* Nanoparticle Core Sphere */}
                <circle
                  cx="405"
                  cy="295"
                  r="34"
                  fill="url(#nanoGrad)"
                  stroke="#8B1E24"
                  strokeWidth="2.5"
                  filter="url(#nodeGlow)"
                  opacity={selectedNode === 'nodeC' ? '1' : '0.9'}
                />
                <circle cx="405" cy="295" r="24" fill="#0F2537" opacity="0.4" />
                <text x="405" y="292" textAnchor="middle" fontSize="10" fill="#0F2537" fontWeight="bold">SCFA +</text>
                <text x="405" y="306" textAnchor="middle" fontSize="9" fill="#0F2537" fontWeight="bold">Edaravone</text>
                
                {/* Targeting Ligands / Nanovesicles */}
                <line x1="405" y1="261" x2="405" y2="252" stroke="#8B1E24" strokeWidth="2.5" />
                <line x1="405" y1="329" x2="405" y2="338" stroke="#8B1E24" strokeWidth="2.5" />
                <line x1="371" y1="295" x2="362" y2="295" stroke="#8B1E24" strokeWidth="2.5" />
                <line x1="439" y1="295" x2="448" y2="295" stroke="#8B1E24" strokeWidth="2.5" />
              </g>

              {/* 4. INTESTINAL MICROBIOME & BARRIER (BOTTOM) */}
              <g className="cursor-pointer" onClick={() => setSelectedNode('nodeD')}>
                {/* Intestinal Loop Schematic */}
                <path
                  d="M160,420 C180,395 240,400 260,425 C280,400 340,395 360,420 C380,450 370,510 330,535 C290,560 230,560 190,535 C150,510 140,450 160,420 Z"
                  fill="url(#gutGrad)"
                  stroke="#C59B27"
                  strokeWidth="2.5"
                  opacity={selectedNode === 'nodeD' ? '1' : '0.85'}
                />
                {/* Epithelial Brush Border & Tight Junctions */}
                <path d="M180,450 Q260,435 340,450" stroke="#FAF8F5" strokeWidth="2.5" strokeDasharray="4,2" />
                <text x="260" y="480" textAnchor="middle" fontSize="11" fill="#FAF8F5" fontWeight="bold">Gut Microbiome Lumen</text>
                <text x="260" y="498" textAnchor="middle" fontSize="9" fill="#E0B84C">ZO-1 / Occludin Barrier</text>
              </g>

              {/* 5. INTERACTIVE NODE PINS (A, B, C, D) */}
              {/* PIN A */}
              <g
                className="cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() => setSelectedNode('nodeA')}
              >
                <circle
                  cx="210"
                  cy="95"
                  r="18"
                  fill={selectedNode === 'nodeA' ? '#8B1E24' : '#FFFFFF'}
                  stroke="#C59B27"
                  strokeWidth="3"
                  filter="url(#nodeGlow)"
                />
                <text
                  x="210"
                  y="100"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="bold"
                  fill={selectedNode === 'nodeA' ? '#FFFFFF' : '#8B1E24'}
                >
                  A
                </text>
                {selectedNode === 'nodeA' && (
                  <circle cx="210" cy="95" r="24" fill="none" stroke="#8B1E24" strokeWidth="1.5" strokeDasharray="3,3" />
                )}
              </g>

              {/* PIN B */}
              <g
                className="cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() => setSelectedNode('nodeB')}
              >
                <circle
                  cx="140"
                  cy="300"
                  r="18"
                  fill={selectedNode === 'nodeB' ? '#0F2537' : '#FFFFFF'}
                  stroke="#C59B27"
                  strokeWidth="3"
                  filter="url(#nodeGlow)"
                />
                <text
                  x="140"
                  y="305"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="bold"
                  fill={selectedNode === 'nodeB' ? '#FFFFFF' : '#0F2537'}
                >
                  B
                </text>
                {selectedNode === 'nodeB' && (
                  <circle cx="140" cy="300" r="24" fill="none" stroke="#0F2537" strokeWidth="1.5" strokeDasharray="3,3" />
                )}
              </g>

              {/* PIN C */}
              <g
                className="cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() => setSelectedNode('nodeC')}
              >
                <circle
                  cx="405"
                  cy="235"
                  r="18"
                  fill={selectedNode === 'nodeC' ? '#C59B27' : '#FFFFFF'}
                  stroke="#8B1E24"
                  strokeWidth="3"
                  filter="url(#nodeGlow)"
                />
                <text
                  x="405"
                  y="240"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="bold"
                  fill={selectedNode === 'nodeC' ? '#0F2537' : '#8B1E24'}
                >
                  C
                </text>
                {selectedNode === 'nodeC' && (
                  <circle cx="405" cy="235" r="24" fill="none" stroke="#C59B27" strokeWidth="1.5" strokeDasharray="3,3" />
                )}
              </g>

              {/* PIN D */}
              <g
                className="cursor-pointer transform hover:scale-110 transition-transform"
                onClick={() => setSelectedNode('nodeD')}
              >
                <circle
                  cx="260"
                  cy="565"
                  r="18"
                  fill={selectedNode === 'nodeD' ? '#8B1E24' : '#FFFFFF'}
                  stroke="#C59B27"
                  strokeWidth="3"
                  filter="url(#nodeGlow)"
                />
                <text
                  x="260"
                  y="570"
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="bold"
                  fill={selectedNode === 'nodeD' ? '#FFFFFF' : '#8B1E24'}
                >
                  D
                </text>
                {selectedNode === 'nodeD' && (
                  <circle cx="260" cy="565" r="24" fill="none" stroke="#8B1E24" strokeWidth="1.5" strokeDasharray="3,3" />
                )}
              </g>
            </svg>
          </div>

          {/* Quick Node Legend */}
          <div className="pt-4 border-t border-gray-200 grid grid-cols-2 gap-2 text-[11px] font-semibold text-[#0F2537]/80">
            <button
              onClick={() => setSelectedNode('nodeA')}
              className={`p-1.5 rounded-lg text-left flex items-center gap-1.5 transition-colors ${selectedNode === 'nodeA' ? 'bg-[#8B1E24] text-white' : 'hover:bg-gray-100'}`}
            >
              <span className="w-4 h-4 rounded-full bg-[#8B1E24] text-white text-[10px] flex items-center justify-center font-bold">A</span>
              <span className="truncate">Ischemic Brain Penumbra</span>
            </button>
            <button
              onClick={() => setSelectedNode('nodeB')}
              className={`p-1.5 rounded-lg text-left flex items-center gap-1.5 transition-colors ${selectedNode === 'nodeB' ? 'bg-[#0F2537] text-white' : 'hover:bg-gray-100'}`}
            >
              <span className="w-4 h-4 rounded-full bg-[#0F2537] text-white text-[10px] flex items-center justify-center font-bold">B</span>
              <span className="truncate">Vagus &amp; Immune Highway</span>
            </button>
            <button
              onClick={() => setSelectedNode('nodeC')}
              className={`p-1.5 rounded-lg text-left flex items-center gap-1.5 transition-colors ${selectedNode === 'nodeC' ? 'bg-[#C59B27] text-white' : 'hover:bg-gray-100'}`}
            >
              <span className="w-4 h-4 rounded-full bg-[#C59B27] text-white text-[10px] flex items-center justify-center font-bold">C</span>
              <span className="truncate">SCFA + Edaravone Carrier</span>
            </button>
            <button
              onClick={() => setSelectedNode('nodeD')}
              className={`p-1.5 rounded-lg text-left flex items-center gap-1.5 transition-colors ${selectedNode === 'nodeD' ? 'bg-[#8B1E24] text-white' : 'hover:bg-gray-100'}`}
            >
              <span className="w-4 h-4 rounded-full bg-[#8B1E24] text-white text-[10px] flex items-center justify-center font-bold">D</span>
              <span className="truncate">Gut Microbiome Barrier</span>
            </button>
          </div>
        </div>

        {/* Right Column: Live Telemetry Readout Card (Lg: 5 cols) */}
        <div className="lg:col-span-5 bg-[#FAF8F5] rounded-2xl p-6 sm:p-7 border border-[#C59B27]/40 shadow-sm flex flex-col justify-between space-y-5 animate-in fade-in duration-200">
          <div className="space-y-4">
            {/* Header / Active Indicator */}
            <div className="flex items-center justify-between gap-2 border-b border-gray-200 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-[#8B1E24] text-white text-xs font-mono font-bold flex items-center justify-center shadow">
                  {activeData.letter.split(' ')[1]}
                </span>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#8B1E24] font-bold tracking-wider">
                    {activeData.badge}
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] leading-tight">
                    {activeData.title}
                  </h4>
                </div>
              </div>
            </div>

            <p className="text-xs font-semibold text-[#C59B27] uppercase tracking-wide">
              {activeData.subtitle}
            </p>

            {/* Pathophysiology Narrative */}
            <p className="text-xs sm:text-sm text-[#0F2537]/85 leading-relaxed bg-white p-3.5 rounded-xl border border-gray-200">
              {activeData.pathway}
            </p>

            {/* Molecular Mechanisms */}
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F2537]">
                Molecular Cascade &amp; Mechanisms:
              </span>
              <ul className="space-y-1.5">
                {activeData.mechanisms.map((mech, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#0F2537]/80 leading-relaxed">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8B1E24] flex-shrink-0 mt-0.5" />
                    <span>{mech}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Verified Biomarkers */}
            <div className="space-y-2 pt-1">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F2537]">
                Key Assay Biomarkers &amp; Targets:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeData.biomarkers.map((bm, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-[#8B1E24] border border-[#C59B27]/40 font-semibold"
                  >
                    {bm}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Scientific Evidence Footer */}
          <div className="pt-3 border-t border-gray-200 text-[11px] text-[#0F2537]/70 space-y-1">
            <span className="font-semibold text-[#0F2537]">Citation &amp; Grant Footnote:</span>
            <p className="italic">{activeData.evidence}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
