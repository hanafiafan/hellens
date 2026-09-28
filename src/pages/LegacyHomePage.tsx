import { useEffect, useMemo } from 'react'
import referenceDocument from '../templates-reference.html?raw'
import { useLanguage } from '../context/LanguageContext'
import '../styles/legacy-overrides.css'

const copy = {
  id: {
    nav: ['Awal', 'Layanan', 'Karya', 'Tentang'],
    eyebrow: 'Website, Automasi & Sistem',
    lede: 'Dipercaya oleh 20+ bisnis 🤝<br>untuk membangun website yang menghasilkan 🌐,<br>dashboard yang memperjelas data 📊,<br>dan automasi yang bertumbuh ⚡',
    featured: 'PROYEK PILIHAN',
    notes: [
      'Membangun website yang cepat, jelas, dan dirancang untuk mengubah pengunjung menjadi pelanggan.',
      'Menghubungkan sistem, data, dan alur kerja agar proses bisnis berjalan otomatis, cepat, dan konsisten.',
      'Membangun sistem yang terintegrasi, stabil, dan mudah dikembangkan untuk mendukung operasional bisnis.',
      'Menggabungkan ide, visual, dan teknologi untuk menciptakan pengalaman digital yang berkarakter dan berkesan.',
    ],
    about: 'Mengubah ide menjadi pengalaman digital yang tumbuh bersama bisnis',
    paragraphs: [
      'Saya Hanafi Afan, developer di balik Hellens yang membangun website, sistem, dan automasi untuk membantu bisnis bekerja lebih efektif.',
      'Saya memadukan desain, engineering, dan kebutuhan bisnis menjadi solusi digital yang jelas, terukur, dan mudah dikembangkan.',
      'Melalui Hellens, saya bekerja bersama bisnis dari berbagai sektor untuk mengubah tantangan operasional menjadi produk yang benar-benar terpakai.',
      'Sederhana dalam proses, jelas dalam komunikasi, dan selalu berorientasi pada dampak nyata.',
    ],
    outro: ['Mari bangun', 'hal besar berikutnya'], more: 'Lainnya',
  },
  en: {
    nav: ['Intro', 'Approach', 'Works', 'About'],
    eyebrow: 'Websites, Automation & Systems',
    lede: 'Trusted by 20+ businesses 🤝<br>to build websites that convert 🌐,<br>dashboards that clarify 📊,<br>and automation that scales ⚡',
    featured: 'FEATURED PROJECTS',
    notes: [
      'Building fast, focused websites designed to turn visitors into customers.',
      'Connecting systems, data, and workflows so business processes run automatically, quickly, and consistently.',
      'Building integrated, stable, and scalable systems that support day-to-day business operations.',
      'Combining ideas, visuals, and technology to create distinctive and memorable digital experiences.',
    ],
    about: 'Turning ideas into digital experiences that grow with the business',
    paragraphs: [
      'I’m Hanafi Afan, the developer behind Hellens, building websites, systems, and automation that help businesses work more effectively.',
      'I bring design, engineering, and business needs together into digital solutions that are clear, measurable, and ready to evolve.',
      'Through Hellens, I work with businesses across different sectors to turn operational challenges into products people actually use.',
      'Simple processes, clear communication, and an unwavering focus on meaningful impact.',
    ],
    outro: ["Let’s build", 'the next big thing'], more: 'More',
  },
} as const

function createMarkup(language: 'id' | 'en') {
  const document = new DOMParser().parseFromString(referenceDocument, 'text/html')
  const text = copy[language]
  const one = <T extends Element>(selector: string) => document.querySelector<T>(selector)
  const all = <T extends Element>(selector: string) => [...document.querySelectorAll<T>(selector)]
  const logo = one<HTMLImageElement>('.hero__logo img')
  if (logo) { logo.src = '/brand/hellens-mark.png'; logo.alt = 'Hellens Developer' }
  one('.hero__logo')?.setAttribute('aria-label', 'Hellens Developer — home')
  all<HTMLAnchorElement>('.hero__nav a').forEach((item, index) => { item.textContent = text.nav[index] })
  const nav = one('.hero__nav')
  if (nav) {
    const moreButton = document.createElement('button')
    moreButton.type = 'button'
    moreButton.className = 'hero__more'
    moreButton.textContent = text.more
    moreButton.setAttribute('aria-haspopup', 'dialog')
    moreButton.setAttribute('aria-expanded', 'false')
    nav.appendChild(moreButton)
  }
  one('.hero__eyebrow')!.textContent = text.eyebrow
  one('.headline-text')!.textContent = 'HELLENS DEVELOPER'
  one('.hero__where')!.textContent = ''
  one('.fallback__line')!.textContent = language === 'id' ? 'Gulir untuk melihat karya.' : 'Scroll on for the work.'
  one('.section--lede h2')!.innerHTML = text.lede
  const titles = ['WEBSITE', 'AUTOMATION', 'SYSTEM', 'CREATIVITY']
  const titleSelectors = ['.focus__title', '.listening__title', '.craft__title', '.validation__title']
  const noteSelectors = ['.story__note--focus', '.story__note--listening', '.story__note--craft', '.story__note--validation']
  titleSelectors.forEach((selector, index) => { one(selector)!.textContent = titles[index] })
  noteSelectors.forEach((selector, index) => { one(selector)!.textContent = text.notes[index] })
  one('.featured__title')!.textContent = text.featured
  one('.about__title')!.textContent = text.about
  all('.about__copy [data-highlight-text] p').forEach((paragraph, index) => { paragraph.textContent = text.paragraphs[index] })
  one('.about__sign')!.textContent = 'Hanafi Afan'
  one('.about__sign')!.setAttribute('aria-label', 'Hanafi Afan')
  all<HTMLAnchorElement>('a[href="mailto:iamvisp@gmail.com"]').forEach(link => { link.href = 'mailto:hellensdev@gmail.com'; link.dataset.copyEmail = 'hellensdev@gmail.com' })
  all('[data-copy-email-element]').forEach(element => { element.textContent = 'hellensdev@gmail.com' })
  const outroLines = all('.outro__title span')
  outroLines[0].textContent = text.outro[0]; outroLines[1].textContent = text.outro[1]
  one('.outro__title')!.setAttribute('aria-label', text.outro.join(' '))
  const social = one<HTMLAnchorElement>('.outro__social')
  if (social) { social.href = 'https://wa.me/6285155278034'; social.setAttribute('aria-label', 'WhatsApp'); social.querySelector('.outro__roll')!.textContent = 'WhatsApp ↗' }
  return document.body.innerHTML
}

export function LegacyHomePage() {
  const { language } = useLanguage()
  const markup = useMemo(() => createMarkup(language), [language])
  useEffect(() => {
    document.body.classList.add('legacy-experience', 'is-loading')
    document.body.dataset.story = 'listening-first'
    const stylesheet = document.createElement('link'); stylesheet.rel = 'stylesheet'; stylesheet.href = '/experience/main.css'; document.head.appendChild(stylesheet)
    const loadedScripts: HTMLScriptElement[] = []
    let cancelled = false
    const openProject = (event: MouseEvent) => {
      const target = event.target as Element | null
      const item = target?.closest('.work__item')
      if (!item) return
      const link = target?.closest('a')
      if (link && (link.classList.contains('work__link') || link.target === '_blank' || (link.href && link.href.includes('wa.me')))) {
        return
      }
      const title = item.querySelector('.work__name')?.textContent?.trim().toLowerCase() || ''
      const aliases: Record<string, string> = { okx: 'okx', pangeam: 'pangeam', metamap: 'metamap', globaltrack: 'globaltrack', keyword: 'keyword', payhoa: 'payhoa', lumus: 'lumus-ai' }
      const slug = Object.entries(aliases).find(([name]) => title.includes(name))?.[1]
      if (!slug) return
      event.preventDefault(); event.stopImmediatePropagation()
      const suffix = language === 'en' ? '?lang=en' : ''
      const href = `/projects/${slug}${suffix}`
      const origin = { x: event.clientX / window.innerWidth, y: event.clientY / window.innerHeight }
      if (typeof window.HellensNavigate === 'function') {
        window.HellensNavigate(href, { mode: 1, origin, duration: 1050 })
      } else {
        sessionStorage.setItem('hellens-transition', JSON.stringify({ mode: 1, origin, duration: 1050 }))
        window.location.assign(href)
      }
    }
    const openMore = (event: Event) => {
      const target = event.target as Element | null
      if (!target?.closest('.hero__more')) return
      event.preventDefault(); event.stopPropagation()
      const suffix = language === 'en' ? '?lang=en' : ''
      window.location.assign(`/more${suffix}`)
    }
    document.addEventListener('click', openProject, true)
    document.addEventListener('click', openMore)
    const load = async () => {
      for (const source of ['/experience/main-DOEoZWF8.js', '/experience/page-transition.js']) {
        if (cancelled) return
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script'); script.type = 'module'; script.src = source
          script.onload = () => resolve(); script.onerror = () => reject(new Error(`Failed to load ${source}`))
          document.body.appendChild(script); loadedScripts.push(script)
        })
      }
    }
    void load()
    return () => { cancelled = true; document.removeEventListener('click', openProject, true); document.removeEventListener('click', openMore); loadedScripts.forEach(script => script.remove()); stylesheet.remove(); document.body.classList.remove('legacy-experience', 'is-loading'); delete document.body.dataset.story }
  }, [markup])
  const switchLanguage = (next: 'id' | 'en') => {
    if (next === language) return
    localStorage.setItem('hellens-language', next)
    const url = new URL(window.location.href)
    next === 'en' ? url.searchParams.set('lang', 'en') : url.searchParams.delete('lang')
    url.hash = ''
    window.location.assign(url)
  }
  return <>
    <div className="legacy-root" dangerouslySetInnerHTML={{ __html: markup }} />
    <div className="hellens-controls" aria-label="Site controls">
      <button type="button" onClick={() => switchLanguage('id')} aria-pressed={language === 'id'}>ID</button>
      <button type="button" onClick={() => switchLanguage('en')} aria-pressed={language === 'en'}>EN</button>
    </div>
  </>
}
