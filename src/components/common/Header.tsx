import React from 'react';
import { ChevronLeft, Share2, Search, Settings, Wifi, Signal, Battery, Globe } from 'lucide-react';
import { Language, ScreenId } from '../../types';
import { SUPPORTED_LANGUAGES } from '../../i18n';

interface HeaderProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: 'share' | 'search' | 'settings' | 'none';
  onRightAction?: () => void;
  language: Language;
  onToggleLanguage?: () => void;
  onOpenLanguageSelector?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onBack,
  showBack = false,
  rightAction = 'none',
  onRightAction,
  language,
  onToggleLanguage,
  onOpenLanguageSelector,
}) => {
  const currentLangObj = SUPPORTED_LANGUAGES.find(l => l.code === language) || SUPPORTED_LANGUAGES[0];

  const handleLanguageClick = () => {
    if (onOpenLanguageSelector) {
      onOpenLanguageSelector();
    } else if (onToggleLanguage) {
      onToggleLanguage();
    }
  };
  return (
    <div className="w-full bg-white border-b border-slate-100 sticky top-0 z-30 select-none">
      {/* Phone Status Bar (9:41, Cellular, Wifi, Battery) */}
      <div className="flex items-center justify-between px-6 pt-2 pb-1 text-slate-800 text-xs font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-slate-700">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* Screen Title & Action Controls */}
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-2">
            {showBack && onBack ? (
              <button
                id="btn-nav-back"
                onClick={onBack}
                className="w-9 h-9 -ml-1 rounded-full flex items-center justify-center text-slate-800 hover:bg-slate-100 active:scale-95 transition-all"
                title="Go back"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
              </button>
            ) : (
              <div className="w-2" />
            )}
            <h1 className="text-lg font-bold text-slate-900 tracking-tight">
              {title}
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Quick Language Selector Pill */}
            <button
              id="btn-lang-toggle"
              onClick={handleLanguageClick}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-orange-50 text-orange-700 hover:bg-orange-100 transition-all border border-orange-200/60 shadow-xs"
              title="Select Language (9 Languages)"
            >
              <Globe className="w-3 h-3 text-orange-600" />
              <span>{currentLangObj.name}</span>
            </button>

            {rightAction === 'share' && (
              <button
                id="btn-header-share"
                onClick={onRightAction}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
                title="Share"
              >
                <Share2 className="w-5 h-5 stroke-[2]" />
              </button>
            )}

            {rightAction === 'search' && (
              <button
                id="btn-header-search"
                onClick={onRightAction}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
                title="Search"
              >
                <Search className="w-5 h-5 stroke-[2]" />
              </button>
            )}

            {rightAction === 'settings' && (
              <button
                id="btn-header-settings"
                onClick={onRightAction}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all"
                title="Settings"
              >
                <Settings className="w-5 h-5 stroke-[2]" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
