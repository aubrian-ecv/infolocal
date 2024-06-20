"use client"

import { Card } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { CampaignStats } from "@/types/campaign";
import { useQuery } from "@tanstack/react-query";
import { getCampaignStats } from "../campaign.action";

export type CampaignKPIProps = {
    campaignStats: CampaignStats
}

export const CampaignKPI = (props: CampaignKPIProps) => {

    const { data: campaignStats } = useQuery<CampaignStats>({
        queryKey: ["campaignStats", props.campaignStats.campaign_token],
        queryFn: () => getCampaignStats(props.campaignStats.campaign_token),
        initialData: props.campaignStats
    })

    return (
        <div className="flex flex-col lg:flex-row gap-4">
            <Card className="flex flex-col items-center justify-center p-2 basis-1/4">
                <Typography variant={"h2"} className="font-bold">{campaignStats.detail.reduce((acc, curr) => acc += curr.sent, 0)}</Typography>
                <Typography variant={"quote"}>Notifications</Typography>
            </Card>

            <Card className="flex flex-col items-center justify-center p-2 basis-1/4">
                <Typography variant={"h2"} className="font-bold">{campaignStats.detail.reduce((acc, curr) => acc += curr.direct_open, 0)}</Typography>
                <Typography variant={"quote"}>Clicks</Typography>
            </Card>

            <Card className="flex flex-col items-center justify-center p-2 basis-1/4">
                <Typography variant={"h2"} className="font-bold">{campaignStats.detail.reduce((acc, curr) => acc += curr.influenced_open, 0)}</Typography>
                <Typography variant={"quote"}>Influencés</Typography>
            </Card>

            <Card className="flex flex-col items-center justify-center p-2 basis-1/4">
                <Typography variant={"h2"} className="font-bold">{campaignStats.detail.reduce((acc, curr) => acc += (curr.influenced_open + curr.direct_open), 0) / campaignStats.detail.reduce((acc, curr) => acc += curr.sent, 0) * 100}%</Typography>
                <Typography variant={"quote"}>Taux de visites</Typography>
            </Card>
        </div>
    )
}