import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import Hero from './Hero';
import WorldShift from './WorldShift';

function HeroVideoBlock() {
  const wrapperRef = useRef(null);

  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const videoSrc = isMobile
    ? '/media/videos/Hero-mobile.mp4'
    : '/media/videos/Hero-web.mp4';

  // ── Hero audio ──────────────────────────────────────────────────────────
  // The video autoplays muted (required for autoplay). The user can turn sound
  // on/off with the button below; once on, volume fades with hero visibility on
  // scroll (never a hard cut) and fades back if they return — but sound is never
  // enabled without an explicit user action.
  const videoRef = useRef(null);
  const soundOnRef = useRef(false); // did the user turn sound on?
  const rafRef = useRef(0);
  const [soundOn, setSoundOn] = useState(false);

  const clamp01 = (n) => Math.min(1, Math.max(0, n));

  // Eases video.volume toward a scroll-derived target every frame, so the sound
  // never cuts abruptly. Target = hero visibility (1 at top → 0 after one screen
  // scrolled), or 0 once the user has muted.
  const runVolumeStep = () => {
    const v = videoRef.current;
    if (!v) { rafRef.current = 0; return; }
    const vh = window.innerHeight || 1;
    const visibility = clamp01(1 - window.scrollY / vh);
    const target = soundOnRef.current ? visibility : 0;
    let next = v.volume + (target - v.volume) * 0.12;
    if (Math.abs(target - next) < 0.005) next = target;
    v.volume = clamp01(next);
    // After a manual mute has fully faded out, hard-mute and stop the loop.
    if (!soundOnRef.current && v.volume <= 0.001) {
      v.muted = true;
      rafRef.current = 0;
      return;
    }
    rafRef.current = requestAnimationFrame(runVolumeStep);
  };

  const ensureVolumeLoop = () => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(runVolumeStep);
  };

  const enableSound = () => {
    const v = videoRef.current;
    if (!v) return;
    soundOnRef.current = true;
    setSoundOn(true);
    v.volume = 0; // start from silence, fade up
    v.muted = false;
    ensureVolumeLoop();
  };

  const disableSound = () => {
    soundOnRef.current = false;
    setSoundOn(false);
    ensureVolumeLoop(); // fades to 0, then the loop hard-mutes and stops
  };

  const toggleSound = () => (soundOn ? disableSound() : enableSound());

  // Force autoplay-safe muted state on mount (React does not reliably reflect
  // the `muted` attribute to the DOM property) and clean up the rAF on unmount.
  useEffect(() => {
    if (videoRef.current) videoRef.current.muted = true;
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  // Slow parallax: video drifts upward as user scrolls through both sections
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%']);

  // Scroll-driven burgundy ambient glow — drifts horizontally
  const burgundyX = useTransform(scrollYProgress, [0, 0.5, 1], ['-15%', '0%', '15%']);
  const burgundyOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6, 1], [0.08, 0.28, 0.22, 0.04]);
  const burgundyScale = useTransform(scrollYProgress, [0, 0.4, 1], [0.85, 1.1, 0.9]);

  // Left accent glow — subtle scroll parallax
  const leftGlowY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const leftGlowOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [0.22, 0.38, 0.18, 0.04]);

  // Center warm ambient glow — appears mid-scroll
  const warmOpacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.9], [0, 0.14, 0.18, 0.06]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* ── Video + overlay layer (absolutely fills the whole wrapper) ── */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        style={{ zIndex: 0 }}
      >
        {/* Parallax video */}
        <motion.div
          className="absolute inset-0"
          style={{ y: videoY, height: '115%', top: 0 }}
        >
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover object-center"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        </motion.div>

        {/* Cinematic dark overlay — stronger at top, lighter in middle */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(8,6,6,0.74) 0%, rgba(8,6,6,0.58) 28%, rgba(8,6,6,0.34) 58%, rgba(8,6,6,0.18) 100%)',
          }}
        />

        {/* Subtle edge vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 50% 40%, transparent 50%, rgba(0,0,0,0.38) 100%)',
          }}
        />

        {/* Left burgundy accent glow — scroll parallax */}
        <motion.div
          className="absolute -left-24 top-[20%]"
          style={{
            width: '640px',
            height: '640px',
            background:
              'radial-gradient(ellipse at center, rgba(123,23,35,0.45) 0%, rgba(123,23,35,0.12) 45%, transparent 68%)',
            filter: 'blur(80px)',
            y: leftGlowY,
            opacity: leftGlowOpacity,
          }}
        />

        {/* Center warm ambient glow — fades in as you scroll */}
        <motion.div
          className="absolute left-1/2 top-[35%]"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            width: '700px',
            height: '480px',
            background:
              'radial-gradient(ellipse at center, rgba(240,210,190,0.12) 0%, transparent 65%)',
            filter: 'blur(70px)',
            opacity: warmOpacity,
          }}
        />

        {/* Scroll-driven burgundy ambient glow */}
        <motion.div
          className="absolute left-1/2 top-[58%]"
          style={{
            translateX: '-50%',
            translateY: '-50%',
            width: '920px',
            height: '620px',
            background:
              'radial-gradient(ellipse at center, rgba(123,23,35,0.40) 0%, rgba(123,23,35,0.10) 50%, transparent 70%)',
            filter: 'blur(88px)',
            x: burgundyX,
            opacity: burgundyOpacity,
            scale: burgundyScale,
          }}
        />

        {/* Bottom fade — dark → burgundy hint → site dark bg */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: '480px',
            background:
              'linear-gradient(180deg, transparent 0%, rgba(46,20,24,0.12) 35%, rgba(46,32,30,0.55) 60%, rgba(46,45,48,0.88) 80%, #2E2D30 100%)',
            zIndex: 1,
          }}
        />
      </div>

      {/* ── Sound toggle for the hero video ── */}
      <button
        type="button"
        onClick={toggleSound}
        aria-label={soundOn ? 'Выключить звук' : 'Включить звук'}
        aria-pressed={soundOn}
        className="pointer-events-auto absolute right-4 top-[76px] z-[2] flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/75 backdrop-blur-md transition-all duration-200 hover:bg-black/60 hover:text-white sm:right-6 sm:top-[84px]"
      >
        {soundOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      </button>

      {/* ── Hero (transparent — video is the bg) ── */}
      <div className="relative" style={{ zIndex: 1 }}>
        <Hero />
      </div>

      {/* ── WorldShift (sits on same video bg) ── */}
      <div className="relative" style={{ zIndex: 1 }}>
        <WorldShift />
      </div>
    </div>
  );
}

export default HeroVideoBlock;
