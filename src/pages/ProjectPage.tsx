import { useEffect } from 'react'
import { motion } from 'motion/react'
import '../styles/globals.css'
import '../styles/subpages.css'
import { Navigate, Link, useParams } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { projects, t, type Copy } from '../data/content'
import { useLanguage } from '../context/LanguageContext'
import { useSeo } from '../hooks/useSeo'

type VisualReference = { image: string; label: string; source: string }

const behanceLedgr = 'https://www.behance.net/gallery/217370955/Ledgr-FinTech-SaaS-UIUX-Design-Case-Study'
const webflowOpenhub = 'https://webflow.com/made-in-webflow/website/openhub'
const webflowFlowza = 'https://webflow.com/made-in-webflow/website/flowza-template'
const webflowBrainwind = 'https://webflow.com/made-in-webflow/website/brainwind'

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
    { image: '/project-references/crm-openhub.png', label: 'Connected commerce dashboard', source: webflowOpenhub },
    { image: '/project-references/automation-flowza-dashboard.webp', label: 'Operational dashboard pattern', source: webflowFlowza },
    { image: '/project-references/automation-flowza-workflow.webp', label: 'Integrated workflow pattern', source: webflowFlowza },
  ],
  'lumus-ai': [
    { image: '/project-references/ai-brainwind-hero.webp', label: 'AI product experience', source: webflowBrainwind },
    { image: '/project-references/ai-brainwind-chat.webp', label: 'Assisted AI workflow', source: webflowBrainwind },
    { image: '/project-references/ai-brainwind-seo.webp', label: 'AI content automation', source: webflowBrainwind },
  ],
  globaltrack: [
    { image: '/project-references/crm-openhub.png', label: 'Live operations overview', source: webflowOpenhub },
    { image: '/project-references/automation-flowza-dashboard.webp', label: 'Modular data dashboard', source: webflowFlowza },
    { image: '/project-references/automation-flowza-workflow.webp', label: 'Workflow monitoring', source: webflowFlowza },
  ],
  keyword: [
    { image: '/project-references/ai-brainwind-seo.webp', label: 'SEO intelligence interface', source: webflowBrainwind },
    { image: '/project-references/ai-brainwind-hero.webp', label: 'Content performance direction', source: webflowBrainwind },
  ],
  payhoa: [
    { image: '/project-references/automation-flowza-dashboard.webp', label: 'Custom platform dashboard', source: webflowFlowza },
    { image: '/project-references/automation-flowza-workflow.webp', label: 'Product workflow pattern', source: webflowFlowza },
    { image: '/project-references/crm-openhub.png', label: 'Scalable SaaS interface', source: webflowOpenhub },
  ],
  metamap: [
    { image: '/project-references/automation-flowza-workflow.webp', label: 'Connected automation flow', source: webflowFlowza },
    { image: '/project-references/crm-openhub.png', label: 'System integration overview', source: webflowOpenhub },
    { image: '/project-references/automation-flowza-dashboard.webp', label: 'Integration monitoring', source: webflowFlowza },
  ],
}

export function ProjectPage() {
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
    <Navbar />
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
    <Footer />
  </motion.main>
}
