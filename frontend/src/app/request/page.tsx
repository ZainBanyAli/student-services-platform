'use client';

import { Suspense, useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const WHATSAPP_URL = 'https://wa.me/962797930338';

// ─── Service data (categories + services from docs/services-content.md) ───────

const categories = [
  {
    slug: 'research-support',
    ar: 'دعم البحث العلمي',
    en: 'Research Support',
    services: [
      { slug: 'research-proposal-support',       ar: 'دعم مقترح البحث',                       en: 'Research Proposal Support' },
      { slug: 'theoretical-framework-support',   ar: 'دعم الإطار النظري',                     en: 'Theoretical Framework Support' },
      { slug: 'literature-review-support',       ar: 'دعم الدراسات السابقة والأدب النظري',    en: 'Literature Review Support' },
      { slug: 'academic-writing-guidance',       ar: 'إرشاد الكتابة الأكاديمية',              en: 'Academic Writing Guidance' },
    ],
  },
  {
    slug: 'proofreading-editing',
    ar: 'المراجعة والتدقيق',
    en: 'Proofreading & Editing',
    services: [
      { slug: 'proofreading-arabic',    ar: 'تدقيق لغوي باللغة العربية',              en: 'Proofreading in Arabic' },
      { slug: 'proofreading-english',   ar: 'تدقيق لغوي باللغة الإنجليزية',           en: 'Proofreading in English' },
      { slug: 'academic-paraphrasing',  ar: 'إعادة الصياغة الأكاديمية',               en: 'Academic Paraphrasing' },
      { slug: 'critical-review',        ar: 'المراجعة النقدية للأوراق البحثية',       en: 'Critical Review of Academic Papers' },
    ],
  },
  {
    slug: 'citation-references',
    ar: 'التوثيق والمصادر',
    en: 'Citation & References',
    services: [
      { slug: 'citation-referencing-support',  ar: 'دعم التوثيق والاستشهاد المرجعي',        en: 'Citation and Referencing Support' },
      { slug: 'academic-references-sources',   ar: 'توفير المراجع والمصادر الأكاديمية',     en: 'Providing Academic References and Sources' },
    ],
  },
  {
    slug: 'analysis-data',
    ar: 'التحليل والبيانات',
    en: 'Analysis & Data',
    services: [
      { slug: 'statistical-analysis',  ar: 'التحليل الإحصائي',  en: 'Statistical Analysis' },
      { slug: 'data-entry',            ar: 'إدخال البيانات',    en: 'Data Entry' },
    ],
  },
  {
    slug: 'formatting-publication',
    ar: 'التنسيق والنشر',
    en: 'Formatting & Publication',
    services: [
      { slug: 'formatting-academic-content',  ar: 'تنسيق المحتوى الأكاديمي',               en: 'Formatting Academic Content' },
      { slug: 'publication-preparation',      ar: 'دعم إعداد الأبحاث للنشر',               en: 'Publication Preparation Support' },
      { slug: 'similarity-check',             ar: 'فحص نسبة الاقتباس والتشابه',            en: 'Similarity / Plagiarism Percentage Check' },
    ],
  },
  {
    slug: 'academic-summaries',
    ar: 'الملخصات الأكاديمية',
    en: 'Academic Summaries',
    services: [
      { slug: 'academic-summarizing', ar: 'تلخيص الأوراق البحثية والكتب والدراسات', en: 'Summarizing Academic Papers, Books, and Studies' },
    ],
  },
  {
    slug: 'university-project-support',
    ar: 'دعم المشاريع الجامعية',
    en: 'University Project Support',
    services: [
      { slug: 'university-projects',  ar: 'دعم المشاريع الجامعية',                  en: 'University Project Support' },
      { slug: 'reports-assignments',  ar: 'إرشاد التقارير والواجبات الأكاديمية',    en: 'Reports and Assignments Guidance' },
    ],
  },
  {
    slug: 'degree-level-support',
    ar: 'دعم مراحل الدراسة',
    en: 'Degree-Level Support',
    services: [
      { slug: 'bachelor-support',  ar: 'دعم طلاب البكالوريوس',  en: "Bachelor's Degree Student Support" },
      { slug: 'masters-support',   ar: 'دعم طلاب الماجستير',    en: "Master's Degree Student Support" },
      { slug: 'phd-support',       ar: 'دعم طلاب الدكتوراه',    en: 'PhD Student Support' },
    ],
  },
];

// ─── Bilingual UI strings ─────────────────────────────────────────────────────

const ui = {
  ar: {
    pageTitle: 'طلب خدمة أكاديمية',
    pageSub: 'أرسل لنا تفاصيل طلبك وسيتواصل معك فريقنا في أقرب وقت',
    sectionPersonal: 'المعلومات الشخصية',
    sectionService: 'تفاصيل الخدمة',
    sectionDetails: 'تفاصيل الطلب',
    fullName: 'الاسم الكامل',
    fullNamePlaceholder: 'أدخل اسمك الكامل',
    whatsapp: 'رقم الواتساب',
    whatsappPlaceholder: 'مثال: 962797930338+',
    whatsappHint: 'سيتواصل معك الفريق على هذا الرقم',
    email: 'البريد الإلكتروني (اختياري)',
    emailPlaceholder: 'example@email.com',
    university: 'الجامعة / المؤسسة (اختياري)',
    universityPlaceholder: 'اسم جامعتك أو مؤسستك',
    degreeLevel: 'المرحلة الدراسية',
    degreePlaceholder: 'اختر المرحلة',
    degreeOptions: {
      bachelor: 'بكالوريوس',
      master: 'ماجستير',
      phd: 'دكتوراه',
      other: 'أخرى',
    },
    category: 'فئة الخدمة',
    categoryPlaceholder: 'اختر فئة الخدمة',
    service: 'الخدمة المطلوبة',
    servicePlaceholder: 'اختر الخدمة',
    serviceHint: 'اختر الفئة أولاً لتحديد الخدمة',
    preferredLang: 'لغة التواصل المفضلة',
    langAr: 'العربية',
    langEn: 'الإنجليزية',
    details: 'تفاصيل الطلب',
    detailsPlaceholder: 'صف طلبك بوضوح: ما الذي تحتاجه؟ ما مراحل البحث التي تحتاج دعماً فيها؟ هل لديك موعد نهائي؟',
    detailsHint: 'كلما كانت التفاصيل أوضح، كان بإمكاننا تقديم دعم أفضل',
    howHeard: 'كيف سمعت عنا؟ (اختياري)',
    howHeardPlaceholder: 'اختر',
    howHeardOptions: {
      whatsapp: 'واتساب',
      friend: 'صديق أو زميل',
      search: 'محرك البحث',
      social: 'وسائل التواصل الاجتماعي',
      university: 'الجامعة',
      other: 'أخرى',
    },
    submit: 'إرسال الطلب',
    required: 'حقل مطلوب',
    errors: {
      fullName: 'الاسم الكامل مطلوب',
      whatsapp: 'رقم الواتساب مطلوب',
      category: 'فئة الخدمة مطلوبة',
      service: 'الخدمة المطلوبة مطلوبة',
      details: 'تفاصيل الطلب مطلوبة',
    },
    successTitle: 'تم إرسال طلبك بنجاح',
    successMsg: 'شكراً لتواصلك مع مكتب العياصرة للخدمات الطلابية. سيراجع فريقنا طلبك ويتواصل معك عبر واتساب أو البريد الإلكتروني في أقرب وقت.',
    successWhatsapp: 'تواصل معنا مباشرة عبر واتساب',
    successBack: 'العودة إلى الخدمات',
    newRequest: 'إرسال طلب جديد',
    panelTitle: 'ماذا يحدث بعد الإرسال؟',
    panelItems: [
      'سيتواصل معك فريقنا عبر واتساب أو البريد الإلكتروني بعد مراجعة طلبك',
      'جميع بياناتك ومعلوماتك محفوظة وسرية تماماً',
      'كلما قدّمت تفاصيل أوضح كان بإمكاننا تقديم دعم أفضل لك',
    ],
    panelShort: ['تواصل واتساب', 'بياناتك سرية', 'تفاصيل واضحة'],
    contactTitle: 'تواصل مباشر',
  },
  en: {
    pageTitle: 'Request a Service',
    pageSub: 'Send us your request details and our team will contact you as soon as possible',
    sectionPersonal: 'Personal Information',
    sectionService: 'Service Details',
    sectionDetails: 'Request Details',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    whatsapp: 'WhatsApp Number',
    whatsappPlaceholder: 'e.g. +962797930338',
    whatsappHint: 'Our team will contact you on this number',
    email: 'Email Address (optional)',
    emailPlaceholder: 'example@email.com',
    university: 'University / Institution (optional)',
    universityPlaceholder: 'Your university or institution name',
    degreeLevel: 'Degree Level',
    degreePlaceholder: 'Select degree level',
    degreeOptions: {
      bachelor: "Bachelor's",
      master: "Master's",
      phd: 'PhD',
      other: 'Other',
    },
    category: 'Service Category',
    categoryPlaceholder: 'Select a category',
    service: 'Specific Service',
    servicePlaceholder: 'Select a service',
    serviceHint: 'Select a category first to see available services',
    preferredLang: 'Preferred Communication Language',
    langAr: 'Arabic',
    langEn: 'English',
    details: 'Request Details',
    detailsPlaceholder: 'Describe your request clearly: What do you need? Which stages of your research need support? Do you have a deadline?',
    detailsHint: 'The more detail you provide, the better we can support you',
    howHeard: 'How did you hear about us? (optional)',
    howHeardPlaceholder: 'Select',
    howHeardOptions: {
      whatsapp: 'WhatsApp',
      friend: 'Friend or colleague',
      search: 'Search engine',
      social: 'Social media',
      university: 'University',
      other: 'Other',
    },
    submit: 'Submit Request',
    required: 'Required',
    errors: {
      fullName: 'Full name is required',
      whatsapp: 'WhatsApp number is required',
      category: 'Service category is required',
      service: 'Specific service is required',
      details: 'Request details are required',
    },
    successTitle: 'Request Submitted Successfully',
    successMsg: 'Thank you for contacting Al-Ayasrah Academic Services Office. Our team will review your request and reach out via WhatsApp or email as soon as possible.',
    successWhatsapp: 'Contact us directly on WhatsApp',
    successBack: 'Back to Services',
    newRequest: 'Submit Another Request',
    panelTitle: 'What happens next?',
    panelItems: [
      'Our team will contact you via WhatsApp or email after reviewing your request',
      'Your information is kept completely confidential',
      'The clearer your request details, the better we can support you',
    ],
    panelShort: ['WhatsApp contact', 'Confidential', 'Clear details'],
    contactTitle: 'Direct Contact',
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  fullName: string;
  whatsapp: string;
  email: string;
  university: string;
  degreeLevel: string;
  category: string;
  service: string;
  preferredLang: string;
  details: string;
  howHeard: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const emptyForm: FormData = {
  fullName: '',
  whatsapp: '',
  email: '',
  university: '',
  degreeLevel: '',
  category: '',
  service: '',
  preferredLang: 'ar',
  details: '',
  howHeard: '',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function findCategoryByServiceSlug(slug: string) {
  for (const cat of categories) {
    if (cat.services.some((s) => s.slug === slug)) return cat.slug;
  }
  return '';
}

// ─── Shared input class ───────────────────────────────────────────────────────

const inputCls =
  'w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition placeholder:text-gray-400';

const errorCls = 'mt-1.5 text-xs text-red-500';

// ─── Field label ─────────────────────────────────────────────────────────────

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="block text-sm font-semibold text-gray-700 mb-1.5">
      {text}
      {required && <span className="text-red-500 ms-1" aria-hidden="true">*</span>}
    </label>
  );
}

// ─── Section heading ─────────────────────────────────────────────────────────

function SectionHeading({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="h-px flex-1 bg-gray-100" />
      <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">{text}</span>
      <div className="h-px flex-1 bg-gray-100" />
    </div>
  );
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ t, isRtl, onReset }: { t: typeof ui.ar; isRtl: boolean; onReset: () => void }) {
  return (
    <div className={`text-center py-12 px-6 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      {/* Checkmark */}
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-blue-950 mb-3">{t.successTitle}</h2>
      <p className={`text-gray-500 max-w-md mx-auto mb-8 ${isRtl ? 'leading-7 text-base' : 'leading-relaxed text-sm'}`}>
        {t.successMsg}
      </p>

      <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${isRtl ? 'sm:flex-row-reverse' : ''}`}>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors text-sm"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
          {t.successWhatsapp}
        </a>

        <Link
          href="/services"
          className="w-full sm:w-auto px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm text-center"
        >
          {t.successBack}
        </Link>
      </div>

      <button
        onClick={onReset}
        className="mt-6 text-sm text-blue-600 hover:text-blue-800 transition-colors underline underline-offset-2"
      >
        {t.newRequest}
      </button>
    </div>
  );
}

// ─── Form (uses useSearchParams — must be inside Suspense) ────────────────────

function RequestForm() {
  const searchParams = useSearchParams();
  const { lang, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const t = ui[lang];

  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  // Pre-select service from ?service= query param
  useEffect(() => {
    const slug = searchParams.get('service');
    if (!slug) return;
    const catSlug = findCategoryByServiceSlug(slug);
    if (catSlug) {
      setForm((prev) => ({ ...prev, category: catSlug, service: slug }));
    }
  }, [searchParams]);

  // Reset service when category changes (unless it belongs to the new category)
  function handleCategoryChange(newCat: string) {
    const cat = categories.find((c) => c.slug === newCat);
    const serviceStillValid = cat?.services.some((s) => s.slug === form.service);
    setForm((prev) => ({
      ...prev,
      category: newCat,
      service: serviceStillValid ? prev.service : '',
    }));
    if (errors.category) setErrors((e) => ({ ...e, category: undefined }));
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): boolean {
    const newErrors: Errors = {};
    if (!form.fullName.trim())  newErrors.fullName = t.errors.fullName;
    if (!form.whatsapp.trim())  newErrors.whatsapp = t.errors.whatsapp;
    if (!form.category)         newErrors.category = t.errors.category;
    if (!form.service)          newErrors.service   = t.errors.service;
    if (!form.details.trim())   newErrors.details   = t.errors.details;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) setSubmitted(true);
  }

  const availableServices = categories.find((c) => c.slug === form.category)?.services ?? [];

  if (submitted) {
    return <SuccessScreen t={t} isRtl={isRtl} onReset={() => { setForm(emptyForm); setSubmitted(false); }} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={`space-y-8 ${isRtl ? 'font-arabic' : 'font-sans'}`}>

      {/* ── Section 1: Personal info ──────────────────────────────────────── */}
      <div>
        <SectionHeading text={t.sectionPersonal} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Full name */}
          <div>
            <Label text={t.fullName} required />
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder={t.fullNamePlaceholder}
              className={`${inputCls} ${errors.fullName ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
              aria-required="true"
            />
            {errors.fullName && <p className={errorCls}>{errors.fullName}</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <Label text={t.whatsapp} required />
            <input
              type="tel"
              value={form.whatsapp}
              onChange={(e) => handleChange('whatsapp', e.target.value)}
              placeholder={t.whatsappPlaceholder}
              className={`${inputCls} ${errors.whatsapp ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
              aria-required="true"
            />
            {errors.whatsapp
              ? <p className={errorCls}>{errors.whatsapp}</p>
              : <p className="mt-1.5 text-xs text-gray-400">{t.whatsappHint}</p>
            }
          </div>

          {/* Email */}
          <div>
            <Label text={t.email} />
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder={t.emailPlaceholder}
              className={inputCls}
            />
          </div>

          {/* University */}
          <div>
            <Label text={t.university} />
            <input
              type="text"
              value={form.university}
              onChange={(e) => handleChange('university', e.target.value)}
              placeholder={t.universityPlaceholder}
              className={inputCls}
            />
          </div>

          {/* Degree level */}
          <div>
            <Label text={t.degreeLevel} />
            <select
              value={form.degreeLevel}
              onChange={(e) => handleChange('degreeLevel', e.target.value)}
              className={inputCls}
            >
              <option value="">{t.degreePlaceholder}</option>
              <option value="bachelor">{t.degreeOptions.bachelor}</option>
              <option value="master">{t.degreeOptions.master}</option>
              <option value="phd">{t.degreeOptions.phd}</option>
              <option value="other">{t.degreeOptions.other}</option>
            </select>
          </div>

          {/* Preferred language */}
          <div>
            <Label text={t.preferredLang} />
            <div className={`flex gap-3 mt-1 ${isRtl ? 'flex-row-reverse justify-end' : ''}`}>
              {(['ar', 'en'] as const).map((langOpt) => (
                <label
                  key={langOpt}
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
                    form.preferredLang === langOpt
                      ? 'border-blue-500 bg-blue-50 text-blue-800'
                      : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                  } ${isRtl ? 'flex-row-reverse' : ''}`}
                >
                  <input
                    type="radio"
                    name="preferredLang"
                    value={langOpt}
                    checked={form.preferredLang === langOpt}
                    onChange={() => handleChange('preferredLang', langOpt)}
                    className="accent-blue-600"
                  />
                  {langOpt === 'ar' ? t.langAr : t.langEn}
                </label>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Section 2: Service ────────────────────────────────────────────── */}
      <div>
        <SectionHeading text={t.sectionService} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

          {/* Category */}
          <div>
            <Label text={t.category} required />
            <select
              value={form.category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={`${inputCls} ${errors.category ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
              aria-required="true"
            >
              <option value="">{t.categoryPlaceholder}</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat[lang]}
                </option>
              ))}
            </select>
            {errors.category && <p className={errorCls}>{errors.category}</p>}
          </div>

          {/* Specific service */}
          <div>
            <Label text={t.service} required />
            <select
              value={form.service}
              onChange={(e) => handleChange('service', e.target.value)}
              disabled={!form.category}
              className={`${inputCls} disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed ${errors.service ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
              aria-required="true"
            >
              <option value="">{t.servicePlaceholder}</option>
              {availableServices.map((svc) => (
                <option key={svc.slug} value={svc.slug}>
                  {svc[lang]}
                </option>
              ))}
            </select>
            {errors.service
              ? <p className={errorCls}>{errors.service}</p>
              : !form.category && <p className="mt-1.5 text-xs text-gray-400">{t.serviceHint}</p>
            }
          </div>

        </div>
      </div>

      {/* ── Section 3: Request details ────────────────────────────────────── */}
      <div>
        <SectionHeading text={t.sectionDetails} />
        <div className="space-y-5">

          {/* Details textarea */}
          <div>
            <Label text={t.details} required />
            <textarea
              value={form.details}
              onChange={(e) => handleChange('details', e.target.value)}
              placeholder={t.detailsPlaceholder}
              rows={5}
              className={`${inputCls} resize-y min-h-[120px] ${errors.details ? 'border-red-400 focus:border-red-400 focus:ring-red-100' : ''}`}
              aria-required="true"
            />
            {errors.details
              ? <p className={errorCls}>{errors.details}</p>
              : <p className="mt-1.5 text-xs text-gray-400">{t.detailsHint}</p>
            }
          </div>

          {/* How heard */}
          <div className="max-w-sm">
            <Label text={t.howHeard} />
            <select
              value={form.howHeard}
              onChange={(e) => handleChange('howHeard', e.target.value)}
              className={inputCls}
            >
              <option value="">{t.howHeardPlaceholder}</option>
              {Object.entries(t.howHeardOptions).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* ── Submit ────────────────────────────────────────────────────────── */}
      <div className={`pt-2 flex flex-col sm:flex-row items-start gap-4 ${isRtl ? 'sm:flex-row-reverse sm:items-end' : ''}`}>
        <button
          type="submit"
          className="w-full sm:w-auto px-10 py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-xl transition-colors shadow-sm text-base"
        >
          {t.submit}
        </button>
        <p className={`text-xs text-gray-400 self-center ${isRtl ? 'text-right' : ''}`}>
          <span className="text-red-500">*</span>{' '}{t.required}
        </p>
      </div>

    </form>
  );
}

// ─── Loading skeleton (Suspense fallback) ─────────────────────────────────────

function FormSkeleton() {
  return (
    <div className="animate-pulse space-y-6 py-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-4 w-32 bg-gray-100 rounded" />
          <div className="h-10 bg-gray-100 rounded-xl" />
        </div>
      ))}
      <div className="h-10 w-40 bg-gray-200 rounded-xl" />
    </div>
  );
}

// ─── Info panel icons ─────────────────────────────────────────────────────────

const panelIcons = [
  // WhatsApp
  <svg key="wa" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>,
  // Shield
  <svg key="shield" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // Clipboard check
  <svg key="clip" xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>,
];

// ─── Desktop sidebar panel ────────────────────────────────────────────────────

function InfoPanel() {
  const { lang, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const t = ui[lang];

  return (
    <aside className="hidden lg:flex flex-col gap-4 lg:sticky lg:top-24">

      {/* What happens next */}
      <div className={`bg-blue-950 text-white rounded-2xl p-6 ${isRtl ? 'text-right font-arabic' : 'text-left font-sans'}`}>
        <h3 className="text-sm font-bold text-white mb-5">{t.panelTitle}</h3>
        <ul className="space-y-5">
          {t.panelItems.map((item, i) => (
            <li key={i} className={`flex gap-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className="shrink-0 mt-0.5 text-blue-300">{panelIcons[i]}</div>
              <p className={`text-sm text-blue-200 ${isRtl ? 'leading-7' : 'leading-relaxed'}`}>{item}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Direct contact */}
      <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 ${isRtl ? 'text-right font-arabic' : 'text-left font-sans'}`}>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-4">{t.contactTitle}</h3>
        <div className="space-y-3">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 text-sm font-medium text-green-600 hover:text-green-700 transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
            </svg>
            +962 79 793 0338
          </a>
          <a
            href="mailto:uni.services@hotmail.com"
            className={`flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition-colors ${isRtl ? 'flex-row-reverse' : ''}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            uni.services@hotmail.com
          </a>
        </div>
      </div>

    </aside>
  );
}

// ─── Mobile info strip (shown below header, hidden on desktop) ────────────────

function MobileInfoStrip() {
  const { lang, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const t = ui[lang];

  return (
    <div className={`lg:hidden grid grid-cols-3 gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-4 ${isRtl ? 'font-arabic' : 'font-sans'}`}>
      {t.panelShort.map((label, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5 text-center">
          <div className="text-blue-600">{panelIcons[i]}</div>
          <p className={`text-blue-900 font-medium ${isRtl ? 'text-xs leading-5' : 'text-xs leading-snug'}`}>{label}</p>
        </div>
      ))}
    </div>
  );
}

// ─── Page wrapper ─────────────────────────────────────────────────────────────

function PageHeader() {
  const { lang, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const t = ui[lang];
  return (
    <section className="bg-gradient-to-br from-blue-950 to-blue-800 text-white py-16 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">{t.pageTitle}</h1>
        <p className={`text-blue-200 max-w-xl mx-auto ${isRtl ? 'text-lg leading-8' : 'text-base leading-relaxed'}`}>
          {t.pageSub}
        </p>
      </div>
    </section>
  );
}

export default function RequestPage() {
  return (
    <div>
      <PageHeader />

      <div className="bg-gray-50 py-14 px-4 sm:px-6 lg:px-8 min-h-[60vh]">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-8 items-start">

            {/* Main column: mobile strip + form card */}
            <div className="space-y-5">
              <MobileInfoStrip />
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
                <Suspense fallback={<FormSkeleton />}>
                  <RequestForm />
                </Suspense>
              </div>
            </div>

            {/* Desktop sidebar */}
            <InfoPanel />

          </div>
        </div>
      </div>
    </div>
  );
}
