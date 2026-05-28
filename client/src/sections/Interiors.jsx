import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Maximize2, Sparkles } from 'lucide-react';

const CATEGORIES = ['All', 'Living Rooms', 'Master Suites', 'Private Libraries', 'Wellness Spas'];

const INTERIOR_ITEMS = [
  {
    id: 1,
    category: 'Living Rooms',
    title: "Travertine Hearth Lounge",
    desc: "A massive 5-meter fireplace carved from monolithic Italian travertine stone sets the volume, balanced by soft wool textiles and floating brass shelves.",
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=90"
  },
  {
    id: 2,
    category: 'Master Suites',
    title: "The Alpine Glass Pavilion",
    desc: "Overlooking the peak, the master bed floats on a platform of white cedar with 360-degree structural glazing that slides open into the thin mountain air.",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1200&q=90"
  },
  {
    id: 3,
    category: 'Private Libraries',
    title: "Obsidian Archive Chambers",
    desc: "Floor-to-ceiling smoked oak bookcases featuring concealed LED linear channels and integrated hand-stitched leather panels for acoustic perfection.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=90"
  },
  {
    id: 4,
    category: 'Wellness Spas',
    title: "Subterranean Granite Bathhouse",
    desc: "An in-ground thermal bath carved from matte dark granite slabs, illuminated by a singular linear skylight framing the path of the sun.",
    image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=90"
  },
  {
    id: 5,
    category: 'Living Rooms',
    title: "Minimalist Floating Atrium",
    desc: "Dual-height ceilings supported by a single bronze pillar, connecting the ocean-front dining area with a sunken glass outdoor terrace.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=90"
  },
  {
    id: 6,
    category: 'Master Suites',
    title: "Under-Bed Obsidian Bedding",
    desc: "Planted directly onto polished dark basalt tiles, custom integrated headboards with ambient golden glowing niches.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=90"
  }
];

export default function Interiors() {
  const [selectedCat, setSelectedCat] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = selectedCat === 'All' 
    ? INTERIOR_ITEMS 
    : INTERIOR_ITEMS.filter(item => item.category === selectedCat);

  return (
    <section 
      id="interiors" 
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 bg-v-black overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 text-left">
          <div>
            <span className="text-xs font-sans tracking-luxury-wide uppercase text-v-gold font-semibold mb-4 block">
              Curated Interiors
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-light text-v-ivory leading-tight">
              Spaces Designed <br />
              <span className="gold-gradient-text italic font-medium">To Feel Extraordinary</span>
            </h2>
          </div>
          <p className="text-xs font-sans tracking-[0.15em] text-v-beige/60 uppercase max-w-sm mt-6 md:mt-0 leading-relaxed">
            Every room is studied as a micro-climate of luxury, blending acoustic dynamics, indirect lighting design, and raw textures.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-3 md:gap-4 mb-12 pb-2 border-b border-v-gold/10 overflow-x-auto justify-start select-none">
          {CATEGORIES.map(cat => {
            const isActive = selectedCat === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`text-[10px] md:text-xs font-sans tracking-luxury uppercase px-4 py-2 border transition-all duration-500 hover-interactive whitespace-nowrap ${
                  isActive 
                    ? 'bg-v-gold border-v-gold text-v-black font-semibold' 
                    : 'border-transparent text-v-beige/60 hover:text-v-ivory hover:border-v-gold/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                key={item.id}
                className="group relative h-[380px] overflow-hidden glass-panel border border-v-gold/10 flex flex-col justify-end p-6 hover:border-v-gold/30 transition-all duration-700"
              >
                {/* Background Image with Zoom */}
                <div className="absolute inset-0 z-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1500ms] ease-out mix-blend-luminosity group-hover:mix-blend-normal opacity-50 group-hover:opacity-75"
                  />
                  {/* Subtle dark vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-v-black via-v-black/30 to-transparent" />
                </div>

                {/* Floating Content */}
                <div className="relative z-10 text-left">
                  <div className="flex items-center gap-1 text-[8px] font-sans tracking-luxury text-v-gold uppercase mb-2">
                    <Sparkles className="h-2.5 w-2.5" />
                    <span>{item.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-serif text-v-ivory font-light mb-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-[11px] text-v-beige/65 leading-relaxed font-light mb-4 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-700 ease-out">
                    {item.desc}
                  </p>
                  
                  <button 
                    onClick={() => setSelectedImage(item)}
                    className="w-8 h-8 rounded-full border border-v-gold/30 hover:border-v-gold flex items-center justify-center text-v-gold bg-v-black/50 hover:bg-v-gold hover:text-v-black transition-all duration-500 hover-interactive"
                    aria-label="Enlarge view"
                  >
                    <Maximize2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Fullscreen Image Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-v-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedImage(null)}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 text-v-ivory bg-v-gray/80 hover:bg-v-gold hover:text-v-black p-2 border border-v-gold/20 rounded-full transition-all duration-300 hover-interactive"
              >
                <X className="h-6 w-6" />
              </button>

              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="relative max-w-5xl w-full max-h-[85vh] bg-v-gray border border-v-gold/20 flex flex-col md:flex-row"
                onClick={e => e.stopPropagation()}
              >
                {/* Image side */}
                <div className="w-full md:w-2/3 max-h-[50vh] md:max-h-[85vh] overflow-hidden">
                  <img 
                    src={selectedImage.image} 
                    alt={selectedImage.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Details side */}
                <div className="w-full md:w-1/3 p-8 flex flex-col justify-between text-left">
                  <div>
                    <span className="text-[10px] font-sans tracking-luxury-wide uppercase text-v-gold font-semibold mb-2 block">
                      {selectedImage.category}
                    </span>
                    <h3 className="text-2xl font-serif text-v-ivory font-light mb-4">
                      {selectedImage.title}
                    </h3>
                    <div className="h-[1px] w-12 bg-v-gold/30 mb-4" />
                    <p className="text-xs text-v-beige/85 leading-relaxed font-light">
                      {selectedImage.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-v-gold/10">
                    <p className="text-[9px] font-sans tracking-widest text-v-beige/40 uppercase">
                      Atelier VEDRA Living / Bespoke Interiors
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
