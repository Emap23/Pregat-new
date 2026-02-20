// 📁 src/app/components/Navbar.tsx
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../../img/logopregat.png';

const navLinks = [
  { label: 'Sistema SCP', id: 'scp' },
  { label: 'Integración', id: 'integracion' },
  { label: 'Diferenciadores', id: 'diferenciadores' },
  { label: 'Contacto', id: 'contacto' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Resaltar sección activa
      const sections = navLinks.map(l => document.getElementById(l.id));
      for (const section of sections.reverse()) {
        if (section && window.scrollY >= section.offsetTop - 200) {
          setActiveId(section.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0a1628]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
          : 'bg-transparent'
      }`}
    >
      {/* Línea roja inferior al hacer scroll */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isScrolled ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-red-600 to-transparent origin-center"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <motion.button
            onClick={() => scrollToSection('hero')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 400 }}
            className="flex items-center"
          >
            <img src={logo} alt="PREGAT" className="h-12 md:h-14 w-auto" />
          </motion.button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                className="relative text-white/80 hover:text-white transition-colors font-medium text-sm tracking-wide group"
              >
                {link.label}

                {/* Subrayado animado */}
                <span
                  className="absolute -bottom-1 left-0 h-[1.5px] bg-red-500 transition-all duration-300 ease-out"
                  style={{ width: activeId === link.id ? '100%' : '0%' }}
                />
                <span className="absolute -bottom-1 left-0 h-[1.5px] bg-red-400/60 w-0 group-hover:w-full transition-all duration-300 ease-out" />
              </motion.button>
            ))}

            {/* CTA button */}
            <motion.button
              onClick={() => scrollToSection('contacto')}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{ scale: 1.06, boxShadow: '0 0 20px rgba(220,38,38,0.5)' }}
              whileTap={{ scale: 0.95 }}
              className="relative overflow-hidden bg-red-600 text-white px-6 py-2.5 rounded-full font-semibold text-sm shadow-lg group"
            >
              {/* Shine effect */}
              <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              Contáctanos
            </motion.button>
          </div>

          {/* Mobile button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-white p-2"
          >
            <AnimatePresence mode="wait">
              {isMobileMenuOpen
                ? <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={24} /></motion.div>
                : <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={24} /></motion.div>
              }
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden overflow-hidden bg-[#0a1628]/98 backdrop-blur-md border-t border-white/10"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                    className="block w-full text-left text-white/80 hover:text-white hover:bg-white/5 transition-all py-3 px-4 font-medium text-sm rounded-lg mx-1"
                  >
                    {link.label}
                  </motion.button>
                ))}
                <div className="px-4 pt-2">
                  <button
                    onClick={() => scrollToSection('contacto')}
                    className="w-full bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-semibold text-sm transition-colors"
                  >
                    Contáctanos
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
