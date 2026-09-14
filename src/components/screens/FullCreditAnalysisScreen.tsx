import React, { useState } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  Download,
  FileText,
  Layers,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Building2,
  Calendar,
  Sparkles,
  Printer,
  Milestone,
  ArrowRight,
  ShieldCheck,
  Scale,
  CreditCard,
  Home,
  Car,
  Briefcase,
  UserCheck,
  MapPin,
  Mail,
  Phone,
  Eye,
  Share2,
  Edit3,
  Sliders,
  Check,
  Clock,
  HelpCircle,
  ExternalLink,
  Info
} from 'lucide-react';
import { Header } from '../common/Header';
import { DigitalKattaLogo } from '../common/DigitalKattaLogo';
import {
  Language,
  ScreenId,
  ExtractedReport,
  DetectedIssue,
  ActionItem,
  UserRole
} from '../../types';
import { sample747ComprehensiveReport } from '../../data/sample747Report';
import {
  generateComprehensiveAnalysis,
  buildComprehensiveReportHtml,
  exportProfessionalReport
} from '../../utils/deepAnalysisEngine';
import { generateDisputeLetter } from '../../utils/cibilEngine';
import { SevenPointAuditSection } from './analysis/SevenPointAuditSection';
import { LoanMatrixSection } from './analysis/LoanMatrixSection';
import { ExportDocumentModal } from '../modals/ExportDocumentModal';

interface FullCreditAnalysisScreenProps {
  onBack: () => void;
  language: Language;
  onToggleLanguage: () => void;
  onNavigate: (screen: ScreenId) => void;
  reportData?: ExtractedReport;
  userRole?: UserRole;
}

export const FullCreditAnalysisScreen: React.FC<FullCreditAnalysisScreenProps> = ({
  onBack,
  language,
  onToggleLanguage,
  onNavigate,
  reportData = sample747ComprehensiveReport,
  userRole = 'consultant'
}) => {
  // Ensure we have the deep analysis model
  const [report, setReport] = useState<ExtractedReport>(() =>
    generateComprehensiveAnalysis(reportData)
  );

  // Active view perspective (Consumer vs Consultant)
  const [viewMode, setViewMode] = useState<'consumer' | 'consultant'>(
    userRole === 'client' ? 'consumer' : 'consultant'
  );

  // Section navigation tabs
  const [activeTab, setActiveTab] = useState<
    'overview' | 'seven_point' | 'identity' | 'accounts' | 'issues' | 'action_plan' | 'loan_matrix' | 'dispute'
  >('overview');

  // Interactive states
  const [accountFilter, setAccountFilter] = useState<'ALL' | 'ACTIVE' | 'CLOSED' | 'SETTLED'>('ALL');
  const [issueFilter, setIssueFilter] = useState<'ALL' | 'CRITICAL_HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>('iss-747-util');
  const [completedActions, setCompletedActions] = useState<string[]>(['act-747-02']);
  const [targetScore, setTargetScore] = useState<number>(800);
  const [consultantNotes, setConsultantNotes] = useState<string>(
    report.consultantNotes ||
      'Client demonstrates high integrity and asset backing. Prioritize Axis Card balance reduction to unlock 775+ score within 90 days.'
  );
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);
  const [letterLang, setLetterLang] = useState<'en' | 'mr'>(language);
  const [copiedDisputeLetter, setCopiedDisputeLetter] = useState<boolean>(false);

  React.useEffect(() => {
    const updated = generateComprehensiveAnalysis(reportData);
    setReport(updated);
    if (updated.consultantNotes) {
      setConsultantNotes(updated.consultantNotes);
    }
  }, [reportData]);

  React.useEffect(() => {
    setViewMode(userRole === 'client' ? 'consumer' : 'consultant');
  }, [userRole]);

  const ident = report.identitySummary;
  const metrics = report.portfolioMetrics;
  const issues = report.detectedIssuesRanked || [];
  const actions = report.actionPlanGrouped || [];
  const loans = report.loanRecommendations || [];
  const exec = report.executiveSummary;
  const proj = report.scoreProjection;
  const auditPillars = report.sevenPointAudit || [];

  // Filter accounts
  const filteredAccounts = report.accounts.filter(acc => {
    if (accountFilter === 'ACTIVE') return acc.status === 'Open';
    if (accountFilter === 'CLOSED') return acc.status === 'Closed';
    if (accountFilter === 'SETTLED') return acc.status === 'Settled';
    return true;
  });

  // Filter issues
  const filteredIssues = issues.filter(iss => {
    if (issueFilter === 'CRITICAL_HIGH') return iss.severity === 'CRITICAL' || iss.severity === 'HIGH';
    if (issueFilter === 'MEDIUM') return iss.severity === 'MEDIUM';
    if (issueFilter === 'LOW') return iss.severity === 'LOW';
    return true;
  });

  const toggleAction = (id: string) => {
    setCompletedActions(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handlePrintOrPdf = () => {
    setShowPdfModal(true);
  };

  const handleDownloadHtml = () => {
    const html = buildComprehensiveReportHtml(report, consultantNotes, language);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CIBIL_Audit_Report_${report.fullName.replace(/\s+/g, '_')}_${language.toUpperCase()}_${report.score}.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `https://digitalkatta.org/report-view?ecn=${report.controlNumber}&score=${report.score}`
    );
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2200);
  };

  // Dispute letter for active issue
  const activeIssueForLetter =
    issues.find(i => i.id === expandedIssueId) || issues[0];
  const disputeLetterText = generateDisputeLetter({
    fullName: report.fullName,
    pan: report.panMasked,
    controlNumber: report.controlNumber,
    bankName: activeIssueForLetter?.bankName || 'Axis Bank Ltd',
    accountNumber: activeIssueForLetter?.accountAffected || '102000004250293',
    accountType: 'Credit Facility',
    issueDescriptionEn: activeIssueForLetter?.descriptionEn || '',
    issueDescriptionMr: activeIssueForLetter?.descriptionMr || '',
    city: 'Islampur, Sangli, Maharashtra',
    phone: report.mobile,
    language: letterLang
  });

  return (
    <div className="flex flex-col w-full h-full bg-slate-50 overflow-y-auto select-none pb-16">
      {/* Top App Header */}
      <Header
        title={language === 'mr' ? 'सखोल सिबिल क्रेडिट विश्लेषण' : 'Full CIBIL Credit Analysis'}
        showBack={true}
        onBack={onBack}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      {/* Main Container */}
      <div className="p-3 sm:p-5 max-w-4xl mx-auto w-full space-y-4">
        
        {/* VIEW PERSPECTIVE TOGGLE & ACTION BUTTONS */}
        <div className="flex flex-wrap items-center justify-between gap-2 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">
              {language === 'mr' ? 'दृष्टिकोन:' : 'View Mode:'}
            </span>
            <div className="inline-flex rounded-xl bg-slate-100 p-0.5 text-xs font-bold">
              <button
                id="btn-view-consumer"
                onClick={() => setViewMode('consumer')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'consumer'
                    ? 'bg-[#FF6500] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                <span>{language === 'mr' ? 'ग्राहक व्ह्यू' : 'Consumer View'}</span>
              </button>
              <button
                id="btn-view-consultant"
                onClick={() => setViewMode('consultant')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'consultant'
                    ? 'bg-[#0B214D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-orange-400" />
                <span>{language === 'mr' ? 'सल्लागार व्ह्यू' : 'Consultant View'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Generate Professional Report Button */}
            <button
              id="btn-open-pdf-modal"
              onClick={() => setShowPdfModal(true)}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'व्यावसायिक अहवाल (PDF)' : 'Generate Professional Report'}</span>
            </button>

            {/* Direct Print */}
            <button
              id="btn-print-report"
              onClick={handlePrintOrPdf}
              title="Print / Save PDF"
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            >
              <Printer className="w-4 h-4" />
            </button>

            {/* Share link */}
            <button
              id="btn-share-report"
              onClick={handleShare}
              title="Share Report"
              className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors relative"
            >
              <Share2 className="w-4 h-4" />
              {copiedShareLink && (
                <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow whitespace-nowrap z-30">
                  {language === 'mr' ? 'दुवा कॉपी केला!' : 'Link Copied!'}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* CONSULTANT BAR (Shown if Consultant View) */}
        {viewMode === 'consultant' && (
          <div className="bg-gradient-to-r from-slate-900 via-[#0B214D] to-slate-900 rounded-2xl p-4 text-white border border-blue-900/50 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-sm">
                  CK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">
                    {language === 'mr' ? 'डिजिटल कट्टा सल्लागार डेस्क' : 'Digital कट्टा Advisory Portal'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Client: <strong className="text-white">{report.fullName}</strong> • Case #CK-{report.controlNumber.slice(-5)}
                  </p>
                </div>
              </div>

              {/* Target Score Adjuster */}
              <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-xl">
                <Sliders className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-[11px] text-slate-300 font-bold">
                  {language === 'mr' ? 'उद्दिष्ट स्कोअर:' : 'Target Score:'}
                </span>
                <input
                  type="range"
                  min="750"
                  max="850"
                  step="5"
                  value={targetScore}
                  onChange={(e) => setTargetScore(Number(e.target.value))}
                  className="w-24 accent-orange-500 cursor-pointer"
                />
                <span className="font-mono font-black text-sm text-emerald-400">{targetScore}</span>
              </div>
            </div>

            {/* Case Notes Editor */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-orange-400" />
                  {language === 'mr' ? 'सल्लागाराच्या अधिकृत नोंदी (Case Notes):' : 'Official Case Advisory Notes:'}
                </span>
                <button
                  onClick={() => setIsEditingNotes(!isEditingNotes)}
                  className="text-[11px] text-orange-300 hover:text-orange-200 font-semibold"
                >
                  {isEditingNotes ? 'Done' : 'Edit'}
                </button>
              </div>

              {isEditingNotes ? (
                <textarea
                  value={consultantNotes}
                  onChange={(e) => setConsultantNotes(e.target.value)}
                  className="w-full bg-slate-800 text-white rounded-xl p-2.5 text-xs border border-slate-700 focus:outline-none focus:border-orange-500"
                  rows={3}
                />
              ) : (
                <p className="text-xs text-slate-300 bg-black/20 p-2.5 rounded-xl italic">
                  "{consultantNotes}"
                </p>
              )}
            </div>
          </div>
        )}

        {/* 1. HERO INSTITUTIONAL HEADER & SCORE DEEP DIVE CARD */}
        <div className="bg-gradient-to-br from-[#0B214D] via-[#122e6b] to-[#081836] rounded-3xl p-5 sm:p-6 text-white shadow-xl relative overflow-hidden border border-blue-900/40">
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Bureau Meta Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3.5">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-xl p-1 shadow-md shrink-0 border border-slate-700/50">
                <DigitalKattaLogo size="xs" variant="image" showTagline={false} className="h-9 w-auto" />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-400/30">
                  TRANSUNION CIBIL CIR 3.0
                </span>
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-1">
                  {report.fullName}
                </h2>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-300 font-mono block">
                CONTROL # {report.controlNumber}
              </span>
              <span className="text-[10px] text-slate-400 block">
                Report Date: {report.reportDate}
              </span>
            </div>
          </div>

          {/* Score Deep Dive Centerpiece */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center my-6">
            {/* Score Circular Gauge Visual */}
            <div className="flex flex-col items-center justify-center p-3 bg-white/5 rounded-2xl border border-white/10">
              <div className="relative flex items-center justify-center w-36 h-36">
                {/* SVG Gauge */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#1e3a8a"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#FF6500"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - (report.score - 300) / 600)}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-3xl sm:text-4xl font-black tracking-tighter text-white">
                    {report.score}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-orange-300 tracking-wider">
                    Score / 900
                  </span>
                </div>
              </div>

              <div className="mt-2 text-center">
                <span className="inline-block px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs border border-emerald-400/30">
                  {language === 'mr' ? report.scoreCategoryMr : report.scoreCategory} Credit Standing
                </span>
              </div>
            </div>

            {/* Score Trajectory & Quintile Ranking */}
            <div className="space-y-3">
              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold">
                    {language === 'mr' ? 'राष्ट्रीय क्रमवारी (Quintile):' : 'National Standing:'}
                  </span>
                  <span className="text-emerald-300 font-black">Top 20% (Upper Quintile)</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Applicant ranks higher than {report.percentile || 83}% of active credit borrowers in India.
                </p>
              </div>

              <div className="bg-white/5 p-3 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-bold">
                    {language === 'mr' ? 'स्कोअर वाटचाल (Trajectory):' : 'Score Trajectory:'}
                  </span>
                  <span className="text-emerald-400 font-black flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Improving (+15-30 pts bias)
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  Zero recent delinquency over 4+ years drives sustained positive upward velocity.
                </p>
              </div>
            </div>

            {/* Portfolio Overview Stats */}
            <div className="space-y-2 bg-black/20 p-3.5 rounded-2xl border border-white/10">
              <div className="text-xs font-bold text-orange-300 uppercase tracking-wider mb-1">
                {language === 'mr' ? 'खाते पोर्टफोलिओ सारांश' : 'Tradeline Portfolio'}
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-white/10">
                <span className="text-slate-300">Total Accounts:</span>
                <span className="font-bold text-white">{metrics?.totalActiveAccounts || 11}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-white/10">
                <span className="text-slate-300">Zero Balance Accounts:</span>
                <span className="font-bold text-emerald-300">{metrics?.zeroBalanceAccounts || 9} (Paid Off)</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-white/10">
                <span className="text-slate-300">Current Balance:</span>
                <span className="font-bold text-white">₹{(metrics?.currentBalance || 1655689).toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-xs py-1 border-b border-white/10">
                <span className="text-slate-300">Total Overdue:</span>
                <span className="font-black text-emerald-400">₹0 (100% On-Time)</span>
              </div>
              <div className="flex justify-between text-xs py-1">
                <span className="text-slate-300">Credit Vintage:</span>
                <span className="font-bold text-amber-300">{metrics?.accountAgeRange || '13.8 Years'}</span>
              </div>
            </div>
          </div>

          {/* Quick Score Factors Pill Strip */}
          <div className="border-t border-white/10 pt-3 flex flex-wrap gap-2 text-xs">
            <span className="text-slate-400 font-bold text-[11px] self-center">Primary Scoring Levers:</span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-[11px] border border-emerald-400/20">
              ✓ 4+ Yrs Flawless Payments
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-bold text-[11px] border border-amber-400/20">
              ⚠ High Card Utilization (71.4%)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold text-[11px] border border-blue-400/20">
              ✓ 13.8 Years Vintage
            </span>
          </div>
        </div>

        {/* SECTION NAV TABS */}
        <div className="flex gap-1.5 p-1.5 bg-slate-200/80 rounded-2xl text-xs font-bold text-slate-600 overflow-x-auto scrollbar-none shadow-inner">
          {[
            { id: 'overview', labelEn: 'Overview & Verdict', labelMr: 'सारांश व निर्णय' },
            { id: 'seven_point', labelEn: '7-Point CIR Audit', labelMr: '७-मुद्दे सिबिल ऑडिट', highlight: true },
            { id: 'identity', labelEn: '1. Identity & KYC', labelMr: '१. ओळख व केवायसी' },
            { id: 'accounts', labelEn: '2. Accounts (11)', labelMr: '२. खाती तपशील' },
            { id: 'issues', labelEn: '3. Issue Detection', labelMr: '३. त्रुटी शोध' },
            { id: 'action_plan', labelEn: '4. Action Plan', labelMr: '४. कृती आराखडा' },
            { id: 'loan_matrix', labelEn: '5. Loan Matrix', labelMr: '५. कर्ज पात्रता', highlight: true },
            { id: 'dispute', labelEn: 'Dispute Notice', labelMr: 'तक्रार नोटीस' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-3.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs font-black'
                  : tab.highlight
                  ? 'text-orange-700 bg-orange-500/10 hover:bg-orange-500/20 font-black'
                  : 'hover:text-slate-900'
              }`}
            >
              {tab.highlight && <Sparkles className="w-3.5 h-3.5 text-orange-600" />}
              <span>{language === 'mr' ? tab.labelMr : tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: OVERVIEW & EXECUTIVE VERDICT */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Executive Summary Card */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                    Credit Underwriting Verdict
                  </span>
                  <h3 className="text-base font-black text-slate-900">
                    {language === 'mr' ? exec?.verdictTitleMr : exec?.verdictTitleEn}
                  </h3>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                {language === 'mr' ? exec?.verdictTextMr : exec?.verdictTextEn}
              </p>

              {/* Badges & Suited Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
                  <span className="text-xs font-bold text-emerald-900 block mb-1">
                    {language === 'mr' ? 'सर्वोत्कृष्ट कर्ज पर्याय:' : 'Best Suited Products:'}
                  </span>
                  <ul className="text-xs text-emerald-800 space-y-1 font-semibold">
                    {(language === 'mr' ? exec?.bestSuitedProductsMr : exec?.bestSuitedProducts)?.map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-amber-50/70 p-3 rounded-xl border border-amber-200">
                  <span className="text-xs font-bold text-amber-900 block mb-1">
                    {language === 'mr' ? 'अनिवार्य अटी:' : 'Mandatory Approval Conditions:'}
                  </span>
                  <ul className="text-xs text-amber-800 space-y-1">
                    {(language === 'mr' ? exec?.mandatoryConditionsMr : exec?.mandatoryConditionsEn)?.slice(0, 3).map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-amber-500 font-bold">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Score Projection Visual */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <h3 className="text-sm font-black text-slate-900 mb-3 flex items-center gap-2">
                <Milestone className="w-4 h-4 text-orange-500" />
                {language === 'mr' ? 'अपेक्षित स्कोअर वाढीचा मार्ग (Roadmap):' : 'Expected Score Improvement Trajectory'}
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Current Score</span>
                  <span className="text-xl font-black text-slate-800 block mt-1">{report.score}</span>
                  <span className="text-[9px] text-slate-400 font-semibold">Today</span>
                </div>
                <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <span className="text-[10px] text-blue-700 uppercase font-bold block">In 3 Months</span>
                  <span className="text-xl font-black text-blue-800 block mt-1">{proj?.score3Months || '760 - 775'}</span>
                  <span className="text-[9px] text-blue-600 font-semibold">Card Paydown</span>
                </div>
                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200">
                  <span className="text-[10px] text-indigo-700 uppercase font-bold block">In 6 Months</span>
                  <span className="text-xl font-black text-indigo-800 block mt-1">{proj?.score6Months || '785 - 800'}</span>
                  <span className="text-[9px] text-indigo-600 font-semibold">Inquiries Age Out</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 uppercase font-bold block">In 12 Months</span>
                  <span className="text-xl font-black text-emerald-700 block mt-1">{proj?.score12Months || '800 - 820'}</span>
                  <span className="text-[9px] text-emerald-600 font-semibold">Super-Prime Tier</span>
                </div>
              </div>
            </div>

            {/* 7-Point CIR Forensic Audit Entry Card */}
            <div
              onClick={() => setActiveTab('seven_point')}
              className="bg-gradient-to-r from-[#0B214D] to-[#1e3a8a] rounded-2xl p-4 sm:p-5 text-white shadow-md cursor-pointer hover:shadow-lg transition-all group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white font-black text-[10px] uppercase tracking-wider">
                    Credit Dost Benchmark
                  </span>
                  <span className="text-xs text-orange-300 font-bold">
                    Composite Audit Score: 84 / 100
                  </span>
                </div>
                <h4 className="text-base font-black flex items-center gap-2">
                  <span>{language === 'mr' ? '७-मुद्दे सिबिल फॉरेन्सिक ऑडिट अहवाल पहा' : 'Explore 7-Point Forensic CIR Audit (Credit Dost Standard)'}</span>
                  <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
                </h4>
                <p className="text-xs text-slate-300 max-w-xl">
                  {language === 'mr'
                    ? 'पुनर्परतफेड इतिहास, मर्यादा वापर, कर्ज मिश्रण, अनुभव, चौकशा आणि केवायसी या ७ घटकांचे सखोल विश्लेषण.'
                    : 'Forensic inspection of 7 institutional pillars: Repayment Purity (98.6%), Utilization (71.4%), Mix (85.4% secured), Vintage (13.8 yrs), and Settlement resolution.'}
                </p>
              </div>

              <button className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-black shrink-0 transition-colors shadow-xs">
                {language === 'mr' ? 'ऑडिट उघडा' : 'Open 7-Point Audit'} ➔
              </button>
            </div>
          </div>
        )}

        {/* TAB: 7-POINT FORENSIC CIR AUDIT */}
        {activeTab === 'seven_point' && (
          <SevenPointAuditSection
            pillars={auditPillars}
            language={language}
            report={report}
            onNavigateToDispute={() => setActiveTab('dispute')}
            onNavigateToAccounts={() => setActiveTab('accounts')}
          />
        )}

        {/* TAB 2: CONSUMER IDENTITY & VERIFICATION SUMMARY */}
        {activeTab === 'identity' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-orange-500" />
                  <h3 className="text-sm font-black text-slate-900">
                    {language === 'mr' ? 'ग्राहक ओळख व पडताळणी तपशील' : 'Consumer Identity & Verification Record'}
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  ✓ {ident?.verificationStrength || 'Strong'} Verification
                </span>
              </div>

              {/* Identity 2-Col Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1">
                    Personal Information
                  </h4>
                  <div className="flex justify-between"><span className="text-slate-500">Full Name:</span><span className="font-bold text-slate-900">{report.fullName}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Date of Birth:</span><span className="font-bold text-slate-900">{ident?.dateOfBirth}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Age / Gender:</span><span className="font-bold text-slate-900">{ident?.age} • {ident?.gender}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Income Status:</span><span className="font-bold text-emerald-700">{ident?.incomeStatus}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Occupation:</span><span className="font-bold text-slate-900">{ident?.occupation}</span></div>
                </div>

                <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-800 border-b border-slate-200 pb-1">
                    Government Identification & Contact
                  </h4>
                  <div className="flex justify-between"><span className="text-slate-500">PAN:</span><span className="font-mono font-bold text-slate-900">{ident?.pan}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Passport ID:</span><span className="font-mono font-bold text-slate-900">{ident?.passportId || 'K1795626'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Social ID:</span><span className="font-mono font-bold text-slate-900">{ident?.socialId || '563782172'}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Mobile Phone:</span><span className="font-bold text-slate-900">{report.mobile}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Email:</span><span className="font-bold text-slate-900">{report.email}</span></div>
                </div>
              </div>

              {/* Registered Addresses */}
              <div className="mt-4 pt-3 border-t border-slate-100">
                <h4 className="text-xs font-bold text-slate-900 mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-orange-500" />
                  {language === 'mr' ? 'नोंदणीकृत पत्त्यांचा इतिहास' : 'Registered Bureau Address History'}
                </h4>
                <div className="space-y-2">
                  {ident?.addresses.map((addr, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-slate-800">
                          {language === 'mr' ? addr.categoryMr : addr.category}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          addr.residenceCode === 'Owned'
                            ? 'bg-emerald-100 text-emerald-800'
                            : addr.residenceCode === 'Academic'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-slate-200 text-slate-800'
                        }`}>
                          {language === 'mr' ? addr.residenceCodeMr : addr.residenceCode}
                        </span>
                      </div>
                      <p className="text-slate-600 font-medium">{addr.fullAddress}</p>
                      <span className="text-[10px] text-slate-400 block mt-1">
                        Reported on: {addr.dateReported}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ACCOUNT-LEVEL DETAILED ANALYSIS */}
        {activeTab === 'accounts' && (
          <div className="space-y-4">
            {/* Account Filter Pills */}
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200">
              <div className="flex gap-1.5">
                {(['ALL', 'ACTIVE', 'CLOSED', 'SETTLED'] as const).map(flt => (
                  <button
                    key={flt}
                    onClick={() => setAccountFilter(flt)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      accountFilter === flt
                        ? 'bg-[#0B214D] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {flt} ({
                      flt === 'ALL'
                        ? report.accounts.length
                        : flt === 'ACTIVE'
                        ? report.accounts.filter(a => a.status === 'Open').length
                        : flt === 'CLOSED'
                        ? report.accounts.filter(a => a.status === 'Closed').length
                        : report.accounts.filter(a => a.status === 'Settled').length
                    })
                  </button>
                ))}
              </div>
              <span className="text-xs text-slate-500 font-bold hidden sm:inline">
                Total High Credit: ₹{(metrics?.totalHighCredit || 2416821).toLocaleString('en-IN')}
              </span>
            </div>

            {/* List of Accounts */}
            <div className="space-y-3">
              {filteredAccounts.map(acc => (
                <div
                  key={acc.id}
                  className={`bg-white rounded-2xl p-4 border transition-all shadow-xs ${
                    acc.status === 'Open'
                      ? 'border-blue-200 hover:border-blue-300'
                      : acc.status === 'Settled'
                      ? 'border-amber-200 hover:border-amber-300 bg-amber-50/10'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 border-b border-slate-100 pb-2.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900">{acc.bankName}</h4>
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                          acc.status === 'Open'
                            ? 'bg-emerald-100 text-emerald-800'
                            : acc.status === 'Settled'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {acc.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {acc.accountType} • A/C: <span className="font-mono">{acc.accountNumberMasked}</span> • Opened: {acc.dateOpened}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-bold">Current Balance</span>
                      <span className={`text-base font-black ${acc.currentBalance > 0 ? 'text-slate-900' : 'text-slate-500'}`}>
                        ₹{acc.currentBalance.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  {/* Financial Details Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 my-2.5 text-xs">
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Sanctioned / Limit</span>
                      <span className="font-bold text-slate-800">₹{acc.sanctionedAmount.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Overdue Amount</span>
                      <span className={`font-bold ${acc.overdueAmount > 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        ₹{acc.overdueAmount}
                      </span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Ownership</span>
                      <span className="font-bold text-slate-800">{acc.ownership}</span>
                    </div>
                    <div className="bg-slate-50 p-2 rounded-lg">
                      <span className="text-[10px] text-slate-400 block">Closure Date</span>
                      <span className="font-bold text-slate-800">{acc.dateClosed || 'Active Facility'}</span>
                    </div>
                  </div>

                  {/* Specific Account Rationale / Issue Tag */}
                  {acc.issueDescription && (
                    <div className="text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 mt-2">
                      <strong className="text-slate-900">Analysis Note: </strong>
                      {acc.issueDescription}
                    </div>
                  )}

                  {/* Payment History DPD Strip */}
                  {acc.dpdHistory && acc.dpdHistory.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 block mb-1">
                        Recent Payment History (DPD - Days Past Due):
                      </span>
                      <div className="flex gap-1.5 overflow-x-auto">
                        {acc.dpdHistory.map((dpd, i) => (
                          <div
                            key={i}
                            className={`px-2 py-1 rounded text-center shrink-0 text-[10px] font-mono font-bold ${
                              dpd.isDelayed
                                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}
                          >
                            <div>{dpd.monthYear}</div>
                            <div>{dpd.dpd}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: ISSUE DETECTION WITH SEVERITY & IMPACT */}
        {activeTab === 'issues' && (
          <div className="space-y-3">
            {/* Filter Pills */}
            <div className="flex items-center justify-between bg-white p-3 rounded-2xl border border-slate-200">
              <div className="flex gap-1">
                {(['ALL', 'CRITICAL_HIGH', 'MEDIUM', 'LOW'] as const).map(sev => (
                  <button
                    key={sev}
                    onClick={() => setIssueFilter(sev)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      issueFilter === sev
                        ? 'bg-[#FF6500] text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {sev === 'CRITICAL_HIGH' ? 'Critical & High' : sev}
                  </button>
                ))}
              </div>
              <span className="text-xs font-black text-orange-600">
                Total Score Impact: -77 Pts
              </span>
            </div>

            {/* List of Detected Issues */}
            <div className="space-y-3">
              {filteredIssues.map(issue => {
                const isExpanded = expandedIssueId === issue.id;
                const isCriticalOrHigh = issue.severity === 'CRITICAL' || issue.severity === 'HIGH';
                const isMedium = issue.severity === 'MEDIUM';

                return (
                  <div
                    key={issue.id}
                    className={`bg-white rounded-2xl border transition-all shadow-xs overflow-hidden ${
                      isCriticalOrHigh
                        ? 'border-rose-200'
                        : isMedium
                        ? 'border-amber-200'
                        : 'border-blue-200'
                    }`}
                  >
                    <button
                      onClick={() => setExpandedIssueId(isExpanded ? null : issue.id)}
                      className="w-full p-4 flex items-start justify-between text-left hover:bg-slate-50/60"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold ${
                            isCriticalOrHigh
                              ? 'bg-rose-100 text-rose-700'
                              : isMedium
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          <ShieldAlert className="w-5 h-5" />
                        </div>

                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-xs sm:text-sm font-black text-slate-900">
                              {language === 'mr' ? issue.titleMr : issue.titleEn}
                            </h4>
                            <span
                              className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                                isCriticalOrHigh
                                  ? 'bg-rose-100 text-rose-800'
                                  : isMedium
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {issue.severity}
                            </span>
                            {issue.category && (
                              <span className="text-[9px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-bold">
                                {issue.category}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                            {language === 'mr' ? issue.descriptionMr : issue.descriptionEn}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-2">
                        <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-1 rounded-lg">
                          -{issue.impactScore} Pts
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-3 text-xs">
                        <div>
                          <span className="text-slate-400 font-bold block text-[10px] uppercase">
                            Detailed Findings:
                          </span>
                          <p className="text-slate-800 mt-0.5 font-medium leading-relaxed">
                            {language === 'mr' ? issue.descriptionMr : issue.descriptionEn}
                          </p>
                        </div>

                        <div className="bg-white p-3 rounded-xl border border-slate-200">
                          <span className="text-orange-600 font-bold block text-[10px] uppercase">
                            Recommended Action:
                          </span>
                          <p className="text-slate-800 mt-0.5 font-semibold">
                            {language === 'mr' ? issue.recommendedActionMr : issue.recommendedActionEn}
                          </p>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-[11px]">
                          <span className="text-slate-500 font-mono">
                            Statutory Reference: {issue.legalCitation}
                          </span>

                          <button
                            onClick={() => setActiveTab('dispute')}
                            className="px-3 py-1 rounded-lg bg-[#0B214D] text-white font-bold text-xs hover:bg-blue-900 transition-colors"
                          >
                            Draft Dispute Notice ➔
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: PRIORITIZED ACTION PLAN & PROGRESS TRACKER */}
        {activeTab === 'action_plan' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-orange-500" />
                  <h3 className="text-sm font-black text-slate-900">
                    {language === 'mr' ? 'प्राधान्यक्रमाने कृती आराखडा' : 'Prioritized 3-Phase Action Plan'}
                  </h3>
                </div>
                <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                  +{actions.reduce((sum, a) => sum + a.scoreGain, 0)} Total Score Gain
                </span>
              </div>

              {/* Action Plan Items Grouped by Phase */}
              <div className="space-y-4">
                {(['Immediate (0-30 Days)', 'Short-Term (1-3 Months)', 'Medium-Term (3-12 Months)'] as const).map(
                  phase => {
                    const phaseActions = actions.filter(a => a.phase === phase);
                    if (phaseActions.length === 0) return null;

                    return (
                      <div key={phase} className="space-y-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                          <h4 className="text-xs font-black text-slate-900 uppercase tracking-wide">
                            {phase}
                          </h4>
                        </div>

                        <div className="space-y-2">
                          {phaseActions.map(action => {
                            const isDone = completedActions.includes(action.id);
                            return (
                              <div
                                key={action.id}
                                onClick={() => toggleAction(action.id)}
                                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                                  isDone
                                    ? 'bg-emerald-50/60 border-emerald-200 opacity-75'
                                    : 'bg-slate-50 border-slate-200 hover:border-orange-300'
                                }`}
                              >
                                <div
                                  className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center shrink-0 border transition-all ${
                                    isDone
                                      ? 'bg-emerald-500 border-emerald-500 text-white'
                                      : 'border-slate-300 bg-white'
                                  }`}
                                >
                                  {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                </div>

                                <div className="flex-1 text-xs">
                                  <div className="flex items-center justify-between gap-2">
                                    <h5 className={`font-black ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                      {language === 'mr' ? action.titleMr : action.titleEn}
                                    </h5>
                                    <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 shrink-0">
                                      +{action.scoreGain} Pts
                                    </span>
                                  </div>
                                  <p className="text-slate-600 mt-1 font-medium">
                                    {language === 'mr' ? action.actionMr : action.actionEn}
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: LOAN ELIGIBILITY & RECOMMENDATION MATRIX (CREDIT DOST STANDARD) */}
        {activeTab === 'loan_matrix' && (
          <LoanMatrixSection
            loans={loans}
            language={language}
            report={report}
            onApplyForLoan={(cat) => {
              alert(
                language === 'mr'
                  ? `${cat} साठी डिजिटल कट्टा फ्रँचायझी डेस्कवर प्राधान्य अर्ज सादर करण्यात आला.`
                  : `Loan application for ${cat} routed to Digital Katta Priority Franchise Desk.`
              );
            }}
            onGenerateDossier={(cat) => {
              exportProfessionalReport(report, consultantNotes);
            }}
          />
        )}

        {/* TAB 7: READY-TO-USE DISPUTE NOTICE DRAFTER */}
        {activeTab === 'dispute' && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <h3 className="text-sm font-black text-slate-900">
                    {language === 'mr' ? 'आरबीआय कलम २१ वैधानिक तक्रार नोटीस' : 'Section 21 Statutory Dispute Drafter'}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setLetterLang(letterLang === 'en' ? 'mr' : 'en')}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 font-bold text-slate-700"
                  >
                    {letterLang === 'en' ? 'मराठीत पहा' : 'View in English'}
                  </button>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(disputeLetterText);
                      setCopiedDisputeLetter(true);
                      setTimeout(() => setCopiedDisputeLetter(false), 2000);
                    }}
                    className="text-xs px-3 py-1 rounded-lg bg-[#FF6500] text-white font-bold hover:bg-orange-600 transition-colors"
                  >
                    {copiedDisputeLetter ? 'Copied!' : 'Copy Notice'}
                  </button>
                </div>
              </div>

              <div className="bg-slate-900 text-slate-200 font-mono text-xs p-4 rounded-xl overflow-x-auto whitespace-pre-wrap max-h-96 border border-slate-800">
                {disputeLetterText}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                <span>Governed under Section 21 of CICRA 2005 (30-day statutory response window)</span>
                <button
                  onClick={handlePrintOrPdf}
                  className="text-orange-600 font-bold hover:underline"
                >
                  Print Official Letterhead ➔
                </button>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* LOCALIZED MULTI-LANGUAGE EXPORT DOCUMENT MODAL */}
      <ExportDocumentModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        report={report}
        currentLanguage={language}
        consultantName="Digital Katta Kendra #04 - Baner, Pune"
        defaultConsultantNotes={consultantNotes}
      />
    </div>
  );
};
