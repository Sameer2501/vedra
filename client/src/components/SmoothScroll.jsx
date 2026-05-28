import React from 'react';
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }) {
  // Ultra premium smooth scroll configuration
  const lenisOptions = {
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // premium exponential easeOut
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
    infinite: false,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      {children}
    </ReactLenis>
  );
}
