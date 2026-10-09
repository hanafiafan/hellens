export const navigationLabels = {
  id: {
    home: 'Awal',
    services: 'Layanan',
    work: 'Karya',
    about: 'Tentang',
    articles: 'Artikel',
    more: 'Lainnya',
  },
  en: {
    home: 'Intro',
    services: 'Approach',
    work: 'Works',
    about: 'About',
    articles: 'Articles',
    more: 'More',
  },
} as const

export const navigationItems = [
  { key: 'home', path: '/' },
  { key: 'services', path: '/services' },
  { key: 'work', path: '/work' },
  { key: 'about', path: '/about' },
  { key: 'articles', path: '/articles' },
  { key: 'more', path: '/more' },
] as const
