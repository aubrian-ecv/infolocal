import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";
import { ArticleList } from "./article-list";
import { Meteo } from "@/components/features/meteo";

export default function Home() {
  return (
    <main className="">
      <Meteo />
      <Suspense fallback={<Loader />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
