import React from 'react';

export const VedraMonogram = ({ className = "h-24 w-24", animated = false }) => {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Top-Right Outer Frame */}
      <path 
        d="M 38 15 H 105 V 105 H 90" 
        stroke="#E8DFC9" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "monogram-frame-path" : ""}
      />
      
      {/* Bottom-Left Outer Frame (including left vertical line of V and bottom stroke of L) */}
      <path 
        d="M 15 38 V 105 H 77" 
        stroke="#E8DFC9" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "monogram-inner-line" : ""}
      />
      
      {/* Inner V-diagonal and L-vertical */}
      <path 
        d="M 15 105 L 52 40 L 58 46 V 105" 
        stroke="#E8DFC9" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "monogram-inner-v" : ""}
      />
      
      {/* Luxury gold accent dot */}
      <circle 
        cx="85" 
        cy="105" 
        r="5.5" 
        fill="#C6A76A" 
        className={animated ? "monogram-gold-dot" : ""}
      />
    </svg>
  );
};

export const VedraLogo = ({ className = "w-full max-w-[280px]", showSub = true, animated = false }) => {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      {/* Monogram Icon */}
      <VedraMonogram className="h-28 w-28 mb-4 hover:scale-105 transition-transform duration-500" animated={animated} />
      
      {/* Wordmark VEDRA */}
      <div className="relative select-none">
        <h1 
          className="text-4xl font-serif text-v-ivory font-light leading-none relative flex items-center justify-center"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          <span className="tracking-[0.25em]">VEDR</span>
          <span className="relative inline-block tracking-normal">
            A
            {/* Dot inside the upper triangle counter of A */}
            <span 
              className="absolute w-[5.5px] h-[5.5px] rounded-full bg-v-gold z-10"
              style={{
                left: '50%',
                bottom: '52%',
                transform: 'translateX(-50%)',
              }}
            />
          </span>
        </h1>
      </div>
      
      {/* Living Sub-header with flanking gold lines */}
      {showSub && (
        <div className="flex items-center justify-center w-full mt-3 px-2 opacity-90">
          <div className="h-[1.5px] w-12 bg-v-gold flex-shrink-0" />
          <span 
            className="text-[10px] font-serif tracking-[0.6em] text-v-gold uppercase mx-3 pl-[0.6em] font-medium"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            LIVING
          </span>
          <div className="h-[1.5px] w-12 bg-v-gold flex-shrink-0" />
        </div>
      )}
    </div>
  );
};
