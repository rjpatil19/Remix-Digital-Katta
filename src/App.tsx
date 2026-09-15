import React, { useState } from 'react';
import { SplashScreen } from './components/screens/SplashScreen';
import { LoginSignupScreen } from './components/screens/LoginSignupScreen';
import { HomeDashboardScreen } from './components/screens/HomeDashboardScreen';
import { CreditScoreScreen } from './components/screens/CreditScoreScreen';
import { LoanEligibilityScreen } from './components/screens/LoanEligibilityScreen';
import { GovernmentSchemesScreen } from './components/screens/GovernmentSchemesScreen';
import { LearnAndGrowScreen } from './components/screens/LearnAndGrowScreen';
import { MyProfileScreen } from './components/screens/MyProfileScreen';
import { ReportDownloadSuccessScreen } from './components/screens/ReportDownloadSuccessScreen';
import { ReportAnalysisScreen } from './components/screens/ReportAnalysisScreen';
import { FullCreditAnalysisScreen } from './components/screens/FullCreditAnalysisScreen';
import { ConsultantHubScreen, PartnerHubScreen } from './components/screens/ConsultantHubScreen';
import { EmiCalculatorScreen } from './components/screens/EmiCalculatorScreen';
import { UploadReportScreen } from './components/screens/UploadReportScreen';
import { ExtractedReportScreen } from './components/screens/ExtractedReportScreen';
import { BottomNav } from './components/common/BottomNav';
import { ArchitectureModal } from './components/common/ArchitectureModal';
import { DigitalKattaLogo } from './components/common/DigitalKattaLogo';
import { BankNodalReconciliationModal } from './components/modals/BankNodalReconciliationModal';
import { LanguageSelectorModal } from './components/common/LanguageSelectorModal';
import { CheckCreditScoreFlowModal } from './components/modals/CheckCreditScoreFlowModal';
import { Language, ScreenId, CibilReportData, UserRole, UserProfile } from './types';
import { defaultCibilReport, currentUser } from './data/mockData';
import { sample747ComprehensiveReport } from './data/sample747Report';
import { getClientReport } from './utils/clientReportService';
import { getLanguageDetails } from './i18n';
import { Globe, Layers, Smartphone, Sparkles, Upload, UserCog, Building2, ChevronDown } from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('splash');
  const [language, setLanguage] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('dk_selected_language') as Language;
      if (saved && ['mr', 'en', 'hi', 'gu', 'bn', 'ta', 'te', 'ml', 'or'].includes(saved)) {
        return saved;
      }
    } catch {
      // fallback to default
    }
    return 'mr'; // Default to Marathi per specification
  });
  const [userRole, setUserRole] = useState<UserRole>('client');
  const [loggedInUser, setLoggedInUser] = useState<UserProfile>(currentUser);
  const [showScoreModal, setShowScoreModal] = useState<boolean>(false);
  const [showArchModal, setShowArchModal] = useState<boolean>(false);
  const [showNodalHub, setShowNodalHub] = useState<boolean>(false);
  const [showLangModal, setShowLangModal] = useState<boolean>(false);
  const [history, setHistory] = useState<ScreenId[]>(['splash']);
  const [currentReport, setCurrentReport] = useState<any>(defaultCibilReport);

  const currentLangDetails = getLanguageDetails(language);

  const navigateTo = (screen: ScreenId) => {
    setHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    if (history.length > 1) {
      const nextHistory = [...history];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setHistory(nextHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  const handleSelectLanguage = (newLang: Language) => {
    setLanguage(newLang);
    try {
      localStorage.setItem('dk_selected_language', newLang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setShowLangModal(true);
  };

  const handleReportParsed = (parsed: CibilReportData) => {
    setCurrentReport(parsed);
    navigateTo('extracted_report');
  };

  const isMainTabScreen =
    currentScreen === 'home' ||
    currentScreen === 'credit_score' ||
    currentScreen === 'learn_grow' ||
    currentScreen === 'profile';

  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 select-none font-sans">
      {/* Top Desktop Controls Bar */}
      <header className="w-full max-w-5xl mb-3 hidden sm:flex items-center justify-between text-white px-2">
        <div className="flex items-center gap-3">
          <div className="bg-white rounded-xl p-1 shadow-md border border-slate-700/50 flex items-center justify-center">
            <DigitalKattaLogo size="xs" variant="image" showTagline={false} className="h-8 w-auto" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-tight flex items-center gap-1.5">
              <span>Digital कट्टा (Digital Katta)</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 font-bold border border-orange-500/30">
                Fintech Engine
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              CIBIL Report Analysis, Multi-Bureau Aggregation & Franchise Platform
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Role Switcher */}
          <div className="flex items-center bg-slate-800 rounded-xl p-0.5 border border-slate-700 text-xs">
            <span className="text-[10px] text-slate-400 font-bold px-2 flex items-center gap-1">
              <UserCog className="w-3 h-3 text-orange-400" />
              Role:
            </span>
            {(['client', 'partner', 'admin'] as const).map(role => (
              <button
                key={role}
                onClick={() => setUserRole(role)}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold capitalize transition-colors ${
                  userRole === role
                    ? 'bg-[#FF6B00] text-white shadow-xs'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {role}
              </button>
            ))}
          </div>

          {/* Phase 2: Bank Nodal Reconciliation Hub Trigger */}
          <button
            id="btn-open-phase2-nodal"
            onClick={() => setShowNodalHub(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-900 via-indigo-950 to-blue-900 hover:from-blue-800 hover:to-indigo-900 text-blue-100 text-xs font-bold border border-blue-500/40 transition-all shadow-xs"
          >
            <Building2 className="w-3.5 h-3.5 text-orange-400" />
            <span>Phase 2: Bank Nodal Hub</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
          </button>

          {/* Architecture & API Spec Modal Trigger */}
          <button
            id="btn-open-arch-spec"
            onClick={() => setShowArchModal(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-colors shadow-xs"
          >
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span>Architecture & API Spec</span>
          </button>

          {/* 9-Language Selector Dropdown Trigger */}
          <button
            id="btn-top-lang-selector"
            onClick={() => setShowLangModal(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold border border-slate-700 transition-all shadow-xs group"
            title="Select from 9 Indian Languages"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            <span className="text-white font-extrabold">{currentLangDetails.name}</span>
            <span className="text-[10px] text-slate-400 font-normal">({currentLangDetails.englishName})</span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>
        </div>
      </header>

      {/* Screen Quick Selector for Interactive Testing on Desktop */}
      <div className="w-full max-w-5xl mb-2 hidden lg:flex items-center gap-1 overflow-x-auto pb-1 text-[11px] font-semibold text-slate-400 scrollbar-none">
        <span className="text-slate-500 shrink-0 mr-1 font-bold">Quick Switch:</span>
        {[
          { id: 'splash', label: '1. Splash' },
          { id: 'login', label: '2. Login / Sign-up' },
          { id: 'home', label: '3. Home' },
          { id: 'upload_report', label: '★ Upload CIBIL Report' },
          { id: 'extracted_report', label: '★ Parsed Summary' },
          { id: 'report_analysis', label: '★ 7-Point Analysis' },
          { id: 'partner_hub', label: '★ Partner Kendra' },
          { id: 'credit_score', label: '4. Credit Score' },
          { id: 'loan_eligibility', label: '5. Loans' },
          { id: 'government_schemes', label: '6. Govt Schemes' },
          { id: 'learn_grow', label: '7. Learn' },
          { id: 'profile', label: '8. Profile' },
          { id: 'report_success', label: '9. Download Success' },
          { id: 'emi_calculator', label: '★ EMI Calc' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => navigateTo(item.id as ScreenId)}
            className={`px-2.5 py-1 rounded-lg transition-colors shrink-0 ${
              currentScreen === item.id || (item.id === 'partner_hub' && currentScreen === 'consultant_hub')
                ? 'bg-[#FF6B00] text-white font-bold'
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile Device Frame Container */}
      <main className="w-full sm:max-w-[390px] h-[100dvh] sm:h-[844px] bg-white sm:rounded-[44px] shadow-2xl overflow-hidden flex flex-col relative border-0 sm:border-[8px] sm:border-slate-800 ring-1 ring-white/10">
        {/* Dynamic Screen Renderer */}
        <div className="flex-1 w-full h-full overflow-hidden flex flex-col relative">
          {currentScreen === 'splash' && (
            <SplashScreen onContinue={() => navigateTo('login')} />
          )}

          {currentScreen === 'login' && (
            <LoginSignupScreen
              onLoginSuccess={() => navigateTo('home')}
              language={language}
            />
          )}

          {currentScreen === 'home' && (
            <HomeDashboardScreen
              onNavigate={navigateTo}
              language={language}
              onOpenNotifications={() => navigateTo('profile')}
              onStartCreditScoreFlow={() => setShowScoreModal(true)}
              loggedInUserName={loggedInUser.name}
            />
          )}

          {currentScreen === 'upload_report' && (
            <UploadReportScreen
              language={language}
              onBack={handleBack}
              onReportParsed={handleReportParsed}
              userRole={userRole}
              onSwitchToAdmin={() => setUserRole('admin')}
            />
          )}

          {currentScreen === 'extracted_report' && (
            <ExtractedReportScreen
              report={currentReport}
              language={language}
              onBack={handleBack}
              onProceedToAnalysis={() => navigateTo('report_analysis')}
              onUpdateReport={(updated) => setCurrentReport(updated)}
            />
          )}

          {currentScreen === 'credit_score' && (
            <CreditScoreScreen
              onBack={handleBack}
              onNavigate={navigateTo}
              language={language}
              onToggleLanguage={toggleLanguage}
              userRole={userRole}
              onSwitchToAdmin={() => setUserRole('admin')}
            />
          )}

          {currentScreen === 'loan_eligibility' && (
            <LoanEligibilityScreen
              onBack={handleBack}
              onNavigate={navigateTo}
              language={language}
              onToggleLanguage={toggleLanguage}
            />
          )}

          {currentScreen === 'government_schemes' && (
            <GovernmentSchemesScreen
              onBack={handleBack}
              language={language}
              onToggleLanguage={toggleLanguage}
            />
          )}

          {currentScreen === 'learn_grow' && (
            <LearnAndGrowScreen
              onBack={handleBack}
              language={language}
              onToggleLanguage={toggleLanguage}
            />
          )}

          {currentScreen === 'profile' && (
            <MyProfileScreen
              onBack={handleBack}
              onNavigate={navigateTo}
              onLogout={() => navigateTo('login')}
              language={language}
              onToggleLanguage={toggleLanguage}
            />
          )}

          {currentScreen === 'report_success' && (
            <ReportDownloadSuccessScreen
              onViewReport={() => navigateTo('report_analysis')}
              onNavigate={navigateTo}
              language={language}
            />
          )}

          {currentScreen === 'report_analysis' && (
            <FullCreditAnalysisScreen
              key={currentReport?.reportId || currentReport?.controlNumber || currentReport?.fullName || 'report-view'}
              onBack={handleBack}
              language={language}
              onToggleLanguage={toggleLanguage}
              onNavigate={navigateTo}
              reportData={currentReport}
              userRole={userRole}
            />
          )}

          {(currentScreen === 'partner_hub' || currentScreen === 'consultant_hub') && (
            <PartnerHubScreen
              onBack={handleBack}
              language={language}
              onToggleLanguage={toggleLanguage}
              onNavigate={navigateTo}
              userRole={userRole}
              onSwitchRole={(newRole) => setUserRole(newRole)}
              onSelectClientReport={(client) => {
                const clientReport = getClientReport(client);
                setCurrentReport(clientReport);
                navigateTo('report_analysis');
              }}
            />
          )}

          {currentScreen === 'emi_calculator' && (
            <EmiCalculatorScreen
              onBack={handleBack}
              language={language}
              onToggleLanguage={toggleLanguage}
            />
          )}
        </div>

        {/* 4-Tab Bottom Navigation matching Screen 04 */}
        {isMainTabScreen && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={navigateTo}
            language={language}
          />
        )}
      </main>

      {/* Dynamic Instant Credit Score Check Flow Modal */}
      <CheckCreditScoreFlowModal
        isOpen={showScoreModal}
        onClose={() => setShowScoreModal(false)}
        language={language}
        loggedInUser={loggedInUser}
        onAnalysisComplete={(freshReport) => {
          setCurrentReport(freshReport);
          setShowScoreModal(false);
          navigateTo('report_analysis');
        }}
      />

      {/* Architecture & Engineering Spec Modal */}
      <ArchitectureModal
        isOpen={showArchModal}
        onClose={() => setShowArchModal(false)}
      />

      {/* Phase 2: Bank Nodal Reconciliation Modal */}
      <BankNodalReconciliationModal
        isOpen={showNodalHub}
        onClose={() => setShowNodalHub(false)}
        language={language}
      />

      {/* 9-Language Selector Modal / Bottom Sheet */}
      <LanguageSelectorModal
        isOpen={showLangModal}
        onClose={() => setShowLangModal(false)}
        currentLanguage={language}
        onSelectLanguage={handleSelectLanguage}
      />
    </div>
  );
}
