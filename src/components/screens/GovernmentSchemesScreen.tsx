import React, { useState } from 'react';
import {
  ChevronRight,
  Landmark,
  ExternalLink,
  Check,
  FileText,
  X,
  Building2,
  Users,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { Header } from '../common/Header';
import { governmentSchemesData } from '../../data/mockData';
import { GovernmentScheme, Language } from '../../types';

interface GovernmentSchemesScreenProps {
  onBack: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

type FilterCategory = 'All' | 'Farmers' | 'Students' | 'Women' | 'Business';

export const GovernmentSchemesScreen: React.FC<GovernmentSchemesScreenProps> = ({
  onBack,
  language,
  onToggleLanguage
}) => {
  const [selectedCategory, setSelectedCategory] = useState<FilterCategory>('All');
  const [selectedScheme, setSelectedScheme] = useState<GovernmentScheme | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories: FilterCategory[] = ['All', 'Farmers', 'Students', 'Women', 'Business'];

  const filteredSchemes = governmentSchemesData.filter((scheme) => {
    const matchesCategory =
      selectedCategory === 'All' || scheme.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.nameMr.includes(searchQuery) ||
      scheme.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const getCategoryLabel = (cat: FilterCategory) => {
    if (language !== 'mr') return cat;
    switch (cat) {
      case 'All':
        return 'सर्व';
      case 'Farmers':
        return 'शेतकरी';
      case 'Students':
        return 'विद्यार्थी';
      case 'Women':
        return 'महिला';
      case 'Business':
        return 'व्यवसाय';
    }
  };

  const renderSchemeEmblem = (id: string) => {
    switch (id) {
      case 'pm-mudra':
        return (
          <div className="w-12 h-12 rounded-xl bg-orange-50 border border-orange-200 flex flex-col items-center justify-center p-1">
            <span className="text-[9px] font-black text-red-600 leading-tight">MUDRA</span>
            <span className="text-[7px] font-bold text-amber-700">मुद्रा</span>
          </div>
        );
      case 'pm-awas':
        return (
          <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex flex-col items-center justify-center p-1 text-sky-600">
            <Building2 className="w-6 h-6 stroke-[1.8]" />
            <span className="text-[7px] font-bold text-sky-800">PMAY</span>
          </div>
        );
      case 'pm-kisan':
        return (
          <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex flex-col items-center justify-center p-1 text-amber-600">
            <Users className="w-6 h-6 stroke-[1.8]" />
            <span className="text-[7px] font-bold text-amber-800">PM-KISAN</span>
          </div>
        );
      case 'pm-vidya':
        return (
          <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex flex-col items-center justify-center p-1 text-blue-600">
            <GraduationCap className="w-6 h-6 stroke-[1.8]" />
            <span className="text-[7px] font-bold text-blue-800">विद्यालक्ष्मी</span>
          </div>
        );
      case 'stand-up-india':
        return (
          <div className="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-200 flex flex-col items-center justify-center p-1 text-indigo-600">
            <Sparkles className="w-6 h-6 stroke-[1.8]" />
            <span className="text-[7px] font-black text-indigo-900">STAND UP</span>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600">
            <Landmark className="w-6 h-6" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-y-auto select-none pb-6">
      {/* Header */}
      <Header
        title={language === 'mr' ? 'सरकारी योजना' : 'Government Schemes'}
        showBack={true}
        onBack={onBack}
        rightAction="search"
        onRightAction={() => setShowSearchInput(!showSearchInput)}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      {/* Optional Search Bar */}
      {showSearchInput && (
        <div className="px-5 pt-2 pb-1">
          <input
            id="input-scheme-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'mr' ? 'योजना शोधा...' : 'Search schemes...'}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#FF6500]"
          />
        </div>
      )}

      {/* Filter Chips matching Screen 07 */}
      <div className="flex items-center gap-2 px-5 py-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-[#FF6500] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          );
        })}
      </div>

      {/* Schemes List Cards matching Screen 07 */}
      <div className="px-5 space-y-2.5 mt-1">
        {filteredSchemes.map((scheme) => (
          <button
            key={scheme.id}
            onClick={() => setSelectedScheme(scheme)}
            className="w-full bg-white border border-slate-100 hover:border-orange-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs active:scale-[0.99] transition-all text-left"
          >
            <div className="flex items-center gap-3.5">
              {renderSchemeEmblem(scheme.id)}
              <div>
                <h3 className="text-sm font-black text-[#0B214D]">
                  {language === 'mr' ? scheme.nameMr : scheme.name}
                </h3>
                <p className="text-xs text-slate-500 font-medium line-clamp-1">
                  {language === 'mr' ? scheme.taglineMr : scheme.tagline}
                </p>
              </div>
            </div>

            <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
          </button>
        ))}

        {filteredSchemes.length === 0 && (
          <div className="py-12 text-center text-slate-400 text-xs">
            No government schemes match the selected filter.
          </div>
        )}
      </div>

      {/* Scheme Detail Bottom Sheet */}
      {selectedScheme && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                {renderSchemeEmblem(selectedScheme.id)}
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {language === 'mr' ? selectedScheme.nameMr : selectedScheme.name}
                  </h3>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-[#FF6500] font-bold">
                    {selectedScheme.badge}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedScheme(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-2">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold">Benefit Amount</span>
                  <p className="text-xs font-bold text-slate-800">{selectedScheme.benefitAmount}</p>
                </div>
                {selectedScheme.interestSubsidy && (
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Subsidy / Terms</span>
                    <p className="text-xs font-bold text-emerald-600">{selectedScheme.interestSubsidy}</p>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1">
                  {language === 'mr' ? 'पात्रता निकष' : 'Eligibility Criteria'}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-2.5 rounded-xl">
                  {language === 'mr'
                    ? selectedScheme.eligibilitySummaryMr
                    : selectedScheme.eligibilitySummary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 mb-1">
                  {language === 'mr' ? 'आवश्यक कागदपत्रे' : 'Required Documents'}
                </h4>
                <div className="space-y-1">
                  {(language === 'mr'
                    ? selectedScheme.documentsRequiredMr
                    : selectedScheme.documentsRequired
                  ).map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <a
                href={selectedScheme.applyUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3 rounded-xl bg-[#FF6500] hover:bg-[#E55A00] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 transition-all mt-2"
              >
                <span>{language === 'mr' ? 'शासकीय पोर्टलवर अर्ज करा' : 'Apply via Official Portal'}</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
