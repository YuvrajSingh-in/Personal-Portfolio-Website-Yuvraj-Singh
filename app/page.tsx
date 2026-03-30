'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import dynamic from 'next/dynamic';
import {
  Github, Linkedin, Mail, Download, ArrowRight,
  ChevronRight, MapPin, Shield, Cpu, GraduationCap,
  Code2, Briefcase, ExternalLink, Award
} from 'lucide-react';
import data from '@/data/resume.json';

const WebGLScene  = dynamic(() => import('@/components/WebGLScene'),  { ssr: false });
const ProfileCard = dynamic(() => import('@/components/ProfileCard'), { ssr: false });
const NavBar      = dynamic(() => import('@/components/NavBar'),      { ssr: false });
const Cursor      = dynamic(() => import('@/components/Cursor'),      { ssr: false });

/* ── Framer variants ── */
const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  show: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  }),
};
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

/* ── Section wrapper ── */
function Section({ id, children, className = '' }: { id?: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-15%' });
  return (
    <motion.section
      id={id}
      ref={ref}
      variants={stagger}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      className={`py-28 ${className}`}
    >
      {children}
    </motion.section>
  );
}

/* ── Typed text ── */
function TypedRoles() {
  const roles = data.roles;
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = roles[idx];
    const delay = deleting ? 40 : 80;
    const t = setTimeout(() => {
      if (!deleting) {
        if (text.length < full.length) setText(full.slice(0, text.length + 1));
        else setTimeout(() => setDeleting(true), 1500);
      } else {
        if (text.length > 0) setText(text.slice(0, -1));
        else { setDeleting(false); setIdx((idx + 1) % roles.length); }
      }
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, idx, roles]);

  return (
    <span className="grad-pink font-mono text-base md:text-lg">
      {text}<span className="animate-pulse text-indigo-400">_</span>
    </span>
  );
}

export default function Portfolio() {
  const [loading,  setLoading]  = useState(true);
  const [mounted,  setMounted]  = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 22 + 8;
      setProgress(Math.min(p, 97));
      if (p >= 97) clearInterval(iv);
    }, 80);
    const t = setTimeout(() => setLoading(false), 2200);
    return () => { clearTimeout(t); clearInterval(iv); };
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* 3D WebGL background */}
      <WebGLScene />
      <Cursor />

      {/* Grid + ambient overlays */}
      <div className="fixed inset-0 grid-bg pointer-events-none" style={{ zIndex: 0, opacity: 0.8 }} />
      <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {[
          { x: '10%',  y: '-15%', color: 'rgba(99,102,241,0.09)',  size: 700 },
          { x: '80%',  y: '50%',  color: 'rgba(168,85,247,0.07)',  size: 600 },
          { x: '45%',  y: '90%',  color: 'rgba(34,211,238,0.05)',  size: 500 },
        ].map((b, i) => (
          <div key={i} className="absolute rounded-full"
            style={{ left: b.x, top: b.y, width: b.size, height: b.size, transform: 'translate(-50%,-50%)',
              background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`, filter: 'blur(50px)' }} />
        ))}
      </div>

      {/* ══════════════════════════════════════
          LOADING SCREEN
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {loading && (
          <motion.div key="loader"
            exit={{ opacity: 0, filter: 'blur(20px)', scale: 1.06 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
            style={{ background: '#03030d' }}
          >
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }} className="flex flex-col items-center gap-10">

              {/* Logo */}
              <div className="relative">
                <div className="font-display text-8xl font-extrabold tracking-tighter leading-none">
                  <span className="text-white">Y</span><span className="grad">S</span>
                </div>
                <div className="absolute -inset-4 rounded-full blur-3xl"
                  style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.2), transparent)' }} />
              </div>

              <div className="font-mono text-xs text-slate-700 tracking-[0.4em] uppercase">
                AI Engineer · Cyber Specialist
              </div>

              {/* Progress bar */}
              <div className="flex flex-col items-center gap-3 w-56">
                <div className="w-full h-px bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.12 }}
                    className="h-full loading-bar rounded-full"
                  />
                </div>
                <div className="font-mono text-[10px] text-slate-800">{Math.round(progress)}%</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════════════════════════════════════
          CONTENT
      ══════════════════════════════════════ */}
      <AnimatePresence>
        {!loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
            <NavBar />
            <main className="relative z-10 max-w-6xl mx-auto px-5 md:px-10">

              {/* ────────────────────────────────────
                  HERO
              ──────────────────────────────────── */}
              <section id="about" className="min-h-screen flex items-center pt-28 pb-20">
                <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_360px] gap-16 items-center">

                  {/* Text */}
                  <div className="flex flex-col gap-7">
                    {/* Badge */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="w-fit">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/20 font-mono text-[11px] text-indigo-300 tracking-wider">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 pulse-dot" />
                        MSc Artificial Intelligence · National College of Ireland
                      </div>
                    </motion.div>

                    {/* Name */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
                      <h1 className="font-display text-[clamp(3rem,8vw,6rem)] font-extrabold leading-[0.9] tracking-tight">
                        <span className="block text-white">Yuvraj</span>
                        <span className="block grad">Singh</span>
                      </h1>
                    </motion.div>

                    {/* Typed role */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}
                      className="flex items-center gap-2 font-mono text-sm text-slate-500">
                      <span className="text-indigo-400">&gt;</span>
                      <TypedRoles />
                    </motion.div>

                    {/* Summary */}
                    <motion.p variants={fadeUp} initial="hidden" animate="show" custom={3}
                      className="text-slate-400 leading-relaxed text-base md:text-[17px] max-w-xl">
                      {data.basics.summary}
                    </motion.p>

                    {/* Quick skills */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4}
                      className="flex flex-wrap gap-2">
                      {['Python', 'Machine Learning', 'NLP', 'SIEM (Splunk/ELK)', 'CyberArk PAM', 'SOC'].map(s => (
                        <span key={s} className="tag">{s}</span>
                      ))}
                    </motion.div>

                    {/* CTAs */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={5}
                      className="flex flex-wrap gap-3">
                      <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior:'smooth' })}
                        className="group flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-white grad-btn btn-glow transition-all data-hover">
                        View Projects
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <a href="/Yuvraj_Singh_Resume.pdf" download
                        className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-300 glass glass-hover hover:text-white transition-all data-hover">
                        <Download size={14} /> Resume PDF
                      </a>
                    </motion.div>

                    {/* Socials */}
                    <motion.div variants={fadeUp} initial="hidden" animate="show" custom={6}
                      className="flex items-center gap-2">
                      {[
                        { icon: <Linkedin size={16}/>, href: data.basics.linkedin, label:'LinkedIn' },
                        { icon: <Github   size={16}/>, href: data.basics.github,   label:'GitHub' },
                        { icon: <Mail     size={16}/>, href: `mailto:${data.basics.email}`, label:'Email' },
                      ].map(s => (
                        <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                          className="p-2.5 glass glass-hover rounded-lg text-slate-400 hover:text-indigo-300 transition-all data-hover">
                          {s.icon}
                        </a>
                      ))}
                      <div className="flex items-center gap-1.5 ml-3 text-slate-600 font-mono text-xs">
                        <MapPin size={10} className="text-indigo-600" /> {data.basics.location}
                      </div>
                    </motion.div>
                  </div>

                  {/* Profile card — desktop */}
                  <motion.div initial={{ opacity:0, x:50 }} animate={{ opacity:1, x:0 }}
                    transition={{ delay:0.4, duration:0.9, ease:[0.16,1,0.3,1] }}
                    className="hidden lg:flex justify-end items-start pt-4">
                    <div className="float">
                      <ProfileCard />
                    </div>
                  </motion.div>

                  {/* Profile card — mobile */}
                  <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }}
                    transition={{ delay:0.5, duration:0.7 }}
                    className="lg:hidden flex justify-center">
                    <ProfileCard />
                  </motion.div>
                </div>

                {/* Scroll hint */}
                <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2 }}
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                  <div className="font-mono text-[9px] text-slate-700 tracking-widest uppercase">scroll</div>
                  <motion.div animate={{ y:[0,8,0] }} transition={{ duration:2, repeat:Infinity }}
                    className="w-px h-8 bg-gradient-to-b from-indigo-500/50 to-transparent" />
                </motion.div>
              </section>

              {/* ────────────────────────────────────
                  EXPERIENCE
              ──────────────────────────────────── */}
              <Section id="experience">
                <motion.div variants={fadeUp} className="flex flex-col gap-3 mb-14">
                  <div className="label"><Briefcase size={12} /> Work Experience</div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Where I've Worked</h2>
                </motion.div>

                <div className="relative flex flex-col">
                  {/* Timeline line */}
                  <div className="absolute left-[19px] top-4 bottom-0 w-px"
                    style={{ background: 'linear-gradient(180deg, #6366f1 0%, rgba(99,102,241,0.2) 100%)' }} />

                  {data.experience.map((exp, idx) => (
                    <motion.div key={idx} variants={fadeUp} custom={idx}
                      className="relative pl-14 pb-12 last:pb-0 group">
                      {/* Dot */}
                      <div className="absolute left-[11px] top-1.5 w-[18px] h-[18px] rounded-full border-2 border-indigo-500 bg-[#03030d] group-hover:bg-indigo-500 transition-all duration-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 group-hover:bg-white transition-colors" />
                      </div>

                      <div className="glass glass-hover bracket glow rounded-2xl p-7 transition-all duration-300">
                        <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                          <div>
                            <div className="flex items-center gap-2.5 mb-1.5">
                              <h3 className="font-display font-bold text-white text-xl">{exp.role}</h3>
                              <span className="font-mono text-[9px] px-2 py-0.5 rounded border border-indigo-500/25 text-indigo-400 bg-indigo-500/8 tracking-wider">
                                {exp.type}
                              </span>
                            </div>
                            <div className="text-indigo-400 font-medium">{exp.company}</div>
                            <div className="text-slate-600 font-mono text-xs mt-1">{exp.location}</div>
                          </div>
                          <div className="font-mono text-xs text-slate-500 glass px-3.5 py-1.5 rounded-full border border-white/6 whitespace-nowrap">
                            {exp.dates} · {exp.duration}
                          </div>
                        </div>

                        <ul className="flex flex-col gap-3 mb-5">
                          {exp.bullets.map((b, bi) => (
                            <li key={bi} className="flex items-start gap-3 text-slate-400 text-sm leading-relaxed">
                              <ChevronRight size={12} className="text-indigo-500 shrink-0 mt-1" />
                              {b}
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5">
                          {exp.skills.map(s => <span key={s} className="tag">{s}</span>)}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Section>

              {/* ────────────────────────────────────
                  PROJECTS
              ──────────────────────────────────── */}
              <Section id="projects">
                <motion.div variants={fadeUp} className="flex flex-col gap-3 mb-14">
                  <div className="label"><Cpu size={12} /> Selected Work</div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Projects & Builds</h2>
                </motion.div>

                {/* Featured projects */}
                <div className="flex flex-col gap-5 mb-5">
                  {data.projects.filter(p => p.highlight).map((proj, idx) => (
                    <motion.div key={idx} variants={fadeUp} custom={idx}
                      className="glass glass-hover bracket glow rounded-2xl p-8 transition-all duration-300 relative overflow-hidden group">
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
                      <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 blur-3xl"
                        style={{ background: 'radial-gradient(circle, #6366f1, transparent)' }} />

                      <div className="flex flex-wrap items-start justify-between gap-6">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="font-mono text-[9px] text-indigo-500/70 tracking-widest">{proj.dates}</span>
                            <span className="w-1 h-1 rounded-full bg-indigo-500/40" />
                            <span className="font-mono text-[9px] text-emerald-500 tracking-wider">FEATURED</span>
                          </div>
                          <h3 className="font-display font-bold text-white text-2xl mb-1">{proj.title}</h3>
                          <div className="text-indigo-400 text-sm mb-4">{proj.subtitle}</div>
                          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">{proj.desc}</p>
                        </div>
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noreferrer"
                            className="flex items-center gap-2 px-4 py-2.5 glass glass-hover rounded-xl font-mono text-xs text-slate-400 hover:text-indigo-300 transition-all border border-white/8 shrink-0 data-hover">
                            <Github size={13} /> View on GitHub
                          </a>
                        )}
                      </div>

                      <div className="flex flex-wrap gap-1.5 mt-6">
                        {proj.stack.map(s => <span key={s} className="tag">{s}</span>)}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Grid projects */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.projects.filter(p => !p.highlight).map((proj, idx) => (
                    <motion.div key={idx} variants={fadeUp} custom={idx + 2}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      className="glass glass-hover bracket glow rounded-2xl p-6 flex flex-col h-full transition-all duration-300 relative overflow-hidden">
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-[9px] text-indigo-500/60 tracking-widest">{proj.dates}</span>
                        {proj.github && (
                          <a href={proj.github} target="_blank" rel="noreferrer"
                            className="text-slate-700 hover:text-indigo-400 transition-colors data-hover">
                            <ExternalLink size={12} />
                          </a>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-white text-sm leading-snug mb-1">{proj.title}</h3>
                      <div className="text-indigo-400 text-xs mb-3">{proj.subtitle}</div>
                      <p className="text-slate-500 text-xs leading-relaxed flex-grow mb-4 clamp-3">{proj.desc}</p>
                      <div className="flex flex-wrap gap-1 mt-auto">
                        {proj.stack.map(s => <span key={s} className="tag">{s}</span>)}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Section>

              {/* ────────────────────────────────────
                  SKILLS + EDUCATION + CERTS
              ──────────────────────────────────── */}
              <Section id="skills">
                <motion.div variants={fadeUp} className="flex flex-col gap-3 mb-14">
                  <div className="label"><Code2 size={12} /> Capabilities</div>
                  <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Skills & Education</h2>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Skills cloud */}
                  <motion.div variants={fadeUp} className="glass bracket glow rounded-2xl p-8">
                    <h3 className="font-display font-bold text-white text-lg mb-6 flex items-center gap-2.5">
                      <span className="font-mono text-xs text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded">01</span>
                      Technical Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {data.skills.map((skill, i) => (
                        <motion.span key={skill}
                          initial={{ opacity:0, scale:0.75 }}
                          whileInView={{ opacity:1, scale:1 }}
                          viewport={{ once:true }}
                          transition={{ delay: i * 0.03 }}
                          whileHover={{ scale:1.08 }}
                          className="tag cursor-default data-hover">
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>

                  <div className="flex flex-col gap-5">
                    {/* Education */}
                    <motion.div variants={fadeUp} custom={1} className="glass bracket glow rounded-2xl p-8">
                      <h3 className="font-display font-bold text-white text-lg mb-6 flex items-center gap-2.5">
                        <span className="font-mono text-xs text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded">02</span>
                        Education
                      </h3>
                      <div className="flex flex-col gap-6">
                        {data.education.map((edu, i) => (
                          <div key={i} className="flex items-start gap-4">
                            <div className="w-11 h-11 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                              <GraduationCap size={18} className="text-indigo-400" />
                            </div>
                            <div>
                              <div className="font-semibold text-white text-sm leading-snug">{edu.degree}</div>
                              <div className="text-indigo-400 text-xs mt-1">{edu.school}</div>
                              <div className="flex items-center gap-2 mt-1.5">
                                <span className="font-mono text-xs text-slate-600">{edu.dates}</span>
                                {edu.grade && (
                                  <span className="font-mono text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                                    {edu.grade}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Certifications */}
                    <motion.div variants={fadeUp} custom={2} className="glass bracket glow rounded-2xl p-8">
                      <h3 className="font-display font-bold text-white text-lg mb-6 flex items-center gap-2.5">
                        <span className="font-mono text-xs text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded">03</span>
                        Certifications
                      </h3>
                      <div className="flex flex-col gap-4">
                        {data.certs.map((cert, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0 mt-0.5">
                              <Award size={12} className="text-violet-400" />
                            </div>
                            <div>
                              <div className="text-slate-200 text-sm font-medium">{cert.name}</div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-slate-500 text-xs">{cert.issuer}</span>
                                <span className="text-slate-700 text-xs">·</span>
                                <span className="font-mono text-[10px] text-slate-600">{cert.date}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Section>

              {/* ────────────────────────────────────
                  CONTACT
              ──────────────────────────────────── */}
              <Section id="contact">
                <motion.div variants={fadeUp}
                  className="relative glass bracket glow rounded-3xl p-12 md:p-20 text-center overflow-hidden"
                  style={{ borderColor:'rgba(99,102,241,0.15)' }}>

                  {/* BG effects */}
                  <div className="absolute inset-0 pointer-events-none"
                    style={{ background:'radial-gradient(ellipse at 50% -10%, rgba(99,102,241,0.16) 0%, transparent 65%)' }} />
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent" />
                  <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

                  <div className="relative">
                    <div className="label justify-center mb-6"><Mail size={12} /> Get In Touch</div>
                    <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-5 leading-tight">
                      Open to <span className="grad">AI & Cyber</span><br />Opportunities
                    </h2>
                    <p className="text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed text-lg">
                      Seeking roles in <strong className="text-slate-200">AI Engineering</strong>,{' '}
                      <strong className="text-slate-200">Machine Learning</strong>, and{' '}
                      <strong className="text-slate-200">AI for Cybersecurity</strong>.
                      If you're building impactful systems, let's connect.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                      <a href={`mailto:${data.basics.email}`}
                        className="group flex items-center gap-2 px-9 py-4 rounded-xl font-semibold text-white grad-btn btn-glow transition-all data-hover">
                        <Mail size={16} /> Send Email
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a href={data.basics.linkedin} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-9 py-4 rounded-xl font-semibold text-slate-300 glass glass-hover hover:text-white transition-all data-hover">
                        <Linkedin size={16} /> LinkedIn
                      </a>
                      <a href={data.basics.github} target="_blank" rel="noreferrer"
                        className="flex items-center gap-2 px-9 py-4 rounded-xl font-semibold text-slate-300 glass glass-hover hover:text-white transition-all data-hover">
                        <Github size={16} /> GitHub
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Section>

              {/* Footer */}
              <footer className="py-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="font-display font-bold text-sm text-slate-600">
                  © 2025 <span className="text-slate-400">Yuvraj Singh</span>
                </div>
                <div className="font-mono text-xs text-slate-700 flex items-center gap-1.5">
                  <MapPin size={9} className="text-indigo-700" /> {data.basics.location}
                </div>
                <div className="font-mono text-xs text-slate-700">
                  Next.js · Three.js · Framer Motion · GSAP
                </div>
              </footer>

            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
