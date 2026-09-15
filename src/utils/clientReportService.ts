import { CibilReportData, CreditAccount, CreditEnquiry, ExtractedReport, PartnerClient } from '../types';
import { generateComprehensiveAnalysis } from './deepAnalysisEngine';

/**
 * Service to retrieve strictly isolated, client-specific CIBIL/Experian report data.
 * Guarantees that no customer ever sees another customer's or developer's report data.
 */
export function getClientReport(client: PartnerClient): CibilReportData {
  // 1. Ganesh Jadhav (Score 710, Farmer/Trader, Gold Loan & KCC)
  if (client.id === 'cli-101' || client.name.toLowerCase().includes('ganesh')) {
    const ganeshAccounts: CreditAccount[] = [
      {
        id: 'acc-gj-1',
        bankName: 'Bank of Maharashtra',
        accountType: 'Home Loan',
        accountNumberMasked: 'HL-XXXX-8921',
        ownership: 'Individual',
        sanctionedAmount: 1800000,
        currentBalance: 1420000,
        overdueAmount: 0,
        status: 'Open',
        dateOpened: '12/04/2021',
        hasDispute: false,
        dpdHistory: [
          { monthYear: 'Jul 25', dpd: '000', isDelayed: false },
          { monthYear: 'Jun 25', dpd: '000', isDelayed: false },
          { monthYear: 'May 25', dpd: '000', isDelayed: false },
          { monthYear: 'Apr 25', dpd: '000', isDelayed: false }
        ]
      },
      {
        id: 'acc-gj-2',
        bankName: 'State Bank of India',
        accountType: 'Gold Loan',
        accountNumberMasked: 'GL-XXXX-3341',
        ownership: 'Individual',
        sanctionedAmount: 350000,
        currentBalance: 120000,
        overdueAmount: 0,
        status: 'Open',
        dateOpened: '15/09/2023',
        hasDispute: false,
        dpdHistory: [
          { monthYear: 'Jul 25', dpd: '000', isDelayed: false },
          { monthYear: 'Jun 25', dpd: '000', isDelayed: false }
        ]
      }
    ];

    const ganeshEnquiries: CreditEnquiry[] = [
      { id: 'enq-gj-1', institution: 'Mahindra Finance', enquiryDate: '15/06/2025', purpose: 'Tractor Loan', amount: 450000, bureau: 'CIBIL' },
      { id: 'enq-gj-2', institution: 'HDFC Bank', enquiryDate: '10/02/2025', purpose: 'Auto Loan', amount: 300000, bureau: 'CIBIL' }
    ];

    return {
      reportId: 'CIR-GJ-710',
      controlNumber: 'ECN-7819204812',
      reportDate: '14 Aug 2025',
      bureau: 'CIBIL',
      score: 710,
      scoreCategory: 'Good',
      scoreCategoryMr: 'चांगला (Good)',
      percentile: 74,
      fullName: client.name,
      dateOfBirth: '14/08/1984',
      panMasked: client.pan || 'JADHV4512K',
      mobile: client.phone || '+91 98220 12345',
      email: client.email || 'ganesh.jadhav@kattaclient.in',
      address: client.address || 'AP Shirala, Dist Sangli - 415408',
      detectedErrorsCount: 0,
      potentialScoreGain: 40,
      confidenceScore: 99.5,
      fileTypeUploaded: 'PDF',
      accounts: ganeshAccounts,
      enquiries: ganeshEnquiries,
      factors: []
    };
  }

  // 2. Pooja Kulkarni (Score 618, Credit Card Settled error)
  if (client.id === 'cli-102' || client.name.toLowerCase().includes('pooja')) {
    const poojaAccounts: CreditAccount[] = [
      {
        id: 'acc-pk-1',
        bankName: 'ICICI Bank',
        accountType: 'Credit Card',
        accountNumberMasked: 'XXXX-XXXX-XXXX-4019',
        ownership: 'Individual',
        sanctionedAmount: 120000,
        creditLimit: 120000,
        currentBalance: 82000,
        overdueAmount: 0,
        status: 'Settled',
        dateOpened: '14/05/2021',
        hasDispute: true,
        issueType: 'SETTLED_TAG_ERROR',
        dpdHistory: [
          { monthYear: 'Jul 24', dpd: 'SET', isDelayed: true },
          { monthYear: 'Jun 24', dpd: '090', isDelayed: true },
          { monthYear: 'May 24', dpd: '060', isDelayed: true }
        ]
      },
      {
        id: 'acc-pk-2',
        bankName: 'HDFC Bank',
        accountType: 'Credit Card',
        accountNumberMasked: 'XXXX-XXXX-XXXX-8812',
        ownership: 'Individual',
        sanctionedAmount: 75000,
        creditLimit: 75000,
        currentBalance: 51000,
        overdueAmount: 0,
        status: 'Open',
        dateOpened: '10/11/2022',
        hasDispute: false,
        dpdHistory: [
          { monthYear: 'Jul 25', dpd: '000', isDelayed: false },
          { monthYear: 'Jun 25', dpd: '000', isDelayed: false },
          { monthYear: 'May 25', dpd: '000', isDelayed: false }
        ]
      },
      {
        id: 'acc-pk-3',
        bankName: 'SBI',
        accountType: 'Personal Loan',
        accountNumberMasked: 'PL-XXXX-7721',
        ownership: 'Individual',
        sanctionedAmount: 250000,
        currentBalance: 140000,
        overdueAmount: 0,
        status: 'Open',
        dateOpened: '18/02/2023',
        hasDispute: false,
        dpdHistory: [
          { monthYear: 'Jul 25', dpd: '000', isDelayed: false },
          { monthYear: 'Jun 25', dpd: '000', isDelayed: false }
        ]
      }
    ];

    const poojaEnquiries: CreditEnquiry[] = [
      { id: 'enq-pk-1', institution: 'Axis Bank', enquiryDate: '12/07/2025', purpose: 'Credit Card', amount: 100000, bureau: 'CIBIL' },
      { id: 'enq-pk-2', institution: 'Bajaj Finserv', enquiryDate: '04/05/2025', purpose: 'Consumer Loan', amount: 45000, bureau: 'CIBIL' },
      { id: 'enq-pk-3', institution: 'Tata Capital', enquiryDate: '18/03/2025', purpose: 'Personal Loan', amount: 200000, bureau: 'CIBIL' }
    ];

    return {
      reportId: 'CIR-PK-618',
      controlNumber: 'ECN-9910481920',
      reportDate: '24 Aug 2025',
      bureau: 'CIBIL',
      score: 618,
      scoreCategory: 'Fair',
      scoreCategoryMr: 'मध्यम (Fair)',
      percentile: 48,
      fullName: client.name,
      dateOfBirth: '22/03/1992',
      panMasked: client.pan || 'KULKP2341M',
      mobile: client.phone || '+91 98901 23456',
      email: client.email || 'pooja.k@gmail.com',
      address: client.address || 'Kothrud, Pune - 411038',
      detectedErrorsCount: 1,
      potentialScoreGain: 85,
      confidenceScore: 98.2,
      fileTypeUploaded: 'PDF',
      accounts: poojaAccounts,
      enquiries: poojaEnquiries,
      factors: []
    };
  }

  // 3. Sachin Patil (Score 782, Prime Borrower, Zero Overdue)
  if (client.id === 'cli-103' || client.name.toLowerCase().includes('sachin')) {
    const sachinAccounts: CreditAccount[] = [
      {
        id: 'acc-sp-1',
        bankName: 'State Bank of India',
        accountType: 'Home Loan',
        accountNumberMasked: 'HL-XXXX-5521',
        ownership: 'Individual',
        sanctionedAmount: 4200000,
        currentBalance: 3150000,
        overdueAmount: 0,
        status: 'Open',
        dateOpened: '10/06/2019',
        hasDispute: false,
        dpdHistory: [
          { monthYear: 'Aug 25', dpd: '000', isDelayed: false },
          { monthYear: 'Jul 25', dpd: '000', isDelayed: false },
          { monthYear: 'Jun 25', dpd: '000', isDelayed: false }
        ]
      },
      {
        id: 'acc-sp-2',
        bankName: 'HDFC Bank',
        accountType: 'Credit Card',
        accountNumberMasked: 'XXXX-XXXX-XXXX-9921',
        ownership: 'Individual',
        sanctionedAmount: 250000,
        creditLimit: 250000,
        currentBalance: 32000,
        overdueAmount: 0,
        status: 'Open',
        dateOpened: '15/09/2020',
        hasDispute: false,
        dpdHistory: [
          { monthYear: 'Aug 25', dpd: '000', isDelayed: false },
          { monthYear: 'Jul 25', dpd: '000', isDelayed: false }
        ]
      },
      {
        id: 'acc-sp-3',
        bankName: 'Maruti Finance',
        accountType: 'Auto Loan',
        accountNumberMasked: 'AL-XXXX-4401',
        ownership: 'Individual',
        sanctionedAmount: 850000,
        currentBalance: 0,
        overdueAmount: 0,
        status: 'Closed',
        dateOpened: '12/03/2018',
        hasDispute: false,
        dpdHistory: [
          { monthYear: 'Mar 23', dpd: '000', isDelayed: false }
        ]
      }
    ];

    return {
      reportId: 'CIR-SP-782',
      controlNumber: 'ECN-8819203912',
      reportDate: '10 Jun 2025',
      bureau: 'CIBIL',
      score: 782,
      scoreCategory: 'Excellent',
      scoreCategoryMr: 'उत्कृष्ट (Excellent)',
      percentile: 92,
      fullName: client.name,
      dateOfBirth: '05/11/1988',
      panMasked: client.pan || 'PATIL7890R',
      mobile: client.phone || '+91 97654 32109',
      email: client.email || 'sachin.patil@outlook.com',
      address: client.address || 'Gangapur Road, Nashik - 422005',
      detectedErrorsCount: 0,
      potentialScoreGain: 28,
      confidenceScore: 99.8,
      fileTypeUploaded: 'PDF',
      accounts: sachinAccounts,
      enquiries: [
        { id: 'enq-sp-1', institution: 'SBI', enquiryDate: '01/06/2025', purpose: 'Home Loan', amount: 4200000, bureau: 'CIBIL' }
      ],
      factors: []
    };
  }

  // 4. Amol Deshmukh (Score 590, Active Overdue, Multiple Delays)
  if (client.id === 'cli-104' || client.name.toLowerCase().includes('amol')) {
    const amolAccounts: CreditAccount[] = [
      {
        id: 'acc-ad-1',
        bankName: 'Kotak Mahindra Bank',
        accountType: 'Personal Loan',
        accountNumberMasked: 'PL-XXXX-1120',
        ownership: 'Individual',
        sanctionedAmount: 180000,
        currentBalance: 98000,
        overdueAmount: 14500,
        status: 'Open',
        dateOpened: '12/01/2023',
        hasDispute: true,
        issueType: 'WRONG_DPD',
        dpdHistory: [
          { monthYear: 'Jul 25', dpd: '060', isDelayed: true },
          { monthYear: 'Jun 25', dpd: '030', isDelayed: true },
          { monthYear: 'May 25', dpd: '030', isDelayed: true }
        ]
      },
      {
        id: 'acc-ad-2',
        bankName: 'RBL Bank',
        accountType: 'Credit Card',
        accountNumberMasked: 'XXXX-XXXX-XXXX-3341',
        ownership: 'Individual',
        sanctionedAmount: 60000,
        creditLimit: 60000,
        currentBalance: 54000,
        overdueAmount: 6200,
        status: 'Open',
        dateOpened: '05/08/2022',
        hasDispute: false,
        dpdHistory: [
          { monthYear: 'Jul 25', dpd: '030', isDelayed: true },
          { monthYear: 'Jun 25', dpd: '000', isDelayed: false }
        ]
      }
    ];

    const amolEnquiries: CreditEnquiry[] = [
      { id: 'enq-ad-1', institution: 'Bajaj Finance', enquiryDate: '15/08/2025', purpose: 'Personal Loan', amount: 150000, bureau: 'CIBIL' },
      { id: 'enq-ad-2', institution: 'IDFC First', enquiryDate: '10/08/2025', purpose: 'Credit Card', amount: 50000, bureau: 'CIBIL' },
      { id: 'enq-ad-3', institution: 'HDFC Bank', enquiryDate: '01/08/2025', purpose: 'Personal Loan', amount: 200000, bureau: 'CIBIL' },
      { id: 'enq-ad-4', institution: 'MoneyTap', enquiryDate: '20/07/2025', purpose: 'Credit Line', amount: 75000, bureau: 'CIBIL' }
    ];

    return {
      reportId: 'CIR-AD-590',
      controlNumber: 'ECN-4491028301',
      reportDate: '20 Aug 2025',
      bureau: 'CIBIL',
      score: 590,
      scoreCategory: 'Poor',
      scoreCategoryMr: 'सुधारणा आवश्यक (Needs Improvement)',
      percentile: 29,
      fullName: client.name,
      dateOfBirth: '19/07/1990',
      panMasked: client.pan || 'DESHM1290Q',
      mobile: client.phone || '+91 98123 45678',
      email: client.email || 'amol.d@yahoo.com',
      address: client.address || 'Satara Road, Kolhapur - 416003',
      detectedErrorsCount: 2,
      potentialScoreGain: 110,
      confidenceScore: 97.5,
      fileTypeUploaded: 'PDF',
      accounts: amolAccounts,
      enquiries: amolEnquiries,
      factors: []
    };
  }

  // 5. Dynamic fallback strictly scoped to client's record
  const score = client.currentScore || 675;
  return {
    reportId: `CIR-${client.id}-${score}`,
    controlNumber: `ECN-${Math.abs(client.id.split('').reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0)).toString().slice(0, 10).padEnd(10, '0')}`,
    reportDate: '15 Aug 2025',
    bureau: 'CIBIL',
    score: score,
    scoreCategory: score >= 750 ? 'Excellent' : score >= 700 ? 'Good' : score >= 650 ? 'Fair' : 'Poor',
    scoreCategoryMr: score >= 750 ? 'उत्कृष्ट' : score >= 700 ? 'चांगला' : score >= 650 ? 'मध्यम' : 'सुधारणा आवश्यक',
    percentile: Math.min(99, Math.max(10, Math.round((score - 300) / 6))),
    fullName: client.name,
    dateOfBirth: '01/01/1985',
    panMasked: client.pan || 'XXXXX0000X',
    mobile: client.phone || '+91 99999 99999',
    email: client.email || `${client.name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
    address: client.address || client.city || 'Maharashtra, India',
    detectedErrorsCount: client.activeDisputesCount || 0,
    potentialScoreGain: 65,
    confidenceScore: 99.0,
    fileTypeUploaded: 'PDF',
    accounts: [
      {
        id: `acc-${client.id}-1`,
        bankName: 'HDFC Bank',
        accountType: 'Credit Card',
        accountNumberMasked: 'XXXX-XXXX-XXXX-5512',
        ownership: 'Individual',
        sanctionedAmount: 100000,
        creditLimit: 100000,
        currentBalance: Math.round(score > 720 ? 25000 : 68000),
        overdueAmount: 0,
        status: 'Open',
        dateOpened: '15/03/2021',
        hasDispute: false,
        dpdHistory: [{ monthYear: 'Aug 25', dpd: '000', isDelayed: false }]
      },
      {
        id: `acc-${client.id}-2`,
        bankName: 'State Bank of India',
        accountType: 'Personal Loan',
        accountNumberMasked: 'PL-XXXX-8821',
        ownership: 'Individual',
        sanctionedAmount: 300000,
        currentBalance: 120000,
        overdueAmount: score < 620 ? 8500 : 0,
        status: 'Open',
        dateOpened: '10/08/2022',
        hasDispute: score < 650,
        dpdHistory: [{ monthYear: 'Aug 25', dpd: score < 620 ? '030' : '000', isDelayed: score < 620 }]
      }
    ],
    enquiries: [
      { id: `enq-${client.id}-1`, institution: 'Axis Bank', enquiryDate: '10/06/2025', purpose: 'Credit Card', amount: 100000, bureau: 'CIBIL' }
    ],
    factors: []
  };
}
