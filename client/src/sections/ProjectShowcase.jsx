import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, MapPin, Maximize2, Compass } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Fallback project list if backend is not reachable
const FALLBACK_PROJECTS = [
  {
    "id": "obsidian-pavilion",
    "title": "The Obsidian Pavilion",
    "location": "Reykjavík Cliffs, Iceland",
    "category": "Residential Estate",
    "year": "2024",
    "area": "1,200 sq m",
    "value": "$28,500,000",
    "description": "A dark architectural marvel carved out of volcanic basalt and polished concrete, perched on a private Icelandic cliffside. Features absolute minimalism, floor-to-ceiling glass, and a cantilevered outdoor lounge suspended over the North Atlantic Ocean.",
    "features": ["Cantilevered Lounge", "Volcanic Basalt Walls", "Subterranean Spa", "Helipad Access"],
    "image": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
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
  },
  {
    "id": "aurelia-villa",
    "title": "The Aurelia Villa",
    "location": "Amalfi Coast, Italy",
    "category": "Coastal Estate",
    "year": "2026",
    "area": "980 sq m",
    "value": "$24,200,000",
    "description": "A modern coastal villa blending warm golden limestone, hand-brushed brass detailing, and ancient olive trees. Pinned directly to the Amalfi cliffs with subterranean boat docks and glass floors revealing the crystal Mediterranean waters below.",
    "features": ["Subterranean Boat Dock", "Glass-Floor Atrium", "Citrus-Groove Terraces", "Gold-Leaf Accented Spa"],
    "image": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1920&q=80",
  },
  {
    "id": "lumina-atrium",
    "title": "The Lumina Atrium",
    "location": "Kyoto Hills, Japan",
    "category": "Wellness Estate",
    "year": "2026",
    "area": "1,150 sq m",
    "value": "$31,800,000",
    "description": "A futuristic wellness estate designed with sustainably harvested hinoki cedar, dynamic smart-glass dome roofs, and indoor Zen rock gardens. Features a 15-meter waterfall centerpiece that regulates internal humidity and air purity naturally.",
    "features": ["Hinoki Cedar Frame", "15m Indoor Waterfall", "Smart-Glass Dome Roof", "Bespoke Onsen Bathhouse"],
    "image": "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1920&q=80",
  }
];

export default function ProjectShowcase() {
  const [projects, setProjects] = useState(FALLBACK_PROJECTS);
  const containerRef = useRef(null);
  const scrollSectionRef = useRef(null);

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
          pin: true,
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
      <div className="h-screen w-full flex items-center overflow-hidden">
        
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
              <div className="w-full md:w-1/2 h-[280px] md:h-full overflow-hidden relative">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-v-black/40 to-transparent" />
                
                {/* Index number indicator */}
                <div className="absolute top-4 left-4 glass-panel border border-v-gold/25 px-3 py-1.5 text-xs font-serif text-v-gold">
                  0{idx + 1}
                </div>
              </div>

              {/* Data/Detail side */}
              <div className="w-full md:w-1/2 flex flex-col justify-between py-2 text-left">
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
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-sans tracking-luxury text-v-beige/40 uppercase">
                    Est. Delivery {project.year}
                  </span>
                  
                  <a 
                    href="#contact"
                    className="flex items-center gap-2 border border-v-gold/30 group-hover:border-v-gold hover:bg-v-gold hover:text-v-black px-4 py-2 text-xs tracking-luxury uppercase font-medium text-v-ivory transition-all duration-500 hover-interactive"
                  >
                    <span>Request Dossier</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
