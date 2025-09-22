

import { InputLabelAnimated } from "@/components/inputs/inputLabelAnimated";
import { RegisterUserFormData } from "@/interfaces/schemas/registerUserSchema";
import { UseFormReturn } from "react-hook-form";

export interface IPropsSteps {
  form: UseFormReturn<RegisterUserFormData>;
}

export function Step1Email({ form }: Readonly<IPropsSteps>) {
  const {
    register,
    formState: { errors },
  } = form;
  return (
    <InputLabelAnimated
      name="email"
      label="Seu E-mail *"
      register={register}
      error={errors.email}
      type="email"
      autoComplete="email"
    />
  );
}
