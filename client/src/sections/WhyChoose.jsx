import React from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, Compass, Globe, Landmark } from 'lucide-react';

const PILLARS = [
  {
    id: 1,
    icon: <Landmark className="h-6 w-6 text-v-gold" />,
    title: "Bespoke Craftsmanship",
    desc: "We operate outside industrial standard timelines. Every slab of stone, bronze fitting, and joinery seal is finished manually by multi-generational masons and ironmongers who treat construction as permanent sculpturing."
  },
  {
    id: 2,
    icon: <Compass className="h-6 w-6 text-v-gold" />,
    title: "Elite Geographical Sites",
    desc: "We secure only highly exclusive, rare geographical land parcels. Whether perched on volcanic ocean cliffs or nestled inside deep alpine valleys, each site is selected for its permanent, dramatic view corridors."
  },
  {
    id: 3,
    icon: <Globe className="h-6 w-6 text-v-gold" />,
    title: "Geological Scale Legacy",
    desc: "Using graphite-carbon basalt concrete, smart geothermal energy fields, and structural glazing that insulates for centuries, our structures are engineered to outlast geological cycles with zero structural maintenance."
  },
  {
    id: 4,
    icon: <ShieldAlert className="h-6 w-6 text-v-gold" />,
    title: "Acoustic & Light Wellness",
    desc: "Working with sensory engineers, we calculate solar geometry to sweep light elegantly across rooms, and design thick multi-layered walls that guarantee a sound rating of 0dB, blocking all external frequencies."
  }
];

export default function WhyChoose() {
  return (
    <section 
      id="why-choose" 
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 bg-v-black overflow-hidden flex items-center"
    >
      {/* Soft ambient background glow */}
      <div className="absolute top-[40%] left-[30%] w-[600px] h-[600px] rounded-full bg-v-gold-glow-soft blur-[140px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-xs font-sans tracking-luxury-wide uppercase text-v-gold font-semibold mb-4 block">
            Pillars of Excellence
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-light text-v-ivory leading-tight mb-6">
            The VEDRA <span className="gold-gradient-text italic font-medium">Standard</span>
          </h2>
          <p className="text-xs md:text-sm font-sans tracking-[0.15em] text-v-beige/65 uppercase leading-relaxed">
            Constructing sanctuaries that embody absolute privacy, geological scale preservation, and artistic gravity.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: idx * 0.15, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              key={pillar.id}
              className="group relative p-8 md:p-10 glass-panel bg-v-gray/25 border border-v-gold/10 hover:border-v-gold/30 hover:bg-v-gray/40 transition-all duration-700 text-left flex flex-col justify-between h-[300px]"
            >
              {/* Dynamic light border glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(198,167,106,0.04),transparent_50%)] pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  {/* Icon wrap with thin gold border */}
                  <span className="p-3 bg-v-gold/5 border border-v-gold/20 rounded-none group-hover:bg-v-gold/10 transition-colors duration-500">
                    {pillar.icon}
                  </span>
                  
                  <span className="text-xs font-serif text-v-gold/30 group-hover:text-v-gold transition-colors duration-500">
                    // 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-serif text-v-ivory font-light mb-4 group-hover:text-v-gold transition-colors duration-500">
                  {pillar.title}
                </h3>
                
                <p className="text-xs text-v-beige/70 leading-relaxed font-light">
                  {pillar.desc}
                </p>
              </div>

              {/* Decorative line highlight */}
              <div className="h-[1px] w-0 group-hover:w-full bg-gradient-to-r from-transparent via-v-gold/40 to-transparent transition-all duration-700 ease-out mt-6" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
