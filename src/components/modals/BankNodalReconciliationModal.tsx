import React, { useState } from 'react';
import {
  X,
  Building2,
  Clock,
  AlertTriangle,
  FileText,
  Mail,
  Copy,
  Check,
  Send,
  ExternalLink,
  ShieldCheck,
  Sparkles,
  DollarSign,
  ChevronRight,
  Phone,
  MapPin,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import { Language, BankNodalOfficer, NodalReconciliationCase } from '../../types';
import { bankNodalOfficers, sampleNodalCases } from '../../data/nodalOfficersData';
import confetti from 'canvas-confetti';

interface BankNodalReconciliationModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  onMilestoneCompleted?: (scoreGain: number) => void;
}

export const BankNodalReconciliationModal: React.FC<BankNodalReconciliationModalProps> = ({
  isOpen,
  onClose,
  language,
  onMilestoneCompleted
}) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(sampleNodalCases[0].id);
  const [letterLanguage, setLetterLanguage] = useState<'en' | 'mr'>('en');
  const [copied, setCopied] = useState<boolean>(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>(['task-1']);
  const [showCompensationInfo, setShowCompensationInfo] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'tracker' | 'officers' | 'notice' | 'ombudsman'>('tracker');

  if (!isOpen) return null;

  const currentCase = sampleNodalCases.find((c) => c.id === selectedCaseId) || sampleNodalCases[0];
  const assignedOfficer = bankNodalOfficers.find((o) => o.id === currentCase.bankId) || bankNodalOfficers[0];

  const handleCopyNotice = () => {
    const text = letterLanguage === 'en' ? currentCase.disputeLetterDraftEn : currentCase.disputeLetterDraftMr;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMailTo = () => {
    const subject = encodeURIComponent(`Statutory Notice under Section 21 CICRA 2005 - ${currentCase.bankName} Account ${currentCase.accountNumberMasked}`);
    const body = encodeURIComponent(currentCase.disputeLetterDraftEn);
    window.location.href = `mailto:${assignedOfficer.email}?subject=${subject}&body=${body}`;
  };

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) => {
      const next = prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId];
      if (next.length === 3 && !prev.includes(taskId)) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        onMilestoneCompleted?.(22);
      }
      return next;
    });
  };

  const isPhase2FullyComplete = completedTasks.length === 3;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#0B214D] via-[#143370] to-[#0B214D] text-white p-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF6B00] text-white text-[10px] font-black tracking-wide uppercase shadow-xs">
              Phase 2 Active
            </span>
            <span className="text-[11px] text-blue-200 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              RBI CICRA Section 21 Protocol
            </span>
          </div>

          <h3 className="text-lg font-black tracking-tight">
            {language === 'mr'
              ? 'टप्पा २: बँक नोडल अधिकारी पडताळणी केंद्र'
              : 'Phase 2: Bank Nodal Officer Reconciliation Hub'}
          </h3>
          <p className="text-xs text-blue-100/90 mt-0.5 max-w-xl">
            {language === 'mr'
              ? 'बँकांच्या प्रधान नोडल अधिकाऱ्यांकडे थेट पाठपुरावा, ३० दिवसांची वैधानिक मुदत व आरबीआय लोकपाल निवारण.'
              : 'Direct escalation to Bank Principal Nodal Officers, 30-day statutory resolution tracking, and RBI Ombudsman resolution.'}
          </p>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-1.5 mt-4 overflow-x-auto pb-0.5 text-xs font-bold scrollbar-none">
            {[
              { id: 'tracker', label: language === 'mr' ? '३०-दिवसीय पाठपुरावा' : '30-Day Tracker', icon: Clock },
              { id: 'notice', label: language === 'mr' ? 'कायदेशीर नोटीस ड्राफ्ट' : 'Legal Notice Draft', icon: FileText },
              { id: 'officers', label: language === 'mr' ? 'नोडल अधिकारी डिरेक्टरी' : 'PNO Directory (8 Banks)', icon: Building2 },
              { id: 'ombudsman', label: language === 'mr' ? 'आरबीआय लोकपाल (CMS)' : 'RBI Ombudsman (CMS)', icon: ExternalLink }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-white text-[#0B214D] shadow-md font-extrabold'
                      : 'bg-white/10 hover:bg-white/15 text-white/90'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-slate-800 text-xs">
          {/* TAB 1: 30-DAY STATUTORY TRACKER */}
          {activeTab === 'tracker' && (
            <div className="space-y-4">
              {/* Active Case Selector */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">
                  {language === 'mr' ? 'सक्रिय नोडल तक्रार प्रकरण निवडा' : 'Select Active Reconciliation Case'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {sampleNodalCases.map((c) => {
                    const isSelected = c.id === selectedCaseId;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setSelectedCaseId(c.id)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-[#FF6B00] bg-white ring-2 ring-orange-500/20 shadow-xs'
                            : 'border-slate-200 bg-white/60 hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-extrabold text-slate-900 text-xs">{c.bankName}</span>
                          <span
                            className={`text-[9px] font-black px-1.5 py-0.5 rounded-md ${
                              c.daysElapsed > 30
                                ? 'bg-red-100 text-red-700'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-mono mt-0.5">{c.accountNumberMasked}</p>
                        <p className="text-[10px] text-slate-600 line-clamp-1 mt-1 font-medium">
                          {language === 'mr' ? c.disputeReasonMr : c.disputeReason}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 30-Day Statutory Timer Card */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl p-4 border border-amber-200 shadow-xs space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-black text-amber-800 uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100">
                      RBI Statutory Window • 30 Calendar Days
                    </span>
                    <h4 className="text-sm font-black text-slate-900 mt-1">
                      {currentCase.bankName} • {currentCase.accountType}
                    </h4>
                    <p className="text-[11px] text-slate-600 font-medium">
                      Ack Ref: <span className="font-mono font-bold text-slate-800">{currentCase.acknowledgementNumber}</span>
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-xl font-black text-[#FF6B00]">
                      {currentCase.daysRemaining > 0 ? `${currentCase.daysRemaining} Days` : 'Expired'}
                    </span>
                    <p className="text-[10px] text-slate-500 font-bold">
                      {currentCase.daysRemaining > 0 ? 'Remaining to Comply' : 'Statutory Breach'}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-600">
                    <span>Filing Date: {currentCase.createdDate}</span>
                    <span>Elapsed: {currentCase.daysElapsed} / 30 Days</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-2.5 rounded-full transition-all duration-500 ${
                        currentCase.daysElapsed > 30 ? 'bg-red-500' : 'bg-[#FF6B00]'
                      }`}
                      style={{ width: `${Math.min(100, (currentCase.daysElapsed / 30) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Statutory Compensation Clause Alert (RBI Circular 2023) */}
                <div className="bg-white/80 rounded-xl p-3 border border-amber-200/80 flex items-start gap-2.5">
                  <DollarSign className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-amber-900">
                        ₹100/Day Statutory Delay Compensation Rule
                      </span>
                      {currentCase.compensationAccrued > 0 && (
                        <span className="text-xs font-black text-red-600 bg-red-100 px-2 py-0.5 rounded-md">
                          Claimable: ₹{currentCase.compensationAccrued}
                        </span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-600 mt-0.5 leading-relaxed">
                      Per RBI Master Direction (CEPD.PR.No.684/13.01.001/2023-24), if the lender fails to resolve credit reporting errors within 30 calendar days, the customer is legally entitled to compensation of <strong>₹100 per day of delay</strong> directly credited to their bank account.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Milestone Checklist for Phase 2 */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#FF6B00]" />
                    {language === 'mr' ? 'टप्पा २ कृती टप्पे (+२२ गुण प्राप्ती)' : 'Phase 2 Milestones (+22 Score Points)'}
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                    {completedTasks.length} of 3 Complete
                  </span>
                </div>

                <div className="space-y-2">
                  {[
                    {
                      id: 'task-1',
                      title: '1. Send Section 21 Statutory Notice to Principal Nodal Officer',
                      titleMr: '१. प्रधान नोडल अधिकाऱ्यांकडे कलम २१ अन्वये वैधानिक नोटीस पाठवली',
                      desc: 'Dispatched formal legal notice with attached NDC to official nodal email.'
                    },
                    {
                      id: 'task-2',
                      title: '2. Track 30-Day Mandatory Resolution & Log Ticket Reference',
                      titleMr: '२. ३० दिवसांच्या विहित मुदतीचे निरीक्षण आणि तक्रार संदर्भ नोंद',
                      desc: 'Ticket acknowledged by bank ops team; tracking statutory SLA timeline.'
                    },
                    {
                      id: 'task-3',
                      title: '3. Reconcile Revised Bureau Feed & Secure "Closed" Certificate',
                      titleMr: '३. सिबिलमध्ये सुधारित नोंदीची खात्री आणि क्लोजर प्रमाणपत्र प्राप्त',
                      desc: 'Bank uploaded corrected member file; derogatory settled/overdue tag expunged.'
                    }
                  ].map((task) => {
                    const isDone = completedTasks.includes(task.id);
                    return (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`p-2.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                          isDone
                            ? 'bg-emerald-50/60 border-emerald-200'
                            : 'bg-slate-50 border-slate-200 hover:bg-orange-50/40 hover:border-orange-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                            isDone ? 'bg-emerald-600 text-white' : 'border border-slate-300 bg-white'
                          }`}
                        >
                          {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-bold ${isDone ? 'text-emerald-900 line-through' : 'text-slate-800'}`}>
                            {language === 'mr' ? task.titleMr : task.title}
                          </p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{task.desc}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {isPhase2FullyComplete && (
                  <div className="p-3 bg-emerald-100/70 border border-emerald-300 rounded-xl text-emerald-900 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <span className="text-xs font-black block">Phase 2 Reconciled Successfully!</span>
                      <span className="text-[10px]">
                        +22 Points added to your projected score trajectory (770 → 792).
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: LEGAL NOTICE DRAFT */}
          {activeTab === 'notice' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-700">Notice Language:</span>
                  <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-[11px] font-bold">
                    <button
                      onClick={() => setLetterLanguage('en')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        letterLanguage === 'en' ? 'bg-[#0B214D] text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setLetterLanguage('mr')}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        letterLanguage === 'mr' ? 'bg-[#0B214D] text-white shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      मराठी (Legal)
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handleCopyNotice}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Notice'}</span>
                  </button>
                  <button
                    onClick={handleMailTo}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-orange-600 text-white font-bold transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send to PNO Email</span>
                  </button>
                </div>
              </div>

              {/* Recipient Card */}
              <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 uppercase">Direct Recipient:</span>
                  <p className="text-xs font-black text-slate-900">{assignedOfficer.officerName} ({assignedOfficer.designation})</p>
                  <p className="text-[11px] text-blue-600 font-mono font-medium">{assignedOfficer.email}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-1 rounded-md bg-blue-100 text-blue-800">
                  {assignedOfficer.escalationLevel}
                </span>
              </div>

              {/* Notice Preview Box */}
              <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl font-mono text-[11px] leading-relaxed whitespace-pre-wrap max-h-72 overflow-y-auto border border-slate-800 select-text shadow-inner">
                {letterLanguage === 'en' ? currentCase.disputeLetterDraftEn : currentCase.disputeLetterDraftMr}
              </div>
            </div>
          )}

          {/* TAB 3: PRINCIPAL NODAL OFFICERS DIRECTORY */}
          {activeTab === 'officers' && (
            <div className="space-y-2.5">
              <p className="text-xs text-slate-600 font-medium">
                Official grievance contact details for Indian scheduled commercial banks and NBFCs per RBI Master Direction:
              </p>

              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {bankNodalOfficers.map((officer) => (
                  <div
                    key={officer.id}
                    className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 hover:bg-white hover:border-blue-300 transition-all space-y-1.5"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-black text-slate-900 text-xs flex items-center gap-1.5">
                          <span>{officer.bankName}</span>
                          <span className="text-[10px] text-slate-400 font-normal">({officer.bankCode})</span>
                        </h5>
                        <p className="text-[11px] text-slate-600 font-medium">
                          {officer.officerName} • <span className="text-slate-500">{officer.designation}</span>
                        </p>
                      </div>
                      <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                        {officer.disputeResolutionSlaDays} Days SLA
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] text-slate-600 pt-1 border-t border-slate-200/60 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3 text-orange-500 shrink-0" />
                        <a href={`mailto:${officer.email}`} className="text-blue-600 hover:underline truncate">
                          {officer.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="truncate">{officer.phone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: RBI OMBUDSMAN ESCALATION */}
          {activeTab === 'ombudsman' && (
            <div className="space-y-3">
              <div className="bg-red-50/80 rounded-2xl p-4 border border-red-200 space-y-2">
                <div className="flex items-center gap-2 text-red-800">
                  <AlertTriangle className="w-4 h-4" />
                  <h4 className="text-xs font-black">When to Escalate to the RBI Ombudsman?</h4>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Under the <strong>Reserve Bank - Integrated Ombudsman Scheme, 2021</strong>, if the bank or NBFC:
                </p>
                <ul className="list-disc pl-4 text-[10px] text-slate-600 space-y-1 font-medium">
                  <li>Fails to reply within <strong>30 calendar days</strong> of lodging the formal complaint.</li>
                  <li>Rejects your dispute without providing documentary evidence or NOC consideration.</li>
                  <li>Refuses to pay the statutory compensation of ₹100 per day for delay.</li>
                </ul>
              </div>

              <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 space-y-2.5">
                <h5 className="font-black text-slate-900 text-xs">Official RBI CMS Portal Filing Steps:</h5>
                <div className="space-y-1.5 text-[11px] text-slate-700">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0B214D] text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">1</span>
                    <p>Visit <strong>cms.rbi.org.in</strong> and select "File a Complaint".</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0B214D] text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">2</span>
                    <p>Select Regulated Entity type: "Banking Company" or "Non-Banking Financial Company (NBFC)".</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0B214D] text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">3</span>
                    <p>Upload your <strong>PNO Notice acknowledgement copy</strong>, <strong>No Dues Certificate (NDC)</strong>, and CIBIL report highlighting the error.</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0B214D] text-white flex items-center justify-center text-[9px] font-bold shrink-0 mt-0.5">4</span>
                    <p>Claim statutory compensation under clause CEPD.PR.No.684 for delayed rectification.</p>
                  </div>
                </div>

                <div className="pt-2">
                  <a
                    href="https://cms.rbi.org.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B214D] hover:bg-slate-900 text-white font-bold text-xs shadow-xs transition-colors"
                  >
                    <span>Open RBI CMS Portal (cms.rbi.org.in)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Phase 2 SLA Protected under CICRA 2005</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors"
          >
            {language === 'mr' ? 'बंद करा' : 'Done / Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
