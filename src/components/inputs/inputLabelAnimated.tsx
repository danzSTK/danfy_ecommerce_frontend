/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
  Controller,
  Control,
} from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { IMaskInput } from "react-imask";

interface InputLabelAnimatedProps<TFieldValues extends FieldValues>
  extends Omit<React.ComponentProps<"input">, "ref"> {
  name: Path<TFieldValues>;
  label: string;
  register?: UseFormRegister<TFieldValues>;
  control?: Control<TFieldValues>;
  error?: FieldError;
  mask?: string;
  unmask?: boolean;
}

export const InputLabelAnimated = <TFieldValues extends FieldValues>({
  name,
  label,
  register,
  control,
  error,
  type = "text",
  mask,
  unmask = true,
  className,
  disabled = false,
  ...props
}: InputLabelAnimatedProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputId = props.id || name;
  const inputType = type === "password" && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const inputClass = cn(
    "peer block h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background focus:outline-none focus:border-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
    error ? "border-destructive focus:ring-destructive" : "border-input",
    className
  );

  const labelClass = cn(
    "absolute left-3 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-background px-1 text-sm text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary",
    error
      ? "text-destructive peer-focus:text-destructive"
      : "text-muted-foreground peer-focus:text-primary"
  );

  return (
    <div>
      <div className="relative w-full">
        {mask && control ? (
          // Usando Controller com IMaskInput para campos com máscara
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <div className="relative">
                <IMaskInput
                  // Configuração da máscara
                  mask={mask}
                  // Valor do campo (do react-hook-form)
                  value={(field.value as any) ?? ""}
                  // Notifica react-hook-form sobre mudanças
                  onAccept={(value, maskRef) => {
                    // Se unmask=true, envia o valor sem formatação
                    const rawValue = unmask ? maskRef.unmaskedValue : value;
                    field.onChange(rawValue);
                  }}
                  // Props do input
                  id={inputId}
                  type={inputType}
                  className={inputClass}
                  placeholder=" "
                  disabled={disabled}
                  // Restante das props
                  {...props}
                  // Outros handlers do react-hook-form
                  unmask={unmask}
                  onBlur={field.onBlur}
                  name={field.name}
                />
              </div>
            )}
          />
        ) : (
          // Input normal para campos sem máscara
          <Input
            id={inputId}
            type={inputType}
            placeholder=" "
            className={inputClass}
            disabled={disabled}
            {...(register ? register(name) : {})}
            {...props}
          />
        )}

        <Label htmlFor={inputId} className={labelClass}>
          {label}
        </Label>

        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground z-20"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? (
              <Eye className="h-5 w-5" />
            ) : (
              <EyeOff className="h-5 w-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1 pl-2">{error.message}</p>
      )}
    </div>
  );
};
