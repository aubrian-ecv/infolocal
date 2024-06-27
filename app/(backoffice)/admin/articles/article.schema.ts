import { z } from "zod";

export const ArticleFormScheme = z.object({
  name: z.string().min(1, { message: "Le nom de la campagne est obligatoire." }),
  keywords: z.string().min(1, { message: "Les mots-clés sont obligatoires." }),
});

export type ArticleFormType = z.infer<
  typeof ArticleFormScheme
>;