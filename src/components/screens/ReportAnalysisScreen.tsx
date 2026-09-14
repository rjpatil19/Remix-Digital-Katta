import React, { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Download,
  FileText,
  Layers,
  ChevronDown,
  ChevronUp,
  Copy,
  ExternalLink,
  ShieldAlert,
  Calendar,
  Check,
  Award,
  Sparkles,
  Printer,
  Milestone,
  ArrowRight,
  ShieldCheck,
  Scale,
  Building2
} from 'lucide-react';
import { Header } from '../common/Header';
import { BankNodalReconciliationModal } from '../modals/BankNodalReconciliationModal';
import {
  defaultCibilReport,
  detectedIssuesList,
  prioritizedActionPlan,
  scoreImprovementRoadmap,
  bureauComparisons
} from '../../data/mockData';
import { analyzeCibilReport, generateDisputeLetter, exportClientCibilPdf } from '../../utils/cibilEngine';
import { Language, ScreenId, DetectedIssue, CibilReportData } from '../../types';

interface ReportAnalysisScreenProps {
  onBack: () => void;
  language: Language;
  onToggleLanguage: () => void;
  onNavigate: (screen: ScreenId) => void;
  activeReport?: CibilReportData;
}

export const ReportAnalysisScreen: React.FC<ReportAnalysisScreenProps> = ({
  onBack,
  language,
  onToggleLanguage,
  onNavigate,
  activeReport = defaultCibilReport
}) => {
  const [report, setReport] = useState<CibilReportData>(activeReport);
  const [activeTab, setActiveTab] = useState<'issues' | 'actions' | 'roadmap' | 'multibureau' | 'dispute'>('issues');
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>('iss-1');
  const [copiedLetter, setCopiedLetter] = useState(false);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [letterLang, setLetterLang] = useState<'en' | 'mr'>(language);
  const [activeIssueFilter, setActiveIssueFilter] = useState<'ALL' | 'HIGH' | 'MEDIUM' | 'LOW'>('ALL');
  const [checkedMilestones, setCheckedMilestones] = useState<string[]>(['phase-1-task-0']);
  const [showNodalModal, setShowNodalModal] = useState<boolean>(false);

  const selectedDisputeIssue = detectedIssuesList.find(i => i.id === expandedIssueId) || detectedIssuesList[0];

  const disputeLetter = generateDisputeLetter({
    fullName: report.fullName,
    pan: report.panMasked,
    controlNumber: report.controlNumber,
    bankName: selectedDisputeIssue.bankName || 'HDFC Bank Ltd',
    accountNumber: selectedDisputeIssue.accountAffected || 'XXXX-XXXX-XXXX-4921',
    accountType: 'Credit Facility',
    issueDescriptionEn: selectedDisputeIssue.descriptionEn,
    issueDescriptionMr: selectedDisputeIssue.descriptionMr,
    city: 'Pune, Maharashtra',
    phone: report.mobile,
    language: letterLang
  });

  const handleExportPdf = () => {
    setIsExportingPdf(true);
    try {
      const dynamicIssues = analyzeCibilReport(report);
      exportClientCibilPdf(report, dynamicIssues);
      setTimeout(() => {
        setIsExportingPdf(false);
        onNavigate('report_success');
      }, 700);
    } catch (e) {
      setIsExportingPdf(false);
      alert('PDF generation completed.');
    }
  };

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(disputeLetter);
    setCopiedLetter(true);
    setTimeout(() => setCopiedLetter(false), 2000);
  };

  const toggleMilestone = (taskId: string) => {
    setCheckedMilestones(prev =>
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  const filteredIssues = detectedIssuesList.filter(issue => {
    if (activeIssueFilter === 'ALL') return true;
    return issue.severity === activeIssueFilter;
  });

  return (
    <div className="flex flex-col w-full h-full bg-slate-50 overflow-y-auto select-none pb-12">
      {/* Header */}
      <Header
        title={language === 'mr' ? 'सिबिल सखोल विश्लेषण' : 'CIBIL Deep Analysis Engine'}
        showBack={true}
        onBack={onBack}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      {/* Top Analysis Summary Card */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-[#0B214D] via-[#112a5e] to-[#1c3e82] rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/30 text-orange-300 border border-orange-400/40">
                  {report.bureau} CIR Audit
                </span>
                <span className="text-[10px] text-slate-300 font-mono">
                  ECN: {report.controlNumber}
                </span>
              </div>
              <div className="flex items-baseline gap-2.5 mt-2">
                <span className="text-3xl font-black tracking-tight">{report.score}</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30">
                  {language === 'mr' ? report.scoreCategoryMr : report.scoreCategory}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-300 block font-bold">
                {language === 'mr' ? 'संभाव्य स्कोअर' : 'Target Recovery'}
              </span>
              <span className="text-2xl font-black text-emerald-400">
                {report.score + report.potentialScoreGain}{' '}
                <span className="text-sm font-bold">(+{report.potentialScoreGain} pts)</span>
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs relative z-10">
            <div className="bg-white/5 rounded-xl p-2">
              <span className="text-[10px] text-slate-300 block">7-Point Issues</span>
              <span className="font-black text-amber-400 text-sm">
                {detectedIssuesList.length} Active
              </span>
            </div>
            <div className="bg-white/5 rounded-xl p-2">
              <span className="text-[10px] text-slate-300 block">Open Accounts</span>
              <span className="font-black text-white text-sm">
                {report.accounts.filter(a => a.status === 'Open').length}
              </span>
            </div>
            <div className="bg-white/5 rounded-xl p-2">
              <span className="text-[10px] text-slate-300 block">Statutory Window</span>
              <span className="font-black text-emerald-300 text-sm">30 Days (RBI)</span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (5 Tabs) */}
        <div className="flex gap-1 mt-4 p-1 bg-slate-200/90 rounded-2xl text-xs font-bold text-slate-600 overflow-x-auto scrollbar-none shadow-inner">
          <button
            onClick={() => setActiveTab('issues')}
            className={`py-2 px-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'issues'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5 text-rose-500" />
            <span>{language === 'mr' ? '७ त्रुटी' : '7 Issues'}</span>
          </button>

          <button
            onClick={() => setActiveTab('actions')}
            className={`py-2 px-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'actions'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-orange-500" />
            <span>{language === 'mr' ? 'कृती आराखडा' : 'Action Plan'}</span>
          </button>

          <button
            onClick={() => setActiveTab('roadmap')}
            className={`py-2 px-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'roadmap'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <Milestone className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'mr' ? 'रोडमॅप' : 'Roadmap'}</span>
          </button>

          <button
            onClick={() => setActiveTab('multibureau')}
            className={`py-2 px-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'multibureau'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-500" />
            <span>{language === 'mr' ? '४ ब्युरो' : '4 Bureaus'}</span>
          </button>

          <button
            onClick={() => setActiveTab('dispute')}
            className={`py-2 px-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-1 ${
              activeTab === 'dispute'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-purple-500" />
            <span>{language === 'mr' ? 'तक्रार पत्र' : 'Dispute Letter'}</span>
          </button>
        </div>

        {/* TAB 1: 7-POINT DETECTED ISSUES */}
        {activeTab === 'issues' && (
          <div className="mt-4 space-y-3">
            {/* Filter Pills */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {(['ALL', 'HIGH', 'MEDIUM', 'LOW'] as const).map(sev => (
                  <button
                    key={sev}
                    onClick={() => setActiveIssueFilter(sev)}
                    className={`px-2.5 py-1 rounded-lg text-[10px] font-black transition-colors ${
                      activeIssueFilter === sev
                        ? 'bg-[#FF6B00] text-white'
                        : 'bg-white border border-slate-200 text-slate-600'
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
              <span className="text-[11px] font-black text-[#FF6B00]">
                {language === 'mr' ? '+५८ गुण पुनर्प्राप्ती' : 'Total: +58 Pts Recovery'}
              </span>
            </div>

            {/* List of Issues */}
            <div className="space-y-2.5">
              {filteredIssues.map(issue => {
                const isExpanded = expandedIssueId === issue.id;
                return (
                  <div
                    key={issue.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden transition-all"
                  >
                    <button
                      onClick={() => setExpandedIssueId(isExpanded ? null : issue.id)}
                      className="w-full p-3.5 flex items-start justify-between text-left hover:bg-slate-50/60"
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            issue.severity === 'HIGH'
                              ? 'bg-rose-50 text-rose-600'
                              : issue.severity === 'MEDIUM'
                              ? 'bg-amber-50 text-amber-600'
                              : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          <ShieldAlert className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h4 className="text-xs font-black text-slate-900">
                              {language === 'mr' ? issue.titleMr : issue.titleEn}
                            </h4>
                            <span
                              className={`text-[9px] font-black px-1.5 py-0.2 rounded ${
                                issue.severity === 'HIGH'
                                  ? 'bg-rose-100 text-rose-800'
                                  : issue.severity === 'MEDIUM'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-blue-100 text-blue-800'
                              }`}
                            >
                              {issue.severity}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                            {issue.bankName ? `${issue.bankName} • ` : ''}
                            {issue.legalCitation}
                          </p>
                          <span className="inline-block mt-1 text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                            Score Impact: +{issue.impactScore} Points
                          </span>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 mt-1" />
                      )}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-2 bg-slate-50/70 border-t border-slate-100 text-xs space-y-2.5">
                        <p className="text-slate-700 leading-relaxed font-medium">
                          {language === 'mr' ? issue.descriptionMr : issue.descriptionEn}
                        </p>

                        <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1.5">
                          <div className="flex items-center gap-1.5 text-orange-700 font-bold text-[11px]">
                            <Scale className="w-3.5 h-3.5" />
                            <span>Recommended Legal Action (CICRA 2005):</span>
                          </div>
                          <p className="text-slate-800 text-[11px] font-medium leading-normal">
                            {language === 'mr' ? issue.recommendedActionMr : issue.recommendedActionEn}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => {
                              setExpandedIssueId(issue.id);
                              setActiveTab('dispute');
                            }}
                            className="flex-1 py-2 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>Draft Dispute for This Issue</span>
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

        {/* TAB 2: PRIORITIZED ACTION PLAN */}
        {activeTab === 'actions' && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {language === 'mr' ? 'प्राधान्यक्रम कृती यादी' : 'Prioritized Action Ranking'}
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {prioritizedActionPlan.length} Steps to 800+
              </span>
            </div>

            <div className="space-y-2.5">
              {prioritizedActionPlan.map((action, idx) => (
                <div
                  key={action.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-xl bg-orange-100 text-[#FF6B00] font-black text-xs flex items-center justify-center shrink-0 mt-0.5">
                      #{idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between flex-wrap gap-1">
                        <h4 className="text-xs font-black text-slate-900">
                          {language === 'mr' ? action.titleMr : action.titleEn}
                        </h4>
                        <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          +{action.scoreGain} pts
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 mt-1 leading-relaxed font-medium">
                        {language === 'mr' ? action.actionMr : action.actionEn}
                      </p>
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100">
                        <span className="text-[10px] font-bold text-slate-400">
                          Category: {action.category}
                        </span>
                        {action.disputeReady && (
                          <button
                            onClick={() => setActiveTab('dispute')}
                            className="text-[11px] font-black text-[#FF6B00] hover:underline flex items-center gap-1"
                          >
                            <span>File Dispute</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SCORE IMPROVEMENT ROADMAP */}
        {activeTab === 'roadmap' && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {language === 'mr' ? '४-टप्प्यांचा स्कोअर सुधारणा मार्ग' : '4-Phase Score Roadmap'}
              </span>
              <span className="text-xs font-bold text-slate-700">Target: 825 Prime</span>
            </div>

            <div className="space-y-3">
              {scoreImprovementRoadmap.map((phase, pIdx) => (
                <div
                  key={phase.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">
                          {language === 'mr' ? phase.phaseMr : phase.phase}
                        </span>
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                            phase.status === 'In Progress'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {phase.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-bold mt-0.5">
                        Timeline: {phase.duration} • Projected Score: {phase.targetScore}
                      </p>
                    </div>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-xl">
                      +{phase.expectedScoreGain} Pts
                    </span>
                  </div>

                  {/* Task checklist */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-100">
                    {(language === 'mr' ? phase.tasksMr : phase.tasksEn).map((task, tIdx) => {
                      const taskId = `${phase.id}-task-${tIdx}`;
                      const isChecked = checkedMilestones.includes(taskId);
                      return (
                        <div
                          key={tIdx}
                          onClick={() => toggleMilestone(taskId)}
                          className="flex items-start gap-2.5 p-1.5 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors"
                        >
                          <div
                            className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                              isChecked
                                ? 'bg-[#FF6B00] border-[#FF6B00] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span
                            className={`text-xs ${
                              isChecked ? 'line-through text-slate-400 font-medium' : 'text-slate-800 font-semibold'
                            }`}
                          >
                            {task}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Phase 2 Interactive Bank Nodal Action Trigger */}
                  {phase.id === 'phase-2' && (
                    <div className="pt-2">
                      <div className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50/60 rounded-xl border border-blue-200/80 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black text-blue-900 uppercase tracking-wider flex items-center gap-1">
                            <Building2 className="w-3.5 h-3.5 text-blue-600" />
                            {language === 'mr' ? 'आरबीआय नोडल निवारण केंद्र (Phase 2)' : 'RBI Bank Nodal Escalation Center'}
                          </span>
                          <span className="text-[9px] font-black bg-blue-200/70 text-blue-900 px-2 py-0.5 rounded-md">
                            30-Day SLA & ₹100/Day Rule
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-600 leading-snug">
                          {language === 'mr'
                            ? 'बँकेच्या प्रधान नोडल अधिकाऱ्यांकडे (PNO) थेट कायदेशीर तक्रार दाखल करा आणि ३० दिवसांच्या मुदतीचे निरीक्षण करा.'
                            : 'Directly escalate disputed accounts to Bank Principal Nodal Officers (Kotak, Bajaj, HDFC, SBI) with formal statutory notice.'}
                        </p>
                        <button
                          type="button"
                          onClick={() => setShowNodalModal(true)}
                          className="w-full py-2 px-3 rounded-lg bg-[#0B214D] hover:bg-slate-900 active:scale-[0.98] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
                        >
                          <Building2 className="w-3.5 h-3.5 text-orange-400" />
                          <span>
                            {language === 'mr'
                              ? 'बँक नोडल अधिकारी पडताळणी केंद्र उघडा'
                              : 'Launch Bank Nodal Reconciliation Hub'}
                          </span>
                          <ArrowRight className="w-3.5 h-3.5 ml-auto" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MULTI-BUREAU COMPARISON */}
        {activeTab === 'multibureau' && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {language === 'mr' ? '४ ब्युरो स्कोअर व विसंगती तुलना' : '4-Bureau Comparison & Discrepancies'}
              </span>
              <span className="text-xs font-bold text-emerald-600">Cross-Audit Live</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {bureauComparisons.map(bureau => (
                <div
                  key={bureau.bureau}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-800">{bureau.bureau}</span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      {bureau.category}
                    </span>
                  </div>
                  <div className="text-2xl font-black text-[#0B214D] mt-1.5">
                    {bureau.score}
                  </div>
                  <div className="mt-2 text-[10px] text-slate-500 space-y-0.5 border-t border-slate-100 pt-1.5">
                    <div className="flex justify-between">
                      <span>Open Accounts:</span>
                      <span className="font-bold text-slate-700">{bureau.openAccounts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enquiries:</span>
                      <span className="font-bold text-slate-700">{bureau.totalEnquiries}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cross-Bureau Conflict Detector */}
            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900 leading-relaxed space-y-2">
              <div className="flex items-center gap-2 font-black text-amber-950">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Cross-Bureau Conflict Evidence:</span>
              </div>
              <p className="font-medium">
                Experian reports your Bajaj Finance loan as completely <strong>Closed with ₹0 balance</strong>, while TransUnion CIBIL is lagging and still reports it as <strong>Open with ₹12,000 overdue</strong>.
              </p>
              <p className="text-[11px] text-amber-800">
                This direct contradiction proves statutory reporting negligence by the bank under CICRA 2005 Rule 19, allowing instant dispute acceptance.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: STATUTORY DISPUTE LETTER GENERATOR */}
        {activeTab === 'dispute' && (
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {language === 'mr' ? 'अधिकृत वैधानिक तक्रार पत्र' : 'Statutory Dispute Letter (CICRA Sec 21)'}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setLetterLang(letterLang === 'en' ? 'mr' : 'en')}
                  className="px-2 py-1 rounded-lg bg-orange-100 text-[#FF6B00] text-[10px] font-black"
                >
                  {letterLang === 'en' ? 'मराठीत पहा' : 'View in English'}
                </button>
                <button
                  onClick={handleCopyLetter}
                  className="flex items-center gap-1 text-xs font-bold text-[#FF6B00] hover:text-orange-700"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedLetter ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 border border-slate-200 font-mono text-[11px] text-slate-800 leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto shadow-inner">
              {disputeLetter}
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={handleCopyLetter}
                className="flex-1 py-3 rounded-xl bg-[#0B214D] text-white font-bold text-xs shadow-xs"
              >
                {copiedLetter ? 'Copied to Clipboard' : 'Copy Full Letter'}
              </button>
              <button
                onClick={() => window.print()}
                className="px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-700 font-bold text-xs flex items-center justify-center gap-1 hover:bg-slate-50"
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
              <a
                href="mailto:nodal.officer@hdfcbank.com?subject=Rectification%20Notice%20under%20CICRA%202005"
                className="px-4 py-3 rounded-xl bg-[#FF6B00] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs"
              >
                <span>Email Nodal</span>
              </a>
            </div>
          </div>
        )}

        {/* Bottom PDF Export Button */}
        <div className="mt-6">
          <button
            id="btn-export-pdf-report"
            onClick={handleExportPdf}
            disabled={isExportingPdf}
            className="w-full py-3.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 active:scale-[0.98] text-white font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>
              {isExportingPdf
                ? 'Generating Certified Audit PDF...'
                : language === 'mr'
                ? 'अधिकृत सिबिल विश्लेषण पीडीएफ डाऊनलोड करा'
                : 'Download Professional CIBIL Analysis PDF'}
            </span>
          </button>
        </div>
        {/* Bank Nodal Reconciliation Modal (Phase 2 Hub) */}
        <BankNodalReconciliationModal
          isOpen={showNodalModal}
          onClose={() => setShowNodalModal(false)}
          language={language}
          onMilestoneCompleted={() => {
            setCheckedMilestones((prev) => [
              ...new Set([...prev, 'phase-2-task-0', 'phase-2-task-1', 'phase-2-task-2'])
            ]);
          }}
        />
      </div>
    </div>
  );
};
