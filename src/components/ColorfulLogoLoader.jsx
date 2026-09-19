import React, { useState, useEffect } from 'react';

export default function ColorfulLogoLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const startTime = Date.now();
    const duration = 1600; // 1.6s quick & punchy

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(Math.round((elapsed / duration) * 100), 100);
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(timer);
        setIsExiting(true);
        setTimeout(() => {
          if (onFinish) onFinish();
        }, 400);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#041d13] text-white transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Aurora / Color Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/4 -left-1/4 w-[150vw] h-[150vh] rounded-full opacity-25 animate-spin-slow blur-[100px]"
          style={{
            background:
              'conic-gradient(from 0deg, #00F0FF, #00F5A0, #ff007f, #fee440, #00F0FF)',
            animationDuration: '10s',
          }}
        />
        <div className="absolute inset-0 bg-[#041d13]/80 backdrop-blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Animated Geometric Monogram */}
        <div className="relative w-36 h-24 sm:w-48 sm:h-32 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-emerald-400 to-pink-500 rounded-full blur-xl opacity-40 animate-pulse" />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 747.14 513.71"
            className="w-full h-full filter drop-shadow-[0_0_20px_rgba(16,185,129,0.8)]"
          >
            <defs>
              <linearGradient id="y2k-g1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F0FF" />
                <stop offset="100%" stopColor="#0072FF" />
              </linearGradient>
              <linearGradient id="y2k-g2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00F5A0" />
                <stop offset="100%" stopColor="#00D9F5" />
              </linearGradient>
              <linearGradient id="y2k-g3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff007f" />
                <stop offset="100%" stopColor="#fee440" />
              </linearGradient>
              <linearGradient id="y2k-g4" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fee440" />
                <stop offset="100%" stopColor="#00f5a0" />
              </linearGradient>
            </defs>

            <g>
              {/* Path 1 - Top-Right */}
              <path
                d="M676.65,0l62.13,87s18.82,17.34,0,45.83S576.86,365.33,576.86,365.33L511,272s-9.41-10.95,0-27.61S676.65,0,676.65,0Z"
                fill="url(#y2k-g1)"
                stroke="#00F0FF"
                strokeWidth="3"
                className="transition-all"
              />
              {/* Path 2 - Bottom-Left */}
              <path
                d="M169.86,148.38l62.13,87s18.83,17.34,0,45.83S70.08,513.71,70.08,513.71L4.18,420.4s-9.41-10.95,0-27.61S169.86,148.38,169.86,148.38Z"
                fill="url(#y2k-g2)"
                stroke="#00F5A0"
                strokeWidth="3"
                className="transition-all"
              />
              {/* Path 3 - Top-Left Connector */}
              <path
                d="M279.06,0l79.87,112.29s9.41,12.65,28.24,12.65l158.15,1.58-69.66,99.63s-11.3,11.08-26.36,11.08H315s-22,0-33.25-15.82-69.66-101.22-69.66-101.22-7.53-11.07,1.88-26.88S279.06,0,279.06,0Z"
                fill="url(#y2k-g3)"
                stroke="#ff007f"
                strokeWidth="3"
                className="transition-all"
              />
              {/* Path 4 - Bottom-Right Connector */}
              <path
                d="M475.48,506.08,395.61,393.79s-9.41-12.65-28.24-12.65l-158.14-1.58,69.66-99.63s11.29-11.07,26.35-11.07H439.56s21.95,0,33.24,15.81,69.66,101.22,69.66,101.22S550,397,540.58,412.77,475.48,506.08,475.48,506.08Z"
                fill="url(#y2k-g4)"
                stroke="#fee440"
                strokeWidth="3"
                className="transition-all"
              />
            </g>
          </svg>
        </div>

        {/* Brand Text */}
        <div className="mt-6 flex flex-col items-center text-center">
          <div className="text-xl sm:text-2xl font-bold tracking-[0.25em] text-white">
            HELLENS<span className="text-emerald-400">.DEV</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-300/70 tracking-widest uppercase mt-1">
            Studio // Loading system
          </span>
        </div>

        {/* Minimal Progress Bar */}
        <div className="mt-6 w-40 sm:w-48">
          <div className="h-0.5 w-full bg-white/15 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-75"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #00F0FF, #00F5A0, #ff007f, #fee440)',
              }}
            />
          </div>
          <div className="mt-1.5 flex justify-between text-[10px] font-mono text-white/40">
            <span>SYS_READY</span>
            <span>{progress}%</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setIsExiting(true);
          setTimeout(() => onFinish && onFinish(), 150);
        }}
        className="absolute top-5 right-5 text-[10px] font-mono text-white/50 hover:text-white px-2.5 py-1 rounded border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
      >
        SKIP [ESC]
      </button>
    </div>
  );
}
