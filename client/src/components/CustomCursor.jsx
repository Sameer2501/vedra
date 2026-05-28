import React, { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const bgGlowRef = useRef(null);
  
  const [hidden, setHidden] = useState(true);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const mouse = { x: 0, y: 0 };
    const ring = { x: 0, y: 0 };
    const dot = { x: 0, y: 0 };
    
    const onMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      if (hidden) setHidden(false);
      
      // Update background radial glow coordinate variables (for CSS mouse-glow-bg)
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);
    
    const onMouseLeave = () => setHidden(true);
    const onMouseEnter = () => setHidden(false);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    // Dynamic scale for interactive elements
    const addHoverEvents = () => {
      const links = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .hover-interactive');
      links.forEach((link) => {
        link.addEventListener('mouseenter', () => setLinkHovered(true));
        link.addEventListener('mouseleave', () => setLinkHovered(false));
      });
    };

    addHoverEvents();

    // Re-bind hover events when DOM changes
    const observer = new MutationObserver(addHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    // Smooth physics loop for the ring (spring lag effect)
    let animationFrameId;
    const render = () => {
      // Ring follows mouse with delay
      ring.x += (mouse.x - ring.x) * 0.15;
      ring.y += (mouse.y - ring.y) * 0.15;
      
      // Dot follows mouse directly
      dot.x = mouse.x;
      dot.y = mouse.y;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x - 20}px, ${ring.y - 20}px, 0) scale(${linkHovered ? 1.5 : clicked ? 0.8 : 1})`;
        ringRef.current.style.borderColor = linkHovered ? '#C6A76A' : 'rgba(198, 167, 106, 0.4)';
      }
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x - 3}px, ${dot.y - 3}px, 0) scale(${linkHovered ? 0 : clicked ? 1.2 : 1})`;
      }

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [hidden, clicked, linkHovered]);

  return (
    <>
      {/* Ambient background soft glow following cursor */}
      <div className="mouse-glow-bg hidden md:block" />

      {/* Luxury cursor ring and dot */}
      <div 
        ref={ringRef}
        className={`fixed top-0 left-0 w-10 h-10 border border-v-gold/40 rounded-full pointer-events-none z-[9999] transition-opacity duration-300 hidden md:block ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ willChange: 'transform, border-color' }}
      />
      <div 
        ref={dotRef}
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-v-gold rounded-full pointer-events-none z-[9999] transition-opacity duration-300 hidden md:block ${hidden ? 'opacity-0' : 'opacity-100'}`}
        style={{ willChange: 'transform' }}
      />
    </>
  );
}
