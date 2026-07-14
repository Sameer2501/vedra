import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles, Compass } from 'lucide-react';

const INTERIOR_DATA = {
  'obsidian-pavilion': {
    title: 'The Obsidian Pavilion',
    subtitle: 'Dark Volcanic Minimalism',
    location: 'Reykjavík Cliffs, Iceland',
    heroImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=90',
    description: 'The interior of The Obsidian Pavilion is a masterclass in monolithic minimalism, sculpted out of volcanic basalt and polished concrete. Designed to offer a stark yet deeply comforting sanctuary against the raw Icelandic elements, the layout features custom dark headboards, smoked oak finishes, and floating shelves with hidden golden linear lighting.',
    accentColor: '#C6A76A',
    specs: [
      { label: 'Primary Stone', value: 'Volcanic Basalt' },
      { label: 'Acoustic Panel', value: 'Smoked Oak Wood' },
      { label: 'Lighting System', value: 'Bespoke Warm LED' },
      { label: 'Heated Zones', value: 'Basalt Floors' }
    ],
    gallery: [
      {
        title: 'Obsidian Archive Chambers',
        desc: 'Floor-to-ceiling smoked oak bookcases featuring concealed LED linear channels and integrated hand-stitched leather panels for acoustic perfection.',
        image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=800&q=90'
      },
      {
        title: 'Subterranean Granite Bathhouse',
        desc: 'An in-ground thermal bath carved from matte dark granite slabs, illuminated by a singular linear skylight framing the path of the sun.',
        image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=90'
      }
    ]
  },
  'ivory-monolith': {
    title: 'The Ivory Monolith',
    subtitle: 'Warm Alpine Sanctuary',
    location: 'Zermatt Valley, Switzerland',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=90',
    description: 'Bathed in light, the interior design of The Ivory Monolith is an exquisite blend of high-altitude tranquility and architectural warmth. Centered around a majestic 5-meter fireplace carved from monolithic Italian travertine stone, the sanctuary incorporates soft wool textiles, white cedar timbers, and floor-to-ceiling windows overlooking the Matterhorn.',
    accentColor: '#C6A76A',
    specs: [
      { label: 'Primary Stone', value: 'Italian Travertine' },
      { label: 'Timber Framings', value: 'White Mountain Cedar' },
      { label: 'Floor Finish', value: 'Heated Limestone' },
      { label: 'Textiles', value: 'Bespoke Swiss Alp Wool' }
    ],
    gallery: [
      {
        title: 'The Alpine Glass Pavilion',
        desc: 'Overlooking the peak, the master bed floats on a platform of white cedar with 360-degree structural glazing that slides open into the thin mountain air.',
        image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=800&q=90'
      },
      {
        title: 'Minimalist Floating Atrium',
        desc: 'Dual-height ceilings supported by a single bronze pillar, connecting the ocean-front dining area with a sunken glass outdoor terrace.',
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=90'
      }
    ]
  }
};

export default function InteriorDetail({ projectId }) {
  const navigate = useNavigate();
  // Fallback to obsidian-pavilion if projectId is invalid
  const projectKey = INTERIOR_DATA[projectId] ? projectId : 'obsidian-pavilion';
  const data = INTERIOR_DATA[projectKey];

  const goBack = (e) => {
    e.preventDefault();
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  return (
    <section className="min-h-screen bg-v-black text-v-ivory pt-28 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,167,106,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Navigation & Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <button
            onClick={goBack}
            className="group flex items-center gap-2 border border-v-gold/20 hover:border-v-gold/60 px-4 py-2.5 text-[10px] tracking-luxury uppercase font-medium bg-v-black/40 backdrop-blur-md text-v-beige hover:text-v-ivory transition-all duration-500 hover-interactive"
          >
            <ArrowLeft className="h-4 w-4 text-v-gold group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Projects</span>
          </button>

          <div className="text-left md:text-right">
            <span className="text-[10px] font-sans tracking-luxury-wide uppercase text-v-gold font-semibold block mb-1">
              {data.location}
            </span>
            <span className="text-xs text-v-beige/60 uppercase tracking-widest block">
              Atelier VEDRA Living
            </span>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative h-[55vh] w-full overflow-hidden border border-v-gold/10 glass-panel mb-16 group">
          <div className="absolute inset-0 z-0">
            <img
              src={data.heroImage}
              alt={data.title}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-[3000ms] ease-out opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-v-black via-v-black/40 to-transparent" />
          </div>

          <div className="absolute bottom-10 left-6 md:left-12 right-6 flex flex-col md:flex-row md:items-end justify-between text-left">
            <div>
              <span className="text-xs font-sans tracking-luxury uppercase text-v-gold font-semibold mb-2 block">
                {data.subtitle}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-light tracking-wide text-v-ivory">
                {data.title} <span className="gold-gradient-text italic font-medium">Interior</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Description & Technical specifications */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start text-left mb-20">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-xs font-sans tracking-luxury text-v-gold uppercase mb-4">
              <Sparkles className="h-4 w-4 text-v-gold" />
              <span>Architectural Interior Statement</span>
            </div>
            <p className="text-base md:text-lg text-v-beige/90 leading-relaxed font-light mb-6">
              {data.description}
            </p>
            <p className="text-xs text-v-beige/60 leading-relaxed max-w-2xl">
              Interior design for VEDRA is not an afterthought, but an ongoing dialogue between core structure, local light quality, and acoustic comfort. By using rich, raw material textures combined with meticulous layout planning, we craft spaces that feel deeply grounding, quiet, and extraordinary.
            </p>
          </div>

          {/* Technical Specs Card */}
          <div className="glass-panel border border-v-gold/15 p-6 md:p-8 relative">
            <div className="absolute top-0 right-0 w-20 h-20 bg-[radial-gradient(circle_at_top_right,rgba(198,167,106,0.06),transparent_50%)] pointer-events-none" />
            <h3 className="text-xs font-sans tracking-luxury uppercase text-v-gold font-semibold mb-6 pb-2 border-b border-v-gold/10">
              Material Palette & Specifications
            </h3>
            <div className="flex flex-col gap-4">
              {data.specs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center text-xs pb-3 border-b border-v-gold/5 last:border-0 last:pb-0">
                  <span className="text-v-beige/50 font-sans tracking-wider uppercase">{spec.label}</span>
                  <span className="text-v-ivory font-serif tracking-wide">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Curated Gallery Showcase */}
        <div>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 text-left">
            <div>
              <span className="text-[10px] font-sans tracking-luxury uppercase text-v-gold font-semibold block mb-2">
                Detailed Views
              </span>
              <h2 className="text-2xl md:text-3xl font-serif font-light text-v-ivory">
                Bespoke Living <span className="gold-gradient-text italic font-medium">Zones</span>
              </h2>
            </div>
            <p className="text-xs font-sans tracking-widest text-v-beige/50 uppercase mt-4 md:mt-0">
              Hover items to inspect bespoke elements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.gallery.map((item, idx) => (
              <div
                key={idx}
                className="group relative h-[400px] overflow-hidden glass-panel border border-v-gold/10 p-6 flex flex-col justify-end text-left hover:border-v-gold/30 transition-all duration-700"
              >
                <div className="absolute inset-0 z-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms] ease-out mix-blend-luminosity group-hover:mix-blend-normal opacity-50 group-hover:opacity-85"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-v-black via-v-black/20 to-transparent" />
                </div>

                <div className="relative z-10">
                  <h3 className="text-lg md:text-xl font-serif text-v-ivory font-light mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-v-beige/70 leading-relaxed font-light opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-24 overflow-hidden transition-all duration-700 ease-out">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back CTA Button */}
        <div className="mt-16 pt-8 border-t border-v-gold/10 flex justify-center">
          <button
            onClick={goBack}
            className="group flex items-center gap-3 border border-v-gold px-8 py-3 text-xs tracking-luxury uppercase font-medium text-v-ivory bg-v-gold/10 hover:bg-v-gold/25 transition-all duration-500 hover-interactive"
          >
            <span>Return to Portfolio</span>
            <Compass className="h-4 w-4 text-v-gold group-hover:rotate-45 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
}
