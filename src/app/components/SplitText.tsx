// 📁 src/app/components/SplitText.tsx
// Anima texto letra por letra al entrar en pantalla
// Úsalo en HeroSection para los títulos principales

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;       // Retraso inicial en segundos
  stagger?: number;     // Retraso entre letras (default: 0.03s)
  once?: boolean;       // Solo anima una vez (default: true)
  as?: keyof JSX.IntrinsicElements;
}

export function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
  once = true,
  as: Tag = 'span',
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as any, { once, amount: 0.3 });

  const words = text.split(' ');

  return (
    <Tag ref={ref as any} className={`inline ${className}`} aria-label={text}>
      {words.map((word, wIndex) => (
        <span key={wIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIndex) => {
            const totalIndex = words
              .slice(0, wIndex)
              .reduce((acc, w) => acc + w.length, 0) + cIndex;

            return (
              <motion.span
                key={cIndex}
                className="inline-block"
                aria-hidden="true"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{
                  duration: 0.5,
                  delay: delay + totalIndex * stagger,
                  ease: [0.2, 0.65, 0.3, 0.9],
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}

// ─────────────────────────────────────────────────────────
// VERSIÓN PALABRAS (más suave, menos intensa)
// Úsala en títulos de secciones secundarias
// ─────────────────────────────────────────────────────────
interface SplitWordsProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: keyof JSX.IntrinsicElements;
}

export function SplitWords({
  text,
  className = '',
  delay = 0,
  stagger = 0.08,
  once = true,
  as: Tag = 'span',
}: SplitWordsProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref as any, { once, amount: 0.3 });

  const words = text.split(' ');

  return (
    <Tag ref={ref as any} className={`inline ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-[0.25em]"
          aria-hidden="true"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            duration: 0.6,
            delay: delay + index * stagger,
            ease: 'easeOut',
          }}
        >
          {word}
        </motion.span>
      ))}
    </Tag>
  );
}