export async function getCampaignDetails(token: string) {
    await fetch("https://api.batch.com/1.1/5EEFD6DCE1E246A3BF8FB8C5D93695A8/campaigns/stats/"+token, {
        // @ts-ignore
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": process.env.NEXT_PUBLIC_BATCH_API_KEY
        }
      }).then((res) => res.json()).then(console.log);
}