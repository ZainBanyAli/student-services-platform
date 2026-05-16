'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t, dir } = useLanguage();
  const isRtl = dir === 'rtl';

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Brand */}
          <Link href="/" className="flex flex-col leading-tight group">
            <span className="text-base font-bold text-blue-900 group-hover:text-blue-700 transition-colors">
              {t.siteName}
            </span>
            <span className="text-xs text-gray-500">{t.tagline}</span>
          </Link>

          {/* Nav + Switcher */}
          <div className={`flex items-center gap-6 ${isRtl ? 'flex-row-reverse' : ''}`}>
            <nav
              className={`hidden md:flex items-center gap-5 text-sm font-medium text-gray-700 ${isRtl ? 'flex-row-reverse' : ''}`}
            >
              <Link href="/" className="hover:text-blue-700 transition-colors">
                {t.nav.home}
              </Link>
              <Link href="/services" className="hover:text-blue-700 transition-colors">
                {t.nav.services}
              </Link>
              <Link href="/about" className="hover:text-blue-700 transition-colors">
                {t.nav.about}
              </Link>
              <Link href="/contact" className="hover:text-blue-700 transition-colors">
                {t.nav.contact}
              </Link>
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
