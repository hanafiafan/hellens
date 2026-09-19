import React from 'react';

// Lightweight "liquid glass" wrapper (adapted from the shadcn LiquidButton).
// Renders a glass rim + an SVG-displacement backdrop over whatever is behind it.
// Put <GlassFilter /> once anywhere in the app so the #container-glass id exists.

const cn = (...c) => c.filter(Boolean).join(' ');

const GLASS_SHADOW =
  '0 0 6px rgba(0,0,0,0.03), 0 2px 6px rgba(0,0,0,0.08),' +
  'inset 3px 3px 0.5px -3px rgba(255,255,255,0.9), inset -3px -3px 0.5px -3px rgba(255,255,255,0.85),' +
  'inset 1px 1px 1px -0.5px rgba(255,255,255,0.6), inset -1px -1px 1px -0.5px rgba(255,255,255,0.6),' +
  'inset 0 0 6px 6px rgba(255,255,255,0.12), inset 0 0 2px 2px rgba(255,255,255,0.06),' +
  '0 0 10px rgba(0,0,0,0.12)';

export function LiquidGlass({ className, children, style, ...props }) {
  return (
    <div className={cn('relative isolate', className)} style={style} {...props}>
      {/* liquid distortion of whatever sits behind */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden -z-10"
        style={{ backdropFilter: 'url(#container-glass)', WebkitBackdropFilter: 'url(#container-glass)' }}
      />
      {/* glass rim / bevel */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[inherit]"
        style={{ boxShadow: GLASS_SHADOW }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </div>
  );
}

export function GlassFilter() {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter id="container-glass" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
          <feTurbulence type="fractalNoise" baseFrequency="0.05 0.05" numOctaves="1" seed="1" result="turbulence" />
          <feGaussianBlur in="turbulence" stdDeviation="2" result="blurredNoise" />
          <feDisplacementMap in="SourceGraphic" in2="blurredNoise" scale="70" xChannelSelector="R" yChannelSelector="B" result="displaced" />
          <feGaussianBlur in="displaced" stdDeviation="4" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export default LiquidGlass;
