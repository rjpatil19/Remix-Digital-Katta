import React, { useState } from 'react';
import { X, Layers, Server, ShieldCheck, MapPin, Database, Terminal, FileCode, CheckCircle } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'api' | 'roadmap' | 'edgecases'>('architecture');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 select-none">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200">
        {/* Top Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-500/20 text-[#FF6500] flex items-center justify-center border border-orange-500/30">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-black text-white">
                Digital कट्टा – System Architecture & Engineering Spec
              </h3>
              <p className="text-[11px] text-slate-400">
                Fintech Engine, CIBIL Parsing, Multi-Bureau Aggregation & Franchise API
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Controls */}
        <div className="flex bg-slate-100 p-1.5 border-b border-slate-200 gap-1 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all ${
              activeTab === 'architecture' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Architecture
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all ${
              activeTab === 'api' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            API Endpoints
          </button>
          <button
            onClick={() => setActiveTab('roadmap')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all ${
              activeTab === 'roadmap' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Roadmap (MVP to Prod)
          </button>
          <button
            onClick={() => setActiveTab('edgecases')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all ${
              activeTab === 'edgecases' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
            }`}
          >
            Fintech Edge Cases
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-slate-700 leading-relaxed font-sans">
          {activeTab === 'architecture' && (
            <div className="space-y-4">
              <h4 className="font-extrabold text-slate-900 text-sm">
                1. High-Level Architecture (Multi-Bureau Fintech Platform)
              </h4>
              <div className="bg-slate-900 text-emerald-400 p-4 rounded-2xl font-mono text-[11px] overflow-x-auto whitespace-pre leading-snug">
{`+-----------------------------------------------------------------------------+
|                      DIGITAL KATTA CLIENT ECOSYSTEM                         |
|  [Android Native (Jetpack Compose) / React Web PWA]  <--->  [Bilingual UI]  |
+-----------------------------------------------------------------------------+
                                       |
                     HTTPS / TLS 1.3 / mTLS & Pinning
                                       v
+-----------------------------------------------------------------------------+
|                    API GATEWAY & SECURITY LAYER (FastAPI / Node)            |
|   - OAuth2 / Firebase JWT Token Verification  - Rate Limiting (Redis)       |
|   - Indian PAN / Aadhaar Data Masking (RBI compliance)                      |
+-----------------------------------------------------------------------------+
              |                                         |
              v                                         v
+-----------------------------+          +------------------------------------+
|  REPORT PARSING MICROSERVICE|          |   BUREAU AGGREGATION & RESOLUTION  |
|  - CIBIL TU CIR Parser      |          |   - Cross-Bureau Conflict Detector |
|  - Experian HTML / JSON     |          |   - DPD & Settlement Discrepancies |
|  - Equifax / CRIF High Mark |          |   - Automated Dispute Letter Gen   |
|  - OCR Engine (Tesseract/AI)|          |   - Score Simulation Engine        |
+-----------------------------+          +------------------------------------+
              |                                         |
              +--------------------+--------------------+
                                   |
                                   v
+-----------------------------------------------------------------------------+
|                         DATA & PERSISTENCE LAYER                            |
|  - PostgreSQL: User accounts, Franchise credits, Dispute tracking, Loans    |
|  - Redis Cache: Instant bureau report queries & rate limiter                |
|  - AES-256 S3 Storage: Password-encrypted CIR PDF raw archives             |
+-----------------------------------------------------------------------------+`}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-1">Client Layer:</span>
                  Android Jetpack Compose & React 18, utilizing offline encrypted storage for cached score previews and biometric authentication.
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="font-bold text-slate-900 block mb-1">Backend Stack:</span>
                  FastAPI (Python) or Node.js/Express, with PyPDF2 / pdfplumber for CIR extraction and PostgreSQL for multi-tenant franchise data.
                </div>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">
                2. Detailed REST API Specification
              </h4>
              <div className="space-y-2 font-mono text-[11px]">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">POST</span>
                  <span className="ml-2 font-bold text-slate-800">/api/v1/reports/upload-and-parse</span>
                  <p className="text-slate-500 font-sans text-xs mt-1">
                    Accepts multipart PDF, JSON, or HTML along with optional password (DDMMYYYY). Extracts raw accounts, payment strings (000/030/XXX), and personal identifiers.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">GET</span>
                  <span className="ml-2 font-bold text-slate-800">/api/v1/analysis/:report_id</span>
                  <p className="text-slate-500 font-sans text-xs mt-1">
                    Returns structured score analysis: critical DPD errors, written-off tags, utilization percentages, and estimated score recovery (+54 pts).
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-bold">POST</span>
                  <span className="ml-2 font-bold text-slate-800">/api/v1/disputes/generate-letter</span>
                  <p className="text-slate-500 font-sans text-xs mt-1">
                    Payload: <code>{`{ account_id, dispute_reason, language: "en" | "mr" }`}</code>. Returns compliant legal letter targeting TransUnion CIBIL or Bank Principal Nodal Officer.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-700 font-bold">GET</span>
                  <span className="ml-2 font-bold text-slate-800">/api/v1/bureau/multi-compare/:user_id</span>
                  <p className="text-slate-500 font-sans text-xs mt-1">
                    Aggregates and compares reports across CIBIL, Experian, Equifax, and CRIF High Mark, highlighting cross-bureau discrepancies.
                  </p>
                </div>

                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-700 font-bold">POST</span>
                  <span className="ml-2 font-bold text-slate-800">/api/v1/consultant/batch-process</span>
                  <p className="text-slate-500 font-sans text-xs mt-1">
                    Allows franchise centers to queue up to 50 client reports simultaneously, computing commission and tracking dispute lifecycle.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'roadmap' && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">
                3. Step-by-Step Implementation Roadmap
              </h4>
              <div className="space-y-3">
                <div className="border-l-2 border-emerald-500 pl-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-600">Phase 1: MVP Core</span>
                    <span className="text-[9px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded">Completed</span>
                  </div>
                  <p className="text-slate-600 text-xs mt-0.5">
                    10 core screens matching UI mockups, client-side CIBIL parser, 7-point regulatory audit engine, rule-based dispute generation in English & Marathi, client management portal, and certified PDF export.
                  </p>
                </div>
                <div className="border-l-2 border-[#FF6B00] pl-3 bg-orange-50/50 p-2.5 rounded-r-xl border border-orange-200/60">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#FF6B00]">Phase 2: Backend & Security Integration</span>
                    <span className="text-[9px] font-black bg-[#FF6B00] text-white px-2 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">Active & Deployed</span>
                  </div>
                  <p className="text-slate-700 text-xs mt-1 font-medium">
                    Full-stack Node.js Express microservice active on Port 3000, AES-256-GCM document payload cryptography (DPDP Act 2023 compliant), Indian DLT-registered SMS OTP gateway (Header: VK-DIGKAT), and Principal Nodal Officer (PNO) 30-Day SLA & ₹100/Day Statutory Compensation tracker.
                  </p>
                  <div className="grid grid-cols-2 gap-1.5 mt-2 pt-2 border-t border-orange-200/60 text-[10px] font-mono text-slate-700">
                    <div>• REST Server: <span className="font-bold text-emerald-700">Express (Port 3000)</span></div>
                    <div>• Encryption: <span className="font-bold text-slate-900">AES-256-GCM</span></div>
                    <div>• DLT Header: <span className="font-bold text-blue-700">VK-DIGKAT</span></div>
                    <div>• Bank PNOs: <span className="font-bold text-orange-700">8 Regulated Entities</span></div>
                  </div>
                </div>
                <div className="border-l-2 border-slate-300 pl-3 opacity-75">
                  <span className="text-xs font-black text-slate-500">Phase 3: Automated Bureau & Lending APIs</span>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Direct TransUnion CIBIL Partner API & Experian Connect integration for instant 1-click report retrieval without manual PDF upload, pre-approved loan syndication with top PSBs and private banks.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'edgecases' && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-900 text-sm">
                4. Critical Indian Fintech Edge Cases & Mitigations
              </h4>
              <div className="space-y-2 text-xs">
                <div className="p-3 bg-red-50/70 border border-red-100 rounded-xl">
                  <span className="font-bold text-red-900 block">1. Scanned Image PDFs vs Digital Text:</span>
                  Some users upload photocopied or mobile camera photos of printed CIR reports.
                  <p className="text-slate-600 mt-1">
                    <strong>Mitigation:</strong> Dual-pipeline parsing. Test for extractable text stream first (pdfplumber); if character count &lt; 50, route to OCR pipeline with deskewing and table bounding-box detection.
                  </p>
                </div>

                <div className="p-3 bg-amber-50/70 border border-amber-100 rounded-xl">
                  <span className="font-bold text-amber-900 block">2. Multi-Bureau Status Conflicts:</span>
                  HDFC or SBI reports an account as "Written Off" in CIBIL, but "Closed" or "Standard" in Experian due to differing reporting cycles.
                  <p className="text-slate-600 mt-1">
                    <strong>Mitigation:</strong> Automated Cross-Bureau Discrepancy Evidence Attachment. The system generates an evidence packet showing the conflicting report date and bureau ID to accelerate dispute resolution under RBI Circular 2023.
                  </p>
                </div>

                <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-xl">
                  <span className="font-bold text-blue-900 block">3. Password-Protected CIR PDFs:</span>
                  Bureau PDFs are encrypted with standard combinations: First 4 characters of name + last 4 digits of mobile, or Date of Birth (DDMMYYYY).
                  <p className="text-slate-600 mt-1">
                    <strong>Mitigation:</strong> Auto-try password permutations derived from user KYC profile (Name, DOB, Mobile, PAN) before prompting user for manual password entry.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800"
          >
            Close Spec
          </button>
        </div>
      </div>
    </div>
  );
};
