import { Suspense } from "react";
import { ArticleList } from "./article-list";
import { Loader } from "@/components/ui/loader";

export default function Home() {
  return (
    <main className="">
      <Suspense fallback={<Loader />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
