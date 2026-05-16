'use client';

import { useLanguage } from '@/context/LanguageContext';

const WHATSAPP_NUMBER = '962797930338';
const EMAIL = 'uni.services@hotmail.com';

export default function Footer() {
  const { t, dir } = useLanguage();
  const isRtl = dir === 'rtl';

  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${isRtl ? 'text-right' : 'text-left'}`}
        >
          {/* Brand */}
          <div>
            <h3 className="text-base font-bold mb-2">{t.siteName}</h3>
            <p className="text-blue-200 text-sm leading-relaxed">{t.footer.description}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-300 mb-3">
              {t.footer.contact}
            </h3>
            <ul className="space-y-2 text-sm text-blue-200">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: +{WHATSAPP_NUMBER}
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="hover:text-white transition-colors">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-blue-300 mb-3">
              {t.footer.links}
            </h3>
            <ul className="space-y-1 text-sm text-blue-200">
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  {t.nav.services}
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-white transition-colors">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  {t.nav.contact}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className={`mt-8 pt-6 border-t border-blue-800 text-xs text-blue-400 ${isRtl ? 'text-right' : 'text-center'}`}
        >
          {t.footer.rights}
        </div>
      </div>
    </footer>
  );
}
