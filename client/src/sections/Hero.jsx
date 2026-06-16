import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VedraLogo } from '../components/Logo';
import { ArrowDown, Home, Sparkles, Shield } from 'lucide-react';
import heroImg from '../assets/hero.jpg';

gsap.registerPlugin(ScrollTrigger);

// Hotspot component to detail architectural points
const Hotspot = ({ top, left, title, subtitle, description, align = 'left', icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div
      className="absolute z-30 pointer-events-auto"
      style={{ top, left, transform: 'translate(-50%, -50%)' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => setIsOpen(!isOpen)}
    >
      {/* Glowing pulsing halo */}
      <button className="relative flex items-center justify-center h-10 w-10 rounded-full cursor-pointer group focus:outline-none">
        <span className="absolute inline-flex h-full w-full rounded-full bg-v-gold/25 opacity-75 animate-ping" />
        <span className="absolute inline-flex h-7 w-7 rounded-full bg-v-gold/15 transition-transform duration-500 group-hover:scale-125 border border-v-gold/30" />
        <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-v-gold shadow-[0_0_12px_rgba(198,167,106,0.9)] transition-transform duration-300 group-hover:scale-110" />
      </button>

      {/* Glassmorphic detailed tooltip */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute bottom-12 ${
              align === 'right' ? 'right-0 translate-x-1/4 origin-bottom-right' : 'left-0 -translate-x-1/4 origin-bottom-left'
            } w-72 glass-panel p-5 rounded-none shadow-2xl border-v-gold/25 z-40 pointer-events-auto`}
          >
            <div className="flex items-start gap-3">
              {Icon && <Icon className="h-4 w-4 text-v-gold mt-1 flex-shrink-0" />}
              <div>
                <span className="text-[9px] font-sans tracking-[0.25em] text-v-gold uppercase block mb-1">
                  {subtitle}
                </span>
                <h4 className="text-xs font-serif text-v-ivory uppercase tracking-wider mb-2">
                  {title}
                </h4>
                <p className="text-[10px] font-sans text-v-beige/80 leading-relaxed tracking-wide">
                  {description}
                </p>
              </div>
            </div>
            
            {/* Design accents */}
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

  // Motion values for smooth 2.5D mouse parallax displacement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 45, stiffness: 80, mass: 0.6 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  // Gates shift together in mouse direction
  const gateX = useTransform(xSpring, [-0.5, 0.5], [-20, 20]);
  const gateY = useTransform(ySpring, [-0.5, 0.5], [-20, 20]);

  // Center typography/logo contents shift opposite direction
  const contentX = useTransform(xSpring, [-0.5, 0.5], [25, -25]);
  const contentY = useTransform(ySpring, [-0.5, 0.5], [25, -25]);

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
      // 1. Initial seamless image scaling zoom in
      gsap.fromTo(['.hero-gate-left-inner', '.hero-gate-right-inner'],
        { scale: 1.2, filter: 'grayscale(35%) brightness(0.35)' },
        { 
          scale: 1.05, 
          filter: 'grayscale(0%) brightness(0.65)',
          duration: 3.2,
          ease: 'power2.out',
          delay: 0.2
        }
      );

      // 2. Gate Opening Animation Timeline (synchronized to run as preloader fades out)
      const tl = gsap.timeline({ delay: 3.4 });

      tl.fromTo('.hero-gate-left',
        { x: '0%' },
        { x: '-70%', duration: 2.2, ease: 'power3.inOut' }
      )
      .fromTo('.hero-gate-right',
        { x: '0%' },
        { x: '70%', duration: 2.2, ease: 'power3.inOut' },
        '<' // run simultaneously
      )
      .fromTo('.hero-parallax-content',
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: 'power2.out' },
        '-=1.5' // fade-in overlap as gates are opening
      )
      .fromTo('.blueprint-grid-path',
        { strokeDashoffset: 500, opacity: 0 },
        { strokeDashoffset: 0, opacity: 0.2, duration: 2.2, ease: 'power1.inOut' },
        '-=2.0'
      );

      // 3. ScrollTrigger to slide gates completely off-screen on scroll down
      gsap.to('.hero-gate-left', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        x: '-100%',
      });

      gsap.to('.hero-gate-right', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        x: '100%',
      });

      // 4. ScrollTrigger to fade out the revealed center content on scroll
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
  }, []);

  const handleExploreClick = (e) => {
    e.preventDefault();
    const target = document.getElementById('about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hotspots definitions mapped coordinates relative to the left & right gates
  const leftGateHotspots = [
    {
      top: '32%',
      left: '64.15%', // (34% screen left / 53% gate width)
      title: 'Sky Penthouse Terrace',
      subtitle: 'Premium Outdoor Living',
      description: 'Stunning cedar trellis structural elements shading a third-level cantilevered open-air retreat with views of the estate.',
      align: 'left',
      icon: Home
    },
    {
      top: '89%',
      left: '39.62%', // (21% screen left / 53% gate width)
      title: 'Vintage Car Forecourt',
      subtitle: 'Cobblestone Entryway',
      description: 'Fine basalt stone cobbles, integrated ambient ground lighting uplighting the facade, showcasing iconic collector automobiles.',
      align: 'right',
      icon: Shield
    }
  ];

  const rightGateHotspots = [
    {
      top: '64%',
      left: '23.4%', // ((64% screen left - 53% offset) / 47% gate width)
      title: 'Grand Entrance Atrium',
      subtitle: 'Architectural Glazing',
      description: 'An imposing 18-foot custom pivoting steel-reinforced glass entry door flanked by columns of high-performance architectural glazing.',
      align: 'left',
      icon: Sparkles
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
      {/* CENTRAL CORE (Behind the gates, revealed when they slide open) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-10 select-none">
        
        {/* Luxury Rotating blueprint lines in background */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-10">
          <svg className="w-[600px] h-[600px]" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
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

        {/* Brand Information & CTA */}
        <motion.div 
          className="text-center flex flex-col items-center justify-center px-4 w-full max-w-4xl hero-parallax-content pointer-events-auto"
          style={{ x: contentX, y: contentY }}
        >
          {/* Monogram Reveal */}
          <div className="mb-8">
            <VedraLogo showSub={true} className="w-full max-w-[320px] md:max-w-[400px]" animated={true} />
          </div>

          {/* Tagline Reveal */}
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-v-ivory text-lg md:text-2xl font-serif font-light tracking-[0.3em] uppercase leading-relaxed relative">
              Where Architecture Meets Prestige
              <span className="absolute bottom-[-8px] left-[10%] w-[80%] h-[1px] bg-gradient-to-r from-transparent via-v-gold/70 to-transparent overflow-hidden">
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-v-ivory to-transparent -translate-x-full animate-light-sweep" />
              </span>
            </h2>
            
            <p className="text-xs md:text-sm font-sans tracking-[0.2em] uppercase text-v-beige/65 max-w-lg mt-4 leading-loose pl-[0.2em]">
              Crafting bespoke architectural monuments for the extraordinary.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 mt-12 w-full justify-center max-w-md">
            <a
              href="#projects"
              onClick={handleExploreClick}
              className="group relative overflow-hidden px-8 py-3.5 border border-v-gold text-xs tracking-[0.25em] uppercase font-semibold text-v-black bg-v-gold hover-interactive hover:text-v-ivory transition-all duration-500 rounded-none flex items-center justify-center gap-2 pointer-events-auto"
            >
              <span className="absolute inset-0 w-full h-full bg-v-black -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10">Explore Estates</span>
            </a>
            
            <a
              href="#contact"
              className="group relative overflow-hidden px-8 py-3.5 border border-v-ivory/20 text-xs tracking-[0.25em] uppercase font-semibold text-v-ivory bg-transparent hover-interactive hover:border-v-gold transition-all duration-500 rounded-none flex items-center justify-center gap-2 pointer-events-auto"
            >
              <span className="absolute inset-0 w-full h-full bg-v-gold/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0" />
              <span className="relative z-10">Private Concierge</span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* DOUBLE GATE PORTALS (Hover parallax applied) */}
      <motion.div 
        className="absolute inset-0 w-full h-full pointer-events-none z-20 scale-110 flex"
        style={{ x: gateX, y: gateY }}
      >
        {/* LEFT GATE PANEL (Width 53vw) */}
        <div 
          className="hero-gate-left absolute top-0 left-0 h-full overflow-hidden border-r border-v-gold/20 pointer-events-none"
          style={{ width: '53vw' }}
        >
          <div 
            className="hero-gate-left-inner absolute top-0 left-0 h-full bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url(${heroImg})`,
              width: '100vw',
              left: '0vw',
            }}
          />
          {/* Subtle gradient dimming overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-v-black/80 via-transparent to-v-black/50 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_95%)] opacity-55 pointer-events-none" />
          
          {/* Hotspots for Left Panel */}
          <div className="absolute inset-0 pointer-events-none">
            {leftGateHotspots.map((hs, index) => (
              <Hotspot
                key={index}
                top={hs.top}
                left={hs.left}
                title={hs.title}
                subtitle={hs.subtitle}
                description={hs.description}
                align={hs.align}
                icon={hs.icon}
              />
            ))}
          </div>
        </div>

        {/* RIGHT GATE PANEL (Width 47vw) */}
        <div 
          className="hero-gate-right absolute top-0 left-[53vw] h-full overflow-hidden border-l border-v-gold/20 pointer-events-none"
          style={{ width: '47vw' }}
        >
          <div 
            className="hero-gate-right-inner absolute top-0 h-full bg-cover bg-center pointer-events-none"
            style={{
              backgroundImage: `url(${heroImg})`,
              width: '100vw',
              left: '-53vw',
            }}
          />
          {/* Subtle gradient dimming overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-v-black/80 via-transparent to-v-black/50 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_95%)] opacity-55 pointer-events-none" />
          
          {/* Hotspots for Right Panel */}
          <div className="absolute inset-0 pointer-events-none">
            {rightGateHotspots.map((hs, index) => (
              <Hotspot
                key={index}
                top={hs.top}
                left={hs.left}
                title={hs.title}
                subtitle={hs.subtitle}
                description={hs.description}
                align={hs.align}
                icon={hs.icon}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Animated Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 select-none opacity-60 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
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
