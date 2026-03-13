import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Play, X } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';

// ── Dynamic media scanning via Vite glob ────────────────────
const _expertImgs = import.meta.glob(
  '/public/media/experts/imeges/*.{jpeg,jpg,JPEG,JPG,png,PNG,webp,WEBP}',
  { eager: true, query: '?url', import: 'default' }
);
const _expertVids = import.meta.glob(
  '/public/media/experts/videos/*.{mp4,MP4,mov,MOV,webm,WEBM}',
  { eager: true, query: '?url', import: 'default' }
);
const _expertPosters = import.meta.glob(
  '/public/media/experts/videos/*.{jpg,jpeg,JPG,JPEG}',
  { eager: true, query: '?url', import: 'default' }
);

// Only -web.mp4 files are base items; -mobile.mp4 is the mobile source variant
const _allExpertVidKeys = Object.keys(_expertVids).sort();
const _webExpertVidKeys = _allExpertVidKeys.filter(k => /-web\.mp4$/.test(k));

const _imgs = Object.keys(_expertImgs).sort().map(k => ({ type: 'image', src: _expertImgs[k] }));
const _vids = _webExpertVidKeys.map(k => {
  const mobileKey = k.replace(/-web\.mp4$/, '-mobile.mp4');
  const mobileSrc = _expertVids[mobileKey] || null;
  const webSrc = _expertVids[k];
  const posterKey = k.replace(/-web\.mp4$/, '.jpg');
  const posterSrc = _expertPosters[posterKey] || null;
  return { type: 'video', webSrc, mobileSrc, src: webSrc, posterSrc };
});

// Interleave images and videos so they alternate more naturally
function interleave(images, videos) {
  if (!videos.length) return images;
  const result = [];
  const step = Math.ceil(images.length / (videos.length + 1));
  let vi = 0, ii = 0, pos = step;
  while (ii < images.length || vi < videos.length) {
    if (vi < videos.length && result.length >= pos) {
      result.push(videos[vi++]);
      pos += step;
    } else if (ii < images.length) {
      result.push(images[ii++]);
    } else {
      result.push(videos[vi++]);
    }
  }
  return result;
}

const baseItems = interleave(_imgs, _vids);

const BASE_COUNT = baseItems.length;
const allItems = [...baseItems, ...baseItems, ...baseItems];

// Card width → height ≈ 441px (9:16) on desktop, ≈299px on mobile
const CARD_W = typeof window !== 'undefined' && window.innerWidth < 640 ? 168 : 248;
const GAP = 22;

// ── Expanded video / image player ────────────────────────────
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
        {/* Cinematic dim backdrop */}
        <div className="absolute inset-0 bg-black/92 backdrop-blur-[6px]" />

        {/* Player card — scales up from below center */}
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
            {/*
             * Dedicated video player — completely separate from the muted preview.
             * No muted, no autoPlay. User presses ▶ on native controls → sound works.
             * key={item.src} guarantees a fresh <video> element each time.
             */}
            <video
              key={item.webSrc || item.src}
              controls
              playsInline
              preload="auto"
              className="aspect-[9/16] w-full bg-black object-contain"
            >
              <source src={item.webSrc || item.src} type="video/mp4" />
            </video>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/22 bg-black/80 text-white backdrop-blur-sm transition-colors hover:bg-white/18"
            aria-label="Закрыть"
          >
            <X className="h-4.5 w-4.5" />
          </button>

          {item.type === 'video' && (
            <p className="mt-3 text-center text-[11px] text-white/38">
              Нажмите ▶ чтобы смотреть со звуком
            </p>
          )}        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Main carousel ─────────────────────────────────────────────
function ExpertCarousel() {
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const dragMoved = useRef(false);
  const startX = useRef(0);
  const savedScrollLeft = useRef(0);
  const autoScrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(BASE_COUNT);
  const [modalItem, setModalItem] = useState(null);

  const slotWidth = CARD_W + GAP;

  // paddingLeft on scroll container is '10vw' = window.innerWidth * 0.1
  const getPadLeft = useCallback(() => window.innerWidth * 0.1, []);

  // Compute which card is centred in the viewport
  const updateActiveIndex = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const pl = getPadLeft();
    const viewCenter = el.scrollLeft + el.clientWidth / 2;
    // Card i centre = pl + i * slotWidth + CARD_W / 2
    const idx = Math.round((viewCenter - pl - CARD_W / 2) / slotWidth);
    const norm = ((idx % allItems.length) + allItems.length) % allItems.length;
    setActiveIndex(norm);
  }, [slotWidth, getPadLeft]);

  // Scroll so card `idx` is exactly in viewport centre
  const scrollToCard = useCallback((idx) => {
    const el = scrollRef.current;
    if (!el) return;
    const pl = getPadLeft();
    el.scrollLeft = pl + idx * slotWidth + CARD_W / 2 - el.clientWidth / 2;
  }, [slotWidth, getPadLeft]);

  // Auto-scroll loop
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
        // Seamless loop: jump from 3rd copy back to 2nd copy
        if (el.scrollLeft >= el.scrollWidth * 0.66) {
          el.scrollLeft -= BASE_COUNT * slotWidth;
        }
        updateActiveIndex();
      }

      autoScrollRef.current = requestAnimationFrame(step);
    };

    autoScrollRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(autoScrollRef.current);
  }, [updateActiveIndex]);

  // Initial position: centre on BASE_COUNT card (first in 2nd copy)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      scrollToCard(BASE_COUNT);
      updateActiveIndex();
    });
    return () => cancelAnimationFrame(raf);
  }, []); // eslint-disable-line

  // Lazy-load: render videos only when section enters viewport
  // (no longer needed — poster images used as previews)

  const onPointerDown = (e) => {
    const el = scrollRef.current;
    if (!el) return;
    isDragging.current = true;
    dragMoved.current = false;
    startX.current = e.pageX - el.offsetLeft;
    savedScrollLeft.current = el.scrollLeft;
    // NOTE: do NOT call setPointerCapture — it redirects click events
    // to the scroll container, swallowing card onClick handlers.
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

  // Card click: fires onPointerUp directly on the card (before scroll container
  // captures it). Only opens player if pointer didn't move (not a drag).
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
        id="expert-works"
        label="Вирусный контент"
        title="Наши видео смотрят миллионы"
        subtitle="Мы запускаем тренды"
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
              // Handle wrap-around distance
              const dist = Math.min(rawDist, allItems.length - rawDist);
              const isCenter = dist === 0;
              const isVideo = item.type === 'video';

              const scale   = dist === 0 ? 1    : dist === 1 ? 0.84 : dist === 2 ? 0.71 : 0.62;
              const opacity = dist === 0 ? 1    : dist === 1 ? 0.72 : dist === 2 ? 0.50 : 0.30;
              const translateY = dist === 0 ? 0 : dist === 1 ? 20   : dist === 2 ? 32   : 40;
              const blur    = dist <= 1  ? 0    : dist === 2 ? 1.5  : 3;
              const zIdx    = 10 - Math.min(dist, 4) * 2;

              const shadow = isCenter
                ? isVideo
                  ? '0 0 70px rgba(123,23,35,0.70), 0 0 28px rgba(123,23,35,0.40), 0 28px 56px rgba(0,0,0,0.60)'
                  : '0 0 44px rgba(123,23,35,0.28), 0 28px 56px rgba(0,0,0,0.58)'
                : '0 10px 22px rgba(0,0,0,0.28)';

              const borderColor = isCenter
                ? isVideo ? 'rgba(155,40,55,0.80)' : 'rgba(255,255,255,0.32)'
                : 'rgba(255,255,255,0.07)';

              return (
                <div
                  key={`expert-${index}`}
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
                    {isVideo ? (
                      <>
                        {item.posterSrc ? (
                          <img
                            src={item.posterSrc}
                            alt="превью видео"
                            className="h-full w-full object-cover"
                            loading="lazy"
                            draggable={false}
                            style={{ pointerEvents: 'none' }}
                          />
                        ) : (
                          <div className="h-full w-full" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '16px' }} />
                        )}
                        {/* Bottom gradient glow */}
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background: isCenter
                              ? 'linear-gradient(to top, rgba(95,10,22,0.78) 0%, rgba(95,10,22,0.18) 40%, transparent 68%)'
                              : 'linear-gradient(to top, rgba(0,0,0,0.50) 0%, transparent 55%)',
                          }}
                        />
                        {/* Video badge — top-left */}
                        <div className="absolute left-3 top-3">
                          <span className="flex items-center gap-1.5 rounded-full border border-white/18 bg-black/55 px-2.5 py-[5px] text-[10px] font-medium uppercase tracking-wider text-white/80 backdrop-blur-sm">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-genii-accent" />
                            видео
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
                      </>
                    ) : (
                      <>
                        <img
                          src={item.src}
                          alt="Экспертный контент"
                          className="h-full w-full object-cover"
                          loading="lazy"
                          draggable={false}
                        />
                        {/* Bottom gradient glow */}
                        <div
                          className="pointer-events-none absolute inset-0"
                          style={{
                            background: isCenter
                              ? 'linear-gradient(to top, rgba(28,4,10,0.70) 0%, rgba(28,4,10,0.14) 40%, transparent 66%)'
                              : 'linear-gradient(to top, rgba(0,0,0,0.38) 0%, transparent 52%)',
                          }}
                        />
                      </>
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

export default ExpertCarousel;
