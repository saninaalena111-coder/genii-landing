import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';

// ── Dynamic media scanning via Vite glob ────────────────────
const _studentVids = import.meta.glob(
  '/public/media/students/videos/*.{mp4,MP4,mov,MOV,webm,WEBM}',
  { eager: true, query: '?url', import: 'default' }
);

// One card per original file; -web/-mobile are source variants, not separate entries
const _allVidKeys = Object.keys(_studentVids).sort();
const _baseVidKeys = _allVidKeys.filter(k => !/-(?:web|mobile)\.[^.]+$/.test(k));
const _isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

const baseItems = _baseVidKeys.map(k => {
  const ext = k.match(/\.[^.]+$/)[0];
  const webKey = k.replace(ext, `-web${ext.toLowerCase()}`);
  const mobileKey = k.replace(ext, `-mobile${ext.toLowerCase()}`);
  const webSrc = _studentVids[webKey] || null;
  const mobileSrc = _studentVids[mobileKey] || null;
  const previewSrc = _isMobile ? (mobileSrc || webSrc || _studentVids[k]) : (webSrc || _studentVids[k]);
  const modalSrc = webSrc || _studentVids[k];
  return { type: 'video', src: _studentVids[k], previewSrc, modalSrc };
});

const BASE_COUNT = baseItems.length;
const allItems = [...baseItems, ...baseItems, ...baseItems];
const GAP = 22;
const CARD_W = typeof window !== 'undefined' && window.innerWidth < 640 ? 168 : 248;

// ── Expanded player (same as ExpertCarousel) ─────────────────
function ExpandedPlayer({ item, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-6 sm:p-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.20 }}
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/92 backdrop-blur-[6px]" />
        <motion.div
          className="relative z-10 w-full max-w-[90vw] sm:max-w-[44vw] lg:max-w-[400px]"
          initial={{ scale: 0.65, opacity: 0, y: 16 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.65, opacity: 0, y: 16 }}
          transition={{ duration: 0.40, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="overflow-hidden rounded-[22px] border border-white/14"
            style={{ boxShadow: '0 0 100px rgba(123,23,35,0.38), 0 48px 80px rgba(0,0,0,0.76)' }}
          >
            <video
              key={item.src}
              src={item.modalSrc || item.src}
              controls
              playsInline
              preload="auto"
              className="aspect-[9/16] w-full bg-black object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/22 bg-black/80 text-white backdrop-blur-sm transition-colors hover:bg-white/18"
            aria-label="Закрыть"
          >
            <X className="h-4 w-4" />
          </button>
          <p className="mt-3 text-center text-[11px] text-white/38">
            Нажмите ▶ чтобы смотреть со звуком
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main carousel ─────────────────────────────────────────────
export default function StudentCarousel() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const startX = useRef(0);
  const savedScrollLeft = useRef(0);
  const autoScrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(BASE_COUNT);
  const [modalItem, setModalItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const slotWidth = CARD_W + GAP;

  const getPadLeft = useCallback(() => window.innerWidth * 0.1, []);

  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pl = getPadLeft();
    const viewCenter = el.scrollLeft + el.clientWidth / 2;
    const idx = Math.round((viewCenter - pl - CARD_W / 2) / slotWidth);
    const norm = ((idx % allItems.length) + allItems.length) % allItems.length;
    setActiveIndex(norm);
  }, [slotWidth, getPadLeft]);

  const scrollToCard = useCallback((idx) => {
    const el = scrollRef.current;
    if (!el) return;
    const pl = getPadLeft();
    el.scrollLeft = pl + idx * slotWidth + CARD_W / 2 - el.clientWidth / 2;
  }, [slotWidth, getPadLeft]);

  // Auto-scroll loop — identical to ExpertCarousel
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let lastTs = 0;

    const step = (ts) => {
      if (!lastTs) lastTs = ts;
      const delta = ts - lastTs;
      lastTs = ts;

      if (!isDragging.current) {
        el.scrollLeft += delta * 0.022;
        if (el.scrollLeft >= el.scrollWidth * 0.66) {
          el.scrollLeft -= BASE_COUNT * slotWidth;
        }
        updateActiveIndex();
      }

      autoScrollRef.current = requestAnimationFrame(step);
    };

    autoScrollRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(autoScrollRef.current);
  }, [updateActiveIndex]); // same deps as ExpertCarousel

  // Initial position: centre on BASE_COUNT card (first in 2nd copy)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      scrollToCard(BASE_COUNT);
      updateActiveIndex();
    });
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line

  // Lazy-load: render videos only when section enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { root: null, rootMargin: '300px 0px', threshold: 0.05 }
    );
    if (scrollRef.current) observer.observe(scrollRef.current);
    return () => observer.disconnect();
  }, []);

  const onPointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - el.offsetLeft;
    savedScrollLeft.current = el.scrollLeft;
    // NOTE: do NOT call setPointerCapture
  };

  const onPointerMove = (e) => {
    if (!isDragging.current) return;
    const el = scrollRef.current;
    if (!el) return;
    const walk = (e.pageX - el.offsetLeft - startX.current) * 1.25;
    if (Math.abs(walk) > 12) dragMoved.current = true;
    el.scrollLeft = savedScrollLeft.current - walk;
    updateActiveIndex();
  };

  const onPointerUp = () => { isDragging.current = false; };

  const handleCardPointerUp = (e, item) => {
    e.stopPropagation();
    if (!dragMoved.current && item.type === 'video') {
      setModalItem(item);
    }
    isDragging.current = false;
  };

  return (
    <>
      <SectionWrapper
        id="student-works"
        label="Результаты обучения"
        title="Работы учеников"
        subtitle="AI-видео, созданные студентами курса — с первых недель."
      >
        <div className="relative -mx-5 sm:-mx-8">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-genii-bg to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-genii-bg to-transparent sm:w-32" />

          <div
            ref={scrollRef}
            className="no-scrollbar flex cursor-grab select-none overflow-x-scroll active:cursor-grabbing"
            style={{
              gap: `${GAP}px`,
              paddingLeft: '10vw',
              paddingRight: '10vw',
              paddingTop: '28px',
              paddingBottom: '64px',
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerLeave={onPointerUp}
          >
            {allItems.map((item, index) => {
              const rawDist = Math.abs(index - activeIndex);
              const dist = Math.min(rawDist, allItems.length - rawDist);
              const isCenter = dist === 0;

              const scale      = dist === 0 ? 1    : dist === 1 ? 0.84 : dist === 2 ? 0.71 : 0.62;
              const opacity    = dist === 0 ? 1    : dist === 1 ? 0.72 : dist === 2 ? 0.50 : 0.30;
              const translateY = dist === 0 ? 0    : dist === 1 ? 20   : dist === 2 ? 32   : 40;
              const blur       = dist <= 1  ? 0    : dist === 2 ? 1.5  : 3;
              const zIdx       = 10 - Math.min(dist, 4) * 2;

              const shadow = isCenter
                ? '0 0 70px rgba(123,23,35,0.70), 0 0 28px rgba(123,23,35,0.40), 0 28px 56px rgba(0,0,0,0.60)'
                : '0 10px 22px rgba(0,0,0,0.28)';

              const borderColor = isCenter ? 'rgba(155,40,55,0.80)' : 'rgba(255,255,255,0.07)';

              // Only autoPlay center ± 1 cards; preload metadata for ± 2; none beyond that
              const shouldPlay    = dist <= 1;
              const shouldPreload = dist <= 2;

              return (
                <div
                  key={`student-${index}`}
                  onPointerUp={(e) => handleCardPointerUp(e, item)}
                  className="relative flex-shrink-0 cursor-pointer overflow-hidden rounded-[20px]"
                  style={{
                    width: `${CARD_W}px`,
                    transform: `translateY(${translateY}px) scale(${scale})`,
                    transformOrigin: 'top center',
                    opacity,
                    filter: blur > 0 ? `blur(${blur}px)` : 'none',
                    boxShadow: shadow,
                    border: `1.5px solid ${borderColor}`,
                    zIndex: zIdx,
                    transition: [
                      'transform 500ms cubic-bezier(0.16,1,0.3,1)',
                      'opacity 500ms cubic-bezier(0.16,1,0.3,1)',
                      'box-shadow 500ms cubic-bezier(0.16,1,0.3,1)',
                      'filter 500ms cubic-bezier(0.16,1,0.3,1)',
                      'border-color 500ms cubic-bezier(0.16,1,0.3,1)',
                    ].join(', '),
                    willChange: 'transform, opacity',
                  }}
                >
                  <div className="aspect-[9/16] w-full bg-genii-bg-deep">
                    {isVisible ? (
                      <video
                        src={item.previewSrc || item.src}
                        muted
                        loop
                        playsInline
                        autoPlay={shouldPlay}
                        preload={shouldPreload ? 'metadata' : 'none'}
                        className="h-full w-full object-cover"
                        draggable={false}
                        style={{ pointerEvents: 'none' }}
                        onLoadedMetadata={(e) => {
                          if (!shouldPlay && shouldPreload) e.currentTarget.currentTime = 0.001;
                        }}
                      />
                    ) : (
                      <div className="h-full w-full" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px' }} />
                    )}
                    {/* Bottom gradient */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background: isCenter
                          ? 'linear-gradient(to top, rgba(95,10,22,0.78) 0%, rgba(95,10,22,0.18) 40%, transparent 68%)'
                          : 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 55%)',
                      }}
                    />
                    {/* Badge */}
                    <div className="absolute left-3 top-3">
                      <span className="flex items-center gap-1.5 rounded-full border border-white/18 bg-black/55 px-2.5 py-[5px] text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-genii-accent" />
                        работа
                      </span>
                    </div>
                    {/* Centre: watch CTA | Others: play icon */}
                    {isCenter ? (
                      <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                        <span className="flex items-center gap-1.5 rounded-full border border-white/22 bg-white/10 px-4 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                          <Play className="h-3 w-3 fill-white" />
                          смотреть
                        </span>
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/14">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/44 backdrop-blur-sm">
                          <Play className="h-4 w-4 fill-white text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <p className="mt-1 text-center text-[11px] text-white/28">
          Нажмите на видео, чтобы смотреть со звуком
        </p>
      </SectionWrapper>

      {modalItem && <ExpandedPlayer item={modalItem} onClose={() => setModalItem(null)} />}
    </>
  );
}