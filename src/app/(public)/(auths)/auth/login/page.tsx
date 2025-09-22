/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TitleComponent from "@/components/titles/Title";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaApple, FaFacebook } from "react-icons/fa";
import { Separator } from "@/components/ui/separator";
import SubtitleComponent from "@/components/titles/Subtitle";
import React from "react";

import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { LoginFormData, loginSchema } from "@/interfaces/schemas/loginSchema";
import { InputLabelAnimated } from "@/components/inputs/inputLabelAnimated";

export default function UserLoginPage() {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function handleUnauthorizedError() {
    setError("password", {
      type: "manual",
      message: "Credenciais inválidas. Tente novamente.",
    });
    setError("email", {
      type: "manual",
      message: "Credenciais inválidas. Tente novamente.",
    });

    toast.error("Credenciais inválidas. Tente novamente.");
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true);

      await login(data);

      toast.success("Login realizado com sucesso!");
      router.push("/");
    } catch (error: any) {
      const unauthorizedError =
        error?.data?.message === "Unauthorized" || error?.status === 401;
      const isInternalServerError = error?.status === 500;

      if (unauthorizedError) {
        handleUnauthorizedError();
        return;
      }

      if (isInternalServerError) {
        toast.error("Erro interno do servidor. Tente novamente mais tarde.");
        return;
      }

      toast.error("Erro ao fazer login. Tente novamente mais tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container h-screen">
      <header className="flex space-x-2 justify-center text-muted-foreground items-center text-xl py-4">
        <h1 className="font-bold font-mono text-center">Danfyshop</h1>
        <ShoppingBag />
      </header>
      <main className="space-y-6 max-w-md mx-auto md:shadow-lg md:p-6 md:rounded-lg md:border md:mt-16">
        <TitleComponent as="h2" className="mb-4 text-center text-lg">
          Entre na sua conta
        </TitleComponent>
        <SubtitleComponent className="text-center text-wrap">
          Entre com sua conta de redes sociais parceiras e aproveite as ofertas
          exclusivas!
        </SubtitleComponent>

        <section className="text-base space-y-2">
          <Button variant={"outline"} className="w-full text-sm">
            <FcGoogle className="size-6" />
            <span className="text-primary">Login com Google</span>
          </Button>
          <Button variant={"outline"} className="w-full text-sm">
            <FaFacebook className="size-6" color="#3b5998" />
            <span className="text-primary">Login com Facebook</span>
          </Button>
          <Button variant={"outline"} className="w-full text-sm">
            <FaApple className="size-6" />
            <span className="text-primary">Login com Apple</span>
          </Button>
        </section>

        <div className="flex items-center my-4 gap-2">
          <Separator className="flex-1" />
          <span>Ou</span>
          <Separator className="flex-1" />
        </div>

        <SubtitleComponent className="text-center text-wrap">
          Entre com seu email e senha e seja feliz com estilo!
        </SubtitleComponent>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <InputLabelAnimated
            name="email"
            label="E-mail"
            register={register}
            error={errors.email}
            type="email"
          />

          <InputLabelAnimated
            name="password"
            type="password"
            label="Sua senha"
            register={register}
            error={errors.password}
          />

          <Button
            className="w-full"
            type="submit"
            disabled={isLoading || isSubmitting}
          >
            Entrar na minha conta
          </Button>
        </form>
        <footer className=" text-center text-sm mt-6">
          <span className="text-muted-foreground">
            Não tem uma conta?{" "}
            <Button
              className="cursor-pointer"
              variant={"link"}
              onClick={() => router.push("/auth/signup")}
            >
              Registre-se
            </Button>
          </span>
        </footer>
      </main>
    </div>
  );
}
