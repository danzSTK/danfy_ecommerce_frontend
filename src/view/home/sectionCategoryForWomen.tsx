import CardCategory from "@/components/cards/cardForCategory";
import CarouselWrapper from "@/components/carousel/carousel";

import imagemCardCategoryFeminina from "../../../public/images/categoria-feminina.png";
import SectionTitle from "@/components/titles/SectionTitle";

const SectionCategoryWomen = () => {
  const sliders = [
    <CardCategory
      key={1}
      router=""
      imageUrl={imagemCardCategoryFeminina.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Hoodies & Sweetshirt"
    />,
    <CardCategory
      key={2}
      router=""
      imageUrl={imagemCardCategoryFeminina.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Hoodies & Sweetshirt"
    />,
    <CardCategory
      key={3}
      router=""
      imageUrl={imagemCardCategoryFeminina.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Hoodies & Sweetshirt"
    />,
    <CardCategory
      key={4}
      router=""
      imageUrl={imagemCardCategoryFeminina.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Hoodies & Sweetshirt"
    />,
    <CardCategory
      key={5}
      router=""
      imageUrl={imagemCardCategoryFeminina.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Hoodies & Sweetshirt"
    />,
    <CardCategory
      key={6}
      router=""
      imageUrl={imagemCardCategoryFeminina.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Hoodies & Sweetshirt"
    />,
    <CardCategory
      key={7}
      router=""
      imageUrl={imagemCardCategoryFeminina.src}
      alt="Imagem masculina de apresetação para o card de categoria"
      title="Hoodies & Sweetshirt"
    />,
  ];

  return (
    <section className="my-20 container">
      <SectionTitle className="mb-8">Cateorias para Mulheres</SectionTitle>
      <article>
        <CarouselWrapper variant="card" sliders={sliders} />
      </article>
    </section>
  );
};

export default SectionCategoryWomen;
