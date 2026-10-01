import { type ComponentPropsWithoutRef, useEffect, useRef } from 'react'

type GridPulseProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'> & {
  cell?: number
  reach?: number
  ambient?: number
  maxLit?: number
  avoid?: string
}

type Cell = {
  col: number
  row: number
  colour: string
  dim: number
  born: number
  until: number
}

const TINTS = [72, 65, 58, 51, 44]
const FADE_IN = 160
const FADE_OUT = 750

export function GridPulse({
  cell = 24,
  reach = 2.8,
  ambient = 3,
  maxLit = 180,
  avoid = '[data-grid-avoid]',
  className = '',
  style,
  ...props
}: GridPulseProps) {
  const boxRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const box = boxRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!box || !canvas || !context || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let width = 0
    let height = 0
    let columns = 1
    let rows = 1
    let frame = 0
    let pending = 0
    let beat = 0
    let visible = true
    let pointer: { x: number; y: number } | null = null
    let clearAreas: DOMRect[] = []
    const cells = new Map<string, Cell>()

    const measureText = () => {
      const bounds = box.getBoundingClientRect()
      const scope = box.parentElement ?? document
      clearAreas = [...scope.querySelectorAll(avoid)].flatMap((node) => {
        const range = document.createRange()
        range.selectNodeContents(node)
        const lines = [...range.getClientRects()].filter((rect) => rect.width > 0 && rect.height > 0)
        return (lines.length ? lines : [node.getBoundingClientRect()]).map(
          (rect) => new DOMRect(rect.left - bounds.left - 5, rect.top - bounds.top - 5, rect.width + 10, rect.height + 10),
        )
      })
    }

    const brightness = (col: number, row: number) => {
      const x = col * cell + cell / 2
      const y = row * cell + cell / 2
      let nearest = Number.POSITIVE_INFINITY
      clearAreas.forEach((rect) => {
        const dx = Math.max(rect.left - x, 0, x - rect.right)
        const dy = Math.max(rect.top - y, 0, y - rect.bottom)
        nearest = Math.min(nearest, Math.hypot(dx, dy))
      })
      if (!Number.isFinite(nearest)) return 1
      return 0.11 + 0.89 * Math.min(1, nearest / (2.4 * cell))
    }

    const colour = (row: number) => {
      const progress = rows > 1 ? row / (rows - 1) : 0
      const hue = ((262 + progress * 128) % 360 + 360) % 360
      const tint = TINTS[Math.floor(Math.random() * TINTS.length)]
      return `hsl(${Math.round(hue)} 94% ${tint}%)`
    }

    const draw = (now: number) => {
      frame = 0
      context.clearRect(0, 0, width, height)
      cells.forEach((item, key) => {
        let alpha = 1
        if (now < item.until) alpha = 1 - (1 - Math.min(1, (now - item.born) / FADE_IN)) ** 2
        else {
          const progress = (now - item.until) / FADE_OUT
          if (progress >= 1) {
            cells.delete(key)
            return
          }
          alpha = 1 - progress * progress
        }
        context.globalAlpha = alpha * item.dim
        context.fillStyle = item.colour
        context.fillRect(item.col * cell + 1, item.row * cell + 1, cell - 1, cell - 1)
      })
      context.globalAlpha = 1
      if (cells.size) frame = requestAnimationFrame(draw)
    }

    const wake = () => {
      if (!frame) frame = requestAnimationFrame(draw)
    }

    const light = (col: number, row: number, hold: number) => {
      if (col < 0 || row < 0 || col >= columns || row >= rows || cells.size >= maxLit) return
      const key = `${col},${row}`
      const now = performance.now()
      const previous = cells.get(key)
      if (previous && now < previous.until) return
      cells.set(key, {
        col,
        row,
        colour: previous?.colour ?? colour(row),
        dim: brightness(col, row),
        born: now,
        until: now + hold,
      })
      wake()
    }

    const paint = () => {
      pending = 0
      if (!pointer) return
      const cx = Math.floor(pointer.x / cell)
      const cy = Math.floor(pointer.y / cell)
      const span = Math.ceil(reach)
      for (let y = -span; y <= span; y += 1) {
        for (let x = -span; x <= span; x += 1) {
          const distance = Math.hypot(x, y)
          if (distance <= reach && Math.random() <= 1 - distance / (reach + 0.6)) {
            light(cx + x, cy + y, 260 + Math.random() * 900)
          }
        }
      }
    }

    const onMove = (event: PointerEvent) => {
      const bounds = box.getBoundingClientRect()
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top }
      if (!pending) pending = requestAnimationFrame(paint)
    }

    const drift = () => {
      beat = window.setTimeout(drift, 1400 + Math.random() * 1700)
      if (!visible || document.hidden) return
      for (let index = 0; index < ambient; index += 1) {
        light(Math.floor(Math.random() * columns), Math.floor(Math.random() * rows), 900 + Math.random() * 1500)
      }
    }

    const measure = () => {
      width = box.clientWidth
      height = box.clientHeight
      columns = Math.max(1, Math.ceil(width / cell))
      rows = Math.max(1, Math.ceil(height / cell))
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      measureText()
      wake()
    }

    const resizeObserver = new ResizeObserver(measure)
    const intersectionObserver = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? true })
    resizeObserver.observe(box)
    intersectionObserver.observe(box)
    document.fonts?.ready.then(measureText).catch(() => undefined)
    window.addEventListener('pointermove', onMove, { passive: true })
    measure()
    beat = window.setTimeout(drift, 450)

    return () => {
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      cancelAnimationFrame(frame)
      cancelAnimationFrame(pending)
      clearTimeout(beat)
      window.removeEventListener('pointermove', onMove)
    }
  }, [ambient, avoid, cell, maxLit, reach])

  return (
    <div
      ref={boxRef}
      aria-hidden="true"
      className={`grid-pulse ${className}`}
      style={{ '--grid-pulse-cell': `${cell}px`, ...style } as React.CSSProperties}
      {...props}
    >
      <canvas ref={canvasRef} />
    </div>
  )
}
