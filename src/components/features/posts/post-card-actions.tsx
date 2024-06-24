"use client"

import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { getLikeStatusForUser, getTotalCommentsForArticle, getTotalLikesForArticle, getTotalSharesForArticle, likePostAction, sharePostAction } from "@/lib/server-actions/post.action"
import { cn } from "@/lib/utils"
import { Article } from "@prisma/client"
import { get } from "http"
import { Heart, MessageSquare, Share } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export type PostCArdActionsProps = {
    article: Article
}

export const PostCArdActions = (props: PostCArdActionsProps) => {

    const router = useRouter();

    const [isLiked, setIsLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [totalShares, setTotalShares] = useState(0);

    useEffect(() => {
        getLikeStatusForUser(props.article).then(setIsLiked);
        getTotalLikesForArticle(props.article).then(setTotalLikes);
        getTotalSharesForArticle(props.article).then(setTotalShares);
        getTotalCommentsForArticle(props.article).then(setTotalComments);
    }, [])

    const likePost = async () => {
        const status = await likePostAction(props.article);

        if (status) {
            if (status.error === "NOT_LOGGED_IN") {
                router.push('/auth/signin?callbackUrl=/')
            }

            if (status.success) {
                setIsLiked(true);
                getTotalLikesForArticle(props.article).then(setTotalLikes);
            }
        }
    }

    const sharePost = async () => {
        sharePostAction(props.article);
        getTotalSharesForArticle(props.article).then(setTotalShares);
        await navigator.share({
            title: props.article.title,
            text: props.article.imageCaption,
            url: window.location.href
        })
    }

    return (
        <div className="flex flex-row gap-4">
            <Button variant={"ghost"} onClick={likePost} className="space-x-2">
                <Heart className={cn(isLiked && "fill-black")} />
                <Typography>{totalLikes}</Typography>
            </Button>

            <Button variant={"ghost"} className="space-x-2">
                <MessageSquare />
                <Typography>{totalComments}</Typography>
            </Button>

            <Button variant={"ghost"} onClick={sharePost} className="space-x-2">
                <Share />
                <Typography>{totalShares}</Typography>
            </Button>
        </div>
    )
}