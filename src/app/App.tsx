// 📁 src/app/App.tsx
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SCPSection } from './components/SCPSection';
import { IntegrationSection } from './components/IntegrationSection';
import { StatsSection } from './components/StatsSection';
import { MapSection } from './components/MapSection';
import { Footer } from './components/Footer';
import { Preloader } from './components/Preloader';
import { CustomCursor } from './components/CustomCursor';
import { SmoothScroll } from './components/SmoothScroll';
import { BackToTop } from './components/BackToTop';
import { PREGATMarquee } from './components/Marquee';

export default function App() {
  return (
    <>
      <Preloader />
      <CustomCursor />
      <SmoothScroll />
      <BackToTop />

      <div className="min-h-screen cursor-none">
        <Navbar />
        <HeroSection />
        <PREGATMarquee variant="red" direction="left" />
        <SCPSection />
        <IntegrationSection />
        <PREGATMarquee variant="dark" direction="right" />
        <StatsSection />
        <MapSection />
        <Footer />
      </div>
    </>
  );
}
