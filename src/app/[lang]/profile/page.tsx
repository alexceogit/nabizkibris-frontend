'use client';

import dynamic from 'next/dynamic';

const UserProfile = dynamic(
  () => import('@/components/auth/UserProfile'),
  { ssr: false, loading: () => <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
    <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
  </div> }
);

export default function ProfilePage() {
  return <UserProfile />;
}
