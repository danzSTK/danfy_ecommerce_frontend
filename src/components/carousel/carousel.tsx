import Autoplay from "embla-carousel-autoplay";
// import * as images from "../../../public/images";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { ReactNode, useEffect, useState } from "react";

type CarouselWrapperProps = {
  sliders: ReactNode[];
  className?: string;
  autoplay?: boolean;
  variant?: "default" | "card";
};

export default function CarouselWrapper({
  sliders,
  className,
  autoplay = true,
  variant = "default",
}: CarouselWrapperProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
      console.log(current, count);
    });

    console.log(current, count);
  }, [api, count, current]);
  return (
    <>
      {variant === "default" && (
        <div className={`w-full ${className} relative`}>
          <Carousel
            setApi={setApi}
            plugins={autoplay ? [Autoplay({ delay: 4000 })] : []}
          >
            <CarouselContent className="containerCarousel">
              {sliders.map((slider, index) => (
                <CarouselItem className="" style={{ padding: 0 }} key={index}>
                  {slider}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="ghost"
              size="lg"
              className="hidden lg:flex"
            />
            <CarouselNext
              size="lg"
              variant="ghost"
              className="hidden lg:flex"
            />
          </Carousel>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {sliders.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={` cursor-pointer h-2 w-2 rounded-full transition-all ${
                  current - 1 === index ? "bg-white scale-110" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {variant === "card" && (
        <Carousel className="">
          <CarouselContent>
            {sliders.map((slide, index) => (
              <CarouselItem key={index} className="basis-1/ ">
                <div className="p-1">{slide}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      )}
    </>
  );
}
