import { PostCArdActions } from "@/components/features/posts/post-card-actions";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/typography";
import { dateTz } from "@/lib/date/date-tz";
import { prisma } from "@/lib/prisma";
import type { PageParams } from "@/types/next";
import { Dayjs } from "dayjs";
import Link from "next/link";
import { ReactComponent as LeftArrow } from "@/assets/icons/leftArrow.svg";
import { CommentsSection } from "@/components/features/comments/comments-section";
export default async function RoutePage(props: PageParams<{ articleId: string }>) {
    const article = await prisma.article.findUnique({
        where: {
            "id": parseInt(props.params.articleId)
        }, 
        include: {
            comments: {
                include: {
                    answers: true,
                    user: true,
                    likes: true
                }
            }
        }
    })

    if (!article) {
        return null
    }

    return (
        <section className="space-y-6 w-11/12 mx-auto my-2 text-if_dark">
            {/* Go back link */}
            <Link className="flex" href={'/'}>
                <LeftArrow className="my-auto" aria-hidden="true" width={16} height={14}/>
                <p className="ml-3">Retour</p>
            </Link>
            
            {/* Article theme list */}
            {
                article!.keywords.length > 0 &&
                <ul className="flex flex-row gap-1">
                    {article?.keywords.split(',').map(keyword => (
                        <li
                            key={keyword}
                            className={"bg-if_darkblue text-white rounded-tl-md rounded-br-md w-max px-2 py-1 text-xs"}
                        >
                            {keyword}
                        </li>
                    ))}
                </ul>
            }

            {/* Avatar image with informations */}
            <div className="flex flex-row gap-2 items-center">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
                <Typography>{article.author} - {(dateTz(article.publicationDate.toString()) as Dayjs).from(new Date())}</Typography>
            </div>


            {/* Article title, image, and actions */}
            <Typography variant={"h1"} className="font-roboto">{article?.title}</Typography>
            <img src={article.imageUrl} />
            <PostCArdActions article={article} />

            <div className="h-[2px] bg-if_dark w-full mt-2"></div>

            {/* Article description */}
            <Typography variant={"p"}>{article.content}</Typography>

            <div className="h-[2px] bg-if_dark w-full !my-14"></div>
            
            {/* Article comments section */}
            <CommentsSection comments={article.comments}/>
        </section>
    )
}