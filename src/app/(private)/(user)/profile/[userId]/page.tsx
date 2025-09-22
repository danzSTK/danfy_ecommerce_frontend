import SubtitleComponent from "@/components/titles/Subtitle";
import TitleComponent from "@/components/titles/Title";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
} from "@/components/ui/card";

export default function UserProfilePage() {
  return (
    <section className="container space-y-6">
      <TitleComponent as="h3" className="mb-4 text-xl md:text-2xl">
        Minhas informações
      </TitleComponent>
      <article className="space-y-2">
        <TitleComponent as="h4" className="text-lg md:text-xl">
          Informações do usuário
        </TitleComponent>
        <ul className="space-y-2">
          <li>
            <SubtitleComponent as="p" className=" font-semibold text-lg ">
              Seu nome:
            </SubtitleComponent>
            <div className="flex justify-between items-center">
              <p className="text-base truncate">Daniel Silva </p>
              <Button variant={"ghost"}>Editar</Button>
            </div>
          </li>
          <li>
            <SubtitleComponent as="p" className=" font-semibold text-lg ">
              Seu email:
            </SubtitleComponent>
            <div className="flex justify-between items-center">
              <p className="text-base truncate">daniel.silva@example.com</p>
              <Button variant={"ghost"}>Editar</Button>
            </div>
          </li>
          <li>
            <SubtitleComponent as="p" className=" font-semibold text-lg ">
              Seu telefone:
            </SubtitleComponent>
            <div className="flex justify-between items-center">
              <p className="text-base truncate">+55 11 91234-5678</p>
              <Button variant={"ghost"}>Editar</Button>
            </div>
          </li>
        </ul>
      </article>

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
            Adicionar
          </Button>
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <li>
            <Card>
              <CardHeader>
                <TitleComponent as="h5" className="text-md font-semibold">
                  Daniel Silva
                </TitleComponent>
                <SubtitleComponent as="p" className="text-sm text-wrap">
                  +55 11 91234-5678
                </SubtitleComponent>
              </CardHeader>
              <CardContent className="space-y-4">
                <SubtitleComponent as="p" className="text-sm text-wrap">
                  Rua das Flores, 123, Bairro Jardim, São Paulo - SP, 01234-567
                </SubtitleComponent>
                <ul className="flex space-x-2 ">
                  <li className="bg-muted rounded-full shadow px-3 py-2 inline-block  text-xs">
                    <span className="font-semibold">Home</span>
                  </li>
                  <li className="bg-muted rounded-full shadow px-3 py-2 inline-block  text-xs">
                    <span className="font-semibold">Endereço principal</span>
                  </li>
                </ul>
                <CardAction className="flex justify-end space-x-2">
                  <Button variant={"destructive"}>Remover</Button>
                  <Button variant={"ghost"}>Editar</Button>
                </CardAction>
              </CardContent>
            </Card>
          </li>
        </ul>
      </article>
    </section>
  );
}
