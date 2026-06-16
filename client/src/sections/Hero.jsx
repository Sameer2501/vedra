import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VedraLogo } from '../components/Logo';
import { ArrowDown, Home, Sparkles, Shield } from 'lucide-react';
import heroImg from '../assets/hero.jpg';

gsap.registerPlugin(ScrollTrigger);

// Hotspot component that is counter-scaled to maintain size on phone screens
const Hotspot = ({ top, left, scale, title, subtitle, description, align = 'left', icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return; // Hover only on desktop
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className="absolute z-30 pointer-events-auto"
      style={{ 
        top, 
        left, 
        transform: `translate(-50%, -50%) scale(${1 / scale})`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Glowing pulsing dot */}
      <button className="relative flex items-center justify-center h-9 w-9 rounded-full cursor-pointer group focus:outline-none">
        <span className="absolute inline-flex h-full w-full rounded-full bg-v-gold/30 opacity-75 animate-ping" />
        <span className="absolute inline-flex h-6 w-6 rounded-full bg-v-gold/15 transition-transform duration-500 group-hover:scale-125 border border-v-gold/30" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-v-gold shadow-[0_0_12px_rgba(198,167,106,0.9)] transition-transform duration-300 group-hover:scale-110" />
      </button>

      {/* Glassmorphic detailed tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute bottom-11 ${
              align === 'right' ? 'right-0 translate-x-1/4 origin-bottom-right' : 'left-0 -translate-x-1/4 origin-bottom-left'
            } w-64 glass-panel p-4 rounded-none shadow-2xl border-v-gold/25 z-40 pointer-events-auto`}
            onClick={(e) => e.stopPropagation()} // Stop propagation to avoid closing
          >
            <div className="flex items-start gap-2.5">
              {Icon && <Icon className="h-3.5 w-3.5 text-v-gold mt-1 flex-shrink-0" />}
              <div>
                <span className="text-[8px] font-sans tracking-[0.25em] text-v-gold uppercase block mb-0.5">
                  {subtitle}
                </span>
                <h4 className="text-[11px] font-serif text-v-ivory uppercase tracking-wider mb-1.5">
                  {title}
                </h4>
                <p className="text-[9px] font-sans text-v-beige/85 leading-relaxed tracking-wide">
                  {description}
                </p>
              </div>
            </div>
            
            {/* Design corner brackets */}
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-v-gold/40" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-v-gold/40" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Hero() {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(1);

  // Motion values for smooth 2.5D mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 75, mass: 0.65 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  // Background shifts slightly in cursor direction
  const bgX = useTransform(xSpring, [-0.5, 0.5], [-20, 20]);
  const bgY = useTransform(ySpring, [-0.5, 0.5], [-20, 20]);

  // Center typography content shifts in the opposite direction
  const contentX = useTransform(xSpring, [-0.5, 0.5], [25, -25]);
  const contentY = useTransform(ySpring, [-0.5, 0.5], [25, -25]);

  // Handle scaling layout of 1024x682 container to act like bg-cover
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const imgWidth = 1024;
      const imgHeight = 682;
      const imgRatio = imgWidth / imgHeight;
      const screenRatio = w / h;

      let newScale = 1;
      if (screenRatio > imgRatio) {
        newScale = w / imgWidth;
      } else {
        newScale = h / imgHeight;
      }
      setScale(newScale);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set((clientX / innerWidth) - 0.5);
    mouseY.set((clientY / innerHeight) - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial zoom on gates
      gsap.fromTo(['.hero-gate-left-inner', '.hero-gate-right-inner'],
        { scale: 1.15, filter: 'grayscale(35%) brightness(0.45)' },
        { 
          scale: 1.0, 
          filter: 'grayscale(0%) brightness(0.65)',
          duration: 3.2,
          ease: 'power2.out',
          delay: 0.1
        }
      );

      // 2. Synchronized entrance timeline (triggered as preloader exits)
      const tl = gsap.timeline({ delay: 3.4 });

      tl.fromTo('.hero-gate-left',
        { x: 0, opacity: 1 },
        { x: -550, opacity: 0, duration: 2.0, ease: 'power3.inOut' }
      )
      .fromTo('.hero-gate-right',
        { x: 0, opacity: 1 },
        { x: 480, opacity: 0, duration: 2.0, ease: 'power3.inOut' },
        '<' // run in parallel
      )
      .fromTo('.hero-parallax-content',
        { opacity: 0, scale: 0.94, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 1.6, ease: 'power2.out' },
        '-=1.4'
      )
      // 3D Door pivots open
      .to('.hero-door-panel', {
        rotateY: -110,
        duration: 2.0,
        ease: 'power2.inOut',
      }, '-=1.0')
      // Door volumetric light casts onto cobblestones
      .to('.door-light-beam', {
        opacity: 0.75,
        duration: 1.6,
        ease: 'power1.out',
      }, '-=1.6');

      // 3. ScrollTrigger parallax zoom on active background
      gsap.to('.hero-bg-scale-container', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        yPercent: 8,
        scale: scale * 1.08,
      });

      // 4. ScrollTrigger parallax fade out on typography content
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

    }, containerRef);

    return () => ctx.revert();
  }, [scale]);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hotspots positioned exactly on 1024x682 layout coordinates
  const hotspotsData = [
    {
      top: 218,
      left: 348,
      title: 'Sky Penthouse Terrace',
      subtitle: 'Premium Outdoor Living',
      description: 'Stunning cedar trellis structural elements shading a third-level cantilevered open-air retreat with views of the estate.',
      align: 'left',
      icon: Home
    },
    {
      top: 436,
      left: 625,
      title: 'Grand Entrance Atrium',
      subtitle: 'Architectural Glazing',
      description: 'An imposing 18-foot custom pivoting steel-reinforced glass entry door flanked by columns of high-performance architectural glazing.',
      align: 'left',
      icon: Sparkles
    },
    {
      top: 607,
      left: 215,
      title: 'Vintage Car Forecourt',
      subtitle: 'Cobblestone Entryway',
      description: 'Fine basalt stone cobbles, integrated ambient ground lighting uplighting the facade, showcasing iconic collector automobiles.',
      align: 'right',
      icon: Shield
    }
  ];

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505] cursor-default"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* 2.5D Mouse-Tracked Parallax Background Wrapper */}
      <motion.div 
        className="absolute inset-0 w-full h-full select-none z-0 pointer-events-none"
        style={{ x: bgX, y: bgY }}
      >
        {/* Aspect-Ratio Centered Scale Container */}
        <div 
          className="hero-bg-scale-container absolute left-1/2 top-1/2 origin-center pointer-events-none"
          style={{
            width: 1024,
            height: 682,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          {/* STATIC BASE IMAGE */}
          <img 
            src={heroImg} 
            className="absolute inset-0 w-full h-full object-cover opacity-45 pointer-events-none"
            alt="VEDRA Villa"
          />

          {/* Warm glowing doorway interior */}
          <div 
            className="absolute bg-gradient-to-r from-v-gold via-amber-400 to-v-gold shadow-[0_0_35px_rgba(198,167,106,0.7)] pointer-events-none"
            style={{
              left: 612,
              top: 370,
              width: 86,
              height: 230,
            }}
          />

          {/* Volumetric light beam casting onto pavement (SVG polygon) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1024 682">
            <defs>
              <linearGradient id="door-light-beam" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#C6A76A" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#C6A76A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon 
              className="door-light-beam"
              points="612,600 698,600 740,682 560,682" 
              fill="url(#door-light-beam)" 
              style={{ opacity: 0 }}
            />
          </svg>

          {/* Pivoting 3D Door Panel */}
          <div 
            className="hero-door-panel absolute bg-[#101010] border-r border-v-gold/30 shadow-[4px_0_12px_rgba(0,0,0,0.6)] z-10 pointer-events-none"
            style={{
              left: 612,
              top: 370,
              width: 86,
              height: 230,
              transformOrigin: 'left center',
              transformStyle: 'preserve-3d',
              perspective: 1000,
            }}
          />

          {/* Responsive, Counter-Scaled Hotspots Overlay */}
          <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
            {hotspotsData.map((hs, index) => (
              <Hotspot
                key={index}
                top={hs.top}
                left={hs.left}
                scale={scale}
                title={hs.title}
                subtitle={hs.subtitle}
                description={hs.description}
                align={hs.align}
                icon={hs.icon}
              />
            ))}
          </div>

          {/* DOUBLE GATES (Positioned on top of active background inside scale helper) */}
          <div className="absolute inset-0 w-full h-full z-30 pointer-events-none overflow-hidden">
            
            {/* LEFT GATE (53% of width) */}
            <div 
              className="hero-gate-left absolute top-0 left-0 h-full overflow-hidden border-r border-v-gold/25 pointer-events-none"
              style={{ width: 545 }}
            >
              <div 
                className="hero-gate-left-inner absolute top-0 left-0 h-full bg-cover bg-center pointer-events-none"
                style={{
                  backgroundImage: `url(${heroImg})`,
                  width: 1024,
                  height: 682,
                  left: 0,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-v-black/80 via-transparent to-v-black/50 pointer-events-none" />
            </div>

            {/* RIGHT GATE (47% of width) */}
            <div 
              className="hero-gate-right absolute top-0 left-[545px] h-full overflow-hidden border-l border-v-gold/25 pointer-events-none"
              style={{ width: 479 }}
            >
              <div 
                className="hero-gate-right-inner absolute top-0 h-full bg-cover bg-center pointer-events-none"
                style={{
                  backgroundImage: `url(${heroImg})`,
                  width: 1024,
                  height: 682,
                  left: -545,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-v-black/80 via-transparent to-v-black/50 pointer-events-none" />
            </div>
            
          </div>
        </div>
      </motion.div>

      {/* CENTRAL CORE CONTENT (Placed behind gates in HTML, but z-index 10 is clickable due to pointer-events-none on gates container) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 select-none">
        
        {/* Luxury Rotating blueprint lines in background */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-10 pointer-events-none">
          <svg className="w-[320px] h-[320px] md:w-[600px] md:h-[600px]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <motion.circle 
              cx="100" cy="100" r="80" 
              fill="none" stroke="#C6A76A" strokeWidth="0.25" strokeDasharray="3 3"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
            />
            <motion.circle 
              cx="100" cy="100" r="50" 
              fill="none" stroke="#C6A76A" strokeWidth="0.25" strokeDasharray="1 2"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 45, ease: "linear" }}
            />
            <line x1="20" y1="100" x2="180" y2="100" stroke="#C6A76A" strokeWidth="0.1" />
            <line x1="100" y1="20" x2="100" y2="180" stroke="#C6A76A" strokeWidth="0.1" />
          </svg>
        </div>

        {/* Brand details and CTAs */}
        <motion.div 
          className="text-center flex flex-col items-center justify-center px-4 w-full max-w-4xl hero-parallax-content pointer-events-auto"
          style={{ x: contentX, y: contentY }}
        >
          {/* Monogram Reveal */}
          <div className="mb-6 md:mb-8">
            <VedraLogo showSub={true} className="w-full max-w-[260px] sm:max-w-[320px] md:max-w-[400px]" animated={true} />
          </div>

          {/* Tagline Reveal */}
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <h2 className="text-v-ivory text-sm sm:text-base md:text-2xl font-serif font-light tracking-[0.25em] md:tracking-[0.3em] uppercase leading-relaxed relative">
              Where Architecture Meets Prestige
              <span className="absolute bottom-[-8px] left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-v-gold/70 to-transparent overflow-hidden">
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-v-ivory to-transparent -translate-x-full animate-light-sweep" />
              </span>
            </h2>
            
            <p className="text-[10px] md:text-sm font-sans tracking-[0.15em] md:tracking-[0.2em] uppercase text-v-beige/65 max-w-[280px] sm:max-w-lg mt-2 md:mt-4 leading-relaxed pl-[0.15em]">
              Crafting bespoke architectural monuments for the extraordinary.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-10 md:mt-12 w-full justify-center max-w-[260px] sm:max-w-md">
            <a
              href="#projects"
              onClick={handleExploreClick}
              className="group relative overflow-hidden px-6 md:px-8 py-3 md:py-3.5 border border-v-gold text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold text-v-black bg-v-gold hover-interactive hover:text-v-ivory transition-all duration-500 rounded-none flex items-center justify-center gap-2 pointer-events-auto"
            >
              <span className="absolute inset-0 w-full h-full bg-v-black -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10">Explore Estates</span>
            </a>
            
            <a
              href="#contact"
              className="group relative overflow-hidden px-6 md:px-8 py-3 md:py-3.5 border border-v-ivory/20 text-[10px] md:text-xs tracking-[0.2em] uppercase font-semibold text-v-ivory bg-transparent hover-interactive hover:border-v-gold transition-all duration-500 rounded-none flex items-center justify-center gap-2 pointer-events-auto"
            >
              <span className="absolute inset-0 w-full h-full bg-v-gold/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10">Private Concierge</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 md:gap-2 select-none opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <span className="text-[8px] md:text-[9px] font-sans tracking-[0.3em] uppercase text-v-beige pl-[0.3em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="h-3.5 w-3.5 md:h-4 md:w-4 text-v-gold" />
        </motion.div>
      </div>
    </section>
  );
}
