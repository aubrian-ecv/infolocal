import { z } from "zod";

export const EditUserFormScheme = z.object({
  name: z.string().min(1, "Le nom est requis"),
  email: z.string().email("L'email est invalide")
});

export type EditUserFormType = z.infer<
  typeof EditUserFormScheme
>;