import React from 'react';

export const VedraMonogram = ({ className = "h-24 w-24", animated = false }) => {
  return (
    <svg 
      viewBox="0 0 120 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Monogram Outer Square Frame */}
      {/* Top right corner and bottom border */}
      <path 
        d="M 45 15 H 105 V 105 H 15 V 45" 
        stroke="#E8DFC9" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "monogram-frame-path" : ""}
      />
      
      {/* V & L Interlinked Monogram Inner Elements */}
      {/* The left vertical stroke */}
      <line 
        x1="15" 
        y1="38" 
        x2="15" 
        y2="105" 
        stroke="#E8DFC9" 
        strokeWidth="3.5"
        strokeLinecap="round"
        className={animated ? "monogram-inner-line" : ""}
      />
      
      {/* The V diagonal going down-right, then up-right */}
      <path 
        d="M 45 40 L 15 105 L 56 105 L 56 40" 
        stroke="#E8DFC9" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? "monogram-inner-v" : ""}
      />
      
      {/* The L horizontal bottom stroke */}
      <path 
        d="M 39 105 H 95" 
        stroke="#E8DFC9" 
        strokeWidth="3.5" 
        strokeLinecap="round"
        className={animated ? "monogram-inner-l" : ""}
      />
      
      {/* The luxury gold accent dot */}
      <circle 
        cx="95" 
        cy="105" 
        r="4.5" 
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
          className="text-4xl font-serif tracking-[0.25em] text-v-ivory font-light leading-none relative flex items-center justify-center"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          VEDR
          <span className="relative inline-block">
            A
            {/* Dot inside the A */}
            <span 
              className="absolute w-[4.5px] h-[4.5px] rounded-full bg-v-gold"
              style={{
                left: '46.5%',
                bottom: '22%',
                transform: 'translateX(-50%)',
              }}
            />
          </span>
        </h1>
      </div>
      
      {/* Living Sub-header with flanking gold lines */}
      {showSub && (
        <div className="flex items-center justify-center w-full mt-3 px-2 opacity-85">
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-v-gold" />
          <span 
            className="text-[11px] font-sans tracking-[0.6em] text-v-beige uppercase mx-3 pl-[0.6em] font-light"
          >
            Living
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-v-gold" />
        </div>
      )}
    </div>
  );
};
