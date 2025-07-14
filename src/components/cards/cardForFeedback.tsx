import Image from "next/image";
import CardTitle from "../titles/cardTitle";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Feedback } from "@/view/home/sectionFeedback";

type Props = {
  feedback: Feedback;
};

/**
 *
 * @param
 * Component card para feedbacks
 *
 * exibe a imagem do usuario, nome e comentário do mesmo
 *
 * Props obrigatórias:
 *  feedback: Feedback
 *
 * Feedback {
 *  name: string - nome do usuario
 *  comment: string - comentário do usuário
 *  userPhone: string - foto do perfil do usuário
 *  alt?: string - acessibilidade para foto
 * }
 *
 * comportamento:
 * - Usa o component `Card` do shadcn/ui
 * - Exibe um card com a foto, nome e comentario do usuário
 *
 * Exemplo de uso:
 *
 * ```tsx
 *   <CardForFeedBack
 *    feedback: {
 *      name: "jurandir",
 *      userPhoto: "https://fotodojurandir"
 *      comment: "Jurandir está muito feliz hoje"
 *      alt: "foto do jurandir no perfil"
 *     }
 *  />
 *  ```
 *
 *
 * @returns
 */

const CardForFeedBack = ({ feedback }: Props) => {
  return (
    <Card className="overflow-hidden max-w-[400px] max-h-[300px] h-full">
      <CardHeader className="flex items-center gap-3">
        <div className={`relative w-15 aspect-square`}>
          <Image
            src={feedback.userPhoto}
            alt={feedback.alt ?? "foto de perfil do usuário"}
            fill
            className="object-cover rounded-[12px]"
          />
        </div>
        <CardTitle>{feedback.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground font-light font-serif">
          {feedback.comment}
        </p>
      </CardContent>
    </Card>
  );
};

export default CardForFeedBack;
