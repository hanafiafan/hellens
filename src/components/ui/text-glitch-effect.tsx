import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

type TextGlitchProps = {
  text: string
  hoverText?: string
  className?: string
  delay?: number
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function TextGlitch({ text, hoverText = text, className = '', delay = 0 }: TextGlitchProps) {
  const rootRef = useRef<HTMLHeadingElement>(null)
  const revealRef = useRef<HTMLSpanElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [revealedText, setRevealedText] = useState(hoverText)

  useEffect(() => {
    if (!rootRef.current) return
    const context = gsap.context(() => {
      gsap.set(rootRef.current, { y: 18, scale: .95, opacity: .7 })
      gsap.timeline({ delay })
        .to(rootRef.current, { opacity: 1, y: 0, scale: 1, duration: .72, ease: 'back.out(1.35)', clearProps: 'transform' })
    }, rootRef)
    return () => context.revert()
  }, [delay])

  const stopScramble = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
  }

  const handleMouseEnter = () => {
    stopScramble()
    let iteration = 0
    intervalRef.current = setInterval(() => {
      setRevealedText([...hoverText].map((letter, index) => {
        if (letter === ' ') return ' '
        return index < iteration ? letter : letters[Math.floor(Math.random() * letters.length)]
      }).join(''))
      if (iteration >= hoverText.length) stopScramble()
      iteration += 1 / 3
    }, 30)
    if (revealRef.current) revealRef.current.style.clipPath = 'inset(0 0 0 0)'
  }

  const handleMouseLeave = () => {
    stopScramble()
    setRevealedText(hoverText)
    if (revealRef.current) revealRef.current.style.clipPath = 'inset(50% 0 50% 0)'
  }

  useEffect(() => () => stopScramble(), [])

  return <h2
    ref={rootRef}
    className={`text-glitch-effect ${className}`.trim()}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    <span className="text-glitch-effect__base">{text}</span>
    <span ref={revealRef} className="text-glitch-effect__reveal" aria-hidden="true">{revealedText}</span>
  </h2>
}
