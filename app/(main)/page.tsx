import { Meteo } from "@/components/features/meteo";
import { SurveyCard } from "@/components/features/survey-card";
import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";
import { ArticleList } from "./article-list";
import { prisma } from "@/lib/prisma";
import { HubCard } from "@/components/features/hubs/hub-card";
import { Hub, User } from "@prisma/client";

export default async function Home() {

  const hub = await prisma.hub.findFirst({
    include: {
      users: true
    }
  }) as (Hub & { users: User[] });

  return (
    <main className="px-4 space-y-6">
      <Meteo />
      <section>
        <SurveyCard />
      </section>
      <HubCard
        hub={hub}
      />
      <Suspense fallback={<Loader />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
