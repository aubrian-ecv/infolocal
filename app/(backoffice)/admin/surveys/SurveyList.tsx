"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import { dateTz } from "@/lib/date/date-tz";
import { Campaign } from "@/types/campaign";
import { Survey, SurveyResults } from "@prisma/client";
import dayjs from "dayjs";
import { CheckCircleIcon, Clock, Pen } from "lucide-react";
import { publishSurvey } from "./survey.queries";
import Link from "next/link";

export type SurveyListProps = {
    surveys: (Survey & { results: SurveyResults[] })[]
}

export const SurveyList = (props: SurveyListProps) => {

    return (
        <div className="mt-8">
            <Typography variant="h2">Sondages</Typography>
            <ul className="space-y-4 my-6" suppressHydrationWarning>
                {
                    props.surveys.map((survey) => (
                        <li key={survey.id}>
                            <Card>
                                <CardHeader className="flex flex-row justify-between items-center">
                                    <CardTitle>
                                        {survey.question}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex flex-row justify-between items-center">
                                        <Typography variant="base">Dernière modification le {dateTz(survey.updatedAt.toString(), "DD/MM/YYYY [à] HH:mm", "Europe/Paris") as string}</Typography>
                                        <Typography variant="base">{survey.results.length} réponse{survey.results.length > 1 && "s"}</Typography>
                                    </div>
                                    <div className="flex flex-row justify-end items-center gap-4">
                                        {
                                            survey.published &&
                                            <Button asChild>
                                                <Link href={`/admin/surveys/${survey.id}/results`}>
                                                    Voir les résultats
                                                </Link>
                                            </Button>
                                        }

                                        {
                                            !survey.published &&
                                            <>
                                                <Button asChild>
                                                    <Link href={`/admin/surveys/${survey.id}/edit`}>
                                                        Modifier
                                                    </Link>
                                                </Button>
                                                <Button onClick={() => publishSurvey(survey.id)}>
                                                    Publier
                                                </Button>
                                            </>
                                        }
                                    </div>
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