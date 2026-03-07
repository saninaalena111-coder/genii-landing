import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';

const viralImages = [
  'photo_2026-03-08 00.20.39.jpeg',
  'photo_2026-03-08 00.20.42.jpeg',
  'photo_2026-03-08 00.20.45.jpeg',
  'photo_2026-03-08 00.20.48.jpeg',
  'photo_2026-03-08 00.20.52.jpeg',
  'photo_2026-03-08 00.20.56.jpeg',
  'photo_2026-03-08 00.20.59.jpeg',
];

const viralSources = viralImages.map((name) => `/media/viral/${encodeURI(name)}`);

function ViralCarousel() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const rafRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const extendedSources = [...viralSources, ...viralSources, ...viralSources];

  const updateActiveIndex = () => {
    const container = scrollRef.current;
    if (!container) return;
    const { scrollLeft: left, clientWidth } = container;
    const center = left + clientWidth / 2;
    const itemWidth = clientWidth < 640 ? 220 : 240;
    const gap = clientWidth < 640 ? 20 : 24;
    const fullWidth = itemWidth + gap;
    const index = Math.round(center / fullWidth) % extendedSources.length;
    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let frameId;
    let lastTimestamp = 0;

    const step = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isDragging.current) {
        container.scrollLeft += delta * 0.035;
        if (container.scrollLeft >= container.scrollWidth * 0.66) {
          container.scrollLeft = container.scrollWidth * 0.33;
        }
      }

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(updateActiveIndex);

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, []);

  const handlePointerDown = (event) => {
    const container = scrollRef.current;
    if (!container) return;
    isDragging.current = true;
    startX.current = event.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    container.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (!isDragging.current) return;
    const container = scrollRef.current;
    if (!container) return;
    const x = event.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.1;
    container.scrollLeft = scrollLeft.current - walk;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollLeft = container.scrollWidth * 0.33;
    updateActiveIndex();
  }, []);

  return (
    <SectionWrapper
      id="viral"
      label="Viral content"
      title="Работы, которые набирают миллионы просмотров"
      subtitle="Примеры вертикальных видео и вирусных роликов из практики студентов."
    >
      <div className="relative">
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-6 overflow-x-auto scroll-smooth px-2 pb-6 pt-4"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {extendedSources.map((src, index) => {
            const distance = Math.abs(index - activeIndex);
            const scale = distance === 0 ? 1 : distance === 1 ? 0.9 : distance === 2 ? 0.8 : 0.72;
            const opacity = distance === 0 ? 1 : distance === 1 ? 0.82 : distance === 2 ? 0.7 : 0.55;
            const translateY = distance === 0 ? 0 : distance === 1 ? 16 : 26;
            const glow = distance === 0 ? '0 24px 50px rgba(123,23,35,0.35)' : '0 18px 34px rgba(123,23,35,0.22)';
            const border = distance === 0 ? 'rgba(255,255,255,0.32)' : 'rgba(255,255,255,0.18)';
            return (
            <motion.div
              key={`${src}-${index}`}
              whileHover={{ scale: scale + 0.04 }}
              className="group relative min-w-[220px] overflow-hidden rounded-3xl bg-white/[0.04] sm:min-w-[240px]"
              style={{
                transform: `translateY(${translateY}px) scale(${scale})`,
                opacity,
                boxShadow: glow,
                border: `1px solid ${border}`,
                transition: 'transform 420ms ease, opacity 420ms ease, box-shadow 420ms ease, border-color 420ms ease',
                willChange: 'transform, opacity',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/12 via-transparent to-genii-accent/25 opacity-70" />
              <img
                src={src}
                alt="Вирусное видео"
                className="relative h-full w-full object-contain aspect-[9/16]"
                loading="lazy"
              />
            </motion.div>
          );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default ViralCarousel;
