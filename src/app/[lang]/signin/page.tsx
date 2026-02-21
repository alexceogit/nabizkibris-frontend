'use client';

import { Suspense } from 'react';
import SignInModal from '@/components/auth/SignInModal';
import { useRouter } from 'next/navigation';

function SignInContent() {
  const router = useRouter();
  
  const handleClose = () => {
    router.back();
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
