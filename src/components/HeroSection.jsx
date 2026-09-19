import React from 'react';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen w-full overflow-hidden flex flex-col select-none"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260803_192301_9231ed6b-c55c-4a48-909c-4ebe11cf2e11.mp4"
          type="video/mp4"
        />
      </video>

      {/* Main copy — left, vertically centered on the empty wall */}
      <div className="relative z-10 h-full w-full flex items-center">
        <div className="pl-6 sm:pl-10 lg:pl-14 pr-6 max-w-2xl [text-shadow:_0_2px_24px_rgba(0,0,0,0.25)]">
          {/* eyebrow: label chip + rule */}
          <div className="flex items-center gap-3 mb-5 sm:mb-6">
            <span className="font-mono text-[9px] sm:text-[10px] font-semibold tracking-[0.22em] uppercase text-white border border-white/45 px-2 py-[5px]">
              Hellens.dev
            </span>
            <span className="h-px w-14 sm:w-20 bg-white/45" />
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] uppercase text-white/80">
              Est. 2021
            </span>
          </div>

          {/* headline — solid stack with one hollow word for contrast */}
          <h1 className="font-heavy uppercase text-white text-[clamp(2.75rem,6vw,7rem)] leading-[0.82] tracking-[-0.04em]">
            Built to<br />
            Convert<br />
            <span className="text-transparent [-webkit-text-stroke:3px_rgba(255,255,255,0.95)]">Not</span>
            <br />
            Decorate
          </h1>

          {/* spec line */}
          <div className="mt-6 sm:mt-8 flex items-center gap-3">
            <span className="h-px w-8 sm:w-10 bg-white/60 shrink-0" />
            <p className="font-mono text-[9px] sm:text-[10px] font-medium tracking-[0.2em] uppercase text-white/90">
              Websites · Toko Online · Chatbot · Automasi
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
