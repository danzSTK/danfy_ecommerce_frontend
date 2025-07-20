import CardCategory from "@/components/cards/cardForCategory";
import CarouselWrapper from "@/components/carousel/carousel";

import imageCardCategoryTeste from "../../../public/images/Rectangle 20.png";
import SectionTitle from "@/components/titles/SectionTitle";
import { useGetAllCategoriesQuery } from "@/services/routes/categories";

const SectionCategoryMen = () => {
  const { data, isLoading } = useGetAllCategoriesQuery();

  return (
    <section className="my-20 container">
      <SectionTitle className="mb-8">Categorias para Homens</SectionTitle>
      {isLoading ? (
        <CarouselWrapper
          variant="card"
          sliders={Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-full h-40 bg-muted-foreground animate-pulse rounded-lg"
            />
          ))}
        />
      ) : (
        <>
          <article>
            <CarouselWrapper
              variant="card"
              sliders={
                data
                  ?.filter((category) => category.name === "masculino")
                  .flatMap((category) =>
                    category.children.map((children) => {
                      const CATEGORYPATH = `products/category/${children.id}`;
                      return (
                        <CardCategory
                          key={children.id}
                          router={CATEGORYPATH}
                          imageUrl={imageCardCategoryTeste.src}
                          alt="Imagem masculina de apresetação para o card de categoria"
                          title={children.name}
                        />
                      );
                    })
                  ) || []
              }
            />
          </article>
        </>
      )}
    </section>
  );
};

export default SectionCategoryMen;
