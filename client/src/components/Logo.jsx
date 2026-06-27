import React from 'react';
import vedraLogo from '../assets/finalLogo.png';

export const VedraMonogram = ({ className = "h-24 w-24", animated = false }) => {
  return (
    <img 
      src={vedraLogo} 
      alt="Vedra Monogram" 
      className={`${className} h-auto object-contain`}
    />
  );
};

export const VedraLogo = ({ className = "w-full max-w-[280px]", showSub = true, animated = false }) => {
  // Render the transparent high-definition logo directly with natural aspect ratio and zero padding issues
  return (
    <img 
      src={vedraLogo} 
      alt="VEDRA LIVING" 
      className={`${className} h-auto object-contain`}
    />
  );
};

