import { motion } from 'motion/react'
import { useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../hooks/useSeo'
import { services, t } from '../data/content'
import FlowArt, { FlowSection } from '../components/ui/story-scroll'
import { ServiceTimeline } from '../components/ui/service-timeline'
import { GridPulse } from '../components/ui/grid-pulse'
import { ServiceBackdrop, ServiceGlyph, ServiceVisual } from '../components/ui/service-visuals'
import '../styles/globals.css'
import '../styles/subpages.css'

const servicesDetail = [
  {
    slug: 'website',
    title: 'WEBSITE',
    mark: 'WWW',
    color: '#7866ff',
    tagline: {
      id: 'Website Cepat, Jelas & Berdampak',
      en: 'Fast, Focused & High-Impact Websites',
    },
    features: [
      { id: 'Riset tujuan bisnis, audiens, dan kompetitor', en: 'Business, audience, and competitor discovery' },
      { id: 'Strategi konten dan arsitektur informasi', en: 'Content strategy and information architecture' },
      { id: 'Wireframe untuk alur pengguna yang jelas', en: 'Wireframes for a clear user journey' },
      { id: 'Arah visual yang khas dan konsisten', en: 'Distinctive and consistent visual direction' },
      { id: 'Prototipe interaktif sebelum development', en: 'Interactive prototype before development' },
      { id: 'Development responsif dengan teknologi modern', en: 'Responsive build with modern technology' },
      { id: 'QA, aksesibilitas, SEO, dan optimasi performa', en: 'QA, accessibility, SEO, and performance tuning' },
      { id: 'Peluncuran, analitik, dan iterasi berkelanjutan', en: 'Launch, analytics, and continuous iteration' },
    ],
  },
  {
    slug: 'automation',
    title: 'AUTOMATION',
    mark: 'OPS',
    color: '#ff5bbd',
    tagline: {
      id: 'Automasi Alur Kerja & Data Bisnis',
      en: 'Workflow & Business Data Automation',
    },
    features: [
      { id: 'Audit alur kerja dan tugas repetitif', en: 'Workflow and repetitive-task audit' },
      { id: 'Pemetaan data, sumber, dan titik integrasi', en: 'Data, source, and integration mapping' },
      { id: 'Perancangan trigger dan aturan otomatisasi', en: 'Automation trigger and rule design' },
      { id: 'Integrasi API dan sistem pihak ketiga', en: 'API and third-party system integration' },
      { id: 'Validasi data dan logika penanganan error', en: 'Data validation and error-handling logic' },
      { id: 'Otomasi WhatsApp, email, dan notifikasi', en: 'WhatsApp, email, and notification automation' },
      { id: 'Pengujian skenario nyata dari ujung ke ujung', en: 'Real-world end-to-end scenario testing' },
      { id: 'Monitoring, pelaporan, dan penyempurnaan alur', en: 'Monitoring, reporting, and workflow refinement' },
    ],
  },
  {
    slug: 'system',
    title: 'SYSTEM',
    mark: 'SYS',
    color: '#42d6ff',
    tagline: {
      id: 'Sistem Terintegrasi & Dashboard Operasional',
      en: 'Integrated Systems & Operational Dashboards',
    },
    features: [
      { id: 'Analisis kebutuhan dan proses operasional', en: 'Operational process and requirement analysis' },
      { id: 'Arsitektur modular yang siap berkembang', en: 'Modular, growth-ready system architecture' },
      { id: 'Perancangan database dan relasi data', en: 'Database and data-relationship design' },
      { id: 'Hak akses berbasis peran dan keamanan', en: 'Role-based access and security controls' },
      { id: 'Dashboard analitik dan pelaporan real-time', en: 'Real-time analytics and reporting dashboards' },
      { id: 'Integrasi CMS, ERP, CRM, dan layanan eksternal', en: 'CMS, ERP, CRM, and external service integration' },
      { id: 'Pengujian kualitas, keamanan, dan beban', en: 'Quality, security, and load testing' },
      { id: 'Deployment, dokumentasi, dan pengembangan lanjut', en: 'Deployment, documentation, and future evolution' },
    ],
  },
  {
    slug: 'creativity',
    title: 'CREATIVITY',
    mark: 'LAB',
    color: '#ffe05c',
    tagline: {
      id: 'Pengalaman Digital Interaktif & Berkarakter',
      en: 'Distinctive & Interactive Digital Experiences',
    },
    features: [
      { id: 'Eksplorasi konsep dan ide pengalaman utama', en: 'Core experience concept and idea exploration' },
      { id: 'Moodboard, referensi, dan arah artistik', en: 'Moodboard, references, and art direction' },
      { id: 'Storyboarding interaksi dan ritme gerak', en: 'Interaction and motion-rhythm storyboarding' },
      { id: 'Prototipe WebGL, Canvas, atau pengalaman 3D', en: 'WebGL, Canvas, or 3D experience prototyping' },
      { id: 'Sistem motion yang konsisten dan bermakna', en: 'Consistent and purposeful motion system' },
      { id: 'Adaptasi pengalaman untuk seluruh ukuran layar', en: 'Experience adaptation across every screen size' },
      { id: 'Fallback, aksesibilitas, dan optimasi performa', en: 'Fallbacks, accessibility, and performance tuning' },
      { id: 'Polish akhir, pengujian, dan peluncuran', en: 'Final polish, testing, and launch' },
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

  return (
    <motion.main className="subpage services-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />

      <header className="subpage-hero subpage-hero--services">
        <GridPulse cell={26} reach={3} ambient={3} />
        <motion.p data-grid-avoid initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="subpage-eyebrow">
          {language === 'id' ? 'LAYANAN HELLENS' : 'HELLENS SERVICES'}
        </motion.p>
        <motion.h1 data-grid-avoid initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="subpage-title">
          {language === 'id' ? 'LAYANAN KAMI' : 'OUR SERVICES'}
        </motion.h1>
        <motion.p data-grid-avoid initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="subpage-intro">
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
              className={`service-card-detailed service-card--${service.slug}`}
              aria-label={`${index + 1}. ${service.title}`}
              style={{ '--service-color': service.color } as React.CSSProperties}
            >
              <ServiceBackdrop type={service.slug as 'website' | 'automation' | 'system' | 'creativity'} />
              <div className="service-flow__intro" data-service-intro>
                <div className="service-flow__meta">
                  <span>HELLENS® / {language === 'id' ? 'KAPABILITAS' : 'CAPABILITY'} 0{index + 1}</span>
                  <span className="service-flow__mark" aria-hidden="true">
                    <ServiceGlyph type={service.slug as 'website' | 'automation' | 'system' | 'creativity'} />
                    <span><b>{service.mark}</b><small>HD / 26</small></span>
                  </span>
                </div>
                <div className="service-flow__content">
                  <div className="service-flow__headline">
                    <h2 className="service-card-title">{service.title}</h2>
                    <p className="service-tagline">{t(service.tagline, language)}</p>
                  </div>
                  <div className="service-flow__aside">
                    <p className="service-overview">{overview ? t(overview.copy, language) : ''}</p>
                    <ServiceVisual type={service.slug as 'website' | 'automation' | 'system' | 'creativity'} />
                  </div>
                </div>
              </div>
              <ServiceTimeline
                steps={service.features.map((feature) => t(feature, language))}
                stepLabel={language === 'id' ? 'PROSES LAYANAN' : 'SERVICE PROCESS'}
                variant={service.slug as 'website' | 'automation' | 'system' | 'creativity'}
              />
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
