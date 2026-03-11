import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';

const testimonialImages = [
  'IMG_0647.JPG',
  'IMG_0648.PNG',
  'IMG_0649.PNG',
  'IMG_0650.PNG',
  'IMG_0651.PNG',
  'IMG_0652.PNG',
  'photo_2026-01-21_18-55-20.jpg',
  'photo_2026-01-23_09-33-54.jpg',
].map((name) => `/media/testimonials/${encodeURI(name)}`);

function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  // Detect touch/mobile device once — skip RAF+drag on touch, let native scroll handle it
  const isTouchDevice = useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isPaused || isTouchDevice.current) return undefined;
    let frameId;
    let lastTimestamp = 0;

    const step = (timestamp) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const delta = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (!isDragging.current) {
        container.scrollLeft += delta * 0.04;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }

      frameId = requestAnimationFrame(step);
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [isPaused]);

  const handlePointerDown = (event) => {
    // On touch devices let the browser handle native momentum scroll
    if (isTouchDevice.current) return;
    const container = scrollRef.current;
    if (!container) return;
    isDragging.current = true;
    startX.current = event.pageX - container.offsetLeft;
    scrollLeft.current = container.scrollLeft;
    container.setPointerCapture?.(event.pointerId);
  };

  const handlePointerMove = (event) => {
    if (isTouchDevice.current || !isDragging.current) return;
    const container = scrollRef.current;
    if (!container) return;
    const x = event.pageX - container.offsetLeft;
    const walk = (x - startX.current) * 1.1;
    container.scrollLeft = scrollLeft.current - walk;
  };

  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <SectionWrapper
      id="testimonials"
      title="Отзывы учеников"
      subtitle="Скриншоты с реальными результатами и впечатлениями выпускников."
    >
      <div
        className="relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="no-scrollbar flex gap-6 overflow-x-auto px-1 pb-4 pt-2 md:snap-x md:snap-mandatory"
          style={{ touchAction: 'pan-x', WebkitOverflowScrolling: 'touch' }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerLeave={handlePointerUp}
        >
          {[...testimonialImages, ...testimonialImages].map((src, index) => (
            <motion.div
              key={`${src}-${index}`}
              whileHover={{ y: -6 }}
              className="relative flex h-[360px] min-w-[220px] md:snap-center items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] p-5 shadow-[0_18px_38px_rgba(123,23,35,0.22)] sm:h-[380px] sm:min-w-[240px] lg:h-[400px] lg:min-w-[260px] xl:h-[420px] xl:min-w-[280px]"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
              <div className="pointer-events-none absolute -bottom-10 right-8 h-20 w-20 rounded-full bg-genii-accent/20 blur-[40px]" />
              <div className="relative z-10 flex h-full w-full items-center justify-center overflow-hidden rounded-xl">
                <img
                  src={src}
                  alt="Отзыв ученика"
                  className="max-h-full w-full rounded-[16px] object-contain shadow-soft"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Testimonials;
