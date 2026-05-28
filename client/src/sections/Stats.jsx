import React, { useEffect, useState, useRef } from 'react';
import { useInView, motion } from 'framer-motion';

// Individual Stat Counter Sub-component
function CounterItem({ target, prefix = "", suffix = "", label, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const isInView = useInView(elementRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = parseFloat(target);
    const isDecimal = target.toString().includes('.');
    
    if (end === 0) return;

    let startTime = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const progressRatio = Math.min(progress / duration, 1);
      
      // Easing: cubic ease-out
      const easeProgress = 1 - Math.pow(1 - progressRatio, 3);
      const currentCount = start + easeProgress * (end - start);
      
      if (isDecimal) {
        setCount(currentCount.toFixed(2));
      } else {
        setCount(Math.floor(currentCount));
      }

      if (progressRatio < 1) {
        requestAnimationFrame(animateCount);
      }
    };

    requestAnimationFrame(animateCount);
  }, [isInView, target, duration]);

  return (
    <div 
      ref={elementRef}
      className="flex flex-col items-center justify-center p-6 md:p-10 glass-panel border border-v-gold/5 bg-v-gray/10 hover:border-v-gold/20 transition-all duration-700 w-full"
    >
      <div className="text-4xl md:text-5xl lg:text-6xl font-serif text-v-gold font-light tracking-[0.05em] mb-4">
        {prefix}{count}{suffix}
      </div>
      
      <div className="h-[1px] w-8 bg-v-gold/25 mb-4" />
      
      <div className="text-[10px] font-sans tracking-luxury uppercase text-v-beige/65 text-center pl-[0.15em]">
        {label}
      </div>
    </div>
  );
}

export default function Stats() {
  return (
    <section 
      id="stats" 
      className="relative py-20 md:py-28 px-6 md:px-12 bg-v-black overflow-hidden"
    >
      {/* Background ambient gold glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-v-gold-glow-soft blur-[120px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <CounterItem 
            target="4.2" 
            prefix="$" 
            suffix="B+" 
            label="Enclosed Portfolio Valuation" 
          />
          <CounterItem 
            target="12" 
            suffix=" Completed" 
            label="Masterpiece Estates Completed" 
          />
          <CounterItem 
            target="45" 
            suffix=" Awards" 
            label="International Design Medals" 
          />
          <CounterItem 
            target="0.01" 
            prefix="Top " 
            suffix="%" 
            label="Exclusionary Clientele Circle" 
          />
        </div>

      </div>
    </section>
  );
}
