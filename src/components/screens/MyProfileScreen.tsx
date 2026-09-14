import React, { useState } from 'react';
import {
  FileText,
  Heart,
  Bell,
  Headphones,
  Settings,
  Users,
  LogOut,
  Pencil,
  ChevronRight,
  ShieldCheck,
  Award,
  Share2,
  X,
  Upload,
  FileUp,
  Sparkles,
  Briefcase
} from 'lucide-react';
import { Header } from '../common/Header';
import { currentUser } from '../../data/mockData';
import { Language, ScreenId } from '../../types';

interface MyProfileScreenProps {
  onBack: () => void;
  onNavigate: (screen: ScreenId) => void;
  onLogout: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const MyProfileScreen: React.FC<MyProfileScreenProps> = ({
  onBack,
  onNavigate,
  onLogout,
  language,
  onToggleLanguage
}) => {
  const [showReferModal, setShowReferModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  return (
    <div className="flex flex-col w-full h-full bg-white overflow-y-auto select-none pb-6">
      {/* Header */}
      <Header
        title={language === 'mr' ? 'माझे प्रोफाइल' : 'My Profile'}
        showBack={false}
        rightAction="settings"
        onRightAction={() => alert('App Settings: Version 2.4.0 (Build 8192)')}
        language={language}
        onToggleLanguage={onToggleLanguage}
      />

      <div className="px-6 pt-2 pb-6 flex flex-col items-center">
        {/* Profile Avatar with Edit Badge */}
        <div className="relative mt-2">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-600 border-4 border-white shadow-md flex items-center justify-center text-white text-2xl font-black">
            RP
          </div>
          <button
            id="btn-profile-edit"
            onClick={() => alert('Profile photo edit dialog')}
            className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#FF6500] text-white flex items-center justify-center shadow-md border-2 border-white hover:bg-orange-600 transition-colors"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* User Details matching Screen 09 */}
        <h2 className="text-lg font-black text-[#0B214D] mt-3 tracking-tight">
          {currentUser.name}
        </h2>
        <p className="text-xs text-slate-500 font-medium">
          {currentUser.email}
        </p>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {currentUser.phone}
        </p>

        {/* Verified PAN Badge */}
        <div className="mt-2.5 inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200/60">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>KYC Verified: {currentUser.pan}</span>
        </div>

        {/* Action Menu List matching Screen 09 */}
        <div className="w-full mt-6 divide-y divide-slate-100">
          {/* 0. Upload CIBIL / Credit Report (Phase 1) */}
          <button
            id="menu-upload-report"
            onClick={() => onNavigate('upload_report')}
            className="w-full py-3.5 flex items-center justify-between hover:bg-orange-50/50 px-2 rounded-xl transition-colors text-left bg-orange-50/30"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF6B00] flex items-center justify-center">
                <FileUp className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-sm font-black text-slate-900 block">
                  {language === 'mr' ? 'सिबिल अहवाल अपलोड करा' : 'Upload Credit Report'}
                </span>
                <span className="text-[10px] text-[#FF6B00] font-bold">
                  PDF • JSON • HTML
                </span>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-orange-100 text-[#FF6B00] text-[10px] font-black">
                NEW
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>

          {/* 0B. CIBIL Analysis & Dispute Resolution */}
          <button
            id="menu-cibil-analysis"
            onClick={() => onNavigate('report_analysis')}
            className="w-full py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <Sparkles className="w-5 h-5 text-amber-500 stroke-[2]" />
              <span className="text-sm font-bold text-[#0B214D]">
                {language === 'mr' ? 'सिबिल त्रुटी विश्लेषण & तक्रार' : 'CIBIL Analysis & Dispute Engine'}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          {/* 1. My Reports */}
          <button
            id="menu-my-reports"
            onClick={() => onNavigate('credit_score')}
            className="w-full py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <FileText className="w-5 h-5 text-slate-600 stroke-[1.8]" />
              <span className="text-sm font-bold text-[#0B214D]">
                {language === 'mr' ? 'माझे अहवाल' : 'My Reports'}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          {/* 2. Saved Articles */}
          <button
            id="menu-saved-articles"
            onClick={() => onNavigate('learn_grow')}
            className="w-full py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <Heart className="w-5 h-5 text-rose-500 stroke-[1.8] fill-rose-500/20" />
              <span className="text-sm font-bold text-[#0B214D]">
                {language === 'mr' ? 'जतन केलेले लेख' : 'Saved Articles'}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          {/* 3. Notifications with badge (3) */}
          <button
            id="menu-notifications"
            onClick={() => setShowNotificationsModal(true)}
            className="w-full py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <Bell className="w-5 h-5 text-slate-600 stroke-[1.8]" />
              <span className="text-sm font-bold text-[#0B214D]">
                {language === 'mr' ? 'सूचना' : 'Notifications'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black flex items-center justify-center">
                {currentUser.unreadNotifications}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </button>

          {/* 4. Help & Support */}
          <button
            id="menu-help-support"
            onClick={() => setShowSupportModal(true)}
            className="w-full py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <Headphones className="w-5 h-5 text-slate-600 stroke-[1.8]" />
              <span className="text-sm font-bold text-[#0B214D]">
                {language === 'mr' ? 'मदत आणि सहाय्य' : 'Help & Support'}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          {/* 5. Settings */}
          <button
            id="menu-settings"
            onClick={() => alert('Settings: Notification Preferences, Biometric Login (FaceID / Fingerprint), Marathi Language selection enabled.')}
            className="w-full py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <Settings className="w-5 h-5 text-slate-600 stroke-[1.8]" />
              <span className="text-sm font-bold text-[#0B214D]">
                {language === 'mr' ? 'सेटिंग्ज' : 'Settings'}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          {/* 6. Refer & Earn */}
          <button
            id="menu-refer-earn"
            onClick={() => setShowReferModal(true)}
            className="w-full py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition-colors text-left"
          >
            <div className="flex items-center gap-3.5">
              <Users className="w-5 h-5 text-slate-600 stroke-[1.8]" />
              <span className="text-sm font-bold text-[#0B214D]">
                {language === 'mr' ? 'रेफर करा आणि कमवा' : 'Refer & Earn'}
              </span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          {/* 7. Logout */}
          <button
            id="menu-logout"
            onClick={onLogout}
            className="w-full py-3.5 flex items-center justify-between hover:bg-red-50/50 px-2 rounded-xl transition-colors text-left text-red-600"
          >
            <div className="flex items-center gap-3.5">
              <LogOut className="w-5 h-5 stroke-[2]" />
              <span className="text-sm font-bold">
                {language === 'mr' ? 'लॉगआउट करा' : 'Logout'}
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Refer & Earn Modal */}
      {showReferModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h3 className="text-sm font-bold text-slate-900">
                  {language === 'mr' ? 'रेफर करा आणि ₹५०० कमवा' : 'Refer Friends & Earn ₹500'}
                </h3>
              </div>
              <button
                onClick={() => setShowReferModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 text-center space-y-3">
              <p className="text-xs text-slate-600">
                Share your unique code with family & friends. When they analyze their CIBIL score or resolve loan issues, you both get ₹500 rewards.
              </p>
              <div className="p-3 bg-orange-50 border border-dashed border-orange-300 rounded-xl">
                <span className="text-xs text-slate-400 block font-medium">YOUR REFERRAL CODE</span>
                <span className="text-xl font-black text-[#FF6500] tracking-wider">
                  {currentUser.referralCode}
                </span>
              </div>
              <p className="text-[11px] text-emerald-600 font-bold">
                Total Earned So Far: ₹{currentUser.referralEarnings}
              </p>
              <button
                onClick={() => {
                  alert('Referral link copied to clipboard: https://digitalkatta.app/ref/KATTA742');
                  setShowReferModal(false);
                }}
                className="w-full py-3 rounded-xl bg-[#FF6500] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20"
              >
                <Share2 className="w-4 h-4" />
                <span>Share Code</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notifications Modal */}
      {showNotificationsModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'mr' ? 'सर्व सूचना' : 'Notifications (3)'}
              </h3>
              <button
                onClick={() => setShowNotificationsModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-3 space-y-2.5">
              <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-xs">
                <p className="font-bold text-[#0B214D]">Dispute Progress Update</p>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  HDFC Bank is reviewing your 30 DPD dispute. Expected resolution: 03 Oct 2025.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-xs">
                <p className="font-bold text-[#0B214D]">Pre-Approved Home Loan</p>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  Based on 742 CIBIL rating, SBI offers home loans starting at 8.35% p.a.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs">
                <p className="font-bold text-[#0B214D]">Credit Score Refreshed</p>
                <p className="text-slate-600 text-[11px] mt-0.5">
                  TransUnion CIBIL monthly update synchronized on 02 Sep 2025.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900">
                {language === 'mr' ? 'ग्राहक सहाय्य' : 'Digital Katta Support'}
              </h3>
              <button
                onClick={() => setShowSupportModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs">
              <p className="text-slate-600">
                Connect with our certified credit resolution counselors or your nearest Digital Katta franchise:
              </p>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1">
                <p className="font-bold text-slate-800">Toll-Free Helpline: 1800-209-KATTA</p>
                <p className="text-slate-500">Email: support@digitalkatta.in</p>
                <p className="text-slate-500">Timing: Mon-Sat, 9:30 AM to 7:00 PM IST</p>
              </div>
              <button
                onClick={() => {
                  alert('Initiating WhatsApp chat with counselor (+91 98765 43210)');
                  setShowSupportModal(false);
                }}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-xs"
              >
                Chat on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
