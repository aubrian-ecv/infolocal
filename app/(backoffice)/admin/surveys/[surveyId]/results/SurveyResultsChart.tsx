"use client"

import { Survey, SurveyOptions, SurveyResults } from "@prisma/client"
import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js"
import { Pie } from "react-chartjs-2"


ChartJS.register(
    ArcElement,
    Tooltip
)

export type SurveyResultsChartProps = {
    survey: (Survey & { results: (SurveyResults & { option: SurveyOptions })[] })
}

export const SurveyResultsChart = (props: SurveyResultsChartProps) => {
    const totalCounts = props.survey.results.reduce((acc, result) => {
        acc[result.option.label] = (acc[result.option.label] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const data = Object.values(totalCounts);

    console.log(data);
    

    return (
        <div className="flex items-center justify-center w-full h-96">
            <Pie
                data={{
                    labels: props.survey.results.map((result) => result.option.label),
                    datasets: [
                        {
                            // Count the number of votes for each option defined in survey.results with result defined as SurveyResults
                            data: data,
                            backgroundColor: [
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)"
                            ],
                            borderWidth: 1
                        }
                    ]
                }}
            />
        </div>
    )
}