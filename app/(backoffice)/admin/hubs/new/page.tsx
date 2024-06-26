import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";
import { HubForm } from "./HubForm";

export default async function RoutePage(props: PageParams<{}>) {
    return (
        <section className="space-y-6">
            <Typography variant={"h1"}>Création d&apos;une notification</Typography>
            <HubForm />
        </section>
    )
}