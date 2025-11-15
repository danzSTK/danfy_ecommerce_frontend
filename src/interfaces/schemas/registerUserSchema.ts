import z from "zod";
import { COUNTRYS } from "../Constants";

/* const capitalizeEachWord = (s: string) =>
  s.replace(
    /\b(\p{L})(\p{L}*)/gu,
    (_m, first, rest) => first.toUpperCase() + rest.toLowerCase()
  ); */

export const registerUserSchema = z.object({
  email: z.email({
    pattern: z.regexes.html5Email,
    message: "Digite um email válido",
  }),
  name: z
    .string("Nome é obrigatório")
    .min(2, "Digite um nome válido")
    .max(255, "Nome deve ter no máximo 255 caracteres"),

  phone: z.string().nullable(),
  country: z.enum(COUNTRYS).default("BR").optional().nullable(),
  state: z.string().optional(),

  password: z
    .string("Senha é obrigatória")
    .min(8, "Senha deve ter pelo menos 8 caracteres")
    .max(20, "Senha deve ter no máximo 20 caracteres"),
  /*     confirmPassword: z
      .string("Confirmação de senha é obrigatória")
      .min(8, "Confirmação de senha deve ter pelo menos 8 caracteres")
      .max(20, "Confirmação de senha deve ter no máximo 20 caracteres"), */
  acceptsTerms: z
    .boolean("Você deve aceitar os termos")
    .default(false)
    .optional()
    .nullable(),
  acceptsPrivacy: z
    .boolean("Você deve aceitar a política de privacidade")
    .default(false)
    .optional(),
  acceptsEmailMarketing: z.boolean().default(false).optional(),
  acceptsSmsMarketing: z.boolean().default(false).optional(),
  acceptsWhatsappMarketing: z.boolean().default(false).optional(),
});
/*   .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  }); */

export type RegisterUserFormData = z.infer<typeof registerUserSchema>;
