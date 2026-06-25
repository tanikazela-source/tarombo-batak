import React, { useMemo } from "react";

// Reusable repeating border pattern resembling Gorga Simeol-meol
export function GorgaBorder({ className = "", height = 16 }) {
  return (
    <div className={`w-full overflow-hidden leading-[0] ${className}`} style={{ height: `${height}px` }}>
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="gorga-pat" width="40" height={height} patternUnits="userSpaceOnUse">
            {/* Black background band */}
            <rect width="40" height={height} fill="#111111" />
            
            {/* White spirals */}
            <path
              d="M 0 8 Q 10 0 20 8 Q 30 16 40 8"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
            />
            
            {/* Red accent curves */}
            <path
              d="M 5 8 C 12 1 15 15 22 8 C 29 1 32 15 39 8"
              fill="none"
              stroke="#8B0000"
              strokeWidth="1.5"
            />
            
            {/* Gold highlights */}
            <circle cx="10" cy="8" r="1.5" fill="#D4AF37" />
            <circle cx="30" cy="8" r="1.5" fill="#D4AF37" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gorga-pat)" />
      </svg>
    </div>
  );
}

// Circular medallion ornament (Ipong-ipong) for hero section or card backgrounds
export function GorgaMedallion({ className = "", size = 120 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <circle cx="50" cy="50" r="48" stroke="#8B0000" strokeWidth="1" />
      <circle cx="50" cy="50" r="44" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="50" cy="50" r="38" fill="#111111" stroke="#ffffff" strokeWidth="1.5" />
      
      {/* Intricate traditional swirls */}
      <path
        d="M 50 15 
           C 65 15, 85 30, 85 50 
           C 85 70, 65 85, 50 85 
           C 35 85, 15 70, 15 50 
           C 15 30, 35 15, 50 15 Z"
        stroke="#8B0000"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M 50 22
           C 60 22, 78 32, 78 50
           C 78 68, 60 78, 50 78
           C 40 78, 22 68, 22 50
           C 22 32, 40 22, 50 22 Z"
        stroke="#ffffff"
        strokeWidth="1.5"
        fill="none"
      />

      {/* Center gold symbol (representing the cosmic eye / spiritual light) */}
      <circle cx="50" cy="50" r="8" fill="#8B0000" />
      <polygon points="50,45 54,50 50,55 46,50" fill="#D4AF37" />
      
      {/* 4 radiating curls */}
      <path d="M 50 22 Q 57 35 50 42" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
      <path d="M 50 78 Q 43 65 50 58" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
      <path d="M 22 50 Q 35 57 42 50" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
      <path d="M 78 50 Q 65 43 58 50" stroke="#D4AF37" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// Gorga Ulu Paung (traditional Jabu head roof ornament mascot) for styling headers
export function GorgaHeaderDecal({ className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg
        width="160"
        height="40"
        viewBox="0 0 160 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#8B0000]"
      >
        {/* Center crest */}
        <path
          d="M 80 5 C 65 5, 55 25, 45 25 C 35 25, 30 15, 20 15 C 10 15, 0 25, 0 35 L 160 35 C 160 25, 150 15, 140 15 C 130 15, 125 25, 115 25 C 105 25, 95 5, 80 5 Z"
          fill="#111111"
          stroke="#8B0000"
          strokeWidth="2.5"
        />
        {/* Decorative interior lines */}
        <path
          d="M 80 12 C 70 12, 63 27, 53 27 C 43 27, 35 20, 25 20 C 15 20, 8 28, 8 32 C 8 32, 152 32, 152 32 C 152 28, 145 20, 135 20 C 125 20, 117 27, 107 27 C 97 27, 90 12, 80 12 Z"
          stroke="#ffffff"
          strokeWidth="1.5"
        />
        <path
          d="M 80 18 Q 74 29 65 30 M 80 18 Q 86 29 95 30"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />
        
        {/* Underline accent */}
        <line x1="10" y1="38" x2="150" y2="38" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 2" />
      </svg>
    </div>
  );
}

// Reusable Boraspati (Batak Sacred Lizard) styled with Ulos weaving patterns
export function GorgaCicak({ className = "", size = 150 }) {

  const leftRightPattern = useMemo(() => {
    let path = "";
    for (let y = 0; y < 140; y += 8) {
      path += `M10,${y} L18,${y + 8} M10,${y + 8} L18,${y} `;
    }
    return path;
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 180"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none ${className}`}
    >
      <defs>
        {/* Weave pattern for the lizard's body */}
        <pattern id="cicak-ulos-weave" width="8" height="8" patternUnits="userSpaceOnUse">
          <rect width="8" height="8" fill="#1e0509" />
          <line x1="0" y1="4" x2="8" y2="4" stroke="#8B0000" strokeWidth="1" />
          <line x1="4" y1="0" x2="4" y2="8" stroke="#8B0000" strokeWidth="1" />
          <line x1="0" y1="0" x2="8" y2="8" stroke="#ffffff" strokeWidth="0.8" opacity="0.3" />
          <line x1="8" y1="0" x2="0" y2="8" stroke="#D4AF37" strokeWidth="0.5" opacity="0.3" />
        </pattern>
      </defs>

      {/* Shadow background glow */}
      <path
        d="M 60,15 L 75,32 L 67,48 C 75,65 75,85 68,95 L 52,95 C 45,85 45,65 53,48 L 45,32 Z"
        fill="#8B0000"
        opacity="0.15"
        filter="blur(8px)"
      />

      {/* 1. Tail (Red base with white spine line) */}
      <path
        d="M 60,95 Q 64,115 56,135 Q 48,155 60,168 C 68,176 56,182 48,172 C 42,164 50,154 55,160 C 58,164 52,168 50,165"
        fill="none"
        stroke="#8B0000"
        strokeWidth="6.5"
        strokeLinecap="round"
      />
      <path
        d="M 60,95 Q 64,115 56,135 Q 48,155 60,168 C 68,176 56,182 48,172 C 42,164 50,154 55,160"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M 60,95 Q 64,115 56,135 Q 48,155 60,168"
        fill="none"
        stroke="#D4AF37"
        strokeWidth="0.8"
        strokeDasharray="2 2"
        strokeLinecap="round"
      />

      {/* 2. Limbs */}
      {/* Forelegs (Left & Right) */}
      <path d="M 50,48 Q 28,40 18,32" stroke="#8B0000" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M 50,48 Q 28,40 18,32" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      
      <path d="M 70,48 Q 92,40 102,32" stroke="#8B0000" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M 70,48 Q 92,40 102,32" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      
      {/* Toes (Forelegs) */}
      <path d="M 18,32 L 10,25 M 18,32 L 8,33 M 18,32 L 12,41" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      <path d="M 102,32 L 110,25 M 102,32 L 112,33 M 102,32 L 108,41" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />

      {/* Hind legs (Left & Right) */}
      <path d="M 50,88 Q 28,95 20,110" stroke="#8B0000" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M 50,88 Q 28,95 20,110" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      
      <path d="M 70,88 Q 92,95 100,110" stroke="#8B0000" strokeWidth="5.5" strokeLinecap="round" fill="none" />
      <path d="M 70,88 Q 92,95 100,110" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      
      {/* Toes (Hind legs) */}
      <path d="M 20,110 L 12,118 M 20,110 L 10,110 M 20,110 L 14,101" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
      <path d="M 100,110 L 108,118 M 100,110 L 110,110 M 100,110 L 106,101" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />

      {/* 3. Main Torso Body */}
      <path
        d="M 60,42 C 73,50 74,80 66,95 L 54,95 C 46,80 47,50 60,42 Z"
        fill="url(#cicak-ulos-weave)"
        stroke="#8B0000"
        strokeWidth="3.5"
      />
      {/* Inner gold border for torso */}
      <path
        d="M 60,45 C 70,52 71,78 64,92 L 56,92 C 49,78 50,52 60,45 Z"
        stroke="#D4AF37"
        strokeWidth="1.2"
        strokeDasharray="3 2"
        fill="none"
      />

      {/* Torso Center medallion (Dalihan Na Tolu gold emblem) */}
      <polygon points="60,60 67,68 60,76 53,68" fill="#8B0000" stroke="#D4AF37" strokeWidth="1.5" />
      <circle cx="60" cy="68" r="2.5" fill="#ffffff" />

      {/* 4. Head */}
      <path
        d="M 60,12 L 73,28 L 66,42 L 54,42 L 47,28 Z"
        fill="#111111"
        stroke="#8B0000"
        strokeWidth="3"
      />
      <path
        d="M 60,15 L 70,28 L 64,39 L 56,39 L 50,28 Z"
        stroke="#ffffff"
        strokeWidth="1"
        fill="none"
      />
      
      {/* Eyes */}
      <circle cx="53" cy="24" r="1.5" fill="#D4AF37" />
      <circle cx="67" cy="24" r="1.5" fill="#D4AF37" />

      {/* Head Center Crest (Gold diamond) */}
      <polygon points="60,25 63,30 60,35 57,30" fill="#D4AF37" />
      
      {/* Fine connection details (neck stripes) */}
      <line x1="53" y1="42" x2="67" y2="42" stroke="#ffffff" strokeWidth="1.5" />
      <line x1="53" y1="44" x2="67" y2="44" stroke="#D4AF37" strokeWidth="1" />
    </svg>
  );
}

