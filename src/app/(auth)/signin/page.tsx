'use client';

import SignInModal from '@/components/auth/SignInModal';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return <SignInModal isOpen={true} onClose={handleClose} />;
}
