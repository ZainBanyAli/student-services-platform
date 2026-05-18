'use client';

import { use, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  getRequestById,
  updateRequestStatus,
  updateRequestContacted,
  type AdminServiceRequest,
  type RequestStatus,
} from '@/lib/adminRequests';
import { signOutAdmin } from '@/lib/auth';

/* ── constants ── */

const SERVICE_NAMES: Record<string, string> = {
  'research-proposal-support':      'دعم مقترح البحث',
  'theoretical-framework-support':  'دعم الإطار النظري',
  'literature-review-support':      'دعم الدراسات السابقة',
  'academic-writing-guidance':      'إرشاد الكتابة الأكاديمية',
  'proofreading-arabic':            'تدقيق لغوي عربي',
  'proofreading-english':           'تدقيق لغوي إنجليزي',
  'academic-paraphrasing':          'إعادة الصياغة الأكاديمية',
  'critical-review':                'المراجعة النقدية',
  'citation-referencing-support':   'دعم التوثيق والاستشهاد',
  'academic-references-sources':    'توفير المراجع الأكاديمية',
  'statistical-analysis':           'التحليل الإحصائي',
  'data-entry':                     'إدخال البيانات',
  'formatting-academic-content':    'تنسيق المحتوى الأكاديمي',
  'publication-preparation':        'إعداد الأبحاث للنشر',
  'similarity-check':               'فحص نسبة الاقتباس',
  'academic-summarizing':           'تلخيص الأوراق البحثية',
  'university-projects':            'دعم المشاريع الجامعية',
  'reports-assignments':            'إرشاد التقارير والواجبات',
  'bachelor-support':               'دعم طلاب البكالوريوس',
  'masters-support':                'دعم طلاب الماجستير',
  'phd-support':                    'دعم طلاب الدكتوراه',
};

const CATEGORY_NAMES: Record<string, string> = {
  'research-support':           'دعم البحث العلمي',
  'proofreading-editing':       'المراجعة والتدقيق',
  'citation-references':        'التوثيق والمصادر',
  'analysis-data':              'التحليل والبيانات',
  'formatting-publication':     'التنسيق والنشر',
  'academic-summaries':         'الملخصات الأكاديمية',
  'university-project-support': 'دعم المشاريع الجامعية',
  'degree-level-support':       'دعم مراحل الدراسة',
};

const DEGREE_LABELS: Record<string, string> = {
  bachelor: 'بكالوريوس',
  master:   'ماجستير',
  phd:      'دكتوراه',
  other:    'أخرى',
};

const HOW_HEARD_LABELS: Record<string, string> = {
  whatsapp:   'واتساب',
  friend:     'صديق أو زميل',
  search:     'محرك البحث',
  social:     'وسائل التواصل الاجتماعي',
  university: 'الجامعة',
  other:      'أخرى',
};

const LANG_LABELS: Record<string, string> = { ar: 'العربية', en: 'الإنجليزية' };

const STATUS_META: Record<RequestStatus, { label: string; badgeLight: string; badgeDark: string }> = {
  'new':         { label: 'جديد',          badgeLight: 'bg-amber-100 text-amber-700 border-amber-200',   badgeDark: 'bg-amber-400/20 text-amber-200 border-amber-400/30' },
  'in-progress': { label: 'قيد المعالجة', badgeLight: 'bg-blue-100 text-blue-700 border-blue-200',     badgeDark: 'bg-blue-400/20 text-blue-200 border-blue-400/30' },
  'completed':   { label: 'مكتمل',         badgeLight: 'bg-emerald-100 text-emerald-700 border-emerald-200', badgeDark: 'bg-emerald-400/20 text-emerald-200 border-emerald-400/30' },
  'cancelled':   { label: 'ملغى',          badgeLight: 'bg-gray-100 text-gray-500 border-gray-200',     badgeDark: 'bg-white/10 text-gray-300 border-white/20' },
};

const WA_ICON = (
  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

/* ── sub-components ── */

function SectionCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <span className="text-[#1e3a5f]">{icon}</span>
        <h2 className="text-sm font-semibold text-gray-700">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-400 shrink-0 min-w-[100px]">{label}</span>
      <span className="text-sm text-gray-800 font-medium text-start">{value || <span className="text-gray-300">—</span>}</span>
    </div>
  );
}

/* ── page ── */

export default function RequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const [request, setRequest]               = useState<AdminServiceRequest | null>(null);
  const [loading, setLoading]               = useState(true);
  const [error, setError]                   = useState('');
  const [localStatus, setLocalStatus]       = useState<RequestStatus>('new');
  const [localContacted, setLocalContacted] = useState(false);
  const [saving, setSaving]                 = useState(false);
  const [saveSuccess, setSaveSuccess]       = useState(false);
  const [saveError, setSaveError]           = useState('');

  useEffect(() => {
    getRequestById(id)
      .then((req) => {
        if (!req) { setError('الطلب غير موجود.'); return; }
        setRequest(req);
        setLocalStatus(req.status);
        setLocalContacted(req.contacted);
      })
      .catch(() => setError('تعذّر تحميل الطلب. يرجى المحاولة مرة أخرى.'))
      .finally(() => setLoading(false));
  }, [id]);

  const isDirty = request
    ? localStatus !== request.status || localContacted !== request.contacted
    : false;

  async function handleSave() {
    if (!request || !isDirty) return;
    setSaving(true);
    setSaveError('');
    setSaveSuccess(false);
    try {
      if (localStatus !== request.status)    await updateRequestStatus(id, localStatus);
      if (localContacted !== request.contacted) await updateRequestContacted(id, localContacted);
      setRequest((r) => r ? { ...r, status: localStatus, contacted: localContacted } : r);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch {
      setSaveError('حدث خطأ أثناء الحفظ. يرجى المحاولة مرة أخرى.');
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await signOutAdmin();
    router.replace('/admin/login');
  }

  const statusMeta = request ? STATUS_META[request.status] : null;
  const waHref = request ? `https://wa.me/${request.whatsapp.replace(/\D/g, '')}` : '#';

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">

      {/* ── Top bar ── */}
      <header className="bg-[#0f172a] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <nav className="flex items-center gap-1.5 text-sm">
            <Link href="/admin/dashboard" className="text-blue-300 hover:text-white transition-colors">مكتب العياصرة</Link>
            <span className="text-white/20 mx-0.5">/</span>
            <Link href="/admin/requests" className="text-blue-300 hover:text-white transition-colors">الطلبات</Link>
            <span className="text-white/20 mx-0.5">/</span>
            <span className="text-white/50 font-mono text-xs truncate max-w-[120px]">{id.slice(0, 10)}…</span>
          </nav>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-gray-300 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-3 py-1.5 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-l from-[#1e3a5f] to-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            href="/admin/requests"
            className="inline-flex items-center gap-1.5 text-xs text-blue-300 hover:text-white transition-colors mb-4"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            العودة إلى قائمة الطلبات
          </Link>

          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                {loading ? '…' : (request?.fullName ?? 'طلب غير موجود')}
              </h1>
              {request && (
                <p className="text-blue-300 text-sm mt-1 flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {request.submittedAt
                    ? request.submittedAt.toDate().toLocaleDateString('ar-JO', { day: '2-digit', month: 'long', year: 'numeric' })
                    : '—'}
                </p>
              )}
            </div>
            {statusMeta && (
              <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${statusMeta.badgeDark}`}>
                {statusMeta.label}
              </span>
            )}
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 py-7">

        {/* ── Loading ── */}
        {loading && (
          <div className="flex items-center justify-center py-24">
            <span className="w-7 h-7 border-2 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-5 py-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-10.5a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm.75 6.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* ── Content ── */}
        {!loading && !error && request && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_288px] gap-6 items-start">

            {/* ── Left: detail cards ── */}
            <div className="space-y-4">

              {/* Student info */}
              <SectionCard
                title="بيانات الطالب"
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>}
              >
                <Row label="الاسم الكامل" value={request.fullName} />
                <Row label="واتساب" value={
                  <a href={waHref} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-green-600 hover:text-green-700 hover:underline" dir="ltr">
                    {WA_ICON}{request.whatsapp}
                  </a>
                } />
                <Row label="البريد الإلكتروني" value={request.email || undefined} />
                <Row label="الجامعة" value={request.university || undefined} />
                <Row label="المرحلة الدراسية" value={DEGREE_LABELS[request.degreeLevel] ?? request.degreeLevel} />
                <Row label="لغة التواصل" value={LANG_LABELS[request.preferredLang] ?? request.preferredLang} />
              </SectionCard>

              {/* Service */}
              <SectionCard
                title="الخدمة المطلوبة"
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
              >
                <Row label="الفئة" value={CATEGORY_NAMES[request.category] ?? request.category} />
                <Row label="الخدمة" value={SERVICE_NAMES[request.service] ?? request.service} />
              </SectionCard>

              {/* Request description */}
              <SectionCard
                title="وصف الطلب"
                icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10" /></svg>}
              >
                <p className="text-sm text-gray-800 leading-8 whitespace-pre-wrap bg-blue-50/40 border border-blue-100 rounded-xl p-4">
                  {request.details}
                </p>
                {request.howHeard && (
                  <div className="mt-4 pt-4 border-t border-gray-50">
                    <Row label="كيف سمع عنا" value={HOW_HEARD_LABELS[request.howHeard] ?? request.howHeard} />
                  </div>
                )}
              </SectionCard>

            </div>

            {/* ── Right: action panel ── */}
            <div className="space-y-4 lg:sticky lg:top-6">

              {/* Update card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
                  <svg className="w-4 h-4 text-[#1e3a5f]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <h2 className="text-sm font-semibold text-gray-700">تحديث الطلب</h2>
                </div>

                <div className="p-5 space-y-4">
                  {/* Status */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 mb-2">حالة الطلب</label>
                    <select
                      value={localStatus}
                      onChange={(e) => setLocalStatus(e.target.value as RequestStatus)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition"
                    >
                      <option value="new">🟡 جديد</option>
                      <option value="in-progress">🔵 قيد المعالجة</option>
                      <option value="completed">🟢 مكتمل</option>
                      <option value="cancelled">⚫ ملغى</option>
                    </select>
                  </div>

                  {/* Contacted toggle row */}
                  <label className={`flex items-center justify-between gap-3 cursor-pointer select-none rounded-xl border px-4 py-3 transition-colors ${
                    localContacted
                      ? 'bg-emerald-50 border-emerald-200'
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                  }`}>
                    <span className={`text-sm font-medium ${localContacted ? 'text-emerald-700' : 'text-gray-600'}`}>
                      تم التواصل مع الطالب
                    </span>
                    <input
                      type="checkbox"
                      checked={localContacted}
                      onChange={(e) => setLocalContacted(e.target.checked)}
                      className="w-4 h-4 rounded accent-emerald-600 cursor-pointer shrink-0"
                    />
                  </label>

                  {/* Feedback */}
                  {saveSuccess && (
                    <div className="flex items-center gap-2 text-sm text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2.5">
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      تم الحفظ بنجاح
                    </div>
                  )}
                  {saveError && (
                    <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-xl px-3 py-2.5">{saveError}</p>
                  )}

                  {/* Save button */}
                  <button
                    onClick={handleSave}
                    disabled={!isDirty || saving}
                    className={`w-full flex items-center justify-center gap-2 text-sm font-semibold py-2.5 rounded-xl transition-all ${
                      isDirty
                        ? 'bg-[#1e3a5f] hover:bg-[#162d4a] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-400 cursor-default'
                    }`}
                  >
                    {saving ? (
                      <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />جارٍ الحفظ...</>
                    ) : isDirty ? 'حفظ التغييرات' : 'لا توجد تغييرات'}
                  </button>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full bg-green-500 hover:bg-green-600 text-white text-sm font-semibold py-3 rounded-xl transition-colors shadow-sm"
              >
                {WA_ICON}
                تواصل عبر واتساب
              </a>

              {/* Meta */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-2 text-xs text-gray-400">
                <div className="flex justify-between items-center">
                  <span>رقم الطلب</span>
                  <span className="font-mono text-gray-300">{id.slice(0, 10)}…</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>تاريخ الإرسال</span>
                  <span className="text-gray-500">
                    {request.submittedAt ? request.submittedAt.toDate().toLocaleDateString('ar-JO') : '—'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>لغة الطلب</span>
                  <span className="text-gray-500">{LANG_LABELS[request.lang] ?? request.lang}</span>
                </div>
              </div>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}
