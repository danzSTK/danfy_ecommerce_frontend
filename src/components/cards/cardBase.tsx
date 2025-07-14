import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
    <Card className="overflow-hidden  w-full h-full gap-0 md:gap-6 pb-3 pt-0 md:pb-6">
      <div className={`relative w-full h-[280px] lg:h-[380px] ${aspectRadio}`}>
        <Image src={imageUrl} alt={alt} fill className="object-cover" />
      </div>

      {children && (
        <CardContent className={cn("pt-3 px-3 md:p-3 md:px-6", className)}>
          {children}
        </CardContent>
      )}
    </Card>
  );
};

export default CardBase;
