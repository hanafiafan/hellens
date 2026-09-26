import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

const characters = (text) => {
  if (typeof Intl !== 'undefined' && Intl.Segmenter) {
    return Array.from(new Intl.Segmenter('id', { granularity: 'grapheme' }).segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
};

export default function VerticalCutReveal({
  children,
  active,
  reverse = false,
  fromLast = false,
  splitBy = 'characters',
  axis = 'y',
  distance = 115,
  rotate = 0,
  fade = false,
  delay = 0,
  className = '',
}) {
  const reducedMotion = useReducedMotion();
  const text = String(children);
  const letters = splitBy === 'words' ? text.split(' ') : characters(text);

  return (
    <span className={`vertical-cut-reveal vertical-cut-reveal--${splitBy} ${className}`} aria-label={text}>
      {letters.map((letter, index) => (
        <span className="vertical-cut-letter" aria-hidden="true" key={`${letter}-${index}`}>
          <motion.span
            className="vertical-cut-letter-inner"
            initial={false}
            animate={{
              x: axis === 'x' && !active && !reducedMotion ? `${reverse ? -distance : distance}%` : '0%',
              y: axis === 'y' && !active && !reducedMotion ? `${reverse ? -distance : distance}%` : '0%',
              rotate: active || reducedMotion ? 0 : reverse ? -rotate : rotate,
              scale: active || reducedMotion ? 1 : fade ? 0.88 : 1,
              opacity: active || reducedMotion || !fade ? 1 : 0,
            }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 21,
              delay: active && !reducedMotion ? delay + (fromLast ? letters.length - 1 - index : index) * 0.025 : 0,
            }}
          >
            {letter === ' ' ? '\u00a0' : letter}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
