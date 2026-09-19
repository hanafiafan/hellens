import React, { useState } from 'react';
import { MessageCircle, Mail, ArrowUpRight, Send } from 'lucide-react';
import HellensLogo from './HellensLogo';

export default function ContactFooter({ onNavigate }) {
  const [brief, setBrief] = useState('');

  const handleSendWA = (e) => {
    e.preventDefault();
    if (brief.trim()) {
      const msg = encodeURIComponent(`Halo Hellens, saya ingin konsultasi:\n${brief}`);
      window.open(`https://wa.me/6285726465083?text=${msg}`, '_blank');
      setBrief('');
    }
  };

  return (
    <footer id="contact" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 bg-[#042718] text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center pb-14 border-b border-white/15">
          {/* Left info */}
          <div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-400 uppercase block mb-1">
              [ 04 // KONTAK ]
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
              Mulai Proyek Digital Anda.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/70 leading-relaxed max-w-md">
              Diskusikan kebutuhan website atau alur automasi bisnis Anda langsung bersama tim teknis Hellens.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <a
                href="https://wa.me/6285726465083?text=Halo%20Hellens%2C%20saya%20tertarik%20konsultasi%20proyek"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-[#042718] bg-emerald-400 hover:bg-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: 0857-2646-5083</span>
              </a>

              <a
                href="mailto:hellensdev@gmail.com"
                className="inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>hellensdev@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Right quick note form */}
          <form
            onSubmit={handleSendWA}
            className="rounded-2xl bg-white/5 border border-white/15 p-5 flex flex-col gap-3 backdrop-blur-md"
          >
            <label className="text-xs font-mono text-emerald-300 uppercase tracking-wider">
              Kirim Pesan Langsung ke WhatsApp:
            </label>
            <textarea
              rows={3}
              required
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Tulis ringkasan proyek yang ingin Anda buat..."
              className="w-full rounded-xl bg-black/40 border border-white/15 p-3 text-xs text-white placeholder-white/40 focus:border-emerald-400 outline-none resize-none"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold text-[#042718] bg-white hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <span>Kirim ke WhatsApp Hellens</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Footer bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <div className="flex items-center gap-2">
            <HellensLogo className="w-5 h-5 text-white" />
            <span className="font-bold text-white tracking-wider">HELLENS.DEV</span>
            <span>· Studio Pembuatan Website & Automasi Sistem</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-mono text-[11px]">
            <a href="/karya/" className="hover:text-emerald-300 transition-colors">Karya</a>
            <a href="/scraper/" className="hover:text-emerald-300 transition-colors">Hellens Scraper</a>
            <a href="/privacy/" className="hover:text-emerald-300 transition-colors">Kebijakan Privasi</a>
            <a href="/terms/" className="hover:text-emerald-300 transition-colors">Syarat Layanan</a>
            <span>Yogyakarta, Indonesia</span>
            <span>© 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
