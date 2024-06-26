"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { dateTz } from "@/lib/date/date-tz"
import { getLikeStatusForUser, getTotalLikesForComment, likePostComment } from "@/lib/server-actions/comment.action"
import { cn } from "@/lib/utils"
import { Comment, User } from "@prisma/client"
import { Dayjs } from "dayjs"
import { Heart, Loader } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"

export type CommentCardProps = {
    comment: (Comment & { user: User, _count: { likes: number }, answers: Comment[] }),
    setParentComment?: (comment: (Comment & { user: User, _count: { likes: number }, answers: Comment[] })) => void
}

export const CommentCard = ({ comment, setParentComment }: CommentCardProps) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const [isLiked, setIsLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(comment._count?.likes ?? 0);
    useEffect(() => {
        setIsLoading(true);
        new Promise(async (resolve) => {
            const likeStatus = await getLikeStatusForUser(comment);
            const totalLikes = await getTotalLikesForComment(comment);

            setTotalLikes(totalLikes);

            if (likeStatus) {
                setIsLiked(true);
            }

            resolve(true);
        }).finally(() => setIsLoading(false));
    }, [])

    const likeComment = async () => {
        const status = await likePostComment(comment);

        if (status) {
            if (status.error === "NOT_LOGGED_IN") {
                router.push('/auth/signin?callbackUrl=/')
            }

            if (status.success) {
                setIsLiked(true);
                getTotalLikesForComment(comment).then(setTotalLikes);
            }
        }
    }

    if (!comment) {
        return null
    }

    return (
        <article id={comment.id.toString()} aria-label="Commentaire de l'utilisateur Jean" className="[&:not(:first-child)]:mt-6">
            <header>
                {/* Avatar image with informations */}
                <div className="flex flex-row gap-2 items-center">
                    <Avatar>
                        <AvatarImage src={comment.user.image ?? "https://github.com/shadcn.png"} />
                    </Avatar>
                    <Typography>{comment.user?.name} - <time dateTime={dateTz(comment.createdAt.toString()) as string}>{(dateTz(comment.createdAt.toString()) as Dayjs).from(new Date())}</time></Typography>
                </div>
            </header>
            <p className="mt-2">
                {comment.content}
            </p>
            <div className="flex justify-between w-full">
                <Button variant="link" className="text-if_blue underline underline-offset-2" onClick={() => setParentComment && setParentComment(comment)}>Répondre</Button>
                <Button variant={"ghost"} onClick={likeComment} className="space-x-2">
                    <Heart className={cn(isLiked && "fill-black")} />
                    <Typography>{isLoading ? <Loader /> : totalLikes}</Typography>
                </Button>
            </div>
            <div className="pl-6 relative">
                <div className="absolute left-0 w-[2px] bg-if_dark h-full"></div>
                {
                    comment.answers?.map(answer => (
                        <CommentCard
                            key={answer.id}
                            comment={answer as Comment & { user: User, _count: { likes: number }, answers: Comment[] }}
                        />
                    ))
                }
            </div>
        </article>
    )
}