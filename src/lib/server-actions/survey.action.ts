"use server"

import { prisma } from "../prisma"

export async function getOldestSurvey(votedSurveys: number[]) {
    const survey = await prisma.survey.findFirst({
        orderBy: {
            createdAt: 'asc'
        },
        where: {
            published: true,
            NOT: {
                id: {
                    in: votedSurveys
                }
            }
        },
        include: {
            options: true
        }
    })

    if (!survey) {
        return await prisma.survey.findFirst({
            orderBy: {
                createdAt: "desc"
            },
            where: {
                published: true
            },
            include: {
                options: true
            }
        })
    }

    return survey;
}

export async function saveVoteToSurvey(surveyId: number, optionId: number) {
    return await prisma.surveyResults.create({
        data: {
            SurveyId: surveyId,
            optionId
        }
    })
}