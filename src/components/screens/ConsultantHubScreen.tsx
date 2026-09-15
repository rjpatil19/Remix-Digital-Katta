import React, { useState } from 'react';
import {
  Users,
  Briefcase,
  TrendingUp,
  Upload,
  FileText,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  Download,
  Plus,
  ArrowUpRight,
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  MessageSquare,
  Send,
  Kanban,
  FileSpreadsheet,
  AlertTriangle,
  ChevronRight,
  Share2,
  Calendar,
  X,
  Building2,
  KeyRound,
  ExternalLink,
  Filter,
  Sparkles
} from 'lucide-react';
import { Header } from '../common/Header';
import { DigitalKattaLogo } from '../common/DigitalKattaLogo';
import { consultantClientsData, mockDisputeCases, defaultCibilReport, detectedIssuesList } from '../../data/mockData';
import { getClientReport } from '../../utils/clientReportService';
import { generateComprehensiveAnalysis } from '../../utils/deepAnalysisEngine';
import {
  Language,
  ConsultantClient,
  ScreenId,
  DisputeCase,
  UserRole,
  CaseNote,
  KYCDocument,
  ExtractedReport
} from '../../types';
import { sample747ComprehensiveReport } from '../../data/sample747Report';
import { FintechApiService } from '../../services/api';
import { exportClientCibilPdf } from '../../utils/cibilEngine';
import { ReportQuotaService } from '../../services/reportQuotaService';
import { PartnerQuotaModal } from '../modals/ConsultantQuotaModal';
import { ExportDocumentModal } from '../modals/ExportDocumentModal';

export interface PartnerHubScreenProps {
  onBack: () => void;
  language: Language;
  onToggleLanguage: () => void;
  onNavigate: (screen: ScreenId) => void;
  userRole?: UserRole;
  onSwitchRole?: (role: UserRole) => void;
  onSelectClientReport?: (client: ConsultantClient) => void;
}

export type ConsultantHubScreenProps = PartnerHubScreenProps;

export const PartnerHubScreen: React.FC<PartnerHubScreenProps> = ({
  onBack,
  language,
  onToggleLanguage,
  onNavigate,
  userRole = 'partner',
  onSwitchRole,
  onSelectClientReport
}) => {
  const [clients, setClients] = useState<ConsultantClient[]>(consultantClientsData);
  const [disputes, setDisputes] = useState<DisputeCase[]>(mockDisputeCases);
  const [activeTab, setActiveTab] = useState<'clients' | 'detail' | 'kanban' | 'reports'>('clients');
  const [selectedClient, setSelectedClient] = useState<ConsultantClient>(consultantClientsData[0]);
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  // Modals
  const [showAddClientModal, setShowAddClientModal] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [exportModalClient, setExportModalClient] = useState<ExtractedReport | null>(null);
  const [quotaKey, setQuotaKey] = useState(0);
  const [newClientName, setNewClientName] = useState('');
  const [newClientPhone, setNewClientPhone] = useState('');
  const [newClientPan, setNewClientPan] = useState('');
  const [newClientCity, setNewClientCity] = useState('');

  // Note creation
  const [newNoteText, setNewNoteText] = useState('');
  const [noteAuthor] = useState('Mahesh Jadhav (Franchise #04)');

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(search.toLowerCase()) ||
      client.phone.includes(search) ||
      client.pan.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All' || client.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddClient = () => {
    if (!newClientName || !newClientPhone) return;
    const newClient: ConsultantClient = {
      id: `cli-${Date.now()}`,
      name: newClientName,
      phone: newClientPhone,
      email: `${newClientName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
      city: newClientCity || 'Pune, MH',
      pan: newClientPan || 'ABCDE9999Z',
      assignedConsultant: 'Mahesh Jadhav (Franchise #04 - Baner)',
      currentScore: 680,
      targetScore: 780,
      activeDisputesCount: 1,
      status: 'In Review',
      consentSignedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      reportsCount: 1,
      kycDocuments: [
        { id: `k-${Date.now()}`, name: 'Aadhaar Card', type: 'AADHAAR', status: 'Pending', uploadedAt: 'Today' }
      ],
      consentLogs: [
        {
          id: `c-${Date.now()}`,
          timestamp: new Date().toISOString(),
          ipAddress: '103.212.14.88 (Pune)',
          consentText: 'Digital consent provided for credit analysis and dispute representation.',
          otpVerificationId: `OTP-${Math.floor(100000 + Math.random() * 900000)}`,
          purpose: 'Franchise Credit Resolution',
          validTill: '6 Months',
          cicraSection: 'Section 20(2) of CICRA'
        }
      ],
      caseNotes: [
        {
          id: `n-${Date.now()}`,
          date: 'Just now',
          author: 'Mahesh Jadhav',
          type: 'STATUS_UPDATE',
          note: 'New client onboarding completed. Awaiting full bureau CIR upload.'
        }
      ],
      uploadedReports: []
    };

    setClients([newClient, ...clients]);
    setSelectedClient(newClient);
    setShowAddClientModal(false);
    setNewClientName('');
    setNewClientPhone('');
    setNewClientPan('');
    setNewClientCity('');
  };

  const handleAddCaseNote = () => {
    if (!newNoteText.trim()) return;
    const newNote: CaseNote = {
      id: `note-${Date.now()}`,
      date: 'Just now',
      author: noteAuthor,
      type: 'CALL',
      note: newNoteText.trim()
    };

    const updatedClient = {
      ...selectedClient,
      caseNotes: [newNote, ...selectedClient.caseNotes]
    };

    setSelectedClient(updatedClient);
    setClients(clients.map(c => c.id === selectedClient.id ? updatedClient : c));
    setNewNoteText('');
  };

  const handleAdvanceDisputeStage = (disputeId: string, currentStage: DisputeCase['stage']) => {
    let nextStage: DisputeCase['stage'] = 'In Progress';
    if (currentStage === 'Open') nextStage = 'In Progress';
    else if (currentStage === 'In Progress') nextStage = 'Submitted';
    else if (currentStage === 'Submitted') nextStage = 'Resolved';
    else return;

    const updated = FintechApiService.updateDisputeStage(disputeId, nextStage, disputes);
    updated.then(res => setDisputes(res));
  };

  const handleExportCsv = () => {
    const csvContent = FintechApiService.exportDisputeRosterCsv(disputes);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `DigitalKatta_Dispute_Roster_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportClientPdf = (client: ConsultantClient) => {
    const clientReport = getClientReport(client);
    const reportForExport = generateComprehensiveAnalysis(clientReport);
    reportForExport.consultantNotes = `Digital Katta Partner Kendra #04 advisory for ${client.name}. Current score ${client.currentScore}. Recommended remediation prioritizes fast score elevation for institutional credit approval.`;
    setExportModalClient(reportForExport);
  };

  const handleSendReminder = (dispute: DisputeCase) => {
    const msg = `Namaskar ${dispute.clientName}, your CIBIL dispute with ${dispute.bankName} (Case: ${dispute.caseNumber}) is currently '${dispute.status}'. Statutory resolution is tracked under RBI CICRA 2005. Best regards, Digital Katta Kendra #04.`;
    const encoded = encodeURIComponent(msg);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handleGenerateReportForClient = (client: ConsultantClient) => {
    const check = ReportQuotaService.verifyQuota(userRole, client.id, client.name);
    if (!check.allowed && (userRole === 'partner' || (userRole as string) === 'consultant')) {
      setShowQuotaModal(true);
      return;
    }
    onNavigate('upload_report');
  };

  const handleOpenAnalysis = (client: ConsultantClient) => {
    if (onSelectClientReport) {
      onSelectClientReport(client);
    } else {
      onNavigate('report_analysis');
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-slate-50 overflow-y-auto select-none pb-14">
      {/* Header */}
      <Header
        title={language === 'mr' ? 'डिजिटल कट्टा पार्टनर केंद्र' : 'Partner / Franchise Hub'}
        showBack={true}
        onBack={onBack}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      <div className="p-4 space-y-4">
        {/* Franchise Kendra Performance Header */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-5 text-white shadow-xl relative overflow-hidden">
          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-2xl p-1.5 shadow-lg border border-slate-700/50 shrink-0">
                <DigitalKattaLogo size="xs" variant="image" showTagline={false} className="h-10 w-auto" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-400/30">
                    Partner Kendra #04 • Baner, Pune
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Active Portal
                  </span>
                </div>
                <h2 className="text-xl font-black mt-1">Mahesh Jadhav</h2>
                <p className="text-[11px] text-slate-400 font-medium">Franchise Partner ID: DK-PN-411045</p>
              </div>
            </div>

            {/* Role Switcher in Top Bar */}
            {onSwitchRole && (
              <div className="flex items-center bg-white/10 rounded-xl p-0.5 border border-white/15">
                {(['client', 'partner', 'admin'] as const).map(role => (
                  <button
                    key={role}
                    onClick={() => onSwitchRole(role)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-black capitalize transition-colors ${
                      userRole === role
                        ? 'bg-[#FF6B00] text-white shadow-xs'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-white/10 text-center relative z-10">
            <div className="bg-white/5 rounded-xl p-2">
              <span className="text-[10px] text-slate-400 block font-medium">Total Clients</span>
              <span className="text-base font-black text-white">{clients.length} Active</span>
            </div>
            <div className="bg-white/5 rounded-xl p-2">
              <span className="text-[10px] text-slate-400 block font-medium">Active Disputes</span>
              <span className="text-base font-black text-amber-400">
                {disputes.filter(d => d.stage !== 'Resolved').length} Cases
              </span>
            </div>
            <div className="bg-white/5 rounded-xl p-2">
              <span className="text-[10px] text-slate-400 block font-medium">Commission Earned</span>
              <span className="text-base font-black text-emerald-400">₹32,500</span>
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="flex gap-1 p-1 bg-slate-200/90 rounded-2xl text-xs font-bold text-slate-600 overflow-x-auto scrollbar-none shadow-inner">
          <button
            onClick={() => setActiveTab('clients')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === 'clients' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5 text-orange-500" />
            <span>{language === 'mr' ? 'ग्राहक यादी' : 'Clients'}</span>
          </button>

          <button
            onClick={() => setActiveTab('detail')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === 'detail' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span>{language === 'mr' ? 'ग्राहक तपशील ३६०°' : 'Client 360°'}</span>
          </button>

          <button
            onClick={() => setActiveTab('kanban')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === 'kanban' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Kanban className="w-3.5 h-3.5 text-purple-500" />
            <span>{language === 'mr' ? 'तक्रार ट्रॅकर' : 'Dispute Board'}</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === 'reports' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            <Download className="w-3.5 h-3.5 text-emerald-500" />
            <span>{language === 'mr' ? 'अहवाल' : 'Reports'}</span>
          </button>
        </div>

        {/* TAB 1: CLIENTS LIST */}
        {activeTab === 'clients' && (
          <div className="space-y-3">
            {/* Search + Add Client CTA */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={language === 'mr' ? 'नाव किंवा पॅन शोधा...' : 'Search name, phone, PAN...'}
                  className="w-full pl-9 pr-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#FF6B00]"
                />
              </div>
              <button
                id="btn-add-new-client"
                onClick={() => setShowAddClientModal(true)}
                className="px-3.5 py-2 bg-[#FF6B00] text-white rounded-xl text-xs font-black flex items-center gap-1 shadow-xs hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>{language === 'mr' ? 'नवीन ग्राहक' : 'Add Client'}</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px] font-bold">
              {['All', 'In Review', 'Dispute Active', 'Completed'].map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-full whitespace-nowrap transition-colors ${
                    selectedStatus === st
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-600'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Clients Cards */}
            <div className="space-y-2.5">
              {filteredClients.map(client => (
                <div
                  key={client.id}
                  onClick={() => {
                    setSelectedClient(client);
                    setActiveTab('detail');
                  }}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs hover:border-orange-300 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-xs font-black text-slate-900">{client.name}</h4>
                        <span
                          className={`text-[9px] font-black px-2 py-0.5 rounded-full ${
                            client.status === 'Completed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : client.status === 'Dispute Active'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {client.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                        {client.phone} • {client.city} • PAN: {client.pan}
                      </p>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-bold">Current Score</span>
                      <span className="text-sm font-black text-slate-800">
                        {client.currentScore} <span className="text-[10px] text-emerald-600">→ {client.targetScore}</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-100 text-[11px]">
                    <span className="text-slate-500 font-medium">
                      {client.activeDisputesCount} Disputes Filed • {client.reportsCount} Reports
                    </span>
                    <span className="text-[#FF6B00] font-black flex items-center gap-1">
                      <span>View 360° Profile</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: CLIENT 360° DETAIL VIEW */}
        {activeTab === 'detail' && selectedClient && (
          <div className="space-y-3">
            {/* Client Top Header */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-black text-slate-900">{selectedClient.name}</h3>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" />
                      {selectedClient.phone}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {selectedClient.city}
                    </span>
                  </div>
                  <p className="text-xs font-mono font-bold text-slate-700 mt-1">
                    PAN: {selectedClient.pan}
                  </p>
                </div>

                <button
                  onClick={() => handleExportClientPdf(selectedClient)}
                  className="px-3 py-1.5 rounded-xl bg-orange-50 text-[#FF6B00] border border-orange-200 text-xs font-black flex items-center gap-1 hover:bg-orange-100"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>PDF CIR</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-center">
                <div className="bg-slate-50 rounded-xl p-2">
                  <span className="text-[10px] text-slate-400 font-bold block">Current Bureau Score</span>
                  <span className="text-lg font-black text-slate-800">{selectedClient.currentScore}</span>
                </div>
                <div className="bg-emerald-50 rounded-xl p-2 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 font-bold block">Target Score After Disputes</span>
                  <span className="text-lg font-black text-emerald-800">{selectedClient.targetScore}</span>
                </div>
              </div>
            </div>

            {/* Credit Bureau Reports & Quota Management Card (Rule 2 & Rule 3) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#FF6B00]" />
                  <h4 className="text-xs font-black text-slate-900">
                    {language === 'mr' ? 'क्रेडिट अहवाल आणि कोटा व्यवस्थापन' : 'Credit Reports & Quota Tracker'}
                  </h4>
                </div>
                <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                  userRole === 'admin'
                    ? 'bg-emerald-100 text-emerald-800'
                    : (ReportQuotaService.verifyQuota('partner', selectedClient.id, selectedClient.name).allowed
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-rose-100 text-rose-800 border border-rose-200')
                }`}>
                  {userRole === 'admin'
                    ? 'Admin: Unlimited Reports'
                    : `${ReportQuotaService.verifyQuota('partner', selectedClient.id, selectedClient.name).currentCount} / 2 Reports Used`}
                </span>
              </div>

              <p className="text-[11px] text-slate-500">
                {userRole === 'admin'
                  ? 'Rule 3: Admin privilege allows unlimited credit reports generation for any client.'
                  : 'Rule 2: Franchise partner limit allows exactly 2 bureau reports per client.'}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleGenerateReportForClient(selectedClient)}
                  className="flex-1 py-2 rounded-xl bg-[#FF6B00] text-white text-xs font-black hover:bg-orange-600 shadow-xs flex items-center justify-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>
                    {language === 'mr' ? 'नवीन अहवाल अपलोड / स्कॅन करा' : 'Upload / Generate Report'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => handleExportClientPdf(selectedClient)}
                  className="px-3 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 flex items-center gap-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CIR</span>
                </button>
              </div>

              {/* Direct Deep Analysis Trigger */}
              <button
                type="button"
                onClick={() => handleOpenAnalysis(selectedClient)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-950 via-indigo-950 to-blue-900 text-white text-xs font-black hover:from-blue-900 hover:to-indigo-900 shadow-sm flex items-center justify-center gap-2 border border-blue-500/40 transition-all"
              >
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>
                  {language === 'mr'
                    ? `७-मुद्दे सखोल विश्लेषण अहवाल उघडा (स्कोअर: ${selectedClient.currentScore})`
                    : `Open 7-Point Deep Analysis (Score: ${selectedClient.currentScore})`}
                </span>
                <ChevronRight className="w-4 h-4 text-orange-400" />
              </button>
            </div>

            {/* KYC Checklist Card */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2.5">
              <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>KYC & Evidentiary Verification Documents</span>
              </h4>
              <div className="space-y-1.5">
                {selectedClient.kycDocuments.map(doc => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 text-xs"
                  >
                    <span className="font-bold text-slate-800">{doc.name}</span>
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-black">
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Digital Consent Log Card (RBI CICRA Section 20 Compliance) */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                  <KeyRound className="w-4 h-4 text-[#FF6B00]" />
                  <span>Digital Consent Audit Trail (CICRA Sec 20)</span>
                </h4>
                <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Audited
                </span>
              </div>

              {selectedClient.consentLogs.map(log => (
                <div
                  key={log.id}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-[11px] font-medium"
                >
                  <div className="flex justify-between text-slate-500">
                    <span>IP: {log.ipAddress}</span>
                    <span>{new Date(log.timestamp).toLocaleDateString()}</span>
                  </div>
                  <p className="text-slate-800 font-semibold">{log.consentText}</p>
                  <div className="flex justify-between text-[10px] text-slate-500 border-t border-slate-200 pt-1">
                    <span>Verification Hash: {log.otpVerificationId}</span>
                    <span className="text-[#FF6B00] font-bold">{log.cicraSection}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Case Notes & Timestamped Log */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-blue-600" />
                <span>Partner Case Notes & Timeline</span>
              </h4>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {selectedClient.caseNotes.map(note => (
                  <div key={note.id} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                    <div className="flex justify-between text-[10px] text-slate-400 font-bold mb-1">
                      <span>{note.author}</span>
                      <span>{note.date}</span>
                    </div>
                    <p className="text-slate-800 font-medium">{note.note}</p>
                  </div>
                ))}
              </div>

              {/* Add Note Input */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={e => setNewNoteText(e.target.value)}
                  placeholder="Enter consultation note or bank escalation ticket..."
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:border-[#FF6B00]"
                />
                <button
                  onClick={handleAddCaseNote}
                  className="px-3.5 py-2 bg-[#FF6B00] text-white rounded-xl text-xs font-black flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DISPUTE KANBAN BOARD */}
        {activeTab === 'kanban' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                {language === 'mr' ? '४-टप्प्यांची तक्रार ट्रॅकिंग बोर्ड' : '4-Stage Regulatory Dispute Board'}
              </span>
              <button
                onClick={handleExportCsv}
                className="text-xs font-black text-[#FF6B00] hover:underline flex items-center gap-1"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </button>
            </div>

            {/* Stages Overview */}
            {(['Open', 'In Progress', 'Submitted', 'Resolved'] as const).map(stage => {
              const stageDisputes = disputes.filter(d => d.stage === stage);
              return (
                <div
                  key={stage}
                  className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-xs space-y-2.5"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          stage === 'Resolved'
                            ? 'bg-emerald-500'
                            : stage === 'Submitted'
                            ? 'bg-blue-500'
                            : stage === 'In Progress'
                            ? 'bg-amber-500'
                            : 'bg-slate-400'
                        }`}
                      />
                      <span className="text-xs font-black text-slate-900">{stage}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-500">
                      {stageDisputes.length} Cases
                    </span>
                  </div>

                  <div className="space-y-2">
                    {stageDisputes.map(dispute => (
                      <div
                        key={dispute.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-black text-slate-900">{dispute.clientName}</p>
                            <p className="text-[11px] text-slate-500 font-medium">
                              {dispute.bankName} • {dispute.accountNumber}
                            </p>
                          </div>
                          <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            +{dispute.expectedScoreJump} pts
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-700 font-medium">
                          {dispute.issueCategory}
                        </p>

                        {/* Statutory countdown notice */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-200/80 text-[10px]">
                          <span className="text-slate-500 flex items-center gap-1 font-bold">
                            <Clock className="w-3 h-3 text-orange-500" />
                            {dispute.daysRemaining > 0
                              ? `${dispute.daysRemaining} days left in 30d window`
                              : 'Resolved on time'}
                          </span>

                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleSendReminder(dispute)}
                              className="px-2 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-bold flex items-center gap-1"
                              title="Send WhatsApp update to client"
                            >
                              <Share2 className="w-3 h-3" />
                              <span>WhatsApp</span>
                            </button>

                            {stage !== 'Resolved' && (
                              <button
                                onClick={() => handleAdvanceDisputeStage(dispute.id, dispute.stage)}
                                className="px-2 py-1 bg-[#FF6B00] text-white rounded-lg font-bold hover:bg-orange-600"
                              >
                                Advance →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* TAB 4: FRANCHISE REPORTS & EXPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Executive Export & Franchise Reporting</span>
              </h4>

              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Download formatted Excel/CSV rosters or certified client dispute packets stamped with Kendra #04 credentials.
              </p>

              <div className="space-y-2 pt-1">
                <button
                  onClick={handleExportCsv}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-xs font-black text-slate-800">Franchise Dispute Roster (CSV)</p>
                      <p className="text-[10px] text-slate-500">All active cases with RBI countdown and nodal officer emails</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>

                <button
                  onClick={() => handleExportClientPdf(selectedClient)}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-orange-50 border border-slate-200 hover:border-orange-300 text-left flex items-center justify-between transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Download className="w-5 h-5 text-[#FF6B00]" />
                    <div>
                      <p className="text-xs font-black text-slate-800">Client Certified Audit Pack (PDF)</p>
                      <p className="text-[10px] text-slate-500">Ready for banking ombudsman and client handoff</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Client Modal */}
      {showAddClientModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-4 animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-black text-slate-900">
                {language === 'mr' ? 'नवीन ग्राहक नोंदणी' : 'Enroll New Franchise Client'}
              </h3>
              <button
                onClick={() => setShowAddClientModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Client Full Name</label>
                <input
                  type="text"
                  value={newClientName}
                  onChange={e => setNewClientName(e.target.value)}
                  placeholder="e.g. Ramesh Shinde"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Mobile Number</label>
                <input
                  type="text"
                  value={newClientPhone}
                  onChange={e => setNewClientPhone(e.target.value)}
                  placeholder="+91 98XXX XXXXX"
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">PAN Number</label>
                  <input
                    type="text"
                    value={newClientPan}
                    onChange={e => setNewClientPan(e.target.value)}
                    placeholder="ABCDE1234F"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-mono font-bold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City / Location</label>
                  <input
                    type="text"
                    value={newClientCity}
                    onChange={e => setNewClientCity(e.target.value)}
                    placeholder="Pune, MH"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 font-semibold text-slate-800 focus:outline-none focus:border-[#FF6B00]"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowAddClientModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClient}
                className="flex-1 py-2.5 rounded-xl bg-[#FF6B00] text-white font-black text-xs shadow-sm flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Enroll Client</span>
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Partner Quota Modal for Rule 2 */}
      <PartnerQuotaModal
        isOpen={showQuotaModal}
        onClose={() => setShowQuotaModal(false)}
        clientName={selectedClient.name}
        reportCount={ReportQuotaService.verifyQuota('partner', selectedClient.id, selectedClient.name).currentCount}
        language={language}
        onSwitchToAdmin={() => onSwitchRole?.('admin')}
      />

      {/* Localized Document Export Modal */}
      {exportModalClient && (
        <ExportDocumentModal
          isOpen={Boolean(exportModalClient)}
          onClose={() => setExportModalClient(null)}
          report={exportModalClient}
          currentLanguage={language}
          consultantName="Digital Katta Kendra #04 - Baner, Pune"
        />
      )}
    </div>
  );
};

export const ConsultantHubScreen = PartnerHubScreen;
