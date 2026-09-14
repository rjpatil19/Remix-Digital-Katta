import React from 'react';
import { Globe, Check, X, Sparkles } from 'lucide-react';
import { Language } from '../../types';
import { SUPPORTED_LANGUAGES, t } from '../../i18n';

interface LanguageSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
}

export const LanguageSelectorModal: React.FC<LanguageSelectorModalProps> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-language-selector"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-6 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-5 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-black tracking-tight">भाषा निवडा / Select Language</h2>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/30 text-orange-300 font-bold border border-orange-500/40">
                  9 Languages
                </span>
              </div>
              <p className="text-xs text-slate-300">
                TransUnion CIBIL 3.0 & Digital कट्टा Multi-Regional Localizer
              </p>
            </div>
          </div>
          <button
            id="btn-close-lang-modal"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/80 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Informational Subheader */}
        <div className="bg-amber-50/80 border-b border-amber-200/60 px-6 py-2.5 flex items-center gap-2 text-xs text-amber-900">
          <Sparkles className="w-4 h-4 text-orange-600 shrink-0" />
          <span>
            {currentLanguage === 'mr'
              ? 'सिबिल अहवाल विश्लेषण, ७-मुद्दे ऑडिट, कर्ज शिफारसी व तक्रार निवारण पत्रे तुमच्या मातृभाषेत उपलब्ध आहेत.'
              : 'Full CIR analysis, 7-point audit pillars, loan matrices & legal dispute notices in your native regional language.'}
          </span>
        </div>

        {/* 9 Languages Grid */}
        <div className="p-4 sm:p-6 overflow-y-auto max-h-[60vh] space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {SUPPORTED_LANGUAGES.map((langItem) => {
              const isSelected = currentLanguage === langItem.code;
              return (
                <button
                  key={langItem.code}
                  id={`btn-lang-choice-${langItem.code}`}
                  onClick={() => {
                    onSelectLanguage(langItem.code);
                    onClose();
                  }}
                  className={`flex items-start justify-between p-3.5 rounded-2xl border text-left transition-all relative group ${
                    isSelected
                      ? 'bg-gradient-to-r from-orange-50/90 to-amber-50/80 border-orange-400 shadow-xs ring-2 ring-orange-400/20'
                      : 'bg-white hover:bg-slate-50/80 border-slate-200 text-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl select-none pt-0.5">{langItem.flagOrSymbol}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-base font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                          {langItem.name}
                        </span>
                        <span className="text-xs text-slate-600 font-medium">
                          ({langItem.englishName})
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        {langItem.region}
                      </p>
                      <p className="text-[10px] text-orange-700 font-medium italic mt-1">
                        "{langItem.samplePhrase}"
                      </p>
                    </div>
                  </div>

                  <div className="pt-1">
                    {isSelected ? (
                      <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full border border-slate-300 group-hover:border-slate-400" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-600">
            {t('brandName', currentLanguage)} • {t('tagline', currentLanguage)}
          </span>
          <button
            id="btn-confirm-lang"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-md transition-colors"
          >
            {t('save', currentLanguage)} / Done
          </button>
        </div>
      </div>
    </div>
  );
};
