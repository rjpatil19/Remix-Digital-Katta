import React, { useState } from 'react';
import {
  User,
  Home,
  Car,
  Store,
  GraduationCap,
  Headphones,
  ChevronRight,
  CheckCircle2,
  X,
  Calculator
} from 'lucide-react';
import { Header } from '../common/Header';
import { Language, ScreenId } from '../../types';

interface LoanEligibilityScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
  language: Language;
  onToggleLanguage: () => void;
}

interface LoanTypeItem {
  id: string;
  name: string;
  nameMr: string;
  maxAmount: string;
  maxAmountMr: string;
  interestRate: string;
  tenure: string;
  icon: 'user' | 'home' | 'car' | 'store' | 'cap';
  bgColor: string;
  iconColor: string;
}

export const LoanEligibilityScreen: React.FC<LoanEligibilityScreenProps> = ({
  onBack,
  onNavigate,
  language,
  onToggleLanguage
}) => {
  const [selectedLoan, setSelectedLoan] = useState<LoanTypeItem | null>(null);
  const [appliedSuccess, setAppliedSuccess] = useState(false);

  const loanTypes: LoanTypeItem[] = [
    {
      id: 'personal',
      name: 'Personal Loan',
      nameMr: 'वैयक्तिक कर्ज',
      maxAmount: 'Up to ₹25 Lakhs',
      maxAmountMr: '₹२५ लाखांपर्यंत',
      interestRate: '10.49% - 14.5% p.a.',
      tenure: 'Up to 5 Years',
      icon: 'user',
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      id: 'home',
      name: 'Home Loan',
      nameMr: 'गृहकर्ज',
      maxAmount: 'Up to ₹5 Crores',
      maxAmountMr: '₹५ कोटींपर्यंत',
      interestRate: '8.35% - 9.25% p.a.',
      tenure: 'Up to 30 Years',
      icon: 'home',
      bgColor: 'bg-emerald-100',
      iconColor: 'text-emerald-600'
    },
    {
      id: 'car',
      name: 'Car Loan',
      nameMr: 'वाहन कर्ज',
      maxAmount: 'Up to ₹50 Lakhs',
      maxAmountMr: '₹५० लाखांपर्यंत',
      interestRate: '8.75% - 10.0% p.a.',
      tenure: 'Up to 7 Years',
      icon: 'car',
      bgColor: 'bg-sky-100',
      iconColor: 'text-sky-600'
    },
    {
      id: 'business',
      name: 'Business Loan',
      nameMr: 'व्यावसायिक कर्ज',
      maxAmount: 'Up to ₹1 Crore',
      maxAmountMr: '₹१ कोटीपर्यंत',
      interestRate: '11.0% - 16.0% p.a.',
      tenure: 'Up to 7 Years (Unsecured/CGTMSE)',
      icon: 'store',
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600'
    },
    {
      id: 'education',
      name: 'Education Loan',
      nameMr: 'शैक्षणिक कर्ज',
      maxAmount: 'Up to ₹1 Crore',
      maxAmountMr: '₹१ कोटीपर्यंत',
      interestRate: '8.65% - 11.2% p.a.',
      tenure: 'Moratorium + 15 Years',
      icon: 'cap',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600'
    }
  ];

  const renderIcon = (type: LoanTypeItem['icon']) => {
    switch (type) {
      case 'user':
        return <User className="w-6 h-6 stroke-[2.2]" />;
      case 'home':
        return <Home className="w-6 h-6 stroke-[2.2]" />;
      case 'car':
        return <Car className="w-6 h-6 stroke-[2.2]" />;
      case 'store':
        return <Store className="w-6 h-6 stroke-[2.2]" />;
      case 'cap':
        return <GraduationCap className="w-6 h-6 stroke-[2.2]" />;
    }
  };

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-y-auto select-none pb-6">
      {/* Header */}
      <Header
        title={language === 'mr' ? 'कर्ज पात्रता' : 'Loan Eligibility'}
        showBack={true}
        onBack={onBack}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      <div className="px-5 pt-3 space-y-4">
        {/* Title & Subtitle matching Screen 6 */}
        <div>
          <h2 className="text-xl font-black text-[#0B214D] tracking-tight">
            {language === 'mr' ? 'तुमची पात्रता तपासा' : 'Check Your Eligibility'}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {language === 'mr'
              ? 'तुमच्या प्रोफाइल आणि सिबिल स्कोअरनुसार तुम्हाला कोणती कर्जे मिळू शकतात ते शोधा.'
              : 'Find out which loans you can get based on your profile.'}
          </p>
        </div>

        {/* 5 Loan Type Cards */}
        <div className="space-y-2.5">
          {loanTypes.map((loan) => (
            <button
              key={loan.id}
              onClick={() => setSelectedLoan(loan)}
              className="w-full bg-white border border-slate-100 hover:border-orange-200 rounded-2xl p-3.5 flex items-center justify-between shadow-2xs active:scale-[0.99] transition-all text-left"
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-12 h-12 rounded-2xl ${loan.bgColor} ${loan.iconColor} flex items-center justify-center shrink-0 shadow-2xs`}
                >
                  {renderIcon(loan.icon)}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-[#0B214D]">
                    {language === 'mr' ? loan.nameMr : loan.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {language === 'mr' ? loan.maxAmountMr : loan.maxAmount}
                  </p>
                </div>
              </div>

              <ChevronRight className="w-5 h-5 text-slate-400" />
            </button>
          ))}
        </div>

        {/* Bottom Banner matching Screenshot 06: Peach Guidance Card */}
        <button
          id="btn-expert-guidance"
          onClick={() => alert('Franchise Advisor Mahesh Jadhav (+91 98220 98220) will call you within 15 minutes for 1-on-1 financial guidance!')}
          className="w-full bg-[#FFF4EC] hover:bg-[#FFEAD8] border border-orange-200/70 rounded-2xl p-3.5 flex items-center justify-between text-left transition-all active:scale-[0.99]"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-100 text-[#FF6500] flex items-center justify-center shrink-0 shadow-2xs">
              <Headphones className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#6D1B00] leading-snug">
                {language === 'mr'
                  ? 'कोणते कर्ज योग्य आहे याची खात्री नाही?'
                  : 'Not sure which loan is right for you?'}
              </p>
              <p className="text-[11px] font-semibold text-[#FF6500]">
                {language === 'mr' ? 'मोफत तज्ज्ञ सल्ला मिळवा' : 'Get free expert guidance'}
              </p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-orange-400" />
        </button>
      </div>

      {/* Selected Loan Eligibility & Instant Pre-Approval Sheet */}
      {selectedLoan && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl ${selectedLoan.bgColor} ${selectedLoan.iconColor} flex items-center justify-center`}
                >
                  {renderIcon(selectedLoan.icon)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    {language === 'mr' ? selectedLoan.nameMr : selectedLoan.name}
                  </h3>
                  <p className="text-[10px] text-emerald-600 font-bold">
                    CIBIL 742 • Pre-Approved
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedLoan(null);
                  setAppliedSuccess(false);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {appliedSuccess ? (
              <div className="py-6 text-center space-y-2">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-sm font-bold text-slate-900">
                  {language === 'mr' ? 'अर्ज यशस्वीरित्या सबमिट केला!' : 'Application Submitted!'}
                </h4>
                <p className="text-xs text-slate-500">
                  {language === 'mr'
                    ? 'बँक प्रतिनिधी पुढील २ तासांत आपल्याशी संपर्क साधतील.'
                    : 'Our banking partner will contact you with customized low-interest offers.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedLoan(null);
                    setAppliedSuccess(false);
                  }}
                  className="mt-4 px-6 py-2 rounded-xl bg-slate-800 text-white font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="py-4 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <div>
                    <span className="text-slate-400 text-[10px]">Maximum Limit</span>
                    <p className="font-extrabold text-slate-800">{selectedLoan.maxAmount}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Interest Rate</span>
                    <p className="font-extrabold text-slate-800">{selectedLoan.interestRate}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Tenure</span>
                    <p className="font-bold text-slate-800">{selectedLoan.tenure}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px]">Approval Chance</span>
                    <p className="font-bold text-emerald-600">High (95%)</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSelectedLoan(null);
                      onNavigate('emi_calculator');
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 hover:bg-slate-50"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Calculate EMI</span>
                  </button>

                  <button
                    onClick={() => setAppliedSuccess(true)}
                    className="flex-1 py-2.5 rounded-xl bg-[#FF6500] hover:bg-[#E55A00] text-white font-bold text-xs shadow-md shadow-orange-500/20"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
