import React from 'react';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Sections
import Hero from './sections/Hero';
import About from './sections/About';
import ProjectShowcase from './sections/ProjectShowcase';
import Architecture from './sections/Architecture';
import Interiors from './sections/Interiors';
import WhyChoose from './sections/WhyChoose';
import Testimonials from './sections/Testimonials';
import Timeline from './sections/Timeline';
import Stats from './sections/Stats';
import Contact from './sections/Contact';

function App() {
  return (
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
        <Stats />
        <Contact />
      </main>

      {/* Luxury Footer */}
      <Footer />
    </SmoothScroll>
  );
}

export default App;
