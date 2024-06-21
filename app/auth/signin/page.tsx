import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth/helper";
import type { PageParams } from "@/types/next";
import { redirect } from "next/navigation";
import { SignInCredentialsForm } from "./SignInCredentialsForm";
import Image from "next/image";

export default async function AuthSignInPage(props: PageParams<{}>) {
  const user = await auth();

  if (user) {
    redirect("/");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="flex flex-col items-center justify-center gap-2">
            <Image src="/next.svg" alt="Logo" width={100} height={50}/>
            <CardTitle>Sign in to your account</CardTitle>
          </CardHeader>
          <CardContent className="mt-8">
            <SignInCredentialsForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}