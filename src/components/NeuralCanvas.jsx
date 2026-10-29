import React, { useEffect, useRef } from 'react';

/**
 * NeuralCanvas
 * 
 * An authentic, high-performance interactive neuroscience visualization for the NeuroXLab hero.
 * Features:
 * - Organic, branching multipolar neuron morphologies along left and right flanks
 * - Tapering dendrites with curved Bezier paths and synaptic boutons
 * - Traveling action potential pulses across synaptic connections
 * - Interactive mouse-responsive parallax, localized node illumination, and synaptic bridging
 * - Central exclusion zone ensuring 100% text legibility
 * - Ambient depth particles in deep navy, slate-cyan, and heritage gold
 * - Full support for reduced-motion preferences, high-DPI scaling, and viewport auto-pause
 */
export default function NeuralCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Check reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse tracking state relative to hero container
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isHovering: false,
      radius: 200,      // Interaction radius in CSS pixels
      maxShift: 10      // Maximum parallax shift in CSS pixels
    };

    // Color definitions matching the prompt specification
    // Palette: Deep Navy background (#071725, #0B1E2D), Cyan/Blue branches (#4F9DCC, #75C8F2),
    // Synaptic Gold highlights (#E7B944, #F5D27A), Pearl white accents
    const COLORS = {
      cyanPrimary: { r: 79, g: 157, b: 204 },    // #4F9DCC
      cyanLight: { r: 117, g: 200, b: 242 },     // #75C8F2
      goldAccent: { r: 231, g: 185, b: 68 },     // #E7B944
      goldBright: { r: 245, g: 210, b: 122 },    // #F5D27A
      pearl: { r: 215, g: 230, b: 245 }
    };

    // Structure storage
    const neurons = [];
    const synapses = [];
    const pulses = [];
    const ambientParticles = [];

    // Central exclusion zone mask definition
    const getExclusionMask = (w, h) => {
      const isMobile = w < 640;
      const isTablet = w < 1024;
      return {
        cx: w * 0.5,
        cy: h * 0.48,
        rx: isMobile ? w * 0.46 : isTablet ? w * 0.38 : Math.min(w * 0.32, 460),
        ry: isMobile ? h * 0.44 : h * 0.42
      };
    };

    // Helper: calculate opacity multiplier based on proximity to center text zone
    const getCentralFade = (x, y, mask) => {
      const dx = (x - mask.cx) / mask.rx;
      const dy = (y - mask.cy) / mask.ry;
      const distSq = dx * dx + dy * dy;
      if (distSq <= 0.8) return 0; // completely inside text core
      if (distSq >= 1.4) return 1; // fully outside
      // Smooth Hermite interpolation between 0.8 and 1.4
      const t = (distSq - 0.8) / 0.6;
      return t * t * (3 - 2 * t);
    };

    // Build hierarchical branching arbor for a neuron
    const createDendriteBranch = (startX, startY, baseAngle, baseLength, depth, layer, maxDepth = 2) => {
      const numSegments = 4;
      const points = [{ x: startX, y: startY }];
      let curX = startX;
      let curY = startY;
      let curAngle = baseAngle;
      const segLength = baseLength / numSegments;

      for (let s = 1; s <= numSegments; s++) {
        // Natural biological wandering
        const angleWobble = (Math.sin(s * 1.8 + depth * 2.3) * 0.22) + ((Math.random() - 0.5) * 0.15);
        curAngle += angleWobble;
        curX += Math.cos(curAngle) * segLength;
        curY += Math.sin(curAngle) * segLength;
        points.push({ x: curX, y: curY });
      }

      // Small synaptic boutons / spines along the branch
      const boutons = [];
      for (let p = 1; p < points.length; p++) {
        if (Math.random() < 0.6) {
          const pt = points[p];
          const isGold = Math.random() < 0.35;
          boutons.push({
            x: pt.x + (Math.random() - 0.5) * 4,
            y: pt.y + (Math.random() - 0.5) * 4,
            radius: (Math.random() * 1.2 + 1.2) * layer.scale,
            isGold,
            pulsePhase: Math.random() * Math.PI * 2
          });
        }
      }

      const branch = {
        points,
        endPoint: points[points.length - 1],
        depth,
        width: Math.max(0.6, (3.0 - depth * 1.0) * layer.scale),
        boutons,
        subBranches: []
      };

      // Split into child branches if not at terminal depth
      if (depth < maxDepth) {
        const numChildren = Math.random() < 0.75 ? 2 : 1;
        const spreadAngle = 0.45 + Math.random() * 0.2;
        const childLength = baseLength * (0.65 + Math.random() * 0.15);

        for (let c = 0; c < numChildren; c++) {
          const branchSign = c === 0 ? -1 : 1;
          const childAngle = curAngle + branchSign * (spreadAngle * (0.8 + Math.random() * 0.4));
          const child = createDendriteBranch(
            curX,
            curY,
            childAngle,
            childLength,
            depth + 1,
            layer,
            maxDepth
          );
          branch.subBranches.push(child);
        }
      }

      return branch;
    };

    // Initialize all neurons across left and right flanks
    const initNetwork = (w, h) => {
      neurons.length = 0;
      synapses.length = 0;
      pulses.length = 0;
      ambientParticles.length = 0;

      const isMobile = w < 640;
      const isTablet = w < 1024;

      // Determine neuron counts per flank
      const countPerSide = isMobile ? 2 : isTablet ? 3 : 4;
      const flankWidth = isMobile ? w * 0.22 : isTablet ? w * 0.26 : Math.min(w * 0.28, 380);

      // Define depth layers: 0: background (distant/soft), 1: midground, 2: foreground (crisp)
      const layers = [
        { id: 0, scale: 0.65, opacity: 0.35, maxShift: 3 },
        { id: 1, scale: 0.90, opacity: 0.60, maxShift: 6 },
        { id: 2, scale: 1.15, opacity: 0.85, maxShift: 10 }
      ];

      for (let side = 0; side < 2; side++) {
        // side 0: Left flank, side 1: Right flank
        for (let i = 0; i < countPerSide; i++) {
          const layer = layers[(i + side) % layers.length];
          const isGoldSoma = (i + side) % 3 === 0;

          // Spatial distribution with organic jitter
          const verticalBand = h / (countPerSide + 0.5);
          const y = verticalBand * (i + 0.6 + (Math.random() - 0.5) * 0.4);

          // Position somas well within the flanks
          const x = side === 0
            ? Math.random() * (flankWidth * 0.65) + 30
            : w - (Math.random() * (flankWidth * 0.65) + 30);

          const somaRadius = (isGoldSoma ? 6.5 : 5.5) * layer.scale;

          // Number of primary dendritic trunks radiating out
          const numTrunks = isMobile ? 3 : 4 + Math.floor(Math.random() * 2);
          const branches = [];

          // Primary stem angles: orient mainly toward center-up, center, center-down, and vertical
          const baseAngles = side === 0
            ? [-0.7, -0.25, 0.15, 0.6, 1.4] // Left flank points inward toward right
            : [Math.PI - 0.6, Math.PI - 0.15, Math.PI + 0.25, Math.PI + 0.7, -1.4]; // Right flank points inward toward left

          for (let b = 0; b < numTrunks; b++) {
            const angle = baseAngles[b % baseAngles.length] + (Math.random() - 0.5) * 0.35;
            const branchLen = (isMobile ? 70 : 110 + Math.random() * 60) * layer.scale;
            const branch = createDendriteBranch(x, y, angle, branchLen, 0, layer, isMobile ? 1 : 2);
            branches.push(branch);
          }

          neurons.push({
            id: `neuron-${side}-${i}`,
            side,
            baseX: x,
            baseY: y,
            x,
            y,
            somaRadius,
            layer,
            isGold: isGoldSoma,
            pulsePhase: Math.random() * Math.PI * 2,
            branches
          });
        }
      }

      // Collect terminal boutons from all branches to identify nearby synaptic clefts
      const allTerminals = [];
      neurons.forEach((n) => {
        const collectEnds = (br) => {
          allTerminals.push({ x: br.endPoint.x, y: br.endPoint.y, neuronId: n.id, layer: n.layer });
          br.subBranches.forEach(collectEnds);
        };
        n.branches.forEach(collectEnds);
      });

      // Find pairs of endpoints close enough to form subtle synaptic connections
      const maxSynapseDist = isMobile ? 50 : 75;
      for (let i = 0; i < allTerminals.length; i++) {
        for (let j = i + 1; j < allTerminals.length; j++) {
          const t1 = allTerminals[i];
          const t2 = allTerminals[j];
          if (t1.neuronId !== t2.neuronId) {
            const dx = t1.x - t2.x;
            const dy = t1.y - t2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < maxSynapseDist && Math.random() < 0.4) {
              synapses.push({
                x1: t1.x,
                y1: t1.y,
                x2: t2.x,
                y2: t2.y,
                dist,
                alpha: 0.15 + (1 - dist / maxSynapseDist) * 0.25,
                activity: Math.random() * 0.5,
                isGold: Math.random() < 0.3
              });
            }
          }
        }
      }

      // Ambient background micro-particles for depth
      const numParticles = isMobile ? 15 : isTablet ? 25 : 40;
      for (let p = 0; p < numParticles; p++) {
        // Keep particles mostly along flanks and top/bottom edges
        const inFlank = Math.random() < 0.8;
        const px = inFlank
          ? (Math.random() < 0.5 ? Math.random() * flankWidth : w - Math.random() * flankWidth)
          : Math.random() * w;
        ambientParticles.push({
          baseX: px,
          baseY: Math.random() * h,
          x: px,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          radius: Math.random() * 1.8 + 0.8,
          alpha: Math.random() * 0.35 + 0.15,
          isGold: Math.random() < 0.28,
          phase: Math.random() * Math.PI * 2
        });
      }
    };

    // Trigger an action potential pulse traveling along a branch
    const spawnPulse = (neuron) => {
      if (!neuron || neuron.branches.length === 0) return;
      const branch = neuron.branches[Math.floor(Math.random() * neuron.branches.length)];
      if (!branch || branch.points.length < 2) return;

      // Extract coordinates along the branch chain
      const path = [];
      const addPath = (b) => {
        b.points.forEach((pt) => path.push({ x: pt.x, y: pt.y }));
        if (b.subBranches.length > 0) {
          const nextB = b.subBranches[Math.floor(Math.random() * b.subBranches.length)];
          addPath(nextB);
        }
      };
      addPath(branch);

      if (path.length >= 3) {
        pulses.push({
          path,
          progress: 0,
          speed: 0.007 + Math.random() * 0.006,
          isGold: neuron.isGold || Math.random() < 0.35,
          size: 2.2 * neuron.layer.scale
        });
      }
    };

    // Resize handler
    const handleResize = () => {
      const rect = parent.getBoundingClientRect();
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNetwork(width, height);
    };

    // Mouse movement listener on hero section
    const onPointerMove = (e) => {
      const rect = parent.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isHovering = true;
    };

    const onPointerLeave = () => {
      mouse.isHovering = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    parent.addEventListener('pointermove', onPointerMove, { passive: true });
    parent.addEventListener('pointerleave', onPointerLeave, { passive: true });

    // Window resize observer
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(parent);

    // Pause when hero is not visible
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.05 }
    );
    visibilityObserver.observe(parent);

    const onVisibilityChange = () => {
      if (document.hidden) isVisible = false;
      else isVisible = true;
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    handleResize();

    // Occasional automatic pulse generation
    let lastPulseTime = 0;

    // =========================================================================
    // ANIMATION & RENDERING LOOP
    // =========================================================================
    const render = (time) => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const mask = getExclusionMask(width, height);

      // Smooth mouse coordinates with interpolation (easing)
      if (mouse.isHovering) {
        mouse.x += (mouse.targetX - mouse.x) * 0.08;
        mouse.y += (mouse.targetY - mouse.y) * 0.08;
      } else {
        // Gently return to resting position
        mouse.x += (-1000 - mouse.x) * 0.04;
        mouse.y += (-1000 - mouse.y) * 0.04;
      }

      // Periodically spark subtle action potentials
      if (!prefersReducedMotion && time - lastPulseTime > 1800) {
        if (neurons.length > 0 && pulses.length < 4) {
          const randNeuron = neurons[Math.floor(Math.random() * neurons.length)];
          spawnPulse(randNeuron);
          lastPulseTime = time;
        }
      }

      // -----------------------------------------------------------------------
      // 1. RENDER AMBIENT BACKGROUND PARTICLES
      // -----------------------------------------------------------------------
      ambientParticles.forEach((p) => {
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        // Mouse displacement
        let dispX = 0;
        let dispY = 0;
        if (mouse.isHovering) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0.1) {
            const factor = (1 - dist / mouse.radius) * 4;
            dispX = (dx / dist) * factor;
            dispY = (dy / dist) * factor;
          }
        }

        const renderX = p.x + dispX;
        const renderY = p.y + dispY;
        const fade = getCentralFade(renderX, renderY, mask);
        if (fade > 0.02) {
          const col = p.isGold ? COLORS.goldAccent : COLORS.cyanPrimary;
          const alpha = p.alpha * fade * (0.8 + Math.sin(time * 0.002 + p.phase) * 0.2);
          ctx.beginPath();
          ctx.arc(renderX, renderY, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`;
          ctx.fill();
        }
      });

      // -----------------------------------------------------------------------
      // 2. RENDER SYNAPTIC CONNECTIONS (CLEFTS)
      // -----------------------------------------------------------------------
      synapses.forEach((syn) => {
        const midX = (syn.x1 + syn.x2) * 0.5;
        const midY = (syn.y1 + syn.y2) * 0.5;
        const fade = getCentralFade(midX, midY, mask);
        if (fade > 0.05) {
          // Check mouse proximity to illuminate synapse
          let mouseBoost = 0;
          if (mouse.isHovering) {
            const dx = midX - mouse.x;
            const dy = midY - mouse.y;
            const d = Math.sqrt(dx * dx + dy * dy);
            if (d < mouse.radius) {
              mouseBoost = (1 - d / mouse.radius) * 0.45;
            }
          }

          const col = syn.isGold ? COLORS.goldAccent : COLORS.cyanLight;
          const alpha = Math.min(0.85, (syn.alpha + mouseBoost) * fade);

          ctx.beginPath();
          ctx.moveTo(syn.x1, syn.y1);
          // Subtle natural arc
          ctx.quadraticCurveTo(
            midX + (Math.sin(time * 0.001) * 3),
            midY + (Math.cos(time * 0.001) * 3),
            syn.x2,
            syn.y2
          );
          ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha})`;
          ctx.lineWidth = 0.8 + mouseBoost;
          ctx.stroke();

          // Synaptic cleft micro-terminal nodes
          ctx.beginPath();
          ctx.arc(syn.x1, syn.y1, 1.3, 0, Math.PI * 2);
          ctx.arc(syn.x2, syn.y2, 1.3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha * 1.2})`;
          ctx.fill();
        }
      });

      // -----------------------------------------------------------------------
      // 3. RENDER NEURONS & DENDRITIC TREES
      // -----------------------------------------------------------------------
      neurons.forEach((neuron) => {
        // Calculate neuron mouse parallax displacement
        let shiftX = 0;
        let shiftY = 0;
        let mouseProximity = 0;

        if (mouse.isHovering) {
          const dx = neuron.baseX - mouse.x;
          const dy = neuron.baseY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius && dist > 0.1) {
            mouseProximity = (1 - dist / mouse.radius);
            const moveAmt = mouseProximity * neuron.layer.maxShift;
            // Shift away from mouse gently
            shiftX = (dx / dist) * moveAmt;
            shiftY = (dy / dist) * moveAmt;
          }
        }

        neuron.x = neuron.baseX + shiftX;
        neuron.y = neuron.baseY + shiftY;

        const somaFade = getCentralFade(neuron.x, neuron.y, mask);
        if (somaFade < 0.02) return;

        const primaryCol = neuron.isGold ? COLORS.goldAccent : COLORS.cyanPrimary;
        const brightCol = neuron.isGold ? COLORS.goldBright : COLORS.cyanLight;
        const baseAlpha = (neuron.layer.opacity + mouseProximity * 0.3) * somaFade;

        // Draw hierarchical dendritic branches
        const drawBranch = (branch, parentX, parentY) => {
          if (branch.points.length < 2) return;

          ctx.beginPath();
          ctx.moveTo(parentX, parentY);

          for (let p = 1; p < branch.points.length; p++) {
            const pt = branch.points[p];
            // Apply slight branch parallax shift
            const curPtX = pt.x + shiftX * 0.85;
            const curPtY = pt.y + shiftY * 0.85;

            // Compute midpoint for smooth quadratic curve
            if (p < branch.points.length - 1) {
              const nextPt = branch.points[p + 1];
              const nextPtX = nextPt.x + shiftX * 0.85;
              const nextPtY = nextPt.y + shiftY * 0.85;
              const midX = (curPtX + nextPtX) * 0.5;
              const midY = (curPtY + nextPtY) * 0.5;
              ctx.quadraticCurveTo(curPtX, curPtY, midX, midY);
            } else {
              ctx.lineTo(curPtX, curPtY);
            }
          }

          // Compute average fade for the branch
          const endPt = branch.points[branch.points.length - 1];
          const branchFade = getCentralFade(endPt.x + shiftX, endPt.y + shiftY, mask);
          const bAlpha = Math.min(1.0, baseAlpha * (branchFade * 0.95));

          if (bAlpha > 0.03) {
            ctx.strokeStyle = `rgba(${primaryCol.r}, ${primaryCol.g}, ${primaryCol.b}, ${bAlpha})`;
            ctx.lineWidth = branch.width;
            ctx.lineCap = 'round';
            ctx.lineJoin = 'round';
            ctx.stroke();

            // Draw synaptic boutons along the branch
            branch.boutons.forEach((btn) => {
              const bx = btn.x + shiftX * 0.85;
              const by = btn.y + shiftY * 0.85;
              const btnFade = getCentralFade(bx, by, mask);
              if (btnFade > 0.05) {
                const bCol = btn.isGold ? COLORS.goldBright : COLORS.cyanLight;
                const bPulse = Math.sin(time * 0.003 + btn.pulsePhase) * 0.25;
                const btnAlpha = Math.min(1.0, (bAlpha + bPulse + mouseProximity * 0.3) * btnFade);

                ctx.beginPath();
                ctx.arc(bx, by, btn.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${bCol.r}, ${bCol.g}, ${bCol.b}, ${btnAlpha})`;
                ctx.fill();

                // Subtle halo for selected prominent boutons
                if (btn.isGold || mouseProximity > 0.3) {
                  ctx.beginPath();
                  ctx.arc(bx, by, btn.radius * 2.2, 0, Math.PI * 2);
                  ctx.fillStyle = `rgba(${bCol.r}, ${bCol.g}, ${bCol.b}, ${btnAlpha * 0.25})`;
                  ctx.fill();
                }
              }
            });
          }

          // Recursively render child branches
          const lastPt = branch.points[branch.points.length - 1];
          branch.subBranches.forEach((sub) => {
            drawBranch(sub, lastPt.x + shiftX * 0.85, lastPt.y + shiftY * 0.85);
          });
        };

        // Draw all primary branches from the soma
        neuron.branches.forEach((br) => {
          drawBranch(br, neuron.x, neuron.y);
        });

        // ---------------------------------------------------------------------
        // SOMA (CELL BODY) RENDERING
        // ---------------------------------------------------------------------
        // Soft outer radial halo
        const haloRadius = neuron.somaRadius * 3.5;
        const haloGrad = ctx.createRadialGradient(
          neuron.x, neuron.y, neuron.somaRadius * 0.4,
          neuron.x, neuron.y, haloRadius
        );
        haloGrad.addColorStop(0, `rgba(${brightCol.r}, ${brightCol.g}, ${brightCol.b}, ${baseAlpha * 0.5})`);
        haloGrad.addColorStop(0.4, `rgba(${primaryCol.r}, ${primaryCol.g}, ${primaryCol.b}, ${baseAlpha * 0.18})`);
        haloGrad.addColorStop(1, `rgba(${primaryCol.r}, ${primaryCol.g}, ${primaryCol.b}, 0)`);

        ctx.beginPath();
        ctx.arc(neuron.x, neuron.y, haloRadius, 0, Math.PI * 2);
        ctx.fillStyle = haloGrad;
        ctx.fill();

        // Multipolar soma body with organic shape
        ctx.beginPath();
        const numSomaLobes = 6;
        for (let a = 0; a < numSomaLobes; a++) {
          const angle = (a / numSomaLobes) * Math.PI * 2;
          const rWobble = neuron.somaRadius * (1 + Math.sin(angle * 3 + neuron.pulsePhase) * 0.2);
          const px = neuron.x + Math.cos(angle) * rWobble;
          const py = neuron.y + Math.sin(angle) * rWobble;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();

        const somaGrad = ctx.createRadialGradient(
          neuron.x - 1, neuron.y - 1, 0,
          neuron.x, neuron.y, neuron.somaRadius
        );
        somaGrad.addColorStop(0, `rgba(255, 255, 255, ${Math.min(1.0, baseAlpha * 1.3)})`);
        somaGrad.addColorStop(0.35, `rgba(${brightCol.r}, ${brightCol.g}, ${brightCol.b}, ${baseAlpha * 1.1})`);
        somaGrad.addColorStop(1, `rgba(${primaryCol.r}, ${primaryCol.g}, ${primaryCol.b}, ${baseAlpha * 0.8})`);

        ctx.fillStyle = somaGrad;
        ctx.fill();
      });

      // -----------------------------------------------------------------------
      // 4. ACTION POTENTIAL PULSES
      // -----------------------------------------------------------------------
      if (!prefersReducedMotion) {
        for (let i = pulses.length - 1; i >= 0; i--) {
          const pulse = pulses[i];
          pulse.progress += pulse.speed;

          if (pulse.progress >= 1) {
            pulses.splice(i, 1);
            continue;
          }

          // Interpolate coordinate along path
          const totalPoints = pulse.path.length;
          const floatIdx = pulse.progress * (totalPoints - 1);
          const idx = Math.floor(floatIdx);
          const t = floatIdx - idx;

          if (idx < totalPoints - 1) {
            const p1 = pulse.path[idx];
            const p2 = pulse.path[idx + 1];
            const px = p1.x + (p2.x - p1.x) * t;
            const py = p1.y + (p2.y - p1.y) * t;

            const fade = getCentralFade(px, py, mask);
            if (fade > 0.05) {
              const col = pulse.isGold ? COLORS.goldBright : COLORS.cyanLight;
              const alpha = Math.sin(pulse.progress * Math.PI) * fade;

              // Glowing action potential bead
              ctx.beginPath();
              ctx.arc(px, py, pulse.size * 1.4, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
              ctx.fill();

              // Outer pulse glow
              ctx.beginPath();
              ctx.arc(px, py, pulse.size * 3.5, 0, Math.PI * 2);
              ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha * 0.45})`;
              ctx.fill();
            }
          }
        }
      }

      // -----------------------------------------------------------------------
      // 5. INTERACTIVE MOUSE SYNAPTIC BRIDGE
      // -----------------------------------------------------------------------
      if (mouse.isHovering && !prefersReducedMotion) {
        // Find closest neuron soma or major branch node to pointer
        let closestNode = null;
        let minDist = 130;

        neurons.forEach((n) => {
          const d = Math.sqrt((n.x - mouse.x) ** 2 + (n.y - mouse.y) ** 2);
          if (d < minDist) {
            minDist = d;
            closestNode = { x: n.x, y: n.y, isGold: n.isGold };
          }
        });

        if (closestNode) {
          const bridgeFade = getCentralFade(mouse.x, mouse.y, mask);
          if (bridgeFade > 0.1) {
            const bridgeAlpha = (1 - minDist / 130) * 0.45 * bridgeFade;
            const col = closestNode.isGold ? COLORS.goldBright : COLORS.cyanLight;

            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.quadraticCurveTo(
              (mouse.x + closestNode.x) * 0.5 + Math.sin(time * 0.005) * 6,
              (mouse.y + closestNode.y) * 0.5 + Math.cos(time * 0.005) * 6,
              closestNode.x,
              closestNode.y
            );
            ctx.strokeStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${bridgeAlpha})`;
            ctx.lineWidth = 1.0;
            ctx.setLineDash([3, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Small glowing pointer spark
            ctx.beginPath();
            ctx.arc(mouse.x, mouse.y, 2.0, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${bridgeAlpha * 1.5})`;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    // Cleanup on component unmount
    return () => {
      if (animId) cancelAnimationFrame(animId);
      parent.removeEventListener('pointermove', onPointerMove);
      parent.removeEventListener('pointerleave', onPointerLeave);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
