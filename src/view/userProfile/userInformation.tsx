import SubtitleComponent from "@/components/titles/Subtitle";
import TitleComponent from "@/components/titles/Title";
import { Button } from "@/components/ui/button";
import { IUser } from "@/interfaces/Auth.interface";

interface IUserInformationSectionProps {
  user: IUser;
}

const UserInformationSection = ({ user }: IUserInformationSectionProps) => {
  return (
    <article className="space-y-2">
      <TitleComponent as="h4" className="text-lg md:text-xl">
        Informações do usuário
      </TitleComponent>
      <ul className="space-y-2">
        <li>
          <SubtitleComponent
            as="p"
            className=" font-semibold text-base md:text-lg  "
          >
            Seu nome:
          </SubtitleComponent>
          <div className="flex justify-between items-center">
            <p className="text-base truncate">{user.name}</p>
            <Button variant={"ghost"}>Editar</Button>
          </div>
        </li>
        <li>
          <SubtitleComponent
            as="p"
            className=" font-semibold text-base md:text-lg "
          >
            Seu email:
          </SubtitleComponent>
          <div className="flex justify-between items-center">
            <p className="text-base truncate">{user.email}</p>
            <Button variant={"ghost"}>Editar</Button>
          </div>
        </li>
        <li>
          <SubtitleComponent
            as="p"
            className=" font-semibold text-base md:text-lg "
          >
            Seu telefone:
          </SubtitleComponent>
          <div className="flex justify-between items-center">
            <p className="text-base truncate">{user.phone}</p>
            <Button variant={"ghost"}>Editar</Button>
          </div>
        </li>
        <li>
          <SubtitleComponent
            as="p"
            className=" font-semibold text-base md:text-lg "
          >
            Seu CPF:
          </SubtitleComponent>
          <div className="flex justify-between items-center">
            <p className="text-base truncate">622.799.673-40</p>
            <Button variant={"ghost"}>Editar</Button>
          </div>
        </li>
      </ul>
    </article>
  );
};

export default UserInformationSection;
