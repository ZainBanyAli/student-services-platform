'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      aria-label="Switch language"
      className="px-3 py-1.5 rounded-full border border-gray-300 text-sm font-medium text-gray-700 hover:border-blue-600 hover:text-blue-700 transition-colors"
    >
      {lang === 'ar' ? 'EN' : 'عربي'}
    </button>
  );
}
