import React from 'react';
import LoopingWords from './LoopingWords';

const HERO_WORDS = ['WEBSITE', 'TOKO ONLINE', 'AUTOMASI'];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="hero-poster relative h-screen w-full overflow-hidden flex flex-col select-none"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="hero-poster-center z-10">
        <h1 className="hero-poster-heading">
          <LoopingWords words={HERO_WORDS} />
          <span className="sr-only">Hellens membuat website, toko online, dan automasi.</span>
        </h1>
      </div>
    </section>
  );
}
