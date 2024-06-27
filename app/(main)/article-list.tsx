import { PostCard } from "@/components/features/posts/post-card"
import { prisma } from "@/lib/prisma"

export type ArticleListProps = {

}

export const ArticleList = async (props: ArticleListProps) => {
    const articles = await prisma.article.findMany({
        take: 4,
        orderBy: {
            publicationDate: 'desc'
        },
        include: {
            author: true
        }
    })

    return (
        <ul className="space-y-4">
            {
                articles.map((article, index) => (
                    <PostCard 
                        key={article.id}
                        article={article}
                        size={index === 0 ? "large" : "small"}
                    />
                ))
            }
        </ul>
    )
}