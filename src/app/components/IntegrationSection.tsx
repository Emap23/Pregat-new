

import { MessageCircle, LayoutDashboard, UserCheck, Radio, Brain, Shield } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { SplitWords } from './SplitText';

const integrations = [
  {
    icon: MessageCircle,
    title: 'SCP CIUDADANO',
    description: 'Facilita una comunicación directa y transparente con los ciudadanos.',
    color: 'from-red-500 to-rose-700',
    border: 'rgba(239,68,68,0.4)',
    glow: 'rgba(239,68,68,0.15)',
    tag: '01',
  },
  {
    icon: LayoutDashboard,
    title: 'SCP DASHBOARD',
    description: 'Integra una herramienta para la toma de decisiones informadas y estratégicas.',
    color: 'from-blue-500 to-blue-800',
    border: 'rgba(59,130,246,0.4)',
    glow: 'rgba(59,130,246,0.15)',
    tag: '02',
  },
  {
    icon: UserCheck,
    title: 'SCP SUPERVISOR',
    description: 'Asegura una respuesta rápida y efectiva ante cualquier incidente.',
    color: 'from-emerald-500 to-emerald-800',
    border: 'rgba(16,185,129,0.4)',
    glow: 'rgba(16,185,129,0.15)',
    tag: '03',
  },
  {
    icon: Radio,
    title: 'SCP CENTRO DE MANDO',
    description: 'Supervisar y gestionar las actividades policiales en tiempo real.',
    color: 'from-cyan-500 to-cyan-800',
    border: 'rgba(6,182,212,0.4)',
    glow: 'rgba(6,182,212,0.15)',
    tag: '04',
  },
  {
    icon: Brain,
    title: 'SCP INTELIGENCIA',
    description: 'Proporcionar información clave para la toma de decisiones estratégicas.',
    color: 'from-orange-500 to-orange-800',
    border: 'rgba(249,115,22,0.4)',
    glow: 'rgba(249,115,22,0.15)',
    tag: '05',
  },
  {
    icon: Shield,
    title: 'SCP POLICÍA',
    description: 'Optimizar las actividades diarias de los elementos de seguridad.',
    color: 'from-indigo-500 to-indigo-800',
    border: 'rgba(99,102,241,0.4)',
    glow: 'rgba(99,102,241,0.15)',
    tag: '06',
  },
];

// Variantes para animación en cascada 3D (de frente hacia atrás)
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 80,
    z: -120,
    rotateX: 18,
    scale: 0.88,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    z: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      delay: i * 0.13,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function IntegrationSection() {
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { once: true, amount: 0.1 });

  return (
    <section id="integracion" className="py-20 md:py-28 bg-[#0d1b2e] overflow-hidden relative">

      {/* Fondo sutil con cuadrícula táctica */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Degradado superior e inferior para suavizar */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#1a2847] to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0f1e] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-[1px] bg-red-500/70"
            />
            <span className="text-red-400 text-xs uppercase tracking-[0.25em] font-mono">
              Ecosistema Integrado
            </span>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 40 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="h-[1px] bg-red-500/70"
            />
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
            <SplitWords text="Conoce la Integración SCP" delay={0.2} stagger={0.06} as="span" />
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-white/50 text-base md:text-lg max-w-2xl mx-auto"
          >
            Centraliza la <span className="text-white/80 font-medium">gestión de crisis</span> en una
            plataforma unificada. Garantice la{' '}
            <span className="text-white/80 font-medium">interoperabilidad</span> de sus sistemas de mando.
          </motion.p>
        </div>

        {/* Grid con perspectiva 3D */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          style={{ perspective: '1200px', perspectiveOrigin: '50% 30%' }}
        >
          {integrations.map((item, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{
                y: -8,
                scale: 1.02,
                rotateX: -2,
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
              className="relative group rounded-2xl p-6 md:p-7 cursor-pointer"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)`,
                border: `1px solid ${item.border}`,
                boxShadow: `0 0 0 0 ${item.glow}`,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Glow de fondo al hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(ellipse at 30% 20%, ${item.glow} 0%, transparent 70%)` }}
              />

              {/* Número de módulo */}
              <div className="absolute top-5 right-5 font-mono text-xs text-white/15 tracking-widest">
                {item.tag}
              </div>

              {/* Línea superior de color */}
              <div className="absolute top-0 left-6 right-6 h-[1px] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full bg-gradient-to-r ${item.color}`}
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.12, ease: 'easeOut' }}
                />
              </div>

              {/* Ícono */}
              <div className="mb-5 mt-2 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 6 }}
                  transition={{ type: 'spring', stiffness: 350 }}
                  className={`w-13 h-13 w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}
                >
                  <item.icon className="w-6 h-6 text-white" />
                </motion.div>
              </div>

              {/* Texto */}
              <div className="relative z-10">
                <h3 className="text-white font-bold text-sm md:text-base mb-2 tracking-wide">
                  {item.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                  {item.description}
                </p>
              </div>

              {/* Flecha hover */}
              <motion.div
                initial={{ opacity: 0, x: -6 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="absolute bottom-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
