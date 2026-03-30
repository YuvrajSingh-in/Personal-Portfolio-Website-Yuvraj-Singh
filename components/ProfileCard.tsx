'use client';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function ProfileCard() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });
  const [hovered, setHovered] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    setTilt({ x: -dy * 20, y: dx * 20 });
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <div ref={ref} onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({x:0,y:0}); setGlow({x:50,y:50}); setHovered(false); }}
        style={{ perspective: '1000px' }} className="relative"
      >
        <motion.div
          animate={{ rotateX: tilt.x, rotateY: tilt.y, scale: hovered ? 1.04 : 1 }}
          transition={{ type: 'spring', stiffness: 170, damping: 22 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-64 md:w-72 xl:w-80"
        >
          {/* Animated gradient border */}
          <div className="animated-border p-[2px] rounded-2xl shadow-2xl">
            <div className="rounded-2xl overflow-hidden" style={{ background: '#07071a' }}>

              {/* Photo */}
              <div className="relative w-full" style={{ aspectRatio: '3/4' }}>
                <img
                  src="/profile.jpg" alt="Yuvraj Singh"
                  className="w-full h-full object-cover object-top"
                  style={{ filter: 'contrast(1.07) saturate(1.12) brightness(0.95)' }}
                />

                {/* Reactive light */}
                <div className="absolute inset-0 transition-all duration-75" style={{
                  background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(99,102,241,0.28) 0%, transparent 55%)`,
                  mixBlendMode: 'overlay',
                }} />

                {/* Vignette bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#07071a] via-[#07071a10] to-transparent" />

                {/* Scanline shimmer */}
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400/70 to-transparent" />

                {/* Open to work */}
                <div className="absolute top-3 left-3">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[9px] tracking-widest bg-black/65 backdrop-blur border border-emerald-500/30 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
                    OPEN TO WORK
                  </div>
                </div>

                {/* Location */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded-full bg-black/60 backdrop-blur border border-white/10 text-slate-400 font-mono text-[9px]">
                  📍 Dublin
                </div>

                {/* Social links overlay on hover */}
                <motion.div
                  animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
                  className="absolute bottom-16 inset-x-0 flex justify-center gap-3"
                >
                  {[
                    { label: 'in', href: 'https://www.linkedin.com/in/yuvrajsinghie/' },
                    { label: 'gh', href: 'https://github.com/thakursahab2580-lgtm' },
                  ].map(s => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                      className="w-8 h-8 rounded-full glass flex items-center justify-center font-mono text-[10px] text-indigo-300 border border-indigo-500/30 hover:bg-indigo-500/20 transition-all">
                      {s.label}
                    </a>
                  ))}
                </motion.div>
              </div>

              {/* Name strip */}
              <div className="px-5 py-4">
                <div className="font-display font-bold text-lg text-white tracking-tight">Yuvraj Singh</div>
                <div className="font-mono text-[9px] text-indigo-400 tracking-widest mt-1">AI ENGINEER · SOC SPECIALIST</div>
                <div className="flex gap-3 mt-2.5">
                  <span className="font-mono text-[9px] text-slate-600 flex items-center gap-1">
                    <span className="text-violet-400">✦</span> NCI Dublin MSc AI
                  </span>
                  <span className="font-mono text-[9px] text-slate-600 flex items-center gap-1">
                    <span className="text-cyan-400">✦</span> Ex-NPCL SOC
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3D glow shadow */}
          <motion.div animate={{ opacity: hovered ? 1 : 0 }}
            className="absolute -inset-6 -z-10 rounded-3xl blur-2xl"
            style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.35), transparent 70%)' }}
          />
        </motion.div>
      </div>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="font-mono text-[9px] text-slate-700 tracking-[0.2em] uppercase">
        — hover to interact —
      </motion.p>
    </div>
  );
}
