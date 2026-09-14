import { ExtractedReport } from '../types';

export const COMPREHENSIVE_747_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CIBIL Credit Analysis Report - Rajwardhan Madhukar Madhukar</title>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>COMPREHENSIVE CREDIT ANALYSIS REPORT</h1>
            <p class="subtitle">TransUnion CIBIL Credit Information Report</p>
            <div class="report-meta">
                <div class="meta-item"><span class="meta-label">Report Date</span><span class="meta-value">September 09, 2026</span></div>
                <div class="meta-item"><span class="meta-label">Report Time</span><span class="meta-value">05:36 PM IST</span></div>
                <div class="meta-item"><span class="meta-label">Control Number</span><span class="meta-value">11614056719</span></div>
                <div class="meta-item"><span class="meta-label">Report Type</span><span class="meta-value">FULL DISCLOSURE</span></div>
            </div>
        </div>

        <div class="content">
            <div class="section">
                <div class="section-title">Consumer Information & Identity Verification</div>
                <div class="info-grid">
                    <div class="info-card">
                        <div class="info-card-title">Personal Details</div>
                        <div class="info-card-content">
                            <div class="info-row"><span class="info-label">Full Name:</span><span class="info-value">Rajwardhan Madhukar Madhukar</span></div>
                            <div class="info-row"><span class="info-label">Date of Birth:</span><span class="info-value">July 28, 1990</span></div>
                            <div class="info-row"><span class="info-label">Age:</span><span class="info-value">35 Years</span></div>
                            <div class="info-row"><span class="info-label">Gender:</span><span class="info-value">Male</span></div>
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="info-card-title">Government Identification</div>
                        <div class="info-card-content">
                            <div class="info-row"><span class="info-label">PAN:</span><span class="info-value">BPUPP5844M</span></div>
                            <div class="info-row"><span class="info-label">Social ID:</span><span class="info-value">563782172</span></div>
                            <div class="info-row"><span class="info-label">Passport ID:</span><span class="info-value">K1795626</span></div>
                        </div>
                    </div>
                    <div class="info-card">
                        <div class="info-card-title">Contact Information</div>
                        <div class="info-card-content">
                            <div class="info-row"><span class="info-label">Office Phone:</span><span class="info-value">9766929719</span></div>
                            <div class="info-row"><span class="info-label">Mobile Phone:</span><span class="info-value">9766929719</span></div>
                            <div class="info-row"><span class="info-label">Alternate Mobile:</span><span class="info-value">9766929711</span></div>
                            <div class="info-row"><span class="info-label">Email:</span><span class="info-value">rajwardhan.pawar@gmail.com</span></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <div class="section-title">CIBIL Credit Score Analysis</div>
                <div class="score-card">
                    <div class="score-value">747</div>
                    <div class="score-assessment"><span class="score-good">GOOD CREDIT SCORE</span></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>`;

export const sample747ComprehensiveReport: ExtractedReport = {
  reportId: 'CIR-2026-0909-747',
  controlNumber: '11614056719',
  reportDate: '09 Sep 2026',
  bureau: 'CIBIL',
  score: 747,
  scoreCategory: 'Good',
  scoreCategoryMr: 'चांगला',
  percentile: 83, // Top 20% Upper Quintile
  fullName: 'Rajwardhan Madhukar Madhukar',
  dateOfBirth: '28/07/1990',
  panMasked: 'BPUPP****M',
  mobile: '+91 97669 29719',
  email: 'rajwardhan.pawar@gmail.com',
  address: '1632/659 Rajyog Near State Bank Colony Mahadev Nagar Islampur, Maharashtra - 415409',
  permanentAddress: '1632/659 Rajyog Near State Bank Colony Mahadev Nagar Islampur, Maharashtra - 415409',
  detectedErrorsCount: 5,
  potentialScoreGain: 55,
  confidenceScore: 99.4,
  fileTypeUploaded: 'HTML',

  // 1. Consumer Identity & Verification Summary
  identitySummary: {
    fullName: 'Rajwardhan Madhukar Madhukar',
    dateOfBirth: 'July 28, 1990',
    age: '35 Years',
    gender: 'Male',
    pan: 'BPUPP5844M',
    socialId: '563782172',
    passportId: 'K1795626',
    mobile: '+91 97669 29719',
    alternateMobile: '+91 97669 29711',
    email: 'rajwardhan.pawar@gmail.com',
    occupation: 'Salaried Professional',
    employmentType: 'Salaried Research / Professional',
    lastReportedDate: 'August 31, 2026',
    incomeStatus: 'Verified (Monthly Salary)',
    verificationStrength: 'Strong',
    verificationStrengthNotesEn: 'All primary identification documents (PAN, Passport, Social ID) are on file and verified. Multiple contact numbers and addresses confirm high identity stability.',
    verificationStrengthNotesMr: 'सर्व प्राथमिक ओळखपत्रे (पॅन, पासपोर्ट, सोशल आयडी) पूर्णपणे पडताळणीकृत आहेत. एकाधिक संपर्क आणि पत्त्यांमुळे ओळख विश्वासार्हता अतिशय उच्च आहे.',
    addresses: [
      {
        category: 'Permanent Address',
        categoryMr: 'कायमचा पत्ता (मालकी हक्क)',
        fullAddress: '1632/659 Rajyog Near State Bank Bank Colony Mahadev Nagar Islampur, Maharashtra 415409',
        residenceCode: 'Owned',
        residenceCodeMr: 'स्वतःची मालकी (Owned)',
        dateReported: 'June 30, 2025'
      },
      {
        category: 'Residence Address',
        categoryMr: 'संशोधन वसतिगृह पत्ता',
        fullAddress: 'C Block Room No 303 VSRC Hostel IIT Kharagpur, West Bengal 721302',
        residenceCode: 'Academic',
        residenceCodeMr: 'शैक्षणिक/संशोधन संस्था',
        dateReported: 'December 31, 2023'
      },
      {
        category: 'Office Address',
        categoryMr: 'कार्यालयीन पत्ता',
        fullAddress: 'Materials Science Center IIT Kharagpur, West Bengal 721302',
        residenceCode: 'Professional',
        residenceCodeMr: 'कार्यालयीन / व्यावसायिक',
        dateReported: 'December 31, 2023'
      }
    ]
  },

  // 2. Portfolio Metrics
  portfolioMetrics: {
    totalActiveAccounts: 11,
    zeroBalanceAccounts: 9,
    totalHighCredit: 2416821,
    currentBalance: 1655689,
    overdueAmount: 0,
    accountAgeRange: '13.8 Years',
    oldestAccountDate: 'October 6, 2012',
    mostRecentReportDate: 'June 30, 2025',
    overdueStatus: 'ZERO OVERDUE (100% Current)'
  },

  // Score Factors
  factors: [
    {
      id: 'f-747-1',
      name: 'High Proportion of Outstanding Trades',
      nameMr: 'एकूण सक्रिय खात्यांचे प्रमाण',
      status: 'Fair',
      statusMr: 'मध्यम',
      impact: 'High',
      scoreImpactPoints: -15,
      description: 'Consumer has 11 total tradelines with 9 zero-balance accounts. Strong track record of paying down lines mitigates debt exposure.',
      descriptionMr: '११ पैकी ९ खाती पूर्ण फेडली असून शून्य थकबाकी आहे. यामुळे कर्ज परतफेडीची शिस्त दिसून येते.',
      details: 'Historical debt obligations successfully managed over 13+ years.',
      iconType: 'mix'
    },
    {
      id: 'f-747-2',
      name: 'Recent High Balance Build on Bank Cards',
      nameMr: 'क्रेडिट कार्डवरील चालू वापर (Utilization)',
      status: 'Poor',
      statusMr: 'जास्त वापर (७१.४%)',
      impact: 'High',
      scoreImpactPoints: -22,
      description: 'Axis Bank credit card shows current balance of ₹49,290 against ₹69,000 limit (71.4% utilization). Ideal threshold is below 30%.',
      descriptionMr: 'एक्सिस बँकेच्या कार्डवर ₹६९,००० पैकी ₹४९,२९० (७१.४%) चालू वापर आहे. आदर्श वापर ३०% पेक्षा कमी असावा.',
      details: 'Reducing card balance below ₹20,700 will immediately unlock 15-25 points recovery.',
      iconType: 'meter'
    },
    {
      id: 'f-747-3',
      name: 'Perfect Recent Payment History (4+ Years)',
      nameMr: 'सध्याची नियमित परतफेड (गेली ४+ वर्षे)',
      status: 'Excellent',
      statusMr: 'उत्कृष्ट (१००%)',
      impact: 'High',
      scoreImpactPoints: 0,
      description: 'Zero overdue across all 11 accounts. 4+ years of unbroken on-time payments since 2022.',
      descriptionMr: 'गेल्या ४ वर्षांत एकही हप्ता चुकला नाही. सध्या एक रुपयाही थकित नाही.',
      details: 'Clean track record significantly outweighs older settled credit card lines.',
      iconType: 'shield'
    },
    {
      id: 'f-747-4',
      name: 'Credit History Vintage (13.8 Years)',
      nameMr: 'क्रेडिट इतिहासाचा कालावधी (१३.८ वर्षे)',
      status: 'Excellent',
      statusMr: 'दीर्घकालीन इतिहास',
      impact: 'Medium',
      scoreImpactPoints: 0,
      description: 'Oldest account opened in October 2012 (Union Bank Education Loan). Shows enduring credit stewardship.',
      descriptionMr: 'पहिले खाते ऑक्टोबर २०१२ मध्ये सुरू झाले. दीर्घकालीन क्रेडिट अनुभव बँकांना आकर्षित करतो.',
      details: 'Consistent borrower across education, cards, and residential property loans.',
      iconType: 'history'
    }
  ],

  // 3. Account-Level Analysis (11 Accounts: 2 Active, 9 Paid-off/Closed)
  accounts: [
    {
      id: 'acc-747-01',
      bankName: 'Equitas Small Finance Bank',
      accountType: 'Home Loan', // Property Loan
      accountNumberMasked: '700011720636',
      ownership: 'Individual',
      dateOpened: '30/06/2025',
      sanctionedAmount: 1650000,
      currentBalance: 1606399,
      overdueAmount: 0,
      status: 'Open',
      hasDispute: false,
      issueDescription: 'Property Loan against residential property (Collateral value ₹47,41,200). EMI: ₹20,337 @ 12.50% p.a. 180 months tenure. Perfect payment record.',
      dpdHistory: [
        { monthYear: 'Aug 2026', dpd: '000', isDelayed: false },
        { monthYear: 'Jul 2026', dpd: '000', isDelayed: false },
        { monthYear: 'Jun 2026', dpd: '000', isDelayed: false },
        { monthYear: 'May 2026', dpd: '000', isDelayed: false },
        { monthYear: 'Apr 2026', dpd: '000', isDelayed: false },
        { monthYear: 'Mar 2026', dpd: '000', isDelayed: false }
      ]
    },
    {
      id: 'acc-747-02',
      bankName: 'Axis Bank Ltd',
      accountType: 'Credit Card',
      accountNumberMasked: '102000004250293',
      ownership: 'Individual',
      dateOpened: '09/11/2022',
      sanctionedAmount: 69000,
      creditLimit: 69000,
      currentBalance: 49290,
      overdueAmount: 0,
      status: 'Open',
      hasDispute: false,
      issueType: 'HIGH_UTILIZATION',
      issueDescription: 'High revolving card utilization (71.4%). Last payment June 30, 2026. Zero overdue.',
      dpdHistory: [
        { monthYear: 'Jul 2026', dpd: '000', isDelayed: false },
        { monthYear: 'Jun 2026', dpd: '000', isDelayed: false },
        { monthYear: 'May 2026', dpd: '000', isDelayed: false },
        { monthYear: 'Apr 2026', dpd: '000', isDelayed: false }
      ]
    },
    {
      id: 'acc-747-03',
      bankName: 'Bajaj Finserv Ltd',
      accountType: 'Consumer Loan',
      accountNumberMasked: '17TERFMR789340',
      ownership: 'Individual',
      dateOpened: '14/05/2024',
      dateClosed: '07/05/2025',
      sanctionedAmount: 11500,
      currentBalance: 0,
      overdueAmount: 0,
      status: 'Closed',
      hasDispute: false,
      dpdHistory: [{ monthYear: 'May 2025', dpd: '000', isDelayed: false }]
    },
    {
      id: 'acc-747-04',
      bankName: 'Bajaj Finserv Ltd',
      accountType: 'Consumer Loan',
      accountNumberMasked: '17THLGLS737665',
      ownership: 'Individual',
      dateOpened: '22/02/2024',
      dateClosed: '30/01/2025',
      sanctionedAmount: 1199,
      currentBalance: 0,
      overdueAmount: 0,
      status: 'Closed',
      hasDispute: false,
      dpdHistory: [{ monthYear: 'Jan 2025', dpd: '000', isDelayed: false }]
    },
    {
      id: 'acc-747-05',
      bankName: 'Bajaj Finserv Ltd',
      accountType: 'Consumer Loan',
      accountNumberMasked: '17TLRDLS737510',
      ownership: 'Individual',
      dateOpened: '20/01/2024',
      dateClosed: '30/01/2025',
      sanctionedAmount: 14999,
      currentBalance: 0,
      overdueAmount: 0,
      status: 'Closed',
      hasDispute: false,
      dpdHistory: [{ monthYear: 'Jan 2025', dpd: '000', isDelayed: false }]
    },
    {
      id: 'acc-747-06',
      bankName: 'IDFC First Bank (Flipkart PayLater)',
      accountType: 'Personal Loan',
      accountNumberMasked: 'FLIPKART-7000',
      ownership: 'Individual',
      dateOpened: '10/08/2023',
      dateClosed: '21/01/2024',
      sanctionedAmount: 7000,
      currentBalance: 0,
      overdueAmount: 0,
      status: 'Closed',
      hasDispute: false,
      dpdHistory: [{ monthYear: 'Jan 2024', dpd: '000', isDelayed: false }]
    },
    {
      id: 'acc-747-07',
      bankName: 'ICICI Bank Ltd',
      accountType: 'Credit Card',
      accountNumberMasked: '0000000015635814',
      ownership: 'Individual',
      dateOpened: '12/03/2019',
      dateClosed: '26/07/2022',
      sanctionedAmount: 66495,
      creditLimit: 66495,
      currentBalance: 0,
      overdueAmount: 0,
      status: 'Settled',
      hasDispute: true,
      issueType: 'SETTLED_TAG_ERROR',
      issueDescription: 'Historical 192 DPD in April 2022 settled and closed. 4+ years clean payment history since. Zero balance.',
      dpdHistory: [
        { monthYear: 'Apr 2022', dpd: '192', isDelayed: true },
        { monthYear: 'Mar 2022', dpd: '150', isDelayed: true },
        { monthYear: 'Feb 2022', dpd: '090+', isDelayed: true }
      ]
    },
    {
      id: 'acc-747-08',
      bankName: 'ICICI Bank Ltd',
      accountType: 'Credit Card',
      accountNumberMasked: '0000000014856294',
      ownership: 'Individual',
      dateOpened: '10/01/2020',
      dateClosed: '11/11/2022',
      sanctionedAmount: 8155,
      creditLimit: 8155,
      currentBalance: 0,
      overdueAmount: 0,
      status: 'Closed',
      hasDispute: false,
      issueDescription: 'Historical minor DPD (68 days in April 2022). Closed clean with zero balance in Nov 2022.',
      dpdHistory: [{ monthYear: 'Apr 2022', dpd: '068', isDelayed: true }]
    },
    {
      id: 'acc-747-09',
      bankName: 'SBI Card (State Bank of India)',
      accountType: 'Credit Card',
      accountNumberMasked: '5076566247264268926',
      ownership: 'Individual',
      dateOpened: '15/05/2018',
      dateClosed: '25/05/2022',
      sanctionedAmount: 35831,
      creditLimit: 35831,
      currentBalance: 0,
      overdueAmount: 0,
      status: 'Settled',
      hasDispute: true,
      issueType: 'SETTLED_TAG_ERROR',
      issueDescription: 'Settled in May 2022 with zero current balance obligation.',
      dpdHistory: [{ monthYear: 'May 2022', dpd: 'STD', isDelayed: false }]
    },
    {
      id: 'acc-747-10',
      bankName: 'Union Bank of India',
      accountType: 'Personal Loan', // Education Loan
      accountNumberMasked: '579506550000054',
      ownership: 'Individual',
      dateOpened: '06/10/2012',
      dateClosed: '21/12/2024',
      sanctionedAmount: 491150,
      currentBalance: 0,
      overdueAmount: 0,
      status: 'Closed',
      hasDispute: false,
      issueDescription: 'Education Loan (₹4,91,150) paid in full and closed Dec 2024. Demonstrates long-term repayment discipline.',
      dpdHistory: [{ monthYear: 'Dec 2024', dpd: '000', isDelayed: false }]
    },
    {
      id: 'acc-747-11',
      bankName: 'HDFC Bank Ltd',
      accountType: 'Credit Card',
      accountNumberMasked: '0001015580001172024',
      ownership: 'Individual',
      dateOpened: '18/09/2017',
      dateClosed: '25/05/2022',
      sanctionedAmount: 81202,
      creditLimit: 81202,
      currentBalance: 0,
      overdueAmount: 0,
      status: 'Settled',
      hasDispute: true,
      issueType: 'SETTLED_TAG_ERROR',
      issueDescription: 'Settled May 2022 with zero current balance obligation.',
      dpdHistory: [{ monthYear: 'May 2022', dpd: 'STD', isDelayed: false }]
    }
  ],

  // 11 Enquiries
  enquiries: [
    {
      id: 'enq-01',
      institution: 'ICICI Bank Ltd',
      enquiryDate: '03/07/2026',
      purpose: 'Credit Card Application',
      amount: 100000,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-02',
      institution: 'State Bank of India',
      enquiryDate: '21/04/2026',
      purpose: 'Auto Loan - Personal',
      amount: 1,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-03',
      institution: 'State Bank of India',
      enquiryDate: '13/04/2026',
      purpose: 'Auto Loan - Personal',
      amount: 1,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-04',
      institution: 'HDFC Bank Ltd',
      enquiryDate: '18/08/2025',
      purpose: 'Credit Card Application',
      amount: 1000,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-05',
      institution: 'Equitas Small Finance Bank',
      enquiryDate: '10/06/2025',
      purpose: 'Property Loan (Sanctioned ₹24.99L)',
      amount: 2499000,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-06',
      institution: 'Equitas Small Finance Bank',
      enquiryDate: '06/06/2025',
      purpose: 'Business Loan - Secured (Rejected)',
      amount: 1000000,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-07',
      institution: 'Equitas Small Finance Bank',
      enquiryDate: '06/06/2025',
      purpose: 'Business Loan - Secured (Rejected)',
      amount: 1000000,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-08',
      institution: 'ICICI Bank Ltd',
      enquiryDate: '20/05/2025',
      purpose: 'Personal Loan (Rejected)',
      amount: 1000000,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-09',
      institution: 'ICICI Bank Ltd',
      enquiryDate: '01/02/2025',
      purpose: 'Credit Card Application',
      amount: 1000,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-10',
      institution: 'Bajaj Finance Ltd',
      enquiryDate: '24/08/2024',
      purpose: 'Consumer Loan (Approved)',
      amount: 14999,
      bureau: 'CIBIL'
    },
    {
      id: 'enq-11',
      institution: 'Axis Bank Ltd',
      enquiryDate: '12/12/2023',
      purpose: 'Credit Card Application (Approved)',
      amount: 10000,
      bureau: 'CIBIL'
    }
  ],

  // 3.5. Forensic 7-Point CIBIL CIR Audit (Institutional Pillars)
  sevenPointAudit: [
    {
      id: 'pillar-1-repayment',
      pillarNumber: 1,
      titleEn: 'Repayment Track Record & DPD Forensic Audit',
      titleMr: 'परतफेड इतिहास व डीपीडी (DPD) सखोल फॉरेन्सिक ऑडिट',
      weight: 35,
      score: 94,
      status: 'EXCELLENT',
      statusMr: 'उत्कृष्ट (९४/१००)',
      keyMetricLabel: 'Repayment Purity Ratio',
      keyMetricValue: '98.6% (140 / 142 Cycles On-Time)',
      benchmarkRule: 'Mandatory ≥ 98.0% for RBI Prime Lending Tier (<0.5% default probability)',
      summaryEn: 'Flawless 48-month payment discipline across all active credit lines with 0 overdue installments. Delinquencies from early 2022 have crossed the critical 36-month aging threshold.',
      summaryMr: 'गेल्या ४८ महिन्यांपासून सर्व चालू कर्जांवर १००% वेळेवर परतफेड व शून्य थकबाकी. २०२२ मधील जुन्या अडचणींना ३ वर्षांहून अधिक काळ लोटल्याने त्यांचा प्रभाव ८५% कमी झाला आहे.',
      detailedAuditEn: [
        'Total 142 payment cycles audited across 11 tradelines since October 2011.',
        '140 cycles confirmed at 000 DPD (Standard Asset - STD Classification per RBI Master Direction).',
        'Equitas Small Finance Bank Property Loan (₹16.55L) maintained 100% spotless monthly clearance since sanction in Sept 2020.',
        'Time-decay regression models indicate historic 2022 delinquency penalties have dissipated from -65 pts to under -15 pts.'
      ],
      detailedAuditMr: [
        'ऑक्टोबर २०११ पासून ११ खात्यांमधील एकूण १४२ हप्त्यांचे विश्लेषण केले गेले.',
        '१४० महिने ००० डीपीडी (मानक खाते - Standard Asset) सह पूर्णपणे वेळेवर भरले गेले.',
        'इक्विटास बँकेच्या ₹१६.५५ लाखांच्या मालमत्ता कर्जाचे सर्व हप्ते वेळेवर भरले गेले आहेत.',
        'आरबीआय मानकांनुसार ३६ महिन्यांपेक्षा जुन्या नोंदींचा सिबिल स्कोअरवरील ताण आता नगण्य झाला आहे.'
      ],
      remediationAdviceEn: 'Maintain auto-debit (NACH/e-Mandate) on primary salary account with ₹50,000 buffer balance 3 days prior to due dates.',
      remediationAdviceMr: 'पगार खात्यावर ई-मँडेट कायम ठेवा आणि हप्त्याच्या तारखेआधी खात्यात योग्य शिल्लक ठेवा.',
      rbiCitation: 'RBI Master Direction - Priority Sector Lending & Asset Classification Guidelines (DOR.STR.REC.55/2021)'
    },
    {
      id: 'pillar-2-utilization',
      pillarNumber: 2,
      titleEn: 'Credit Exposure & Revolving Card Utilization Audit',
      titleMr: 'क्रेडिट मर्यादा वापर व रिव्हॉल्व्हिंग कर्ज भार विश्लेषण',
      weight: 30,
      score: 52,
      status: 'ATTENTION',
      statusMr: 'तातडीचे लक्ष आवश्यक (५२/१००)',
      keyMetricLabel: 'Revolving Card Utilization',
      keyMetricValue: '71.4% (₹49,290 / ₹69,000 Limit)',
      benchmarkRule: 'Regulatory Safe Ceiling: ≤ 30.0% | Super-Prime Benchmark: ≤ 10.0%',
      summaryEn: 'Severe credit score drag (-22 points). Axis Bank credit card utilization stands at 71.4%, signaling short-term credit dependence to automated bureau scoring engines.',
      summaryMr: 'सिबिल स्कोअर कमी करणारा प्रमुख घटक (-२२ गुण). एक्सिस बँकेच्या क्रेडिट कार्डवर ७१.४% वापर आहे, जो ३०% पेक्षा खूप जास्त आहे.',
      detailedAuditEn: [
        'Axis Bank Credit Card (A/C: ...0293): Current balance ₹49,290 against sanctioned limit ₹69,000.',
        'Exceeds the 30% safe threshold (₹20,700) by ₹28,590.',
        'Exceeds the 10% super-prime threshold (₹6,900) by ₹42,390.',
        'Algorithms flag utilization over 70% as "high credit reliance", subtracting up to 25 score points.'
      ],
      detailedAuditMr: [
        'एक्सिस बँक कार्ड (A/C: ...०२९३): ₹६९,००० मर्यादेपैकी ₹४९,२९० चालू वापर.',
        'सुरक्षित ३०% मर्यादेपेक्षा (₹२०,७००) ₹२८,५९० जास्त शिल्लक आहे.',
        'सुपर-प्राइम १०% मर्यादेपेक्षा (₹६,९००) ₹४२,३९० जास्त वापर.',
        'वापर ७०% वर गेल्यास बँकांच्या सॉफ्टवेअरमध्ये नकारात्मक सिग्नल जातो.'
      ],
      remediationAdviceEn: 'Execute a ₹28,590 paydown immediately. Strategic tip: Pay 3 business days before bill generation date (18th of month) so the bureau snapshot reports <30% utilization.',
      remediationAdviceMr: 'तातडीने ₹२८,५९० चा भरणा करा. बिल तयार होण्याच्या ३ दिवस आधी भरणा केल्यास सिबिलमध्ये त्वरित ३०% खाली नोंद होते.',
      rbiCitation: 'Fair Practices Code for Credit Card Operations (RBI/2022-23/92 DOR.AUT.REC.No.27)'
    },
    {
      id: 'pillar-3-mix',
      pillarNumber: 3,
      titleEn: 'Credit Portfolio Mix & Collateral Anchoring Audit',
      titleMr: 'कर्ज प्रकार संतुलन (Credit Mix) व तारण गुणवत्ता ऑडिट',
      weight: 15,
      score: 95,
      status: 'EXCELLENT',
      statusMr: 'उत्कृष्ट (९५/१००)',
      keyMetricLabel: 'Secured Debt Ratio',
      keyMetricValue: '97.1% Secured (₹16.55L / ₹17.04L Total)',
      benchmarkRule: 'Ideal Portfolio Diversity: ≥ 70.0% Secured, ≤ 30.0% Unsecured',
      summaryEn: 'Outstanding structural resilience. The applicant’s portfolio is firmly anchored by secured residential real estate with an exceptionally low 34.8% Loan-to-Value (LTV) ratio.',
      summaryMr: 'अत्यंत मजबूत कर्ज संतुलन. एकूण कर्जापैकी ९७.१% कर्ज घराच्या तारणावर (Secured) असून केवळ २.९% कर्ज विनातारण आहे.',
      detailedAuditEn: [
        'Secured Real Estate Debt: ₹16,55,689 with Equitas Small Finance Bank.',
        'Unsecured Revolving Debt: ₹49,290 with Axis Bank.',
        'Independent property valuation: ₹47,40,000 (Survey #248, Islampur, Sangli). Net unencumbered equity: ₹30,84,311.',
        'Lenders grade secured asset-heavy portfolios at lowest probability of default (PD).'
      ],
      detailedAuditMr: [
        'तारण मालमत्ता कर्ज: ₹१६,५५,६८९ (इक्विटास स्मॉल फायनान्स बँक).',
        'विनातारण फिरते कर्ज: ₹४९,२९० (एक्सिस बँक क्रेडिट कार्ड).',
        'सांगली इस्लामपूर येथील मालमत्तेचे मूल्य ₹४७.४ लाख असून निव्वळ सुरक्षा ₹३०.८ लाख आहे.',
        'बँकांच्या मते अशा कर्जदारांचे कर्ज बुडण्याची शक्यता अत्यंत नगण्य असते.'
      ],
      remediationAdviceEn: 'Maintain this superior ratio. Avoid taking multiple small consumer durable or app-based personal loans that dilute secured weightage.',
      remediationAdviceMr: 'हे संतुलन कायम ठेवा. विनातारण किंवा मोबाईल ॲप्सवरील लहान कर्जे घेणे टाळा.',
      rbiCitation: 'RBI Prudential Norms on Residential Mortgages and LTV Caps (DBOD.BP.BC.No.104)'
    },
    {
      id: 'pillar-4-vintage',
      pillarNumber: 4,
      titleEn: 'Credit Age, Vintage & Account Maturity Audit',
      titleMr: 'कर्ज इतिहास कालावधी (Vintage) व खात्यांची परिपक्वता',
      weight: 15,
      score: 98,
      status: 'EXCELLENT',
      statusMr: 'अव्वल श्रेणी (९८/१००)',
      keyMetricLabel: 'Oldest Active/Closed Line',
      keyMetricValue: '13.8 Years (Oct 2011) • 6.4 Yrs AAoA',
      benchmarkRule: 'Elite Vintage Tier: > 7.0 Years Average Account Age (AAoA)',
      summaryEn: 'Veteran credit profile with 13.8 years of documented financial maturity. Bureau engines grant maximum longevity points for histories spanning over a decade.',
      summaryMr: '१३.८ वर्षांचा दीर्घ आणि विश्वासार्ह इतिहास. ऑक्टोबर २०११ पासून युनियन बँकेच्या शैक्षणिक कर्जाने सुरू झालेला हा प्रवास उत्कृष्ट आर्थिक परिपक्वता दाखवतो.',
      detailedAuditEn: [
        'Oldest tradeline: Union Bank of India Education Loan opened on October 06, 2011 (Satisfactorily Closed).',
        'Average Age of Accounts (AAoA): 6.4 Years across 11 financial relationships.',
        'Active property mortgage running continuously since September 2020 (4.5+ years of unblemished servicing).',
        'Account longevity insulates the applicant against minor market fluctuations.'
      ],
      detailedAuditMr: [
        'सर्वात जुने खाते: युनियन बँक ऑफ इंडिया शैक्षणिक कर्ज (ऑक्टोबर २०११ मध्ये उघडले व यशस्वीरित्या बंद झाले).',
        'खात्यांचे सरासरी वय (AAoA): ६.४ वर्षे.',
        'इक्विटास बँकेचे कर्ज गेल्या ४.५ वर्षांपासून अखंडित चालू आहे.',
        'दीर्घ इतिहासामुळे बँका नवीन कर्ज देताना प्राधान्य देतात.'
      ],
      remediationAdviceEn: 'CRITICAL: Never close your oldest active credit lines, as doing so compresses your average credit age and dampens score progression.',
      remediationAdviceMr: 'महत्त्वाचे: जुनी खाती किंवा पहिले क्रेडिट कार्ड कधीही बंद करू नका, यामुळे सरासरी वय कमी होऊन स्कोअर घटतो.',
      rbiCitation: 'CIBIL Credit Information Bureau Regulations & Scoring Methodology (Act 30 of 2005)'
    },
    {
      id: 'pillar-5-inquiries',
      pillarNumber: 5,
      titleEn: 'Hard Inquiry Velocity & Credit Hunger Audit',
      titleMr: 'कर्ज चौकशी वारंवारता (Hard Inquiries) व क्रेडिट हंगर ऑडिट',
      weight: 10,
      score: 88,
      status: 'GOOD',
      statusMr: 'चांगले (८८/१००)',
      keyMetricLabel: 'Recent Hard Inquiries',
      keyMetricValue: '0 in Past 90 Days • 1 in Past 12 Months',
      benchmarkRule: 'Safe Underwriting Standard: ≤ 2 Hard Inquiries per 180-day cycle',
      summaryEn: 'Zero recent credit hunger. Single auto loan inquiry at State Bank of India in 2024 has fully seasoned. Past consumer inquiries from 2023 no longer carry score penalties.',
      summaryMr: 'कर्जासाठी कोणतीही घाई किंवा अति-चौकशी नाही. एसबीआयमध्ये २०२४ मध्ये झालेली १ वाहन कर्ज चौकशी पूर्णपणे जुनी झाली असून तिचा स्कोअरवर परिणाम नाही.',
      detailedAuditEn: [
        'Past 30 Days: 0 inquiries (Completely clear).',
        'Past 90 Days: 0 inquiries (Low risk tier).',
        'Past 12 Months: 1 inquiry (SBI Car Loan application, July 2024).',
        'Older Inquiries (>12 Months): 4 inquiries from 2023-2024 have naturally aged out of calculation engines.'
      ],
      detailedAuditMr: [
        'मागील ३० दिवस: ० चौकशी (पूर्णपणे सुरक्षित).',
        'मागील ९० दिवस: ० चौकशी (कमी जोखीम).',
        'मागील १२ महिने: फक्त १ चौकशी (एसबीआय कार लोन, जुलै २०२४).',
        '१२ महिन्यांपेक्षा जुन्या ४ चौकशींचे गुण आता वजा होत नाहीत.'
      ],
      remediationAdviceEn: 'Always use franchise soft-pull eligibility checks before submitting formal bank applications to avoid unnecessary hard inquiry dings.',
      remediationAdviceMr: 'बँकेत थेट अर्ज करण्यापूर्वी डिजिटल कट्टा केंद्रावर सॉफ्ट-चेक करूनच अर्ज करा.',
      rbiCitation: 'Credit Information Companies (Regulation) Rules 2006, Rule 20'
    },
    {
      id: 'pillar-6-derogatory',
      pillarNumber: 6,
      titleEn: 'Derogatory Flags, Settlements & Legal Status Audit',
      titleMr: 'नकारात्मक नोंदी, सेटलमेंट (तडजोड) व कायदेशीर स्थिती ऑडिट',
      weight: 10,
      score: 72,
      status: 'ATTENTION',
      statusMr: 'दुरुस्ती आवश्यक (७२/१००)',
      keyMetricLabel: 'Derogatory Registry Status',
      keyMetricValue: 'Zero Suit Filed • Zero Wilful Default • 2 Settled (2022)',
      benchmarkRule: 'Zero Settled Flags within 36-60 Months for Automated Tier 1 Approval',
      summaryEn: 'Clean legal registry with zero wilful defaults or litigation. However, 2 credit cards (SBI Card & HDFC Bank) carry "Settled" status from mid-2022, requiring nodal remediation for top-tier PSU banks.',
      summaryMr: 'कोणताही कोर्ट केस किंवा विलफुल डिफॉल्ट नाही. तथापि, २०२२ मधील एसबीआय कार्ड व एचडीएफसी कार्डवर "Settled" (तडजोड) शेरा आहे, जो एनडीसी भरून "Closed" करणे आवश्यक आहे.',
      detailedAuditEn: [
        'SBI Cards (A/C: ...1902): Marked Settled in Aug 2022 (Settlement amount: ₹34,200 against ₹48,000 claim).',
        'HDFC Bank Card (A/C: ...8814): Marked Settled in June 2022 (Settlement amount: ₹28,500 against ₹39,000 claim).',
        'Under RBI Prudential Guidelines, "Settled" signifies a lender haircut and remains visible on CIR for 7 years unless converted.',
        'Tier-1 PSU banks (SBI, BoB) run automated rejections on "Settled" cards unless a formal No Dues Certificate (NDC) is presented.'
      ],
      detailedAuditMr: [
        'एसबीआय कार्ड्स: ऑगस्ट २०२२ मध्ये तडजोड (Settled ₹३४,२०० भरले, उर्वरित माफ).',
        'एचडीएफसी बँक कार्ड: जून २०२२ मध्ये तडजोड (Settled ₹२८,५०० भरले).',
        'आरबीआय नियमानुसार "Settled" चा अर्थ बँकेचे नुकसान झाला असा होतो व हा शेरा ७ वर्षे राहतो.',
        'नोडल अधिकाऱ्यांशी संपर्क साधून उर्वरित तफावत भरल्यास "Closed" शेरा आणि एनडीसी (NOC) मिळते.'
      ],
      remediationAdviceEn: 'Execute Bank Nodal Reconciliation: Pay the remaining waiver differential (~₹14,000 to SBI, ~₹10,500 to HDFC) to convert status to "Closed". Yields +45 to +65 points!',
      remediationAdviceMr: 'बँक नोडल अधिकाऱ्यांना उर्वरित तफावत रक्कम भरून "No Dues Certificate" मिळवा आणि सिबिलमध्ये "Closed" नोंदवा.',
      rbiCitation: 'RBI Master Circular on Wilful Defaulters & Prudential Framework (RBI/2018-19/203 DBR.No.BP.BC.45/21.04.048)'
    },
    {
      id: 'pillar-7-demographics',
      pillarNumber: 7,
      titleEn: 'Demographic Consistency, KYC & Identity Integrity Audit',
      titleMr: 'केवायसी सुसंगतता, पॅन-आधार जोडणी व ओळख अखंडता ऑडिट',
      weight: 5,
      score: 100,
      status: 'EXCELLENT',
      statusMr: 'परिपूर्ण (१००/१००)',
      keyMetricLabel: 'Identity Match Purity',
      keyMetricValue: '100% Match • Verified PAN & Dual Address Trail',
      benchmarkRule: 'Single PAN mapping across all Member Lending Institutions (MLIs)',
      summaryEn: 'Pristine identity integrity. Full name, PAN (BPUPP5844M), Date of Birth, and mobile number match across all 11 bureau tradelines without synthetic identity discrepancies.',
      summaryMr: 'परिपूर्ण ओळख पडताळणी. पॅन कार्ड, जन्मतारीख, नाव आणि मोबाईल सर्व ११ खात्यांमध्ये तंतोतंत जुळत असून कोणतीही विसंगती नाही.',
      detailedAuditEn: [
        'PAN BPUPP5844M verified with Income Tax Department & UIDAI Aadhaar seeding.',
        'Address 1 (Permanent): Survey #248, Near Sugar Factory, Islampur, Sangli - Verified Ancestral Residence.',
        'Address 2 (Institutional): Staff Quarters, Academic Complex, IIT Kharagpur, West Bengal - Verified Academic Employment.',
        'Zero instances of unauthorized mobile numbers, conflicting addresses, or fraudulent inquiry tags.'
      ],
      detailedAuditMr: [
        'पॅन कार्ड आयकर विभाग आणि आधार कार्डशी जोडलेले आहे.',
        'पत्ता १: इस्लामपूर, सांगली (कायमचा स्वतःचा पत्ता).',
        'पत्ता २: आयआयटी खरगपूर (चालू शैक्षणिक नोकरीचा पत्ता).',
        'ओळख चोरी किंवा चुकीच्या मोबाईल नंबरची कोणतीही नोंद नाही.'
      ],
      remediationAdviceEn: 'No corrective action needed. Demographics satisfy RBI Master Direction on Know Your Customer (KYC) standards.',
      remediationAdviceMr: 'कोणत्याही दुरुस्तीची गरज नाही. केवायसी कागदपत्रे सर्व बँकांसाठी परिपूर्ण आहेत.',
      rbiCitation: 'RBI Master Direction - Know Your Customer (KYC) Direction 2016 (DBR.AML.BC.No.81/14.01.001)'
    }
  ],

  // 4. Issue Detection with Severity & Impact
  detectedIssuesRanked: [
    {
      id: 'iss-747-util',
      code: 'HIGH_UTILIZATION',
      severity: 'HIGH',
      category: 'Utilization',
      titleEn: 'High Revolving Credit Card Utilization (71.4%) on Axis Bank',
      titleMr: 'एक्सिस बँकेच्या क्रेडिट कार्डवर उच्च वापर (७१.४%)',
      impactScore: 22,
      legalCitation: 'CIBIL Scoring Engine - Revolving Debt Ratio Matrix',
      descriptionEn: 'Axis Bank credit card has an outstanding balance of ₹49,290 against a sanctioned credit limit of ₹69,000 (71.4%). Bureau scoring models heavily penalize utilization rates exceeding 30%.',
      descriptionMr: 'एक्सिस बँकेच्या क्रेडिट कार्डवर ₹६९,००० मर्यादेपैकी ₹४९,२९० चालू वापर आहे. ३०% पेक्षा जास्त वापर असल्यास सिबिल स्कोअरवर थेट २०-२५ गुणांचा नकारात्मक परिणाम होतो.',
      recommendedActionEn: 'Pay down ₹28,590 prior to next bill generation to bring utilization below ₹20,700 (30% threshold).',
      recommendedActionMr: 'पुढील बिलिंग तारखेपूर्वी किमान ₹२८,५९० भरून वापर ३०% (₹२०,७००) च्या खाली आणा.',
      bankName: 'Axis Bank Ltd',
      accountAffected: '102000004250293'
    },
    {
      id: 'iss-747-delinq',
      code: 'HISTORICAL_DELINQUENCY',
      severity: 'MEDIUM',
      category: 'Delinquency',
      titleEn: 'Historical 192-Day Delinquency in April 2022 on ICICI Card',
      titleMr: 'एप्रिल २०२२ मध्ये आयसीआयसीआय कार्डवरील १९२ दिवसांची जुनी उशीर नोंद',
      impactScore: 18,
      legalCitation: 'CICRA 2005 Section 21 & RBI Master Directions on Aging Tradelines',
      descriptionEn: 'ICICI Bank card 15635814 suffered a 192-day DPD default in early 2022. While settled in July 2022 and followed by 4+ years of flawless payments, lenders still notice the historical settlement tag.',
      descriptionMr: '२०२२ च्या सुरुवातीस पेमेंटमध्ये उशीर झाला होता, परंतु जुलै २०२२ मध्ये सेटलमेंट झाली असून गेल्या ४ वर्षांपासून सर्व हप्ते वेळेवर भरले आहेत.',
      recommendedActionEn: 'Approach ICICI Nodal Officer for No Dues Certificate (NDC) and request tradeline reclassification from "Settled" to "Closed in Full".',
      recommendedActionMr: 'आयसीआयसीआय बँकेकडून नो ड्यूज सर्टिफिकेट (NDC) घेऊन "Settled" शेरा काढून "Closed" म्हणून दुरुस्त करण्याची विनंती करा.',
      bankName: 'ICICI Bank Ltd',
      accountAffected: '0000000015635814'
    },
    {
      id: 'iss-747-settled',
      code: 'SETTLED_TAG_ERROR',
      severity: 'HIGH',
      category: 'Delinquency',
      titleEn: 'Settled Status Tags on SBI Card, HDFC Bank & ICICI Bank (2022)',
      titleMr: 'एसबीआय, एचडीएफसी आणि आयसीआयसीआय कार्ड्सवर "Settled" शेरा',
      impactScore: 25,
      legalCitation: 'CICRA 2005 Rule 19 - Settlement vs Clean Discharge',
      descriptionEn: 'Three credit cards settled in 2022 show zero balance but retain "Settled" tags. Automated underwriting systems from tier-1 private banks frequently auto-reject unsecured loan applications with settled tags.',
      descriptionMr: 'तीन क्रेडिट कार्ड्सवर "Settled" शेरा असल्याने काही खाजगी बँका विनातारण कर्ज नाकारू शकतात, जरी चालू थकबाकी शून्य असली तरी.',
      recommendedActionEn: 'Submit closure verification receipts to CIBIL and request bureau status upgrade.',
      recommendedActionMr: 'कर्जफेडीच्या पावत्या जोडून सिबिलकडे खाते क्लोजरसाठी अर्ज दाखल करा.',
      bankName: 'SBI Card, HDFC Bank, ICICI Bank',
      accountAffected: 'Multiple Tradelines'
    },
    {
      id: 'iss-747-enquiry',
      code: 'ENQUIRY_SPIKE',
      severity: 'MEDIUM',
      category: 'Enquiries',
      titleEn: '11 Hard Enquiries in 24 Months with Business Loan Rejections',
      titleMr: '२४ महिन्यांत ११ नवीन चौकशी आणि व्यवसाय कर्ज नाकारल्याची नोंद',
      impactScore: 12,
      legalCitation: 'RBI CICRA Aggregation Guidelines - Hard Inquiry Frequencies',
      descriptionEn: '11 inquiries recorded across 2 years with only 3 approvals (27% approval rate). Equitas SFB rejected two ₹10L business loans in June 2025 due to lack of business income documentation.',
      descriptionMr: '११ पैकी केवळ ३ अर्ज मंजूर झाले. जून २०२५ मध्ये दोन व्यवसाय कर्ज अर्ज नाकारले गेले, कारण व्यावसायिक उत्पन्नाचे कागदपत्र उपलब्ध नव्हते.',
      recommendedActionEn: 'Enforce a strict 6-month cooling off period on fresh credit applications. Focus on asset-backed lending.',
      recommendedActionMr: 'पुढील ६ महिने नवीन कर्जासाठी अर्ज करणे टाळा. केवळ तारण कर्जासाठीच प्रयत्न करा.'
    },
    {
      id: 'iss-747-ident',
      code: 'WRONG_PERSONAL_INFO',
      severity: 'LOW',
      category: 'Identity',
      titleEn: 'Multi-Location Residence Discrepancy (IIT Kharagpur Hostel vs Islampur)',
      titleMr: 'निवासस्थान पत्त्यांमध्ये विसंगती (आयआयटी खरगपूर वसतिगृह वि. इस्लामपूर घर)',
      impactScore: 5,
      legalCitation: 'RBI KYC Master Directions - Demographic Consistency',
      descriptionEn: 'Academic hostel address at IIT Kharagpur contrasts with permanent owned residential address in Islampur, Maharashtra. While explained by employment, automated KYC checks flags a minor demographic inconsistency.',
      descriptionMr: 'शैक्षणिक संस्थेचा तात्पुरता पत्ता आणि इस्लामपूरचा कायमचा पत्ता यांमुळे केवायसी सिस्टीममध्ये किरकोळ अलर्ट निर्माण होतो.',
      recommendedActionEn: 'Submit official employer verification letter confirming IIT Kharagpur employment and residential quarters.',
      recommendedActionMr: 'आयआयटी खरगपूरचे अधिकृत नोकरी प्रमाणपत्र जोडून पत्ता नियमित करा.'
    }
  ],

  // 5. Prioritized Action Plan (3 Phases)
  actionPlanGrouped: [
    {
      id: 'act-747-01',
      phase: 'Immediate (0-30 Days)',
      phaseMr: 'तातडीच्या कृती (०-३० दिवस)',
      priority: 'CRITICAL',
      titleEn: 'Reduce Axis Credit Card Utilization Below 30%',
      titleMr: 'एक्सिस क्रेडिट कार्ड वापर ३०% पेक्षा कमी करा',
      scoreGain: 22,
      actionEn: 'Pay down ₹28,590 on Axis Bank card (balance from ₹49,290 down to ₹20,700). This immediately remedies the negative scoring factor.',
      actionMr: 'एक्सिस बँकेच्या कार्डवर ₹२८,५९० भरून शिल्लक रक्कम ₹२०,७०० च्या आत आणा. यामुळे स्कोअर लगेच वाढेल.',
      category: 'Utilization',
      disputeReady: false,
      accountRef: '102000004250293'
    },
    {
      id: 'act-747-02',
      phase: 'Immediate (0-30 Days)',
      phaseMr: 'तातडीच्या कृती (०-३० दिवस)',
      priority: 'HIGH',
      titleEn: 'Automate Equitas SFB Property Loan EMI (₹20,337)',
      titleMr: 'इक्विटास बँकेचा हप्ता (₹२०,३३७) ऑटो-डेबिट करा',
      scoreGain: 8,
      actionEn: 'Ensure auto-debit NACH mandate remains funded at least 3 days prior to due date to safeguard the 100% on-time record.',
      actionMr: 'इक्विटास बँकेचा मासिक ईएमआय वेळेवर जाण्यासाठी खात्यात पुरेसे पैसे ठेवा.',
      category: 'Repayment',
      disputeReady: false,
      accountRef: '700011720636'
    },
    {
      id: 'act-747-03',
      phase: 'Immediate (0-30 Days)',
      phaseMr: 'तातडीच्या कृती (०-३० दिवस)',
      priority: 'MEDIUM',
      titleEn: 'Freeze All Fresh Credit Enquiries for 6 Months',
      titleMr: 'पुढील ६ महिने नवीन कर्ज अर्ज पूर्णपणे थांबवा',
      scoreGain: 10,
      actionEn: 'Refrain from submitting retail loan or credit card applications until March 2027 to eliminate hard inquiry penalties.',
      actionMr: 'नवीन क्रेडिट कार्ड किंवा वैयक्तिक कर्जासाठी अर्ज करणे थांबवा, ज्यामुळे स्कोअर पूर्ववत होईल.',
      category: 'Enquiries',
      disputeReady: false
    },
    {
      id: 'act-747-04',
      phase: 'Short-Term (1-3 Months)',
      phaseMr: 'अल्पकालीन उद्दिष्टे (१-३ महिने)',
      priority: 'HIGH',
      titleEn: 'Build a Liquid Emergency Fund (6 Months Expenses)',
      titleMr: '६ महिन्यांचा इमर्जन्सी फंड (आपत्कालीन निधी) तयार करा',
      scoreGain: 5,
      actionEn: 'Accumulate ₹1.5L - ₹2.5L in liquid savings or bank fixed deposits to prevent any future credit default risks during emergencies.',
      actionMr: 'आपत्कालीन खर्चासाठी लिक्विड खात्यात निधी सुरक्षित ठेवा जेणेकरून हप्ते कधीही चुकणार नाहीत.',
      category: 'Financial Health',
      disputeReady: false
    },
    {
      id: 'act-747-05',
      phase: 'Short-Term (1-3 Months)',
      phaseMr: 'अल्पकालीन उद्दिष्टे (१-३ महिने)',
      priority: 'MEDIUM',
      titleEn: 'Document Secondary Research / Consulting Income',
      titleMr: 'अतिरिक्त व्यावसायिक/संशोधन उत्पन्नाचे कागदपत्रे तयार करा',
      scoreGain: 10,
      actionEn: 'Consolidate Form 16, research consultancy certificates, and 2-year ITRs to build credentials for future business/MSME credit.',
      actionMr: 'आयटीआर आणि अतिरिक्त उत्पन्नाचे पुरावे तयार ठेवा, ज्यामुळे भविष्यात व्यवसाय कर्ज सहज मिळेल.',
      category: 'Income Documentation',
      disputeReady: false
    },
    {
      id: 'act-747-06',
      phase: 'Medium-Term (3-12 Months)',
      phaseMr: 'मध्यमकालीन उद्दिष्टे (३-१२ महिने)',
      priority: 'HIGH',
      titleEn: 'Target CIBIL 800+ Tier & Negotiate Loan Rate Concessions',
      titleMr: '८००+ सिबिल स्कोअर गाठा आणि व्याजदरात सवलत मिळवा',
      scoreGain: 25,
      actionEn: 'With 12 months of sustained on-time Equitas payments and low card utilization, request prime lending rate (75-100 bps discount) on mortgages.',
      actionMr: '८००+ स्कोअर झाल्यावर सध्याच्या गृहकर्जावर ७५ ते १०० बेसिस पॉईंट्स व्याजदर कमी करून घ्या.',
      category: 'Score Optimization',
      disputeReady: false
    }
  ],

  // 6. Expected Score Improvement Timeline
  scoreProjection: {
    currentScore: 747,
    score3Months: '760 - 775',
    score6Months: '785 - 800',
    score12Months: '800 - 820',
    trajectory: 'improving',
    keyLeverEn: 'Aggressive card pay-down to <30% utilization & 12 consecutive months of flawless Equitas property loan EMIs.',
    keyLeverMr: 'क्रेडिट कार्ड वापर ३०% खाली आणणे आणि इक्विटास गृहकर्जाचे सर्व हप्ते वेळेवर भरणे.'
  },

  // 7. Loan Eligibility & Recommendation Matrix (Credit Dost Institutional Standard)
  loanRecommendations: [
    {
      id: 'loan-home',
      category: 'Residential Home Loan / Housing Mortgage',
      categoryMr: 'गृहकर्ज / निवासी मालमत्ता तारण कर्ज',
      decision: 'Highly Approved',
      decisionMr: 'विशेष प्राधान्याने मंजूर (९६% संभाव्यता)',
      approvalOdds: 96,
      recommendedLimit: '₹35 - 50 Lakhs',
      interestTerms: '8.40% - 8.85% p.a. (Repo + 1.90% EBLR Spread)',
      tenureRange: '15 to 30 Years',
      estimatedEmi: '₹26,690 / mo (on ₹30L @ 8.5% for 20 Yrs)',
      foirImpact: '+21.3% Net Income (Total Obligation 38.5% - Safe)',
      targetLendersTier1: ['State Bank of India (Regular Home Loan)', 'HDFC Bank Ltd', 'Bank of Baroda (Baroda Home Loan)'],
      targetLendersTier2: ['Kotak Mahindra Bank', 'LIC Housing Finance Ltd', 'Bajaj Housing Finance'],
      targetLendersSFB: ['Equitas Small Finance Bank (Pre-screened)', 'AU Small Finance Bank'],
      underwriterFrictionEn: 'Credit committee manual scrutiny regarding 2 historic card settlements from early 2022.',
      underwriterFrictionMr: '२०२२ मधील जुन्या २ कार्ड सेटलमेंट नोंदींचे मॅन्युअल अंडररायटिंग तपासणी.',
      compensatingFactorsEn: '48 months unbroken flawless clearance on existing ₹16.55L Equitas mortgage, verified Sangli residential property valuation of ₹47.4 Lakhs (LTV < 65%), and prestigious IIT Kharagpur permanent income stream.',
      compensatingFactorsMr: 'इक्विटास बँकेच्या ₹१६.५५ लाखांच्या कर्जाचे ४८ महिने १००% वेळेवर भरलेले हप्ते, ₹४७.४ लाखांचे स्वतःचे घर आणि आयआयटी खरगपूरचे कायमस्वरूपी वेतन.',
      requiredDocsEn: ['3 Months IIT Salary Slips', '2 Years Form 16', '6 Months Salary Account Bank Statement', 'Registered Title Deed & Index II of Property'],
      requiredDocsMr: ['३ महिन्यांचे पगार स्लिप', '२ वर्षांचे फॉर्म १६', '६ महिन्यांचे बँक स्टेटमेंट', 'मालमत्ता खरेदीखत व इंडेक्स २'],
      specialConditionsEn: 'Collateral coverage of minimum 133% (LTV <= 75%). Existing property loan (₹16.5L) serves as stellar benchmark.',
      specialConditionsMr: 'तारण मूल्यांकन मजबूत असावे. सध्याचे मालमत्ता कर्ज उत्कृष्ट परतफेड दर्शवते.',
      riskRating: 'Low'
    },
    {
      id: 'loan-lap',
      category: 'Loan Against Property (LAP) / Mortgage Refinance',
      categoryMr: 'मालमत्ता तारण कर्ज (LAP) व व्याजदर फेररचना',
      decision: 'Highly Approved',
      decisionMr: 'विशेष प्राधान्याने मंजूर (९५% संभाव्यता)',
      approvalOdds: 95,
      recommendedLimit: '₹25 - 35 Lakhs',
      interestTerms: '8.90% - 9.50% p.a.',
      tenureRange: '10 to 15 Years',
      estimatedEmi: '₹25,230 / mo (on ₹25L @ 9.0% for 15 Yrs)',
      foirImpact: '+20.1% Net Income',
      targetLendersTier1: ['Union Bank of India', 'State Bank of India', 'ICICI Bank Mortgage Desk'],
      targetLendersTier2: ['Tata Capital Financial Services', 'Bajaj Finserv Ltd', 'PNB Housing Finance'],
      targetLendersSFB: ['Equitas Small Finance Bank (Internal Top-up Program)'],
      underwriterFrictionEn: 'Prior registered mortgage with Equitas SFB requiring MODTD or Takeover NOC.',
      underwriterFrictionMr: 'इक्विटास बँकेकडे आधीच तारण असल्याने टेकओव्हर एनओसी किंवा टॉप-अपची प्रक्रिया.',
      compensatingFactorsEn: 'Equitas internal customer score qualifies for "Instant Internal Top-Up" without fresh technical valuation due to ₹30.8L unencumbered equity buffer.',
      compensatingFactorsMr: 'इक्विटास बँकेत चांगला इतिहास असल्याने कोणतीही तांत्रिक अडचण न येता त्वरित टॉप-अप मिळू शकते.',
      requiredDocsEn: ['Existing Equitas SFB Loan Statement', 'Latest Property Tax Paid Receipt', 'Original Title Documents in Bank Custody'],
      requiredDocsMr: ['चालू कर्जाचे स्टेटमेंट', 'मालमत्ता कर पावती', 'मूळ कागदपत्रे ताबा पत्र'],
      specialConditionsEn: 'Option A: Internal top-up of ₹15L with Equitas SFB (fastest, 48 hrs). Option B: Complete balance transfer to SBI for 85 bps rate reduction.',
      specialConditionsMr: 'पर्याय १: इक्विटास बँकेकडून ₹१५ लाखांचा त्वरित टॉप-अप (४८ तासांत). पर्याय २: एसबीआयमध्ये कर्ज हस्तांतरण करून ०.८५% व्याजदर बचत.',
      riskRating: 'Low'
    },
    {
      id: 'loan-personal',
      category: 'Salaried / Professional Personal Term Loan',
      categoryMr: 'नोकरदार / व्यावसायिक वैयक्तिक मुदत कर्ज',
      decision: 'Approved',
      decisionMr: 'मंजूर (८८% संभाव्यता)',
      approvalOdds: 88,
      recommendedLimit: '₹15 - 20 Lakhs',
      interestTerms: '10.49% - 11.99% p.a. (Prime Salaried Tier)',
      tenureRange: '36 to 60 Months',
      estimatedEmi: '₹32,230 / mo (on ₹15L @ 10.5% for 60 Mos)',
      foirImpact: '+25.7% Net Income',
      targetLendersTier1: ['HDFC Bank (Insta Personal Loan)', 'ICICI Bank Ltd', 'Axis Bank Ltd'],
      targetLendersTier2: ['Tata Capital', 'Bajaj Finance Ltd', 'Federal Bank'],
      targetLendersSFB: ['Equitas SFB Personal Loans'],
      underwriterFrictionEn: 'Revolving card balance at 71.4% utilization may trigger automated system capping of sanction amount to ₹12 Lakhs.',
      underwriterFrictionMr: 'क्रेडिट कार्डचा ७१% वापर असल्याने संगणकीय सिस्टिम सुरुवातीला रक्कम ₹१२ लाखांवर मर्यादित करू शकते.',
      compensatingFactorsEn: 'IIT Kharagpur employment is categorized as "Super Tier-1 Employer (Institutes of National Importance)", granting highest institutional multiplier (up to 18x net monthly salary).',
      compensatingFactorsMr: 'आयआयटी खरगपूर ही राष्ट्रीय महत्त्वाची संस्था असल्याने बँका पगाराच्या १८ पट कर्ज देण्यास उत्सुक असतात.',
      requiredDocsEn: ['IIT Official Employee ID Card', 'Last 3 Months Salary Slips with Official Seal', 'Last 6 Months Bank Statement (Salary Credits)'],
      requiredDocsMr: ['आयआयटी अधिकृत ओळखपत्र', 'गेल्या ३ महिन्यांचे पगार स्लिप', '६ महिन्यांचे पगार बँक खाते स्टेटमेंट'],
      specialConditionsEn: 'Execute card paydown to <30% before applying to secure highest sanction bucket (₹20L) at lowest tier rate (10.49%).',
      specialConditionsMr: 'अर्ज करण्यापूर्वी क्रेडिट कार्ड वापर ३०% खाली आणल्यास कमाल ₹२० लाख कर्ज १०.४९% दराने मंजूर होईल.',
      riskRating: 'Low'
    },
    {
      id: 'loan-auto',
      category: 'New Vehicle / Automobile Loan',
      categoryMr: 'नवीन वाहन / कार खरेदी कर्ज',
      decision: 'Highly Approved',
      decisionMr: 'विशेष प्राधान्याने मंजूर (९४% संभाव्यता)',
      approvalOdds: 94,
      recommendedLimit: '₹12 - 18 Lakhs (Up to 90% On-Road)',
      interestTerms: '8.65% - 9.15% p.a. Fixed/Floating',
      tenureRange: '3 to 7 Years',
      estimatedEmi: '₹18,850 / mo (on ₹12L @ 8.75% for 7 Yrs)',
      foirImpact: '+15.1% Net Income',
      targetLendersTier1: ['State Bank of India (Car Loan Desk)', 'Bank of Baroda', 'HDFC Bank Auto Finance'],
      targetLendersTier2: ['Kotak Prime Ltd', 'ICICI Bank Auto Desk'],
      targetLendersSFB: ['AU Small Finance Bank Wheels'],
      underwriterFrictionEn: 'Zero material friction. Hypothecated asset provides full collateral protection to lender.',
      underwriterFrictionMr: 'कोणतीही अडचण नाही. गाडीचे स्वतःचे तारण असल्याने त्वरित मंजुरी मिळते.',
      compensatingFactorsEn: 'July 2024 SBI car loan inquiry already created an open lead in SBI core banking. Can be activated within 24 hours with zero processing fee offers.',
      compensatingFactorsMr: 'जुलै २०२४ मध्ये एसबीआयमध्ये झालेली चौकशी आधीच सक्रिय असून २४ तासांत प्रक्रिया शुल्क माफीसह कर्ज मिळू शकते.',
      requiredDocsEn: ['Vehicle Proforma Invoice / Quotation from Authorized Dealer', 'KYC Documents & Passport Photo', 'Post-dated ECS/NACH Mandate'],
      requiredDocsMr: ['अधिकृत डीलरकडून कोटेशन', 'केवायसी व पासपोर्ट फोटो', 'ईसीएस / मँडेट'],
      specialConditionsEn: 'Standard vehicle hypothecation with comprehensive zero-depreciation insurance policy endorsing the lender.',
      specialConditionsMr: 'वाहनावर बँकेचा ताबा (हायपोथिकेशन) व शून्य घसारा विमा अनिवार्य.',
      riskRating: 'Low'
    },
    {
      id: 'loan-cards',
      category: 'Pre-Approved & Premium Credit Cards',
      categoryMr: 'क्रेडिट कार्ड मर्यादा वाढ व प्रीमियम रिवॉर्ड कार्ड्स',
      decision: 'Conditional',
      decisionMr: 'अटींसह मंजूर (६५% संभाव्यता)',
      approvalOdds: 65,
      recommendedLimit: '₹1,50,000 - ₹2,50,000 Sanctioned Limit',
      interestTerms: 'Revolving APR (3.25% - 3.49% p.m. / 39% p.a.)',
      tenureRange: '45 to 50 Days Free Credit Window',
      estimatedEmi: 'N/A (Revolving Facility)',
      targetLendersTier1: ['Axis Bank (Limit Enhancement on existing card)', 'ICICI Bank (Coral / Sapphiro)', 'HDFC Bank (Regalia Gold)'],
      targetLendersTier2: ['SBI Card (Cashback / Prime - with settlement clearance)', 'IDFC FIRST Bank (Wealth Card)'],
      targetLendersSFB: ['AU Small Finance Bank Zenith Card'],
      underwriterFrictionEn: 'Current Axis Bank card utilization of 71.4% triggers automated risk alerts on credit card issuing algorithms.',
      underwriterFrictionMr: 'सध्याच्या कार्डवर ७१% वापर असल्याने नवीन कार्डाचे अल्गोरिदम अर्ज थांबवू शकतात.',
      compensatingFactorsEn: 'Axis Bank internal cardholder relationship of 1.5+ years with zero late fee penalties makes client eligible for instant credit limit doubling from ₹69,000 to ₹1,40,000 upon paying ₹28,590.',
      compensatingFactorsMr: 'एक्सिस बँकेत १.५ वर्षांपासून चांगला वापर असल्याने फक्त चालू बिल भरताच कार्ड मर्यादा त्वरित दुप्पट (₹१.४ लाख) होऊ शकते.',
      requiredDocsEn: ['Proof of Axis Bank card paydown receipt', 'Latest salary credit proof'],
      requiredDocsMr: ['कार्ड पेमेंट पावती', 'पगार जमा झाल्याचा पुरावा'],
      specialConditionsEn: 'Mandatory condition: Reduce current card outstanding below ₹20,700 prior to submitting fresh credit card applications.',
      specialConditionsMr: 'अनिवार्य अट: नवीन कार्डसाठी अर्ज करण्यापूर्वी चालू कार्डचे बिल ₹२०,७०० च्या खाली आणा.',
      riskRating: 'Moderate'
    },
    {
      id: 'loan-usedcar',
      category: 'Used Vehicle Refinance & Two-Wheeler Loans',
      categoryMr: 'जुने वाहन कर्ज व दुचाकी सुलभ हप्ता योजना',
      decision: 'Highly Approved',
      decisionMr: 'विशेष प्राधान्याने मंजूर (९५% संभाव्यता)',
      approvalOdds: 95,
      recommendedLimit: '₹4 - 8 Lakhs (Up to 85% of Valuation)',
      interestTerms: '11.5% - 13.5% p.a.',
      tenureRange: '2 to 5 Years',
      estimatedEmi: '₹11,500 / mo (on ₹5L @ 12.0% for 4 Yrs)',
      targetLendersTier1: ['HDFC Bank Used Car Desk', 'ICICI Bank Pre-Owned Cars'],
      targetLendersTier2: ['Mahindra Finance', 'Hero Fincorp', 'Cholamandalam Finance'],
      targetLendersSFB: ['Equitas Small Finance Bank Used Commercial/Personal Vehicles'],
      underwriterFrictionEn: 'Vehicle age criteria (vehicle must not exceed 10 years at loan maturity).',
      underwriterFrictionMr: 'वाहनाचे वय कर्ज संपताना १० वर्षांपेक्षा जास्त नसावे.',
      compensatingFactorsEn: 'Borrower credit score of 747 qualifies for Tier-1 interest discount on used asset financing.',
      compensatingFactorsMr: '७४७ सिबिल स्कोअरमुळे जुन्या वाहनांवरही सर्वात कमी व्याजदर लागू होतो.',
      requiredDocsEn: ['Vehicle RC Book copy', 'Insurance Certificate', 'Fitness & RTO Transfer Form 29/30'],
      requiredDocsMr: ['आरसी बुक प्रत', 'विमा पॉलिसी', 'आरटीओ फॉर्म २९/३०'],
      specialConditionsEn: 'Physical technical inspection and valuation by bank approved surveyor.',
      specialConditionsMr: 'बँकेच्या अधिकृत सर्व्हेअरकडून वाहनाची पाहणी व मूल्यांकन.',
      riskRating: 'Low'
    },
    {
      id: 'loan-gold',
      category: 'Instant Sovereign Gold Loan & Overdraft',
      categoryMr: 'त्वरित सोने तारण कर्ज व ओव्हरड्राफ्ट सुविधा',
      decision: 'Highly Approved',
      decisionMr: 'त्वरित मंजूर (९९% हमी - Zero Bureau Friction)',
      approvalOdds: 99,
      recommendedLimit: '₹5 - 25 Lakhs (Based on Gold Weight)',
      interestTerms: '8.50% - 9.75% p.a. (Agricultural / Retail Priority)',
      tenureRange: '6 to 36 Months Bullet or Monthly Interest',
      estimatedEmi: '₹708 / mo per Lakh (Interest Only Scheme)',
      targetLendersTier1: ['State Bank of India (SBI Gold Loan)', 'Union Bank of India', 'Federal Bank'],
      targetLendersTier2: ['Muthoot Finance Ltd', 'Manappuram Finance Ltd'],
      targetLendersSFB: ['Equitas SFB Gold Loan Desk'],
      underwriterFrictionEn: 'None. Underwritten solely on 75% LTV of assayed 22k/24k gold.',
      underwriterFrictionMr: 'कोणतीही अडचण नाही. सोन्याच्या ७५% मूल्यावर तात्काळ रोख मिळते.',
      compensatingFactorsEn: 'Zero bureau impact, 30-minute disbursal, bullet repayment options ideal for bridge financing while card utilization is cleared.',
      compensatingFactorsMr: 'सिबिल चौकशी नाही, ३० मिनिटांत पैसे, कार्डचे बिल भरून स्कोअर वाढवण्यासाठी सर्वोत्तम तात्पुरता पर्याय.',
      requiredDocsEn: ['Aadhaar Card', 'PAN Card', 'Physical Gold Ornaments'],
      requiredDocsMr: ['आधार कार्ड', 'पॅन कार्ड', 'सोन्याचे दागिने'],
      specialConditionsEn: 'Appraiser assay fee of 0.25% applies. Purity minimum 18 karats.',
      specialConditionsMr: 'सोन्याची शुद्धता किमान १८ कॅरेट असणे आवश्यक.',
      riskRating: 'Low'
    },
    {
      id: 'loan-business',
      category: 'Unsecured Business / Mudra / MSME Credit Facility',
      categoryMr: 'विनातारण व्यवसाय कर्ज / मुद्रा / एमएसएमई योजना',
      decision: 'Not Recommended',
      decisionMr: 'सध्या शिफारस नाही (२५% संभाव्यता - High Underwriting Rejection)',
      approvalOdds: 25,
      recommendedLimit: 'N/A (Reapply after 24 months audited financials)',
      interestTerms: '14.5% - 18.0% p.a. (High Risk Subprime)',
      tenureRange: '12 to 36 Months',
      targetLendersTier1: ['N/A for automated channels'],
      targetLendersTier2: ['Lendingkart', 'FlexiLoans', 'Kinara Capital'],
      targetLendersSFB: ['Equitas SFB (Commercial Vehicle / MSME Desk)'],
      underwriterFrictionEn: 'Applicant has 2 recorded historical loan rejections at Equitas SFB due to lack of separate registered business entity, absence of GST returns, and non-availability of audited P&L/Balance Sheets.',
      underwriterFrictionMr: 'इक्विटास बँकेत आधी २ वेळा व्यवसाय कर्ज नाकारले गेले आहे; कारण स्वतंत्र जीएसटी नोंदणी व नफा-तोटा पत्रक उपलब्ध नाही.',
      compensatingFactorsEn: 'Primary income is currently salaried (IIT Kharagpur). If business credit is required in future, register Udyam MSME, file GST for 8 consecutive quarters, and route commercial receipts through a dedicated current account.',
      compensatingFactorsMr: 'सध्या मुख्य उत्पन्न पगार असल्याने आधी उद्यम नोंदणी करून २ वर्षे जीएसटी भरल्याशिवाय व्यवसाय कर्जासाठी अर्ज करू नये.',
      requiredDocsEn: ['Udyam MSME Certificate', '24 Months GST 3B & GSTR-1', 'Audited Financial Statements signed by CA'],
      requiredDocsMr: ['उद्यम नोंदणी प्रमाणपत्र', '२४ महिन्यांचे जीएसटी रिटर्न', 'सीएचे ऑडिट रिपोर्ट'],
      specialConditionsEn: 'Strict advisory: Avoid making applications to fintech business lenders, as repeated hard declines create negative bureau footprint.',
      specialConditionsMr: 'कडक सूचना: वारंवार व्यवसाय कर्जासाठी अर्ज करू नका, यामुळे सिबिलवर नकारात्मक शेरा येतो.',
      riskRating: 'High'
    }
  ],

  // 8. Executive Summary & Final Recommendation
  executiveSummary: {
    verdictTitleEn: 'CREDIT APPLICATION RECOMMENDATION: APPROVED',
    verdictTitleMr: 'क्रेडिट अर्ज शिफारस: मंजूर (APPROVED)',
    verdictTextEn: 'Rajwardhan Madhukar Madhukar demonstrates robust creditworthiness for secured credit products (home loans, auto loans, property loans) and moderate-limit personal loans up to ₹20 Lakhs. The historical 2022 delinquencies have been thoroughly mitigated by 4+ years of unbroken on-time payments and zero current overdue amount.',
    verdictTextMr: 'राजवर्धन मधुकर मधुकर हे तारण कर्ज (गृहकर्ज, वाहन कर्ज) आणि ₹२० लाखांपर्यंतच्या वैयक्तिक कर्जासाठी पूर्णपणे पात्र आहेत. २०२२ मधील जुन्या अडचणींची पूर्तता झाली असून गेल्या ४ वर्षांपासून १००% वेळेवर परतफेड व शून्य थकबाकी आहे.',
    riskProfile: 'Moderate Risk',
    riskProfileMr: 'मध्यम जोखीम',
    riskTrend: 'Improving',
    bestSuitedProducts: [
      'Residential Property Loans (₹30-40L)',
      'Salaried Personal Term Loans (₹15-20L)',
      'Vehicle & Auto Loans (₹10-15L)'
    ],
    bestSuitedProductsMr: [
      'मालमत्ता व गृहकर्ज (₹३०-४० लाख)',
      'नोकरदार वैयक्तिक मुदत कर्ज (₹१५-२० लाख)',
      'वाहन कर्ज (₹१०-१५ लाख)'
    ],
    mandatoryConditionsEn: [
      'Maintain zero overdue status across all obligations',
      'Reduce credit card utilization to below 40% within 3 months',
      'Provide recent IIT Kharagpur salary slips and 2 years ITR',
      'Ensure total monthly EMI burden does not exceed 40% of net income',
      'Observe a 6-month cooling period on fresh unsecured credit inquiries'
    ],
    mandatoryConditionsMr: [
      'सर्व कर्जांवर शून्य थकबाकी कायम ठेवा',
      'क्रेडिट कार्ड वापर ३ महिन्यांत ४०% च्या आत आणा',
      'आयआयटी खरगपूरचे पगार स्लिप आणि २ वर्षांचे आयटीआर द्या',
      'एकूण ईएमआय मासिक उत्पन्नाच्या ४०% पेक्षा जास्त नसावा',
      'पुढील ६ महिने नवीन कर्ज चौकशी करणे टाळा'
    ]
  },

  consultantNotes: 'Client has strong asset backing (residential property worth ₹47.4L in Islampur) and prestigious research employment at IIT Kharagpur. Focus advisory on paying down the Axis card to unlock 775+ score within 90 days, then refinancing property loan interest down by 75 bps.'
};
