import Link from "next/link";
import CardSubtitle from "../titles/cardSubtitle";
import CardTitle from "../titles/cardTitle";
import CardBase from "./cardBase";

type CardProductsProps = {
  title: string;
  brand: string;
  alt: string;
  imageUrl: string;
  price: number;
  router: string;
};

export const CardProducts = ({
  title,
  brand,
  imageUrl,
  price,
  alt,
  router,
}: CardProductsProps) => {
  return (
    <Link href={router} className="group">
      <CardBase
        className=" md:grid md:grid-cols-[1fr_auto] gap-2 items-start"
        imageUrl={imageUrl}
        alt={alt}
        aspectRadio="aspect-[3/4]"
      >
        <div className="min-w-0">
          <CardTitle>{title}</CardTitle>
          <CardSubtitle>{brand}</CardSubtitle>
        </div>
        <div className=" ml-4 flex items-center h-full">
          <span className="flex bg-input/40 p-2 rounded-[8px]">{`R$ ${price.toFixed(
            2
          )}`}</span>
        </div>
      </CardBase>
    </Link>
  );
};
