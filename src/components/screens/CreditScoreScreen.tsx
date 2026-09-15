import React, { useState } from 'react';
import {
  RotateCw,
  Info,
  ShieldCheck,
  Gauge,
  Calendar,
  Layers,
  Search,
  ChevronRight,
  Download,
  AlertTriangle,
  X,
  Upload,
  FileUp,
  Sparkles,
  CreditCard,
  RotateCcw
} from 'lucide-react';
import { Header } from '../common/Header';
import { defaultCibilReport } from '../../data/mockData';
import { Language, ScoreFactor, ScreenId, UserRole } from '../../types';
import { ReportQuotaService, QuotaCheckResult } from '../../services/reportQuotaService';
import { PaymentModal } from '../modals/PaymentModal';
import { PartnerQuotaModal } from '../modals/PartnerQuotaModal';

interface CreditScoreScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  onToggleLanguage: () => void;
  userRole?: UserRole;
  onSwitchToAdmin?: () => void;
}

export const CreditScoreScreen: React.FC<CreditScoreScreenProps> = ({
  onBack,
  onNavigate,
  language,
  onToggleLanguage,
  userRole = 'client',
  onSwitchToAdmin
}) => {
  const [report, setReport] = useState(defaultCibilReport);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedFactor, setSelectedFactor] = useState<ScoreFactor | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPartnerQuotaModal, setShowPartnerQuotaModal] = useState(false);
  const [quotaKey, setQuotaKey] = useState(0);

  const quotaVerification: QuotaCheckResult = ReportQuotaService.verifyQuota(
    userRole,
    'cli-101',
    'Rahul Deshmukh'
  );

  const executeScoreRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      ReportQuotaService.recordScoreCheck(userRole, 'cli-101');
      setQuotaKey((prev) => prev + 1);
      alert(
        language === 'mr'
          ? 'ब्युरो डेटा यशस्वीरित्या अद्ययावत करण्यात आला आहे!'
          : 'Credit bureau score refreshed successfully from TransUnion CIBIL!'
      );
    }, 1200);
  };

  const handleRefresh = () => {
    // Check quota under Rule 1, 2, 3
    const verification = ReportQuotaService.verifyQuota(userRole, 'cli-101', 'Rahul Deshmukh');
    if (!verification.allowed) {
      if (verification.requiresPayment) {
        // Rule 1: Second attempt requires ₹800 payment
        setShowPaymentModal(true);
        return;
      }
      if (userRole === 'partner') {
        // Rule 2: Partner 2 reports allowed for one client limit reached
        setShowPartnerQuotaModal(true);
        return;
      }
    }

    executeScoreRefresh();
  };

  const handlePaymentSuccess = () => {
    ReportQuotaService.recordPayment(800);
    setShowPaymentModal(false);
    setQuotaKey((prev) => prev + 1);
    executeScoreRefresh();
  };

  const getFactorIcon = (type: ScoreFactor['iconType']) => {
    switch (type) {
      case 'shield':
        return <ShieldCheck className="w-5 h-5 text-emerald-600" />;
      case 'meter':
        return <Gauge className="w-5 h-5 text-emerald-600" />;
      case 'history':
        return <Calendar className="w-5 h-5 text-emerald-600" />;
      case 'mix':
        return <Layers className="w-5 h-5 text-amber-600" />;
      case 'enquiry':
        return <Search className="w-5 h-5 text-blue-600" />;
    }
  };

  const getFactorBg = (type: ScoreFactor['iconType']) => {
    switch (type) {
      case 'shield':
      case 'meter':
      case 'history':
        return 'bg-emerald-50';
      case 'mix':
        return 'bg-amber-50';
      case 'enquiry':
        return 'bg-blue-50';
    }
  };

  const getStatusColor = (status: ScoreFactor['status']) => {
    switch (status) {
      case 'Excellent':
        return 'text-emerald-600';
      case 'Good':
        return 'text-emerald-500';
      case 'Fair':
        return 'text-amber-500';
      case 'Poor':
        return 'text-rose-500';
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-y-auto select-none pb-6">
      {/* Header matching screenshot 05 */}
      <Header
        title={language === 'mr' ? 'तुमचा क्रेडिट स्कोअर' : 'Your Credit Score'}
        showBack={true}
        onBack={onBack}
        rightAction="share"
        onRightAction={() => {
          if (navigator.share) {
            navigator.share({
              title: 'My CIBIL Score on Digital Katta',
              text: 'Check your verified CIBIL & multi-bureau report on Digital कट्टा!'
            });
          } else {
            alert('Score link copied to clipboard!');
          }
        }}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      <div className="px-5 pt-3 pb-6 flex flex-col items-center">
        {/* Semi-Circular Credit Score Gauge */}
        <div className="relative w-72 h-44 flex flex-col items-center justify-end mt-2">
          <svg viewBox="0 0 200 115" className="w-full h-full">
            {/* Background Arc Segments: Red, Orange, Yellow, Light Green, Deep Green */}
            {/* Segment 1: Red (300 - 549) */}
            <path
              d="M 20 100 A 80 80 0 0 1 45 43"
              fill="none"
              stroke="#EF4444"
              strokeWidth="16"
              strokeLinecap="round"
            />
            {/* Segment 2: Orange (550 - 649) */}
            <path
              d="M 46 41 A 80 80 0 0 1 78 23"
              fill="none"
              stroke="#F97316"
              strokeWidth="16"
            />
            {/* Segment 3: Yellow (650 - 699) */}
            <path
              d="M 80 22 A 80 80 0 0 1 120 22"
              fill="none"
              stroke="#EAB308"
              strokeWidth="16"
            />
            {/* Segment 4: Light Green (700 - 749) */}
            <path
              d="M 122 23 A 80 80 0 0 1 154 41"
              fill="none"
              stroke="#84CC16"
              strokeWidth="16"
            />
            {/* Segment 5: Deep Green (750 - 900) */}
            <path
              d="M 155 43 A 80 80 0 0 1 180 100"
              fill="none"
              stroke="#10B981"
              strokeWidth="16"
              strokeLinecap="round"
            />
          </svg>

          {/* Inner Gauge Text Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
            <span className="text-4xl font-black text-[#0B214D] tracking-tight">
              {report.score}
            </span>
            <span className="mt-1 px-3.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 font-bold text-xs">
              {language === 'mr' ? report.scoreCategoryMr : report.scoreCategory}
            </span>
          </div>

          {/* Gauge Range Labels (300 & 900) */}
          <div className="w-full flex justify-between px-2 text-xs font-bold text-slate-500 mt-1">
            <span>300</span>
            <span>900</span>
          </div>
        </div>

        {/* Percentile Subtitle */}
        <p className="text-xs font-bold text-[#0B214D] text-center mt-2">
          {language === 'mr'
            ? `तुमचा स्कोअर ७८% भारतीयांपेक्षा चांगला आहे`
            : `Your score is higher than ${report.percentile}% of Indians`}
        </p>

        {/* Last Updated + Refresh Link + Quota Indicator */}
        <div className="w-full flex items-center justify-between text-xs mt-3 pt-2 border-t border-slate-100 text-slate-500">
          <div className="flex items-center gap-1.5">
            <span>
              {language === 'mr' ? 'शेवटचे अद्यतन' : 'Last updated'}: {report.reportDate}
            </span>
            {userRole === 'client' && (
              <span
                className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${
                  quotaVerification.requiresPayment
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                {quotaVerification.requiresPayment ? 'Pay ₹800' : '1 Free'}
              </span>
            )}
            {userRole === 'consultant' && (
              <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-blue-100 text-blue-800">
                {quotaVerification.currentCount}/2 Reports
              </span>
            )}
            {userRole === 'admin' && (
              <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                Admin Unlimited
              </span>
            )}
          </div>
          <button
            id="btn-score-refresh"
            onClick={handleRefresh}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 font-bold active:scale-95 transition-all"
          >
            <span>{language === 'mr' ? 'रिफ्रेश' : 'Refresh'}</span>
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {/* "What does this mean?" Explanation Card (matching Screen 5) */}
        <div className="w-full mt-4 bg-[#EDF5FF] border border-blue-100 rounded-2xl p-3.5 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
            <Info className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-extrabold text-[#0B2553]">
              {language === 'mr' ? 'याचा अर्थ काय आहे?' : 'What does this mean?'}
            </p>
            <p className="text-xs text-slate-600 font-medium mt-0.5 leading-relaxed">
              {language === 'mr'
                ? 'तुमचा क्रेडिट स्कोअर चांगला आहे. तुम्हाला बँकांकडून उत्तम व्याजदरात कर्ज मिळण्याची शक्यता जास्त आहे.'
                : 'You have a good credit score. You are likely to get better loan offers.'}
            </p>
          </div>
        </div>

        {/* Multi-Bureau and Detailed Analysis Buttons */}
        <div className="w-full grid grid-cols-2 gap-2 mt-4">
          <button
            id="btn-open-analysis"
            onClick={() => onNavigate('report_analysis')}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-xs hover:opacity-95 transition-opacity"
          >
            <AlertTriangle className="w-4 h-4 text-amber-200" />
            <span>{language === 'mr' ? '३ त्रुटी & तक्रार' : 'Fix 3 Errors (+54 Pts)'}</span>
          </button>

          <button
            id="btn-download-report-flow"
            onClick={() => onNavigate('report_success')}
            className="w-full py-2.5 px-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>{language === 'mr' ? 'अहवाल डाऊनलोड' : 'Download CIR'}</span>
          </button>
        </div>

        {/* Factor Breakdowns List (Screen 5 Rows) */}
        <div className="w-full mt-5 space-y-1 divide-y divide-slate-100">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
            {language === 'mr' ? 'स्कोअर घटक' : 'Score Factors'}
          </h4>

          {report.factors.map((factor) => (
            <button
              key={factor.id}
              onClick={() => setSelectedFactor(factor)}
              className="w-full py-3 flex items-center justify-between hover:bg-slate-50 rounded-xl px-2 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-xl ${getFactorBg(
                    factor.iconType
                  )} flex items-center justify-center shadow-2xs`}
                >
                  {getFactorIcon(factor.iconType)}
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0B214D]">
                    {language === 'mr' ? factor.nameMr : factor.name}
                  </p>
                  <p
                    className={`text-xs font-semibold ${getStatusColor(
                      factor.status
                    )}`}
                  >
                    {language === 'mr' ? factor.statusMr : factor.status}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          ))}
        </div>

        {/* Upload & Deep Analysis CTAs */}
        <div className="w-full mt-4 space-y-2.5">
          <button
            id="btn-credit-upload-cir"
            onClick={() => onNavigate('upload_report')}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8533] text-white font-black text-xs flex items-center justify-between shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-2.5">
              <FileUp className="w-4 h-4" />
              <span>{language === 'mr' ? 'नवीन सिबिल अहवाल अपलोड करा' : 'Upload CIBIL Report (PDF/JSON/HTML)'}</span>
            </div>
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            id="btn-credit-deep-analysis"
            onClick={() => onNavigate('report_analysis')}
            className="w-full py-3 px-4 rounded-2xl bg-slate-900 text-white font-black text-xs flex items-center justify-between shadow-xs hover:bg-slate-800 transition-all"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span>{language === 'mr' ? '७-पॉइंट सखोल विश्लेषण & तक्रार' : '7-Point Inaccuracy Analysis & Disputes'}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Factor Modal Details */}
      {selectedFactor && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-lg ${getFactorBg(
                    selectedFactor.iconType
                  )} flex items-center justify-center`}
                >
                  {getFactorIcon(selectedFactor.iconType)}
                </div>
                <h3 className="text-sm font-bold text-slate-900">
                  {language === 'mr' ? selectedFactor.nameMr : selectedFactor.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedFactor(null)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Status:</span>
                <span className={`font-bold ${getStatusColor(selectedFactor.status)}`}>
                  {selectedFactor.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Weightage Impact:</span>
                <span className="font-bold text-slate-800">{selectedFactor.impact} Impact</span>
              </div>
              <p className="text-xs text-slate-700 pt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                {language === 'mr' ? selectedFactor.descriptionMr : selectedFactor.description}
              </p>
              <p className="text-[11px] text-slate-500 italic pt-1">
                {selectedFactor.details}
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedFactor(null);
                onNavigate('report_analysis');
              }}
              className="w-full py-3 rounded-xl bg-[#FF6500] text-white font-bold text-xs shadow-md shadow-orange-500/20"
            >
              {language === 'mr' ? 'तपशीलवार विश्लेषण पहा' : 'View Action Plan for This Factor'}
            </button>
          </div>
        </div>
      )}

      {/* Payment Modal for Rule 1 (Client second score check requires ₹800) */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={800}
        clientName="Rahul Deshmukh"
        language={language}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Partner Quota Modal for Rule 2 (Max 2 reports per client) */}
      <PartnerQuotaModal
        isOpen={showPartnerQuotaModal}
        onClose={() => setShowPartnerQuotaModal(false)}
        clientName="Rahul Deshmukh"
        reportCount={quotaVerification.currentCount}
        language={language}
        onSwitchToAdmin={onSwitchToAdmin || (() => {})}
      />
    </div>
  );
};
