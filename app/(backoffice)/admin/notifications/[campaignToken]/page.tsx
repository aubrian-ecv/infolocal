import { Typography } from "@/components/ui/typography";
import { Campaign, CampaignStats } from "@/types/campaign";
import type { PageParams } from "@/types/next";
import { getCampaign, getCampaignStats } from "../campaign.action";
import { CampaignKPI } from "./CampaignKPI";
import { CampaignStatChart } from "./CampaignStatChart";

export default async function RoutePage(props: PageParams<{ campaignToken: string }>) {

    const campaign = await getCampaign(props.params.campaignToken) as Campaign;
    const campaignStats = await getCampaignStats(props.params.campaignToken) as CampaignStats;

    return (
        <section className="space-y-6">
            <Typography variant={"h1"}>Statistiques de la campagne "{campaign.name}"</Typography>
            <CampaignKPI campaignStats={campaignStats} />
            <CampaignStatChart
                campaignStats={campaignStats}
            />
        </section>
    )
}