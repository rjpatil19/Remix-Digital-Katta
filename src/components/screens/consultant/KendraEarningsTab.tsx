import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Award,
  Download,
  Calendar,
  CreditCard,
  Building2,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Sparkles,
  PieChart
} from 'lucide-react';
import { Language } from '../../../types';
import { t } from '../../../i18n';

interface KendraEarningsTabProps {
  language: Language;
}

interface TransactionRecord {
  id: string;
  clientName: string;
  type: 'CIR_ANALYSIS' | 'DISPUTE_RESOLUTION' | 'LOAN_REFERRAL' | 'SUBSCRIPTION_BONUS';
  amount: number;
  commission: number;
  status: 'SETTLED' | 'PROCESSING';
  date: string;
  utr: string;
}

const mockTransactions: TransactionRecord[] = [
  {
    id: 'tx-101',
    clientName: 'Rajwardhan Madhukar Madhukar',
    type: 'DISPUTE_RESOLUTION',
    amount: 5000,
    commission: 3500,
    status: 'SETTLED',
    date: '14 Sep 2025',
    utr: 'HDFCR52025091400192'
  },
  {
    id: 'tx-102',
    clientName: 'Rahul Deshmukh',
    type: 'CIR_ANALYSIS',
    amount: 1500,
    commission: 1050,
    status: 'SETTLED',
    date: '12 Sep 2025',
    utr: 'SBIN00492819283'
  },
  {
    id: 'tx-103',
    clientName: 'Priya Shinde',
    type: 'DISPUTE_RESOLUTION',
    amount: 4500,
    commission: 3150,
    status: 'SETTLED',
    date: '08 Sep 2025',
    utr: 'ICICIR982173918'
  },
  {
    id: 'tx-104',
    clientName: 'Anil Kulkarni',
    type: 'LOAN_REFERRAL',
    amount: 12000,
    commission: 8400,
    status: 'PROCESSING',
    date: '05 Sep 2025',
    utr: 'AXISR491029381'
  },
  {
    id: 'tx-105',
    clientName: 'Sunita Patil',
    type: 'CIR_ANALYSIS',
    amount: 1500,
    commission: 1050,
    status: 'SETTLED',
    date: '01 Sep 2025',
    utr: 'HDFCR481928391'
  }
];

export const KendraEarningsTab: React.FC<KendraEarningsTabProps> = ({ language }) => {
  const [filter, setFilter] = useState<'ALL' | 'SETTLED' | 'PROCESSING'>('ALL');

  const totalEarnings = 142500;
  const currentMonthEarnings = 38500;
  const pendingPayout = 8400;

  const filteredTx = mockTransactions.filter(tx => {
    if (filter === 'SETTLED') return tx.status === 'SETTLED';
    if (filter === 'PROCESSING') return tx.status === 'PROCESSING';
    return true;
  });

  return (
    <div className="space-y-4">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Total Lifetime */}
        <div className="bg-gradient-to-br from-slate-900 to-indigo-950 text-white p-4 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-400 text-xs font-bold mb-1">
            <span>{language === 'mr' ? 'एकूण केंद्र कमाई (Lifetime)' : 'Lifetime Kendra Revenue'}</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white">₹{totalEarnings.toLocaleString('en-IN')}</p>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold mt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24% {language === 'mr' ? 'मागील महिन्यापेक्षा' : 'vs last month'}</span>
          </div>
        </div>

        {/* Current Month */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
            <span>{language === 'mr' ? 'या महिन्यातील कमाई' : 'This Month Accrued'}</span>
            <Calendar className="w-4 h-4 text-[#FF6B00]" />
          </div>
          <p className="text-2xl font-black text-slate-900">₹{currentMonthEarnings.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            {language === 'mr' ? '१४ यशस्वी सिबिल प्रकरणे' : '14 Successful client cases'}
          </p>
        </div>

        {/* Pending Settlement */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold mb-1">
            <span>{language === 'mr' ? 'प्रक्रियेत असलेले कमिशन' : 'Pending Settlement'}</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-amber-600">₹{pendingPayout.toLocaleString('en-IN')}</p>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            {language === 'mr' ? 'येत्या मंगळवारी थेट बँक खात्यात' : 'Direct NEFT on Tuesday'}
          </p>
        </div>
      </div>

      {/* Kendra Tier & Commission Rates Banner */}
      <div className="bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border border-amber-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center font-black shadow-xs">
            70%
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-slate-900">
                {language === 'mr' ? 'गोल्ड केंद्र फ्रँचायझी (Gold Tier)' : 'Gold Kendra Franchise Tier'}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-amber-900 font-black">
                Active Tier
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
              {language === 'mr'
                ? 'सिबिल अहवाल: ₹१,०५०/केस • त्रुटी दुरुस्ती: ₹३,५००/खाते • कर्ज मंजुरी: ०.५% पेआउट'
                : 'CIR Audit: ₹1,050/case • Dispute Fix: ₹3,500/tradeline • Loan Payout: 0.50%'}
            </p>
          </div>
        </div>

        <button
          onClick={() => alert('Payout Account: HDFC Bank A/C **8491 (Branch: Baner, Pune) • IFSC: HDFC0001234')}
          className="px-3.5 py-1.5 rounded-xl bg-white border border-amber-300 text-slate-800 text-xs font-bold hover:bg-amber-100/50 transition-colors shadow-2xs"
        >
          {language === 'mr' ? 'बँक खाते तपशील' : 'Linked Bank A/C'}
        </button>
      </div>

      {/* Commission Ledger */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-black text-slate-900">
              {language === 'mr' ? 'कमिशन जमा इतिहास व लेजर' : 'Commission Payout Ledger'}
            </h4>
            <p className="text-[11px] text-slate-500">
              {language === 'mr' ? 'प्रत्येक क्लायंट अहवाल व तक्रार निवारणाचे तपशील' : 'Real-time transaction audit & direct bank credits'}
            </p>
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-xl text-xs font-bold">
            {(['ALL', 'SETTLED', 'PROCESSING'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-2.5 py-1 rounded-lg transition-colors ${
                  filter === tab
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Rows */}
        <div className="space-y-2">
          {filteredTx.map(tx => (
            <div
              key={tx.id}
              className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-2 text-xs"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${
                    tx.status === 'SETTLED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {tx.status === 'SETTLED' ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>
                <div>
                  <p className="font-black text-slate-900">{tx.clientName}</p>
                  <p className="text-[10px] text-slate-500 font-mono">
                    {tx.type.replace('_', ' ')} • UTR: {tx.utr}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-black text-emerald-700 text-sm">
                  +₹{tx.commission.toLocaleString('en-IN')}
                </p>
                <span className="text-[10px] text-slate-400 font-medium">
                  Gross: ₹{tx.amount.toLocaleString('en-IN')} • {tx.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
