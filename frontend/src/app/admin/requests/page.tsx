'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllRequests, type AdminServiceRequest, type RequestStatus } from '@/lib/adminRequests';
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

const CATEGORIES = [
  { slug: 'research-support',         label: 'دعم البحث العلمي',        services: ['research-proposal-support','theoretical-framework-support','literature-review-support','academic-writing-guidance'] },
  { slug: 'proofreading-editing',     label: 'المراجعة والتدقيق',        services: ['proofreading-arabic','proofreading-english','academic-paraphrasing','critical-review'] },
  { slug: 'citation-references',      label: 'التوثيق والمصادر',         services: ['citation-referencing-support','academic-references-sources'] },
  { slug: 'analysis-data',            label: 'التحليل والبيانات',        services: ['statistical-analysis','data-entry'] },
  { slug: 'formatting-publication',   label: 'التنسيق والنشر',           services: ['formatting-academic-content','publication-preparation','similarity-check'] },
  { slug: 'academic-summaries',       label: 'الملخصات الأكاديمية',      services: ['academic-summarizing'] },
  { slug: 'university-project-support', label: 'دعم المشاريع الجامعية', services: ['university-projects','reports-assignments'] },
  { slug: 'degree-level-support',     label: 'دعم مراحل الدراسة',        services: ['bachelor-support','masters-support','phd-support'] },
];

const SERVICE_TO_CATEGORY: Record<string, string> = {};
for (const cat of CATEGORIES) {
  for (const svc of cat.services) SERVICE_TO_CATEGORY[svc] = cat.slug;
}

const STATUS_META: Record<RequestStatus, { label: string; classes: string }> = {
  'new':         { label: 'جديد',          classes: 'bg-amber-100 text-amber-700 border-amber-200' },
  'in-progress': { label: 'قيد المعالجة', classes: 'bg-blue-100 text-blue-700 border-blue-200' },
  'completed':   { label: 'مكتمل',         classes: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  'cancelled':   { label: 'ملغى',          classes: 'bg-gray-100 text-gray-500 border-gray-200' },
};

const STATUS_FILTERS: { value: 'all' | RequestStatus; label: string }[] = [
  { value: 'all',         label: 'الكل' },
  { value: 'new',         label: 'جديد' },
  { value: 'in-progress', label: 'قيد المعالجة' },
  { value: 'completed',   label: 'مكتمل' },
  { value: 'cancelled',   label: 'ملغى' },
];

const DEGREE_LABELS: Record<string, string> = {
  bachelor: 'بكالوريوس',
  master:   'ماجستير',
  phd:      'دكتوراه',
  other:    'أخرى',
};

/* ── helpers ── */

function formatDate(ts: AdminServiceRequest['submittedAt']): string {
  if (!ts) return '—';
  return ts.toDate().toLocaleDateString('ar-JO', { day: '2-digit', month: 'short', year: 'numeric' });
}

function formatService(slug: string): string {
  return SERVICE_NAMES[slug] ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDegree(val: string): string {
  return DEGREE_LABELS[val] ?? val;
}

/* ── page ── */

export default function AdminRequestsPage() {
  const [requests, setRequests]         = useState<AdminServiceRequest[] | null>(null);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState('');
  const [search, setSearch]             = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | RequestStatus>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const router = useRouter();

  const loadRequests = useCallback(() => {
    setLoading(true);
    setError('');
    getAllRequests()
      .then(setRequests)
      .catch(() => setError('تعذّر تحميل الطلبات. تحقق من الاتصال وحاول مرة أخرى.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadRequests(); }, [loadRequests]);

  async function handleLogout() {
    await signOutAdmin();
    router.replace('/admin/login');
  }

  const filtered = useMemo(() => {
    if (!requests) return [];
    const q = search.trim().toLowerCase();
    return requests.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (categoryFilter !== 'all' && SERVICE_TO_CATEGORY[r.service] !== categoryFilter) return false;
      if (q) {
        const match =
          r.fullName.toLowerCase().includes(q) ||
          r.whatsapp.includes(q) ||
          r.email.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [requests, statusFilter, categoryFilter, search]);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">

      {/* ── Top bar ── */}
      <header className="bg-[#0f172a] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/admin/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-white/15 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold leading-tight">مكتب العياصرة</p>
                <p className="text-xs text-blue-300 leading-tight">لوحة الإدارة</p>
              </div>
            </Link>
            <span className="text-white/20 text-lg">/</span>
            <span className="text-sm text-blue-200 font-medium">الطلبات</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-gray-300 hover:text-white border border-white/10 hover:border-white/25 rounded-lg px-3 py-1.5 transition-all"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
            </svg>
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* ── Page hero ── */}
      <div className="bg-gradient-to-l from-[#1e3a5f] to-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-6 py-7 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">إدارة الطلبات</h1>
            <p className="text-blue-200 text-sm mt-0.5">جميع طلبات الخدمة الواردة</p>
          </div>
          {requests && (
            <span className="text-xs font-semibold bg-white/10 border border-white/15 px-3 py-1.5 rounded-full">
              {filtered.length} / {requests.length} طلب
            </span>
          )}
        </div>
      </div>

      {/* ── Main ── */}
      <main className="max-w-7xl mx-auto px-6 py-7 space-y-5">

        {/* ── Filters ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-4">

          {/* Search */}
          <div className="relative">
            <svg className="absolute top-1/2 -translate-y-1/2 right-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="ابحث بالاسم أو رقم الواتساب أو البريد الإلكتروني..."
              className="w-full border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 text-sm bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition placeholder-gray-400"
            />
          </div>

          {/* Status pills + category dropdown */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-1.5">
              {STATUS_FILTERS.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setStatusFilter(f.value)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors ${
                    statusFilter === f.value
                      ? 'bg-[#1e3a5f] text-white border-[#1e3a5f]'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-[#1e3a5f]/40 hover:text-[#1e3a5f]'
                  }`}
                >
                  {f.label}
                  {f.value !== 'all' && requests && (
                    <span className={`mr-1.5 ${statusFilter === f.value ? 'text-blue-200' : 'text-gray-400'}`}>
                      ({requests.filter((r) => r.status === f.value).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs border border-gray-200 rounded-lg px-3 py-1.5 bg-white text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition"
            >
              <option value="all">كل الفئات</option>
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>{c.label}</option>
              ))}
            </select>

            {(search || statusFilter !== 'all' || categoryFilter !== 'all') && (
              <button
                onClick={() => { setSearch(''); setStatusFilter('all'); setCategoryFilter('all'); }}
                className="text-xs text-gray-400 hover:text-red-500 transition-colors"
              >
                مسح الفلاتر ✕
              </button>
            )}
          </div>
        </div>

        {/* ── Loading ── */}
        {loading && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex gap-4 px-5 py-4 border-b border-gray-50 animate-pulse last:border-0">
                <div className="h-4 w-20 bg-gray-100 rounded" />
                <div className="h-4 w-28 bg-gray-100 rounded" />
                <div className="h-4 w-24 bg-gray-100 rounded" />
                <div className="h-4 flex-1 bg-gray-100 rounded" />
                <div className="h-5 w-16 bg-gray-100 rounded-full" />
                <div className="h-4 w-16 bg-gray-100 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {!loading && error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex items-start gap-3 flex-1">
              <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-10.5a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm.75 6.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
              </svg>
              <p className="text-sm text-red-700">{error}</p>
            </div>
            <button onClick={loadRequests} className="text-sm font-semibold text-red-700 hover:text-red-900 border border-red-300 rounded-lg px-4 py-1.5 transition-colors shrink-0">
              إعادة المحاولة
            </button>
          </div>
        )}

        {/* ── Empty ── */}
        {!loading && !error && filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-16 text-center">
            <svg className="w-12 h-12 text-gray-200 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm font-medium text-gray-400">
              {requests?.length === 0 ? 'لا توجد طلبات بعد' : 'لا توجد نتائج تطابق الفلتر الحالي'}
            </p>
            {requests && requests.length > 0 && (
              <button onClick={() => { setSearch(''); setStatusFilter('all'); setCategoryFilter('all'); }} className="mt-3 text-xs text-[#1e3a5f] hover:underline">
                مسح الفلاتر
              </button>
            )}
          </div>
        )}

        {/* ── Desktop table ── */}
        {!loading && !error && filtered.length > 0 && (
          <>
            <div className="hidden lg:block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    <th className="text-right px-5 py-3 font-semibold">التاريخ</th>
                    <th className="text-right px-5 py-3 font-semibold">الاسم</th>
                    <th className="text-right px-5 py-3 font-semibold">واتساب</th>
                    <th className="text-right px-5 py-3 font-semibold">الخدمة</th>
                    <th className="text-right px-5 py-3 font-semibold">المرحلة</th>
                    <th className="text-right px-5 py-3 font-semibold">الحالة</th>
                    <th className="text-center px-5 py-3 font-semibold">تم التواصل</th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filtered.map((req) => {
                    const sm = STATUS_META[req.status] ?? STATUS_META['new'];
                    return (
                      <tr key={req.id} className="hover:bg-gray-50/70 transition-colors">
                        <td className="px-5 py-3.5 text-xs text-gray-400 whitespace-nowrap">{formatDate(req.submittedAt)}</td>
                        <td className="px-5 py-3.5 font-medium text-gray-800 whitespace-nowrap">{req.fullName}</td>
                        <td className="px-5 py-3.5">
                          <a
                            href={`https://wa.me/${req.whatsapp.replace(/\D/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-green-600 hover:text-green-700 hover:underline whitespace-nowrap flex items-center gap-1"
                            dir="ltr"
                          >
                            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                            </svg>
                            {req.whatsapp}
                          </a>
                        </td>
                        <td className="px-5 py-3.5 text-gray-600 max-w-[160px] truncate">{formatService(req.service)}</td>
                        <td className="px-5 py-3.5 text-gray-500 whitespace-nowrap">{formatDegree(req.degreeLevel)}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${sm.classes}`}>
                            {sm.label}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-center">
                          {req.contacted
                            ? <span className="text-emerald-500" title="تم التواصل"><svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></span>
                            : <span className="text-gray-300 text-base">—</span>
                          }
                        </td>
                        <td className="px-5 py-3.5 text-left">
                          <Link
                            href={`/admin/requests/${req.id}`}
                            className="text-xs font-semibold text-[#1e3a5f] hover:bg-[#1e3a5f]/8 px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap"
                          >
                            عرض ←
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ── Mobile cards ── */}
            <div className="lg:hidden space-y-3">
              {filtered.map((req) => {
                const sm = STATUS_META[req.status] ?? STATUS_META['new'];
                return (
                  <div key={req.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">{req.fullName}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{formatDate(req.submittedAt)}</p>
                      </div>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border shrink-0 ${sm.classes}`}>
                        {sm.label}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 text-xs">
                      <div>
                        <p className="text-gray-400 mb-0.5">الخدمة</p>
                        <p className="text-gray-700 font-medium">{formatService(req.service)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 mb-0.5">المرحلة</p>
                        <p className="text-gray-700 font-medium">{formatDegree(req.degreeLevel)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-gray-50">
                      <a
                        href={`https://wa.me/${req.whatsapp.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-medium text-green-600 hover:text-green-700"
                        dir="ltr"
                      >
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                        {req.whatsapp}
                      </a>
                      <Link
                        href={`/admin/requests/${req.id}`}
                        className="text-xs font-semibold text-[#1e3a5f] hover:underline"
                      >
                        عرض التفاصيل ←
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
