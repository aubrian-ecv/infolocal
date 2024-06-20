"use client"

import { useQuery } from "@tanstack/react-query";
import { getCampaignStats } from "./campaign.action";

export type CampaignDetailsProps = {
  campaign: any
}

export const CampaignDetails = (props: CampaignDetailsProps) => {

  const { data, isFetching, error } = useQuery({
    queryKey: ["campaign", props.campaign.campaign_token],
    queryFn: () => getCampaignStats(props.campaign.campaign_token),
  })

  return (
    <div onClick={() => getCampaignStats(props.campaign.campaign_token)}>
      <h2>{props.campaign.name}</h2>
      {(isFetching) && <p>Loading...</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}