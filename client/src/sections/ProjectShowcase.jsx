import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Maximize2, Compass } from 'lucide-react';
import house1 from '../assets/house1.jpg';

gsap.registerPlugin(ScrollTrigger);

// Fallback project list if backend is not reachable
const FALLBACK_PROJECTS = [
  {
    "id": "sunview-enclave",
    "title": "148 SUNVIEW ENCLAVE",
    "location": "Ludhiana · Punjab",
    "category": "Residential Estate",
    "year": "2024",
    "area": "1,200 sq m",
    "value": "On Request",
    "description": "A grand, modern architectural masterpiece blending raw concrete, warm wood panels, and massive glass portals. Perched beautifully with a private landscaped lawn, featuring double-height ceiling voids and seamless indoor-outdoor transition tailored for high-end luxury living.",
    "features": ["Double-Height Ceiling", "Private Landscaped Lawn", "Bespoke Automation", "Glass Portals"],
    "image": house1,
    "specificationUrl": "https://148sunviewenclave.netlify.app/",
  },
  {
    "id": "ivory-monolith",
    "title": "The Ivory Monolith",
    "location": "Zermatt Valley, Switzerland",
    "category": "Alpine Sanctuary",
    "year": "2025",
    "area": "1,450 sq m",
    "value": "$34,000,000",
    "description": "A pristine white travertine sanctuary nestled in the heart of the Swiss Alps. Designed with structural concrete arches that blend into the snowy landscape, featuring a heated indoor-outdoor infinity pool facing the Matterhorn.",
    "features": ["Alpine Travertine", "Heated Infinity Pool", "Private Observatory", "Oxygen-Enriched Master Suite"],
    "image": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80",
    "specificationUrl": "#contact",
  }
];

export default function ProjectShowcase() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);
  const pinContainerRef = useRef(null);

  const navigate = useNavigate();

  const handleNavigateToInterior = (projectId) => {
    navigate(`/interior?project=${projectId}`);
  };

  // No backend active - displaying premium local database directly


  useEffect(() => {
    // GSAP ScrollTrigger for horizontal scroll pinning
    const panels = gsap.utils.toArray('.project-panel');
    if (panels.length === 0) return;

    let ctx = gsap.context(() => {
      gsap.to(scrollSectionRef.current, {
        x: () => -(scrollSectionRef.current.scrollWidth - window.innerWidth),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinContainerRef.current,
          scrub: 1,
          start: 'top top',
          end: () => `+=${scrollSectionRef.current.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <section 
      ref={containerRef}
      id="projects" 
      className="relative bg-v-black overflow-hidden"
    >
      {/* Pinned horizontal wrapper */}
      <div ref={pinContainerRef} className="h-screen w-full flex items-center overflow-hidden">
        
        <div 
          ref={scrollSectionRef}
          className="flex flex-nowrap items-center h-full px-12 md:px-24 gap-12 md:gap-24"
          style={{ willChange: 'transform' }}
        >
          
          {/* Header Panel */}
          <div className="project-panel flex-shrink-0 w-[80vw] md:w-[450px] flex flex-col justify-center text-left">
            <span className="text-xs font-sans tracking-luxury-wide uppercase text-v-gold font-semibold mb-4">
              Signature Collection
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-light text-v-ivory leading-tight mb-6">
              Our Modern <br />
              <span className="gold-gradient-text italic font-medium">Masterpieces</span>
            </h2>
            <div className="h-[1px] w-20 bg-v-gold mb-6" />
            <p className="text-xs font-sans tracking-[0.15em] text-v-beige/60 uppercase mb-8">
              Swipe or scroll down to traverse through the portfolio of architectural landmarks.
            </p>
            <div className="flex items-center gap-3 text-v-gold text-xs tracking-luxury uppercase">
              <span>Scroll Down</span>
              <ArrowRight className="h-3.5 w-3.5 animate-bounce-horizontal" style={{ animation: 'float 3s infinite' }} />
            </div>
          </div>

          {/* Project List Panels */}
          {projects.map((project, idx) => (
            <div 
              key={project.id}
              className="project-panel flex-shrink-0 w-[90vw] md:w-[850px] h-[75vh] glass-panel border border-v-gold/10 p-6 md:p-10 flex flex-col md:flex-row gap-8 relative overflow-hidden group hover:border-v-gold/30 transition-all duration-700"
            >
              {/* Background ambient gold gradient glow inside card */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(198,167,106,0.06),transparent_60%)] pointer-events-none" />
              
              {/* Image side */}
              <div className="w-full md:w-[55%] h-[320px] md:h-full overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-v-black/40 to-transparent" />
                
                {/* Index number indicator */}
                <div className="absolute top-4 left-4 glass-panel border border-v-gold/25 px-3 py-1.5 text-xs font-serif text-v-gold">
                  0{idx + 1}
                </div>
              </div>

              {/* Data/Detail side */}
              <div className="w-full md:w-[45%] flex flex-col justify-between py-2 text-left">
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-sans tracking-luxury uppercase text-v-gold mb-3">
                    <MapPin className="h-3 w-3" />
                    <span>{project.location}</span>
                  </div>
                  
                  <h3 className="text-2xl md:text-3xl font-serif text-v-ivory font-light mb-4 group-hover:text-v-gold transition-colors duration-500">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-v-beige/70 leading-relaxed font-light mb-6 md:mb-8 line-clamp-4">
                    {project.description}
                  </p>

                  {/* Project specific stats */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-v-gold/10 py-4 mb-6">
                    <div>
                      <span className="block text-[9px] font-sans tracking-luxury text-v-beige/50 uppercase">Enclosed Area</span>
                      <span className="text-sm font-serif text-v-ivory">{project.area}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] font-sans tracking-luxury text-v-beige/50 uppercase">Valuation</span>
                      <span className="text-sm font-serif text-v-gold font-medium">{project.value}</span>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="flex justify-end items-center">
                  <button 
                    onClick={() => handleNavigateToInterior(project.id)}
                    className="flex items-center gap-2 border border-v-gold/30 hover:border-v-gold hover:bg-v-gold hover:text-v-black px-5 py-2.5 text-xs tracking-luxury uppercase font-medium text-v-ivory transition-all duration-500 hover-interactive cursor-pointer"
                  >
                    <span>Specification</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
