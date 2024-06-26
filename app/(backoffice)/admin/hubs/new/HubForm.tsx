"use client"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form"
import { HubFormScheme, HubFormType } from "../hub.schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useMutation } from "@tanstack/react-query"
import { createHub } from "../hubs.queries"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export type HubFormProps = {
  
}

export const HubForm = (props: HubFormProps) => {

    const router = useRouter();

    const form = useZodForm({
        schema: HubFormScheme
    })

    const submitMutation = useMutation({
        mutationFn: async (values: HubFormType) => {
            const hub = await createHub(values);

            if (hub) {
                router.push('/admin/hubs');
                router.refresh();
                return;
            }

            toast.error("Erreur lors de la création du hub");
        }   
    })

    const onSubmit = async (values: HubFormType) => {
        return submitMutation.mutate(values);
    }

  return (
    <Form
        form={form}
        onSubmit={onSubmit}
        className="space-y-4"
    >
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={field.name}>Nom</FormLabel>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
        <FormField 
            control={form.control}
            name="keywords"
            render={({ field }) => (
                <FormItem>
                    <FormLabel htmlFor={field.name}>Mots-clés</FormLabel>
                    <FormDescription className="italic">À séparer par une virgule (,)</FormDescription>
                    <FormControl>
                        <Input {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />

        <Button type="submit">Créer le hub</Button>
    </Form>
  )
}