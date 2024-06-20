import { CampaignFormType } from "./new/campaign.schema";

export async function getCampaignStats(token: string) {
  return await fetch(
    "https://api.batch.com/1.1/5EEFD6DCE1E246A3BF8FB8C5D93695A8/campaigns/stats/" +
      token,
    {
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": process.env.NEXT_PUBLIC_BATCH_API_KEY,
      },
    }
  ).then((res) => res.json());
}

export async function getCampaign(token: string) {
  return await fetch(
    "https://api.batch.com/1.1/5EEFD6DCE1E246A3BF8FB8C5D93695A8/campaigns/" +
      token,
    {
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": process.env.NEXT_PUBLIC_BATCH_API_KEY,
      },
    }
  ).then((res) => res.json());
}

export async function getCampaignsList() {
  return await fetch(
    "https://api.batch.com/1.1/5EEFD6DCE1E246A3BF8FB8C5D93695A8/campaigns/list",
    {
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": process.env.NEXT_PUBLIC_BATCH_API_KEY,
      },
    }
  ).then((res) => res.json());
}

export async function createCampaign(values: CampaignFormType) {
  const response = await fetch(
    "https://api.batch.com/1.1/5EEFD6DCE1E246A3BF8FB8C5D93695A8/campaigns/create",
    {
      method: "POST",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": process.env.NEXT_PUBLIC_BATCH_API_KEY,
      },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();
  return { response, data };
}

export async function updateCampaign(values: CampaignFormType, campaignToken: string) {
  if (!campaignToken) throw new Error("No campaign token provided");
  const response = await fetch(
    `https://api.batch.com/1.1/5EEFD6DCE1E246A3BF8FB8C5D93695A8/campaigns/update/${campaignToken}`,
    {
      method: "POST",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": process.env.NEXT_PUBLIC_BATCH_API_KEY,
      },
      body: JSON.stringify(values),
    }
  );
  const data = await response.json();
  return { response, data };
}