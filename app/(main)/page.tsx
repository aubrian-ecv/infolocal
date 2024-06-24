import { Meteo } from "@/components/features/meteo";
import { Loader } from "@/components/ui/loader";
import { getOldestSurvey } from "@/lib/server-actions/survey.action";
import { Suspense } from "react";
import { ArticleList } from "./article-list";
import { SurveyCard } from "@/components/features/survey-card";

export default async function Home() {

  return (
    <main className="">
      <Meteo />
      <section className="px-4">
        <SurveyCard />
      </section>
      <Suspense fallback={<Loader />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
