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
 * matching University of Hyderabad & NeuraXlab identities.
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

    // Refined, Minimal Scientific Palette: Heritage Gold, Academic Slate-Azure, and Muted Burgundy
    const NEURON_THEMES = [
      {
        core: '#D4AF37',       // Refined Heritage Gold
        axon: 'rgba(212, 175, 55, 0.22)',
        haloR: 212, haloG: 175, haloB: 55,
        pulse: '#FDE047',
        name: 'gold'
      },
      {
        core: '#38BDF8',       // Crisp Academic Azure
        axon: 'rgba(56, 189, 248, 0.20)',
        haloR: 56, haloG: 189, haloB: 248,
        pulse: '#BAE6FD',
        name: 'azure'
      },
      {
        core: '#A82931',       // Subtle UoH Crimson Accent
        axon: 'rgba(168, 41, 49, 0.18)',
        haloR: 168, haloG: 41, haloB: 49,
        pulse: '#FFB8BF',
        name: 'crimson'
      },
      {
        core: '#E2E8F0',       // Muted Ivory / Platinum
        axon: 'rgba(226, 232, 240, 0.16)',
        haloR: 226, haloG: 232, haloB: 240,
        pulse: '#FFFFFF',
        name: 'ivory'
      }
    ];

    const nodes = [];
    const vesicles = [];
    const pulses = [];
    const maxPulses = 16;
    let clickRipple = null;

    // Central Text Exclusion Zone Mask parameters
    const getTextMask = (w, h) => ({
      cx: w / 2,
      cy: h * 0.48,
      rx: Math.min(w * 0.33, 490), // Half-width of central text area
      ry: h * 0.43,               // Half-height of central text area
    });

    const isInsideTextZone = (px, py, mask, padding = 1.0) => {
      const dx = px - mask.cx;
      const dy = py - mask.cy;
      return (dx * dx) / (mask.rx * mask.rx * padding * padding) + 
             (dy * dy) / (mask.ry * mask.ry * padding * padding) < 1.0;
    };

    // Helper: Create an Action Potential spark between connected neurons
    const createPulse = (fromNode, toNode) => {
      if (pulses.length >= maxPulses) return;
      pulses.push({
        from: fromNode,
        to: toNode,
        x1: fromNode.x,
        y1: fromNode.y,
        progress: 0,
        speed: 0.016 + Math.random() * 0.012,
        color: fromNode.theme.pulse,
        size: 1.8,
      });
    };

    // Initialize nodes strictly in vacant peripheral areas
    const initNodes = (w, h) => {
      nodes.length = 0;
      const mask = getTextMask(w, h);
      const targetCount = Math.max(26, Math.min(46, Math.floor((w * h) / 22000)));

      for (let i = 0; i < targetCount; i++) {
        const theme = NEURON_THEMES[i % NEURON_THEMES.length];
        const isHub = Math.random() < 0.22;
        const somaRadius = isHub ? Math.random() * 1.5 + 4.2 : Math.random() * 1.0 + 2.5;

        // Position nodes in vacant areas: 48% Left Flank, 48% Right Flank, 4% Outer Edges
        let x, y;
        const side = i % 2; // 0 = Left Flank, 1 = Right Flank

        if (side === 0) {
          // Left vacant flank
          x = Math.random() * (w * 0.22) + 24;
          y = Math.random() * (h * 0.84) + (h * 0.08);
        } else {
          // Right vacant flank
          x = w - (Math.random() * (w * 0.22) + 24);
          y = Math.random() * (h * 0.84) + (h * 0.08);
        }

        // Generate clean, minimal dendritic branches
        const branchCount = isHub ? 4 : 3;
        const dendrites = [];
        for (let b = 0; b < branchCount; b++) {
          const baseAngle = (b / branchCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
          const length = isHub ? Math.random() * 14 + 24 : Math.random() * 10 + 16;

          dendrites.push({
            baseAngle,
            length,
            swaySpeed: 0.012 + Math.random() * 0.015,
            swayAmp: 0.08 + Math.random() * 0.06,
            phase: Math.random() * Math.PI * 2,
            hasSub: Math.random() > 0.45,
            subAngleOffset: (Math.random() > 0.5 ? 1 : -1) * 0.35,
            subLengthRatio: 0.5,
          });
        }

        nodes.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          phaseX: Math.random() * Math.PI * 2,
          phaseY: Math.random() * Math.PI * 2,
          radius: somaRadius,
          baseRadius: somaRadius,
          theme,
          isHub,
          dendrites,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.018 + Math.random() * 0.015,
          depolarization: 0,
          rippleRadius: 0,
          zoneAlpha: 1.0,
          connectedIndices: [],
        });
      }

      // Minimal subtle background vesicles
      vesicles.length = 0;
      const vesicleCount = 20;
      for (let v = 0; v < vesicleCount; v++) {
        const side = v % 2;
        const vxPos = side === 0 ? Math.random() * (w * 0.24) : w - Math.random() * (w * 0.24);
        vesicles.push({
          x: vxPos,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.2 + 0.8,
          alpha: Math.random() * 0.35 + 0.15,
          color: side === 0 ? 'rgba(212, 175, 55, 0.4)' : 'rgba(56, 189, 248, 0.4)'
        });
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

      initNodes(width, height);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Interactive mouse tracking in vacant areas
    const mouse = { x: null, y: null, radius: 170 };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      const mask = getTextMask(width, height);

      // Only trigger if clicked outside or on periphery of text zone
      if (!isInsideTextZone(clickX, clickY, mask, 0.9)) {
        clickRipple = {
          x: clickX,
          y: clickY,
          radius: 8,
          maxRadius: 240,
          alpha: 0.6,
        };

        nodes.forEach((n) => {
          const dx = n.x - clickX;
          const dy = n.y - clickY;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 240 && n.zoneAlpha > 0.3) {
            n.depolarization = 0.8;
            n.connectedIndices.slice(0, 2).forEach((targetIdx) => {
              const target = nodes[targetIdx];
              if (target && target.zoneAlpha > 0.3) createPulse(n, target);
            });
          }
        });
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('click', handleClick);

    let time = 0;

    const render = () => {
      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      const mask = getTextMask(width, height);

      // 1. Subtle Click Ripple (Vacant Area Only)
      if (clickRipple) {
        clickRipple.radius += 5;
        clickRipple.alpha *= 0.93;

        ctx.beginPath();
        ctx.arc(clickRipple.x, clickRipple.y, clickRipple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212, 175, 55, ${clickRipple.alpha * 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();

        if (clickRipple.radius >= clickRipple.maxRadius || clickRipple.alpha < 0.02) {
          clickRipple = null;
        }
      }

      // 2. Minimal Drifting Vesicles in Vacant Areas
      for (let i = 0; i < vesicles.length; i++) {
        const v = vesicles[i];
        v.x += v.vx;
        v.y += v.vy;

        // Wrap within outer sides
        if (v.x < 10) v.x = width * 0.24;
        if (v.x > width * 0.25 && v.x < width * 0.5) v.x = 10;
        if (v.x > width * 0.5 && v.x < width * 0.75) v.x = width - 10;
        if (v.x > width - 10) v.x = width * 0.76;
        if (v.y < 0) v.y = height;
        if (v.y > height) v.y = 0;

        ctx.beginPath();
        ctx.arc(v.x, v.y, v.radius, 0, Math.PI * 2);
        ctx.fillStyle = v.color;
        ctx.fill();
      }

      // 3. Update Neurons with Text-Zone Repulsion Steering
      const isMouseInVacantArea = mouse.x !== null && !isInsideTextZone(mouse.x, mouse.y, mask, 0.95);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Smooth Brownian drift
        node.x += node.vx + Math.sin(time * 0.6 + node.phaseX) * 0.12;
        node.y += node.vy + Math.cos(time * 0.6 + node.phaseY) * 0.12;

        // Keep nodes in vacant areas: Steering away from central text zone
        const dx = node.x - mask.cx;
        const dy = node.y - mask.cy;
        const normDist = Math.sqrt((dx * dx) / (mask.rx * mask.rx) + (dy * dy) / (mask.ry * mask.ry));

        if (normDist < 1.15) {
          // Push horizontally toward respective flank
          const steer = (1.15 - normDist) * 0.55;
          node.x += (dx >= 0 ? 1 : -1) * steer * 2.2;
          node.y += (dy >= 0 ? 0.3 : -0.3) * steer;
        }

        // Soft visibility alpha: completely transparent if near text
        if (normDist < 1.25) {
          node.zoneAlpha = Math.max(0, (normDist - 0.98) / 0.27);
        } else {
          node.zoneAlpha = 1.0;
        }

        // Wrap inside flanks
        if (node.x < 15) node.x = 20;
        if (node.x > width - 15) node.x = width - 20;
        if (node.y < 20) node.y = height - 25;
        if (node.y > height - 20) node.y = 25;

        // Interactive Mouse Attraction (Only in vacant areas)
        if (isMouseInVacantArea && node.zoneAlpha > 0.2) {
          const mdx = node.x - mouse.x;
          const mdy = node.y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);

          if (mdist < mouse.radius) {
            const force = (mouse.radius - mdist) / mouse.radius;
            const angle = Math.atan2(mdy, mdx);
            node.x -= Math.cos(angle) * force * 1.2;
            node.y -= Math.sin(angle) * force * 1.2;
            node.depolarization = Math.min(0.8, node.depolarization + force * 0.1);

            // Subtle micro filament to cursor (crisp, not blurry)
            if (mdist < 100 && Math.random() < 0.18) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = `rgba(${node.theme.haloR}, ${node.theme.haloG}, ${node.theme.haloB}, 0.35)`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        }

        // Depolarization decay
        if (node.depolarization > 0) {
          node.depolarization -= 0.02;
          if (node.depolarization < 0) node.depolarization = 0;
        }

        node.connectedIndices = [];
      }

      // 4. Connect Clean Minimal Synapses in Vacant Areas
      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        if (n1.zoneAlpha < 0.15) continue;

        const maxDist = n1.isHub ? 175 : 135;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          if (n2.zoneAlpha < 0.15) continue;

          // Don't connect across the screen if it crosses the central text
          const midX = (n1.x + n2.x) / 2;
          const midY = (n1.y + n2.y) / 2;
          if (isInsideTextZone(midX, midY, mask, 0.98)) continue;

          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            n1.connectedIndices.push(j);
            n2.connectedIndices.push(i);

            const proximity = 1 - dist / maxDist;
            const combinedAlpha = proximity * 0.28 * Math.min(n1.zoneAlpha, n2.zoneAlpha);

            // Clean, crisp hairline synapse
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(${n1.theme.haloR}, ${n1.theme.haloG}, ${n1.theme.haloB}, ${combinedAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();

            // Rare spontaneous action potential spark
            if (Math.random() < 0.0018 && combinedAlpha > 0.12) {
              createPulse(n1, n2);
            }
          }
        }
      }

      // 5. Render Clean Action Potential Sparks
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulse.to.depolarization = 0.7;
          pulses.splice(p, 1);
          continue;
        }

        const cx = pulse.x1 + (pulse.to.x - pulse.x1) * pulse.progress;
        const cy = pulse.y1 + (pulse.to.y - pulse.y1) * pulse.progress;

        // Skip drawing if pulse crosses into text zone
        if (isInsideTextZone(cx, cy, mask, 0.95)) continue;

        // Clean, small spark point
        ctx.beginPath();
        ctx.arc(cx, cy, pulse.size, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.fill();
      }

      // 6. Render Clean Neurons (Soma & Delicate Arbors)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.zoneAlpha < 0.05) continue;

        const effectiveAlpha = node.zoneAlpha;

        // Draw Delicate Dendritic Arbors
        for (let d = 0; d < node.dendrites.length; d++) {
          const dendrite = node.dendrites[d];
          const sway = Math.sin(time * dendrite.swaySpeed + dendrite.phase) * dendrite.swayAmp;
          const currentAngle = dendrite.baseAngle + sway;

          const tipX = node.x + Math.cos(currentAngle) * dendrite.length;
          const tipY = node.y + Math.sin(currentAngle) * dendrite.length;

          // Curving delicate dendrite
          const ctrlX = node.x + Math.cos(currentAngle + 0.16) * (dendrite.length * 0.55);
          const ctrlY = node.y + Math.sin(currentAngle + 0.16) * (dendrite.length * 0.55);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);
          ctx.strokeStyle = `rgba(${node.theme.haloR}, ${node.theme.haloG}, ${node.theme.haloB}, ${0.32 * effectiveAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();

          // Dendrite terminal knob
          ctx.beginPath();
          ctx.arc(tipX, tipY, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${node.theme.haloR}, ${node.theme.haloG}, ${node.theme.haloB}, ${0.45 * effectiveAlpha})`;
          ctx.fill();

          // Subtle sub-branch
          if (dendrite.hasSub) {
            const subStartX = node.x + Math.cos(currentAngle) * (dendrite.length * 0.55);
            const subStartY = node.y + Math.sin(currentAngle) * (dendrite.length * 0.55);
            const subAngle = currentAngle + dendrite.subAngleOffset;
            const subLen = dendrite.length * dendrite.subLengthRatio;
            const subTipX = subStartX + Math.cos(subAngle) * subLen;
            const subTipY = subStartY + Math.sin(subAngle) * subLen;

            ctx.beginPath();
            ctx.moveTo(subStartX, subStartY);
            ctx.lineTo(subTipX, subTipY);
            ctx.strokeStyle = `rgba(${node.theme.haloR}, ${node.theme.haloG}, ${node.theme.haloB}, ${0.22 * effectiveAlpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Biological Soma Pulsation (Gentle, calm)
        node.pulsePhase += node.pulseSpeed;
        const pulseFactor = Math.sin(node.pulsePhase);
        const dynamicRadius = node.baseRadius * (1 + pulseFactor * 0.10) + node.depolarization * 1.5;

        // 1. Soft, Subtle Ambient Halo (Small, non-funky)
        const haloRadius = dynamicRadius * 1.8;
        const haloGrad = ctx.createRadialGradient(node.x, node.y, dynamicRadius * 0.5, node.x, node.y, haloRadius);
        haloGrad.addColorStop(0, `rgba(${node.theme.haloR}, ${node.theme.haloG}, ${node.theme.haloB}, ${0.25 * effectiveAlpha})`);
        haloGrad.addColorStop(1, `rgba(${node.theme.haloR}, ${node.theme.haloG}, ${node.theme.haloB}, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // 2. Crisp, Clean Soma Disc
        ctx.beginPath();
        ctx.arc(node.x, node.y, dynamicRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.theme.core;
        ctx.fill();

        // 3. Tiny Crisp Nucleus Pip
        ctx.beginPath();
        ctx.arc(node.x, node.y, dynamicRadius * 0.38, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto opacity-90"
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
      evidence: 'Investigated under NeuraXlab Systems Biology & Distant Organ Pathophysiology Program.'
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
      evidence: 'Documented in NeuraXlab Metagenomic Profiling & Cambridge Scholars Publishing treatises.'
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
