"use client"

import { Typography } from "@/components/ui/typography"
import { Comment, User } from "@prisma/client"
import { CommentCard } from "./comment-card"
import { NewCommentForm } from "./new-comment-form"
import { useState } from "react"

export type CommentsSectionProps = {
    comments: (Comment & { user: User, _count: { likes: number }, answers: Comment[] })[],
}

export const CommentsSection = ({ comments }: CommentsSectionProps) => {

    const [parentComment, setParentComment] = useState<(Comment & { user: User, _count: { likes: number }, answers: Comment[] }) | undefined>(undefined);

    return (
        <section aria-label="Section de commentaires">
            {
                comments.map((comment) => {
                    return <CommentCard key={comment.id} comment={comment} setParentComment={setParentComment} />
                })
            }
            {
                comments.length === 0 &&
                <Typography variant="muted" className="text-center">Aucun commentaire</Typography>
            }

            <div className="h-[2px] bg-if_dark w-full !mb-4 mt-14"></div>

            <NewCommentForm parentComment={parentComment} setParentComment={setParentComment} />
        </section>
    )
}