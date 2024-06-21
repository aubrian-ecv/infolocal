'use client';

import { Credenza, CredenzaBody, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle } from '@/components/ui/credenza';
import { usePathname, useRouter } from 'next/navigation';
import { SignInCredentialsForm } from '../../../auth/signin/SignInCredentialsForm';

export function SignInDialog() {

  const router = useRouter();
  const path = usePathname();

  return (
    <Credenza
      open={path.includes("/auth/signin")}
      onOpenChange={(open: boolean) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Login</CredenzaTitle>
          <CredenzaDescription>
            A responsive modal component for shadcn/ui.
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <SignInCredentialsForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}