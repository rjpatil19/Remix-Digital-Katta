import React from 'react';
import { User, Calendar, ShieldCheck } from 'lucide-react';
import { Language } from '../../types';

export interface CustomerHeaderPillProps {
  fullName: string;
  reportDate: string;
  score?: number;
  controlNumber?: string;
  language?: Language;
  className?: string;
}

export const CustomerHeaderPill: React.FC<CustomerHeaderPillProps> = ({
  fullName,
  reportDate,
  score,
  controlNumber,
  language = 'en',
  className = ''
}) => {
  const customerLabel = language === 'mr' ? 'ग्राहक' : language === 'hi' ? 'ग्राहक' : 'Client';
  const dateLabel = language === 'mr' ? 'दिनांक' : language === 'hi' ? 'दिनांक' : 'Date';

  return (
    <div
      id="persistent-customer-header-pill"
      className={`w-full flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-orange-50/90 via-white to-slate-50 border border-orange-200/70 shadow-2xs transition-all duration-300 ${className}`}
      title={`${customerLabel}: ${fullName} | ${dateLabel}: ${reportDate}`}
    >
      {/* Customer Name Group */}
      <div className="flex items-center gap-1.5 min-w-0 flex-1">
        <div className="relative flex items-center justify-center w-6 h-6 rounded-full bg-[#FF6500]/10 text-[#FF6500] shrink-0 border border-orange-300/40">
          <User className="w-3.5 h-3.5" />
          <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
        </div>
        <div className="min-w-0 flex items-baseline gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden xs:inline">
            {customerLabel}:
          </span>
          <span className="text-xs font-black text-slate-900 truncate tracking-tight">
            {fullName || 'N/A'}
          </span>
        </div>
      </div>

      {/* Date & Meta Group */}
      <div className="flex items-center gap-2 shrink-0">
        {/* Report Date Pill */}
        <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded-lg border border-slate-200/80 shadow-2xs">
          <Calendar className="w-3 h-3 text-orange-600" />
          <span className="text-[10px] text-slate-400 hidden sm:inline">{dateLabel}:</span>
          <span className="text-slate-800 font-mono text-[11px]">{reportDate || 'N/A'}</span>
        </div>

        {/* Score Badge if present */}
        {typeof score === 'number' && score > 0 && (
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-black border shadow-2xs ${
              score >= 750
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : score >= 700
                ? 'bg-blue-50 text-blue-800 border-blue-200'
                : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}
            title={`CIBIL Score: ${score}`}
          >
            <ShieldCheck className="w-3 h-3" />
            <span>{score}</span>
          </div>
        )}

        {/* Optional Control Number Tag for wide screens */}
        {controlNumber && (
          <span className="hidden md:inline-block text-[10px] font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200/60">
            ECN: {controlNumber}
          </span>
        )}
      </div>
    </div>
  );
};
