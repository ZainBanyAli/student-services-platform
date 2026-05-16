'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const content = {
  ar: {
    code: '٤٠٤',
    title: 'الصفحة غير موجودة',
    body: 'عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها.',
    home: 'العودة إلى الرئيسية',
    services: 'استعرض الخدمات',
  },
  en: {
    code: '404',
    title: 'Page Not Found',
    body: "Sorry, we couldn't find the page you were looking for.",
    home: 'Back to Home',
    services: 'Browse Services',
  },
};

export default function NotFound() {
  const { lang, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const c = content[lang];

  return (
    <div className={`min-h-[60vh] flex items-center justify-center bg-gray-50 px-4 py-24 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      <div className="text-center max-w-md">
        <p className="text-9xl font-bold text-blue-100 mb-4 leading-none">{c.code}</p>
        <h1 className={`text-2xl font-bold text-blue-950 mb-4 ${isRtl ? 'leading-relaxed' : ''}`}>{c.title}</h1>
        <p className={`text-gray-500 mb-10 ${isRtl ? 'text-base leading-7' : 'text-sm leading-relaxed'}`}>{c.body}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-7 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors text-sm"
          >
            {c.home}
          </Link>
          <Link
            href="/services"
            className="w-full sm:w-auto px-7 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
          >
            {c.services}
          </Link>
        </div>
      </div>
    </div>
  );
}
