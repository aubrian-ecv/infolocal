import { z } from "zod";

export const SurveyFormScheme = z.object({
  question: z.string().min(1, { message: "La question est obligatoire." }),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  published: z.boolean().default(false),
  options: z.array(
    z.object({
      label: z.string().min(1, { message: "Le libellé de l'option est obligatoire." }),
    })
  ).min(2, { message: "Il faut au moins deux options." })
});

export type SurveyFormType = z.infer<
  typeof SurveyFormScheme
>;