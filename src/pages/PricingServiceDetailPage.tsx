import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { pricingServices, type PricingTier } from '../data/pricing'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../hooks/useSeo'
import '../styles/globals.css'
import '../styles/subpages.css'

export const serviceDetailsMap: Record<string, {
  id: string
  name: string
  subtitle: string
  description: string
  image: string
  projectSlug: string
}> = {
  'company-profile': {
    id: '01',
    name: 'COMPANY PROFILE',
    subtitle: 'Website Profesional & Identitas Brand Digital',
    description: 'Website profil perusahaan modern untuk membangun reputasi, memperjelas nilai bisnis, dan mengkonversi pengunjung menjadi prospek potensial.',
    image: '/assets/pricing/company-profile.jpg',
    projectSlug: 'conversion-web',
  },
  'pos': {
    id: '02',
    name: 'POS (POINT OF SALE)',
    subtitle: 'Sistem Kasir & Operasional Ritel Modern',
    description: 'Sistem POS terintegrasi untuk mengelola transaksi kasir, stok barang, multi-outlet, dan laporan keuangan harian secara akurat.',
    image: '/assets/pricing/pos.jpg',
    projectSlug: 'pangeam',
  },
  'ecommerce': {
    id: '03',
    name: 'E-COMMERCE PLATFORM',
    subtitle: 'Toko Online & Sistem Penjualan Digital',
    description: 'Platform e-commerce performa tinggi dengan payment gateway, integrasi kurir, manajemen pesanan, dan sistem promosi otomatis.',
    image: '/assets/pricing/ecommerce.jpg',
    projectSlug: 'pangeam',
  },
  'inventory': {
    id: '04',
    name: 'INVENTORY & WAREHOUSE',
    subtitle: 'Manajemen Stok & Pergudangan Terintegrasi',
    description: 'Sistem pelacakan inventaris, pengolahan persediaan gudang, stok opname, dan arus barang secara real-time.',
    image: '/assets/pricing/inventory.jpg',
    projectSlug: 'globaltrack',
  },
  'pos-inventory': {
    id: '05',
    name: 'POS + INVENTORY HYBRID',
    subtitle: 'Solusi Terpadu Kasir & Stok Multi-Gudang',
    description: 'Kombinasi sempurna antara sistem kasir cepat dan manajemen inventaris lanjutan untuk bisnis berkembang.',
    image: '/assets/pricing/pos-inventory.jpg',
    projectSlug: 'payhoa',
  },
  'accounting': {
    id: '06',
    name: 'ACCOUNTING & FINANCE APP',
    subtitle: 'Sistem Keuangan & Laporan Akuntansi Otomatis',
    description: 'Aplikasi pencatatan arus kas, piutang, perpajakan dasar, jurnal umum, dan laporan laba rugi otomatis.',
    image: '/assets/pricing/accounting.jpg',
    projectSlug: 'metamap',
  },
  'crm': {
    id: '07',
    name: 'CRM (CUSTOMER RELATIONSHIP MANAGEMENT)',
    subtitle: 'Sistem Pelacakan Lead & Automasi Penjualan',
    description: 'Kelola alur penjualan tim, komunikasi pelanggan, reminder WhatsApp, dan analisis performa tim sales.',
    image: '/assets/pricing/crm.jpg',
    projectSlug: 'keyword',
  },
  'hris': {
    id: '08',
    name: 'HRIS / HRM SYSTEM',
    subtitle: 'Manajemen Karyawan, Payroll & Absensi',
    description: 'Platform manajemen SDM komprehensif untuk penggajian (payroll), absensi GPS/shift, pengajuan cuti, dan database karyawan.',
    image: '/assets/pricing/hris.jpg',
    projectSlug: 'lumus-ai',
  },
}

export function PricingServiceDetailPage() {
  const { slug } = useParams()
  const { language } = useLanguage()

  const detailMeta = serviceDetailsMap[slug || ''] || Object.values(serviceDetailsMap).find(s => s.id === slug)
  const serviceData = detailMeta 
    ? pricingServices.find(s => s.id === detailMeta.id || s.name.toUpperCase() === detailMeta.name.toUpperCase())
    : null

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  useSeo(
    detailMeta ? `${detailMeta.name} — Paket & Estimasi Pricing` : 'Detail Layanan — Hellens Developer',
    detailMeta ? detailMeta.description : 'Detail spesifikasi paket layanan Hellens Developer.',
    `https://hellens.dev/pricing/detail/${slug}`,
  )

  if (!detailMeta || !serviceData) {
    return <Navigate to="/pricing" replace />
  }

  const isId = language === 'id'

  const tierKeys: ('lite' | 'standard' | 'pro')[] = ['lite', 'standard', 'pro']
  const tierBadges = {
    lite: { name: 'LITE PACKAGE', bg: 'bg-neutral-900 border-neutral-700 text-neutral-300' },
    standard: { name: 'STANDARD PACKAGE', bg: 'bg-purple-950/80 border-purple-500 text-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.3)]' },
    pro: { name: 'PRO ENTERPRISE', bg: 'bg-gradient-to-r from-purple-900 to-indigo-900 border-purple-400 text-white shadow-[0_0_30px_rgba(168,85,247,0.4)]' },
  }

  return (
    <motion.main 
      className="bg-[#050505] text-[#f7f7f3] min-h-screen selection:bg-purple-500 selection:text-white pt-24 pb-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link to="/pricing" className="hover:text-purple-400 transition-colors flex items-center gap-1">
            <span>←</span>
            <span>{isId ? 'Kembali ke Pricing' : 'Back to Pricing'}</span>
          </Link>
          <span>/</span>
          <span className="text-white font-mono">{detailMeta.name}</span>
        </div>

        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16 bg-neutral-950/60 border border-white/10 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold tracking-widest uppercase">
              SERVICE / {detailMeta.id}
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white tracking-tight leading-none">
              {detailMeta.name}
            </h1>
            <p className="text-purple-300 text-lg sm:text-xl font-semibold">
              {detailMeta.subtitle}
            </p>
            <p className="text-neutral-300 text-base leading-relaxed max-w-2xl">
              {detailMeta.description}
            </p>
            
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <a 
                href="https://wa.me/6281234567890?text=Halo%20Hellens%20Developer,%20saya%20tertarik%20konsultasi%20layanan%20" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                <span>{isId ? 'Konsultasi Layanan Ini' : 'Consult This Service'}</span>
                <span>→</span>
              </a>

              <Link
                to={`/projects/${detailMeta.projectSlug}`}
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-neutral-200 border border-white/15 font-semibold px-5 py-3 rounded-xl transition-colors"
              >
                <span>{isId ? 'Lihat Studi Kasus' : 'View Case Study'}</span>
                <span>↗</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-white/15 shadow-2xl">
            <img 
              src={detailMeta.image} 
              alt={detailMeta.name}
              className="w-full h-[280px] sm:h-[340px] object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-neutral-300 bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
              {isId ? 'Sampel Implementasi Teruji Hellens' : 'Proven Hellens Implementation Sample'}
            </div>
          </div>
        </div>

        {/* PACKAGE TIERS GRID (LITE, STANDARD, PRO) */}
        <div className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white mb-2">
              {isId ? 'Pilihan Paket & Spesifikasi' : 'Package Options & Specifications'}
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base">
              {isId ? 'Pilih tingkat skala sistem yang sesuai dengan fase pertumbuhan bisnis Anda.' : 'Choose the system scale matching your current business growth phase.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {tierKeys.map((tierKey) => {
              const tier: PricingTier = serviceData.tiers[tierKey]
              const badge = tierBadges[tierKey]
              const isPopular = tierKey === 'standard'

              return (
                <div 
                  key={tierKey}
                  className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 border ${
                    isPopular 
                      ? 'bg-neutral-900/90 border-purple-500/60 shadow-[0_0_35px_rgba(168,85,247,0.25)] scale-[1.02]' 
                      : 'bg-neutral-950/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-purple-600 text-white font-mono text-xs font-bold tracking-wider uppercase shadow-md">
                      {isId ? 'PALING POPULER' : 'MOST POPULAR'}
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${badge.bg}`}>
                        {badge.name}
                      </span>
                      <span className="text-xs font-mono text-purple-400 font-bold">
                        GRADE {tier.grade}
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {tier.price}
                      </div>
                      <div className="text-xs text-neutral-400 mt-1 font-medium">
                        {tier.fit}
                      </div>
                    </div>

                    {/* Meta specs */}
                    <div className="space-y-2 py-4 border-y border-white/10 text-xs font-mono text-neutral-300 mb-6">
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
                    </div>

                    {/* Feature list */}
                    <div className="space-y-3 mb-8">
                      <div className="text-xs font-mono uppercase text-purple-400 font-bold tracking-wider">
                        {isId ? 'Fitur & Kapabilitas Included:' : 'Included Features & Capabilities:'}
                      </div>
                      {tier.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                          <span className="text-purple-400 font-bold text-sm">✓</span>
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/6281234567890?text=Halo%20Hellens%20Developer,%20saya%20ingin%20mengambil%20paket%20${tierKey.toUpperCase()}%20untuk%20${encodeURIComponent(detailMeta.name)}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-full text-center py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all block ${
                      isPopular
                        ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg'
                        : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                    }`}
                  >
                    {isId ? `Pilih Paket ${tierKey.toUpperCase()}` : `Select ${tierKey.toUpperCase()} Tier`}
                  </a>
                </div>
              )
            })}
          </div>
        </div>

        {/* BOTTOM CONSULTATION SECTION */}
        <div className="bg-gradient-to-r from-purple-950/60 via-neutral-900/80 to-purple-950/60 border border-purple-500/30 rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto backdrop-blur-md">
          <h3 className="text-2xl sm:text-3xl font-black uppercase text-white mb-3">
            {isId ? 'Membutuhkan Cakupan Kustom Enterprise?' : 'Require Custom Enterprise Architecture?'}
          </h3>
          <p className="text-neutral-300 text-sm sm:text-base max-w-2xl mx-auto mb-6">
            {isId 
              ? 'Kami siap merancang alur sistem, infrastruktur cloud, dan integrasi API khusus yang disesuaikan dengan arsitektur bisnis Anda.'
              : 'We design custom system flows, cloud infrastructure, and API integrations tailored to your specific business architecture.'}
          </p>
          <a
            href="https://wa.me/6281234567890?text=Halo%20Hellens%20Developer,%20saya%20membutuhkan%20diskusi%20arsitektur%20sistem%20kustom"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-[0_0_25px_rgba(168,85,247,0.5)]"
          >
            <span>{isId ? 'Jadwalkan Sesi Arsitektur & Discovery' : 'Schedule Architecture & Discovery Session'}</span>
            <span>→</span>
          </a>
        </div>
      </div>

      <Footer />
    </motion.main>
  )
}

export default PricingServiceDetailPage
