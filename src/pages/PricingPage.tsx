import { motion } from 'motion/react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import DitherHelixCarousel from '../components/ui/DitherHelixCarousel'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../hooks/useSeo'
import { pricingCatalog } from '../data/pricingCatalog'
import '../styles/globals.css'
import '../styles/subpages.css'

export function PricingPage() {
  const { language } = useLanguage()

  useSeo(
    language === 'id' ? 'Paket & Estimasi Harga — Hellens Developer' : 'Packages & Pricing Estimates — Hellens Developer',
    language === 'id' ? 'Eksplorasi estimasi paket Lite, Standard, dan Pro untuk website, e-commerce, POS, ERP, CRM, dan sistem bisnis.' : 'Explore Lite, Standard, and Pro package estimates for website, e-commerce, POS, ERP, CRM, and business systems.',
    `https://hellens.dev/pricing${language === 'en' ? '?lang=en' : ''}`,
  )

  const wheelItems = pricingCatalog.map((item) => ({
    title: item.name,
    image: item.image,
    href: `/pricing/detail/${item.slug}${language === 'en' ? '?lang=en' : ''}`,
  }))

  return (
    <motion.main 
      className="pricing-page pricing-page--helix"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <Navbar />

      <section className="pricing-helix-stage">
        <DitherHelixCarousel items={wheelItems} actionLabel={language === 'id' ? 'Lihat detail layanan' : 'View service details'} />
      </section>

      {/* Footer */}
      <Footer 
        description={language === 'id' ? 'Belum menemukan paket yang sesuai kebutuhan?' : 'Need a completely custom enterprise scope?'} 
        descriptionRight={language === 'id' ? 'Jadwalkan sesi konsultasi dan arsitektur sistem.' : 'Schedule a technical architecture & discovery session.'} 
      />
    </motion.main>
  )
}
