import React, { useState, useEffect } from 'react';
import { VedraMonogram } from './Logo';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Interiors', href: '#interiors' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Simple active link highlighting
      const sections = navLinks.map(link => link.href.substring(1));
      sections.push('hero');
      
      let currentSection = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            currentSection = section;
            break;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.substring(1);
    const element = document.getElementById(id);
    if (element) {
      setMobileMenuOpen(false);
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 px-6 md:px-12 py-4 ${
          isScrolled 
            ? 'glass-panel border-b border-v-gold/10 py-3 bg-v-black/80' 
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Monogram */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group hover-interactive"
          >
            <VedraMonogram className="h-10 w-10 transition-transform duration-500 group-hover:rotate-12" />
            <div className="flex flex-col items-start leading-none">
              <span className="font-serif text-lg tracking-[0.2em] text-v-ivory font-medium" style={{ fontFamily: "'Cinzel', serif" }}>VEDRA</span>
              <span className="text-[7.5px] font-serif tracking-[0.45em] text-v-gold uppercase pl-[0.15em] mt-1" style={{ fontFamily: "'Cinzel', serif" }}>LIVING</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-xs font-sans tracking-luxury uppercase transition-all duration-300 relative py-1 hover-interactive ${
                    isActive ? 'text-v-gold' : 'text-v-beige/70 hover:text-v-ivory'
                  }`}
                >
                  {link.name}
                  <span 
                    className={`absolute bottom-0 left-0 w-full h-[1px] bg-v-gold origin-left transition-transform duration-500 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </div>

          {/* Consultation button */}
          <div className="hidden md:block">
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="group relative overflow-hidden inline-flex items-center gap-2 border border-v-gold/40 px-5 py-2.5 text-xs tracking-luxury uppercase font-medium text-v-ivory bg-transparent hover-interactive hover:border-v-gold transition-all duration-500"
            >
              {/* Sliding Gold Glow Background */}
              <span className="absolute inset-0 w-full h-full bg-v-gold/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span>Inquire</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform duration-300 text-v-gold" />
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-v-ivory hover-interactive p-1 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-0 z-40 bg-v-black/95 backdrop-blur-lg flex flex-col justify-center items-center px-6 transition-all duration-700 md:hidden ${
          mobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center gap-6 text-center">
          <VedraMonogram className="h-16 w-16 mb-4 animate-pulse-slow" />
          
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`text-lg font-serif tracking-[0.2em] uppercase transition-all duration-300 ${
                  isActive ? 'text-v-gold' : 'text-v-ivory/70 hover:text-v-ivory'
                }`}
              >
                {link.name}
              </a>
            );
          })}
          
          <a 
            href="#contact" 
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-6 inline-flex items-center gap-2 border border-v-gold px-8 py-3 text-sm tracking-luxury uppercase text-v-ivory bg-v-gold/10 hover:bg-v-gold/25 transition-all duration-300"
          >
            Inquire Now
            <ArrowRight className="h-4 w-4 text-v-gold" />
          </a>
        </div>
      </div>
    </>
  );
}
