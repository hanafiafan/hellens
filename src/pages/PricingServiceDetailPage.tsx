import { useEffect, useState, type CSSProperties } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Footer } from '../components/Footer'
import { pricingServices, type PricingTier } from '../data/pricing'
import { pricingCatalogBySlug } from '../data/pricingCatalog'
import { pricingHeroThemes } from '../data/pricingHeroThemes'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../hooks/useSeo'
import '../styles/globals.css'
import '../styles/subpages.css'

const packageCoverage = {
  lite: ['Kickoff & validasi kebutuhan', 'Design system siap pakai', 'Web responsif desktop–mobile', 'Database, API internal & admin dasar', 'Functional test alur utama', '1 production environment', '1 revisi mayor + 2 minor', 'Training admin & panduan singkat'],
  standard: ['Workshop, user flow & acceptance criteria', 'UI/UX custom & prototype', 'Multi-role, workflow & scheduled job', 'Regression + cross-browser test', 'Staging dan production', '2 revisi mayor + 3 minor', '2 sesi training admin/user', 'Issue tracking & progress mingguan'],
  pro: ['Process mapping, arsitektur & backlog', 'Riset ringan & design system lengkap', 'Arsitektur modular & API terdokumentasi', 'Job queue, audit & observability', 'Dev, staging & production', 'CI/CD dan caching dasar', 'UAT bertahap & baseline performance', 'Dokumentasi teknis & handover lengkap'],
} as const

const deliveryPrinciples = [
  { no: '01', title: 'Scope yang terukur', text: 'Backlog, acceptance criteria, dan batas integrasi disepakati sebelum development dimulai.' },
  { no: '02', title: 'Build siap operasional', text: 'Bukan hanya tampilan—alur admin, validasi, role, laporan, dan deployment ikut dipersiapkan.' },
  { no: '03', title: 'Progress transparan', text: 'Milestone, issue tracking, sesi UAT, dan pembaruan progres menjaga keputusan tetap jelas.' },
  { no: '04', title: 'Handover yang lengkap', text: 'Training, dokumentasi, kredensial, dan source code diserahkan sesuai ketentuan paket.' },
]

const clientNotes = [
  { quote: 'Alur kerja menjadi lebih ringkas dan tim tidak lagi berpindah-pindah spreadsheet.', role: 'Operations Lead', company: 'Growing retail team' },
  { quote: 'Scope dan milestone jelas sejak awal, sehingga proses UAT jauh lebih mudah dikendalikan.', role: 'Product Owner', company: 'Digital service company' },
  { quote: 'Dashboard dan laporan memberi kami gambaran yang sebelumnya terlambat beberapa hari.', role: 'Business Director', company: 'Multi-branch operation' },
]

const commonQuestions = [
  ['Apakah harga yang ditampilkan sudah final?', 'Belum. Harga merupakan estimasi awal. Nilai final mengikuti discovery, scope, integrasi, acceptance criteria, dan kebutuhan infrastruktur.'],
  ['Bisakah fitur paket disesuaikan?', 'Bisa. Fitur dapat diprioritaskan ulang selama tidak mengubah kompleksitas, timeline, dan kapasitas paket secara material.'],
  ['Apakah biaya server dan API sudah termasuk?', 'Biaya layanan pihak ketiga umumnya terpisah. Domain dan hosting tahun pertama hanya termasuk pada layanan dasar yang disebutkan.'],
  ['Bagaimana proses revisi dan UAT?', 'Setiap paket memiliki kuota revisi dan putaran UAT. Temuan yang sesuai acceptance criteria diperbaiki sebelum handover.'],
]

type TierKey = 'lite' | 'standard' | 'pro'

export function PricingServiceDetailPage() {
  const { slug } = useParams()
  const { language } = useLanguage()
  const [selectedTier, setSelectedTier] = useState<TierKey | null>(null)

  const detailMeta = pricingCatalogBySlug[slug || '']
  const serviceData = detailMeta 
    ? pricingServices.find(s => s.id === detailMeta.id)
    : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useEffect(() => {
    if (!selectedTier) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === 'Escape' && setSelectedTier(null)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selectedTier])

  useSeo(
    detailMeta ? `${detailMeta.name} — Paket & Estimasi Pricing` : 'Detail Layanan — Hellens Developer',
    detailMeta ? detailMeta.description : 'Detail spesifikasi paket layanan Hellens Developer.',
    `https://hellens.dev/pricing/detail/${slug}`,
  )

  if (!detailMeta || !serviceData) {
    return <Navigate to="/pricing" replace />
  }

  const isId = language === 'id'

  const tierKeys: TierKey[] = ['lite', 'standard', 'pro']
  const hostingIncluded = ['01', '12', '24', '30'].includes(detailMeta.id)
  const heroTheme = pricingHeroThemes[detailMeta.slug]
  const heroStyle = {
    '--hero-accent': '#a855f7',
    '--hero-surface': '#241038',
    '--hero-soft': '#e9d5ff',
  } as CSSProperties
  const tierBadges = {
    lite: { name: 'LITE PACKAGE', bg: 'bg-neutral-900 border-neutral-700 text-neutral-300' },
    standard: { name: 'STANDARD PACKAGE', bg: 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]' },
    pro: { name: 'PRO ENTERPRISE', bg: 'bg-gradient-to-r from-purple-900 to-indigo-900 border-purple-400 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)]' },
  }

  return (
    <motion.main 
      className="pricing-detail-page bg-[#050505] text-[#f7f7f3] min-h-screen selection:bg-purple-500 selection:text-white pt-24"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="pricing-detail-shell max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-10 lg:pt-16">
        {/* HERO SECTION */}
        <div className="pricing-detail-hero mb-20 lg:mb-28" style={heroStyle}>
          <div className="pricing-detail-hero__visual">
            <div className="pricing-detail-hero__mini-nav">
              <Link to="/pricing"><span>←</span>{isId ? 'Kembali ke Pilihan Layanan' : 'Back to Service Selection'}</Link>
            </div>
            <a className="pricing-detail-hero__contact" href="mailto:hellensdev@gmail.com">hellensdev@gmail.com</a>
            <img
              src={heroTheme?.image || detailMeta.image}
              alt={detailMeta.name}
              style={{ objectPosition: heroTheme?.imagePosition || 'center' }}
            />
            <div className="pricing-detail-hero__image-title">
              <span>{detailMeta.subtitle}</span>
              <h1>{detailMeta.name}</h1>
            </div>
          </div>

          <div className="pricing-detail-hero__copy">
            <span className="pricing-detail-hero__section-id">SERVICE / {detailMeta.id}</span>
            <h2>{isId ? 'SISTEM KAMI' : 'OUR SYSTEM'}</h2>
            <p>{detailMeta.description}</p>
            <div className="pricing-detail-hero__actions">
              <a 
                href="https://wa.me/6281234567890?text=Halo%20Hellens%20Developer,%20saya%20tertarik%20konsultasi%20layanan%20" 
                target="_blank" 
                rel="noreferrer"
                className="pricing-detail-hero__primary"
              >
                <span>{isId ? 'Konsultasi Layanan Ini' : 'Consult This Service'}</span>
                <span>→</span>
              </a>

              {detailMeta.projectSlug && (
                <Link
                  to={`/projects/${detailMeta.projectSlug}`}
                  className="pricing-detail-hero__secondary"
                >
                  <span>{isId ? 'Lihat Studi Kasus' : 'View Case Study'}</span>
                  <span>↗</span>
                </Link>
              )}
            </div>
          </div>

          <div className="pricing-detail-hero__specialty">
            <div className="pricing-detail-hero__thumb"><img src={heroTheme?.image || detailMeta.image} alt="" /></div>
            <div>
              <strong>{isId ? 'MODUL UTAMA' : 'CORE MODULES'}</strong>
              <p>{serviceData.tiers.standard.features.slice(0, 2).join(' · ')}</p>
            </div>
            <a href="#package-options">{isId ? 'lihat paket' : 'view packages'}</a>
          </div>

          <div className="pricing-detail-hero__notes" aria-label={isId ? 'Sorotan layanan' : 'Service highlights'}>
            <strong>{isId ? 'CATATAN DELIVERY' : 'DELIVERY NOTES'}</strong>
            {serviceData.tiers.standard.features.slice(0, 3).map((feature, index) => (
              <div key={feature}><span>0{index + 1}</span><p>{feature}</p></div>
            ))}
          </div>
        </div>

        <section className="pricing-trust-strip mb-20 lg:mb-28" aria-label={isId ? 'Cakupan delivery' : 'Delivery coverage'}>
          <span>DISCOVERY</span><span>UI / UX</span><span>DEVELOPMENT</span><span>QA + UAT</span><span>DEPLOYMENT</span><span>HANDOVER</span>
        </section>

        <section className="pricing-highlight-section mb-20 lg:mb-28">
          <div className="pricing-section-heading">
            <div><span className="pricing-kicker">HIGHLIGHT / {detailMeta.id}</span><h2>{isId ? 'Kapabilitas Utama' : 'Core Capabilities'}</h2></div>
            <p>{isId ? 'Modul penting yang membentuk fondasi solusi dan dapat berkembang mengikuti skala operasional.' : 'Core modules that form the solution foundation and scale with your operation.'}</p>
          </div>
          <div className="pricing-feature-mosaic">
            {serviceData.tiers.standard.features.slice(0, 4).map((feature, index) => (
              <article key={feature} className={`pricing-feature-tile pricing-feature-tile--${index + 1}`}>
                <span>0{index + 1}</span><h3>{feature}</h3>
                <p>{isId ? 'Dirancang sebagai bagian dari workflow yang terhubung, mudah dipantau, dan siap dikembangkan.' : 'Designed as part of a connected, observable, and extensible workflow.'}</p>
              </article>
            ))}
          </div>
        </section>

        {/* PACKAGE TIERS GRID (LITE, STANDARD, PRO) */}
        <div id="package-options" className="mb-20 lg:mb-28 scroll-mt-28">
          <div className="grid lg:grid-cols-12 gap-5 items-end mb-10 lg:mb-14 border-b border-white/10 pb-7">
            <h2 className="lg:col-span-7 text-3xl sm:text-5xl font-black uppercase text-white tracking-[-0.045em] leading-none">
              {isId ? 'Pilihan Paket & Spesifikasi' : 'Package Options & Specifications'}
            </h2>
            <p className="lg:col-span-5 text-neutral-400 text-sm sm:text-base lg:text-right leading-relaxed">
              {isId ? 'Pilih tingkat skala sistem yang sesuai dengan fase pertumbuhan bisnis Anda.' : 'Choose the system scale matching your current business growth phase.'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 items-stretch">
            {tierKeys.map((tierKey) => {
              const tier: PricingTier = serviceData.tiers[tierKey]
              const badge = tierBadges[tierKey]
              const isPopular = tierKey === 'standard'

              return (
                <div 
                  key={tierKey}
                  className={`pricing-tier-card relative rounded-[1.75rem] p-6 sm:p-8 lg:p-7 xl:p-9 flex flex-col justify-between transition-colors duration-300 border ${
                    isPopular 
                      ? 'bg-[#121014] border-purple-500/70'
                      : 'bg-[#090909] border-white/10 hover:border-white/25'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-7 px-4 py-1.5 rounded-full bg-purple-600 text-white font-mono text-[10px] font-bold tracking-wider uppercase">
                      {isId ? 'PALING POPULER' : 'MOST POPULAR'}
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center mb-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${badge.bg}`}>
                        {badge.name}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-7 pt-2">
                      <div className="text-3xl sm:text-4xl xl:text-[2.65rem] font-black text-white tracking-[-0.045em] leading-none">
                        {tier.price}
                      </div>
                      <div className="text-sm text-neutral-500 mt-3 font-medium leading-relaxed min-h-10">
                        {tier.fit}
                      </div>
                    </div>

                    {/* Meta specs */}
                    <div className="space-y-3 py-5 border-y border-white/10 text-xs font-mono text-neutral-300 mb-7">
                      <div className="flex justify-between">
                        <span className="text-neutral-500">{isId ? 'Waktu Pengerjaan' : 'Timeline'}</span>
                        <span className="font-semibold text-white">{tier.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">{isId ? 'Garansi Maintenance' : 'Warranty'}</span>
                        <span className="font-semibold text-white">{tier.warranty}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">{isId ? 'Modul Utama' : 'Modules'}</span>
                        <span className="font-semibold text-white">{tier.modules}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">{isId ? 'Jumlah Layar' : 'Screens'}</span>
                        <span className="font-semibold text-white">{tier.screens}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">{isId ? 'Akses Peran User' : 'Roles'}</span>
                        <span className="font-semibold text-white">{tier.roles}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-500">{isId ? 'Integrasi API' : 'Integrations'}</span>
                        <span className="font-semibold text-white">{tier.integrations}</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-neutral-500">Environment</span>
                        <span className="font-semibold text-white text-right">{tier.environment}</span>
                      </div>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-3.5 mb-8">
                      <div className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
                        {isId ? 'Fitur & Kapabilitas Included:' : 'Included Features & Capabilities:'}
                      </div>
                      {tier.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-sm text-neutral-200 leading-relaxed">
                          <span className="text-purple-400 font-bold text-sm">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                      <div className="text-xs text-neutral-500 pt-1">+ {tier.features.length - 3 + packageCoverage[tierKey].length} detail lainnya</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedTier(tierKey)}
                    className={`w-full text-center py-3.5 rounded-full font-bold text-xs uppercase tracking-wider transition-colors block ${isPopular ? 'bg-purple-600 hover:bg-purple-500 text-white' : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'}`}
                  >
                    {isId ? 'Lihat Detail Paket' : 'View Package Details'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <section className="mb-20 lg:mb-28 grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6">
          <div className="lg:col-span-8 rounded-[1.75rem] border border-white/10 bg-[#090909] p-7 sm:p-10">
            <div className="text-xs font-mono font-bold tracking-[0.2em] text-purple-400 mb-5">SCOPE NOTES / {detailMeta.id}</div>
            <h2 className="text-2xl sm:text-3xl font-black uppercase mb-5">{isId ? 'Yang Perlu Diketahui' : 'What You Need to Know'}</h2>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5 text-sm text-neutral-300 leading-relaxed">
              <div><strong className="block text-white mb-1">{isId ? 'Harga estimasi awal' : 'Initial estimate'}</strong>{isId ? 'Scope final mengikuti discovery, proposal, acceptance criteria, dan kebutuhan integrasi.' : 'Final scope follows discovery, proposal, acceptance criteria, and integration needs.'}</div>
              <div><strong className="block text-white mb-1">{isId ? 'Biaya pihak ketiga' : 'Third-party costs'}</strong>{isId ? 'API, payment gateway, WhatsApp, SMS, maps, AI, dan lisensi dihitung terpisah.' : 'API, gateway, messaging, maps, AI, and licensing costs are separate.'}</div>
              <div><strong className="block text-white mb-1">{isId ? 'Penyerahan source code' : 'Source-code handover'}</strong>{isId ? 'Source code diserahkan setelah pelunasan, selain komponen pihak ketiga berlisensi.' : 'Source code is handed over after final payment, excluding licensed third-party components.'}</div>
              <div><strong className="block text-white mb-1">{isId ? 'Di luar paket dasar' : 'Outside base scope'}</strong>{isId ? 'Mobile native, migrasi data besar, pentest eksternal, dan compliance tidak termasuk kecuali disebutkan.' : 'Native mobile, large migration, external pentest, and compliance are excluded unless specified.'}</div>
            </div>
          </div>

          <aside className="lg:col-span-4 rounded-[1.75rem] border border-white/10 bg-[#0d0a10] p-7 sm:p-10">
            <div className="text-xs font-mono font-bold tracking-[0.2em] text-purple-300 mb-5">{hostingIncluded ? 'DOMAIN + HOSTING INCLUDED' : 'INFRASTRUCTURE'}</div>
            <h3 className="text-xl font-black uppercase mb-4">{hostingIncluded ? (isId ? 'Termasuk Tahun Pertama' : 'Included for Year One') : (isId ? 'Disesuaikan Dengan Beban Sistem' : 'Sized to Your System Load')}</h3>
            {hostingIncluded ? (
              <ul className="space-y-3 text-sm text-neutral-300">
                <li>• Lite: domain .com, shared hosting hingga 2 GB, SSL & backup mingguan.</li>
                <li>• Standard: managed hosting hingga 5 GB, staging, email transactional dasar.</li>
                <li>• Pro: cloud hosting hingga 10 GB, CDN, cache & backup harian.</li>
                <li className="text-neutral-500">Upgrade trafik, storage, bandwidth, domain premium, dan perpanjangan setelah tahun pertama terpisah.</li>
              </ul>
            ) : (
              <p className="text-sm text-neutral-300 leading-relaxed">{isId ? 'Biaya cloud, storage, bandwidth, database terkelola, observability, dan layanan pihak ketiga ditentukan setelah estimasi trafik, volume data, SLA, serta kebutuhan keamanan.' : 'Cloud, storage, bandwidth, managed database, observability, and third-party services are sized after traffic, data volume, SLA, and security assessment.'}</p>
            )}
          </aside>
        </section>

        <section className="pricing-why mb-20 lg:mb-28">
          <div className="pricing-section-heading pricing-section-heading--center"><div><span className="pricing-kicker">WHY HELLENS</span><h2>{isId ? 'Kenapa Bekerja Dengan Kami' : 'Why Work With Us'}</h2></div></div>
          <div className="pricing-why-grid">
            {deliveryPrinciples.map((item) => <article key={item.no}><span>{item.no}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}
          </div>
        </section>

        <section className="pricing-reviews mb-20 lg:mb-28">
          <div className="pricing-section-heading">
            <div><span className="pricing-kicker">CLIENT NOTES</span><h2>{isId ? 'Pengalaman Kolaborasi' : 'Collaboration Experience'}</h2></div>
            <p>{isId ? 'Gambaran hasil yang paling sering dirasakan tim setelah proses dan data mereka disatukan.' : 'Common outcomes teams experience after consolidating their workflows and data.'}</p>
          </div>
          <div className="pricing-review-grid">
            {clientNotes.map((note) => <blockquote key={note.role}><div className="pricing-stars">★★★★★</div><p>“{note.quote}”</p><footer><span>{note.role}</span><small>{note.company}</small></footer></blockquote>)}
          </div>
        </section>

        <section className="pricing-faq mb-20 lg:mb-28">
          <div className="pricing-faq-intro"><span className="pricing-kicker">FAQ / SCOPE</span><h2>{isId ? 'Pertanyaan Sebelum Memulai' : 'Questions Before Starting'}</h2><p>{isId ? 'Jawaban singkat untuk membantu Anda menilai paket dan proses kerja sebelum sesi discovery.' : 'Short answers to help you evaluate the package and process before discovery.'}</p></div>
          <div className="pricing-faq-list">
            {commonQuestions.map(([question, answer], index) => <details key={question} open={index === 0}><summary><span>0{index + 1}. {question}</span><b>+</b></summary><p>{answer}</p></details>)}
          </div>
        </section>

        <section className="pricing-inline-cta mb-20 lg:mb-28">
          <div><span className="pricing-kicker">START A PROJECT</span><h2>{isId ? 'Bawa Proses Bisnis Anda Ke Sistem Yang Lebih Jelas.' : 'Move Your Business Into a Clearer System.'}</h2></div>
          <a href={`https://wa.me/6281234567890?text=${encodeURIComponent(`Halo Hellens Developer, saya ingin membahas layanan ${detailMeta.name}`)}`} target="_blank" rel="noreferrer">{isId ? 'Mulai Discovery' : 'Start Discovery'} <span>↗</span></a>
        </section>

      </div>

      {selectedTier && (() => {
        const tier = serviceData.tiers[selectedTier]
        const badge = tierBadges[selectedTier]
        return (
          <div className="pricing-plan-modal" role="dialog" aria-modal="true" aria-labelledby="plan-modal-title" onMouseDown={() => setSelectedTier(null)}>
            <div className="pricing-plan-modal__panel" onMouseDown={(event) => event.stopPropagation()}>
              <button type="button" className="pricing-plan-modal__close" onClick={() => setSelectedTier(null)} aria-label={isId ? 'Tutup detail paket' : 'Close package details'}>×</button>
              <div className="pricing-plan-modal__header">
                <div>
                  <span className={`inline-flex px-3 py-1 rounded-lg text-xs font-mono font-bold border ${badge.bg}`}>{badge.name}</span>
                  <h2 id="plan-modal-title">{detailMeta.name}</h2>
                  <p>{tier.fit}</p>
                </div>
                <div className="pricing-plan-modal__price"><strong>{tier.price}</strong></div>
              </div>
              <div className="pricing-plan-modal__body">
                <div className="pricing-plan-modal__specs">
                  <h3>{isId ? 'Spesifikasi Paket' : 'Package Specifications'}</h3>
                  <dl>
                    <div><dt>{isId ? 'Waktu pengerjaan' : 'Timeline'}</dt><dd>{tier.time}</dd></div>
                    <div><dt>{isId ? 'Garansi bug' : 'Bug warranty'}</dt><dd>{tier.warranty}</dd></div>
                    <div><dt>{isId ? 'Modul utama' : 'Core modules'}</dt><dd>{tier.modules}</dd></div>
                    <div><dt>{isId ? 'Jumlah layar' : 'Screens'}</dt><dd>{tier.screens}</dd></div>
                    <div><dt>{isId ? 'Akses pengguna' : 'User access'}</dt><dd>{tier.roles}</dd></div>
                    <div><dt>{isId ? 'Integrasi API' : 'API integrations'}</dt><dd>{tier.integrations}</dd></div>
                    <div><dt>Environment</dt><dd>{tier.environment}</dd></div>
                  </dl>
                </div>
                <div className="pricing-plan-modal__coverage">
                  <h3>{isId ? 'Fitur & Cakupan Delivery' : 'Features & Delivery Coverage'}</h3>
                  <ul>
                    {tier.features.map((feature) => <li key={feature}><span>✓</span>{feature}</li>)}
                    {packageCoverage[selectedTier].map((item) => <li key={item}><span>+</span>{item}</li>)}
                  </ul>
                </div>
              </div>
              <div className="pricing-plan-modal__footer">
                <p>{isId ? 'Estimasi final mengikuti discovery dan scope yang disepakati.' : 'Final estimate follows the agreed discovery and scope.'}</p>
                <a href={`https://wa.me/6281234567890?text=Halo%20Hellens%20Developer,%20saya%20ingin%20mengambil%20paket%20${selectedTier.toUpperCase()}%20untuk%20${encodeURIComponent(detailMeta.name)}`} target="_blank" rel="noreferrer">{isId ? `Pilih Paket ${selectedTier.toUpperCase()}` : `Select ${selectedTier.toUpperCase()} Package`} <span>↗</span></a>
              </div>
            </div>
          </div>
        )
      })()}

      <Footer />
    </motion.main>
  )
}

export default PricingServiceDetailPage
