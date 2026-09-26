import React, { useRef } from 'react';
import { MapPin } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

const CLIENTS = [
  'Loka Bumi Persada',
  'Mutiara Benih Nusantara',
  'RBL Nusantara',
  'Benih Seribuan',
  'Artha.id',
  'Natura Grow',
  'Live Scale Studio',
  'Linkar Network',
  'Nusatani',
  'NEUverse',
  'DigiDuc',
  'Gaetin',
  'Buzzer Prime',
  'Pixelio',
  'Selara Creative',
];

export default function AboutSection() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, '.reveal-about');

  return (
    <section ref={sectionRef} id="about" className="about-section py-24 sm:py-36 px-6 sm:px-8 lg:px-12 bg-[#FFFDF8] text-[#102A43]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          {/* Left info */}
          <div className="reveal-about lg:col-span-2">
            <span className="text-xs font-mono font-bold tracking-widest text-[#C9563B] uppercase block mb-1">
              [ 03 // TENTANG HELLENS ]
            </span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#102A43]">
              Studio Digital & Automasi Sistem
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-[#102A43]/80 leading-relaxed font-normal">
              Hellens adalah studio digital independen yang membantu bisnis memiliki sistem digital yang rapi: mulai dari website yang menghasilkan konversi hingga automasi alur kerja operasional di baliknya.
            </p>
            <p className="mt-2 text-xs sm:text-sm text-[#102A43]/80 leading-relaxed font-normal">
              Kami memegang prinsip kerja praktis: hasil nyata yang terukur, kode yang terdokumentasi, dan komunikasi yang cepat tanggap.
            </p>
          </div>

          {/* Right card */}
          <div className="about-card reveal-about rounded-2xl bg-[#F5F1E8] border border-[#102A43]/15 p-5 shadow-[3px_3px_0px_rgba(16,42,67,0.06)]">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-[#E96A4A]" />
              <span className="text-xs font-mono font-bold text-[#102A43]">
                Yogyakarta, ID
              </span>
            </div>
            <p className="text-xs text-[#102A43]/70 leading-relaxed">
              Bekerja secara remote-first melayani klien di Indonesia dan mancanegara.
            </p>
            <div className="mt-4 pt-3 border-t border-[#102A43]/10 text-[11px] font-mono text-[#102A43]/60">
              Founder & Lead Tech: Afan Hanafi
            </div>
          </div>
        </div>

        {/* Client pills */}
        <div className="reveal-about mt-14 pt-8 border-t border-[#102A43]/10">
          <span className="text-[11px] font-mono text-[#102A43]/60 uppercase tracking-wider block mb-4">
            Klien & Partner Terpercaya:
          </span>
          <div className="flex flex-wrap gap-2">
            {CLIENTS.map((c) => (
              <span
                key={c}
                className="client-tag text-xs font-mono px-3 py-1 rounded-md bg-[#F5F1E8] border border-[#102A43]/10 text-[#102A43] transition-colors hover:bg-[#FAD9CF] hover:border-[#E96A4A]/40"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
