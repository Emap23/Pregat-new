// 📁 src/app/components/Preloader.tsx
// Pantalla de carga que desaparece antes de mostrar la página

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import logo from '../../../img/logopregat.png';

export function Preloader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Oculta el preloader después de 2.2 segundos
    const timer = setTimeout(() => setIsVisible(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a1628]"
        >
          {/* Logo */}
          <motion.img
            src={logo}
            alt="PREGAT"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="h-24 w-auto mb-10"
          />

          {/* Spinner */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 rounded-full border-4 border-white/10 border-t-red-600"
          />

          {/* Barra de progreso */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-white/10">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="h-full bg-red-600"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}