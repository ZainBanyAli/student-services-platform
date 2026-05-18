'use client';

import { signOutAdmin } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
  const router = useRouter();

  async function handleLogout() {
    await signOutAdmin();
    router.replace('/admin/login');
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-gray-600 text-sm">لوحة التحكم — قريباً</p>
      <button
        onClick={handleLogout}
        className="text-sm text-red-600 hover:underline"
      >
        تسجيل الخروج
      </button>
    </div>
  );
}
