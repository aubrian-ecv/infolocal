import { Loader } from "@/components/ui/loader";
import { Suspense } from "react";
import { ArticleList } from "./article-list";

export default function Home() {
  return (
    <main className="">
      <Suspense fallback={<Loader />}>
        <ArticleList />
      </Suspense>
    </main>
  );
}
