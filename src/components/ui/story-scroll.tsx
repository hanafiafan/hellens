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

      sections.forEach((section, index) => {
        const inner = section.querySelector<HTMLElement>('[data-flow-inner]')
        if (!inner) return

        gsap.set(section, { zIndex: index + 1 })

        if (index > 0) {
          gsap.fromTo(
            inner,
            { rotation: 30, transformOrigin: '0% 100%' },
            {
              rotation: 0,
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top bottom',
                end: 'top 25%',
                scrub: true,
              },
            },
          )
        }

        if (index < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom top',
            pin: inner,
            pinSpacing: false,
          })
        }
      })

      ScrollTrigger.refresh()
    }, root)

    return () => context.revert()
  }, [count])

  return <div ref={rootRef} className={`flow-art ${className}`} aria-label={ariaLabel}>{children}</div>
}
