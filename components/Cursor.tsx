'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let x = 0, y = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { x = e.clientX; y = e.clientY; };
    window.addEventListener('mousemove', onMove);

    const addHover = () => ring.current?.classList.add('hovered');
    const rmHover  = () => ring.current?.classList.remove('hovered');
    document.querySelectorAll('a,button,[data-hover]').forEach(el => {
      el.addEventListener('mouseenter', addHover);
      el.addEventListener('mouseleave', rmHover);
    });

    let raf: number;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      rx += (x - rx) * 0.12; ry += (y - ry) * 0.12;
      if (dot.current)  { dot.current.style.left  = `${x}px`;  dot.current.style.top  = `${y}px`; }
      if (ring.current) { ring.current.style.left = `${rx}px`; ring.current.style.top = `${ry}px`; }
    };
    loop();
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
