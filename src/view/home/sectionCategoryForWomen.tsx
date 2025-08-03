import CardCategory from "@/components/cards/cardForCategory";
import CarouselWrapper from "@/components/carousel/carousel";

import SectionTitle from "@/components/titles/SectionTitle";
import { useGetAllCategoriesQuery } from "@/services/routes/categories";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "../products/CategoryList";

const getCategoryImage = (categoryName: string) => {
  //public\images\categorias\womens\capa-category-body-feminino.png
  const map: Record<string, string> = {
    jeans: "/images/categorias/womens/capa-category-jeans-feminino.png",
    vestidos: "/images/categorias/womens/capa-category-vestido-feminino.png",
    moletom: "/images/categorias/womens/capa-category-moletom-feminino.png",
    body: "/images/categorias/womens/capa-category-body-feminino.png",
  };

  return map[categoryName.toLowerCase()] || "/images/categoria-feminina.png";
};

const SectionCategoryWomen = () => {
  const { data, isLoading, error } = useGetAllCategoriesQuery({
    name: "feminino",
  });

  return (
    <section className="my-20 container">
      <SectionTitle className="mb-8">Cateorias para Mulheres</SectionTitle>

      {isLoading && (
        //TODO: criar um component de LoadingCard utilizando essa base pois estou usando em mais de uma view
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
            sliders={data[0].children.map((children) => {
              const CATEGORYPATH = `products/category/${children.id}`;
              const IMAGE_CATEGORY_PATH = getCategoryImage(children.name);
              return (
                <CardCategory
                  key={children.id}
                  router={CATEGORYPATH}
                  imageUrl={IMAGE_CATEGORY_PATH}
                  alt="Imagem masculina de apresetação para o card de categoria"
                  title={children.name}
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

export default SectionCategoryWomen;
