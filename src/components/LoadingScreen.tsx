import { useEffect, useRef, useState } from 'react'

const MIN_DURATION = 2600
const EXIT_DURATION = 1400
const PATHS = [
  'M676.65,0l62.13,87s18.82,17.34,0,45.83S576.86,365.33,576.86,365.33L511,272s-9.41-10.950,0-27.61S676.65,0,676.65,0Z',
  'M169.86,148.38l62.13,87s18.830,17.34,0,45.83S70.08,513.71,70.08,513.71L4.18,420.4s-9.41-10.950,0-27.61S169.86,148.38,169.86,148.38Z',
  'M279.06,0l79.87,112.29s9.41,12.65,28.24,12.65l158.15,1.58-69.66,99.63s-11.3,11.080-26.36,11.080H315s-22,0-33.25-15.82-69.66-101.22-69.66-101.22-7.53-11.070,1.88-26.88S279.06,0,279.06,0Z',
  'M475.48,506.08,395.61,393.79s-9.41-12.65-28.24-12.65l-158.14-1.58,69.66-99.63s11.29-11.070,26.35-11.070H439.56s21.950,0,33.240,15.81,69.66,101.22,69.66,101.22S550,397,540.58,412.77,475.48,506.08,475.48,506.08Z',
]

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const bar = useRef<HTMLDivElement>(null)
  const count = useRef<HTMLDivElement>(null)

  useEffect(() => {
    document.documentElement.classList.add('is-loading')
    // On the landing page also wait until the hero animations have initialised (8s safety cap).
    const needsHome = location.pathname === '/'
    let pageLoaded = document.readyState === 'complete'
    let homeReady = !needsHome || !!(window as any).__hellensHomeReady
    let loaded = pageLoaded && homeReady
    const check = () => { loaded = pageLoaded && homeReady }
    const onLoad = () => { pageLoaded = true; check() }
    const onHome = () => { homeReady = true; check() }
    if (!pageLoaded) addEventListener('load', onLoad, { once: true })
    if (!homeReady) addEventListener('hellens:home-ready', onHome, { once: true })
    const cap = window.setTimeout(() => { pageLoaded = homeReady = true; check() }, 8000)
    const t0 = performance.now()
    let progress = 0
    let frame = 0
    let timer = 0
    const render = (p: number) => {
      if (bar.current) bar.current.style.transform = `scaleX(${p / 100})`
      if (count.current) count.current.textContent = String(Math.round(p)).padStart(3, '0')
    }
    const tick = (now: number) => {
      const elapsed = now - t0
      // merayap ke 90% sampai halaman selesai dimuat
      const target = loaded ? 100 : 90 * (1 - Math.exp(-elapsed / 1200))
      progress += (target - progress) * (loaded ? 0.12 : 0.08)
      render(progress)
      if (loaded && progress > 99.5 && elapsed >= MIN_DURATION) {
        render(100)
        setLeaving(true)
        timer = window.setTimeout(onComplete, EXIT_DURATION)
        return
      }
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timer)
      removeEventListener('load', onLoad)
      removeEventListener('hellens:home-ready', onHome)
      clearTimeout(cap)
      document.documentElement.classList.remove('is-loading')
    }
  }, [onComplete])

  return (
    <div className={`preloader${leaving ? ' is-leaving' : ''}`} role="status" aria-live="polite" aria-label="Memuat halaman">
      <div className="preloader__stack">
        <svg className="preloader__logo" viewBox="0 0 747.14 513.71" aria-hidden="true">
          {PATHS.map((d, i) => <path key={i} className={`p${i + 1}`} pathLength={1} d={d} />)}
        </svg>
        <div className="preloader__meter">
          <div className="preloader__track"><div className="preloader__bar" ref={bar} /></div>
          <div className="preloader__count" ref={count}>000</div>
        </div>
      </div>
    </div>
  )
}
