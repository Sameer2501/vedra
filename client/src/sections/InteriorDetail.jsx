import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

const PROJECT_SPEC_DATA = {
  'sunview-enclave': {
    title: '148 SUNVIEW ENCLAVE',
    location: 'Ludhiana · Punjab',
    facades: [
      {
        title: 'Front Elevation',
        noon: 'https://148sunviewenclave.netlify.app/assets/front-noon.jpg',
        night: 'https://148sunviewenclave.netlify.app/assets/front-night.jpg',
      },
      {
        title: 'Side Elevation',
        noon: 'https://148sunviewenclave.netlify.app/assets/side-noon.jpg',
        night: 'https://148sunviewenclave.netlify.app/assets/side-night.jpg',
      }
    ],
    plans: [
      { short: 'GF', name: 'Ground Floor Plan', image: 'https://148sunviewenclave.netlify.app/assets/floor-1.webp' },
      { short: 'FF', name: 'First Floor Plan', image: 'https://148sunviewenclave.netlify.app/assets/floor-2.webp' },
      { short: 'SF', name: 'Second Floor & Terrace Plan', image: 'https://148sunviewenclave.netlify.app/assets/floor-3.webp' }
    ],
    pdfUrl: 'https://148sunviewenclave.netlify.app/assets/Vedra-Living-183-Sunview-Floor-Plans.pdf'
  },
  'ivory-monolith': {
    title: 'The Ivory Monolith',
    location: 'Zermatt Valley, Switzerland',
    facades: [
      {
        title: 'Front Elevation',
        noon: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
        night: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
      },
      {
        title: 'Side Elevation',
        noon: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
        night: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80',
      }
    ],
    plans: [
      { short: 'GF', name: 'Ground Floor Plan', image: 'https://148sunviewenclave.netlify.app/assets/floor-1.webp' },
      { short: 'FF', name: 'First Floor Plan', image: 'https://148sunviewenclave.netlify.app/assets/floor-2.webp' },
      { short: 'SF', name: 'Second Floor & Terrace Plan', image: 'https://148sunviewenclave.netlify.app/assets/floor-3.webp' }
    ],
    pdfUrl: 'https://148sunviewenclave.netlify.app/assets/Vedra-Living-183-Sunview-Floor-Plans.pdf'
  }
};

function ImageCompare({ noonImg, nightImg, title }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef(null);

  const handleMove = (clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleTouchMove = (e) => {
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e) => {
    if (e.buttons === 1 || e.type === 'mousemove') { // Drag or simple move
      handleMove(e.clientX);
    }
  };

  return (
    <article className="flex flex-col items-center mb-12 w-full">
      <header className="flex justify-between items-center w-full max-w-2xl mb-4 px-2">
        <span className="font-serif text-lg text-v-ivory font-light">{title}</span>
        <span className="text-[10px] font-sans tracking-widest text-v-gold/70 uppercase">Drag to View Daylight / Dusk</span>
      </header>
      
      <div 
        ref={containerRef}
        className="relative w-full max-w-2xl aspect-[16/10] overflow-hidden select-none cursor-ew-resize border border-v-gold/10 rounded-sm"
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
      >
        {/* Layer Noon */}
        <img 
          src={noonImg} 
          alt="Elevation Noon" 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        
        {/* Layer Night */}
        <div 
          className="absolute inset-y-0 left-0 right-0 overflow-hidden pointer-events-none"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img 
            src={nightImg} 
            alt="Elevation Night" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            style={{ width: containerRef.current ? containerRef.current.offsetWidth : '100%' }}
          />
        </div>

        {/* Handle bar */}
        <div 
          className="absolute inset-y-0 w-0.5 bg-v-gold z-20 pointer-events-none"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border border-v-gold bg-[#050505] flex items-center justify-center shadow-lg">
            <span className="text-[10px] text-v-gold font-sans font-bold">↔</span>
          </div>
        </div>

        {/* Noon / Night Indicators */}
        <div className="absolute bottom-4 left-4 z-10 bg-v-black/80 border border-v-gold/20 px-2.5 py-1 text-[9px] tracking-widest uppercase text-v-ivory">
          Noon
        </div>
        <div className="absolute bottom-4 right-4 z-10 bg-v-black/80 border border-v-gold/20 px-2.5 py-1 text-[9px] tracking-widest uppercase text-v-gold">
          Night
        </div>
      </div>
    </article>
  );
}

function FloorPlansViewer({ plans, pdfUrl }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevFloor = () => {
    setCurrentIdx((prev) => (prev === 0 ? plans.length - 1 : prev - 1));
  };

  const nextFloor = () => {
    setCurrentIdx((prev) => (prev === plans.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
      <header className="flex justify-between items-center w-full mb-4 px-2">
        <span className="font-serif text-lg text-v-ivory font-light">Residence Floor Plans</span>
        <span className="text-[10px] font-sans tracking-widest text-v-beige/50 uppercase">
          {currentIdx + 1} / {plans.length}
        </span>
      </header>

      {/* Main plan view frame */}
      <div className="relative w-full aspect-[16/10] bg-v-gray border border-v-gold/10 rounded-sm flex items-center justify-center p-4 md:p-8 select-none">
        {/* Navigation arrows */}
        <button 
          onClick={prevFloor}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full border border-v-gold/20 bg-v-black/60 hover:bg-v-black hover:border-v-gold text-v-gold flex items-center justify-center transition-all duration-300 hover-interactive cursor-pointer"
        >
          ←
        </button>
        <button 
          onClick={nextFloor}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full border border-v-gold/20 bg-v-black/60 hover:bg-v-black hover:border-v-gold text-v-gold flex items-center justify-center transition-all duration-300 hover-interactive cursor-pointer"
        >
          →
        </button>

        <img 
          src={plans[currentIdx].image} 
          alt={plans[currentIdx].name} 
          className="max-w-full max-h-full object-contain"
        />

        <div className="absolute bottom-4 left-4 bg-v-black/80 border border-v-gold/20 px-3 py-1.5 text-[10px] tracking-wider uppercase text-v-gold font-medium">
          {plans[currentIdx].name}
        </div>
      </div>

      {/* Selector tabs */}
      <div className="flex justify-center gap-2 mt-6 w-full">
        {plans.map((plan, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={`px-4 py-2 border text-[10px] tracking-luxury uppercase font-medium transition-all duration-300 hover-interactive cursor-pointer ${
              idx === currentIdx 
                ? 'border-v-gold bg-v-gold/10 text-v-gold' 
                : 'border-v-gold/10 hover:border-v-gold/40 text-v-beige/60 hover:text-v-ivory'
            }`}
          >
            {plan.short}
          </button>
        ))}
      </div>

      {/* Download PDF button */}
      <div className="mt-8">
        <a 
          href={pdfUrl} 
          download
          className="inline-flex items-center gap-2 border border-v-gold/30 hover:border-v-gold hover:bg-v-gold hover:text-v-black px-6 py-2.5 text-xs tracking-luxury uppercase font-medium text-v-ivory transition-all duration-500 hover-interactive"
        >
          Download Floor Plans PDF
        </a>
      </div>
    </div>
  );
}

export default function InteriorDetail({ projectId }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('facade'); // 'facade' or 'floorplans'

  // Fallback to sunview-enclave if projectId is invalid
  const projectKey = PROJECT_SPEC_DATA[projectId] ? projectId : 'sunview-enclave';
  const data = PROJECT_SPEC_DATA[projectKey];

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
    <section className="min-h-screen bg-[#050505] text-v-ivory pt-28 pb-20 px-6 md:px-12 relative overflow-hidden">
      {/* Background radial ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(198,167,106,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Navigation & Header */}
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <button
            onClick={goBack}
            className="group flex items-center gap-2 border border-v-gold/20 hover:border-v-gold/60 px-4 py-2.5 text-[10px] tracking-luxury uppercase font-medium bg-v-black/40 backdrop-blur-md text-v-beige hover:text-v-ivory transition-all duration-500 hover-interactive cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 text-v-gold group-hover:-translate-x-1 transition-transform duration-300" />
            <span>Back to Projects</span>
          </button>

          <div className="text-left md:text-right">
            <span className="text-[10px] font-sans tracking-luxury-wide uppercase text-v-gold font-semibold block mb-1">
              {data.location}
            </span>
            <span className="text-xs text-v-beige/60 uppercase tracking-widest block font-serif">
              {data.title}
            </span>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex justify-center border-b border-v-gold/10 pb-4 mb-12">
          <div className="inline-flex gap-4">
            <button
              onClick={() => setActiveTab('facade')}
              className={`pb-2 text-xs tracking-luxury uppercase font-medium transition-all duration-300 hover-interactive cursor-pointer relative ${
                activeTab === 'facade' ? 'text-v-gold' : 'text-v-beige/50 hover:text-v-ivory'
              }`}
            >
              Exterior Facade
              {activeTab === 'facade' && (
                <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-v-gold animate-fade-in" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('floorplans')}
              className={`pb-2 text-xs tracking-luxury uppercase font-medium transition-all duration-300 hover-interactive cursor-pointer relative ${
                activeTab === 'floorplans' ? 'text-v-gold' : 'text-v-beige/50 hover:text-v-ivory'
              }`}
            >
              Floor Plans
              {activeTab === 'floorplans' && (
                <span className="absolute bottom-[-17px] left-0 w-full h-[2px] bg-v-gold animate-fade-in" />
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Section Rendering */}
        <div className="w-full py-4 min-h-[50vh]">
          {activeTab === 'facade' ? (
            <div className="flex flex-col items-center">
              <p className="text-[10px] font-sans tracking-widest text-v-beige/40 uppercase mb-8">
                Read in Light · Noon to Night
              </p>
              {data.facades.map((facade, index) => (
                <ImageCompare 
                  key={index}
                  title={facade.title}
                  noonImg={facade.noon}
                  nightImg={facade.night}
                />
              ))}
            </div>
          ) : (
            <FloorPlansViewer plans={data.plans} pdfUrl={data.pdfUrl} />
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mt-16 pt-8 border-t border-v-gold/10 flex justify-center">
          <button
            onClick={goBack}
            className="group flex items-center gap-3 border border-v-gold px-8 py-3 text-xs tracking-luxury uppercase font-medium text-v-ivory bg-v-gold/10 hover:bg-v-gold/25 transition-all duration-500 hover-interactive cursor-pointer"
          >
            <span>Return to Portfolio</span>
            <Compass className="h-4 w-4 text-v-gold group-hover:rotate-45 transition-transform duration-500" />
          </button>
        </div>
      </div>
    </section>
  );
}
