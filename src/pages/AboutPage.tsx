import { motion } from 'motion/react'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../hooks/useSeo'
import '../styles/globals.css'

const aboutContent = {
  id: {
    eyebrow: 'TENTANG HELLENS DEVELOPER',
    title: 'MEMBANGUN PENGALAMAN DIGITAL YANG TUMBUH BERSAMA BISNIS',
    intro: 'Hellens didirikan oleh Hanafi Afan untuk membantu bisnis mengubah kerumitan operasional menjadi website, sistem, dan automasi yang efektif.',
    bio: [
      'Saya Hanafi Afan, developer di balik Hellens yang fokus membangun website cepat, sistem operasional terintegrasi, dan automasi yang bertumbuh bersama kebutuhan bisnis Anda.',
      'Saya memadukan estetika desain modern, arsitektur engineering yang stabil, dan pemahaman mendalam tentang kebutuhan bisnis menjadi solusi digital yang terukur dan mudah dipelihara.',
      'Melalui Hellens, kami bekerja langsung dengan para pemilik bisnis, founder, dan tim operasional dari berbagai industri untuk menyelesaikan masalah nyata.',
      'Sederhana dalam proses, transparan dalam komunikasi, dan selalu berorientasi pada hasil nyata yang berdampak.',
    ],
    valuesTitle: 'PRINSIP KERJA KAMI',
    values: [
      { title: 'Jelas & Terarah', desc: 'Fokus pada hierarki informasi dan alur kerja yang mudah dipahami oleh pengguna maupun tim internal.' },
      { title: 'Performa & Kecepatan', desc: 'Setiap baris kode dan aset dioptimalkan untuk memuat cepat, responsif, dan stabil di berbagai perangkat.' },
      { title: 'Skalabilitas', desc: 'Arsitektur sistem dibangun agar siap berkembang mengikuti pertumbuhan skala bisnis Anda.' },
      { title: 'Dampak Nyata', desc: 'Bukan sekadar visual yang indah, tapi antarmuka yang menghasilkan konversi dan efisiensi operasional.' },
    ],
  },
  en: {
    eyebrow: 'ABOUT HELLENS DEVELOPER',
    title: 'TURNING IDEAS INTO DIGITAL EXPERIENCES THAT GROW WITH BUSINESS',
    intro: 'Hellens was founded by Hanafi Afan to help businesses turn operational complexity into clear, high-performing websites, systems, and automation.',
    bio: [
      'I’m Hanafi Afan, the developer behind Hellens, focusing on building fast websites, integrated operational systems, and automation tailored to your business needs.',
      'I blend modern design aesthetics, stable engineering architecture, and a deep understanding of business goals into clear, scalable, and maintainable digital solutions.',
      'Through Hellens, we work directly with business owners, founders, and operational teams across industries to solve real challenges.',
      'Simple processes, clear communication, and an unwavering focus on meaningful impact.',
    ],
    valuesTitle: 'OUR WORK PRINCIPLES',
    values: [
      { title: 'Clear & Focused', desc: 'Focusing on clean information architecture and intuitive workflows for users and internal teams.' },
      { title: 'Speed & Performance', desc: 'Every line of code and asset is optimized for fast loading, responsiveness, and stability.' },
      { title: 'Built to Scale', desc: 'System architecture is designed to evolve seamlessly as your business grows.' },
      { title: 'Real Impact', desc: 'Beyond beautiful visuals, interfaces designed to drive conversions and operational efficiency.' },
    ],
  },
} as const

export function AboutPage() {
  const { language } = useLanguage()
  const copy = aboutContent[language]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useSeo(
    language === 'id' ? 'Tentang Hanafi Afan & Hellens Developer' : 'About Hanafi Afan & Hellens Developer',
    language === 'id' ? 'Kenali Hanafi Afan, developer di balik Hellens yang membangun website, sistem, dan automasi digital.' : 'Meet Hanafi Afan, developer behind Hellens building websites, systems, and automation.',
    `https://hellens.dev/about${language === 'en' ? '?lang=en' : ''}`,
  )

  const suffix = language === 'en' ? '?lang=en' : ''

  return (
    <motion.main className="subpage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />

      <header className="subpage-hero">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="subpage-eyebrow">
          {copy.eyebrow}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="subpage-title">
          {copy.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="subpage-intro">
          {copy.intro}
        </motion.p>
      </header>

      <section className="about-profile-section">
        <div className="about-profile-image">
          <img src="/about/hanafi-afan-aquarium.webp" alt="Hanafi Afan" />
        </div>

        <div className="about-profile-bio">
          {copy.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
          <div className="about-signature">
            <span>Hanafi Afan</span>
            <small>Founder & Developer, Hellens</small>
          </div>
        </div>
      </section>

      <section className="about-values-section">
        <h2 className="about-values-title">{copy.valuesTitle}</h2>
        <div className="about-values-grid">
          {copy.values.map((val, idx) => (
            <div key={idx} className="about-value-card">
              <span className="value-num">0{idx + 1}</span>
              <h3>{val.title}</h3>
              <p>{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="services-cta">
        <h2>{language === 'id' ? 'Ingin Berkolaborasi Bersama Hellens?' : 'Want to Collaborate with Hellens?'}</h2>
        <p>{language === 'id' ? 'Ceritakan tantangan bisnis Anda dan mari kita bangun solusi digital bersama.' : 'Tell us about your business challenges and let us build digital solutions together.'}</p>
        <a href="https://wa.me/6285155278034" target="_blank" rel="noreferrer" className="cta-button">
          {language === 'id' ? 'Hubungi Hanafi Afan ↗' : 'Contact Hanafi Afan ↗'}
        </a>
      </section>

      <Footer />
    </motion.main>
  )
}
