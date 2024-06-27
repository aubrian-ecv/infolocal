'use client';

import { Credenza, CredenzaBody, CredenzaContent, CredenzaDescription, CredenzaHeader, CredenzaTitle } from '@/components/ui/credenza';
import { usePathname, useRouter } from 'next/navigation';
import { SignInCredentialsForm } from '../../../auth/signin/SignInCredentialsForm';
import Image from 'next/image';

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
          <CredenzaTitle>Connexion</CredenzaTitle>
          <CredenzaDescription className='flex items-center justify-center'>
            <Image src="/static/img/infolocal-small-blue.svg" width={"100"} height={"40"} alt='InfoLocal+' />
          </CredenzaDescription>
        </CredenzaHeader>
        <CredenzaBody>
          <SignInCredentialsForm />
        </CredenzaBody>
      </CredenzaContent>
    </Credenza>
  )
}