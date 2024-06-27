import type { LayoutParams } from "@/types/next";
import Image from "next/image";
import Link from "next/link";

export default async function RouteLayout(props: LayoutParams<{}>) {
    return (
        <main className="admin-grid">
            <aside style={{ gridArea: "aside" }} className="sticky top-12 h-[calc(100vh-var(--header-height))] px-5">
                <nav>
                    <ul className="space-y-4 font-nohemi text-lg">
                        <li><Link href="/admin">Admin</Link></li>
                        <li><Link href={"/admin/articles"}>Articles</Link></li>
                        <li><Link href={"/admin/notifications"}>Notifications</Link></li>
                        <li><Link href={"/admin/surveys"}>Sondages</Link></li>
                        <li><Link href={"/admin/hubs"}>Hubs</Link></li>
                    </ul>
                </nav>
            </aside>
            <div style={{ gridArea: "header" }} className="flex items-center justify-between sticky top-0 px-5">
                <Image src={"/static/img/infolocal-small-blue.svg"} alt="Logo" width={50} height={50} />
                <Link href={"/"} className="text-if_blue underline underline-offset-4">
                    Retour sur InfoLocal+
                </Link>
            </div>
            <section style={{ gridArea: "content" }} className="bg-white shadow-inner p-4">
                {props.children}
            </section>
        </main>
    )
}