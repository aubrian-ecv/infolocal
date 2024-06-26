import { prisma } from "@/lib/prisma"
import { Comment } from "@prisma/client"
import { CommentCard } from "./comment-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export type CommentsSectionProps = {
    comments: Comment[],
}

export const CommentsSection = ({ comments }: CommentsSectionProps) => {
    if(!comments || comments.length == 0) {
        return null
    }

    return (
        <section aria-label="Section de commentaires">
            {
                comments.map((comment) => {
                    return <CommentCard key={comment.id} comment={comment}/>
                })
            }

            <div className="h-[2px] bg-if_dark w-full !my-4"></div>

            <div className="flex justify-between">
                <Input type="text" className="w-8/12" placeholder="Très bon article !"></Input>
                <Button variant={"blue"} className="w-3/12 font-nohemi text-lg">Publier</Button>
            </div>
        </section>
    )
}