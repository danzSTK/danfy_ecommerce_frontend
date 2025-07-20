"use client";

import { NavContentType } from "@/components/nav-menu/navMenu";
import CarouselDestaque from "@/components/sections/CarouselDestaque";
import { Sidebar } from "@/components/sidebar/siderbar";
import { House, Mars, Package, Venus } from "lucide-react";

import SectionCategoryMen from "@/view/home/sectionCategoryForMen";
import SectionCategoryWomen from "@/view/home/sectionCategoryForWomen";
import { CarouselInfinity } from "@/components/carousel/CarouselInfint";

export const navigationMenuItems: NavContentType[] = [
  { label: "Home", href: "/", icon: <House /> },
  { label: "All Product", href: "/products", icon: <Package /> },
  { label: "Women", href: "/services/categories/women", icon: <Venus /> },
  { label: "Men", href: "/categories/men", icon: <Mars /> },
];

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
import { increment } from "@/lib/redux/slices/exampleSlice";
import { useGetProductsQuery } from "@/services/routes/products";
import { useGetAllCategoriesQuery } from "@/services/routes/categories";

export default function Home() {
  const logoMarcas = [
    nikeLogo,
    umbroLogo,
    LouisLogo,
    dolceGabanna,
    adidasLogo,
    filaLogo.src,
    pulmaLogo.src,
  ];

  const feedbacks: Feedback[] = [
    {
      comment:
        "Testando o comentario via props e logo após eu sei lá meu irmao",
      name: "Danielzin lorem 1",
      userPhoto: userPhotoTeste.src,
    },
    {
      comment:
        "Testando o comentario via props e logo após eu sei lá meu irmao",
      name: "Danielzin lorem 2",
      userPhoto: userPhotoTeste.src,
    },
    {
      comment:
        "Testando o comentario via props e logo após eu sei lá meu irmao",
      name: "Danielzin lorem 3",
      userPhoto: userPhotoTeste.src,
    },
    {
      comment:
        "Testando o comentario via props e logo após eu sei lá meu irmao",
      name: "Danielzin lorem 4",
      userPhoto: userPhotoTeste.src,
    },
    {
      comment:
        "Testando o comentario via props e logo após eu sei lá meu irmao",
      name: "Danielzin lorem 5",
      userPhoto: userPhotoTeste.src,
    },
    {
      comment:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, veritatis cum, dolores ratione iure optio similique ab vero sint cupiditate accusamus obcaecati minus blanditiis, nihil quidem inventore assumenda nisi quod?   Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus, veritatis cum, dolores ratione iure optio similique ab vero sint cupiditate accusamus obcaecati minus blanditiis, nihil quidem inventore assumenda nisi quod?",
      userPhoto: userPhotoTeste.src,
      name: "Danielzin Lorem 6",
    },
  ];

  const count = useSelector((state: RootState) => state.example.count);
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading } = useGetAllCategoriesQuery();

  return (
    <>
      <CarouselDestaque />
      <Sidebar />
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
      <SectionFeedback feedbacks={feedbacks} />
    </>
  );
}
