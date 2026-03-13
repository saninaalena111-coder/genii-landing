import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import HeroVideoBlock from './sections/HeroVideoBlock';
import Authors from './sections/Authors';
import ExpertCarousel from './sections/ExpertCarousel';
import StudentCarousel from './sections/StudentCarousel';
import Curriculum from './sections/Curriculum';
import MidCta from './sections/MidCta';
import Format from './sections/Format';
import Audience from './sections/Audience';
import Outcomes from './sections/Outcomes';
import Testimonials from './sections/Testimonials';
import Faq from './sections/Faq';
import FinalCta from './sections/FinalCta';
import Footer from './sections/Footer';
import StickyCta from './components/StickyCta';
import SectionDivider from './components/SectionDivider';
import StickyNav from './components/StickyNav';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import { courseInfo } from './data/content';
import PrivacyPage from './pages/PrivacyPage';
import ConsentPage from './pages/ConsentPage';
import OfertaPage from './pages/OfertaPage';

function Landing() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  const sharedVideoSrc = isMobile
    ? '/media/videos/Hero2-mobile.mp4'
    : '/media/videos/Hero2-web.mp4';

  return (
    <div className="min-h-screen bg-genii-bg text-white">
      <CursorGlow />
      <ScrollProgress />
      <StickyNav />
      <main className="pb-28 pt-[62px] sm:pb-32">
        <HeroVideoBlock />
        <SectionDivider />
        <Authors />
        <SectionDivider />
        <ExpertCarousel />
        <SectionDivider />
        <StudentCarousel />
        <SectionDivider />
        <Curriculum />
        <MidCta />
        <SectionDivider />
        {/* Shared cinematic video background for Format + Audience */}
        <div className="relative overflow-hidden">
          {/* Single background video */}
          <video
            autoPlay
            muted
            loop
            playsInline
            src={sharedVideoSrc}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.40,
              filter: 'blur(2px) brightness(1.15) contrast(1.05) saturate(1.1)',
              animation: 'cinematic-zoom 25s ease-in-out infinite alternate',
              willChange: 'transform',
              pointerEvents: 'none',
              zIndex: 0,
            }}
          />
          {/* Dark overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.35)', zIndex: 1 }}
          />
          {/* Top gradient — blend with section above */}
          <div
            className="pointer-events-none absolute left-0 right-0 top-0 h-40"
            style={{ background: 'linear-gradient(to bottom, #363538 0%, transparent 100%)', zIndex: 2 }}
          />
          {/* Bottom gradient — blend with section below */}
          <div
            className="pointer-events-none absolute bottom-0 left-0 right-0 h-40"
            style={{ background: 'linear-gradient(to top, #363538 0%, transparent 100%)', zIndex: 2 }}
          />
          {/* Radial accent glow */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 20% 30%, rgba(123,23,35,0.12), transparent 55%)',
              zIndex: 2,
            }}
          />
          {/* Sections — rendered above video */}
          <div style={{ position: 'relative', zIndex: 3 }}>
            <Format />
            <SectionDivider />
            <Audience />
          </div>
        </div>
        <SectionDivider />
        <Outcomes />
        <SectionDivider />
        <Testimonials />
        <SectionDivider />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyCta text={courseInfo.cta} />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/privacy" element={<PrivacyPage />} />
      <Route path="/consent" element={<ConsentPage />} />
      <Route path="/oferta" element={<OfertaPage />} />
    </Routes>
  );
}

export default App;
