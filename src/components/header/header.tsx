"use client";
import { AlignRight, Heart, ShoppingCart, User } from "lucide-react";
import { NavContentType, NavMenu } from "../nav-menu/navMenu";
import { CardTitle } from "../ui/card";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { Button } from "../ui/button";

type Props = {
  navigationMenuItems: NavContentType[];
};

export default function Header({ navigationMenuItems }: Props) {
  const { openSidebar } = useSidebarContext();

  //TODO: Adicionar tratativas de erros e loading da requisiçao. Fazer skeletons nos components quando estiver Loading e quebrar o layout caso aconteça um erro(o que nao pode acontecer)

  //TODO: Pensar em uma forma de criar uma router ou cache para receber rotas e label direto do backend

  /*  const navigationMenuItems: NavContentType[] = [
    { label: "Home", href: "/", icon: <House /> },
    { label: "Destaques", href: "/products", icon: <Package /> },
    {
      label: "Femininos",
      href: `/products/category/${
        dataCategoryMens ? dataCategoryMens[0].id : ""
      }`,
      icon: <Venus />,
    },
    {
      label: "Masculinos",
      href: `/products/category/${
        dataCategoryWomens ? dataCategoryWomens[0].id : ""
      }`,
      icon: <Mars />,
    },
  ]; */

  // TODO: Corrigir e concentrar em local para armazenar sobre informações de caminhos relativos

  // TODO: Corrigir menu hamburger, adicionar card do carrinho e melhorar sidebar menu do mobile

  //TODO: Achar uma forma de fazer um select ou saber qual aba/guia o usuaário está para controlar o acesso de forma mais precisa  e saber onde realmente encontramos taís dados para visual ou para controle do mesmo
  const navigationUserItemMobile: NavContentType[] = [
    /* { label: "search for product", icon: <Search />, href: "/search" }, */
    { label: "your cart", icon: <ShoppingCart />, href: "/cart" },
    { label: "your favorites products", icon: <Heart />, href: "/favorites" },
  ];

  const navigationUserItem: NavContentType[] = [
    { label: "your profile", icon: <User />, href: "/profile" },
    { label: "your cart", icon: <ShoppingCart />, href: "/cart" },
    { label: "your favorites products", icon: <Heart />, href: "/favorites" },
  ];
  return (
    <header className="bg-popover py-5 z-50 fixed top-0 left-0 right-0">
      <div className="container mx-auto flex items-center justify-between">
        <CardTitle className="text-base md:text-2xl font-bold font-mono uppercase">
          DanfyShop
        </CardTitle>
        <NavMenu
          className="hidden md:block"
          size="default"
          variant="ghost"
          items={navigationMenuItems}
        />
        {/* <label
          htmlFor="input-search"
          className="hidden md:flex items-center gap-2 bg-secondary shadow-2xs w-60 px-5 py-2 rounded-lg hover:border-primary border-transparent border"
        >
          <Search className="text-muted-foreground" size={20} />
          <input
            type="text"
            id="input-search"
            className="border-none outline-none text-sm"
            placeholder="Search..."
          />
        </label> */}
        <NavMenu
          className="hidden md:block ml-2"
          size="icon"
          variant="secondary"
          items={navigationUserItem}
        />

        <div className="flex">
          <NavMenu
            className="flex md:hidden"
            size="icon"
            variant="secondary"
            items={navigationUserItemMobile}
          />
          <Button
            className="flex justify-end md:hidden"
            variant="ghost"
            size="icon"
            onClick={() => openSidebar("menu")}
          >
            <AlignRight className="size-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
