import React, { useState } from 'react';
import {
  Building2,
  Home,
  Car,
  CreditCard,
  Briefcase,
  UserCheck,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Sliders,
  DollarSign,
  FileText,
  Clock,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Check,
  Coins,
  ArrowRight
} from 'lucide-react';
import { Language, ExtractedReport, LoanRecommendation } from '../../../types';

interface LoanMatrixSectionProps {
  loans: LoanRecommendation[];
  language: Language;
  report: ExtractedReport;
  onApplyForLoan?: (loanCategory: string) => void;
  onGenerateDossier?: (loanCategory: string) => void;
}

export const LoanMatrixSection: React.FC<LoanMatrixSectionProps> = ({
  loans,
  language,
  report,
  onApplyForLoan,
  onGenerateDossier
}) => {
  const [filter, setFilter] = useState<'ALL' | 'HIGH_APPROVED' | 'SECURED' | 'UNSECURED'>('ALL');
  const [expandedLoanId, setExpandedLoanId] = useState<string | null>('loan-rec-home');
  
  // Interactive Underwriting Simulator State
  const [simCategory, setSimCategory] = useState<'Home' | 'LAP' | 'Personal' | 'Auto' | 'Gold'>('Home');
  const [simAmountLakhs, setSimAmountLakhs] = useState<number>(35);
  const [simTenureYears, setSimTenureYears] = useState<number>(20);

  // Borrower Financial Baseline
  const netMonthlyIncome = 125000;
  const existingMonthlyEmi = 21500;
  const existingFoir = Math.round((existingMonthlyEmi / netMonthlyIncome) * 100);

  // Interest Rates & Formulas for Simulation
  const rateMap: Record<string, number> = {
    Home: 8.5,
    LAP: 9.2,
    Personal: 10.75,
    Auto: 8.75,
    Gold: 8.95
  };

  const currentRate = rateMap[simCategory] || 8.5;
  const monthlyRate = currentRate / (12 * 100);
  const totalMonths = simTenureYears * 12;
  const principal = simAmountLakhs * 100000;

  // Standard EMI Formula: [P x R x (1+R)^N] / [(1+R)^N - 1]
  const simEmi = Math.round(
    (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1)
  );

  const totalNewEmi = existingMonthlyEmi + simEmi;
  const simulatedFoir = Math.min(100, Math.round((totalNewEmi / netMonthlyIncome) * 100));

  const isFoirApproved = simulatedFoir <= 50;
  const isFoirConditional = simulatedFoir > 50 && simulatedFoir <= 65;

  // Filter Loans
  const filteredLoans = loans.filter(loan => {
    if (filter === 'HIGH_APPROVED') {
      return (loan.approvalOdds || 0) >= 90 || loan.decision === 'Highly Approved';
    }
    if (filter === 'SECURED') {
      return (
        loan.category.includes('Home') ||
        loan.category.includes('Property') ||
        loan.category.includes('Auto') ||
        loan.category.includes('Gold')
      );
    }
    if (filter === 'UNSECURED') {
      return (
        loan.category.includes('Personal') ||
        loan.category.includes('Card') ||
        loan.category.includes('Business')
      );
    }
    return true;
  });

  const getLoanIcon = (category: string) => {
    if (category.includes('Home') || category.includes('Property')) return <Home className="w-5 h-5" />;
    if (category.includes('Auto') || category.includes('Vehicle')) return <Car className="w-5 h-5" />;
    if (category.includes('Card')) return <CreditCard className="w-5 h-5" />;
    if (category.includes('Business')) return <Briefcase className="w-5 h-5" />;
    if (category.includes('Gold')) return <Coins className="w-5 h-5" />;
    return <UserCheck className="w-5 h-5" />;
  };

  return (
    <div className="space-y-4">
      {/* EXECUTIVE UNDERWRITING CAPACITY BANNER */}
      <div className="bg-gradient-to-br from-[#0B214D] via-[#122b64] to-[#1e3a8a] text-white p-5 rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500 text-white font-black text-[10px] uppercase tracking-wider">
                Credit Dost Underwriting Standard
              </span>
              <span className="text-[11px] text-slate-300 font-medium">
                CIBIL {report.score} / 900 • FOIR Stress Tested
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              {language === 'mr' ? 'संस्थात्मक कर्ज पात्रता व अंडररायटिंग मॅट्रिक्स' : 'Institutional Loan Eligibility & Underwriting Matrix'}
            </h2>
            <p className="text-xs text-slate-200 mt-1 max-w-2xl leading-relaxed">
              {language === 'mr'
                ? 'सरकारी, खाजगी बँका आणि एनबीएफसी यांच्या अधिकृत कर्ज मंजुरी निकषांवर आधारित अचूक अंदाज, व्याजदर आणि एफओआयआर (FOIR) विश्लेषण.'
                : 'Underwriting models across Tier-1 Banks (SBI, HDFC, ICICI, BoB), Tier-2 NBFCs, and Small Finance Banks with live FOIR debt service calculation.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-orange-300 uppercase font-black block">Borrowing Bandwidth</span>
              <span className="text-2xl font-black text-white">₹75+ <span className="text-sm font-normal text-slate-300">Lakhs</span></span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-emerald-600 flex items-center justify-center font-black text-white shadow-inner">
              <Building2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Financial Capacity 4-Col Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-4 border-t border-white/10 text-center text-xs">
          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Net Monthly Salary</span>
            <span className="text-base font-black text-white mt-0.5 block">₹1,25,000</span>
            <span className="text-[10px] text-emerald-300 font-medium">IIT Kharagpur</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Current Monthly EMIs</span>
            <span className="text-base font-black text-white mt-0.5 block">₹21,500</span>
            <span className="text-[10px] text-slate-300 font-medium">Auto + Housing</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Current FOIR Level</span>
            <span className="text-base font-black text-emerald-300 mt-0.5 block">{existingFoir}%</span>
            <span className="text-[10px] text-emerald-400 font-semibold">Ultra Safe (&lt;50% max)</span>
          </div>

          <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[10px] text-slate-300 uppercase font-bold block">Safe EMI Headroom</span>
            <span className="text-base font-black text-orange-300 mt-0.5 block">₹41,000 / mo</span>
            <span className="text-[10px] text-slate-300 font-medium">Remaining Bandwidth</span>
          </div>
        </div>
      </div>

      {/* INTERACTIVE UNDERWRITER FOIR & EMI SIMULATOR */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600">
                Institutional Underwriting Simulator
              </span>
              <h3 className="text-sm font-black text-slate-900">
                {language === 'mr' ? 'कर्ज रक्कम, हप्ता व एफओआयआर (FOIR) सिम्युलेटर' : 'Loan Sanction, EMI & Post-Borrowing FOIR Stress Simulator'}
              </h3>
            </div>
          </div>
          <span className="text-xs font-bold text-slate-500 hidden sm:inline">
            Standard Banking Formula
          </span>
        </div>

        {/* Facility Selector Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
          {(['Home', 'LAP', 'Personal', 'Auto', 'Gold'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSimCategory(cat);
                if (cat === 'Home') { setSimAmountLakhs(35); setSimTenureYears(20); }
                if (cat === 'LAP') { setSimAmountLakhs(25); setSimTenureYears(15); }
                if (cat === 'Personal') { setSimAmountLakhs(12); setSimTenureYears(5); }
                if (cat === 'Auto') { setSimAmountLakhs(10); setSimTenureYears(7); }
                if (cat === 'Gold') { setSimAmountLakhs(8); setSimTenureYears(3); }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                simCategory === cat
                  ? 'bg-[#0B214D] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat === 'Home' ? 'Home Loan (८.५०%)' :
               cat === 'LAP' ? 'LAP Refinance (९.२०%)' :
               cat === 'Personal' ? 'Personal Loan (१०.७५%)' :
               cat === 'Auto' ? 'Car Loan (८.७५%)' : 'Gold Loan (८.९५%)'}
            </button>
          ))}
        </div>

        {/* Sliders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
          <div className="space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-slate-600">Sanction Amount (कर्ज रक्कम):</span>
              <span className="text-sm font-black text-[#0B214D]">₹{simAmountLakhs} Lakhs</span>
            </div>
            <input
              type="range"
              min={simCategory === 'Personal' || simCategory === 'Gold' ? 2 : 5}
              max={simCategory === 'Home' ? 75 : simCategory === 'LAP' ? 50 : 25}
              step={1}
              value={simAmountLakhs}
              onChange={e => setSimAmountLakhs(Number(e.target.value))}
              className="w-full accent-[#FF6500] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>₹{simCategory === 'Personal' ? '2L' : '5L'}</span>
              <span>₹{simCategory === 'Home' ? '75L' : '25L'}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-bold">
              <span className="text-slate-600">Tenure (कालावधी):</span>
              <span className="text-sm font-black text-[#0B214D]">{simTenureYears} Years ({totalMonths} Months)</span>
            </div>
            <input
              type="range"
              min={1}
              max={simCategory === 'Home' ? 30 : simCategory === 'LAP' ? 20 : simCategory === 'Auto' ? 7 : 5}
              step={1}
              value={simTenureYears}
              onChange={e => setSimTenureYears(Number(e.target.value))}
              className="w-full accent-[#FF6500] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>1 Year</span>
              <span>{simCategory === 'Home' ? '30 Years' : '7 Years'}</span>
            </div>
          </div>
        </div>

        {/* Real-time Underwriting Verdict Output */}
        <div className="p-4 rounded-xl border flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900 text-white">
          <div className="space-y-1 text-center sm:text-left">
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span
                className={`text-[10px] font-black px-2 py-0.5 rounded uppercase ${
                  isFoirApproved
                    ? 'bg-emerald-500 text-white'
                    : isFoirConditional
                    ? 'bg-amber-500 text-slate-950'
                    : 'bg-rose-500 text-white'
                }`}
              >
                {isFoirApproved ? 'INSTITUTIONAL SANCTION: APPROVED' : isFoirConditional ? 'SANCTION: CONDITIONAL' : 'EXCEEDS FOIR CEILING'}
              </span>
              <span className="text-[11px] text-slate-300">
                Rate: <strong className="text-orange-400">{currentRate}% p.a.</strong>
              </span>
            </div>
            <div className="text-xs text-slate-300">
              New Total Debt Service: <strong className="text-white">₹{totalNewEmi.toLocaleString('en-IN')} / month</strong> (Post-Loan FOIR: <strong className={isFoirApproved ? 'text-emerald-400' : 'text-amber-400'}>{simulatedFoir}%</strong> of ₹1.25L income)
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-center sm:text-right border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Monthly EMI</span>
              <span className="text-xl sm:text-2xl font-black text-emerald-400">₹{simEmi.toLocaleString('en-IN')}</span>
            </div>
            <button
              onClick={() => onApplyForLoan?.(simCategory)}
              className="px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-black text-xs transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* FILTER TABS FOR LOAN PRODUCTS */}
      <div className="flex items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'ALL'
                ? 'bg-[#0B214D] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Products ({loans.length})
          </button>
          <button
            onClick={() => setFilter('HIGH_APPROVED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'HIGH_APPROVED'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            Highly Approved (90%+)
          </button>
          <button
            onClick={() => setFilter('SECURED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'SECURED'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Secured / Mortgages
          </button>
          <button
            onClick={() => setFilter('UNSECURED')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'UNSECURED'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Unsecured &amp; Cards
          </button>
        </div>

        <span className="text-xs text-slate-500 font-bold hidden sm:inline">
          Showing {filteredLoans.length} Facilities
        </span>
      </div>

      {/* 8-PRODUCT INSTITUTIONAL CARDS LIST */}
      <div className="space-y-3.5">
        {filteredLoans.map(loan => {
          const isExpanded = expandedLoanId === loan.id;
          const isApproved = loan.decision === 'Highly Approved' || loan.decision === 'Approved';
          const isConditional = loan.decision === 'Conditional';
          const isHighFriction = loan.decision === 'High Friction' || loan.decision === 'Not Recommended';

          const cardBorder = isApproved
            ? 'border-emerald-200 bg-white'
            : isConditional
            ? 'border-amber-200 bg-white'
            : 'border-rose-200 bg-rose-50/20';

          const badgeBg = isApproved
            ? 'bg-emerald-100 text-emerald-800'
            : isConditional
            ? 'bg-amber-100 text-amber-800'
            : 'bg-rose-100 text-rose-800';

          return (
            <div
              key={loan.id}
              className={`rounded-2xl border transition-all overflow-hidden shadow-2xs ${cardBorder}`}
            >
              {/* Card Header Bar */}
              <button
                onClick={() => setExpandedLoanId(isExpanded ? null : loan.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                      isApproved
                        ? 'bg-emerald-100 text-emerald-700'
                        : isConditional
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {getLoanIcon(loan.category)}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                        {language === 'mr' ? loan.categoryMr : loan.category}
                      </h4>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${badgeBg}`}>
                        {language === 'mr' ? loan.decisionMr : loan.decision}
                        {loan.approvalOdds ? ` (${loan.approvalOdds}%)` : ''}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        Risk: {loan.riskRating}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-600 flex-wrap">
                      <span>
                        Limit: <strong className="text-slate-900 font-black">{loan.recommendedLimit}</strong>
                      </span>
                      <span className="text-slate-300 hidden sm:inline">•</span>
                      <span>
                        Terms: <strong className="text-[#0B214D] font-bold">{loan.interestTerms}</strong>
                      </span>
                      {loan.estimatedEmi && (
                        <>
                          <span className="text-slate-300 hidden sm:inline">•</span>
                          <span>
                            Est. EMI: <strong className="text-emerald-700 font-bold">{loan.estimatedEmi}</strong>
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-bold text-slate-400 block">Sanction Odds</span>
                    <span className="text-sm font-black text-slate-900">
                      {loan.approvalOdds ? `${loan.approvalOdds}%` : 'High'}
                    </span>
                  </div>
                  <div className="p-1 rounded-lg text-slate-400">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>
              </button>

              {/* Expanded Detail Panel */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-3.5 text-xs">
                  {/* Financial Metrics Strip */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-white p-3 rounded-xl border border-slate-200 text-center">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Sanction Range</span>
                      <span className="font-black text-slate-900 mt-0.5 block">{loan.recommendedLimit}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Pricing Spread</span>
                      <span className="font-bold text-[#0B214D] mt-0.5 block">{loan.interestTerms}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Tenure Range</span>
                      <span className="font-bold text-slate-700 mt-0.5 block">{loan.tenureRange || '1 - 20 Years'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">FOIR Impact</span>
                      <span className="font-bold text-emerald-700 mt-0.5 block">{loan.foirImpact || 'Within 50% Limit'}</span>
                    </div>
                  </div>

                  {/* Target Lending Institutions */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                      Target Lending Institutions &amp; Channel Allocation:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                          <Building2 className="w-3.5 h-3.5 text-blue-700" />
                          <span>Tier-1 PSU &amp; Top Private:</span>
                        </div>
                        <p className="text-slate-600 font-medium">
                          {loan.targetLendersTier1?.join(', ') || 'SBI, HDFC Bank, ICICI Bank, Bank of Baroda'}
                        </p>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                          <Layers className="w-3.5 h-3.5 text-indigo-700" />
                          <span>Tier-2 Prime NBFCs:</span>
                        </div>
                        <p className="text-slate-600 font-medium">
                          {loan.targetLendersTier2?.join(', ') || 'Tata Capital, Bajaj Finance, L&T Finance'}
                        </p>
                      </div>

                      <div className="bg-white p-2.5 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-1.5 text-slate-900 font-bold mb-1">
                          <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                          <span>Small Finance Banks (SFBs):</span>
                        </div>
                        <p className="text-slate-600 font-medium">
                          {loan.targetLendersSFB?.join(', ') || 'Equitas SFB, AU Small Finance Bank, Ujjivan SFB'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Underwriter Friction vs Compensating Factors (Side-by-Side) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="bg-rose-50/70 p-3 rounded-xl border border-rose-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-rose-900 font-bold">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Underwriter Friction Points:</span>
                      </div>
                      <ul className="space-y-1 text-rose-800 font-medium">
                        {loan.underwriterFriction?.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        )) || (
                          <li className="text-slate-500 font-normal">
                            {language === 'mr' ? loan.specialConditionsMr : loan.specialConditionsEn}
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-emerald-900 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Borrower Compensating Factors:</span>
                      </div>
                      <ul className="space-y-1 text-emerald-800 font-medium">
                        {loan.compensatingFactors?.map((factor, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{factor}</span>
                          </li>
                        )) || (
                          <li className="text-slate-500 font-normal">
                            Clean payment streak and confirmed salaried professional profile.
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Required Documentation Checklist */}
                  {loan.requiredDocs && (
                    <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                        <FileText className="w-3.5 h-3.5 text-slate-600" />
                        <span>Fast-Track Document Checklist (48-Hour Sanction):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {loan.requiredDocs.map((doc, idx) => (
                          <span
                            key={idx}
                            className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-[11px] font-medium border border-slate-200"
                          >
                            ✓ {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200">
                    <span className="text-slate-500 font-medium text-[11px]">
                      Digital कट्टा Priority Routing Channel
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onGenerateDossier?.(loan.category)}
                        className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Lender Dossier</span>
                      </button>

                      <button
                        onClick={() => onApplyForLoan?.(loan.category)}
                        className="px-3.5 py-1.5 rounded-lg bg-[#FF6500] hover:bg-orange-600 text-white font-bold transition-colors flex items-center gap-1 shadow-xs"
                      >
                        <span>Apply via Franchise Desk</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
