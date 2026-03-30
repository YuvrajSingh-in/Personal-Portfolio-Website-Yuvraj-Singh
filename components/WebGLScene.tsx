'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/* ─── pure vanilla Three.js for full control + scroll reactivity ─── */
export default function WebGLScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x03030d, 1);
    mountRef.current.appendChild(renderer.domElement);

    /* ── Scene + Camera ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x03030d, 0.0018);
    const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.set(0, 0, 140);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0x9696ff, 0.6));
    const pL1 = new THREE.PointLight(0x6366f1, 1.2, 350);
    pL1.position.set(80, 60, 80); scene.add(pL1);
    const pL2 = new THREE.PointLight(0xa855f7, 0.8, 280);
    pL2.position.set(-80, -40, -80); scene.add(pL2);
    const pL3 = new THREE.PointLight(0x22d3ee, 0.6, 200);
    pL3.position.set(0, 80, -60); scene.add(pL3);

    /* ── Stars (sphere distribution) ── */
    const starCount = window.innerWidth < 768 ? 700 : 1800;
    const starPos = new Float32Array(starCount * 3);
    const starCol = new Float32Array(starCount * 3);
    const palette = [
      new THREE.Color('#6366f1'), new THREE.Color('#a855f7'),
      new THREE.Color('#22d3ee'), new THREE.Color('#818cf8'),
      new THREE.Color('#f0abfc'), new THREE.Color('#ffffff'),
    ];
    for (let i = 0; i < starCount; i++) {
      const r = 160 + Math.random() * 300;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      starPos[i*3]   = r * Math.sin(phi) * Math.cos(theta);
      starPos[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
      starPos[i*3+2] = r * Math.cos(phi);
      const c = palette[Math.floor(Math.random() * palette.length)];
      starCol[i*3] = c.r; starCol[i*3+1] = c.g; starCol[i*3+2] = c.b;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.6, vertexColors: true, transparent: true, opacity: 0.75, sizeAttenuation: true, depthWrite: false });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    /* ── Floating rings ── */
    const rings: THREE.Mesh[] = [];
    const ringConfigs = [
      { r: 55, tube: 0.4, color: 0x6366f1, tiltX: Math.PI/5, tiltZ: 0.2, speed: 0.06 },
      { r: 80, tube: 0.3, color: 0xa855f7, tiltX: Math.PI/3.5, tiltZ: -0.35, speed: -0.04 },
      { r: 38, tube: 0.25, color: 0x22d3ee, tiltX: Math.PI/7, tiltZ: 0.55, speed: 0.09 },
      { r: 100, tube: 0.2, color: 0x8b5cf6, tiltX: 0.4, tiltZ: -0.6, speed: 0.025 },
    ];
    ringConfigs.forEach(cfg => {
      const geo = new THREE.TorusGeometry(cfg.r, cfg.tube, 32, 100);
      const mat = new THREE.MeshPhongMaterial({
        color: cfg.color, emissive: cfg.color, emissiveIntensity: 0.5,
        transparent: true, opacity: 0.15, wireframe: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.x = cfg.tiltX;
      mesh.rotation.z = cfg.tiltZ;
      (mesh as any)._speed = cfg.speed;
      rings.push(mesh);
      scene.add(mesh);
    });

    /* ── Icosahedra ── */
    const icos: THREE.Mesh[] = [];
    const icoConfigs = [
      { pos: [65, 22, -45] as [number,number,number],  color: 0x6366f1, size: 5.5, speed: 0.28 },
      { pos: [-72, -12, -32] as [number,number,number], color: 0xa855f7, size: 4,   speed: 0.18 },
      { pos: [42, -32, 55] as [number,number,number],   color: 0x22d3ee, size: 4.5, speed: 0.38 },
      { pos: [-52, 42, 22] as [number,number,number],   color: 0x818cf8, size: 3,   speed: 0.22 },
      { pos: [5, 65, -65] as [number,number,number],    color: 0xc084fc, size: 6.5, speed: 0.14 },
      { pos: [-35, -55, 40] as [number,number,number],  color: 0x67e8f9, size: 3.5, speed: 0.32 },
    ];
    icoConfigs.forEach(cfg => {
      const geo = new THREE.IcosahedronGeometry(cfg.size, 0);
      const mat = new THREE.MeshPhongMaterial({
        color: cfg.color, emissive: cfg.color, emissiveIntensity: 0.35,
        transparent: true, opacity: 0.2, wireframe: true,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...cfg.pos);
      (mesh as any)._speed = cfg.speed;
      (mesh as any)._posY = cfg.pos[1];
      (mesh as any)._offset = cfg.pos[0] * 0.3;
      icos.push(mesh);
      scene.add(mesh);
    });

    /* ── Grid plane at bottom ── */
    const gridHelper = new THREE.GridHelper(300, 30, 0x6366f1, 0x6366f1);
    (gridHelper.material as THREE.Material).opacity = 0.04;
    (gridHelper.material as THREE.Material).transparent = true;
    gridHelper.position.y = -80;
    scene.add(gridHelper);

    /* ── Scroll tracking ── */
    let scrollY = 0;
    let targetScrollY = 0;
    const onScroll = () => { targetScrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll);

    /* ── Mouse parallax ── */
    let mouseX = 0, mouseY = 0;
    let targetMouseX = 0, targetMouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth  - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    /* ── Animation loop ── */
    let rafId: number;
    const clock = new THREE.Clock();
    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* smooth scroll + mouse */
      scrollY += (targetScrollY - scrollY) * 0.05;
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      /* scroll-driven camera drift */
      const scrollProgress = scrollY / (document.body.scrollHeight - window.innerHeight || 1);
      camera.position.y = -scrollProgress * 60;
      camera.position.x = Math.sin(t * 0.08) * 6 + mouseX * 12;
      camera.rotation.y = mouseX * 0.06;
      camera.rotation.x = mouseY * -0.03;

      /* rotate rings */
      rings.forEach(r => { r.rotation.y = t * (r as any)._speed; });

      /* float icos */
      icos.forEach(ico => {
        ico.rotation.x = t * (ico as any)._speed;
        ico.rotation.y = t * (ico as any)._speed * 0.7;
        ico.position.y = (ico as any)._posY + Math.sin(t * 0.5 + (ico as any)._offset) * 6;
      });

      /* slowly spin stars */
      stars.rotation.y = t * 0.01;
      stars.rotation.x = t * 0.003;

      /* grid subtle move */
      gridHelper.position.z = (t * 2) % 10;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
