import { useEffect, useMemo } from 'react'
import referenceDocument from '../templates-reference.html?raw'
import { useLanguage } from '../context/LanguageContext'
import { navigationLabels } from '../data/navigation'
import '../styles/legacy-overrides.css'

const copy = {
  id: {
    nav: [navigationLabels.id.home, navigationLabels.id.services, navigationLabels.id.work, navigationLabels.id.about],
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
    outro: ['Mari bangun', 'hal besar berikutnya'], more: navigationLabels.id.more,
  },
  en: {
    nav: [navigationLabels.en.home, navigationLabels.en.services, navigationLabels.en.work, navigationLabels.en.about],
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
    outro: ["Let’s build", 'the next big thing'], more: navigationLabels.en.more,
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
  outroLines[0].textContent = text.outro[0]
  if (language === 'id') {
    outroLines[1].innerHTML = 'HAL BESAR<br>BERIKUTNYA'
  } else {
    outroLines[1].innerHTML = 'THE NEXT<br>BIG THING'
  }
  one('.outro__title')!.setAttribute('aria-label', text.outro.join(' '))
  one('.section.outro')?.setAttribute('id', 'contact')
  const social = one<HTMLAnchorElement>('.outro__social')
  if (social) { social.href = 'https://wa.me/6285155278034'; social.setAttribute('aria-label', 'WhatsApp'); social.querySelector('.outro__roll')!.textContent = 'WhatsApp ↗' }
  return document.body.innerHTML
}

export function LegacyHomePage() {
  const { language } = useLanguage()
  const markup = useMemo(() => createMarkup(language), [language])
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    window.scrollTo(0, 0)
    document.body.classList.add('legacy-experience', 'is-loading')
    document.body.dataset.story = 'listening-first'
    const stylesheet = document.createElement('link'); stylesheet.rel = 'stylesheet'; stylesheet.href = '/experience/main.css'; document.head.appendChild(stylesheet)
    const loadedScripts: HTMLScriptElement[] = []
    let cancelled = false
    const projectAliases: Record<string, string> = {
      'conversion web': 'conversion-web',
      conversion: 'conversion-web',
      okx: 'conversion-web',
      'commerce system': 'pangeam',
      pangeam: 'pangeam',
      'ai automation': 'lumus-ai',
      lumus: 'lumus-ai',
      'business ops': 'globaltrack',
      globaltrack: 'globaltrack',
      'seo & analytics': 'keyword',
      keyword: 'keyword',
      'custom platform': 'payhoa',
      payhoa: 'payhoa',
      'system integration': 'metamap',
      metamap: 'metamap',
    }
    const projectSlugFor = (item: Element) => {
      const title = item.querySelector('.work__name')?.textContent?.trim().toLowerCase() || ''
      return Object.entries(projectAliases).find(([name]) => title.includes(name))?.[1]
    }
    const syncProjectLinks = () => {
      document.querySelectorAll('.work__item').forEach((item) => {
        const slug = projectSlugFor(item)
        if (!slug) return
        const suffix = language === 'en' ? '?lang=en' : ''
        const nameLink = item.querySelector<HTMLAnchorElement>('.work__name-link')
        if (nameLink) {
          nameLink.href = `/projects/${slug}${suffix}`
          nameLink.setAttribute('aria-label', `${nameLink.textContent?.trim() || 'Project'} — ${language === 'id' ? 'lihat studi kasus' : 'view case study'}`)
        }
        const links = item.querySelector('.work__links')
        links?.querySelectorAll('.work__link').forEach((link) => link.remove())
        if (links && !links.querySelector('.work__detail-link')) {
          const detailLink = document.createElement('a')
          detailLink.className = 'work__detail-link'
          detailLink.href = `/projects/${slug}${suffix}`
          detailLink.textContent = language === 'id' ? 'Lihat Detail Proyek' : 'View Case Study'
          detailLink.insertAdjacentHTML('beforeend', '<span aria-hidden="true">↗</span>')
          links.prepend(detailLink)
        }
        item.setAttribute('data-project-href', `/projects/${slug}${suffix}`)
      })
    }
    const workObserver = new MutationObserver(syncProjectLinks)
    const workRoot = document.querySelector('.section--work')
    if (workRoot) workObserver.observe(workRoot, { childList: true, subtree: true })
    const openProject = (event: MouseEvent) => {
      const target = event.target as Element | null
      const item = target?.closest('.work__item')
      if (!item) return
      const slug = projectSlugFor(item)
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
    const scrollToHash = () => {
      const hash = window.location.hash
      if (!hash) return
      const id = hash.replace(/^#/, '')
      const target = document.getElementById(id) || document.querySelector(hash)
      if (!target) return
      document.body.classList.remove('is-loading')
      if (typeof (window as any).ScrollTrigger?.refresh === 'function') {
        (window as any).ScrollTrigger.refresh()
      }
      if (typeof (window as any).HellensScrollToElement === 'function') {
        (window as any).HellensScrollToElement(target)
      } else if ((window as any).lenis && typeof (window as any).lenis.scrollTo === 'function') {
        (window as any).lenis.scrollTo(target, { immediate: false, duration: 1.2 })
      } else {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
    window.addEventListener('hashchange', scrollToHash)
    const load = async () => {
      for (const source of ['/assets/main-DOEoZWF8.js', '/experience/page-transition.js']) {
        if (cancelled) return
        await new Promise<void>((resolve, reject) => {
          const script = document.createElement('script'); script.type = 'module'; script.src = source
          script.onload = () => resolve(); script.onerror = () => reject(new Error(`Failed to load ${source}`))
          document.body.appendChild(script); loadedScripts.push(script)
        })
      }
      setTimeout(() => {
        syncProjectLinks()
        document.body.classList.remove('is-loading')
      }, 300)
      if (window.location.hash) {
        setTimeout(scrollToHash, 250)
        setTimeout(scrollToHash, 650)
        setTimeout(scrollToHash, 1200)
      }
    }
    void load()
    return () => { cancelled = true; workObserver.disconnect(); window.removeEventListener('hashchange', scrollToHash); document.removeEventListener('click', openProject, true); document.removeEventListener('click', openMore); loadedScripts.forEach(script => script.remove()); stylesheet.remove(); document.body.classList.remove('legacy-experience', 'is-loading', 'no-webgl'); document.querySelector('.dome-grid')?.remove(); delete document.body.dataset.story }
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
