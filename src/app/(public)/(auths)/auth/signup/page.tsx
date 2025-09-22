"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  RegisterUserFormData,
  registerUserSchema,
} from "@/interfaces/schemas/registerUserSchema";
import { useRegisterUserMutation } from "@/services/routes/User";
import { type ICretedUserRequest } from "@/interfaces/AuthInterface";
import { type Countrys } from "@/interfaces/Constants";

import { toast } from "sonner";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";

import { Button } from "@/components/ui/button";
import { Loader2, ShoppingBag } from "lucide-react";

import { Step1Email } from "@/view/signup/step1-email";
import { Step2PersonalInfo } from "@/view/signup/step2-personInfo";
import { Step3PasswordAndTerms } from "@/view/signup/step3-passwordAndterms";
import TitleComponent from "@/components/titles/Title";
import SubtitleComponent from "@/components/titles/Subtitle";
import { Form } from "@/components/ui/form";

const steps = [
  {
    id: 1,
    name: "Credenciais",
    fields: ["email"] as const,
  },
  {
    id: 2,
    name: "Informações Pessoais",
    fields: ["name", "phone"] as const,
  },
  {
    id: 3,
    name: "Senha e Termos",
    fields: ["password", "acceptsTerms", "acceptsPrivacy"] as const,
  },
];

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const router = useRouter();



  const form = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      password: "",
      country: "BR",
      state: "",
      acceptsTerms: false,
      acceptsPrivacy: false,
      acceptsEmailMarketing: false,
      acceptsSmsMarketing: false,
      acceptsWhatsappMarketing: false,
    },
  });
  const { trigger } = form;

  const processForm = async (data: RegisterUserFormData) => {
    console.log(data);
    try {
      const requestData: ICretedUserRequest = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone || null,
        acceptsTerms: data.acceptsTerms || false,
        acceptsPrivacy: data.acceptsPrivacy || false,
        acceptsEmailMarketing: data.acceptsEmailMarketing || false,
        acceptsSmsMarketing: data.acceptsSmsMarketing || false,
        acceptsWhatsappMarketing: data.acceptsWhatsappMarketing || false,
        locale: "pt-BR",
        currency: "BRL",
        country: data.country as Countrys,
        state: data.state || null,
      };

      await registerUser(requestData).unwrap();
      toast.success(
        "Cadastro realizado com sucesso! Verifique seu email para ativar sua conta."
      );
      router.push("/auth/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const isBaseQueryError = (err: unknown): err is FetchBaseQueryError =>
        typeof err === "object" && err !== null && "status" in err;

      if (isBaseQueryError(error)) {
        if (error.status === 409) {
          toast.error(error?.data?.message);
        } else {
          const errorMessage =
            (error.data as { message?: string })?.message ||
            "Ocorreu um erro ao realizar o cadastro.";
          toast.error(errorMessage);
        }
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    }
  };

  const nextStep = async () => {
    const fields = steps[currentStep - 1].fields;
    const output = await trigger(fields, { shouldFocus: true });

    if (!output) return;

    if (currentStep < steps.length) {
      setCurrentStep((step) => step + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <div className="container h-screen">
      <header className="flex space-x-2 justify-center text-muted-foreground items-center text-xl py-4">
        <h1 className="font-bold font-mono text-center">Danfyshop</h1>
        <ShoppingBag />
      </header>
      <main className="mt-28 flex flex-col justify-center space-y-2 max-w-md mx-auto md:shadow-lg md:p-6 md:rounded-lg md:border">
        <TitleComponent
          as="h2"
          className=" text-center text-2xl md:text-2xl text-primary"
        >
          Crie sua Conta
        </TitleComponent>
        <SubtitleComponent className="text-center text-wrap mb-5 font-semibold">
          Cadastre-se e aproveite ofertas exclusivas com Danfyshop!
        </SubtitleComponent>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(processForm)}
            noValidate
            className="space-y-3 mt-8"
          >
            <SubtitleComponent className="text-center text-wrap">
              Etapa {currentStep} de {steps.length}:{" "}
              {steps[currentStep - 1].name}
            </SubtitleComponent>
            {currentStep === 1 && <Step1Email form={form} />}
            {currentStep === 2 && <Step2PersonalInfo form={form} />}
            {currentStep === 3 && <Step3PasswordAndTerms form={form} />}

            <div className="flex justify-between items-center mt-4">
              {currentStep > 1 ? (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Voltar
                </Button>
              ) : (
                <div />
              )}

              {currentStep < steps.length ? (
                <button
                  id="next-step-button"
                  aria-label="Avançar para a proxima etapa"
                  title="Avançar para a proxima etapa"
                  type="button"
                  onClick={nextStep}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
                >
                  Avançar
                </button>
              ) : (
                <Button
                  id="submit-button"
                  type="submit"
                  disabled={isLoading}
                  aria-label="Finalizar Cadastro"
                  title="Finalizar Cadastro"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Finalizar Cadastro
                </Button>
              )}
            </div>
          </form>
        </Form>

        <footer className=" text-center text-sm mt-6">
          <span className="text-muted-foreground">
            Já tem uma conta?{" "}
            <Button
              className="cursor-pointer"
              variant={"link"}
              onClick={() => router.push("/auth/login")}
            >
              Faça Login
            </Button>
          </span>

          <SubtitleComponent className="text-center text-wrap">
            Os campos obrigatórios contém *
          </SubtitleComponent>
        </footer>
      </main>
    </div>
  );
}
