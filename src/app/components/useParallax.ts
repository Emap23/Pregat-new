// 📁 src/app/components/useParallax.ts
// Hook para efecto parallax en fondos al hacer scroll
// NOTA: Este archivo va en components/ (no en hooks/) para simplificar la estructura

import { useEffect, useRef } from 'react';

interface ParallaxOptions {
  speed?: number; // 0.1 (lento) a 0.5 (rápido). Default: 0.3
}

export function useParallax({ speed = 0.3 }: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewH = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewH) return;

      const centerOffset = (rect.top + rect.height / 2) - viewH / 2;
      const translateY = centerOffset * speed;

      el.style.transform = `translateY(${translateY}px) scale(1.1)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [speed]);

  return ref;
}