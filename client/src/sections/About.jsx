import React, { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRevealRef = useRef(null);
  
  useEffect(() => {
    // Parallax scrolling on the secondary absolute background elements
    gsap.to('.about-parallax-accent', {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
      },
      yPercent: -15,
      rotation: 2,
    });

    // Image reveal animation clipping path
    gsap.fromTo(imageRevealRef.current, 
      { clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', scale: 1.15 },
      {
        clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0% 100%)',
        scale: 1,
        ease: 'power3.out',
        duration: 1.8,
        scrollTrigger: {
          trigger: imageRevealRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        }
      }
    );
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 bg-v-black overflow-hidden flex flex-col justify-center"
    >
      {/* Decorative ambient glowing lines & orbs */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-v-gold/5 blur-[120px] pointer-events-none select-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-v-beige/5 blur-[100px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center relative z-10">
        
        {/* Left Side: Editorial Typography Storytelling */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          <motion.span 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs font-sans tracking-luxury-wide uppercase text-v-gold font-semibold mb-4"
          >
            The Legacy of Form
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-v-ivory leading-[1.1] mb-8"
          >
            Where Raw Nature Meets <br className="hidden md:inline" />
            <span className="gold-gradient-text italic font-medium">Prestige Architecture</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1 }}
            className="border-l border-v-gold/30 pl-6 md:pl-8 mb-8 md:my-10"
          >
            <p className="text-lg md:text-xl font-serif italic text-v-beige/90 leading-relaxed font-light">
              "We do not merely construct residences. We sculpt permanent spatial philosophies that merge structural gravity with floating glass poetry, creating sanctuaries for generations to come."
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 1 }}
            className="space-y-6 text-sm text-v-beige/70 leading-relaxed font-light max-w-2xl"
          >
            <p>
              VEDRA Living was founded on a singular vision: to challenge the transient nature of modern building. By treating concrete, stone, and steel as extensions of geological history, our design atelier creates premium estates that feel ancient yet futuristic, absolute yet light.
            </p>
            <p>
              Collaborating exclusively with visionary architects, acoustic designers, and landscape curators, each site is studied for months to calculate light trajectories, wind breaks, and topography flows, resulting in a flawless organic integration.
            </p>
          </motion.div>

          {/* Luxury Signature Monogram graphic overlay */}
          <div className="absolute right-[4%] top-[10%] opacity-[0.02] text-v-beige pointer-events-none select-none about-parallax-accent hidden lg:block">
            <span className="font-serif text-[28vw] leading-none select-none">VL</span>
          </div>
        </div>

        {/* Right Side: Cinematic Image Mask Reveal */}
        <div className="lg:col-span-5 relative w-full h-[400px] md:h-[550px] lg:h-[650px] flex items-center justify-center">
          
          {/* Outer floating golden thin border */}
          <div className="absolute inset-0 border border-v-gold/15 translate-x-4 translate-y-4 z-0 pointer-events-none" />
          
          <div 
            ref={imageRevealRef}
            className="relative w-full h-full overflow-hidden z-10 bg-v-gray"
            style={{ willChange: 'clip-path' }}
          >
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=90" 
              alt="Sculptural Modern Residence" 
              className="object-cover w-full h-full select-none"
            />
            {/* Ambient vignette shadow cover */}
            <div className="absolute inset-0 bg-gradient-to-t from-v-black/50 via-transparent to-v-black/20" />
          </div>
          
          {/* Dynamic Floating Architecture Element */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8, duration: 1.2 }}
            className="absolute bottom-6 -left-8 md:-left-12 glass-panel p-6 z-20 max-w-[240px]"
          >
            <h4 className="text-xs font-serif tracking-luxury text-v-gold uppercase mb-1">01 / Foundation</h4>
            <p className="text-[10px] font-sans tracking-widest text-v-beige/60 uppercase mb-3">Travertine & Bronze</p>
            <p className="text-[11px] font-sans text-v-ivory/80 leading-relaxed font-light">
              Crafted from 120-million-year-old alpine travertine slabs selected by hand from quarries in Tivoli, Italy.
            </p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
