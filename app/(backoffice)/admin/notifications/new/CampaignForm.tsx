"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, useZodForm } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Typography } from "@/components/ui/typography";
import { Campaign } from "@/types/campaign";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createCampaign, updateCampaign } from "../campaign.queries";
import { CampaignFormScheme, CampaignFormType } from "../campaign.schema";

export type CampaignFormProps = {
    campaign?: Campaign,
    edit?: boolean
}

const timezoneOffset = new Date().getTimezoneOffset();

export const CampaignForm = (props: CampaignFormProps) => {

    const router = useRouter();
    const [recurrentNotification, setRecurrentNotification] = useState(false);

    useEffect(() => {
        if (!recurrentNotification) {
            form.setValue("recurrence", undefined);
        }
    }, [recurrentNotification])

    const form = useZodForm({
        schema: CampaignFormScheme,
        defaultValues: {
            name: props.campaign?.name || "",
            live: props.campaign?.live || false,
            push_time: props.campaign?.push_time ? dayjs(props.campaign.push_time).subtract(timezoneOffset, "minutes").format("YYYY-MM-DDTHH:mm:ss") : "",
            messages: props.campaign?.messages || [{
                title: props.campaign?.messages[0].title || "",
                body: props.campaign?.messages[0].body || "",
                deeplink: props.campaign?.messages[0].deeplink || ""
            }],
            recurrence: props.campaign?.recurrence || undefined,
            capping: props.campaign?.capping || 1
        }
    });

    const submitMutation = useMutation({
        mutationFn:
            async (values: CampaignFormType) => {
                const { response, data } = props.edit ? await updateCampaign(values, props.campaign?.campaign_token ?? "") : await createCampaign(values);

                if (response.status === 201) {
                    toast.success("Campagne créée avec succès");
                    router.push("/admin/notifications");
                }

                if (response.status === 200) {
                    toast.success("Campagne modifiée avec succès");
                    router.push("/admin/notifications");
                }
            }
    });

    async function onSubmit(values: CampaignFormType) {
        if (values.push_time !== "now") {
            values.push_time = dayjs(values.push_time).add(timezoneOffset, "minutes").format("YYYY-MM-DDTHH:mm:ss");
        }
        alert('ICI')
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
                        <FormLabel>Nom de la campagne</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="live"
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Rendre la notification active ?</FormLabel>
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
            <FormField
                control={form.control}
                name="push_time"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Date de début de la campagne</FormLabel>
                        <FormControl>
                            <>
                                <div className="flex flex-row items-center gap-2">
                                    <Label htmlFor="send-now" className="text-gray-500">Envoyer maintenant ?</Label>
                                    <Switch
                                        id="send-now"
                                        onCheckedChange={(checked) => {
                                            if (checked) field.onChange("now");
                                            else field.onChange("");
                                        }}
                                    />
                                </div>
                                <Input type="datetime-local" {...field} />
                            </>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <fieldset>
                <legend>
                    <Typography variant="lead">Message de la notification</Typography>
                </legend>
                <FormField
                    control={form.control}
                    name={`messages.${0}.title`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Titre de la notification</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`messages.${0}.body`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contenu de la notification</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name={`messages.${0}.deeplink`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Lien de la notification</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </fieldset>

            <fieldset>
                <legend>
                    <Typography variant="lead">Notification récurrente ? <Switch onCheckedChange={setRecurrentNotification} /></Typography>
                </legend>
                {
                    recurrentNotification && (
                        <>
                            <FormField
                                control={form.control}
                                name={`recurrence.end_date`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fin de la campagne</FormLabel>
                                        <FormControl>
                                            <Input type="datetime-local" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`recurrence.repeat_unit`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Unité de répétition</FormLabel>
                                        <FormControl>
                                            <ToggleGroup type="single" className="justify-start" variant={"outline"}>
                                                <ToggleGroupItem value="DAILY" onClick={() => field.onChange("DAILY")}>
                                                    Quotidien
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="WEEKLY" onClick={() => field.onChange("WEEKLY")}>
                                                    Hebdomadaire
                                                </ToggleGroupItem>
                                                <ToggleGroupItem value="MONTHLY" onClick={() => field.onChange("MONTHLY")}>
                                                    Mensuel
                                                </ToggleGroupItem>
                                            </ToggleGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`recurrence.repeat_frequency`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fréquence de répétition</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))}  />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name={`capping`}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nombre de fois qu&apos;un utilisateur peut recevoir la notification ?</FormLabel>
                                        <FormControl>
                                            <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))}  />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </>
                    )
                }
            </fieldset>

            <Button type="submit">
                {props.edit ? "Modifier" : "Créer"} la campagne</Button>
        </Form>
    )
}