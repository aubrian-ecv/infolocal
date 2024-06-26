import { Typography } from "@/components/ui/typography";
import { prisma } from "@/lib/prisma";
import type { PageParams } from "@/types/next";
import Link from "next/link";
export default async function RoutePage(props: PageParams<{ articleId: string }>) {
    const article = await prisma.article.findUnique({
        where: {
            "id": parseInt(props.params.articleId)
        }
    })

    console.log(article)
    return (
        <section className="space-y-6 w-11/12 mx-auto my-2">
            <Link href={'/'}>
                
                {'< Retour'}
            </Link>
            {
                article!.keywords.length > 0 &&
                <ul className="flex flex-row gap-1">
                    {article?.keywords.split(',').map(keyword => (
                        <li
                            key={keyword}
                            className={"bg-if_darkblue text-white rounded-tl-md rounded-br-md w-max px-2 py-1 text-xs"}
                        >
                            {keyword}
                        </li>
                    ))}
                </ul>
            }
            <Typography variant={"h1"}>{article?.title}</Typography>
            <img src={article?.imageUrl} />
            <Typography variant={"p"}>{article?.content}</Typography>
        </section>
    )
}