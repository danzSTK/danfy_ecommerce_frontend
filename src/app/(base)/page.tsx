/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import CarouselDestaque from "@/components/sections/CarouselDestaque";
import { Sidebar } from "@/components/sidebar/siderbar";

import SectionCategoryMen from "@/view/home/sectionCategoryForMen";
import SectionCategoryWomen from "@/view/home/sectionCategoryForWomen";
import { CarouselInfinity } from "@/components/carousel/CarouselInfint";

import nikeLogo from "../../../public/images/logos-parceiras/Logo_NIKE.svg";
import umbroLogo from "../../../public/images/logos-parceiras/Umbro_logo.svg";
import LouisLogo from "../../../public/images/logos-parceiras/Louis_Vuitton_logo_and_wordmark.svg";
import dolceGabanna from "../../../public/images/logos-parceiras/Dolce_&_Gabbana.svg";
import adidasLogo from "../../../public/images/logos-parceiras/Adidas_Logo.svg";
import filaLogo from "../../../public/images/logos-parceiras/fila-logo.png";
import pulmaLogo from "../../../public/images/logos-parceiras/puma-logo.png";
import Image from "next/image";
import SectionDestaques from "@/view/home/sectionDestaques";
import SectionFeedback, { Feedback } from "@/view/home/sectionFeedback";

//TODO: achar outra forma de compartilhar esse component de carouselInfinito
//TODO: achar outra forma de compartilhar essas imagens em destaque se nao ela vai ficar hight codado entao
import userPhotoTeste from "../../../public/images/Rectangle 25.png";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/redux/store";
import { useGetAllCategoriesQuery } from "@/services/routes/categories";
import Header from "@/components/header/header";
import { NavContentType } from "@/components/nav-menu/navMenu";
import { House, Package, Venus, Mars } from "lucide-react";

export default function Home() {
  //TODO: preciso achar uma forma de extrair esses dados e compartilhar na minha aplicaçao em uma forma que nao precise fazer requisiçoes em todos os templates que utilizar header ou sidebar com
  const {
    data: dataCategoryMens,
    error: errorCategoryMens,
    isLoading: IsLoadingCategoryMens,
  } = useGetAllCategoriesQuery({
    name: "masculino",
  });
  const {
    data: dataCategoryWomens,
    error: errorCategoryWomens,
    isLoading: isLoadingCategoryWomens,
  } = useGetAllCategoriesQuery({
    name: "feminino",
  });
  const navigationMenuItems: NavContentType[] = [
    { label: "Home", href: "/", icon: <House /> },
    { label: "Destaques", href: "/products", icon: <Package /> },
    {
      label: "Masculinos",
      href: `/products/category/${
        dataCategoryMens ? dataCategoryMens[0].id : ""
      }`,
      icon: <Venus />,
    },
    {
      label: "Femininos",
      href: `/products/category/${
        dataCategoryWomens ? dataCategoryWomens[0].id : ""
      }`,
      icon: <Mars />,
    },
  ];
  const logoMarcas = [
    nikeLogo,
    umbroLogo,
    LouisLogo,
    dolceGabanna,
    adidasLogo,
    filaLogo.src,
    pulmaLogo.src,
  ];
  const count = useSelector((state: RootState) => state.example.count);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useGetAllCategoriesQuery({});

  return (
    <>
      <Header navigationMenuItems={navigationMenuItems} />
      <CarouselDestaque />
      <Sidebar navigationMenuItems={navigationMenuItems} />
      <SectionCategoryMen />
      <SectionCategoryWomen />
      <section>
        <ul className="relative flex h-24 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
          {logoMarcas.map((logo, i) => (
            <CarouselInfinity key={i} index={i} length={logoMarcas.length}>
              <div className="w-24 object-cover">
                <Image className="object-contain" src={logo} alt={""} fill />
              </div>
            </CarouselInfinity>
          ))}
        </ul>
      </section>
      <SectionDestaques />
    </>
  );
}
