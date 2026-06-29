import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * NeuralNetwork3D — a polished, AI-engineer themed WebGL backdrop.
 *
 * A single fixed full-screen canvas renders a 3D neural network: glowing nodes,
 * faint connecting edges, and bright "signal" pulses that travel along the edges
 * (the "live inference" effect). Edges light up as signals cross them, nodes
 * twinkle, and depth fog gives the graph real dimensionality. The network is the
 * dense, cursor-reactive focal point behind the Hero, then eases its opacity down
 * on scroll to become a calm ambient field for the rest of the page.
 *
 * Performance / a11y: one GPU context, capped pixel ratio, RAF paused when the
 * tab is hidden or the hero is scrolled away, debounced resize, and full GPU
 * teardown on unmount. The reduced-motion / no-WebGL fallback is handled one
 * level up in Backdrop.jsx (so `three` never even loads for those users).
 */

// Dracula palette — mirrors styles/variables.css
const PALETTE = [
  new THREE.Color('#BD93F9'), // purple
  new THREE.Color('#8BE9FD'), // cyan
  new THREE.Color('#FF79C6'), // pink
  new THREE.Color('#50FA7B'), // green
];
const PULSE_COLOR = new THREE.Color('#9CECFB');
const EDGE_BASE = new THREE.Color('#5a4a8a');  // faint cool purple
const EDGE_HOT = new THREE.Color('#aef4ff');   // bright cyan when firing
const BG_COLOR = new THREE.Color('#1F2330');   // matches --bg-primary (for fog)

/** Soft radial sprite used for glowing points (generated once, no asset fetch). */
function makeGlowTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.85)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.25)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

const NeuralNetwork3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const isMobile = window.innerWidth < 768;
    const NODE_COUNT = isMobile ? 50 : 120;
    const MAX_PULSES = isMobile ? 12 : 28;
    const CONNECT_DIST = isMobile ? 9 : 7.5;   // edge threshold in world units
    const MAX_EDGES_PER_NODE = 4;

    // ---- Renderer ----------------------------------------------------------
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    const canvas = renderer.domElement;
    Object.assign(canvas.style, {
      position: 'fixed',
      inset: '0',
      width: '100%',
      height: '100%',
      zIndex: '0',
      pointerEvents: 'none',
    });
    canvas.setAttribute('aria-hidden', 'true');
    mount.appendChild(canvas);

    // ---- Scene / camera ----------------------------------------------------
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(BG_COLOR, 30, 82); // distant nodes fade into bg
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      200
    );
    camera.position.z = 34;

    const group = new THREE.Group();
    scene.add(group);

    // ---- Nodes -------------------------------------------------------------
    // Wide, shallow volume with light layering so it reads as a network.
    const SPREAD_X = 46;
    const SPREAD_Y = 28;
    const SPREAD_Z = 18;
    const nodes = [];
    const nodePositions = new Float32Array(NODE_COUNT * 3);
    const nodeColors = new Float32Array(NODE_COUNT * 3);
    const nodeBase = new Float32Array(NODE_COUNT * 3); // un-twinkled base colors
    const twPhase = new Float32Array(NODE_COUNT);      // per-node twinkle phase
    const twSpeed = new Float32Array(NODE_COUNT);      // per-node twinkle speed

    for (let i = 0; i < NODE_COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD_X;
      const y = (Math.random() - 0.5) * SPREAD_Y;
      const z = (Math.random() - 0.5) * SPREAD_Z;
      nodes.push(new THREE.Vector3(x, y, z));
      nodePositions[i * 3] = x;
      nodePositions[i * 3 + 1] = y;
      nodePositions[i * 3 + 2] = z;
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      nodeBase[i * 3] = c.r;
      nodeBase[i * 3 + 1] = c.g;
      nodeBase[i * 3 + 2] = c.b;
      nodeColors[i * 3] = c.r;
      nodeColors[i * 3 + 1] = c.g;
      nodeColors[i * 3 + 2] = c.b;
      twPhase[i] = Math.random() * Math.PI * 2;
      twSpeed[i] = 0.6 + Math.random() * 1.6;
    }

    const glowTex = makeGlowTexture();

    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodeGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));
    const nodeMat = new THREE.PointsMaterial({
      size: isMobile ? 1.6 : 1.3,
      map: glowTex,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
      fog: true,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    group.add(nodePoints);

    // ---- Edges (distance-based, capped per node) ---------------------------
    const edges = []; // { a, b }
    const adjacency = Array.from({ length: NODE_COUNT }, () => []); // node -> edge idxs
    const degree = new Int8Array(NODE_COUNT);
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (degree[i] >= MAX_EDGES_PER_NODE) break;
        if (degree[j] >= MAX_EDGES_PER_NODE) continue;
        if (nodes[i].distanceTo(nodes[j]) < CONNECT_DIST) {
          const idx = edges.length;
          edges.push({ a: i, b: j });
          adjacency[i].push(idx);
          adjacency[j].push(idx);
          degree[i]++;
          degree[j]++;
        }
      }
    }

    const edgePositions = new Float32Array(edges.length * 6);
    const edgeColors = new Float32Array(edges.length * 6);
    edges.forEach((e, k) => {
      const a = nodes[e.a];
      const b = nodes[e.b];
      edgePositions.set([a.x, a.y, a.z, b.x, b.y, b.z], k * 6);
      edgeColors.set(
        [EDGE_BASE.r, EDGE_BASE.g, EDGE_BASE.b, EDGE_BASE.r, EDGE_BASE.g, EDGE_BASE.b],
        k * 6
      );
    });
    const edgeGeo = new THREE.BufferGeometry();
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
    edgeGeo.setAttribute('color', new THREE.BufferAttribute(edgeColors, 3));
    const edgeMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      fog: true,
    });
    const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
    group.add(edgeLines);

    // Per-edge "firing" glow, decayed each frame. Only touched edges get rewritten.
    const edgeGlow = new Float32Array(edges.length);
    const litEdges = new Set();
    const writeEdgeColor = (k, t) => {
      const r = EDGE_BASE.r + (EDGE_HOT.r - EDGE_BASE.r) * t;
      const g = EDGE_BASE.g + (EDGE_HOT.g - EDGE_BASE.g) * t;
      const b = EDGE_BASE.b + (EDGE_HOT.b - EDGE_BASE.b) * t;
      const o = k * 6;
      edgeColors[o] = r; edgeColors[o + 1] = g; edgeColors[o + 2] = b;
      edgeColors[o + 3] = r; edgeColors[o + 4] = g; edgeColors[o + 5] = b;
    };

    // ---- Signal pulses (travel along edges, lighting them up) ---------------
    const pulseCount = Math.min(MAX_PULSES, Math.max(0, edges.length));
    const pulsePositions = new Float32Array(pulseCount * 3);
    const pulses = [];
    const spawnPulse = (fromNode = null) => {
      let edgeIndex;
      if (fromNode != null && adjacency[fromNode] && adjacency[fromNode].length) {
        const list = adjacency[fromNode];
        edgeIndex = list[Math.floor(Math.random() * list.length)];
      } else {
        edgeIndex = Math.floor(Math.random() * edges.length);
      }
      const e = edges[edgeIndex];
      const forward = Math.random() > 0.5;
      return {
        edgeIndex,
        from: forward ? e.a : e.b,
        to: forward ? e.b : e.a,
        t: 0,
        speed: 0.4 + Math.random() * 0.7,
      };
    };
    for (let i = 0; i < pulseCount; i++) pulses.push(spawnPulse());

    let pulsePoints = null;
    if (pulseCount > 0) {
      const pulseGeo = new THREE.BufferGeometry();
      pulseGeo.setAttribute('position', new THREE.BufferAttribute(pulsePositions, 3));
      const pulseMat = new THREE.PointsMaterial({
        size: isMobile ? 2.6 : 2.2,
        map: glowTex,
        color: PULSE_COLOR,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true,
        fog: true,
      });
      pulsePoints = new THREE.Points(pulseGeo, pulseMat);
      group.add(pulsePoints);
    }

    // ---- Interaction / scroll state ---------------------------------------
    const pointer = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    let nearestNode = null;
    let scrollFade = 1;
    let intro = 0; // 0 -> 1 entrance ramp

    const onPointerMove = (e) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
      let best = Infinity;
      const v = new THREE.Vector3();
      for (let i = 0; i < NODE_COUNT; i++) {
        v.copy(nodes[i]).applyMatrix4(group.matrixWorld).project(camera);
        const dx = v.x - pointer.x;
        const dy = v.y - pointer.y;
        const d = dx * dx + dy * dy;
        if (d < best) { best = d; nearestNode = i; }
      }
    };

    const onScroll = () => {
      const h = window.innerHeight || 1;
      const p = Math.min(window.scrollY / h, 1);
      scrollFade = 1 - p * 0.65; // 1 -> 0.35
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ---- Resize (debounced) ------------------------------------------------
    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, 150);
    };
    window.addEventListener('resize', onResize);

    // ---- Pause when hidden / scrolled fully away --------------------------
    let running = true;
    let heroVisible = true;
    const heroEl = document.getElementById('home');
    let io = null;
    if (heroEl && 'IntersectionObserver' in window) {
      io = new IntersectionObserver(
        ([entry]) => { heroVisible = entry.isIntersecting; },
        { threshold: 0 }
      );
      io.observe(heroEl);
    }
    const onVisibility = () => {
      const shouldRun = !document.hidden;
      if (shouldRun && !running) { running = true; clock.start(); loop(); }
      running = shouldRun;
    };
    document.addEventListener('visibilitychange', onVisibility);

    // ---- Animation loop ----------------------------------------------------
    const clock = new THREE.Clock();
    let frameId = null;
    const tmp = new THREE.Vector3();

    const render = () => {
      const dt = Math.min(clock.getDelta(), 0.05);
      const time = clock.elapsedTime;

      // Entrance ramp (ease-out).
      if (intro < 1) intro = Math.min(1, intro + dt * 0.5);
      const introEase = 1 - Math.pow(1 - intro, 3);
      const master = introEase * scrollFade;

      // Camera parallax eases toward pointer.
      target.x += (pointer.x - target.x) * 0.04;
      target.y += (pointer.y - target.y) * 0.04;
      camera.position.x = target.x * 6;
      camera.position.y = target.y * 4;
      camera.lookAt(scene.position);

      // Constant gentle rotation; slower once scrolled past the hero.
      const rotScale = 0.3 + scrollFade * 0.7;
      group.rotation.y += dt * 0.05 * rotScale;
      group.rotation.x = Math.sin(time * 0.1) * 0.06;
      group.updateMatrixWorld();

      // Node twinkle — each node breathes on its own phase.
      for (let i = 0; i < NODE_COUNT; i++) {
        const b = 0.62 + 0.38 * Math.sin(time * twSpeed[i] + twPhase[i]);
        nodeColors[i * 3] = nodeBase[i * 3] * b;
        nodeColors[i * 3 + 1] = nodeBase[i * 3 + 1] * b;
        nodeColors[i * 3 + 2] = nodeBase[i * 3 + 2] * b;
      }
      nodeGeo.attributes.color.needsUpdate = true;

      // Advance pulses; light up the edge they travel and re-fire on arrival.
      if (pulsePoints) {
        for (let i = 0; i < pulses.length; i++) {
          const pu = pulses[i];
          pu.t += pu.speed * dt;
          edgeGlow[pu.edgeIndex] = 1;
          litEdges.add(pu.edgeIndex);
          if (pu.t >= 1) {
            pulses[i] = spawnPulse(Math.random() < 0.5 ? nearestNode : null);
            continue;
          }
          tmp.copy(nodes[pu.from]).lerp(nodes[pu.to], pu.t);
          pulsePositions[i * 3] = tmp.x;
          pulsePositions[i * 3 + 1] = tmp.y;
          pulsePositions[i * 3 + 2] = tmp.z;
        }
        pulsePoints.geometry.attributes.position.needsUpdate = true;
        // Gentle size shimmer on the pulse sprites.
        pulsePoints.material.size = (isMobile ? 2.6 : 2.2) * (1 + 0.12 * Math.sin(time * 6));
      }

      // Decay edge firing; rewrite only the edges that are currently lit.
      if (litEdges.size) {
        for (const k of litEdges) {
          const g = (edgeGlow[k] *= 0.9);
          if (g < 0.02) {
            edgeGlow[k] = 0;
            writeEdgeColor(k, 0);
            litEdges.delete(k);
          } else {
            writeEdgeColor(k, g);
          }
        }
        edgeGeo.attributes.color.needsUpdate = true;
      }

      // Master opacity (entrance + scroll).
      nodeMat.opacity = 0.95 * master;
      edgeMat.opacity = 0.5 * master;
      if (pulsePoints) pulsePoints.material.opacity = master;

      renderer.render(scene, camera);
    };

    const loop = () => {
      if (!running) return;
      if (heroVisible || window.scrollY < window.innerHeight * 1.2) {
        render();
      } else {
        clock.getDelta(); // keep clock fresh without rendering
      }
      frameId = requestAnimationFrame(loop);
    };
    loop();

    // ---- Teardown ----------------------------------------------------------
    return () => {
      running = false;
      if (frameId) cancelAnimationFrame(frameId);
      clearTimeout(resizeTimer);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      if (io) io.disconnect();

      nodeGeo.dispose();
      nodeMat.dispose();
      edgeGeo.dispose();
      edgeMat.dispose();
      if (pulsePoints) {
        pulsePoints.geometry.dispose();
        pulsePoints.material.dispose();
      }
      glowTex.dispose();
      renderer.dispose();
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, []);

  return <div ref={mountRef} aria-hidden="true" />;
};

export default NeuralNetwork3D;
