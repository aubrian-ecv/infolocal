import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { getSurveyList } from "./survey.queries";
import { SurveyList } from "./SurveyList";

export default async function RoutePage(props: PageParams<{}>) {

    const surveys = await getSurveyList();

    return (
        <section>
            <Typography variant="h1">Centre de sondages</Typography>
            <div className="flex items-center justify-end">
                <Button asChild variant={"outline"}>
                    <Link href={"/admin/surveys/new"}>
                        Créer un sondage
                    </Link>
                </Button>
            </div>
            <SurveyList surveys={surveys} />
        </section>
    )
}