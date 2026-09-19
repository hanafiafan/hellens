import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import ColorfulLogoLoader from './components/ColorfulLogoLoader';
import Navbar from './components/Navbar';
import HeroScrollStage from './components/HeroScrollStageGL';
import ServicesSection from './components/ServicesSection';
// PortfolioSection sementara dinonaktifkan — file-nya masih ada, tinggal impor &
// render ulang, kembalikan 'portfolio' ke SECTIONS + NAV_LINKS di Navbar, lalu geser
// lagi penomoran section (rate card 02->03, tentang 03->04, kontak 04->05).
import ScrollFrameSequence from './components/ScrollFrameSequence';
import PricingSection from './components/PricingSection';
import AboutSection from './components/AboutSection';
import ContactFooter from './components/ContactFooter';
import { GlassFilter } from './components/LiquidGlass';

const SECTIONS = ['hero', 'services', 'pricing', 'about', 'contact'];

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [activeSection, setActiveSection] = useState('hero');
  const lenisRef = useRef(null);

  // Lenis smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1 });
    lenisRef.current = lenis;
    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Track active section during scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(SECTIONS[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const el = document.getElementById(sectionId);
    if (el && lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: -80 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleReplayLoader = () => {
    setShowLoader(true);
    if (lenisRef.current) lenisRef.current.scrollTo(0);
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f4f9f7] text-[#042718] flex flex-col relative selection:bg-emerald-300 selection:text-emerald-950 font-sans">
      {/* Shared SVG filter for the liquid-glass effect */}
      <GlassFilter />

      {/* 1. Colorful Animated Logo Loading Section */}
      {showLoader && (
        <ColorfulLogoLoader onFinish={() => setShowLoader(false)} />
      )}

      {/* 2. Floating Navbar (Minimalist Y2K Frosted Style) */}
      <Navbar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onReplayLoader={handleReplayLoader}
      />

      {/* Hero: looping intro video + scroll-driven frame animation. */}
      <HeroScrollStage
        active={!showLoader}
        lenisRef={lenisRef}
        onExploreServices={() => handleNavigate('services')}
      />

      {/* 4. Services Section (3 Core Pillars, No Buzzword Fluff) */}
      <ServicesSection />

      {/* 5b. Scroll-driven frame sequence -> crossfades into looping video */}
      <ScrollFrameSequence />

      {/* 6. Rate Card Section (Transparent Tiers with IDR / USD Toggle) */}
      <PricingSection />

      {/* 7. About Section (Pragmatic Studio Info & Clients) */}
      <AboutSection />

      {/* 8. Contact & Footer */}
      <ContactFooter onNavigate={handleNavigate} />
    </div>
  );
}
