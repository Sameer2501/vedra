import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MILESTONES = [
  {
    year: "2020",
    title: "The Conception",
    subtitle: "Milan Atelier Founded",
    desc: "A group of structural engineers, stone sculptors, and environmental researchers establish the VEDRA Atelier in Milan. The goal: to construct living sculpture estates that defy gravity and outlast geological cycles."
  },
  {
    year: "2022",
    title: "First Monolith",
    subtitle: "Zermatt Alpine Foundation",
    desc: "Construction begins on the Matterhorn Valley project. Our architects develop high-performance travertine structural joints that weather and self-seal in sub-zero climates, creating our signature Alpine Sanctuary."
  },
  {
    year: "2024",
    title: "Basalt Landmark",
    subtitle: "Icelandic Masterpiece Finished",
    desc: "The Obsidian Pavilion is completed in Iceland. Pinned into volcanic basalt cliffs, the cantilevered lounge wins the International Architectural Gold Medal for structural design and acoustic isolation."
  },
  {
    year: "2026",
    title: "Elite Expansion",
    subtitle: "Coastal & Eastern Ventures",
    desc: "Unveiling The Aurelia Villa on the Amalfi Coast (featuring subterranean boat vaults) and The Lumina Atrium in Kyoto (introducing geothermal waterfall climate control). Global portfolio value exceeds $4.2B."
  }
];

export default function Timeline() {
  const containerRef = useRef(null);
  const progressLineRef = useRef(null);

  useEffect(() => {
    // GSAP ScrollTrigger to "draw" the vertical timeline line
    let ctx = gsap.context(() => {
      gsap.fromTo(progressLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: true,
            invalidateOnRefresh: true,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="timeline" 
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 bg-v-black overflow-hidden timeline-container"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 md:mb-28">
          <span className="text-xs font-sans tracking-luxury-wide uppercase text-v-gold font-semibold mb-4 block">
            Milestones of Vision
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-v-ivory leading-tight mb-6">
            The Timeline of <span className="gold-gradient-text italic font-medium">Prestige</span>
          </h2>
          <p className="text-xs md:text-sm font-sans tracking-[0.15em] text-v-beige/65 uppercase leading-relaxed">
            From an architectural manifesto to geological monuments across the globe.
          </p>
        </div>

        {/* Timeline body wrapper */}
        <div className="relative w-full max-w-4xl mx-auto">
          
          {/* Vertical central spine background line */}
          <div className="absolute left-4 md:left-1/2 top-0 w-[1px] h-full bg-v-gray/40 -translate-x-1/2 z-0" />
          
          {/* Vertical central spine progress drawing line */}
          <div 
            ref={progressLineRef}
            className="absolute left-4 md:left-1/2 top-0 w-[1.5px] h-full bg-gradient-to-b from-v-gold via-v-beige to-v-gold/30 -translate-x-1/2 z-10 origin-top"
            style={{ willChange: 'transform' }}
          />

          {/* Timeline Nodes */}
          <div className="space-y-16 md:space-y-24 relative z-20">
            {MILESTONES.map((stone, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={stone.year}
                  className={`flex flex-col md:flex-row items-start md:items-center w-full relative ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* Timeline bullet dot */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-v-black border-2 border-v-gold -translate-x-1/2 z-30 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-v-gold animate-pulse" />
                  </div>

                  {/* Empty side buffer for desktop spacing */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Content block side */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-12 text-left">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="glass-panel p-8 hover:border-v-gold/30 transition-colors duration-500 relative"
                    >
                      {/* Floating year bubble */}
                      <span className="absolute top-[-20px] left-8 px-4 py-1.5 bg-v-gold text-v-black font-serif text-sm font-semibold tracking-luxury uppercase border border-v-gold">
                        {stone.year}
                      </span>
                      
                      <div className="mt-2">
                        <h3 className="text-xl font-serif text-v-ivory font-light mb-1 mt-2">
                          {stone.title}
                        </h3>
                        
                        <span className="text-[10px] font-sans tracking-widest text-v-gold uppercase block mb-4">
                          {stone.subtitle}
                        </span>
                        
                        <p className="text-xs text-v-beige/70 leading-relaxed font-light">
                          {stone.desc}
                        </p>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
