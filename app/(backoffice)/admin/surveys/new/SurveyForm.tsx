"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Survey, SurveyOptions } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSurvey, updateSurvey } from "../survey.queries";
import { SurveyFormScheme, SurveyFormType } from "./survey.schema";

export type CampaignFormProps = {
    survey?: (Survey & { options: SurveyOptions[] }),
    edit?: boolean
}

export const SurveyForm = (props: CampaignFormProps) => {

    const router = useRouter();

    const form = useZodForm({
        schema: SurveyFormScheme,
        defaultValues: {
            question: props.survey?.question || "",
            options: props.survey?.options || [{ label: "" }, { label: "" }],
            createdAt: props.survey?.createdAt || new Date(),
            published: props.survey?.published || false
        }
    });

    const submitMutation = useMutation({
        mutationFn:
            async (values: SurveyFormType) => {
                const { type, message } = props.edit ? await updateSurvey(props.survey!.id, values) : await createSurvey(values);

                if (type === "success") {
                    toast.success(props.edit ? "Sondage modifié avec succès" : "Sondage crée avec succès");
                    router.push("/admin/surveys");
                }

                if (type === "error") {
                    toast.error(message);
                }
            }
    });

    async function onSubmit(values: SurveyFormType) {
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
                name="question"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Question</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="options"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Options</FormLabel>
                        <FormControl>
                            <div className="space-y-2">
                                {field.value.map((option, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                        <Input
                                            value={option.label}
                                            onChange={(e) => field.onChange(field.value.map((o, i) => i === index ? { label: e.target.value } : o))}
                                            name={`options.label`}
                                        />
                                        {
                                            index > 1 &&
                                            <Button
                                                type="button"
                                                onClick={() => field.onChange(field.value.filter((_, i) => i !== index))}
                                            >
                                                Supprimer
                                            </Button>
                                        }
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() => field.onChange([...field.value, { label: "" }])}
                                >
                                    Ajouter une option
                                </Button>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Publié le sondage ?</FormLabel>
                        <FormControl>
                            <Switch
                                onCheckedChange={(checked) => {
                                    field.onChange(checked);
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit">{props.edit ? "Modifier" : "Créer"} le sondage</Button>
        </Form>
    )
}