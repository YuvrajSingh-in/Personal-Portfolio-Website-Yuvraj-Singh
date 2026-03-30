'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'About',      id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects',   id: 'projects' },
  { label: 'Skills',     id: 'skills' },
  { label: 'Contact',    id: 'contact' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active,   setActive]   = useState('');

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActive(id);
  };

  return (
    <motion.header
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ delay: 0.15, duration: 0.7, ease: [0.16,1,0.3,1] }}
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-5"
    >
      <div className={`flex items-center gap-0.5 px-3 py-2 rounded-2xl transition-all duration-500 ${
        scrolled ? 'glass shadow-2xl border border-white/7' : ''
      }`}>
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })}
          className="font-display font-extrabold text-xl mr-5 flex items-baseline gap-1 data-hover">
          <span className="text-white">Y</span><span className="grad">S</span>
          <span className="font-mono text-[8px] text-slate-700 tracking-widest">FOLIO</span>
        </button>

        {links.map(l => (
          <button key={l.id} onClick={() => go(l.id)}
            className={`relative px-3.5 py-2 rounded-xl text-sm transition-all font-medium data-hover ${
              active===l.id ? 'text-indigo-300' : 'text-slate-500 hover:text-slate-200'
            }`}>
            {active===l.id && (
              <motion.span layoutId="navpill"
                className="absolute inset-0 rounded-xl bg-indigo-500/10 border border-indigo-500/20" />
            )}
            <span className="relative z-10">{l.label}</span>
          </button>
        ))}

        <a href="/Yuvraj_Singh_Resume.pdf" download
          className="ml-4 px-4 py-2 rounded-xl font-mono text-[11px] border border-indigo-500/35 text-indigo-300 hover:bg-indigo-500/10 hover:border-indigo-400 transition-all data-hover">
          ↓ Resume
        </a>
      </div>
    </motion.header>
  );
}
