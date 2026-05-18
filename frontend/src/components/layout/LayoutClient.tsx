'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';
import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const { lang, dir } = useLanguage();
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  if (pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <div className={`min-h-screen flex flex-col ${dir === 'rtl' ? 'font-arabic' : 'font-sans'}`}>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
