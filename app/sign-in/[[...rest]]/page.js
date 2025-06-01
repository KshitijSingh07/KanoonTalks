'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectUrl = searchParams.get('redirect_url') || '/';

  return (
    <div className="flex justify-center items-center min-h-screen">
      <SignIn
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
        fallbackRedirectUrl={redirectUrl}
      />
    </div>
  );
}
