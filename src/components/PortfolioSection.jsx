import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import SphereImageGrid from './SphereImageGrid';

// Transparent client/brand logos arranged in the sphere.
const IMAGES = Array.from({ length: 66 }, (_, i) => ({
  id: `logo-${i + 1}`,
  src: `/logos-sphere/logo_${String(i + 1).padStart(2, '0')}.webp`,
  alt: `Logo klien ${i + 1}`,
  title: `Brand #${i + 1}`,
}));

// Average luminance of a logo's opaque pixels -> pick a contrasting badge bg.
function classifyBadge(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const c = document.createElement('canvas');
        const w = (c.width = 40), h = (c.height = 40);
        const ctx = c.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, w, h);
        const d = ctx.getImageData(0, 0, w, h).data;
        let sum = 0, wt = 0;
        for (let i = 0; i < d.length; i += 4) {
          const a = d[i + 3] / 255;
          if (a < 0.15) continue;
          sum += ((0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255) * a;
          wt += a;
        }
        const luma = wt > 0 ? sum / wt : 1;
        resolve(luma > 0.6 ? 'dark' : 'light'); // light logo -> dark badge
      } catch {
        resolve('light');
      }
    };
    img.onerror = () => resolve('light');
    img.src = src;
  });
}

export default function PortfolioSection() {
  const [images, setImages] = useState(IMAGES);

  useEffect(() => {
    let alive = true;
    Promise.all(
      IMAGES.map((im) => classifyBadge(im.src).then((badgeBg) => ({ ...im, badgeBg }))),
    ).then((res) => { if (alive) setImages(res); });
    return () => { alive = false; };
  }, []);

  return (
    <section id="portfolio" className="relative bg-white text-[#042718] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-28 sm:py-40 grid lg:grid-cols-2 gap-10 items-center">
        {/* Left: copy */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-emerald-700 text-[11px] font-mono tracking-wider mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>02 // PORTOFOLIO</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
            Satu tim untuk
            <br />
            <span className="text-emerald-600">seluruh brand-mu.</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[#042718]/70 leading-relaxed">
            Puluhan brand & klien mempercayakan website, toko online, dan automasi
            operasionalnya ke Hellens. Putar bolanya — geser untuk menjelajah karya kami.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <a
              href="https://wa.me/6285726465083?text=Halo%20Hellens%2C%20saya%20ingin%20diskusi%20proyek"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white bg-[#042718] hover:bg-[#073c26] transition-colors shadow-md cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Jadi klien berikutnya</span>
            </a>
            <span className="text-xs font-mono text-[#042718]/50">50+ brand &amp; terus bertambah</span>
          </div>
        </div>

        {/* Right: logo sphere on plain white */}
        <div className="relative flex items-center justify-center min-h-[420px]">
          <SphereImageGrid
            images={images}
            containerSize={560}
            sphereRadius={238}
            baseImageScale={0.145}
            dragSensitivity={0.6}
            momentumDecay={0.96}
            maxRotationSpeed={6}
            hoverScale={1.3}
            autoRotate
            autoRotateSpeed={0.15}
            className="max-w-full"
          />
        </div>
      </div>
    </section>
  );
}
