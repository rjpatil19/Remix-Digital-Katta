import React, { useState, useEffect } from 'react';
import { Mail, Lock, Eye, EyeOff, Signal, Wifi, Battery, User, Phone, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { DigitalKattaLogo } from '../common/DigitalKattaLogo';
import { TricolorWave } from '../common/TricolorWave';
import { Language } from '../../types';
import { Phase2Service, SendOtpResult } from '../../services/phase2Service';

interface LoginSignupScreenProps {
  onLoginSuccess: () => void;
  language: Language;
}

export const LoginSignupScreen: React.FC<LoginSignupScreenProps> = ({
  onLoginSuccess,
  language
}) => {
  const [authMethod, setAuthMethod] = useState<'otp' | 'password'>('otp');
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('');
  const [panCard, setPanCard] = useState('ABCDE1234F');

  // Phase 2 DLT SMS OTP State
  const [phone, setPhone] = useState('9822014810');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpInfo, setOtpInfo] = useState<SendOtpResult | null>(null);
  const [countdown, setCountdown] = useState(300);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let interval: any;
    if (otpSent && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((c) => c - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, countdown]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      const res = await Phase2Service.sendOtp(phone);
      setOtpInfo(res);
      setOtpSent(true);
      setCountdown(300);
      setOtp(res.demoOtp || ''); // pre-fill demo OTP for slick user testing
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send OTP. Please check the mobile number.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);
    try {
      await Phase2Service.verifyOtp(phone, otp, otpInfo?.txnId);
      onLoginSuccess();
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid OTP code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitPassword = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess();
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative flex flex-col justify-between w-full h-full min-h-[640px] bg-white select-none overflow-y-auto">
      {/* Top Phone Status Bar */}
      <div className="flex items-center justify-between px-6 pt-3 text-slate-800 text-xs font-semibold">
        <span>9:41</span>
        <div className="flex items-center gap-1.5 text-slate-700">
          <Signal className="w-3.5 h-3.5" />
          <Wifi className="w-3.5 h-3.5" />
          <Battery className="w-4 h-4 fill-current" />
        </div>
      </div>

      {/* Main Content Form */}
      <div className="flex-1 px-6 pt-2 pb-6 flex flex-col items-center">
        {/* Brand Logo & Tagline */}
        <div className="mb-3">
          <DigitalKattaLogo size="md" showTagline={true} />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-4">
          <h2 className="text-2xl font-black text-[#0B214D] tracking-tight">
            {isSignUp
              ? (language === 'mr' ? 'नवीन खाते तयार करा' : 'Create Account')
              : (language === 'mr' ? 'पुन्हा स्वागत आहे' : 'Welcome Back')}
          </h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {isSignUp
              ? (language === 'mr' ? 'नोंदणी करा व सिबिल स्कोअरचे अचूक विश्लेषण मिळवा' : 'Sign up to analyze your CIBIL report free')
              : (language === 'mr' ? 'सुरक्षित प्रमाणीकरणाने खात्यात प्रवेश करा' : 'Login securely to your credit advisory portal')}
          </p>
        </div>

        {/* Auth Method Tabs (Phase 2 DLT OTP vs Password) */}
        <div className="w-full max-w-[340px] bg-slate-100 p-1 rounded-xl flex items-center mb-4 border border-slate-200 text-xs font-bold">
          <button
            type="button"
            onClick={() => { setAuthMethod('otp'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMethod === 'otp'
                ? 'bg-white text-[#0B214D] shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-orange-500" />
            <span>{language === 'mr' ? 'मोबाईल OTP (DLT)' : 'Mobile OTP (Phase 2)'}</span>
          </button>
          <button
            type="button"
            onClick={() => { setAuthMethod('password'); setErrorMsg(''); }}
            className={`flex-1 py-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              authMethod === 'password'
                ? 'bg-white text-[#0B214D] shadow-xs font-extrabold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Lock className="w-3.5 h-3.5 text-blue-600" />
            <span>{language === 'mr' ? 'पासवर्ड' : 'Password'}</span>
          </button>
        </div>

        {errorMsg && (
          <div className="w-full max-w-[340px] mb-3 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* METHOD 1: DLT SMS OTP (PHASE 2) */}
        {authMethod === 'otp' && (
          <div className="w-full max-w-[340px] space-y-3">
            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700">
                      {language === 'mr' ? 'भारतीय मोबाईल नंबर' : 'Indian Mobile Number'}
                    </label>
                    <span className="text-[9px] font-black text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                      DLT Header: VK-DIGKAT
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-xs font-bold text-slate-500 border-r border-slate-200 pr-2">
                      +91
                    </span>
                    <input
                      id="input-login-phone"
                      type="tel"
                      required
                      maxLength={10}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      placeholder="98220 14810"
                      className="w-full pl-16 pr-4 py-3 rounded-xl border border-slate-200 text-sm font-mono text-slate-800 focus:outline-hidden focus:border-[#FF6500] focus:ring-2 focus:ring-orange-500/10 transition-all font-bold"
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-[10px] text-slate-600 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p>
                    {language === 'mr'
                      ? 'TRAI DLT नोंदणीकृत एसएमएस गेटवेद्वारे ६-अंकी वन टाईम पासवर्ड (OTP) पाठवला जाईल.'
                      : 'High-priority SMS OTP dispatched via TRAI DLT-approved telecom gateway.'}
                  </p>
                </div>

                <button
                  id="btn-send-otp"
                  type="submit"
                  disabled={isLoading || phone.length !== 10}
                  className="w-full py-3.5 rounded-xl bg-[#FF6500] hover:bg-[#E55A00] disabled:opacity-50 text-white font-bold text-sm tracking-wide shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <span>{isLoading ? 'Connecting Gateway...' : language === 'mr' ? 'ओटीपी मिळवा' : 'Send Verification OTP'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3">
                <div className="bg-orange-50/70 p-3 rounded-xl border border-orange-200 text-xs">
                  <div className="flex items-center justify-between text-[11px] font-bold text-orange-950">
                    <span>DLT SMS Sent to +91 {phone.slice(-10)}</span>
                    <button
                      type="button"
                      onClick={() => setOtpSent(false)}
                      className="text-[#FF6500] hover:underline"
                    >
                      Change
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-600 font-mono mt-1">
                    Template: {otpInfo?.dltTemplateId || 'DLT-110023458'} • Ref: {otpInfo?.txnId?.slice(-10)}
                  </p>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] font-bold text-slate-700">
                      {language === 'mr' ? '६-अंकी ओटीपी प्रविष्ट करा' : 'Enter 6-Digit SMS OTP'}
                    </label>
                    <span className="text-[10px] font-mono text-slate-500 font-bold">
                      Expires: {formatTime(countdown)}
                    </span>
                  </div>
                  <input
                    id="input-otp-code"
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                    placeholder="742091"
                    className="w-full text-center tracking-[0.4em] py-3 rounded-xl border border-slate-200 text-lg font-black text-slate-900 focus:outline-hidden focus:border-[#FF6500] focus:ring-2 focus:ring-orange-500/10 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Didn't receive SMS?</span>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    disabled={countdown > 240}
                    className="font-bold text-[#FF6500] hover:underline disabled:text-slate-400"
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  id="btn-verify-otp"
                  type="submit"
                  disabled={isLoading || otp.length < 6}
                  className="w-full py-3.5 rounded-xl bg-[#0B214D] hover:bg-slate-900 disabled:opacity-50 text-white font-bold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>{isLoading ? 'Verifying...' : language === 'mr' ? 'ओटीपी पडताळा व पुढे जा' : 'Verify & Access Kendra'}</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* METHOD 2: STANDARD PASSWORD FORM */}
        {authMethod === 'password' && (
          <form onSubmit={handleSubmitPassword} className="w-full max-w-[340px] space-y-3">
            {isSignUp && (
              <>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {language === 'mr' ? 'पूर्ण नाव' : 'Full Name'}
                  </label>
                  <div className="relative flex items-center">
                    <User className="absolute left-3.5 w-4 h-4 text-slate-400" />
                    <input
                      id="input-signup-name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-hidden focus:border-[#FF6500] focus:ring-2 focus:ring-orange-500/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    {language === 'mr' ? 'पॅन कार्ड नंबर' : 'PAN Card Number'}
                  </label>
                  <input
                    id="input-signup-pan"
                    type="text"
                    required
                    maxLength={10}
                    value={panCard}
                    onChange={(e) => setPanCard(e.target.value.toUpperCase())}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-mono uppercase text-slate-800 focus:outline-hidden focus:border-[#FF6500] focus:ring-2 focus:ring-orange-500/10 transition-all"
                  />
                </div>
              </>
            )}

            {/* Identifier Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                {language === 'mr' ? 'ई-मेल' : 'E-mail'}
              </label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 w-4 h-4 text-slate-400" />
                <input
                  id="input-login-identifier"
                  type="email"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder={language === 'mr' ? 'ई-मेल प्रविष्ट करा' : 'Enter your E-mail'}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#FF6500] focus:ring-2 focus:ring-orange-500/10 transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 w-4 h-4 text-slate-400" />
                <input
                  id="input-login-password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={language === 'mr' ? 'पासवर्ड' : 'Password'}
                  className="w-full pl-10 pr-11 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:border-[#FF6500] focus:ring-2 focus:ring-orange-500/10 transition-all"
                />
                <button
                  type="button"
                  id="btn-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              id="btn-submit-login"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#FF6500] hover:bg-[#E55A00] active:scale-[0.98] text-white font-bold text-sm tracking-wide shadow-md shadow-orange-500/20 transition-all mt-2"
            >
              {isSignUp
                ? (language === 'mr' ? 'खाते तयार करा' : 'Sign Up')
                : (language === 'mr' ? 'लॉगिन करा' : 'Login')}
            </button>
          </form>
        )}

        {/* Divider "or" */}
        <div className="w-full max-w-[340px] flex items-center my-3.5">
          <div className="flex-1 h-px bg-slate-200" />
          <span className="px-3 text-xs text-slate-400 font-medium lowercase">or</span>
          <div className="flex-1 h-px bg-slate-200" />
        </div>

        {/* Google Continue Button */}
        <button
          id="btn-google-auth"
          type="button"
          onClick={onLoginSuccess}
          className="w-full max-w-[340px] py-3 rounded-xl border border-slate-200 hover:bg-slate-50 active:scale-[0.98] flex items-center justify-center gap-2.5 text-xs font-bold text-slate-700 shadow-2xs transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          <span>{language === 'mr' ? 'गुगलने पुढे जा' : 'Continue with Google'}</span>
        </button>

        {/* Toggle between Sign Up and Login */}
        <p className="mt-4 text-xs text-slate-600 font-medium text-center">
          {isSignUp
            ? (language === 'mr' ? 'आधीच खाते आहे का? ' : 'Already have an account? ')
            : (language === 'mr' ? 'खाते नाही का? ' : "Don't have an account? ")}
          <button
            id="btn-toggle-auth-mode"
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="font-bold text-[#FF6500] hover:underline"
          >
            {isSignUp
              ? (language === 'mr' ? 'लॉगिन करा' : 'Login')
              : (language === 'mr' ? 'साइन अप करा' : 'Sign Up')}
          </button>
        </p>
      </div>

      {/* Bottom Tricolor Wave */}
      <div className="w-full">
        <TricolorWave showLandmarks={false} showMadeInIndiaTag={false} />
      </div>
    </div>
  );
};

