"use client"

import { getCampaignDetails } from "./test.action"

export type CampaignDetailsProps = {
  campaign: any
}

export const CampaignDetails = (props: CampaignDetailsProps) => {
  return (
    <div onClick={() => getCampaignDetails(props.campaign.campaign_token)}>
      <h2>{props.campaign.name}</h2>
    </div>
  )
}