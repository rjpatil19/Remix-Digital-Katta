import React, { useState } from 'react';
import { Calculator, ArrowRight, ChevronRight, PieChart } from 'lucide-react';
import { Header } from '../common/Header';
import { Language } from '../../types';

interface EmiCalculatorScreenProps {
  onBack: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const EmiCalculatorScreen: React.FC<EmiCalculatorScreenProps> = ({
  onBack,
  language,
  onToggleLanguage
}) => {
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenureYears, setTenureYears] = useState<number>(5);

  // EMI Formula: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;
  const emi =
    monthlyRate > 0
      ? Math.round(
          (loanAmount *
            monthlyRate *
            Math.pow(1 + monthlyRate, totalMonths)) /
            (Math.pow(1 + monthlyRate, totalMonths) - 1)
        )
      : Math.round(loanAmount / totalMonths);

  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - loanAmount;
  const principalPercentage = Math.round((loanAmount / totalPayment) * 100);
  const interestPercentage = 100 - principalPercentage;

  const formatRupee = (val: number) => {
    return '₹' + val.toLocaleString('en-IN');
  };

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-y-auto select-none pb-6">
      <Header
        title={language === 'mr' ? 'ईएमआय कॅल्क्युलेटर' : 'EMI Calculator'}
        showBack={true}
        onBack={onBack}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      <div className="p-5 space-y-5">
        {/* Output Hero Card */}
        <div className="bg-gradient-to-br from-[#0B214D] to-[#1C3E7D] rounded-3xl p-5 text-white shadow-lg text-center">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
            {language === 'mr' ? 'मासिक ईएमआय' : 'Monthly Loan EMI'}
          </span>
          <div className="text-3xl font-black mt-1 text-white tracking-tight">
            {formatRupee(emi)}
            <span className="text-xs font-normal text-slate-300"> /month</span>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-white/10 text-xs text-left">
            <div>
              <span className="text-slate-300 text-[10px] block">
                {language === 'mr' ? 'एकूण व्याज' : 'Total Interest Payable'}
              </span>
              <span className="font-black text-amber-300 text-sm">
                {formatRupee(totalInterest)}
              </span>
            </div>
            <div>
              <span className="text-slate-300 text-[10px] block">
                {language === 'mr' ? 'एकूण देय रक्कम' : 'Total Amount Payable'}
              </span>
              <span className="font-black text-white text-sm">
                {formatRupee(totalPayment)}
              </span>
            </div>
          </div>
        </div>

        {/* Ratio Bar */}
        <div>
          <div className="flex justify-between text-xs font-bold text-slate-600 mb-1.5">
            <span className="text-emerald-600">Principal: {principalPercentage}%</span>
            <span className="text-orange-600">Interest: {interestPercentage}%</span>
          </div>
          <div className="w-full h-3 bg-orange-200 rounded-full overflow-hidden flex">
            <div
              className="bg-emerald-500 h-full transition-all duration-300"
              style={{ width: `${principalPercentage}%` }}
            />
          </div>
        </div>

        {/* Sliders Area */}
        <div className="space-y-4 pt-2">
          {/* Slider 1: Loan Amount */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">
                {language === 'mr' ? 'कर्ज रक्कम (रुपये)' : 'Loan Amount'}
              </span>
              <span className="font-black text-[#FF6500] text-sm">
                {formatRupee(loanAmount)}
              </span>
            </div>
            <input
              type="range"
              min={50000}
              max={10000000}
              step={25000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-[#FF6500] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>₹50K</span>
              <span>₹50 Lakhs</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          {/* Slider 2: Interest Rate */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">
                {language === 'mr' ? 'व्याज दर (% प्रतिवर्ष)' : 'Interest Rate (% p.a.)'}
              </span>
              <span className="font-black text-[#FF6500] text-sm">
                {interestRate}%
              </span>
            </div>
            <input
              type="range"
              min={6}
              max={24}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-[#FF6500] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>6% (Home Loan)</span>
              <span>12%</span>
              <span>24% (NBFC/Cards)</span>
            </div>
          </div>

          {/* Slider 3: Tenure */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">
                {language === 'mr' ? 'कालावधी (वर्षे)' : 'Tenure (Years)'}
              </span>
              <span className="font-black text-[#FF6500] text-sm">
                {tenureYears} {language === 'mr' ? 'वर्षे' : 'Years'} ({tenureYears * 12} Mos)
              </span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full accent-[#FF6500] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-semibold">
              <span>1 Year</span>
              <span>15 Years</span>
              <span>30 Years</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
