import Hero from './sections/Hero';
import WorldShift from './sections/WorldShift';
import Authors from './sections/Authors';
import Cases from './sections/Cases';
import ViralCarousel from './sections/ViralCarousel';
import VideoGallery from './sections/VideoGallery';
import Skills from './sections/Skills';
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
import { courseInfo } from './data/content';

function App() {
  return (
    <div className="min-h-screen bg-genii-bg text-white">
  <main className="pb-28 sm:pb-32">
        <Hero />
        <SectionDivider />
  <WorldShift />
        <SectionDivider />
        <Authors />
        <SectionDivider />
        <Cases />
        <SectionDivider />
  <ViralCarousel />
  <SectionDivider />
  <VideoGallery />
  <SectionDivider />
        <Skills />
        <SectionDivider />
        <Curriculum />
        <MidCta />
        <SectionDivider />
        <Format />
        <SectionDivider />
        <Audience />
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

export default App;
