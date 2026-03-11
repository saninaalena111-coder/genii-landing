import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef(null);
  const rafRef = useRef(null);
  const pos = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    // Only desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(() => {
          if (glowRef.current) {
            glowRef.current.style.setProperty('--gx', `${pos.current.x}px`);
            glowRef.current.style.setProperty('--gy', `${pos.current.y}px`);
          }
          rafRef.current = null;
        });
      }
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[1]"
      style={{
        '--gx': '-1000px',
        '--gy': '-1000px',
        background:
          'radial-gradient(600px circle at var(--gx) var(--gy), rgba(123,23,35,0.13), transparent 60%)',
        transition: 'background 0.05s linear',
      }}
    />
  );
}
