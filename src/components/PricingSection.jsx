import React, { useState, useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function PricingSection() {
  const [currency, setCurrency] = useState('IDR');
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, '.reveal-card');

  const TIERS = [
    {
      name: 'LITE',
      scope: 'Landing Page / Company Profile (1 - 5 Halaman)',
      price: currency === 'IDR' ? 'Rp 1,5 – 6 Jt' : '$150 – $700',
      time: '3 – 7 Hari',
      items: [
        'Desain modern & mobile-first',
        'Form leads & tombol direct WhatsApp',
        'SEO on-page & analitik dasar',
        'Garansi bug 7 hari + 1x revisi',
      ],
      wa: 'Halo Hellens, saya tertarik dengan paket LITE.',
    },
    {
      name: 'ADVANCED',
      scope: 'Toko Online / Booking + Admin Dashboard',
      price: currency === 'IDR' ? 'Rp 6 – 25 Jt' : '$700 – $3.500',
      time: '2 – 4 Minggu',
      featured: true,
      items: [
        'Katalog produk / booking & payment gateway',
        'Admin panel & CMS kelola konten mandiri',
        'Integrasi chatbot WA / notifikasi order',
        'Dokumentasi, training & garansi 30 hari',
      ],
      wa: 'Halo Hellens, saya tertarik dengan paket ADVANCED.',
    },
    {
      name: 'ENTERPRISE',
      scope: 'Marketplace / Web App / SaaS Custom',
      price: currency === 'IDR' ? 'Mulai Rp 25 Jt+' : 'Mulai $3.500+',
      time: '4 – 10 Minggu',
      items: [
        'Sistem kustom skala penuh & database relasional',
        'Automasi alur kerja & integrasi AI LLM',
        'Pembayaran bertahap sesuai milestone',
        'Opsi dukungan retainer maintenance prioritas',
      ],
      wa: 'Halo Hellens, saya ingin konsultasi paket ENTERPRISE.',
    },
  ];

  return (
    <section ref={sectionRef} id="pricing" className="pricing-section py-24 sm:py-36 px-6 sm:px-8 lg:px-12 bg-[#F5F1E8] text-[#102A43]">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-[#C9563B] uppercase block mb-1">
              [ 02 // RATE CARD ]
            </span>
            <h2 className="section-heading text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#102A43]">
              Estimasi Biaya Transparan
            </h2>
          </div>

          {/* Currency Toggle */}
          <div className="inline-flex items-center p-1 rounded-full bg-[#FFFDF8] border border-[#102A43]/15 shadow-sm">
            <button
              onClick={() => setCurrency('IDR')}
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                currency === 'IDR'
                  ? 'bg-[#102A43] text-[#FFF9EF]'
                  : 'text-[#102A43]/70 hover:text-[#102A43]'
              }`}
            >
              IDR (Rp)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-full text-xs font-mono font-semibold transition-all cursor-pointer ${
                currency === 'USD'
                  ? 'bg-[#102A43] text-[#FFF9EF]'
                  : 'text-[#102A43]/70 hover:text-[#102A43]'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className={`pricing-card reveal-card rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 ${
                t.featured
                  ? 'bg-[#FFFDF8] border-2 border-[#E96A4A] shadow-[4px_4px_0px_rgba(16,42,67,0.16)] hover:shadow-[6px_8px_0px_rgba(16,42,67,0.16)]'
                  : 'bg-[#FFFDF8] border border-[#102A43]/15 shadow-[3px_3px_0px_rgba(16,42,67,0.06)] hover:shadow-[5px_7px_0px_rgba(16,42,67,0.1)]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold font-mono text-[#102A43]">
                    {t.name}
                  </span>
                  {t.featured && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[#FAD9CF] text-[#8F3827]">
                      POPULER
                    </span>
                  )}
                </div>

                <div className="text-xl sm:text-2xl font-bold text-[#102A43] tracking-tight">
                  {t.price}
                </div>
                <div className="text-[11px] text-[#102A43]/60 font-mono mt-0.5">
                  Waktu: {t.time}
                </div>

                <p className="text-xs text-[#102A43]/80 font-medium mt-3 pb-4 border-b border-[#102A43]/10">
                  {t.scope}
                </p>

                <ul className="mt-4 flex flex-col gap-2">
                  {t.items.map((it) => (
                    <li key={it} className="text-xs text-[#102A43]/75 flex items-start gap-2">
                      <span className="text-[#E96A4A] font-bold">✓</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-[#102A43]/10">
                <a
                  href={`https://wa.me/6285726465083?text=${encodeURIComponent(t.wa)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full flex items-center justify-center gap-1.5 rounded-full py-2 text-xs font-semibold transition-all ${
                    t.featured
                      ? 'bg-[#102A43] hover:bg-[#173B5E] text-[#FFF9EF]'
                      : 'bg-[#E8EDF1] hover:bg-[#DCE4EA] text-[#102A43]'
                  }`}
                >
                  <span>Pilih Paket</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
