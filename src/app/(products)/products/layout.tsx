/* eslint-disable @typescript-eslint/no-unused-vars */
//TODO: quero todos os layout sendo renderizado no server side todo e qualquer layout que esteja com alguma dependencia do client side deve ser revisto e corrigido
"use client";

import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { NavContentType } from "@/components/nav-menu/navMenu";
import { Sidebar } from "@/components/sidebar/siderbar";
import { FilterSidebarProvider } from "@/hooks/useFilterSidebarContext";
import { SidebarProvider } from "@/hooks/useSidebarContext";
import { useGetAllCategoriesQuery } from "@/services/routes/categories";
import { House, Package, Venus, Mars } from "lucide-react";
import { ReactNode } from "react";

export default function ProductsLayout({ children }: { children: ReactNode }) {
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
  return (
    <SidebarProvider>
      <FilterSidebarProvider>
        <Header navigationMenuItems={navigationMenuItems} />
        <Sidebar navigationMenuItems={navigationMenuItems} />
        {children}
        <Footer />
      </FilterSidebarProvider>
    </SidebarProvider>
  );
}
