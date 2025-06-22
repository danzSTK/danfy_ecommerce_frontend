import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

type CardBaseProps = {
  imageUrl: string;
  alt: string;
  aspectRadio?: string;
  children: ReactNode;
  className?: string;
};

export const CardBase = ({
  imageUrl,
  alt,
  aspectRadio = "aspect-square",
  children,
  className,
}: CardBaseProps) => {
  return (
    <Card
      className="overflow-hidden max-w-[300px] h-full"
      style={{ paddingTop: 0 }}
    >
      <div className={`relative w-full h-[280px] lg:h-[380px] ${aspectRadio}`}>
        <Image src={imageUrl} alt={alt} fill className="object-cover" />
      </div>

      {children && (
        <CardContent className={`p-3 ${className}`}>{children}</CardContent>
      )}
    </Card>
  );
};

export default CardBase;
