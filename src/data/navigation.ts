export const navigationLabels = {
  id: {
    home: 'Awal',
    services: 'Layanan',
    work: 'Karya',
    about: 'Tentang',
    more: 'Lainnya',
  },
  en: {
    home: 'Intro',
    services: 'Approach',
    work: 'Works',
    about: 'About',
    more: 'More',
  },
} as const

export const navigationItems = [
  { key: 'home', path: '/' },
  { key: 'services', path: '/services' },
  { key: 'work', path: '/work' },
  { key: 'about', path: '/about' },
  { key: 'more', path: '/more' },
] as const
