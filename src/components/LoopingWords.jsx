import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function LoopingWords({ words, className = '' }) {
  const viewportRef = useRef(null);
  const listRef = useRef(null);
  const frameRef = useRef(null);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const list = listRef.current;
    const frame = frameRef.current;
    if (!viewport || !list || !frame || !words.length) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timeline;
    let observer;

    const setup = () => {
      timeline?.kill();
      gsap.killTweensOf([list, frame]);
      gsap.set(list, { y: 0 });

      const height = list.firstElementChild?.getBoundingClientRect().height || 0;
      const spans = Array.from(list.querySelectorAll('.looping-word-text'));
      const widths = spans.map((span) => Math.ceil(span.getBoundingClientRect().width) + 32);
      gsap.set(frame, { width: widths[1] || widths[0] });

      if (reduceMotion.matches || words.length < 2) return;

      timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.45, paused: true });
      for (let index = 1; index <= words.length; index++) {
        timeline.to({}, { duration: 1.55 });
        timeline.to(list, { y: -height * index, duration: 1.05, ease: 'elastic.out(1, 0.85)' });
        timeline.to(frame, { width: widths[index + 1], duration: 0.55, ease: 'expo.out' }, '<');
      }
      timeline.set(list, { y: 0 });
      timeline.play();
      if (!document.hidden && viewport.getBoundingClientRect().bottom > 0 && viewport.getBoundingClientRect().top < window.innerHeight) {
        timeline.resume();
      } else {
        timeline.pause();
      }
    };

    const updatePlayback = () => {
      if (!timeline) return;
      const rect = viewport.getBoundingClientRect();
      if (!document.hidden && rect.bottom > 0 && rect.top < window.innerHeight) timeline.resume();
      else timeline.pause();
    };

    setup();
    observer = new ResizeObserver(setup);
    observer.observe(viewport);
    document.fonts?.ready.then(() => { if (viewport.isConnected) setup(); });
    document.addEventListener('visibilitychange', updatePlayback);
    window.addEventListener('scroll', updatePlayback, { passive: true });
    reduceMotion.addEventListener('change', setup);

    return () => {
      observer?.disconnect();
      timeline?.kill();
      gsap.killTweensOf([list, frame]);
      document.removeEventListener('visibilitychange', updatePlayback);
      window.removeEventListener('scroll', updatePlayback);
      reduceMotion.removeEventListener('change', setup);
      gsap.set(list, { clearProps: 'transform' });
      gsap.set(frame, { clearProps: 'width' });
    };
  }, [words]);

  if (!words.length) return null;

  return (
    <span className={`looping-words ${className}`} aria-hidden="true">
      <span className="looping-words-viewport" ref={viewportRef}>
        <span className="looping-words-list" ref={listRef}>
          {[...words, words[0], words[1] || words[0]].map((word, index) => (
            <span className="looping-word" key={`${word}-${index}`}>
              <span className="looping-word-text">{word}</span>
            </span>
          ))}
        </span>
        <span className="looping-words-fade" />
      </span>
      <span className="looping-words-frame" ref={frameRef}>
        <i className="looping-edge top-left" /><i className="looping-edge top-right" />
        <i className="looping-edge bottom-left" /><i className="looping-edge bottom-right" />
      </span>
    </span>
  );
}
