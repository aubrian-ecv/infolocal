"use client"

import { Button } from "@/components/ui/button"
import { Loader } from "@/components/ui/loader"
import { Typography } from "@/components/ui/typography"
import { getJoinStatusForUser, getLikeStatusForUser, getTotalLikesForHub, joinHubAction, likeHubAction } from "@/lib/server-actions/hub.action"
import { cn } from "@/lib/utils"
import { Hub } from "@prisma/client"
import { Heart, Share } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export type HubCardActionsProps = {
    hub: Hub
}

export const HubCardActions = (props: HubCardActionsProps) => {

    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    const [hasJoined, setHasJoined] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        new Promise(async (resolve) => {
            const likeStatus = await getLikeStatusForUser(props.hub);
            const joinStatus = await getJoinStatusForUser(props.hub);
            const totalLikes = await getTotalLikesForHub(props.hub);

            setTotalLikes(totalLikes);

            if (joinStatus) {
                setHasJoined(true);
            }

            if (likeStatus) {
                setIsLiked(true);
            }

            resolve(true);
        }).finally(() => setIsLoading(false));
    }, [])

    const likeHub = async () => {
        const status = await likeHubAction(props.hub);

        if (status) {
            if (status.error === "NOT_LOGGED_IN") {
                router.push('/auth/signin?callbackUrl=/')
            }

            if (status.success) {
                setIsLiked(true);
                getTotalLikesForHub(props.hub).then(setTotalLikes);
            }
        }
    }

    const shareHub = async () => {
        await navigator.share({
            title: props.hub.name,
            text: props.hub.name,
            url: window.location.href
        })
    }

    const joinHub = async () => {
        const status = await joinHubAction(props.hub);

        if (status) {
            if (status.error === "NOT_LOGGED_IN") {
                router.push('/auth/signin?callbackUrl=/')
            }

            if (status.success) {
                setHasJoined(true);
                router.refresh();
            }
        }
    }

    return (
        <div className="flex flex-row">
            <Button className="bg-white hover:bg-white/90 text-black font-bold font-nohemi" disabled={hasJoined} onClick={joinHub}>
                {hasJoined ? "Rejoint" : "Rejoindre"}
            </Button>

            <Button variant={"ghost"} onClick={likeHub} className="space-x-2 text-white hover:bg-transparent hover:text-white">
                <Heart className={cn(isLiked && "fill-white")} />
                <Typography>{isLoading ? <Loader /> : totalLikes}</Typography>
            </Button>

            <Button variant={"ghost"} onClick={shareHub} className="space-x-2 text-white">
                <Share />
            </Button>
        </div>
    )
}