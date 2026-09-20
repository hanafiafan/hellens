import React, { useEffect, useState } from 'react';

// STEPS-reference reveal for the Hellens outline mark:
// a colored wiper bar (red->orange) sweeps left->right, a colored baseline
// line extends across, and the white outline is revealed in the wiper's wake;
// a spark flicks, then all color fades leaving the clean white mark on black.
// No text. Pure SVG/CSS, no deps.

const LOGO_PATHS = [
  'M676.65,0l62.13,87s18.82,17.34,0,45.83S576.86,365.33,576.86,365.33L511,272s-9.41-10.95,0-27.61S676.65,0,676.65,0Z',
  'M169.86,148.38l62.13,87s18.83,17.34,0,45.83S70.08,513.71,70.08,513.71L4.18,420.4s-9.41-10.95,0-27.61S169.86,148.38,169.86,148.38Z',
  'M279.06,0l79.87,112.29s9.41,12.65,28.24,12.65l158.15,1.58-69.66,99.63s-11.3,11.08-26.36,11.08H315s-22,0-33.25-15.82-69.66-101.22-69.66-101.22-7.53-11.07,1.88-26.88S279.06,0,279.06,0Z',
  'M475.48,506.08,395.61,393.79s-9.41-12.65-28.24-12.65l-158.14-1.58,69.66-99.63s11.29-11.07,26.35-11.07H439.56s21.95,0,33.24,15.81,69.66,101.22,69.66,101.22S550,397,540.58,412.77,475.48,506.08,475.48,506.08Z',
];

function Mark() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 747.14 513.71"
      className="hl-mark absolute inset-0 w-full h-full"
    >
      {LOGO_PATHS.map((d, i) => (
        <path
          key={i}
          d={d}
          fill="none"
          stroke="#fff"
          strokeWidth="6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

export default function ColorfulLogoLoader({ onFinish }) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const hold = setTimeout(() => setIsExiting(true), 2400);
    const done = setTimeout(() => onFinish && onFinish(), 2900);
    return () => {
      clearTimeout(hold);
      clearTimeout(done);
    };
  }, [onFinish]);

  const skip = () => {
    setIsExiting(true);
    setTimeout(() => onFinish && onFinish(), 150);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black text-white transition-all duration-500 ${
        isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <style>{`
        /* white outline revealed left->right in the wiper's wake */
        .hl-mark { clip-path: inset(0 100% 0 0); animation: hl-reveal 1s cubic-bezier(.5,0,.15,1) .1s forwards; }
        @keyframes hl-reveal { to { clip-path: inset(0 -3% 0 0) } }

        /* colored leading wiper bar */
        .hl-wipe { position:absolute; top:6%; bottom:6%; left:0; width:5px; border-radius:3px;
          background:linear-gradient(#ff2d2d,#ff8a00); box-shadow:0 0 14px 2px #ff6a00; opacity:0;
          animation: hl-wipe 1.1s cubic-bezier(.5,0,.15,1) .1s forwards; }
        @keyframes hl-wipe { 0%{left:0;opacity:0} 10%{opacity:1} 85%{left:100%;opacity:1} 100%{left:106%;opacity:0} }

        /* colored baseline guide extending across */
        .hl-hline { position:absolute; top:55%; left:-6%; height:3px; width:0; border-radius:2px;
          background:linear-gradient(90deg,#ff2d2d,#ff8a00,#f5a623); opacity:0;
          animation: hl-hline 1.2s ease .15s forwards; }
        @keyframes hl-hline { 0%{width:0;opacity:0} 20%{opacity:.95} 65%{width:112%} 100%{width:112%;opacity:0} }

        /* spark flick anchored to the logo's top tip (676.65,0 in viewBox) */
        .hl-sparks { position:absolute; inset:0; width:100%; height:100%; pointer-events:none;
          filter: drop-shadow(0 0 7px #ff6a00) drop-shadow(0 0 3px #fff); }
        .hl-spark { transform-box:fill-box; transform-origin:center; opacity:0;
          animation: hl-spark .55s ease .95s forwards; }
        @keyframes hl-spark { 0%{opacity:0;transform:scale(.2)} 45%{opacity:1;transform:scale(1.25)} 100%{opacity:0;transform:scale(2.1)} }
      `}</style>

      <div className="relative w-52 h-36 sm:w-64 sm:h-44">
        <span className="hl-hline" />
        <Mark />
        <span className="hl-wipe" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 747.14 513.71"
          className="hl-sparks"
        >
          <g className="hl-spark">
            <circle cx="676.65" cy="9" r="20" fill="#ff8a00" />
            <circle cx="676.65" cy="9" r="8" fill="#fff" />
          </g>
        </svg>
      </div>

      <button
        onClick={skip}
        className="absolute top-5 right-5 text-[10px] font-mono text-white/50 hover:text-white px-2.5 py-1 rounded border border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
      >
        SKIP [ESC]
      </button>
    </div>
  );
}
