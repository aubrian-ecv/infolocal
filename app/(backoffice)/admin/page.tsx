import type { PageParams } from "@/types/next";
import { CampaignDetails } from "./campaign-details";

export default async function RoutePage(props: PageParams<{}>) {

  const campaings = await fetch("https://api.batch.com/1.1/5EEFD6DCE1E246A3BF8FB8C5D93695A8/campaigns/list", {
    // @ts-ignore
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": process.env.NEXT_PUBLIC_BATCH_API_KEY
    }
  }).then((res) => res.json());

  return (
    <div>
      <h1>Admin</h1>
      {
        campaings.map((campaign: any) => (
          <CampaignDetails
            key={campaign.id}
            campaign={campaign}
          />
        ))
      }
    </div>
  )
}