'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { lang, dir } = useLanguage();

  // Sync lang/dir to <html> element for proper RTL/LTR rendering
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  return (
    <div className={`min-h-screen flex flex-col ${dir === 'rtl' ? 'font-arabic' : 'font-sans'}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
