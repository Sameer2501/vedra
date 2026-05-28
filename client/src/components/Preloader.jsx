import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VedraLogo } from './Logo';

const words = [
  "ARCHITECTURAL VISION",
  "BESPOKE CRAFTSMANSHIP",
  "PRESTIGE LIVING",
  "VEDRA"
];

export default function Preloader({ onComplete }) {
  const [counter, setCounter] = useState(0);
  const [currentWordIdx, setCurrentWordIdx] = useState(0);
  const [showLogo, setShowLogo] = useState(false);

  // High-end organic count-up simulation
  useEffect(() => {
    let start = 0;
    const duration = 2800; // 2.8 seconds
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Custom easing for counting: start fast, slow down, speed up slightly at the end
      // We can use a cubic bezier approximation
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      const currentCount = Math.floor(easeProgress * 100);
      setCounter(currentCount);

      // Word indexing based on progress
      if (progress < 0.25) {
        setCurrentWordIdx(0);
      } else if (progress < 0.5) {
        setCurrentWordIdx(1);
      } else if (progress < 0.75) {
        setCurrentWordIdx(2);
      } else {
        setCurrentWordIdx(3);
      }

      // Show logo drawing when we reach the last word stage
      if (progress >= 0.7 && !showLogo) {
        setShowLogo(true);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Complete loading after a brief pause at 100%
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 800);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  // Dynamic luxury status messages for the loading progression
  const getStatusText = (value) => {
    if (value < 15) return "ESTABLISHING SPATIAL GRID";
    if (value < 35) return "COMPOSING VOLUMETRIC FORMS";
    if (value < 55) return "TEXTURING MATERIAL SURFACES";
    if (value < 75) return "LIGHTING INTERIOR SPACES";
    if (value < 92) return "POLISHING AMBIENT DETAILS";
    return "EXPERIENCE READY";
  };

  // Variants for luxury curtain reveal (wipe out)
  const overlayVariants = {
    initial: {
      y: 0,
    },
    exit: {
      y: "-100%",
      transition: {
        duration: 1.2,
        ease: [0.76, 0, 0.24, 1], // Standard luxury ease curve
      }
    }
  };

  const textVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const lineVariants = {
    initial: { width: 0 },
    animate: { width: "100px", transition: { duration: 1.5, ease: "easeInOut" } }
  };

  return (
    <motion.div
      variants={overlayVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 w-full h-full bg-[#050505] z-[9999] flex flex-col justify-between p-8 md:p-16 overflow-hidden select-none pointer-events-none"
    >
      {/* Background visual texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(198,167,106,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(198,167,106,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />
      <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(198,167,106,0.07)_0%,transparent_70%) pointer-events-none z-0" />

      {/* Top Header Information */}
      <div className="relative z-10 flex justify-between items-start w-full">
        <div>
          <span className="text-[10px] font-sans tracking-[0.3em] text-v-beige/40 uppercase block mb-1">
            ESTATE DEVELOPMENT
          </span>
          <span className="text-[11px] font-serif tracking-[0.15em] text-v-ivory/80 uppercase">
            VEDRA RESIDENCES
          </span>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-sans tracking-[0.3em] text-v-beige/40 uppercase block mb-1">
            LAUNCH EDITION
          </span>
          <span className="text-[11px] font-serif tracking-[0.15em] text-v-ivory/80 uppercase">
            © 2026
          </span>
        </div>
      </div>

      {/* Center Presentation Area */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow">
        <div className="h-[200px] flex items-center justify-center w-full relative">
          <AnimatePresence mode="wait">
            {!showLogo ? (
              <motion.div
                key={words[currentWordIdx]}
                variants={textVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex flex-col items-center"
              >
                <span className="text-xs md:text-sm font-sans tracking-[0.4em] text-v-beige uppercase">
                  {words[currentWordIdx]}
                </span>
                
                {/* Micro gold divider animation */}
                <motion.div 
                  variants={lineVariants}
                  className="h-[1px] bg-v-gold mt-4" 
                />
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center justify-center"
              >
                {/* Render the Vedra Logo with SVG path animations enabled */}
                <VedraLogo showSub={true} animated={true} className="w-full max-w-[280px]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Counter and Footer Details */}
      <div className="relative z-10 flex justify-between items-end w-full">
        <div className="flex items-center gap-6">
          <div className="h-[1px] w-12 md:w-20 bg-v-ivory/20" />
          <span className="text-[10px] font-sans tracking-[0.25em] text-v-beige/40 uppercase hidden sm:inline">
            LOADING EXPERIENCE
          </span>
        </div>
        
        {/* Dynamic Luxury Status Log */}
        <div className="flex items-center gap-3 select-none justify-end">
          <AnimatePresence mode="wait">
            <motion.span
              key={getStatusText(counter)}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="text-[10px] md:text-xs font-sans tracking-[0.2em] text-v-beige uppercase font-light text-right"
            >
              {getStatusText(counter)}
            </motion.span>
          </AnimatePresence>
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-v-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-v-gold"></span>
          </span>
        </div>
      </div>
    </motion.div>
  );
}
