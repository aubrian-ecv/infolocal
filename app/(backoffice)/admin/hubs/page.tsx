import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { getHubsList } from "./hubs.queries";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Heart, User } from "lucide-react";

export default async function RoutePage(props: PageParams<{}>) {
    const hubs = await getHubsList();

    return (
        <section>
            <Typography variant="h1">Centre des Hubs</Typography>
            <div className="flex items-center justify-end">
                <Button asChild variant={"outline"}>
                    <Link href={"/admin/hubs/new"}>
                        Créer un hub
                    </Link>
                </Button>
            </div>

            <div className="mt-8">
                <Typography variant="h2">Vos hubs</Typography>
                <ul>
                    {
                        hubs.length === 0 &&
                        <li>
                            <Typography variant="muted">Aucun hub</Typography>
                        </li>
                    }
                    {
                        hubs.map((hub) => (
                            <li key={hub.id}>
                                <Card>
                                    <CardHeader className="flex flex-row justify-between items-center">
                                        <CardTitle>
                                            {hub.name}
                                        </CardTitle>
                                        <div className="flex flex-row gap-4">
                                            <div className="flex flex-row gap-2 items-center">
                                                <User size={16} />
                                                <Typography>{hub._count.users}</Typography>
                                            </div>

                                            <div className="flex flex-row gap-2 items-center">
                                                <Heart size={16} />
                                                <Typography>{hub._count.likes}</Typography>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex flex-row justify-between items-center">
                                        {
                                            hub.keywords.length > 0 &&
                                            <ul className="flex flex-row gap-1">
                                                {hub.keywords.split(',').map(keyword => (
                                                    <li
                                                        key={keyword}
                                                        className={"bg-if_dark text-white rounded-tl-md rounded-br-md w-max px-2 py-1 text-xs"}
                                                    >
                                                        {keyword}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                        <Link href={`#`} className="flex flex-row items-center gap-2 underline underline-offset-2">
                                            Voir les détails <ArrowRight size={16} />
                                        </Link>
                                    </CardContent>
                                </Card>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </section>
    )
}