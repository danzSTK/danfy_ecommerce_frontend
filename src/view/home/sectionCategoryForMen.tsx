import CardCategory from "@/components/cards/cardForCategory";
import CarouselWrapper from "@/components/carousel/carousel";
import SectionTitle from "@/components/titles/SectionTitle";
import { useGetAllCategoriesQuery } from "@/services/routes/categories";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "../products/CategoryList";

const getCategoryImage = (categoryName: string) => {
  const map: Record<string, string> = {
    regatas: "/images/categorias/mens/capa-category-regata-masculina.webp",
    blusas: "/images/categorias/mens/capa-category-camisa-masculina.webp",
    bermudas: "/images/categorias/mens/capa-category-bermuda-masculina.webp",
    calças: "/images/categorias/mens/capa-category-calca-masculina.webp",
  };

  return map[categoryName.toLowerCase()] || "/images/rectangle 20.png";
};

const SectionCategoryMen = () => {
  const { data, isLoading, error } = useGetAllCategoriesQuery({
    name: "masculino",
  });


  return (
    <section className="my-20 container">
      <SectionTitle className="mb-8">Categorias para Homens</SectionTitle>
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
            sliders={data[0].children.map((categoryChildren) => {
              const CATEGORYPATH = `products/category/${categoryChildren.id}`;
              const IMAGE_CATEGORY_PATH = getCategoryImage(
                categoryChildren.name
              );
              return (
                <CardCategory
                  key={categoryChildren.id}
                  router={CATEGORYPATH}
                  imageUrl={IMAGE_CATEGORY_PATH}
                  alt="Imagem masculina de apresetação para o card de categoria"
                  title={categoryChildren.name}
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

export default SectionCategoryMen;
