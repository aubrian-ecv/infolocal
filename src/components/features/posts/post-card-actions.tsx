"use client"

import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import { Typography } from "@/components/ui/typography"
import { getBookmarkStatusForUser, getLikeStatusForUser, getTotalCommentsForArticle, getTotalLikesForArticle, getTotalSharesForArticle, likePostAction, savePostAction, sharePostAction, unsavePostAction } from "@/lib/server-actions/post.action"
import { cn } from "@/lib/utils"
import { Article } from "@prisma/client"
import { Bookmark, BookMarked, Heart, MessageSquare, Share } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export type PostCArdActionsProps = {
    article: Article
}

export const PostCArdActions = (props: PostCArdActionsProps) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);

    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    const [totalComments, setTotalComments] = useState(0);
    const [totalShares, setTotalShares] = useState(0);

    useEffect(() => {
        setIsLoading(true);
        new Promise(async (resolve) => {
            const likeStatus = await getLikeStatusForUser(props.article);
            const bookmarkStatus = await getBookmarkStatusForUser(props.article);
            const totalLikes = await getTotalLikesForArticle(props.article);
            const totalComments = await getTotalCommentsForArticle(props.article);
            const totalShares = await getTotalSharesForArticle(props.article);

            setTotalLikes(totalLikes);
            setTotalComments(totalComments);
            setTotalShares(totalShares);
            
            if (bookmarkStatus) {
                setIsBookmarked(true);
            }

            if (likeStatus) {
                setIsLiked(true);
            }

            resolve(true);
        }).finally(() => setIsLoading(false));
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

    const savePost = async () => {
        const status = await savePostAction(props.article);

        if (status) {
            if (status.error === "NOT_LOGGED_IN") {
                router.push('/auth/signin?callbackUrl=/')
            }

            if (status.success) {
                toast.success("L'article a été enregistré avec succès")
                setIsBookmarked(true);
            }
        }
    }

    const unsavePost = async () => {
        const status = await unsavePostAction(props.article);

        if (status) {
            if (status.error === "NOT_LOGGED_IN") {
                router.push('/auth/signin?callbackUrl=/')
            }

            if (status.success) {
                toast.success("L'article n'est plus enregistré")
                setIsBookmarked(false);
            }
        }
    }

    return (
        <div className="flex flex-row gap-4">
            <Button variant={"ghost"} onClick={likePost} className="space-x-2">
                <Heart className={cn(isLiked && "fill-black")} />
                <Typography>{isLoading ? <Loader /> : totalLikes}</Typography>
            </Button>

            <Button variant={"ghost"} className="space-x-2">
                <MessageSquare />
                <Typography>{isLoading ? <Loader /> : totalComments}</Typography>
            </Button>

            <Button variant={"ghost"} onClick={sharePost} className="space-x-2">
                <Share />
                <Typography>{isLoading ? <Loader /> : totalShares}</Typography>
            </Button>

            <Button variant={"ghost"} onClick={isBookmarked ? unsavePost : savePost} className="space-x-2 ml-auto">
                <Bookmark className={cn(isBookmarked && "fill-black")} />
            </Button>
        </div>
    )
}