import SubtitleComponent from "@/components/titles/Subtitle";
import TitleComponent from "@/components/titles/Title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { IAddress } from "@/interfaces/Address.interface";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface IUserAddressSectionProps {
  address: IAddress[];
  isLoading: boolean;
  isError: boolean;
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-56" />
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent className="space-y-2">
          <Skeleton className="h-6 w-full" />

          <Skeleton className="h-6 w-full" />

          <Skeleton className="h-6 w-full" />
        </CardContent>
        <CardAction className="flex h-full justify-end items-end flex-wrap space-x-1 px-4">
          <Button
            disabled
            variant={"ghost"}
            size={"sm"}
            className="text-xs md:text-sm "
          >
            <Skeleton className="h-6 w-16" />
          </Button>

          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-xs md:text-sm"
            disabled
          >
            <Skeleton className="h-6 w-16" />
          </Button>
          <Button
            variant={"ghost"}
            size={"sm"}
            className="text-xs md:text-sm"
            disabled
          >
            <Skeleton className="h-6 w-24" />
          </Button>
        </CardAction>
      </Card>
    </div>
  );
}

const UserAddressSection = ({
  address,
  isLoading,
  isError,
}: IUserAddressSectionProps) => {
  console.log(address);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError) {
    return <p>Erro ao carregar endereços.</p>;
  }

  if (address.length === 0) {
    return <p>Nenhum endereço encontrado.</p>;
  }

  return (
    <article className="space-y-2">
      <div className="flex items-center justify-between">
        {" "}
        <TitleComponent as="h4" className="text-lg md:text-xl ">
          Seus Endereços:
        </TitleComponent>
        <Button
          variant={"outline"}
          className=""
          title="Adicionar novo endereço"
          aria-label="Adicionar novo endereço"
        >
          <Link href="/profile/address/new">Adicionar</Link>
        </Button>
      </div>
      <ul className="grid grid-cols-1 lg:grid-cols-2  gap-4">
        {address.map((addr) => (
          <li key={addr.id}>
            <Card className={cn("h-full", addr.isDefault ? "pt-0" : "pt-4")}>
              {addr.isDefault && (
                <SubtitleComponent className="border-b h-full font-mono p-2  ">
                  Endereço padrão
                </SubtitleComponent>
              )}
              <CardHeader>
                <TitleComponent as="h5" className="text-md font-semibold">
                  {addr.nomeCompleto}
                </TitleComponent>
                <SubtitleComponent as="p" className="text-sm text-wrap">
                  {addr.telefone}
                </SubtitleComponent>
              </CardHeader>
              <CardContent className="space-y-2">
                <SubtitleComponent as="p" className="flex text-sm text-wrap">
                  {addr.logradouro}, {addr.numero}, {addr.bairro}, {addr.cidade}{" "}
                  - {addr.uf}, {addr.cep}
                </SubtitleComponent>
                {addr.complemento && (
                  <SubtitleComponent as="p" className="flex text-sm text-wrap">
                    Complemento: {addr.complemento}
                  </SubtitleComponent>
                )}
                {addr.referencia && (
                  <SubtitleComponent as="p" className="flex text-sm text-wrap">
                    Referência: {addr.referencia}
                  </SubtitleComponent>
                )}
              </CardContent>
              <CardAction className="flex h-full justify-end items-end flex-wrap space-x-1 px-4">
                <Button
                  variant={"destructive"}
                  size={"sm"}
                  className="text-xs md:text-sm "
                >
                  Excluir
                </Button>

                <Button
                  variant={"ghost"}
                  size={"sm"}
                  className="text-xs md:text-sm"
                >
                  Alterar
                </Button>
                {!addr.isDefault && (
                  <Button
                    variant={"ghost"}
                    size={"sm"}
                    className="text-xs md:text-sm"
                  >
                    Tornar padrão
                  </Button>
                )}
              </CardAction>
            </Card>
          </li>
        ))}
      </ul>
    </article>
  );
};

export default UserAddressSection;
