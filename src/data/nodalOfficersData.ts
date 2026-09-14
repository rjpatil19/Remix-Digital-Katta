import { BankNodalOfficer, NodalReconciliationCase } from '../types';

/**
 * Official Indian Banking Principal Nodal Officers Directory (RBI Ombudsman Scheme Compliant)
 * Sourced in accordance with RBI Master Directions on Grievance Redressal Mechanism in Banks
 */
export const bankNodalOfficers: BankNodalOfficer[] = [
  {
    id: 'pno-kotak',
    bankCode: 'KKBK',
    bankName: 'Kotak Mahindra Bank',
    bankNameMr: 'कोटक महिंद्रा बँक',
    officerName: 'Mr. Manoj Shah',
    designation: 'Principal Nodal Officer & Executive Vice President',
    email: 'nodal.officer@kotak.com',
    phone: '+91 22 6605 6000 / 1800 209 0000',
    zonalAddress: 'Kotak Towers, Building No. 21, Infinity Park, Off Western Express Highway, Malad (East), Mumbai 400097',
    grievancePortalUrl: 'https://www.kotak.com/en/customer-service/grievance-redressal.html',
    escalationLevel: 'Level 2 - Principal Nodal',
    disputeResolutionSlaDays: 30
  },
  {
    id: 'pno-bajaj',
    bankCode: 'BAJAJ',
    bankName: 'Bajaj Finance Ltd (NBFC)',
    bankNameMr: 'बजाज फायनान्स लिमिटेड',
    officerName: 'Ms. Bhawana Sharma',
    designation: 'Principal Grievance Redressal Officer',
    email: 'grievanceredressalteam@bajajfinserv.in',
    phone: '+91 20 7157 6403 / 020 7111 5600',
    zonalAddress: '4th Floor, Bajaj Finserv Corporate Office, Off Pune-Ahmednagar Road, Viman Nagar, Pune 411014',
    grievancePortalUrl: 'https://www.bajajfinserv.in/grievance-redressal',
    escalationLevel: 'Level 2 - Principal Nodal',
    disputeResolutionSlaDays: 30
  },
  {
    id: 'pno-hdfc',
    bankCode: 'HDFC',
    bankName: 'HDFC Bank Ltd',
    bankNameMr: 'एचडीएफसी बँक',
    officerName: 'Mr. Rakesh K. Bhatnagar',
    designation: 'Principal Nodal Officer (Credit Cards & Retail)',
    email: 'pno@hdfcbank.com',
    phone: '+91 22 6284 1505 / 1800 258 3838',
    zonalAddress: 'HDFC Bank Cards Division, No. 8, Lattice Bridge Road, Thiruvanmiyur, Chennai 600041',
    grievancePortalUrl: 'https://www.hdfcbank.com/personal/need-help/grievance-redressal-portal',
    escalationLevel: 'Level 2 - Principal Nodal',
    disputeResolutionSlaDays: 30
  },
  {
    id: 'pno-sbi',
    bankCode: 'SBIN',
    bankName: 'State Bank of India (SBI)',
    bankNameMr: 'स्टेट बँक ऑफ इंडिया',
    officerName: 'Chief General Manager (Customer Service)',
    designation: 'Principal Nodal Officer, Corporate Centre',
    email: 'nodal.officer@sbi.co.in',
    phone: '+91 22 2274 0841 / 1800 425 3800',
    zonalAddress: 'Customer Service Dept, State Bank Bhavan, Madame Cama Road, Nariman Point, Mumbai 400021',
    grievancePortalUrl: 'https://crcf.sbi.co.in/ccf/',
    escalationLevel: 'Level 2 - Principal Nodal',
    disputeResolutionSlaDays: 30
  },
  {
    id: 'pno-icici',
    bankCode: 'ICIC',
    bankName: 'ICICI Bank Ltd',
    bankNameMr: 'आयसीआयसीआय बँक',
    officerName: 'Mr. Subhashis Bagchi',
    designation: 'Principal Nodal Officer, Service Quality',
    email: 'headservicequality@icicibank.com',
    phone: '+91 22 3366 7777 / 1800 200 3344',
    zonalAddress: 'ICICI Bank Towers, Bandra-Kurla Complex, Bandra (East), Mumbai 400051',
    grievancePortalUrl: 'https://www.icicibank.com/complaints/complaints.page',
    escalationLevel: 'Level 2 - Principal Nodal',
    disputeResolutionSlaDays: 30
  },
  {
    id: 'pno-axis',
    bankCode: 'UTIB',
    bankName: 'Axis Bank Ltd',
    bankNameMr: 'एक्सिस बँक',
    officerName: 'Mr. S. Gopalkrishnan',
    designation: 'Executive Vice President & Principal Nodal Officer',
    email: 'nodalofficer@axisbank.com',
    phone: '+91 22 2425 2525 / 1800 419 5577',
    zonalAddress: 'Axis Bank Ltd, Grievance Redressal Dept, 5th Floor, Gigaplex, Plot No. IT 5, MIDC, Airoli, Navi Mumbai 400708',
    grievancePortalUrl: 'https://www.axisbank.com/support/grievance-redressal',
    escalationLevel: 'Level 2 - Principal Nodal',
    disputeResolutionSlaDays: 30
  },
  {
    id: 'pno-rbl',
    bankCode: 'RATN',
    bankName: 'RBL Bank Ltd',
    bankNameMr: 'आरबीएल बँक',
    officerName: 'Regional Nodal Officer, Retail Asset Ops',
    designation: 'Principal Nodal Officer',
    email: 'principalnodalofficer@rblbank.com',
    phone: '+91 22 6115 6300',
    zonalAddress: 'RBL Bank Ltd, Unit No. 306-311, 3rd Floor, The Capital, Bandra-Kurla Complex, Bandra (E), Mumbai 400051',
    grievancePortalUrl: 'https://www.rblbank.com/customer-service/grievance-redressal',
    escalationLevel: 'Level 2 - Principal Nodal',
    disputeResolutionSlaDays: 30
  },
  {
    id: 'pno-rbi-ombudsman',
    bankCode: 'RBI_CMS',
    bankName: 'Reserve Bank of India (RBI CMS)',
    bankNameMr: 'रिझर्व्ह बँक ऑफ इंडिया (लोकपाल)',
    officerName: 'The Banking Ombudsman',
    designation: 'RBI Integrated Ombudsman Scheme, 2021',
    email: 'crpc@rbi.org.in',
    phone: 'Toll-Free 14448 (9:30 AM to 5:15 PM)',
    zonalAddress: 'Centralised Receipt and Processing Centre (CRPC), Reserve Bank of India, 4th Floor, Sector 17, Chandigarh 160017',
    grievancePortalUrl: 'https://cms.rbi.org.in',
    escalationLevel: 'Level 4 - Banking Ombudsman',
    disputeResolutionSlaDays: 30
  }
];

export const sampleNodalCases: NodalReconciliationCase[] = [
  {
    id: 'case-kotak-settled',
    bankId: 'pno-kotak',
    bankName: 'Kotak Mahindra Bank',
    accountNumberMasked: 'PL-****-8819',
    accountType: 'Personal Loan',
    disputeReason: 'Negative "Settled" status marked despite Zero-Loss settlement & agreed NDC. Seeking conversion to "Closed" without derogatory remarks.',
    disputeReasonMr: 'शून्य नुकसान (Zero-loss) तडजोडीनंतरही चुकीने "Settled" शेरा नोंदवला आहे. हा शेरा हटवून "Closed" करण्याची मागणी.',
    statutoryDeadlineDays: 30,
    daysElapsed: 18,
    daysRemaining: 12,
    compensationAccrued: 0,
    status: 'In Escalation',
    acknowledgementNumber: 'KOTAK/GR/2026/0912/8821',
    hasNdcProof: true,
    createdDate: '25/08/2026',
    disputeLetterDraftEn: `To,\nThe Principal Nodal Officer,\nKotak Mahindra Bank Ltd,\nInfinity Park, Off WEH, Malad (East), Mumbai 400097.\n\nSubject: Statutory Legal Notice for Rectification of Erroneous "Settled" Status on Credit Information Report (CIR) under Section 21 of CICRA 2005 and RBI Master Direction on Grievance Redressal\n\nRespected Sir/Madam,\n\nI, Rahul Deshmukh (PAN: ABCDE1234F, Control Number: ECN-992014819), maintain Personal Loan Account PL-****-8819 with Kotak Mahindra Bank.\n\nSaid loan was amicably resolved under agreed zero-loss terms on 20/11/2023, and a valid No Dues Certificate (NDC) was officially issued. In gross contravention of RBI Circular CEPD.PR.No.684/13.01.001/2023-24 and CICRA 2005, your credit operations team continues to report this account with a derogatory "Settled" status rather than "Closed / Regular".\n\nThis inaccurate reporting has caused an artificial 45-point reduction in my CIBIL credit score, causing serious financial distress.\n\nKindly note that under the RBI Master Direction, your institution is strictly required to resolve and upload the corrected CIR data to TransUnion CIBIL, Experian, Equifax, and CRIF High Mark within thirty (30) days from receipt of this notice, failing which statutory compensation of ₹100 per calendar day of delay shall become payable.\n\nYours faithfully,\nRahul Deshmukh`,
    disputeLetterDraftMr: `प्रति,\nप्रधान नोडल अधिकारी,\nकोटक महिंद्रा बँक लि.,\nमुंबई ४०००९७.\n\nविषय: कलम २१, सीआयसीआरए २००५ आणि आरबीआय नियमावलीनुसार सिबिल अहवालातील चुकीचा 'Settled' शेरा दुरुस्त करणेबाबत कायदेशीर नोटीस\n\nमहोदय/महोदया,\n\nमाझे नाव राहुल देशमुख (पॅन: ABCDE1234F, सिबिल ईसीएन: ECN-992014819). माझे कोटक महिंद्रा बँकेत वैयक्तिक कर्ज खाते क्र. PL-****-8819 होते.\n\nसदर कर्जाची पूर्ण परतफेड करून बँकेकडून अधिकृत 'ना-हरकत प्रमाणपत्र' (NOC/NDC) प्राप्त झाले आहे. तरीही आपल्या बँकेने सिबिलमध्ये चुकीने 'Settled' (तडजोड) असा नकारात्मक शेरा दर्शविला आहे, ज्यामुळे माझा सिबिल स्कोअर ४५ गुणांनी खालावला आहे.\n\nआरबीआय परिपत्रक CEPD.PR.No.684/13.01.001/2023-24 नुसार सदर नोंद ३० दिवसांच्या आत दुरुस्त करून सिबिल ब्युरोकडे सादर करावी, अन्यथा दररोज ₹१०० विहित दंड आकारणीस पात्र राहाल.\n\nआपला नम्र,\nराहुल देशमुख`
  },
  {
    id: 'case-bajaj-outdated',
    bankId: 'pno-bajaj',
    bankName: 'Bajaj Finance Ltd',
    accountNumberMasked: 'CD-****-1094',
    accountType: 'Consumer Loan',
    disputeReason: 'Account was fully repaid with official NOC in June 2023, but still reported as "Open" with ₹12,000 artificial overdue.',
    disputeReasonMr: 'जून २०२३ मध्ये सर्व हप्ते पूर्ण भरून एनओसी मिळाली, तरीही ब्युरोमध्ये अद्याप १२,००० रुपये शिल्लक दाखवून खाते चालू ठेवले आहे.',
    statutoryDeadlineDays: 30,
    daysElapsed: 34,
    daysRemaining: 0,
    compensationAccrued: 400, // 4 days overdue * ₹100
    status: 'Escalated to RBI Ombudsman',
    acknowledgementNumber: 'BFL/DISP/2026/0809/4412',
    hasNdcProof: true,
    createdDate: '09/08/2026',
    disputeLetterDraftEn: `To,\nThe Principal Grievance Redressal Officer,\nBajaj Finance Ltd, Viman Nagar, Pune 411014.\n\nSubject: Formal Escalation & Statutory Delay Compensation Claim under RBI Circular CEPD.PR.No.684/13.01.001/2023-24 for Consumer Loan CD-****-1094\n\nRespected Officer,\n\nMy Consumer Durable Loan CD-****-1094 was closed on 18/06/2023 with verified NOC Ref #BFL-NOC-7712. Despite multiple grievance tickets, Bajaj Finance continues to report an active ₹12,000 balance to TransUnion CIBIL.\n\nThe statutory 30-day resolution period lapsed on 08/09/2026. Therefore, Bajaj Finance is liable to pay statutory compensation of ₹100 per day for 4 days delay (₹400 accrued) and immediate correction file upload.\n\nFailing resolution within 48 hours, complaint will be forwarded to the RBI Ombudsman CMS portal.\n\nRegards,\nRahul Deshmukh`,
    disputeLetterDraftMr: `प्रति,\nप्रधान तक्रार निवारण अधिकारी,\nबजाज फायनान्स लि., विमान नगर, पुणे ४११०१४.\n\nविषय: आरबीआय परिपत्रकानुसार ३० दिवसांची मुदत संपल्याने दररोज ₹१०० नुकसानभरपाई आणि सिबिल नोंदीची तात्काळ दुरुस्ती करणेबाबत.\n\nमहोदय,\n\nमाझे कर्ज खाते CD-****-1094 जून २०२३ मध्ये पूर्ण भरले असून एनओसी मिळाली आहे. तरीही १२,००० रुपये बाकी दाखवून खाते चालू ठेवले आहे. ३० दिवसांची विहित मुदत संपल्याने आरबीआय नियमांनुसार ₹४०० भरपाई देय झाली आहे.\n\nतातडीने दुरुस्ती न झाल्यास आरबीआय लोकपाल पोर्टलवर तक्रार दाखल करण्यात येत आहे.\n\nआपला,\nराहुल देशमुख`
  }
];
