'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getAllRequests, type AdminServiceRequest, type RequestStatus } from '@/lib/adminRequests';
import { signOutAdmin } from '@/lib/auth';

/* ── helpers ── */

type Stats = { total: number; new: number; inProgress: number; completed: number };

function computeStats(requests: AdminServiceRequest[]): Stats {
  return {
    total: requests.length,
    new: requests.filter((r) => r.status === 'new').length,
    inProgress: requests.filter((r) => r.status === 'in-progress').length,
    completed: requests.filter((r) => r.status === 'completed').length,
  };
}

function formatDate(ts: AdminServiceRequest['submittedAt']): string {
  if (!ts) return '—';
  return ts.toDate().toLocaleDateString('ar-JO', { day: '2-digit', month: 'short', year: 'numeric' });
}

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

function formatServiceName(slug: string): string {
  if (SERVICE_NAMES[slug]) return SERVICE_NAMES[slug];
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

const STATUS_META: Record<RequestStatus, { label: string; classes: string }> = {
  'new':         { label: 'جديد',          classes: 'bg-amber-100 text-amber-700 border-amber-200' },
  'in-progress': { label: 'قيد المعالجة', classes: 'bg-blue-100 text-blue-700 border-blue-200' },
  'completed':   { label: 'مكتمل',         classes: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  'cancelled':   { label: 'ملغى',          classes: 'bg-gray-100 text-gray-600 border-gray-200' },
};

/* ── sub-components ── */

function StatCard({
  value, label, sublabel, accentClass, iconBgClass, icon,
}: {
  value: number; label: string; sublabel: string;
  accentClass: string; iconBgClass: string; icon: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-3">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBgClass}`}>
        {icon}
      </div>
      <div>
        <p className={`text-3xl font-bold ${accentClass}`}>{value}</p>
        <p className="text-sm font-semibold text-gray-700 mt-0.5">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
      </div>
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 animate-pulse">
      <div className="w-11 h-11 rounded-xl bg-gray-100 mb-3" />
      <div className="h-8 w-16 bg-gray-100 rounded mb-2" />
      <div className="h-3.5 w-24 bg-gray-100 rounded mb-1.5" />
      <div className="h-3 w-16 bg-gray-100 rounded" />
    </div>
  );
}

function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 animate-pulse">
      <div className="h-4 w-32 bg-gray-100 rounded" />
      <div className="h-4 w-24 bg-gray-100 rounded flex-1" />
      <div className="h-5 w-20 bg-gray-100 rounded-full" />
      <div className="h-4 w-20 bg-gray-100 rounded" />
    </div>
  );
}

/* ── page ── */

export default function AdminDashboardPage() {
  const [requests, setRequests] = useState<AdminServiceRequest[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  const loadRequests = useCallback(() => {
    setLoading(true);
    setError('');
    getAllRequests()
      .then(setRequests)
      .catch(() => setError('تعذّر تحميل البيانات. تحقق من الاتصال وحاول مرة أخرى.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { loadRequests(); }, [loadRequests]);

  async function handleLogout() {
    await signOutAdmin();
    router.replace('/admin/login');
  }

  const stats = requests ? computeStats(requests) : null;
  const recent = requests ? requests.slice(0, 3) : [];

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">

      {/* ── Top bar ── */}
      <header className="bg-[#0f172a] text-white shadow-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
        <div className="max-w-6xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold">لوحة التحكم</h1>
          <p className="text-blue-200 text-sm mt-1">نظرة عامة على طلبات الخدمة الواردة — Dashboard Overview</p>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">

        {/* Stat cards */}
        <section>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">إحصائيات الطلبات</h2>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl px-6 py-5 flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <svg className="w-5 h-5 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-10.5a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm.75 6.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
              <button
                onClick={loadRequests}
                className="text-sm font-semibold text-red-700 hover:text-red-900 border border-red-300 rounded-lg px-4 py-1.5 transition-colors shrink-0"
              >
                إعادة المحاولة
              </button>
            </div>
          ) : stats ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard value={stats.total}      label="إجمالي الطلبات" sublabel="Total Requests" accentClass="text-[#1e3a5f]" iconBgClass="bg-[#1e3a5f]/10" icon={<svg className="w-5 h-5 text-[#1e3a5f]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2z" /></svg>} />
              <StatCard value={stats.new}        label="طلبات جديدة"    sublabel="New — Pending Review" accentClass="text-amber-600" iconBgClass="bg-amber-50" icon={<svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>} />
              <StatCard value={stats.inProgress} label="قيد المعالجة"   sublabel="In Progress" accentClass="text-blue-600" iconBgClass="bg-blue-50" icon={<svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
              <StatCard value={stats.completed}  label="مكتملة"          sublabel="Completed" accentClass="text-emerald-600" iconBgClass="bg-emerald-50" icon={<svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
            </div>
          ) : null}
        </section>

        {/* Recent requests */}
        {!error && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">آخر الطلبات الواردة</h2>
              <Link
                href="/admin/requests"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1e3a5f] bg-[#1e3a5f]/8 hover:bg-[#1e3a5f]/15 px-3 py-1.5 rounded-lg transition-colors"
              >
                عرض الكل
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">

              {/* Table header */}
              <div className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                <span>الاسم</span>
                <span>الخدمة</span>
                <span>الحالة</span>
                <span>التاريخ</span>
              </div>

              {loading ? (
                <div className="divide-y divide-gray-50">
                  {[...Array(3)].map((_, i) => <SkeletonRow key={i} />)}
                </div>
              ) : recent.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-14 text-center">
                  <svg className="w-10 h-10 text-gray-200 mb-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 4H7a2 2 0 01-2-2V6a2 2 0 012-2h5l2 2h3a2 2 0 012 2v12a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm font-medium text-gray-400">لا توجد طلبات بعد</p>
                  <p className="text-xs text-gray-300 mt-1">ستظهر الطلبات هنا فور ورودها</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-50">
                  {recent.map((req) => {
                    const statusMeta = STATUS_META[req.status] ?? STATUS_META['new'];
                    return (
                      <div key={req.id} className="grid grid-cols-[1fr_1fr_auto_auto] gap-4 items-center px-5 py-4 hover:bg-gray-50 transition-colors">
                        <p className="text-sm font-medium text-gray-800 truncate">{req.fullName}</p>
                        <p className="text-sm text-gray-500 truncate">{formatServiceName(req.service)}</p>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusMeta.classes}`}>
                          {statusMeta.label}
                        </span>
                        <p className="text-xs text-gray-400 whitespace-nowrap">{formatDate(req.submittedAt)}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        )}

        {/* CTA */}
        {!loading && !error && (
          <div className="flex justify-start">
            <Link
              href="/admin/requests"
              className="inline-flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#162d4a] text-white text-sm font-semibold px-6 py-3 rounded-xl shadow-md transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h10" />
              </svg>
              إدارة جميع الطلبات
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
