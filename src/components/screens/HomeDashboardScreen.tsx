import React from 'react';
import {
  Bell,
  Gauge,
  CircleDollarSign,
  Landmark,
  BookOpen,
  Calculator,
  Gift,
  ChevronRight,
  FileCheck2,
  TrendingUp,
  Sparkles,
  Signal,
  Wifi,
  Battery,
  Upload,
  FileUp,
  ShieldCheck
} from 'lucide-react';
import { Language, ScreenId } from '../../types';
import { DigitalKattaLogo } from '../common/DigitalKattaLogo';

interface HomeDashboardScreenProps {
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  onOpenNotifications: () => void;
}

export const HomeDashboardScreen: React.FC<HomeDashboardScreenProps> = ({
  onNavigate,
  language,
  onOpenNotifications
}) => {
  return (
    <div className="flex flex-col w-full h-full bg-[#F8FAFC] overflow-y-auto select-none pb-4">
      {/* Top Phone Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 pb-1 text-slate-800 text-xs font-semibold bg-white">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-slate-700">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* Top Greeting & Avatar Row (Screen 4 Header) */}
      <div className="bg-white px-4 py-2.5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {/* Avatar with circular portrait */}
          <div
            onClick={() => onNavigate('profile')}
            className="w-10 h-10 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center overflow-hidden cursor-pointer shadow-2xs shrink-0"
          >
            <div className="w-full h-full bg-gradient-to-tr from-sky-400 to-indigo-600 flex items-center justify-center text-white font-black text-sm">
              RD
            </div>
          </div>

          <div>
            <h2 className="text-sm font-extrabold text-[#0B214D] leading-tight">
              {language === 'mr' ? 'नमस्ते, राहुल!' : 'Hello, Rahul!'}
            </h2>
            <p className="text-[11px] text-slate-500 font-medium">
              {language === 'mr' ? 'लहान पावले. मोठी स्वप्ने.' : 'Small steps. Bigger dreams.'}
            </p>
          </div>
        </div>

        {/* Right Action Bar with Brand Logo & Bell Notification */}
        <div className="flex items-center gap-2">
          <DigitalKattaLogo size="xs" variant="image" showTagline={false} className="h-8 w-auto max-h-8" />
          <button
            id="btn-home-notifications"
            onClick={onOpenNotifications}
            className="relative w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all shrink-0"
          >
            <Bell className="w-4.5 h-4.5 stroke-[2]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white" />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Hero Banner: "Better Financial Future Starts Here" with Climber Illustration */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#D8F0FE] via-[#E6F5FF] to-[#D5EDFD] p-4 border border-sky-100 shadow-xs">
          <div className="max-w-[62%] relative z-10">
            <h3 className="text-lg font-black text-[#0B2553] leading-snug">
              {language === 'mr' ? 'उज्वल आर्थिक भविष्याची सुरुवात' : 'Better Financial Future Starts Here'}
            </h3>
            <p
              className="font-bold text-[#8A0028] text-xs mt-1 tracking-wide"
              style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
            >
              ठिकाण एक, सुविधा अनेक..!
            </p>
            <button
              onClick={() => onNavigate('credit_score')}
              className="mt-3 px-3 py-1.5 rounded-lg bg-[#0B2553] text-white text-[11px] font-bold shadow-xs hover:bg-[#081836] transition-colors flex items-center gap-1"
            >
              <span>{language === 'mr' ? 'सिबिल तपासा' : 'Check CIBIL 742'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Climber on Hill illustration */}
          <div className="absolute right-0 bottom-0 top-0 w-36 flex items-end justify-end pointer-events-none">
            <svg viewBox="0 0 160 140" className="w-full h-full">
              {/* Mountain */}
              <path d="M40 140 Q90 50 160 40 L160 140 Z" fill="#15803D" opacity="0.85" />
              <path d="M70 140 Q110 70 160 60 L160 140 Z" fill="#22C55E" opacity="0.75" />
              {/* Flag on peak */}
              <line x1="140" y1="40" x2="140" y2="15" stroke="#0F172A" strokeWidth="2" />
              <polygon points="140,15 158,22 140,30" fill="#16A34A" />
              {/* Climber stick-figure with backpack */}
              <circle cx="115" cy="58" r="5" fill="#0F172A" />
              <path d="M115 63 L110 82 L120 95" stroke="#EA580C" strokeWidth="3" strokeLinecap="round" />
              <rect x="105" y="66" width="6" height="12" rx="2" fill="#EA580C" />
              <line x1="115" y1="70" x2="128" y2="76" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* PROMINENT UPLOAD CIBIL / CREDIT REPORT BANNER (PHASE 1) */}
        <div
          id="banner-upload-cibil"
          onClick={() => onNavigate('upload_report')}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8533] p-4 text-white shadow-md hover:shadow-lg transition-all cursor-pointer group active:scale-[0.99]"
        >
          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:scale-105 transition-transform shadow-xs">
                <FileUp className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-100 bg-white/20 px-2 py-0.5 rounded-full">
                    {language === 'mr' ? 'नवीन सुविधा' : 'Instant AI Engine'}
                  </span>
                  <span className="text-[11px] font-bold text-orange-100">
                    PDF • JSON • HTML
                  </span>
                </div>
                <h4 className="text-sm font-black mt-1 leading-snug">
                  {language === 'mr' ? 'सिबिल / क्रेडिट अहवाल अपलोड करा' : 'Upload CIBIL / Credit Report'}
                </h4>
                <p className="text-[11px] text-orange-100 font-medium">
                  {language === 'mr' ? '७ त्रुटी शोधा आणि +५४ गुण वाढवा' : 'Detect 7 inaccuracies & recover +58 points'}
                </p>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white text-[#FF6B00] flex items-center justify-center shrink-0 shadow-xs group-hover:translate-x-0.5 transition-transform">
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* 6 Quick Actions Grid (Screen 4 Exact Grid) */}
        <div>
          <div className="grid grid-cols-3 gap-3">
            {/* 1. Check Credit Score */}
            <button
              id="action-check-score"
              onClick={() => onNavigate('credit_score')}
              className="bg-white rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs border border-slate-100 hover:border-orange-200 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center group-hover:bg-sky-100 transition-colors">
                <Gauge className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-[#0B214D] mt-2 leading-tight">
                {language === 'mr' ? 'क्रेडिट स्कोअर तपासा' : 'Check Credit Score'}
              </span>
            </button>

            {/* 2. Apply for Loan */}
            <button
              id="action-apply-loan"
              onClick={() => onNavigate('loan_eligibility')}
              className="bg-white rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs border border-slate-100 hover:border-orange-200 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <CircleDollarSign className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-[#0B214D] mt-2 leading-tight">
                {language === 'mr' ? 'कर्जासाठी अर्ज करा' : 'Apply for Loan'}
              </span>
            </button>

            {/* 3. Government Schemes */}
            <button
              id="action-govt-schemes"
              onClick={() => onNavigate('government_schemes')}
              className="bg-white rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs border border-slate-100 hover:border-orange-200 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
                <Landmark className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-[#0B214D] mt-2 leading-tight">
                {language === 'mr' ? 'सरकारी योजना' : 'Government Schemes'}
              </span>
            </button>

            {/* 4. Financial Education */}
            <button
              id="action-financial-education"
              onClick={() => onNavigate('learn_grow')}
              className="bg-white rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs border border-slate-100 hover:border-orange-200 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                <BookOpen className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-[#0B214D] mt-2 leading-tight">
                {language === 'mr' ? 'आर्थिक शिक्षण' : 'Financial Education'}
              </span>
            </button>

            {/* 5. EMI Calculator */}
            <button
              id="action-emi-calculator"
              onClick={() => onNavigate('emi_calculator')}
              className="bg-white rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs border border-slate-100 hover:border-orange-200 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#FF6500] flex items-center justify-center group-hover:bg-amber-100 transition-colors">
                <Calculator className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-[#0B214D] mt-2 leading-tight">
                {language === 'mr' ? 'ईएमआय कॅल्क्युलेटर' : 'EMI Calculator'}
              </span>
            </button>

            {/* 6. Offers & Rewards */}
            <button
              id="action-offers-rewards"
              onClick={() => alert('Special Partner Offers: ₹1,500 referral credit & 0% processing fee voucher available in your account!')}
              className="bg-white rounded-2xl p-3.5 flex flex-col items-center text-center shadow-2xs border border-slate-100 hover:border-orange-200 active:scale-95 transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-100 transition-colors">
                <Gift className="w-6 h-6 stroke-[2.2]" />
              </div>
              <span className="text-xs font-bold text-[#0B214D] mt-2 leading-tight">
                {language === 'mr' ? 'ऑफर्स & रिवॉर्ड्स' : 'Offers & Rewards'}
              </span>
            </button>
          </div>
        </div>

        {/* Promo Banner: "Is your loan application ready? Check your eligibility now! >" */}
        <button
          id="btn-loan-ready-banner"
          onClick={() => onNavigate('loan_eligibility')}
          className="w-full bg-[#EBFBF3] hover:bg-[#E1F7EC] border border-emerald-200 rounded-2xl p-3.5 flex items-center justify-between text-left transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <FileCheck2 className="w-6 h-6 stroke-[2]" />
            </div>
            <div>
              <p className="text-xs font-extrabold text-[#0B2553]">
                {language === 'mr' ? 'तुमचा कर्ज अर्ज तयार आहे का?' : 'Is your loan application ready?'}
              </p>
              <p className="text-[11px] font-medium text-emerald-800">
                {language === 'mr' ? 'तुमची पात्रता आताच तपासा!' : 'Check your eligibility now!'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-emerald-700" />
        </button>

        {/* CIBIL Analysis & Resolution Badge */}
        <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl p-4 text-white shadow-sm flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-100">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'सिबिल त्रुटी निराकरण' : 'CIBIL Dispute & Analysis'}</span>
            </div>
            <p className="text-sm font-black mt-0.5">
              {language === 'mr' ? '३ संभाव्य त्रुटी आढळल्या आहेत (+५४ गुण)' : '3 Inaccuracies Detected (+54 Pts)'}
            </p>
            <p className="text-[11px] text-amber-100 mt-0.5">
              {language === 'mr' ? 'तक्रार निवारण आणि multi-bureau तुलना' : 'Instant dispute letter & multi-bureau check'}
            </p>
          </div>
          <button
            id="btn-home-view-analysis"
            onClick={() => onNavigate('report_analysis')}
            className="px-3.5 py-2 rounded-xl bg-white text-orange-600 font-bold text-xs shadow-xs hover:bg-orange-50 active:scale-95 transition-all"
          >
            {language === 'mr' ? 'पहा' : 'Inspect'}
          </button>
        </div>

        {/* "Recommended for you" Section (Screen 4 Card) */}
        <div>
          <h4 className="text-xs font-black text-[#0B214D] tracking-tight mb-2 uppercase">
            {language === 'mr' ? 'तुमच्यासाठी शिफारस केलेले' : 'Recommended for you'}
          </h4>

          <button
            id="btn-recommended-article"
            onClick={() => onNavigate('learn_grow')}
            className="w-full bg-white rounded-2xl p-3 border border-slate-100 hover:border-orange-200 flex items-center justify-between text-left shadow-2xs transition-all active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              {/* Thumbnail matching screenshot 04 */}
              <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-emerald-100 to-sky-100 flex items-center justify-center text-emerald-700 shadow-2xs border border-emerald-200/50">
                <TrendingUp className="w-7 h-7 stroke-[2.2]" />
              </div>

              <div>
                <p className="text-xs font-bold text-[#0B214D] leading-snug">
                  {language === 'mr'
                    ? 'तुमचा सिबिल स्कोअर वाढवण्यासाठी ५ सोपे उपाय'
                    : '5 Simple Tips to Improve Your CIBIL Score'}
                </p>
                <span className="text-[11px] text-slate-400 font-medium">
                  {language === 'mr' ? '३ मिनिटे वाचन' : '3 min read'}
                </span>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        {/* Franchise / Consultant Mode Access */}
        <div className="bg-slate-100 rounded-2xl p-3 border border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Franchise Portal
            </span>
            <p className="text-xs font-bold text-slate-800">
              {language === 'mr' ? 'कट्टा केंद्र / फ्रँचायझी डॅशबोर्ड' : 'Katta Kendra / Consultant Hub'}
            </p>
          </div>
          <button
            id="btn-goto-consultant-hub"
            onClick={() => onNavigate('consultant_hub')}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-900 text-white text-[11px] font-bold transition-colors"
          >
            {language === 'mr' ? 'प्रवेश' : 'Open Hub'}
          </button>
        </div>
      </div>
    </div>
  );
};
