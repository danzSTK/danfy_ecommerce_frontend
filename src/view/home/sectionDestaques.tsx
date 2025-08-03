import { CardProducts } from "@/components/cards/cardForProducts";
import CarouselWrapper from "@/components/carousel/carousel";
import SectionTitle from "@/components/titles/SectionTitle";

import { useGetProductsQuery } from "@/services/routes/products";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "../products/CategoryList";

//TODO: Achar outra forma para compartilhar esses slides

const SectionDestaques = () => {
  const { data, error, isLoading } = useGetProductsQuery();
  return (
    <section className="my-20 container">
      <SectionTitle className="mb-8">Em destaque</SectionTitle>
      {isLoading && (
        <CarouselWrapper
          variant="card"
          sliders={Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col gap-4">
              <Skeleton className="w-full h-[280px]" />
              <Skeleton className="w-3/4 h-5" />
              <Skeleton className="w-1/2 h-5" />
            </div>
          ))}
        />
      )}

      {data && data.length > 0 && !error && (
        <article>
          <CarouselWrapper
            variant="card"
            sliders={data.map((product) => {
              return (
                <CardProducts
                  key={product.id}
                  basePrice={product.basePrice}
                  description={product.description}
                  id={product.id}
                  imageUrl={product.defaultImageUrl}
                  name={product.name}
                  router=""
                />
              );
            })}
          />
        </article>
      )}

      {!data && error && <ErrorState />}
    </section>
  );
};

export default SectionDestaques;
