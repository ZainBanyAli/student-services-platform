'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const WHATSAPP_URL = 'https://wa.me/962797930338';
const WHATSAPP_NUMBER = '+962 79 793 0338';
const EMAIL = 'uni.services@hotmail.com';

// ─── Bilingual content ────────────────────────────────────────────────────────

const content = {
  ar: {
    pageTitle: 'تواصل معنا',
    pageSub: 'نحن هنا للإجابة على استفساراتك وتقديم الدعم الأكاديمي الذي تحتاجه',

    intro: {
      heading: 'يسعدنا التواصل معك',
      body: 'سواء كنت تودّ الاستفسار عن خدماتنا أو تحتاج إلى مساعدة في اختيار الخدمة المناسبة أو لديك أي سؤال أكاديمي — فريقنا مستعد للإجابة والمساعدة عبر واتساب أو البريد الإلكتروني في أقرب وقت.',
    },

    cards: {
      whatsapp: {
        title: 'واتساب',
        desc: 'أسرع وسيلة للتواصل معنا. يجيب فريقنا على رسائلكم خلال ساعات العمل.',
        action: 'ابدأ المحادثة',
      },
      email: {
        title: 'البريد الإلكتروني',
        desc: 'راسلنا بتفاصيل طلبك وسنردّ عليك بأقرب وقت ممكن.',
        action: 'راسلنا الآن',
      },
      form: {
        title: 'نموذج الطلب',
        desc: 'أرسل طلبك عبر النموذج المنظّم للحصول على خدمة أسرع وأكثر دقة.',
        action: 'اطلب خدمة',
      },
    },

    before: {
      heading: 'قبل التواصل معنا',
      sub: 'لمساعدتك بشكل أفضل وأسرع، نقترح أن تُعدّ المعلومات التالية',
      items: [
        {
          title: 'حدّد نوع الخدمة',
          desc: 'تصفّح قائمة خدماتنا واختر الخدمة التي تناسب احتياجاتك الأكاديمية قبل التواصل.',
          icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        },
        {
          title: 'جهّز موعدك النهائي',
          desc: 'أخبرنا بالموعد النهائي لتسليم عملك الأكاديمي حتى نتمكن من تنظيم العمل وفق أولوياتك.',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        },
        {
          title: 'اكتب تفاصيل واضحة',
          desc: 'صف طلبك بوضوح: ما الذي تحتاجه؟ ما مرحلتك الدراسية؟ هل لديك ملفات تودّ مشاركتها؟',
          icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        },
      ],
    },

    faq: {
      heading: 'أسئلة شائعة',
      sub: 'إجابات على أكثر الأسئلة التي يطرحها طلابنا',
      items: [
        {
          q: 'كيف أرسل طلب خدمة؟',
          a: 'يمكنك إرسال طلبك عبر نموذج الطلب في موقعنا، أو التواصل معنا مباشرةً عبر واتساب أو البريد الإلكتروني بتفاصيل طلبك.',
        },
        {
          q: 'ما الوقت المتوقع للردّ على طلبي؟',
          a: 'يرد فريقنا عادةً خلال بضع ساعات في أيام العمل. في حال الطلبات العاجلة، يُفضَّل التواصل عبر واتساب للحصول على رد أسرع.',
        },
        {
          q: 'هل تقدمون الخدمات باللغتين العربية والإنجليزية؟',
          a: 'نعم، نقدم جميع خدماتنا باللغتين العربية والإنجليزية بكفاءة متساوية. يمكنك اختيار لغة التواصل المفضلة لديك عند تقديم طلبك.',
        },
        {
          q: 'هل بياناتي الأكاديمية محفوظة وسرية؟',
          a: 'نعم تماماً. نلتزم بضمان سرية جميع بيانات الطلاب ومعلوماتهم الأكاديمية بشكل كامل ودقيق.',
        },
      ],
    },

    cta: {
      heading: 'هل أنت مستعد للبدء؟',
      sub: 'تواصل معنا الآن أو قدّم طلبك مباشرةً',
      whatsapp: 'تواصل عبر واتساب',
      request: 'اطلب خدمة',
    },
  },

  en: {
    pageTitle: 'Contact Us',
    pageSub: 'We are here to answer your questions and provide the academic support you need',

    intro: {
      heading: "We'd Love to Hear from You",
      body: "Whether you'd like to inquire about our services, need help choosing the right service for your needs, or have any academic question — our team is ready to help via WhatsApp or email as soon as possible.",
    },

    cards: {
      whatsapp: {
        title: 'WhatsApp',
        desc: 'The fastest way to reach us. Our team responds to messages during working hours.',
        action: 'Start a Chat',
      },
      email: {
        title: 'Email',
        desc: 'Send us your request details and we will reply as soon as possible.',
        action: 'Send an Email',
      },
      form: {
        title: 'Request Form',
        desc: 'Submit your request through our structured form for faster and more accurate service.',
        action: 'Request a Service',
      },
    },

    before: {
      heading: 'Before You Contact Us',
      sub: 'To help us assist you better and faster, we suggest preparing the following',
      items: [
        {
          title: 'Identify Your Service',
          desc: 'Browse our services list and identify the service that best matches your academic needs before reaching out.',
          icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
        },
        {
          title: 'Know Your Deadline',
          desc: 'Let us know your submission deadline so we can prioritize and organize the work according to your schedule.',
          icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
        },
        {
          title: 'Write Clear Details',
          desc: 'Describe your request clearly: what do you need, what is your degree level, and do you have files you would like to share?',
          icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
        },
      ],
    },

    faq: {
      heading: 'Frequently Asked Questions',
      sub: 'Answers to the most common questions from our students',
      items: [
        {
          q: 'How do I submit a service request?',
          a: 'You can submit your request through the request form on our website, or contact us directly via WhatsApp or email with your request details.',
        },
        {
          q: 'How quickly will you respond?',
          a: 'Our team typically responds within a few hours on working days. For urgent requests, we recommend contacting us via WhatsApp for a faster response.',
        },
        {
          q: 'Do you offer services in both Arabic and English?',
          a: 'Yes, we deliver all services in both Arabic and English with equal quality. You can choose your preferred language of communication when submitting your request.',
        },
        {
          q: 'Is my academic information kept confidential?',
          a: 'Absolutely. We are fully committed to maintaining the privacy and confidentiality of all student data and academic information.',
        },
      ],
    },

    cta: {
      heading: 'Ready to Get Started?',
      sub: 'Contact us now or submit your request directly',
      whatsapp: 'Contact on WhatsApp',
      request: 'Request a Service',
    },
  },
};

// ─── Icon helper ──────────────────────────────────────────────────────────────

function Icon({ path, className = 'h-6 w-6' }: { path: string; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

function WhatsAppIcon({ className = 'h-6 w-6' }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ─── FAQ accordion item ───────────────────────────────────────────────────────

function FaqItem({ q, a, isRtl }: { q: string; a: string; isRtl: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-100 rounded-2xl bg-white overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-start hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span className={`font-semibold text-blue-950 ${isRtl ? 'text-base leading-relaxed text-right' : 'text-sm text-left'}`}>{q}</span>
        <span className={`shrink-0 text-blue-600 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {open && (
        <div className={`px-6 pb-5 ${isRtl ? 'text-right' : 'text-left'}`}>
          <p className={`text-gray-600 ${isRtl ? 'text-sm leading-7' : 'text-sm leading-relaxed'}`}>{a}</p>
        </div>
      )}
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function ContactPage() {
  const { lang, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const c = content[lang];

  return (
    <div className={isRtl ? 'font-arabic' : 'font-sans'}>

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{c.pageTitle}</h1>
          <p className={`text-blue-200 max-w-2xl mx-auto ${isRtl ? 'text-lg leading-8' : 'text-base leading-relaxed'}`}>
            {c.pageSub}
          </p>
        </div>
      </section>

      {/* ── Intro + Contact cards ────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Intro text */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className={`text-2xl font-bold text-blue-950 mb-4 ${isRtl ? 'leading-relaxed' : ''}`}>
              {c.intro.heading}
            </h2>
            <p className={`text-gray-500 ${isRtl ? 'text-base leading-8' : 'text-sm leading-relaxed'}`}>
              {c.intro.body}
            </p>
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

            {/* WhatsApp card */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col items-center text-center bg-green-50 border border-green-100 rounded-2xl p-8 hover:shadow-md hover:border-green-300 transition-all ${isRtl ? 'font-arabic' : ''}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-green-500 text-white flex items-center justify-center mb-5 group-hover:bg-green-600 transition-colors">
                <WhatsAppIcon className="h-7 w-7" />
              </div>
              <h3 className={`font-bold text-green-900 mb-2 ${isRtl ? 'text-base' : 'text-base'}`}>{c.cards.whatsapp.title}</h3>
              <p className={`text-green-700 mb-4 flex-1 ${isRtl ? 'text-sm leading-7' : 'text-sm leading-relaxed'}`}>{c.cards.whatsapp.desc}</p>
              <div className="text-sm font-medium text-green-800 mb-1">{WHATSAPP_NUMBER}</div>
              <span className="mt-3 text-sm font-semibold text-green-700 group-hover:text-green-900 transition-colors">
                {c.cards.whatsapp.action} →
              </span>
            </a>

            {/* Email card */}
            <a
              href={`mailto:${EMAIL}`}
              className={`group flex flex-col items-center text-center bg-blue-50 border border-blue-100 rounded-2xl p-8 hover:shadow-md hover:border-blue-300 transition-all ${isRtl ? 'font-arabic' : ''}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center mb-5 group-hover:bg-blue-800 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-blue-950 mb-2">{c.cards.email.title}</h3>
              <p className={`text-blue-700 mb-4 flex-1 ${isRtl ? 'text-sm leading-7' : 'text-sm leading-relaxed'}`}>{c.cards.email.desc}</p>
              <div className="text-sm font-medium text-blue-800 mb-1 break-all">{EMAIL}</div>
              <span className="mt-3 text-sm font-semibold text-blue-700 group-hover:text-blue-900 transition-colors">
                {c.cards.email.action} →
              </span>
            </a>

            {/* Request form card */}
            <Link
              href="/request"
              className={`group flex flex-col items-center text-center bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-md hover:border-blue-200 transition-all ${isRtl ? 'font-arabic' : ''}`}
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center mb-5 group-hover:bg-blue-800 transition-colors">
                <Icon path="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" className="h-7 w-7" />
              </div>
              <h3 className="text-base font-bold text-blue-950 mb-2">{c.cards.form.title}</h3>
              <p className={`text-gray-500 mb-4 flex-1 ${isRtl ? 'text-sm leading-7' : 'text-sm leading-relaxed'}`}>{c.cards.form.desc}</p>
              <span className="mt-3 text-sm font-semibold text-blue-700 group-hover:text-blue-900 transition-colors">
                {c.cards.form.action} →
              </span>
            </Link>

          </div>
        </div>
      </section>

      {/* ── Before contacting us ─────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-2xl font-bold text-blue-950 mb-3 ${isRtl ? 'leading-relaxed' : ''}`}>
              {c.before.heading}
            </h2>
            <p className={`text-gray-500 max-w-xl mx-auto ${isRtl ? 'text-base leading-7' : 'text-sm leading-relaxed'}`}>
              {c.before.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {c.before.items.map((item, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm ${isRtl ? 'text-right' : 'text-left'}`}>
                <div className={`flex items-center gap-3 mb-4 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center">
                    <Icon path={item.icon} className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-bold text-blue-100 select-none">
                    {isRtl ? ['١', '٢', '٣'][i] : i + 1}
                  </span>
                </div>
                <h3 className={`font-bold text-blue-950 mb-2 ${isRtl ? 'text-base leading-relaxed' : 'text-base'}`}>
                  {item.title}
                </h3>
                <p className={`text-gray-500 ${isRtl ? 'text-sm leading-7' : 'text-sm leading-relaxed'}`}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className={`text-2xl font-bold text-blue-950 mb-3 ${isRtl ? 'leading-relaxed' : ''}`}>
              {c.faq.heading}
            </h2>
            <p className={`text-gray-500 ${isRtl ? 'text-base leading-7' : 'text-sm leading-relaxed'}`}>
              {c.faq.sub}
            </p>
          </div>

          <div className="space-y-3">
            {c.faq.items.map((item, i) => (
              <FaqItem key={i} q={item.q} a={item.a} isRtl={isRtl} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="bg-blue-950 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl font-bold text-white mb-4 ${isRtl ? 'leading-relaxed' : 'leading-tight'}`}>
            {c.cta.heading}
          </h2>
          <p className={`text-blue-200 mb-10 ${isRtl ? 'text-base leading-7' : 'text-sm leading-relaxed'}`}>
            {c.cta.sub}
          </p>
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors shadow-sm text-base"
            >
              <WhatsAppIcon className="h-5 w-5" />
              {c.cta.whatsapp}
            </a>
            <Link
              href="/request"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-950 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-sm text-base text-center"
            >
              {c.cta.request}
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
