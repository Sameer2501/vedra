import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Hammer, Eye, Feather } from 'lucide-react';

const HOTSPOTS = [
  {
    id: 1,
    x: '28%',
    y: '35%',
    icon: <Compass className="h-4 w-4" />,
    title: "Cantilevered Gravity Vaulters",
    subtitle: "Structural Reinforced Concrete",
    desc: "Our vaults utilize high-performance, double-reinforced graphite concrete. The structures are engineered to cantilever up to 9 meters without vertical columns, creating floating frames that blend interior ceilings with the sky."
  },
  {
    id: 2,
    x: '68%',
    y: '20%',
    icon: <Hammer className="h-4 w-4" />,
    title: "Oxidized Golden Jointing",
    subtitle: "Bespoke Hand-Brushed Brass",
    desc: "Joints and weather caps are crafted from pure brass slabs, hand-brushed with an organic acid solution to accelerate natural weathering. Over decades, it oxidizes to a rich dark bronze-gold tone that mirrors moss and limestone."
  },
  {
    id: 3,
    x: '42%',
    y: '78%',
    icon: <Feather className="h-4 w-4" />,
    title: "Thermal Travertine Plinths",
    subtitle: "Porous Italian Limestone",
    desc: "Cut in monolithic 3-meter blocks from thermal quarries in Italy, our travertine retains a raw porous exterior face, while the walking surface is diamond-honed to a silky matte beige. Warm, structural, and geologically timeless."
  },
  {
    id: 4,
    x: '82%',
    y: '65%',
    icon: <Eye className="h-4 w-4" />,
    title: "Structural Boundary Glazing",
    subtitle: "Triple-Glazed Pure Quartz Panels",
    desc: "Spanning 6 meters high, these German-engineered structural panels are completely frameless, recessed directly into concrete pocket channels. High UV filtering ensures internal climate comfort while maintaining absolute visual purity."
  }
];

export default function Architecture() {
  const [activeHotspot, setActiveHotspot] = useState(HOTSPOTS[0]);

  return (
    <section 
      id="architecture" 
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 bg-v-black overflow-hidden flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left column: Text details and explanations */}
        <div className="lg:col-span-5 flex flex-col justify-center text-left order-2 lg:order-1">
          <span className="text-xs font-sans tracking-luxury-wide uppercase text-v-gold font-semibold mb-4">
            Structural Artistry
          </span>
          
          <h2 className="text-3xl md:text-5xl font-serif font-light text-v-ivory leading-tight mb-8">
            The Philosophy of <br />
            <span className="gold-gradient-text italic font-medium">Bespoke Form</span>
          </h2>
          
          <p className="text-sm text-v-beige/70 leading-relaxed font-light mb-8 max-w-lg">
            Hover or click on the spatial hotspots to dissect the geological and structural elements behind VEDRA's signature architecture.
          </p>

          {/* Active hotspot detail card */}
          <div className="relative h-[250px] w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeHotspot.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="glass-panel border-l-2 border-l-v-gold p-6 h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="p-2 bg-v-gold/10 border border-v-gold/20 text-v-gold">
                      {activeHotspot.icon}
                    </span>
                    <div>
                      <h3 className="font-serif text-lg text-v-ivory leading-none">
                        {activeHotspot.title}
                      </h3>
                      <span className="text-[10px] font-sans tracking-widest text-v-beige/50 uppercase block mt-1.5">
                        {activeHotspot.subtitle}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-v-beige/70 leading-relaxed font-light mt-4">
                    {activeHotspot.desc}
                  </p>
                </div>
                
                <div className="text-[10px] font-sans tracking-luxury text-v-gold/50 uppercase">
                  Signature Detail / VL-0{activeHotspot.id}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right column: Interactive Blueprint Render */}
        <div className="lg:col-span-7 relative w-full aspect-video md:aspect-[4/3] lg:h-[600px] flex items-center justify-center order-1 lg:order-2">
          
          {/* Decorative frame overlay */}
          <div className="absolute inset-[-10px] border border-v-gold/5 pointer-events-none" />
          
          {/* Main Visual Board */}
          <div className="relative w-full h-full overflow-hidden bg-v-gray border border-v-gold/10">
            <img 
              src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90" 
              alt="Minimal Architectural Detail" 
              className="object-cover w-full h-full opacity-60 mix-blend-luminosity filter contrast-[1.1] brightness-[0.8]"
            />
            
            {/* Dark vignette grid */}
            <div className="absolute inset-0 bg-gradient-to-tr from-v-black/80 via-transparent to-v-black/30" />
            
            {/* Render overlay grid lines */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(198,167,106,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(198,167,106,0.03)_1px,transparent_1px)] bg-[size:30px_30px]" />

            {/* Floating Blueprint Markers */}
            {HOTSPOTS.map((hotspot) => {
              const isActive = activeHotspot.id === hotspot.id;
              return (
                <button
                  key={hotspot.id}
                  onClick={() => setActiveHotspot(hotspot)}
                  onMouseEnter={() => setActiveHotspot(hotspot)}
                  className="absolute cursor-pointer hover-interactive group focus:outline-none z-20"
                  style={{ top: hotspot.y, left: hotspot.x }}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring pulsing element */}
                    <span className="absolute w-8 h-8 rounded-full bg-v-gold/30 hotspot-ring" />
                    
                    {/* Main dot trigger */}
                    <span 
                      className={`relative w-4 h-4 rounded-full border transition-all duration-300 flex items-center justify-center text-[8px] font-sans ${
                        isActive 
                          ? 'bg-v-gold border-v-gold text-v-black scale-125' 
                          : 'bg-v-black border-v-gold text-v-gold group-hover:bg-v-gold group-hover:text-v-black group-hover:scale-110'
                      }`}
                    >
                      {hotspot.id}
                    </span>
                  </div>
                </button>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
}
