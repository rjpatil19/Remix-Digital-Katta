import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Sliders,
  ChevronDown,
  ChevronUp,
  Info,
  Scale,
  Sparkles,
  ExternalLink,
  CreditCard,
  History,
  Lock,
  Search,
  Check,
  ArrowRight
} from 'lucide-react';
import { Language, ExtractedReport, CirAuditPillar } from '../../../types';

interface SevenPointAuditSectionProps {
  pillars: CirAuditPillar[];
  language: Language;
  report: ExtractedReport;
  onNavigateToDispute: () => void;
  onNavigateToAccounts: () => void;
}

export const SevenPointAuditSection: React.FC<SevenPointAuditSectionProps> = ({
  pillars,
  language,
  report,
  onNavigateToDispute,
  onNavigateToAccounts
}) => {
  const [filter, setFilter] = useState<'ALL' | 'ATTENTION' | 'HIGH_WEIGHT' | 'PERFECT'>('ALL');
  const [expandedPillars, setExpandedPillars] = useState<string[]>(['pillar-747-1', 'pillar-747-2', 'pillar-dyn-1', 'pillar-dyn-2']);
  
  // Paydown Simulator State
  const [paydownTarget, setPaydownTarget] = useState<30 | 10 | 0>(30);
  const [showDpdLegend, setShowDpdLegend] = useState<boolean>(false);

  // Card utilization calculation from report
  const cardAccounts = report.accounts.filter(
    a => a.accountType === 'Credit Card' || a.accountType === 'Overdraft'
  );
  const totalCardLimit = cardAccounts.reduce(
    (sum, c) => sum + (c.creditLimit || c.sanctionedAmount || 0),
    0
  ) || 69000;
  const currentCardBalance = cardAccounts.reduce((sum, c) => sum + c.currentBalance, 0) || 49290;
  const currentUtilizationPct = Math.min(100, Math.round((currentCardBalance / totalCardLimit) * 100));

  const targetBalance = Math.round((totalCardLimit * paydownTarget) / 100);
  const requiredPaydown = Math.max(0, currentCardBalance - targetBalance);
  const estimatedScoreGain = paydownTarget === 30 ? 20 : paydownTarget === 10 ? 32 : 38;

  // Filter pillars
  const filteredPillars = pillars.filter(p => {
    if (filter === 'ATTENTION') return p.status === 'ATTENTION' || p.status === 'CRITICAL' || p.score < 80;
    if (filter === 'HIGH_WEIGHT') return p.weight >= 20;
    if (filter === 'PERFECT') return p.score >= 95;
    return true;
  });

  const togglePillar = (id: string) => {
    setExpandedPillars(prev =>
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const expandAll = () => {
    setExpandedPillars(pillars.map(p => p.id));
  };

  const collapseAll = () => {
    setExpandedPillars([]);
  };

  // Overall Audit Score
  const weightedAuditScore = Math.round(
    pillars.reduce((sum, p) => sum + (p.score * p.weight) / 100, 0)
  );

  return (
    <div className="space-y-4">
      {/* INSTITUTIONAL 7-POINT AUDIT BANNER */}
      <div className="bg-gradient-to-br from-[#0B214D] via-[#122b64] to-[#1e3a8a] text-white p-5 rounded-2xl shadow-md relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full bg-orange-500 text-white font-black text-[10px] uppercase tracking-wider">
                Institutional Forensic Standard
              </span>
              <span className="text-[11px] text-slate-300 font-medium hidden sm:inline">
                RBI Master Direction & CICRA 2005 Compliant
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-black tracking-tight">
              {language === 'mr' ? '७-मुद्दे सिबिल फॉरेन्सिक ऑडिट अहवाल' : '7-Point Forensic CIR Underwriting Audit'}
            </h2>
            <p className="text-xs text-slate-200 mt-1 max-w-2xl leading-relaxed">
              {language === 'mr'
                ? 'बँक क्रेडिट मॅनेजर आणि सिबिल अल्गोरिदम ज्या ७ प्रमुख घटकांवर आधारित कर्ज मंजुरी ठरवतात, त्याचे सखोल विश्लेषण.'
                : 'Comprehensive audit across the 7 mandatory dimensions used by tier-1 institutional credit committees to assess creditworthiness and default probabilities.'}
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 shrink-0">
            <div className="text-right">
              <span className="text-[10px] text-orange-300 uppercase font-black block">Composite Audit Score</span>
              <span className="text-2xl font-black text-white">{weightedAuditScore} <span className="text-sm font-normal text-slate-300">/ 100</span></span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center font-black text-white shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* 7-Pillar Micro Grid Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mt-4 pt-4 border-t border-white/10 text-center">
          {pillars.map(p => {
            const isAttention = p.status === 'ATTENTION' || p.status === 'CRITICAL';
            return (
              <div
                key={p.id}
                onClick={() => {
                  if (!expandedPillars.includes(p.id)) {
                    setExpandedPillars(prev => [...prev, p.id]);
                  }
                  const el = document.getElementById(p.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }}
                className={`p-2 rounded-xl border transition-all cursor-pointer ${
                  isAttention
                    ? 'bg-rose-500/20 border-rose-400/40 hover:bg-rose-500/30'
                    : 'bg-white/5 border-white/10 hover:bg-white/15'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-300">
                  <span className="font-black">Pillar #{p.pillarNumber}</span>
                  <span className="font-bold">{p.weight}% Wt</span>
                </div>
                <div className={`text-base font-black mt-0.5 ${isAttention ? 'text-amber-300' : 'text-emerald-300'}`}>
                  {p.score} <span className="text-[10px] font-normal text-slate-300">/100</span>
                </div>
                <span className="text-[9px] text-slate-200 block truncate font-medium">
                  {language === 'mr' ? p.titleMr.split(' ')[0] : p.titleEn.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* FILTER & ACTIONS TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-0.5">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'ALL'
                ? 'bg-[#0B214D] text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'mr' ? 'सर्व ७ घटक' : 'All 7 Pillars'} ({pillars.length})
          </button>
          <button
            onClick={() => setFilter('ATTENTION')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              filter === 'ATTENTION'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            {language === 'mr' ? 'सुधारणा आवश्यक' : 'Needs Action'}
          </button>
          <button
            onClick={() => setFilter('HIGH_WEIGHT')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'HIGH_WEIGHT'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {language === 'mr' ? 'उच्च वजन (Weight ≥20%)' : 'High Weight (≥20%)'}
          </button>
          <button
            onClick={() => setFilter('PERFECT')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filter === 'PERFECT'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            {language === 'mr' ? 'परिपूर्ण (९५+ गुण)' : 'Perfect Score (95+)'}
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowDpdLegend(!showDpdLegend)}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold bg-slate-100 text-slate-700 hover:bg-slate-200 flex items-center gap-1"
          >
            <Info className="w-3.5 h-3.5 text-orange-500" />
            <span>{language === 'mr' ? 'डीपीडी मार्गदर्शक' : 'DPD Legend'}</span>
          </button>
          <button
            onClick={expandedPillars.length === pillars.length ? collapseAll : expandAll}
            className="px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-800"
          >
            {expandedPillars.length === pillars.length ? 'Collapse All' : 'Expand All'}
          </button>
        </div>
      </div>

      {/* DPD FORENSIC CODE DECODER (COLLAPSIBLE) */}
      {showDpdLegend && (
        <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 text-xs space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-black text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
              <Scale className="w-4 h-4" />
              Indian Banking Days-Past-Due (DPD) Forensic Code Hierarchy
            </span>
            <button
              onClick={() => setShowDpdLegend(false)}
              className="text-slate-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
            <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-black text-emerald-400">000 / STD</span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 px-1.5 rounded font-bold">Pristine</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Standard Asset. 0 days overdue. On-time payment recorded. Mandatory for prime loan pricing.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-black text-amber-400">030 - 060 (SMA-0/1)</span>
                <span className="text-[10px] bg-amber-950 text-amber-300 px-1.5 rounded font-bold">Caution</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Special Mention Account (1 to 60 days delayed). Generates late fee and causes 15-35 point drop.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-black text-rose-400">090 / SUB</span>
                <span className="text-[10px] bg-rose-950 text-rose-300 px-1.5 rounded font-bold">NPA Level</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Substandard Non-Performing Asset (90+ days overdue). Lenders trigger recovery process.
              </p>
            </div>
            <div className="p-2 rounded-lg bg-slate-800/80 border border-slate-700">
              <div className="flex items-center justify-between">
                <span className="font-black text-purple-400">SET / WRO / DBT</span>
                <span className="text-[10px] bg-purple-950 text-purple-300 px-1.5 rounded font-bold">Hard Barrier</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1">
                Settled or Written-Off. Bank accepted haircut. Requires Section 21 Nodal Officer resolution.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* PILLARS ACCORDION LIST */}
      <div className="space-y-3">
        {filteredPillars.map(pillar => {
          const isExpanded = expandedPillars.includes(pillar.id);
          const isCritical = pillar.status === 'CRITICAL';
          const isAttention = pillar.status === 'ATTENTION';
          const isGood = pillar.status === 'GOOD';
          const isExcellent = pillar.status === 'EXCELLENT';

          const scoreColor = isExcellent
            ? 'text-emerald-700'
            : isGood
            ? 'text-blue-700'
            : isAttention
            ? 'text-amber-700'
            : 'text-rose-700';

          const progressBg = isExcellent
            ? 'bg-emerald-500'
            : isGood
            ? 'bg-blue-500'
            : isAttention
            ? 'bg-amber-500'
            : 'bg-rose-500';

          const borderStyle = isCritical
            ? 'border-rose-300 bg-rose-50/10'
            : isAttention
            ? 'border-amber-300 bg-amber-50/10'
            : 'border-slate-200 bg-white';

          return (
            <div
              id={pillar.id}
              key={pillar.id}
              className={`rounded-2xl border transition-all overflow-hidden ${borderStyle} shadow-2xs`}
            >
              {/* Pillar Header Bar */}
              <button
                onClick={() => togglePillar(pillar.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <div
                    className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 font-black text-xs ${
                      isCritical
                        ? 'bg-rose-100 text-rose-800'
                        : isAttention
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-[#0B214D] text-white'
                    }`}
                  >
                    <span className="text-[9px] uppercase tracking-tighter opacity-80">Pillar</span>
                    <span className="text-sm leading-none">#{pillar.pillarNumber}</span>
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                        {language === 'mr' ? pillar.titleMr : pillar.titleEn}
                      </h3>
                      <span
                        className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                          isCritical
                            ? 'bg-rose-100 text-rose-800'
                            : isAttention
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {language === 'mr' ? pillar.statusMr : pillar.status}
                      </span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {pillar.weight}% Algorithm Weight
                      </span>
                    </div>

                    {/* Key Metric Inline */}
                    <div className="flex items-center gap-2 mt-1 text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">{pillar.keyMetricLabel}:</span>
                      <span className="font-bold text-slate-900 bg-slate-100 px-1.5 py-0.5 rounded text-[11px]">
                        {pillar.keyMetricValue}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 ml-2">
                  <div className="text-right hidden sm:block">
                    <span className={`text-base font-black ${scoreColor}`}>
                      {pillar.score} <span className="text-xs font-normal text-slate-400">/ 100</span>
                    </span>
                    <div className="w-20 bg-slate-100 h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${progressBg}`}
                        style={{ width: `${pillar.score}%` }}
                      />
                    </div>
                  </div>

                  <div className="p-1 rounded-lg text-slate-400">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Pillar Details */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/50 space-y-3.5 text-xs">
                  {/* Benchmark & Summary */}
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between flex-wrap gap-1 border-b border-slate-100 pb-2">
                      <span className="text-[10px] font-black uppercase text-slate-500">
                        Institutional Underwriting Benchmark:
                      </span>
                      <span className="text-[11px] font-bold text-[#0B214D]">
                        {pillar.benchmarkRule}
                      </span>
                    </div>
                    <p className="text-slate-800 font-medium leading-relaxed">
                      {language === 'mr' ? pillar.summaryMr : pillar.summaryEn}
                    </p>
                  </div>

                  {/* Forensic Audit Findings */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider block">
                      Forensic Audit Findings ({pillar.detailedAuditEn.length} Verification Points):
                    </span>
                    <div className="space-y-1">
                      {(language === 'mr' ? pillar.detailedAuditMr : pillar.detailedAuditEn).map(
                        (finding, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-200/80"
                          >
                            <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="text-slate-700 font-medium">{finding}</span>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  {/* Remediation Box */}
                  <div className="bg-amber-50/80 border border-amber-200 p-3 rounded-xl space-y-1">
                    <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5 text-orange-600" />
                      <span>Actionable Remediation Strategy:</span>
                    </div>
                    <p className="text-slate-800 font-semibold leading-relaxed">
                      {language === 'mr' ? pillar.remediationAdviceMr : pillar.remediationAdviceEn}
                    </p>
                  </div>

                  {/* Bottom Strip: Citation & Interactive Action CTA */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-[11px]">
                    <span className="text-slate-500 font-mono text-[10px]">
                      Statutory Reference: {pillar.rbiCitation}
                    </span>

                    <div className="flex items-center gap-2">
                      {pillar.pillarNumber === 2 && (
                        <button
                          onClick={() => {
                            const simEl = document.getElementById('card-paydown-sim');
                            if (simEl) simEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
                          }}
                          className="px-2.5 py-1 rounded-lg bg-orange-500 text-white font-bold hover:bg-orange-600 flex items-center gap-1"
                        >
                          <Sliders className="w-3 h-3" />
                          Simulate Paydown
                        </button>
                      )}

                      {pillar.pillarNumber === 6 && (
                        <button
                          onClick={onNavigateToDispute}
                          className="px-2.5 py-1 rounded-lg bg-purple-700 text-white font-bold hover:bg-purple-800 flex items-center gap-1"
                        >
                          <Scale className="w-3 h-3" />
                          Draft Dispute Notice
                        </button>
                      )}

                      {pillar.pillarNumber === 1 && (
                        <button
                          onClick={onNavigateToAccounts}
                          className="px-2.5 py-1 rounded-lg bg-[#0B214D] text-white font-bold hover:bg-blue-900 flex items-center gap-1"
                        >
                          Inspect 11 Accounts
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* INTERACTIVE CARD UTILIZATION PAYDOWN SIMULATOR */}
      <div id="card-paydown-sim" className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-orange-600">
                Pillar #2 Interactive Simulator
              </span>
              <h3 className="text-sm font-black text-slate-900">
                {language === 'mr' ? 'क्रेडिट कार्ड वापर व परतफेड सिम्युलेटर' : 'Revolving Credit Card Paydown & Score Booster Simulator'}
              </h3>
            </div>
          </div>
          <span className="text-xs font-black px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
            Current Usage: {currentUtilizationPct}%
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {language === 'mr'
            ? 'क्रेडिट कार्डचा वापर ३०% खाली आणल्यास सिबिल स्कोअर त्वरित १८ ते ३५ गुणांनी वाढतो. खालील उद्दिष्ट निवडून आवश्यक भरणा रक्कम आणि स्कोअर वाढ तपासा.'
            : 'Revolving balance paydown has the fastest mathematical payoff on your CIBIL score. Select a target tier to see required payment and projected score jumps:'}
        </p>

        {/* Target Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <button
            onClick={() => setPaydownTarget(30)}
            className={`p-3 rounded-xl border text-left transition-all ${
              paydownTarget === 30
                ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20 shadow-xs'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900">30% Optimal Tier</span>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                +18-24 Pts
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Recommended for standard prime bank approvals.</p>
            <div className="text-xs font-bold text-slate-800 mt-2">
              New Balance: ₹{Math.round((totalCardLimit * 0.3)).toLocaleString('en-IN')}
            </div>
          </button>

          <button
            onClick={() => setPaydownTarget(10)}
            className={`p-3 rounded-xl border text-left transition-all ${
              paydownTarget === 10
                ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20 shadow-xs'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900">10% Super-Prime Tier</span>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                +28-35 Pts
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Unlocks lowest mortgage rate spreads & pre-approved loans.</p>
            <div className="text-xs font-bold text-slate-800 mt-2">
              New Balance: ₹{Math.round((totalCardLimit * 0.1)).toLocaleString('en-IN')}
            </div>
          </button>

          <button
            onClick={() => setPaydownTarget(0)}
            className={`p-3 rounded-xl border text-left transition-all ${
              paydownTarget === 0
                ? 'border-orange-500 bg-orange-50/60 ring-2 ring-orange-500/20 shadow-xs'
                : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900">0% Full Clearance</span>
              <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                +35-40 Pts
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Zero debt service balance across all revolving facilities.</p>
            <div className="text-xs font-bold text-slate-800 mt-2">
              New Balance: ₹0
            </div>
          </button>
        </div>

        {/* Calculation Result Box */}
        <div className="bg-slate-900 text-white p-4 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] text-orange-400 font-black uppercase tracking-wider">
              Required One-Time Paydown Action
            </span>
            <div className="text-xl sm:text-2xl font-black text-white">
              ₹{requiredPaydown.toLocaleString('en-IN')}
            </div>
            <span className="text-xs text-slate-300 font-medium">
              Reduces card usage from <strong className="text-rose-400">{currentUtilizationPct}%</strong> down to <strong className="text-emerald-400">{paydownTarget}%</strong>
            </span>
          </div>

          <div className="flex items-center gap-3 border-t sm:border-t-0 sm:border-l border-slate-800 pt-3 sm:pt-0 sm:pl-4 text-center sm:text-left">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Estimated Boost</span>
              <span className="text-2xl font-black text-emerald-400">+{estimatedScoreGain} Pts</span>
              <span className="text-[10px] text-slate-300 block">Next Statement Cycle</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
