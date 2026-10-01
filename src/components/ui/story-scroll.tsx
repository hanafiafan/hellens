import { Children, type CSSProperties, type ReactNode, useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type FlowArtProps = {
  children: ReactNode
  className?: string
  'aria-label'?: string
}

type FlowSectionProps = {
  children: ReactNode
  className?: string
  style?: CSSProperties
  'aria-label'?: string
}

export function FlowSection({ children, className = '', style, 'aria-label': ariaLabel }: FlowSectionProps) {
  return (
    <section className={`flow-section ${className}`} data-flow-section aria-label={ariaLabel}>
      <div className="flow-section__inner" data-flow-inner style={style}>
        {children}
      </div>
    </section>
  )
}

export default function FlowArt({ children, className = '', 'aria-label': ariaLabel = 'Story cards' }: FlowArtProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const count = Children.count(children)

  useLayoutEffect(() => {
    const root = rootRef.current
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>('[data-flow-section]', root)
      const scrollLength = Math.max(1, root.scrollHeight - window.innerHeight)
      const segment = scrollLength / sections.length

      sections.forEach((section, index) => {
        const inner = section.querySelector<HTMLElement>('[data-flow-inner]')
        if (!inner) return

        gsap.set(section, { zIndex: index + 1 })

        gsap.set(section, { zIndex: index + 1, visibility: index === 0 ? 'visible' : 'hidden' })

        if (index > 0) {
          gsap.fromTo(
            inner,
            { yPercent: 102, rotation: 30, scale: 1, transformOrigin: '0% 100%' },
            {
              yPercent: 0,
              rotation: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: () => `top+=${index * segment + window.innerHeight * 0.18} top`,
                end: () => `top+=${index * segment + window.innerHeight * 0.9} top`,
                scrub: 0.85,
                onEnter: () => gsap.set(section, { visibility: 'visible' }),
                onLeaveBack: () => gsap.set(section, { visibility: 'hidden' }),
              },
            },
          )
        }
      })

      ScrollTrigger.refresh()
    }, root)

    return () => context.revert()
  }, [count])

  return (
    <div
      ref={rootRef}
      className={`flow-art ${className}`}
      data-flow-root
      style={{ '--flow-count': count } as CSSProperties}
      aria-label={ariaLabel}
    >
      <div className="flow-art__stage">{children}</div>
    </div>
  )
}
