import React, { useState } from 'react';
import {
  X,
  FileText,
  Copy,
  Check,
  Printer,
  Share2,
  Building2,
  Calendar,
  AlertTriangle,
  Scale,
  Send,
  Sparkles
} from 'lucide-react';
import { Language, ConsultantClient } from '../../types';
import { getLocalizedDisputeLetter, SUPPORTED_LANGUAGES } from '../../i18n';

interface LegalDisputeNoticeModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: ConsultantClient;
  defaultLanguage: Language;
}

export const LegalDisputeNoticeModal: React.FC<LegalDisputeNoticeModalProps> = ({
  isOpen,
  onClose,
  client,
  defaultLanguage
}) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    defaultLanguage === 'mr' || defaultLanguage === 'hi' || defaultLanguage === 'gu' ? defaultLanguage : 'mr'
  );
  const [bankName, setBankName] = useState('Axis Bank Ltd');
  const [accountNumber, setAccountNumber] = useState('XXXX-XXXX-XXXX-4250');
  const [issueType, setIssueType] = useState(
    'Erroneous 30-day DPD late payment reporting despite timely auto-debit clearance'
  );
  const [copied, setCopied] = useState(false);
  const [dispatched, setDispatched] = useState(false);

  if (!isOpen) return null;

  const letterBody = getLocalizedDisputeLetter(
    client.name,
    client.pan,
    bankName,
    accountNumber,
    issueType,
    selectedLanguage
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(letterBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Legal Notice - CICRA 2005 Sec 21 - ${client.name}</title>
          <style>
            body { font-family: 'Times New Roman', serif; padding: 40px; font-size: 15px; line-height: 1.6; color: #111; }
            h2 { color: #8A0028; text-align: center; border-bottom: 2px solid #8A0028; padding-bottom: 8px; }
            .badge { background: #f3f4f6; border: 1px solid #d1d5db; padding: 4px 8px; border-radius: 4px; font-size: 12px; }
            pre { font-family: inherit; white-space: pre-wrap; word-break: break-word; }
            .footer { margin-top: 40px; border-top: 1px solid #ddd; padding-top: 10px; font-size: 12px; color: #666; }
          </style>
        </head>
        <body>
          <h2>DIGITAL कट्टा KENDRA #04 - LEGAL NOTICE REQUISITION</h2>
          <pre>${letterBody}</pre>
          <div class="footer">
            Generated via Digital कट्टा Institutional Dispute Engine • Mandated under RBI CICRA 2005 Section 21(3)
          </div>
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(letterBody);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div
      id="modal-legal-dispute-notice"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-xs p-0 sm:p-4 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full sm:max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-4 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black tracking-tight">
                  CICRA 2005 Sec 21 Legal Dispute Notice
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30">
                  RBI Compliant
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Statutory 30-Day Mandatory Bureau Rectification Notice for Banks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notice Configuration Form */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Client summary pill */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-700 font-bold flex items-center justify-center text-xs">
                {client.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-black text-slate-900">{client.name}</p>
                <p className="text-[11px] text-slate-500">
                  PAN: <span className="font-mono font-bold text-slate-700">{client.pan}</span> • {client.city}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-bold text-slate-400 block">Current CIBIL</span>
              <span className="text-xs font-black text-emerald-700">{client.currentScore} / 900</span>
            </div>
          </div>

          {/* Form Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Reporting Bank / NBFC
              </label>
              <select
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500"
              >
                <option value="Axis Bank Ltd">Axis Bank Ltd</option>
                <option value="HDFC Bank Ltd">HDFC Bank Ltd</option>
                <option value="State Bank of India">State Bank of India (SBI)</option>
                <option value="ICICI Bank Ltd">ICICI Bank Ltd</option>
                <option value="Bajaj Finance Ltd">Bajaj Finance Ltd</option>
                <option value="RBL Bank Ltd">RBL Bank Ltd</option>
                <option value="Equitas Small Finance Bank">Equitas Small Finance Bank</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-600 block mb-1">
                Language of Notice
              </label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value as Language)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:border-orange-500"
              >
                <option value="mr">मराठी (Marathi - Official MH)</option>
                <option value="en">English (Statutory English)</option>
                <option value="hi">हिन्दी (Hindi - Pan India)</option>
                <option value="gu">ગુજરાતી (Gujarati)</option>
                <option value="bn">বাংলা (Bengali)</option>
                <option value="ta">தமிழ் (Tamil)</option>
                <option value="te">తెలుగు (Telugu)</option>
                <option value="ml">മലയാളം (Malayalam)</option>
                <option value="or">ଓଡ଼ିଆ (Odia)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-600 block mb-1">
              Dispute Category / Inaccuracy Description
            </label>
            <input
              type="text"
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Formatted Letter Preview */}
          <div className="bg-slate-900 rounded-2xl p-4 text-slate-200 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-[11px] font-mono text-orange-400 font-bold flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" />
                <span>Notice Body ({selectedLanguage.toUpperCase()})</span>
              </span>
              <span className="text-[10px] text-slate-400">
                Section 21(3) CICRA 2005 Mandate
              </span>
            </div>
            <pre className="text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-56 overflow-y-auto text-slate-300 pr-1">
              {letterBody}
            </pre>
          </div>

          {/* Statutory 30-Day Info Banner */}
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 flex items-start gap-2.5 text-xs text-amber-900">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">आरबीआय ३०-दिवसीय अनिवार्य निवारण नियम (RBI 30-Day Rule):</p>
              <p className="text-[11px] text-amber-800 mt-0.5">
                बँकेला नोटीस मिळाल्यापासून ३० दिवसांच्या आत सिबिलमधील त्रुटी दुरुस्त करणे कायद्याने बंधनकारक आहे. वेळेत दुरुस्ती न झाल्यास आरबीआय बँकिंग लोकपालकडे ₹१००/दिवस दंडासह तक्रार करता येते.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <button
              id="btn-copy-notice"
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Notice'}</span>
            </button>

            <button
              id="btn-print-notice"
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              id="btn-share-whatsapp-notice"
              onClick={handleShareWhatsApp}
              className="px-3 py-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
          </div>

          <button
            id="btn-dispatch-notice"
            onClick={() => {
              setDispatched(true);
              setTimeout(() => {
                setDispatched(false);
                onClose();
              }, 1200);
            }}
            className="px-5 py-2 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white text-xs font-black shadow-md flex items-center gap-1.5 transition-all"
          >
            {dispatched ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            <span>{dispatched ? 'Dispatched to Bank!' : 'Dispatch Notice'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
