import { CardProducts } from "@/components/cards/cardForProducts";
import CarouselWrapper from "@/components/carousel/carousel";
import SectionTitle from "@/components/titles/SectionTitle";

import imagemTesteCardProduct from "../../../public/images/image-card-product.png";

//TODO: Achar outra forma para compartilhar esses slides 

const SectionDestaques = () => {
  const sliders = [
    <CardProducts
      key={1}
      alt="Imagem destaque de produtos em destaque"
      brand="Jhanvi’s  Brand"
      title="Black Sweatshirt withmhskjhkHA"
      price={123.0}
      imageUrl={imagemTesteCardProduct.src}
      router={""}
    />,
    <CardProducts
      key={2}
      alt="Imagem destaque de produtos em destaque"
      brand="Jhanvi’s  Brand"
      title="Black Sweatshirt with"
      price={123.0}
      imageUrl={imagemTesteCardProduct.src}
      router={""}
    />,
    <CardProducts
      key={3}
      alt="Imagem destaque de produtos em destaque"
      brand="Jhanvi’s  Brand"
      title="Black Sweatshirt with"
      price={123.0}
      imageUrl={imagemTesteCardProduct.src}
      router={""}
    />,
    <CardProducts
      key={4}
      alt="Imagem destaque de produtos em destaque"
      brand="Jhanvi’s  Brand"
      title="Black Sweatshirt with"
      price={123.0}
      imageUrl={imagemTesteCardProduct.src}
      router={""}
    />,
    <CardProducts
      key={5}
      alt="Imagem destaque de produtos em destaque"
      brand="Jhanvi’s  Brand"
      title="Black Sweatshirt with"
      price={123.0}
      imageUrl={imagemTesteCardProduct.src}
      router={""}
    />,
    <CardProducts
      key={6}
      alt="Imagem destaque de produtos em destaque"
      brand="Jhanvi’s  Brand"
      title="Black Sweatshirt with"
      price={123.0}
      imageUrl={imagemTesteCardProduct.src}
      router={""}
    />,
  ];
  return (
    <section className="my-20 container">
      <SectionTitle className="mb-8">Em destaque</SectionTitle>
      <article>
        <CarouselWrapper variant="card" sliders={sliders} />
      </article>
    </section>
  );
};

export default SectionDestaques;
