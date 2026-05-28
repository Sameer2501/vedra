import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VedraLogo } from '../components/Logo';
import { ArrowDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Play video slowly
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.55;
    }

    // GSAP parallax effect on hero content and background on scroll
    gsap.to('.hero-parallax-bg', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: 12,
      scale: 1.05,
    });

    gsap.to('.hero-parallax-content', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      yPercent: -15,
      opacity: 0,
    });
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-v-black"
    >
      {/* Background Video and Image with Ken Burns Parallax Zoom */}
      <div className="absolute inset-0 w-full h-full hero-parallax-bg scale-110 select-none pointer-events-none z-0">
        {/* Continuous High-Res Fallback Image */}
        <img 
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80" 
          alt="VEDRA Luxury Estate" 
          className="absolute inset-0 object-cover w-full h-full opacity-35 filter brightness-[0.7] contrast-[1.1] z-0"
        />

        {/* Slow Architectural Video layer on top */}
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 object-cover w-full h-full opacity-30 filter brightness-[0.7] contrast-[1.1] z-10"
        >
          <source 
            src="https://assets.mixkit.co/videos/preview/mixkit-modern-architecture-building-with-pool-40742-large.mp4" 
            type="video/mp4" 
          />
        </video>
        
        {/* Soft luxury filters and dark gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-v-black via-transparent to-v-black/50 z-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_95%)] z-20" />
      </div>

      {/* Hero Content Wrapper */}
      <div className="relative z-10 text-center flex flex-col items-center justify-center px-4 w-full max-w-4xl hero-parallax-content">
        
        {/* Monogram / Logo Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8"
        >
          <VedraLogo showSub={true} className="w-full max-w-[320px] md:max-w-[400px]" animated={true} />
        </motion.div>

        {/* Tagline Reveal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="flex flex-col items-center gap-4"
        >
          <h2 
            className="text-v-ivory text-lg md:text-2xl font-serif font-light tracking-[0.3em] uppercase leading-relaxed relative"
          >
            Where Architecture Meets Prestige
            {/* Shimmer Light Sweep Effect */}
            <span className="absolute bottom-[-8px] left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-v-gold/70 to-transparent overflow-hidden">
              <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-v-ivory to-transparent -translate-x-full animate-light-sweep" />
            </span>
          </h2>
          
          <p className="text-xs md:text-sm font-sans tracking-[0.2em] uppercase text-v-beige/65 max-w-lg mt-4 leading-loose pl-[0.2em]">
            Crafting bespoke architectural monuments for the extraordinary.
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 1.2, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-6 mt-12 w-full justify-center max-w-md"
        >
          <a
            href="#projects"
            onClick={handleExploreClick}
            className="group relative overflow-hidden px-8 py-3.5 border border-v-gold text-xs tracking-[0.25em] uppercase font-semibold text-v-black bg-v-gold hover-interactive hover:text-v-ivory transition-all duration-500 rounded-none flex items-center justify-center gap-2"
          >
            <span className="absolute inset-0 w-full h-full bg-v-black -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10">Explore Estates</span>
          </a>
          
          <a
            href="#contact"
            className="group relative overflow-hidden px-8 py-3.5 border border-v-ivory/20 text-xs tracking-[0.25em] uppercase font-semibold text-v-ivory bg-transparent hover-interactive hover:border-v-gold transition-all duration-500 rounded-none flex items-center justify-center gap-2"
          >
            <span className="absolute inset-0 w-full h-full bg-v-gold/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
            <span className="relative z-10">Private Concierge</span>
          </a>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 select-none opacity-60 hover:opacity-100 transition-opacity duration-300">
        <span className="text-[9px] font-sans tracking-[0.3em] uppercase text-v-beige pl-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="h-4 w-4 text-v-gold" />
        </motion.div>
      </div>
    </section>
  );
}
