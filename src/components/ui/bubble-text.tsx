import { useState, type ElementType } from 'react'

type BubbleTextProps = {
  text: string
  as?: ElementType
  className?: string
}

export function BubbleText({ text, as: Tag = 'span', className = '' }: BubbleTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return <Tag
    className={`bubble-text ${className}`.trim()}
    onMouseLeave={() => setHoveredIndex(null)}
  >
    {[...text].map((char, index) => {
      const distance = hoveredIndex === null ? 3 : Math.min(Math.abs(hoveredIndex - index), 3)
      return <span
        key={`${char}-${index}`}
        data-distance={distance}
        onMouseEnter={() => setHoveredIndex(index)}
      >
        {char === ' ' ? '\u00a0' : char}
      </span>
    })}
  </Tag>
}
