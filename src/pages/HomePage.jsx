import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Users,
  Calendar,
  Briefcase,
  Flame,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Pause,
  Play,
  Bell,
  Clock,
  Activity,
  Cpu,
  Dna,
  ShieldCheck,
  CheckCircle2,
  Network,
  TrendingUp,
  PieChart,
  BarChart3,
  User,
  ZoomIn,
  Eye,
  EyeOff,
  ArrowUpRight,
  Compass,
  Award,
  Building2
} from 'lucide-react';
import NeuroXlabLogo from '../components/NeuroXlabLogo';
import ImageLightboxModal from '../components/ImageLightboxModal';
import uohSeal from '../assets/uoh_seal.png';
import { LAB_INFO, TEAM_MEMBERS, FUNDING_AGENCIES } from '../data/labData';

/**
 * InteractiveNeuronHeroCanvas
 * Custom HTML5 Canvas engine rendering organic pyramidal & multipolar neurons,
 * myelinated axons with Nodes of Ranvier, dendritic arbors, action potential
 * impulses, and mouse-responsive synaptic signaling.
 */
function InteractiveNeuronHeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId = null;
    let isVisible = true;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Check reduced-motion accessibility preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let prefersReducedMotion = motionQuery.matches;

    // Deterministic PRNG for consistent scientific layout across renders
    const createRNG = (seed) => {
      let s = seed;
      return () => {
        s = (s * 16807) % 2147483647;
        return (s - 1) / 2147483646;
      };
    };

    // Pointer tracking with smooth interpolation
    const pointer = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
      radius: 180
    };

    // Scene entities
    let neurons = [];
    let allNodes = [];
    let allSegments = [];
    let pulses = [];
    let particles = [];
    let bokehOrbs = [];

    // Sample point on a quadratic Bezier curve
    const getQuadPoint = (p0x, p0y, cx, cy, p1x, p1y, t) => {
      const inv = 1 - t;
      return {
        x: inv * inv * p0x + 2 * inv * t * cx + t * t * p1x,
        y: inv * inv * p0y + 2 * inv * t * cy + t * t * p1y
      };
    };

    // Build organic dendritic and axonal trees
    const buildScene = () => {
      const rng = createRNG(42091);
      neurons = [];
      allNodes = [];
      allSegments = [];
      pulses = [];
      particles = [];
      bokehOrbs = [];

      const isMobile = width < 768;
      const isTablet = width >= 768 && width < 1024;

      // Background out-of-focus bokeh orbs (matches visual reference depth)
      const bokehCount = isMobile ? 8 : 16;
      for (let i = 0; i < bokehCount; i++) {
        const onLeft = i % 2 === 0;
        const bx = onLeft
          ? width * (0.02 + rng() * 0.32)
          : width * (0.66 + rng() * 0.32);
        const by = height * (0.05 + rng() * 0.9);
        const isGold = rng() > 0.45;
        bokehOrbs.push({
          x: bx,
          y: by,
          r: 18 + rng() * 48,
          color: isGold ? '231, 185, 68' : '79, 157, 204',
          alpha: 0.03 + rng() * 0.06,
          phase: rng() * Math.PI * 2,
          speed: 0.3 + rng() * 0.5
        });
      }

      // Floating synaptic dust particles
      const particleCount = isMobile ? 28 : isTablet ? 55 : 85;
      for (let i = 0; i < particleCount; i++) {
        let px = rng() * width;
        if (px > width * 0.32 && px < width * 0.68 && rng() < 0.72) {
          px = rng() < 0.5 ? rng() * width * 0.3 : width * (0.7 + rng() * 0.3);
        }
        particles.push({
          x: px,
          y: rng() * height,
          vx: (rng() - 0.5) * 0.22,
          vy: (rng() - 0.5) * 0.22,
          r: 0.9 + rng() * 2.1,
          isGold: rng() > 0.42,
          alpha: 0.2 + rng() * 0.55,
          phase: rng() * Math.PI * 2
        });
      }

      // Define Neuron Templates matching the reference screenshot composition
      const templates = isMobile
        ? [
          {
            id: 'm-left-main',
            x: width * 0.08,
            y: height * 0.56,
            somaRadius: 19,
            layer: 'fg',
            scale: 0.72,
            opacity: 0.85,
            parallax: 0.5,
            trunkAngles: [-1.1, -0.35, 0.45, 1.25],
            axonIndex: 1
          },
          {
            id: 'm-right-main',
            x: width * 0.92,
            y: height * 0.34,
            somaRadius: 18,
            layer: 'fg',
            scale: 0.7,
            opacity: 0.85,
            parallax: 0.5,
            trunkAngles: [2.75, 3.4, -2.1, 2.0],
            axonIndex: 0
          },
          {
            id: 'm-right-bottom',
            x: width * 0.86,
            y: height * 0.82,
            somaRadius: 13,
            layer: 'bg',
            scale: 0.55,
            opacity: 0.45,
            parallax: 0.25,
            trunkAngles: [-2.3, -1.5, 2.7],
            axonIndex: -1
          }
        ]
        : [
          // 1. Primary Foreground Left Neuron
          {
            id: 'fg-left',
            x: width * (isTablet ? 0.08 : 0.105),
            y: height * 0.55,
            somaRadius: isTablet ? 24 : 30,
            layer: 'fg',
            scale: isTablet ? 0.85 : 1.0,
            opacity: 0.96,
            parallax: 1.0,
            trunkAngles: [-1.75, -1.15, -0.52, -0.06, 0.58, 1.32, 2.28, 2.95],
            axonIndex: 3
          },
          // 2. Primary Foreground Right Neuron (with myelinated axon)
          {
            id: 'fg-right',
            x: width * (isTablet ? 0.92 : 0.935),
            y: height * 0.36,
            somaRadius: isTablet ? 23 : 28,
            layer: 'fg',
            scale: isTablet ? 0.85 : 1.0,
            opacity: 0.96,
            parallax: 1.0,
            trunkAngles: [2.83, -2.45, -1.78, -1.1, 1.85, 2.32],
            axonIndex: 0,
            isMyelinatedAxon: true
          },
          // 3. Secondary Bottom-Right Midground Neuron
          {
            id: 'mid-right-bottom',
            x: width * 0.78,
            y: height * 0.82,
            somaRadius: isTablet ? 16 : 20,
            layer: 'mid',
            scale: isTablet ? 0.7 : 0.82,
            opacity: 0.58,
            parallax: 0.55,
            trunkAngles: [-2.4, -1.65, -0.85, 0.2, 1.3, 2.45],
            axonIndex: 0
          },
          // 4. Secondary Top-Right Background Neuron
          {
            id: 'bg-right-top',
            x: width * 0.86,
            y: height * 0.14,
            somaRadius: 15,
            layer: 'bg',
            scale: 0.65,
            opacity: 0.38,
            parallax: 0.3,
            trunkAngles: [2.3, 3.0, -2.1, 1.4],
            axonIndex: -1
          },
          // 5. Secondary Top-Left Background Neuron
          {
            id: 'bg-left-top',
            x: width * 0.17,
            y: height * 0.15,
            somaRadius: 14,
            layer: 'bg',
            scale: 0.62,
            opacity: 0.35,
            parallax: 0.3,
            trunkAngles: [-0.4, 0.45, 1.25, 2.3],
            axonIndex: -1
          },
          // 6. Secondary Bottom-Left Background Neuron
          {
            id: 'bg-left-bottom',
            x: width * 0.18,
            y: height * 0.89,
            somaRadius: 15,
            layer: 'bg',
            scale: 0.65,
            opacity: 0.4,
            parallax: 0.35,
            trunkAngles: [-1.3, -0.55, 0.2, -2.1],
            axonIndex: -1
          }
        ];

      templates.forEach((tpl, nIdx) => {
        const somaNode = {
          id: `soma-${nIdx}`,
          neuronIdx: nIdx,
          x: tpl.x,
          y: tpl.y,
          renderX: tpl.x,
          renderY: tpl.y,
          radius: tpl.somaRadius,
          isSoma: true,
          isGold: true,
          layer: tpl.layer,
          parallax: tpl.parallax,
          energy: 0.35,
          childrenSegments: []
        };
        allNodes.push(somaNode);

        const neuronObj = {
          ...tpl,
          somaNode,
          segments: [],
          nodes: [somaNode]
        };

        // Recursive dendritic/axonal branch builder
        const growBranch = (parentNode, angle, length, thickness, depth, maxDepth, isAxon, isMyelinated) => {
          const curveSpread = isAxon ? 0.16 : 0.38;
          const endAngle = angle + (rng() - 0.5) * curveSpread;
          let ex = parentNode.x + Math.cos(endAngle) * length;
          let ey = parentNode.y + Math.sin(endAngle) * length;

          // Keep central text area calm
          const centerLeft = width * 0.29;
          const centerRight = width * 0.71;
          const centerTop = height * 0.18;
          const centerBottom = height * 0.82;

          if (ex > centerLeft && ex < centerRight && ey > centerTop && ey < centerBottom) {
            if (!isAxon && depth > 1) {
              length *= 0.68;
              ex = parentNode.x + Math.cos(endAngle) * length;
              ey = parentNode.y + Math.sin(endAngle) * length;
            }
          }

          // Control point for smooth organic quadratic Bezier curve
          const perpAngle = endAngle + Math.PI / 2;
          const bulge = (rng() - 0.5) * length * (isMyelinated ? 0.08 : 0.28);
          const cx = (parentNode.x + ex) * 0.5 + Math.cos(perpAngle) * bulge;
          const cy = (parentNode.y + ey) * 0.5 + Math.sin(perpAngle) * bulge;

          const childNode = {
            id: `node-${nIdx}-${allNodes.length}`,
            neuronIdx: nIdx,
            x: ex,
            y: ey,
            renderX: ex,
            renderY: ey,
            radius: Math.max(1.2, thickness * 0.75),
            isSoma: false,
            isSynapse: depth >= maxDepth - 1 || rng() > 0.55,
            isRanvier: isMyelinated && depth <= 3,
            isGold: (isMyelinated && depth <= 3) || rng() > 0.48,
            layer: tpl.layer,
            parallax: tpl.parallax * (1 + depth * 0.08),
            energy: 0,
            childrenSegments: []
          };
          allNodes.push(childNode);
          neuronObj.nodes.push(childNode);

          const segment = {
            id: `seg-${allSegments.length}`,
            neuronIdx: nIdx,
            from: parentNode,
            to: childNode,
            cx,
            cy,
            thicknessStart: thickness,
            thicknessEnd: Math.max(0.6, thickness * (isMyelinated && depth < 3 ? 0.88 : 0.66)),
            depth,
            maxDepth,
            isAxon,
            isMyelinated: isMyelinated && depth <= 3,
            opacity: tpl.opacity * (1 - (depth - 1) * 0.12),
            energy: 0
          };

          parentNode.childrenSegments.push(segment);
          allSegments.push(segment);
          neuronObj.segments.push(segment);

          if (depth < maxDepth) {
            if (isMyelinated && depth < 3) {
              growBranch(
                childNode,
                endAngle + (rng() - 0.5) * 0.14,
                length * 0.92,
                segment.thicknessEnd,
                depth + 1,
                maxDepth,
                true,
                true
              );
              if (rng() > 0.35) {
                const sideSign = rng() > 0.5 ? 1 : -1;
                growBranch(
                  childNode,
                  endAngle + sideSign * (0.55 + rng() * 0.35),
                  length * 0.55,
                  segment.thicknessEnd * 0.45,
                  depth + 2,
                  maxDepth,
                  false,
                  false
                );
              }
            } else {
              const numChildren = depth === 1 && rng() > 0.55 ? 3 : 2;
              for (let c = 0; c < numChildren; c++) {
                const spread = numChildren === 3 ? (c - 1) * 0.42 : (c === 0 ? -1 : 1) * (0.26 + rng() * 0.25);
                const nextLen = length * (0.68 + rng() * 0.2);
                const nextThick = Math.max(0.55, segment.thicknessEnd * 0.72);
                growBranch(
                  childNode,
                  endAngle + spread,
                  nextLen,
                  nextThick,
                  depth + 1,
                  maxDepth,
                  isAxon,
                  false
                );
              }
            }
          } else if (isAxon || depth === maxDepth) {
            const sprayCount = isMobile ? 2 : 3;
            for (let s = 0; s < sprayCount; s++) {
              const sprayAngle = endAngle + (s - (sprayCount - 1) / 2) * (0.35 + rng() * 0.2);
              const sprayLen = 18 + rng() * 26;
              const sx = childNode.x + Math.cos(sprayAngle) * sprayLen;
              const sy = childNode.y + Math.sin(sprayAngle) * sprayLen;
              const scx = (childNode.x + sx) * 0.5 + (rng() - 0.5) * 10;
              const scy = (childNode.y + sy) * 0.5 + (rng() - 0.5) * 10;

              const boutonNode = {
                id: `bouton-${nIdx}-${allNodes.length}`,
                neuronIdx: nIdx,
                x: sx,
                y: sy,
                renderX: sx,
                renderY: sy,
                radius: 1.4 + rng() * 1.2,
                isSoma: false,
                isSynapse: true,
                isBouton: true,
                isGold: rng() > 0.3,
                layer: tpl.layer,
                parallax: tpl.parallax * 1.35,
                energy: 0,
                childrenSegments: []
              };
              allNodes.push(boutonNode);
              neuronObj.nodes.push(boutonNode);

              const spraySeg = {
                id: `spray-${allSegments.length}`,
                neuronIdx: nIdx,
                from: childNode,
                to: boutonNode,
                cx: scx,
                cy: scy,
                thicknessStart: 0.9,
                thicknessEnd: 0.4,
                depth: depth + 1,
                maxDepth: depth + 1,
                isAxon: false,
                isMyelinated: false,
                opacity: tpl.opacity * 0.65,
                energy: 0
              };
              childNode.childrenSegments.push(spraySeg);
              allSegments.push(spraySeg);
              neuronObj.segments.push(spraySeg);
            }
          }
        };

        const maxTreeDepth = isMobile ? 3 : tpl.layer === 'fg' ? 4 : 3;
        tpl.trunkAngles.forEach((angle, tIdx) => {
          const isAxon = tIdx === tpl.axonIndex;
          const isMyelinated = Boolean(isAxon && tpl.isMyelinatedAxon);
          const baseLength = isMyelinated
            ? Math.min(width, height) * 0.145
            : isAxon
              ? Math.min(width, height) * 0.155
              : Math.min(width, height) * (0.11 + rng() * 0.045) * tpl.scale;
          const baseThickness = isMyelinated
            ? 5.2 * tpl.scale
            : isAxon
              ? 4.4 * tpl.scale
              : (3.2 + rng() * 1.4) * tpl.scale;

          growBranch(
            somaNode,
            angle,
            baseLength,
            baseThickness,
            1,
            isMyelinated ? 5 : maxTreeDepth,
            isAxon,
            isMyelinated
          );
        });

        neurons.push(neuronObj);
      });
    };

    // Spawn an action potential impulse traveling along a segment chain
    const spawnImpulse = (startSegment, customSpeed = null, isGoldPulse = true) => {
      if (!startSegment || prefersReducedMotion || pulses.length > 28) return;
      pulses.push({
        segment: startSegment,
        t: 0,
        speed: customSpeed || (startSegment.isMyelinated ? 0.032 : 0.018 + Math.random() * 0.012),
        isGold: isGoldPulse,
        intensity: startSegment.isMyelinated ? 1.0 : 0.85,
        trailLength: startSegment.isMyelinated ? 0.35 : 0.28
      });
      startSegment.from.energy = Math.min(1, startSegment.from.energy + 0.65);
    };

    // Trigger a soma firing event that propagates down its axon or primary dendrites
    const fireNeuron = (neuron, preferAxon = true) => {
      if (!neuron || prefersReducedMotion) return;
      neuron.somaNode.energy = 1.0;
      const rootSegments = neuron.somaNode.childrenSegments;
      if (!rootSegments.length) return;

      if (preferAxon) {
        const axonSeg = rootSegments.find((s) => s.isAxon) || rootSegments[Math.floor(Math.random() * rootSegments.length)];
        spawnImpulse(axonSeg, axonSeg.isMyelinated ? 0.034 : 0.022, true);
      } else {
        const count = Math.min(2, rootSegments.length);
        for (let i = 0; i < count; i++) {
          const seg = rootSegments[Math.floor(Math.random() * rootSegments.length)];
          spawnImpulse(seg, 0.02, Math.random() > 0.25);
        }
      }
    };

    // Resize handler with DPR scaling
    const handleResize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = Math.max(300, rect.width);
      height = Math.max(400, rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildScene();
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Mouse interaction listeners attached to the hero container
    const heroSection = canvas.parentElement;
    let lastHoverPulseTime = 0;

    const handlePointerMove = (e) => {
      if (width < 768 || prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = e.clientX - rect.left;
      pointer.targetY = e.clientY - rect.top;
      pointer.active = true;

      const now = performance.now();
      if (now - lastHoverPulseTime > 160) {
        for (let i = 0; i < allNodes.length; i++) {
          const n = allNodes[i];
          const dx = pointer.targetX - n.renderX;
          const dy = pointer.targetY - n.renderY;
          if (dx * dx + dy * dy < 95 * 95 && n.childrenSegments.length > 0) {
            const seg = n.childrenSegments[Math.floor(Math.random() * n.childrenSegments.length)];
            spawnImpulse(seg, 0.026, true);
            lastHoverPulseTime = now;
            break;
          }
        }
      }
    };

    const handlePointerLeave = () => {
      pointer.active = false;
    };

    if (heroSection) {
      heroSection.addEventListener('mousemove', handlePointerMove, { passive: true });
      heroSection.addEventListener('mouseleave', handlePointerLeave, { passive: true });
    }

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (entries[0]) {
          isVisible = entries[0].isIntersecting && !document.hidden;
        }
      },
      { threshold: 0.05 }
    );
    if (heroSection) {
      intersectionObserver.observe(heroSection);
    }

    const handleMotionChange = (e) => {
      prefersReducedMotion = e.matches;
    };
    motionQuery.addEventListener('change', handleMotionChange);

    // Main Render Loop
    let lastAmbientFire = 0;

    const render = (timestamp) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible) return;

      const time = timestamp * 0.001;

      if (pointer.active) {
        if (pointer.x < -1000) {
          pointer.x = pointer.targetX;
          pointer.y = pointer.targetY;
        } else {
          pointer.x += (pointer.targetX - pointer.x) * 0.12;
          pointer.y += (pointer.targetY - pointer.y) * 0.12;
        }
      } else {
        pointer.x += (-9999 - pointer.x) * 0.05;
        pointer.y += (-9999 - pointer.y) * 0.05;
      }

      // 1. Deep Scientific Navy Base Background
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#040D17');
      bgGrad.addColorStop(0.5, '#071725');
      bgGrad.addColorStop(1, '#05101B');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle lateral ambient glows behind the left and right primary neurons
      const leftGlow = ctx.createRadialGradient(
        width * 0.11,
        height * 0.55,
        10,
        width * 0.11,
        height * 0.55,
        width * 0.36
      );
      leftGlow.addColorStop(0, 'rgba(38, 108, 165, 0.18)');
      leftGlow.addColorStop(0.5, 'rgba(20, 62, 100, 0.07)');
      leftGlow.addColorStop(1, 'rgba(7, 23, 37, 0)');
      ctx.fillStyle = leftGlow;
      ctx.fillRect(0, 0, width, height);

      const rightGlow = ctx.createRadialGradient(
        width * 0.9,
        height * 0.38,
        10,
        width * 0.9,
        height * 0.38,
        width * 0.36
      );
      rightGlow.addColorStop(0, 'rgba(45, 118, 175, 0.17)');
      rightGlow.addColorStop(0.5, 'rgba(231, 185, 68, 0.04)');
      rightGlow.addColorStop(1, 'rgba(7, 23, 37, 0)');
      ctx.fillStyle = rightGlow;
      ctx.fillRect(0, 0, width, height);

      // 2. Render Soft Out-of-Focus Bokeh Orbs
      for (let i = 0; i < bokehOrbs.length; i++) {
        const orb = bokehOrbs[i];
        const pulseAlpha = orb.alpha * (0.8 + 0.2 * Math.sin(time * orb.speed + orb.phase));
        const grad = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        grad.addColorStop(0, `rgba(${orb.color}, ${pulseAlpha})`);
        grad.addColorStop(0.6, `rgba(${orb.color}, ${pulseAlpha * 0.4})`);
        grad.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Update Node Positions (Organic breathing + Mouse parallax displacement)
      for (let i = 0; i < allNodes.length; i++) {
        const node = allNodes[i];
        const driftX = prefersReducedMotion
          ? 0
          : Math.sin(time * 0.7 + i * 0.5) * 1.4 * node.parallax;
        const driftY = prefersReducedMotion
          ? 0
          : Math.cos(time * 0.6 + i * 0.7) * 1.4 * node.parallax;

        let offsetX = driftX;
        let offsetY = driftY;

        if (pointer.active && !prefersReducedMotion) {
          const dx = pointer.x - node.x;
          const dy = pointer.y - node.y;
          const distSq = dx * dx + dy * dy;
          const maxR = pointer.radius;

          const normX = (pointer.x / width - 0.5) * -8 * node.parallax;
          const normY = (pointer.y / height - 0.5) * -8 * node.parallax;
          offsetX += normX;
          offsetY += normY;

          if (distSq < maxR * maxR && distSq > 1) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / maxR;
            const displace = factor * factor * 9 * (node.isSoma ? 0.35 : 1);
            offsetX += (dx / dist) * displace;
            offsetY += (dy / dist) * displace;

            node.energy = Math.max(node.energy, factor * 0.85);
          }
        }

        node.renderX = node.x + offsetX;
        node.renderY = node.y + offsetY;
        node.energy = Math.max(node.isSoma ? 0.28 : 0, node.energy * 0.95);
      }

      // 4. Periodic Autonomous Neural Signaling (Action Potentials)
      if (!prefersReducedMotion && timestamp - lastAmbientFire > (width < 768 ? 1100 : 520)) {
        lastAmbientFire = timestamp;
        const fgNeurons = neurons.filter((n) => n.layer === 'fg');
        const targetPool = fgNeurons.length > 0 && Math.random() < 0.75 ? fgNeurons : neurons;
        const chosen = targetPool[Math.floor(Math.random() * targetPool.length)];
        fireNeuron(chosen, Math.random() < 0.65);
      }

      // 5. Render Dendritic & Axonal Branches
      ctx.lineCap = 'round';
      for (let i = 0; i < allSegments.length; i++) {
        const seg = allSegments[i];
        const p0x = seg.from.renderX;
        const p0y = seg.from.renderY;
        const p1x = seg.to.renderX;
        const p1y = seg.to.renderY;

        const dX = (p0x - seg.from.x + (p1x - seg.to.x)) * 0.5;
        const dY = (p0y - seg.from.y + (p1y - seg.to.y)) * 0.5;
        const cx = seg.cx + dX;
        const cy = seg.cy + dY;

        seg.energy *= 0.93;
        const activeBoost = seg.energy;

        if (seg.isMyelinated) {
          ctx.beginPath();
          ctx.moveTo(p0x, p0y);
          ctx.quadraticCurveTo(cx, cy, p1x, p1y);
          ctx.strokeStyle = `rgba(79, 157, 204, ${(0.28 + activeBoost * 0.35) * seg.opacity})`;
          ctx.lineWidth = seg.thicknessStart * 2.4;
          ctx.stroke();

          const sheathSegments = 2;
          for (let m = 0; m < sheathSegments; m++) {
            const tStart = (m + 0.14) / sheathSegments;
            const tEnd = (m + 0.86) / sheathSegments;
            const sPt = getQuadPoint(p0x, p0y, cx, cy, p1x, p1y, tStart);
            const ePt = getQuadPoint(p0x, p0y, cx, cy, p1x, p1y, tEnd);

            ctx.beginPath();
            ctx.moveTo(sPt.x, sPt.y);
            ctx.lineTo(ePt.x, ePt.y);
            ctx.strokeStyle = `rgba(117, 200, 242, ${(0.55 + activeBoost * 0.3) * seg.opacity})`;
            ctx.lineWidth = seg.thicknessStart * 1.45;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.moveTo(p0x, p0y);
          ctx.quadraticCurveTo(cx, cy, p1x, p1y);
          ctx.strokeStyle = `rgba(225, 244, 255, ${(0.75 + activeBoost * 0.25) * seg.opacity})`;
          ctx.lineWidth = seg.thicknessStart * 0.42;
          ctx.stroke();
        } else {
          if (seg.thicknessStart > 1.4) {
            ctx.beginPath();
            ctx.moveTo(p0x, p0y);
            ctx.quadraticCurveTo(cx, cy, p1x, p1y);
            ctx.strokeStyle = `rgba(79, 157, 204, ${(0.18 + activeBoost * 0.3) * seg.opacity})`;
            ctx.lineWidth = seg.thicknessStart * 2.2;
            ctx.stroke();
          }

          ctx.beginPath();
          ctx.moveTo(p0x, p0y);
          ctx.quadraticCurveTo(cx, cy, p1x, p1y);

          const r = Math.round(79 + activeBoost * 152);
          const g = Math.round(157 + activeBoost * 55);
          const b = Math.round(204 - activeBoost * 60);
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${Math.min(1, (0.52 + activeBoost * 0.45) * seg.opacity)})`;
          ctx.lineWidth = seg.thicknessStart;
          ctx.stroke();

          if (seg.depth <= 2 && seg.thicknessStart > 2.0) {
            ctx.beginPath();
            ctx.moveTo(p0x, p0y);
            ctx.quadraticCurveTo(cx, cy, p1x, p1y);
            ctx.strokeStyle = `rgba(195, 235, 255, ${(0.35 + activeBoost * 0.4) * seg.opacity})`;
            ctx.lineWidth = seg.thicknessStart * 0.35;
            ctx.stroke();
          }
        }
      }

      // 6. Update and Render Traveling Action Potential Impulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        pulse.t += pulse.speed;

        const seg = pulse.segment;
        seg.energy = Math.max(seg.energy, 0.85 * pulse.intensity);

        const p0x = seg.from.renderX;
        const p0y = seg.from.renderY;
        const p1x = seg.to.renderX;
        const p1y = seg.to.renderY;
        const dX = (p0x - seg.from.x + (p1x - seg.to.x)) * 0.5;
        const dY = (p0y - seg.from.y + (p1y - seg.to.y)) * 0.5;
        const cx = seg.cx + dX;
        const cy = seg.cy + dY;

        const steps = 6;
        for (let s = 0; s < steps; s++) {
          const stepT = pulse.t - (s / steps) * pulse.trailLength;
          if (stepT < 0 || stepT > 1) continue;
          const pt = getQuadPoint(p0x, p0y, cx, cy, p1x, p1y, stepT);
          const fade = (1 - s / steps) * pulse.intensity * seg.opacity;
          const rad = (seg.thicknessStart * 0.85 + 2.2) * (1 - (s / steps) * 0.5);

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, rad * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = pulse.isGold
            ? `rgba(231, 185, 68, ${fade * 0.28})`
            : `rgba(117, 200, 242, ${fade * 0.28})`;
          ctx.fill();
        }

        if (pulse.t <= 1) {
          const head = getQuadPoint(p0x, p0y, cx, cy, p1x, p1y, pulse.t);
          const headR = Math.max(2.2, seg.thicknessStart * 0.9 + 1.8);
          const headGrad = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, headR * 4.2);

          if (pulse.isGold) {
            headGrad.addColorStop(0, `rgba(255, 250, 225, ${0.95 * pulse.intensity})`);
            headGrad.addColorStop(0.3, `rgba(245, 210, 122, ${0.75 * pulse.intensity})`);
            headGrad.addColorStop(0.65, `rgba(231, 185, 68, ${0.28 * pulse.intensity})`);
            headGrad.addColorStop(1, 'rgba(231, 185, 68, 0)');
          } else {
            headGrad.addColorStop(0, `rgba(240, 252, 255, ${0.95 * pulse.intensity})`);
            headGrad.addColorStop(0.35, `rgba(117, 200, 242, ${0.75 * pulse.intensity})`);
            headGrad.addColorStop(1, 'rgba(79, 157, 204, 0)');
          }

          ctx.fillStyle = headGrad;
          ctx.beginPath();
          ctx.arc(head.x, head.y, headR * 4.2, 0, Math.PI * 2);
          ctx.fill();
        }

        if (pulse.t >= 1) {
          const targetNode = seg.to;
          targetNode.energy = 1.0;

          if (targetNode.childrenSegments.length > 0 && pulse.intensity > 0.28) {
            const children = targetNode.childrenSegments;
            for (let c = 0; c < children.length; c++) {
              if (c === 0 || Math.random() < 0.55) {
                pulses.push({
                  segment: children[c],
                  t: 0,
                  speed: pulse.speed * (0.94 + Math.random() * 0.12),
                  isGold: pulse.isGold,
                  intensity: pulse.intensity * 0.84,
                  trailLength: pulse.trailLength
                });
              }
            }
          }
          pulses.splice(i, 1);
        }
      }

      // 7. Render Synaptic Junctions, Nodes of Ranvier, and Glowing Somas
      for (let i = 0; i < allNodes.length; i++) {
        const node = allNodes[i];
        const nx = node.renderX;
        const ny = node.renderY;

        if (node.isSoma) {
          const r = node.radius;
          const breath = 1 + 0.04 * Math.sin(time * 1.8 + node.neuronIdx);

          const outerHalo = ctx.createRadialGradient(nx, ny, r * 0.2, nx, ny, r * 2.8 * breath);
          outerHalo.addColorStop(0, 'rgba(117, 200, 242, 0.35)');
          outerHalo.addColorStop(0.45, 'rgba(79, 157, 204, 0.16)');
          outerHalo.addColorStop(1, 'rgba(79, 157, 204, 0)');
          ctx.fillStyle = outerHalo;
          ctx.beginPath();
          ctx.arc(nx, ny, r * 2.8 * breath, 0, Math.PI * 2);
          ctx.fill();

          const bodyGrad = ctx.createRadialGradient(
            nx - r * 0.22,
            ny - r * 0.22,
            r * 0.1,
            nx,
            ny,
            r * 1.15
          );
          bodyGrad.addColorStop(0, 'rgba(255, 238, 185, 0.95)');
          bodyGrad.addColorStop(0.28, 'rgba(231, 185, 68, 0.82)');
          bodyGrad.addColorStop(0.58, 'rgba(72, 148, 202, 0.72)');
          bodyGrad.addColorStop(0.85, 'rgba(26, 72, 118, 0.55)');
          bodyGrad.addColorStop(1, 'rgba(12, 36, 62, 0)');

          ctx.fillStyle = bodyGrad;
          ctx.beginPath();
          ctx.arc(nx, ny, r * 1.15, 0, Math.PI * 2);
          ctx.fill();

          const coreRadius = r * (0.95 + node.energy * 0.35);
          const coreGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, coreRadius);
          coreGrad.addColorStop(0, '#FFFFFF');
          coreGrad.addColorStop(0.25, '#FFF0B8');
          coreGrad.addColorStop(0.55, 'rgba(231, 185, 68, 0.65)');
          coreGrad.addColorStop(1, 'rgba(231, 185, 68, 0)');
          ctx.fillStyle = coreGrad;
          ctx.beginPath();
          ctx.arc(nx, ny, coreRadius, 0, Math.PI * 2);
          ctx.fill();
        } else if (node.isRanvier) {
          const r = node.radius * (2.6 + node.energy * 1.4);
          const ranvierGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, r * 2.5);
          ranvierGrad.addColorStop(0, 'rgba(255, 250, 220, 0.95)');
          ranvierGrad.addColorStop(0.3, 'rgba(245, 210, 122, 0.8)');
          ranvierGrad.addColorStop(0.65, 'rgba(231, 185, 68, 0.25)');
          ranvierGrad.addColorStop(1, 'rgba(231, 185, 68, 0)');
          ctx.fillStyle = ranvierGrad;
          ctx.beginPath();
          ctx.arc(nx, ny, r * 2.5, 0, Math.PI * 2);
          ctx.fill();
        } else if (node.isSynapse || node.energy > 0.1) {
          const baseAlpha = node.layer === 'fg' ? 0.55 : 0.3;
          const alpha = Math.min(1, baseAlpha + node.energy * 0.65);
          const glowR = (node.radius + 1.5) * (1.8 + node.energy * 1.8);

          const synGrad = ctx.createRadialGradient(nx, ny, 0, nx, ny, glowR);
          if (node.isGold || node.energy > 0.35) {
            synGrad.addColorStop(0, `rgba(255, 245, 200, ${alpha})`);
            synGrad.addColorStop(0.35, `rgba(231, 185, 68, ${alpha * 0.75})`);
            synGrad.addColorStop(1, 'rgba(231, 185, 68, 0)');
          } else {
            synGrad.addColorStop(0, `rgba(210, 245, 255, ${alpha})`);
            synGrad.addColorStop(0.4, `rgba(117, 200, 242, ${alpha * 0.65})`);
            synGrad.addColorStop(1, 'rgba(79, 157, 204, 0)');
          }

          ctx.fillStyle = synGrad;
          ctx.beginPath();
          ctx.arc(nx, ny, glowR, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 8. Localized Mouse-Responsive Synaptic Connections
      if (pointer.active && !prefersReducedMotion) {
        const nearbyNodes = [];
        const maxDistSq = pointer.radius * pointer.radius;

        for (let i = 0; i < allNodes.length; i++) {
          const n = allNodes[i];
          if (n.isSoma) continue;
          const dx = pointer.x - n.renderX;
          const dy = pointer.y - n.renderY;
          const dSq = dx * dx + dy * dy;
          if (dSq < maxDistSq) {
            nearbyNodes.push({ node: n, dist: Math.sqrt(dSq) });
          }
        }

        let connectionsDrawn = 0;
        for (let i = 0; i < nearbyNodes.length && connectionsDrawn < 14; i++) {
          for (let j = i + 1; j < nearbyNodes.length && connectionsDrawn < 14; j++) {
            const a = nearbyNodes[i].node;
            const b = nearbyNodes[j].node;
            const dx = a.renderX - b.renderX;
            const dy = a.renderY - b.renderY;
            const distSq = dx * dx + dy * dy;

            if (distSq > 25 * 25 && distSq < 110 * 110) {
              const dist = Math.sqrt(distSq);
              const ptrFactor = 1 - Math.max(nearbyNodes[i].dist, nearbyNodes[j].dist) / pointer.radius;
              const connAlpha = (1 - dist / 110) * ptrFactor * 0.55;

              ctx.beginPath();
              ctx.moveTo(a.renderX, a.renderY);
              ctx.lineTo(b.renderX, b.renderY);
              ctx.strokeStyle = `rgba(245, 210, 122, ${connAlpha})`;
              ctx.lineWidth = 0.85;
              ctx.stroke();

              const sparkT = (time * 1.4 + (i + j) * 0.37) % 1;
              const sx = a.renderX + (b.renderX - a.renderX) * sparkT;
              const sy = a.renderY + (b.renderY - a.renderY) * sparkT;
              ctx.beginPath();
              ctx.arc(sx, sy, 1.6, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 245, 200, ${connAlpha * 1.5})`;
              ctx.fill();

              connectionsDrawn++;
            }
          }
        }
      }

      // 9. Update & Render Ambient Synaptic Dust Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          if (pointer.active) {
            const dx = pointer.x - p.x;
            const dy = pointer.y - p.y;
            const dSq = dx * dx + dy * dy;
            if (dSq < 140 * 140 && dSq > 1) {
              const d = Math.sqrt(dSq);
              p.x += (dx / d) * 0.35;
              p.y += (dy / d) * 0.35;
            }
          }
        }

        const twinkle = p.alpha * (0.65 + 0.35 * Math.sin(time * 2.0 + p.phase));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.isGold
          ? `rgba(245, 210, 122, ${twinkle})`
          : `rgba(117, 200, 242, ${twinkle})`;
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
      if (heroSection) {
        heroSection.removeEventListener('mousemove', handlePointerMove);
        heroSection.removeEventListener('mouseleave', handlePointerLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0"
    />
  );
}

export default function HomePage({ setActiveTab }) {
  const [isTickerPaused, setIsTickerPaused] = useState(false);
  const [lightboxData, setLightboxData] = useState({ isOpen: false, src: '', title: '', caption: '' });
  const [showGroupOverlay, setShowGroupOverlay] = useState(true);
  const pi = TEAM_MEMBERS.find((m) => m.id === 'pi') || TEAM_MEMBERS[0];
  const activeAward = FUNDING_AGENCIES.find((a) => a.categoryType === 'active_award') || FUNDING_AGENCIES[0];
  const completedProject = FUNDING_AGENCIES.find((a) => a.categoryType === 'completed_project') || FUNDING_AGENCIES[1];
  const institutionalScheme = FUNDING_AGENCIES.find((a) => a.categoryType === 'institutional_scheme') || FUNDING_AGENCIES[2];

  const openLightbox = (src, title, caption) => {
    setLightboxData({ isOpen: true, src, title, caption });
  };

  const closeLightbox = () => {
    setLightboxData({ ...lightboxData, isOpen: false });
  };

  const navigateTo = (tabId, sectionId = null) => {
    setActiveTab(tabId);
    if (sectionId) {
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) {
          elem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // 6 Clearly Differentiated Research Directions of NeuroXlab
  const RESEARCH_DIRECTIONS = [
    {
      id: 'gut-brain-axis',
      num: '01',
      icon: Activity,
      title: 'Microbiota–Gut–Brain Axis in Stroke',
      description: 'Investigating bidirectional neuroimmune crosstalk, stroke-induced gut dysbiosis, mucosal barrier breakdown, and systemic endotoxemia dictating penumbral damage.',
      targetSection: 'pillar-gut-brain',
      linkText: 'Explore Gut–Brain Axis'
    },
    {
      id: 'er-stress-proteostasis',
      num: '02',
      icon: Cpu,
      title: 'ER Stress & Organelle Proteostasis',
      description: 'Decoupling unfolded protein response (UPR) sensors (PERK, IRE1α, ATF6), chaperone biology, and apoptotic cell fate decisions during ischemic injury and reperfusion.',
      targetSection: 'pillar-er-stress',
      linkText: 'Explore ER Stress Mechanisms'
    },
    {
      id: 'translational-nanomedicine',
      num: '03',
      icon: Sparkles,
      title: 'Translational Nanomedicine & Drug Delivery',
      description: 'Engineering biocompatible polymeric nanoparticles co-encapsulating short-chain fatty acids (SCFAs) and Edaravone for targeted blood-brain barrier delivery and neuroprotection.',
      targetSection: 'flagship-grant',
      linkText: 'Explore Nanomedicine Program'
    },
    {
      id: 'noncoding-rnas',
      num: '04',
      icon: Dna,
      title: 'Non-Coding RNAs & Epigenetic Networks',
      description: 'Discovering stroke-responsive long non-coding RNAs (lncRNAs), piRNAs, and microRNAs orchestrating penumbral survival, chromatin remodeling, and post-transcriptional gene regulation.',
      targetSection: 'pillar-noncoding-rna',
      linkText: 'Explore Epigenetic Networks'
    },
    {
      id: 'computational-systems-biology',
      num: '05',
      icon: Network,
      title: 'Computational Biology & Multi-Omics',
      description: 'Integrating longitudinal 16S rRNA metagenomics, GC-MS metabolomics, transcriptomics, and biological network reconstruction pipelines to identify actionable therapeutic targets.',
      targetSection: 'methodologies',
      linkText: 'Explore Multi-Omics Pipelines'
    },
    {
      id: 'neurovascular-organ-crosstalk',
      num: '06',
      icon: ShieldCheck,
      title: 'Neurovascular Unit & Brain–Organ Crosstalk',
      description: 'Preserving blood-brain barrier (BBB) integrity, modulating microglia–macrophage phenotypic polarization, and mapping systemic brain–kidney axis injury dynamics post-ischemia.',
      targetSection: 'pillar-nanomedicine',
      linkText: 'Explore Organ Crosstalk'
    }
  ];

  // News & Announcements items
  const NEWS_ITEMS = [
    {
      id: 'news-grant',
      category: 'Extramural Grant',
      badgeColor: 'bg-[#8B1E24]/10 text-[#8B1E24] border border-[#8B1E24]/20',
      date: 'January 2026',
      title: 'Therapeutic Potential of Nano-Formulated SCFAs and Edaravone in Stroke-Induced Gut Dysbiosis',
      summary: 'NeuroXlab awarded ₹38.5 Lakhs 3-year extramural project to engineer targeted nanoparticles and decipher gut-brain metabolic crosstalk during cerebral ischemia recovery.',
      linkText: 'Explore Grant Details',
      action: () => navigateTo('research', 'flagship-grant')
    },
    {
      id: 'news-recruitment',
      category: 'Recruitment',
      badgeColor: 'bg-emerald-50 text-emerald-800 border border-emerald-300/80',
      date: 'Academic 2026',
      title: 'Call for Junior Research Fellow (JRF / SRF) Applications',
      summary: 'Applications invited for 1 JRF position under the newly sanctioned nanotherapy project. Candidates with CSIR/UGC-NET or GATE in Life Sciences / Systems Biology are eligible.',
      linkText: 'View & Apply',
      action: () => navigateTo('contact')
    },
    {
      id: 'news-keynote',
      category: 'Invited Keynote',
      badgeColor: 'bg-[#0F2537]/10 text-[#0F2537] border border-[#0F2537]/20',
      date: 'November 2024',
      title: 'Keynote Lecture at SNCI National Conference in Kolkata',
      summary: 'Dr. Venkata Prasuja Nakka presented an invited lecture titled "Organelle Stress Crosstalk and the Gut-Brain Inflammatory Axis in Acute Stroke Neuroprotection".',
      linkText: 'View Details',
      action: () => navigateTo('activities')
    },
    {
      id: 'news-publication',
      category: 'Publication Alert',
      badgeColor: 'bg-[#C59B27]/15 text-[#977313] border border-[#C59B27]/30',
      date: '2025',
      title: 'High-Impact Review on Wnt/β-catenin Signaling in Stroke Published in Neuroscience',
      summary: 'Comprehensive paper detailing canonical and non-canonical Wnt signaling mechanisms during post-stroke neural recovery and blood-brain barrier maintenance.',
      linkText: 'Read Abstract',
      action: () => navigateTo('publications')
    }
  ];

  // Chronological list of Latest Updates for the upward continuous scrolling ticker
  const LATEST_UPDATES = [
    {
      id: 'up-1',
      date: '27-Jan-2026',
      tag: 'Grant Award',
      tagColor: 'bg-[#8B1E24]/10 text-[#8B1E24] border-[#8B1E24]/20',
      text: 'Sanction of 3-Year Flagship Extramural Grant on Nano-Formulated SCFAs & Edaravone in Stroke-Induced Gut Dysbiosis.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'research',
      linkText: 'View Grant Overview'
    },
    {
      id: 'up-2',
      date: 'Rolling 2026',
      tag: 'JRF Vacancy',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      text: 'Applications invited for Junior Research Fellow (JRF / SRF) with CSIR/UGC-NET or GATE in Life Sciences / Systems Biology.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'contact',
      linkText: 'Apply for JRF Position'
    },
    {
      id: 'up-3',
      date: 'Jan 2026',
      tag: 'Google Scholar',
      tagColor: 'bg-[#0F2537]/10 text-[#0F2537] border-[#0F2537]/20',
      text: "Dr. Venkata Prasuja Nakka's Google Scholar bibliometrics updated: 1,900+ citations, h-index 12, i10-index 15.",
      hasLink: true,
      linkType: 'external',
      url: 'https://scholar.google.co.in/citations?user=mVnNpwIAAAAJ&hl=en',
      linkText: 'Google Scholar Profile'
    },
    {
      id: 'up-4',
      date: '2025',
      tag: 'Neuroscience',
      tagColor: 'bg-[#C59B27]/15 text-[#977313] border-[#C59B27]/30',
      text: 'Paper on "Unravelling Neuroregenerative and Neuroprotective Roles of Wnt/β-catenin Pathway in Ischemic Stroke" published.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'publications',
      linkText: 'View Paper & BibTeX'
    },
    {
      id: 'up-5',
      date: 'Sep 2025',
      tag: 'ResearchGate',
      tagColor: 'bg-[#0F2537]/10 text-[#0F2537] border-[#0F2537]/20',
      text: 'ResearchGate profile updated with recent preprints, book chapters from Cambridge Scholars & Springer Nature.',
      hasLink: true,
      linkType: 'external',
      url: 'https://www.researchgate.net/profile/Venkata-Prasuja-Nakka',
      linkText: 'ResearchGate Profile'
    },
    {
      id: 'up-6',
      date: 'Nov 2024',
      tag: 'Invited Keynote',
      tagColor: 'bg-[#0F2537]/10 text-[#0F2537] border-[#0F2537]/20',
      text: 'Dr. Nakka delivered an invited lecture at the Annual Conference of the Society for Neurochemistry, India (SNCI) in Kolkata.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'activities',
      linkText: 'Conference Summary'
    },
    {
      id: 'up-7',
      date: 'Sep 2024',
      tag: 'Workshop',
      tagColor: 'bg-[#0F2537]/10 text-[#0F2537] border-[#0F2537]/20',
      text: 'Dr. Nakka convened National Workshop on Skill Development & Start-up Ecosystem in Biosciences (250+ participants).',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'activities',
      linkText: 'Workshop Details'
    },
    {
      id: 'up-8',
      date: 'Academic 2024',
      tag: 'Department',
      tagColor: 'bg-slate-100 text-slate-700 border-slate-200',
      text: 'Laboratory operational at Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad.',
      hasLink: true,
      linkType: 'external',
      url: 'https://uohyd.ac.in/systems-computational-biology/',
      linkText: 'Department Website'
    },
    {
      id: 'up-9',
      date: 'Continuous',
      tag: 'Fellowships',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      text: 'Postdoctoral Fellowships (PDF) and M.Sc. Dissertation Trainee applications accepted on semester-wise rolling basis.',
      hasLink: true,
      linkType: 'internal',
      linkTarget: 'contact',
      linkText: 'Open Positions'
    }
  ];

  // Duplicate items to ensure uninterrupted, seamless upward infinite scroll
  const scrollingUpdates = [...LATEST_UPDATES, ...LATEST_UPDATES];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* Lightbox Modal for enlarged scientific images & slides */}
      <ImageLightboxModal
        isOpen={lightboxData.isOpen}
        imageSrc={lightboxData.src}
        title={lightboxData.title}
        caption={lightboxData.caption}
        onClose={closeLightbox}
      />

      {/* 1. Hero Section with Live <InteractiveNeuronHeroCanvas /> */}
      <section
        id="hero-section"
        style={{ minHeight: 'calc(100vh - var(--navbar-height, 104px))' }}
        className="relative min-h-[calc(100vh-104px)] min-h-[calc(100dvh-104px)] flex flex-col justify-between items-center overflow-hidden bg-[#071725] text-white px-4 sm:px-6 lg:px-8 border-b-4 border-[#C59B27]"
      >
        {/* Interactive Branching Neuron & Impulse HTML5 Canvas */}
        <InteractiveNeuronHeroCanvas />

        {/* Central Readability Vignette to keep the core typography crisp and unobstructed */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_54%_62%_at_50%_50%,_rgba(7,23,37,0.84)_0%,_rgba(7,23,37,0.45)_62%,_transparent_100%)] pointer-events-none z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05101B]/85 via-transparent to-[#040D17]/40 pointer-events-none z-[1]" />

        {/* Top spacer to balance vertical layout */}
        <div className="w-full h-1 sm:h-2 shrink-0" aria-hidden="true" />

        {/* Centered Main Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto py-6 sm:py-8 text-center space-y-6 sm:space-y-7 flex flex-col items-center justify-center my-auto">
          {/* Institutional Crest Shield & NeuroXlab Emblem */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-1">
            <a
              href="https://uohyd.ac.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center h-20 w-20 sm:h-22 sm:w-22 rounded-xl overflow-hidden border-2 border-[#C59B27] bg-white shadow-xl hover:scale-105 transition-transform duration-300 shrink-0 p-2"
              title="University of Hyderabad (Institution of Eminence)"
            >
              <img
                src={uohSeal}
                alt="University of Hyderabad Official Crest Seal"
                className="h-full w-full object-contain"
              />
            </a>

            {/* Vertical divider line */}
            <div className="h-12 sm:h-14 w-px bg-white/30 mx-1 sm:mx-1.5" aria-hidden="true" />

            {/* Official NeuroXlab Emblem */}
            <NeuroXlabLogo className="h-20 w-20 sm:h-22 sm:w-22" withFrame={true} />
          </div>

          {/* Departmental & Institutional Identity Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B1E2D]/75 backdrop-blur-md border border-[#C59B27]/45 text-xs sm:text-sm text-white/95 shadow-md">
            <span className="font-semibold text-[#E7B944]">Department of Systems and Computational Biology</span>
            <span className="text-white/40">•</span>
            <span className="text-[#D1DCE5]">School of Life Sciences, University of Hyderabad</span>
          </div>

          {/* Main Editorial Hero Headings */}
          <div className="space-y-3 sm:space-y-4 max-w-4xl mx-auto">
            <h1 className="brand-title text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white leading-none drop-shadow-xl">
              Neuro<span className="text-[#E7B944] drop-shadow-[0_0_25px_rgba(231,185,68,0.65)]">X</span>lab
            </h1>

            {/* Authentic Motto from Old Website */}
            <p className="font-serif italic text-base sm:text-lg md:text-xl text-[#E7B944]/95 font-medium tracking-wide drop-shadow-sm">
              "{LAB_INFO.motto}"
            </p>

            <p className="text-sm sm:text-base lg:text-[17px] text-[#D1DCE5] max-w-[780px] mx-auto font-sans font-normal leading-[1.6]">
              Investigating the microbiota-gut-brain axis, organellar ER stress, post-stroke epigenetics, and nano-formulated therapeutics for ischemic cerebral recovery.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => navigateTo('research')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] border border-[#E7B944]/40 shadow-[0_0_24px_rgba(139,30,36,0.55)] hover:shadow-[0_0_30px_rgba(168,41,49,0.75)] transition-all active:scale-95 group cursor-pointer min-h-[44px]"
            >
              <span>Explore Our Research</span>
              <ArrowRight className="w-4 h-4 text-[#E7B944] group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => navigateTo('team')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all hover:border-[#E7B944] cursor-pointer min-h-[44px]"
            >
              <Users className="w-4 h-4 text-[#E7B944]" />
              <span>Meet the Team</span>
            </button>

            <button
              onClick={() => navigateTo('publications')}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-white/85 hover:text-[#E7B944] transition-colors group cursor-pointer min-h-[44px]"
            >
              <span>Publications</span>
              <ArrowUpRight className="w-4 h-4 text-[#E7B944] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll Down Prompt */}
        <div className="relative z-10 pb-4 sm:pb-6 pt-1 shrink-0">
          <button
            onClick={() => {
              const elem = document.getElementById('group-photo-section');
              if (elem) elem.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex flex-col items-center text-white/60 hover:text-[#E7B944] transition-colors focus:outline-none group cursor-pointer p-2 min-h-[44px]"
            aria-label="Scroll to group photo section"
          >
            <span className="text-xs uppercase font-mono tracking-widest text-[#E7B944] mb-1 font-semibold">
              Explore Lab & Research
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce text-[#E7B944]" />
          </button>
        </div>
      </section>

      {/* 2. Large Image Section of Group Photo */}
      <section
        id="group-photo-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24"
      >
        <div className="relative rounded-3xl overflow-hidden border-2 border-[#C59B27]/40 shadow-2xl group bg-[#0F2537]">
          {/* Main Large Group Photograph - 16:9 Ratio Preserved */}
          <div
            onClick={() => setShowGroupOverlay((prev) => !prev)}
            className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900 cursor-pointer select-none"
            role="button"
            tabIndex={0}
            aria-label="Toggle group photo text overlay"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setShowGroupOverlay((prev) => !prev);
              }
            }}
          >
            <img
              src="/images/group_photo.jpg"
              alt="NeuroXlab Research Group - Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad"
              className="w-full h-full object-cover object-center group-hover:scale-[1.015] transition-transform duration-700 ease-out"
            />

            {/* Subtle Gradient Overlay - disappears smoothly on hover (desktop) or on tap (mobile) */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none transition-opacity duration-500 ease-in-out ${
                showGroupOverlay ? 'opacity-100 sm:group-hover:opacity-0' : 'opacity-0'
              }`}
            />

            {/* Top Bar with Badges and Interactive Controls */}
            <div className="absolute top-3 left-3 right-3 sm:top-5 sm:left-5 sm:right-5 flex items-center justify-between gap-2 z-10">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B1E24]/90 backdrop-blur-md text-white text-xs sm:text-sm font-semibold border border-[#C59B27]/50 shadow-lg transition-opacity duration-500 ${
                  showGroupOverlay ? 'opacity-100 sm:group-hover:opacity-0' : 'opacity-0 sm:opacity-100'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-[#E0B84C]" />
                NeuroXlab Research Team
              </span>

              {/* Action Buttons: Toggle Overlay on Mobile & Enlarge Lightbox */}
              <div className="flex items-center gap-2">
                {/* Mobile Tap-to-toggle indicator pill */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowGroupOverlay((prev) => !prev);
                  }}
                  className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/75 hover:bg-black/90 backdrop-blur-md text-white text-xs font-medium border border-white/30 shadow-lg active:scale-95 transition-all"
                  aria-label={showGroupOverlay ? "Hide text to see full picture" : "Show information"}
                >
                  {showGroupOverlay ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-[#E0B84C]" />
                      <span>Hide Text</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5 text-[#E0B84C]" />
                      <span>Show Info</span>
                    </>
                  )}
                </button>

                {/* Enlarge / Fullscreen Lightbox Button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(
                      '/images/group_photo.jpg',
                      'NeuroXlab Research Group',
                      'Principal investigator, postdoctoral scholars, doctoral fellows, and project dissertation trainees at the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad.'
                    );
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#8B1E24]/90 hover:bg-[#8B1E24] backdrop-blur-md text-white text-xs font-semibold border border-[#C59B27]/60 shadow-lg active:scale-95 transition-all cursor-pointer"
                  title="Enlarge photo in full screen"
                >
                  <ZoomIn className="w-3.5 h-3.5 text-[#E0B84C]" />
                  <span className="hidden sm:inline">Enlarge</span>
                </button>
              </div>
            </div>

            {/* Bottom Glassmorphic Caption Bar */}
            <div
              className={`absolute bottom-0 inset-x-0 p-3 sm:p-6 bg-gradient-to-t from-black/95 via-black/75 to-transparent pointer-events-none transition-opacity duration-500 ease-in-out ${
                showGroupOverlay ? 'opacity-100 sm:group-hover:opacity-0' : 'opacity-0'
              }`}
            >
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#E0B84C]">
                  <span>EST. 2024</span>
                  <span>•</span>
                  <span>DR. VENKATA PRASUJA NAKKA LABORATORY</span>
                </div>
                <h3 className="font-serif text-base sm:text-2xl lg:text-3xl font-bold text-white leading-tight">
                  Systems &amp; Translational Neuroscience Group
                </h3>
                {/* On mobile, this heavy paragraph is hidden so it doesn't cover the photo; on desktop it shows */}
                <p className="hidden sm:block text-xs sm:text-[13px] text-white/85 leading-relaxed">
                  Principal investigator, postdoctoral scholars, doctoral fellows, and project dissertation trainees at the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad.
                </p>
              </div>
            </div>
          </div>

          {/* Mobile Information Drawer beneath Photo (clean, easy-to-read, never obscures the photo) */}
          <div className="sm:hidden p-4 bg-[#081521] border-t border-white/10 text-white space-y-2">
            <p className="text-xs text-white/85 leading-relaxed font-sans">
              Principal investigator, postdoctoral scholars, doctoral fellows, and project dissertation trainees at the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad.
            </p>
            <div className="pt-1 flex items-center justify-between text-[11px] text-[#E0B84C] font-mono">
              <span>💡 Tap photo above to toggle text</span>
              <button
                type="button"
                onClick={() =>
                  openLightbox(
                    '/images/group_photo.jpg',
                    'NeuroXlab Research Group',
                    'Principal investigator, postdoctoral scholars, doctoral fellows, and project dissertation trainees at the Department of Systems and Computational Biology, School of Life Sciences, University of Hyderabad.'
                  )
                }
                className="font-semibold underline underline-offset-2 flex items-center gap-1"
              >
                <ZoomIn className="w-3 h-3" />
                <span>Full View</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Research Area / About NeuroX Lab & Golgi-Cox Stained Neuron (Authentic Old Website Section) */}
      <section
        id="about-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        {/* Standardized Section Heading: Research Area */}
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Activity className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Scientific Foundation</span>
            </div>
            <button
              onClick={() => navigateTo('research')}
              className="text-xs font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Full Research Dossier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2537] tracking-tight">
                Research Area
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Deciphering ischemic neurovascular injury, organelle stress cascades, and gut–brain crosstalk to uncover therapeutic targets.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-stretch">
            {/* Left Column: Scientific Architecture & Disease Visual Stage */}
            <div className="flex flex-col justify-between bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-xs h-full">
              {/* Top Sub-Header: aligns with right side header */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8B1E24] uppercase tracking-wider">
                  <Activity className="w-3.5 h-3.5 text-[#C59B27]" />
                  <span>Scientific Architecture</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">
                  High-Res Schematic
                </span>
              </div>

              {/* Main Image Stage */}
              <div className="my-4 flex-1 flex flex-col justify-center">
                <div
                  onClick={() =>
                    openLightbox(
                      '/images/neurobiology_stroke_disease.jpg',
                      'Neurovascular Dynamics & Cellular Stress in Stroke',
                      'High-resolution scientific visualization illustrating ischemic neurovascular crosstalk, neuronal stress signaling, synaptic architecture, and neuroinflammatory microglia-macrophage dynamics.'
                    )
                  }
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden border-2 border-[#C59B27]/40 shadow-md bg-slate-900 group cursor-pointer"
                  title="Click to enlarge scientific visual"
                >
                  <img
                    src="/images/neurobiology_stroke_disease.jpg"
                    alt="Neurovascular crosstalk, cellular stress signaling, and microglia–macrophage dynamics in stroke neurobiology"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0F2537]/90 text-white text-xs font-semibold backdrop-blur-md border border-[#C59B27]/40 shadow-lg">
                      <ZoomIn className="w-3.5 h-3.5 text-[#E0B84C]" />
                      Enlarge Visual
                    </span>
                  </div>
                </div>
              </div>

              {/* Bottom Caption & Model Highlights */}
              <div className="space-y-3 pt-3 border-t border-slate-200/80">
                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-sans">
                  <strong className="text-[#0F2537] font-semibold">Figure: </strong>
                  Neurovascular crosstalk, cellular stress signaling cascades, and microglia–macrophage phenotypic dynamics in ischemic stroke neurobiology.
                </p>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="px-3 py-2 rounded-xl bg-white border border-slate-200/70">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Model Systems</span>
                    <span className="text-xs font-bold text-[#0F2537]">Preclinical MCAO</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-white border border-slate-200/70">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Core Focus</span>
                    <span className="text-xs font-bold text-[#8B1E24]">Neuroprotection</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Mission Text & Core Research Pillars */}
            <div className="flex flex-col justify-between space-y-6 text-[#0F2537] h-full">
              <div className="space-y-4">
                {/* Top Sub-Header: aligns with left side header */}
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200/80">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-[#8B1E24] uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
                    <span>Mission & Overview</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 font-semibold uppercase">
                    Dr. Nakka Laboratory
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0F2537] leading-tight">
                  Understanding the Neurobiology of Disease & Stroke
                </h3>

                <div className="space-y-3.5 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                  <p>
                    <strong className="text-[#8B1E24] font-semibold">NeuroX Lab</strong> investigates the molecular and cellular mechanisms underlying stroke and related neurological disorders, with a focus on oxidative stress, neuroinflammation, cellular stress signaling, and microglia–macrophage dynamics.
                  </p>

                  <p>
                    Integrating experimental stroke models with computational biology, multi-omics, and metagenomic approaches, we explore gut–brain interactions and brain–organ crosstalk to uncover mechanisms of ischemic brain injury and identify new opportunities for therapeutic intervention.
                  </p>

                  <p>
                    Our research bridges molecular neuroscience and translational nanomedicine to advance targeted drug delivery, neuroprotection, and innovative therapeutic strategies for stroke.
                  </p>
                </div>
              </div>

              {/* Quick scientific focus pills in a structured 2x2 grid */}
              <div className="space-y-2.5 pt-4 border-t border-slate-100">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                  Primary Thrust Areas
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium">
                  <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-[#0F2537] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E24] shrink-0" />
                    <span className="truncate">Stroke & Neuroinflammation</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-[#0F2537] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] shrink-0" />
                    <span className="truncate">Gut–Brain Axis & Multi-Omics</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-[#0F2537] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B1E24] shrink-0" />
                    <span className="truncate">Nanomedicine & Drug Delivery</span>
                  </div>
                  <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-slate-200/80 text-[#0F2537] font-semibold flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59B27] shrink-0" />
                    <span className="truncate">Neuroprotection & Translation</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Research Directions - Consolidated 6 Core Scientific Themes */}
      <section
        id="research-directions-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        {/* Section Header with Category Pill & Lead Scientific Rationale */}
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Investigative Portfolio</span>
            </div>
            <button
              onClick={() => navigateTo('research')}
              className="text-xs font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Explore Full Research Dossier</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2537] tracking-tight">
                Research Directions
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Our research integrates experimental neuroscience with complementary computational approaches and engineered nanoformulations to advance therapeutics for stroke and CNS disorders.
            </p>
          </div>
        </div>

        {/* 6 Clearly Differentiated Research Direction Themes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {RESEARCH_DIRECTIONS.map((theme) => {
            const Icon = theme.icon;
            return (
              <div
                key={theme.id}
                onClick={() => navigateTo('research', theme.targetSection)}
                className="group relative bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#8B1E24]/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1 cursor-pointer min-h-[260px]"
              >
                {/* Top subtle hover accent bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#8B1E24] via-[#C59B27] to-[#8B1E24] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="space-y-4">
                  {/* Icon & Theme Number */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF8F5] border border-slate-200/80 text-[#8B1E24] group-hover:bg-[#8B1E24] group-hover:text-white group-hover:border-[#8B1E24] flex items-center justify-center transition-all duration-300 shadow-xs">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#C59B27] transition-colors tracking-widest">
                      {theme.num}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug">
                    {theme.title}
                  </h3>

                  {/* Scientific Explanation - Un-clamped, comfortable readable font scale */}
                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {theme.description}
                  </p>
                </div>

                {/* Link to Further Details */}
                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E24] group-hover:text-[#A82931] transition-colors">
                    <span>{theme.linkText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                    Dossier Pillar
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Research Funding & Support - Separated Active, Completed & Institutional Schemes */}
      <section
        id="research-funding-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        {/* Section Header */}
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Grants & Institutional Support</span>
            </div>
            <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider hidden sm:inline">
              Apex National Sponsoring Bodies
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div className="shrink-0">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-extrabold text-[#0F2537] tracking-tight whitespace-nowrap">
                Research Funding & Support
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Competitive extramural research awards, completed scientific investigations, and national faculty infrastructure schemes backing NeuroXlab investigations.
            </p>
          </div>
        </div>

        {/* Category 1: Active Extramural Award (Featured Card) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200/80 px-2.5 py-0.5 rounded-full">
              Active Extramural Research Award (2026–2029)
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-600/30 hover:border-emerald-600 shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-600 via-[#C59B27] to-emerald-600" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Agency Logo Stage & Core Metadata */}
              <div className="lg:col-span-4 space-y-4">
                <a
                  href={activeAward.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-28 sm:h-32 w-full rounded-2xl bg-[#FAF8F5] border border-slate-200/80 p-4 flex items-center justify-center hover:bg-white hover:border-[#C59B27]/70 hover:shadow-md transition-all duration-300 group/logo cursor-pointer block"
                  title={`Visit ${activeAward.fullName} Official Website`}
                >
                  <img
                    src={activeAward.logo}
                    alt={activeAward.fullName}
                    className="max-h-20 sm:max-h-24 max-w-[85%] object-contain group-hover/logo:scale-105 transition-transform duration-300 mx-auto"
                  />
                </a>

                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-[#0F2537]">
                    {activeAward.fullName}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {activeAward.ministry}
                  </p>
                </div>

                {/* Key Metrics: Amount & Period */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/60">
                    <span className="text-[10px] font-mono text-emerald-800 uppercase font-bold block">
                      Grant Outlay
                    </span>
                    <span className="text-sm font-bold text-emerald-950 font-sans">
                      ₹38.5 Lakhs
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-bold block">
                      Period
                    </span>
                    <span className="text-xs font-bold text-[#0F2537] font-mono">
                      2026 – 2029
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 pt-1 font-mono">
                  {activeAward.role}
                </div>
              </div>

              {/* Right Column: Project Title & Specific Objectives */}
              <div className="lg:col-span-8 space-y-4">
                <div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#8B1E24] bg-[#8B1E24]/10 px-2.5 py-0.5 rounded">
                    Extramural Project Title
                  </span>
                  <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0F2537] mt-2 leading-snug">
                    "{activeAward.projectTitle}"
                  </h4>
                </div>

                {/* Specific Project Objectives Checklist */}
                <div className="space-y-2 pt-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#8B1E24]" />
                    <span>Project Specific Objectives & Work Packages:</span>
                  </span>
                  <ul className="space-y-2">
                    {activeAward.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed bg-[#FAF8F5] p-3 rounded-xl border border-slate-100">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100">
                  <button
                    onClick={() => navigateTo('research', activeAward.dossierTarget)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#8B1E24] hover:bg-[#A82931] shadow transition-colors cursor-pointer"
                  >
                    <span>{activeAward.dossierLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={activeAward.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-[#8B1E24] transition-colors"
                  >
                    <span>Visit ICMR Official Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Category 2 & 3: Completed Projects and Institutional Schemes in 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 pt-2">
          {/* Card 1: Completed Extramural Project (ANRF / SERB) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#8B1E24]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-slate-400 via-[#C59B27] to-slate-400" />

            <div className="space-y-4">
              {/* Header Badge */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
                  Completed Extramural Project
                </span>
                <span className="text-xs font-mono text-slate-500 font-semibold">
                  {completedProject.scheme}
                </span>
              </div>

              {/* Logo Stage */}
              <a
                href={completedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-24 sm:h-28 w-full rounded-2xl bg-[#FAF8F5] border border-slate-200/80 p-3.5 flex items-center justify-center hover:bg-white hover:border-[#C59B27]/60 hover:shadow-sm transition-all duration-300 group/logo cursor-pointer block"
                title={`Visit ${completedProject.fullName} Official Website`}
              >
                <img
                  src={completedProject.logo}
                  alt={completedProject.fullName}
                  className="max-h-16 sm:max-h-20 max-w-[85%] object-contain group-hover/logo:scale-105 transition-transform duration-300 mx-auto"
                />
              </a>

              {/* Agency & Ministry */}
              <div className="space-y-0.5">
                <h4 className="font-serif text-lg font-bold text-[#0F2537]">
                  {completedProject.fullName}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {completedProject.ministry}
                </p>
              </div>

              {/* Project Title */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-1">
                <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider block">
                  Project Title
                </span>
                <h5 className="font-serif text-sm sm:text-base font-bold text-[#0F2537] leading-snug">
                  "{completedProject.projectTitle}"
                </h5>
              </div>

              {/* Specific Outcomes & Objectives */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Key Scientific Outcomes & Scope:
                </span>
                <ul className="space-y-2">
                  {completedProject.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C59B27] shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigateTo('research', completedProject.dossierTarget)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E24] hover:text-[#A82931] transition-colors cursor-pointer"
              >
                <span>{completedProject.dossierLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={completedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#8B1E24] transition-colors"
              >
                <span>ANRF Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Card 2: Institutional Support & National Faculty Schemes (UGC) */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 hover:border-[#8B1E24]/50 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-amber-600 via-[#C59B27] to-amber-600" />

            <div className="space-y-4">
              {/* Header Badge with Explicit Clarification */}
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200/80">
                  Institutional Support & Faculty Schemes
                </span>
                <span className="text-[11px] font-mono text-slate-500 font-semibold">
                  Tenured Appointment
                </span>
              </div>

              {/* Logo Stage */}
              <a
                href={institutionalScheme.url}
                target="_blank"
                rel="noopener noreferrer"
                className="h-24 sm:h-28 w-full rounded-2xl bg-[#FAF8F5] border border-slate-200/80 p-3.5 flex items-center justify-center hover:bg-white hover:border-[#C59B27]/60 hover:shadow-sm transition-all duration-300 group/logo cursor-pointer block"
                title={`Visit ${institutionalScheme.fullName} Official Website`}
              >
                <img
                  src={institutionalScheme.logo}
                  alt={institutionalScheme.fullName}
                  className="max-h-16 sm:max-h-20 max-w-[85%] object-contain group-hover/logo:scale-105 transition-transform duration-300 mx-auto"
                />
              </a>

              {/* Agency & Ministry */}
              <div className="space-y-0.5">
                <h4 className="font-serif text-lg font-bold text-[#0F2537]">
                  {institutionalScheme.fullName}
                </h4>
                <p className="text-[11px] text-slate-500 font-medium">
                  {institutionalScheme.ministry}
                </p>
              </div>

              {/* Explicit Verification Callout Note */}
              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/70 text-xs text-amber-900 leading-relaxed font-sans">
                <strong className="font-bold block text-amber-950 mb-0.5">Institutional Scheme Scope:</strong>
                {institutionalScheme.clarificationNotice}
              </div>

              {/* 2 Supported Schemes Details */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Sanctioned Institutional Schemes:
                </span>
                <div className="space-y-2">
                  {institutionalScheme.schemesList.map((sch, i) => (
                    <div key={i} className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 space-y-0.5">
                      <h6 className="text-xs font-bold text-[#0F2537]">
                        {sch.name}
                      </h6>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {sch.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigateTo('activities')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B1E24] hover:text-[#A82931] transition-colors cursor-pointer"
              >
                <span>{institutionalScheme.dossierLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href={institutionalScheme.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-[#8B1E24] transition-colors"
              >
                <span>UGC Portal</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. News & Announcements - Subtle & Refined Editorial Dispatch Strip */}
      <section
        id="news-announcements-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Dispatches & Milestones</span>
            </div>
            <button
              onClick={() => navigateTo('activities')}
              className="text-xs font-bold text-[#8B1E24] hover:text-[#A82931] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All Activities</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2537] tracking-tight">
                News & Announcements
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Key extramural grant developments, recent publications, and academic positions.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {NEWS_ITEMS.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 hover:border-[#8B1E24]/60 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group hover:-translate-y-0.5"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${item.badgeColor}`}>
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#C59B27]" />
                    {item.date}
                  </span>
                </div>

                <h3 className="font-serif text-sm sm:text-[15px] font-bold text-[#0F2537] group-hover:text-[#8B1E24] transition-colors leading-snug line-clamp-3">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-normal">
                  {item.summary}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={item.action}
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#8B1E24] group-hover:text-[#A82931] transition-colors cursor-pointer py-1"
                >
                  <span>{item.linkText}</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Latest Updates (Upward Scrolling Points with Pause-on-Hover & Links) */}
      <section
        id="latest-updates-section"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 scroll-mt-24"
      >
        <div className="space-y-3 border-b-2 border-slate-200 pb-5">
          <div className="flex items-center justify-between gap-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B1E24]/10 text-[#8B1E24] text-xs font-bold uppercase tracking-wider">
              <Bell className="w-3.5 h-3.5 text-[#C59B27]" />
              <span>Bulletin Board</span>
            </div>

            {/* Interactive pause/resume button */}
            <button
              onClick={() => setIsTickerPaused(!isTickerPaused)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:border-[#8B1E24] text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 transition-colors shadow-xs cursor-pointer min-h-[38px]"
              title={isTickerPaused ? 'Resume live scrolling' : 'Pause scrolling'}
            >
              {isTickerPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>Resume Live Feed</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#8B1E24] fill-[#8B1E24]" />
                  <span>Pause Feed</span>
                </>
              )}
            </button>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F2537] tracking-tight">
                Latest Updates
              </h2>
              <div className="w-20 h-1 bg-[#8B1E24] rounded-full mt-2" />
            </div>
            <p className="text-sm sm:text-base text-slate-600 max-w-xl font-normal leading-relaxed">
              Chronological feed of grant approvals, research publications, invited talks, and fellowship notifications.
            </p>
          </div>
        </div>

        {/* Upward Scrolling Points Ticker Container */}
        <div
          className="relative bg-white rounded-3xl border border-slate-200/90 shadow-md p-4 sm:p-6 overflow-hidden ticker-wrapper"
          onMouseEnter={() => setIsTickerPaused(true)}
          onMouseLeave={() => setIsTickerPaused(false)}
        >
          {/* Top Fading Mask Overlay */}
          <div className="absolute top-0 inset-x-0 h-14 bg-gradient-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Fixed-height scrollable window */}
          <div className="h-[440px] overflow-hidden relative">
            <div
              className="animate-scroll-up space-y-4"
              style={{
                animationPlayState: isTickerPaused ? 'paused' : 'running'
              }}
            >
              {scrollingUpdates.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="bg-[#FAF8F5] hover:bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 hover:border-[#C59B27] shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group/item"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Date and Category Tag Badge */}
                    <div className="shrink-0 flex sm:flex-col items-center sm:items-start gap-2 sm:gap-1">
                      <span className="text-[11px] font-mono font-bold text-slate-500 whitespace-nowrap">
                        {item.date}
                      </span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    {/* Point description */}
                    <p className="text-sm font-medium text-[#0F2537] leading-snug group-hover/item:text-[#8B1E24] transition-colors">
                      {item.text}
                    </p>
                  </div>

                  {/* Optional Interactive Link */}
                  {item.hasLink && (
                    <div className="shrink-0 self-end sm:self-center pl-2">
                      {item.linkType === 'external' ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#8B1E24] hover:text-white bg-[#8B1E24]/10 hover:bg-[#8B1E24] transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>{item.linkText}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <button
                          onClick={() => navigateTo(item.linkTarget)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-[#8B1E24] hover:text-white bg-[#8B1E24]/10 hover:bg-[#8B1E24] transition-colors cursor-pointer"
                        >
                          <span>{item.linkText}</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Fading Mask Overlay */}
          <div className="absolute bottom-0 inset-x-0 h-14 bg-gradient-to-t from-white via-white/80 to-transparent z-10 pointer-events-none" />
        </div>
      </section>
    </div>
  );
}