# Yuvraj Singh — 3D Portfolio v3.0
### Inspired by MoncyDev — React · TypeScript · Three.js · GSAP · Framer Motion

---

## 📁 What's Inside

```
yuvraj-portfolio/
├── app/
│   ├── globals.css      ← All styles (fonts, glass, cursor, animations)
│   ├── layout.tsx       ← Page title & SEO
│   └── page.tsx         ← Full portfolio (hero, exp, projects, skills, contact)
│
├── components/
│   ├── WebGLScene.tsx   ← Vanilla Three.js: stars, rings, icosahedra, scroll-camera
│   ├── ProfileCard.tsx  ← 3D tilt photo card with reactive light
│   ├── NavBar.tsx       ← Sticky floating nav
│   └── Cursor.tsx       ← Custom cursor (dot + ring)
│
├── data/
│   └── resume.json      ← ⭐ ALL YOUR CONTENT — edit this!
│
└── public/
    ├── profile.jpg                 ← Your photo (already included)
    └── Yuvraj_Singh_Resume.pdf     ← ⚠️ Replace with your real resume!
```

---

## 🚀 Run in 3 Commands

**1. Install Node.js** → https://nodejs.org → click the green LTS button

**2. Open terminal in this folder:**
- **Mac:** drag folder into Terminal
- **Windows:** open folder → click address bar → type `cmd` → Enter
- **VS Code:** File → Open Folder → Ctrl+` for terminal

**3. Run these commands:**
```bash
npm install     # downloads all packages (~2 min)
npm run dev     # starts the site
```

**4.** Open **http://localhost:3000** in Chrome 🎉

---

## ✏️ Customise Your Content

All text is in `data/resume.json`. Edit and save → browser updates instantly.

**Replace your resume PDF:**
Put your real PDF as `public/Yuvraj_Singh_Resume.pdf` (exact name!)

---

## ✨ Features

- 🌌 **Scroll-reactive 3D camera** — scene moves as you scroll
- 🖱️ **Custom cursor** — dot + ring with hover effects
- 💫 **Floating 3D rings + icosahedra** — WebGL with Three.js
- 🖼️ **Profile card** — 3D tilt + reactive light on hover
- ⌨️ **Typewriter effect** — animated role titles
- 🎞️ **GSAP-style scroll animations** — sections reveal on scroll
- 📱 **Fully responsive** — works on mobile (cursor hides, 3D simplifies)

---

## 🌐 Deploy Free on Vercel

```bash
git init && git add . && git commit -m "my portfolio"
# Push to GitHub, then import on vercel.com
```

---

## 🐛 Issues?

| Problem | Fix |
|---------|-----|
| `npm: command not found` | Install Node.js |
| `Cannot find module` | Run `npm install` again |
| Black screen | Try Chrome; press F12 for errors |
| Photo missing | File must be `public/profile.jpg` |
