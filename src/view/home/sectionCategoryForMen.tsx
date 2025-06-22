import CardCategory from "@/components/cards/cardForCategory";
import CarouselWrapper from "@/components/carousel/carousel";

import imageCardCategoryTeste from "../../../public/images/Rectangle 20.png";
import SectionTitle from "@/components/titles/SectionTitle";

const SectionCategoryMen = () => {
  const sliders = [
    <CardCategory
      key={1}
      router=""
      imageUrl={imageCardCategoryTeste.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Shirts"
    />,
    <CardCategory
      key={2}
      router=""
      imageUrl={imageCardCategoryTeste.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Shirts"
    />,
    <CardCategory
      key={3}
      router=""
      imageUrl={imageCardCategoryTeste.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Shirts"
    />,
    <CardCategory
      key={4}
      router=""
      imageUrl={imageCardCategoryTeste.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Shirts"
    />,
    <CardCategory
      key={5}
      router=""
      imageUrl={imageCardCategoryTeste.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Shirts"
    />,
  ];

  return (
    <section className="my-20 container">
      <SectionTitle className="mb-8">Cateorias para Homens</SectionTitle>
      <article>
        <CarouselWrapper variant="card" sliders={sliders} />
      </article>
    </section>
  );
};

export default SectionCategoryMen;
