import { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

type ServiceTimelineProps = {
  steps: string[]
  stepLabel: string
  variant: 'website' | 'automation' | 'system' | 'creativity'
}

const stepLayouts = {
  website: ['top', 'bottom', 'top', 'bottom', 'top', 'bottom', 'top', 'bottom'],
  automation: ['top', 'top', 'bottom', 'bottom', 'top', 'bottom', 'bottom', 'top'],
  system: ['bottom', 'top', 'top', 'bottom', 'bottom', 'top', 'bottom', 'top'],
  creativity: ['top', 'bottom', 'bottom', 'top', 'bottom', 'top', 'top', 'bottom'],
} as const

const pathDesigns = {
  website: {
    d: 'M 0 166 C 42 166 58 122 100 122 S 158 192 200 192 S 258 141 300 141 S 358 182 400 182 S 458 112 500 112 S 558 198 600 198 S 658 147 700 147',
    y: [52, 38, 60, 44, 57, 35, 62, 46],
  },
  automation: {
    d: 'M 0 208 H 62 V 132 H 100 H 164 V 76 H 200 H 264 V 188 H 300 H 364 V 112 H 400 H 464 V 226 H 500 H 564 V 148 H 600 H 664 V 92 H 700',
    y: [65, 41, 24, 59, 35, 71, 46, 29],
  },
  system: {
    d: 'M 0 158 L 44 158 L 72 96 L 100 96 L 150 96 L 176 202 L 200 202 L 250 202 L 276 126 L 300 126 L 350 126 L 376 232 L 400 232 L 450 232 L 476 72 L 500 72 L 550 72 L 576 178 L 600 178 L 650 178 L 676 116 L 700 116',
    y: [49, 30, 63, 39, 73, 23, 56, 36],
  },
  creativity: {
    d: 'M 0 220 C 54 220 46 70 100 70 C 154 70 146 184 200 184 C 254 184 246 112 300 112 C 354 112 346 244 400 244 C 454 244 446 88 500 88 C 554 88 546 198 600 198 C 654 198 646 134 700 134',
    y: [69, 22, 58, 35, 76, 28, 62, 42],
  },
} as const

export function ServiceTimeline({ steps, stepLabel, variant }: ServiceTimelineProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const root = rootRef.current
    const section = root?.closest<HTMLElement>('[data-flow-section]')
    const flowRoot = root?.closest<HTMLElement>('[data-flow-root]')
    if (!root || !section || !flowRoot || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = gsap.context(() => {
      const track = root.querySelector<HTMLElement>('[data-service-track]')
      const progress = root.querySelector<SVGPathElement>('[data-service-progress]')
      const motionPoint = root.querySelector<SVGCircleElement>('[data-service-motion-point]')
      const motionPointCore = root.querySelector<SVGCircleElement>('[data-service-motion-point-copy]')
      const items = gsap.utils.toArray<HTMLElement>('[data-service-step]', root)
      const intro = section.querySelector<HTMLElement>('[data-service-intro]')
      const sections = [...flowRoot.querySelectorAll<HTMLElement>('[data-flow-section]')]
      const sectionIndex = Math.max(0, sections.indexOf(section))
      if (!track || !progress || !motionPoint || !motionPointCore || !items.length) return

      const firstStepWidth = items[0]?.offsetWidth ?? 0
      const startX = () => root.clientWidth / 2 - firstStepWidth / 2
      const endX = () => root.clientWidth / 2 - track.scrollWidth + firstStepWidth / 2

      gsap.set(root, { visibility: 'visible', opacity: 1, x: '100vw' })
      gsap.set(track, { x: startX })
      const rail = root.querySelector<HTMLElement>('.service-timeline__rail')
      if (rail) {
        gsap.set(rail, { left: firstStepWidth / 2, width: track.scrollWidth - firstStepWidth })
      }
      gsap.set(items, { opacity: 0.24, y: 12 })
      gsap.set(items[0], { opacity: 1, y: 0 })
      const pathLength = progress.getTotalLength()
      const drawState = { value: 0 }
      const renderPathProgress = () => {
        const travelled = pathLength * drawState.value
        const point = progress.getPointAtLength(travelled)
        progress.style.strokeDasharray = `${pathLength}`
        progress.style.strokeDashoffset = `${pathLength - travelled}`
        motionPoint.setAttribute('cx', `${point.x}`)
        motionPoint.setAttribute('cy', `${point.y}`)
        motionPointCore.setAttribute('cx', `${point.x}`)
        motionPointCore.setAttribute('cy', `${point.y}`)
      }
      renderPathProgress()

      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: flowRoot,
          start: () => {
            const segment = (flowRoot.scrollHeight - window.innerHeight) / sections.length
            const transition = sectionIndex === 0 ? 0 : window.innerHeight * 1.25
            return `top+=${sectionIndex * segment + transition} top`
          },
          end: () => {
            const segment = (flowRoot.scrollHeight - window.innerHeight) / sections.length
            return `top+=${(sectionIndex + 1) * segment} top`
          },
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      })

      if (intro) {
        timeline.to(intro, { x: '-115vw', duration: 1.4 }, 0)
      }
      timeline.to(root, { x: 0, duration: 1.4 }, 0)
      timeline.to(drawState, {
        value: 1,
        duration: steps.length - 1,
        onUpdate: renderPathProgress,
      }, 2.2)
      timeline.to(track, {
        x: endX,
        duration: steps.length - 1,
      }, 2.2)

      items.forEach((item, index) => {
        if (index === 0) return
        timeline.to(items[index - 1], { opacity: 0.42, y: 0, duration: 0.14 }, index + 1.75)
        timeline.to(item, { opacity: 1, y: 0, duration: 0.14 }, index + 1.75)
      })
    }, root)

    return () => context.revert()
  }, [steps])

  return (
    <div ref={rootRef} className={`service-timeline service-timeline--${variant}`} aria-label={stepLabel}>
      <div className="service-timeline__viewport">
        <div className="service-timeline__track" data-service-track>
          <svg className="service-timeline__rail" viewBox="0 0 700 320" preserveAspectRatio="none" aria-hidden="true">
            <path className="service-timeline__rail-base" d={pathDesigns[variant].d} pathLength="1" />
            <path className="service-timeline__rail-progress" d={pathDesigns[variant].d} pathLength="1" data-service-progress />
            <circle className="service-timeline__motion-point-glow" r="4.5" data-service-motion-point />
            <circle className="service-timeline__motion-point-core" r="1.7" data-service-motion-point-copy />
          </svg>
          {steps.map((step, index) => (
            <article
              className={`service-timeline__step is-${stepLayouts[variant][index % stepLayouts[variant].length]}`}
              data-service-step
              key={`${index}-${step}`}
              style={{ '--step-y': pathDesigns[variant].y[index % pathDesigns[variant].y.length] } as React.CSSProperties}
            >
              <span className="service-timeline__number">{String(index + 1).padStart(2, '0')}</span>
              <span className="service-timeline__dot" aria-hidden="true" />
              <p>{step}</p>
            </article>
          ))}
        </div>
      </div>
      <div className="service-timeline__hint" aria-hidden="true">
        <span>{stepLabel} / {String(steps.length).padStart(2, '0')} {steps.length === 1 ? 'STEP' : 'STEPS'}</span>
        <span>SCROLL →</span>
      </div>
    </div>
  )
}
