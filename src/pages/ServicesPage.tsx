import { motion } from 'motion/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../hooks/useSeo'
import { services, t } from '../data/content'
import FlowArt, { FlowSection } from '../components/ui/story-scroll'
import '../styles/globals.css'
import '../styles/subpages.css'

const servicesDetail = [
  {
    slug: 'website',
    title: 'WEBSITE',
    icon: '🌐',
    color: '#7866ff',
    tagline: {
      id: 'Website Cepat, Jelas & Berdampak',
      en: 'Fast, Focused & High-Impact Websites',
    },
    features: [
      { id: 'Desain kustom sesuai identitas brand', en: 'Custom design tailored to brand identity' },
      { id: 'Optimasi performa & kecepatan muat tinggi', en: 'Performance optimization & sub-second loading' },
      { id: 'Hierarki informasi berorientasi konversi', en: 'Conversion-focused information architecture' },
      { id: 'Responsif sempurna di layar seluler & desktop', en: 'Seamless responsive layout across mobile & desktop' },
    ],
  },
  {
    slug: 'automation',
    title: 'AUTOMATION',
    icon: '⚡',
    color: '#ff5bbd',
    tagline: {
      id: 'Automasi Alur Kerja & Data Bisnis',
      en: 'Workflow & Business Data Automation',
    },
    features: [
      { id: 'Integrasi sistem & API pihak ketiga', en: 'System & 3rd-party API integrations' },
      { id: 'Workflow WhatsApp, Email & Notifikasi otomatis', en: 'Automated WhatsApp, Email & Notification workflows' },
      { id: 'Pemrosesan data otomatis tanpa input manual', en: 'Automated data processing eliminating manual input' },
      { id: 'Sinkronisasi real-time antar sistem operasional', en: 'Real-time synchronization across operational tools' },
    ],
  },
  {
    slug: 'system',
    title: 'SYSTEM',
    icon: '📊',
    color: '#42d6ff',
    tagline: {
      id: 'Sistem Terintegrasi & Dashboard Operasional',
      en: 'Integrated Systems & Operational Dashboards',
    },
    features: [
      { id: 'Dashboard data & analitik real-time', en: 'Real-time data & analytics dashboards' },
      { id: 'Sistem manajemen konten & operasional (CMS/ERP)', en: 'Content & operational management systems (CMS/ERP)' },
      { id: 'Arsitektur modular yang stabil dan scalable', en: 'Stable, modular & highly scalable architecture' },
      { id: 'Manajemen hak akses & keamanan data terjamin', en: 'Role-based access control & secure data storage' },
    ],
  },
  {
    slug: 'creativity',
    title: 'CREATIVITY',
    icon: '🎨',
    color: '#ffe05c',
    tagline: {
      id: 'Pengalaman Digital Interaktif & Berkarakter',
      en: 'Distinctive & Interactive Digital Experiences',
    },
    features: [
      { id: 'Interaksi & animasi 3D WebGL / Canvas halus', en: 'Smooth WebGL / Canvas 3D interactions & motion' },
      { id: 'Arah visual khas yang memikat pengunjung', en: 'Distinctive visual direction that wows visitors' },
      { id: 'Pola antarmuka modern (UI/UX) berstandar tinggi', en: 'State-of-the-art modern UI/UX design patterns' },
      { id: 'Pengalaman unik yang memperkuat nilai brand', en: 'Memorable experience that amplifies brand authority' },
    ],
  },
]

export function ServicesPage() {
  const { language } = useLanguage()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useSeo(
    language === 'id' ? 'Layanan — Hellens Developer' : 'Services — Hellens Developer',
    language === 'id' ? 'Layanan pengembangan website, automasi bisnis, sistem terintegrasi, dan pengalaman digital interaktif.' : 'Website development, business automation, integrated systems, and interactive digital experiences.',
    `https://hellens.dev/services${language === 'en' ? '?lang=en' : ''}`,
  )

  const suffix = language === 'en' ? '?lang=en' : ''

  return (
    <motion.main className="subpage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />

      <header className="subpage-hero">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="subpage-eyebrow">
          {language === 'id' ? 'LAYANAN HELLENS' : 'HELLENS SERVICES'}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="subpage-title">
          {language === 'id' ? 'LAYANAN KAMI' : 'OUR SERVICES'}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="subpage-intro">
          {language === 'id'
            ? 'Membangun solusi digital yang jelas, terukur, dan dirancang khusus untuk mendukung pertumbuhan bisnis Anda.'
            : 'Building clear, measurable, and custom digital solutions designed to scale your business.'}
        </motion.p>
      </header>

      <FlowArt className="services-grid-container services-flow services-flow--full" aria-label={language === 'id' ? 'Rangkaian layanan Hellens' : 'Hellens services story'}>
        {servicesDetail.map((service, index) => {
          const overview = services.find((s) => s.title === service.title)
          return (
            <FlowSection
              key={service.slug}
              className="service-card-detailed"
              aria-label={`${index + 1}. ${service.title}`}
              style={{ '--service-color': service.color } as React.CSSProperties}
            >
              <div className="service-flow__meta"><span>0{index + 1} — {language === 'id' ? 'LAYANAN' : 'SERVICE'}</span><span>{service.icon}</span></div>
              <div className="service-flow__content">
                <div className="service-flow__headline">
                  <h2 className="service-card-title">{service.title}</h2>
                  <p className="service-tagline">{t(service.tagline, language)}</p>
                </div>
                <p className="service-overview">{overview ? t(overview.copy, language) : ''}</p>
              </div>
              <ul className="service-feature-list">
                {service.features.map((feature, fIdx) => <li key={fIdx}><span className="feature-check">0{fIdx + 1}</span><span>{t(feature, language)}</span></li>)}
              </ul>
            </FlowSection>
          )
        })}
      </FlowArt>

      <Footer
        description={language === 'id' ? 'Ceritakan kebutuhan bisnis Anda.' : 'Tell us what your business needs.'}
        descriptionRight={language === 'id' ? 'Kami akan membantu menyusun arah, sistem, dan pengalaman digital yang tepat.' : 'We will help shape the right direction, system, and digital experience.'}
      />
    </motion.main>
  )
}
