export type PricingHeroTheme = {
  image: string
  accent: string
  surface: string
  soft: string
  imagePosition?: string
}

const scraped = (slug: string) => `/assets/pricing/hero-web/${slug}.webp`

export const pricingHeroThemes: Record<string, PricingHeroTheme> = {
  'company-profile': { image: scraped('company-profile'), accent: '#ffcc28', surface: '#e7edf7', soft: '#fff7d3' },
  pos: { image: scraped('pos'), accent: '#ff5948', surface: '#f3d84a', soft: '#fff0e9' },
  ecommerce: { image: scraped('ecommerce'), accent: '#ff5ca8', surface: '#ffd7ea', soft: '#fff1f7' },
  logistics: { image: scraped('logistics'), accent: '#ff6d3a', surface: '#bfd9ff', soft: '#edf5ff' },
  erp: { image: scraped('erp'), accent: '#3957ff', surface: '#d9ddff', soft: '#f1f2ff' },
  crm: { image: scraped('crm'), accent: '#ff8650', surface: '#ffe0b7', soft: '#fff6ea' },
  hris: { image: scraped('hris'), accent: '#ed5f92', surface: '#ffd3df', soft: '#fff0f4' },
  lms: { image: scraped('lms'), accent: '#6e5cff', surface: '#d9d4ff', soft: '#f1efff' },
  marketplace: { image: scraped('marketplace'), accent: '#16a575', surface: '#bcebd9', soft: '#edfff8' },
  booking: { image: scraped('booking'), accent: '#ff7759', surface: '#ffdbc9', soft: '#fff3ed' },
  chatbot: { image: scraped('chatbot'), accent: '#3d78ff', surface: '#cbdcff', soft: '#eff4ff' },
  'cms-custom': { image: scraped('cms-custom'), accent: '#ea4c3d', surface: '#f4d69d', soft: '#fff7e8' },
  community: { image: scraped('community'), accent: '#ef4ea8', surface: '#e2c8ff', soft: '#f8eeff' },
  'social-media': { image: scraped('social-media'), accent: '#ff3f7d', surface: '#ffcae0', soft: '#fff0f5' },
  'job-portal': { image: scraped('job-portal'), accent: '#2476ff', surface: '#c9defe', soft: '#eef6ff', imagePosition: 'center top' },
  'real-estate': { image: scraped('real-estate'), accent: '#e34a32', surface: '#edc0a5', soft: '#fff0e8' },
  'food-delivery': { image: scraped('food-delivery'), accent: '#ff5c31', surface: '#ffd149', soft: '#fff6cf' },
  'ride-hailing': { image: scraped('ride-hailing'), accent: '#ff4f91', surface: '#381424', soft: '#ffd7e6', imagePosition: 'center' },
  'project-management': { image: scraped('project-management'), accent: '#ee5e52', surface: '#b8e6db', soft: '#ecfff9' },
  inventory: { image: scraped('inventory'), accent: '#17a878', surface: '#c8e7a2', soft: '#f2ffe6' },
  accounting: { image: scraped('accounting'), accent: '#725cff', surface: '#d8d2ff', soft: '#f2f0ff' },
  healthcare: { image: scraped('healthcare'), accent: '#04a8a4', surface: '#bfe9e6', soft: '#ecfffd' },
  'event-management': { image: scraped('event-management'), accent: '#f04475', surface: '#ffccdc', soft: '#fff0f5' },
  'survey-builder': { image: scraped('survey-builder'), accent: '#7b52ff', surface: '#ddcfff', soft: '#f5efff' },
  'analytics-dashboard': { image: scraped('analytics-dashboard'), accent: '#315cff', surface: '#bdd8ff', soft: '#edf5ff' },
  'payment-wallet': { image: scraped('payment-wallet'), accent: '#d8ff43', surface: '#202919', soft: '#efffc2' },
  rental: { image: scraped('rental'), accent: '#e96b37', surface: '#f2c8a6', soft: '#fff1e6' },
  auction: { image: scraped('auction'), accent: '#ff5549', surface: '#f6c0bc', soft: '#fff0ef' },
  crowdfunding: { image: scraped('crowdfunding'), accent: '#08a66a', surface: '#bde7cc', soft: '#effff4' },
  'news-media': { image: scraped('news-media'), accent: '#ef3e32', surface: '#e8d8ba', soft: '#fff7e8', imagePosition: 'center top' },
  helpdesk: { image: scraped('helpdesk'), accent: '#4874ff', surface: '#c8d5ff', soft: '#f0f3ff' },
  'fleet-management': { image: scraped('fleet-management'), accent: '#ef713f', surface: '#b9d7f3', soft: '#eef8ff', imagePosition: 'center bottom' },
  'school-management': { image: scraped('school-management'), accent: '#ffb629', surface: '#cae3ff', soft: '#fff5d4', imagePosition: 'center top' },
  'pos-inventory': { image: scraped('pos-inventory'), accent: '#ff643e', surface: '#e8e0bb', soft: '#fff9df' },
  'multi-tenant-saas': { image: scraped('multi-tenant-saas'), accent: '#7864ff', surface: '#d8d0ff', soft: '#f3f0ff' },
}
