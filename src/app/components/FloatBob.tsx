// 📁 src/app/components/FloatBob.tsx
// Envuelve cualquier elemento para hacerlo flotar suavemente en loop
// Equivale a las clases float-bob-x y float-bob-y del HTML original

import { motion } from 'motion/react';

interface FloatBobProps {
  children: React.ReactNode;
  direction?: 'x' | 'y' | 'both';
  distance?: number;   // Píxeles de desplazamiento (default: 12)
  duration?: number;   // Duración de un ciclo en segundos (default: 3)
  delay?: number;      // Retraso inicial
  className?: string;
}

export function FloatBob({
  children,
  direction = 'y',
  distance = 12,
  duration = 3,
  delay = 0,
  className = '',
}: FloatBobProps) {
  const animateProps =
    direction === 'x'
      ? { x: [-distance, distance, -distance] }
      : direction === 'y'
      ? { y: [-distance, distance, -distance] }
      : {
          x: [-distance * 0.5, distance * 0.5, -distance * 0.5],
          y: [-distance, distance, -distance],
        };

  return (
    <motion.div
      className={className}
      animate={animateProps}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        repeatType: 'loop',
      }}
    >
      {children}
    </motion.div>
  );
}


// ─────────────────────────────────────────────────────────────
// ELEMENTOS DECORATIVOS FLOTANTES PARA FONDO
// Úsalos dentro de secciones para agregar profundidad visual
// ─────────────────────────────────────────────────────────────

export function FloatingDecorators() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Círculo rojo grande - esquina superior derecha */}
      <FloatBob direction="y" duration={4} delay={0} className="absolute -top-20 -right-20 opacity-10">
        <div className="w-64 h-64 rounded-full bg-red-600 blur-3xl" />
      </FloatBob>

      {/* Círculo azul - esquina inferior izquierda */}
      <FloatBob direction="y" duration={5} delay={1} className="absolute -bottom-20 -left-20 opacity-10">
        <div className="w-80 h-80 rounded-full bg-blue-600 blur-3xl" />
      </FloatBob>

      {/* Punto decorativo rojo */}
      <FloatBob direction="both" duration={3.5} delay={0.5} className="absolute top-1/4 right-1/4 opacity-20">
        <div className="w-4 h-4 rounded-full bg-red-500" />
      </FloatBob>

      {/* Punto decorativo blanco */}
      <FloatBob direction="y" duration={2.8} delay={1.2} className="absolute bottom-1/3 left-1/3 opacity-15">
        <div className="w-3 h-3 rounded-full bg-white" />
      </FloatBob>
    </div>
  );
}