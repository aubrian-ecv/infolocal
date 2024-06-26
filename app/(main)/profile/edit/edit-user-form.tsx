"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form"
import { EditUserFormScheme, EditUserFormType } from "./edituser.schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import { updateUser } from "@/lib/server-actions/user.action"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export type EditUserFormProps = {
    user: User
}

export const EditUserForm = (props: EditUserFormProps) => {

    const router = useRouter();

    const form = useZodForm({
        schema: EditUserFormScheme,
        defaultValues: {
            name: props.user.name ?? "",
            email: props.user.email ?? ""
        }
    })

    const submitMutation = useMutation({
        mutationFn:
            async (values: EditUserFormType) => {
                const status = await updateUser(values);

                if (status.success) {
                    toast.success("Votre profil a été mis à jour");
                    router.refresh();
                    router.push("/profile");
                    return;
                }

                if (status.error) {
                    toast.error("Il y a eu une erreur lors de la mise à jour de votre profil");
                }
            }
    });

    async function onSubmit(values: EditUserFormType) {
        return submitMutation.mutate(values);
    }

    return (
        <Form
            form={form}
            onSubmit={onSubmit}
            className="space-y-4 w-full flex flex-col items-center"
        >
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Votre nom</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className="w-full">
                        <FormLabel>Votre email</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button variant="blue" type="submit">
                Mettre à jour
            </Button>
        </Form>
    )
}