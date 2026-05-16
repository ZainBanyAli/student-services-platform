'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Lang = 'ar' | 'en';

const translations = {
  ar: {
    siteName: 'مكتب العياصرة للخدمات الطلابية',
    tagline: 'دعم أكاديمي متخصص واحترافي',
    nav: {
      home: 'الرئيسية',
      services: 'خدماتنا',
      about: 'من نحن',
      contact: 'تواصل معنا',
    },
    footer: {
      description:
        'نقدم دعماً أكاديمياً متخصصاً للطلاب في مراحل البكالوريوس والماجستير والدكتوراه.',
      rights: '© 2025 مكتب العياصرة للخدمات الطلابية. جميع الحقوق محفوظة.',
      contact: 'تواصل معنا',
      links: 'روابط سريعة',
    },
    whatsapp: 'تواصل عبر واتساب',
  },
  en: {
    siteName: 'Al-Ayasrah Academic Services',
    tagline: 'Specialized & Professional Academic Support',
    nav: {
      home: 'Home',
      services: 'Services',
      about: 'About Us',
      contact: 'Contact',
    },
    footer: {
      description:
        "Specialized academic support for undergraduate, master's, and PhD students.",
      rights: '© 2025 Al-Ayasrah Academic Services. All rights reserved.',
      contact: 'Contact Us',
      links: 'Quick Links',
    },
    whatsapp: 'Contact on WhatsApp',
  },
};

export type Translations = typeof translations.ar;

interface LanguageContextType {
  lang: Lang;
  dir: 'rtl' | 'ltr';
  t: Translations;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ar');

  const toggleLang = () => setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));

  return (
    <LanguageContext.Provider
      value={{
        lang,
        dir: lang === 'ar' ? 'rtl' : 'ltr',
        t: translations[lang],
        toggleLang,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextType {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
