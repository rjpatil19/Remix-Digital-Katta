import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  CheckCircle2,
  Lock,
  ArrowRight,
  Receipt,
  FileCheck,
  Building,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { ReportQuotaService } from '../../services/reportQuotaService';
import { Language } from '../../types';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentSuccess: () => void;
  language: Language;
  clientName?: string;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onPaymentSuccess,
  language,
  clientName = 'Client'
}) => {
  const [selectedMethod, setSelectedMethod] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [upiId, setUpiId] = useState('user@okaxis');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8912');
  const [txnRef, setTxnRef] = useState('');

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    const generatedTxn = `TXN-PAY-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTxnRef(generatedTxn);

    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
      ReportQuotaService.recordPayment(800);

      setTimeout(() => {
        setPaymentSuccess(false);
        onPaymentSuccess();
      }, 1400);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-[#0B214D] to-slate-900 text-white p-5 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#FF6500] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider">
              Rule 1: Client Quota Limit
            </span>
            <span className="text-[11px] text-slate-300 font-mono">1/1 Free Check Used</span>
          </div>

          <h3 className="text-lg font-black text-white flex items-center gap-2">
            {language === 'mr' ? '२ री तपासणी शुल्क: ₹८००' : '2nd Score Check / Report Generation: ₹800'}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {language === 'mr'
              ? 'ग्राहक खात्यासाठी १ मोफत अहवाल पूर्ण झाला आहे. २ ऱ्या अहवाल निर्मितीसाठी ₹८०० शुल्क लागू आहे.'
              : 'Your complimentary 1st credit check has been utilized. A payment of ₹800 is required for your 2nd report generation.'}
          </p>
        </div>

        {paymentSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">
                {language === 'mr' ? 'पेमेंट यशस्वी झाले! (₹८००)' : 'Payment Verified! (₹800)'}
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Ref: <span className="font-mono font-bold text-slate-800">{txnRef}</span>
              </p>
              <p className="text-xs text-emerald-700 font-semibold mt-2">
                {language === 'mr'
                  ? 'नवीन सिबिल अहवाल आणि स्कोअर तपासणी अनलॉक करण्यात आली आहे...'
                  : 'Unlocking 2nd credit score generation and 7-point audit...'}
              </p>
            </div>
          </div>
        ) : (
          <div className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
            {/* Price Summary Box */}
            <div className="bg-orange-50/70 rounded-2xl p-4 border border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-orange-900 block">
                    CIBIL Bureau Pull & Full Regulatory Audit
                  </span>
                  <span className="text-[11px] text-slate-500">
                    Includes Section 21 Dispute Generator & Bank PNO escalation
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black text-[#FF6500]">₹800</span>
                  <span className="text-[10px] text-slate-400 block font-medium">Inclusive of 18% GST</span>
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-2">
                {language === 'mr' ? 'पेमेंट पद्धत निवडा' : 'Select Payment Method'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('upi')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    selectedMethod === 'upi'
                      ? 'border-[#FF6500] bg-orange-50/50 text-[#FF6500] shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Smartphone className="w-5 h-5" />
                  <span className="text-[11px] font-bold">UPI / QR</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('card')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    selectedMethod === 'card'
                      ? 'border-[#FF6500] bg-orange-50/50 text-[#FF6500] shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="text-[11px] font-bold">Card</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedMethod('netbanking')}
                  className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${
                    selectedMethod === 'netbanking'
                      ? 'border-[#FF6500] bg-orange-50/50 text-[#FF6500] shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                >
                  <Building className="w-5 h-5" />
                  <span className="text-[11px] font-bold">NetBanking</span>
                </button>
              </div>
            </div>

            {/* Method Details */}
            {selectedMethod === 'upi' && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-700">Scan UPI QR (GPay / PhonePe / Paytm)</span>
                  <span className="text-[10px] font-mono text-slate-500">VPA: digitalkatta@icici</span>
                </div>

                <div className="flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200">
                  <div className="w-20 h-20 bg-slate-100 rounded-lg p-1.5 border border-slate-300 flex items-center justify-center shrink-0">
                    <QrCode className="w-16 h-16 text-slate-800" />
                  </div>
                  <div className="text-xs space-y-1">
                    <p className="font-bold text-slate-800">Digital Katta Fintech LLP</p>
                    <p className="text-[11px] text-slate-500 font-mono">Amount: ₹800.00</p>
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Zero Surcharge
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-600 block mb-1">Or enter UPI ID</label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-[#FF6500]"
                  />
                </div>
              </div>
            )}

            {selectedMethod === 'card' && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 text-xs">
                <div>
                  <label className="font-bold text-slate-600 block mb-1">Card Number</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-mono font-semibold"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">Expiry</label>
                    <input
                      type="text"
                      defaultValue="08/28"
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-mono text-center font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-600 block mb-1">CVV</label>
                    <input
                      type="password"
                      defaultValue="•••"
                      maxLength={3}
                      className="w-full px-3 py-2 bg-white rounded-xl border border-slate-200 font-mono text-center font-semibold"
                    />
                  </div>
                </div>
              </div>
            )}

            {selectedMethod === 'netbanking' && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
                <label className="font-bold text-slate-600 block">Select Popular Bank</label>
                <div className="grid grid-cols-2 gap-2">
                  {['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Kotak Bank'].map((b) => (
                    <button
                      key={b}
                      type="button"
                      className="p-2 rounded-xl bg-white border border-slate-200 hover:border-[#FF6500] text-slate-800 font-semibold text-left text-[11px]"
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Security Badge */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 justify-center">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>PCI-DSS Compliant 256-bit Encrypted Payment Gateway</span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                id="btn-pay-800"
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-[#FF6500] hover:bg-[#e05a00] text-white font-black text-sm shadow-lg shadow-orange-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span>Processing ₹800 Payment...</span>
                ) : (
                  <>
                    <span>Pay ₹800 & Generate Report</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2.5 text-xs text-slate-500 hover:text-slate-700 font-bold"
              >
                Cancel & Return
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
