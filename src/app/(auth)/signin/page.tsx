import SignInModal from '@/components/auth/SignInModal';

export default function SignInPage() {
  return <SignInModal isOpen={true} onClose={() => window.history.back()} />;
}
