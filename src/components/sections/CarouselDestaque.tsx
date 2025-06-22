/* const CarouselDestaqueComponent2 = () => (
  <div
    className="relative h-[calc(100vh-80px)] bg-cover bg-top bg-no-repeat teste"
    style={{ backgroundImage: `url(${destaque2.src})` }}
  >
    testando sobreposiçao
  </div>
); */

import destaque1 from "../../../public/images/slider-destaque-female.jpeg";
import destaque2 from "../../../public/images/Image.png";
import CarouselWrapper from "../carousel/carousel";
import { ReactNode } from "react";
import { Button } from "../ui/button";

//TODO
// rever formas de fazer esses slides ainda estou achando muito hight codado, mas creio que com o consumo da nossa api isso possa mudar ou talvez nao. e se tivermos 10 destaques, imagina o tamnho que esse codigo vai virar
//RESUMO: encontrar outra forma de desenhar o layout dos slides e repassar em array para o carouselWrapper entender

const CarouselDestaque = () => {
  const slides: ReactNode[] = [
    <div
      key="slide1"
      className="w-full h-full bg-cover bg-no-repeat bg-center flex items-center px-6 md:px-12 lg:px-20 relative teste"
      style={{ backgroundImage: `url(${destaque1.src})` }}
    >
      <div className="absolute top-6/12 px-2 sm:px-5 lg:left-2/12 -translate-y-6/12 w-10/12 max-w-[600px] md:w-6/12 text-shadow-sm  z-10">
        <h3 className="uppercase text-2xl lg:text-4xl text-secondary font-bold ">
          Melhorámos a sua moda diária!
        </h3>
        <p className="font-light text-secondary text-sm lg:text-base my-3">
          Em nossa jornada para melhorar a moda cotidiana, a Danfy shop
          apresenta a linha de roupas para o dia a dia - Moda confortável e
          acessível 24 horas por dia, 7 dias por semana
        </p>
        <div className="flex justify-end ">
          <Button size="sm" variant="secondary">
            Confira agora!
          </Button>
        </div>
      </div>
    </div>,

    <div
      key="slide2"
      className="w-full h-full bg-cover bg-no-repeat bg-center flex items-center px-6 md:px-12 lg:px-20 relative teste"
      style={{ backgroundImage: `url(${destaque2.src})` }}
    >
      <div className="absolute top-6/12 px-5 lg:left-2/12 -translate-y-6/12 w-10/12 max-w-[600px] md:w-6/12 text-shadow-sm  z-10">
        <h3 className="uppercase text-2xl lg:text-4xl text-secondary font-bold ">
          Melhorámos a sua moda diária!
        </h3>
        <p className="font-light text-secondary text-sm lg:text-base my-3">
          Em nossa jornada para melhorar a moda cotidiana, a Danfy shop
          apresenta a linha de roupas para o dia a dia - Moda confortável e
          acessível 24 horas por dia, 7 dias por semana
        </p>
        <div className="flex justify-end ">
          <Button size="sm" variant="secondary">
            Confira agora!
          </Button>
        </div>
      </div>
    </div>,
  ];

  return <CarouselWrapper className="" sliders={slides}></CarouselWrapper>;
};

export default CarouselDestaque;
