import React, { useRef, useEffect } from 'react';
import { Globe, ShoppingBag, Workflow } from 'lucide-react';
import InfiniteGallery from './InfiniteGallery';

export const PILLARS = [
  {
    icon: Globe,
    name: 'Website & Landing Page',
    desc: 'Satu halaman dengan satu tugas: mengubah pengunjung jadi chat WhatsApp. Bukan brosur digital yang berhenti di "bagus".',
    items: ['Struktur & copy diarahkan ke satu aksi', 'Form leads + direct WhatsApp', 'SEO on-page & analitik'],
    slug: 'website',
  },
  {
    icon: ShoppingBag,
    name: 'Toko Online & Sistem Booking',
    desc: 'Katalog, pembayaran, dan dashboard admin — tim Anda menambah produk atau mengubah harga sendiri, tanpa antre ke developer.',
    items: ['Katalog & payment gateway', 'Booking / reservasi', 'Admin panel & CMS mandiri'],
    slug: 'toko-online',
  },
  {
    icon: Workflow,
    name: 'Automasi & Chatbot',
    desc: 'Pekerjaan berulang dipindahkan ke sistem: rekap data, notifikasi order, dan chatbot yang menjawab lebih dulu sebelum tim Anda turun tangan.',
    items: ['Chatbot WhatsApp & AI LLM', 'Automasi alur kerja internal', 'Integrasi API & dashboard'],
    slug: 'automasi',
  },
];

// 37 scraped designs, cycled up to 50 photos for the stream.
const RAW = Array.from({ length: 37 }, (_, i) => `/scrape-designs/design_${String(i + 1).padStart(2, '0')}.webp`);
const IMAGES = Array.from({ length: 50 }, (_, i) => ({
  src: RAW[i % RAW.length],
  alt: 'Referensi desain landing page & website',
}));

const TRACK_VH = 420; // pinned scroll distance that drives the corridor

export default function ServicesSection() {
  const trackRef = useRef(null);
  const driveRef = useRef(0); // 0..1 scroll progress, read by the gallery each frame

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const t = trackRef.current;
      if (t) {
        const total = t.offsetHeight - window.innerHeight;
        driveRef.current = total > 0
          ? Math.min(1, Math.max(0, -t.getBoundingClientRect().top / total))
          : 0;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="services-visual" ref={trackRef} className="relative bg-white" style={{ height: `${TRACK_VH}vh` }}>
      {/* Pinned stage: centered first, then scroll drives the corridor inward,
          and past the track it releases to the next section (gallery keeps auto-playing). */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-white isolate">
        <InfiniteGallery
          images={IMAGES}
          speed={1.2}
          visibleCount={16}
          driveRef={driveRef}
          className="absolute inset-0 h-full w-full"
        />

        {/* Overlay — non-interactive */}
        <div className="pointer-events-none absolute inset-0">
          {/* single negated wordmark — Orbitron */}
          <div className="absolute inset-0 flex items-center justify-center mix-blend-exclusion text-white">
            <h2
              className="text-5xl sm:text-7xl font-extrabold tracking-tight select-none"
              style={{ fontFamily: "'Orbitron', sans-serif" }}
            >
              Hellens.dev
            </h2>
          </div>

          <div className="absolute bottom-8 left-0 right-0 text-center font-mono uppercase text-[10px] sm:text-[11px] font-semibold text-neutral-800">
            <p>Scroll untuk menjelajah karya</p>
            <p className="opacity-60">Berjalan otomatis · scroll lagi untuk lanjut</p>
          </div>
        </div>
      </div>
    </section>
  );
}
