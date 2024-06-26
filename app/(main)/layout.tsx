import { Footer } from "@/components/features/footer";
import { Header } from "@/components/features/header";
import type { LayoutParams } from "@/types/next";
import Script from "next/script";

export default async function RouteLayout(props: LayoutParams<{  }>) {
  return (
    <div className="max-w-screen-sm mx-auto min-h-screen flex flex-col">
        <Header/>
        <section className="flex-1">
          {props.children}
        </section>
        <Script
          src="/batchsdk.js"
        />
        <Footer/>
    </div>
  )
}