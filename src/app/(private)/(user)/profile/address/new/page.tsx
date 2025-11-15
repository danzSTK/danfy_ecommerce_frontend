"use client";

import { InputLabelAnimated } from "@/components/inputs/inputLabelAnimated";
import SubtitleComponent from "@/components/titles/Subtitle";
import TitleComponent from "@/components/titles/Title";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ADDRESS_TYPES } from "@/interfaces/Constants";
import {
  AddressFormData,
  addressFormSchema,
} from "@/interfaces/schemas/registerNewAddress.schema";
import {
  useCreateAddressMutation,
  useGetAddressByCepQuery,
} from "@/services/routes/Addres";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label"; // Corrigindo o import do Label
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect, useCallback } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import debounce from "lodash/debounce"; // Importando apenas a função debounce
import { ICreateAddressRequest } from "@/interfaces/Address.interface";

export default function AddAddressPage() {
  const router = useRouter();
  const [createAddress, { isLoading }] = useCreateAddressMutation();

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      nomeCompleto: "",
      telefone: "",
      cep: "",
      logradouro: "",
      numero: "",
      complemento: "",
      bairro: "",
      cidade: "",
      uf: "",
      referencia: "",
      tipo: ADDRESS_TYPES.RESIDENTIAL,
      isDefault: false,
    },
    mode: "onChange",
  });

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = form;

  const cep = watch("cep");

  // Configuração do RTK Query para buscar dados do CEP
  const { data: cepData, isFetching } = useGetAddressByCepQuery(
    cep.replace(/\D/g, ""),
    {
      skip: !cep || cep.replace(/\D/g, "").length !== 8,
    }
  );

  // Criando a função de debounce usando o lodash
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedCheckCep = useCallback(
    debounce(async (value: string) => {
      if (value && value.replace(/\D/g, "").length === 8) {
        // Valida o CEP usando o schema Zod
        const isValid = await trigger("cep");
        if (isValid) {
          // A consulta será feita automaticamente pelo RTK Query
          // quando o valor do cep mudar e tiver 8 dígitos
          console.log("Buscando CEP:", value);
        }
      }
    }, 800), // Tempo de espera em ms
    []
  );

  // Efeito para acionar o debounce quando o CEP mudar
  useEffect(() => {
    if (cep) {
      debouncedCheckCep(cep);
    }

    // Importante: Limpar o debounce quando o componente desmontar
    return () => {
      debouncedCheckCep.cancel();
    };
  }, [cep, debouncedCheckCep]);

  // Preencher os campos do formulário quando os dados do CEP chegarem
  useEffect(() => {
    if (cepData) {
      setValue("logradouro", cepData.logradouro);
      setValue("bairro", cepData.bairro);
      setValue("cidade", cepData.localidade);
      setValue("uf", cepData.uf);

      // Foca no campo de número após preencher automaticamente
      setTimeout(() => {
        const numeroInput = document.querySelector(
          "[name=numero]"
        ) as HTMLInputElement;
        if (numeroInput) numeroInput.focus();
      }, 100);
    }
  }, [cepData, setValue]);

  const onSubmit = async (dataform: AddressFormData) => {
    try {
      const data: ICreateAddressRequest = {
        nomeCompleto: dataform.nomeCompleto,
        telefone: dataform.telefone,
        cep: dataform.cep.replace(/\D/g, ""),
        numero: dataform.numero,
        complemento: dataform.complemento || undefined,
        referencia: dataform.referencia || undefined,
        isDefault: dataform.isDefault,
        tipo: dataform.tipo,
      };
      await createAddress(data).unwrap();
      toast.success("Endereço adicionado com sucesso!");
      router.push("/profile/personalInfo");
    } catch (error: any) {
      toast.error(error?.data?.message || "Erro ao adicionar endereço");
    }
  };

  return (
    <section className="container space-y-6">
      <TitleComponent as="h3" className="mb-4 text-xl md:text-2xl">
        Minhas informações
      </TitleComponent>

      <section className="">
        <TitleComponent as="h4" className="text-lg md:text-xl mb-4">
          Adicionar novo endereço
        </TitleComponent>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <InputLabelAnimated
            name="nomeCompleto"
            label="Nome Completo *"
            register={register}
            error={errors.nomeCompleto}
          />

          <InputLabelAnimated
            name="telefone"
            label="Telefone *"
            error={errors.telefone}
            mask="(00) 00000-0000"
            control={control}
          />

          <div className="relative">
            <InputLabelAnimated
              name="cep"
              label="CEP *"
              register={register}
              error={errors.cep}
              mask="00000-000"
              control={control}
            />
            {isFetching && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <Loader2 className="h-4 w-4 animate-spin" />
              </div>
            )}
          </div>

          <InputLabelAnimated
            name="numero"
            label="Número *"
            register={register}
            error={errors.numero}
          />

          <InputLabelAnimated
            name="logradouro"
            label="Rua/Avenida"
            register={register}
            error={errors.logradouro}
            disabled
          />

          <InputLabelAnimated
            name="bairro"
            label="Bairro"
            register={register}
            error={errors.bairro}
            disabled
          />

          <InputLabelAnimated
            name="cidade"
            label="Cidade"
            register={register}
            error={errors.cidade}
            disabled
          />

          <InputLabelAnimated
            name="uf"
            label="Estado"
            register={register}
            error={errors.uf}
            disabled
          />

          <InputLabelAnimated
            name="complemento"
            label="Complemento"
            register={register}
            error={errors.complemento}
          />

          <div>
            <Select
              onValueChange={(value) => setValue("tipo", value as any)}
              defaultValue={form.getValues("tipo")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Tipo de endereço *" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Tipos</SelectLabel>
                  {Object.entries(ADDRESS_TYPES).map(([key, value]) => (
                    <SelectItem key={key} value={value}>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:col-span-2 w-full gap-3">
            <Textarea
              {...register("referencia")}
              placeholder="Referências para entrega"
              maxLength={200}
              rows={3}
              className="resize-none"
            />
            <SubtitleComponent as="p" className="pl-2">
              Adicione informações adicionais que possam ajudar na entrega.
            </SubtitleComponent>
          </div>

          <div className="flex items-center space-x-2 mt-4 md:col-span-2">
            <Checkbox
              id="isDefault"
              checked={form.watch("isDefault")}
              onCheckedChange={(checked) => setValue("isDefault", !!checked)}
            />
            <Label htmlFor="isDefault">Tornar este o meu endereço padrão</Label>
          </div>

          <div className="flex justify-end gap-4 md:col-span-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Salvar Endereço
            </Button>
          </div>
        </form>
      </section>
    </section>
  );
}
