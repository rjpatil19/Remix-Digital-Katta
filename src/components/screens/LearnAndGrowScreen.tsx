import React, { useState } from 'react';
import {
  ChevronRight,
  Gauge,
  FileCheck,
  PiggyBank,
  Landmark,
  Sprout,
  X,
  BookOpen,
  Share2
} from 'lucide-react';
import { Header } from '../common/Header';
import { learnAndGrowArticles } from '../../data/mockData';
import { FinancialArticle, Language } from '../../types';

interface LearnAndGrowScreenProps {
  onBack: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

type ArticleCategory = 'All' | 'Credit Score' | 'Loans' | 'Money Management';

export const LearnAndGrowScreen: React.FC<LearnAndGrowScreenProps> = ({
  onBack,
  language,
  onToggleLanguage
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ArticleCategory>('All');
  const [selectedArticle, setSelectedArticle] = useState<FinancialArticle | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const categories: ArticleCategory[] = ['All', 'Credit Score', 'Loans', 'Money Management'];

  const filteredArticles = learnAndGrowArticles.filter((article) => {
    const matchesCategory =
      selectedCategory === 'All' || article.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.titleMr.includes(searchQuery);
    return matchesCategory && matchesQuery;
  });

  const getCategoryLabel = (cat: ArticleCategory) => {
    if (language !== 'mr') return cat;
    switch (cat) {
      case 'All':
        return 'सर्व';
      case 'Credit Score':
        return 'क्रेडिट स्कोअर';
      case 'Loans':
        return 'कर्ज';
      case 'Money Management':
        return 'पैशांचे व्यवस्थापन';
    }
  };

  const renderThumbnail = (iconName: string) => {
    switch (iconName) {
      case 'speedometer':
        return (
          <div className="w-16 h-14 rounded-xl bg-gradient-to-tr from-sky-100 to-emerald-100 flex items-center justify-center text-emerald-700 shadow-2xs border border-emerald-200/50">
            <Gauge className="w-7 h-7 stroke-[2]" />
          </div>
        );
      case 'contract':
        return (
          <div className="w-16 h-14 rounded-xl bg-gradient-to-tr from-amber-100 to-orange-100 flex items-center justify-center text-orange-700 shadow-2xs border border-orange-200/50">
            <FileCheck className="w-7 h-7 stroke-[2]" />
          </div>
        );
      case 'piggybank':
        return (
          <div className="w-16 h-14 rounded-xl bg-gradient-to-tr from-yellow-100 to-amber-200 flex items-center justify-center text-amber-700 shadow-2xs border border-amber-300/50">
            <PiggyBank className="w-7 h-7 stroke-[2]" />
          </div>
        );
      case 'bank':
        return (
          <div className="w-16 h-14 rounded-xl bg-gradient-to-tr from-emerald-100 to-teal-200 flex items-center justify-center text-emerald-800 shadow-2xs border border-emerald-300/50">
            <Landmark className="w-7 h-7 stroke-[2]" />
          </div>
        );
      case 'growth':
      default:
        return (
          <div className="w-16 h-14 rounded-xl bg-gradient-to-tr from-lime-100 to-emerald-200 flex items-center justify-center text-emerald-800 shadow-2xs border border-lime-300/50">
            <Sprout className="w-7 h-7 stroke-[2]" />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-y-auto select-none pb-6">
      {/* Header */}
      <Header
        title={language === 'mr' ? 'शिका आणि वाढा' : 'Learn & Grow'}
        showBack={true}
        onBack={onBack}
        rightAction="search"
        onRightAction={() => setShowSearch(!showSearch)}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      {/* Search Bar */}
      {showSearch && (
        <div className="px-5 pt-2 pb-1">
          <input
            id="input-learn-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'mr' ? 'लेख शोधा...' : 'Search financial articles...'}
            className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-[#FF6500]"
          />
        </div>
      )}

      {/* Category Pills matching Screen 08 */}
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

      {/* Articles Cards matching Screen 08 */}
      <div className="px-5 space-y-2.5 mt-1">
        {filteredArticles.map((article) => (
          <button
            key={article.id}
            onClick={() => setSelectedArticle(article)}
            className="w-full bg-white border border-slate-100 hover:border-orange-200 rounded-2xl p-3 flex items-center justify-between shadow-2xs active:scale-[0.99] transition-all text-left"
          >
            <div className="flex-1 pr-3">
              <h3 className="text-xs font-black text-[#0B214D] leading-snug">
                {language === 'mr' ? article.titleMr : article.title}
              </h3>
              <p className="text-[11px] text-slate-400 font-semibold mt-1">
                {language === 'mr' ? article.readTimeMr : article.readTime}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {renderThumbnail(article.imagePlaceholder)}
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>
        ))}
      </div>

      {/* Interactive Reading Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#FF6500]" />
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => alert('Article link shared!')}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="py-3">
              <h3 className="text-base font-black text-slate-900 leading-snug">
                {language === 'mr' ? selectedArticle.titleMr : selectedArticle.title}
              </h3>
              <p className="text-[11px] text-slate-400 font-semibold mt-1">
                {language === 'mr' ? selectedArticle.readTimeMr : selectedArticle.readTime}
              </p>

              <div className="mt-3 p-3 bg-orange-50/70 border border-orange-100 rounded-xl text-xs text-orange-900 font-medium">
                {language === 'mr' ? selectedArticle.summaryMr : selectedArticle.summary}
              </div>

              <div className="mt-4 space-y-2.5">
                {(language === 'mr'
                  ? selectedArticle.contentMr
                  : selectedArticle.content
                ).map((para, idx) => (
                  <p key={idx} className="text-xs text-slate-700 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="w-full mt-5 py-3 rounded-xl bg-[#0B214D] text-white font-bold text-xs shadow-xs"
              >
                {language === 'mr' ? 'पूर्ण झाले' : 'Done Reading'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
