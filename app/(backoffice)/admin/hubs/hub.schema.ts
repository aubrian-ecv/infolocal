import { z } from "zod";

export const HubFormScheme = z.object({
  name: z.string().min(1, { message: "Le nom de la campagne est obligatoire." }),
  keywords: z.string().min(1, { message: "Les mots-clés sont obligatoires." }),
});

export type HubFormType = z.infer<
  typeof HubFormScheme
>;