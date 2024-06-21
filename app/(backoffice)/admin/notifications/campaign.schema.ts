import { z } from "zod";

export const CampaignFormScheme = z.object({
  name: z.string().min(1, { message: "Le nom de la campagne est obligatoire." }),
  live: z.boolean().default(false),
  push_time: z.string().min(1, { message: "La date d'envoi est obligatoire." }),
  messages: z.array(
    z.object({
      title: z.string().optional(),
      body: z.string().min(1, { message: "Le corps du message est obligatoire." }),
      deeplink: z.string().optional()
    }),
  ),
  recurrence: z.object({
    end_date: z.string({ required_error: "La date de fin est obligatoire." }),
    repeat_unit: z.enum(["DAILY", "WEEKLY", "MONTHLY"], { required_error: "L'unité de répétition est obligatoire." }),
    repeat_frequency: z.number({ required_error: "La fréquence est obligatoire." }),
  }).optional(),
  capping: z.number().default(1)
});

export type CampaignFormType = z.infer<
  typeof CampaignFormScheme
>;