"use client";
import { AlignRight, Heart, Search, ShoppingCart, User } from "lucide-react";
import { NavContentType, NavMenu } from "../nav-menu/navMenu";
import ToggleThemeButton from "../toggle-theme-button/toggleThemeButton";
import { CardTitle } from "../ui/card";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { navigationMenuItems } from "@/app/page";
import { Button } from "../ui/button";

export default function Header() {
  const { openSidebar } = useSidebarContext();

  // TODO: Corrigir e concentrar em local para armazenar sobre informações de caminhos relativos

  // TODO: Corrigir menu hamburger, adicionar card do carrinho e melhorar sidebar menu do mobile
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
    <header className="bg-popover py-5">
      <div className="container mx-auto flex items-center justify-between">
        <CardTitle className="text-base md:text-xl font-bold font-mono uppercase">
          Danfy Shopfy
        </CardTitle>
        <NavMenu
          className="hidden lg:block"
          size="default"
          variant="ghost"
          items={navigationMenuItems}
        />
        <label
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
        </label>
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
        <ToggleThemeButton className="hidden md:block" />
      </div>
    </header>
  );
}
