import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';

const testimonialImages = [
  'IMG_0647.jpg',
  'IMG_0648.jpg',
  'IMG_0649.jpg',
  'IMG_0650.jpg',
  'IMG_0651.jpg',
  'IMG_0652.jpg',
  'photo_2026-01-21_18-55-20.jpg',
  'photo_2026-01-23_09-33-54.jpg',
].map((name) => `/media/testimonials/optimized/${name}`);

function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);
  const [lightbox, setLightbox] = useState(null); // src of the enlarged screenshot, or null
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const downPos = useRef({ x: 0, y: 0 });
  const movedRef = useRef(false); // distinguishes a tap from a swipe/drag
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

  // Lock scroll + close on Escape while the enlarged screenshot is open
  useEffect(() => {
    if (!lightbox) return undefined;
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [lightbox]);

  const handlePointerDown = (event) => {
    downPos.current = { x: event.clientX, y: event.clientY };
    movedRef.current = false;
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
    if (
      Math.abs(event.clientX - downPos.current.x) > 8 ||
      Math.abs(event.clientY - downPos.current.y) > 8
    ) {
      movedRef.current = true;
    }
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

  // Open the enlarged view only on a real tap, not at the end of a swipe/drag
  const openLightbox = (src) => {
    if (movedRef.current) return;
    setLightbox(src);
  };

  return (
    <SectionWrapper
      id="testimonials"
      title="Отзывы учеников"
      subtitle="Скриншоты с реальными результатами. Нажмите на любой, чтобы открыть крупнее."
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
              onClick={() => openLightbox(src)}
              className="relative flex h-[440px] min-w-[78vw] max-w-[320px] cursor-pointer items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04] p-4 shadow-[0_18px_38px_rgba(123,23,35,0.22)] md:snap-center sm:h-[400px] sm:min-w-[280px] sm:max-w-none lg:h-[420px] lg:min-w-[300px] xl:h-[440px] xl:min-w-[320px]"
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

      {lightbox && createPortal(
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Закрыть"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm transition-colors hover:bg-white/15"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt="Отзыв ученика"
            className="max-h-[90vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </SectionWrapper>
  );
}

export default Testimonials;
