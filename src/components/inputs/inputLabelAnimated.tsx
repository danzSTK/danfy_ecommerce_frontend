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

/**
 * Input component with animated label and masking support.
 *
 * Sempre que a prop `mask` for fornecida, o componente usará `IMaskInput` para aplicar a máscara ao campo de entrada.
 * Caso contrário, ele funcionará como um input padrão.
 *
 * Se quiser usar máscara, deve fornecer a prop `control` do react-hook-form. Além disso, a prop `unmask` indica se o valor deve ser desmascarado antes de ser enviado (padrão é true).
 * 
 * Se não quiser usar máscara, pode fornecer a prop `register` do react-hook-form.
 *
 * @returns JSX.Element
 * @prop {string} name - The name of the input field, used for form registration.
 * @prop {string} label - The label for the input field.
 * @prop {UseFormRegister<TFieldValues>} [register] - The register function from react-hook-form.
 * @prop {Control<TFieldValues>} [control] - The control object from react-hook-form.
 * @prop {FieldError} [error] - The error object for the input field.
 * @prop {string} [mask] - A máscara a ser aplicada ao campo de entrada em formato de string (ex: "(99) 99999-9999").
 * @prop {boolean} [unmask] default = true - Um boleano que indica se o valor deve ser desmascarado antes de ser enviado.
 *
 */

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
    "absolute left-3 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-background px-1 text-sm md:text-base text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary",
    error ? "text-destructive peer-focus:text-destructive" : ""
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
                  onAccept={(value: any, maskRef: { unmaskedValue: any }) => {
                    // Se unmask=true, envia o valor sem formatação
                    const rawValue = unmask ? maskRef.unmaskedValue : value;
                    field.onChange(rawValue);
                  }}
                  // Props do input
                  id={inputId}
                  type={inputType}
                  placeholder=" "
                  disabled={disabled}
                  // Restante das props
                  {...props}
                  // Outros handlers do react-hook-form
                  className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    inputClass
                  )}
                  unmask={unmask}
                  onBlur={field.onBlur}
                  name={field.name}
                />
                <Label htmlFor={inputId} className={labelClass}>
                  {label}
                </Label>
              </div>
            )}
          />
        ) : (
          // Input normal para campos sem máscara
          <>
            <Input
              id={inputId}
              type={inputType}
              placeholder=" "
              className={inputClass}
              disabled={disabled}
              {...(register ? register(name) : {})}
              {...props}
            />

            <Label htmlFor={inputId} className={labelClass}>
              {label}
            </Label>
          </>
        )}

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
