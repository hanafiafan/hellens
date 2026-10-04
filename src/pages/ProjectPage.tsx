import { useEffect } from 'react'
import { motion } from 'motion/react'
import '../styles/globals.css'
import '../styles/subpages.css'
import { Navigate, Link, useParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { usePageBend } from '../hooks/usePageBend'
import { Footer } from '../components/Footer'
import { projects, t, type Copy } from '../data/content'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../hooks/useSeo'

type VisualReference = { image: string; label: string; source: string }

const behanceLedgr = 'https://www.behance.net/gallery/217370955/Ledgr-FinTech-SaaS-UIUX-Design-Case-Study'
const behanceAiAgent = 'https://www.behance.net/gallery/239196805/Ai-Agent-Automation-Builder-SAAS-UXUI'
const behanceChatbot = 'https://www.behance.net/gallery/225168797/SAAS-Chatbot-Webapp-Design-AI-Assistant-UI-UX-Design'
const behanceLedgerix = 'https://www.behance.net/gallery/232976091/Ledgerix-CRM-FMS-UX-UI-Dashboard-Design'
const behanceFinance = 'https://www.behance.net/gallery/234937291/AI-Finance-Management-SaaS-UX-UI-DashboardDesign'
const behanceLendora = 'https://www.behance.net/gallery/228075345/Lendora-CRM-SaaS-UX-UI-Design-Dashboard'
const behanceWorkflow = 'https://www.behance.net/gallery/242482503/Workflows-Automation-Platform-UIUX-and-Branding-Design'

// Placeholder references from public Behance case studies (credited via the source link) until original work replaces them.
const visualReferences: Record<string, VisualReference[]> = {
  'conversion-web': [
    { image: '/project-references/fintech-ledgr-01.webp', label: 'Fintech product direction', source: behanceLedgr },
    { image: '/project-references/fintech-ledgr-02.webp', label: 'Financial dashboard system', source: behanceLedgr },
    { image: '/project-references/fintech-ledgr-03.webp', label: 'Conversion-focused interface', source: behanceLedgr },
  ],
  okx: [
    { image: '/project-references/fintech-ledgr-01.webp', label: 'Fintech product direction', source: behanceLedgr },
    { image: '/project-references/fintech-ledgr-02.webp', label: 'Financial dashboard system', source: behanceLedgr },
    { image: '/project-references/fintech-ledgr-03.webp', label: 'Conversion-focused interface', source: behanceLedgr },
  ],
  pangeam: [
    { image: '/project-references/dashboard-tablet-finance.webp', label: 'Connected commerce dashboard', source: behanceLedgerix },
    { image: '/project-references/dashboard-laptop-ai-finance.webp', label: 'Operational dashboard pattern', source: behanceFinance },
    { image: '/project-references/dashboard-monitor-crm.webp', label: 'Admin and reporting workspace', source: behanceLendora },
  ],
  'lumus-ai': [
    { image: '/project-references/ai-agent-chatbot-hero.webp', label: 'AI product experience', source: behanceChatbot },
    { image: '/project-references/ai-agent-workflow-laptop.webp', label: 'Assisted AI workflow', source: behanceAiAgent },
    { image: '/project-references/ai-chatbot-interface.webp', label: 'AI content automation', source: behanceChatbot },
  ],
  globaltrack: [
    { image: '/project-references/dashboard-monitor-analytics.webp', label: 'Live operations overview', source: behanceLedgerix },
    { image: '/project-references/dashboard-monitor-crm.webp', label: 'Modular data dashboard', source: behanceLendora },
    { image: '/project-references/dashboard-laptop-ai-finance.webp', label: 'Workflow monitoring', source: behanceFinance },
  ],
  keyword: [
    { image: '/project-references/dashboard-monitor-crm.webp', label: 'SEO intelligence interface', source: behanceLendora },
    { image: '/project-references/dashboard-monitor-analytics.webp', label: 'Content performance direction', source: behanceLedgerix },
  ],
  payhoa: [
    { image: '/project-references/dashboard-laptop-ai-finance.webp', label: 'Custom platform dashboard', source: behanceFinance },
    { image: '/project-references/dashboard-tablet-finance.webp', label: 'Product workflow pattern', source: behanceLedgerix },
    { image: '/project-references/automation-templates-laptop.webp', label: 'Scalable SaaS interface', source: behanceWorkflow },
  ],
  metamap: [
    { image: '/project-references/automation-workflow-tablet.webp', label: 'Connected automation flow', source: behanceWorkflow },
    { image: '/project-references/automation-templates-laptop.webp', label: 'System integration overview', source: behanceWorkflow },
    { image: '/project-references/automation-mobile-flow.webp', label: 'Integration monitoring', source: behanceWorkflow },
  ],
}

export function ProjectPage() {
  usePageBend()
  const { slug } = useParams()
  const { language } = useLanguage()

  if (slug === 'okx') {
    return <Navigate to={`/projects/conversion-web${language === 'en' ? '?lang=en' : ''}`} replace />
  }

  const project = projects.find((item) => item.slug === slug)

  useEffect(() => {
    window.scrollTo(0, 0)
    let script: HTMLScriptElement | null = null
    if (!document.querySelector('script[src="/experience/page-transition.js"]')) {
      script = document.createElement('script')
      script.type = 'module'
      script.src = '/experience/page-transition.js'
      document.body.appendChild(script)
    }
    return () => {
      if (script) script.remove()
    }
  }, [slug])

  useSeo(project ? `${project.title} — Hellens Developer` : 'Hellens Developer', project ? t(project.summary, language) : 'Hellens Developer', project ? `https://hellens.dev/projects/${project.slug}${language === 'en' ? '?lang=en' : ''}` : 'https://hellens.dev/')
  if (!project) return <Navigate to="/" replace />

  const imgPrefix = project.imagePrefix || project.slug

  const phases: [string, Copy, string, string][] = language === 'id' ? [
    ['Discovery & Direction', project.challenge, 'Kami memetakan konteks bisnis, pengguna, proses berjalan, dan hambatan utama agar ruang lingkup tetap fokus.', 'Audit pengalaman, arsitektur informasi, prioritas fitur, dan alur utama disusun menjadi arah bersama.'],
    ['Experience & System', { id: 'Strategi harus diterjemahkan menjadi pengalaman yang jelas dan konsisten.', en: '' }, 'Kami membuat alternatif alur dan prototipe, menguji hierarki informasi, lalu memperbaiki interaksi.', 'Sistem komponen modular menjaga desain dan implementasi tetap selaras.'],
    ['Build, Test & Evolve', { id: 'Produk baru bernilai ketika implementasinya stabil dan mudah dipelihara.', en: '' }, 'Kami membangun, melakukan QA lintas layar, memeriksa performa, aksesibilitas, dan edge case.', 'Produk siap digunakan sebagai sistem terukur yang dapat terus berkembang.'],
  ] : [
    ['Discovery & Direction', project.challenge, 'We mapped the business context, users, current processes, and primary obstacles to keep the scope focused.', 'Experience audits, information architecture, feature priorities, and key flows created shared direction.'],
    ['Experience & System', { id: '', en: 'Strategy must become a clear and consistent experience.' }, 'We explored alternative flows and prototypes, tested information hierarchy, and refined interactions.', 'A modular component system kept design and implementation aligned.'],
    ['Build, Test & Evolve', { id: '', en: 'A product creates value when implementation is stable and maintainable.' }, 'We built and ran QA across screen sizes, performance, accessibility, and edge cases.', 'The product became a measurable system ready to evolve.'],
  ]
  const next = projects[(projects.indexOf(project) + 1) % projects.length]
  const references = visualReferences[project.slug] ?? []
  const projectImages = Array.from({ length: project.count }, (_, index) => `/work/${imgPrefix}-${String(index + 1).padStart(2, '0')}-1600.avif`)
  const galleryImages = projectImages.slice(1)
  const imagesPerPhase = Math.max(1, Math.ceil(galleryImages.length / phases.length))
  const phaseImages = phases.map((_, phaseIndex) => galleryImages.slice(phaseIndex * imagesPerPhase, (phaseIndex + 1) * imagesPerPhase))

  const handleNextClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const origin = { x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight }
    const suffix = language === 'en' ? '?lang=en' : ''
    const href = `/projects/${next.slug}${suffix}`
    if (typeof window.HellensNavigate === 'function') {
      window.HellensNavigate(href, { mode: 1, origin, duration: 1050 })
    } else {
      sessionStorage.setItem('hellens-transition', JSON.stringify({ mode: 1, origin, duration: 1050 }))
      window.location.assign(href)
    }
  }

  return <motion.main className="case-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <Navbar switcher={{ index: String(projects.indexOf(project) + 1).padStart(2, '0'), label: project.title, items: projects.map((item) => ({ key: item.slug, label: item.title, to: `/projects/${item.slug}`, active: item === project })) }} />
    <div className="page-bend">
    <header className="case-hero">
      <div className="case-hero__eyebrow"><span>HELLENS® / {String(projects.indexOf(project) + 1).padStart(2, '0')}</span><span>CASE STUDY · 2026</span></div>
      <div className="case-hero__title"><h1>{project.title}</h1><p>{t(project.lead, language)}</p></div>
      <div className="case-hero__intro"><p>{t(project.summary, language)}</p><dl><div><dt>{language === 'id' ? 'PERAN KAMI' : 'OUR ROLE'}</dt><dd>Strategy, Design & Development</dd></div><div><dt>{language === 'id' ? 'LAYANAN' : 'SERVICES'}</dt><dd>{project.services}</dd></div><div><dt>TIMELINE</dt><dd>2026</dd></div></dl></div>
    </header>
    <figure className="case-cover"><img src={projectImages[0]} alt={project.title} /><figcaption><span>{project.title}</span><span>{project.services}</span></figcaption></figure>
    <section className="case-overview"><div className="case-section-heading"><span>01</span><h2>{language === 'id' ? 'GAMBARAN PROYEK' : 'PROJECT OVERVIEW'}</h2></div><article><h3>{language === 'id' ? 'Tantangan' : 'Challenge'}</h3><p>{t(project.challenge, language)}</p></article><article><h3>{language === 'id' ? 'Solusi' : 'Solution'}</h3><p>{t(project.solution, language)}</p></article></section>
    <section className="case-references">
      <div className="case-references__head"><span>02</span><h2>{language === 'id' ? 'REFERENSI VISUAL' : 'VISUAL REFERENCES'}</h2><p>{language === 'id' ? 'Referensi terkurasi untuk memetakan kualitas visual, pola interaksi, dan arah antarmuka—bukan karya yang diklaim sebagai hasil proyek Hellens.' : 'Curated references used to frame visual quality, interaction patterns, and interface direction—not work claimed as a Hellens project deliverable.'}</p></div>
      <div className="case-references__grid">{references.map((reference) => <figure key={reference.image}><img src={reference.image} alt={reference.label} loading="lazy" /><figcaption><span>{reference.label}</span><a href={reference.source} target="_blank" rel="noreferrer">{language === 'id' ? 'Lihat sumber' : 'View source'} ↗</a></figcaption></figure>)}</div>
    </section>
    {phases.map((phase, index) => <section className="case-phase" key={phase[0]}><div className="case-section-heading"><span>0{index + 3}</span><h2>{phase[0]}</h2></div><div className="case-phase__copy"><article><h3>{language === 'id' ? 'Masalah' : 'Problem'}</h3><p>{t(phase[1], language)}</p></article><article><h3>{language === 'id' ? 'Yang kami lakukan' : 'What we did'}</h3><p>{phase[2]}</p></article><article><h3>{language === 'id' ? 'Pekerjaan' : 'Work'}</h3><p>{phase[3]}</p></article><article><h3>{language === 'id' ? 'Hasil' : 'Outcome'}</h3><p>{t(project.solution, language)}</p></article></div>{phaseImages[index].length > 0 && <div className={`case-gallery case-gallery--${phaseImages[index].length}`}>{phaseImages[index].map((image, imageIndex) => <figure key={image}><img src={image} alt={`${project.title} — ${phase[0]} ${imageIndex + 1}`} loading="lazy" /><figcaption>{String(index * imagesPerPhase + imageIndex + 1).padStart(2, '0')} / {phase[0]}</figcaption></figure>)}</div>}</section>)}
    <Link className="next-case" to={`/projects/${next.slug}`} onClick={handleNextClick}><small>{language === 'id' ? 'Studi kasus berikutnya' : 'Next case study'}</small><strong>{next.title}</strong><span>→</span></Link>
    </div>
    <Footer />
  </motion.main>
}
