import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ServiceTimelineProps = {
  steps: string[]
  stepLabel: string
}

export function ServiceTimeline({ steps, stepLabel }: ServiceTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const section = root?.closest<HTMLElement>('[data-flow-section]')
    if (!root || !section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      const track = root.querySelector<HTMLElement>('[data-service-track]')
      const progress = root.querySelector<HTMLElement>('[data-service-progress]')
      const items = gsap.utils.toArray<HTMLElement>('[data-service-step]', root)
      if (!track || !progress || !items.length) return

      gsap.set(items, { opacity: 0.3, y: 18 })
      gsap.set(items[0], { opacity: 1, y: 0 })
      gsap.set(progress, { scaleX: 0, transformOrigin: 'left center' })

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      timeline.to(progress, { scaleX: 1, duration: steps.length - 1 }, 0)
      timeline.to(track, {
        x: () => Math.min(0, root.clientWidth - track.scrollWidth),
        duration: steps.length - 1,
      }, 0)

      items.forEach((item, index) => {
        if (index === 0) return
        timeline.to(items[index - 1], { opacity: 0.48, y: 0, duration: 0.28 }, index - 0.28)
        timeline.to(item, { opacity: 1, y: 0, duration: 0.28 }, index - 0.28)
      })
    }, root)

    return () => context.revert()
  }, [steps])

  return (
    <div ref={rootRef} className="service-timeline" aria-label={stepLabel}>
      <div className="service-timeline__viewport">
        <div className="service-timeline__track" data-service-track>
          <div className="service-timeline__rail" aria-hidden="true">
            <span data-service-progress />
          </div>
          {steps.map((step, index) => (
            <article
              className={`service-timeline__step ${index % 2 === 0 ? 'is-top' : 'is-bottom'}`}
              data-service-step
              key={`${index}-${step}`}
            >
              <span className="service-timeline__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="service-timeline__dot" aria-hidden="true" />
              <p>{step}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="service-timeline__hint" aria-hidden="true">
        <span>{stepLabel}</span><span>→</span>
      </div>
    </div>
  )
}
