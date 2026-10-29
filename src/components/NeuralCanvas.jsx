import React, { useEffect, useRef } from 'react';

/**
 * NeuralCanvas: A restrained, elegant scientific neural network visualization.
 * Designed with authentic neuronal morphology (Cajal-inspired dendritic arbors,
 * tapering axonal projections, and delicate synaptic boutons).
 * Muted, low-brightness academic palette (University of Hyderabad gold & slate-azure)
 * with pruned, intentional connections and calm biological movement.
 */
export default function NeuralCanvas() {
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

          const dendrites = [];
          const numBranches = isPyramidal ? 4 : 3;

          for (let b = 0; b < numBranches; b++) {
            const isApical = isPyramidal && b === 0;
            const baseAngle = isApical
              ? (side === 0 ? -0.3 + (Math.random() - 0.5) * 0.3 : Math.PI + 0.3 + (Math.random() - 0.5) * 0.3)
              : (b / numBranches) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
            const length = isApical ? 38 + Math.random() * 18 : 18 + Math.random() * 12;

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

      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];

        n.x += n.vx + Math.sin(time * 0.3 + n.phaseX) * 0.05;
        n.y += n.vy + Math.cos(time * 0.3 + n.phaseY) * 0.05;

        const dx = n.x - mask.cx;
        const dy = n.y - mask.cy;
        const normDist = Math.sqrt((dx * dx) / (mask.rx * mask.rx) + (dy * dy) / (mask.ry * mask.ry));

        if (normDist < 1.12) {
          const steer = (1.12 - normDist) * 0.3;
          n.x += (dx >= 0 ? 1 : -1) * steer * 1.5;
          n.y += (dy >= 0 ? 0.2 : -0.2) * steer;
        }

        n.zoneAlpha = normDist < 1.2 ? Math.max(0, (normDist - 0.98) / 0.22) : 1.0;

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

        if (signals.length < maxSignals && Math.random() < 0.0012) {
          signals.push({
            pathway: path,
            progress: 0,
            speed: 0.005 + Math.random() * 0.003,
            color: path.theme.signal,
          });
        }
      }

      for (let s = signals.length - 1; s >= 0; s--) {
        const sig = signals[s];
        sig.progress += sig.speed;

        if (sig.progress >= 1) {
          signals.splice(s, 1);
          continue;
        }

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

      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];
        if (n.zoneAlpha < 0.05) continue;

        const alpha = n.zoneAlpha;

        for (let d = 0; d < n.dendrites.length; d++) {
          const dendrite = n.dendrites[d];
          const sway = Math.sin(time * dendrite.swaySpeed + dendrite.phase) * dendrite.swayAmp;
          const angle = dendrite.baseAngle + sway;

          const tipX = n.x + Math.cos(angle) * dendrite.length;
          const tipY = n.y + Math.sin(angle) * dendrite.length;

          const ctrlX = n.x + Math.cos(angle + 0.12) * (dendrite.length * 0.5);
          const ctrlY = n.y + Math.sin(angle + 0.12) * (dendrite.length * 0.5);

          ctx.beginPath();
          ctx.moveTo(n.x, n.y);
          ctx.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);
          ctx.strokeStyle = n.theme.dendrite;
          ctx.lineWidth = 0.65;
          ctx.stroke();

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

            ctx.beginPath();
            ctx.arc(spTipX, spTipY, 0.65, 0, Math.PI * 2);
            ctx.fillStyle = n.theme.spine;
            ctx.fill();
          }

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

          ctx.beginPath();
          ctx.arc(tipX, tipY, 0.85, 0, Math.PI * 2);
          ctx.fillStyle = n.theme.spine;
          ctx.fill();
        }

        const haloRadius = n.radius * 1.5;
        const grad = ctx.createRadialGradient(n.x, n.y, n.radius * 0.6, n.x, n.y, haloRadius);
        grad.addColorStop(0, n.theme.halo);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(n.x, n.y, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.theme.soma;
        ctx.fill();

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
