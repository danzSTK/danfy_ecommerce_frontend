"use client";

import { InputLabelAnimated } from "@/components/inputs/inputLabelAnimated";
import { IPropsSteps } from "./step1-email";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export function Step3PasswordAndTerms({ form }: Readonly<IPropsSteps>) {
  const {
    register,
    control,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <InputLabelAnimated
        name="password"
        label="Sua senha *"
        register={register}
        error={errors.password}
        type="password"
        autoComplete="new-password"
      />
      {/* 
      <InputLabelAnimated
        name="confirmPassword"
        label="Confirmar Senha"
        register={register}
        error={errors.confirmPassword}
        type="password"
        autoComplete="new-password"
      /> */}

      <FormField
        control={control}
        name="acceptsTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value || false}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Eu aceito os
                <Link href={"/termos"} className="underline hover:text-primary">
                  Termos de Uso *
                </Link>
              </FormLabel>
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="acceptsPrivacy"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>
                Eu aceito a{" "}
                <Link
                  href="/privacidade"
                  className="underline hover:text-primary"
                >
                  Política de Privacidade *
                </Link>
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
