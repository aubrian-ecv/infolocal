import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";
import { CampaignForm } from "./CampaignForm";

export default async function RoutePage(props: PageParams<{}>) {
    return (
        <section className="space-y-6">
            <Typography variant={"h1"}>Création d'une notification</Typography>
            <CampaignForm />
        </section>
    )
}