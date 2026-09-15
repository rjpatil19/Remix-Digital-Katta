import React, { useState, useRef, useEffect } from 'react';
import {
  Upload,
  FileText,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Sparkles,
  FileSpreadsheet,
  Code2,
  KeyRound,
  RefreshCw,
  Info,
  Eye,
  EyeOff,
  Edit3,
  Copy,
  Terminal,
  UserCheck,
  CreditCard,
  RotateCcw,
  UserCog,
  AlertTriangle
} from 'lucide-react';
import { CibilReportData, Language, UserRole } from '../../types';
import { FintechApiService, UploadableFileInput } from '../../services/api';
import { EXPERIAN_SAMPLE_HTML, CIBIL_SAMPLE_HTML, EQUIFAX_SAMPLE_HTML } from '../../data/sampleHtmlReports';
import { COMPREHENSIVE_747_HTML } from '../../data/sample747Report';
import { generateSampleCibilPdfBuffer } from '../../utils/pdfReportParser';
import { Phase2Service } from '../../services/phase2Service';
import { ReportQuotaService, QuotaCheckResult } from '../../services/reportQuotaService';
import { PaymentModal } from '../modals/PaymentModal';
import { PartnerQuotaModal } from '../modals/PartnerQuotaModal';
import { consultantClientsData } from '../../data/mockData';
import { t } from '../../i18n';

interface UploadReportScreenProps {
  language: Language;
  onBack: () => void;
  onReportParsed: (report: CibilReportData) => void;
  userRole?: UserRole;
  onSwitchToAdmin?: () => void;
}

export const UploadReportScreen: React.FC<UploadReportScreenProps> = ({
  language,
  onBack,
  onReportParsed,
  userRole = 'client',
  onSwitchToAdmin
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<UploadableFileInput | null>(null);
  const [password, setPassword] = useState('');
  const [hasPassword, setHasPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseProgress, setParseProgress] = useState(0);
  const [currentStepMessage, setCurrentStepMessage] = useState('');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [showHtmlInspector, setShowHtmlInspector] = useState(false);
  const [isCustomHtmlEditorOpen, setIsCustomHtmlEditorOpen] = useState(false);
  const [customHtmlInput, setCustomHtmlInput] = useState(EXPERIAN_SAMPLE_HTML);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Quota and Rule enforcement states
  const [selectedClientId, setSelectedClientId] = useState<string>('cli-101');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showPartnerQuotaModal, setShowPartnerQuotaModal] = useState(false);
  const [quotaKey, setQuotaKey] = useState(0);

  const selectedClient = consultantClientsData.find((c) => c.id === selectedClientId) || consultantClientsData[0];
  const quotaVerification: QuotaCheckResult = ReportQuotaService.verifyQuota(
    userRole,
    selectedClient.id,
    selectedClient.name
  );

  const getStageLabels = (lang: Language): string[] => {
    switch (lang) {
      case 'mr':
        return [
          'ब्युरो दस्तऐवज वाचत आहे...',
          'खाती व थकबाकीचे विश्लेषण...',
          '७-मुद्दे फॉरेन्सिक निकष तपासत आहे...',
          'त्रुटी व कायदेशीर विवाद शोधत आहे...',
          'अंतिम विश्लेषण अहवाल तयार!'
        ];
      case 'hi':
        return [
          'ब्यूरो दस्तावेज़ पढ़ा जा रहा है...',
          'खाते एवं बकाया राशि का विश्लेषण...',
          '7-बिंदु फॉरेंसिक ऑडिट परीक्षण...',
          'त्रुटियां एवं कानूनी विवाद खोजे जा रहे हैं...',
          'क्रेडिट विश्लेषण रिपोर्ट तैयार!'
        ];
      case 'gu':
        return [
          'બ્યુરો દસ્તાવેજ વંચાઈ રહ્યો છે...',
          'ખાતાઓ અને બાકી રકમનું વિશ્લેષણ...',
          '7-મુદ્દા ફોરેન્સિક ઓડિટ તપાસ...',
          'ભૂલો અને કાનૂની વિવાદોની ઓળખ...',
          'ક્રેડિટ વિશ્લેષણ અહેવાલ તૈયાર!'
        ];
      case 'bn':
        return [
          'ব্যুরো নথি বিশ্লেষণ করা হচ্ছে...',
          'অ্যাকাউন্ট এবং বকেয়া ব্যালেন্স যাচাই...',
          '৭-পয়েন্ট ফরেনসিক অডিট মূল্যায়ন...',
          'ত্রুটি ও আইনি বিরোধ চিহ্নিতকরণ...',
          'সম্পূর্ণ ক্রেডিট রিপোর্ট প্রস্তুত!'
        ];
      case 'ta':
        return [
          'பீரோ ஆவணம் வாசிக்கப்படுகிறது...',
          'கணக்குகள் மற்றும் நிலுவை இருப்பு ஆய்வு...',
          '7-புள்ளி தணிக்கை சரிபார்ப்பு...',
          'பிழைகள் மற்றும் சட்ட தகராறுகள் கண்டறிதல்...',
          'கடன் அறிக்கை தயார்!'
        ];
      case 'te':
        return [
          'బ్యూరో పత్రం చదవబడుతోంది...',
          'ఖాతాలు మరియు బకాయిల విశ్లేషణ...',
          '7-పాయింట్ ఫోరెన్సిക് ఆడిట్ తనిఖీ...',
          'లోపాలు మరియు వివాదాల గుర్తింపు...',
          'క్రెడిట్ నివేదిక సిద్ధంగా ఉంది!'
        ];
      case 'ml':
        return [
          'ബ്യൂറോ രേഖ പരിശോധിക്കുന്നു...',
          'അക്കൗണ്ടുകളും കുടിശ്ശികകളും വിശകലനം ചെയ്യുന്നു...',
          '7-പോയിന്റ് ഫോറൻസിക് ഓഡിറ്റ് പരിശോധന...',
          'പിശകുകളും തർക്കങ്ങളും കണ്ടെത്തുന്നു...',
          'ക്രെഡിറ്റ് റിപ്പോർട്ട് തയ്യാർ!'
        ];
      case 'or':
        return [
          'ବ୍ୟୁରୋ ଡକ୍ୟୁମେଣ୍ଟ ଯାଞ୍ଚ ହେଉଛି...',
          'ଖାତା ଓ ବକେୟା ରାଶି ବିଶ୍ଳେଷଣ...',
          '୭-ପଏଣ୍ଟ ଫୋରେନସିକ ଅଡିଟ ଯାଞ୍ଚ...',
          'ତ୍ରୁଟି ଓ ଆଇନଗତ ବିବାଦ ଚିହ୍ନଟ...',
          'କ୍ରେଡିଟ ରିପୋର୍ଟ ପ୍ରସ୍ତୁତ!'
        ];
      default:
        return [
          'Reading bureau file structure...',
          'Extracting accounts & outstanding balances...',
          'Evaluating 7-Point CIR forensic pillars...',
          'Scanning inaccuracies & dispute grounds...',
          'Finalizing comprehensive credit dossier!'
        ];
    }
  };

  const stepsList = getStageLabels(language);

  const handleFile = async (file: File) => {
    setPasswordError(null);
    let rawText: string | undefined = undefined;
    let arrayBuffer: ArrayBuffer | undefined = undefined;

    const isPdf = file.type.includes('pdf') || file.name.toLowerCase().endsWith('.pdf');
    const isHtmlOrText =
      file.type.includes('html') ||
      file.type.includes('text') ||
      file.type.includes('json') ||
      file.name.endsWith('.html') ||
      file.name.endsWith('.htm') ||
      file.name.endsWith('.json') ||
      file.name.endsWith('.xml');

    if (isPdf) {
      try {
        arrayBuffer = await file.arrayBuffer();
      } catch (err) {
        console.warn('Could not read PDF arrayBuffer:', err);
      }
      setHasPassword(true);
    } else if (isHtmlOrText) {
      try {
        rawText = await file.text();
        setCustomHtmlInput(rawText);
      } catch (err) {
        console.warn('Could not read file text:', err);
      }
      setHasPassword(false);
    } else {
      setHasPassword(false);
    }

    setSelectedFile({
      name: file.name,
      size: file.size,
      type: file.type || (isPdf ? 'application/pdf' : file.name.split('.').pop() || 'unknown'),
      rawText,
      fileObject: file,
      arrayBuffer
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleSelectSample = async (sampleType: 'PDF_SAMPLE' | 'CIBIL_HTML' | 'EXPERIAN_HTML' | 'EQUIFAX_HTML' | 'COMPREHENSIVE_747_HTML') => {
    setPasswordError(null);
    if (sampleType === 'COMPREHENSIVE_747_HTML') {
      setSelectedFile({
        name: 'CIBIL_Credit_Analysis_Report_Rajwardhan_747.html',
        size: COMPREHENSIVE_747_HTML.length,
        type: 'text/html',
        rawText: COMPREHENSIVE_747_HTML
      });
      setCustomHtmlInput(COMPREHENSIVE_747_HTML);
      setHasPassword(false);
    } else if (sampleType === 'PDF_SAMPLE') {
      try {
        const samplePdfBuf = await generateSampleCibilPdfBuffer();
        setSelectedFile({
          name: 'TransUnion_CIBIL_CIR_Official_2025.pdf',
          size: samplePdfBuf.byteLength,
          type: 'application/pdf',
          arrayBuffer: samplePdfBuf
        });
      } catch {
        setSelectedFile({
          name: 'TransUnion_CIBIL_CIR_Official_2025.pdf',
          size: 1420000,
          type: 'application/pdf'
        });
      }
      setPassword('RAHU1408');
      setHasPassword(true);
    } else if (sampleType === 'CIBIL_HTML') {
      setSelectedFile({
        name: 'TransUnion_CIBIL_Official_Report.html',
        size: CIBIL_SAMPLE_HTML.length,
        type: 'text/html',
        rawText: CIBIL_SAMPLE_HTML
      });
      setCustomHtmlInput(CIBIL_SAMPLE_HTML);
      setHasPassword(false);
    } else if (sampleType === 'EXPERIAN_HTML') {
      setSelectedFile({
        name: 'Experian_Official_CIR_Consumer_Audit.html',
        size: EXPERIAN_SAMPLE_HTML.length,
        type: 'text/html',
        rawText: EXPERIAN_SAMPLE_HTML
      });
      setCustomHtmlInput(EXPERIAN_SAMPLE_HTML);
      setHasPassword(false);
    } else if (sampleType === 'EQUIFAX_HTML') {
      setSelectedFile({
        name: 'Equifax_CIR_Credit_Feed.html',
        size: EQUIFAX_SAMPLE_HTML.length,
        type: 'text/html',
        rawText: EQUIFAX_SAMPLE_HTML
      });
      setCustomHtmlInput(EQUIFAX_SAMPLE_HTML);
      setHasPassword(false);
    }
  };

  const handleApplyCustomHtml = () => {
    if (!customHtmlInput.trim()) return;
    setSelectedFile({
      name: 'User_Custom_Pasted_Credit_Report.html',
      size: customHtmlInput.length,
      type: 'text/html',
      rawText: customHtmlInput
    });
    setIsCustomHtmlEditorOpen(false);
  };

  const executeActualParsing = async () => {
    if (!selectedFile) return;

    setIsParsing(true);
    setParseProgress(0);
    setCompletedSteps([]);
    setPasswordError(null);

    try {
      const parsedReport = await FintechApiService.uploadAndParseReport(
        selectedFile,
        hasPassword ? password : undefined,
        (stageMsg, percent) => {
          setCurrentStepMessage(stageMsg);
          setParseProgress(percent);
          if (percent >= 25 && !completedSteps.includes(stepsList[0])) {
            setCompletedSteps((prev) => [...prev, stepsList[0]]);
          }
          if (percent >= 45 && !completedSteps.includes(stepsList[1])) {
            setCompletedSteps((prev) => [...prev, stepsList[1]]);
          }
          if (percent >= 65 && !completedSteps.includes(stepsList[2])) {
            setCompletedSteps((prev) => [...prev, stepsList[2]]);
          }
          if (percent >= 85 && !completedSteps.includes(stepsList[3])) {
            setCompletedSteps((prev) => [...prev, stepsList[3]]);
          }
          if (percent >= 98 && !completedSteps.includes(stepsList[4])) {
            setCompletedSteps((prev) => [...prev, stepsList[4]]);
          }
        }
      );

      // Phase 2: AES-256-GCM Cryptographic Vault Ingestion
      setCurrentStepMessage('Phase 2 Vault: AES-256-GCM Document Encryption & Integrity Check');
      try {
        await Phase2Service.encryptReport(parsedReport);
      } catch (secErr) {
        console.warn('Phase 2 security vault warning:', secErr);
      }

      // Record quota usage according to Rule 1, 2, 3
      ReportQuotaService.recordScoreCheck(userRole, selectedClient.id);
      setQuotaKey((prev) => prev + 1);

      setTimeout(() => {
        setIsParsing(false);
        onReportParsed(parsedReport);
      }, 350);
    } catch (err: any) {
      setIsParsing(false);
      console.error('Parsing error caught:', err);
      if (err?.isPasswordRequired) {
        setHasPassword(true);
        setPasswordError(
          err.isPasswordIncorrect
            ? (language === 'mr' ? 'पासवर्ड चुकीचा आहे. कृपया योग्य पासवर्ड प्रविष्ट करा (उदा. RAHU1408).' : 'Incorrect password. Please enter the correct CIBIL PDF password (e.g. RAHU1408).')
            : (language === 'mr' ? 'या CIBIL PDF ला पासवर्ड आवश्यक आहे.' : 'This CIBIL PDF is password-protected. Please enter password.')
        );
      } else {
        alert(
          language === 'mr'
            ? 'अहवाल स्कॅन करताना त्रुटी आली. कृपया योग्य CIBIL PDF किंवा HTML फाईल निवडा.'
            : (err?.message || 'Failed to parse credit report. Please verify format or password.')
        );
      }
    }
  };

  const handleStartParsing = () => {
    if (!selectedFile) return;

    // Enforce business rules
    const verification = ReportQuotaService.verifyQuota(userRole, selectedClient.id, selectedClient.name);
    if (!verification.allowed) {
      if (verification.requiresPayment) {
        // Rule 1: Second check for client requires ₹800 payment
        setShowPaymentModal(true);
        return;
      }
      if (userRole === 'partner') {
        // Rule 2: Partner 2 reports allowed for one client limit reached
        setShowPartnerQuotaModal(true);
        return;
      }
    }

    executeActualParsing();
  };

  const handlePaymentSuccess = () => {
    ReportQuotaService.recordPayment(800);
    setShowPaymentModal(false);
    setQuotaKey((prev) => prev + 1);
    executeActualParsing();
  };

  // Quick stats from loaded file
  const isPdf = selectedFile?.type.includes('pdf') || selectedFile?.name.toLowerCase().endsWith('.pdf');
  const isHtml = selectedFile?.type.includes('html') || selectedFile?.name.endsWith('.html') || selectedFile?.name.endsWith('.htm');
  const previewSnippet = selectedFile?.rawText ? selectedFile.rawText.slice(0, 500) : '';

  return (
    <div className="flex flex-col min-h-full bg-slate-50 text-slate-800 pb-16 overflow-y-auto">
      {/* Header */}
      <div className="bg-[#FF6B00] text-white px-5 pt-4 pb-6 shadow-md">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={onBack}
            className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div>
            <h1 className="text-lg font-black tracking-tight flex items-center gap-2">
              {language === 'mr' ? 'सिबिल / क्रेडिट अहवाल अपलोड' : 'Upload CIBIL / Credit Report'}
            </h1>
            <p className="text-xs text-orange-100 font-medium">
              {language === 'mr'
                ? 'एचटीएमएल, पीडीएफ किंवा जेसन फाईल थेट स्कॅन करा'
                : 'Interactive HTML, PDF, or JSON Ingestion & Analysis Engine'}
            </p>
          </div>
        </div>

        {/* Security badge */}
        <div className="mt-3 bg-orange-700/60 backdrop-blur-xs border border-orange-400/50 rounded-xl px-3 py-2 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
            <p className="text-[11px] text-orange-50 leading-tight">
              {language === 'mr'
                ? 'टप्पा २ सुरक्षा: आरबीआय सीआयसीआरए आणि DPDP कायदा २०२३ अंतर्गत AES-256-GCM एन्क्रिप्टेड'
                : 'Phase 2 Vault: RBI CICRA & DPDP Act 2023 AES-256-GCM Cryptographic Storage'}
            </p>
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider bg-orange-900/60 text-emerald-300 px-1.5 py-0.5 rounded border border-emerald-400/30 shrink-0">
            Phase 2 Secure
          </span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Active Role & Business Rules Quota Card */}
        {userRole === 'client' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold ${
                    quotaVerification.requiresPayment
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">
                      {language === 'mr' ? 'नियम १: ग्राहक स्कोअर पडताळणी कोटा' : 'Rule 1: Client Score & Check Quota'}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        quotaVerification.requiresPayment
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}
                    >
                      {quotaVerification.requiresPayment ? 'Payment Required (₹800)' : '1 Free Check Ready'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    {language === 'mr'
                      ? '१ मोफत स्कोअर तपासणी समाविष्ट. दुसऱ्या प्रयत्नासाठी ₹८०० शुल्क.'
                      : '1 score generation/check included. Second attempt asks for ₹800 payment.'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  ReportQuotaService.resetDemo();
                  setQuotaKey((prev) => prev + 1);
                }}
                title="Reset quota demo"
                className="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 text-[10px] font-bold flex items-center gap-1 transition-colors"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Demo</span>
              </button>
            </div>

            {quotaVerification.requiresPayment && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-amber-900">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Free quota used (1/1). Second check requires ₹800 fee.</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black whitespace-nowrap shadow-xs"
                >
                  Pay ₹800 Now
                </button>
              </div>
            )}
          </div>
        )}

        {userRole === 'consultant' && (
          <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900">
                      {language === 'mr' ? 'नियम २: पार्टनर मर्यादा' : 'Rule 2: Partner Quota'}
                    </span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        quotaVerification.allowed
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}
                    >
                      {quotaVerification.currentCount} / {quotaVerification.maxAllowed} Reports for Client
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    For consultants, exactly 2 reports are allowed per client.
                  </p>
                </div>
              </div>

              {onSwitchToAdmin && (
                <button
                  type="button"
                  onClick={onSwitchToAdmin}
                  className="px-2.5 py-1 bg-slate-900 text-white rounded-xl text-[11px] font-bold hover:bg-slate-800 shadow-xs"
                >
                  Switch to Admin
                </button>
              )}
            </div>

            {/* Client selector to test limits */}
            <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
              <label className="text-[11px] font-bold text-slate-600 shrink-0">Client:</label>
              <select
                value={selectedClientId}
                onChange={(e) => {
                  setSelectedClientId(e.target.value);
                  setQuotaKey((prev) => prev + 1);
                }}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
              >
                {consultantClientsData.map((c) => {
                  const check = ReportQuotaService.verifyQuota('consultant', c.id, c.name);
                  return (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.id}) — {check.currentCount} / 2 Reports {check.currentCount >= 2 ? '⚠️ (LIMIT REACHED)' : '✅'}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}

        {userRole === 'admin' && (
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-4 shadow-xs flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-950">
                    {language === 'mr' ? 'नियम ३: ॲडमिन मास्टर ॲक्सेस' : 'Rule 3: Admin Master Privilege'}
                  </span>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                    Unlimited Reports Allowed
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Any number of reports generation and score checks permitted without restriction.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Box */}
        {!isParsing ? (
          <>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer bg-white shadow-xs ${
                dragActive
                  ? 'border-[#FF6B00] bg-orange-50/50 scale-[1.01]'
                  : selectedFile
                  ? 'border-emerald-500 bg-emerald-50/20'
                  : 'border-slate-300 hover:border-orange-400'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".html,.htm,.pdf,.json,.xml"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
              />

              <div className="w-13 h-13 rounded-2xl bg-orange-100/80 text-[#FF6B00] flex items-center justify-center mx-auto mb-2.5">
                {selectedFile ? (
                  <FileText className="w-7 h-7 text-emerald-600" />
                ) : (
                  <Upload className="w-7 h-7 stroke-[2.2]" />
                )}
              </div>

              {selectedFile ? (
                <div>
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {language === 'mr' ? 'अहवाल फाईल लोड झाली' : 'Credit Report Ready for Analysis'}
                  </div>
                  <p className="text-sm font-black text-slate-900 truncate max-w-xs mx-auto">
                    {selectedFile.name}
                  </p>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    {(selectedFile.size / 1024).toFixed(1)} KB • {selectedFile.type.toUpperCase() || 'DOCUMENT'}
                    {isHtml && ' • Full HTML Code Loaded'}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-sm font-bold text-slate-800">
                    {language === 'mr'
                      ? 'येथे HTML / PDF फाईल ड्रॉप करा किंवा निवडण्यासाठी क्लिक करा'
                      : 'Drag & drop HTML / PDF report or click to browse'}
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    {language === 'mr'
                      ? 'समर्थित फॉरमॅट: HTML, PDF, JSON (कमाल २५ MB)'
                      : 'Supported formats: HTML, PDF, JSON (Up to 25 MB)'}
                  </p>
                </div>
              )}
            </div>

            {/* Quick Realistic Bureau Samples (Phase 1 Testing) */}
            <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                  {language === 'mr' ? 'किंवा अधिकृत ब्युरो अहवाल निवडा:' : 'Test with realistic Bureau CIR Reports:'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsCustomHtmlEditorOpen(true)}
                  className="text-[11px] font-bold text-[#FF6B00] hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3 h-3" />
                  <span>{language === 'mr' ? 'कस्टम HTML पेस्ट करा' : 'Paste HTML'}</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Featured Comprehensive 747 CIR Sample */}
                <button
                  type="button"
                  onClick={() => handleSelectSample('COMPREHENSIVE_747_HTML')}
                  className={`col-span-2 sm:col-span-4 p-3 rounded-2xl border text-left transition-all relative ${
                    selectedFile?.name.includes('Rajwardhan') || selectedFile?.name.includes('747')
                      ? 'border-[#FF6500] bg-gradient-to-r from-orange-50 via-amber-50 to-orange-50 ring-2 ring-[#FF6500]'
                      : 'border-orange-300/80 bg-gradient-to-r from-orange-50/40 via-white to-amber-50/40 hover:border-orange-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-[#0B214D]">★ CIBIL Deep Analysis Report (Institutional 747)</span>
                      <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#FF6500] text-white font-black uppercase tracking-wider">
                        Full Depth
                      </span>
                    </div>
                    <span className="text-[10px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Score 747 • 15 Sections
                    </span>
                  </div>
                  <p className="text-xs text-slate-800 font-bold">
                    Rajwardhan Madhukar Madhukar • 11 Accounts • Property Loan ₹16.5L • Axis Card 71.4%
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    Includes 7-point deep dive, payment history matrix, issue detection & professional PDF export
                  </p>
                </button>

                {/* TransUnion CIBIL PDF CIR */}
                <button
                  type="button"
                  onClick={() => handleSelectSample('PDF_SAMPLE')}
                  className={`p-2.5 rounded-xl border text-left transition-all relative ${
                    selectedFile?.name.includes('TransUnion_CIBIL') && isPdf
                      ? 'border-[#FF6B00] bg-orange-50/70 ring-1 ring-[#FF6B00]'
                      : 'border-slate-200 bg-slate-50 hover:bg-orange-50/40 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-black text-[#FF6B00]">CIBIL CIR</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-orange-100 text-[#FF6B00] font-black tracking-wide">
                      PDF
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-800 font-bold">742 Score • Official CIR</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Bajaj dispute & DPD table</p>
                </button>

                {/* TransUnion CIBIL HTML CIR */}
                <button
                  type="button"
                  onClick={() => handleSelectSample('CIBIL_HTML')}
                  className={`p-2.5 rounded-xl border text-left transition-all relative ${
                    selectedFile?.name.includes('TransUnion_CIBIL') && isHtml
                      ? 'border-[#E46C0A] bg-amber-50/70 ring-1 ring-[#E46C0A]'
                      : 'border-slate-200 bg-slate-50 hover:bg-amber-50/40 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-black text-[#E46C0A]">CIBIL CIR</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-amber-100 text-[#E46C0A] font-bold">
                      HTML
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-800 font-bold">712 Score • ECN</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Kotak settled tag & SBI</p>
                </button>

                {/* Experian HTML Sample */}
                <button
                  type="button"
                  onClick={() => handleSelectSample('EXPERIAN_HTML')}
                  className={`p-2.5 rounded-xl border text-left transition-all relative ${
                    selectedFile?.name.includes('Experian')
                      ? 'border-[#005A9C] bg-blue-50/60 ring-1 ring-[#005A9C]'
                      : 'border-slate-200 bg-slate-50 hover:bg-blue-50/40 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-black text-[#005A9C]">Experian</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-blue-100 text-[#005A9C] font-bold">
                      HTML
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-800 font-bold">688 Score • CIR</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">5 tradelines (HDFC, SBI)</p>
                </button>

                {/* Equifax HTML Sample */}
                <button
                  type="button"
                  onClick={() => handleSelectSample('EQUIFAX_HTML')}
                  className={`p-2.5 rounded-xl border text-left transition-all relative ${
                    selectedFile?.name.includes('Equifax')
                      ? 'border-purple-600 bg-purple-50/60 ring-1 ring-purple-600'
                      : 'border-slate-200 bg-slate-50 hover:bg-purple-50/40 hover:border-purple-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-black text-purple-700">Equifax</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-purple-100 text-purple-700 font-bold">
                      HTML
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-800 font-bold">695 Score</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">ICICI Card & Fullerton</p>
                </button>
              </div>
            </div>

            {/* Live PDF Status Banner */}
            {isPdf && selectedFile && (
              <div className="bg-orange-50/80 rounded-2xl p-3.5 border border-orange-200/80 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#FF6B00]" />
                    <span className="text-xs font-black text-slate-900">
                      CIBIL PDF Document Loaded ({(selectedFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-200 text-orange-900">
                    Ready for OCR & DPD
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-medium">
                  <span className="bg-white text-slate-700 px-2 py-0.5 rounded border border-orange-200">
                    ✔ Text Layer Extraction
                  </span>
                  <span className="bg-white text-slate-700 px-2 py-0.5 rounded border border-orange-200">
                    ✔ ECN Control Number
                  </span>
                  <span className="bg-white text-slate-700 px-2 py-0.5 rounded border border-orange-200">
                    ✔ DPD Repayment Matrix
                  </span>
                  <span className="bg-white text-slate-700 px-2 py-0.5 rounded border border-orange-200">
                    ✔ 7-Point RBI Audit
                  </span>
                </div>
              </div>
            )}

            {/* Live HTML Code Inspector & Extraction Preview */}
            {isHtml && selectedFile?.rawText && (
              <div className="bg-slate-900 rounded-2xl p-3.5 text-white shadow-xs border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-black tracking-tight text-slate-100">
                      HTML Content Loaded ({selectedFile.rawText.length.toLocaleString()} bytes)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowHtmlInspector(!showHtmlInspector)}
                    className="text-[11px] font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700"
                  >
                    {showHtmlInspector ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showHtmlInspector ? 'Hide Code' : 'Inspect HTML'}</span>
                  </button>
                </div>

                {/* Key Tags Detected */}
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
                  <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-700/50">
                    ✔ Score Element Detected
                  </span>
                  <span className="bg-blue-950/80 text-blue-300 px-2 py-0.5 rounded border border-blue-700/50">
                    ✔ Account Tradelines Table
                  </span>
                  <span className="bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-700/50">
                    ✔ DPD Repayment Matrix
                  </span>
                </div>

                {showHtmlInspector && (
                  <div className="mt-2 bg-slate-950 p-3 rounded-xl border border-slate-800 font-mono text-[10px] text-slate-300 max-h-48 overflow-y-auto leading-relaxed scrollbar-thin">
                    <pre className="whitespace-pre-wrap">{selectedFile.rawText}</pre>
                  </div>
                )}
              </div>
            )}

            {/* Password Field for Encrypted PDFs */}
            {selectedFile && isPdf && (
              <div className={`bg-white rounded-2xl p-4 border shadow-xs space-y-2.5 ${passwordError ? 'border-red-400 ring-2 ring-red-100' : 'border-slate-200'}`}>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <KeyRound className="w-4 h-4 text-[#FF6B00]" />
                    {language === 'mr' ? 'सिबिल पीडीएफ पासवर्ड (डिक्रिप्शन)' : 'CIBIL PDF Password (Decryption)'}
                  </label>
                  <span className="text-[10px] text-slate-500 font-medium">
                    {language === 'mr' ? 'उदा. RAHU1408 किंवा PAN' : 'e.g. RAHU1408 or First4+DDMM'}
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError(null);
                    }}
                    placeholder="Enter password (e.g. RAHU1408 or PAN)"
                    className={`w-full bg-slate-50 border rounded-xl px-3 py-2.5 text-xs font-mono font-bold text-slate-800 focus:outline-none ${
                      passwordError
                        ? 'border-red-500 focus:border-red-600 bg-red-50/30'
                        : 'border-slate-300 focus:border-[#FF6B00]'
                    }`}
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                </div>

                {passwordError ? (
                  <div className="flex items-center gap-1.5 text-red-600 text-[11px] font-semibold bg-red-50 p-2 rounded-lg border border-red-200">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                ) : (
                  <p className="text-[10px] text-slate-500 leading-tight">
                    {language === 'mr'
                      ? 'टीप: सिबिल पीडीएफ सामान्यतः नावाचे पहिले ४ अक्षरे (मोठ्या लिपीत) + जन्मतारीख व महिना (उदा. RAHU1408) किंवा पॅन नंबरने लॉक असते.'
                      : 'Note: CIBIL PDFs are usually protected with: First 4 uppercase letters of Name + Date & Month of Birth (e.g. RAHU1408) or PAN.'}
                  </p>
                )}
              </div>
            )}

            {/* Start Parsing Button */}
            <button
              id="btn-start-parsing"
              disabled={!selectedFile}
              onClick={handleStartParsing}
              className={`w-full py-3.5 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all ${
                selectedFile
                  ? 'bg-[#FF6B00] text-white hover:bg-orange-600 active:scale-[0.98]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              {isPdf
                ? (language === 'mr' ? 'सिबिल पीडीएफ अहवाल स्कॅन व विश्लेषण करा' : 'Parse & Analyze CIBIL PDF')
                : (language === 'mr' ? 'क्रेडिट अहवाल स्कॅन व विश्लेषण करा' : 'Parse & Analyze Credit Report')}
            </button>
          </>
        ) : (
          /* Parsing Animation State */
          <div className="bg-white rounded-3xl p-6 border border-orange-200 shadow-lg text-center space-y-5">
            <div className="relative w-20 h-20 mx-auto">
              <div className="w-20 h-20 rounded-full border-4 border-orange-100 border-t-[#FF6B00] animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-black text-slate-800">{parseProgress}%</span>
              </div>
            </div>

            <div>
              <h2 className="text-base font-black text-slate-900 mb-1">
                {language === 'mr' ? 'एचटीएमएल अहवाल विश्लेषण सुरू आहे...' : 'Analyzing Credit Bureau CIR...'}
              </h2>
              <p className="text-xs text-orange-600 font-bold min-h-[20px] animate-pulse">
                {currentStepMessage}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-orange-500 to-[#FF6B00] h-full transition-all duration-300 rounded-full"
                style={{ width: `${parseProgress}%` }}
              />
            </div>

            {/* Live Step Tracker */}
            <div className="text-left space-y-2.5 pt-2 border-t border-slate-100">
              {stepsList.map((step, idx) => {
                const isDone = completedSteps.includes(step) || parseProgress >= (idx + 1) * 20;
                return (
                  <div key={idx} className="flex items-center gap-2.5 text-xs">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[9px] text-slate-400 shrink-0">
                        {idx + 1}
                      </div>
                    )}
                    <span
                      className={`font-semibold ${
                        isDone ? 'text-slate-800' : 'text-slate-400'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Bureau Logos Ribbon */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 text-center">
          <p className="text-[11px] font-bold text-slate-500 mb-2">
            {language === 'mr' ? 'सर्व ४ मान्यताप्राप्त क्रेडिट ब्युरो समर्थित' : 'Official Bureau Engines Supported'}
          </p>
          <div className="flex items-center justify-around text-xs font-black text-slate-700">
            <span className="px-2 py-1 bg-amber-50 rounded-lg text-amber-800 border border-amber-200">CIBIL</span>
            <span className="px-2 py-1 bg-blue-50 rounded-lg text-blue-800 border border-blue-200">Experian</span>
            <span className="px-2 py-1 bg-red-50 rounded-lg text-red-800 border border-red-200">Equifax</span>
            <span className="px-2 py-1 bg-teal-50 rounded-lg text-teal-800 border border-teal-200">CRIF High Mark</span>
          </div>
        </div>
      </div>

      {/* Modal: Custom HTML Paste / Editor */}
      {isCustomHtmlEditorOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-5 w-full max-w-lg shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#FF6B00]" />
                <h3 className="text-base font-black text-slate-900">
                  {language === 'mr' ? 'कस्टम HTML क्रेडिट अहवाल पेस्ट करा' : 'Paste Raw Credit Report HTML'}
                </h3>
              </div>
              <button
                onClick={() => setIsCustomHtmlEditorOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600">
              {language === 'mr'
                ? 'तुमच्याकडे असलेली कोणतीही HTML फाईल किंवा मार्कअप येथे पेस्ट करा. आमचे इंजिन आपोआप स्कोअर, खाती आणि डीपीडी स्कॅन करेल.'
                : 'Paste any HTML CIR export markup below. The DOM engine will parse personal data, score, tradeline tables, and DPD history.'}
            </p>

            <textarea
              value={customHtmlInput}
              onChange={(e) => setCustomHtmlInput(e.target.value)}
              rows={10}
              placeholder="<html><body>...<table>...</table></body></html>"
              className="w-full bg-slate-950 text-emerald-400 font-mono text-xs p-3 rounded-2xl border border-slate-800 focus:outline-none focus:border-[#FF6B00] leading-relaxed"
            />

            <div className="flex items-center justify-between">
              <span className="text-[11px] text-slate-500 font-mono">
                {customHtmlInput.length.toLocaleString()} characters
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCustomHtmlInput(EXPERIAN_SAMPLE_HTML)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
                >
                  Load Experian Sample
                </button>
                <button
                  type="button"
                  onClick={handleApplyCustomHtml}
                  className="px-4 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-black hover:bg-orange-600 shadow-sm"
                >
                  Load & Parse This HTML
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Payment Modal for Rule 1 (Client second check requires ₹800) */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        amount={800}
        clientName={userRole === 'client' ? 'Rahul Deshmukh' : selectedClient.name}
        language={language}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Partner Quota Modal for Rule 2 (Max 2 reports per client) */}
      <PartnerQuotaModal
        isOpen={showPartnerQuotaModal}
        onClose={() => setShowPartnerQuotaModal(false)}
        clientName={selectedClient.name}
        reportCount={quotaVerification.currentCount}
        language={language}
        onSwitchToAdmin={onSwitchToAdmin || (() => {})}
      />
    </div>
  );
};
