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
    hub: Hub,
    buttonColor?: "white" | "blue"
    iconColor?: "white" | "black"
}

export const HubCardActions = ({ hub, buttonColor = "white", iconColor = "white"}: HubCardActionsProps) => {
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [totalLikes, setTotalLikes] = useState(0);
    const [hasJoined, setHasJoined] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        new Promise(async (resolve) => {
            const likeStatus = await getLikeStatusForUser(hub);
            const joinStatus = await getJoinStatusForUser(hub);
            const totalLikes = await getTotalLikesForHub(hub);

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
        const status = await likeHubAction(hub);

        if (status) {
            if (status.error === "NOT_LOGGED_IN") {
                router.push('/auth/signin?callbackUrl=/')
            }

            if (status.success) {
                setIsLiked(true);
                getTotalLikesForHub(hub).then(setTotalLikes);
            }
        }
    }

    const shareHub = async () => {
        await navigator.share({
            title: hub.name,
            text: hub.name,
            url: window.location.href
        })
    }

    const joinHub = async () => {
        const status = await joinHubAction(hub);

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
            <Button variant="blue" className={cn(buttonColor === "white" && "bg-white hover:bg-white/90 text-black", "font-bold font-nohemi")} disabled={hasJoined} onClick={joinHub}>
                {hasJoined ? "Rejoint" : "Rejoindre"}
            </Button>

            <Button variant={"ghost"} onClick={likeHub} className={cn("space-x-2 hover:bg-transparent", iconColor === "white" && "text-white hover:text-white")}>
                <Heart className={cn(isLiked && "fill-white")} />
                <Typography>{isLoading ? <Loader /> : totalLikes}</Typography>
            </Button>

            <Button variant={"ghost"} onClick={shareHub} className={cn("space-x-2", iconColor === "white" && "text-white")}>
                <Share />
            </Button>
        </div>
    )
}