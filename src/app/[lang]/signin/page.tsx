'use client';

import { Suspense } from 'react';
import SignInModal from '@/components/auth/SignInModal';
import { useRouter, useSearchParams } from 'next/navigation';

function SignInContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleClose = () => {
    // Redirect to profile after close
    router.push('/tr/profile');
  };

  return <SignInModal isOpen={true} onClose={handleClose} />;
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    }>
      <SignInContent />
    </Suspense>
  );
}
