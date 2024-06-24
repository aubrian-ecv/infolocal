import { Header } from "@/components/features/header";
import type { LayoutParams } from "@/types/next";
import Script from "next/script";

export default async function RouteLayout(props: LayoutParams<{  }>) {
  return (
    <>
        <Header/>
        {props.children}
        <Script
          src="/batchsdk.js"
        />
    </>
  )
}