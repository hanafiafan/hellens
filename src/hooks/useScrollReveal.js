import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Fades/lifts every `selector` match inside `scopeRef` in as it enters the viewport.
// Batches so a row of cards staggers together instead of firing one by one.
export function useScrollReveal(scopeRef, selector, options = {}) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.batch(selector, {
        start: 'top 85%',
        once: true,
        onEnter: (batch) =>
          gsap.from(batch, {
            y: 28,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            overwrite: true,
            ...options,
          }),
      });
    }, scopeRef);
    return () => ctx.revert();
  }, []);
}
