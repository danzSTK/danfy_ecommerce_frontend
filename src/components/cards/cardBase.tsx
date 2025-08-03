import { ReactNode } from "react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "../fallbacks/imageWithFallback";

type AspectRatioType = "aspect-square" | "aspect-video" | "aspect-portrait";

type CardBaseProps = {
  imageUrl: string;
  alt: string;
  aspectRadio?: AspectRatioType;
  children: ReactNode;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
};

export const CardBase = ({
  imageUrl,
  alt,
  aspectRadio = "aspect-square",
  children,
  className,
  priority = false,
  loading = "lazy",
}: CardBaseProps) => {
  return (
    <Card className="overflow-hidden  w-full h-full gap-0 md:gap-6 pb-3 pt-0 md:pb-6">
      <div className={`relative w-full h-[280px] lg:h-[380px] ${aspectRadio}`}>
        <ImageWithFallback
          src={imageUrl}
          alt={alt}
          width={500}
          height={500}
          className={cn(
            "h-full w-full",
            "object-cover object-center",
            "lg:h-full lg:w-full"
          )}
          loading={loading}
          priority={priority}
        />
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
