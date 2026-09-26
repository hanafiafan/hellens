import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import HellensLogo from './HellensLogo';
import { LiquidGlass } from './LiquidGlass';

const NAV_LINKS = [
  { id: 'hero', name: 'Beranda' },
  { id: 'services', name: 'Layanan' },
  { id: 'pricing', name: 'Rate Card' },
  { id: 'about', name: 'Tentang' },
  { id: 'contact', name: 'Kontak' },
];

export default function Navbar({ activeSection, onNavigate, onReplayLoader }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLinkClick = (id) => {
    setIsMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-40 px-6 lg:px-12 py-4 sm:py-5 bg-transparent"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* ============================================================ */}
          {/* LOGO (Left Side of Top Bar)                                 */}
          {/* ============================================================ */}
          <LiquidGlass className="site-brand-shell rounded-2xl">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('hero');
              }}
              className="flex items-center gap-2 group cursor-pointer rounded-2xl bg-white/20 px-3 py-1.5"
            >
              <HellensLogo
                className="w-7 h-7 text-[#102A43] transition-transform duration-200 group-hover:scale-105"
              />
              <span className="text-base sm:text-lg font-bold tracking-tight text-[#102A43] leading-none">
                HELLENS<span className="text-[#E96A4A]">.DEV</span>
              </span>
            </a>
          </LiquidGlass>

          {/* ============================================================ */}
          {/* PILIHAN MENU (Right Side of Top Bar)                         */}
          {/* ============================================================ */}
          <div className="flex items-center gap-3">
            {/* Desktop Nav Pills — liquid glass */}
            <LiquidGlass className="site-nav-shell hidden md:block rounded-full">
              <nav className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-1.5" aria-label="Navigasi utama">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`relative px-3.5 py-1 rounded-full text-xs font-medium cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E96A4A] ${
                      isActive ? 'text-[#FFF9EF]' : 'text-[#102A43]/70 hover:text-[#102A43] hover:bg-[#102A43]/5 transition-colors'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="navActivePill"
                        className="absolute inset-0 rounded-full bg-[#102A43] shadow-sm"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{link.name}</span>
                  </button>
                );
              })}
              </nav>
            </LiquidGlass>


            {/* Mobile Menu Button — liquid glass */}
            <LiquidGlass className="site-mobile-shell md:hidden rounded-full">
              <button
                type="button"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
                aria-expanded={isMenuOpen}
                aria-controls="mobile-navigation"
                className="relative h-9 w-9 rounded-full bg-white/20 flex items-center justify-center text-[#102A43] z-50 focus:outline-none cursor-pointer"
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </LiquidGlass>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div
        id="mobile-navigation"
        className={`fixed right-0 top-0 z-40 h-full w-64 bg-[#FAF7F0] border-l border-[#102A43]/10 shadow-2xl flex flex-col md:hidden transition-transform duration-400 ease-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col px-5 pt-20 gap-1.5">
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all text-left cursor-pointer ${
                  isActive
                    ? 'bg-[#102A43] text-[#FFF9EF]'
                    : 'text-[#102A43]/80 hover:bg-[#102A43]/5'
                }`}
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-50" />
              </button>
            );
          })}
        </div>

        <div className="mt-auto px-5 pb-8 flex flex-col gap-2">
          <a
            href="https://wa.me/6285726465083"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold text-[#FFF9EF] bg-[#102A43]"
          >
            <MessageCircle className="w-3.5 h-3.5 text-[#F29A7E]" />
            <span>Chat WhatsApp</span>
          </a>
          <p className="text-[10px] text-center text-[#102A43]/50 font-mono">
            hellensdev@gmail.com
          </p>
        </div>
      </div>
    </>
  );
}
