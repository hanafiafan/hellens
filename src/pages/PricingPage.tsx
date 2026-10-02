import { useMemo, useState } from 'react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
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
  const [query, setQuery] = useState('')

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

  const searchResults = useMemo(() => {
    const keyword = query.trim().toLocaleLowerCase(language === 'id' ? 'id-ID' : 'en-US')
    if (!keyword) return []

    return pricingCatalog
      .filter((item) => [item.name, item.subtitle, item.description, item.tier]
        .some((value) => value.toLocaleLowerCase(language === 'id' ? 'id-ID' : 'en-US').includes(keyword)))
      .slice(0, 6)
  }, [language, query])

  const detailSuffix = language === 'en' ? '?lang=en' : ''

  return (
    <motion.main 
      className="pricing-page pricing-page--helix"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
    >
      <Navbar />

      <div className="pricing-service-search">
        <label htmlFor="pricing-service-query">
          {language === 'id' ? 'Cari layanan' : 'Find a service'}
        </label>
        <div className="pricing-service-search__field">
          <span aria-hidden="true">⌕</span>
          <input
            id="pricing-service-query"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={language === 'id' ? 'Contoh: CRM, toko online, kasir…' : 'Try: CRM, online store, POS…'}
            autoComplete="off"
            aria-controls="pricing-search-results"
            aria-expanded={query.trim().length > 0}
          />
          {query && <button type="button" onClick={() => setQuery('')} aria-label={language === 'id' ? 'Hapus pencarian' : 'Clear search'}>×</button>}
        </div>

        {query.trim() && (
          <div id="pricing-search-results" className="pricing-service-search__results" role="listbox">
            {searchResults.length > 0 ? searchResults.map((item) => (
              <Link key={item.slug} to={`/pricing/detail/${item.slug}${detailSuffix}`} role="option">
                <span>{item.id}</span>
                <strong>{item.name}</strong>
                <small>{item.subtitle}</small>
                <i aria-hidden="true">↗</i>
              </Link>
            )) : (
              <p>{language === 'id' ? 'Layanan belum ditemukan. Coba kata kunci lain.' : 'No service found. Try another keyword.'}</p>
            )}
          </div>
        )}
      </div>

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
