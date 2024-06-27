import { PostCard } from "@/components/features/posts/post-card";
import { getUserSavedPosts } from "@/lib/server-actions/post.action";
import { Article, User } from "@prisma/client";

export type SavedPostsListProps = {

}

export const SavedPostsList = async (props: SavedPostsListProps) => {

    const savedPost = await getUserSavedPosts() as ({ article: (Article & { author: User }) } & { ArticleId: number; UserId: number; })[];

    return (
        <ul className="space-y-6">
            {
                savedPost.map((post) => (
                    <PostCard
                        key={post.article.id}
                        article={post.article}
                        refreshAfterAction
                    />
                ))
            }
        </ul>
    )
}