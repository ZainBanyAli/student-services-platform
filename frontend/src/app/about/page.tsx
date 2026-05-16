'use client';

import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const WHATSAPP_URL = 'https://wa.me/962797930338';

// ─── Bilingual content ────────────────────────────────────────────────────────

const content = {
  ar: {
    pageTitle: 'من نحن',
    pageSub: 'مكتب أكاديمي متخصص يدعم مسيرتك العلمية بثقة واحترافية',

    about: {
      label: 'عن المكتب',
      heading: 'مكتب العياصرة للخدمات الطلابية',
      body: [
        'مكتب العياصرة للخدمات الطلابية هو مكتب أكاديمي متخصص يقدم دعماً علمياً واستشارياً للطلاب في مراحل البكالوريوس والماجستير والدكتوراه في الأردن والعالم العربي.',
        'تأسس المكتب لسد الفجوة بين الطالب والمتطلبات الأكاديمية الاحترافية، وتزويده بالإرشاد والدعم اللازمين لإنجاز مسيرته البحثية بثقة ودون عقبات.',
        'يعمل المكتب على تقديم خدمات أكاديمية متكاملة تشمل المراجعة اللغوية والتدقيق والتنسيق والتحليل الإحصائي والإرشاد البحثي وتوثيق المصادر، باللغتين العربية والإنجليزية.',
      ],
    },

    mission: {
      label: 'مهمتنا',
      heading: 'تمكين الطلاب من تحقيق أهدافهم الأكاديمية',
      body: 'نؤمن بأن كل طالب يستحق الحصول على الدعم الأكاديمي المتخصص الذي يمكّنه من التميز في مسيرته العلمية. مهمتنا هي تقديم دعم موثوق ومتخصص في مجالات المراجعة اللغوية والتدقيق والتنسيق والتحليل الإحصائي والإرشاد البحثي وتوثيق المصادر — كل ذلك بأعلى معايير الجودة والأمانة الأكاديمية.',
    },

    serve: {
      label: 'من نخدم',
      heading: 'ندعم الطلاب في كل المراحل الأكاديمية',
      sub: 'خدماتنا مصممة لتلبية احتياجات الطلاب في مختلف المراحل الدراسية',
      groups: [
        {
          title: 'طلاب البكالوريوس',
          desc: 'ندعم طلاب البكالوريوس في مشاريعهم الجامعية وتقاريرهم وواجباتهم الأكاديمية، ونرشدهم عبر متطلبات الكتابة والبحث الأكاديمي بأسلوب واضح وعملي.',
          icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
        },
        {
          title: 'طلاب الماجستير',
          desc: 'نقدم دعماً متخصصاً لطلاب الماجستير في رسائلهم وأبحاثهم — من التدقيق اللغوي والتنسيق حتى التحليل الإحصائي وتوثيق المصادر — لضمان جودة أعلى في عملهم الأكاديمي.',
          icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
        },
        {
          title: 'طلاب الدكتوراه',
          desc: 'نرافق طلاب الدكتوراه في مسيرتهم البحثية المتقدمة، ونقدم دعماً رفيع المستوى في الأطروحات والكتابة الأكاديمية والإعداد للنشر في المجلات العلمية المحكّمة.',
          icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
        },
        {
          title: 'الباحثون',
          desc: 'ندعم الباحثين في تحسين جودة أبحاثهم وتهيئتها للنشر في المجلات والمؤتمرات الأكاديمية، بما في ذلك المراجعة النقدية وفحص نسبة التشابه والتنسيق وفق متطلبات النشر.',
          icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        },
      ],
    },

    different: {
      label: 'ما يميزنا',
      heading: 'لماذا يثق بنا الطلاب؟',
      sub: 'نجمع بين الخبرة الأكاديمية والالتزام المهني في كل خدمة نقدمها',
      items: [
        {
          title: 'فريق أكاديمي متخصص',
          desc: 'فريقنا مكوّن من متخصصين أكاديميين ذوي خبرة في مجالات البحث العلمي والكتابة الأكاديمية والتحليل الإحصائي.',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
        },
        {
          title: 'سرية تامة',
          desc: 'نضمن الحفاظ على خصوصية جميع بيانات الطلاب ومعلوماتهم الأكاديمية بشكل كامل وفق أعلى معايير السرية.',
          icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        },
        {
          title: 'دعم عربي وإنجليزي',
          desc: 'نقدم جميع خدماتنا باللغتين العربية والإنجليزية بكفاءة متساوية، لنخدم أوسع شريحة من الطلاب.',
          icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
        },
        {
          title: 'الالتزام بالمواعيد',
          desc: 'نحترم وقت الطالب ونلتزم بالمواعيد المتفق عليها دون تأخير، لأننا ندرك أهمية المواعيد النهائية الأكاديمية.',
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
          title: 'تواصل واضح وفعّال',
          desc: 'يتواصل فريقنا مع الطلاب عبر واتساب والبريد الإلكتروني بشكل مباشر وسريع، لضمان تجربة سلسة ومريحة.',
          icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
        },
      ],
    },

    ethics: {
      heading: 'التزامنا بالأمانة الأكاديمية',
      body: 'يلتزم مكتب العياصرة بتقديم خدمات الدعم الأكاديمي المشروع فقط. تشمل خدماتنا: الإرشاد والمراجعة والتدقيق اللغوي والتنسيق والتحليل الإحصائي والاستشارة البحثية وتوثيق المصادر. لا نقوم بإنجاز الأعمال الأكاديمية نيابةً عن الطالب. نؤمن بدعم الطالب وتمكينه في مسيرته التعليمية باحترافية وأخلاقية عالية.',
    },

    cta: {
      heading: 'هل أنت مستعد للحصول على الدعم الذي تحتاجه؟',
      sub: 'تواصل معنا الآن وسيتولى فريقنا المتخصص مساعدتك في أقرب وقت',
      primary: 'اطلب خدمة الآن',
      whatsapp: 'تواصل عبر واتساب',
    },
  },

  en: {
    pageTitle: 'About Us',
    pageSub: 'A specialized academic office supporting your scholarly journey with confidence and professionalism',

    about: {
      label: 'About the Office',
      heading: 'Al-Ayasrah Academic Services Office',
      body: [
        "Al-Ayasrah Academic Services Office is a specialized academic consulting office providing scholarly support and guidance to undergraduate, master's, and PhD students across Jordan and the Arab world.",
        'We were established to bridge the gap between students and the demands of professional academic work, equipping them with the guidance and support they need to navigate their academic journey with confidence.',
        'The office delivers comprehensive academic services including language review, proofreading, formatting, statistical analysis, research guidance, and citation support — in both Arabic and English.',
      ],
    },

    mission: {
      label: 'Our Mission',
      heading: 'Empowering Students to Achieve Their Academic Goals',
      body: "We believe every student deserves access to the specialized academic support that enables them to excel in their scholarly journey. Our mission is to deliver reliable, expert support in language review, proofreading, formatting, statistical analysis, research guidance, and citation — all held to the highest standards of quality and academic integrity.",
    },

    serve: {
      label: 'Who We Serve',
      heading: 'Supporting Students at Every Academic Level',
      sub: 'Our services are designed to meet the needs of students across all degree levels',
      groups: [
        {
          title: "Bachelor's Students",
          desc: "We support bachelor's students with their university projects, reports, and academic assignments, guiding them through the requirements of academic writing and research in a clear and practical way.",
          icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
        },
        {
          title: "Master's Students",
          desc: "We provide specialized support for master's students in their theses and research — from language review and formatting to statistical analysis and citation support — ensuring higher quality in their academic work.",
          icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10',
        },
        {
          title: 'PhD Students',
          desc: 'We accompany PhD students throughout their advanced research journey, providing high-level support in dissertations, academic writing, and preparation for publication in peer-reviewed academic journals.',
          icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
        },
        {
          title: 'Researchers',
          desc: 'We support researchers in improving the quality of their work and preparing it for publication in academic journals and conferences — including critical review, similarity checking, formatting, and meeting publication requirements.',
          icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
        },
      ],
    },

    different: {
      label: 'What Sets Us Apart',
      heading: 'Why Students Trust Us',
      sub: 'We combine academic expertise with professional commitment in every service we deliver',
      items: [
        {
          title: 'Specialized Academic Team',
          desc: 'Our team consists of academic specialists with deep experience in research, academic writing, and statistical analysis across multiple disciplines.',
          icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
        },
        {
          title: 'Full Confidentiality',
          desc: "We guarantee the complete privacy of all student data and academic information, maintained to the highest confidentiality standards.",
          icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
        },
        {
          title: 'Arabic & English Support',
          desc: 'We deliver all services in both Arabic and English with equal quality, serving the broadest range of students effectively.',
          icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
        },
        {
          title: 'Commitment to Deadlines',
          desc: "We respect the student's time and honor every agreed deadline without delay — because we understand how critical academic deadlines are.",
          icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
        },
        {
          title: 'Clear & Direct Communication',
          desc: 'Our team communicates with students directly and promptly via WhatsApp and email, ensuring a smooth and comfortable experience from start to finish.',
          icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
        },
      ],
    },

    ethics: {
      heading: 'Our Commitment to Academic Integrity',
      body: 'Al-Ayasrah Academic Services Office is committed to providing legitimate academic support services only. Our services include: guidance, review, proofreading, formatting, statistical analysis, research consultation, and citation support. We do not complete academic work on behalf of students. We believe in supporting and empowering students throughout their educational journey with the highest standards of professionalism and integrity.',
    },

    cta: {
      heading: 'Ready to Get the Support You Need?',
      sub: 'Contact us now and our specialized team will be ready to assist you as soon as possible',
      primary: 'Request a Service Now',
      whatsapp: 'Contact on WhatsApp',
    },
  },
};

// ─── Icon helper ─────────────────────────────────────────────────────────────

function Icon({ path, className = 'h-6 w-6' }: { path: string; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

// ─── Section label ────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <span className="inline-block text-xs font-semibold uppercase tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full mb-4">
      {text}
    </span>
  );
}

// ─── WhatsApp icon ────────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ─── Page component ───────────────────────────────────────────────────────────

export default function AboutPage() {
  const { lang, dir } = useLanguage();
  const isRtl = dir === 'rtl';
  const c = content[lang];
  const textAlign = isRtl ? 'text-right' : 'text-left';
  const bodyText = isRtl ? 'text-base leading-8 text-gray-600' : 'text-base leading-relaxed text-gray-600';

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

      {/* ── About the office ────────────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center`}>

            {/* Text */}
            <div className={textAlign}>
              <SectionLabel text={c.about.label} />
              <h2 className={`text-3xl font-bold text-blue-950 mb-6 ${isRtl ? 'leading-relaxed' : 'leading-snug'}`}>
                {c.about.heading}
              </h2>
              <div className="space-y-4">
                {c.about.body.map((para, i) => (
                  <p key={i} className={bodyText}>{para}</p>
                ))}
              </div>
            </div>

            {/* Decorative stat/info block */}
            <div className={`grid grid-cols-2 gap-4`}>
              {[
                { num: '٨', numEn: '8', label: isRtl ? 'فئات خدمية' : 'Service Categories' },
                { num: '٢١', numEn: '21', label: isRtl ? 'خدمة أكاديمية' : 'Academic Services' },
                { num: '٣', numEn: '3', label: isRtl ? 'مراحل دراسية' : 'Degree Levels' },
                { num: '٢', numEn: '2', label: isRtl ? 'لغات عمل' : 'Working Languages' },
              ].map((stat, i) => (
                <div key={i} className={`bg-blue-50 rounded-2xl p-6 ${textAlign}`}>
                  <div className="text-4xl font-bold text-blue-800 mb-1">
                    {isRtl ? stat.num : stat.numEn}
                  </div>
                  <div className="text-sm font-medium text-blue-600">{stat.label}</div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Mission ─────────────────────────────────────────────────────────── */}
      <section className="bg-blue-950 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionLabel text={c.mission.label} />
          <h2 className={`text-3xl font-bold text-white mb-6 ${isRtl ? 'leading-relaxed' : 'leading-snug'}`}>
            {c.mission.heading}
          </h2>
          <p className={`text-blue-200 ${isRtl ? 'text-lg leading-8' : 'text-base leading-relaxed'}`}>
            {c.mission.body}
          </p>
        </div>
      </section>

      {/* ── Who we serve ────────────────────────────────────────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel text={c.serve.label} />
            <h2 className={`text-3xl font-bold text-blue-950 mb-3 ${isRtl ? 'leading-relaxed' : ''}`}>
              {c.serve.heading}
            </h2>
            <p className={`text-gray-500 max-w-xl mx-auto ${isRtl ? 'text-base leading-7' : 'text-sm leading-relaxed'}`}>
              {c.serve.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {c.serve.groups.map((group, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 border border-gray-100 shadow-sm ${textAlign}`}>
                <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center mb-4">
                  <Icon path={group.icon} />
                </div>
                <h3 className={`font-bold text-blue-950 mb-2 ${isRtl ? 'text-base leading-relaxed' : 'text-base leading-snug'}`}>
                  {group.title}
                </h3>
                <p className={isRtl ? 'text-sm leading-7 text-gray-500' : 'text-sm leading-relaxed text-gray-500'}>
                  {group.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What makes us different ─────────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <SectionLabel text={c.different.label} />
            <h2 className={`text-3xl font-bold text-blue-950 mb-3 ${isRtl ? 'leading-relaxed' : ''}`}>
              {c.different.heading}
            </h2>
            <p className={`text-gray-500 max-w-xl mx-auto ${isRtl ? 'text-base leading-7' : 'text-sm leading-relaxed'}`}>
              {c.different.sub}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {c.different.items.map((item, i) => (
              <div key={i} className={`flex gap-4 p-6 rounded-2xl bg-blue-50 border border-blue-100 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
                <div className="shrink-0 mt-0.5 text-blue-700">
                  <Icon path={item.icon} className="h-6 w-6" />
                </div>
                <div>
                  <h3 className={`font-bold text-blue-950 mb-1 ${isRtl ? 'text-base leading-relaxed' : 'text-base'}`}>
                    {item.title}
                  </h3>
                  <p className={isRtl ? 'text-sm leading-7 text-gray-600' : 'text-sm leading-relaxed text-gray-600'}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ethical academic support note ───────────────────────────────────── */}
      <section className="bg-gray-50 py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex gap-5 bg-white border border-blue-100 rounded-2xl p-7 shadow-sm ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
            <div className="shrink-0 mt-1 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className={`font-bold text-blue-950 mb-2 ${isRtl ? 'text-base leading-relaxed' : 'text-base'}`}>
                {c.ethics.heading}
              </h3>
              <p className={isRtl ? 'text-sm leading-7 text-gray-600' : 'text-sm leading-relaxed text-gray-600'}>
                {c.ethics.body}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold text-blue-950 mb-4 ${isRtl ? 'leading-relaxed' : 'leading-tight'}`}>
            {c.cta.heading}
          </h2>
          <p className={`text-gray-500 mb-10 max-w-xl mx-auto ${isRtl ? 'text-base leading-7' : 'text-sm leading-relaxed'}`}>
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
              {c.cta.whatsapp}
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
