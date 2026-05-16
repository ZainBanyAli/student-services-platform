'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const WHATSAPP_URL = 'https://wa.me/962797930338';

// ─── Static bilingual content ────────────────────────────────────────────────

const homeContent = {
  ar: {
    hero: {
      badge: 'مكتب العياصرة للخدمات الطلابية',
      headline: 'دعمك الأكاديمي المتخصص في متناول يدك',
      sub: 'مراجعة لغوية، تدقيق، تحليل إحصائي، وإرشاد بحثي للطلاب في مراحل البكالوريوس والماجستير والدكتوراه',
      ctaPrimary: 'اطلب خدمة',
      ctaSecondary: 'استعرض الخدمات',
      whatsapp: 'تواصل معنا عبر واتساب',
    },
    services: {
      heading: 'خدماتنا الأكاديمية',
      sub: 'نقدم مجموعة متكاملة من خدمات الدعم الأكاديمي لمختلف المراحل الدراسية',
      cta: 'عرض جميع الخدمات',
    },
    whyUs: {
      heading: 'لماذا تختارنا؟',
      sub: 'نجمع بين الخبرة الأكاديمية والالتزام المهني لضمان نجاحك',
      items: [
        { title: 'فريق أكاديمي متخصص', desc: 'خبراء في التخصصات الأكاديمية المختلفة على استعداد دائم لمساعدتك' },
        { title: 'دعم عربي وإنجليزي', desc: 'نقدم جميع خدماتنا باللغتين العربية والإنجليزية بجودة عالية' },
        { title: 'سرية تامة', desc: 'نضمن خصوصية بياناتك ومعلوماتك الأكاديمية بشكل كامل' },
        { title: 'الالتزام بالمواعيد', desc: 'نحترم وقتك ونلتزم بالمواعيد المتفق عليها دون تأخير' },
        { title: 'تدقيق وتنسيق احترافي', desc: 'مراجعة لغوية دقيقة وتنسيق وفق المعايير الأكاديمية المعتمدة' },
        { title: 'إرشاد بحثي متخصص', desc: 'توجيه ودعم في جميع مراحل البحث العلمي من البداية حتى النهاية' },
      ],
    },
    howItWorks: {
      heading: 'كيف تعمل الخدمة؟',
      sub: 'أربع خطوات بسيطة للحصول على الدعم الأكاديمي الذي تحتاجه',
      steps: [
        { num: '١', title: 'اختر الخدمة', desc: 'تصفح قائمة خدماتنا واختر الخدمة التي تناسب احتياجاتك الأكاديمية' },
        { num: '٢', title: 'أرسل تفاصيل طلبك', desc: 'أرسل لنا تفاصيل طلبك عبر نموذج الطلب أو مباشرةً عبر واتساب' },
        { num: '٣', title: 'مراجعة الفريق', desc: 'يراجع فريقنا المتخصص طلبك بعناية ويُعد العرض الأنسب لك' },
        { num: '٤', title: 'التواصل والتسليم', desc: 'نتواصل معك عبر واتساب أو البريد الإلكتروني لإتمام الخدمة' },
      ],
    },
    trust: {
      heading: 'خدمات أكاديمية موثوقة ومتخصصة',
      items: ['دعم أكاديمي شامل', 'استشارة بحثية', 'تدقيق لغوي', 'فحص نسبة الاقتباس', 'تحليل إحصائي'],
    },
    cta: {
      heading: 'هل أنت مستعد للحصول على الدعم الذي تحتاجه؟',
      sub: 'تواصل معنا الآن وابدأ رحلتك الأكاديمية بثقة واحترافية',
      primary: 'اطلب خدمة الآن',
      whatsapp: 'تواصل عبر واتساب',
    },
  },
  en: {
    hero: {
      badge: 'Al-Ayasrah Academic Services Office',
      headline: 'Your Specialized Academic Support, Within Reach',
      sub: "Proofreading, editing, statistical analysis, and research guidance for undergraduate, master's, and PhD students",
      ctaPrimary: 'Request a Service',
      ctaSecondary: 'View Services',
      whatsapp: 'Contact us on WhatsApp',
    },
    services: {
      heading: 'Our Academic Services',
      sub: 'A comprehensive range of academic support services for students at every degree level',
      cta: 'View All Services',
    },
    whyUs: {
      heading: 'Why Choose Us?',
      sub: 'Combining academic expertise with professional commitment to ensure your success',
      items: [
        { title: 'Specialized Academic Team', desc: 'Experts across a wide range of academic disciplines, always ready to help' },
        { title: 'Arabic & English Support', desc: 'All services delivered in both Arabic and English with equal quality' },
        { title: 'Full Confidentiality', desc: 'Your personal data and academic information are kept strictly private' },
        { title: 'On-Time Delivery', desc: 'We respect your time and honor every agreed deadline without delay' },
        { title: 'Professional Proofreading & Formatting', desc: 'Careful language review and formatting aligned with academic standards' },
        { title: 'Specialized Research Guidance', desc: 'Expert guidance and support through every stage of your research journey' },
      ],
    },
    howItWorks: {
      heading: 'How It Works',
      sub: 'Four simple steps to get the academic support you need',
      steps: [
        { num: '1', title: 'Choose a Service', desc: 'Browse our service list and select the service that fits your academic needs' },
        { num: '2', title: 'Submit Your Request', desc: 'Send us your request details via the form or directly through WhatsApp' },
        { num: '3', title: 'Team Review', desc: 'Our expert team carefully reviews your request and prepares the best offer' },
        { num: '4', title: 'Contact & Delivery', desc: 'We contact you via WhatsApp or email to complete and deliver the service' },
      ],
    },
    trust: {
      heading: 'Trusted & Specialized Academic Services',
      items: ['Comprehensive Academic Support', 'Research Consultation', 'Proofreading', 'Similarity Check', 'Statistical Analysis'],
    },
    cta: {
      heading: 'Ready to Get the Support You Need?',
      sub: 'Contact us now and begin your academic journey with confidence and professionalism',
      primary: 'Request a Service Now',
      whatsapp: 'Contact on WhatsApp',
    },
  },
};

const serviceCategories = [
  {
    slug: 'research-support',
    ar: { title: 'دعم البحث العلمي', desc: 'مقترح البحث، الإطار النظري، الأدب النظري، والكتابة الأكاديمية' },
    en: { title: 'Research Support', desc: 'Research proposals, theoretical frameworks, literature reviews, and academic writing' },
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  {
    slug: 'proofreading-editing',
    ar: { title: 'المراجعة والتدقيق', desc: 'تدقيق لغوي بالعربية والإنجليزية، إعادة الصياغة، والمراجعة النقدية' },
    en: { title: 'Proofreading & Editing', desc: 'Arabic and English proofreading, academic paraphrasing, and critical review' },
    iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
  },
  {
    slug: 'citation-references',
    ar: { title: 'التوثيق والمصادر', desc: 'دعم التوثيق والاستشهاد المرجعي وتوفير المراجع الأكاديمية' },
    en: { title: 'Citation & References', desc: 'Citation and referencing support and providing academic sources' },
    iconPath: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z',
  },
  {
    slug: 'analysis-data',
    ar: { title: 'التحليل والبيانات', desc: 'التحليل الإحصائي وإدخال البيانات ومعالجتها' },
    en: { title: 'Analysis & Data', desc: 'Statistical analysis and data entry and processing' },
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
  },
  {
    slug: 'formatting-publication',
    ar: { title: 'التنسيق والنشر', desc: 'تنسيق المحتوى الأكاديمي، إعداد للنشر، وفحص نسبة التشابه' },
    en: { title: 'Formatting & Publication', desc: 'Academic content formatting, publication preparation, and similarity checks' },
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
  },
  {
    slug: 'academic-summaries',
    ar: { title: 'الملخصات الأكاديمية', desc: 'تلخيص الأوراق البحثية والكتب والدراسات الأكاديمية' },
    en: { title: 'Academic Summaries', desc: 'Summarizing academic papers, books, and studies' },
    iconPath: 'M4 6h16M4 10h16M4 14h10M4 18h6',
  },
  {
    slug: 'university-project-support',
    ar: { title: 'دعم المشاريع الجامعية', desc: 'دعم المشاريع الجامعية وإرشاد التقارير والواجبات الأكاديمية' },
    en: { title: 'University Project Support', desc: 'University project support and reports and assignments guidance' },
    iconPath: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
  },
  {
    slug: 'degree-level-support',
    ar: { title: 'دعم مراحل الدراسة', desc: 'دعم متخصص لطلاب البكالوريوس والماجستير والدكتوراه' },
    en: { title: 'Degree-Level Support', desc: "Specialized support for bachelor's, master's, and PhD students" },
    iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
  },
];

// ─── Icon helpers ─────────────────────────────────────────────────────────────

function ServiceIcon({ path }: { path: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

// ─── Section heading helper ───────────────────────────────────────────────────

function SectionHeading({ heading, sub, light = false }: { heading: string; sub: string; light?: boolean }) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-12">
      <h2 className={`text-3xl font-bold mb-3 ${light ? 'text-white' : 'text-blue-950'}`}>{heading}</h2>
      <p className={`text-base leading-relaxed ${light ? 'text-blue-200' : 'text-gray-500'}`}>{sub}</p>
    </div>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function HomePage() {
  const { lang, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const c = homeContent[lang];

  return (
    <div className={isRtl ? 'font-arabic' : 'font-sans'}>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white overflow-hidden">
        {/* Subtle decorative circles */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -start-24 w-96 h-96 bg-white/5 rounded-full" />
          <div className="absolute bottom-0 end-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-blue-100 text-sm font-medium px-4 py-1.5 rounded-full mb-8">
            <StarIcon />
            <span>{c.hero.badge}</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-6 max-w-4xl mx-auto">
            {c.hero.headline}
          </h1>

          {/* Sub */}
          <p className="text-lg md:text-xl text-blue-200 leading-relaxed max-w-2xl mx-auto mb-10">
            {c.hero.sub}
          </p>

          {/* CTA buttons */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
            <Link
              href="/request"
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-blue-950 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg shadow-black/20 text-base"
            >
              {c.hero.ctaPrimary}
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-3.5 border-2 border-white/60 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-base"
            >
              {c.hero.ctaSecondary}
            </Link>
          </div>

          {/* WhatsApp highlight */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-300 hover:text-green-200 transition-colors text-sm font-medium"
          >
            <WhatsAppIcon />
            <span>{c.hero.whatsapp}</span>
          </a>
        </div>
      </section>

      {/* ── Services Preview ────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading heading={c.services.heading} sub={c.services.sub} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {serviceCategories.map((cat) => {
              const item = cat[lang];
              return (
                <Link
                  key={cat.slug}
                  href={`/services#${cat.slug}`}
                  className={`group bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all ${isRtl ? 'text-right' : 'text-left'}`}
                >
                  <div className="text-blue-700 mb-4 group-hover:text-blue-800 transition-colors">
                    <ServiceIcon path={cat.iconPath} />
                  </div>
                  <h3 className="text-base font-bold text-blue-950 mb-2 leading-snug">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 px-7 py-3 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-sm"
            >
              {c.services.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* ── Why Choose Us ───────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading heading={c.whyUs.heading} sub={c.whyUs.sub} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {c.whyUs.items.map((item, i) => (
              <div
                key={i}
                className={`flex gap-4 p-6 rounded-2xl bg-blue-50 border border-blue-100 ${isRtl ? 'text-right' : 'text-left'}`}
              >
                <div className="text-blue-600 mt-0.5 shrink-0">
                  <CheckIcon />
                </div>
                <div>
                  <h3 className="text-base font-bold text-blue-950 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────────────────────────── */}
      <section className="bg-blue-950 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading heading={c.howItWorks.heading} sub={c.howItWorks.sub} light />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {c.howItWorks.steps.map((step, i) => (
              <div key={i} className={`relative text-center ${isRtl ? 'font-arabic' : ''}`}>
                {/* Connector line (hidden on last item) */}
                {i < c.howItWorks.steps.length - 1 && (
                  <div className="hidden lg:block absolute top-7 start-1/2 w-full h-px bg-blue-700" aria-hidden="true" />
                )}
                <div className="relative z-10 flex justify-center mb-4">
                  <span className="w-14 h-14 flex items-center justify-center rounded-full bg-blue-700 border-2 border-blue-500 text-white text-xl font-bold">
                    {step.num}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-blue-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Strip ─────────────────────────────────────────────────────── */}
      <section className="bg-white border-y border-gray-100 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 ${isRtl ? 'text-right' : 'text-center'}`}>
            {c.trust.heading}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            {c.trust.items.map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                {i > 0 && <span className="hidden sm:block w-px h-5 bg-gray-200" aria-hidden="true" />}
                <span className="flex items-center gap-2 text-sm font-medium text-blue-900">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-blue-950 mb-4 leading-tight">
            {c.cta.heading}
          </h2>
          <p className="text-base text-gray-500 leading-relaxed mb-10 max-w-xl mx-auto">
            {c.cta.sub}
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
            <Link
              href="/request"
              className="w-full sm:w-auto px-8 py-3.5 bg-blue-900 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors shadow-sm text-base"
            >
              {c.cta.primary}
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors shadow-sm text-base"
            >
              <WhatsAppIcon />
              <span>{c.cta.whatsapp}</span>
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
