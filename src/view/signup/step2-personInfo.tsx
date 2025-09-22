import { InputLabelAnimated } from "@/components/inputs/inputLabelAnimated";
import { IPropsSteps } from "./step1-email";
import { useIMask } from "react-imask";
import React from "react";

const phoneMask = {
  mask: "(00) 00000-0000",
};

export function Step2PersonalInfo({ form }: Readonly<IPropsSteps>) {
  const {
    register,
    formState: { errors },
    setValue,
  } = form;

  const { ref: phoneRef, maskRef, value } = useIMask(phoneMask);
  const phoneValue = value;
  const phoneUnmaskedValue = maskRef.current?.unmaskedValue || "";

  React.useEffect(() => {
    console.log("valor do telefone sem mascara:", phoneUnmaskedValue);
    console.log("valor do telefone com mascara:", phoneValue);
    setValue("phone", phoneUnmaskedValue, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [setValue, phoneUnmaskedValue, phoneValue]);

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
        register={register}
        error={errors.phone}
        type="tel"
        autoComplete="tel"
        ref={phoneRef as any}
      />
    </div>
  );
}
