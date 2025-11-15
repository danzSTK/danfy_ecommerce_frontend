import { InputLabelAnimated } from "@/components/inputs/inputLabelAnimated";
import { IPropsSteps } from "./step1-email";

import React from "react";

export function Step2PersonalInfo({ form }: Readonly<IPropsSteps>) {
  const {
    register,
    formState: { errors },
    control,
  } = form;

  return (
    <div className="space-y-6">
      <InputLabelAnimated
        name="name"
        label="Nome Completo *"
        register={register}
        error={errors.name}
        autoComplete="name"
      />

      <InputLabelAnimated
        name="phone"
        label="Telefone"
        error={errors.phone}
        type="tel"
        autoComplete="tel"
        mask="(00) 00000-0000"
        unmask={true}
        control={control}
      />
    </div>
  );
}
