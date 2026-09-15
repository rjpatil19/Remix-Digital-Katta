import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Edit3,
  CreditCard,
  Building2,
  Calendar,
  Shield,
  Eye,
  ArrowUpRight,
  TrendingUp,
  Percent,
  Search,
  Check,
  X,
  FileCheck2,
  Save,
  HelpCircle,
  Home,
  MapPin,
  Download,
  Printer
} from 'lucide-react';
import { CibilReportData, CreditAccount, Language, ExtractedReport } from '../../types';
import { generateComprehensiveAnalysis } from '../../utils/deepAnalysisEngine';
import { ExportDocumentModal } from '../modals/ExportDocumentModal';
import {
  calculateUtilizationMetrics,
  calculatePaymentOnTimeMetrics,
  generateDynamicFactors
} from '../../utils/htmlReportParser';

interface ExtractedReportScreenProps {
  report: CibilReportData;
  language: Language;
  onBack: () => void;
  onProceedToAnalysis: () => void;
  onUpdateReport: (updated: CibilReportData) => void;
}

export const ExtractedReportScreen: React.FC<ExtractedReportScreenProps> = ({
  report,
  language,
  onBack,
  onProceedToAnalysis,
  onUpdateReport
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'accounts' | 'enquiries'>('overview');
  const [accountFilter, setAccountFilter] = useState<'ALL' | 'OPEN' | 'CLOSED' | 'DISPUTED'>('ALL');
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [editingAccount, setEditingAccount] = useState<CreditAccount | null>(null);
  const [showExportModal, setShowExportModal] = useState<boolean>(false);

  // Form states for personal info edit
  const [editName, setEditName] = useState(report.fullName);
  const [editDob, setEditDob] = useState(report.dateOfBirth);
  const [editPan, setEditPan] = useState(report.panMasked);
  const [editMobile, setEditMobile] = useState(report.mobile);
  const [editAddress, setEditAddress] = useState(report.address);
  const [editPermanentAddress, setEditPermanentAddress] = useState(report.permanentAddress || report.address);

  // Sync state whenever report changes
  useEffect(() => {
    setEditName(report.fullName);
    setEditDob(report.dateOfBirth);
    setEditPan(report.panMasked);
    setEditMobile(report.mobile);
    setEditAddress(report.address);
    setEditPermanentAddress(report.permanentAddress || report.address);
  }, [report]);

  // Form states for account edit
  const [editAccStatus, setEditAccStatus] = useState<CreditAccount['status']>('Open');
  const [editAccBalance, setEditAccBalance] = useState<number>(0);
  const [editAccHasDispute, setEditAccHasDispute] = useState(false);

  // Dynamic Metrics computed directly from parsed accounts
  const utilMetrics = calculateUtilizationMetrics(report.accounts);
  const payMetrics = calculatePaymentOnTimeMetrics(report.accounts);

  const openAccounts = report.accounts.filter(a => a.status === 'Open');
  const closedAccounts = report.accounts.filter(a => a.status === 'Closed' || a.status === 'Settled');
  const disputedAccounts = report.accounts.filter(a => a.hasDispute);

  const filteredAccounts = report.accounts.filter(acc => {
    if (accountFilter === 'OPEN') return acc.status === 'Open';
    if (accountFilter === 'CLOSED') return acc.status === 'Closed' || acc.status === 'Settled';
    if (accountFilter === 'DISPUTED') return acc.hasDispute;
    return true;
  });

  const handleSavePersonal = () => {
    const updated: CibilReportData = {
      ...report,
      fullName: editName,
      dateOfBirth: editDob,
      panMasked: editPan,
      mobile: editMobile,
      address: editAddress,
      permanentAddress: editPermanentAddress
    };
    onUpdateReport(updated);
    setIsEditingPersonal(false);
  };

  const handleOpenAccountEdit = (acc: CreditAccount) => {
    setEditingAccount(acc);
    setEditAccStatus(acc.status);
    setEditAccBalance(acc.currentBalance);
    setEditAccHasDispute(acc.hasDispute);
  };

  const handleSaveAccountEdit = () => {
    if (!editingAccount) return;
    const updatedAccounts = report.accounts.map(a => {
      if (a.id === editingAccount.id) {
        return {
          ...a,
          status: editAccStatus,
          currentBalance: editAccBalance,
          hasDispute: editAccHasDispute,
          issueType: editAccStatus === 'Closed' ? undefined : a.issueType
        };
      }
      return a;
    });

    // Dynamically regenerate factors when accounts change
    const updatedFactors = generateDynamicFactors(updatedAccounts, report.enquiries);
    const updated: CibilReportData = {
      ...report,
      accounts: updatedAccounts,
      factors: updatedFactors
    };
    onUpdateReport(updated);
    setEditingAccount(null);
  };

  return (
    <div className="flex flex-col min-h-full bg-slate-50 text-slate-800 pb-20">
      {/* Header */}
      <div className="bg-[#FF6B00] text-white px-5 pt-4 pb-5 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBack}
              className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div>
              <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
                {language === 'mr' ? 'अहवाल सारांश (Parsed)' : 'Extracted CIR Summary'}
              </h1>
              <p className="text-[11px] text-orange-100 font-medium">
                {language === 'mr' ? `नियंत्रण क्र. (ECN): ${report.controlNumber}` : `Bureau ECN: ${report.controlNumber}`}
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-white text-[#FF6B00] text-xs font-black shadow-xs">
            {report.bureau}
          </span>
        </div>

        {/* Quick Score Highlight Banner */}
        <div className="bg-white rounded-2xl p-4 text-slate-800 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col items-center justify-center">
              <span className="text-xl font-black text-emerald-700 leading-none">{report.score}</span>
              <span className="text-[9px] font-bold text-emerald-600 uppercase mt-0.5">/ 900</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-slate-900">
                  {language === 'mr' ? report.scoreCategoryMr : report.scoreCategory} Credit Rating
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  Top {report.percentile}%
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-0.5">
                {language === 'mr' ? `${report.reportDate} रोजी पडताळणी` : `Extracted on ${report.reportDate}`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF6B00] border border-orange-200 text-xs font-black transition-colors shadow-xs"
              title="Export report in your language"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'अहवाल निर्यात (PDF)' : 'Export PDF'}</span>
            </button>

            <button
              onClick={() => setIsEditingPersonal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-orange-50 text-slate-700 hover:text-[#FF6B00] text-xs font-bold transition-colors border border-slate-200"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'दुरुस्त करा' : 'Edit'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center border-b border-slate-200 bg-white px-3 sticky top-0 z-10 shadow-2xs">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 text-xs font-bold border-b-2 text-center transition-colors ${
            activeTab === 'overview'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          {language === 'mr' ? 'वैयक्तिक माहिती' : 'Personal & Metrics'}
        </button>
        <button
          onClick={() => setActiveTab('accounts')}
          className={`flex-1 py-3 text-xs font-bold border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'accounts'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <span>{language === 'mr' ? 'खाती' : 'Accounts'}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] text-slate-700">
            {report.accounts.length}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('enquiries')}
          className={`flex-1 py-3 text-xs font-bold border-b-2 text-center transition-colors flex items-center justify-center gap-1.5 ${
            activeTab === 'enquiries'
              ? 'border-[#FF6B00] text-[#FF6B00]'
              : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          <span>{language === 'mr' ? 'चौकशी' : 'Enquiries'}</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px] text-slate-700">
            {report.enquiries.length}
          </span>
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* TAB 1: OVERVIEW & PERSONAL */}
        {activeTab === 'overview' && (
          <div className="space-y-4">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-[11px] font-bold">
                    {language === 'mr' ? 'क्रेडिट वापर (Utilization)' : 'Credit Utilization'}
                  </span>
                  <Percent className="w-3.5 h-3.5 text-orange-500" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`text-lg font-black ${
                      utilMetrics.utilizationPercent <= 30
                        ? 'text-emerald-700'
                        : utilMetrics.utilizationPercent <= 50
                        ? 'text-amber-700'
                        : 'text-rose-700'
                    }`}
                  >
                    {utilMetrics.utilizationPercent}%
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">
                    {language === 'mr' ? '/ ३०% मर्यादा' : '/ 30% Target'}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 truncate">
                  ₹{utilMetrics.totalBalance.toLocaleString('en-IN')} of ₹{utilMetrics.totalLimit.toLocaleString('en-IN')}
                </p>
                <div className="mt-1.5 flex items-center gap-1">
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                      utilMetrics.utilizationPercent <= 30
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : utilMetrics.utilizationPercent <= 50
                        ? 'bg-amber-50 text-amber-700 border border-amber-200'
                        : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}
                  >
                    {language === 'mr' ? utilMetrics.statusMr : utilMetrics.status}
                  </span>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="flex items-center justify-between text-slate-500 mb-1">
                  <span className="text-[11px] font-bold">
                    {language === 'mr' ? 'वेळेवर भरणा (On-Time)' : 'Payment On-Time'}
                  </span>
                  <CheckCircle2
                    className={`w-3.5 h-3.5 ${
                      payMetrics.onTimePercent >= 98
                        ? 'text-emerald-500'
                        : payMetrics.onTimePercent >= 90
                        ? 'text-amber-500'
                        : 'text-rose-500'
                    }`}
                  />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span
                    className={`text-lg font-black ${
                      payMetrics.onTimePercent >= 98
                        ? 'text-emerald-700'
                        : payMetrics.onTimePercent >= 90
                        ? 'text-amber-700'
                        : 'text-rose-700'
                    }`}
                  >
                    {payMetrics.onTimePercent}%
                  </span>
                  <span
                    className={`text-[10px] font-bold ${
                      payMetrics.onTimePercent >= 98 ? 'text-emerald-600' : 'text-amber-600'
                    }`}
                  >
                    {language === 'mr' ? payMetrics.trustBandMr : payMetrics.trustBandEn}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 mt-1 truncate">
                  {language === 'mr' ? payMetrics.summaryMr : payMetrics.summaryEn}
                </p>
                <div className="mt-1.5 flex items-center gap-1">
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${
                      payMetrics.delayedCycles === 0
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {payMetrics.delayedCycles === 0
                      ? language === 'mr' ? '१००% अचूक' : '0 Delays'
                      : language === 'mr' ? `${payMetrics.delayedCycles} उशीर नोंदी` : `${payMetrics.delayedCycles} Late Marks`}
                  </span>
                </div>
              </div>
            </div>

            {/* HTML Extraction & Audit Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-4 border border-slate-800 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <h3 className="text-xs font-black tracking-tight text-slate-100 flex items-center gap-1.5">
                    {language === 'mr' ? 'एचटीएमएल DOM पार्सिंग व ऑडिट' : 'HTML DOM Extraction & Audit'}
                  </h3>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                  {report.confidenceScore || 98.6}% Confidence
                </span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 font-mono text-[10px] space-y-1.5 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Source Format:</span>
                  <span className="text-orange-400 font-bold">{report.fileTypeUploaded || 'HTML'} CIR Document</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Bureau Engine:</span>
                  <span className="text-blue-400 font-bold">{report.bureau} CICRA 2005</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Tradelines Table:</span>
                  <span className="text-emerald-400 font-bold">Dynamic Columns ({report.accounts.length} found)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">DPD Matrix:</span>
                  <span className="text-amber-400 font-bold">Extracted & Checked ({report.accounts.filter(a => a.hasDispute).length} Issues Flagged)</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-tight">
                {language === 'mr'
                  ? 'सर्व खाती, डीपीडी इतिहास व वैयक्तिक तपशील एचटीएमएलमधून अचूक काढले गेले आहेत. आपण खाली प्रत्येक खात्याचे तपशील तपासू व बदलू शकता.'
                  : 'All accounts, DPD sequences, and demographics were mapped via virtual DOM. You can correct any value below before proceeding.'}
              </p>
            </div>

            {/* Personal Details Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-[#FF6B00]" />
                  {language === 'mr' ? 'ग्राहक पडताळणी तपशील' : 'Consumer Demographic Details'}
                </h3>
                <button
                  onClick={() => setIsEditingPersonal(true)}
                  className="text-xs font-bold text-[#FF6B00] hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  {language === 'mr' ? 'दुरुस्त करा' : 'Edit Details'}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    {language === 'mr' ? 'पूर्ण नाव' : 'Full Name'}
                  </p>
                  <p className="font-bold text-slate-800">{report.fullName}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    {language === 'mr' ? 'जन्म तारीख (DOB)' : 'Date of Birth (DOB)'}
                  </p>
                  <p className="font-bold text-slate-800 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#FF6B00]" />
                    <span>{report.dateOfBirth}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    {language === 'mr' ? 'पॅन क्रमांक' : 'PAN (Masked)'}
                  </p>
                  <p className="font-bold font-mono text-slate-800">{report.panMasked}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">
                    {language === 'mr' ? 'मोबाईल क्रमांक' : 'Mobile'}
                  </p>
                  <p className="font-bold text-slate-800">{report.mobile}</p>
                </div>
              </div>

              {/* Current Address */}
              <div className="pt-2.5 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                  <Home className="w-3 h-3 text-blue-500" />
                  <span>{language === 'mr' ? 'सध्याचा / नोंदणीकृत पत्ता (Current Address)' : 'Current / Reported Address'}</span>
                </div>
                <p className="text-slate-700 mt-0.5 leading-relaxed font-medium">
                  {report.address}
                </p>
              </div>

              {/* Permanent Address */}
              <div className="pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                  <MapPin className="w-3 h-3 text-[#FF6B00]" />
                  <span>{language === 'mr' ? 'कायमचा पत्ता (Permanent Address)' : 'Permanent Address'}</span>
                </div>
                <p className="text-slate-700 mt-0.5 leading-relaxed font-medium">
                  {report.permanentAddress || report.address}
                </p>
              </div>
            </div>

            {/* Quick Issues Found Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-black text-amber-900">
                  {language === 'mr'
                    ? `${report.detectedErrorsCount} विसंगती सापडल्या (+${report.potentialScoreGain} गुण वाढू शकतात)`
                    : `${report.detectedErrorsCount} Discrepancies Detected (+${report.potentialScoreGain} Pts Potential)`}
                </p>
                <p className="text-[11px] text-amber-800 mt-0.5">
                  {language === 'mr'
                    ? 'एचडीएफसी कार्डवरील ३०-डीपीडी उशीर नोंद व बजाजचे बंद कर्ज अजूनही ओपन दिसत आहे.'
                    : 'Erroneous 30-DPD mark on HDFC card & closed Bajaj loan still reporting active.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ACCOUNTS LIST */}
        {activeTab === 'accounts' && (
          <div className="space-y-3">
            {/* Filter Chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setAccountFilter('ALL')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                  accountFilter === 'ALL'
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                All ({report.accounts.length})
              </button>
              <button
                onClick={() => setAccountFilter('OPEN')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                  accountFilter === 'OPEN'
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                Open ({openAccounts.length})
              </button>
              <button
                onClick={() => setAccountFilter('CLOSED')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                  accountFilter === 'CLOSED'
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                Closed / Settled ({closedAccounts.length})
              </button>
              <button
                onClick={() => setAccountFilter('DISPUTED')}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-colors whitespace-nowrap ${
                  accountFilter === 'DISPUTED'
                    ? 'bg-[#FF6B00] text-white'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}
              >
                Disputed ({disputedAccounts.length})
              </button>
            </div>

            {/* Accounts cards */}
            <div className="space-y-2.5">
              {filteredAccounts.map(acc => (
                <div
                  key={acc.id}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2.5"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900">{acc.bankName}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                            acc.status === 'Open'
                              ? 'bg-emerald-100 text-emerald-800'
                              : acc.status === 'Settled'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {acc.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {acc.accountType} • {acc.accountNumberMasked}
                      </p>
                    </div>

                    <button
                      onClick={() => handleOpenAccountEdit(acc)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-orange-50 text-slate-600 hover:text-[#FF6B00] transition-colors"
                      title="Edit Account Status"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold">Current Balance</span>
                      <p className="font-black text-slate-800">
                        ₹{acc.currentBalance.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold">Limit / Sanctioned</span>
                      <p className="font-black text-slate-800">
                        ₹{(acc.creditLimit || acc.sanctionedAmount).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  {/* DPD history bar */}
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold block mb-1">
                      Recent Payment DPD:
                    </span>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {acc.dpdHistory.map((dpd, i) => (
                        <span
                          key={i}
                          className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                            dpd.isDelayed || (dpd.dpd !== '000' && dpd.dpd !== 'STD')
                              ? 'bg-red-100 text-red-700 border border-red-300'
                              : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          }`}
                        >
                          {dpd.monthYear}: {dpd.dpd}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Dispute flag notice */}
                  {acc.hasDispute && (
                    <div className="bg-amber-50/80 border border-amber-200/60 rounded-xl p-2 text-[11px] text-amber-900 flex items-center gap-2">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="font-medium">
                        {language === 'mr' ? acc.issueDescriptionMr : acc.issueDescription}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <Search className="w-4 h-4 text-[#FF6B00]" />
                {language === 'mr' ? 'अधिकृत कर्ज चौकशी तपशील' : 'Hard Credit Enquiries (CIR)'}
              </h3>
              <div className="space-y-2">
                {report.enquiries.map(enq => (
                  <div
                    key={enq.id}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                  >
                    <div>
                      <p className="text-xs font-black text-slate-900">{enq.institution}</p>
                      <p className="text-[11px] text-slate-500">
                        {enq.purpose} • {enq.enquiryDate}
                      </p>
                    </div>
                    <span className="text-xs font-black text-slate-800">
                      ₹{enq.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA to proceed to deep CIBIL analysis */}
        <div className="pt-2">
          <button
            id="btn-proceed-analysis"
            onClick={onProceedToAnalysis}
            className="w-full py-3.5 rounded-xl bg-[#FF6B00] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md hover:bg-orange-600 active:scale-[0.98] transition-all"
          >
            <span>{language === 'mr' ? '७-पॉइंट सखोल विश्लेषण सुरू करा' : 'Proceed to Deep CIBIL Analysis'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Edit Personal Info Modal */}
      {isEditingPersonal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-slate-900">
                {language === 'mr' ? 'वैयक्तिक माहिती दुरुस्त करा' : 'Correct Extracted Personal Details'}
              </h3>
              <button
                onClick={() => setIsEditingPersonal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Full Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={e => setEditName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Date of Birth</label>
                  <input
                    type="text"
                    value={editDob}
                    onChange={e => setEditDob(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">PAN Number</label>
                  <input
                    type="text"
                    value={editPan}
                    onChange={e => setEditPan(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'mr' ? 'सध्याचा / नोंदणीकृत पत्ता (Current Address)' : 'Current / Reported Address'}
                </label>
                <textarea
                  rows={2}
                  value={editAddress}
                  onChange={e => setEditAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  {language === 'mr' ? 'कायमचा पत्ता (Permanent Address)' : 'Permanent Address'}
                </label>
                <textarea
                  rows={2}
                  value={editPermanentAddress}
                  onChange={e => setEditPermanentAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-medium text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setIsEditingPersonal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePersonal}
                className="flex-1 py-2.5 rounded-xl bg-[#FF6B00] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Account Modal */}
      {editingAccount && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-sm font-black text-slate-900">{editingAccount.bankName}</h3>
                <p className="text-[11px] text-slate-500">
                  {editingAccount.accountType} • {editingAccount.accountNumberMasked}
                </p>
              </div>
              <button
                onClick={() => setEditingAccount(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Reporting Status</label>
                <select
                  value={editAccStatus}
                  onChange={e => setEditAccStatus(e.target.value as CreditAccount['status'])}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-bold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                >
                  <option value="Open">Open</option>
                  <option value="Closed">Closed in Full</option>
                  <option value="Settled">Settled</option>
                  <option value="Written Off">Written Off</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Current Balance (₹)</label>
                <input
                  type="number"
                  value={editAccBalance}
                  onChange={e => setEditAccBalance(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="chk-dispute"
                  checked={editAccHasDispute}
                  onChange={e => setEditAccHasDispute(e.target.checked)}
                  className="w-4 h-4 accent-[#FF6B00] rounded"
                />
                <label htmlFor="chk-dispute" className="text-xs font-bold text-slate-800">
                  Mark as Disputed Tradeline
                </label>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setEditingAccount(null)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAccountEdit}
                className="flex-1 py-2.5 rounded-xl bg-[#FF6B00] text-white font-black text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Correction</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Localized Document Export Modal */}
      <ExportDocumentModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        report={generateComprehensiveAnalysis(report)}
        currentLanguage={language}
        consultantName="Digital Katta Kendra #04 - Baner, Pune"
      />
    </div>
  );
};
