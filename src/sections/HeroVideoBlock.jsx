import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
