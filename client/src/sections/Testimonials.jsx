import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "The Obsidian Pavilion is not a house; it is a canvas of light and volcanic stone. Standing in the central atrium as a winter storm sweeps the Icelandic cliffs feels like piloting a vessel carved directly out of the Earth. VEDRA translated our abstract desires into a monument of structural physics.",
    author: "Helmut V. K.",
    role: "Venture Architect & Art Collector",
    estate: "The Obsidian Pavilion"
  },
  {
    id: 2,
    quote: "We required absolute, impenetrable privacy and complete acoustic silence. The sound isolation of our Alpine sanctuary is absolute—even the mountain winds disappear. The architectural concrete arches blend effortlessly with the snow. VEDRA did not just build, they crafted a sanctuary.",
    author: "Dr. Sophia A.",
    role: "Neurological Researcher & Author",
    estate: "The Ivory Monolith"
  },
  {
    id: 3,
    quote: "Their dedication to geological preservation and custom detailing is unmatched. Most builders compile pre-fabricated pieces; VEDRA sculpts heirloom assets that will remain relevant for centuries. The Amalfi subterranean boat dock is a masterclass in structural engineering.",
    author: "Laurent D.",
    role: "Maritime Designer & Investor",
    estate: "The Aurelia Villa"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const handlePrev = () => {
    setCurrent(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      id="testimonials" 
      className="relative min-h-[80vh] py-24 md:py-32 px-6 md:px-12 bg-v-black overflow-hidden flex items-center"
    >
      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Giant decorative quotation mark backing */}
        <div className="absolute top-[-40px] left-[-20px] md:left-[-60px] opacity-[0.03] text-v-gold pointer-events-none select-none">
          <Quote className="h-32 w-32 md:h-48 md:w-48" />
        </div>

        <div className="text-left relative">
          <span className="text-xs font-sans tracking-luxury-wide uppercase text-v-gold font-semibold mb-6 block">
            Client Testimonials
          </span>

          <div className="min-h-[280px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              >
                <blockquote className="text-xl md:text-3xl font-serif text-v-ivory font-light leading-relaxed mb-8">
                  "{TESTIMONIALS[current].quote}"
                </blockquote>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between border-t border-v-gold/10 pt-6">
                  <div>
                    <cite className="not-italic text-base font-serif text-v-gold font-medium">
                      {TESTIMONIALS[current].author}
                    </cite>
                    <span className="text-xs font-sans text-v-beige/60 block mt-1">
                      {TESTIMONIALS[current].role}
                    </span>
                  </div>
                  
                  <div className="text-xs font-sans tracking-luxury text-v-beige/40 uppercase mt-4 md:mt-0">
                    Portfolio / {TESTIMONIALS[current].estate}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slider controls */}
          <div className="flex items-center gap-4 mt-12 select-none justify-start">
            <button
              onClick={handlePrev}
              className="w-10 h-10 border border-v-gold/20 hover:border-v-gold text-v-gold hover:text-v-black hover:bg-v-gold rounded-none flex items-center justify-center transition-all duration-500 hover-interactive"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <span className="text-xs font-sans tracking-widest text-v-beige/40 uppercase">
              0{current + 1} / 0{TESTIMONIALS.length}
            </span>
            
            <button
              onClick={handleNext}
              className="w-10 h-10 border border-v-gold/20 hover:border-v-gold text-v-gold hover:text-v-black hover:bg-v-gold rounded-none flex items-center justify-center transition-all duration-500 hover-interactive"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
