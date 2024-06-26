import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Typography } from "@/components/ui/typography";
import { auth } from "@/lib/auth/helper";
import { dateTz } from "@/lib/date/date-tz";
import type { PageParams } from "@/types/next";
import { Suspense } from "react";
import { SavedPostsList } from "./saved-posts-list";
import { HubsList } from "./hubs-list";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { CommentsList } from "./comments-list";

export default async function RoutePage(props: PageParams<{}>) {

  const userSession = await auth();

  if (!userSession) {
    redirect('/auth/signin?callbackUrl=/profile')
  }

  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(userSession?.id as unknown as string)
    }
  })

  return (
    <main className="px-5 space-y-6 my-4">
      <div className="flex flex-row items-center gap-2">
        <Avatar className="size-14">
          <AvatarImage src={user?.image ?? "https://github.com/shadcn.png"} className="" />
        </Avatar>
        <div className="flex flex-col">
          <Typography className="font-bold">{user?.name}</Typography>
          <Typography variant="muted">Membre depuis {dateTz(user?.createdAt, "YYYY") as string}</Typography>
        </div>
      </div>

      <Button variant={"blue"} asChild>
        <Link href="/profile/edit">
          Modifier mon profil
        </Link>
      </Button>

      <Tabs defaultValue="comments">
        <TabsList>
          <TabsTrigger value="comments">Commentaires</TabsTrigger>
          <TabsTrigger value="hubs">Hubs</TabsTrigger>
          <TabsTrigger value="saved">Sauvegardés</TabsTrigger>
        </TabsList>
        <TabsContent value="comments">
          <Suspense fallback={<Loader />}>
            <CommentsList />
          </Suspense>
        </TabsContent>
        <TabsContent value="hubs">
          <Suspense fallback={<Loader />}>
            <HubsList />
          </Suspense>
        </TabsContent>
        <TabsContent value="saved">
          <Suspense fallback={<Loader />}>
            <SavedPostsList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  )
}