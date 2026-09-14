import { Language } from '../types';
import { translations, TranslationDictionary } from './translations';
import { SUPPORTED_LANGUAGES, getLanguageDetails } from './languages';

export { SUPPORTED_LANGUAGES, getLanguageDetails };
export type { TranslationDictionary };

/**
 * Direct translator function with fallback to Marathi / English
 */
export function t(key: keyof TranslationDictionary, lang: Language): string {
  const dict = translations[lang] || translations.mr || translations.en;
  const value = dict[key];
  if (value !== undefined) {
    return value;
  }
  // Fallback to English if missing
  return translations.en[key] || String(key);
}

/**
 * Returns localized text for a bureau score category
 */
export function getScoreCategoryText(category: string, lang: Language): string {
  const cat = category.toLowerCase();
  if (lang === 'mr') {
    if (cat.includes('excellent')) return 'उत्कृष्ट (७५०+)';
    if (cat.includes('good')) return 'चांगले (७००-७४९)';
    if (cat.includes('fair')) return 'सरासरी (६५०-६९९)';
    return 'सुधारणा आवश्यक (<६५०)';
  }
  if (lang === 'hi') {
    if (cat.includes('excellent')) return 'उत्कृष्ट (७५०+)';
    if (cat.includes('good')) return 'अच्छा (७००-७४९)';
    if (cat.includes('fair')) return 'मध्यम (६५०-६९९)';
    return 'सुधार आवश्यक (<६५०)';
  }
  if (lang === 'gu') {
    if (cat.includes('excellent')) return 'ઉત્કૃષ્ટ (૭૫૦+)';
    if (cat.includes('good')) return 'સારું (૭૦૦-૭૪૯)';
    if (cat.includes('fair')) return 'સામાન્ય (૬૫૦-૬૯૯)';
    return 'સુધારો જરૂરી (<૬૫૦)';
  }
  if (lang === 'bn') {
    if (cat.includes('excellent')) return 'চমৎকার (৭৫০+)';
    if (cat.includes('good')) return 'ভালো (৭০০-৭৪৯)';
    if (cat.includes('fair')) return 'মধ্যম (৬৫০-৬৯৯)';
    return 'উন্নতি প্রয়োজন (<৬৫০)';
  }
  if (lang === 'ta') {
    if (cat.includes('excellent')) return 'மிகச் சிறந்தது (750+)';
    if (cat.includes('good')) return 'நல்லது (700-749)';
    if (cat.includes('fair')) return 'சராசரி (650-699)';
    return 'மேம்பாடு தேவை (<650)';
  }
  if (lang === 'te') {
    if (cat.includes('excellent')) return 'అత్యుత్తమం (750+)';
    if (cat.includes('good')) return 'మంచిది (700-749)';
    if (cat.includes('fair')) return 'సగటు (650-699)';
    return 'మెరుగుదల అవసరం (<650)';
  }
  if (lang === 'ml') {
    if (cat.includes('excellent')) return 'മികച്ച നില (750+)';
    if (cat.includes('good')) return 'നല്ല നില (700-749)';
    if (cat.includes('fair')) return 'സാധാരണ (650-699)';
    return 'മെച്ചപ്പെടുത്തൽ ആവശ്യം (<650)';
  }
  if (lang === 'or') {
    if (cat.includes('excellent')) return 'ଉତ୍କୃଷ୍ଟ (୭୫୦+)';
    if (cat.includes('good')) return 'ଭଲ (୭୦୦-୭୪୯)';
    if (cat.includes('fair')) return 'ମଧ୍ୟମ (୬୫୦-୬୯୯)';
    return 'ଉନ୍ନତି ଆବଶ୍ୟକ (<୬୫୦)';
  }
  return category;
}

/**
 * Returns localized severity badge label
 */
export function getSeverityText(severity: string, lang: Language): string {
  const sev = severity.toUpperCase();
  const dict = translations[lang] || translations.en;
  if (sev.includes('CRITICAL')) return dict.severityCritical;
  if (sev.includes('HIGH')) return dict.severityHigh;
  if (sev.includes('MEDIUM')) return dict.severityMedium;
  return dict.severityLow;
}

/**
 * Returns localized loan decision
 */
export function getLoanDecisionText(decision: string, lang: Language): string {
  const d = decision.toLowerCase();
  const dict = translations[lang] || translations.en;
  if (d.includes('highly') || d.includes('approved')) return dict.decisionApproved;
  if (d.includes('conditional')) return dict.decisionConditional;
  return dict.decisionNotRecommended;
}

/**
 * Generates official multi-language RBI CICRA Section 21 dispute notice text
 */
export function getLocalizedDisputeLetter(
  clientName: string,
  pan: string,
  bankName: string,
  accountNumber: string,
  issueType: string,
  lang: Language
): string {
  const dateStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });

  if (lang === 'mr') {
    return `प्रति,
नोडल अधिकारी / तक्रार निवारण विभाग,
${bankName}
विषय: क्रेडिट इन्फॉर्मेशन कंपनीज रेग्युलेशन ॲक्ट (CICRA 2005) कलम २१ अन्वये सिबिल नोंदीमधील विसंगती दुरुस्तीबाबत.

महोदय/महोदया,
मी ${clientName} (पॅन: ${pan}) याद्वारे नमूद करतो की माझ्या सिबिल अहवालात खालील खात्यासंदर्भात तांत्रिक विसंगती आढळली आहे:
• खाते क्रमांक: ${accountNumber}
• बँक/संस्था: ${bankName}
• विसंगती प्रकार: ${issueType}

वस्तुस्थिती अशी आहे की मी सदर खात्याचे सर्व देय वेळेत अदा केले असूनही ब्यूरो अहवालात चुकीची नोंद दाखवण्यात येत आहे. 
आरबीआयच्या 'मास्टर डायरेक्टिव्ह ऑन क्रेडिट इन्फॉर्मेशन कंपनीज' व कलम २१(३) नुसार, तक्रार प्राप्त झाल्यापासून ३० दिवसांच्या आत ही माहिती बरोबर करून ब्यूरोकडे अद्ययावत करणे कायदेशीररीत्या बंधनकारक आहे.

कृपया या अर्जाची नोंद घेऊन त्वरित दुरुस्ती (Rectification) करावी व मला सुधारित ना-हरकत प्रमाणपत्र (NOC/NDC) पाठवावे.

आपला नम्र,
${clientName}
दिनांक: ${dateStr}
प्रत: TransUnion CIBIL / Experian India`;
  }

  if (lang === 'hi') {
    return `सेवा में,
नोडल अधिकारी / शिकायत निवारण कक्ष,
${bankName}
विषय: क्रेडिट इंफॉर्मेशन कंपनीज रेगुलेशन एक्ट (CICRA 2005) की धारा 21 के तहत सिबिल रिकॉर्ड संशोधन हेतु।

महोदय/महोदया,
मैं ${clientName} (पैन: ${pan}) सूचित करना चाहता हूँ कि मेरी सिबिल रिपोर्ट में निम्नलिखित खाते में तकनीकी विसंगति पाई गई है:
• खाता संख्या: ${accountNumber}
• बैंक/वित्तीय संस्थान: ${bankName}
• विसंगति का प्रकार: ${issueType}

वास्तविक तथ्य यह है कि मैंने उक्त ऋण का पूर्ण व समयबद्ध भुगतान कर दिया है, फिर भी ब्यूरो रिपोर्ट में त्रुटिपूर्ण जानकारी प्रदर्शित हो रही है।
आरबीआई (RBI) के सर्कुलर व CICRA 2005 की धारा 21(3) के अनुसार ३० दिनों के भीतर इस त्रुटि का निवारण अनिवार्य है।

कृपया त्वरित संज्ञान लेकर ब्यूरो रिकॉर्ड को अद्यतन करें एवं मुझे पुष्टि पत्र प्रेषित करें।

भवदीय,
${clientName}
दिनांक: ${dateStr}
प्रतिलिपि: TransUnion CIBIL / Experian India`;
  }

  if (lang === 'gu') {
    return `પ્રતિ,
નોડલ ઓફિસર / ફરિયાદ નિવારણ વિભાગ,
${bankName}
વિષય: CICRA 2005 ની કલમ 21 હેઠળ સિબિલ રેકોર્ડ સુધારણા બાબત.

મહોદય,
હું ${clientName} (પાન: ${pan}) જણાવું છું કે મારા સિબિલ રિપોર્ટમાં નીચે મુજબના ખાતામાં ટેકનિકલ વિસંગતતા જોવા મળી છે:
• ખાતા નંબર: ${accountNumber}
• બેંક: ${bankName}
• વિસંગતતા: ${issueType}

મેં તમામ નિયમિત હપ્તા ભરી દીધા હોવા છતાં ખોટી નોંધ દર્શાવવામાં આવી રહી છે. આરબીઆઈના નિયમ મુજબ ૩૦ દિવસમાં આ માહિતી સુધારવી ફરજિયાત છે.
કૃપા કરીને રેકોર્ડ સુધારીને સુધારેલ પ્રમાણપત્ર આપવા વિનંતી.

આપનો વિશ્વાસુ,
${clientName}
તારીખ: ${dateStr}`;
  }

  // Default English version compliant with RBI Section 21
  return `To,
The Principal Nodal Officer / Grievance Redressal Officer,
${bankName}

Subject: Formal Dispute & Rectification Notice under Section 21(3) of the Credit Information Companies (Regulation) Act, 2005 (CICRA 2005).

Dear Sir / Madam,
I, ${clientName} (PAN: ${pan}), am writing to bring to your formal notice a material factual inaccuracy reported in my Credit Information Report (CIR):

• Account Number: ${accountNumber}
• Reporting Institution: ${bankName}
• Nature of Discrepancy: ${issueType}

Factual Background:
The aforesaid facility has been serviced in strict compliance with agreed terms. However, your institution has transmitted an erroneous DPD / status tag to Credit Bureaus (TransUnion CIBIL / Experian), severely causing adverse impact on my creditworthiness.

Statutory Mandate:
Under Section 21(3) of CICRA 2005 and RBI Master Direction on Credit Information Companies, a credit institution is statutorily mandated to verify and resolve disputed data within 30 days of notice, failing which regulatory escalation to the RBI Banking Ombudsman shall be initiated.

I request an immediate audit, electronic rectification to all four credit bureaus, and issuance of an updated No Due Certificate (NDC).

Yours sincerely,
${clientName}
Date: ${dateStr}
Copy to: Credit Information Bureau (India) Ltd. (TransUnion CIBIL)`;
}
