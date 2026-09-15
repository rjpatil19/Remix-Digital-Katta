import React, { useState } from 'react';
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  FileText,
  ShieldCheck,
  Scale,
  Sparkles,
  Building,
  CheckCircle2,
  FileCheck2,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { ExtractedReport, Language } from '../../types';
import { SUPPORTED_LANGUAGES, getLanguageDetails, getScoreCategoryText } from '../../i18n';
import {
  exportDocumentAsPdf,
  downloadDocumentAsHtml,
  shareReportOnWhatsApp,
  ExportDocumentType
} from '../../utils/documentExportEngine';
import { getLocalizedDisputeLetter } from '../../i18n';
import { generateAnalysisPdf } from '../../services/generateAnalysisPdf';

interface ExportDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: ExtractedReport;
  currentLanguage: Language;
  partnerName?: string;
  consultantName?: string;
  defaultPartnerNotes?: string;
  defaultConsultantNotes?: string;
}

export const ExportDocumentModal: React.FC<ExportDocumentModalProps> = ({
  isOpen,
  onClose,
  report,
  currentLanguage,
  partnerName,
  consultantName,
  defaultPartnerNotes,
  defaultConsultantNotes = ''
}) => {
  const [selectedLang, setSelectedLang] = useState<Language>(currentLanguage);
  const [docType, setDocType] = useState<ExportDocumentType>('PROFESSIONAL_ANALYSIS_PDF');
  const [includeAnnexure, setIncludeAnnexure] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [consultantNotes, setConsultantNotes] = useState<string>(
    defaultPartnerNotes || defaultConsultantNotes || report.partnerNotes || report.consultantNotes || ''
  );
  const [copied, setCopied] = useState<boolean>(false);
  const [disputeBank, setDisputeBank] = useState<string>(
    report.accounts[0]?.bankName || 'State Bank of India'
  );

  if (!isOpen) return null;

  const currentLangDetails = getLanguageDetails(selectedLang);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleDownloadPdf = async () => {
    setIsGenerating(true);
    try {
      if (docType === 'PROFESSIONAL_ANALYSIS_PDF') {
        const result = await generateAnalysisPdf(report, {
          language: selectedLang,
          consultantName,
          consultantNotes,
          includeSecondPage: includeAnnexure
        });
        result.save();
        showToast(
          selectedLang === 'mr'
            ? '✓ क्रेडिट विश्लेषण अहवाल (PDF) यशस्वीपणे डाउनलोड झाला!'
            : selectedLang === 'hi'
            ? '✓ क्रेडिट विश्लेषण रिपोर्ट (PDF) सफलतापूर्वक डाउनलोड हो गया!'
            : '✓ Professional Credit Analysis Report (PDF) downloaded successfully!'
        );
      } else {
        exportDocumentAsPdf(report, {
          language: selectedLang,
          documentType: docType,
          consultantName,
          consultantNotes,
          disputeBank
        });
        showToast('✓ Document exported successfully!');
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      showToast('Exporting print document...');
      exportDocumentAsPdf(report, {
        language: selectedLang,
        documentType: docType,
        consultantName,
        consultantNotes,
        disputeBank
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePreviewPdf = async () => {
    setIsGenerating(true);
    try {
      if (docType === 'PROFESSIONAL_ANALYSIS_PDF') {
        const result = await generateAnalysisPdf(report, {
          language: selectedLang,
          consultantName,
          consultantNotes,
          includeSecondPage: includeAnnexure
        });
        const blobUrl = URL.createObjectURL(result.blob);
        window.open(blobUrl, '_blank');
        showToast('✓ PDF preview opened in new window');
      } else {
        exportDocumentAsPdf(report, {
          language: selectedLang,
          documentType: docType,
          consultantName,
          consultantNotes,
          disputeBank
        });
      }
    } catch (err) {
      console.error('Preview error:', err);
      exportDocumentAsPdf(report, {
        language: selectedLang,
        documentType: docType,
        consultantName,
        consultantNotes,
        disputeBank
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadHtml = () => {
    downloadDocumentAsHtml(report, {
      language: selectedLang,
      documentType: docType,
      consultantName,
      consultantNotes,
      disputeBank
    });
    showToast('✓ Offline HTML document downloaded!');
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
      textToCopy = `Digital Katta - Credit Analysis Report
Client: ${report.fullName}
Score: ${report.score} (${getScoreCategoryText(report.scoreCategory, selectedLang)})
Control Number: ${report.controlNumber}
Total Accounts: ${report.accounts.length}
Target Score Recovery: +${report.potentialScoreGain} Points (Goal: ${report.score + report.potentialScoreGain})
Key Negative Remarks:
1. High Card Utilization (71.4%) on Axis Bank -> Impact: -22 Pts
2. Settled Status on 3 Cards (Mid-2022) -> Impact: -25 Pts
3. Historical Delinquency in 2022 -> Impact: -18 Pts
30-60 Days Action Plan:
- Next 15 Days: Pay down Axis Card below 30% (+22 Pts)
- 15-30 Days: Obtain NDC from SBI & HDFC (+25 Pts)
- 30-60 Days: Prime Home Loan Rate Concession (+25 Pts)
Kendra: ${consultantName}`;
    }

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
      showToast('✓ Summary copied to clipboard!');
    } catch {
      // Fallback
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] relative">
        
        {/* Success Toast Notification */}
        {toastMessage && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-slate-900 text-white px-5 py-2.5 rounded-full shadow-2xl border border-orange-500/50 flex items-center gap-2.5 text-xs font-bold animate-in slide-in-from-top-3 duration-200">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white p-4 sm:p-6 relative border-b-4 border-[#FF6500]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white p-1 border-2 border-[#FF6500] flex items-center justify-center shadow-lg shadow-orange-500/30 overflow-hidden shrink-0">
                <img
                  src="/digital_katta_logo.jpg"
                  alt="Digital Katta"
                  className="w-full h-full object-contain rounded-xl"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                    {selectedLang === 'mr'
                      ? 'व्यावसायिक क्रेडिट अहवाल (PDF)'
                      : selectedLang === 'hi'
                      ? 'व्यावसायिक क्रेडिट रिपोर्ट (PDF)'
                      : 'Professional Credit Analysis Report'}
                  </h3>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-orange-500/30 text-orange-200 border border-orange-400/40">
                    {currentLangDetails.name}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                    Partner-Ready
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-0.5">
                  {selectedLang === 'mr'
                    ? 'बँक व कर्ज मंजुरीसाठी १-२ पानांचा सुटसुटीत, अधिकृत व उच्च गुणवत्तेचा सिबिल अहवाल तयार करा.'
                    : selectedLang === 'hi'
                    ? 'बैंक एवं ऋण स्वीकृति हेतु 1-2 पृष्ठों की संक्षिप्त, अधिकृत एवं उच्च गुणवत्ता वाली सिबिल रिपोर्ट बनाएं।'
                    : 'Clean, single/2-page executive PDF with score verdict, 3-5 critical negatives, 30-60 day roadmap & loan matrix.'}
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
              <span className="text-slate-400">Client:</span>
              <strong className="text-white font-bold">{report.fullName}</strong>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Score:</span>
              <span className="px-2 py-0.5 rounded-md bg-amber-400/20 text-amber-300 font-mono font-black">
                {report.score} / 900
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-bold">+{report.potentialScoreGain} Pts Target</span>
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
                <Sparkles className="w-3.5 h-3.5 text-[#FF6500]" />
                <span>
                  {selectedLang === 'mr'
                    ? '१. अहवालाची भाषा निवडा (९ भाषा उपलब्ध)'
                    : selectedLang === 'hi'
                    ? '१. रिपोर्ट की भाषा चुनें (९ भाषाएं उपलब्ध)'
                    : '1. Select Report Language (9 Indian Languages)'}
                </span>
              </label>
              <span className="text-[11px] font-bold text-slate-500">
                Active: <span className="text-[#FF6500] font-black">{currentLangDetails.name} ({currentLangDetails.englishName})</span>
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
                        ? 'bg-[#FF6500] text-white border-[#FF6500] shadow-md shadow-orange-500/20 font-black ring-2 ring-orange-200'
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

          {/* STEP 2: Document Format Selector */}
          <div>
            <label className="text-xs font-black text-slate-800 uppercase tracking-wider block mb-2">
              {selectedLang === 'mr'
                ? '२. अहवाल स्वरूप निवडा'
                : selectedLang === 'hi'
                ? '२. रिपोर्ट का प्रारूप चुनें'
                : '2. Select Document Format'}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              
              {/* Option 1: Redesigned Professional Analysis PDF (Primary) */}
              <button
                type="button"
                onClick={() => setDocType('PROFESSIONAL_ANALYSIS_PDF')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  docType === 'PROFESSIONAL_ANALYSIS_PDF'
                    ? 'bg-orange-50/90 border-[#FF6500] text-slate-900 ring-2 ring-orange-200 shadow-md shadow-orange-500/10'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${docType === 'PROFESSIONAL_ANALYSIS_PDF' ? 'bg-[#FF6500] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black text-slate-900">
                    {selectedLang === 'mr'
                      ? 'क्रेडिट विश्लेषण अहवाल (PDF)'
                      : selectedLang === 'hi'
                      ? 'क्रेडिट विश्लेषण रिपोर्ट (PDF)'
                      : 'Credit Analysis PDF'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {selectedLang === 'mr'
                    ? '१-२ पानांचा संक्षिप्त, सल्लागार-दर्जाचा स्वच्छ व आधुनिक PDF अहवाल.'
                    : 'Concise 1-2 page executive PDF with score snapshot, negatives & 30-60d plan.'}
                </p>
                {docType === 'PROFESSIONAL_ANALYSIS_PDF' && (
                  <span className="absolute top-2.5 right-2.5 px-1.5 py-0.5 rounded-full bg-[#FF6500] text-white text-[9px] font-black">
                    Recommended
                  </span>
                )}
              </button>

              {/* Option 2: 7-Point Audit Dossier */}
              <button
                type="button"
                onClick={() => setDocType('FULL_AUDIT_REPORT')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  docType === 'FULL_AUDIT_REPORT'
                    ? 'bg-orange-50/90 border-[#FF6500] text-slate-900 ring-2 ring-orange-200 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${docType === 'FULL_AUDIT_REPORT' ? 'bg-[#FF6500] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black">
                    {selectedLang === 'mr' ? '७-मुद्दे फॉरेन्सिक ऑडिट' : 'Full Forensic Dossier'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {selectedLang === 'mr'
                    ? 'सर्व खाती, त्रुटी व तपशीलवार ७ निकषांचा संपूर्ण तांत्रिक अहवाल.'
                    : 'Comprehensive HTML dossier with all 11 tradelines & pillar audit.'}
                </p>
                {docType === 'FULL_AUDIT_REPORT' && (
                  <CheckCircle2 className="w-4 h-4 text-[#FF6500] absolute top-3 right-3" />
                )}
              </button>

              {/* Option 3: CICRA Sec 21 Dispute Notice */}
              <button
                type="button"
                onClick={() => setDocType('LEGAL_DISPUTE_NOTICE')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  docType === 'LEGAL_DISPUTE_NOTICE'
                    ? 'bg-orange-50/90 border-[#FF6500] text-slate-900 ring-2 ring-orange-200 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${docType === 'LEGAL_DISPUTE_NOTICE' ? 'bg-[#FF6500] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Scale className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black">
                    {selectedLang === 'mr' ? 'कलम २१ कायदेशीर नोटीस' : 'CICRA Sec 21 Notice'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {selectedLang === 'mr'
                    ? 'बँक नोडल ऑफिसरसाठी ३० दिवसांची वैधानिक दुरुस्ती मागणी.'
                    : 'Statutory 30-day correction notice for reporting bank & ombudsman.'}
                </p>
                {docType === 'LEGAL_DISPUTE_NOTICE' && (
                  <CheckCircle2 className="w-4 h-4 text-[#FF6500] absolute top-3 right-3" />
                )}
              </button>

              {/* Option 4: Loan Eligibility Matrix */}
              <button
                type="button"
                onClick={() => setDocType('LOAN_ELIGIBILITY_SUMMARY')}
                className={`p-3.5 rounded-2xl border text-left transition-all relative ${
                  docType === 'LOAN_ELIGIBILITY_SUMMARY'
                    ? 'bg-orange-50/90 border-[#FF6500] text-slate-900 ring-2 ring-orange-200 shadow-xs'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <div className={`p-1.5 rounded-lg ${docType === 'LOAN_ELIGIBILITY_SUMMARY' ? 'bg-[#FF6500] text-white' : 'bg-slate-100 text-slate-600'}`}>
                    <Building className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-black">
                    {selectedLang === 'mr' ? 'कर्ज पात्रता मॅट्रिक्स' : 'Loan Matrix'}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-snug">
                  {selectedLang === 'mr'
                    ? 'गृहकर्ज, वाहन व वैयक्तिक कर्ज मंजुरी अंदाज व मर्यादा.'
                    : 'Sanction odds, borrowing limits, tenure & target rates.'}
                </p>
                {docType === 'LOAN_ELIGIBILITY_SUMMARY' && (
                  <CheckCircle2 className="w-4 h-4 text-[#FF6500] absolute top-3 right-3" />
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
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-[#FF6500]"
              >
                {report.accounts.map(acc => (
                  <option key={acc.accountNumberMasked} value={acc.bankName}>
                    {acc.bankName} ({acc.accountType} - {acc.accountNumberMasked})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Page 2 Annexure Toggle for Professional PDF */}
          {docType === 'PROFESSIONAL_ANALYSIS_PDF' && (
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF6500] flex items-center justify-center font-bold text-xs">
                  2P
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">
                    {selectedLang === 'mr'
                      ? 'पान २: सर्व खात्यांचा तपशील व सल्लागार शिक्का जोडा'
                      : selectedLang === 'hi'
                      ? 'पृष्ठ २: सभी ऋण खातों का विवरण एवं मुहर शामिल करें'
                      : 'Include Page 2: Full Tradeline Annexure & Official Stamp Box'}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    {selectedLang === 'mr'
                      ? 'बंद/चालू खात्यांचे कोष्टक आणि केंद्र शिक्का/स्वाक्षरीसाठी दुसरे पान तयार करते.'
                      : 'Adds the 11-account portfolio breakdown table and official advisory signature/stamp box.'}
                  </p>
                </div>
              </div>

              <label className="relative inline-flex items-center cursor-pointer shrink-0">
                <input
                  type="checkbox"
                  checked={includeAnnexure}
                  onChange={e => setIncludeAnnexure(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FF6500]"></div>
              </label>
            </div>
          )}

          {/* STEP 3: Live Document Structure Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2.5">
              <span className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>
                  {selectedLang === 'mr'
                    ? `दस्तऐवज पूर्वदृश्य (${currentLangDetails.name} आवृत्ती)`
                    : selectedLang === 'hi'
                    ? `दस्तावेज़ पूर्वावलोकन (${currentLangDetails.name} संस्करण)`
                    : `Document Structure Preview (${currentLangDetails.name} Edition)`}
                </span>
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                {docType === 'PROFESSIONAL_ANALYSIS_PDF'
                  ? includeAnnexure
                    ? 'Max 2 Pages • Partner Dossier'
                    : 'Single-Page Executive PDF'
                  : 'HTML Dossier'}
              </span>
            </div>

            {/* Live Visual Preview */}
            {docType === 'PROFESSIONAL_ANALYSIS_PDF' ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-4 shadow-xs text-xs font-sans">
                
                {/* 1. Header Preview */}
                <div className="flex items-start justify-between border-b border-slate-200 pb-3 gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-0.5 shrink-0">
                      <img src="/digital_katta_logo.jpg" alt="Logo" className="w-full h-full object-contain rounded-lg" />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm">Digital कट्टा</h4>
                      <p className="text-[10px] text-slate-500 font-medium">अधिकृत सिबिल विश्लेषण व सल्ला केंद्र • ठिकाण एक, सुविधा अनेक..!</p>
                      <p className="text-[10px] text-[#FF6500] font-bold">{consultantName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-black uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-600" /> CONFIDENTIAL
                    </span>
                    <h5 className="text-xs font-black text-slate-900 mt-1">
                      {selectedLang === 'mr' ? 'क्रेडिट विश्लेषण अहवाल' : 'Credit Analysis Report'}
                    </h5>
                    <p className="text-[10px] text-slate-500 font-mono">
                      {report.fullName} • ECN: {report.controlNumber} • {report.reportDate || '09 Sep 2026'}
                    </p>
                  </div>
                </div>

                {/* 2. Score Snapshot Preview */}
                <div className="p-3.5 rounded-xl bg-gradient-to-r from-orange-50/70 to-slate-50 border border-orange-200 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-slate-900 font-mono">{report.score}</span>
                    <span className="text-xs text-slate-500 font-bold">/ 900</span>
                    <span className="ml-2 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-black">
                      ✓ {selectedLang === 'mr' ? 'चांगला दर्जा (Good)' : 'Good Credit Profile'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-bold">
                    <span className="bg-white border border-slate-200 px-2 py-1 rounded-lg text-slate-700">11 Tradelines</span>
                    <span className="bg-emerald-50 border border-emerald-200 px-2 py-1 rounded-lg text-emerald-700">₹0 Overdue</span>
                    <span className="bg-orange-100 border border-orange-200 px-2 py-1 rounded-lg text-orange-800 font-black">+55 Pts Target (802)</span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 italic bg-slate-50 p-2 rounded-lg border border-slate-100">
                  "Good credit profile with improving trend. Strong secured asset backing (97.1%), clean recent repayments. High card utilization (71.4%) currently limits score from 800+ tier."
                </p>

                {/* 3. Key Negative Remarks Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-3.5 bg-[#FF6500] rounded-sm" />
                      {selectedLang === 'mr' ? 'महत्त्वाच्या ३ नकारात्मक नोंदी (तातडीने दुरुस्त्या)' : 'Key Negative Remarks (Actionable Factors)'}
                    </span>
                    <span className="text-[10px] text-rose-700 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                      3 Critical Factors
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    <div className="p-2.5 rounded-xl border border-orange-200 bg-white flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-orange-100 text-orange-800 font-black text-[10px]">HIGH</span>
                        <span className="font-bold text-slate-800">High Card Utilization (71.4%) on Axis Bank (₹49.2K / ₹69K limit)</span>
                      </div>
                      <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md shrink-0">–22 Pts</span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-orange-200 bg-white flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-orange-100 text-orange-800 font-black text-[10px]">HIGH</span>
                        <span className="font-bold text-slate-800">Historical "Settled" Status on 3 Credit Cards (Mid-2022)</span>
                      </div>
                      <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md shrink-0">–25 Pts</span>
                    </div>
                    <div className="p-2.5 rounded-xl border border-amber-200 bg-white flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800 font-black text-[10px]">MEDIUM</span>
                        <span className="font-bold text-slate-800">Historical 192 DPD Delinquency on ICICI Card (Early 2022)</span>
                      </div>
                      <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md shrink-0">–18 Pts</span>
                    </div>
                  </div>
                </div>

                {/* 4. 30-60 Days Action Plan Preview */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                      <span className="w-1.5 h-3.5 bg-[#FF6500] rounded-sm" />
                      {selectedLang === 'mr' ? '३०-६० दिवसांचा प्राधान्यीकृत कृती आराखडा' : '30–60 Days Prioritized Action Plan'}
                    </span>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Target: +55 Pts Gain
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl border border-orange-200 bg-orange-50/40">
                      <div className="flex justify-between items-center text-[10px] font-black text-orange-900 mb-1">
                        <span>⏱️ Next 15 Days</span>
                        <span className="text-orange-700">+30 Pts</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-snug">
                        • Pay down Axis card ₹28.5K (&lt;30%)<br />
                        • Fund NACH for Equitas loan EMI
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl border border-sky-200 bg-sky-50/40">
                      <div className="flex justify-between items-center text-[10px] font-black text-sky-900 mb-1">
                        <span>⏱️ 15–30 Days</span>
                        <span className="text-sky-700">+35 Pts</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-snug">
                        • Obtain NDC for settled cards<br />
                        • Freeze loan inquiries 6 months
                      </p>
                    </div>
                    <div className="p-2.5 rounded-xl border border-emerald-200 bg-emerald-50/40">
                      <div className="flex justify-between items-center text-[10px] font-black text-emerald-900 mb-1">
                        <span>⏱️ 30–60 Days</span>
                        <span className="text-emerald-700">+25 Pts</span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-snug">
                        • Consolidate 2-yr ITRs &amp; Form 16<br />
                        • Negotiate 75-100 bps rate cut
                      </p>
                    </div>
                  </div>
                </div>

                {/* 5. Loan Eligibility Chips */}
                <div className="space-y-1.5">
                  <span className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-3.5 bg-[#FF6500] rounded-sm" />
                    {selectedLang === 'mr' ? 'कर्ज पात्रता त्वरित सारांश (Loan Matrix)' : 'Quick Loan Eligibility Snapshot'}
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold block text-slate-800">Home Loan</span>
                      <span className="text-emerald-600 font-black">Approved (96%)</span>
                      <span className="text-slate-500 block">Limit: ₹35–50L</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold block text-slate-800">LAP Mortgage</span>
                      <span className="text-emerald-600 font-black">Approved (95%)</span>
                      <span className="text-slate-500 block">Limit: ₹25–35L</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold block text-slate-800">Personal Loan</span>
                      <span className="text-sky-600 font-black">Approved (88%)</span>
                      <span className="text-slate-500 block">Limit: ₹15–20L</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="font-bold block text-slate-800">Auto Loan</span>
                      <span className="text-emerald-600 font-black">Approved (94%)</span>
                      <span className="text-slate-500 block">Limit: ₹12–18L</span>
                    </div>
                  </div>
                </div>

                {/* 6. Footer Preview */}
                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
                  <span>Digital कट्टा Fintech Solutions • ठिकाण एक, सुविधा अनेक..!</span>
                  <span>Page 1 of {includeAnnexure ? '2' : '1'}</span>
                </div>
              </div>
            ) : docType === 'LEGAL_DISPUTE_NOTICE' ? (
              <div className="max-h-60 overflow-y-auto rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs font-mono space-y-3 leading-relaxed">
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
              </div>
            ) : (
              <div className="max-h-60 overflow-y-auto rounded-xl bg-slate-50 p-4 border border-slate-200 text-xs font-sans space-y-3 leading-relaxed">
                <div className="border-b border-slate-200 pb-2">
                  <p className="font-black text-slate-900 text-sm">
                    {selectedLang === 'mr'
                      ? 'सखोल सिबिल क्रेडिट विश्लेषण व ७-मुद्दे फॉरेन्सिक ऑडिट अहवाल'
                      : 'Comprehensive CIBIL Credit Analysis & 7-Point Audit Report'}
                  </p>
                  <p className="text-[11px] text-slate-500">
                    {consultantName} • Ref: {report.controlNumber} • Language: {currentLangDetails.name}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>
                    <span className="text-slate-500 block">Client Name:</span>
                    <strong className="text-slate-900">{report.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Score:</span>
                    <strong className="text-[#FF6500] font-mono text-sm">{report.score} / 900</strong>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Optional Consultant Notes */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 block">
              {selectedLang === 'mr'
                ? 'केंद्र पार्टनरची विशेष नोंद / शिफारस (अहवालामध्ये मुद्रित होईल):'
                : 'Kendra Partner Advice / Official Stamp Note (Prints on Report):'}
            </label>
            <input
              type="text"
              value={consultantNotes}
              onChange={e => setConsultantNotes(e.target.value)}
              placeholder="उदा. गृहकर्जासाठी अर्ज करण्यापूर्वी क्रेडिट कार्ड मर्यादा ३०% खाली आणावी..."
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-medium focus:outline-none focus:border-[#FF6500]"
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
              <span>{copied ? (selectedLang === 'mr' ? 'कॉपी झाले!' : 'Copied!') : (selectedLang === 'mr' ? 'मजकूर कॉपी करा' : 'Copy Summary')}</span>
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
            {docType !== 'PROFESSIONAL_ANALYSIS_PDF' && (
              <button
                type="button"
                onClick={handleDownloadHtml}
                className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                title="Download offline-ready HTML report"
              >
                <Download className="w-4 h-4 text-slate-600" />
                <span>HTML</span>
              </button>
            )}

            <button
              type="button"
              onClick={handlePreviewPdf}
              disabled={isGenerating}
              className="px-4 py-2.5 rounded-xl border border-slate-300 hover:border-slate-400 bg-white text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs disabled:opacity-50"
            >
              <ExternalLink className="w-4 h-4 text-slate-600" />
              <span>
                {selectedLang === 'mr' ? 'पूर्वदृश्य पहा' : 'Preview'}
              </span>
            </button>

            <button
              type="button"
              id="btn-download-analysis-pdf"
              onClick={handleDownloadPdf}
              disabled={isGenerating}
              className="px-5 py-2.5 rounded-xl bg-[#FF6500] hover:bg-orange-600 text-white text-xs font-black flex items-center gap-2 transition-all shadow-md shadow-orange-500/20 disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>
                    {selectedLang === 'mr'
                      ? 'व्यावसायिक अहवाल (PDF) डाउनलोड'
                      : selectedLang === 'hi'
                      ? 'व्यावसायिक रिपोर्ट (PDF) डाउनलोड'
                      : 'Download Professional PDF'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
