import { motion } from 'motion/react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../hooks/useSeo'
import { projects, t } from '../data/content'
import '../styles/globals.css'
import '../styles/subpages.css'

export function WorkPage() {
  const { language } = useLanguage()
  const [activeCategory, setActiveCategory] = useState<string>('all')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useSeo(
    language === 'id' ? 'Karya & Proyek — Hellens Developer' : 'Work & Projects — Hellens Developer',
    language === 'id' ? 'Portofolio proyek pilihan, sistem digital, automasi, dan studi kasus Hellens Developer.' : 'Selected portfolio of projects, digital systems, automation, and case studies by Hellens Developer.',
    `https://hellens.dev/work${language === 'en' ? '?lang=en' : ''}`,
  )

  const suffix = language === 'en' ? '?lang=en' : ''

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.services.toLowerCase().includes(activeCategory.toLowerCase()))

  return (
    <motion.main className="subpage" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <Navbar />

      <header className="subpage-hero">
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="subpage-eyebrow">
          {language === 'id' ? 'KARYA TERPILIH' : 'SELECTED WORK'}
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="subpage-title">
          {language === 'id' ? 'PORTOFOLIO PROYEK' : 'PROJECT PORTFOLIO'}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }} className="subpage-intro">
          {language === 'id'
            ? 'Studi kasus nyata bagaimana kami memadukan strategi, desain antarmuka, dan sistem engineering menjadi produk yang terpakai.'
            : 'Real case studies of how we combine strategy, interface design, and systems engineering into usable products.'}
        </motion.p>
      </header>

      <div className="work-filter-bar">
        <button
          type="button"
          className={activeCategory === 'all' ? 'is-active' : ''}
          onClick={() => setActiveCategory('all')}
        >
          {language === 'id' ? 'Semua Proyek' : 'All Projects'}
        </button>
        <button
          type="button"
          className={activeCategory === 'website' ? 'is-active' : ''}
          onClick={() => setActiveCategory('website')}
        >
          Website
        </button>
        <button
          type="button"
          className={activeCategory === 'automation' ? 'is-active' : ''}
          onClick={() => setActiveCategory('automation')}
        >
          {language === 'id' ? 'Automasi' : 'Automation'}
        </button>
        <button
          type="button"
          className={activeCategory === 'dashboard' ? 'is-active' : ''}
          onClick={() => setActiveCategory('dashboard')}
        >
          {language === 'id' ? 'Sistem & Dashboard' : 'System & Dashboard'}
        </button>
      </div>

      <section className="work-projects-grid">
        {filteredProjects.map((project, index) => {
          const imgPrefix = project.imagePrefix || project.slug
          return (
            <motion.article
              key={project.slug}
              className="work-project-card"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + index * 0.08 }}
            >
              <Link to={`/projects/${project.slug}${suffix}`} className="work-project-cover">
                <img
                  src={`/work/${imgPrefix}-01-1600.avif`}
                  alt={project.title}
                  loading="lazy"
                />
                <span className="work-project-tag">{project.services}</span>
              </Link>
              <div className="work-project-info">
                <h3>
                  <Link to={`/projects/${project.slug}${suffix}`}>
                    {project.title} ↗
                  </Link>
                </h3>
                <p className="work-project-lead">{t(project.lead, language)}</p>
                <p className="work-project-summary">{t(project.summary, language)}</p>
                <Link to={`/projects/${project.slug}${suffix}`} className="work-project-link">
                  {language === 'id' ? 'Lihat Studi Kasus ↗' : 'View Case Study ↗'}
                </Link>
              </div>
            </motion.article>
          )
        })}
      </section>

      <Footer />
    </motion.main>
  )
}
