import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

import fallbackSvg from "../../../public/images/placeholder.svg";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
/*   loading?: "lazy" | "eager";
  priority?: boolean; */
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Image
      src={imageError ? fallbackSvg : src}
      alt={alt}
      width={width}
      height={height}
      className={cn("", className)}
      onError={() => setImageError(true)}
      {...props}
    />
  );
}
