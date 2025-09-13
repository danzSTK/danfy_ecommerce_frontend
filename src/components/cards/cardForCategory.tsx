import Link from "next/link";
import CardSubtitle from "../titles/Subtitle";
import TitleComponent from "../titles/Title";
import CardBase from "./cardBase";
import { ArrowRight } from "lucide-react";

type CardCategoryProps = {
  title: string;
  brand?: string;
  router: string;
  imageUrl: string;
  alt: string;
};

const CardCategory = ({
  title,
  brand = "Explore Now!",
  router,
  imageUrl,
  alt,
}: CardCategoryProps) => {
  return (
    <Link href={router} className="group">
      <CardBase
        imageUrl={imageUrl}
        alt={alt}
        aspectRadio="aspect-[3/4]"
        className="grid grid-cols-[1fr_auto] gap-2 items-start"
      >
        <div className="min-w-0">
          <TitleComponent as="h3">
            {title}
          </TitleComponent>
          <CardSubtitle>{brand}</CardSubtitle>
        </div>
        <div className=" ml-4 flex items-center h-full">
          <ArrowRight className="size-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </CardBase>
    </Link>
  );
};

export default CardCategory;
