import { CommentCard } from "@/components/features/comments/comment-card";
import { getUserComments } from "@/lib/server-actions/comment.action";
import { Comment, User } from "@prisma/client";

export type CommentsListProps = {

}

export const CommentsList = async (props: CommentsListProps) => {

    const comments = await getUserComments() as (Comment & { user: User, _count: { likes: number }, answers: Comment[] })[];
    

    return (
        <ul className="space-y-6">
            {
                comments.map((comment) => (
                    <CommentCard
                        key={comment.id}
                        comment={comment}
                    />
                ))
            }
        </ul>
    )
}