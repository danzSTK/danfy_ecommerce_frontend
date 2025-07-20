import Link from "next/link";
import CardSubtitle from "../titles/cardSubtitle";
import CardTitle from "../titles/cardTitle";
import CardBase from "./cardBase";

export type CardProductsType = {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  imageUrl: string;
  router: string;
};

export const CardProducts = ({
  basePrice,
  description,
  id,
  imageUrl,
  name,
  router,
}: CardProductsType) => {
  return (
    <Link href={router} className="group">
      <CardBase
        className=" md:grid md:grid-cols-[1fr_auto] gap-2 items-start"
        imageUrl={imageUrl}
        alt="Imagem do produto"
        aspectRadio="aspect-[3/4]"
      >
        <div className="min-w-0">
          <CardTitle>{name}</CardTitle>
          <CardSubtitle>{description}</CardSubtitle>
        </div>
        <div className=" ml-4 flex items-center h-full">
          <span className="flex bg-input/40 p-2 rounded-[8px]">{`R$ ${Number(
            basePrice
          ).toFixed(2)}`}</span>
        </div>
      </CardBase>
    </Link>
  );
};
