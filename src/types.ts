export type ScreenId =
  | 'splash'
  | 'login'
  | 'home'
  | 'credit_score'
  | 'loan_eligibility'
  | 'government_schemes'
  | 'learn_grow'
  | 'profile'
  | 'report_success'
  | 'report_analysis'
  | 'full_credit_analysis'
  | 'partner_hub'
  | 'consultant_hub' // kept as backward-compatible alias
  | 'emi_calculator'
  | 'upload_report'
  | 'extracted_report'
  | 'client_detail'
  | 'dispute_board';

export type Language = 'en' | 'hi' | 'mr' | 'gu' | 'bn' | 'ta' | 'te' | 'ml' | 'or';

export interface LanguageOption {
  code: Language;
  name: string;
  englishName: string;
  region: string;
  flagOrSymbol: string;
  samplePhrase: string;
}

export type UserRole = 'client' | 'partner' | 'admin';
export type LegacyUserRole = 'client' | 'consultant' | 'partner' | 'admin';

export type CreditBureau = 'CIBIL' | 'Experian' | 'Equifax' | 'CRIF High Mark';

export interface ScoreFactor {
  id: string;
  name: string;
  nameMr: string;
  status: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  statusMr: string;
  impact: 'High' | 'Medium' | 'Low';
  scoreImpactPoints: number; // e.g., -45 points
  description: string;
  descriptionMr: string;
  details: string;
  iconType: 'shield' | 'meter' | 'history' | 'mix' | 'enquiry';
}

export interface CreditAccount {
  id: string;
  bankName: string;
  accountType: 'Credit Card' | 'Home Loan' | 'Personal Loan' | 'Auto Loan' | 'Consumer Loan' | 'Overdraft' | 'Gold Loan';
  accountNumberMasked: string;
  ownership: 'Individual' | 'Joint' | 'Guarantor';
  dateOpened: string;
  dateClosed?: string;
  sanctionedAmount: number;
  currentBalance: number;
  overdueAmount: number;
  creditLimit?: number;
  status: 'Open' | 'Closed' | 'Settled' | 'Written Off' | 'Restructured';
  hasDispute: boolean;
  issueType?:
    | 'WRONG_DPD'
    | 'SETTLED_TAG_ERROR'
    | 'OUTDATED_OPEN'
    | 'DUPLICATE_ACCOUNT'
    | 'IDENTITY_THEFT'
    | 'HIGH_UTILIZATION'
    | 'WRONG_PERSONAL_INFO'
    | 'ENQUIRY_SPIKE'
    | 'MISSING_POSITIVE_ACCOUNT';
  issueDescription?: string;
  issueDescriptionMr?: string;
  dpdHistory: {
    monthYear: string;
    dpd: string; // "000", "030", "060", "090+", "STD", "SMA"
    isDelayed: boolean;
  }[];
}

export interface CreditEnquiry {
  id: string;
  institution: string;
  enquiryDate: string;
  purpose: string;
  amount: number;
  bureau: CreditBureau;
}

export interface CibilReportData {
  reportId: string;
  controlNumber: string; // ECN / CIR
  reportDate: string;
  bureau: CreditBureau;
  score: number;
  scoreCategory: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  scoreCategoryMr: string;
  percentile: number; // e.g. 78%
  fullName: string;
  dateOfBirth: string;
  panMasked: string;
  mobile: string;
  email: string;
  address: string;
  permanentAddress?: string;
  factors: ScoreFactor[];
  accounts: CreditAccount[];
  enquiries: CreditEnquiry[];
  detectedErrorsCount: number;
  potentialScoreGain: number;
  confidenceScore: number; // e.g. 98%
  fileTypeUploaded?: 'PDF' | 'JSON' | 'HTML' | 'SAMPLE';
}

export interface MultiBureauComparison {
  bureau: CreditBureau;
  score: number;
  category: string;
  openAccounts: number;
  totalEnquiries: number;
  lastUpdated: string;
  keyDiscrepancy?: string;
  conflictDetails?: string;
  hasConflict?: boolean;
}

export interface ConsentLog {
  id: string;
  timestamp: string;
  ipAddress: string;
  consentText: string;
  otpVerificationId: string;
  purpose: string;
  validTill: string;
  cicraSection: string;
}

export interface CaseNote {
  id: string;
  date: string;
  author: string;
  type: 'CALL' | 'STATUS_UPDATE' | 'LEGAL_NOTICE' | 'DOC_RECEIVED';
  note: string;
}

export interface KYCDocument {
  id: string;
  name: string;
  type: 'AADHAAR' | 'PAN' | 'BANK_STATEMENT' | 'NOC';
  status: 'Verified' | 'Pending' | 'Uploaded';
  uploadedAt: string;
  fileSize?: string;
}

export interface UploadedReportItem {
  id: string;
  bureau: CreditBureau;
  filename: string;
  format: 'PDF' | 'JSON' | 'HTML';
  uploadDate: string;
  parsedScore: number;
  status: 'Parsed' | 'Processing' | 'Failed';
}

export interface DisputeCase {
  id: string;
  caseNumber: string;
  clientId: string;
  clientName: string;
  bureau: CreditBureau;
  bankName: string;
  accountNumber: string;
  issueCategory: string;
  status: 'Drafted' | 'Filed with Bureau' | 'Under Bank Review' | 'Escalated to Ombudsman' | 'Resolved / Rectified';
  stage: 'Open' | 'In Progress' | 'Submitted' | 'Resolved';
  dateFiled: string;
  targetResolutionDate: string;
  daysRemaining: number;
  expectedScoreJump: number;
  notes: string;
  bankNodalEmail?: string;
  assignedTo?: string;
  letterTemplateEn: string;
  letterTemplateMr: string;
}

export type Dispute = DisputeCase;

export interface PartnerClient {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  pan: string;
  address?: string;
  assignedPartner?: string;
  assignedConsultant?: string; // backward-compatibility
  currentScore: number;
  targetScore: number;
  activeDisputesCount: number;
  status: 'In Review' | 'Dispute Active' | 'Completed';
  consentSignedDate: string;
  reportsCount: number;
  kycDocuments: KYCDocument[];
  consentLogs: ConsentLog[];
  caseNotes: CaseNote[];
  uploadedReports: UploadedReportItem[];
}

export type ConsultantClient = PartnerClient;
export type Client = PartnerClient;

export interface DetectedIssue {
  id: string;
  code:
    | 'WRONG_PERSONAL_INFO'
    | 'DUPLICATE_ACCOUNT'
    | 'INCORRECT_DPD_STATUS'
    | 'OUTDATED_CLOSED_OPEN'
    | 'HIGH_UTILIZATION'
    | 'ENQUIRY_SPIKE'
    | 'MISSING_POSITIVE_ACCOUNT'
    | 'HISTORICAL_DELINQUENCY'
    | 'SETTLED_TAG_ERROR'
    | 'THIN_CREDIT_FILE';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  titleEn: string;
  titleMr: string;
  impactScore: number;
  descriptionEn: string;
  descriptionMr: string;
  legalCitation: string; // e.g. "Section 21 of CICRA 2005"
  recommendedActionEn: string;
  recommendedActionMr: string;
  accountAffected?: string;
  bankName?: string;
  category?: 'Utilization' | 'Delinquency' | 'Enquiries' | 'Identity' | 'Portfolio';
}

export interface ActionItem {
  id: string;
  phase?: 'Immediate (0-30 Days)' | 'Short-Term (1-3 Months)' | 'Medium-Term (3-12 Months)';
  phaseMr?: 'तातडीच्या कृती (०-३० दिवस)' | 'अल्पकालीन उद्दिष्टे (१-३ महिने)' | 'मध्यमकालीन उद्दिष्टे (३-१२ महिने)';
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  titleEn: string;
  titleMr: string;
  scoreGain: number;
  actionEn: string;
  actionMr: string;
  category: string;
  disputeReady: boolean;
  accountRef?: string;
}

export interface ActionPlanItem extends ActionItem {}

export interface CirAuditPillar {
  id: string;
  pillarNumber: number;
  titleEn: string;
  titleMr: string;
  title?: string;
  weight: number; // percentage weight, e.g. 35 for 35%
  score: number; // score out of 100, e.g. 94
  status: 'EXCELLENT' | 'GOOD' | 'ATTENTION' | 'CRITICAL';
  statusMr: string;
  summaryEn: string;
  summaryMr: string;
  summary?: string;
  keyFinding?: string;
  keyFindingMr?: string;
  details?: string;
  recommendation?: string;
  recommendationMr?: string;
  keyMetricLabel: string;
  keyMetricValue: string;
  benchmarkRule: string;
  detailedAuditEn: string[];
  detailedAuditMr: string[];
  remediationAdviceEn?: string;
  remediationAdviceMr?: string;
  rbiCitation?: string;
}

export interface LoanRecommendation {
  id: string;
  category: string;
  categoryMr: string;
  decision: 'Approved' | 'Highly Approved' | 'Conditional' | 'Not Recommended';
  decisionMr: string;
  approvalOdds?: number; // e.g. 95 for 95%
  recommendedLimit: string;
  interestTerms: string;
  tenureRange?: string;
  estimatedEmi?: string;
  foirImpact?: string;
  targetLendersTier1?: string[];
  targetLendersTier2?: string[];
  targetLendersSFB?: string[];
  underwriterFriction?: string[];
  underwriterFrictionEn?: string | string[];
  underwriterFrictionMr?: string | string[];
  compensatingFactors?: string[];
  compensatingFactorsEn?: string | string[];
  compensatingFactorsMr?: string | string[];
  requiredDocs?: string[];
  requiredDocsEn?: string[];
  requiredDocsMr?: string[];
  specialConditionsEn: string;
  specialConditionsMr: string;
  riskRating: 'Low' | 'Moderate' | 'High';
}

export interface ScoreProjection {
  currentScore: number;
  score3Months: string; // e.g. "760 - 775"
  score6Months: string; // e.g. "785 - 800"
  score12Months: string; // e.g. "800 - 820"
  trajectory: 'improving' | 'stable' | 'declining';
  keyLeverEn: string;
  keyLeverMr: string;
}

export interface RegisteredAddress {
  category: string; // e.g. "Permanent Address", "Residence Address", "Office Address"
  categoryMr: string;
  fullAddress: string;
  residenceCode: 'Owned' | 'Academic' | 'Professional' | 'Rented' | 'Current';
  residenceCodeMr: string;
  dateReported: string;
}

export interface ConsumerIdentitySummary {
  fullName: string;
  dateOfBirth: string;
  age: string;
  gender: string;
  pan: string;
  socialId?: string;
  passportId?: string;
  mobile: string;
  alternateMobile?: string;
  email: string;
  occupation: string;
  employmentType: string;
  lastReportedDate: string;
  incomeStatus: string;
  addresses: RegisteredAddress[];
  verificationStrength: 'Strong' | 'Moderate' | 'Needs Review';
  verificationStrengthNotesEn: string;
  verificationStrengthNotesMr: string;
}

export interface CreditPortfolioMetrics {
  totalActiveAccounts: number;
  zeroBalanceAccounts: number;
  totalHighCredit: number;
  currentBalance: number;
  overdueAmount: number;
  accountAgeRange: string; // e.g. "13.8 Years"
  oldestAccountDate: string; // e.g. "October 6, 2012"
  mostRecentReportDate: string;
  overdueStatus: string;
  securedRatio?: number;
  totalOverdue?: number;
  overdueAccountsCount?: number;
  creditCardUtilization?: number;
}

export interface ExecutiveSummaryData {
  verdictTitleEn: string;
  verdictTitleMr: string;
  verdictTextEn: string;
  verdictTextMr: string;
  riskProfile: 'Low Risk' | 'Moderate Risk' | 'High Risk';
  riskProfileMr: 'कमी जोखीम' | 'मध्यम जोखीम' | 'जास्त जोखीम';
  riskTrend: 'Improving' | 'Stable' | 'Declining';
  bestSuitedProducts: string[];
  bestSuitedProductsMr: string[];
  mandatoryConditionsEn: string[];
  mandatoryConditionsMr: string[];
}

export interface ExtractedReport extends CibilReportData {
  identitySummary?: ConsumerIdentitySummary;
  portfolioMetrics?: CreditPortfolioMetrics;
  sevenPointAudit?: CirAuditPillar[];
  detectedIssuesRanked?: DetectedIssue[];
  actionPlanGrouped?: ActionItem[];
  scoreProjection?: ScoreProjection;
  loanRecommendations?: LoanRecommendation[];
  executiveSummary?: ExecutiveSummaryData;
  consultantNotes?: string;
  partnerNotes?: string;
}

export interface CommercialRankData {
  companyName: string;
  panGst: string;
  entityType: 'Private Limited' | 'Proprietorship' | 'Partnership' | 'LLP' | 'Public Limited';
  cmrRank: number; // 1 to 10 (CMR-1 is Super Prime, CMR-10 is highest risk)
  cmrDescription: string;
  cmrDescriptionMr: string;
  riskCategory: 'Very Low Risk' | 'Low Risk' | 'Medium Risk' | 'High Risk';
  riskCategoryMr: string;
  totalCreditFacilities: number;
  sanctionedAmount: number;
  currentOutstanding: number;
  overdueAmount: number;
  workingCapitalHealth: 'Optimal' | 'Average' | 'Stressed';
  eligibilityForCommercialLoans: 'High' | 'Moderate' | 'Low';
  bureauControlNumber: string;
  reportDate: string;
}


export interface RoadmapMilestone {
  id: string;
  phase: string;
  phaseMr: string;
  duration: string;
  expectedScoreGain: number;
  targetScore: number;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  tasksEn: string[];
  tasksMr: string[];
}

export interface GovernmentScheme {
  id: string;
  name: string;
  nameMr: string;
  tagline: string;
  taglineMr: string;
  category: 'All' | 'Farmers' | 'Students' | 'Women' | 'Business';
  categoryMr: string;
  benefitAmount: string;
  interestSubsidy?: string;
  eligibilitySummary: string;
  eligibilitySummaryMr: string;
  documentsRequired: string[];
  documentsRequiredMr: string[];
  applyUrl: string;
  badge: string;
}

export interface FinancialArticle {
  id: string;
  title: string;
  titleMr: string;
  readTime: string;
  readTimeMr: string;
  category: 'All' | 'Credit Score' | 'Loans' | 'Money Management';
  summary: string;
  summaryMr: string;
  content: string[];
  contentMr: string[];
  imagePlaceholder: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  pan: string;
  memberSince: string;
  avatarUrl?: string;
  unreadNotifications: number;
  referralCode: string;
  referralEarnings: number;
}

// Phase 2: Bank Nodal Reconciliation & Backend Security Types
export interface BankNodalOfficer {
  id: string;
  bankCode: string;
  bankName: string;
  bankNameMr: string;
  officerName: string;
  designation: string;
  email: string;
  phone: string;
  zonalAddress: string;
  grievancePortalUrl: string;
  escalationLevel: 'Level 2 - Principal Nodal' | 'Level 3 - Head Grievance' | 'Level 4 - Banking Ombudsman';
  disputeResolutionSlaDays: number; // usually 30 days per RBI
}

export interface NodalReconciliationCase {
  id: string;
  bankId: string;
  bankName: string;
  accountNumberMasked: string;
  accountType: string;
  disputeReason: string;
  disputeReasonMr: string;
  statutoryDeadlineDays: number;
  daysElapsed: number;
  daysRemaining: number;
  compensationAccrued: number; // ₹100/day after 30 days per RBI
  status: 'Pending Bank Action' | 'In Escalation' | 'Resolved / NDC Issued' | 'Escalated to RBI Ombudsman';
  acknowledgementNumber: string;
  disputeLetterDraftEn: string;
  disputeLetterDraftMr: string;
  createdDate: string;
  hasNdcProof: boolean;
}

export interface Phase2SecurityTelemetry {
  serverStatus: 'connected' | 'offline';
  backendEngine: string;
  aesEncryptionEngine: 'active';
  smsGateway: 'operational';
  dltCompliance: 'approved' | 'registered';
  rbiCicraAudit: 'logging' | 'standby';
  nodalOfficersCount: number;
  timestamp: string;
  latencyMs: number;
}
