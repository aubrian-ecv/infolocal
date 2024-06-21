import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";
import { SurveyForm } from "./SurveyForm";

export default async function RoutePage(props: PageParams<{}>) {
    return (
        <section className="space-y-6">
            <Typography variant={"h1"}>Création d&apos;un sondage</Typography>
            <SurveyForm />
        </section>
    )
}