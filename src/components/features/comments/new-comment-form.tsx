"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { createComment } from "@/lib/server-actions/comment.action";
import { Comment, User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { z } from "zod";
import { CommentCard } from "./comment-card";
import { Typography } from "@/components/ui/typography";

export type NewCommentFormProps = {
    parentComment?: (Comment & { user: User, _count: { likes: number }, answers: Comment[] });
    setParentComment?: (comment?: (Comment & { user: User, _count: { likes: number }, answers: Comment[] })) => void;
}

const schema = z.object({
    content: z.string().min(1, { message: "Le contenu du commentaire est obligatoire." }),
});

export const NewCommentForm = (props: NewCommentFormProps) => {

    const { articleId, hubId } = useParams();
    const router = useRouter();

    const form = useZodForm({
        schema,
        defaultValues: {
            content: ""
        }
    })

    const submitMutation = useMutation({
        mutationFn: async (values: z.infer<typeof schema>) => {
            const status = await createComment(values.content, { articleId: articleId as string, hubId: hubId as string,  parentId: props.parentComment?.id });

            if (status) {
                if (status.error === "NOT_LOGGED_IN") {
                    router.push('/auth/signin?callbackUrl=/')
                }

                if (status.success) {
                    props.setParentComment && props.setParentComment(undefined);
                    form.setValue("content", "");
                    router.refresh();
                }
            }
        }
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        return submitMutation.mutate(values);
    }

    return (
        <>
            {
                props.parentComment && (
                    <div className="mb-6">
                        <div className="flex flex-row justify-between">
                            <Typography>
                                Réponse à :
                            </Typography>
                            <Button variant="link" onClick={() => props.setParentComment && props.setParentComment(undefined)}>Annuler</Button>
                        </div>
                        <div className="bg-if_lightgrey scale-90 p-2 rounded-md">
                            <CommentCard
                                comment={props.parentComment}
                            />
                        </div>
                    </div>
                )
            }

            <Form
                form={form}
                onSubmit={onSubmit}
                className="w-full flex justify-between items-center"
            >
                <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                        <FormItem className="w-8/12 space-y-0">
                            <FormLabel className="sr-only">
                                Votre commentaire
                            </FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Très bon article !" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button variant={"blue"} className="w-3/12 font-nohemi text-lg">Publier</Button>
            </Form>
        </>
    )
}