import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";
import { getSurveyResults } from "../../survey.queries";
import { SurveyResultsChart } from "./SurveyResultsChart";
import { Survey, SurveyOptions, SurveyResults } from "@prisma/client";
import { Card } from "@/components/ui/card";

export default async function RoutePage(props: PageParams<{ surveyId: string }>) {

    const survey = await getSurveyResults(props.params.surveyId) as (Survey & { results: (SurveyResults & { option: SurveyOptions })[] });

    return (
        <section className="space-y-6">
            <Typography variant={"h1"}>Statistiques du sondage <br />&quot;{survey?.question}&quot;</Typography>

            <div className="flex flex-col lg:flex-row gap-4">
                <Card className="flex flex-col items-center justify-center p-2 basis-1/4">
                    <Typography variant={"h2"} className="font-bold">{survey.results.length}</Typography>
                    <Typography variant={"quote"}>Résultats</Typography>
                </Card>

                {
                    survey.results.map((result) => (
                        <Card key={result.id} className="flex flex-col items-center justify-center p-2 basis-1/4">
                            <Typography variant={"h2"} className="font-bold">{survey.results.reduce((acc, curr) => curr.id === result.id ? acc + 1 : acc, 0)}</Typography>
                            <Typography variant={"quote"}>{result.option.label}</Typography>
                        </Card>
                    ))
                }
            </div>

            <SurveyResultsChart survey={survey} />
        </section>
    )
}