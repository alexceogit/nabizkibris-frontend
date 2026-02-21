'use client';

import SignInModal from '@/components/auth/SignInModal';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleClose = () => {
    router.back();
  };

  return <SignInModal isOpen={true} onClose={handleClose} />;
}
