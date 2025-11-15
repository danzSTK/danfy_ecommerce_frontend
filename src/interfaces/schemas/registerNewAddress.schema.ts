import z from "zod";
import { ADDRESS_TYPES } from "../Constants";

const cepRegex = /^\d{5}-?\d{3}$/;

export const addressFormSchema = z.object({
  nomeCompleto: z.string().min(3, "Nome completo é obrigatório"),
  telefone: z.string().min(10, "Telefone inválido"),
  cep: z
    .string()
    .min(8, "CEP é obrigatório")
    .max(9, "CEP inválido")
    .regex(cepRegex, "Formato de CEP inválido (00000-000)"),
  logradouro: z.string().min(1, "Logradouro é obrigatório"),
  numero: z.string().min(1, "Número é obrigatório"),
  complemento: z.string().optional(),
  bairro: z.string().min(1, "Bairro é obrigatório"),
  cidade: z.string().min(1, "Cidade é obrigatória"),
  uf: z.string().min(2, "Estado é obrigatório").max(2),
  referencia: z.string().optional(),
  tipo: z.enum([
    ADDRESS_TYPES.RESIDENTIAL,
    ADDRESS_TYPES.COMMERCIAL,
    ADDRESS_TYPES.OTHER,
  ]),
  isDefault: z.boolean().default(false).optional(),
});

export type AddressFormData = z.infer<typeof addressFormSchema>;
