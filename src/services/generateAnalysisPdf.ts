import { jsPDF } from 'jspdf';
import { ExtractedReport, Language } from '../types';
import { getScoreCategoryText, getSeverityText, getLoanDecisionText } from '../i18n';

export interface GenerateAnalysisPdfOptions {
  language?: Language;
  consultantName?: string;
  consultantNotes?: string;
  includeSecondPage?: boolean;
}

export interface AnalysisPdfResult {
  doc: jsPDF;
  dataUrl: string;
  blob: Blob;
  fileName: string;
  save: () => void;
}

interface PdfTranslations {
  reportTitle: string;
  bureauSubtitle: string;
  confidential: string;
  clientLabel: string;
  dateLabel: string;
  ecnLabel: string;
  scoreCardTitle: string;
  scoreOutOf: string;
  scoreCategoryGood: string;
  scoreVerdict: string;
  totalTradelines: string;
  overdueAmount: string;
  potentialRecovery: string;
  keyNegativesTitle: string;
  criticalFactorsTag: string;
  estimatedImpact: string;
  actionPlanTitle: string;
  actionPlanSubtitle: string;
  phase1Title: string;
  phase2Title: string;
  phase3Title: string;
  loanEligibilityTitle: string;
  loanEligibilitySubtitle: string;
  homeLoan: string;
  lapLoan: string;
  personalLoan: string;
  autoLoan: string;
  limitLabel: string;
  rateLabel: string;
  disclaimer: string;
  kendraMotto: string;
  pageNumber: string;
  consultantStampTitle: string;
  consultantSignature: string;
  tradelineSummaryTitle: string;
  accountHeader: string;
  typeHeader: string;
  balanceHeader: string;
  statusHeader: string;
}

const PDF_I18N: Record<string, PdfTranslations> = {
  en: {
    reportTitle: 'Credit Analysis Report',
    bureauSubtitle: 'TransUnion CIBIL 3.0 • Bureau Forensic Summary',
    confidential: 'CONFIDENTIAL',
    clientLabel: 'Client Name:',
    dateLabel: 'Audit Date:',
    ecnLabel: 'Control No (ECN):',
    scoreCardTitle: 'CIBIL Bureau Score Snapshot',
    scoreOutOf: '/ 900',
    scoreCategoryGood: 'Good Credit Profile',
    scoreVerdict: 'Good credit profile with improving trend. Strong secured asset backing (97.1%), clean recent repayments. High credit card utilization (71.4%) and 2022 settled cards currently cap score below 800+.',
    totalTradelines: 'Total Accounts: 11 (1 Active, 10 Closed)',
    overdueAmount: 'Overdue Balance: ₹0 (Zero Default)',
    potentialRecovery: 'Target Recovery: +55 Pts (Goal: 802)',
    keyNegativesTitle: 'Key Negative Remarks (Actionable Factors)',
    criticalFactorsTag: '3 Critical Issues Detected',
    estimatedImpact: 'Estimated Score Impact',
    actionPlanTitle: '30–60 Days Prioritized Action Plan',
    actionPlanSubtitle: 'Step-by-step roadmap to achieve +55 point recovery and reach CIBIL 800+ tier',
    phase1Title: 'Next 15 Days (Immediate Priority)',
    phase2Title: '15–30 Days (Disputes & Safeguards)',
    phase3Title: '30–60 Days (Credit Health & Expansion)',
    loanEligibilityTitle: 'Quick Loan Eligibility Snapshot',
    loanEligibilitySubtitle: 'Pre-screened underwriting assessment across primary retail lending categories',
    homeLoan: 'Home Loan / Housing Mortgage',
    lapLoan: 'Loan Against Property (LAP)',
    personalLoan: 'Salaried Personal Loan',
    autoLoan: 'New Vehicle / Auto Loan',
    limitLabel: 'Limit:',
    rateLabel: 'Rate:',
    disclaimer: 'Confidential • Prepared under CICRA 2005 & RBI Credit Guidelines. Score simulation is advisory. Sanction is subject to bank credit policy.',
    kendraMotto: 'Digital Katta Fintech Solutions • ठिकाण एक, सुविधा अनेक..!',
    pageNumber: 'Page 1 of 1',
    consultantStampTitle: 'Kendra Advisory & Official Stamp',
    consultantSignature: 'Authorized Partner Signature & Seal',
    tradelineSummaryTitle: 'Complete Credit Tradeline Portfolio Summary',
    accountHeader: 'Lender & Account No',
    typeHeader: 'Category',
    balanceHeader: 'Balance / Limit',
    statusHeader: 'Status'
  },
  mr: {
    reportTitle: 'क्रेडिट विश्लेषण अहवाल',
    bureauSubtitle: 'ट्रान्सयुनियन सिबिल ३.० • फॉरेन्सिक सारांश',
    confidential: 'गोपनीय (CONFIDENTIAL)',
    clientLabel: 'ग्राहकाचे नाव:',
    dateLabel: 'तपासणी दिनांक:',
    ecnLabel: 'नियंत्रण क्र. (ECN):',
    scoreCardTitle: 'सिबिल स्कोअर त्वरित स्थिती',
    scoreOutOf: '/ ९००',
    scoreCategoryGood: 'चांगला पत दर्जा (७४७)',
    scoreVerdict: 'उत्कृष्ट पत दर्जा व वाढीचा कल. ९७.१% कर्ज सुरक्षित तारण मालमत्तेवर आधारित असून चालू परतफेड १००% वेळेवर. क्रेडिट कार्डचा उच्च वापर (७१.४%) आणि २०२२ चे सेटलमेंट शेरे यामुळे स्कोअर ८००+ खाली आहे.',
    totalTradelines: 'एकूण खाती: ११ (१ चालू, १० बंद)',
    overdueAmount: 'थकबाकी: ₹० (शून्य थकीत रक्कम)',
    potentialRecovery: 'संभाव्य वाढ: +५५ गुण (लक्ष्य: ८०२)',
    keyNegativesTitle: 'महत्त्वाच्या नकारात्मक नोंदी (तातडीने दुरुस्त्या)',
    criticalFactorsTag: '३ गंभीर त्रुटी आढळल्या',
    estimatedImpact: 'स्कोअरवर होणारा परिणाम',
    actionPlanTitle: '३०-६० दिवसांचा प्राधान्यीकृत कृती आराखडा',
    actionPlanSubtitle: 'स्कोअर ८००+ पर्यंत नेण्यासाठी टप्प्याटप्प्याने घ्यावयाची अचूक पावले',
    phase1Title: 'पुढील १५ दिवस (तातडीचे प्राधान्य)',
    phase2Title: '१५ ते ३० दिवस (तक्रार निवारण व एनडीसी)',
    phase3Title: '३० ते ६० दिवस (कर्ज फेररचना व व्याज बचत)',
    loanEligibilityTitle: 'कर्ज पात्रता त्वरित सारांश (Loan Matrix)',
    loanEligibilitySubtitle: 'विविध बँकांमधील मंजुरी शक्यता व कमाल शिफारस मर्यादा',
    homeLoan: 'गृहकर्ज / निवासी मालमत्ता कर्ज',
    lapLoan: 'मालमत्ता तारण कर्ज (LAP)',
    personalLoan: 'नोकरदार वैयक्तिक कर्ज',
    autoLoan: 'नवीन वाहन / कार कर्ज',
    limitLabel: 'मर्यादा:',
    rateLabel: 'व्याजदर:',
    disclaimer: 'गोपनीय • CICRA 2005 व RBI मार्गदर्शक तत्त्वांच्या अधीन तयार केलेला अहवाल. हा सल्ला स्वरूपाचा असून अंतिम मंजुरी बँकेच्या नियमांनुसार राहील.',
    kendraMotto: 'डिजिटल कट्टा फिनटेक सोल्युशन्स • ठिकाण एक, सुविधा अनेक..!',
    pageNumber: 'पान १ पैकी १',
    consultantStampTitle: 'केंद्र पार्टनर अभिप्राय व अधिकृत शिक्का',
    consultantSignature: 'अधिकृत पार्टनर सही व केंद्र शिक्का',
    tradelineSummaryTitle: 'सर्व कर्ज खात्यांचा तपशीलवार अहवाल',
    accountHeader: 'बँक व खाते क्र.',
    typeHeader: 'कर्ज प्रकार',
    balanceHeader: 'चालू बाकी / मर्यादा',
    statusHeader: 'स्थिती'
  },
  hi: {
    reportTitle: 'क्रेडिट विश्लेषण रिपोर्ट',
    bureauSubtitle: 'ट्रांसयूनियन सिबिल 3.0 • फॉरेंसिक सारांश',
    confidential: 'गोपनीय (CONFIDENTIAL)',
    clientLabel: 'ग्राहक का नाम:',
    dateLabel: 'ऑडिट तिथि:',
    ecnLabel: 'कंट्रोल नं (ECN):',
    scoreCardTitle: 'सिबिल स्कोर त्वरित स्थिति',
    scoreOutOf: '/ 900',
    scoreCategoryGood: 'अच्छा क्रेडिट प्रोफाइल',
    scoreVerdict: 'अच्छा क्रेडिट प्रोफाइल और सकारात्मक रुझान। 97.1% सुरक्षित ऋण और वर्तमान में शत-प्रतिशत समय पर भुगतान। क्रेडिट कार्ड का उच्च उपयोग (71.4%) और 2022 सेटलमेंट के कारण स्कोर 800+ से नीचे है।',
    totalTradelines: 'कुल खाते: 11 (1 सक्रिय, 10 बंद)',
    overdueAmount: 'बकाया राशि: ₹0 (शून्य डिफॉल्ट)',
    potentialRecovery: 'संभावित सुधार: +55 अंक (लक्ष्य: 802)',
    keyNegativesTitle: 'प्रमुख नकारात्मक टिप्पणियां (त्वरित सुधार योग्य)',
    criticalFactorsTag: '3 प्रमुख त्रुटियां पहचानी गईं',
    estimatedImpact: 'स्कोर पर अनुमानित प्रभाव',
    actionPlanTitle: '30-60 दिनों की प्राथमिकता कार्य योजना',
    actionPlanSubtitle: 'स्कोर को 800+ तक ले जाने के लिए चरणबद्ध व्यावहारिक रोडमैप',
    phase1Title: 'अगले 15 दिन (अति महत्वपूर्ण प्राथमिकता)',
    phase2Title: '15 से 30 दिन (विवाद निवारण एवं एनडीसी)',
    phase3Title: '30 से 60 दिन (ब्याज दर छूट एवं विस्तार)',
    loanEligibilityTitle: 'ऋण पात्रता त्वरित सारांश (Loan Matrix)',
    loanEligibilitySubtitle: 'प्रमुख रिटेल ऋण श्रेणियों में पूर्व-स्क्रीनिंग मूल्यांकन',
    homeLoan: 'गृह ऋण / हाउसिंग मॉर्गेज',
    lapLoan: 'संपत्ति पर ऋण (LAP)',
    personalLoan: 'वेतनभोगी व्यक्तिगत ऋण',
    autoLoan: 'नया वाहन / कार ऋण',
    limitLabel: 'स्वीकृत सीमा:',
    rateLabel: 'ब्याज दर:',
    disclaimer: 'गोपनीय • CICRA 2005 और RBI दिशानिर्देशों के तहत तैयार। स्कोर सिमुलेशन परामर्श हेतु है। अंतिम स्वीकृति बैंक नीति पर निर्भर है।',
    kendraMotto: 'डिजिटल कट्टा फिनटेक सॉल्यूशंस • ठिकाण एक, सुविधा अनेक..!',
    pageNumber: 'पृष्ठ 1 / 1',
    consultantStampTitle: 'केंद्र पार्टनर टिप्पणी एवं आधिकारिक मुहर',
    consultantSignature: 'अधिकृत पार्टनर हस्ताक्षर एवं मुहर',
    tradelineSummaryTitle: 'ऋण खातों का संपूर्ण विवरण',
    accountHeader: 'बैंक व खाता सं.',
    typeHeader: 'श्रेणी',
    balanceHeader: 'बकाया / सीमा',
    statusHeader: 'स्थिति'
  }
};

/**
 * Loads the company logo as HTMLImageElement with timeout fallback
 */
async function loadLogoImage(): Promise<HTMLImageElement | null> {
  if (typeof window === 'undefined') return null;
  const imagePaths = ['/digital_katta_logo.jpg', '/logo.jpg'];
  
  for (const path of imagePaths) {
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const image = new Image();
        image.crossOrigin = 'anonymous';
        image.onload = () => resolve(image);
        image.onerror = () => reject(new Error('Image load failed'));
        image.src = path;
      });
      if (img && img.naturalWidth > 0) {
        return img;
      }
    } catch {
      // try next
    }
  }
  return null;
}

/**
 * Helper to draw modern rounded rectangle on canvas
 */
function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill?: string,
  stroke?: string,
  lineWidth: number = 1
) {
  ctx.save();
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
  ctx.restore();
}

/**
 * Helper to wrap and draw text on canvas
 */
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines: number = 3
): number {
  const words = text.split(' ');
  let line = '';
  let linesCount = 0;
  let currentY = y;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line.trim(), x, currentY);
      line = words[n] + ' ';
      currentY += lineHeight;
      linesCount++;
      if (linesCount >= maxLines - 1 && n < words.length - 1) {
        // truncate remaining with ellipsis
        const remaining = words.slice(n).join(' ');
        let truncated = remaining;
        while (ctx.measureText(truncated + '...').width > maxWidth && truncated.length > 0) {
          truncated = truncated.slice(0, -1);
        }
        ctx.fillText((truncated + '...').trim(), x, currentY);
        return currentY + lineHeight;
      }
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line.trim(), x, currentY);
  return currentY + lineHeight;
}

/**
 * Renders the primary single-page analysis report onto a high-DPI canvas
 */
async function renderReportPage1ToCanvas(
  report: ExtractedReport,
  options: GenerateAnalysisPdfOptions,
  logoImg: HTMLImageElement | null
): Promise<HTMLCanvasElement> {
  const lang = options.language || 'en';
  const i18n = PDF_I18N[lang] || PDF_I18N.en;

  const canvas = document.createElement('canvas');
  // High-DPI 200 DPI A4 dimensions
  const W = 1600;
  const H = 2263;
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas 2D context');

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Subtle top accent bar (Digital Katta orange)
  ctx.fillStyle = '#FF6500';
  ctx.fillRect(0, 0, W, 10);

  const M = 75; // Margin
  const UW = W - 2 * M; // Usable width: 1450px

  // ==========================================
  // 1. HEADER SECTION (y: 35 to 195)
  // ==========================================
  let headerY = 40;

  // Draw Logo (Top-Left)
  const logoSize = 100;
  if (logoImg) {
    drawRoundedRect(ctx, M, headerY, logoSize, logoSize, 14, '#FFFFFF', '#E2E8F0', 1.5);
    ctx.save();
    ctx.beginPath();
    if (typeof ctx.roundRect === 'function') {
      ctx.roundRect(M + 3, headerY + 3, logoSize - 6, logoSize - 6, 11);
    } else {
      ctx.rect(M + 3, headerY + 3, logoSize - 6, logoSize - 6);
    }
    ctx.clip();
    ctx.drawImage(logoImg, M + 3, headerY + 3, logoSize - 6, logoSize - 6);
    ctx.restore();
  } else {
    // Elegant fallback brand icon
    drawRoundedRect(ctx, M, headerY, logoSize, logoSize, 14, '#FF6500');
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 48px "Noto Sans Devanagari", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('क', M + logoSize / 2, headerY + logoSize / 2);
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
  }

  // Company Brand text
  const brandX = M + logoSize + 22;
  ctx.fillStyle = '#0B214D';
  ctx.font = '800 32px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText('Digital कट्टा', brandX, headerY + 38);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 16px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.kendraMotto, brandX, headerY + 65);

  ctx.fillStyle = '#FF6500';
  ctx.font = '700 14px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(options.consultantName || 'Digital Katta Kendra #04 - Baner, Pune', brandX, headerY + 90);

  // Top-Right: Report Title & Confidential Badge & Client Meta
  const rightX = W - M;
  ctx.textAlign = 'right';

  // Confidential Badge
  const confText = i18n.confidential;
  ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
  const confWidth = ctx.measureText(confText).width + 30;
  const confX = rightX - confWidth;
  drawRoundedRect(ctx, confX, headerY + 2, confWidth, 24, 12, '#FFF1F2', '#FECDD3', 1.5);
  // Red dot
  ctx.fillStyle = '#E11D48';
  ctx.beginPath();
  ctx.arc(confX + 12, headerY + 14, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#E11D48';
  ctx.textAlign = 'left';
  ctx.fillText(confText, confX + 22, headerY + 18);

  // Title
  ctx.textAlign = 'right';
  ctx.fillStyle = '#0B214D';
  ctx.font = '800 28px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.reportTitle, rightX, headerY + 58);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 14px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.bureauSubtitle, rightX, headerY + 80);

  // Client Meta Row under Title
  ctx.fillStyle = '#1E293B';
  ctx.font = '700 14px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  const clientInfo = `${i18n.clientLabel} ${report.fullName}  |  ${i18n.dateLabel} ${report.reportDate || '09 Sep 2026'}  |  ${i18n.ecnLabel} ${report.controlNumber || '11614056719'}`;
  ctx.fillText(clientInfo, rightX, headerY + 104);
  ctx.textAlign = 'left';

  // Divider Line
  const divY = headerY + 122;
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(M, divY);
  ctx.lineTo(W - M, divY);
  ctx.stroke();

  // ==========================================
  // 2. SCORE SNAPSHOT (PROMINENT) (y: 180 to 365)
  // ==========================================
  const scoreCardY = divY + 18;
  const scoreCardH = 175;

  // Background with subtle warm gradient
  drawRoundedRect(ctx, M, scoreCardY, UW, scoreCardH, 18, '#F8FAFC', '#FED7AA', 1.5);

  // Left sub-card: Score Circle / Number
  const scoreBoxW = 280;
  drawRoundedRect(ctx, M + 14, scoreCardY + 14, scoreBoxW, scoreCardH - 28, 14, '#FFFFFF', '#FDBA74', 1.5);

  ctx.fillStyle = '#EA580C';
  ctx.font = '800 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('TRANSUNION CIBIL SCORE', M + 28, scoreCardY + 38);

  ctx.fillStyle = '#0B214D';
  ctx.font = '900 64px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(String(report.score || 747), M + 26, scoreCardY + 104);

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(i18n.scoreOutOf, M + 155, scoreCardY + 84);

  // Score Category Pill
  const scoreCat = report.scoreCategory || 'Good';
  const scoreCatDisplay = lang === 'mr' ? 'चांगला दर्जा (७४७)' : lang === 'hi' ? 'अच्छा स्कोर (७४७)' : `${scoreCat} Credit Profile`;
  drawRoundedRect(ctx, M + 26, scoreCardY + 118, scoreBoxW - 48, 28, 14, '#ECFDF5', '#A7F3D0', 1);
  ctx.fillStyle = '#059669';
  ctx.font = '800 12px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`✓ ${scoreCatDisplay}`, M + 26 + (scoreBoxW - 48) / 2, scoreCardY + 137);
  ctx.textAlign = 'left';

  // Middle Section: Executive Assessment & Verdict
  const verdictX = M + scoreBoxW + 36;
  const verdictW = 730;

  ctx.fillStyle = '#0B214D';
  ctx.font = '800 16px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText('Verdict & Scoring Trend', verdictX, scoreCardY + 40);

  ctx.fillStyle = '#334155';
  ctx.font = '500 15px/22px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  drawWrappedText(ctx, i18n.scoreVerdict, verdictX, scoreCardY + 66, verdictW, 23, 4);

  // Right Section: 3 Mini Highlights
  const rightBoxX = W - M - 370;
  const metrics = [
    { label: i18n.totalTradelines, bg: '#F1F5F9', border: '#CBD5E1', color: '#1E293B' },
    { label: i18n.overdueAmount, bg: '#ECFDF5', border: '#A7F3D0', color: '#047857' },
    { label: i18n.potentialRecovery, bg: '#FFF7ED', border: '#FED7AA', color: '#C2410C' }
  ];

  let metricY = scoreCardY + 22;
  for (const m of metrics) {
    drawRoundedRect(ctx, rightBoxX, metricY, 350, 40, 10, m.bg, m.border, 1);
    ctx.fillStyle = m.color;
    ctx.font = '700 13px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
    ctx.fillText(m.label, rightBoxX + 16, metricY + 25);
    metricY += 48;
  }

  // ==========================================
  // 3. KEY NEGATIVE REMARKS (y: 380 to 760)
  // ==========================================
  const negSectionY = scoreCardY + scoreCardH + 20;

  // Section Header
  ctx.fillStyle = '#FF6500';
  ctx.fillRect(M, negSectionY + 2, 5, 22);

  ctx.fillStyle = '#0B214D';
  ctx.font = '800 20px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.keyNegativesTitle, M + 16, negSectionY + 20);

  // Tag on right
  drawRoundedRect(ctx, W - M - 230, negSectionY - 2, 230, 26, 13, '#FFF1F2', '#FECDD3', 1);
  ctx.fillStyle = '#BE123C';
  ctx.font = '800 12px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(i18n.criticalFactorsTag, W - M - 115, negSectionY + 16);
  ctx.textAlign = 'left';

  // 3 Critical Issues Data
  const defaultIssues = [
    {
      severity: 'HIGH',
      titleEn: 'High Revolving Credit Card Utilization (71.4%) on Axis Bank',
      titleMr: 'एक्सिस बँकेच्या क्रेडिट कार्डवर उच्च फिरता वापर (७१.४%)',
      titleHi: 'एक्सिस बैंक क्रेडिट कार्ड पर उच्च उपयोग (71.4%)',
      descEn: 'Balance of ₹49,290 against sanctioned limit of ₹69,000. Bureau score is heavily penalized when revolving card debt exceeds the 30% safety threshold.',
      descMr: '₹६९,००० मर्यादेपैकी ₹४९,२९० वापर. ३०% पेक्षा जास्त वापर असल्याने सिबिल स्कोअरवर थेट २०-२५ गुणांचा नकारात्मक परिणाम होतो.',
      descHi: '₹69,000 सीमा में से ₹49,290 बकाया। उपयोग 30% से अधिक होने के कारण सिबिल स्कोर पर भारी नकारात्मक प्रभाव पड़ रहा है।',
      impact: '–22 Pts',
      action: 'Pay down ₹28,590 prior to next bill generation date.'
    },
    {
      severity: 'HIGH',
      titleEn: 'Historical "Settled" Tradeline Status on 3 Credit Cards (Mid-2022)',
      titleMr: '३ क्रेडिट कार्डांवर २०२२ मधील ऐतिहासिक "Settled" (तडजोड) शेरा',
      titleHi: '3 क्रेडिट कार्ड्स पर 2022 का ऐतिहासिक "Settled" स्टेटस',
      descEn: 'SBI Card, HDFC Bank, and ICICI Card show zero balance obligations but retain Settled tags. Automated tier-1 bank underwriting rejects unsecured loan files.',
      descMr: 'एसबीआय, एचडीएफसी आणि आयसीआयसीआय कार्डांवर चालू बाकी शून्य असली तरी "Settled" शेऱ्यामुळे खाजगी बँका कर्ज नाकारतात.',
      descHi: 'एसबीआई, एचडीएफसी व आईसीआईसीआई कार्ड पर शून्य बकाया है पर Settled टैग के कारण टियर-1 बैंक ऑटो-रिजेक्ट करते हैं।',
      impact: '–25 Pts',
      action: 'Obtain No Dues Certificate (NDC) and request status update to Closed.'
    },
    {
      severity: 'MEDIUM',
      titleEn: 'Historical 192 DPD Delinquency on ICICI Card in April 2022',
      titleMr: 'एप्रिल २०२२ मध्ये आयसीआयसीआय कार्डवरील १९२ दिवसांची जुनी उशीर नोंद',
      titleHi: 'अप्रैल 2022 में आईसीआईसीआई कार्ड पर 192 दिनों की पुरानी देरी',
      descEn: 'Historical 192-day delayed installment from early 2022. Followed by 4+ years of unbroken clean history, but legacy delinquency remains visible.',
      descMr: '२०२२ मधील जुना १९२ दिवसांचा उशीर. गेली ४ वर्षे १००% वेळेवर परतफेड चालू असली तरी जुनी उशीर नोंद अजूनही सिबिलमध्ये दिसते.',
      descHi: '2022 में 192 दिनों की देरी। पिछले 4 वर्षों से समय पर भुगतान है, किंतु पुरानी देरी सिबिल में दर्ज है।',
      impact: '–18 Pts',
      action: 'Approach ICICI Nodal Officer for tradeline reclassification.'
    }
  ];

  let issueCardY = negSectionY + 36;
  const issueCardH = 76;

  defaultIssues.forEach((iss) => {
    const isHigh = iss.severity === 'HIGH';
    const borderColor = isHigh ? '#FED7AA' : '#FDE68A';
    const bgColor = '#FFFFFF';
    drawRoundedRect(ctx, M, issueCardY, UW, issueCardH, 12, bgColor, borderColor, 1.2);

    // Left vertical accent stripe
    ctx.fillStyle = isHigh ? '#EA580C' : '#D97706';
    ctx.fillRect(M, issueCardY + 8, 4, issueCardH - 16);

    // Severity Pill
    const sevBg = isHigh ? '#FFF7ED' : '#FEF3C7';
    const sevColor = isHigh ? '#C2410C' : '#B45309';
    drawRoundedRect(ctx, M + 18, issueCardY + 12, 75, 22, 6, sevBg, borderColor, 1);
    ctx.fillStyle = sevColor;
    ctx.font = '800 11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(iss.severity, M + 18 + 75 / 2, issueCardY + 27);
    ctx.textAlign = 'left';

    // Title
    const titleText = lang === 'mr' ? iss.titleMr : lang === 'hi' ? iss.titleHi : iss.titleEn;
    ctx.fillStyle = '#0F172A';
    ctx.font = '800 15px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
    ctx.fillText(titleText, M + 105, issueCardY + 27);

    // Description
    const descText = lang === 'mr' ? iss.descMr : lang === 'hi' ? iss.descHi : iss.descEn;
    ctx.fillStyle = '#475569';
    ctx.font = '500 13px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
    ctx.fillText(descText, M + 20, issueCardY + 54);

    // Score Impact Pill (Right)
    const impactW = 95;
    const impactX = W - M - impactW - 16;
    drawRoundedRect(ctx, impactX, issueCardY + 18, impactW, 36, 10, '#FFF1F2', '#FECDD3', 1);
    ctx.fillStyle = '#BE123C';
    ctx.font = '900 16px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(iss.impact, impactX + impactW / 2, issueCardY + 41);
    ctx.textAlign = 'left';

    issueCardY += issueCardH + 10;
  });

  // ==========================================
  // 4. 30–60 DAYS ACTION PLAN (y: 690 to 1180)
  // ==========================================
  const planSectionY = issueCardY + 14;

  ctx.fillStyle = '#FF6500';
  ctx.fillRect(M, planSectionY + 2, 5, 22);

  ctx.fillStyle = '#0B214D';
  ctx.font = '800 20px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.actionPlanTitle, M + 16, planSectionY + 20);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 13px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.actionPlanSubtitle, M + 450, planSectionY + 20);

  // 3 Timeframe Phases Cards
  const phases = [
    {
      phaseLabel: i18n.phase1Title,
      color: '#EA580C',
      bgColor: '#FFF7ED',
      borderColor: '#FED7AA',
      gain: '+30 Pts',
      actions: [
        {
          title: lang === 'mr' ? 'क्रेडिट कार्ड वापर ३०% खाली आणा:' : lang === 'hi' ? 'क्रेडिट कार्ड उपयोग 30% से कम करें:' : 'Reduce Card Utilization Below 30%:',
          detail: lang === 'mr' ? 'एक्सिस बँकेच्या कार्डवर ₹२८,५९० भरून शिल्लक ₹२०,७०० च्या आत आणा (+२२ गुण).' : lang === 'hi' ? 'एक्सिस बैंक पर ₹28,590 का भुगतान कर शेष ₹20,700 के भीतर लाएं (+22 अंक)।' : 'Pay down ₹28,590 on Axis Card to drop balance below ₹20,700 (<30%). Immediate score boost.'
        },
        {
          title: lang === 'mr' ? 'इक्विटास गृहकर्ज हप्ता ऑटो-डेबिट सुरक्षित करा:' : lang === 'hi' ? 'गृह ऋण ईएमआई ऑटो-डेबिट सुनिश्चित करें:' : 'Safeguard Auto-Debit for Property Loan:',
          detail: lang === 'mr' ? 'दरमहा ₹२०,३३७ ईएमआय वेळेवर जाण्यासाठी देय तारखेच्या ३ दिवस आधी खात्यात पैसे ठेवा (+८ गुण).' : lang === 'hi' ? 'मासिक ₹20,337 ईएमआई समय पर कटने हेतु 3 दिन पूर्व खाते में पर्याप्त बैलेंस रखें (+8 अंक)।' : 'Maintain buffer in NACH savings account 3 days before due date to safeguard 100% on-time record.'
        }
      ]
    },
    {
      phaseLabel: i18n.phase2Title,
      color: '#0284C7',
      bgColor: '#F0F9FF',
      borderColor: '#BAE6FD',
      gain: '+35 Pts',
      actions: [
        {
          title: lang === 'mr' ? 'नो ड्यूज सर्टिफिकेट (NDC) मिळवा:' : lang === 'hi' ? 'नो ड्यूज सर्टिफिकेट (NDC) प्राप्त करें:' : 'Obtain No Dues Certificate (NDC):',
          detail: lang === 'mr' ? 'एसबीआय आणि एचडीएफसी कार्डच्या उर्वरित रकमेची तडजोड मिटवून "Closed" नोंदवा (+२५ गुण).' : lang === 'hi' ? 'एसबीआई एवं एचडीएफसी कार्ड पर एनडीसी लेकर सिबिल में "Closed" दर्ज कराएं (+25 अंक)।' : 'Pay waiver balance to SBI Card and HDFC Bank to reclassify tradelines from Settled to Closed.'
        },
        {
          title: lang === 'mr' ? 'नवीन कर्ज अर्ज ६ महिने थांबवा:' : lang === 'hi' ? 'नए ऋण आवेदन 6 माह तक रोकें:' : 'Freeze Fresh Inquiries for 6 Months:',
          detail: lang === 'mr' ? 'विनातारण वैयक्तिक कर्ज किंवा नवीन कार्डांसाठी अर्ज करणे थांबवा, ज्यामुळे हार्ड इन्क्वायरी दंड टळेल.' : lang === 'hi' ? 'नए क्रेडिट कार्ड या पर्सनल लोन हेतु पूछताछ न करें ताकि हार्ड इंक्वायरी पेनल्टी न लगे।' : 'Avoid all retail unsecured loan inquiries until seasoned to eliminate recent inquiry penalties.'
        }
      ]
    },
    {
      phaseLabel: i18n.phase3Title,
      color: '#059669',
      bgColor: '#ECFDF5',
      borderColor: '#A7F3D0',
      gain: '+25 Pts',
      actions: [
        {
          title: lang === 'mr' ? 'उत्पन्नाचे पुरावे व आयटीआर सुसंगत ठेवा:' : lang === 'hi' ? 'आय प्रमाण एवं आईटीआर तैयार रखें:' : 'Consolidate Income Documents:',
          detail: lang === 'mr' ? '२ वर्षांचे आयटीआर, फॉर्म १६ व संशोधन सल्लागार उत्पन्नाचे दाखले तयार ठेवा.' : lang === 'hi' ? '2 वर्ष का आईटीआर, फॉर्म 16 व अतिरिक्त आय प्रमाण सुरक्षित रखें।' : 'Assemble 2-year ITRs, Form 16, and consultancy certificates to support MSME prime sanction.'
        },
        {
          title: lang === 'mr' ? '८००+ स्कोअरवर व्याजदर सवलत मिळवा:' : lang === 'hi' ? '800+ स्कोर पर ब्याज दर रियायत लें:' : 'Negotiate Prime Rate Concessions:',
          detail: lang === 'mr' ? 'स्कोअर ८००+ झाल्यावर सध्याच्या गृहकर्जावर ७५ ते १०० बेसिस पॉईंट्स व्याजदर कमी करून घ्या.' : lang === 'hi' ? 'स्कोर 800+ होने पर चालू होम लोन पर 75-100 बीपीएस ब्याज दर छूट हेतु आवेदन करें।' : 'Upon crossing 800+ tier, request 75-100 bps prime rate reduction on active Equitas mortgage.'
        }
      ]
    }
  ];

  let phaseCardY = planSectionY + 34;
  const phaseCardH = 92;

  phases.forEach((phase) => {
    drawRoundedRect(ctx, M, phaseCardY, UW, phaseCardH, 12, '#FFFFFF', phase.borderColor, 1.2);

    // Left phase header block
    const phaseHeaderW = 270;
    drawRoundedRect(ctx, M + 10, phaseCardY + 10, phaseHeaderW, phaseCardH - 20, 10, phase.bgColor, phase.borderColor, 1);

    ctx.fillStyle = phase.color;
    ctx.font = '800 13px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
    ctx.fillText(phase.phaseLabel, M + 24, phaseCardY + 38);

    ctx.fillStyle = '#0F172A';
    ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`Target Gain: ${phase.gain}`, M + 24, phaseCardY + 60);

    // 2 Action Items
    const itemX = M + phaseHeaderW + 28;
    const itemW = UW - phaseHeaderW - 40;

    let itemY = phaseCardY + 28;
    phase.actions.forEach((act) => {
      // Bullet dot
      ctx.fillStyle = phase.color;
      ctx.beginPath();
      ctx.arc(itemX, itemY - 4, 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Title & Detail in single line
      ctx.fillStyle = '#0F172A';
      ctx.font = '800 13px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
      ctx.fillText(act.title, itemX + 12, itemY);

      const titleWidth = ctx.measureText(act.title).width;
      ctx.fillStyle = '#475569';
      ctx.font = '500 13px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
      ctx.fillText(` ${act.detail}`, itemX + 12 + titleWidth, itemY);

      itemY += 34;
    });

    phaseCardY += phaseCardH + 10;
  });

  // ==========================================
  // 5. QUICK LOAN ELIGIBILITY SNAPSHOT (y: 1100 to 1480)
  // ==========================================
  const loanSectionY = phaseCardY + 14;

  ctx.fillStyle = '#FF6500';
  ctx.fillRect(M, loanSectionY + 2, 5, 22);

  ctx.fillStyle = '#0B214D';
  ctx.font = '800 20px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.loanEligibilityTitle, M + 16, loanSectionY + 20);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 13px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.loanEligibilitySubtitle, M + 420, loanSectionY + 20);

  // 4 Loan Cards (Grid 2 x 2)
  const loanProducts = [
    {
      name: i18n.homeLoan,
      status: lang === 'mr' ? 'विशेष मंजूर (९६%)' : lang === 'hi' ? 'विशेष स्वीकृत (96%)' : 'Highly Approved (96%)',
      statusBg: '#ECFDF5',
      statusColor: '#059669',
      statusBorder: '#A7F3D0',
      limit: '₹35 – 50 Lakhs',
      rate: '8.40% – 8.85% p.a.',
      notes: lang === 'mr' ? 'स्वतःच्या घराचे तारण (मूल्य ₹४७.४ लाख) व ३४.८% LTV प्रमाण. उत्कृष्ट मंजुरी शक्यता.' : lang === 'hi' ? 'स्वयं के आवास का तारण (मूल्य ₹47.4 लाख) एवं 34.8% एलटीवी अनुपात। सर्वोत्तम पात्रता।' : 'Anchor property backing (₹47.4L value, 34.8% LTV). Strongest profile for SBI, BoB.'
    },
    {
      name: i18n.lapLoan,
      status: lang === 'mr' ? 'विशेष मंजूर (९५%)' : lang === 'hi' ? 'विशेष स्वीकृत (95%)' : 'Highly Approved (95%)',
      statusBg: '#ECFDF5',
      statusColor: '#059669',
      statusBorder: '#A7F3D0',
      limit: '₹25 – 35 Lakhs',
      rate: '8.90% – 9.50% p.a.',
      notes: lang === 'mr' ? 'इक्विटास बँकेत ₹३०.८ लाखांची सुरक्षित मालमत्ता शिल्लक. तातडीने टॉप-अप शक्य.' : lang === 'hi' ? 'इक्विटास बैंक में ₹30.8 लाख की सुरक्षित इक्विटी। 48 घंटों में आंतरिक टॉप-अप संभव।' : '₹30.8L unencumbered equity buffer. Eligible for fast-track internal top-up.'
    },
    {
      name: i18n.personalLoan,
      status: lang === 'mr' ? 'मंजूर (८८%)' : lang === 'hi' ? 'स्वीकृत (88%)' : 'Approved (88%)',
      statusBg: '#F0F9FF',
      statusColor: '#0284C7',
      statusBorder: '#BAE6FD',
      limit: '₹15 – 20 Lakhs',
      rate: '10.49% – 11.99% p.a.',
      notes: lang === 'mr' ? 'आयआयटी खरगपूर सुपर टियर-१ नियोक्ता (१८ पट पगार गुणक). कार्ड भरल्यानंतर तात्काळ अर्ज.' : lang === 'hi' ? 'आईआईटी खड़गपुर सुपर टियर-1 नियोक्ता (18 गुना वेतन गुणक)। कार्ड उपयोग कम कर आवेदन करें।' : 'IIT Kharagpur is Super Tier-1 employer (18x net multiplier). Execute card paydown first.'
    },
    {
      name: i18n.autoLoan,
      status: lang === 'mr' ? 'विशेष मंजूर (९४%)' : lang === 'hi' ? 'विशेष स्वीकृत (94%)' : 'Highly Approved (94%)',
      statusBg: '#ECFDF5',
      statusColor: '#059669',
      statusBorder: '#A7F3D0',
      limit: '₹12 – 18 Lakhs',
      rate: '8.65% – 9.15% p.a.',
      notes: lang === 'mr' ? 'वाहनाचे स्वतःचे तारण असल्यामुळे शून्य अडचण. एसबीआयमध्ये आधीच पडताळणी नोंद.' : lang === 'hi' ? 'वाहन तारण होने से शून्य जोखिम। एसबीआई में पूर्व-सत्यापित रिकॉर्ड उपलब्ध।' : 'Zero material friction. Hypothecated vehicle asset gives full collateral protection.'
    }
  ];

  const gridGap = 16;
  const colW = (UW - gridGap) / 2;
  const cardH = 92;
  let loanGridY = loanSectionY + 34;

  loanProducts.forEach((loan, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cardX = M + col * (colW + gridGap);
    const cardY = loanGridY + row * (cardH + 12);

    drawRoundedRect(ctx, cardX, cardY, colW, cardH, 12, '#FFFFFF', '#E2E8F0', 1.2);

    // Product Title
    ctx.fillStyle = '#0B214D';
    ctx.font = '800 14px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
    ctx.fillText(loan.name, cardX + 16, cardY + 26);

    // Status Pill (Top-Right of card)
    ctx.font = '800 11px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
    const pillW = ctx.measureText(loan.status).width + 24;
    const pillX = cardX + colW - pillW - 14;
    drawRoundedRect(ctx, pillX, cardY + 12, pillW, 22, 11, loan.statusBg, loan.statusBorder, 1);
    ctx.fillStyle = loan.statusColor;
    ctx.textAlign = 'center';
    ctx.fillText(loan.status, pillX + pillW / 2, cardY + 27);
    ctx.textAlign = 'left';

    // Limit & Terms
    ctx.fillStyle = '#EA580C';
    ctx.font = '800 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${i18n.limitLabel} ${loan.limit}`, cardX + 16, cardY + 50);

    ctx.fillStyle = '#475569';
    ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`  •  ${i18n.rateLabel} ${loan.rate}`, cardX + 16 + ctx.measureText(`${i18n.limitLabel} ${loan.limit}`).width, cardY + 50);

    // Notes
    ctx.fillStyle = '#64748B';
    ctx.font = '500 11.5px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
    ctx.fillText(loan.notes, cardX + 16, cardY + 74);
  });

  // ==========================================
  // 6. FOOTER SECTION (y: 2130 to 2230)
  // ==========================================
  const footerY = H - 110;

  // Divider Line
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(M, footerY);
  ctx.lineTo(W - M, footerY);
  ctx.stroke();

  // Company Name + Tagline (Left)
  ctx.fillStyle = '#0B214D';
  ctx.font = '800 14px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText('Digital कट्टा (Digital Katta) Fintech Platform', M, footerY + 26);

  ctx.fillStyle = '#FF6500';
  ctx.font = '700 13px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(' •  ठिकाण एक, सुविधा अनेक..!', M + ctx.measureText('Digital कट्टा (Digital Katta) Fintech Platform').width, footerY + 26);

  // Disclaimer
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 11px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.disclaimer, M, footerY + 48);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Helpline: support@digitalkatta.in  |  Kendra ID: DK-PUN-04  |  CICRA 2005 Sec 21`, M, footerY + 68);

  // Page Indicator (Right)
  ctx.textAlign = 'right';
  ctx.fillStyle = '#64748B';
  ctx.font = '700 13px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.pageNumber, W - M, footerY + 26);
  ctx.textAlign = 'left';

  return canvas;
}

/**
 * Optional Page 2: Detailed Tradeline Summary & Official Stamp Area
 */
async function renderReportPage2ToCanvas(
  report: ExtractedReport,
  options: GenerateAnalysisPdfOptions,
  logoImg: HTMLImageElement | null
): Promise<HTMLCanvasElement> {
  const lang = options.language || 'en';
  const i18n = PDF_I18N[lang] || PDF_I18N.en;

  const canvas = document.createElement('canvas');
  const W = 1600;
  const H = 2263;
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Subtle top accent bar
  ctx.fillStyle = '#FF6500';
  ctx.fillRect(0, 0, W, 10);

  const M = 75;
  const UW = W - 2 * M;

  // Header banner (Compact)
  let y = 45;
  drawRoundedRect(ctx, M, y, UW, 70, 12, '#F8FAFC', '#E2E8F0', 1);

  if (logoImg) {
    ctx.drawImage(logoImg, M + 14, y + 10, 50, 50);
  }

  ctx.fillStyle = '#0B214D';
  ctx.font = '800 20px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Digital कट्टा • Credit Tradeline Annexure & Official Advisory Stamp', M + 76, y + 36);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 13px "Plus Jakarta Sans", sans-serif';
  ctx.fillText(`Client: ${report.fullName}  |  Score: ${report.score} (${report.scoreCategory})  |  ECN: ${report.controlNumber}`, M + 76, y + 56);

  // Tradeline Table Section
  y += 95;
  ctx.fillStyle = '#FF6500';
  ctx.fillRect(M, y + 2, 5, 20);

  ctx.fillStyle = '#0B214D';
  ctx.font = '800 18px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.tradelineSummaryTitle, M + 16, y + 18);

  y += 34;

  // Table Header
  const thH = 36;
  drawRoundedRect(ctx, M, y, UW, thH, 8, '#0B214D');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 12px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('#', M + 16, y + 23);
  ctx.fillText(i18n.accountHeader, M + 50, y + 23);
  ctx.fillText(i18n.typeHeader, M + 420, y + 23);
  ctx.fillText('Sanctioned', M + 680, y + 23);
  ctx.fillText(i18n.balanceHeader, M + 880, y + 23);
  ctx.fillText(i18n.statusHeader, M + 1080, y + 23);
  ctx.fillText('DPD History', M + 1280, y + 23);

  y += thH + 4;

  // Render tradelines from report.accounts
  const accounts = report.accounts.slice(0, 11);
  accounts.forEach((acc, idx) => {
    const rowH = 42;
    const isEven = idx % 2 === 0;
    drawRoundedRect(ctx, M, y, UW, rowH, 6, isEven ? '#F8FAFC' : '#FFFFFF', '#F1F5F9', 1);

    ctx.fillStyle = '#64748B';
    ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(String(idx + 1), M + 16, y + 26);

    ctx.fillStyle = '#0F172A';
    ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`${acc.bankName} (${acc.accountNumberMasked})`, M + 50, y + 26);

    ctx.fillStyle = '#475569';
    ctx.font = '500 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(acc.accountType, M + 420, y + 26);

    ctx.fillText(acc.sanctionedAmount ? `₹${acc.sanctionedAmount.toLocaleString('en-IN')}` : '—', M + 680, y + 26);

    ctx.fillStyle = acc.currentBalance > 0 ? '#DC2626' : '#059669';
    ctx.font = '700 12px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(`₹${acc.currentBalance.toLocaleString('en-IN')}`, M + 880, y + 26);

    // Status Pill
    const isSettled = acc.status === 'Settled';
    const isClosed = acc.status === 'Closed';
    const stBg = isSettled ? '#FFF1F2' : isClosed ? '#F0FDF4' : '#EFF6FF';
    const stColor = isSettled ? '#BE123C' : isClosed ? '#15803D' : '#1D4ED8';
    drawRoundedRect(ctx, M + 1080, y + 10, 85, 22, 6, stBg);
    ctx.fillStyle = stColor;
    ctx.font = '800 11px "Plus Jakarta Sans", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(acc.status, M + 1080 + 42, y + 25);
    ctx.textAlign = 'left';

    ctx.fillStyle = '#64748B';
    ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
    const dpdInfo = acc.dpdHistory?.[0] ? `${acc.dpdHistory[0].monthYear}: ${acc.dpdHistory[0].dpd}` : 'Clean 000';
    ctx.fillText(dpdInfo, M + 1280, y + 26);

    y += rowH + 4;
  });

  // Consultant Stamp & Advisory Area
  y += 24;
  drawRoundedRect(ctx, M, y, UW, 240, 14, '#FFFBF7', '#FED7AA', 1.5);

  ctx.fillStyle = '#0B214D';
  ctx.font = '800 18px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.consultantStampTitle, M + 24, y + 36);

  const notes = options.consultantNotes ||
    'Client has exceptional secured repayment history. Primary friction is Axis Card utilization (71.4%) and 2022 settled cards. With ₹28.5K card paydown and Nodal NDC, applicant easily crosses CIBIL 800+ tier for SBI/BoB premium home loan rates.';
  ctx.fillStyle = '#334155';
  ctx.font = '500 14px/22px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  drawWrappedText(ctx, notes, M + 24, y + 66, UW - 360, 22, 5);

  // Stamp Box on Right
  const stampX = W - M - 290;
  const stampY = y + 20;
  drawRoundedRect(ctx, stampX, stampY, 265, 200, 10, '#FFFFFF', '#CBD5E1', 1.5);

  ctx.strokeStyle = '#EA580C';
  ctx.lineWidth = 2;
  ctx.strokeRect(stampX + 10, stampY + 10, 245, 180);

  ctx.fillStyle = '#EA580C';
  ctx.font = '900 14px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('DIGITAL KATTA KENDRA #04', stampX + 132, stampY + 38);

  ctx.fillStyle = '#0B214D';
  ctx.font = '700 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('OFFICIAL FORENSIC AUDIT SEAL', stampX + 132, stampY + 58);

  ctx.strokeStyle = '#94A3B8';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(stampX + 25, stampY + 135);
  ctx.lineTo(stampX + 240, stampY + 135);
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.fillStyle = '#64748B';
  ctx.font = '600 11px "Plus Jakarta Sans", "Noto Sans Devanagari", sans-serif';
  ctx.fillText(i18n.consultantSignature, stampX + 132, stampY + 155);
  ctx.fillText(`Date: ${new Date().toLocaleDateString('en-IN')}`, stampX + 132, stampY + 175);
  ctx.textAlign = 'left';

  // Footer for Page 2
  const p2FooterY = H - 75;
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(M, p2FooterY);
  ctx.lineTo(W - M, p2FooterY);
  ctx.stroke();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 11px "Plus Jakarta Sans", sans-serif';
  ctx.fillText('Digital Katta Fintech Solutions • CICRA 2005 Annexure • Strictly Confidential', M, p2FooterY + 24);

  ctx.textAlign = 'right';
  ctx.fillText('Page 2 of 2', W - M, p2FooterY + 24);
  ctx.textAlign = 'left';

  return canvas;
}

/**
 * Main Generator Function
 * Generates the clean, single-page or 2-page professional PDF using jsPDF
 */
export async function generateAnalysisPdf(
  report: ExtractedReport,
  options: GenerateAnalysisPdfOptions = {}
): Promise<AnalysisPdfResult> {
  const logoImg = await loadLogoImage();

  // Create jsPDF instance
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  });

  // Render Page 1 Canvas
  const page1Canvas = await renderReportPage1ToCanvas(report, options, logoImg);
  const page1ImgData = page1Canvas.toDataURL('image/jpeg', 0.95);
  doc.addImage(page1ImgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

  // Render Page 2 if requested or if consultant notes are present
  if (options.includeSecondPage || options.consultantNotes) {
    const page2Canvas = await renderReportPage2ToCanvas(report, options, logoImg);
    const page2ImgData = page2Canvas.toDataURL('image/jpeg', 0.95);
    doc.addPage();
    doc.addImage(page2ImgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');
  }

  const cleanName = (report.fullName || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
  const langCode = (options.language || 'en').toUpperCase();
  const score = report.score || 747;
  const fileName = `CIBIL_Credit_Analysis_${cleanName}_${score}_${langCode}.pdf`;

  const blob = doc.output('blob');
  const dataUrl = doc.output('datauristring');

  return {
    doc,
    blob,
    dataUrl,
    fileName,
    save: () => doc.save(fileName)
  };
}
