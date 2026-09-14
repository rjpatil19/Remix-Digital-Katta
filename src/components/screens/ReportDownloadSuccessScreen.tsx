import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Mail, Check, Signal, Wifi, Battery } from 'lucide-react';
import { DigitalKattaLogo } from '../common/DigitalKattaLogo';
import { TricolorWave } from '../common/TricolorWave';
import { Language, ScreenId } from '../../types';

interface ReportDownloadSuccessScreenProps {
  onViewReport: () => void;
  language: Language;
  onNavigate: (screen: ScreenId) => void;
}

export const ReportDownloadSuccessScreen: React.FC<ReportDownloadSuccessScreenProps> = ({
  onViewReport,
  language,
  onNavigate
}) => {
  useEffect(() => {
    // Fire confetti celebration on entrance
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.35 },
        colors: ['#FF6500', '#10B981', '#3B82F6', '#F59E0B']
      });
    } catch {
      // ignore
    }
  }, []);

  return (
    <div className="relative flex flex-col justify-between w-full h-full min-h-[640px] bg-white select-none overflow-y-auto">
      {/* Top Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 text-slate-800 text-xs font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-slate-700">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* Main Success Section matching Screen 10 */}
      <div className="flex-1 px-6 pt-6 pb-2 flex flex-col items-center text-center my-auto">
        {/* Document Icon with Green Checkmark Badge and colorful rays */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Background colorful bursts */}
          <div className="absolute -top-3 -left-3 w-3 h-1.5 bg-amber-400 rounded-full rotate-45" />
          <div className="absolute -top-4 right-2 w-3 h-1.5 bg-amber-400 rounded-full -rotate-45" />
          <div className="absolute top-4 -left-6 w-3 h-1.5 bg-emerald-500 rounded-full -rotate-30" />
          <div className="absolute top-6 -right-6 w-3 h-1.5 bg-emerald-500 rounded-full rotate-30" />
          <div className="absolute -bottom-2 -left-3 w-3 h-1.5 bg-sky-500 rounded-full rotate-12" />
          <div className="absolute -bottom-3 right-1 w-3 h-1.5 bg-orange-500 rounded-full -rotate-12" />

          {/* Document Sheet Vector */}
          <div className="w-28 h-36 bg-white border-2 border-sky-200 rounded-2xl shadow-xl shadow-sky-500/10 flex flex-col items-center justify-center p-3 relative overflow-hidden">
            {/* Top folded corner decorative hint */}
            <div className="w-full space-y-2.5 opacity-40 px-2 mt-2">
              <div className="w-full h-2 rounded bg-sky-300" />
              <div className="w-4/5 h-2 rounded bg-sky-200" />
              <div className="w-3/5 h-2 rounded bg-sky-200" />
              <div className="w-full h-2 rounded bg-sky-200" />
            </div>

            {/* Green Circular Badge with Checkmark */}
            <div className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-600/30 border-2 border-white">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
          </div>
        </div>

        {/* Heading matching Screen 10 */}
        <h2 className="text-2xl font-black text-[#0B214D] tracking-tight max-w-[280px]">
          {language === 'mr'
            ? 'अहवाल यशस्वीरित्या डाऊनलोड झाला!'
            : 'Report Downloaded Successfully!'}
        </h2>

        {/* Subtitle matching Screen 10 */}
        <p className="text-xs text-slate-500 font-medium mt-2 max-w-[290px] leading-relaxed">
          {language === 'mr'
            ? 'तुमचा सिबिल अहवाल डाऊनलोड झाला आहे. चांगल्या आर्थिक निर्णयांसाठी याचा वापर करा.'
            : 'Your CIBIL report has been downloaded. Use it to make better financial decisions.'}
        </p>

        {/* CTA Buttons matching Screen 10 */}
        <div className="w-full max-w-[320px] mt-8 space-y-3">
          {/* Primary View Report Button */}
          <button
            id="btn-success-view-report"
            onClick={onViewReport}
            className="w-full py-3.5 rounded-xl bg-[#FF6500] hover:bg-[#E55A00] active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-md shadow-orange-500/25 transition-all"
          >
            {language === 'mr' ? 'अहवाल पहा' : 'View Report'}
          </button>

          {/* Secondary Share via Email Button */}
          <button
            id="btn-success-share-email"
            onClick={() => {
              const subject = encodeURIComponent('My Official CIBIL Report Summary');
              const body = encodeURIComponent('Attached is my verified CIBIL Credit Information Report generated via Digital Katta.');
              window.location.href = `mailto:?subject=${subject}&body=${body}`;
            }}
            className="w-full py-3.5 rounded-xl bg-white border border-[#FF6500] hover:bg-orange-50/50 active:scale-[0.98] text-[#FF6500] font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all"
          >
            <Mail className="w-4 h-4" />
            <span>{language === 'mr' ? 'ईमेलद्वारे शेअर करा' : 'Share via Email'}</span>
          </button>
        </div>

        {/* Return to Home link */}
        <button
          onClick={() => onNavigate('home')}
          className="mt-4 text-xs font-bold text-slate-500 hover:text-slate-800"
        >
          {language === 'mr' ? '← मुख्यपृष्ठावर जा' : '← Back to Home Dashboard'}
        </button>
      </div>

      {/* Bottom Branding & Tricolor Wave matching Screen 10 */}
      <div className="w-full flex flex-col items-center">
        <div className="mb-2">
          <DigitalKattaLogo size="sm" showTagline={true} />
        </div>
        <TricolorWave showLandmarks={false} showMadeInIndiaTag={false} />
      </div>
    </div>
  );
};
