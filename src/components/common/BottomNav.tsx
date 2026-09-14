import React from 'react';
import { Home, FileText, BookOpen, User } from 'lucide-react';
import { Language, ScreenId } from '../../types';
import { t } from '../../i18n';

interface BottomNavProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  onNavigate,
  language
}) => {
  const isHome = currentScreen === 'home';
  const isReports = currentScreen === 'credit_score' || currentScreen === 'report_analysis' || currentScreen === 'report_success';
  const isLearn = currentScreen === 'learn_grow';
  const isProfile = currentScreen === 'profile';

  return (
    <div className="w-full bg-white border-t border-slate-200/80 px-4 py-2 flex items-center justify-around select-none shadow-[0_-2px_10px_rgba(0,0,0,0.03)] z-20">
      {/* Home Tab */}
      <button
        id="nav-tab-home"
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
          isHome ? 'text-[#FF6B00]' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className={`w-6 h-6 ${isHome ? 'stroke-[2.4] fill-[#FF6B00]/15' : 'stroke-[1.8]'}`} />
        <span className={`text-[11px] mt-0.5 ${isHome ? 'font-bold' : 'font-medium'}`}>
          {t('navHome', language)}
        </span>
      </button>

      {/* Reports Tab */}
      <button
        id="nav-tab-reports"
        onClick={() => onNavigate('credit_score')}
        className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
          isReports ? 'text-[#FF6B00]' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <FileText className={`w-6 h-6 ${isReports ? 'stroke-[2.4] fill-[#FF6B00]/15' : 'stroke-[1.8]'}`} />
        <span className={`text-[11px] mt-0.5 ${isReports ? 'font-bold' : 'font-medium'}`}>
          {t('navCreditScore', language)}
        </span>
      </button>

      {/* Learn Tab */}
      <button
        id="nav-tab-learn"
        onClick={() => onNavigate('learn_grow')}
        className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
          isLearn ? 'text-[#FF6B00]' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <BookOpen className={`w-6 h-6 ${isLearn ? 'stroke-[2.4] fill-[#FF6B00]/15' : 'stroke-[1.8]'}`} />
        <span className={`text-[11px] mt-0.5 ${isLearn ? 'font-bold' : 'font-medium'}`}>
          {t('navLearn', language)}
        </span>
      </button>

      {/* Profile Tab */}
      <button
        id="nav-tab-profile"
        onClick={() => onNavigate('profile')}
        className={`flex flex-col items-center justify-center py-1 px-3 transition-colors ${
          isProfile ? 'text-[#FF6B00]' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <User className={`w-6 h-6 ${isProfile ? 'stroke-[2.4] fill-[#FF6B00]/15' : 'stroke-[1.8]'}`} />
        <span className={`text-[11px] mt-0.5 ${isProfile ? 'font-bold' : 'font-medium'}`}>
          {t('navProfile', language)}
        </span>
      </button>
    </div>
  );
};
