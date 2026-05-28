import React from 'react';
import { VedraLogo } from './Logo';
import { Instagram, Linkedin, Facebook, Twitter, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-v-black border-t border-v-gold/10 py-16 px-6 md:px-12 relative overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-v-gold-glow-soft blur-[100px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10">
        
        {/* Upper footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-v-gold/10 items-start text-left">
          
          {/* Logo brand card */}
          <div className="lg:col-span-1 flex flex-col items-start">
            <VedraLogo showSub={true} className="w-full max-w-[200px]" />
            <p className="text-[11px] font-sans text-v-beige/50 tracking-wide mt-6 leading-relaxed max-w-xs pl-[0.1em]">
              Crafting premium architectural sanctuaries and structural landmarks across the world's most exclusive geographies.
            </p>
          </div>

          {/* Site Navigation */}
          <div>
            <h4 className="text-xs font-serif tracking-luxury text-v-gold uppercase mb-6">Directory</h4>
            <div className="flex flex-col gap-3">
              {['About', 'Projects', 'Architecture', 'Interiors', 'Timeline'].map((link) => (
                <a 
                  key={link} 
                  href={`#${link.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(link.toLowerCase());
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="text-xs font-sans text-v-beige/65 hover:text-v-gold tracking-widest uppercase transition-all duration-300 hover-interactive"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Social connections */}
          <div>
            <h4 className="text-xs font-serif tracking-luxury text-v-gold uppercase mb-6">Social Portals</h4>
            <div className="flex flex-col gap-3">
              {[
                { name: 'Instagram', icon: <Instagram className="h-3.5 w-3.5" />, href: 'https://instagram.com' },
                { name: 'LinkedIn', icon: <Linkedin className="h-3.5 w-3.5" />, href: 'https://linkedin.com' },
                { name: 'Facebook', icon: <Facebook className="h-3.5 w-3.5" />, href: 'https://facebook.com' },
                { name: 'Twitter / X', icon: <Twitter className="h-3.5 w-3.5" />, href: 'https://twitter.com' }
              ].map((soc) => (
                <a 
                  key={soc.name} 
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-sans text-v-beige/65 hover:text-v-gold tracking-widest uppercase transition-all duration-300 hover-interactive"
                >
                  {soc.icon}
                  <span>{soc.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Legal / Policy */}
          <div>
            <h4 className="text-xs font-serif tracking-luxury text-v-gold uppercase mb-6">Inquiries</h4>
            <p className="text-xs text-v-beige/70 leading-relaxed font-light mb-4">
              All architectural blueprints, site assessments, and spatial photography are copyrighted under VEDRA Atelier.
            </p>
            <p className="text-xs text-v-gold font-medium tracking-wide">
              concierge@vedraliving.com
            </p>
          </div>

        </div>

        {/* Lower footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 text-center sm:text-left gap-4">
          <div className="text-[10px] font-sans tracking-luxury text-v-beige/40 uppercase">
            © 2026 VEDRA Living. All rights reserved. Designed for the Extraordinary.
          </div>

          {/* Scroll to Top */}
          <a 
            href="#hero"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-[10px] font-sans tracking-luxury text-v-gold uppercase hover:text-v-ivory transition-colors duration-300 hover-interactive"
          >
            <span>Back to Summit</span>
            <span className="p-2 border border-v-gold/20 hover:border-v-gold rounded-full flex items-center justify-center">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>

      </div>
    </footer>
  );
}
