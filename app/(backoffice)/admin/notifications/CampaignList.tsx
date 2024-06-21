"use client"

import { Typography } from "@/components/ui/typography";
import { Campaign } from "@/types/campaign";
import { useQuery } from "@tanstack/react-query";
import { getCampaignsList } from "./campaign.queries";
import { Loader } from "@/components/ui/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "@/lib/dayjs";
import { CheckCircleIcon, Clock, Pen } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export type CampaignListProps = {
    campaigns: Campaign[]
}

export const CampaignList = (props: CampaignListProps) => {

    const [isSSR, setIsSSR] = useState(true);
    useEffect(() => {
        setIsSSR(false);
    }, []);

    const { data: campaigns, isFetching } = useQuery({
        queryKey: ["campaigns"],
        queryFn: getCampaignsList,
        initialData: props.campaigns
    });

    return (
        <div className="mt-8">
            <Typography variant="h2">Campagnes en cours</Typography>
            {
                isFetching && <Loader />
            }
            {
                !isFetching && (!campaigns || campaigns.length === 0) && (
                    <div className="mt-4">
                        <Typography variant="base">Aucune campagne en cours</Typography>
                    </div>
                )
            }
            <ul className="space-y-4 my-6" suppressHydrationWarning>
                {
                    !isSSR &&
                    campaigns && campaigns.map((campaign: Campaign) => (
                        <li key={campaign.campaign_token}>
                            <Card>
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <CardTitle>
                                        {campaign.name}
                                    </CardTitle>
                                    <CampaignStatus campaign={campaign} />
                                </CardHeader>
                                <CardContent className="flex flex-row justify-between items-center">
                                    {
                                        dayjs(campaign.push_time).isBefore(new Date()) ? (
                                            <Typography variant="base">Envoyé le {dayjs(campaign.push_time).format("DD/MM/YYYY à HH:mm")}</Typography>
                                        ) : (
                                            <Typography variant="base">Programmé pour le {dayjs(campaign.push_time).format("DD/MM/YYYY à HH:mm")}</Typography>
                                        )
                                    }
                                    {
                                        campaign.live ? dayjs(campaign.push_time).isBefore(new Date()) && (
                                            <Button asChild variant="outline">
                                                <Link href={`/admin/notifications/${campaign.campaign_token}`}>Voir</Link>
                                            </Button>
                                        ) :
                                            <Button asChild variant="outline">
                                                <Link href={`/admin/notifications/${campaign.campaign_token}/edit`}>Modifier</Link>
                                            </Button>
                                    }
                                </CardContent>
                            </Card>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

const CampaignStatus = ({ campaign }: { campaign: Campaign }) => {
    if (campaign.live) {
        if (dayjs(campaign.push_time).isBefore(new Date())) {
            return <CheckCircleIcon color="green" />
        }
        return <Clock color="orange" />
    }
    return <Pen />
}