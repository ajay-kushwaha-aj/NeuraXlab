import React, { useEffect, useRef } from 'react';

/**
 * NeuralCanvas: A clean, minimal, high-aesthetic neural simulation
 * positioned strictly in vacant peripheral areas (left & right flanks)
 * outside the central editorial text column. Muted, sophisticated palette
 * matching University of Hyderabad & NeuroXlab identities.
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
      rx: Math.min(w * 0.33, 490),
      ry: h * 0.43,
    });

    const isInsideTextZone = (px, py, mask, padding = 1.0) => {
      const dx = px - mask.cx;
      const dy = py - mask.cy;
      return (dx * dx) / (mask.rx * mask.rx * padding * padding) + 
             (dy * dy) / (mask.ry * mask.ry * padding * padding) < 1.0;
    };

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

    const initNodes = (w, h) => {
      nodes.length = 0;
      const targetCount = Math.max(26, Math.min(46, Math.floor((w * h) / 22000)));

      for (let i = 0; i < targetCount; i++) {
        const theme = NEURON_THEMES[i % NEURON_THEMES.length];
        const isHub = Math.random() < 0.22;
        const somaRadius = isHub ? Math.random() * 1.5 + 4.2 : Math.random() * 1.0 + 2.5;

        let x, y;
        const side = i % 2;

        if (side === 0) {
          x = Math.random() * (w * 0.22) + 24;
          y = Math.random() * (h * 0.84) + (h * 0.08);
        } else {
          x = w - (Math.random() * (w * 0.22) + 24);
          y = Math.random() * (h * 0.84) + (h * 0.08);
        }

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

      for (let i = 0; i < vesicles.length; i++) {
        const v = vesicles[i];
        v.x += v.vx;
        v.y += v.vy;

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

      const isMouseInVacantArea = mouse.x !== null && !isInsideTextZone(mouse.x, mouse.y, mask, 0.95);

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        node.x += node.vx + Math.sin(time * 0.6 + node.phaseX) * 0.12;
        node.y += node.vy + Math.cos(time * 0.6 + node.phaseY) * 0.12;

        const dx = node.x - mask.cx;
        const dy = node.y - mask.cy;
        const normDist = Math.sqrt((dx * dx) / (mask.rx * mask.rx) + (dy * dy) / (mask.ry * mask.ry));

        if (normDist < 1.15) {
          const steer = (1.15 - normDist) * 0.55;
          node.x += (dx >= 0 ? 1 : -1) * steer * 2.2;
          node.y += (dy >= 0 ? 0.3 : -0.3) * steer;
        }

        if (normDist < 1.25) {
          node.zoneAlpha = Math.max(0, (normDist - 0.98) / 0.27);
        } else {
          node.zoneAlpha = 1.0;
        }

        if (node.x < 15) node.x = 20;
        if (node.x > width - 15) node.x = width - 20;
        if (node.y < 20) node.y = height - 25;
        if (node.y > height - 20) node.y = 25;

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

        if (node.depolarization > 0) {
          node.depolarization -= 0.02;
          if (node.depolarization < 0) node.depolarization = 0;
        }

        node.connectedIndices = [];
      }

      for (let i = 0; i < nodes.length; i++) {
        const n1 = nodes[i];
        if (n1.zoneAlpha < 0.15) continue;

        const maxDist = n1.isHub ? 175 : 135;

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          if (n2.zoneAlpha < 0.15) continue;

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

            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(${n1.theme.haloR}, ${n1.theme.haloG}, ${n1.theme.haloB}, ${combinedAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();

            if (Math.random() < 0.0018 && combinedAlpha > 0.12) {
              createPulse(n1, n2);
            }
          }
        }
      }

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

        if (isInsideTextZone(cx, cy, mask, 0.95)) continue;

        ctx.beginPath();
        ctx.arc(cx, cy, pulse.size, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.fill();
      }

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.zoneAlpha < 0.05) continue;

        const effectiveAlpha = node.zoneAlpha;

        for (let d = 0; d < node.dendrites.length; d++) {
          const dendrite = node.dendrites[d];
          const sway = Math.sin(time * dendrite.swaySpeed + dendrite.phase) * dendrite.swayAmp;
          const currentAngle = dendrite.baseAngle + sway;

          const tipX = node.x + Math.cos(currentAngle) * dendrite.length;
          const tipY = node.y + Math.sin(currentAngle) * dendrite.length;

          const ctrlX = node.x + Math.cos(currentAngle + 0.16) * (dendrite.length * 0.55);
          const ctrlY = node.y + Math.sin(currentAngle + 0.16) * (dendrite.length * 0.55);

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.quadraticCurveTo(ctrlX, ctrlY, tipX, tipY);
          ctx.strokeStyle = `rgba(${node.theme.haloR}, ${node.theme.haloG}, ${node.theme.haloB}, ${0.32 * effectiveAlpha})`;
          ctx.lineWidth = 0.75;
          ctx.stroke();

          ctx.beginPath();
          ctx.arc(tipX, tipY, 1.2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${node.theme.haloR}, ${node.theme.haloG}, ${node.theme.haloB}, ${0.45 * effectiveAlpha})`;
          ctx.fill();

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

        node.pulsePhase += node.pulseSpeed;
        const pulseFactor = Math.sin(node.pulsePhase);
        const dynamicRadius = node.baseRadius * (1 + pulseFactor * 0.10) + node.depolarization * 1.5;

        const haloRadius = dynamicRadius * 1.8;
        const haloGrad = ctx.createRadialGradient(node.x, node.y, dynamicRadius * 0.5, node.x, node.y, haloRadius);
        haloGrad.addColorStop(0, `rgba(${node.theme.haloR}, ${node.theme.haloG}, ${node.theme.haloB}, ${0.25 * effectiveAlpha})`);
        haloGrad.addColorStop(1, `rgba(${node.theme.haloR}, ${node.theme.haloG}, ${node.theme.haloB}, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(node.x, node.y, dynamicRadius, 0, Math.PI * 2);
        ctx.fillStyle = node.theme.core;
        ctx.fill();

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
