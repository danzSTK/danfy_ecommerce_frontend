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

import nikeLogo from "../../public/images/logos-parceiras/Logo_NIKE.svg";
import umbroLogo from "../../public/images/logos-parceiras/Umbro_logo.svg";
import LouisLogo from "../../public/images/logos-parceiras/Louis_Vuitton_logo_and_wordmark.svg";
import dolceGabanna from "../../public/images/logos-parceiras/Dolce_&_Gabbana.svg";
import adidasLogo from "../../public/images/logos-parceiras/Adidas_Logo.svg";
import filaLogo from "../../public/images/logos-parceiras/fila-logo.png";
import pulmaLogo from "../../public/images/logos-parceiras/puma-logo.png";
import Image from "next/image";
import SectionDestaques from "@/view/home/sectionDestaques";

//TODO: achar outra forma de compartilhar esse component de carouselInfinito
//TODO: achar outra forma de compartilhar essas imagens em destaque se nao ela vai ficar hight codado entao


export default function Home() {
  const logoMarcas = [
    nikeLogo,
    umbroLogo,
    LouisLogo,
    dolceGabanna,
    adidasLogo,
    filaLogo,
    pulmaLogo,
  ];
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
              <div className="w-24 object-cover ">
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
