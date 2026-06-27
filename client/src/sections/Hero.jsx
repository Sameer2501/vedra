import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown } from 'lucide-react';
import clientVideo2 from '../assets/clientVideo2.mp4';
import heroImg from '../assets/hero.jpg';
import phoneVideo from '../assets/phoneVideo.mp4';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial fade-in of background video container
      gsap.fromTo('.hero-video-container',
        { scale: 1.05, opacity: 0 },
        { 
          scale: 1.0, 
          opacity: 1,
          duration: 3.0,
          ease: 'power2.out',
          delay: 0.1
        }
      );

      // 2. Synchronized entrance timeline (triggered as preloader exits)
      const tl = gsap.timeline({ delay: 3.4 });

      tl.fromTo('.hero-parallax-content',
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 1.8, ease: 'power3.out' }
      )
      .call(() => {
        // Play the video from the beginning once the preloader transitions away
        if (videoRef.current) {
          videoRef.current.play().catch(err => {
            console.log("Autoplay blocked or play programmatically failed:", err);
          });
        }
        if (mobileVideoRef.current) {
          mobileVideoRef.current.play().catch(err => {
            console.log("Mobile autoplay blocked or play programmatically failed:", err);
          });
        }
      }, null, '-=1.8');

      // 3. ScrollTrigger parallax zoom on background video
      gsap.to('.hero-video-container', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        yPercent: 12,
        scale: 1.05,
      });

      // 4. ScrollTrigger parallax shift on typography content
      gsap.to('.hero-parallax-content', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
        yPercent: -15,
      });

    }, containerRef);

    // --- GOLD DUST PARTICLES CANVAS SYSTEM ---
    const canvas = canvasRef.current;
    if (canvas) {
      const gl = canvas.getContext('2d');
      let animationFrameId;
      let particles = [];

      const resizeCanvas = () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      class GoldParticle {
        constructor() {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * 1.5 + 0.3; // Tiny luxury dust specs
          this.speedX = Math.random() * 0.15 - 0.075; // Slow ambient sway
          this.speedY = Math.random() * -0.15 - 0.05; // Gentle upward drift
          this.opacity = Math.random() * 0.4 + 0.1;
        }

        update() {
          this.x += this.speedX;
          this.y += this.speedY;

          // Wrap horizontally
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;

          // Wrap vertically (re-spawn at bottom)
          if (this.y < 0) {
            this.y = canvas.height;
            this.x = Math.random() * canvas.width;
            this.opacity = Math.random() * 0.4 + 0.1;
          }
        }

        draw() {
          gl.beginPath();
          gl.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          gl.fillStyle = `rgba(198, 167, 106, ${this.opacity})`; // Gold #C6A76A
          gl.fill();
        }
      }

      // Proportional particle count based on screen width
      const particleCount = Math.min(80, Math.floor(canvas.width / 12));
      for (let i = 0; i < particleCount; i++) {
        particles.push(new GoldParticle());
      }

      const renderLoop = () => {
        gl.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
        animationFrameId = requestAnimationFrame(renderLoop);
      };

      renderLoop();

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', resizeCanvas);
        ctx.revert(); // GSAP revert
      };
    }

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-[#050505] cursor-default"
    >
      {/* Background Wrapper */}
      <div className="hero-video-container absolute inset-0 w-full h-full select-none z-0 pointer-events-none">
        {/* Desktop Background Video */}
        <video
          ref={videoRef}
          src={clientVideo2}
          muted
          playsInline
          loop={false}
          className="hidden md:block w-full h-full object-cover opacity-45 pointer-events-none object-[65%_bottom]"
        />

        {/* Mobile Background Video */}
        <video
          ref={mobileVideoRef}
          src={phoneVideo}
          poster={heroImg}
          muted
          playsInline
          loop={false}
          className="block md:hidden w-full h-full object-cover opacity-45 pointer-events-none"
        />

        {/* Luxury ambient gold dust overlay */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
        />

        {/* Elegant dark vignette overlay to ensure high contrast for typography */}
        <div className="absolute inset-0 bg-gradient-to-b from-v-black/50 via-transparent to-v-black/90 pointer-events-none z-[2]" />
      </div>

      {/* CENTRAL CORE CONTENT */}
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
        >
          {/* Tagline Reveal */}
          <div className="flex flex-col items-center gap-3 md:gap-4">
            <span className="text-sm md:text-lg font-serif tracking-[0.3em] text-v-gold uppercase mb-1">
              Ved — Knowledge. Dra — Roots.
            </span>
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
