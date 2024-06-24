"use client"

import { Survey, SurveyOptions } from "@prisma/client"
import { Typography } from "../ui/typography"
import { Button } from "../ui/button"
import { Fragment, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { getOldestSurvey, saveVoteToSurvey } from "@/lib/server-actions/survey.action"

export type SurveyCardProps = {
}

export const SurveyCard = (props: SurveyCardProps) => {

    const [survey, setSurvey] = useState<(Survey & { options: SurveyOptions[] }) | null>(null);
    const [hasVoted, setHasVoted] = useState<number | undefined>(undefined);

    useEffect(() => {
        const votedSurveys = JSON.parse(localStorage.getItem('surveyVotes') || '[]').map((vote: any) => vote.surveyId)
        getOldestSurvey(votedSurveys)
            .then(survey => setSurvey(survey))
    }, [])

    useEffect(() => {
        const votes = JSON.parse(localStorage.getItem('surveyVotes') || '[]')
        setHasVoted(votes.filter((vote: any) => vote.surveyId === survey?.id)?.[0]?.optionId)
    }, [survey?.id])

    const saveVoteToLocalStorage = (optionId: number) => {
        if (hasVoted || !survey) return;
        const surveyId = survey.id
        const surveyVote = { surveyId, optionId }
        const votes = JSON.parse(localStorage.getItem('surveyVotes') || '[]')
        votes.push(surveyVote)
        localStorage.setItem('surveyVotes', JSON.stringify(votes))
        saveVoteToSurvey(surveyId, optionId)
        setHasVoted(optionId)
    }

    if (!survey) return null;

    return (
        <div className="bg-if_lightgrey px-2 py-4 space-y-6 rounded-md">
            <Typography className="font-bold text-xl">{survey.question}</Typography>
            <ul className="flex flex-col gap-2 px-6">
                {survey.options.map(option => (
                    <Fragment key={survey.id + option.id}>
                        {hasVoted ?
                            (
                                <li className={
                                    cn(
                                        "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:pointer-events-none disabled:opacity-50",
                                        "h-9 px-4 py-2",
                                        "bg-slate-200",
                                        hasVoted === option.id && "bg-if_blue text-white",
                                    )}>
                                    <Typography>{option.label}</Typography>
                                </li>
                            )
                            :
                            (
                                <Button asChild variant="blue" onClick={() => saveVoteToLocalStorage(option.id)}>
                                    <li>
                                        <Typography>{option.label}</Typography>
                                    </li>
                                </Button>
                            )
                        }
                    </Fragment>
                ))}
            </ul>
        </div>
    )
}