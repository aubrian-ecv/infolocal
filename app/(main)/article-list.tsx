import { PostCard } from "@/components/features/posts/post-card"
import { prisma } from "@/lib/prisma"

export type ArticleListProps = {

}

export const ArticleList = async (props: ArticleListProps) => {
    const articles = await prisma.article.findMany({
        take: 10
    })

    return (
        <ul className="space-y-4">
            {
                articles.map((article) => (
                    <PostCard 
                        key={article.id}
                        article={article}
                    />
                ))
            }
        </ul>
    )
}