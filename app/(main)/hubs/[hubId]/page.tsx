import { CommentsSection } from "@/components/features/comments/comments-section";
import { HubCardActions } from "@/components/features/hubs/hub-card-actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import { getHubDetails } from "@/lib/server-actions/hub.action";
import type { PageParams } from "@/types/next";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{ hubId: string }>) {

    const hub = await getHubDetails(parseInt(props.params.hubId));

    if (!hub) return null;

    return (
        <main className="px-5">
            <div className="space-y-4 my-4">
                <Link href=".." className="flex flex-row gap-2"><ArrowLeft />Retour</Link>

                {
                    hub.keywords.length > 0 &&
                    <ul className="flex flex-row gap-1">
                        {hub.keywords.split(',').map(keyword => (
                            <li
                                key={keyword}
                                className={"bg-if_dark text-white rounded-tl-md rounded-br-md w-max px-2 py-1 text-xs"}
                            >
                                {keyword}
                            </li>
                        ))}
                    </ul>
                }

                <div className="flex flex-row gap-2 items-center">
                    <Avatar className="border border-white">
                        <AvatarImage src={hub.users[0].image ?? "https://github.com/shadcn.png"} />
                    </Avatar>
                    {hub.users.length > 1 &&
                        <Avatar className="-translate-x-5  border border-if_blue">
                            <AvatarImage src={hub.users[0].image ?? "https://github.com/shadcn.png"} />
                        </Avatar>
                    }
                    <Typography className="" variant="muted">
                        Rejoignez {hub.users[0].name}
                        {
                            hub.users.length > 1 &&
                            ` + ${hub.users.length - 1} autre${hub.users.length > 2 ? 's' : ''}`
                        }
                    </Typography>
                </div>

                <Typography variant="h2">
                    {hub.name}
                </Typography>

                <HubCardActions hub={hub} buttonColor="blue" iconColor="black" />
            </div>

            <div className="h-[2px] bg-if_dark w-full !my-14"></div>

            <CommentsSection 
                comments={hub.comments}
            />
        </main>
    )
}