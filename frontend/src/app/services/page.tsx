'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

// ─── Data: all 8 categories with 21 services ─────────────────────────────────

const categories = [
  {
    slug: 'research-support',
    ar: {
      title: 'دعم البحث العلمي',
      desc: 'دعم متكامل في مراحل البحث العلمي من الاقتراح حتى الكتابة الأكاديمية',
    },
    en: {
      title: 'Research Support',
      desc: 'Comprehensive support throughout the research process from proposal to academic writing',
    },
    iconPath: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    services: [
      {
        slug: 'research-proposal-support',
        ar: { title: 'دعم مقترح البحث', desc: 'إرشاد وتوجيه في إعداد مقترح بحثي أكاديمي متكامل وفق المعايير المعتمدة' },
        en: { title: 'Research Proposal Support', desc: 'Guidance and direction in preparing a complete academic research proposal to approved standards' },
      },
      {
        slug: 'theoretical-framework-support',
        ar: { title: 'دعم الإطار النظري', desc: 'مساعدة في بناء الإطار النظري للبحث وربطه بالمتغيرات والمفاهيم الأكاديمية' },
        en: { title: 'Theoretical Framework Support', desc: 'Assistance in building the theoretical framework and linking it to research variables and academic concepts' },
      },
      {
        slug: 'literature-review-support',
        ar: { title: 'دعم الدراسات السابقة والأدب النظري', desc: 'دعم في مراجعة الأدبيات وتوظيف الدراسات السابقة بشكل أكاديمي سليم' },
        en: { title: 'Literature Review Support', desc: 'Support in reviewing literature and properly integrating prior studies in an academically sound manner' },
      },
      {
        slug: 'academic-writing-guidance',
        ar: { title: 'إرشاد الكتابة الأكاديمية', desc: 'توجيه في أسلوب الكتابة الأكاديمية وتنظيم المحتوى وفق المعايير الأكاديمية المعتمدة' },
        en: { title: 'Academic Writing Guidance', desc: 'Guidance on academic writing style and structuring content according to accepted academic standards' },
      },
    ],
  },
  {
    slug: 'proofreading-editing',
    ar: {
      title: 'المراجعة والتدقيق',
      desc: 'مراجعة لغوية ونقدية دقيقة للأوراق البحثية والرسائل الأكاديمية',
    },
    en: {
      title: 'Proofreading & Editing',
      desc: 'Precise linguistic and critical review of academic papers and theses',
    },
    iconPath: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
    services: [
      {
        slug: 'proofreading-arabic',
        ar: { title: 'تدقيق لغوي باللغة العربية', desc: 'مراجعة شاملة للأخطاء النحوية والإملائية والأسلوبية في النصوص العربية الأكاديمية' },
        en: { title: 'Proofreading in Arabic', desc: 'Comprehensive review of grammatical, spelling, and stylistic errors in Arabic academic texts' },
      },
      {
        slug: 'proofreading-english',
        ar: { title: 'تدقيق لغوي باللغة الإنجليزية', desc: 'مراجعة احترافية للنصوص الأكاديمية الإنجليزية من حيث القواعد والأسلوب والوضوح' },
        en: { title: 'Proofreading in English', desc: 'Professional review of English academic texts for grammar, style, and clarity' },
      },
      {
        slug: 'academic-paraphrasing',
        ar: { title: 'إعادة الصياغة الأكاديمية', desc: 'إعادة صياغة النصوص الأكاديمية بأسلوب علمي سليم مع الحفاظ على المعنى الأصلي' },
        en: { title: 'Academic Paraphrasing', desc: 'Rephrasing academic texts in a sound scholarly style while preserving the original meaning' },
      },
      {
        slug: 'critical-review',
        ar: { title: 'المراجعة النقدية للأوراق البحثية', desc: 'تقييم نقدي شامل للأوراق البحثية من حيث المنهجية والمحتوى والمعايير الأكاديمية' },
        en: { title: 'Critical Review of Academic Papers', desc: 'Comprehensive critical evaluation of academic papers in terms of methodology, content, and standards' },
      },
    ],
  },
  {
    slug: 'citation-references',
    ar: {
      title: 'التوثيق والمصادر',
      desc: 'دعم في التوثيق الصحيح والاستشهاد المرجعي وتوفير المصادر الأكاديمية',
    },
    en: {
      title: 'Citation & References',
      desc: 'Support in correct citation, referencing styles, and sourcing academic materials',
    },
    iconPath: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z',
    services: [
      {
        slug: 'citation-referencing-support',
        ar: { title: 'دعم التوثيق والاستشهاد المرجعي', desc: 'مساعدة في تطبيق أنماط التوثيق المختلفة كـ APA وMLA وChicago وفق متطلبات البحث' },
        en: { title: 'Citation and Referencing Support', desc: 'Assistance applying various citation styles including APA, MLA, and Chicago per research requirements' },
      },
      {
        slug: 'academic-references-sources',
        ar: { title: 'توفير المراجع والمصادر الأكاديمية', desc: 'البحث عن مصادر ومراجع أكاديمية موثوقة ومتخصصة تدعم محتوى البحث' },
        en: { title: 'Providing Academic References and Sources', desc: 'Searching for reliable and specialized academic sources and references that support research content' },
      },
    ],
  },
  {
    slug: 'analysis-data',
    ar: {
      title: 'التحليل والبيانات',
      desc: 'تحليل إحصائي متخصص وإدخال البيانات ومعالجتها بدقة واحترافية',
    },
    en: {
      title: 'Analysis & Data',
      desc: 'Specialized statistical analysis, data entry, and data processing with precision',
    },
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    services: [
      {
        slug: 'statistical-analysis',
        ar: { title: 'التحليل الإحصائي', desc: 'إجراء التحليلات الإحصائية باستخدام برامج متخصصة كـ SPSS وتفسير النتائج أكاديمياً' },
        en: { title: 'Statistical Analysis', desc: 'Conducting statistical analyses using specialized software such as SPSS and interpreting results academically' },
      },
      {
        slug: 'data-entry',
        ar: { title: 'إدخال البيانات', desc: 'إدخال ومعالجة البيانات البحثية بدقة عالية وتنظيمها وفق متطلبات الدراسة' },
        en: { title: 'Data Entry', desc: 'Accurate entry and processing of research data, organized according to study requirements' },
      },
    ],
  },
  {
    slug: 'formatting-publication',
    ar: {
      title: 'التنسيق والنشر',
      desc: 'تنسيق احترافي للمحتوى الأكاديمي وإعداده للنشر وفحص نسبة التشابه',
    },
    en: {
      title: 'Formatting & Publication',
      desc: 'Professional academic content formatting, publication preparation, and similarity checking',
    },
    iconPath: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    services: [
      {
        slug: 'formatting-academic-content',
        ar: { title: 'تنسيق المحتوى الأكاديمي', desc: 'تنسيق شامل للرسائل والأبحاث وفق المعايير والقوالب الأكاديمية المعتمدة' },
        en: { title: 'Formatting Academic Content', desc: 'Comprehensive formatting of theses and research papers according to approved academic templates and standards' },
      },
      {
        slug: 'publication-preparation',
        ar: { title: 'دعم إعداد الأبحاث للنشر', desc: 'مساعدة في تهيئة الأوراق البحثية واستيفاء متطلبات المجلات والمؤتمرات العلمية' },
        en: { title: 'Publication Preparation Support', desc: 'Assistance preparing research papers and meeting the requirements of academic journals and conferences' },
      },
      {
        slug: 'similarity-check',
        ar: { title: 'فحص نسبة الاقتباس والتشابه', desc: 'فحص نسبة التشابه في النصوص الأكاديمية وتقديم تقرير مفصل مع توصيات للتحسين' },
        en: { title: 'Similarity / Plagiarism Percentage Check', desc: 'Checking similarity percentage in academic texts with a detailed report and improvement recommendations' },
      },
    ],
  },
  {
    slug: 'academic-summaries',
    ar: {
      title: 'الملخصات الأكاديمية',
      desc: 'تلخيص احترافي للأوراق البحثية والكتب والدراسات الأكاديمية',
    },
    en: {
      title: 'Academic Summaries',
      desc: 'Professional summarization of academic papers, books, and studies',
    },
    iconPath: 'M4 6h16M4 10h16M4 14h10M4 18h6',
    services: [
      {
        slug: 'academic-summarizing',
        ar: { title: 'تلخيص الأوراق البحثية والكتب والدراسات', desc: 'إعداد ملخصات أكاديمية دقيقة ومنظمة للمراجع والأوراق البحثية والكتب العلمية' },
        en: { title: 'Summarizing Academic Papers, Books, and Studies', desc: 'Preparing accurate and organized academic summaries of references, research papers, and scholarly books' },
      },
    ],
  },
  {
    slug: 'university-project-support',
    ar: {
      title: 'دعم المشاريع الجامعية',
      desc: 'إرشاد وتوجيه في المشاريع الجامعية والتقارير والواجبات الأكاديمية',
    },
    en: {
      title: 'University Project Support',
      desc: 'Guidance and support in university projects, reports, and academic assignments',
    },
    iconPath: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
    services: [
      {
        slug: 'university-projects',
        ar: { title: 'دعم المشاريع الجامعية', desc: 'توجيه وإرشاد في مراحل إعداد وتنفيذ المشاريع الجامعية وفق المتطلبات الأكاديمية' },
        en: { title: 'University Project Support', desc: 'Guidance through the stages of preparing and executing university projects according to academic requirements' },
      },
      {
        slug: 'reports-assignments',
        ar: { title: 'إرشاد التقارير والواجبات الأكاديمية', desc: 'مساعدة في إعداد التقارير الأكاديمية والواجبات وفق المعايير والتعليمات المطلوبة' },
        en: { title: 'Reports and Assignments Guidance', desc: 'Assistance preparing academic reports and assignments according to required standards and instructions' },
      },
    ],
  },
  {
    slug: 'degree-level-support',
    ar: {
      title: 'دعم مراحل الدراسة',
      desc: 'دعم أكاديمي متخصص لكل مرحلة دراسية من البكالوريوس حتى الدكتوراه',
    },
    en: {
      title: 'Degree-Level Support',
      desc: "Specialized academic support for every degree level from bachelor's through PhD",
    },
    iconPath: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
    services: [
      {
        slug: 'bachelor-support',
        ar: { title: 'دعم طلاب البكالوريوس', desc: 'دعم أكاديمي شامل لطلاب البكالوريوس في مختلف التخصصات والمواد الجامعية' },
        en: { title: "Bachelor's Degree Student Support", desc: "Comprehensive academic support for bachelor's students across various disciplines and university courses" },
      },
      {
        slug: 'masters-support',
        ar: { title: 'دعم طلاب الماجستير', desc: 'دعم متخصص لطلاب الماجستير في الرسائل والأبحاث والمشاريع الأكاديمية المتقدمة' },
        en: { title: "Master's Degree Student Support", desc: "Specialized support for master's students in theses, research, and advanced academic projects" },
      },
      {
        slug: 'phd-support',
        ar: { title: 'دعم طلاب الدكتوراه', desc: 'دعم أكاديمي رفيع المستوى لطلاب الدكتوراه في أطروحاتهم وأبحاثهم المتخصصة' },
        en: { title: 'PhD Student Support', desc: 'High-level academic support for PhD students in their dissertations and specialized research' },
      },
    ],
  },
];

// ─── Page content ─────────────────────────────────────────────────────────────

const pageContent = {
  ar: {
    pageTitle: 'خدماتنا الأكاديمية',
    pageSub: 'نقدم مجموعة متكاملة من خدمات الدعم الأكاديمي المتخصص لطلاب البكالوريوس والماجستير والدكتوراه',
    requestBtn: 'اطلب هذه الخدمة',
    contactNote: 'هل لديك استفسار؟ تواصل معنا عبر',
    whatsapp: 'واتساب',
    or: 'أو',
    email: 'البريد الإلكتروني',
  },
  en: {
    pageTitle: 'Our Academic Services',
    pageSub: "A comprehensive range of specialized academic support services for undergraduate, master's, and PhD students",
    requestBtn: 'Request This Service',
    contactNote: 'Have a question? Contact us via',
    whatsapp: 'WhatsApp',
    or: 'or',
    email: 'Email',
  },
};

// ─── Icon component ───────────────────────────────────────────────────────────

function CategoryIcon({ path }: { path: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function ServicesPage() {
  const { lang, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const p = pageContent[lang];

  return (
    <div className={isRtl ? 'font-arabic' : 'font-sans'}>

      {/* ── Page header ─────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{p.pageTitle}</h1>
          <p className={`text-blue-200 max-w-2xl mx-auto ${isRtl ? 'text-lg leading-8' : 'text-base leading-relaxed'}`}>
            {p.pageSub}
          </p>
        </div>
      </section>

      {/* ── Category jump nav ───────────────────────────────────────────────── */}
      <nav
        className="sticky top-16 z-40 bg-white border-b border-gray-100 shadow-sm"
        aria-label={lang === 'ar' ? 'تنقل بين الفئات' : 'Category navigation'}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-3">
            {categories.map((cat) => (
              <a
                key={cat.slug}
                href={`#${cat.slug}`}
                className={`shrink-0 px-4 py-2 font-medium text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors whitespace-nowrap ${isRtl ? 'text-sm' : 'text-xs'}`}
              >
                {cat[lang].title}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* ── Categories ──────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {categories.map((cat, catIndex) => {
          const catContent = cat[lang];

          return (
            <section key={cat.slug} id={cat.slug} className="scroll-mt-28">

              {/* Category heading */}
              <div className="flex items-start gap-4 mb-8">
                <div className="shrink-0 flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-900 text-white">
                  <CategoryIcon path={cat.iconPath} />
                </div>
                <div className={`flex-1 ${isRtl ? 'text-right' : 'text-left'}`}>
                  <h2 className={`text-2xl font-bold text-blue-950 mb-1 ${isRtl ? 'leading-relaxed' : ''}`}>
                    {catContent.title}
                  </h2>
                  <p className={`text-gray-500 ${isRtl ? 'text-base leading-7' : 'text-sm leading-relaxed'}`}>
                    {catContent.desc}
                  </p>
                </div>
              </div>

              {/* Service cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {cat.services.map((svc) => {
                  const svcContent = svc[lang];
                  return (
                    <div
                      key={svc.slug}
                      className={`flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all p-6 ${isRtl ? 'text-right' : 'text-left'}`}
                    >
                      <h3 className={`font-bold text-blue-950 mb-3 ${isRtl ? 'text-base leading-relaxed' : 'text-base leading-snug'}`}>
                        {svcContent.title}
                      </h3>
                      <p className={`flex-1 mb-6 ${isRtl ? 'text-sm leading-7 text-gray-600' : 'text-sm leading-relaxed text-gray-500'}`}>
                        {svcContent.desc}
                      </p>
                      <Link
                        href={`/request?service=${svc.slug}`}
                        className={`inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors group ${isRtl ? 'flex-row-reverse self-end' : 'self-start'}`}
                      >
                        {p.requestBtn}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`h-4 w-4 shrink-0 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : 'group-hover:translate-x-0.5'}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  );
                })}
              </div>

              {/* Divider between categories */}
              {catIndex < categories.length - 1 && (
                <div className="mt-16 border-t border-gray-100" aria-hidden="true" />
              )}
            </section>
          );
        })}
      </div>

      {/* ── Bottom CTA strip ────────────────────────────────────────────────── */}
      <section className="bg-blue-950 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span className={`text-blue-200 ${isRtl ? 'text-base' : 'text-sm'}`}>{p.contactNote}</span>
            <a
              href="https://wa.me/962797930338"
              target="_blank"
              rel="noopener noreferrer"
              className={`font-semibold text-white hover:text-green-300 transition-colors ${isRtl ? 'text-base' : 'text-sm'}`}
            >
              {p.whatsapp}
            </a>
            <span className={`text-blue-500 ${isRtl ? 'text-base' : 'text-sm'}`}>{p.or}</span>
            <a
              href="mailto:uni.services@hotmail.com"
              className={`font-semibold text-white hover:text-blue-300 transition-colors ${isRtl ? 'text-base' : 'text-sm'}`}
            >
              {p.email}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
