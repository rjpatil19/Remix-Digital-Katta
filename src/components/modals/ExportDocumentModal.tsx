import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  Share2,
  Copy,
  Check,
  FileText,
  ShieldCheck,
  Scale,
  Sparkles,
  Building,
  CheckCircle2
} from 'lucide-react';
import { ExtractedReport, Language } from '../../types';
import { SUPPORTED_LANGUAGES, getLanguageDetails, t, getScoreCategoryText } from '../../i18n';
import {
  generateLocalizedDocumentHtml,
  exportDocumentAsPdf,
  downloadDocumentAsHtml,
  shareReportOnWhatsApp,
  ExportDocumentType
} from '../../utils/documentExportEngine';
import { getLocalizedDisputeLetter } from '../../i18n';

interface ExportDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ExtractedReport;
  currentLanguage: Language;
  consultantName?: string;
  defaultConsultantNotes?: string;
}

export const ExportDocumentModal: React.FC<ExportDocumentModalProps> = ({
  isOpen,
  onClose,
  report,
  currentLanguage,
  consultantName = 'Digital Katta Kendra #04 - Baner, Pune',
  defaultConsultantNotes = ''
}) => {
  const [selectedLang, setSelectedLang] = useState<Language>(currentLanguage);
  const [docType, setDocType] = useState<ExportDocumentType>('FULL_AUDIT_REPORT');
  const [consultantNotes, setConsultantNotes] = useState<string>(
    defaultConsultantNotes || report.consultantNotes || ''
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [disputeBank, setDisputeBank] = useState<string>(
    report.accounts[0]?.bankName || 'State Bank of India'
  );

  if (!isOpen) return null;

  const currentLangDetails = getLanguageDetails(selectedLang);

  const handlePrintPdf = () => {
    exportDocumentAsPdf(report, {
      language: selectedLang,
      documentType: docType,
      consultantName,
      consultantNotes,
      disputeBank
    });
  };

  const handleDownloadHtml = () => {
    downloadDocumentAsHtml(report, {
      language: selectedLang,
      documentType: docType,
      consultantName,
      consultantNotes,
      disputeBank
    });
  };

  const handleWhatsAppShare = () => {
    shareReportOnWhatsApp(report, selectedLang);
  };

  const handleCopyText = async () => {
    let textToCopy = '';
    if (docType === 'LEGAL_DISPUTE_NOTICE') {
      textToCopy = getLocalizedDisputeLetter(
        report.fullName,
        report.panMasked,
        disputeBank,
        report.accounts[0]?.accountNumberMasked || 'XXXX9021',
        report.detectedIssuesRanked[0]?.titleMr || 'CIBIL Discrepancy',
        selectedLang
      );
    } else {
      textToCopy = `Digital Katta - CIBIL Comprehensive Audit Report
Client: ${report.fullName}
Score: ${report.score} (${getScoreCategoryText(report.scoreCategory, selectedLang)})
Control Number: ${report.controlNumber}
Total Accounts: ${report.accounts.length}
Target Score Recovery: +${report.potentialScoreGain} Points (Goal: ${report.score + report.potentialScoreGain})
Kendra: ${consultantName}`;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 sm:p-6 relative border-b-4 border-[#FF6B00]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#FF6B00] text-white flex items-center justify-center font-black text-xl shadow-lg shadow-orange-500/30">
                क
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                    {selectedLang === 'mr'
                      ? 'दस्तऐवज निर्यात व छपाई केंद्र'
                      : selectedLang === 'hi'
                      ? 'दस्तावेज़ निर्यात एवं प्रिंट केंद्र'
                      : 'Document Export & Print Center'}
                  </h3>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-orange-500/30 text-orange-200 border border-orange-400/40">
                    {currentLangDetails.name}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {selectedLang === 'mr'
                    ? 'सिबिल फॉरेन्सिक ऑडिट अहवाल, कायदेशीर नोटीस व कर्ज विश्लेषण आपल्या प्रादेशिक भाषेत डाउनलोड करा.'
                    : selectedLang === 'hi'
                    ? 'सिबिल फॉरेंसिक ऑडिट रिपोर्ट, वैधानिक नोटिस एवं ऋण विश्लेषण अपनी क्षेत्रीय भाषा में प्राप्त करें।'
                    : 'Download official CIBIL forensic audit dossiers, legal dispute notices and loan matrices in your language.'}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Client Banner */}
          <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Subject:</span>
              <strong className="text-white font-bold">{report.fullName}</strong>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Score:</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-mono font-black">
                {report.score}
              </span>
            </div>
            <div className="text-[11px] text-slate-300 font-mono">
              ECN: {report.controlNumber}
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 flex-1 bg-slate-50/50">
          {/* STEP 1: Select Export Language */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>
                  {selectedLang === 'mr'
                    ? '१. दस्तऐवजाची भाषा निवडा (९ भाषा उपलब्ध)'
                    : selectedLang === 'hi'
                    ? '१. दस्तावेज़ की भाषा चुनें (९ भाषाएं उपलब्ध)'
                    : '1. Select Document Language (9 Indian Languages)'}
                </span>
              </label>
              <span className="text-[11px] font-bold text-slate-500">
                Active: <span className="text-[#FF6B00] font-black">{currentLangDetails.name} ({currentLangDetails.englishName})</span>
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-1.5">
              {SUPPORTED_LANGUAGES.map(lang => {
                const isSelected = selectedLang === lang.code;
                return (
                  <button
                    key={lang.code}
                    onClick={() => setSelectedLang(lang.code)}
                    className={`p-2 rounded-xl text-center border transition-all flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'bg-[#FF6B00] text-white border-[#FF6B00] shadow-md shadow-orange-500/20 font-black ring-2 ring-orange-200'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-orange-300 hover:bg-orange-50/40 font-medium'
                    }`}
                  >
                    <span className="text-sm">{lang.flagOrSymbol}</span>
                    <span className="text-xs whitespace-nowrap leading-tight">{lang.name}</span>
                    <span className={`text-[9px] ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                      {lang.code.toUpperCase()}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Document Type Selector */}
          <div>
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-2">
              {selectedLang === 'mr'
                ? '२. दस्तऐवज प्रकार निवडा'
                : selectedLang === 'hi'
                ? '२. दस्तावेज़ का प्रकार चुनें'
                : '2. Select Document Format'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                type="button"
                onClick={() => setDocType('FULL_AUDIT_REPORT')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  docType === 'FULL_AUDIT_REPORT'
                    ? 'bg-orange-50/80 border-[#FF6B00] text-slate-900 ring-2 ring-orange-200 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${docType === 'FULL_AUDIT_REPORT' ? 'bg-[#FF6B00] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black">
                    {selectedLang === 'mr'
                      ? 'संपूर्ण ७-मुद्दे फॉरेन्सिक ऑडिट'
                      : selectedLang === 'hi'
                      ? 'पूर्ण ७-बिंदु फॉरेंसिक ऑडिट'
                      : '7-Point Forensic Audit'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {selectedLang === 'mr'
                    ? 'सर्व खाती, त्रुटी, सुधारणा योजना, संस्थात्मक कर्ज पात्रता व कायदेशीर नियम.'
                    : 'Complete dossier: Accounts, 7 pillars, inaccuracies & underwriting verdict.'}
                </p>
                {docType === 'FULL_AUDIT_REPORT' && (
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] absolute top-3 right-3" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setDocType('LEGAL_DISPUTE_NOTICE')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  docType === 'LEGAL_DISPUTE_NOTICE'
                    ? 'bg-orange-50/80 border-[#FF6B00] text-slate-900 ring-2 ring-orange-200 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${docType === 'LEGAL_DISPUTE_NOTICE' ? 'bg-[#FF6B00] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Scale className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black">
                    {selectedLang === 'mr'
                      ? 'कलम २१ कायदेशीर नोटीस'
                      : selectedLang === 'hi'
                      ? 'धारा 21 वैधानिक नोटिस'
                      : 'CICRA 2005 Sec 21 Notice'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {selectedLang === 'mr'
                    ? 'बँक नोडल ऑफिसर व ऑम्बड्समनसाठी ३० दिवसांच्या मुदतीचे कायदेशीर पत्र.'
                    : 'Formal statutory rectification demand addressed to bank nodal officer.'}
                </p>
                {docType === 'LEGAL_DISPUTE_NOTICE' && (
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] absolute top-3 right-3" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setDocType('LOAN_ELIGIBILITY_SUMMARY')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  docType === 'LOAN_ELIGIBILITY_SUMMARY'
                    ? 'bg-orange-50/80 border-[#FF6B00] text-slate-900 ring-2 ring-orange-200 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${docType === 'LOAN_ELIGIBILITY_SUMMARY' ? 'bg-[#FF6B00] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black">
                    {selectedLang === 'mr'
                      ? 'कर्ज पात्रता व व्याजदर अहवाल'
                      : selectedLang === 'hi'
                      ? 'ऋण पात्रता एवं ब्याज रिपोर्ट'
                      : 'Loan Eligibility Matrix'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {selectedLang === 'mr'
                    ? 'गृहकर्ज, व्यवसाय कर्ज मंजुरी शक्यता, अपेक्षित व्याज व ईएमआय अंदाज.'
                    : 'Sanction odds, borrowing limits, EMI stress and target lender tiers.'}
                </p>
                {docType === 'LOAN_ELIGIBILITY_SUMMARY' && (
                  <CheckCircle2 className="w-4 h-4 text-[#FF6B00] absolute top-3 right-3" />
                )}
              </button>
            </div>
          </div>

          {/* Conditional Input: Dispute Bank for Legal Notice */}
          {docType === 'LEGAL_DISPUTE_NOTICE' && (
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-2">
              <label className="text-xs font-bold text-slate-700 block">
                {selectedLang === 'mr'
                  ? 'नोटीस पाठवायची ती बँक / वित्तीय संस्था निवडा:'
                  : 'Target Lender / Reporting Bank to address notice to:'}
              </label>
              <select
                value={disputeBank}
                onChange={e => setDisputeBank(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
              >
                {report.accounts.map(acc => (
                  <option key={acc.accountNumberMasked} value={acc.bankName}>
                    {acc.bankName} ({acc.accountType} - {acc.accountNumberMasked})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* STEP 3: Live In-Modal Document Preview in Selected Language */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {selectedLang === 'mr'
                    ? `दस्तऐवज पूर्वदृश्य (${currentLangDetails.name} आवृत्ती)`
                    : selectedLang === 'hi'
                    ? `दस्तावेज़ पूर्वावलोकन (${currentLangDetails.name} संस्करण)`
                    : `Live Document Preview (${currentLangDetails.name} Edition)`}
                </span>
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                ✓ UTF-8 Regional Encoding Ready
              </span>
            </div>

            {/* Preview Box */}
            <div className="max-h-60 overflow-y-auto rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs font-mono space-y-3 leading-relaxed">
              {docType === 'LEGAL_DISPUTE_NOTICE' ? (
                <pre className="whitespace-pre-wrap font-sans text-slate-800 text-xs">
                  {getLocalizedDisputeLetter(
                    report.fullName,
                    report.panMasked,
                    disputeBank,
                    report.accounts[0]?.accountNumberMasked || 'XXXX9021',
                    report.detectedIssuesRanked[0]?.titleMr || 'Inaccurate DPD Reporting',
                    selectedLang
                  )}
                </pre>
              ) : (
                <div className="space-y-3 font-sans">
                  <div className="border-b border-slate-200 pb-2">
                    <p className="font-black text-slate-900 text-sm">
                      {selectedLang === 'mr'
                        ? 'सखोल सिबिल क्रेडिट विश्लेषण व ७-मुद्दे फॉरेन्सिक ऑडिट अहवाल'
                        : selectedLang === 'hi'
                        ? 'विस्तृत सिबिल क्रेडिट विश्लेषण एवं 7-बिंदु फॉरेंसिक ऑडिट रिपोर्ट'
                        : 'Comprehensive CIBIL Credit Analysis & 7-Point Audit Report'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {consultantName} • Ref: {report.controlNumber} • Language: {currentLangDetails.name}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div>
                      <span className="text-slate-500 block">
                        {selectedLang === 'mr' ? 'ग्राहकाचे नाव:' : 'Client Name:'}
                      </span>
                      <strong className="text-slate-900">{report.fullName}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">
                        {selectedLang === 'mr' ? 'सिबिल स्कोअर:' : 'CIBIL Score:'}
                      </span>
                      <strong className="text-[#FF6B00] font-mono text-sm">
                        {report.score} / 900 ({getScoreCategoryText(report.scoreCategory, selectedLang)})
                      </strong>
                    </div>
                  </div>

                  <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-[11px]">
                    <span className="font-bold text-slate-800 block mb-1">
                      {selectedLang === 'mr'
                        ? '७-मुद्दे फॉरेन्सिक सिबिल निकष स्थिती:'
                        : '7-Point CIR Forensic Pillars Status:'}
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px]">
                      {report.sevenPointAudit.slice(0, 4).map(p => (
                        <div key={p.pillarNumber} className="flex justify-between items-center text-slate-700">
                          <span>#{p.pillarNumber} {selectedLang === 'mr' ? p.titleMr : p.titleEn}</span>
                          <span className="font-bold text-emerald-600">{p.score}/100</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 bg-amber-50 p-2.5 rounded-xl border border-amber-200">
                    <strong>
                      {selectedLang === 'mr' ? 'कायदेशीर नोंद:' : 'Statutory Mandate:'}
                    </strong>{' '}
                    {selectedLang === 'mr'
                      ? 'CICRA 2005 कलम २१(३) नुसार ३० दिवसांत बँकांनी सिबिल अहवाल दुरुस्त करणे बंधनकारक आहे.'
                      : 'Statutory 30-day resolution timeline applies under Section 21(3) of CICRA 2005.'}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Optional Consultant Notes */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {selectedLang === 'mr'
                ? 'केंद्र सल्लागाराची विशेष नोंद / शिफारस (पर्यायी):'
                : 'Kendra Consultant Advice / Stamp Note (Optional):'}
            </label>
            <input
              type="text"
              value={consultantNotes}
              onChange={e => setConsultantNotes(e.target.value)}
              placeholder="उदा. गृहकर्जासाठी अर्ज करण्यापूर्वी क्रेडिट कार्ड मर्यादा ३०% खाली आणावी..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-[#FF6B00]"
            />
          </div>
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyText}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
              <span>{copied ? (selectedLang === 'mr' ? 'कॉपी झाले!' : 'Copied!') : (selectedLang === 'mr' ? 'मजकूर कॉपी करा' : 'Copy Text')}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="px-3.5 py-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>WhatsApp</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadHtml}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
              title="Download offline-ready HTML report"
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>{selectedLang === 'mr' ? 'HTML डाउनलोड' : 'Download HTML'}</span>
            </button>

            <button
              type="button"
              onClick={handlePrintPdf}
              className="px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md shadow-orange-500/20"
            >
              <Printer className="w-4 h-4" />
              <span>
                {selectedLang === 'mr'
                  ? 'प्रिंट करा / PDF सेव्ह करा'
                  : selectedLang === 'hi'
                  ? 'प्रिंट / PDF सुरक्षित करें'
                  : 'Print / Save PDF'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
