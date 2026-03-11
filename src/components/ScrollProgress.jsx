import { useState, useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      rafRef.current = null;
    };

    const onScroll = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      style={{ width: `${progress}%`, transition: 'width 0.15s linear' }}
      className="fixed left-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-genii-accent via-[#c0202e] to-[#ff3a4a] shadow-[0_0_8px_rgba(123,23,35,0.8),0_0_16px_rgba(123,23,35,0.4)]"
    />
  );
}
