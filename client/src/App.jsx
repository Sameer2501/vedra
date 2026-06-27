import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Preloader from './components/Preloader';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import ProjectShowcase from './sections/ProjectShowcase';
import Architecture from './sections/Architecture';
import Interiors from './sections/Interiors';
import WhyChoose from './sections/WhyChoose';
import Testimonials from './sections/Testimonials';
import Timeline from './sections/Timeline';
// import Stats from './sections/Stats';
import Contact from './sections/Contact';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Manage body scroll locking and Lenis smooth scroll toggle
  useEffect(() => {
    if (isLoading) {
      document.documentElement.classList.add('lenis-stopped');
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';

      // Force window scroll position reset to top on refresh
      window.scrollTo(0, 0);
    }
    return () => {
      document.documentElement.classList.remove('lenis-stopped');
      document.body.style.overflow = '';
    };
  }, [isLoading]);

  return (
    <>
      {/* Luxury Preloader Screen */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <Preloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <SmoothScroll>
        {/* Premium custom mouse glowing follower */}
        <CustomCursor />

        {/* Glassmorphic Navbar */}
        <Navbar />

        {/* Main Storytelling Sections */}
        <main className="relative bg-v-black min-h-screen">
          <Hero />
          <About />
          <ProjectShowcase />
          <Architecture />
          <Interiors />
          <WhyChoose />
          <Testimonials />
          <Timeline />
          {/* <Stats /> */}
          <Contact />
        </main>

        {/* Luxury Footer */}
        <Footer />
      </SmoothScroll>
    </>
  );
}

export default App;
