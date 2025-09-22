/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { Metadata } from "next";
import { useRouter } from "next/navigation";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { GuestGuard } from "@/components/providers/GuestGuard";

/* export const metadata: Metadata = {
  title: "login admin",
}; */
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email deve ter um formato válido"),
  password: z
    .string()
    .min(1, "Senha é obrigatória")
    .min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function AdminPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      await login(data);

      router.push("/admin");
    } catch (error: any) {
      /* if (error?.status === 401) {
        setError("password", { message: "Credenciais inválidas" });
        setError("email", { message: "Credenciais inválidas" });
        console.log("Erro 401: Credenciais inválidas");
        return;
      } else if (error?.data?.message) {
        toast.error(error.data.message);
        return;
      } else {
        toast.error("Erro ao fazer login. Tente novamente mais tarde.", error);
        return;
      } */
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GuestGuard>
      <div className="container h-screen">
        <div className="flex items-center justify-center h-full">
          <Card className="w-full max-w-sm md:max-w-md">
            <CardHeader className="text-center">
              <CardTitle className="font-bold text-2xl">Danfy Admin</CardTitle>
              <CardDescription>
                Faça login para acessar o painel administrativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="danfy@exemple.com"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                      <a
                        href="#"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Esqueceu sua senha?
                      </a>
                    </div>
                    <Input
                      type="password"
                      id="password"
                      placeholder="*******"
                      {...register("password")}
                      className={errors.password ? "border-red-500" : ""}
                      disabled={isLoading}
                    />
                    {errors.password && (
                      <p className="text-sm text-red-500">
                        {errors.password.message}
                      </p>
                    )}
                  </div>
                </div>

                <CardFooter className="flex-col gap-2 px-0 pt-6">
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Entrando...
                      </>
                    ) : (
                      "Login"
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    disabled={isLoading}
                  >
                    Login with Google
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </GuestGuard>
  );
}
