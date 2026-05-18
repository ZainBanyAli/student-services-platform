'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { onAdminAuthStateChanged } from '@/lib/auth';
import type { User } from 'firebase/auth';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAdminAuthStateChanged((u) => {
      setUser(u);
      if (u === null && pathname !== '/admin/login') {
        router.replace('/admin/login');
      }
      if (u !== null && pathname === '/admin/login') {
        router.replace('/admin/dashboard');
      }
    });
    return unsubscribe;
  }, [pathname, router]);

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user === null && pathname !== '/admin/login') {
    return null;
  }

  if (user !== null && pathname === '/admin/login') {
    return null;
  }

  return <div className="min-h-screen bg-gray-50">{children}</div>;
}
