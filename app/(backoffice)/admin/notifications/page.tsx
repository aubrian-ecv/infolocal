import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { Suspense } from "react";
import { CampaignList } from "./CampaignList";
import { getCampaignsList } from "./campaign.queries";

export default async function RoutePage(props: PageParams<{}>) {

    const campaigns = await getCampaignsList();

    return (
        <section>
            <Typography variant="h1">Centre de notifications</Typography>
            <div className="flex items-center justify-end">
                <Button asChild variant={"outline"}>
                    <Link href={"/admin/notifications/new"}>
                        Créer une campagne de notifications
                    </Link>
                </Button>
            </div>
            <Suspense>
                <CampaignList campaigns={campaigns} />
            </Suspense>
        </section>
    )
}