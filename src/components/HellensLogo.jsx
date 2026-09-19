import React from 'react';

export default function HellensLogo({
  className = "w-8 h-8",
  colorful = false,
  animated = false,
  glow = false
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 747.14 513.71"
      className={`${className} ${glow ? 'filter drop-shadow-[0_0_12px_rgba(16,185,129,0.5)]' : ''}`}
      aria-label="Hellens Logo"
    >
      <defs>
        {/* Colorful neon linear gradients */}
        <linearGradient id="hl-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="hl-grad-2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
        <linearGradient id="hl-grad-3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <linearGradient id="hl-grad-4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#10b981" />
        </linearGradient>
      </defs>

      <g id="hellens-mark">
        {/* Top-Right Chevron Arm */}
        <path
          d="M676.65,0l62.13,87s18.82,17.34,0,45.83S576.86,365.33,576.86,365.33L511,272s-9.41-10.95,0-27.61S676.65,0,676.65,0Z"
          fill={colorful ? "url(#hl-grad-1)" : "currentColor"}
          className={animated ? "transition-all duration-700 hover:scale-105" : ""}
        />

        {/* Bottom-Left Chevron Arm */}
        <path
          d="M169.86,148.38l62.13,87s18.83,17.34,0,45.83S70.08,513.71,70.08,513.71L4.18,420.4s-9.41-10.95,0-27.61S169.86,148.38,169.86,148.38Z"
          fill={colorful ? "url(#hl-grad-2)" : "currentColor"}
          className={animated ? "transition-all duration-700 hover:scale-105" : ""}
        />

        {/* Top-Left to Center Connector */}
        <path
          d="M279.06,0l79.87,112.29s9.41,12.65,28.24,12.65l158.15,1.58-69.66,99.63s-11.3,11.08-26.36,11.08H315s-22,0-33.25-15.82-69.66-101.22-69.66-101.22-7.53-11.07,1.88-26.88S279.06,0,279.06,0Z"
          fill={colorful ? "url(#hl-grad-3)" : "currentColor"}
          className={animated ? "transition-all duration-700 hover:scale-105" : ""}
        />

        {/* Bottom-Right to Center Connector */}
        <path
          d="M475.48,506.08,395.61,393.79s-9.41-12.65-28.24-12.65l-158.14-1.58,69.66-99.63s11.29-11.07,26.35-11.07H439.56s21.95,0,33.24,15.81,69.66,101.22,69.66,101.22S550,397,540.58,412.77,475.48,506.08,475.48,506.08Z"
          fill={colorful ? "url(#hl-grad-4)" : "currentColor"}
          className={animated ? "transition-all duration-700 hover:scale-105" : ""}
        />
      </g>
    </svg>
  );
}
