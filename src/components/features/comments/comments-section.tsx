import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Comment, User } from "@prisma/client"
import { CommentCard } from "./comment-card"

export type CommentsSectionProps = {
    comments: (Comment & { user: User, _count: { likes: number }, answers: Comment[] })[],
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