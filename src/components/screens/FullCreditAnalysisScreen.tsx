import React, { useState, useMemo } from 'react';
import {
  ShieldAlert,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
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
  Briefcase,
  UserCheck,
  MapPin,
  Mail,
  Phone,
  Share2,
  Edit3,
  Sliders,
  Check,
  Clock,
  ExternalLink,
  Info,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { Header } from '../common/Header';
import { CustomerHeaderPill } from '../common/CustomerHeaderPill';
import { DigitalKattaLogo } from '../common/DigitalKattaLogo';
import {
  Language,
  ScreenId,
  ExtractedReport,
  DetectedIssue,
  ActionItem,
  UserRole,
  CibilReportData,
  CirAuditPillar
} from '../../types';
import { defaultCibilReport } from '../../data/mockData';
import {
  generateComprehensiveAnalysis,
  buildComprehensiveReportHtml,
  exportProfessionalReport
} from '../../utils/deepAnalysisEngine';
import { generateDisputeLetter } from '../../utils/cibilEngine';
import { LoanMatrixSection } from './analysis/LoanMatrixSection';
import { ExportDocumentModal } from '../modals/ExportDocumentModal';
import { generateAnalysisPdf } from '../../services/generateAnalysisPdf';

interface FullCreditAnalysisScreenProps {
  onBack: () => void;
  language: Language;
  onToggleLanguage: () => void;
  onNavigate: (screen: ScreenId) => void;
  reportData?: ExtractedReport | CibilReportData;
  userRole?: UserRole;
}

export const FullCreditAnalysisScreen: React.FC<FullCreditAnalysisScreenProps> = ({
  onBack,
  language,
  onToggleLanguage,
  onNavigate,
  reportData,
  userRole = 'partner'
}) => {
  // CRITICAL: Strictly scope analysis to current reportData (or defaultCibilReport as safe fallback)
  // Prevents developer personal report data leaks
  const report: ExtractedReport = useMemo(() => {
    return generateComprehensiveAnalysis(reportData || defaultCibilReport);
  }, [reportData]);

  // Active view perspective (Consumer vs Partner)
  const [viewMode, setViewMode] = useState<'consumer' | 'partner'>(
    userRole === 'client' ? 'consumer' : 'partner'
  );

  // Section navigation tabs
  const [activeTab, setActiveTab] = useState<
    'overview' | 'seven_point' | 'negative_remarks' | 'action_plan' | 'accounts' | 'loan_matrix' | 'dispute'
  >('overview');

  // Interactive states
  const [sevenPointFilter, setSevenPointFilter] = useState<'ALL' | 'ATTENTION' | 'HIGH_WEIGHT'>('ALL');
  const [expandedPillarId, setExpandedPillarId] = useState<string | null>(null);
  const [accountFilter, setAccountFilter] = useState<'ALL' | 'ACTIVE' | 'CLOSED' | 'SETTLED'>('ALL');
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>(null);
  const [completedActions, setCompletedActions] = useState<string[]>([]);
  const [targetScore, setTargetScore] = useState<number>(() => Math.min(850, Math.max(750, (report.score || 700) + 40)));
  const [partnerNotes, setPartnerNotes] = useState<string>(
    report.consultantNotes ||
      `Digital Katta Partner Kendra #04 advisory for ${report.fullName}. Verified bureau record under RBI CICRA regulations.`
  );
  const [isEditingNotes, setIsEditingNotes] = useState<boolean>(false);
  const [showPdfModal, setShowPdfModal] = useState<boolean>(false);
  const [copiedShareLink, setCopiedShareLink] = useState<boolean>(false);
  const [letterLang, setLetterLang] = useState<'en' | 'mr'>(language === 'mr' ? 'mr' : 'en');
  const [copiedDisputeLetter, setCopiedDisputeLetter] = useState<boolean>(false);
  const [isQuickDownloading, setIsQuickDownloading] = useState<boolean>(false);
  const [screenToast, setScreenToast] = useState<string | null>(null);

  // Synchronize partner notes when report changes
  React.useEffect(() => {
    if (report.consultantNotes) {
      setPartnerNotes(report.consultantNotes);
    }
  }, [report]);

  React.useEffect(() => {
    setViewMode(userRole === 'client' ? 'consumer' : 'partner');
  }, [userRole]);

  // Derived datasets strictly from the current report
  const metrics = report.portfolioMetrics;
  const issues = report.detectedIssuesRanked || [];
  const topIssues = issues.slice(0, 5); // strictly top 3-5 real issues
  const actionGroups = report.actionPlanGrouped || [];
  const loans = report.loanRecommendations || [];
  const exec = report.executiveSummary;
  const proj = report.scoreProjection;
  const auditPillars: CirAuditPillar[] = report.sevenPointAudit || [];

  // Filter 7-point audit pillars
  const filteredPillars = auditPillars.filter(pillar => {
    if (sevenPointFilter === 'ATTENTION') return pillar.status === 'ATTENTION' || pillar.status === 'CRITICAL' || pillar.score < 80;
    if (sevenPointFilter === 'HIGH_WEIGHT') return pillar.weight >= 20;
    return true;
  });

  // Filter accounts
  const filteredAccounts = report.accounts.filter(acc => {
    if (accountFilter === 'ACTIVE') return acc.status === 'Open';
    if (accountFilter === 'CLOSED') return acc.status === 'Closed';
    if (accountFilter === 'SETTLED') return acc.status === 'Settled';
    return true;
  });

  const toggleAction = (id: string) => {
    setCompletedActions(prev =>
      prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
    );
  };

  const handleQuickDownloadPdf = async () => {
    setIsQuickDownloading(true);
    try {
      const result = await generateAnalysisPdf(report, {
        language,
        consultantName: 'Digital Katta Kendra #04 - Baner, Pune',
        consultantNotes: partnerNotes
      });
      result.save();
      setScreenToast(
        language === 'mr'
          ? `✓ ${report.fullName} यांचा अधिकृत क्रेडिट अहवाल (PDF) डाउनलोड झाला!`
          : language === 'hi'
          ? `✓ ${report.fullName} की क्रेडिट विश्लेषण रिपोर्ट (PDF) डाउनलोड हो गई!`
          : `✓ Professional Credit Analysis Report for ${report.fullName} downloaded successfully!`
      );
      setTimeout(() => setScreenToast(null), 4500);
    } catch (err) {
      console.error('Quick PDF export error:', err);
      setShowPdfModal(true);
    } finally {
      setIsQuickDownloading(false);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(
      `https://digitalkatta.org/report-view?ecn=${report.controlNumber}&client=${encodeURIComponent(report.fullName)}`
    );
    setCopiedShareLink(true);
    setTimeout(() => setCopiedShareLink(false), 2200);
  };

  // Dynamic Dispute Letter Text
  const activeIssueForLetter = issues.find(i => i.id === expandedIssueId) || issues[0];
  const disputeLetterText = generateDisputeLetter({
    fullName: report.fullName,
    pan: report.panMasked,
    controlNumber: report.controlNumber,
    bankName: activeIssueForLetter?.bankName || 'Concerned Credit Institution',
    accountNumber: activeIssueForLetter?.accountAffected || 'Reported Tradeline',
    accountType: 'Credit Facility',
    issueDescriptionEn: activeIssueForLetter?.descriptionEn || 'Inaccurate bureau reporting under Section 21 CICRA 2005.',
    issueDescriptionMr: activeIssueForLetter?.descriptionMr || 'सीआयसीआरए २००५ अंतर्गत चुकीची माहिती दुरुस्ती बाबत.',
    city: 'Pune, Maharashtra',
    phone: report.mobile,
    language: letterLang
  });

  // Score Calculations
  const score = report.score || 700;
  const scoreProgress = Math.max(0, Math.min(1, (score - 300) / 600));
  const scoreCircumference = 2 * Math.PI * 52; // r = 52
  const scoreOffset = scoreCircumference * (1 - scoreProgress);

  const getScoreColor = (sc: number) => {
    if (sc >= 750) return { text: 'text-emerald-500', bg: 'bg-emerald-500/15', border: 'border-emerald-500/30', stroke: '#10B981', label: 'Excellent' };
    if (sc >= 700) return { text: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', stroke: '#34D399', label: 'Good' };
    if (sc >= 650) return { text: 'text-amber-400', bg: 'bg-amber-500/15', border: 'border-amber-500/30', stroke: '#F59E0B', label: 'Fair' };
    return { text: 'text-rose-500', bg: 'bg-rose-500/15', border: 'border-rose-500/30', stroke: '#EF4444', label: 'Poor' };
  };

  const scoreColor = getScoreColor(score);

  // Trajectory text
  const trajectoryText =
    score >= 740
      ? language === 'mr' ? 'सुधारणा मार्ग (+१५ ते +३० गुण)' : 'Improving (+15 to +30 pts)'
      : score >= 650
      ? language === 'mr' ? 'स्थिर मार्ग (योग्य नियमन आवश्यक)' : 'Stable (Remediation Needed)'
      : language === 'mr' ? 'तातडीच्या दुरुस्तीची गरज' : 'Attention Required (-20 pts bias)';

  // National Standing text
  const nationalStandingText =
    score >= 780
      ? language === 'mr' ? 'अर्जदार भारतातील सर्वोच्च १०% सर्वोत्तम कर्जदारांमध्ये आहे.' : 'Applicant ranks in the Top 10% of active credit borrowers in India.'
      : score >= 740
      ? language === 'mr' ? 'अर्जदार भारतातील सर्वोच्च २०% सक्रिय कर्जदारांमध्ये आहे.' : 'Applicant ranks in the Top 20% of active credit borrowers in India.'
      : score >= 680
      ? language === 'mr' ? 'अर्जदार भारतातील सरासरी कर्जदारांच्या समकक्ष आहे.' : 'Applicant ranks in the mid-tier of active credit borrowers in India.'
      : language === 'mr' ? 'अर्जदाराचा स्कोअर सरासरीपेक्षा कमी असून त्वरित सुधारणा आवश्यक आहे.' : 'Applicant ranks in the lower tier of active borrowers; immediate remediation recommended.';

  const compositeAuditScore = Math.round(
    auditPillars.reduce((sum, p) => sum + (p.score * p.weight) / 100, 0)
  );

  return (
    <div className="flex flex-col w-full h-full bg-slate-50 overflow-y-auto select-none pb-20">
      {/* 1. TOP HEADER WITH ISOLATED CLIENT METADATA */}
      <Header
        title={language === 'mr' ? 'सखोल सिबिल क्रेडिट विश्लेषण' : 'Full CIBIL Credit Analysis'}
        showBack={true}
        onBack={onBack}
        language={language}
        onToggleLanguage={onToggleLanguage}
        subHeader={
          <CustomerHeaderPill
            key={`header-${report.fullName}-${report.controlNumber}`}
            fullName={report.fullName}
            reportDate={report.reportDate}
            score={report.score}
            controlNumber={report.controlNumber}
            language={language}
          />
        }
      />

      <div className="p-3 sm:p-5 max-w-4xl mx-auto w-full space-y-4">
        {/* Toast Notification */}
        {screenToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-2xl border border-[#FF6500] flex items-center gap-2.5 text-xs font-black animate-in fade-in slide-in-from-top-3 duration-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{screenToast}</span>
          </div>
        )}

        {/* 2. PERSPECTIVE TOGGLE & ACTION CONTROL BAR */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 bg-white p-3 sm:p-4 rounded-2xl border border-slate-200/90 shadow-xs">
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
                id="btn-view-partner"
                onClick={() => setViewMode('partner')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
                  viewMode === 'partner'
                    ? 'bg-[#0B214D] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Briefcase className="w-3.5 h-3.5 text-orange-400" />
                <span>{language === 'mr' ? 'पार्टनर व्ह्यू' : 'Partner View'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Direct Professional PDF Export */}
            <button
              id="btn-download-pdf-direct"
              onClick={handleQuickDownloadPdf}
              disabled={isQuickDownloading}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-black shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
            >
              {isQuickDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Download className="w-3.5 h-3.5" />
              )}
              <span>{language === 'mr' ? 'व्यावसायिक अहवाल (PDF)' : 'Generate Professional PDF'}</span>
            </button>

            {/* Options Modal Button */}
            <button
              id="btn-open-pdf-modal"
              onClick={() => setShowPdfModal(true)}
              title="Report Options & Live Preview"
              className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors shadow-2xs"
            >
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">{language === 'mr' ? 'पर्याय' : 'Options'}</span>
            </button>

            {/* Share link */}
            <button
              id="btn-share-report"
              onClick={handleShare}
              title="Share Report Link"
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

        {/* 3. PARTNER BAR (Shown if Partner View) */}
        {viewMode === 'partner' && (
          <div className="bg-gradient-to-r from-slate-900 via-[#0B214D] to-slate-900 rounded-2xl p-4 text-white border border-blue-900/50 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold text-xs border border-orange-500/30">
                  DK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">
                    {language === 'mr' ? 'डिजिटल कट्टा पार्टनर केंद्र डेस्क' : 'Digital कट्टा Partner Advisory Portal'}
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Client: <strong className="text-white">{report.fullName}</strong> • Case #DK-{report.controlNumber?.slice(-5) || '9021'}
                  </p>
                </div>
              </div>

              {/* Target Score Adjuster */}
              <div className="flex items-center gap-2.5 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                <Sliders className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-[11px] text-slate-300 font-bold">
                  {language === 'mr' ? 'उद्दिष्ट स्कोअर:' : 'Target Score:'}
                </span>
                <input
                  type="range"
                  min="720"
                  max="850"
                  step="5"
                  value={targetScore}
                  onChange={(e) => setTargetScore(Number(e.target.value))}
                  className="w-20 sm:w-24 accent-orange-500 cursor-pointer"
                />
                <span className="font-mono font-black text-xs sm:text-sm text-emerald-400">{targetScore}</span>
              </div>
            </div>

            {/* Partner Notes Editor */}
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex items-center justify-between text-xs mb-1">
                <span className="text-slate-300 font-bold flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-orange-400" />
                  {language === 'mr' ? 'पार्टनर अधिकृत नोंदी (Partner Case Notes):' : 'Official Partner Advisory Notes:'}
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
                  value={partnerNotes}
                  onChange={(e) => setPartnerNotes(e.target.value)}
                  className="w-full bg-slate-800 text-white rounded-xl p-2.5 text-xs border border-slate-700 focus:outline-none focus:border-orange-500"
                  rows={2}
                />
              ) : (
                <p className="text-xs text-slate-300 bg-black/20 p-2.5 rounded-xl italic">
                  "{partnerNotes}"
                </p>
              )}
            </div>
          </div>
        )}

        {/* 4. SCORE HERO SECTION (Mobile-First, Large Clean Gauge, Clear Whitespace) */}
        <div className="bg-gradient-to-br from-[#0B214D] via-[#102a5c] to-[#081836] rounded-3xl p-5 sm:p-7 text-white shadow-xl relative overflow-hidden border border-blue-900/40">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-orange-500/15 rounded-full blur-3xl pointer-events-none" />

          {/* Bureau Meta Pill */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="bg-white rounded-xl p-1 shadow-sm shrink-0 border border-slate-700/50">
                <DigitalKattaLogo size="xs" variant="image" showTagline={false} className="h-7 w-auto" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md bg-orange-500/20 text-orange-300 border border-orange-400/30">
                    TRANSUNION CIBIL CIR
                  </span>
                  <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Active Client
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-black tracking-tight text-white mt-0.5">
                  {report.fullName}
                </h2>
              </div>
            </div>

            <div className="text-left sm:text-right text-xs">
              <span className="text-[11px] text-slate-300 font-mono block">
                CONTROL # <span className="font-bold text-white">{report.controlNumber}</span>
              </span>
              <span className="text-[10px] text-slate-400 block">
                Report Date: {report.reportDate} • PAN: {report.panMasked}
              </span>
            </div>
          </div>

          {/* Score Hero Centerpiece: Clean Circular Gauge + Clear Info */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 sm:gap-10 my-6">
            {/* Large Clean Gauge */}
            <div className="flex flex-col items-center justify-center shrink-0">
              <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                  {/* Background Track */}
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    stroke="#1e3a8a"
                    strokeWidth="9"
                    fill="none"
                    opacity={0.4}
                  />
                  {/* Active Progress Arc */}
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    stroke={scoreColor.stroke}
                    strokeWidth="9"
                    strokeDasharray={scoreCircumference}
                    strokeDashoffset={scoreOffset}
                    strokeLinecap="round"
                    fill="none"
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>

                {/* Score Digits Centered */}
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="text-4xl sm:text-5xl font-black tracking-tighter text-white">
                    {score}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-orange-300 tracking-wider mt-0.5">
                    SCORE / 900
                  </span>
                </div>
              </div>

              {/* Category Badge */}
              <div className="mt-3">
                <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-black border ${scoreColor.bg} ${scoreColor.text} ${scoreColor.border}`}>
                  {language === 'mr' ? report.scoreCategoryMr : report.scoreCategory} Standing
                </span>
              </div>
            </div>

            {/* Standing & Trajectory Cards */}
            <div className="w-full max-w-md space-y-3">
              {/* National Standing sentence */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10">
                <span className="text-[10px] uppercase font-black tracking-wider text-orange-300 block mb-1">
                  {language === 'mr' ? 'राष्ट्रीय पत स्थिती (National Standing)' : 'National Standing'}
                </span>
                <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
                  {nationalStandingText}
                </p>
              </div>

              {/* Trajectory */}
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    {language === 'mr' ? 'स्कोअर वाटचाल (Trajectory)' : 'Score Trajectory'}
                  </span>
                  <span className="text-xs sm:text-sm font-black text-emerald-400 flex items-center gap-1.5 mt-0.5">
                    <TrendingUp className="w-4 h-4" />
                    {trajectoryText}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Target Projection</span>
                  <span className="text-xs sm:text-sm font-mono font-bold text-orange-300">
                    {proj?.score3Months || `${score + 25} pts`}
                  </span>
                </div>
              </div>

              {/* Score Range Legend Bar */}
              <div className="bg-black/20 p-2.5 rounded-xl border border-white/5 text-[10px]">
                <div className="flex justify-between text-slate-400 font-bold mb-1">
                  <span>300</span>
                  <span className="text-rose-400">Poor (&lt;650)</span>
                  <span className="text-amber-400">Fair (650-699)</span>
                  <span className="text-emerald-400">Good (700-749)</span>
                  <span className="text-emerald-300">Excellent (750+)</span>
                  <span>900</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 flex overflow-hidden">
                  <div className="w-[35%] bg-rose-500" />
                  <div className="w-[15%] bg-amber-500" />
                  <div className="w-[15%] bg-emerald-500" />
                  <div className="w-[35%] bg-teal-400" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 5. KEY SNAPSHOT CARDS (Clean 2x3 or 3x2 Grid - Very Clean, Whitespace, Strong Hierarchy) */}
        <div>
          <div className="flex items-center justify-between mb-2 px-1">
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-600">
              {language === 'mr' ? 'प्रमुख पोर्टफोलिओ स्नॅपशॉट' : 'Key Portfolio Snapshots'}
            </h3>
            <span className="text-[11px] text-slate-500 font-medium">
              Verified from CIR Tradelines
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
            {/* Card 1: Total Accounts */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">
                {language === 'mr' ? 'एकूण खाती (Accounts)' : 'Total Accounts'}
              </span>
              <div className="text-lg sm:text-xl font-black text-slate-900">
                {metrics?.totalActiveAccounts || report.accounts.length}
              </div>
              <span className="text-[10px] text-slate-500 block">
                {report.accounts.filter(a => a.status === 'Open').length} Active • {report.accounts.filter(a => a.status === 'Closed').length} Closed
              </span>
            </div>

            {/* Card 2: Zero Balance Accounts */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">
                {language === 'mr' ? 'शून्य बाकी खाती' : 'Zero Balance Accounts'}
              </span>
              <div className="text-lg sm:text-xl font-black text-emerald-600">
                {metrics?.zeroBalanceAccounts ?? report.accounts.filter(a => a.currentBalance === 0).length}
              </div>
              <span className="text-[10px] text-emerald-700 font-bold block">
                ✓ 100% Paid Off / Regularized
              </span>
            </div>

            {/* Card 3: Current Outstanding */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">
                {language === 'mr' ? 'चालू बाकी (Outstanding)' : 'Current Outstanding'}
              </span>
              <div className="text-lg sm:text-xl font-black text-slate-900">
                ₹{(metrics?.currentBalance ?? report.accounts.reduce((s, a) => s + a.currentBalance, 0)).toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-slate-500 block">
                {metrics?.securedRatio ? `${metrics.securedRatio}% Secured` : 'Active Balance'}
              </span>
            </div>

            {/* Card 4: Credit Vintage */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">
                {language === 'mr' ? 'क्रेडिट अनुभव (Vintage)' : 'Credit Vintage'}
              </span>
              <div className="text-lg sm:text-xl font-black text-amber-600">
                {metrics?.accountAgeRange || 'Established'}
              </div>
              <span className="text-[10px] text-slate-500 block">
                Oldest: {metrics?.oldestAccountDate || report.accounts[report.accounts.length - 1]?.dateOpened || 'Active'}
              </span>
            </div>

            {/* Card 5: Overdue Status */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">
                {language === 'mr' ? 'थकबाकी स्थिती (Overdue)' : 'Overdue Status'}
              </span>
              <div className={`text-lg sm:text-xl font-black ${(metrics?.totalOverdue ?? 0) === 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                {(metrics?.totalOverdue ?? 0) === 0 ? '₹0' : `₹${(metrics?.totalOverdue ?? 0).toLocaleString('en-IN')}`}
              </div>
              <span className={`text-[10px] font-bold block ${(metrics?.totalOverdue ?? 0) === 0 ? 'text-emerald-700' : 'text-rose-700'}`}>
                {(metrics?.totalOverdue ?? 0) === 0 ? '✓ 100% On-Time Repayment' : `${metrics?.overdueAccountsCount || 1} Accounts Overdue`}
              </span>
            </div>

            {/* Card 6: Score Trajectory */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[10px] sm:text-[11px] font-bold text-slate-500 block">
                {language === 'mr' ? 'स्कोअर दिशा (Trajectory)' : 'Score Trajectory'}
              </span>
              <div className="text-base sm:text-lg font-black text-emerald-600 flex items-center gap-1">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>{score >= 700 ? 'Improving' : 'Action Needed'}</span>
              </div>
              <span className="text-[10px] text-slate-500 block">
                {score >= 700 ? '+15 to +30 pts potential' : 'Remediation plan ready'}
              </span>
            </div>
          </div>
        </div>

        {/* 6. SECTION NAV TABS */}
        <div className="flex gap-1.5 p-1 bg-slate-200/90 rounded-2xl text-xs font-bold text-slate-700 overflow-x-auto scrollbar-none shadow-inner">
          {[
            { id: 'overview', labelEn: 'Overview', labelMr: 'सारांश' },
            { id: 'seven_point', labelEn: '7-Point CIR Audit', labelMr: '७-मुद्दे सिबिल ऑडिट', highlight: true },
            { id: 'negative_remarks', labelEn: 'Key Remarks', labelMr: 'महत्त्वाच्या त्रुटी' },
            { id: 'action_plan', labelEn: 'Action Plan', labelMr: 'कृती आराखडा' },
            { id: 'accounts', labelEn: `Accounts (${report.accounts.length})`, labelMr: `खाती (${report.accounts.length})` },
            { id: 'loan_matrix', labelEn: 'Loan Eligibility', labelMr: 'कर्ज पात्रता' },
            { id: 'dispute', labelEn: 'Dispute Notice', labelMr: 'तक्रार नोटीस' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-3 sm:px-3.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 ${
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

        {/* TAB CONTENT: 7-POINT CIR FORENSIC AUDIT (The Most Important Section) */}
        {(activeTab === 'seven_point' || activeTab === 'overview') && (
          <div className="space-y-3">
            {/* 7-Point Audit Header */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 text-orange-600 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                      <span>{language === 'mr' ? '७-मुद्दे सिबिल फॉरेन्सिक ऑडिट' : '7-Point CIR Forensic Audit'}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-bold border border-orange-200">
                        Credit Dost Standard
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {language === 'mr'
                        ? 'आरबीआय निकष व क्रेडिट ब्युरो मार्गदर्शक तत्त्वांवर आधारित फॉरेन्सिक तपासणी'
                        : 'Institutional credit underwriting audit based on RBI CICRA guidelines'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500">
                    Audit Score:
                  </span>
                  <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-[#0B214D] text-white">
                    {compositeAuditScore} / 100
                  </span>
                </div>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center justify-between gap-2 pt-3">
                <div className="flex gap-1.5">
                  {(['ALL', 'ATTENTION', 'HIGH_WEIGHT'] as const).map(flt => (
                    <button
                      key={flt}
                      onClick={() => setSevenPointFilter(flt)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        sevenPointFilter === flt
                          ? 'bg-[#FF6500] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {flt === 'ALL'
                        ? language === 'mr' ? 'सर्व ७ मुद्दे' : 'All 7 Points'
                        : flt === 'ATTENTION'
                        ? language === 'mr' ? 'सुधारणा आवश्यक' : 'Needs Attention'
                        : language === 'mr' ? 'उच्च महत्त्व' : 'High Weight'}
                    </button>
                  ))}
                </div>
                <span className="text-[11px] font-bold text-slate-400 hidden sm:inline">
                  Click on any point to view rules
                </span>
              </div>
            </div>

            {/* 7 Scannable Point Cards */}
            <div className="space-y-2.5">
              {filteredPillars.map((pillar, idx) => {
                const isExpanded = expandedPillarId === pillar.id;
                const isAttention = pillar.status === 'ATTENTION' || pillar.status === 'CRITICAL';
                const isPerfect = pillar.score >= 90;

                return (
                  <div
                    key={pillar.id || idx}
                    className={`bg-white rounded-2xl border transition-all shadow-xs overflow-hidden ${
                      isAttention
                        ? 'border-amber-300 bg-amber-50/20'
                        : isPerfect
                        ? 'border-emerald-200'
                        : 'border-slate-200'
                    }`}
                  >
                    <div
                      onClick={() => setExpandedPillarId(isExpanded ? null : pillar.id)}
                      className="p-3.5 sm:p-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-3">
                          <div
                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                              isAttention
                                ? 'bg-amber-100 text-amber-800'
                                : isPerfect
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {pillar.pillarNumber || idx + 1}
                          </div>

                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h4 className="text-xs sm:text-sm font-black text-slate-900">
                                {language === 'mr' ? pillar.titleMr : pillar.title}
                              </h4>
                              <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                                {pillar.weight}% Weight
                              </span>
                              <span
                                className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${
                                  pillar.status === 'CRITICAL'
                                    ? 'bg-rose-100 text-rose-800'
                                    : pillar.status === 'ATTENTION'
                                    ? 'bg-amber-100 text-amber-800'
                                    : 'bg-emerald-100 text-emerald-800'
                                }`}
                              >
                                {pillar.status}
                              </span>
                            </div>

                            {/* Short insight: 1-2 lines max */}
                            <p className="text-xs text-slate-600 mt-1 leading-relaxed line-clamp-2">
                              {language === 'mr'
                                ? pillar.keyFindingMr || pillar.summaryMr
                                : pillar.keyFinding || pillar.summary}
                            </p>
                          </div>
                        </div>

                        {/* Benchmark Score & Chevron */}
                        <div className="flex items-center gap-2 shrink-0">
                          <div className="text-right">
                            <span className="font-mono font-black text-xs sm:text-sm text-slate-800 block">
                              {pillar.score}/100
                            </span>
                          </div>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </div>

                      {/* Mini Progress Bar */}
                      <div className="w-full h-1.5 rounded-full bg-slate-100 mt-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isAttention ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${pillar.score}%` }}
                        />
                      </div>
                    </div>

                    {/* Expandable Disclosure Drawer */}
                    {isExpanded && (
                      <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-100 text-xs space-y-2">
                        {pillar.details && (
                          <div className="bg-white p-3 rounded-xl border border-slate-200">
                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                              Institutional Standard & Audit Finding:
                            </span>
                            <p className="text-slate-700 leading-relaxed">
                              {language === 'mr' ? pillar.summaryMr : pillar.summary}
                            </p>
                          </div>
                        )}

                        {pillar.recommendation && (
                          <div className="bg-orange-50/60 p-3 rounded-xl border border-orange-200/80">
                            <span className="text-[10px] font-bold text-orange-900 uppercase block mb-0.5">
                              Recommended Partner Action:
                            </span>
                            <p className="text-orange-950 font-medium leading-relaxed">
                              {language === 'mr' ? pillar.recommendationMr : pillar.recommendation}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB CONTENT: KEY NEGATIVE REMARKS (Top 3-5 Real Issues Strictly Scoped to Current Report) */}
        {(activeTab === 'negative_remarks' || activeTab === 'overview') && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-5 bg-[#FF6500] rounded-sm" />
                <h3 className="text-sm font-black text-slate-900">
                  {language === 'mr'
                    ? 'महत्त्वाच्या नकारात्मक नोंदी व त्रुटी (Key Negative Remarks)'
                    : 'Key Negative Remarks & Risk Factors'}
                </h3>
              </div>
              <span className="text-[11px] font-black text-slate-500">
                {topIssues.length} Identified
              </span>
            </div>

            {topIssues.length === 0 ? (
              <div className="p-6 text-center rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-1">
                <CheckCircle className="w-8 h-8 mx-auto text-emerald-600 mb-1" />
                <h4 className="text-sm font-black">
                  {language === 'mr' ? 'कोणत्याही गंभीर नकारात्मक नोंदी आढळल्या नाहीत' : 'No Critical Negative Remarks Found'}
                </h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  {language === 'mr'
                    ? 'सर्व खाती, परतफेड नोंदी आणि चौकशा क्रेडिट ब्युरोच्या नियमांनुसार समाधानकारक आहेत.'
                    : 'All accounts, repayment tracks, and inquiries comply with prime bureau underwriting rules.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {topIssues.map(issue => {
                  const isCritical = issue.severity === 'CRITICAL' || issue.severity === 'HIGH';
                  return (
                    <div
                      key={issue.id}
                      className={`p-3.5 rounded-2xl border space-y-2 transition-all ${
                        isCritical
                          ? 'border-rose-200 bg-rose-50/40'
                          : 'border-amber-200 bg-amber-50/40'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`px-2 py-0.5 rounded-md font-black text-[9px] uppercase ${
                            isCritical
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          {issue.severity}
                        </span>
                        <span className="text-xs font-black text-rose-600 bg-white px-2 py-0.5 rounded-md border border-rose-200">
                          -{issue.impactScore || 15} Pts
                        </span>
                      </div>

                      <h4 className="text-xs font-black text-slate-900 leading-snug">
                        {language === 'mr' ? issue.titleMr : issue.titleEn}
                      </h4>

                      <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                        {language === 'mr' ? issue.descriptionMr : issue.descriptionEn}
                      </p>

                      <div className="pt-1 text-[10px] text-slate-700 font-bold border-t border-black/5 flex items-center gap-1">
                        <span className="text-[#FF6500]">Target:</span>
                        <span>{language === 'mr' ? issue.recommendedActionMr : issue.recommendedActionEn}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: 30-60 DAYS ACTION PLAN */}
        {(activeTab === 'action_plan' || activeTab === 'overview') && (
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#FF6500]" />
                <div>
                  <h3 className="text-sm font-black text-slate-900">
                    {language === 'mr' ? '३०-६० दिवसांचा व्यावहारिक कृती आराखडा' : '30–60 Days Prioritized Action Plan'}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {language === 'mr'
                      ? 'सिबिल स्कोअर वेगाने वाढवण्यासाठी टप्प्याटप्प्याने कृती करा.'
                      : 'Structured timeline to elevate credit score for prime loan approval.'}
                  </p>
                </div>
              </div>

              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                +45 to +60 Pts Gain
              </span>
            </div>

            {/* 3 Grouped Timeline Cards (Next 15 days / 15-30 days / 30-60 days) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {/* Timeline 1: Next 15 Days */}
              <div className="p-3.5 rounded-2xl border-2 border-orange-200 bg-orange-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-orange-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                    {language === 'mr' ? 'पुढील १५ दिवस' : 'Next 15 Days'}
                  </span>
                  <span className="text-[10px] font-black text-orange-700 bg-white px-2 py-0.5 rounded-md border border-orange-200">
                    Immediate
                  </span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-orange-600 font-black">•</span>
                    <span>
                      {metrics?.creditCardUtilization && metrics.creditCardUtilization > 30
                        ? `Pay down revolving credit balance to bring utilization below 30%.`
                        : `Clear pending billing cycles before reporting date to maintain 100% on-time status.`}
                    </span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-orange-600 font-black">•</span>
                    <span>Fund NACH auto-debit bank account to ensure zero EMI bounces.</span>
                  </li>
                </ul>
              </div>

              {/* Timeline 2: 15-30 Days */}
              <div className="p-3.5 rounded-2xl border-2 border-sky-200 bg-sky-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-sky-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-sky-600" />
                    {language === 'mr' ? '१५–३० दिवस' : '15–30 Days'}
                  </span>
                  <span className="text-[10px] font-black text-sky-700 bg-white px-2 py-0.5 rounded-md border border-sky-200">
                    Short-Term
                  </span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-sky-600 font-black">•</span>
                    <span>Obtain No Dues Certificates (NDC) from lenders for all settled/closed accounts.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-sky-600 font-black">•</span>
                    <span>Strict freeze on unneeded new credit card and loan inquiries.</span>
                  </li>
                </ul>
              </div>

              {/* Timeline 3: 30-60 Days */}
              <div className="p-3.5 rounded-2xl border-2 border-emerald-200 bg-emerald-50/40 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    {language === 'mr' ? '३०–६० दिवस' : '30–60 Days'}
                  </span>
                  <span className="text-[10px] font-black text-emerald-700 bg-white px-2 py-0.5 rounded-md border border-emerald-200">
                    Strategy
                  </span>
                </div>
                <ul className="text-xs text-slate-700 space-y-1.5">
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-black">•</span>
                    <span>Re-verify CIBIL CIR data reflection to confirm updated tradeline closures.</span>
                  </li>
                  <li className="flex items-start gap-1.5">
                    <span className="text-emerald-600 font-black">•</span>
                    <span>Leverage upgraded score to negotiate 50–75 bps rate cut on secured facilities.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Interactive Checklist Tracker */}
            <div className="pt-2 border-t border-slate-100">
              <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider mb-2.5">
                {language === 'mr' ? 'कृती प्रगती ट्रॅकर (पूर्ण झालेल्या कृतीवर क्लिक करा)' : 'Action Checklist (Click to mark done)'}
              </h4>
              <div className="space-y-2">
                {(report.actionPlanGrouped || []).slice(0, 4).map(action => {
                  const isDone = completedActions.includes(action.id);
                  return (
                    <div
                      key={action.id}
                      onClick={() => toggleAction(action.id)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
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
                        <p className="text-slate-600 mt-0.5 font-medium">
                          {language === 'mr' ? action.actionMr : action.actionEn}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: ACCOUNTS PORTFOLIO */}
        {activeTab === 'accounts' && (
          <div className="space-y-3">
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
                Total Balance: ₹{(metrics?.currentBalance ?? report.accounts.reduce((s, a) => s + a.currentBalance, 0)).toLocaleString('en-IN')}
              </span>
            </div>

            {/* List of Accounts */}
            <div className="space-y-2.5">
              {filteredAccounts.map(acc => (
                <div
                  key={acc.id}
                  className={`bg-white rounded-2xl p-4 border transition-all shadow-xs ${
                    acc.status === 'Open'
                      ? 'border-blue-200 hover:border-blue-300'
                      : acc.status === 'Settled'
                      ? 'border-amber-200 bg-amber-50/10'
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

                  {/* DPD Payment History */}
                  {acc.dpdHistory && acc.dpdHistory.length > 0 && (
                    <div className="pt-2 border-t border-slate-100">
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

        {/* TAB CONTENT: LOAN ELIGIBILITY MATRIX */}
        {activeTab === 'loan_matrix' && (
          <LoanMatrixSection
            loans={loans}
            language={language}
            report={report}
            onApplyForLoan={(cat) => {
              alert(
                language === 'mr'
                  ? `${cat} साठी डिजिटल कट्टा पार्टनर डेस्कवर प्राधान्य अर्ज सादर करण्यात आला.`
                  : `Loan application for ${cat} routed to Digital Katta Partner Priority Desk.`
              );
            }}
            onGenerateDossier={() => {
              exportProfessionalReport(report, partnerNotes);
            }}
          />
        )}

        {/* TAB CONTENT: STATUTORY DISPUTE NOTICE DRAFTER */}
        {activeTab === 'dispute' && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
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

            <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
              <span>Governed under Section 21 of CICRA 2005 (30-day statutory resolution window)</span>
              <button
                onClick={() => setShowPdfModal(true)}
                className="text-orange-600 font-bold hover:underline"
              >
                Print Letterhead ➔
              </button>
            </div>
          </div>
        )}

        {/* 7. BOTTOM STICKY/FINAL ACTION BAR */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              {language === 'mr'
                ? `अहवाल पडताळणी पूर्ण: ${report.fullName} (${report.controlNumber})`
                : `Audited Report Scoped for: ${report.fullName} (${report.controlNumber})`}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleQuickDownloadPdf}
              disabled={isQuickDownloading}
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-[#FF6500] hover:bg-orange-600 text-white font-black text-xs shadow-sm flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {isQuickDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
              <span>{language === 'mr' ? 'अधिकृत अहवाल डाउनलोड (PDF)' : 'Download Professional PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* LOCALIZED MULTI-LANGUAGE EXPORT DOCUMENT MODAL */}
      <ExportDocumentModal
        isOpen={showPdfModal}
        onClose={() => setShowPdfModal(false)}
        report={report}
        currentLanguage={language}
        partnerName="Digital Katta Kendra #04 - Baner, Pune"
        defaultPartnerNotes={partnerNotes}
      />
    </div>
  );
};
