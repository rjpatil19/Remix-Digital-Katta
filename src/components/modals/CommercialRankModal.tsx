import React, { useState } from 'react';
import {
  X,
  Building2,
  ShieldCheck,
  TrendingUp,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Share2,
  Sparkles,
  ArrowRight,
  AlertCircle,
  HelpCircle,
  Search
} from 'lucide-react';
import { Language, CommercialRankData } from '../../types';

interface CommercialRankModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const defaultCompany: CommercialRankData = {
  companyName: 'Deshmukh Agro Engineering Pvt Ltd',
  panGst: '27AABCD1234F1Z5',
  entityType: 'Private Limited',
  cmrRank: 2,
  cmrDescription: 'CMR-2 denotes Prime Commercial Credit Profile with lowest probability of default. Eligible for preferential pricing from Tier-1 banks.',
  cmrDescriptionMr: 'CMR-२ म्हणजे उत्कृष्ट व्यावसायिक पत आणि अत्यंत कमी जोखीम. अव्वल बँकांकडून सवलतीच्या व्याजदरात व्यवसाय कर्जास पात्र.',
  riskCategory: 'Very Low Risk',
  riskCategoryMr: 'अत्यंत कमी जोखीम (Very Low Risk)',
  totalCreditFacilities: 4,
  sanctionedAmount: 8500000,
  currentOutstanding: 3420000,
  overdueAmount: 0,
  workingCapitalHealth: 'Optimal',
  eligibilityForCommercialLoans: 'High',
  bureauControlNumber: 'CMR-2026-881902',
  reportDate: '15 Sep 2026'
};

export const CommercialRankModal: React.FC<CommercialRankModalProps> = ({
  isOpen,
  onClose,
  language
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'check_new'>('overview');
  const [companyName, setCompanyName] = useState('Deshmukh Agro Engineering Pvt Ltd');
  const [panGst, setPanGst] = useState('27AABCD1234F1Z5');
  const [entityType, setEntityType] = useState<'Private Limited' | 'Proprietorship' | 'Partnership' | 'LLP'>('Private Limited');
  const [isSearching, setIsSearching] = useState(false);
  const [data, setData] = useState<CommercialRankData>(defaultCompany);

  if (!isOpen) return null;

  const handleSearchCompany = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      setData({
        ...defaultCompany,
        companyName: companyName || 'Katta Enterprises LLP',
        panGst: panGst || '27AAECB9981K1Z2',
        entityType,
        bureauControlNumber: `CMR-${Date.now().toString().slice(-6)}`
      });
      setActiveTab('overview');
    }, 700);
  };

  const isMr = language === 'mr';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#0B214D] via-[#112F6B] to-[#0B214D] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-orange-400 border border-white/15">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/30 text-orange-300 border border-orange-400/30">
                  CIBIL Commercial
                </span>
                <span className="text-[10px] text-slate-300">MSME & Corporate</span>
              </div>
              <h3 className="text-sm font-black text-white leading-snug">
                {isMr ? 'कंपनी कमर्शियल रँक (CMR)' : 'Company Credit Rank (CMR)'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-slate-100 bg-slate-50 px-4 pt-2 gap-2 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 px-2 border-b-2 transition-all ${
              activeTab === 'overview'
                ? 'border-[#FF6500] text-[#FF6500]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {isMr ? 'CMR अहवाल सारांश' : 'CMR Rank Snapshot'}
          </button>
          <button
            onClick={() => setActiveTab('check_new')}
            className={`pb-2 px-2 border-b-2 transition-all ${
              activeTab === 'check_new'
                ? 'border-[#FF6500] text-[#FF6500]'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {isMr ? 'दुसरी कंपनी तपासा' : 'Check Another Entity'}
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-slate-800">
          {activeTab === 'overview' ? (
            <>
              {/* Company Banner */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-slate-50 to-orange-50/40 border border-orange-100">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 leading-tight">
                      {data.companyName}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 mt-0.5">
                      GSTIN/PAN: <span className="font-bold text-slate-700">{data.panGst}</span> • {data.entityType}
                    </p>
                  </div>
                  <span className="shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Active Entity
                  </span>
                </div>
              </div>

              {/* CMR Big Rank Badge */}
              <div className="p-4 rounded-2xl bg-[#0B214D] text-white shadow-md relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-orange-300">
                      TransUnion CIBIL Rank
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-3xl font-black text-white tracking-tight">
                        CMR-{data.cmrRank}
                      </span>
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-700/50">
                        {isMr ? data.riskCategoryMr : data.riskCategory}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-2 max-w-[280px] leading-relaxed">
                      {isMr ? data.cmrDescriptionMr : data.cmrDescription}
                    </p>
                  </div>

                  {/* Visual scale badge */}
                  <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center text-center p-1">
                    <span className="text-[9px] text-slate-400 font-bold uppercase">Scale</span>
                    <span className="text-xs font-black text-orange-400">1 to 10</span>
                    <span className="text-[8px] text-emerald-300">1 = Best</span>
                  </div>
                </div>

                {/* CMR Rank Step Scale */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between text-[10px] text-slate-300 font-bold mb-1">
                    <span className="text-emerald-400">CMR 1-3 (Super Prime)</span>
                    <span className="text-amber-300">CMR 4-7 (Moderate)</span>
                    <span className="text-rose-400">CMR 8-10 (High Risk)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 flex overflow-hidden p-0.5 gap-0.5">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => (
                      <div
                        key={step}
                        className={`h-full flex-1 rounded-xs transition-all ${
                          step === data.cmrRank
                            ? 'bg-orange-400 ring-2 ring-white scale-110'
                            : step <= 3
                            ? 'bg-emerald-500/70'
                            : step <= 7
                            ? 'bg-amber-500/70'
                            : 'bg-rose-500/70'
                        }`}
                        title={`Rank CMR-${step}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Commercial Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    {isMr ? 'मंजूर पत मर्यादा' : 'Sanctioned Limit'}
                  </span>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    ₹{(data.sanctionedAmount / 100000).toFixed(1)} Lakhs
                  </p>
                  <p className="text-[10px] text-slate-400">{data.totalCreditFacilities} Active Accounts</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    {isMr ? 'चालू बाकी' : 'Current Outstanding'}
                  </span>
                  <p className="text-sm font-black text-slate-900 mt-0.5">
                    ₹{(data.currentOutstanding / 100000).toFixed(1)} Lakhs
                  </p>
                  <p className="text-[10px] text-emerald-600 font-bold">40.2% Healthy Utilization</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    {isMr ? 'थकबाकी (Overdue)' : 'Overdue Balance'}
                  </span>
                  <p className="text-sm font-black text-emerald-600 mt-0.5">
                    ₹0 (NIL)
                  </p>
                  <p className="text-[10px] text-slate-400">100% Clean Repayment</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] font-bold text-slate-500 uppercase">
                    {isMr ? 'नवीन कर्ज पात्रता' : 'Loan Readiness'}
                  </span>
                  <p className="text-sm font-black text-[#FF6500] mt-0.5">
                    ₹1.50 - 2.0 Cr
                  </p>
                  <p className="text-[10px] text-slate-400">Prime MSME Rates</p>
                </div>
              </div>

              {/* Banker Benefits */}
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 font-black text-emerald-900">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>{isMr ? 'CMR-२ मुळे मिळणारे व्यापारी फायदे' : 'Commercial Benefits of CMR-2'}</span>
                </div>
                <ul className="text-[11px] text-emerald-800 space-y-1 list-disc list-inside">
                  <li>{isMr ? '८.४०% पासून सवलतीचे वर्किंग कॅपिटल (CC / OD).' : 'Concessional working capital (Cash Credit/OD) from 8.40%.'}</li>
                  <li>{isMr ? 'सरकारी टेंडरसाठी बँक गॅरंटी (BG) विनाअडथळा मंजूर.' : 'Fast-track Bank Guarantee (BG) & Letter of Credit for Govt Tenders.'}</li>
                  <li>{isMr ? 'CGTMSE अंतर्गत ₹५ कोटींपर्यंत विनातारण कर्ज मंजुरी.' : 'Eligible for collateral-free CGTMSE loans up to ₹5 Crore.'}</li>
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => alert(isMr ? 'CMR सारांश अहवाल डाउनलोड झाला!' : 'Company Commercial Rank PDF Downloaded!')}
                  className="flex-1 py-2.5 rounded-xl bg-[#0B214D] hover:bg-[#112F6B] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-orange-400" />
                  <span>{isMr ? 'CMR अहवाल डाउनलोड करा' : 'Download CMR Report'}</span>
                </button>
                <button
                  onClick={onClose}
                  className="py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition-all"
                >
                  {isMr ? 'बंद करा' : 'Close'}
                </button>
              </div>
            </>
          ) : (
            /* Check Another Entity Form */
            <form onSubmit={handleSearchCompany} className="space-y-3">
              <div className="p-3 rounded-xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900">
                <p className="font-bold flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  <span>{isMr ? 'व्यावसायिक सिबिल अहवाल' : 'Commercial Bureau Search'}</span>
                </p>
                <p className="text-[11px] text-blue-800 mt-1">
                  {isMr
                    ? 'तुमच्या फर्म, कंपनी किंवा संस्थेचा GSTIN अथवा पॅन टाकून CMR रँक तपासा.'
                    : 'Fetch official CIBIL CMR Rank (1 to 10) for your LLP, Pvt Ltd, Partnership, or Proprietorship.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isMr ? 'कंपनी / फर्मचे नाव' : 'Company / Entity Name'}
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="e.g. Patil Logistics & Warehousing Pvt Ltd"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isMr ? 'GSTIN / पॅन नंबर' : 'GSTIN / Company PAN'}
                  </label>
                  <input
                    type="text"
                    required
                    value={panGst}
                    onChange={(e) => setPanGst(e.target.value.toUpperCase())}
                    placeholder="27ABCDE1234F1Z5"
                    className="w-full px-3 py-2 text-xs font-mono uppercase border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isMr ? 'संस्थेचा प्रकार' : 'Entity Structure'}
                  </label>
                  <select
                    value={entityType}
                    onChange={(e: any) => setEntityType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-xl bg-white focus:outline-hidden focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500"
                  >
                    <option value="Private Limited">Private Limited</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="LLP">LLP</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSearching}
                  className="w-full py-2.5 rounded-xl bg-[#FF6500] hover:bg-[#E55A00] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  {isSearching ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      <span>{isMr ? 'कमर्शियल ब्युरो तपासत आहे...' : 'Fetching Commercial CIR...'}</span>
                    </>
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      <span>{isMr ? 'कंपनी CMR रँक शोधा' : 'Fetch Commercial Rank (CMR)'}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
