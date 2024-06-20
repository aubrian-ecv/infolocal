import { prisma } from "@/lib/prisma"

export type ArticleListProps = {

}

export const ArticleList = async (props: ArticleListProps) => {
    const articles = await prisma.article.findMany({
        take: 10
    })

    return (
        <ul>
            {
                articles.map((article) => (
                    <li key={article.id}>
                        {article.title}
                    </li>
                ))
            }
        </ul>
    )
}