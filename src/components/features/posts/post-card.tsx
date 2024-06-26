import { dateTz } from "@/lib/date/date-tz"
import { Article } from "@prisma/client"
import { Dayjs } from "dayjs"
import Image from "next/image"
import { Avatar, AvatarImage } from "../../ui/avatar"
import { Typography } from "../../ui/typography"
import { PostCArdActions } from "./post-card-actions"
import { cn } from "@/lib/utils"
import Link from "next/link"

export type PostCardProps = {
    article: Article,
    size?: "small" | "large"
}

export const PostCard = ({ article, size = "small" }: PostCardProps) => {
    return (
        <div className="bg-if_lightgrey shadow-md p-5 rounded-md space-y-3">
            {
                article.keywords.length > 0 &&
                <ul className="flex flex-row gap-1">
                    {article.keywords.split(',').map(keyword => (
                        <li
                            key={keyword}
                            className={"bg-if_darkblue text-white rounded-tl-md rounded-br-md w-max px-2 py-1 text-xs"}
                        >
                            {keyword}
                        </li>
                    ))}
                </ul>
            }

            <Link href={'/article/' + article.id} className={cn("flex flex-row", size === "large" && "flex-col")}>
                <div className="space-y-3">
                    <div className="flex flex-row gap-2 items-center">
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" />
                        </Avatar>
                        <Typography>{article.author} - {(dateTz(article.publicationDate.toString()) as Dayjs).from(new Date())}</Typography>
                    </div>
                    <Typography variant="h2" className="text-lg">{article.title}</Typography>
                </div>
                <Image 
                    src={article.imageUrl}
                    alt={article.imageCaption}
                    width={size === "small" ? 200 : 400}
                    height={size === "small" ? 200 : 300}
                    className={cn("object-contain rounded-md w-1/3 h-full", size === "large" && "w-full object-cover")}
                />
            </Link>

            <PostCArdActions article={article} />
        </div>
    )
}