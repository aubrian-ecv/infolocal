import type { LayoutParams } from "@/types/next";
import Image from "next/image";

export default async function RouteLayout(props: LayoutParams<{  }>) {
  return (
    <main className="admin-grid px-5">
        <aside style={{ gridArea: "aside"}}>
            <nav>
                <ul>
                    <li><a href="/admin">Admin</a></li>
                    <li><a href="/admin/users">Users</a></li>
                    <li><a href="/admin/roles">Roles</a></li>
                </ul>
            </nav>
        </aside>
        <div style={{ gridArea: "header" }} className="h-12 flex items-center">
            <Image src={"/next.svg"} alt="Logo" width={50} height={50} />
        </div>
        <section style={{ gridArea: "content"}}>
            {props.children}
        </section>
    </main>
  )
}