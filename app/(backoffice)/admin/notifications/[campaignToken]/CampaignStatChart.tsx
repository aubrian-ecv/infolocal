"use client"

import { CampaignStats } from "@/types/campaign";
import { BarElement, CategoryScale, Chart as ChartJS, LinearScale, Tooltip } from "chart.js";
import { Bar } from "react-chartjs-2";

export type CampaignStatChartProps = {
    campaignStats: CampaignStats;
}

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip
)

export const CampaignStatChart = (props: CampaignStatChartProps) => {

    

    return (
        <Bar 
            options={{
                responsive: true,
                scales: {
                    x: {
                        stacked: true
                    }
                }
            }}
            data={{
                labels: props.campaignStats.detail.map((detail) => detail.date),
                datasets: [
                    {
                        label: "Notifications cliquées",
                        data: props.campaignStats.detail.map((detail) => detail.influenced_open + detail.direct_open),
                        backgroundColor: "rgba(255, 206, 86, 1)",
                        borderColor: "rgba(255, 206, 86, 1)",
                        borderWidth: 1
                    },
                    {
                        label: "Notifications envoyées",
                        data: props.campaignStats.detail.map((detail) => detail.sent),
                        backgroundColor: "rgba(255, 99, 132, 1)",
                        borderColor: "rgba(255, 99, 132, 1)",
                        borderWidth: 1,
                    }
                ]
            }}     
        />
    )
}