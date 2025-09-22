import {
  FieldError,
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import React from "react";
import { cn, mergeRefs } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

// Nao conseguimos uma forma de usar o setValue do react-hook-form com o react-imask sem usar 'any'. Preciso ajuda de alguem mais experiente nisso.
// Preciso de uma forma de setar o valor do input limpo, sem a mascara, para o react-hook-form.

interface InputLabelAnimatedProps<TFieldValues extends FieldValues>
  extends React.ComponentProps<"input"> {
  name: Path<TFieldValues>;
  label: string;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
}

export const InputLabelAnimated = <TFieldValues extends FieldValues>({
  name,
  label,
  register,
  error,
  type = "text",
  ref,
  ...props
}: InputLabelAnimatedProps<TFieldValues>) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const inputId = props.id || name;
  const inputType = type === "password" && showPassword ? "text" : type;

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // Separa a ref do resto das propriedades do register
  const { ref: rhfRef, ...restRegister } = register(name);

  return (
    <div>
      <div className="relative w-full">
        <Input
          id={inputId}
          type={inputType}
          ref={mergeRefs(rhfRef, ref)} // Usa a função que combina as refs
          {...props}
          placeholder=" "
          {...restRegister} // Passa o resto das propriedades do register
          className={cn(
            "peer block h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background focus:outline-none focus:border-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            error ? "border-destructive focus:ring-destructive" : "border-input"
          )}
        />
        <Label
          htmlFor={inputId}
          className={cn(
            "absolute left-3 top-2 z-10 origin-[0] -translate-y-5 scale-75 transform bg-background px-1 text-sm text-muted-foreground duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:text-primary",
            error
              ? "text-destructive peer-focus:text-destructive"
              : "text-muted-foreground peer-focus:text-primary"
          )}
        >
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
