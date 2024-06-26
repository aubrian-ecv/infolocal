import type { LayoutParams } from "@/types/next";
import Image from "next/image";
import Link from "next/link";

export default async function RouteLayout(props: LayoutParams<{  }>) {
  return (
    <main className="admin-grid px-5">
        <aside style={{ gridArea: "aside"}} className="sticky top-12 h-[calc(100vh-var(--header-height))]">
            <nav>
                <ul>
                    <li><Link href="/admin">Admin</Link></li>
                    <li><Link href={"/admin/notifications"}>Notifications</Link></li>
                    <li><Link href={"/admin/surveys"}>Sondages</Link></li>
                    <li><Link href={"/admin/hubs"}>Hubs</Link></li>
                </ul>
            </nav>
        </aside>
        <div style={{ gridArea: "header" }} className="flex items-center sticky top-0">
            <Image src={"/next.svg"} alt="Logo" width={50} height={50} />
        </div>
        <section style={{ gridArea: "content"}}>
            {props.children}
        </section>
    </main>
  )
}