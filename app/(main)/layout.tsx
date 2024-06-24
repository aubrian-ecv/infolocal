import { Footer } from "@/components/features/footer";
import type { LayoutParams } from "@/types/next";
import Script from "next/script";

export default async function RouteLayout(props: LayoutParams<{  }>) {
  return (
    <>
        {props.children}
        <Script
          src="/batchsdk.js"
        />
        <Footer/>
    </>
  )
}