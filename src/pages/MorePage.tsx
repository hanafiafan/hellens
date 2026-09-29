import { motion } from 'motion/react'
import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { TextGlitch } from '../components/ui/text-glitch-effect'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../hooks/useSeo'
import '../styles/globals.css'
import '../styles/subpages.css'

const content = {
  id: {
    eyebrow: 'JELAJAHI HELLENS',
    title: 'LEBIH BANYAK',
    intro: 'Pilih bagian yang ingin Anda jelajahi.',
    links: [
      ['LAYANAN', 'TEMUKAN', 'Website, automasi, dan sistem digital.', '/services'],
      ['KARYA', 'JELAJAHI', 'Proyek terpilih dan studi kasus.', '/work'],
      ['TENTANG', 'KENALI', 'Kenali Hanafi Afan dan Hellens.', '/about'],
      ['MULAI PROYEK', 'MULAI', 'Ceritakan kebutuhan bisnis Anda.', 'https://wa.me/6285155278034'],
    ],
  },
  en: {
    eyebrow: 'EXPLORE HELLENS',
    title: 'DISCOVER MORE',
    intro: 'Choose where you would like to go next.',
    links: [
      ['SERVICES', 'DISCOVER', 'Websites, automation, and digital systems.', '/services'],
      ['WORK', 'EXPLORE', 'Selected projects and case studies.', '/work'],
      ['ABOUT', 'HELLO', 'Meet Hanafi Afan and Hellens.', '/about'],
      ['START A PROJECT', 'START', 'Tell us what your business needs.', 'https://wa.me/6285155278034'],
    ],
  },
} as const

export function MorePage() {
  const { language } = useLanguage()
  const copy = content[language]
  useSeo(
    language === 'id' ? 'Jelajahi Hellens Developer' : 'Explore Hellens Developer',
    language === 'id' ? 'Layanan, karya, profil, dan kontak Hellens Developer.' : 'Services, work, profile, and contact information for Hellens Developer.',
    `https://hellens.dev/more${language === 'en' ? '?lang=en' : ''}`,
  )
  useLayoutEffect(() => {
    history.scrollRestoration = 'manual'
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
    const frame = requestAnimationFrame(() => window.scrollTo(0, 0))
    return () => cancelAnimationFrame(frame)
  }, [])

  const suffix = language === 'en' ? '?lang=en' : ''

  return <motion.main className="more-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Navbar />
    <header className="more-page__hero">
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>{copy.eyebrow}</motion.p>
      <h1 className="more-page__title">{copy.title}</h1>
      <p>{copy.intro}</p>
    </header>
    <nav className="more-page__links" aria-label={copy.title}>
      {copy.links.map(([label, hoverLabel, description, href], index) => {
        const inner = <>
          <span className="more-page__index">0{index + 1}</span>
          <TextGlitch text={label} hoverText={hoverLabel} className="more-page__link-title" delay={.08 + index * .08} />
          <span className="more-page__description">{description}</span>
          <span className="more-page__arrow">↗</span>
        </>
        const isExternal = href.startsWith('http')
        const targetUrl = isExternal ? href : `${href}${suffix}`

        return isExternal
          ? <motion.a key={label} href={targetUrl} target="_blank" rel="noreferrer" initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 + index * .08 }}>{inner}</motion.a>
          : <motion.div key={label} initial={{ opacity: 0, y: 35 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16 + index * .08 }}>
              <Link to={targetUrl}>{inner}</Link>
            </motion.div>
      })}
    </nav>
  </motion.main>
}
