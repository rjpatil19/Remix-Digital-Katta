import React from 'react';
import { Home, Gauge, Landmark, BookOpen, Gift, ArrowRight, Signal, Wifi, Battery } from 'lucide-react';
import { Language } from '../../types';

interface OnboardingScreenProps {
  onNext: () => void;
  onSkip: () => void;
  language: Language;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  onNext,
  onSkip,
  language
}) => {
  return (
    <div className="relative flex flex-col justify-between w-full h-full min-h-[640px] bg-white select-none overflow-y-auto">
      {/* Top Status Bar & Skip */}
      <div>
        <div className="flex items-center justify-between px-6 pt-3 text-slate-800 text-xs font-semibold">
          <span>9:41</span>
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4 fill-current" />
          </div>
        </div>

        <div className="flex justify-end px-6 pt-2">
          <button
            id="btn-onboarding-skip"
            onClick={onSkip}
            className="text-sm font-bold text-blue-800 hover:text-blue-900 transition-colors"
          >
            {language === 'mr' ? 'वगळा' : 'Skip'}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col items-center px-6 pt-2 text-center">
        {/* Marathi Title */}
        <h2
          className="text-2xl font-black text-[#0A2254] leading-tight max-w-[320px]"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          {language === 'mr'
            ? 'तुमच्या आर्थिक प्रवासात आमची साथ!'
            : 'Your Trusted Partner in Financial Growth!'}
        </h2>

        {/* Marathi Subtitle */}
        <p
          className="text-xs text-slate-600 font-medium mt-2 max-w-[300px] leading-relaxed"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          {language === 'mr'
            ? 'कर्ज, क्रेडिट स्कोअर, सरकारी योजना आणि आर्थिक माहिती – सगळं एकाच ठिकाणी.'
            : 'Loans, Credit Score, Government Schemes & Financial Knowledge – All in one place.'}
        </p>

        {/* Circular Feature Badges Grid */}
        <div className="w-full max-w-[320px] mt-6 grid grid-cols-3 gap-y-4 gap-x-2 justify-items-center">
          {/* 1. कर्ज पर्याय */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shadow-xs">
              <Home className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">
              {language === 'mr' ? 'कर्ज पर्याय' : 'Loan Options'}
            </span>
          </div>

          {/* 2. क्रेडिट स्कोअर */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-sky-100 flex items-center justify-center text-sky-600 shadow-xs">
              <Gauge className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">
              {language === 'mr' ? 'क्रेडिट स्कोअर' : 'Credit Score'}
            </span>
          </div>

          {/* 3. सरकारी योजना */}
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-xs">
              <Landmark className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">
              {language === 'mr' ? 'सरकारी योजना' : 'Govt Schemes'}
            </span>
          </div>

          {/* 4. आर्थिक शिक्षण */}
          <div className="flex flex-col items-center col-start-1 col-span-1 justify-self-end mr-2">
            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shadow-xs">
              <BookOpen className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">
              {language === 'mr' ? 'आर्थिक शिक्षण' : 'Learn & Grow'}
            </span>
          </div>

          {/* Spacer */}
          <div></div>

          {/* 5. ऑफर्स आणि रिवॉर्ड्स */}
          <div className="flex flex-col items-center col-start-3 col-span-1 justify-self-start ml-2">
            <div className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shadow-xs">
              <Gift className="w-7 h-7 stroke-[2.2]" />
            </div>
            <span className="text-[11px] font-bold text-slate-700 mt-1.5">
              {language === 'mr' ? 'ऑफर्स & रिवॉर्ड्स' : 'Offers & Rewards'}
            </span>
          </div>
        </div>

        {/* Cheerful User Illustration Vector */}
        <div className="relative mt-4 w-full flex justify-center">
          <div className="w-36 h-36 rounded-full bg-gradient-to-t from-orange-100 to-sky-50 flex items-end justify-center overflow-hidden border-2 border-white shadow-sm">
            <div className="relative flex flex-col items-center">
              {/* Head & hair */}
              <div className="w-16 h-18 bg-amber-200 rounded-2xl flex flex-col items-center pt-2 relative">
                <div className="w-16 h-8 bg-slate-900 rounded-t-xl absolute -top-1" />
                <div className="flex gap-2 mt-4">
                  <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
                </div>
                <div className="w-3 h-1.5 bg-rose-400 rounded-b-full mt-1.5" />
              </div>
              {/* Torso in Indian saffron shirt */}
              <div className="w-24 h-14 bg-[#FF6500] rounded-t-3xl mt-1 flex items-center justify-center text-white text-[9px] font-bold">
                📱 Digital कट्टा
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Area: Pagination + CTA Button + Tagline */}
      <div className="px-6 pb-4 pt-2 flex flex-col items-center">
        {/* Pagination Dots */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className="w-6 h-2 rounded-full bg-[#FF6500]" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
          <div className="w-2 h-2 rounded-full bg-slate-300" />
        </div>

        {/* Orange CTA Button */}
        <button
          id="btn-onboarding-next"
          onClick={onNext}
          className="w-full py-3.5 px-6 rounded-xl bg-[#FF6500] hover:bg-[#E55A00] active:scale-[0.98] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition-all"
        >
          <span>{language === 'mr' ? 'पुढे जा' : 'Continue'}</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Tagline */}
        <p
          className="font-bold text-[#8A0028] text-xs mt-3 tracking-wide"
          style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
        >
          ठिकाण एक, सुविधा अनेक..!
        </p>
      </div>
    </div>
  );
};
