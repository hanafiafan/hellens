import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Menu, X, Plus, Minus } from 'lucide-react';

const whatsapp = (message) => `https://wa.me/6285726465083?text=${encodeURIComponent(message)}`;
const services = [
  { no: '01', title: 'Website yang bekerja.', type: 'Website / landing page', text: 'Orang datang, paham tawaran Anda, lalu tahu harus melakukan apa. Setiap bagian halaman dirancang untuk membawa mereka ke percakapan.', detail: 'Strategi halaman · desain & development · formulir & WhatsApp · analitik', img: '/karya-img/page_11_3.jpg', href: '/karya/#website' },
  { no: '02', title: 'Toko yang bisa Anda kelola.', type: 'Commerce / booking', text: 'Produk, reservasi, pembayaran, dan isi situs berada dalam satu alur. Tim Anda bisa mengubahnya sendiri setelah proyek selesai.', detail: 'Katalog · booking · pembayaran · panel admin', img: '/karya-img/page_10_3.jpg', href: '/karya/#toko-online' },
  { no: '03', title: 'Kerja berulang, selesai sendiri.', type: 'Automasi / chatbot', text: 'Data masuk ke tempat yang tepat, pelanggan mendapat jawaban awal, dan tim Anda kembali fokus pada pekerjaan yang perlu manusia.', detail: 'Chatbot · integrasi API · notifikasi · dashboard', img: '/karya-img/page_12_1.jpg', href: '/karya/#automasi' },
];
const plans = [
  { name: 'Lite', scope: 'Landing page / company profile', idr: '1,5–6 jt', usd: '150–700', time: '3–7 hari', detail: 'Untuk bisnis yang butuh kehadiran digital yang jelas dan siap dipakai.', items: ['1–5 halaman', 'Form lead & WhatsApp', 'SEO & analitik dasar', '1 kali revisi · garansi bug 7 hari'] },
  { name: 'Advanced', scope: 'Toko online / sistem booking', idr: '6–25 jt', usd: '700–3.500', time: '2–4 minggu', detail: 'Untuk alur jualan yang perlu berjalan lebih rapi setiap hari.', items: ['Katalog / sistem reservasi', 'Pembayaran & notifikasi', 'Panel admin & CMS', 'Training · garansi 30 hari'] },
  { name: 'Custom', scope: 'Web app / automasi khusus', idr: '25 jt+', usd: '3.500+', time: '4–10 minggu', detail: 'Untuk kebutuhan operasional yang tidak muat dalam paket biasa.', items: ['Rancangan sistem sesuai alur kerja', 'Integrasi & database', 'Milestone pengerjaan', 'Opsi dukungan lanjutan'] },
];
const clientNames = ['Loka Bumi Persada', 'Mutiara Benih Nusantara', 'RBL Nusantara', 'Nusatani', 'Natura Grow', 'Artha.id', 'DigiDuc', 'Live Scale Studio'];

function Entrance() {
  const [visible, setVisible] = useState(() => !sessionStorage.getItem('hellens-intro') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    if (!visible) return;
    const id = setTimeout(() => { setVisible(false); sessionStorage.setItem('hellens-intro', '1'); }, 1050);
    return () => clearTimeout(id);
  }, [visible]);
  return visible ? <div className="entrance" aria-hidden="true"><div className="entrance-mark">H<span>°</span></div><div className="entrance-line" /><small>HELLENS / DIGITAL WORKSHOP</small></div> : null;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => { const fn = () => setScrolled(window.scrollY > 48); fn(); window.addEventListener('scroll', fn, { passive: true }); return () => window.removeEventListener('scroll', fn); }, []);
  return <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
    <a className="brand" href="#top" aria-label="Hellens, kembali ke atas"><span className="brand-symbol">H<span>°</span></span><span className="brand-name">HELLENS<span className="brand-dot">.DEV</span></span></a>
    <nav className={open ? 'header-nav is-open' : 'header-nav'} aria-label="Navigasi utama">
      <a href="#services" onClick={() => setOpen(false)}>Layanan</a><a href="#work" onClick={() => setOpen(false)}>Karya</a><a href="#pricing" onClick={() => setOpen(false)}>Biaya</a><a href="#about" onClick={() => setOpen(false)}>Studio</a>
      <a className="nav-contact" href="#contact" onClick={() => setOpen(false)}>Mulai proyek <ArrowUpRight size={16}/></a>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Tutup menu' : 'Buka menu'} aria-expanded={open}>{open ? <X/> : <Menu/>}</button>
  </header>;
}

function Hero() {
  const stage = useRef(null);
  const move = (e) => {
    if (!stage.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = stage.current.getBoundingClientRect();
    stage.current.style.setProperty('--mx', `${((e.clientX - rect.left) / rect.width - .5) * 28}px`);
    stage.current.style.setProperty('--my', `${((e.clientY - rect.top) / rect.height - .5) * 28}px`);
  };
  return <section id="top" className="hero" ref={stage} onPointerMove={move} onPointerLeave={() => { if (stage.current) { stage.current.style.setProperty('--mx','0px'); stage.current.style.setProperty('--my','0px'); } }}>
    <div className="hero-grain" /><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/>
    <div className="hero-content"><div className="hero-kicker"><span className="live-dot"/> STUDIO DIGITAL INDEPENDEN <span className="kicker-rule"/> YOGYAKARTA / EVERYWHERE</div>
      <h1>Ide bagus<br/>butuh <em>bentuk.</em></h1>
      <div className="hero-bottom"><p>Kami merancang website, toko online, dan sistem yang membuat pekerjaan bisnis terasa lebih ringan.</p><div className="hero-actions"><a className="button button-lime" href="#work">Lihat yang kami buat <ArrowUpRight size={18}/></a><a className="text-link" href="#contact">Ceritakan proyekmu <ArrowRight size={17}/></a></div></div>
    </div>
    <div className="hero-visual" aria-hidden="true"><div className="visual-frame"><div className="visual-top"><span>HELLENS.EXE</span><span>● ● ●</span></div><img src="/karya-img/page_11_3.jpg" alt=""/><div className="visual-caption"><span>SCREEN 001 / IN MOTION</span><span>↗</span></div></div><div className="visual-sticker">DIGITAL<br/>THINGS<br/>DONE<br/>RIGHT<span>✳</span></div></div>
    <a className="scroll-cue" href="#services"><ArrowDown size={15}/> SCROLL TO EXPLORE</a><div className="hero-index">01 — 05</div>
  </section>;
}

function Services() {
  const [active, setActive] = useState(0);
  return <section id="services" className="services section-pad"><div className="section-top"><span className="eyebrow">[ 01 / APA YANG KAMI KERJAKAN ]</span><span className="section-asterisk">✳</span></div><div className="services-grid"><div className="section-intro"><h2>Mulai dari<br/><i>masalahnya.</i></h2><p>Kami memilih alat setelah tahu apa yang perlu diselesaikan. Tiga area kerja ini bisa berdiri sendiri atau saling terhubung.</p><a className="underline-link" href="#contact">Punya kebutuhan lain? <ArrowUpRight size={17}/></a></div><div className="service-list">{services.map((s,i) => <article key={s.no} className={`service-item ${active === i ? 'active' : ''}`}><button onClick={() => setActive(active === i ? -1 : i)} aria-expanded={active === i}><span className="service-no">{s.no}</span><span className="service-name">{s.title}</span><span className="service-icon">{active === i ? <Minus/> : <Plus/>}</span></button>{active === i && <div className="service-detail"><div className="service-image"><img src={s.img} alt={`Cuplikan ${s.type}`} loading="lazy"/></div><div><span className="mini-label">{s.type}</span><p>{s.text}</p><small>{s.detail}</small><a href={s.href}>Lihat contoh kerja <ArrowUpRight size={15}/></a></div></div>}</article>)}</div></div></section>;
}

function Work() {
  const items = [{img:'/karya-img/page_11_3.jpg',name:'Platform produk digital',kind:'Website / pengalaman digital',n:'01'}, {img:'/karya-img/page_10_3.jpg',name:'Alur toko online',kind:'Commerce / sistem admin',n:'02'}, {img:'/karya-img/page_12_1.jpg',name:'Dashboard prospek',kind:'Automasi / produk internal',n:'03'}];
  return <section id="work" className="work section-pad"><div className="section-top"><span className="eyebrow">[ 02 / PILIHAN KARYA ]</span><span>BUILT IN THE REAL WORLD ↗</span></div><div className="work-heading"><h2>Lebih baik<br/><em>ditunjukkan.</em></h2><a className="round-arrow" href="/karya/" aria-label="Lihat semua karya"><ArrowUpRight/></a></div><div className="work-grid">{items.map(item => <a className="work-card" href="/karya/" key={item.n}><div className="work-img"><img src={item.img} alt={item.name} loading="lazy"/><span className="work-open"><ArrowUpRight/></span></div><div className="work-meta"><span>{item.n} / {item.kind}</span><strong>{item.name}</strong></div></a>)}</div><p className="work-note">Beberapa pekerjaan klien tidak dapat ditampilkan secara publik. Kami bisa membahas pendekatannya saat konsultasi.</p></section>;
}

function Pricing() {
 const [currency,setCurrency] = useState('idr');
 return <section id="pricing" className="pricing section-pad"><div className="section-top"><span className="eyebrow">[ 03 / TITIK AWAL ]</span><span>NO SURPRISES, JUST SCOPE.</span></div><div className="pricing-heading"><div><h2>Angka yang<br/><em>masuk akal.</em></h2><p>Setiap proyek punya kebutuhan berbeda. Kisaran ini membantu Anda menentukan titik awal percakapan.</p></div><div className="currency" role="group" aria-label="Pilih mata uang"><button className={currency==='idr'?'selected':''} onClick={()=>setCurrency('idr')}>IDR</button><button className={currency==='usd'?'selected':''} onClick={()=>setCurrency('usd')}>USD</button></div></div><div className="plan-list">{plans.map((p,i)=><article className="plan" key={p.name}><div className="plan-index">{String(i+1).padStart(2,'0')} / 03</div><div className="plan-main"><span>{p.scope}</span><h3>{p.name}</h3><p>{p.detail}</p></div><div className="plan-price"><span>MULAI DARI / ESTIMASI</span><strong>{currency==='idr'?'Rp ':'$ '}{p[currency]}</strong><small>Estimasi waktu: {p.time}</small></div><div className="plan-more"><ul>{p.items.map(x=><li key={x}>{x}</li>)}</ul><a href={whatsapp(`Halo Hellens, saya ingin diskusi paket ${p.name}.`)} target="_blank" rel="noopener noreferrer" aria-label={`Diskusi paket ${p.name}`}><ArrowUpRight/></a></div></article>)}</div></section>;
}

function About() {
 return <section id="about" className="about section-pad"><div className="section-top"><span className="eyebrow">[ 04 / DI BALIK LAYAR ]</span><span className="about-star">✳</span></div><div className="about-grid"><div><h2>Studio kecil.<br/><em>Perhatian penuh.</em></h2><p className="about-lead">Hellens adalah studio independen dari Yogyakarta. Kami terlibat dari percakapan pertama sampai produk siap dipakai.</p><p>Anda berbicara langsung dengan orang yang merancang dan membangunnya. Hasilnya dibuat agar tim Anda bisa melanjutkan pekerjaan, bukan bergantung pada kami untuk setiap perubahan kecil.</p><div className="about-sign">AFAN HANAFI <span>FOUNDER & LEAD TECH</span></div></div><aside className="about-panel"><div className="panel-circle">H<span>°</span></div><div><span>BEKERJA BERSAMA</span><div className="client-grid">{clientNames.map(c=><span key={c}>{c}</span>)}</div></div><small>SEJAK 2021 / YOGYAKARTA, INDONESIA</small></aside></div></section>;
}

function Contact() {
 const [brief,setBrief] = useState('');
 return <footer id="contact" className="contact section-pad"><div className="section-top"><span className="eyebrow">[ 05 / MULAI DARI SINI ]</span><span>THE NEXT MOVE IS YOURS ↗</span></div><div className="contact-layout"><div><h2>Ada yang ingin<br/><em>dibangun?</em></h2><p>Ceritakan ide, masalah, atau alur kerja yang ingin Anda rapikan. Kami akan mulai dari percakapan yang jelas.</p><a className="contact-email" href="mailto:hellensdev@gmail.com">hellensdev@gmail.com <ArrowUpRight size={18}/></a></div><form onSubmit={(e)=>{e.preventDefault(); if(brief.trim()) window.open(whatsapp(`Halo Hellens, saya ingin konsultasi:\n${brief}`),'_blank','noopener,noreferrer');}}><label htmlFor="brief">APA YANG SEDANG ANDA PIKIRKAN?</label><textarea id="brief" value={brief} onChange={e=>setBrief(e.target.value)} placeholder="Misalnya: kami perlu website untuk memperkenalkan produk baru..." required rows="5"/><button type="submit">Kirim lewat WhatsApp <ArrowUpRight size={20}/></button><small>Pesan akan dibuka di WhatsApp. Belum ada yang terkirim sebelum Anda menekan kirim di sana.</small></form></div><div className="footer-bottom"><a className="footer-brand" href="#top">HELLENS<span>°</span></a><span>INDEPENDENT DIGITAL WORKSHOP / © 2026</span><div><a href="/karya/">Karya</a><a href="/privacy/">Privasi</a><a href="/terms/">Syarat</a><a href="#top">Kembali ke atas ↑</a></div></div></footer>;
}

export default function App() {
 useEffect(() => { const els=document.querySelectorAll('.section-pad'); if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in-view'); io.unobserve(e.target)}}),{threshold:.08});els.forEach(el=>io.observe(el));return()=>io.disconnect(); },[]);
 return <><Entrance/><Header/><main><Hero/><Services/><Work/><Pricing/><About/></main><Contact/></>;
}
