import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";
import { CampaignForm } from "../../new/CampaignForm";
import { getCampaign } from "../../campaign.action";
import { Campaign } from "@/types/campaign";

export default async function RoutePage(props: PageParams<{ campaignToken: string }>) {

    const campaign = await getCampaign(props.params.campaignToken) as Campaign;

    return (
        <section className="space-y-6">
            <Typography variant={"h1"}>Modification de la notification</Typography>
            <CampaignForm campaign={campaign} edit />
        </section>
    )
}