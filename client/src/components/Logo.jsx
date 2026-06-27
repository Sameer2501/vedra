import React from 'react';
import vedraLogo from '../assets/download.png';

export const VedraMonogram = ({ className = "h-24 w-24", animated = false }) => {
  return (
    <img 
      src={vedraLogo} 
      alt="Vedra Monogram" 
      className={`${className} object-cover`}
      style={{
        objectPosition: 'center 38.5%'
      }}
    />
  );
};

export const VedraLogo = ({ className = "w-full max-w-[280px]", showSub = true, animated = false }) => {
  // Since the new logo image already contains the monogram, "VEDRA", and "LIVING", 
  // we render the image directly, cropping the extra vertical padding for optimal presentation.
  return (
    <div 
      className={`overflow-hidden relative flex items-center justify-center aspect-[4/5] ${className}`}
    >
      <img 
        src={vedraLogo} 
        alt="VEDRA LIVING" 
        className="w-full h-[150%] max-w-none object-cover"
        style={{
          objectPosition: 'center 46%'
        }}
      />
    </div>
  );
};

