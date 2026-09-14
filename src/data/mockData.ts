import {
  CibilReportData,
  ConsultantClient,
  DisputeCase,
  FinancialArticle,
  GovernmentScheme,
  MultiBureauComparison,
  UserProfile,
  DetectedIssue,
  ActionPlanItem,
  RoadmapMilestone
} from '../types';

export const currentUser: UserProfile = {
  name: 'Rahul Deshmukh',
  email: 'rahul.deshmukh@gmail.com',
  phone: '+91 98765 43210',
  pan: 'ABCDE1234F',
  memberSince: 'March 2024',
  unreadNotifications: 3,
  referralCode: 'KATTA742',
  referralEarnings: 1500,
};

export const defaultCibilReport: CibilReportData = {
  reportId: 'CIR-2025-0902-8819',
  controlNumber: '8819203912',
  reportDate: '02 Sep 2025',
  bureau: 'CIBIL',
  score: 742,
  scoreCategory: 'Good',
  scoreCategoryMr: 'चांगला',
  percentile: 78,
  fullName: 'Rahul Deshmukh',
  dateOfBirth: '14/08/1992',
  panMasked: 'ABCDE****F',
  mobile: '+91 98765 43210',
  email: 'rahul.deshmukh@gmail.com',
  address: 'Flat 402, Shivneri Heights, Baner Road, Pune, Maharashtra - 411045',
  permanentAddress: 'At Post Sangamner, Taluka Sangamner, Ahmednagar, Maharashtra - 422605',
  detectedErrorsCount: 4,
  potentialScoreGain: 58,
  confidenceScore: 99.2,
  fileTypeUploaded: 'PDF',
  factors: [
    {
      id: 'f1',
      name: 'Payment History',
      nameMr: 'पेमेंट हिस्ट्री',
      status: 'Excellent',
      statusMr: 'उत्कृष्ट',
      impact: 'High',
      scoreImpactPoints: 0,
      description: 'You have paid 98.4% of your EMIs on time across all active credit products.',
      descriptionMr: 'तुम्ही तुमच्या सर्व सक्रिय कर्जांवर ९८.४% हप्ते वेळेवर भरले आहेत.',
      details: 'On-time payments are the single most influential driver (approx 35%) of your score.',
      iconType: 'shield'
    },
    {
      id: 'f2',
      name: 'Credit Utilization',
      nameMr: 'क्रेडिट युटिलायझेशन',
      status: 'Good',
      statusMr: 'चांगले',
      impact: 'High',
      scoreImpactPoints: -18,
      description: 'Your total credit limit is ₹3,50,000 and current balance is ₹1,12,000 (32%).',
      descriptionMr: 'तुमची एकूण मर्यादा ₹३,५०,००० आहे आणि चालू वापर ३२% आहे.',
      details: 'Keeping credit utilization below 30% helps boost your score by 15-25 points.',
      iconType: 'meter'
    },
    {
      id: 'f3',
      name: 'Length of Credit History',
      nameMr: 'क्रेडिट इतिहासाचा कालावधी',
      status: 'Good',
      statusMr: 'चांगले',
      impact: 'Medium',
      scoreImpactPoints: 0,
      description: 'Oldest active account opened 5 years, 8 months ago (SBI Home Loan).',
      descriptionMr: 'सर्वात जुने सक्रिय खाते ५ वर्षे, ८ महिन्यांपूर्वी सुरू झाले.',
      details: 'A vintage credit history shows lenders you are a consistent, experienced borrower.',
      iconType: 'history'
    },
    {
      id: 'f4',
      name: 'Credit Mix',
      nameMr: 'क्रेडिट मिक्स',
      status: 'Fair',
      statusMr: 'मध्यम',
      impact: 'Low',
      scoreImpactPoints: -12,
      description: 'You have 2 secured loans (Home, Car) and 3 unsecured credit lines (2 Credit Cards, 1 Consumer Loan).',
      descriptionMr: 'तुमच्याकडे २ सुरक्षित आणि ३ असुरक्षित क्रेडिट खाती आहेत.',
      details: 'A balanced portfolio of secured and unsecured loans displays well-rounded financial capability.',
      iconType: 'mix'
    },
    {
      id: 'f5',
      name: 'New Credit Enquiries',
      nameMr: 'नवीन क्रेडिट चौकशी',
      status: 'Good',
      statusMr: 'चांगले',
      impact: 'Low',
      scoreImpactPoints: -8,
      description: '2 hard inquiries made in the last 6 months (Axis Bank & ICICI Bank).',
      descriptionMr: 'गेल्या ६ महिन्यांत २ अधिकृत चौकशी करण्यात आल्या आहेत.',
      details: 'Limiting hard loan enquiries preserves your rating from sudden downward recalculations.',
      iconType: 'enquiry'
    }
  ],
  accounts: [
    {
      id: 'acc-1',
      bankName: 'HDFC Bank Ltd',
      accountType: 'Credit Card',
      accountNumberMasked: 'XXXX-XXXX-XXXX-4921',
      ownership: 'Individual',
      dateOpened: '12/04/2021',
      sanctionedAmount: 250000,
      creditLimit: 250000,
      currentBalance: 82000,
      overdueAmount: 0,
      status: 'Open',
      hasDispute: true,
      issueType: 'WRONG_DPD',
      issueDescription: 'Erroneous 30 DPD mark reported in Nov 2024 despite bank statement showing full timely auto-debit.',
      issueDescriptionMr: 'बँकेच्या स्टेटमेंटनुसार वेळेवर पेमेंट होऊनही नोव्हेंबर २०२४ मध्ये ३० दिवसांचा उशीर चुकीने नोंदवला गेला.',
      dpdHistory: [
        { monthYear: 'Aug 25', dpd: '000', isDelayed: false },
        { monthYear: 'Jul 25', dpd: '000', isDelayed: false },
        { monthYear: 'Jun 25', dpd: '000', isDelayed: false },
        { monthYear: 'May 25', dpd: '000', isDelayed: false },
        { monthYear: 'Apr 25', dpd: '000', isDelayed: false },
        { monthYear: 'Nov 24', dpd: '030', isDelayed: true }
      ]
    },
    {
      id: 'acc-2',
      bankName: 'State Bank of India',
      accountType: 'Home Loan',
      accountNumberMasked: 'HL-****-8821',
      ownership: 'Joint',
      dateOpened: '10/01/2020',
      sanctionedAmount: 4200000,
      currentBalance: 3140000,
      overdueAmount: 0,
      status: 'Open',
      hasDispute: false,
      dpdHistory: [
        { monthYear: 'Aug 25', dpd: '000', isDelayed: false },
        { monthYear: 'Jul 25', dpd: '000', isDelayed: false },
        { monthYear: 'Jun 25', dpd: '000', isDelayed: false },
        { monthYear: 'May 25', dpd: '000', isDelayed: false }
      ]
    },
    {
      id: 'acc-3',
      bankName: 'Bajaj Finance Ltd',
      accountType: 'Consumer Loan',
      accountNumberMasked: 'CD-****-1094',
      ownership: 'Individual',
      dateOpened: '15/06/2022',
      dateClosed: '18/06/2023',
      sanctionedAmount: 65000,
      currentBalance: 12000,
      overdueAmount: 0,
      status: 'Open',
      hasDispute: true,
      issueType: 'OUTDATED_OPEN',
      issueDescription: 'Fully closed with NOC in June 2023, but bureau still displays as Open with ₹12,000 balance.',
      issueDescriptionMr: 'जून २०२३ मध्ये एनओसी घेऊन पूर्ण फेडले गेले, परंतु ब्युरो अजूनही ₹१२,००० शिल्लक असलेले चालू खाते दाखवत आहे.',
      dpdHistory: [
        { monthYear: 'Jun 23', dpd: '000', isDelayed: false },
        { monthYear: 'May 23', dpd: '000', isDelayed: false }
      ]
    },
    {
      id: 'acc-4',
      bankName: 'Axis Bank',
      accountType: 'Auto Loan',
      accountNumberMasked: 'AL-****-5509',
      ownership: 'Individual',
      dateOpened: '05/11/2021',
      sanctionedAmount: 750000,
      currentBalance: 320000,
      overdueAmount: 0,
      status: 'Open',
      hasDispute: false,
      dpdHistory: [
        { monthYear: 'Aug 25', dpd: '000', isDelayed: false },
        { monthYear: 'Jul 25', dpd: '000', isDelayed: false }
      ]
    },
    {
      id: 'acc-5',
      bankName: 'RBL Bank Ltd',
      accountType: 'Credit Card',
      accountNumberMasked: 'XXXX-XXXX-XXXX-9012',
      ownership: 'Individual',
      dateOpened: '14/09/2023',
      sanctionedAmount: 100000,
      creditLimit: 100000,
      currentBalance: 30000,
      overdueAmount: 0,
      status: 'Settled',
      hasDispute: true,
      issueType: 'SETTLED_TAG_ERROR',
      issueDescription: 'Marked as "Settled" instead of "Closed in Full" after customer paid entire outstanding balance.',
      issueDescriptionMr: 'ग्राहकाने पूर्ण रक्कम भरली असतानाही खात्यावर "क्लोज्ड" ऐवजी "सेटल" असा घातक शिक्का मारला गेला आहे.',
      dpdHistory: [
        { monthYear: 'Dec 24', dpd: '000', isDelayed: false }
      ]
    }
  ],
  enquiries: [
    {
      id: 'enq-1',
      institution: 'Axis Bank Ltd',
      enquiryDate: '12/07/2025',
      purpose: 'Credit Card',
      amount: 150000,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-2',
      institution: 'ICICI Bank Ltd',
      enquiryDate: '28/05/2025',
      purpose: 'Personal Loan',
      amount: 300000,
      bureau: 'CIBIL'
    }
  ]
};

// 7-Point Regulatory Core Analysis Issues Engine Data
export const detectedIssuesList: DetectedIssue[] = [
  {
    id: 'iss-1',
    code: 'INCORRECT_DPD_STATUS',
    severity: 'HIGH',
    titleEn: 'Erroneous 30-Day DPD Mark on HDFC Credit Card',
    titleMr: 'एचडीएफसी क्रेडिट कार्डवर ३० दिवसांची चुकीची उशीर नोंद (DPD)',
    impactScore: 28,
    legalCitation: 'Section 21 of Credit Information Companies (Regulation) Act, 2005 (CICRA)',
    descriptionEn: 'Account XXXX-4921 has a 030 late mark for Nov 2024. Bank statements show the account was set on auto-debit and debited on 05 Nov 2024. Rectifying this returns +28 points.',
    descriptionMr: 'नोव्हेंबर २०२४ मधील ३० दिवसांची उशीर नोंद चुकीची असून बँकेच्या खात्यातून देय तारखेआधीच रक्कम कपात झाली होती. ही नोंद दुरुस्त केल्यास +२८ गुण वाढतील.',
    recommendedActionEn: 'File statutory dispute with attached bank statement showing auto-debit clearing.',
    recommendedActionMr: 'ऑटो-डेबिट कपातीचे बँक स्टेटमेंट जोडून सिबिलकडे तात्काळ तक्रार दाखल करा.',
    bankName: 'HDFC Bank Ltd',
    accountAffected: 'XXXX-XXXX-XXXX-4921'
  },
  {
    id: 'iss-2',
    code: 'OUTDATED_CLOSED_OPEN',
    severity: 'HIGH',
    titleEn: 'Closed Bajaj Finance Loan Still Reported Open with Balance',
    titleMr: 'पूर्ण फेडलेले बजाज फायनान्स कर्ज अजूनही चालू (Open) दाखवले आहे',
    impactScore: 22,
    legalCitation: 'RBI Master Direction - Credit Information Companies (Filing Guidelines) 2023',
    descriptionEn: 'Consumer loan CD-****-1094 was closed in June 2023 with NOC issued. The bureau still reports it as Open with ₹12,000 liability, inflating debt ratio.',
    descriptionMr: 'हे कर्ज जून २०२३ मध्ये एनओसीसह बंद झाले, परंतु ब्युरो अजूनही चालू दाखवत असल्याने तुमची देयता विनाकारण जास्त दिसत आहे.',
    recommendedActionEn: 'Submit closure NOC memo to TransUnion CIBIL for immediate portal update.',
    recommendedActionMr: 'कर्जमुक्ती प्रमाणपत्र (NOC) जोडून पोर्टलवर खात्याची स्थिती "Closed" अद्ययावत करा.',
    bankName: 'Bajaj Finance Ltd',
    accountAffected: 'CD-****-1094'
  },
  {
    id: 'iss-3',
    code: 'INCORRECT_DPD_STATUS',
    severity: 'HIGH',
    titleEn: 'RBL Bank Card Erroneously Flagged as "Settled"',
    titleMr: 'आरबीएल कार्ड खात्यावर "Settled" चा चुकीचा शेरा',
    impactScore: 35,
    legalCitation: 'CICRA 2005 Rule 19 & RBI Circular on Fair Practices Code',
    descriptionEn: 'Card XXXX-9012 reflects a "Settled" status. Settlements signal partial write-off to lenders. Customer holds full No-Dues Certificate (NDC).',
    descriptionMr: 'ग्राहकाने पूर्ण रक्कम भरूनही खात्यावर "Settled" शेरा मारला गेला आहे, ज्यामुळे नवीन कर्ज मिळण्यात अडथळा येत आहे.',
    recommendedActionEn: 'Serve legal rectification notice with NDC copy for conversion to "Closed in Full".',
    recommendedActionMr: 'नो-ड्यूज सर्टिफिकेट जोडून खाते पूर्णपणे "Closed" म्हणून नोंदवण्याची नोटीस पाठवा.',
    bankName: 'RBL Bank Ltd',
    accountAffected: 'XXXX-XXXX-XXXX-9012'
  },
  {
    id: 'iss-4',
    code: 'DUPLICATE_ACCOUNT',
    severity: 'HIGH',
    titleEn: 'Duplicate Account Entry Reported by Co-Lender Partner',
    titleMr: 'सह-कर्जदार भागीदारीमुळे खात्याची दुहेरी नोंद (Duplicate Account)',
    impactScore: 24,
    legalCitation: 'RBI Co-Lending Model (CLM) Reporting Norms 2020',
    descriptionEn: 'Auto Loan AL-****-5509 is simultaneously reported by Axis Bank and its NBFC financing wing, counting single liability twice in overall obligation.',
    descriptionMr: 'एकाच वाहन कर्जाची नोंद बँक आणि एनबीएफसी दोघांकडून झाल्यामुळे कर्ज दुप्पट मोजले जात आहे.',
    recommendedActionEn: 'Demand deletion of redundant secondary tradeline through joint bureau reconciliation.',
    recommendedActionMr: 'अतिरिक्त दुहेरी नोंद रद्द करण्यासाठी संयुक्त ब्युरो दुरुस्ती अर्ज दाखल करा.',
    bankName: 'Axis Bank & NBFC Co-Lender',
    accountAffected: 'AL-****-5509'
  },
  {
    id: 'iss-5',
    code: 'WRONG_PERSONAL_INFO',
    severity: 'MEDIUM',
    titleEn: 'Address & Date of Birth Mismatch in Identity Segment',
    titleMr: 'ओळख विभागात पत्ता आणि जन्मतारखेत विसंगती',
    impactScore: 15,
    legalCitation: 'RBI KYC Master Direction (Section 15 Bureau Reporting)',
    descriptionEn: 'Date of birth is listed as 14/08/1991 instead of 14/08/1992, and legacy address from 2018 is set as primary, triggering potential synthetic fraud alerts.',
    descriptionMr: 'जन्मतारीख आणि जुना पत्ता चुकीचा नोंदवला असल्याने सिबिल पडताळणीत अलर्ट निर्माण होत आहे.',
    recommendedActionEn: 'Upload verified Aadhaar & PAN copy to update demographics.',
    recommendedActionMr: 'आधार व पॅन कार्ड जोडून वैयक्तिक माहिती दुरुस्त करा.'
  },
  {
    id: 'iss-6',
    code: 'HIGH_UTILIZATION',
    severity: 'MEDIUM',
    titleEn: 'Revolving Credit Card Utilization at 32% (Target < 30%)',
    titleMr: 'क्रेडिट कार्ड वापर मर्यादा ३२% वर आहे (अपेक्षित < ३०%)',
    impactScore: 18,
    legalCitation: 'CIBIL Scoring Algorithm (Amounts Owed / Credit Exposure Metric)',
    descriptionEn: 'Combined active credit card balance is ₹1,12,000 of ₹3,50,000 total limit. Bringing balance under ₹1,00,000 boosts score within 30 days.',
    descriptionMr: 'क्रेडिट कार्ड वापर ३०% खाली आणल्यास पुढील ३० दिवसांत स्कोअर वेगाने सुधारेल.',
    recommendedActionEn: 'Pre-pay ₹15,000 before the 20th billing cycle date to report 27% utilization.',
    recommendedActionMr: 'बिलिंग तारखेआधी ₹१५,००० भरून वापर मर्यादा २७% वर आणा.'
  },
  {
    id: 'iss-7',
    code: 'MISSING_POSITIVE_ACCOUNT',
    severity: 'LOW',
    titleEn: 'Fully Paid Gold Loan from District Co-op Bank Not Reported',
    titleMr: 'जिल्हा मध्यवर्ती बँकेचे पूर्ण फेडलेले सुवर्ण कर्ज अहवालात नाही',
    impactScore: 12,
    legalCitation: 'RBI Directive on Mandatory CIC Membership for Co-operative Banks',
    descriptionEn: 'A ₹1,50,000 gold loan with 100% spotless track record closed in 2024 was never fed into CIBIL, depriving you of valuable secured payment history.',
    descriptionMr: 'वेळेवर फेडलेले कर्ज अहवालात समाविष्ट नसल्यामुळे सकारात्मक क्रेडिट इतिहासाचा फायदा मिळत नाही.',
    recommendedActionEn: 'Request lender to transmit historical closure report or file missing tradeline request.',
    recommendedActionMr: 'बँकेला सिबिलकडे हे रेकॉर्ड पाठवण्याची विनंती करा.'
  }
];

// Prioritized Action Plan
export const prioritizedActionPlan: ActionPlanItem[] = [
  {
    id: 'act-1',
    priority: 'HIGH',
    titleEn: 'Remove Erroneous 30-DPD Late Mark on HDFC Card',
    titleMr: 'एचडीएफसी कार्डवरील ३० दिवसांची चुकीची उशीर नोंद हटवा',
    scoreGain: 28,
    actionEn: 'Generate Section 21 dispute letter with bank statement and file on TransUnion portal.',
    actionMr: 'कलम २१ नुसार तक्रार पत्र तयार करून बँक स्टेटमेंटसह सिबिलकडे दाखल करा.',
    category: 'Dispute Redressal',
    disputeReady: true,
    accountRef: 'XXXX-4921'
  },
  {
    id: 'act-2',
    priority: 'HIGH',
    titleEn: 'Correct RBL "Settled" Status to "Closed in Full"',
    titleMr: 'आरबीएल "Settled" शेरा बदलून "Closed" करा',
    scoreGain: 35,
    actionEn: 'Attach No Dues Certificate and serve formal rectification notice to Nodal Officer.',
    actionMr: 'नो-ड्यूज प्रमाणपत्र जोडून बँकेच्या नोडल अधिकाऱ्यास दुरुस्ती नोटीस पाठवा.',
    category: 'Status Rectification',
    disputeReady: true,
    accountRef: 'XXXX-9012'
  },
  {
    id: 'act-3',
    priority: 'HIGH',
    titleEn: 'Update Closed Bajaj Loan Status to Closed',
    titleMr: 'बजाज फायनान्सचे बंद कर्ज सिबिलमध्ये Closed म्हणून अपडेट करा',
    scoreGain: 22,
    actionEn: 'Upload Bajaj NOC to clear ₹12,000 phantom liability from active credit count.',
    actionMr: 'बजाजचे एनओसी अपलोड करून चालू कर्जांमधून ₹१२,००० ची खोटी देयता हटवा.',
    category: 'Closure Sync',
    disputeReady: true,
    accountRef: 'CD-1094'
  },
  {
    id: 'act-4',
    priority: 'MEDIUM',
    titleEn: 'Reduce Credit Card Utilization Below 28%',
    titleMr: 'क्रेडिट कार्ड वापर २८% पेक्षा कमी करा',
    scoreGain: 18,
    actionEn: 'Pay down ₹15,000 before the upcoming statement generation date.',
    actionMr: 'पुढील स्टेटमेंट तयार होण्याआधी ₹१५,००० चे पेमेंट करा.',
    category: 'Debt Repayment',
    disputeReady: false
  },
  {
    id: 'act-5',
    priority: 'LOW',
    titleEn: 'Freeze Hard Loan Inquiries for Next 60 Days',
    titleMr: 'पुढील ६० दिवस नवीन कर्जांसाठी चौकशी थांबवा',
    scoreGain: 10,
    actionEn: 'Avoid applying for unsecured credit cards or personal loans.',
    actionMr: 'नवीन क्रेडिट कार्ड किंवा वैयक्तिक कर्जासाठी अर्ज करणे टाळा.',
    category: 'Enquiry Hygiene',
    disputeReady: false
  }
];

// 4-Phase Score Improvement Roadmap
export const scoreImprovementRoadmap: RoadmapMilestone[] = [
  {
    id: 'phase-1',
    phase: 'Phase 1: Immediate Dispute Filing',
    phaseMr: 'टप्पा १: तात्काळ तक्रार निवारण',
    duration: '0 - 30 Days',
    expectedScoreGain: 28,
    targetScore: 770,
    status: 'In Progress',
    tasksEn: [
      'Submit statutory dispute under Section 21 for HDFC 30-DPD late mark',
      'Submit NOC for closed Bajaj Finance loan',
      'Pay down ₹15,000 to drop card utilization to 27%'
    ],
    tasksMr: [
      'एचडीएफसी ३०-डीपीडी उशीर नोंदीविरोधात कलम २१ अन्वये तक्रार दाखल करा',
      'बजाज फायनान्सच्या बंद कर्जाचे एनओसी सादर करा',
      'कार्ड वापर २७% वर आणण्यासाठी ₹१५,००० जमा करा'
    ]
  },
  {
    id: 'phase-2',
    phase: 'Phase 2: Bank Nodal Reconciliation',
    phaseMr: 'टप्पा २: बँक नोडल अधिकारी पडताळणी',
    duration: '30 - 60 Days',
    expectedScoreGain: 22,
    targetScore: 792,
    status: 'Upcoming',
    tasksEn: [
      'Escalate RBL "Settled" status to Principal Nodal Officer with NDC',
      'Track 30-day statutory bureau reply window under RBI directions',
      'Re-pull revised CIR to verify removal of duplicate tradeline'
    ],
    tasksMr: [
      'आरबीएल सेटल शेरा दुरुस्तीसाठी नोडल अधिकाऱ्यांकडे पाठपुरावा करा',
      '३० दिवसांच्या विहित मुदतीतील बँक प्रतिसादाचे निरीक्षण करा',
      'नवीन सिबिल अहवाल काढून दुहेरी नोंद हटवल्याची खात्री करा'
    ]
  },
  {
    id: 'phase-3',
    phase: 'Phase 3: Tradeline Cleansing & Decay',
    phaseMr: 'टप्पा ३: क्रेडिट पोर्टफोलिओ मजबुतीकरण',
    duration: '60 - 90 Days',
    expectedScoreGain: 15,
    targetScore: 807,
    status: 'Upcoming',
    tasksEn: [
      'Recent hard enquiry impact expires from active scoring algorithm',
      'Maintain 100% on-time EMI autopay streak on Home & Auto loans',
      'Request HDFC bank for non-credit-pull limit enhancement to 4 Lakhs'
    ],
    tasksMr: [
      'मागील कर्ज चौकशीचा नकारात्मक प्रभाव समाप्त होईल',
      'गृह व वाहन कर्जाचे सर्व हप्ते वेळेवर भरण्याचा विक्रम कायम ठेवा',
      'एचडीएफसी बँकेकडे कार्ड मर्यादा वाढवून मागून युटिलायझेशन अजून कमी करा'
    ]
  },
  {
    id: 'phase-4',
    phase: 'Phase 4: Elite Prime Status (800+ Club)',
    phaseMr: 'टप्पा ४: सर्वोत्तम प्राइम स्कोअर (८००+ क्लब)',
    duration: '90 - 180 Days',
    expectedScoreGain: 20,
    targetScore: 825,
    status: 'Upcoming',
    tasksEn: [
      'Achieve top tier 0.5% lowest interest rate eligibility across PSBs',
      'Qualify for pre-approved ₹50 Lakh zero-processing-fee home loan',
      'Quarterly automated credit hygiene audit through Digital कट्टा'
    ],
    tasksMr: [
      'सर्व सरकारी व खाजगी बँकांमध्ये सर्वात कमी व्याजदरासाठी पात्र व्हा',
      '₹५० लाखांच्या प्री-अ‍ॅप्रुव्हड गृहकर्जासाठी शून्य प्रोसेसिंग फीसह पात्रता',
      'डिजिटल कट्टा द्वारे दर तीन महिन्यांनी नियमित क्रेडिट ऑडिट'
    ]
  }
];

export const bureauComparisons: MultiBureauComparison[] = [
  {
    bureau: 'CIBIL',
    score: 742,
    category: 'Good',
    openAccounts: 4,
    totalEnquiries: 2,
    lastUpdated: '02 Sep 2025',
    hasConflict: true,
    keyDiscrepancy: '30-DPD mark on HDFC card + Outdated Bajaj loan open.',
    conflictDetails: 'Shows Bajaj loan open with ₹12,000 balance, whereas Experian correctly reports it as Closed in June 2023.'
  },
  {
    bureau: 'Experian',
    score: 768,
    category: 'Excellent',
    openAccounts: 3,
    totalEnquiries: 1,
    lastUpdated: '28 Aug 2025',
    hasConflict: true,
    keyDiscrepancy: 'Bajaj loan correctly Closed; clean DPD track.',
    conflictDetails: 'Score is +26 pts higher than CIBIL because the Bajaj loan is already marked Closed with zero overdue.'
  },
  {
    bureau: 'Equifax',
    score: 729,
    category: 'Fair',
    openAccounts: 4,
    totalEnquiries: 3,
    lastUpdated: '15 Aug 2025',
    hasConflict: true,
    keyDiscrepancy: 'Damaging "Settled" tag on RBL Credit Card.',
    conflictDetails: 'Penalized by -35 pts due to RBL Bank reporting settlement rather than regular closure.'
  },
  {
    bureau: 'CRIF High Mark',
    score: 751,
    category: 'Good',
    openAccounts: 3,
    totalEnquiries: 2,
    lastUpdated: '22 Aug 2025',
    hasConflict: false,
    keyDiscrepancy: 'Clean DPD grid; minor address spelling difference.',
    conflictDetails: 'Aligned with Experian on active accounts, but lists legacy address as primary.'
  }
];

export const consultantClientsData: ConsultantClient[] = [
  {
    id: 'cli-747',
    name: 'Rajwardhan Madhukar Madhukar',
    phone: '+91 94220 40995',
    email: 'rajwardhan.m@iitkgp.ac.in',
    city: 'Islampur, Sangli, MH',
    pan: 'BPUPP5844M',
    address: 'Near Gandhi Chowk, Peth Naka, Islampur, Sangli - 415409',
    assignedConsultant: 'Mahesh Jadhav (Franchise #04 - Baner)',
    currentScore: 747,
    targetScore: 802,
    activeDisputesCount: 2,
    status: 'Dispute Active',
    consentSignedDate: '15 Aug 2025',
    reportsCount: 1,
    kycDocuments: [
      { id: 'kyc-747-1', name: 'Aadhaar Card (UIDAI Verified)', type: 'AADHAAR', status: 'Verified', uploadedAt: '15 Aug 2025', fileSize: '1.4 MB' },
      { id: 'kyc-747-2', name: 'PAN Card Copy (BPUPP5844M)', type: 'PAN', status: 'Verified', uploadedAt: '15 Aug 2025', fileSize: '920 KB' },
      { id: 'kyc-747-3', name: 'Equitas Small Finance Bank Property Loan Statement', type: 'BANK_STATEMENT', status: 'Verified', uploadedAt: '16 Aug 2025', fileSize: '4.2 MB' },
      { id: 'kyc-747-4', name: 'Union Bank Education Loan NDC Closure Certificate', type: 'NOC', status: 'Verified', uploadedAt: '16 Aug 2025', fileSize: '2.1 MB' }
    ],
    consentLogs: [
      {
        id: 'cst-747',
        timestamp: '2025-08-15T11:42:00+05:30',
        ipAddress: '103.119.144.12 (IIT Kharagpur Campus Network)',
        consentText: 'I provide full digital consent under Section 20 of CICRA 2005 to Digital Katta Franchise Kendra #04 to pull, parse, and file credit disputes with TransUnion CIBIL, Equitas SFB, and Axis Bank.',
        otpVerificationId: 'OTP-VER-942204',
        purpose: 'CIBIL Report Resolution & Institutional Credit Audit',
        validTill: '15 Feb 2026',
        cicraSection: 'Section 20(2) & RBI Circular DOR.CRE.REC.47/2023'
      }
    ],
    caseNotes: [
      {
        id: 'cn-747-1',
        date: '16 Aug 2025, 10:30 AM',
        author: 'Mahesh Jadhav (Franchise)',
        type: 'CALL',
        note: 'Client verified: Academic researcher at IIT Kharagpur with ancestral property in Islampur. Equitas SFB property loan ₹16.5L running with 100% on-time payments.'
      },
      {
        id: 'cn-747-2',
        date: '17 Aug 2025, 04:15 PM',
        author: 'Mahesh Jadhav (Franchise)',
        type: 'LEGAL_NOTICE',
        note: 'Filed statutory dispute regarding Axis Bank credit card 71.4% utilization threshold & past 2022 settled cards reconciliation. Target 800+ tier.'
      }
    ],
    uploadedReports: [
      { id: 'ur-747', bureau: 'CIBIL', filename: 'CIBIL_Credit_Analysis_Report_Rajwardhan_747.html', format: 'HTML', uploadDate: '15 Aug 2025', parsedScore: 747, status: 'Parsed' }
    ]
  },
  {
    id: 'cli-101',
    name: 'Rahul Deshmukh',
    phone: '+91 98765 43210',
    email: 'rahul.deshmukh@gmail.com',
    city: 'Pune, MH',
    pan: 'ABCDE1234F',
    address: 'Flat 402, Shivneri Heights, Baner Road, Pune - 411045',
    assignedConsultant: 'Mahesh Jadhav (Franchise #04 - Baner)',
    currentScore: 742,
    targetScore: 795,
    activeDisputesCount: 2,
    status: 'Dispute Active',
    consentSignedDate: '01 Sep 2025',
    reportsCount: 1,
    kycDocuments: [
      { id: 'kyc-1', name: 'Aadhaar Card (Masked)', type: 'AADHAAR', status: 'Verified', uploadedAt: '01 Sep 2025', fileSize: '1.2 MB' },
      { id: 'kyc-2', name: 'PAN Card Copy', type: 'PAN', status: 'Verified', uploadedAt: '01 Sep 2025', fileSize: '840 KB' },
      { id: 'kyc-3', name: 'HDFC Auto-Debit Bank Statement', type: 'BANK_STATEMENT', status: 'Verified', uploadedAt: '02 Sep 2025', fileSize: '3.4 MB' },
      { id: 'kyc-4', name: 'Bajaj Finance Loan Closure NOC', type: 'NOC', status: 'Verified', uploadedAt: '02 Sep 2025', fileSize: '1.8 MB' }
    ],
    consentLogs: [
      {
        id: 'cst-01',
        timestamp: '2025-09-01T14:22:10+05:30',
        ipAddress: '49.36.110.82 (Airtel Broadband, Pune)',
        consentText: 'I hereby provide digital consent to Digital Katta Franchise Kendra #04 to pull, parse, and file credit disputes under Section 20 of CICRA 2005.',
        otpVerificationId: 'OTP-VER-882914',
        purpose: 'CIBIL Report Resolution & Legal Grievance Redressal',
        validTill: '01 March 2026',
        cicraSection: 'Section 20(2) & RBI Circular DOR.CRE.REC.47/2023'
      }
    ],
    caseNotes: [
      {
        id: 'cn-1',
        date: '03 Sep 2025, 11:30 AM',
        author: 'Mahesh Jadhav (Franchise)',
        type: 'CALL',
        note: 'Called client Rahul. Verified HDFC auto-debit bank statement. Drafting Section 21 dispute letter.'
      },
      {
        id: 'cn-2',
        date: '04 Sep 2025, 03:45 PM',
        author: 'Mahesh Jadhav (Franchise)',
        type: 'LEGAL_NOTICE',
        note: 'Submitted dispute ticket #CIBIL-TU-99214 with attached bank statement and NOC memo. Statutory 30-day timer active.'
      }
    ],
    uploadedReports: [
      { id: 'ur-1', bureau: 'CIBIL', filename: 'CIBIL_CIR_Rahul_Sep2025.pdf', format: 'PDF', uploadDate: '02 Sep 2025', parsedScore: 742, status: 'Parsed' }
    ]
  },
  {
    id: 'cli-102',
    name: 'Pooja Kulkarni',
    phone: '+91 91234 56789',
    email: 'pooja.k@gmail.com',
    city: 'Kolhapur, MH',
    pan: 'KLMNP9012Q',
    address: 'Plot 12, Tarabai Park, Kolhapur - 416003',
    assignedConsultant: 'Mahesh Jadhav (Franchise #04)',
    currentScore: 618,
    targetScore: 750,
    activeDisputesCount: 3,
    status: 'Dispute Active',
    consentSignedDate: '24 Aug 2025',
    reportsCount: 2,
    kycDocuments: [
      { id: 'kyc-201', name: 'Aadhaar Card', type: 'AADHAAR', status: 'Verified', uploadedAt: '24 Aug 2025' },
      { id: 'kyc-202', name: 'PAN Card', type: 'PAN', status: 'Verified', uploadedAt: '24 Aug 2025' }
    ],
    consentLogs: [
      {
        id: 'cst-02',
        timestamp: '2025-08-24T10:15:00+05:30',
        ipAddress: '157.34.89.21 (Jio Fiber, Kolhapur)',
        consentText: 'Digital consent granted for multi-bureau dispute resolution.',
        otpVerificationId: 'OTP-VER-771920',
        purpose: 'Loan Eligibility Reconstruction',
        validTill: '24 Feb 2026',
        cicraSection: 'Section 20(2)'
      }
    ],
    caseNotes: [
      {
        id: 'cn-201',
        date: '25 Aug 2025, 02:00 PM',
        author: 'Mahesh Jadhav',
        type: 'STATUS_UPDATE',
        note: 'Found 2 written-off credit card entries from 2021. Approached bank for settlement conversion.'
      }
    ],
    uploadedReports: [
      { id: 'ur-201', bureau: 'CIBIL', filename: 'Pooja_CIBIL_Report.pdf', format: 'PDF', uploadDate: '24 Aug 2025', parsedScore: 618, status: 'Parsed' }
    ]
  },
  {
    id: 'cli-103',
    name: 'Sachin Patil',
    phone: '+91 97654 32109',
    email: 'sachin.patil@outlook.com',
    city: 'Nashik, MH',
    pan: 'PATIL7890R',
    address: 'Gangapur Road, Nashik - 422005',
    assignedConsultant: 'Mahesh Jadhav (Franchise #04)',
    currentScore: 782,
    targetScore: 810,
    activeDisputesCount: 0,
    status: 'Completed',
    consentSignedDate: '10 Jun 2025',
    reportsCount: 4,
    kycDocuments: [
      { id: 'kyc-301', name: 'Aadhaar Card', type: 'AADHAAR', status: 'Verified', uploadedAt: '10 Jun 2025' }
    ],
    consentLogs: [],
    caseNotes: [
      {
        id: 'cn-301',
        date: '15 Jul 2025',
        author: 'Mahesh Jadhav',
        type: 'STATUS_UPDATE',
        note: 'All dispute marks cleared. SBI Home loan sanctioned at 8.35% p.a.'
      }
    ],
    uploadedReports: []
  },
  {
    id: 'cli-104',
    name: 'Amol Deshmukh',
    phone: '+91 94220 11223',
    email: 'amol.d@gmail.com',
    city: 'Satara, MH',
    pan: 'DESHM4567S',
    address: 'Koregaon Road, Satara - 415001',
    assignedConsultant: 'Mahesh Jadhav (Franchise #04)',
    currentScore: 590,
    targetScore: 720,
    activeDisputesCount: 4,
    status: 'In Review',
    consentSignedDate: '02 Sep 2025',
    reportsCount: 1,
    kycDocuments: [],
    consentLogs: [],
    caseNotes: [
      {
        id: 'cn-401',
        date: '02 Sep 2025',
        author: 'Mahesh Jadhav',
        type: 'CALL',
        note: 'Awaiting PAN card upload and loan closure receipts.'
      }
    ],
    uploadedReports: []
  }
];

export const mockDisputeCases: DisputeCase[] = [
  {
    id: 'dsp-747-01',
    caseNumber: 'DK-DSP-2025-747',
    clientId: 'cli-747',
    clientName: 'Rajwardhan Madhukar Madhukar',
    bureau: 'CIBIL',
    bankName: 'Axis Bank Ltd',
    accountNumber: 'XXXX-XXXX-XXXX-0293',
    issueCategory: 'Excess Utilization & Credit Limit Rebalancing',
    stage: 'In Progress',
    status: 'Under Bank Review',
    dateFiled: '17 Aug 2025',
    targetResolutionDate: '17 Sep 2025',
    daysRemaining: 14,
    expectedScoreJump: 22,
    bankNodalEmail: 'nodalofficer@axisbank.com',
    assignedTo: 'Mahesh Jadhav',
    notes: 'Submitted payment proof for reducing balance from ₹49,290 to under ₹20,700 (30% threshold). Escalated to Principal Nodal Officer.',
    letterTemplateEn: `To,\nPrincipal Nodal Officer,\nAxis Bank Ltd & TransUnion CIBIL,\n\nSubject: Request for Urgent Mid-Cycle Balance Update on Credit Card XXXX-XXXX-XXXX-0293\n\nDear Sir/Madam,\n\nI, Rajwardhan Madhukar (PAN: BPUPP5844M, Control Number: 11614056719), have completed significant balance liquidation on credit card account ending 0293. Utilization was elevated at 71.4% and has been brought down below regulatory guidelines.\n\nPlease upload mid-cycle clearance records to TransUnion CIBIL under Section 21 of CICRA 2005.\n\nWarm regards,\nRajwardhan Madhukar\nIslampur, Sangli, MH`,
    letterTemplateMr: `प्रति,\nप्रिन्सिसल नोडल ऑफिसर,\nअॅक्सिस बँक लि. व ट्रान्सयुनियन सिबिल.\n\nविषय: क्रेडिट कार्ड खाते क्र. XXXX-XXXX-XXXX-0293 मधील शिल्लक रकमेची तात्काळ दुरुस्ती नोंदवणेबाबत.\n\nमहोदय,\n\nमी, राजवर्धन मधुकर (पॅन: BPUPP5844M), कार्डची थकीत रक्कम भरून वापर ३०% पेक्षा कमी केला आहे. आरबीआय नियमांनुसार सिबिलमध्ये सुधारित नोंद करावी ही विनंती.\n\nआपला नम्र,\nराजवर्धन मधुकर`
  },
  {
    id: 'dsp-01',
    caseNumber: 'DK-DSP-2025-081',
    clientId: 'cli-101',
    clientName: 'Rahul Deshmukh',
    bureau: 'CIBIL',
    bankName: 'HDFC Bank Ltd',
    accountNumber: 'XXXX-XXXX-XXXX-4921',
    issueCategory: 'Erroneous 30 DPD mark in Nov 2024',
    stage: 'In Progress',
    status: 'Under Bank Review',
    dateFiled: '03 Sep 2025',
    targetResolutionDate: '03 Oct 2025',
    daysRemaining: 12,
    expectedScoreJump: 28,
    bankNodalEmail: 'nodal.officer@hdfcbank.com',
    assignedTo: 'Mahesh Jadhav',
    notes: 'Submitted HDFC netbanking bank statement showing auto-debit on 05 Nov 2024. Bank ticket: #HDFC99281.',
    letterTemplateEn: `To,\nThe Dispute Resolution Cell,\nTransUnion CIBIL Limited,\nOne Indiabulls Centre, Tower 2A, 19th Floor,\nSenapati Bapat Marg, Elphinstone Road, Mumbai - 400013.\n\nSubject: Formal Dispute regarding Erroneous 30 DPD Reported on HDFC Credit Card Account XXXX-XXXX-XXXX-4921\n\nDear Sir/Madam,\n\nI, Rahul Deshmukh (PAN: ABCDE1234F, Control Number: 8819203912), wish to bring to your urgent attention a severe reporting error in my CIBIL report.\n\nAccount in Question: HDFC Bank Credit Card (XXXX-XXXX-XXXX-4921).\nThe report shows a "030 DPD" status for the billing cycle of November 2024. However, as evidenced by the attached bank statement, my full credit card bill was automatically debited via standing instruction on 05th November 2024 well before the due date.\n\nI request you to raise this dispute with HDFC Bank under Section 21 of the Credit Information Companies (Regulation) Act, 2005 (CICRA) and update the DPD field to "000" (STD) within the mandatory 30-day statutory window.\n\nYours faithfully,\nRahul Deshmukh\nPune, Maharashtra\nMobile: +91 98765 43210`,
    letterTemplateMr: `प्रति,\nतक्रार निवारण कक्ष,\nट्रान्सयुनियन सिबिल लिमिटेड, मुंबई.\n\nविषय: एचडीएफसी बँक क्रेडिट कार्ड खाते क्र. XXXX-XXXX-XXXX-4921 वरील चुकीची ३० दिवसांची उशीर नोंद (DPD) दुरुस्त करणेबाबत.\n\nमहोदय,\n\nमी, राहुल देशमुख (पॅन: ABCDE1234F, सिबिल रिपोर्ट क्रमांक: 8819203912), माझ्या सिबिल अहवालातील गंभीर त्रुटीकडे आपले लक्ष वेधून घेत आहे.\n\nमाझ्या अहवालात नोव्हेंबर २०२४ मध्ये ३० दिवसांचा उशीर दाखवण्यात आला आहे. परंतु सोबत जोडलेल्या बँक स्टेटमेंटनुसार माझे पेमेंट देय तारखेच्या आधीच ऑटो-डेबिट झाले होते.\n\nक्रेडिट इन्फॉर्मेशन कंपनीज (रेग्युलेशन) कायदा, २००५ नुसार ही नोंद तात्काळ दुरुस्त करून माझा सिबिल स्कोअर अद्ययावत करावा ही विनंती.\n\nआपला नम्र,\nराहुल देशमुख\nपुणे, महाराष्ट्र.`
  },
  {
    id: 'dsp-02',
    caseNumber: 'DK-DSP-2025-082',
    clientId: 'cli-101',
    clientName: 'Rahul Deshmukh',
    bureau: 'CIBIL',
    bankName: 'Bajaj Finance Ltd',
    accountNumber: 'CD-****-1094',
    issueCategory: 'Closed Loan still reporting Open with Balance',
    stage: 'Submitted',
    status: 'Filed with Bureau',
    dateFiled: '04 Sep 2025',
    targetResolutionDate: '04 Oct 2025',
    daysRemaining: 18,
    expectedScoreJump: 22,
    bankNodalEmail: 'grievanceredressal@bajajfinserv.in',
    assignedTo: 'Mahesh Jadhav',
    notes: 'Attached No Objection Certificate (NOC) and loan closure statement dated 18/06/2023.',
    letterTemplateEn: `To,\nCustomer Grievance Redressal Officer,\nBajaj Finance Ltd & TransUnion CIBIL,\n\nSubject: Request to Update Status of Closed Consumer Loan (CD-****-1094) to 'CLOSED' in Credit Bureau Records\n\nDear Sir/Madam,\n\nThis is to notify that Consumer Durable Loan CD-****-1094 was fully repaid and settled on 18/06/2023. A valid No Objection Certificate (NOC) was issued by Bajaj Finance Ltd.\n\nHowever, the latest CIBIL CIR dated 02 Sep 2025 still reflects this account as 'OPEN' with a balance of ₹12,000. This is negatively impacting my credit utilization and score.\n\nPlease upload the revised closure file to all four credit bureaus (CIBIL, Experian, Equifax, CRIF) immediately.\n\nWarm regards,\nRahul Deshmukh`,
    letterTemplateMr: `प्रति,\nग्राहक तक्रार निवारण अधिकारी,\nबजाज फायनान्स लि. व सिबिल ब्युरो.\n\nविषय: पूर्णपणे फेडलेले कर्ज (CD-****-1094) सिबिलमध्ये 'CLOSED' म्हणून नोंदवणेबाबत.\n\nमहोदय,\n\nसदर कर्ज १८/०६/२०२३ रोजी पूर्ण भरून एनओसी (NOC) प्राप्त झाली आहे. तरीही सिबिलमध्ये हे खाते चालू दाखवत असल्याने माझा स्कोअर कमी होत आहे. कृपया सदर खाते त्वरित बंद म्हणून अद्ययावत करावे.\n\nआपला नम्र,\nराहुल देशमुख`
  },
  {
    id: 'dsp-03',
    caseNumber: 'DK-DSP-2025-083',
    clientId: 'cli-101',
    clientName: 'Rahul Deshmukh',
    bureau: 'Equifax',
    bankName: 'RBL Bank Ltd',
    accountNumber: 'XXXX-XXXX-XXXX-9012',
    issueCategory: 'Settled status instead of Closed in Full',
    stage: 'Open',
    status: 'Drafted',
    dateFiled: '06 Sep 2025',
    targetResolutionDate: '06 Oct 2025',
    daysRemaining: 25,
    expectedScoreJump: 35,
    bankNodalEmail: 'nodalofficer@rblbank.com',
    assignedTo: 'Mahesh Jadhav',
    notes: 'Drafted statutory notice under Section 21 of CICRA with NDC copy attached.',
    letterTemplateEn: `To,\nThe Principal Nodal Officer,\nRBL Bank Ltd,\n\nSubject: Erroneous "Settled" Status on Card Account XXXX-9012\n\nRespected Sir/Madam,\n\nI hold a full No Dues Certificate for account XXXX-9012. Reporting this account as Settled constitutes unfair reporting and violates RBI grievance redressal directives.\n\nKindly update the status to "Closed in Full".`,
    letterTemplateMr: `प्रति,\nप्रिन्सिसल नोडल ऑफिसर,\nआरबीएल बँक लिमिटेड.\n\nविषय: खाते क्र. XXXX-9012 वरील 'Settled' शेरा हटवून 'Closed in Full' करणेबाबत.`
  },
  {
    id: 'dsp-04',
    caseNumber: 'DK-DSP-2025-075',
    clientId: 'cli-103',
    clientName: 'Sachin Patil',
    bureau: 'CIBIL',
    bankName: 'ICICI Bank Ltd',
    accountNumber: 'PL-****-4411',
    issueCategory: 'Erroneous DPD rectified and confirmed',
    stage: 'Resolved',
    status: 'Resolved / Rectified',
    dateFiled: '12 Aug 2025',
    targetResolutionDate: '12 Sep 2025',
    daysRemaining: 0,
    expectedScoreJump: 30,
    bankNodalEmail: 'nodal.icici@icicibank.com',
    assignedTo: 'Mahesh Jadhav',
    notes: 'Bureau confirmed correction. DPD updated to STD. Client score jumped from 752 to 782 (+30 pts).',
    letterTemplateEn: 'Resolution letter confirmed by TransUnion CIBIL on 01 Sep 2025.',
    letterTemplateMr: 'सिबिल ब्युरोने दुरुस्ती पूर्ण केल्याचे पुष्टीपत्र जारी केले.'
  }
];

export const governmentSchemesData: GovernmentScheme[] = [
  {
    id: 'pm-mudra',
    name: 'PM Mudra Yojana',
    nameMr: 'पीएम मुद्रा योजना',
    tagline: 'Loans up to ₹10 Lakhs for small businesses',
    taglineMr: 'लहान व्यवसायांसाठी ₹१० लाखांपर्यंत विनातारण कर्ज',
    category: 'Business',
    categoryMr: 'व्यवसाय',
    benefitAmount: 'Up to ₹10,00,000 (Shishu, Kishore, Tarun)',
    interestSubsidy: '7.5% - 10.5% p.a. (Collateral-free)',
    eligibilitySummary: 'Micro & small business owners, traders, artisans, food vendors with valid Udyam Registration & clean credit record.',
    eligibilitySummaryMr: 'लहान व्यावसायिक, कारागीर आणि उद्योजकांसाठी ज्यांच्याकडे उद्यम नोंदणी आहे.',
    documentsRequired: ['Aadhaar Card', 'PAN Card', 'Udyam Registration', '6-Month Bank Statement', 'Business Project Report'],
    documentsRequiredMr: ['आधार कार्ड', 'पॅन कार्ड', 'उद्यम नोंदणी', '६ महिन्यांचे बँक स्टेटमेंट', 'प्रकल्प अहवाल'],
    applyUrl: 'https://www.mudra.org.in',
    badge: 'Trending'
  },
  {
    id: 'pm-awas',
    name: 'PM Awas Yojana',
    nameMr: 'पीएम आवास योजना',
    tagline: 'Affordable housing for all',
    taglineMr: 'सर्वांसाठी हक्काचे आणि परवडणारे घर',
    category: 'All',
    categoryMr: 'सर्व',
    benefitAmount: 'Up to ₹2.67 Lakhs Credit-Linked Subsidy (CLSS)',
    interestSubsidy: 'Subsidy up to 6.5% on home loan interest',
    eligibilitySummary: 'Families with annual income up to ₹18 Lakhs who do not own a pucca house in India; female head of household prioritized.',
    eligibilitySummaryMr: 'ज्यांचे भारतात पक्के घर नाही आणि वार्षिक उत्पन्न मर्यादेत आहे अशा कुटुंबांसाठी.',
    documentsRequired: ['Aadhaar of all members', 'Income Certificate / ITR', 'Property Title Deeds', 'Bank Passbook'],
    documentsRequiredMr: ['सर्व सदस्यांचे आधार', 'उत्पन्न दाखला / आयटीआर', 'जागेची कागदपत्रे', 'बँक पासबुक'],
    applyUrl: 'https://pmaymis.gov.in',
    badge: 'Popular'
  },
  {
    id: 'pm-kisan',
    name: 'PM Kisan Samman Nidhi',
    nameMr: 'पीएम किसान सन्मान निधी',
    tagline: 'Income support for farmers',
    taglineMr: 'शेतकऱ्यांना वार्षिक ₹६,००० थेट खात्यात मदत',
    category: 'Farmers',
    categoryMr: 'शेतकरी',
    benefitAmount: '₹6,000 per year (3 equal installments of ₹2,000)',
    interestSubsidy: 'Direct Benefit Transfer (DBT)',
    eligibilitySummary: 'Landholder farmer families having cultivable land registered in their name with active e-KYC and Aadhaar linked bank account.',
    eligibilitySummaryMr: 'ज्या शेतकऱ्यांच्या नावावर शेती जमीन आहे आणि ई-केवायसी पूर्ण आहे.',
    documentsRequired: ['7/12 Extract (७/१२ उतारा)', '8A Extract', 'Aadhaar Card', 'Bank Passbook with NPCI seed'],
    documentsRequiredMr: ['७/१२ उतारा', '८-अ उतारा', 'आधार कार्ड', 'एनपीसीआय लिंक बँक पासबुक'],
    applyUrl: 'https://pmkisan.gov.in',
    badge: 'Direct DBT'
  },
  {
    id: 'pm-vidya',
    name: 'PM Vidya Lakshmi',
    nameMr: 'पीएम विद्यालक्ष्मी योजना',
    tagline: 'Education loan support',
    taglineMr: 'उच्च शिक्षणासाठी सुलभ शैक्षणिक कर्ज सहाय्य',
    category: 'Students',
    categoryMr: 'विद्यार्थी',
    benefitAmount: 'Up to ₹10 Lakhs (Moratorium + Interest Subvention)',
    interestSubsidy: 'Full interest subsidy for income < ₹4.5 Lakh during study',
    eligibilitySummary: 'Students secured admission in recognized higher educational institutions in India or abroad through entrance exam or merit.',
    eligibilitySummaryMr: 'मान्यताप्राप्त कॉलेजमध्ये प्रवेश घेतलेल्या गुणवंत विद्यार्थ्यांसाठी.',
    documentsRequired: ['10th/12th Marksheets', 'College Admission Letter', 'Fee Schedule', 'Parent Income Proof / ITR'],
    documentsRequiredMr: ['१०वी/१२वी गुणपत्रिका', 'प्रवेश पत्र', 'कॉलेज फी तपशील', 'पालकांचे उत्पन्न प्रमाणपत्र'],
    applyUrl: 'https://www.vidyalakshmi.co.in',
    badge: 'Education'
  },
  {
    id: 'stand-up-india',
    name: 'Stand Up India',
    nameMr: 'स्टँड अप इंडिया',
    tagline: 'Loans for SC/ST & Women Entrepreneurs',
    taglineMr: 'अनुसूचीत जाती, जमाती व महिला उद्योजकांसाठी कर्ज',
    category: 'Women',
    categoryMr: 'महिला',
    benefitAmount: '₹10 Lakhs to ₹1 Crore for greenfield projects',
    interestSubsidy: 'Lowest applicable bank rates + Credit Guarantee cover',
    eligibilitySummary: 'SC/ST and/or women entrepreneurs above 18 years setting up manufacturing, services, agri-allied, or trading ventures.',
    eligibilitySummaryMr: '१८ वर्षांवरील महिला किंवा एससी/एसटी नवउद्योजकांसाठी.',
    documentsRequired: ['Caste Certificate (if SC/ST)', 'Identity & Address Proof', 'Project Feasibility Report', 'Rent/Lease agreement'],
    documentsRequiredMr: ['जात प्रमाणपत्र', 'ओळख व पत्ता पुरावा', 'प्रकल्प अहवाल', 'जागेचा करारनामा'],
    applyUrl: 'https://www.standupmitra.in',
    badge: 'Special Focus'
  }
];

export const learnAndGrowArticles: FinancialArticle[] = [
  {
    id: 'art-1',
    title: '5 Ways to Improve Your CIBIL Score',
    titleMr: 'तुमचा सिबिल स्कोअर वाढवण्यासाठी ५ सोपे उपाय',
    readTime: '3 min read',
    readTimeMr: '३ मिनिटे वाचन',
    category: 'Credit Score',
    summary: 'Master practical habits that can lift your CIBIL rating past 750 in under 90 days.',
    summaryMr: '९० दिवसांत तुमचा सिबिल स्कोअर ७५० च्या पुढे नेण्यासाठी उपयुक्त नियम.',
    content: [
      '1. Always pay before the due date: Even a single 30-day delay cuts 25-40 points immediately.',
      '2. Keep credit card utilization under 30%: Using ₹30,000 of a ₹1,00,000 limit signals low credit reliance.',
      '3. Retain your oldest active credit card: Account age builds lender credibility.',
      '4. Space out hard loan inquiries: Never apply to 4 banks simultaneously.',
      '5. Audit your report quarterly for errors: Dispute erroneous DPD tags immediately through Digital कट्टा.'
    ],
    contentMr: [
      '१. देय तारखेपूर्वी नेहमी पेमेंट करा: एका छोट्या उशिरानेही २५ ते ४० गुण कमी होऊ शकतात.',
      '२. क्रेडिट कार्ड वापर ३०% पेक्षा कमी ठेवा: ₹१ लाखांच्या मर्यादेवर ₹३०,००० पेक्षा जास्त खर्च करू नका.',
      '३. तुमचे सर्वात जुने क्रेडिट कार्ड चालू ठेवा: जुनी खाती बँकेचा विश्वास वाढवतात.',
      '४. एकाच वेळी अनेक बँकांमध्ये कर्जासाठी अर्ज करू नका.',
      '५. डिजिटल कट्टा द्वारे दर ३ महिन्यांनी तुमच्या अहवालातील चुका तपासा आणि तक्रार नोंदवा.'
    ],
    imagePlaceholder: 'speedometer'
  },
  {
    id: 'art-2',
    title: 'How to Choose the Right Loan',
    titleMr: 'योग्य कर्ज कसे निवडावे? संपूर्ण मार्गदर्शक',
    readTime: '4 min read',
    readTimeMr: '४ मिनिटे वाचन',
    category: 'Loans',
    summary: 'Evaluating fixed vs floating interest, processing charges, prepayment penalties, and effective APR.',
    summaryMr: 'फिक्स विरुद्ध फ्लोटिंग व्याजदर आणि इतर बँक चार्जेस समजून घ्या.',
    content: [
      'Understand the true Annual Percentage Rate (APR), which includes processing fees and insurance.',
      'Prefer floating rates for long-term home loans as RBI rate cuts pass directly to your EMI.',
      'Avoid loans with strict prepayment lockout periods or penalty clauses.'
    ],
    contentMr: [
      'कर्जाचा खरा व्याजदर (APR) तपासा, ज्यामध्ये प्रोसेसिंग फी आणि विम्याचा खर्च जोडलेला असतो.',
      'गृहकर्जासाठी फ्लोटिंग दर फायद्याचा ठरतो कारण आरबीआयचे दर कमी झाल्यास ईएमआय कमी होतो.',
      'मुदतपूर्व परतफेडीवर दंड आकारणाऱ्या बँकांपासून सावध राहा.'
    ],
    imagePlaceholder: 'contract'
  },
  {
    id: 'art-3',
    title: 'Budgeting Tips for a Better Future',
    titleMr: 'सुरक्षित भविष्यासाठी कौटुंबिक बजेटचे नियोजन',
    readTime: '3 min read',
    readTimeMr: '३ मिनिटे वाचन',
    category: 'Money Management',
    summary: 'The 50/30/20 rule customized for Indian middle-class households and emergency corpus creation.',
    summaryMr: '५०/३०/२० नियमाचा वापर करून घरगुती खर्चावर नियंत्रण ठेवा.',
    content: [
      '50% for Needs: Groceries, rent, school fees, utilities, and existing EMIs.',
      '30% for Wants: Family outings, festive celebrations, electronics, and lifestyle.',
      '20% for Savings & Investments: PPF, SIPs, gold, and building 6 months emergency funds.'
    ],
    contentMr: [
      '५०% गरजांसाठी: किराणा, घरभाडे, मुलांचे शिक्षण आणि अत्यावश्यक ईएमआय.',
      '३०% इच्छांसाठी: सण-उत्सव, प्रवास, आणि जीवनशैली.',
      '२०% भविष्यासाठी: एसआयपी (SIP), पीपीएफ (PPF) आणि ६ महिन्यांचा आपत्कालीन निधी.'
    ],
    imagePlaceholder: 'piggybank'
  },
  {
    id: 'art-4',
    title: 'Government Schemes You Should Know',
    titleMr: 'प्रत्येक नागरिकाला माहिती असाव्यात अशा सरकारी योजना',
    readTime: '5 min read',
    readTimeMr: '५ मिनिटे वाचन',
    category: 'Loans',
    summary: 'A definitive handbook on subsidized central and state credit schemes with zero collateral requirements.',
    summaryMr: 'विनातारण कर्ज आणि सबसिडी देणाऱ्या प्रमुख शासकीय योजनांची माहिती.',
    content: [
      'Mudra Loans cover non-farm micro enterprises with up to ₹10 Lakh financing.',
      'Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE) backs collateral-free business loans up to ₹5 Crore.',
      'PMAY subsidy directly credits to your home loan principal balance.'
    ],
    contentMr: [
      'मुद्रा कर्ज बिगर-शेती व्यवसायांसाठी १० लाख रुपयांपर्यंत सहाय्य करते.',
      'सीजीटीएमएसई द्वारे ५ कोटींपर्यंत विनातारण कर्ज उपलब्ध होते.',
      'पीएम आवास योजनेची सबसिडी थेट तुमच्या कर्जाच्या मुद्दलात जमा होते.'
    ],
    imagePlaceholder: 'bank'
  },
  {
    id: 'art-5',
    title: 'Financial Discipline in Daily Life',
    titleMr: 'दैनंदिन जीवनात आर्थिक शिस्त कशी बाळगावी?',
    readTime: '4 min read',
    readTimeMr: '४ मिनिटे वाचन',
    category: 'Money Management',
    summary: 'Small recurring spending leaks and the psychological trap of "No-Cost EMIs" explained.',
    summaryMr: 'नो-कॉस्ट ईएमआयचा सापळा आणि दररोजच्या खर्चात बचत करण्याचे मार्ग.',
    content: [
      'No-Cost EMI usually still incurs 18% GST on interest and non-refundable processing charges.',
      'Automate investments on your salary day before lifestyle expenses begin.',
      'Maintain adequate health and term life insurance to avoid liquidation of debt investments.'
    ],
    contentMr: [
      'नो-कॉस्ट ईएमआयवरही १८% जीएसटी आणि प्रक्रिया शुल्क आकारले जाते.',
      'पगार जमा होताच आधी बचतीचे पैसे बाजूला काढा.',
      'योग्य आरोग्य विमा घेऊन अचानक येणाऱ्या वैद्यकीय खर्चापासून स्वतःचे रक्षण करा.'
    ],
    imagePlaceholder: 'growth'
  }
];
