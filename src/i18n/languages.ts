import { Language, LanguageOption } from '../types';

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  {
    code: 'mr',
    name: 'मराठी',
    englishName: 'Marathi',
    region: 'महाराष्ट्र (Maharashtra)',
    flagOrSymbol: '🚩',
    samplePhrase: 'ठिकाण एक, सुविधा अनेक..!'
  },
  {
    code: 'en',
    name: 'English',
    englishName: 'English',
    region: 'National / Global',
    flagOrSymbol: '🌐',
    samplePhrase: 'One destination, multiple services!'
  },
  {
    code: 'hi',
    name: 'हिन्दी',
    englishName: 'Hindi',
    region: 'उत्तर व मध्य भारत (Pan India)',
    flagOrSymbol: '🇮🇳',
    samplePhrase: 'एक स्थान, अनेक सुविधाएं..!'
  },
  {
    code: 'gu',
    name: 'ગુજરાતી',
    englishName: 'Gujarati',
    region: 'ગુજરાત (Gujarat)',
    flagOrSymbol: '🦁',
    samplePhrase: 'એક સ્થળ, અનેક સુવિધાઓ..!'
  },
  {
    code: 'bn',
    name: 'বাংলা',
    englishName: 'Bengali',
    region: 'পশ্চিমবঙ্গ ও ত্রিপুরা (West Bengal)',
    flagOrSymbol: '🐯',
    samplePhrase: 'একটি স্থান, একাধিক পরিষেবা..!'
  },
  {
    code: 'ta',
    name: 'தமிழ்',
    englishName: 'Tamil',
    region: 'தமிழ்நாடு (Tamil Nadu)',
    flagOrSymbol: '🏛️',
    samplePhrase: 'ஒரே இடம், பல வசதிகள்..!'
  },
  {
    code: 'te',
    name: 'తెలుగు',
    englishName: 'Telugu',
    region: 'ఆంధ్రప్రదేశ్ & తెలంగాణ (AP & Telangana)',
    flagOrSymbol: '🌾',
    samplePhrase: 'ఒకే చోట, అనేక సేవలు..!'
  },
  {
    code: 'ml',
    name: 'മലയാളം',
    englishName: 'Malayalam',
    region: 'കേരളം (Kerala)',
    flagOrSymbol: '🌴',
    samplePhrase: 'ഒരു കേന്ദ്രം, നിരവധി സേവനങ്ങൾ..!'
  },
  {
    code: 'or',
    name: 'ଓଡ଼ିଆ',
    englishName: 'Odia',
    region: 'ଓଡ଼ିଶା (Odisha)',
    flagOrSymbol: '🛕',
    samplePhrase: 'ଗୋଟିଏ ସ୍ଥାନ, ଅନେକ ସୁବିଧା..!'
  }
];

export const getLanguageDetails = (lang: Language): LanguageOption => {
  return (
    SUPPORTED_LANGUAGES.find((l) => l.code === lang) || SUPPORTED_LANGUAGES[0]
  );
};
