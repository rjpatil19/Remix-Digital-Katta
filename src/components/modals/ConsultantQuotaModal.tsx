import React from 'react';
import { X, AlertCircle, ShieldAlert, Sparkles, UserCog, CheckCircle } from 'lucide-react';
import { Language, UserRole } from '../../types';

interface ConsultantQuotaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToAdmin: () => void;
  clientName: string;
  reportCount: number;
  language: Language;
}

export const ConsultantQuotaModal: React.FC<ConsultantQuotaModalProps> = ({
  isOpen,
  onClose,
  onSwitchToAdmin,
  clientName,
  reportCount,
  language
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-5 border border-slate-200 animate-in fade-in zoom-in-95 duration-200 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                Rule 2: Consultant Limit
              </span>
              <h3 className="text-sm font-black text-slate-900 mt-1">
                {language === 'mr' ? 'ग्राहकासाठी २ अहवाल मर्यादा पूर्ण' : 'Client Limit: 2 Reports Max'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="bg-amber-50/60 rounded-2xl p-3.5 border border-amber-200 text-xs text-slate-700 space-y-2">
          <div className="flex justify-between font-bold text-slate-800 border-b border-amber-200 pb-1.5">
            <span>Client:</span>
            <span className="text-slate-900">{clientName}</span>
          </div>
          <div className="flex justify-between text-[11px]">
            <span>Reports Generated:</span>
            <span className="font-bold text-amber-800">{reportCount} / 2 Reports (Quota Full)</span>
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
            {language === 'mr'
              ? 'कन्सल्टंट प्लॅन अंतर्गत एका ग्राहकासाठी जास्तीत जास्त २ सिबिल अहवाल तयार करण्याची परवानगी आहे. पुढील अमर्याद अहवालांसाठी ॲडमिन (Admin) मोड वापरा.'
              : 'Under Rule 2, consultants are permitted a maximum of 2 reports per client. Switch to Admin Access for unlimited generation across all franchise clients.'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            id="btn-switch-to-admin-quota"
            onClick={() => {
              onSwitchToAdmin();
              onClose();
            }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-slate-900 to-indigo-950 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 hover:from-slate-800 hover:to-indigo-900 transition-all"
          >
            <UserCog className="w-4 h-4 text-orange-400" />
            <span>Switch to Admin (Unlimited Reports)</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-700"
          >
            Close & Review Existing Reports
          </button>
        </div>
      </div>
    </div>
  );
};
