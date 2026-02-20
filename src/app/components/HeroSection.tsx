// 📁 src/app/components/HeroSection.tsx
import { Play, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import logo from '../../../img/logopregat.png';
import { SplitWords } from './SplitText';
import { useParallax } from './useParallax';
import { FloatingDecorators } from './FloatBob';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const parallaxBg = useParallax({ speed: 0.25 });

  // Parallax de opacidad al hacer scroll (el hero se desvanece suavemente)
  const { scrollY } = useScroll();
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0]);
  const contentY = useTransform(scrollY, [0, 400], [0, 60]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-start overflow-hidden"
    >
      {/* ── Fondo con parallax ── */}
      <div
        ref={parallaxBg}
        className="absolute inset-0 z-0 scale-110"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1759382033088-9726a2eb7688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZXJpYWwlMjBjaXR5JTIwaGlnaHdheSUyMHRyYWZmaWMlMjBtZXhpY298ZW58MXx8fHwxNzcxMjI0NDAxfDA&ixlib=rb-4.1.0&q=80&w=1080)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay degradado */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1628]/90 via-transparent to-transparent" />
      </div>

      {/* ── Elementos flotantes decorativos ── */}
      <FloatingDecorators />

      {/* ── Líneas de escaneo (efecto táctico) ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-red-600/10 to-transparent"
            style={{ top: `${15 + i * 14}%` }}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: '100%', opacity: [0, 0.5, 0] }}
            transition={{
              duration: 3,
              delay: 1.5 + i * 0.4,
              repeat: Infinity,
              repeatDelay: 8 + i * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* ── Contenido principal ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-40 w-full"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8 md:mb-12"
        >
          <img src={logo} alt="PREGAT" className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto" />
        </motion.div>

        <div className="max-w-3xl">
          {/* Etiqueta superior */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="h-[1.5px] bg-red-500"
            />
            <span className="text-red-400 text-xs sm:text-sm uppercase tracking-widest font-semibold">
              Seguridad y tecnología mexicana
            </span>
          </motion.div>

          {/* Título — animación palabra por palabra */}
          <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 md:mb-8">
            <SplitWords
              text="Respaldo Institucional"
              delay={0.7}
              stagger={0.07}
              as="span"
            />
            <br />
            <span className="text-red-500">
              <SplitWords
                text="y Soberanía"
                delay={1.0}
                stagger={0.07}
                as="span"
              />
            </span>
            {' '}
            <SplitWords
              text="Tecnológica."
              delay={1.25}
              stagger={0.07}
              as="span"
            />
          </h2>

          {/* Descripción */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="text-white/70 text-base md:text-lg mb-10 max-w-xl leading-relaxed"
          >
            Grupo empresarial consolidado al servicio de la seguridad pública.
            Tecnología soberana para proteger lo que más importa.
          </motion.p>

          {/* Botones */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            {/* Botón primario */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 25px rgba(220,38,38,0.6)' }}
              whileTap={{ scale: 0.97 }}
              className="relative overflow-hidden bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full font-semibold text-sm tracking-wide shadow-lg group"
            >
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-600 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              Nuestros Productos
            </motion.button>

            {/* Botón secundario */}
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center justify-center gap-3 bg-transparent text-white px-8 py-4 rounded-full border border-white/40 hover:border-white/70 font-semibold text-sm tracking-wide backdrop-blur-sm transition-colors duration-300"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"
              >
                <Play className="w-3.5 h-3.5" fill="white" />
              </motion.div>
              Mirar el Video
            </motion.button>
          </motion.div>
        </div>

        {/* Stats rápidos en la parte inferior */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.1 }}
          className="absolute bottom-16 left-4 sm:left-6 lg:left-8 flex gap-8 md:gap-12"
        >
          {[
            { value: '800+', label: 'Entidades' },
            { value: '316+', label: 'Policías' },
            { value: '200M+', label: 'Casos' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2 + i * 0.1 }}
              className="text-center"
            >
              <div className="text-white font-bold text-lg md:text-xl">{stat.value}</div>
              <div className="text-white/50 text-xs uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Flecha scroll ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
