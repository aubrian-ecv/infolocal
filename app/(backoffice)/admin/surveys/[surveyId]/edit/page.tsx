import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";
import { Survey, SurveyOptions } from "@prisma/client";
import { redirect } from "next/navigation";
import { SurveyForm } from "../../new/SurveyForm";
import { getSurvey } from "../../survey.queries";

export default async function RoutePage(props: PageParams<{ surveyId: string }>) {

    const survey = await getSurvey(props.params.surveyId) as (Survey & { options: SurveyOptions[] });

    if (survey.published) {
        redirect("/admin/surveys");
    }

    return (
        <section className="space-y-6">
            <Typography variant={"h1"}>Modification de la notification</Typography>
            <SurveyForm survey={survey} edit />
        </section>
    )
}