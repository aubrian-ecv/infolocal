import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { Hub, User } from "@prisma/client"
import { HubCardActions } from "./hub-card-actions"
import Link from "next/link"

export type HubCardProps = {
    hub: (Hub & { users: User[] })
}

export const HubCard = ({ hub }: HubCardProps) => {
    return (
        <div className="bg-if_blue shadow-md p-5 rounded-md space-y-3">
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

            <div>
                <Link href={`/hubs/${hub.id}`} className="space-y-3">
                    {
                        hub.users.length > 0 && (
                            <div className="flex flex-row gap-2 items-center">
                                <Avatar className="border border-white">
                                    <AvatarImage src={hub.users[0].image ?? "https://github.com/shadcn.png"} />
                                </Avatar>
                                {hub.users.length > 1 &&
                                    <Avatar className="-translate-x-5  border border-white">
                                        <AvatarImage src={hub.users[0].image ?? "https://github.com/shadcn.png"} />
                                    </Avatar>
                                }
                                <Typography className="text-white" variant="muted">
                                    Rejoignez {hub.users[0].name}
                                    {
                                        hub.users.length > 1 &&
                                        ` + ${hub.users.length - 1} autre${hub.users.length > 2 ? 's' : ''}`
                                    }
                                </Typography>
                            </div>
                        )
                    }

                    <Typography variant="h2" className="text-white">
                        {hub.name}
                    </Typography>
                </Link>
            </div>

            <HubCardActions hub={hub} />
        </div>
    )
}