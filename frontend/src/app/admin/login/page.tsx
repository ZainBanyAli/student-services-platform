'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { signInAdmin } from '@/lib/auth';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInAdmin(email, password);
      router.replace('/admin/dashboard');
    } catch {
      setError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#0f172a] px-4" dir="rtl">

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">

        {/* Card header */}
        <div className="bg-gradient-to-l from-[#1e3a5f] to-[#0f172a] px-8 py-7 text-center">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 border border-white/20 mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c-4.97 0-9 4.03-9 9v2a2 2 0 002 2h1v-4H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-1v4h1a2 2 0 002-2v-2c0-4.97-4.03-9-9-9z" />
              <rect x="9" y="13" width="6" height="6" rx="1" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 className="text-white text-xl font-bold tracking-wide">لوحة الإدارة</h1>
          <p className="text-blue-200 text-sm mt-1">مكتب العياصرة للخدمات الطلابية</p>
        </div>

        {/* Card body */}
        <div className="px-8 py-8">
          <p className="text-gray-500 text-sm text-center mb-6">
            أدخل بيانات الدخول للوصول إلى لوحة التحكم
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                dir="ltr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-left bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition placeholder-gray-400"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                كلمة المرور
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                dir="ltr"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-left bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#1e3a5f] focus:border-transparent transition placeholder-gray-400"
              />
            </div>

            {error && (
              <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                <svg className="w-4 h-4 text-red-500 mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-10.5a.75.75 0 011.5 0v3.5a.75.75 0 01-1.5 0v-3.5zm.75 6.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-[#1e3a5f] hover:bg-[#162d4a] disabled:opacity-60 text-white text-sm font-semibold rounded-xl py-3 transition-colors shadow-md"
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جارٍ التحقق...
                </>
              ) : (
                'تسجيل الدخول'
              )}
            </button>
          </form>

          <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m0 0v2m0-2h2m-2 0H10m9-6V9a7 7 0 10-14 0v2" />
            </svg>
            وصول مصرح به فقط — Authorized access only
          </p>
        </div>
      </div>
    </div>
  );
}
