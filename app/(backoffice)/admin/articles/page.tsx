import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/typography";
import type { PageParams } from "@/types/next";
import Image from "next/image";
import Link from "next/link";
import { getArticlesList } from "./articles.queries";
import { dateTz } from "@/lib/date/date-tz";

export default async function RoutePage(props: PageParams<{}>) {

    const articles = await getArticlesList();

    return (
        <section>
            <Typography variant="h1">Centre des articles</Typography>
            <div className="flex items-center justify-end">
                <Button asChild variant={"outline"}>
                    <Link href={"/admin/articles/new"}>
                        Créer un article
                    </Link>
                </Button>
            </div>

            <div className="mt-8">
                <Typography variant="h2">Vos articles</Typography>
                <ul>
                    {
                        articles.length === 0 &&
                        <li>
                            <Typography variant="muted">Aucun article</Typography>
                        </li>
                    }
                    {
                        articles.map((article) => (
                            <Card key={article.id}>
                                <CardContent className="flex flex-row gap-4 p-6">
                                    <Image src={article.imageUrl} alt={article.imageCaption} width={200} height={200} className="object-contain" />
                                    <div className="flex flex-col justify-between w-full">
                                        <Typography variant="h3">{article.title}</Typography>
                                        {
                                            article.keywords.length > 0 &&
                                            <ul className="flex flex-row gap-1">
                                                {article.keywords.split(',').map(keyword => (
                                                    <li
                                                        key={keyword}
                                                        className={"bg-if_darkblue text-white rounded-tl-md rounded-br-md w-max px-2 py-1 text-xs"}
                                                    >
                                                        {keyword}
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                        <div className="flex flex-row justify-between">
                                            <Typography variant="muted">Publié le {dateTz(article.publicationDate, "DD MMMM YYYY") as string}</Typography>
                                            <Button variant="outline" asChild>
                                                <Link href={"/admin/articles/" + article.id}>
                                                    Voir l'article
                                                </Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    }
                </ul>

            </div>
        </section>
    )
}