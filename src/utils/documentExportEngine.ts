import { ExtractedReport, Language, CreditAccount, DetectedIssue, ActionPlanItem, LoanRecommendation, CirAuditPillar } from '../types';
import { getLanguageDetails, SUPPORTED_LANGUAGES } from '../i18n';
import { getLocalizedDisputeLetter, getScoreCategoryText, getSeverityText, getLoanDecisionText } from '../i18n';

export type ExportDocumentType = 'PROFESSIONAL_ANALYSIS_PDF' | 'FULL_AUDIT_REPORT' | 'LEGAL_DISPUTE_NOTICE' | 'LOAN_ELIGIBILITY_SUMMARY';

export interface DocumentExportOptions {
  language: Language;
  documentType?: ExportDocumentType;
  consultantName?: string;
  consultantNotes?: string;
  disputeBank?: string;
  disputeAccount?: string;
  disputeReason?: string;
}

interface DocumentLocale {
  docTitle: string;
  docSubtitle: string;
  kendraTitle: string;
  kendraMotto: string;
  clientName: string;
  cibilScore: string;
  controlNumber: string;
  reportDate: string;
  sec1Title: string;
  sec2Title: string;
  sec3Title: string;
  sec4Title: string;
  sec5Title: string;
  sec6Title: string;
  sec7Title: string;
  sec8Title: string;
  personalDetails: string;
  employmentContact: string;
  fullName: string;
  dob: string;
  ageGender: string;
  pan: string;
  occupation: string;
  incomeStatus: string;
  mobile: string;
  email: string;
  idVerified: string;
  scoreCardTitle: string;
  scoreAssessment: string;
  scoringRange: string;
  scoreTrajectory: string;
  trajectoryPositive: string;
  utilizationTitle: string;
  utilizationWarning: string;
  sevenPointDesc: string;
  thPillar: string;
  thDimension: string;
  thWeightScore: string;
  thMetricBenchmark: string;
  thFindingsAdvice: string;
  portfolioSummary: string;
  totalAccounts: string;
  zeroBalanceAccounts: string;
  overdueAmount: string;
  totalHighCredit: string;
  currentBalance: string;
  creditVintage: string;
  thBank: string;
  thType: string;
  thAccountNo: string;
  thSanctioned: string;
  thBalance: string;
  thStatus: string;
  actionRequired: string;
  potentialGain: string;
  scoreRoadmapTitle: string;
  loanEligibilityDesc: string;
  thLoanFacility: string;
  thOddsLimit: string;
  thRateEmi: string;
  thTargetLenders: string;
  thFrictionPoints: string;
  thCompensating: string;
  verdictTitle: string;
  verdictText: string;
  consultantNotesLabel: string;
  statutoryFooter1: string;
  statutoryFooter2: string;
  disputeHeading: string;
}

const DOCUMENT_LOCALES: Record<Language, DocumentLocale> = {
  mr: {
    docTitle: 'सखोल सिबिल क्रेडिट विश्लेषण व ७-मुद्दे फॉरेन्सिक ऑडिट अहवाल',
    docSubtitle: 'ट्रान्सयुनियन सिबिल / एक्सपेरियन क्रेडिट इन्फॉर्मेशन अहवाल • डिजिटल कट्टा फिनटेक प्लॅटफॉर्म',
    kendraTitle: 'डिजिटल कट्टा',
    kendraMotto: 'ठिकाण एक, सुविधा अनेक..!',
    clientName: 'ग्राहकाचे नाव',
    cibilScore: 'सिबिल स्कोअर',
    controlNumber: 'नियंत्रण क्रमांक (ECN)',
    reportDate: 'तपासणी दिनांक',
    sec1Title: '१. ग्राहक माहिती व ओळख पडताळणी (KYC Verification)',
    sec2Title: '२. क्रेडिट स्कोअर सखोल विश्लेषण (Score Deep Dive)',
    sec3Title: '३. ७-मुद्दे फॉरेन्सिक सिबिल ऑडिट (Credit Dost मानके)',
    sec4Title: '४. क्रेडिट पोर्टफोलिओ व सर्व बँक खात्यांची स्थिती',
    sec5Title: '५. सिबिल त्रुटी शोध व स्कोअरवरील परिणाम',
    sec6Title: '६. प्राधान्यीकृत स्कोअर सुधारणा कृती योजना (० ते १२ महिने)',
    sec7Title: '७. संस्थात्मक कर्ज पात्रता व बँक निकष मॅट्रिक्स',
    sec8Title: '८. अंतिम सल्लागार निष्कर्ष व कायदेशीर नियम',
    personalDetails: 'वैयक्तिक तपशील',
    employmentContact: 'रोजगार व संपर्क तपशील',
    fullName: 'पूर्ण नाव:',
    dob: 'जन्म तारीख:',
    ageGender: 'वय / लिंग:',
    pan: 'पॅन क्रमांक:',
    occupation: 'व्यवसाय / नोकरी:',
    incomeStatus: 'उत्पन्न पडताळणी:',
    mobile: 'मोबाईल क्रमांक:',
    email: 'ईमेल:',
    idVerified: 'ओळख पडताळणी स्थिती: सर्व प्राथमिक ओळख कागदपत्रे व पत्ता प्रमाणित.',
    scoreCardTitle: 'CIBIL TransUnion Score 3.0 संस्थात्मक मानक',
    scoreAssessment: 'क्रेडिट रेटिंग',
    scoringRange: 'स्कोअर श्रेणी: ३०० ते ९०० • राष्ट्रीय स्थान: भारतीय कर्जदारांमध्ये उच्चस्थानी',
    scoreTrajectory: 'स्कोअर कल (Trajectory)',
    trajectoryPositive: '▲ सुधारणा सुरू (सकारात्मक कल - वेळेवर परतफेडीचा इतिहास)',
    utilizationTitle: 'क्रेडिट कार्ड वापर प्रमाण (Utilization)',
    utilizationWarning: '⚠ कार्ड वापरावर मर्यादा ठेवल्यास त्वरित +२० ते +३५ गुण वाढतील',
    sevenPointDesc: 'आरबीआय मास्टर मार्गदर्शक तत्त्वे व संस्थात्मक कर्ज मंजुरी मानकांवर आधारित ७ प्रमुख खांबांची तांत्रिक तपासणी.',
    thPillar: 'मुद्दा',
    thDimension: 'ऑडिट निकष',
    thWeightScore: 'स्कोअर व महत्त्व',
    thMetricBenchmark: 'सध्याचे मूल्य व नियम',
    thFindingsAdvice: 'तपासणी निष्कर्ष व सुधारणा सल्ला',
    portfolioSummary: 'पोर्टफोलिओ सारांश',
    totalAccounts: 'एकूण खाती:',
    zeroBalanceAccounts: 'शून्य शिल्लक खाती:',
    overdueAmount: 'थकीत रक्कम (Overdue):',
    totalHighCredit: 'एकूण मंजूर मर्यादा:',
    currentBalance: 'सध्याची एकूण शिल्लक:',
    creditVintage: 'क्रेडिट इतिहास कालावधी:',
    thBank: 'बँक / वित्त संस्था',
    thType: 'कर्ज प्रकार',
    thAccountNo: 'खाते क्रमांक',
    thSanctioned: 'मंजूर रक्कम',
    thBalance: 'सध्याची शिल्लक',
    thStatus: 'स्थिती',
    actionRequired: 'आवश्यक कृती:',
    potentialGain: 'संभाव्य गुण वाढ:',
    scoreRoadmapTitle: 'अपेक्षित स्कोअर वाढीचा मार्ग (Roadmap):',
    loanEligibilityDesc: 'विविध बँक श्रेणी (PSU, खाजगी बँका, SFB) नुसार कर्ज मंजुरी शक्यता, व्याजदर व मासिक हप्ता अंदाज.',
    thLoanFacility: 'कर्ज सुविधा',
    thOddsLimit: 'मंजुरी शक्यता व कमाल मर्यादा',
    thRateEmi: 'अपेक्षित व्याज व मासिक हप्ता (EMI)',
    thTargetLenders: 'शिफारस केलेल्या बँका',
    thFrictionPoints: 'बँक तपासणीतील अडचणी',
    thCompensating: 'पडताळणी अनुकूल बाबी',
    verdictTitle: 'संस्थात्मक कर्ज मंजुरी निष्कर्ष: शिफारस पात्र (APPROVED)',
    verdictText: 'ग्राहकाचा सिबिल इतिहास सुरक्षित कर्जे व व्यवसाय कर्जासाठी अत्यंत अनुकूल आहे.',
    consultantNotesLabel: 'डिजिटल कट्टा केंद्र पार्टनर नोंद:',
    statutoryFooter1: 'डिजिटल कट्टा फिनटेक ब्युरो इंटेलिजन्स • अधिकृत सिबिल अहवाल विश्लेषण इंजिन',
    statutoryFooter2: 'क्रेडिट इन्फॉर्मेशन कंपनीज रेग्युलेशन ॲक्ट (CICRA 2005) कलम २१(३) अन्वये ३० दिवसांच्या आत त्रुटी दुरुस्ती करणे बँकांना बंधनकारक आहे.',
    disputeHeading: 'CICRA 2005 कलम २१ अधिकृत कायदेशीर निवारण नोटीस'
  },
  en: {
    docTitle: 'Comprehensive CIBIL Credit Analysis & 7-Point Forensic Audit Report',
    docSubtitle: 'TransUnion CIBIL / Experian Credit Information Report • Digital Katta CIR 3.0 Platform',
    kendraTitle: 'Digital Katta',
    kendraMotto: 'One Destination, Multiple Services..!',
    clientName: 'Client Name',
    cibilScore: 'CIBIL Score',
    controlNumber: 'Control Number (ECN)',
    reportDate: 'Audit Date',
    sec1Title: '1. Consumer Information & KYC Verification',
    sec2Title: '2. Credit Score Deep Dive & Trajectory',
    sec3Title: '3. The 7-Point Forensic CIR Audit (Credit Dost Standard)',
    sec4Title: '4. Credit Portfolio & Active Accounts Summary',
    sec5Title: '5. Inaccuracy Detection & Impact Ranking',
    sec6Title: '6. Prioritized Action Plan (0 - 12 Months)',
    sec7Title: '7. Institutional Loan Eligibility & Underwriting Matrix',
    sec8Title: '8. Executive Underwriting Verdict & Legal Disclosures',
    personalDetails: 'Personal Details',
    employmentContact: 'Employment & Contact Details',
    fullName: 'Full Name:',
    dob: 'Date of Birth:',
    ageGender: 'Age / Gender:',
    pan: 'PAN Number:',
    occupation: 'Occupation:',
    incomeStatus: 'Income Status:',
    mobile: 'Mobile Phone:',
    email: 'Email:',
    idVerified: 'Identity Verification Status: All primary KYC credentials verified across credit bureaus.',
    scoreCardTitle: 'CIBIL TransUnion Score 3.0 Institutional Model',
    scoreAssessment: 'Credit Rating',
    scoringRange: 'Scoring Range: 300 to 900 • Percentile Positioning: Top Tier Indian Borrowers',
    scoreTrajectory: 'Score Trajectory',
    trajectoryPositive: '▲ Improving (Strong positive bias driven by clean payment history)',
    utilizationTitle: 'Revolving Credit Utilization',
    utilizationWarning: '⚠ Pay down revolving card balances to unlock +20 to +35 immediate points',
    sevenPointDesc: 'Forensic breakdown across the seven core institutional underwriting pillars defined by RBI Master Directions.',
    thPillar: 'Pillar',
    thDimension: 'Underwriting Dimension',
    thWeightScore: 'Weight & Score',
    thMetricBenchmark: 'Key Metric & Benchmark',
    thFindingsAdvice: 'Findings & Remediation Advice',
    portfolioSummary: 'Portfolio Summary',
    totalAccounts: 'Total Accounts:',
    zeroBalanceAccounts: 'Zero Balance Accounts:',
    overdueAmount: 'Overdue Amount:',
    totalHighCredit: 'Total Sanctioned Limit:',
    currentBalance: 'Current Total Balance:',
    creditVintage: 'Credit History Vintage:',
    thBank: 'Creditor / Bank',
    thType: 'Account Type',
    thAccountNo: 'Account Number',
    thSanctioned: 'Sanctioned',
    thBalance: 'Balance',
    thStatus: 'Status',
    actionRequired: 'Remediation Action:',
    potentialGain: 'Potential Score Gain:',
    scoreRoadmapTitle: 'Expected Score Recovery Roadmap:',
    loanEligibilityDesc: 'Sanction probabilities, borrowing limits, FOIR stress metrics, target lender panels (PSU / Private / SFB).',
    thLoanFacility: 'Loan Facility',
    thOddsLimit: 'Approval Odds & Limit',
    thRateEmi: 'Estimated Rate & EMI',
    thTargetLenders: 'Target Lenders',
    thFrictionPoints: 'Underwriter Friction Points',
    thCompensating: 'Compensating Factors',
    verdictTitle: 'INSTITUTIONAL UNDERWRITING VERDICT: APPROVED',
    verdictText: 'Applicant demonstrates strong creditworthiness for secured loans and qualified term facilities.',
    consultantNotesLabel: 'Digital Katta Kendra Partner Notes:',
    statutoryFooter1: 'Digital Katta Fintech Bureau Intelligence • Institutional CIR Analysis Engine',
    statutoryFooter2: 'Governed under Section 21(3) of CICRA 2005 (Statutory 30-day resolution mandate for credit institutions).',
    disputeHeading: 'CICRA 2005 Section 21 Statutory Dispute Notice'
  },
  hi: {
    docTitle: 'विस्तृत सिबिल क्रेडिट विश्लेषण एवं 7-बिंदु फॉरेंसिक ऑडिट रिपोर्ट',
    docSubtitle: 'ट्रांसयूनियन सिबिल / एक्सपेरियन क्रेडिट रिपोर्ट • डिजिटल कट्टा फिनटेक प्लेटफॉर्म',
    kendraTitle: 'डिजिटल कट्टा',
    kendraMotto: 'एक स्थान, अनेक सुविधाएं..!',
    clientName: 'ग्राहक का नाम',
    cibilScore: 'सिबिल स्कोर',
    controlNumber: 'कंट्रोल नंबर (ECN)',
    reportDate: 'रिपोर्ट दिनांक',
    sec1Title: '१. उपभोक्ता पहचान एवं केवाईसी सत्यापन (KYC Verification)',
    sec2Title: '२. क्रेडिट स्कोर गहन विश्लेषण (Score Deep Dive)',
    sec3Title: '३. ७-बिंदु फॉरेंसिक सिबिल ऑडिट (Credit Dost मानक)',
    sec4Title: '४. क्रेडिट पोर्टफोलियो एवं सक्रिय बैंक खातों का विवरण',
    sec5Title: '५. सिबिल विसंगति पहचान एवं स्कोर पर प्रभाव',
    sec6Title: '६. प्राथमिकता आधारित सुधार कार्ययोजना (० से १२ माह)',
    sec7Title: '७. संस्थागत ऋण पात्रता एवं बैंक स्वीकृति मैट्रिक्स',
    sec8Title: '८. अंतिम विशेषज्ञ निष्कर्ष एवं वैधानिक नियम',
    personalDetails: 'व्यक्तिगत विवरण',
    employmentContact: 'रोजगार एवं संपर्क विवरण',
    fullName: 'पूरा नाम:',
    dob: 'जन्म तिथि:',
    ageGender: 'आयु / लिंग:',
    pan: 'पैन संख्या:',
    occupation: 'व्यवसाय / पेशा:',
    incomeStatus: 'आय सत्यापन स्थिति:',
    mobile: 'मोबाइल नंबर:',
    email: 'ईमेल:',
    idVerified: 'पहचान सत्यापन: सभी प्राथमिक दस्तावेज प्रमाणित पाए गए।',
    scoreCardTitle: 'CIBIL TransUnion Score 3.0 संस्थागत मॉडल',
    scoreAssessment: 'क्रेडिट रेटिंग',
    scoringRange: 'स्कोर दायरा: ३०० से ९०० • राष्ट्रीय रैंकिंग: शीर्ष भारतीय उधारकर्ताओं में शामिल',
    scoreTrajectory: 'स्कोर रुझान (Trajectory)',
    trajectoryPositive: '▲ सुधार की ओर (सकारात्मक रुझान - समय पर भुगतान का इतिहास)',
    utilizationTitle: 'क्रेडिट कार्ड उपयोग अनुपात (Utilization)',
    utilizationWarning: '⚠ कार्ड बिल का समय पर भुगतान करने से तत्काल +२० से +३५ अंक बढ़ेंगे',
    sevenPointDesc: 'आरबीआई मास्टर निर्देशों एवं क्रेडिट ब्यूरो एल्गोरिदम पर आधारित ७ मुख्य स्तंभों का तकनीकी परीक्षण।',
    thPillar: 'स्तंभ',
    thDimension: 'ऑडिट आयाम',
    thWeightScore: 'स्कोर एवं भारांक',
    thMetricBenchmark: 'वर्तमान मान एवं मानक',
    thFindingsAdvice: 'निष्कर्ष एवं सुधार सलाह',
    portfolioSummary: 'पोर्टफोलियो सारांश',
    totalAccounts: 'कुल खाते:',
    zeroBalanceAccounts: 'शून्य शेष खाते:',
    overdueAmount: 'अतिदेय राशि (Overdue):',
    totalHighCredit: 'कुल स्वीकृत सीमा:',
    currentBalance: 'वर्तमान कुल शेष:',
    creditVintage: 'क्रेडिट इतिहास की अवधि:',
    thBank: 'बैंक / वित्तीय संस्थान',
    thType: 'ऋण प्रकार',
    thAccountNo: 'खाता संख्या',
    thSanctioned: 'स्वीकृत राशि',
    thBalance: 'वर्तमान शेष',
    thStatus: 'स्थिति',
    actionRequired: 'सुधार हेतु कदम:',
    potentialGain: 'संभावित अंक वृद्धि:',
    scoreRoadmapTitle: 'अपेक्षित स्कोर वृद्धि का रोडमैप:',
    loanEligibilityDesc: 'विभिन्न बैंक श्रेणियों (PSU, निजी बैंक, SFB) के अनुसार ऋण स्वीकृति की संभावना एवं अनुमानित ईएमआई।',
    thLoanFacility: 'ऋण सुविधा',
    thOddsLimit: 'स्वीकृति संभावना एवं अधिकतम सीमा',
    thRateEmi: 'अनुमानित ब्याज दर एवं ईएमआई (EMI)',
    thTargetLenders: 'लक्षित बैंक',
    thFrictionPoints: 'बैंक सत्यापन में संभावित अड़चनें',
    thCompensating: 'सकारात्मक सहायक कारक',
    verdictTitle: 'संस्थागत ऋण स्वीकृति निष्कर्ष: अनुशंसित (APPROVED)',
    verdictText: 'ग्राहक का क्रेडिट रिकॉर्ड सुरक्षित ऋण एवं व्यावसायिक ऋण हेतु अत्यंत उपयुक्त है।',
    consultantNotesLabel: 'डिजिटल कट्टा केंद्र पार्टनर टिप्पणी:',
    statutoryFooter1: 'डिजिटल कट्टा फिनटेक ब्यूरो इंटेलिजेंस • संस्थागत सिबिल रिपोर्ट विश्लेषण इंजन',
    statutoryFooter2: 'क्रेडिट इंफॉर्मेशन कंपनीज रेगुलेशन एक्ट (CICRA 2005) की धारा 21(3) के अंतर्गत ३० दिनों के भीतर निवारण अनिवार्य है।',
    disputeHeading: 'CICRA 2005 धारा 21 वैधानिक विवाद निवारण नोटिस'
  },
  gu: {
    docTitle: 'વિગતવાર સિબિલ ક્રેડિટ વિશ્લેષણ અને 7-પોઇન્ટ ફોરેન્સિક ઓડિટ રિપોર્ટ',
    docSubtitle: 'ટ્રાન્સયુનિયન સિબિલ / એક્સપિરિયન ક્રેડિટ ઇન્ફોર્મેશન રિપોર્ટ • ડિજિટલ કટ્ટા પ્લેટફોર્મ',
    kendraTitle: 'ડિજિટલ કટ્ટા',
    kendraMotto: 'એક સ્થળ, અનેક સુવિધાઓ..!',
    clientName: 'ગ્રાહકનું નામ',
    cibilScore: 'સિબિલ સ્કોર',
    controlNumber: 'કંટ્રોલ નંબર (ECN)',
    reportDate: 'ઓડિટ તારીખ',
    sec1Title: '૧. ગ્રાહક વિગતો અને ઓળખ ચકાસણી (KYC)',
    sec2Title: '૨. ક્રેડિટ સ્કોર ઊંડાણપૂર્વક વિશ્લેષણ',
    sec3Title: '૩. ૭-પોઇન્ટ ફોરેન્સિક સિબિલ ઓડિટ (Credit Dost સ્ટાન્ડર્ડ)',
    sec4Title: '૪. ક્રેડિટ પોર્ટફોલિયો અને ખાતાઓની વિગત',
    sec5Title: '૫. સિબિલ ક્ષતિઓ અને સ્કોર પર અસર',
    sec6Title: '૬. સ્કોર સુધારણા માટે અગ્રતા કાર્ય યોજના (૦ થી ૧૨ મહિના)',
    sec7Title: '૭. સંસ્થાકીય લોન પાત્રતા અને બેંકિંગ માપદંડ',
    sec8Title: '૮. અંતિમ નિષ્ણાત તારણ અને કાયદાકીય નિયમો',
    personalDetails: 'વ્યક્તિગત વિગતો',
    employmentContact: 'રોજગાર અને સંપર્ક વિગતો',
    fullName: 'પૂરું નામ:',
    dob: 'જન્મ તારીખ:',
    ageGender: 'ઉંમર / લિંગ:',
    pan: 'પાન નંબર:',
    occupation: 'વ્યવસાય:',
    incomeStatus: 'આવક ચકાસણી:',
    mobile: 'મોબાઇલ નંબર:',
    email: 'ઇમેઇલ:',
    idVerified: 'ઓળખ ચકાસણી સ્થિતિ: તમામ કેવાયસી દસ્તાવેજો પ્રમાણિત છે.',
    scoreCardTitle: 'CIBIL TransUnion Score 3.0 મોડેલ',
    scoreAssessment: 'ક્રેડિટ રેટિંગ',
    scoringRange: 'સ્કોર રેન્જ: ૩૦૦ થી ૯૦૦ • ભારતીય ઉધારકર્તાઓમાં ટોચનું સ્થાન',
    scoreTrajectory: 'સ્કોર વલણ (Trajectory)',
    trajectoryPositive: '▲ સુધારા તરફ (નિયમિત ચુકવણીથી મજબૂત સકારાત્મક વલણ)',
    utilizationTitle: 'ક્રેડિટ કાર્ડ વપરાશ દર',
    utilizationWarning: '⚠ કાર્ડ બેલેન્સ ઘટાડવાથી તાત્કાલિક +૨૦ થી +૩૫ પોઈન્ટ્સ વધશે',
    sevenPointDesc: 'આરબીઆઈ માર્ગદર્શિકા આધારિત ૭ મુખ્ય સ્તંભોનું ટેકનિકલ ઓડિટ.',
    thPillar: 'સ્તંભ',
    thDimension: 'ઓડિટ પરિમાણ',
    thWeightScore: 'વેઇટેજ અને સ્કોર',
    thMetricBenchmark: 'હાલનું મૂલ્ય અને માપદંડ',
    thFindingsAdvice: 'તારણો અને સુધારણા સલાહ',
    portfolioSummary: 'પોર્ટફોલિયો સારાંશ',
    totalAccounts: 'કુલ ખાતાઓ:',
    zeroBalanceAccounts: 'શૂન્ય બેલેન્સ ખાતાઓ:',
    overdueAmount: 'બાકી રકમ (Overdue):',
    totalHighCredit: 'કુલ મંજૂર મર્યાદા:',
    currentBalance: 'હાલનું કુલ બેલેન્સ:',
    creditVintage: 'ક્રેડિટ ઇતિહાસ સમયગાળો:',
    thBank: 'બેંક / નાણાકીય સંસ્થા',
    thType: 'લોન પ્રકાર',
    thAccountNo: 'ખાતા નંબર',
    thSanctioned: 'મંજૂર રકમ',
    thBalance: 'હાલનું બેલેન્સ',
    thStatus: 'સ્થિતિ',
    actionRequired: 'જરૂરી પગલાં:',
    potentialGain: 'સંભવિત પોઇન્ટ વધારો:',
    scoreRoadmapTitle: 'અપેક્ષિત સ્કોર સુધારણા રોડમેપ:',
    loanEligibilityDesc: 'વિવિધ બેંક શ્રેણીઓ અનુસાર લોન મંજૂરીની સંભાવના, વ્યાજદર અને EMI.',
    thLoanFacility: 'લોન સુવિધા',
    thOddsLimit: 'મંજૂરી શક્યતા અને મર્યાદા',
    thRateEmi: 'અંદાજિત વ્યાજદર અને EMI',
    thTargetLenders: 'યોગ્ય બેંકો',
    thFrictionPoints: 'બેંક વેરિફિકેશનમાં અડચણો',
    thCompensating: 'સહાયક પરિબળો',
    verdictTitle: 'સંસ્થાકીય લોન મંજૂરી તારણ: મંજૂર (APPROVED)',
    verdictText: 'સુરક્ષિત લોન અને બિઝનેસ લોન માટે ગ્રાહકનો પ્રોફાઇલ ઉત્તમ છે.',
    consultantNotesLabel: 'ડિજિટલ કટ્ટા કેન્દ્ર કન્સલ્ટન્ટ નોંધ:',
    statutoryFooter1: 'ડિજિટલ કટ્ટા ફિનટેક બ્યુરો ઇન્ટેલિજન્સ • સંસ્થાકીય CIR વિશ્લેષણ એન્જિન',
    statutoryFooter2: 'CICRA 2005 ની કલમ 21(3) હેઠળ ૩૦ દિવસમાં ક્ષતિ સુધારણા કાયદેસર ફરજિયાત છે.',
    disputeHeading: 'CICRA 2005 કલમ 21 કાનૂની વિવાદ નોટિસ'
  },
  bn: {
    docTitle: 'পূর্ণাঙ্গ সিবিল ক্রেডিট বিশ্লেষণ এবং ৭-দফা ফরেনসিক অডিট রিপোর্ট',
    docSubtitle: 'ট্রান্সইউনিয়ন সিবিল / এক্সপেরিয়ান ক্রেডিট তথ্য রিপোর্ট • ডিজিটাল কাট্টা প্ল্যাটফর্ম',
    kendraTitle: 'ডিজিটাল কাট্টা',
    kendraMotto: 'একটি স্থান, একাধিক পরিষেবা..!',
    clientName: 'গ্রাহকের নাম',
    cibilScore: 'সিবিল স্কোর',
    controlNumber: 'নিয়ন্ত্রণ নম্বর (ECN)',
    reportDate: 'অডিট তারিখ',
    sec1Title: '১. গ্রাহক তথ্য ও কেওয়াইসি পরিচয় যাচাইকরণ',
    sec2Title: '২. ক্রেডিট স্কোর গভীর বিশ্লেষণ ও গতিপ্রকৃতি',
    sec3Title: '৩. ৭-দফা ফরেনসিক সিবিল অডিট (Credit Dost মানদণ্ড)',
    sec4Title: '৪. ক্রেডিট পোর্টফোলিও এবং সক্রিয় অ্যাকাউন্টের বিবরণ',
    sec5Title: '৫. সিবিল ত্রুটি সনাক্তকরণ ও স্কোরের ওপর প্রভাব',
    sec6Title: '৬. অগ্রাধিকারমূলক স্কোর পুনরুদ্ধার কর্মপরিকল্পনা (০-১২ মাস)',
    sec7Title: '৭. প্রাতিষ্ঠানিক ঋণ যোগ্যতা ও ব্যাঙ্কিং ম্যাট্রিক্স',
    sec8Title: '৮. চূড়ান্ত বিশেষজ্ঞ সিদ্ধান্ত ও আইনি বিধান',
    personalDetails: 'ব্যক্তিগত তথ্য',
    employmentContact: 'কর্মসংস্থান ও যোগাযোগের বিবরণ',
    fullName: 'সম্পূর্ণ নাম:',
    dob: 'জন্ম তারিখ:',
    ageGender: 'বয়স / লিঙ্গ:',
    pan: 'প্যান নম্বর:',
    occupation: 'পেশা:',
    incomeStatus: 'আয় যাচাইকরণ:',
    mobile: 'মোবাইল নম্বর:',
    email: 'ইমেল:',
    idVerified: 'পরিচয় যাচাইকরণ অবস্থা: সমস্ত প্রাথমিক কেওয়াইসি নথি যাচাইকৃত।',
    scoreCardTitle: 'CIBIL TransUnion Score 3.0 প্রাতিষ্ঠানিক মডেল',
    scoreAssessment: 'ক্রেডিট রেটিং',
    scoringRange: 'স্কোর পরিসীমা: ৩০০ থেকে ৯০০ • ভারতীয় ঋণগ্রহীতাদের মধ্যে শীর্ষস্থান',
    scoreTrajectory: 'স্কোরের গতিপ্রকৃতি (Trajectory)',
    trajectoryPositive: '▲ উন্নতিশীল (সময়মতো পরিশোধের কারণে ইতিবাচক গতি)',
    utilizationTitle: 'ক্রেডিট কার্ড ব্যবহার অনুপাত',
    utilizationWarning: '⚠ কার্ড ব্যালেন্স পরিশোধ করলে অবিলম্বে +২০ থেকে +৩৫ পয়েন্ট বৃদ্ধি পাবে',
    sevenPointDesc: 'আরবিআই নির্দেশিকা ও ব্যুরো অ্যালগরিদম ভিত্তিক ৭টি প্রধান স্তম্ভের বিস্তারিত অডিট।',
    thPillar: 'দফা',
    thDimension: 'অডিট মাত্রা',
    thWeightScore: 'ওয়েটেজ ও স্কোর',
    thMetricBenchmark: 'বর্তমান মান ও বেঞ্চমার্ক',
    thFindingsAdvice: 'ফলাফল ও প্রতিকার পরামর্শ',
    portfolioSummary: 'পোর্টফোলিও সারসংক্ষেপ',
    totalAccounts: 'মোট অ্যাকাউন্ট:',
    zeroBalanceAccounts: 'শূন্য ব্যালেন্স অ্যাকাউন্ট:',
    overdueAmount: 'বকেয়া পরিমাণ (Overdue):',
    totalHighCredit: 'মোট অনুমোদিত সীমা:',
    currentBalance: 'বর্তমান মোট ব্যালেন্স:',
    creditVintage: 'ক্রেডিট ইতিহাসের সময়কাল:',
    thBank: 'ব্যাঙ্ক / আর্থিক প্রতিষ্ঠান',
    thType: 'ঋণের ধরন',
    thAccountNo: 'অ্যাকাউন্ট নম্বর',
    thSanctioned: 'অনুমোদিত',
    thBalance: 'ব্যালেন্স',
    thStatus: 'অবস্থা',
    actionRequired: 'প্রয়োজনীয় পদক্ষেপ:',
    potentialGain: 'সম্ভাব্য পয়েন্ট লাভ:',
    scoreRoadmapTitle: 'প্রত্যাশিত স্কোর বৃদ্ধির রোডম্যাপ:',
    loanEligibilityDesc: 'বিভিন্ন ব্যাঙ্ক বিভাগ অনুযায়ী ঋণ অনুমোদনের সম্ভাবনা, সুদের হার ও ইএমআই।',
    thLoanFacility: 'ঋণ সুবিধা',
    thOddsLimit: 'অনুমোদনের সম্ভাবনা ও সীমা',
    thRateEmi: 'আনুমানিক সুদের হার ও ইএমআই',
    thTargetLenders: 'উপযুক্ত ব্যাঙ্ক',
    thFrictionPoints: 'যাচাইকরণের জটিলতা',
    thCompensating: 'অনুকূল উপাদান',
    verdictTitle: 'প্রাতিষ্ঠানিক ঋণ অনুমোদন সিদ্ধান্ত: অনুমোদিত (APPROVED)',
    verdictText: 'সুরক্ষিত ঋণ এবং ব্যবসায়িক ঋণের জন্য আবেদনকারীর প্রোফাইল চমৎকার।',
    consultantNotesLabel: 'ডিজিটাল কাট্টা কেন্দ্র পরামর্শদাতার মন্তব্য:',
    statutoryFooter1: 'ডিজিটাল কাট্টা ফিনটেক ব্যুরো ইন্টেলিজেন্স • প্রাতিষ্ঠানিক CIR বিশ্লেষণ ইঞ্জিন',
    statutoryFooter2: 'CICRA 2005 এর ধারা 21(3) অনুযায়ী ৩০ দিনের মধ্যে ত্রুটি সমাধান বাধ্যতামূলক।',
    disputeHeading: 'CICRA 2005 ধারা 21 বিধিবদ্ধ বিরোধ নোটিশ'
  },
  ta: {
    docTitle: 'முழுமையான சிபில் கிரெடிட் பகுப்பாய்வு & 7-புள்ளி தடயவியல் தணிக்கை அறிக்கை',
    docSubtitle: 'டிரான்ஸ்யூனியன் சிபில் / எக்ஸ்பீரியன் அறிக்கை • டிஜிட்டல் கட்டா தளம்',
    kendraTitle: 'டிஜிட்டல் கட்டா',
    kendraMotto: 'ஒரே இடம், பல வசதிகள்..!',
    clientName: 'வாடிக்கையாளர் பெயர்',
    cibilScore: 'சிபில் மதிப்பெண்',
    controlNumber: 'கட்டுப்பாட்டு எண் (ECN)',
    reportDate: 'தணிக்கை தேதி',
    sec1Title: '1. நுகர்வோர் விவரங்கள் & KYC சரிபார்ப்பு',
    sec2Title: '2. கிரெடிட் ஸ்கோர் ஆழமான பகுப்பாய்வு',
    sec3Title: '3. 7-புள்ளி சிபில் தணிக்கை (Credit Dost தரநிலைகள்)',
    sec4Title: '4. கடன் போர்ட்ஃபோலியோ & கணக்குகள் விவரம்',
    sec5Title: '5. பிழைகள் கண்டறிதல் & மதிப்பெண் தாக்கம்',
    sec6Title: '6. முன்னுரிமை மீட்பு செயல் திட்டம் (0-12 மாதங்கள்)',
    sec7Title: '7. வங்கி கடன் தகுதி & ஒப்புதல் மேட்ரிக்ஸ்',
    sec8Title: '8. இறுதி ஆலோசனை முடிவு & சட்ட விதிகள்',
    personalDetails: 'தனிநபர் விவரங்கள்',
    employmentContact: 'வேலைவாய்ப்பு & தொடர்பு விவரங்கள்',
    fullName: 'முழு பெயர்:',
    dob: 'பிறந்த தேதி:',
    ageGender: 'வயது / பாலினம்:',
    pan: 'பான் எண்:',
    occupation: 'தொழில்:',
    incomeStatus: 'வருமான நிலை:',
    mobile: 'கைபேசி எண்:',
    email: 'மின்னஞ்சல்:',
    idVerified: 'அடையாள சரிபார்ப்பு: அனைத்து முதன்மை ஆவணங்களும் சரிபார்க்கப்பட்டன.',
    scoreCardTitle: 'CIBIL TransUnion Score 3.0 மாதிரி',
    scoreAssessment: 'கிரெடிட் மதிப்பீடு',
    scoringRange: 'வரம்பு: 300 முதல் 900 வரை • இந்திய கடன் வாங்குபவர்களில் முன்னணி நிலை',
    scoreTrajectory: 'ஸ்கோர் பாதை (Trajectory)',
    trajectoryPositive: '▲ முன்னேற்றம் (முறையான திருப்பிச் செலுத்துதல் மூலம் நேர்மறை போக்கு)',
    utilizationTitle: 'கிரெடிட் கார்டு பயன்பாட்டு விகிதம்',
    utilizationWarning: '⚠ கார்டு நிலுவையை செலுத்துவதன் மூலம் உடனே +20 முதல் +35 புள்ளிகள் பெறலாம்',
    sevenPointDesc: 'ஆர்பிஐ வழிகாட்டுதல்கள் அடிப்படையிலான 7 முக்கிய தூண்களின் தொழில்நுட்ப தணிக்கை.',
    thPillar: 'புள்ளி',
    thDimension: 'தணிக்கை பரிமாணம்',
    thWeightScore: 'மதிப்பெண் & எடை',
    thMetricBenchmark: 'தற்போதைய மதிப்பு & அளவுகோல்',
    thFindingsAdvice: 'முடிவுகள் & தீர்வு ஆலோசனை',
    portfolioSummary: 'போர்ட்ஃபோலியோ சுருக்கம்',
    totalAccounts: 'மொத்த கணக்குகள்:',
    zeroBalanceAccounts: 'பூஜ்ஜிய இருப்பு கணக்குகள்:',
    overdueAmount: 'நிலுவைத் தொகை (Overdue):',
    totalHighCredit: 'மொத்த அனுமதிக்கப்பட்ட வரம்பு:',
    currentBalance: 'தற்போதைய மொத்த இருப்பு:',
    creditVintage: 'கடன் வரலாற்று காலம்:',
    thBank: 'வங்கி / நிதி நிறுவனம்',
    thType: 'கடன் வகை',
    thAccountNo: 'கணக்கு எண்',
    thSanctioned: 'அனுமதிக்கப்பட்டது',
    thBalance: 'இருப்பு',
    thStatus: 'நிலை',
    actionRequired: 'தேவையான நடவடிக்கை:',
    potentialGain: 'சாத்தியமான புள்ளி உயர்வு:',
    scoreRoadmapTitle: 'எதிர்பார்க்கப்படும் ஸ்கோர் முன்னேற்ற வரைபடம்:',
    loanEligibilityDesc: 'பல்வேறு வங்கி பிரிவுகளின்படி கடன் ஒப்புதல் சாத்தியம், வட்டி விகிதம் & EMI.',
    thLoanFacility: 'கடன் வசதி',
    thOddsLimit: 'ஒப்புதல் வாய்ப்பு & வரம்பு',
    thRateEmi: 'மதிப்பிடப்பட்ட வட்டி & EMI',
    thTargetLenders: 'பரிந்துரைக்கப்பட்ட வங்கிகள்',
    thFrictionPoints: 'வங்கி பரிசீலனை தடைகள்',
    thCompensating: 'சாதகமான காரணிகள்',
    verdictTitle: 'வங்கி கடன் ஒப்புதல் முடிவு: அங்கீகரிக்கப்பட்டது (APPROVED)',
    verdictText: 'பாதுகாப்பான கடன்கள் மற்றும் வணிகக் கடன்களுக்கு வாடிக்கையாளர் தகுதியானவர்.',
    consultantNotesLabel: 'டிஜிட்டல் கட்டா ஆலோசகர் குறிப்பு:',
    statutoryFooter1: 'டிஜிட்டல் கட்டா ஃபின்டெக் பீரோ இன்டெலிஜென்ஸ் • சிபில் பகுப்பாய்வு இன்ஜின்',
    statutoryFooter2: 'CICRA 2005 பிரிவு 21(3) கீழ் 30 நாட்களுக்குள் பிழை திருத்தம் செய்வது வங்கிகளுக்கு கட்டாயமாகும்.',
    disputeHeading: 'CICRA 2005 பிரிவு 21 சட்டரீதியான மறுப்பு அறிவிப்பு'
  },
  te: {
    docTitle: 'సమగ్ర సిబిల్ క్రెడిట్ విశ్లేషణ & 7-పాయింట్ ఫోరెన్సిక్ ఆడిట్ నివేదిక',
    docSubtitle: 'ట్రాన్స్‌యూనియన్ సిబిల్ / ఎక్స్‌పీరియన్ క్రెడిట్ రిపోర్ట్ • డిజిటల్ కట్టా ప్లాట్‌ఫారమ్',
    kendraTitle: 'డిజిటల్ కట్టా',
    kendraMotto: 'ఒకే చోట, అనేక సేవలు..!',
    clientName: 'కస్టమర్ పేరు',
    cibilScore: 'సిబిల్ స్కోరు',
    controlNumber: 'కంట్రోల్ నంబర్ (ECN)',
    reportDate: 'ఆడిట్ తేదీ',
    sec1Title: '1. కస్టమర్ సమాచారం & కేవైసీ ధృవీకరణ',
    sec2Title: '2. క్రెడిట్ స్కోర్ లోతైన విశ్లేషణ',
    sec3Title: '3. 7-పాయింట్ ఫోరెన్సిక్ సిబిల్ ఆడిట్ (Credit Dost ప్రమాణాలు)',
    sec4Title: '4. క్రెడిట్ పోర్ట్‌ఫోలియో & ఖాతాల వివరాలు',
    sec5Title: '5. సిబిల్ లోపాల గుర్తింపు & స్కోరుపై ప్రభావం',
    sec6Title: '6. ప్రాధాన్యత ఆధారిత స్కోరు పునరుద్ధరణ ప్రణాళిక (0-12 నెలలు)',
    sec7Title: '7. సంస్థాగత రుణ అర్హత & బ్యాంకింగ్ మ్యాట్రిక్స్',
    sec8Title: '8. తుది సలహాదారు నిర్ణయం & చట్టపరమైన నిబంధనలు',
    personalDetails: 'వ్యక్తిగత వివరాలు',
    employmentContact: 'ఉపాధి & సంప్రదింపు వివరాలు',
    fullName: 'పూర్తి పేరు:',
    dob: 'పుట్టిన తేదీ:',
    ageGender: 'వయస్సు / లింగం:',
    pan: 'పాన్ నంబర్:',
    occupation: 'వృత్తి:',
    incomeStatus: 'ఆదాయ ధృవీకరణ:',
    mobile: 'మొబైల్ నంబర్:',
    email: 'ఈమెయిల్:',
    idVerified: 'గుర్తింపు ధృవీకరణ స్థితి: ప్రాథమిక కేవైసీ పత్రాలు ధృవీకరించబడ్డాయి.',
    scoreCardTitle: 'CIBIL TransUnion Score 3.0 మోడల్',
    scoreAssessment: 'క్రెడిట్ రేటింగ్',
    scoringRange: 'శ్రేణి: 300 నుండి 900 • భారతీయ రుణగ్రహీతలలో అగ్రశ్రేణి స్థానం',
    scoreTrajectory: 'స్కోర్ ధోరణి (Trajectory)',
    trajectoryPositive: '▲ మెరుగుదల వైపు (సకాలంలో చెల్లింపుల చరిత్రతో బలమైన సానుకూల ధోరణి)',
    utilizationTitle: 'క్రెడిట్ కార్డు వినియోగ నిష్పత్తి',
    utilizationWarning: '⚠ కార్డు బ్యాలెన్స్ తగ్గించడం ద్వారా వెంటనే +20 నుండి +35 పాయింట్లు పెరుగుతాయి',
    sevenPointDesc: 'ఆర్బీఐ మార్గదర్శకాల ఆధారంగా 7 ప్రధాన స్తంభాల సాంకేతిక ఆడిట్.',
    thPillar: 'స్తంభం',
    thDimension: 'ఆడిట్ పరిమాణం',
    thWeightScore: 'వెయిటేజీ & స్కోరు',
    thMetricBenchmark: 'ప్రస్తుత విలువ & ప్రమాణం',
    thFindingsAdvice: 'ఫలితాలు & పరిష్కార సలహా',
    portfolioSummary: 'పోర్ట్‌ఫోలియో సారాంశం',
    totalAccounts: 'మొత్తం ఖాతాలు:',
    zeroBalanceAccounts: 'జీరో బ్యాలెన్స్ ఖాతాలు:',
    overdueAmount: 'బకాయి మొత్తం (Overdue):',
    totalHighCredit: 'మొత్తం మంజూరైన పరిమితి:',
    currentBalance: 'ప్రస్తుత మొత్తం బ్యాలెన్స్:',
    creditVintage: 'క్రెడిట్ చరిత్ర కాలం:',
    thBank: 'బ్యాంకు / ఆర్థిక సంస్థ',
    thType: 'రుణ రకం',
    thAccountNo: 'ఖాతా నంబర్',
    thSanctioned: 'మంజూరైనది',
    thBalance: 'బ్యాలెన్స్',
    thStatus: 'స్థితి',
    actionRequired: 'అవసరమైన చర్యలు:',
    potentialGain: 'సాధ్యమయ్యే పాయింట్ల పెరుగుదల:',
    scoreRoadmapTitle: 'ఆశించిన స్కోరు పురోగతి రోడ్‌మ్యాప్:',
    loanEligibilityDesc: 'వివిధ బ్యాంకుల వర్గాల ప్రకారం రుణ ఆమోదం అవకాశాలు, వడ్డీ రేటు & EMI.',
    thLoanFacility: 'రుణ సౌకర్యం',
    thOddsLimit: 'ఆమోదం అవకాశం & పరిమితి',
    thRateEmi: 'అంచనా వేసిన వడ్డీ & EMI',
    thTargetLenders: 'సిఫార్సు చేయబడిన బ్యాంకులు',
    thFrictionPoints: 'బ్యాంకు పరిశీలనలోని అడ్డంకులు',
    thCompensating: 'అనుకూల అంశాలు',
    verdictTitle: 'సంస్థాగత రుణ ఆమోదం నిర్ణయం: ఆమోదించబడింది (APPROVED)',
    verdictText: 'సురక్షిత రుణాలు మరియు వ్యాపార రుణాల కోసం కస్టమర్ ప్రొఫైల్ అత్యుత్తమంగా ఉంది.',
    consultantNotesLabel: 'డిజిటల్ కట్టా సలహాదారుని గమనిక:',
    statutoryFooter1: 'డిజిటల్ కట్టా ఫిన్‌టెక్ బ్యూరో ఇంటెలిజెన్స్ • సిబిల్ విశ్లేషణ ఇంజిన్',
    statutoryFooter2: 'CICRA 2005 సెక్షన్ 21(3) ప్రకారం 30 రోజులలోపు లోపాలను పరిష్కరించడం బ్యాంకులకు తప్పనిసరి.',
    disputeHeading: 'CICRA 2005 సెక్షన్ 21 చట్టబద్ధమైన వివాద నోటీసు'
  },
  ml: {
    docTitle: 'സമ്പൂർണ്ണ സിബിൽ ക്രെഡിറ്റ് വിശകലനവും 7-പോയിന്റ് ഫോറൻസിക് ഓഡിറ്റ് റിപ്പോർട്ടും',
    docSubtitle: 'ട്രാൻസ് യൂണിയൻ സിബിൽ / എക്സ്പീരിയൻ റിപ്പോർട്ട് • ഡിജിറ്റൽ കട്ട പ്ലാറ്റ്ഫോം',
    kendraTitle: 'ഡിജിറ്റൽ കട്ട',
    kendraMotto: 'ഒരു കേന്ദ്രം, നിരവധി സേവനങ്ങൾ..!',
    clientName: 'ഉപഭോക്താവിന്റെ പേര്',
    cibilScore: 'സിബിൽ സ്കോർ',
    controlNumber: 'കൺട്രോൾ നമ്പർ (ECN)',
    reportDate: 'ഓഡിറ്റ് തീയതി',
    sec1Title: '1. ഉപഭോക്തൃ വിവരങ്ങളും കെ‌വൈ‌സി പരിശോധനയും',
    sec2Title: '2. ക്രെഡിറ്റ് സ്കോർ വിശദമായ വിശകലനം',
    sec3Title: '3. 7-പോയിന്റ് സിബിൽ ഫോറൻസിക് ഓഡിറ്റ് (Credit Dost മാനദണ്ഡം)',
    sec4Title: '4. ക്രെഡിറ്റ് പോർട്ട്ഫോളിയോ വിവരങ്ങൾ',
    sec5Title: '5. സിബിൽ തെറ്റുകൾ കണ്ടെത്തലും സ്കോർ സ്വാധീനവും',
    sec6Title: '6. മുൻഗണനാടിസ്ഥാനത്തിലുള്ള കർമ്മപദ്ധതി (0-12 മാസം)',
    sec7Title: '7. ബാങ്ക് വായ്പാ യോഗ്യതാ മാട്രിക്സ്',
    sec8Title: '8. അന്തിമ വിദഗ്ദ്ധ ഉപദേശവും നിയമപരമായ വിവരങ്ങളും',
    personalDetails: 'വ്യക്തിഗത വിവരങ്ങൾ',
    employmentContact: 'തൊഴിൽ & സമ്പർക്ക വിവരങ്ങൾ',
    fullName: 'മുഴുവൻ പേര്:',
    dob: 'ജനന തീയതി:',
    ageGender: 'പ്രായം / ലിംഗം:',
    pan: 'പാൻ നമ്പർ:',
    occupation: 'തൊഴിൽ:',
    incomeStatus: 'വരുമാന പരിശോധന:',
    mobile: 'മൊബൈൽ നമ്പർ:',
    email: 'ഇമെയിൽ:',
    idVerified: 'തിരിച്ചറിയൽ സ്ഥിരീകരണം: എല്ലാ രേഖകളും പരിശോധിച്ചുറപ്പിച്ചു.',
    scoreCardTitle: 'CIBIL TransUnion Score 3.0 മോഡൽ',
    scoreAssessment: 'ക്രെഡിറ്റ് റേറ്റിംഗ്',
    scoringRange: 'പരിധി: 300 മുതൽ 900 വരെ • ഉയർന്ന ദേശീയ റാങ്കിംഗ്',
    scoreTrajectory: 'സ്കോർ പ്രവണത (Trajectory)',
    trajectoryPositive: '▲ മെച്ചപ്പെടുന്നു (കൃത്യമായ തിരിച്ചടവ് ചരിത്രമുള്ള മികച്ച നില)',
    utilizationTitle: 'ക്രെഡിറ്റ് കാർഡ് ഉപയോഗ അനുപാതം',
    utilizationWarning: '⚠ കാർഡ് കുടിശ്ശിക തീർത്താൽ ഉടൻ +20 മുതൽ +35 പോയിന്റുകൾ വരെ വർദ്ധിക്കും',
    sevenPointDesc: 'ആർ‌ബി‌ഐ നിർദ്ദേശങ്ങൾ അടിസ്ഥാനമാക്കിയുള്ള 7 പ്രധാന ഘടകങ്ങളുടെ പരിശോധന.',
    thPillar: 'ഘടകം',
    thDimension: 'ഓഡിറ്റ് തലം',
    thWeightScore: 'സ്കോറും വെയ്റ്റേജും',
    thMetricBenchmark: 'നിലവിലെ മൂല്യവും മാനദണ്ഡവും',
    thFindingsAdvice: 'കണ്ടെത്തലുകളും പരിഹാര ഉപദേശവും',
    portfolioSummary: 'പോർട്ട്ഫോളിയോ സംഗ്രഹം',
    totalAccounts: 'ആകെ അക്കൗണ്ടുകൾ:',
    zeroBalanceAccounts: 'സീറോ ബാലൻസ് അക്കൗണ്ടുകൾ:',
    overdueAmount: 'കുടിശ്ശിക തുക (Overdue):',
    totalHighCredit: 'ആകെ അനുവദിച്ച പരിധി:',
    currentBalance: 'നിലവിലെ ആകെ ബാക്കി:',
    creditVintage: 'ക്രെഡിറ്റ് ചരിത്ര കാലയളവ്:',
    thBank: 'ബാങ്ക് / ധനകാര്യ സ്ഥാപനം',
    thType: 'വായ്പാ തരം',
    thAccountNo: 'അക്കൗണ്ട് നമ്പർ',
    thSanctioned: 'അനുവദിച്ചത്',
    thBalance: 'ബാക്കി തുക',
    thStatus: 'നില',
    actionRequired: 'ആവശ്യമായ നടപടി:',
    potentialGain: 'സാധ്യമായ പോയിന്റ് വർദ്ധനവ്:',
    scoreRoadmapTitle: 'പ്രതീക്ഷിക്കുന്ന സ്കോർ വർദ്ധനവ് റോഡ്മാപ്പ്:',
    loanEligibilityDesc: 'വിവിധ ബാങ്കുകൾ വഴിയുള്ള വായ്പാ അനുമതി സാധ്യതയും പലിശ നിരക്കും EMI യും.',
    thLoanFacility: 'വായ്പാ സൗകര്യം',
    thOddsLimit: 'അനുമതി സാധ്യതയും പരിധിയും',
    thRateEmi: 'പ്രതീക്ഷിക്കുന്ന പലിശയും EMI യും',
    thTargetLenders: 'ശുപാർശ ചെയ്യുന്ന ബാങ്കുകൾ',
    thFrictionPoints: 'ബാങ്ക് പരിശോധനയിലെ തടസ്സങ്ങൾ',
    thCompensating: 'അനുകൂല ഘടകങ്ങൾ',
    verdictTitle: 'വായ്പാ അനുമതി തീരുമാനം: അംഗീകരിച്ചു (APPROVED)',
    verdictText: 'സുരക്ഷിത വായ്പകൾക്കും ബിസിനസ്സ് വായ്പകൾക്കും അപേക്ഷകൻ വളരെ അനുയോജ്യനാണ്.',
    consultantNotesLabel: 'ഡിജിറ്റൽ കട്ട കൺസൾട്ടന്റ് കുറിപ്പ്:',
    statutoryFooter1: 'ഡിജിറ്റൽ കട്ട ഫിൻടെക് ബ്യൂറോ ഇന്റലിജൻസ് • സിബിൽ വിശകലന എഞ്ചിൻ',
    statutoryFooter2: 'CICRA 2005 സെക്ഷൻ 21(3) പ്രകാരം 30 ദിവസത്തിനകം തെറ്റുകൾ പരിഹരിക്കേണ്ടത് നിർബന്ധമാണ്.',
    disputeHeading: 'CICRA 2005 സെക്ഷൻ 21 നിയമപരമായ തർക്ക നോട്ടീസ്'
  },
  or: {
    docTitle: 'ସମ୍ପୂର୍ଣ୍ଣ ସିବିଲ୍ କ୍ରେଡିଟ୍ ବିଶ୍ଳେଷଣ ଏବଂ ୭-ପଏଣ୍ଟ ଫରେନସିକ୍ ଅଡିଟ୍ ରିପୋର୍ଟ',
    docSubtitle: 'ଟ୍ରାନ୍ସୟୁନିଅନ୍ ସିବିଲ୍ / ଏକ୍ସପେରିଆନ୍ ରିପୋର୍ଟ • ଡିଜିଟାଲ୍ କଟ୍ଟା ପ୍ଲାଟଫର୍ମ',
    kendraTitle: 'ଡିଜିଟାଲ୍ କଟ୍ଟା',
    kendraMotto: 'ଗୋଟିଏ ସ୍ଥାନ, ଅନେକ ସୁବିଧା..!',
    clientName: 'ଗ୍ରାହକଙ୍କ ନାମ',
    cibilScore: 'ସିବିଲ୍ ସ୍କୋର',
    controlNumber: 'କଣ୍ଟ୍ରୋଲ୍ ନମ୍ବର (ECN)',
    reportDate: 'ଅଡିଟ୍ ତାରିଖ',
    sec1Title: '୧. ଉପଭୋକ୍ତା ବିବରଣୀ ଏବଂ KYC ଯାଞ୍ଚ',
    sec2Title: '୨. କ୍ରେଡିଟ୍ ସ୍କୋର ଗଭୀର ବିଶ୍ଳେଷଣ',
    sec3Title: '୩. ୭-ପଏଣ୍ଟ ଫରେନସିକ୍ ସିବିଲ୍ ଅଡିଟ୍ (Credit Dost ମାନକ)',
    sec4Title: '୪. କ୍ରେଡିଟ୍ ପୋର୍ଟଫୋଲିଓ ଏବଂ ଖାତା ବିବରଣୀ',
    sec5Title: '୫. ସିବିଲ୍ ତ୍ରୁଟି ଚିହ୍ନଟ ଏବଂ ସ୍କୋର ପ୍ରଭାବ',
    sec6Title: '୬. ପ୍ରାଥମିକତା ଭିତ୍ତିକ ସଂଶୋଧନ ଯୋଜନା (୦-୧୨ ମାସ)',
    sec7Title: '୭. ସାଂସ୍ଥାଗତ ଋଣ ଯୋଗ୍ୟତା ଏବଂ ବ୍ୟାଙ୍କିଙ୍ଗ୍ ମ୍ୟାଟ୍ରିକ୍ସ',
    sec8Title: '୮. ଚୂଡ଼ାନ୍ତ ବିଶେଷଜ୍ଞ ମତାମତ ଏବଂ ଆଇନଗତ ନିୟମ',
    personalDetails: 'ବ୍ୟକ୍ତିଗତ ବିବରଣୀ',
    employmentContact: 'ନିଯୁକ୍ତି ଏବଂ ଯୋଗାଯୋଗ ବିବରଣୀ',
    fullName: 'ପୂରା ନାମ:',
    dob: 'ଜନ୍ମ ତାରିଖ:',
    ageGender: 'ବୟସ / ଲିଙ୍ଗ:',
    pan: 'ପାନ୍ ନମ୍ବର:',
    occupation: 'ବୃତ୍ତି:',
    incomeStatus: 'ଆୟ ଯାଞ୍ଚ ସ୍ଥିତି:',
    mobile: 'ମୋବାଇଲ୍ ନମ୍ବର:',
    email: 'ଇମେଲ୍:',
    idVerified: 'ପରିଚୟ ଯାଞ୍ଚ ସ୍ଥିତି: ସମସ୍ତ KYC ଦଲିଲ ଯାଞ୍ଚ କରାଯାଇଛି।',
    scoreCardTitle: 'CIBIL TransUnion Score 3.0 ମଡେଲ୍',
    scoreAssessment: 'କ୍ରେଡିଟ୍ ରେଟିଂ',
    scoringRange: 'ସ୍କୋର ସୀମା: ୩୦୦ ରୁ ୯୦୦ • ଭାରତୀୟ ଋଣଗ୍ରହୀତାଙ୍କ ମଧ୍ୟରେ ଶ୍ରେଷ୍ଠ ସ୍ଥାନ',
    scoreTrajectory: 'ସ୍କୋର ଧାରା (Trajectory)',
    trajectoryPositive: '▲ ଉନ୍ନତିମୁଖୀ (ସମୟାନୁବର୍ତ୍ତୀ ପରିଶୋଧ ଇତିହାସ ସହିତ ସକାରାତ୍ମକ ଧାରା)',
    utilizationTitle: 'କ୍ରେଡିଟ୍ କାର୍ଡ ବ୍ୟବହାର ଅନୁପାତ',
    utilizationWarning: '⚠ କାର୍ଡ ବକେୟା ପରିଶୋଧ କଲେ ତୁରନ୍ତ +୨୦ ରୁ +୩୫ ପଏଣ୍ଟ ବୃଦ୍ଧି ପାଇବ',
    sevenPointDesc: 'ଆରବିଆଇ ନିର୍ଦ୍ଦେଶାବଳୀ ଆଧାରରେ ୭ଟି ମୁଖ୍ୟ ସ୍ତମ୍ଭର ବୈଷୟିକ ଅଡିଟ୍।',
    thPillar: 'ସ୍ତମ୍ଭ',
    thDimension: 'ଅଡିଟ୍ ମାପଦଣ୍ଡ',
    thWeightScore: 'ଭାରାଙ୍କ ଏବଂ ସ୍କୋର',
    thMetricBenchmark: 'ବର୍ତ୍ତମାନର ମୂଲ୍ୟ ଏବଂ ମାନଦଣ୍ଡ',
    thFindingsAdvice: 'ଫଳାଫଳ ଏବଂ ସଂଶୋଧନ ପରାମର୍ଶ',
    portfolioSummary: 'ପୋର୍ଟଫୋଲିଓ ସାରାଂଶ',
    totalAccounts: 'ମୋଟ ଖାତା:',
    zeroBalanceAccounts: 'ଶୂନ ବାଲାନ୍ସ ଖାତା:',
    overdueAmount: 'ବକେୟା ରାଶି (Overdue):',
    totalHighCredit: 'ମୋଟ ମଞ୍ଜୁର ସୀମା:',
    currentBalance: 'ବର୍ତ୍ତମାନର ମୋଟ ବାଲାନ୍ସ:',
    creditVintage: 'କ୍ରେଡିଟ୍ ଇତିହାସ ସମୟ:',
    thBank: 'ବ୍ୟାଙ୍କ / ଆର୍ଥିକ ଅନୁଷ୍ଠାନ',
    thType: 'ଋଣ ପ୍ରକାର',
    thAccountNo: 'ଖାତା ନମ୍ବର',
    thSanctioned: 'ମଞ୍ଜୁର ରାଶି',
    thBalance: 'ବାଲାନ୍ସ',
    thStatus: 'ସ୍ଥିତି',
    actionRequired: 'ଆବଶ୍ୟକ କାର୍ଯ୍ୟାନୁଷ୍ଠାନ:',
    potentialGain: 'ସମ୍ଭାବ୍ୟ ପଏଣ୍ଟ ବୃଦ୍ଧି:',
    scoreRoadmapTitle: 'ପ୍ରତ୍ୟାଶିତ ସ୍କୋର ବୃଦ୍ଧି ରୋଡମ୍ୟାପ୍:',
    loanEligibilityDesc: 'ବିଭିନ୍ନ ବ୍ୟାଙ୍କ ବର୍ଗ ଅନୁଯାୟୀ ଋଣ ମଞ୍ଜୁର ସମ୍ଭାବନା, ସୁଧ ହାର ଏବଂ EMI।',
    thLoanFacility: 'ଋଣ ସୁବିଧା',
    thOddsLimit: 'ମଞ୍ଜୁର ସମ୍ଭାବନା ଏବଂ ସୀମା',
    thRateEmi: 'ଆନୁମାନିକ ସୁଧ ହାର ଏବଂ EMI',
    thTargetLenders: 'ଉପଯୁକ୍ତ ବ୍ୟାଙ୍କ',
    thFrictionPoints: 'ବ୍ୟାଙ୍କ ଯାଞ୍ଚରେ ସମ୍ଭାବ୍ୟ ବାଧା',
    thCompensating: 'ଅନୁକୂଳ କାରକ',
    verdictTitle: 'ଋଣ ମଞ୍ଜୁର ନିଷ୍ପତ୍ତି: ଅନୁମୋଦିତ (APPROVED)',
    verdictText: 'ସୁରକ୍ଷିତ ଋଣ ଏବଂ ବ୍ୟବସାୟିକ ଋଣ ପାଇଁ ଗ୍ରାହକ ସମ୍ପୂର୍ଣ୍ଣ ଯୋଗ୍ୟ।',
    consultantNotesLabel: 'ଡିଜିଟାଲ୍ କଟ୍ଟା ପରାମର୍ଶଦାତା ମନ୍ତବ୍ୟ:',
    statutoryFooter1: 'ଡିଜିଟାଲ୍ କଟ୍ଟା ଫିନଟେକ୍ ବ୍ୟୁରୋ ଇଣ୍ଟେଲିଜେନ୍ସ • ସିବିଲ୍ ବିଶ୍ଳେଷଣ ଇଞ୍ଜିନ୍',
    statutoryFooter2: 'CICRA 2005 ଧାରା 21(3) ଅନୁଯାୟୀ ୩୦ ଦିନ ମଧ୍ୟରେ ତ୍ରୁଟି ସଂଶୋଧନ ବାଧ୍ୟତାମୂଳକ।',
    disputeHeading: 'CICRA 2005 ଧାରା 21 ବୈଧାନିକ ବିବାଦ ନୋଟିସ୍'
  }
};

/**
 * Returns localized text for an underwriting pillar based on user language
 */
function getLocalizedPillarText(p: CirAuditPillar, lang: Language) {
  if (lang === 'mr') {
    return {
      title: p.titleMr,
      summary: p.summaryMr,
      advice: p.remediationAdviceMr
    };
  }
  if (lang === 'hi') {
    const ph = p as any;
    return {
      title: ph.titleHi || p.titleMr,
      summary: ph.summaryHi || p.summaryMr,
      advice: ph.remediationAdviceHi || p.remediationAdviceMr || p.remediationAdviceEn
    };
  }
  if (lang === 'gu') {
    const pg = p as any;
    return {
      title: pg.titleGu || p.titleMr,
      summary: pg.summaryGu || p.summaryMr,
      advice: pg.remediationAdviceGu || p.remediationAdviceMr || p.remediationAdviceEn
    };
  }
  // English fallback or standard
  return {
    title: p.titleEn,
    summary: p.summaryEn,
    advice: p.remediationAdviceEn
  };
}

/**
 * Returns localized text for an issue based on user language
 */
function getLocalizedIssueText(iss: DetectedIssue, lang: Language) {
  if (lang === 'mr') {
    return {
      title: iss.titleMr,
      desc: iss.descriptionMr,
      action: iss.recommendedActionMr
    };
  }
  if (lang === 'hi') {
    const ih = iss as any;
    return {
      title: ih.titleHi || iss.titleMr,
      desc: ih.descriptionHi || iss.descriptionMr,
      action: ih.recommendedActionHi || iss.recommendedActionMr
    };
  }
  if (lang === 'gu') {
    const ig = iss as any;
    return {
      title: ig.titleGu || iss.titleMr,
      desc: ig.descriptionGu || iss.descriptionMr,
      action: ig.recommendedActionGu || iss.recommendedActionMr
    };
  }
  return {
    title: iss.titleEn,
    desc: iss.descriptionEn,
    action: iss.recommendedActionEn
  };
}

/**
 * Generates the full comprehensive HTML document formatted for print and PDF export in the user's language
 */
export function generateLocalizedDocumentHtml(
  report: ExtractedReport,
  options: DocumentExportOptions
): string {
  const lang = options.language || 'mr';
  const loc = DOCUMENT_LOCALES[lang] || DOCUMENT_LOCALES.mr;
  const langDetails = getLanguageDetails(lang);

  const issues = report.detectedIssuesRanked || [];
  const actions = report.actionPlanGrouped || [];
  const loans = report.loanRecommendations || [];
  const auditPillars = report.sevenPointAudit || [];
  const ident = report.identitySummary;
  const metrics = report.portfolioMetrics;
  const exec = report.executiveSummary;
  const proj = report.scoreProjection;

  const notesToUse = options.consultantNotes || report.consultantNotes || '';
  const consultantName = options.consultantName || 'Digital Katta Kendra #04 - Baner, Pune';

  const dateFormatted = new Date().toLocaleDateString(lang === 'en' ? 'en-IN' : 'mr-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${loc.docTitle} - ${report.fullName}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans Devanagari', 'Noto Sans Tamil', 'Noto Sans Telugu', 'Noto Sans Bengali', 'Noto Sans Gujarati', 'Noto Sans Malayalam', 'Noto Sans Oriya', sans-serif;
            background: #f8fafc;
            padding: 24px;
            color: #0f172a;
            line-height: 1.55;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
        }
        .container {
            max-width: 1100px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 18px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.08);
            border: 1px solid #e2e8f0;
            overflow: hidden;
        }
        .header {
            background: linear-gradient(135deg, #091a38 0%, #172554 100%);
            color: white;
            padding: 36px 32px;
            position: relative;
            border-bottom: 5px solid #FF6B00;
        }
        .header-top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 12px;
        }
        .brand-badge {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .brand-icon {
            width: 48px;
            height: 48px;
            background: #FF6B00;
            color: #fff;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: 900;
            box-shadow: 0 4px 12px rgba(255, 107, 0, 0.4);
        }
        .brand-text h2 {
            font-size: 1.5em;
            font-weight: 900;
            color: #ffffff;
            letter-spacing: -0.5px;
        }
        .brand-text p {
            font-size: 0.85em;
            color: #fed7aa;
            font-weight: 700;
        }
        .header-meta-pill {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 6px 14px;
            border-radius: 9999px;
            font-size: 0.82em;
            color: #e2e8f0;
            font-weight: 700;
        }
        .header h1 {
            font-size: 1.75em;
            font-weight: 900;
            margin-bottom: 8px;
            letter-spacing: -0.5px;
            line-height: 1.3;
        }
        .header .subtitle {
            font-size: 0.95em;
            color: #cbd5e1;
            margin-bottom: 24px;
        }
        .report-meta-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 12px;
            padding-top: 18px;
            border-top: 1px solid rgba(255,255,255,0.15);
        }
        .meta-box {
            background: rgba(255,255,255,0.06);
            padding: 10px 14px;
            border-radius: 10px;
            border: 1px solid rgba(255,255,255,0.1);
        }
        .meta-label {
            font-size: 0.75em;
            text-transform: uppercase;
            color: #94a3b8;
            font-weight: 700;
            letter-spacing: 0.5px;
        }
        .meta-val {
            font-size: 1.15em;
            font-weight: 900;
            color: #ffffff;
            margin-top: 2px;
        }
        .content {
            padding: 36px 32px;
        }
        .section {
            margin-bottom: 36px;
            page-break-inside: avoid;
        }
        .section-header {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 16px;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 8px;
        }
        .section-title {
            font-size: 1.22em;
            font-weight: 900;
            color: #0f172a;
            letter-spacing: -0.3px;
        }
        .score-hero {
            background: linear-gradient(135deg, #f8fafc 0%, #eef2f6 100%);
            border: 2px solid #0f172a;
            border-radius: 16px;
            padding: 24px;
            text-align: center;
            margin-bottom: 20px;
        }
        .score-num {
            font-size: 4em;
            font-weight: 900;
            color: #FF6B00;
            line-height: 1;
            margin: 8px 0;
            font-variant-numeric: tabular-nums;
        }
        .badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 9999px;
            font-weight: 800;
            font-size: 0.8em;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        .badge-positive { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }
        .badge-warning { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
        .badge-danger { background: #fee2e2; color: #b91c1c; border: 1px solid #fecaca; }
        .badge-info { background: #e0e7ff; color: #3730a3; border: 1px solid #c7d2fe; }

        .info-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 16px;
            margin-bottom: 16px;
        }
        .info-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
        }
        .info-card-title {
            font-size: 0.92em;
            font-weight: 800;
            color: #0f172a;
            margin-bottom: 10px;
            border-bottom: 1px solid #e2e8f0;
            padding-bottom: 6px;
        }
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 5px 0;
            font-size: 0.88em;
            border-bottom: 1px solid #f1f5f9;
        }
        .info-row:last-child { border-bottom: none; }
        .info-lbl { color: #64748b; font-weight: 600; }
        .info-v { color: #0f172a; font-weight: 800; text-align: right; }

        .banner-box {
            padding: 14px 18px;
            border-radius: 12px;
            margin: 14px 0;
            font-size: 0.9em;
            line-height: 1.6;
        }
        .banner-positive { background: #f0fdf4; border-left: 4px solid #16a34a; color: #166534; }
        .banner-warning { background: #fffbeb; border-left: 4px solid #f59e0b; color: #92400e; }
        .banner-critical { background: #fef2f2; border-left: 4px solid #dc2626; color: #991b1b; }

        .table-wrap {
            overflow-x: auto;
            margin: 14px 0;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            text-align: left;
            font-size: 0.88em;
        }
        table th {
            background: #091a38;
            color: white;
            padding: 12px 14px;
            font-weight: 800;
            font-size: 0.85em;
            letter-spacing: 0.4px;
        }
        table td {
            padding: 11px 14px;
            border-bottom: 1px solid #e2e8f0;
            color: #334155;
        }
        table tr:nth-child(even) { background: #f8fafc; }
        table tr:last-child td { border-bottom: none; }

        .issue-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-left-width: 5px;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.03);
            page-break-inside: avoid;
        }
        .issue-head {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 6px;
        }
        .issue-title {
            font-size: 1em;
            font-weight: 800;
            color: #0f172a;
        }

        .action-card {
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 12px;
            padding: 16px;
            margin-bottom: 12px;
            page-break-inside: avoid;
        }

        .footer {
            background: #f8fafc;
            padding: 28px 32px;
            border-top: 2px solid #e2e8f0;
            font-size: 0.85em;
            color: #64748b;
            text-align: center;
            line-height: 1.7;
        }
        .lang-stamp {
            display: inline-block;
            background: #FF6B00;
            color: white;
            font-weight: 800;
            font-size: 0.75em;
            padding: 2px 10px;
            border-radius: 9999px;
            margin-top: 8px;
        }

        @media print {
            body { background: white; padding: 0; color: #000; }
            .container { box-shadow: none; border-radius: 0; border: none; max-width: 100%; }
            .section { page-break-inside: avoid; }
            .header { border-bottom: 4px solid #FF6B00; padding: 24px; }
            .content { padding: 20px; }
            .footer { padding: 20px; }
            @page { margin: 1.2cm; size: A4; }
        }
    </style>
</head>
<body>
    <div class="container">
        <!-- HEADER -->
        <div class="header">
            <div class="header-top">
                <div class="brand-badge">
                    <div class="brand-icon">क</div>
                    <div class="brand-text">
                        <h2>${loc.kendraTitle}</h2>
                        <p>${loc.kendraMotto}</p>
                    </div>
                </div>
                <div style="display: flex; gap: 8px; align-items: center;">
                    <span class="header-meta-pill">🏛️ ${consultantName}</span>
                    <span class="header-meta-pill" style="background: #FF6B00; color: #fff; border-color: #FF6B00;">
                        🌐 ${langDetails.name} (${langDetails.englishName})
                    </span>
                </div>
            </div>

            <h1>${loc.docTitle}</h1>
            <p class="subtitle">${loc.docSubtitle}</p>

            <div class="report-meta-grid">
                <div class="meta-box">
                    <div class="meta-label">${loc.clientName}</div>
                    <div class="meta-val">${report.fullName}</div>
                </div>
                <div class="meta-box">
                    <div class="meta-label">${loc.cibilScore}</div>
                    <div class="meta-val" style="color: #fbbf24;">${report.score} / 900</div>
                </div>
                <div class="meta-box">
                    <div class="meta-label">${loc.controlNumber}</div>
                    <div class="meta-val font-mono">${report.controlNumber}</div>
                </div>
                <div class="meta-box">
                    <div class="meta-label">${loc.reportDate}</div>
                    <div class="meta-val">${report.reportDate || dateFormatted}</div>
                </div>
            </div>
        </div>

        <div class="content">
            <!-- SECTION 1: Consumer Information & Verification -->
            <div class="section">
                <div class="section-header">
                    <div class="section-title">${loc.sec1Title}</div>
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-card-title">${loc.personalDetails}</div>
                        <div class="info-row"><span class="info-lbl">${loc.fullName}</span><span class="info-v">${report.fullName}</span></div>
                        <div class="info-row"><span class="info-lbl">${loc.dob}</span><span class="info-v">${ident?.dateOfBirth || report.dateOfBirth}</span></div>
                        <div class="info-row"><span class="info-lbl">${loc.ageGender}</span><span class="info-v">${ident?.age || '35 Years'} • ${ident?.gender || 'Male'}</span></div>
                        <div class="info-row"><span class="info-lbl">${loc.pan}</span><span class="info-v font-mono">${ident?.pan || report.panMasked}</span></div>
                    </div>
                    <div class="info-card">
                        <div class="info-card-title">${loc.employmentContact}</div>
                        <div class="info-row"><span class="info-lbl">${loc.occupation}</span><span class="info-v">${ident?.occupation || 'Salaried Professional'}</span></div>
                        <div class="info-row"><span class="info-lbl">${loc.incomeStatus}</span><span class="info-v">${ident?.incomeStatus || 'Verified Regular Income'}</span></div>
                        <div class="info-row"><span class="info-lbl">${loc.mobile}</span><span class="info-v">${report.mobile}</span></div>
                        <div class="info-row"><span class="info-lbl">${loc.email}</span><span class="info-v">${report.email}</span></div>
                    </div>
                </div>
                <div class="banner-box banner-positive">
                    <strong>✓ ${loc.idVerified}</strong>
                </div>
            </div>

            <!-- SECTION 2: Score Deep Dive -->
            <div class="section">
                <div class="section-header">
                    <div class="section-title">${loc.sec2Title}</div>
                </div>
                <div class="score-hero">
                    <div style="font-weight: 700; color: #64748b; font-size: 0.9em; text-transform: uppercase;">${loc.scoreCardTitle}</div>
                    <div class="score-num">${report.score}</div>
                    <div class="badge badge-positive" style="font-size: 0.9em; padding: 6px 18px;">
                        ✓ ${getScoreCategoryText(report.scoreCategory, lang).toUpperCase()}
                    </div>
                    <p style="margin-top: 12px; font-size: 0.9em; color: #475569;">
                        ${loc.scoringRange}
                    </p>
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-card-title">${loc.scoreTrajectory}</div>
                        <p style="font-weight: 800; color: #166534; font-size: 0.92em;">${loc.trajectoryPositive}</p>
                        <p style="font-size: 0.85em; color: #64748b; margin-top: 4px;">
                            ${lang === 'mr' ? '४+ वर्षांचा वेळेवर हप्ता भरण्याचा स्वच्छ इतिहास.' : 'Consistent positive track record over 4+ years.'}
                        </p>
                    </div>
                    <div class="info-card">
                        <div class="info-card-title">${loc.utilizationTitle}</div>
                        <p style="font-weight: 800; color: #92400e; font-size: 0.92em;">${loc.utilizationWarning}</p>
                        <p style="font-size: 0.85em; color: #64748b; margin-top: 4px;">
                            ${lang === 'mr' ? 'क्रेडिट कार्ड मर्यादा वापर ३०% खाली आणल्यास स्कोअर वेगाने वाढेल.' : 'Keep card utilization strictly below 30%.'}
                        </p>
                    </div>
                </div>
            </div>

            <!-- SECTION 3: The 7-Point CIBIL Forensic CIR Audit -->
            <div class="section">
                <div class="section-header">
                    <div class="section-title">${loc.sec3Title}</div>
                </div>
                <p style="font-size: 0.9em; color: #475569; margin-bottom: 14px;">
                    ${loc.sevenPointDesc}
                </p>
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 8%; text-align: center;">${loc.thPillar}</th>
                                <th style="width: 25%;">${loc.thDimension}</th>
                                <th style="width: 15%;">${loc.thWeightScore}</th>
                                <th style="width: 20%;">${loc.thMetricBenchmark}</th>
                                <th style="width: 32%;">${loc.thFindingsAdvice}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${auditPillars.map(p => {
                              const pil = getLocalizedPillarText(p, lang);
                              const badgeClass = p.status === 'EXCELLENT' || p.status === 'GOOD' ? 'badge-positive' : p.status === 'ATTENTION' ? 'badge-warning' : 'badge-danger';
                              return `
                                <tr>
                                    <td style="text-align: center; font-weight: 900; font-size: 1.1em; color: #091a38;">#${p.pillarNumber}</td>
                                    <td>
                                        <strong style="color: #091a38; display: block; font-size: 0.95em;">${pil.title}</strong>
                                        <span class="badge ${badgeClass}" style="margin-top: 4px; font-size: 0.72em;">${p.status}</span>
                                    </td>
                                    <td>
                                        <div style="font-weight: 900; font-size: 1.05em; color: ${p.score >= 85 ? '#15803d' : p.score >= 70 ? '#b45309' : '#b91c1c'};">
                                            ${p.score} / 100
                                        </div>
                                        <span style="font-size: 0.78em; color: #64748b; font-weight: 600;">Weight: ${p.weight}%</span>
                                    </td>
                                    <td>
                                        <strong style="font-size: 0.88em; color: #0f172a; display: block;">${p.keyMetricValue}</strong>
                                        <span style="font-size: 0.76em; color: #64748b; display: block; margin-top: 2px;">${p.benchmarkRule}</span>
                                    </td>
                                    <td style="font-size: 0.85em;">
                                        <p style="color: #334155; margin-bottom: 4px;">${pil.summary}</p>
                                        <p style="color: #091a38; font-weight: 800; margin-bottom: 2px;">⚡ ${loc.actionRequired} ${pil.advice}</p>
                                        <span style="font-size: 0.74em; color: #94a3b8; font-style: italic;">Ref: ${p.rbiCitation}</span>
                                    </td>
                                </tr>
                              `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- SECTION 4: Credit Portfolio & Accounts Summary -->
            <div class="section">
                <div class="section-header">
                    <div class="section-title">${loc.sec4Title}</div>
                </div>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-row"><span class="info-lbl">${loc.totalAccounts}</span><span class="info-v">${metrics?.totalActiveAccounts || report.accounts.length}</span></div>
                        <div class="info-row"><span class="info-lbl">${loc.zeroBalanceAccounts}</span><span class="info-v">${metrics?.zeroBalanceAccounts || 9}</span></div>
                        <div class="info-row"><span class="info-lbl">${loc.overdueAmount}</span><span class="info-v" style="color: #16a34a;">₹${metrics?.overdueAmount || 0} (ZERO)</span></div>
                    </div>
                    <div class="info-card">
                        <div class="info-row"><span class="info-lbl">${loc.totalHighCredit}</span><span class="info-v">₹${(metrics?.totalHighCredit || 2416821).toLocaleString('en-IN')}</span></div>
                        <div class="info-row"><span class="info-lbl">${loc.currentBalance}</span><span class="info-v">₹${(metrics?.currentBalance || 1655689).toLocaleString('en-IN')}</span></div>
                        <div class="info-row"><span class="info-lbl">${loc.creditVintage}</span><span class="info-v">${metrics?.accountAgeRange || '13.8 Years'}</span></div>
                    </div>
                </div>

                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th>${loc.thBank}</th>
                                <th>${loc.thType}</th>
                                <th>${loc.thAccountNo}</th>
                                <th>${loc.thSanctioned}</th>
                                <th>${loc.thBalance}</th>
                                <th>${loc.thStatus}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${report.accounts.map(acc => `
                                <tr>
                                    <td><strong>${acc.bankName}</strong></td>
                                    <td>${acc.accountType}</td>
                                    <td class="font-mono">${acc.accountNumberMasked}</td>
                                    <td>₹${acc.sanctionedAmount.toLocaleString('en-IN')}</td>
                                    <td>₹${acc.currentBalance.toLocaleString('en-IN')}</td>
                                    <td>
                                        <span class="badge ${acc.status === 'Open' ? 'badge-positive' : acc.status === 'Settled' ? 'badge-warning' : 'badge-danger'}">
                                            ${acc.status}
                                        </span>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- SECTION 5: Inaccuracy Detection & Impact Ranking -->
            <div class="section">
                <div class="section-header">
                    <div class="section-title">${loc.sec5Title}</div>
                </div>
                ${issues.map(iss => {
                  const itx = getLocalizedIssueText(iss, lang);
                  const borderCol = iss.severity === 'CRITICAL' || iss.severity === 'HIGH' ? '#dc2626' : iss.severity === 'MEDIUM' ? '#f59e0b' : '#16a34a';
                  const badgeCls = iss.severity === 'CRITICAL' || iss.severity === 'HIGH' ? 'badge-danger' : iss.severity === 'MEDIUM' ? 'badge-warning' : 'badge-positive';
                  return `
                    <div class="issue-card" style="border-left-color: ${borderCol};">
                        <div class="issue-head">
                            <strong class="issue-title">${itx.title}</strong>
                            <span class="badge ${badgeCls}">
                                ${getSeverityText(iss.severity, lang)} (-${iss.impactScore} Pts)
                            </span>
                        </div>
                        <p style="font-size: 0.88em; color: #475569; margin-bottom: 8px;">${itx.desc}</p>
                        <p style="font-size: 0.85em; color: #091a38; font-weight: 800;">
                            ⚡ ${loc.actionRequired} ${itx.action}
                        </p>
                    </div>
                  `;
                }).join('')}
            </div>

            <!-- SECTION 6: Prioritized Action Plan -->
            <div class="section">
                <div class="section-header">
                    <div class="section-title">${loc.sec6Title}</div>
                </div>
                ${actions.map(act => `
                    <div class="action-card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                            <strong style="color: #091a38; font-size: 0.98em;">${lang === 'mr' ? act.titleMr : act.titleEn}</strong>
                            <span class="badge badge-positive">+${act.scoreGain} ${loc.potentialGain}</span>
                        </div>
                        <span class="badge badge-info" style="margin-bottom: 6px;">
                            ${act.phase}
                        </span>
                        <p style="font-size: 0.88em; color: #475569; margin-top: 6px;">${lang === 'mr' ? act.actionMr : act.actionEn}</p>
                    </div>
                `).join('')}

                <div class="banner-box banner-positive" style="margin-top: 18px;">
                    <strong>${loc.scoreRoadmapTitle}</strong> ${loc.cibilScore}: ${report.score} ➔ 3 Mo: ${proj?.score3Months || '765'} ➔ 6 Mo: ${proj?.score6Months || '790'} ➔ 12 Mo: ${proj?.score12Months || '810'}+.
                </div>
            </div>

            <!-- SECTION 7: Institutional Loan Eligibility Matrix -->
            <div class="section">
                <div class="section-header">
                    <div class="section-title">${loc.sec7Title}</div>
                </div>
                <p style="font-size: 0.9em; color: #475569; margin-bottom: 14px;">
                    ${loc.loanEligibilityDesc}
                </p>
                <div class="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 18%;">${loc.thLoanFacility}</th>
                                <th style="width: 16%;">${loc.thOddsLimit}</th>
                                <th style="width: 16%;">${loc.thRateEmi}</th>
                                <th style="width: 16%;">${loc.thTargetLenders}</th>
                                <th style="width: 17%;">${loc.thFrictionPoints}</th>
                                <th style="width: 17%;">${loc.thCompensating}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${loans.map(loan => {
                              const decisionLocalized = getLoanDecisionText(loan.decision, lang);
                              const badgeCls = loan.decision.toLowerCase().includes('approved') ? 'badge-positive' : loan.decision.toLowerCase().includes('conditional') ? 'badge-warning' : 'badge-danger';
                              return `
                                <tr>
                                    <td>
                                        <strong style="color: #091a38; font-size: 0.95em; display: block;">${loan.category}</strong>
                                        <span class="badge ${badgeCls}" style="margin-top: 4px; font-size: 0.72em;">
                                            ${decisionLocalized} ${loan.approvalOdds ? `(${loan.approvalOdds}%)` : ''}
                                        </span>
                                    </td>
                                    <td>
                                        <div style="font-weight: 800; color: #0f172a; font-size: 1.05em;">${loan.recommendedLimit}</div>
                                        <span style="font-size: 0.76em; color: #64748b; font-weight: 600;">Risk: ${loan.riskRating || 'Low'}</span>
                                    </td>
                                    <td>
                                        <div style="font-weight: 800; color: #091a38; font-size: 0.88em;">${loan.interestTerms}</div>
                                        ${loan.estimatedEmi ? `<div style="font-size: 0.8em; color: #059669; font-weight: 800; margin-top: 2px;">EMI: ${loan.estimatedEmi}</div>` : ''}
                                    </td>
                                    <td style="font-size: 0.82em;">
                                        ${loan.targetLendersTier1 ? `<div><strong>Tier 1:</strong> ${loan.targetLendersTier1.slice(0, 2).join(', ')}</div>` : ''}
                                        ${loan.targetLendersTier2 ? `<div style="color: #64748b;"><strong>Tier 2:</strong> ${loan.targetLendersTier2.slice(0, 2).join(', ')}</div>` : ''}
                                    </td>
                                    <td style="font-size: 0.82em; color: #991b1b;">
                                        ${lang === 'mr' ? (loan.underwriterFrictionMr || 'कोणत्याही गंभीर अडचणी नाहीत') : (loan.underwriterFrictionEn || 'Zero friction points identified')}
                                    </td>
                                    <td style="font-size: 0.82em; color: #166534;">
                                        ${lang === 'mr' ? (loan.compensatingFactorsMr || 'उत्कृष्ट परतफेड ट्रॅक रेकॉर्ड') : (loan.compensatingFactorsEn || 'Clean repayment pedigree')}
                                    </td>
                                </tr>
                              `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- SECTION 8: Executive Verdict & Legal Disclosure -->
            <div class="section">
                <div class="section-header">
                    <div class="section-title">${loc.sec8Title}</div>
                </div>
                <div class="banner-box banner-positive">
                    <h3 style="margin-bottom: 6px; color: #15803d; font-size: 1.05em;">${loc.verdictTitle}</h3>
                    <p>${lang === 'mr' ? (exec?.verdictTextMr || loc.verdictText) : (exec?.verdictTextEn || loc.verdictText)}</p>
                </div>

                ${notesToUse ? `
                    <div class="banner-box banner-warning">
                        <strong>${loc.consultantNotesLabel}</strong>
                        <p style="margin-top: 4px;">${notesToUse}</p>
                    </div>
                ` : ''}
            </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
            <p><strong>${loc.statutoryFooter1}</strong></p>
            <p style="margin-top: 4px;">${loc.statutoryFooter2}</p>
            <p style="margin-top: 8px; font-size: 0.8em; color: #94a3b8;">
                Control ID: ${report.controlNumber} • Issued on: ${dateFormatted} • Kendra: ${consultantName}
            </p>
            <div class="lang-stamp">
                Language: ${langDetails.name} (${langDetails.englishName}) • UTF-8 Compliant
            </div>
        </div>
    </div>
</body>
</html>`;
}

/**
 * Triggers clean print or PDF save dialog for the localized report
 */
export function exportDocumentAsPdf(
  report: ExtractedReport,
  options: DocumentExportOptions
): void {
  const htmlContent = generateLocalizedDocumentHtml(report, options);
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 450);
  }
}

/**
 * Downloads the localized self-contained HTML document
 */
export function downloadDocumentAsHtml(
  report: ExtractedReport,
  options: DocumentExportOptions
): void {
  const htmlContent = generateLocalizedDocumentHtml(report, options);
  const lang = options.language || 'mr';
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `CIBIL_Audit_Report_${report.fullName.replace(/\s+/g, '_')}_${lang.toUpperCase()}_${report.score}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Prepares and opens WhatsApp sharing with localized executive summary
 */
export function shareReportOnWhatsApp(
  report: ExtractedReport,
  lang: Language
): void {
  const langDetails = getLanguageDetails(lang);
  const dateFormatted = new Date().toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  let message = '';
  if (lang === 'mr') {
    message = `🚩 *डिजिटल कट्टा - अधिकृत सिबिल अहवाल सारांश* 🚩
ग्राहक: *${report.fullName}*
सिबिल स्कोअर: *${report.score} / 900* (${report.scoreCategory})
तपासणी दिनांक: ${dateFormatted}
नियंत्रण क्र. (ECN): ${report.controlNumber}

📊 *७-मुद्दे फॉरेन्सिक निष्कर्ष:*
• कर्ज खाती: ${report.accounts.length}
• थकीत रक्कम: ₹0 (Zero Default)
• सुधारणा लक्ष्य: +${report.potentialScoreGain} गुण (लक्ष्य: ${report.score + report.potentialScoreGain})

⚖️ *आरबीआय कायदेशीर नोटीस (CICRA 2005 Sec 21):*
बँकेला त्रुटी निवारणासाठी ३० दिवसांची वैधानिक मुदत लागू आहे.

_डिजिटल कट्टा केंद्र #04 - ठिकाण एक, सुविधा अनेक..!_`;
  } else if (lang === 'hi') {
    message = `🇮🇳 *डिजिटल कट्टा - आधिकारिक सिबिल ऑडिट सारांश* 🇮🇳
ग्राहक: *${report.fullName}*
सिबिल स्कोर: *${report.score} / 900* (${report.scoreCategory})
दिनांक: ${dateFormatted}
कंट्रोल नंबर: ${report.controlNumber}

📊 *ऑडिट परिणाम:*
• कुल खाते: ${report.accounts.length}
• संभावित स्कोर वृद्धि: +${report.potentialScoreGain} अंक
• लक्ष्य स्कोर: ${report.score + report.potentialScoreGain}

_डिजिटल कट्टा केंद्र #04 - एक स्थान, अनेक सुविधाएं..!_`;
  } else {
    message = `📄 *Digital Katta - Official CIBIL Audit Summary*
Client: *${report.fullName}*
CIBIL Score: *${report.score} / 900* (${report.scoreCategory})
Audit Date: ${dateFormatted}
ECN Control ID: ${report.controlNumber}

📊 *7-Point Audit Highlights:*
• Total Accounts: ${report.accounts.length}
• Potential Score Recovery: +${report.potentialScoreGain} Points (Target: ${report.score + report.potentialScoreGain})
• Statutory Mandate: Governed under RBI CICRA 2005 Section 21(3).

_Digital Katta Fintech Kendra #04 - One Destination, Multiple Services..!_`;
  }

  const encoded = encodeURIComponent(message);
  window.open(`https://wa.me/?text=${encoded}`, '_blank');
}
