import { Meteo } from "@/components/features/meteo";
import { SurveyCard } from "@/components/features/survey-card";
import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";
import { ArticleList } from "./article-list";

export default async function Home() {

  return (
    <main className="px-4 space-y-6">
      <Meteo />
      <section>
        <SurveyCard />
      </section>
      <Suspense fallback={<Loader />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
