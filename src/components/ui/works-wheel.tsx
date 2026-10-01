"use client";

// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
  /** Optional project code or tagline */
  code?: string;
  /** Optional caption/description */
  caption?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default undefined */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
  /** Active item index callback */
  onActiveChange?: (index: number) => void;
  /** Controlled active index */
  activeIndex?: number;
}

/* Geometry. The card is measured against the stage; tuned so the full ring
   fits 100% within the viewport height without clipping top or bottom. */
const CARD_H = 0.26; // front card height, of the stage
const CARD_MAX_W = 0.25; // ... but never wider than this much of the stage
const CARD_RATIO = 1.45; // card width / height
const STEP = 40; // degrees between cards on the drum
const DRUM = 2.22; // drum radius, in card heights - and everything below likewise
const LENS = 2.7; // perspective distance
const RING_R = 1.14; // ring radius
/* The drum alone hangs the work on a plumb line. It isn't one: the strip curves
   away round an arc whose centre sits off to the LEFT, so the piece at the front
   is at the arc's near point - dead centre - and its neighbours have already
   swung back left as well as up and down. BOW is that arc's radius; nothing else
   makes the difference between a stack of cards and a wheel seen side on. */
const BOW = 1.82;
const TITLE = 0.20; // ring label and front-card title font scale
const INDEX = 0.08; // index list font scale
/** Items either side of the front still worth drawing. Past this a card is
    edge-on, and further round it would stack up on the vanishing point. */
const CULL = 1.6;

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 140;
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. The bow is applied
    first, in the wheel's own plane, so it slides the card sideways rather than
    turning with it - and perspective still shrinks it with distance. */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label = "PAKET & HARGA",
  action = "Lihat Detail",
  className,
  onActiveChange,
  activeIndex,
  ...props
}: WorksWheelProps) {
  const navigate = useNavigate();
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  // The wheel's position, and where it is heading. Only `active` is state -
  // everything else is written to the DOM, so turning the wheel is not a render.
  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(activeIndex ?? 0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  // Read after mount, not during render: the server has no matchMedia, and
  // branching on it inline is a hydration mismatch. Reduced motion drops the
  // easing, so the wheel lands where it is put instead of gliding there.
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * CARD_MAX_W);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;
    const ringR = cardH * RING_R;
    // Shrink the ring's cards until the circle reads as a closed loop rather
    // than beads on a wire, however many pieces the wheel is given.
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
      title: cardH * TITLE,
      index: cardH * INDEX,
    };
  }, [stage, count]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  React.useEffect(() => {
    if (typeof activeIndex === "number" && activeIndex >= 0 && activeIndex <= last) {
      if (target.current > 0) {
        to(activeIndex + 1);
      }
    }
  }, [activeIndex, last, to]);

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      // The drum is pulled back so its front face lands on the picture plane.
      // That set-back has to arrive with the drum, or the ring would sit at the
      // far side of the perspective and render at half its size.
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          // Culled by distance, not by angle: at a full turn the far side comes
          // back round to face us, and everything past the neighbours lands on
          // the vanishing point in a heap.
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => {
        if (prev !== near) {
          onActiveChange?.(near);
          return near;
        }
        return prev;
      });
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced, onActiveChange]);

  // Native listener, because the wheel has to be cancellable - and it only
  // cancels while it still has somewhere to go, so the page scrolls on at
  // either end instead of trapping the reader.
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      // A wheel gesture arrives as a burst of events with no end of its own, so
      // the rest position is whatever notch it happened to stop on. Left there
      // the drum sits between two cards - nothing at the front, and the pair
      // either side of the gap both turned half away. Settle onto an item.
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const drag = React.useRef<number | null>(null);
  const pointerStart = React.useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const settling = React.useRef(0);

  const goToProject = (href?: string) => {
    if (!href) return;
    const initialPath = window.location.pathname;
    try {
      navigate(href);
    } catch (_) {}
    setTimeout(() => {
      if (window.location.pathname === initialPath) {
        window.location.href = href;
      }
    }, 50);
  };

  const handleCardClick = (i: number, href?: string, e?: React.SyntheticEvent) => {
    if (e && 'clientX' in e && (e as React.MouseEvent).clientX !== undefined) {
      const me = e as React.MouseEvent;
      const dist = Math.hypot(me.clientX - pointerStart.current.x, me.clientY - pointerStart.current.y);
      if (dist > 20) return; // user intended to drag/scroll
    }
    if (i === active) {
      goToProject(href);
    } else {
      to(i + 1);
    }
  };

  return (
    <section
      aria-label={label}
      className={cn(
        "bg-background text-foreground relative h-full min-h-[24rem] w-full overflow-hidden select-none",
        className,
      )}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-foreground absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          pointerStart.current = { x: event.clientX, y: event.clientY };
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const dy = drag.current - event.clientY;
          to(target.current + dy / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-[calc(50%+28px)] left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <React.Fragment key={item.title}>
                <div
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={isActive}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  onClick={(e) => {
                    handleCardClick(i, item.href, e);
                  }}
                  className={cn(
                    "group absolute [backface-visibility:hidden] cursor-pointer",
                    isActive ? "z-30" : "z-10"
                  )}
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  <span className="bg-muted shadow-foreground/12 relative block size-full overflow-hidden rounded-xl shadow-[0_18px_40px_-18px_var(--tw-shadow-color)] border border-white/15 group-hover:border-purple-400/50 transition-colors">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover pointer-events-none"
                    />
                    {action && item.href ? (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          goToProject(item.href);
                        }}
                        className={cn(
                          "pointer-events-auto absolute right-3 bottom-3 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold transition-all shadow-lg border cursor-pointer z-50",
                          isActive
                            ? "bg-purple-600 hover:bg-purple-500 text-white border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.5)] translate-y-0 opacity-100 scale-100"
                            : "bg-black/85 text-white border-white/15 opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0"
                        )}
                      >
                        <svg
                          viewBox="0 0 12 12"
                          className="size-3"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.6"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </button>
                    ) : null}
                  </span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Ring title at rest: Perfectly sized to fit inside ring without touching cards */}
      <div
        ref={labelRef}
        className="pointer-events-none absolute top-[calc(50%+28px)] left-1/2 -translate-x-1/2 -translate-y-1/2 tracking-wider font-black uppercase text-white drop-shadow-[0_8px_24px_rgba(0,0,0,0.95)] text-center w-full max-w-[220px] sm:max-w-[300px] leading-tight px-2"
        style={{ fontSize: Math.max(metrics.title * 0.85, 22), fontFamily: 'Arges, system-ui, sans-serif' }}
      >
        <span className="bg-gradient-to-r from-white via-neutral-100 to-purple-200 bg-clip-text text-transparent">
          {label}
        </span>
      </div>

      {/* Active project title on the left when turned */}
      <div
        ref={titleRef}
        className="absolute top-[calc(50%+28px)] left-[2%] md:left-[4%] -translate-y-1/2 tracking-tight opacity-0 font-extrabold uppercase text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.95)] max-w-[200px] md:max-w-[320px] leading-tight z-50"
        style={{ fontSize: Math.max(metrics.title * 0.95, 22), fontFamily: 'Arges, system-ui, sans-serif' }}
      >
        <div className="text-purple-400 text-xs md:text-sm font-sans font-semibold tracking-widest mb-1 opacity-90">
          PROJECT 0{active + 1}
        </div>
        <div className="bg-gradient-to-br from-white via-white to-purple-200 bg-clip-text text-transparent mb-2">
          {items[active]?.title}
        </div>
        {items[active]?.href && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              goToProject(items[active]?.href);
            }}
            className="pointer-events-auto cursor-pointer inline-flex items-center gap-2 text-xs md:text-sm font-sans font-semibold text-purple-300 hover:text-purple-100 transition-colors group z-50 relative"
          >
            <span>{action || 'Lihat Detail'}</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
        )}
      </div>

      {/* Right side Index list: Compact, clear, elegant without touching cards */}
      <ol
        className="absolute top-[calc(50%+28px)] -translate-y-1/2 right-[1.5%] md:right-[3%] text-right z-30 hidden sm:flex flex-col gap-1.5 font-sans"
        style={{ fontSize: Math.max(metrics.index * 1.5, 12) }}
      >
        {items.map((item, i) => {
          const isActive = i === active;
          return (
            <li key={item.title} className="flex justify-end">
              <button
                type="button"
                onClick={() => to(i + 1)}
                className={cn(
                  "cursor-pointer transition-all duration-200 outline-none tracking-wide uppercase flex items-center justify-end gap-2 px-2 py-0.5 md:px-2.5 md:py-1 rounded-md text-right",
                  isActive
                    ? "text-purple-300 font-extrabold bg-purple-950/80 border border-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.4)] backdrop-blur-sm"
                    : "text-white/60 font-medium hover:text-white hover:bg-white/10"
                )}
              >
                <span className={cn(
                  "text-[10px] md:text-xs font-mono transition-colors",
                  isActive ? "text-purple-400 font-bold" : "text-neutral-500"
                )}>
                  0{i + 1}.
                </span>
                <span className={cn(
                  "text-xs md:text-sm whitespace-nowrap",
                  isActive ? "font-bold text-white drop-shadow-[0_0_6px_rgba(168,85,247,0.5)]" : ""
                )}>
                  {item.title}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export default WorksWheel;
