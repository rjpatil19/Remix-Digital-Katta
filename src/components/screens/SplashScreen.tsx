import React from 'react';
import { DigitalKattaLogo } from '../common/DigitalKattaLogo';
import { TricolorWave } from '../common/TricolorWave';
import { Signal, Wifi, Battery } from 'lucide-react';

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onContinue }) => {
  return (
    <div
      onClick={onContinue}
      className="relative flex flex-col justify-between w-full h-full min-h-[640px] bg-gradient-to-b from-white via-[#FCF9F6] to-white cursor-pointer select-none overflow-hidden"
    >
      {/* Phone Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 text-slate-800 text-xs font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-slate-700">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* Main Branding Center */}
      <div className="flex flex-col items-center justify-center flex-1 px-6 my-auto text-center">
        {/* Logo matching Screen 1 */}
        <DigitalKattaLogo size="lg" showTagline={true} />

        {/* English Tagline */}
        <p className="mt-8 text-xl font-extrabold text-[#0D2149] tracking-tight">
          Your Financial <br /> Growth Partner
        </p>
        <p className="mt-2 text-xs font-medium text-slate-500">
          CIBIL Report Analysis & Resolution Platform
        </p>

        {/* Pulsing Tap Hint */}
        <div className="mt-8 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 text-orange-600 text-xs font-medium animate-pulse">
          Tap anywhere to continue
        </div>
      </div>

      {/* Bottom Tricolor Wave + Heritage Landmarks + Made for a Stronger India */}
      <div className="w-full">
        <TricolorWave showLandmarks={true} showMadeInIndiaTag={true} />
      </div>
    </div>
  );
};
