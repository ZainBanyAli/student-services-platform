import type { Metadata } from 'next';
import { Cairo, Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import LayoutClient from '@/components/layout/LayoutClient';

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['400', '500', '600', '700'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'مكتب العياصرة للخدمات الطلابية | Al-Ayasrah Academic Services',
  description:
    'دعم أكاديمي متخصص للطلاب في البكالوريوس والماجستير والدكتوراه | Specialized academic support for undergraduate, master\'s, and PhD students.',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} ${inter.variable} h-full`}>
      <body className="min-h-full antialiased bg-white text-gray-900">
        <LanguageProvider>
          <LayoutClient>{children}</LayoutClient>
        </LanguageProvider>
      </body>
    </html>
  );
}
