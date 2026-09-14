import React from 'react';

interface TricolorWaveProps {
  showLandmarks?: boolean;
  showMadeInIndiaTag?: boolean;
  className?: string;
}

export const TricolorWave: React.FC<TricolorWaveProps> = ({
  showLandmarks = false,
  showMadeInIndiaTag = false,
  className = ''
}) => {
  return (
    <div className={`relative w-full overflow-hidden select-none pointer-events-none ${className}`}>
      {/* Indian Heritage Landmark Silhouettes */}
      {showLandmarks && (
        <div className="w-full flex justify-center opacity-85 px-4 mb-2">
          <svg
            viewBox="0 0 400 110"
            className="w-full max-w-[340px] text-sky-700 stroke-current fill-none"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Gateway of India Landmark */}
            <path d="M150 105 V45 H250 V105" />
            <path d="M142 105 H258" />
            <path d="M175 105 V68 C175 55 225 55 225 68 V105" />
            <path d="M150 45 L155 35 H245 L250 45" />
            <path d="M185 35 V26 C185 24 215 24 215 26 V35" />
            {/* Left Tower */}
            <path d="M150 45 H135 V105 H150" />
            <path d="M135 45 L142.5 30 L150 45" />
            <line x1="142.5" y1="30" x2="142.5" y2="22" />
            {/* Right Tower */}
            <path d="M250 45 H265 V105 H250" />
            <path d="M250 45 L257.5 30 L265 45" />
            <line x1="257.5" y1="30" x2="257.5" y2="22" />
            {/* Left Building Details */}
            <path d="M50 105 V70 H115 V105" />
            <path d="M65 70 V52 C65 45 100 45 100 52 V70" />
            <line x1="82.5" y1="45" x2="82.5" y2="35" />
            {/* Right Building Details */}
            <path d="M285 105 V70 H350 V105" />
            <path d="M300 70 V52 C300 45 335 45 335 52 V70" />
            <line x1="317.5" y1="45" x2="317.5" y2="35" />
          </svg>
        </div>
      )}

      {/* Tricolor Flowing Ribbons */}
      <div className="relative w-full h-14">
        <svg
          viewBox="0 0 500 90"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          {/* Saffron Ribbon */}
          <path
            d="M-20 30 Q140 75 250 35 T520 20 L520 90 L-20 90 Z"
            fill="#FF8822"
            opacity="0.9"
          />
          {/* White Accent */}
          <path
            d="M-20 45 Q150 85 260 45 T520 35 L520 90 L-20 90 Z"
            fill="#FFFFFF"
            opacity="0.95"
          />
          {/* India Green Ribbon */}
          <path
            d="M-20 58 Q160 92 270 55 T520 50 L520 90 L-20 90 Z"
            fill="#138808"
          />
        </svg>
      </div>

      {/* "Made for a Stronger India" with Flag */}
      {showMadeInIndiaTag && (
        <div className="flex items-center justify-center gap-1.5 py-2.5 bg-[#138808]/10 text-slate-800 text-[11px] font-semibold tracking-wide">
          <span className="text-base leading-none">🇮🇳</span>
          <span>Made for a Stronger India</span>
        </div>
      )}
    </div>
  );
};
