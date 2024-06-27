"use client";
import { ReactComponent as HomeIcon } from "@/assets/icons/home.svg";
import { ReactComponent as PlayIcon } from "@/assets/icons/play.svg";
import { ReactComponent as SearchIcon } from "@/assets/icons/search.svg";
import { ReactComponent as CommentIcon } from "@/assets/icons/comment.svg";
import { ReactComponent as AvatarIcon } from "@/assets/icons/avatar.svg";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useEffect, useState } from "react";
import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";
import { getUserData } from "@/lib/server-actions/user.action";

export type FooterProps = {
}

export const Footer = (props: FooterProps) => {

    const session = useSession();
    const router = useRouter();
    const path = usePathname();

    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getUserData()
            .then((user) => {
                setUser(user);
            });
    }, [session])


    const goToProfilePage = () => {
        if (session.status === "unauthenticated") {
            router.push('/auth/signin?callbackUrl=/profile')
            return;
        }
        router.push('/profile')
    }

    return (
        <footer className="sticky bottom-0 w-full h-12 border-t border-if_lightgrey bg-if_blue mt-4">
            <nav className="w-full flex justify-between px-4 py-2 absolute inset-0">
                <Link href="/" className="my-auto h-full"><HomeIcon className={cn("h-auto w-full block relative top-1/2 -translate-y-1/2", path === "/" && "fill-white")} aria-hidden="true" width={26} height={27} /></Link>
                <Link href="/search" className="my-auto h-full"><SearchIcon className={cn("h-auto w-full block relative top-1/2 -translate-y-1/2", path === "/search" && "fill-white")} aria-hidden="true" width={27} height={26} /></Link>
                <Link href="/live" className="my-auto h-full"><PlayIcon className={cn("h-auto w-full block relative top-1/2 -translate-y-1/2", path === "/live" && "fill-white")} aria-hidden="true" width={21} height={28} /></Link>
                <Link href="/hubs" className="my-auto h-full"><CommentIcon className={cn("h-auto w-full block relative top-1/2 -translate-y-1/2", path === "/hubs" && "fill-white")} aria-hidden="true" width={32} height={32} /></Link>
                <button onClick={goToProfilePage} className="my-auto h-full">
                    {
                        user ?
                            <Avatar className="size-8">
                                <AvatarImage src={user.image ?? "https://github.com/shadcn.png"} alt={user.name ?? "Votre photo"} />
                            </Avatar>
                            :
                            <AvatarIcon className="w-8 h-8" />
                    }
                </button>
            </nav>
        </footer>
    )
}