/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect, useRef } from "react";

import { SidebarContent, SidebarGroupLabel } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronUp, SlidersHorizontal } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Slider } from "../ui/slider";
import { useFilterSidebarContext } from "@/hooks/useFilterSidebarContext";
import React from "react";

type Category = {
  id: string;
  name: string;
};

interface CategoryFilterProps {
  categories: Category[];
  onSelectCategory: (categoryId: string) => void;
  defaultSelected?: string;
  className?: string;
  slug?: string;
}

// TODO: Corrigir bug critico. Está aberto no layout mobile
export default function CategoryFilter({
  categories,
  onSelectCategory,
  defaultSelected,
  className,
  slug,
}: CategoryFilterProps) {
  const [selected, setSelected] = useState(defaultSelected || "");
  const [priceRange, setPriceRange] = useState<number[]>([200, 700]);
  const [collapsiIsOpen, setIsOpen] = useState(true);
  const backdropRef = useRef<HTMLDivElement>(null);
  const { closeSidebar, openSidebar, open } = useFilterSidebarContext();

  const [isTablet, setIsTablet] = React.useState<boolean>(false);

  const handleCategoryChange = (id: string) => {
    setSelected(id);
    onSelectCategory(id);
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    console.log("esse é o valor da minha mediaQuery", mediaQuery);

    // Apenas seta o estado inicial sem abrir/fechar sidebar
    setIsTablet(!mediaQuery.matches);

    const handleScreenChange = (e: MediaQueryListEvent) => {
      const isDesktop = e.matches;
      console.log(
        "Esse é o valor incial do isDesktop quando a function handleScreenChange é chamada",
        isDesktop
      );
      setIsTablet(!isDesktop);

      // Só aplica ação quando o tamanho REALMENTE muda
      if (isDesktop) {
        openSidebar(true);
      } else {
        closeSidebar();
      }
    };

    mediaQuery.addEventListener("change", handleScreenChange);

    return () => {
      mediaQuery.removeEventListener("change", handleScreenChange);
    };
  }, [closeSidebar, openSidebar]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (backdropRef.current && e.target === backdropRef.current) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeSidebar]);

  return (
    <>
      <div
        ref={backdropRef}
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 sm:hidden ",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      ></div>
      <aside
        className={cn(
          "p-4  md:pt-22 border fixed md:flex md:relative inset-0 rounded-md w-full max-w-xs bg-white border-y-0 z-50 md:z-0 transition-transform duration-300",
          className,
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <SidebarContent className="h-full">
          <SidebarGroupLabel className="font-semibold text-lg flex justify-between">
            Filtro <SlidersHorizontal />
          </SidebarGroupLabel>
          <Separator />
          <div>
            <SidebarGroupLabel className="font-semibold text-lg flex justify-between mb-2">
              Categorias{" "}
              <Button
                onClick={() => {
                  setSelected(slug || "");
                  onSelectCategory(slug || "");
                }}
                size="sm"
                variant="ghost"
              >
                Limpar
              </Button>
            </SidebarGroupLabel>
            <ul className="space-y-2 ml-4">
              {categories.map((category) => (
                <li key={category.id}>
                  <input
                    type="radio"
                    id={`category-${category.id}`}
                    name="category"
                    value={category.id}
                    checked={selected === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                    className="peer hidden"
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className={`
           block px-4 py-2 rounded-lg cursor-pointer text-muted-foreground
          transition-all duration-200 ease-in-out capitalize
          peer-checked:bg-accent peer-checked:text-muted-foreground  peer-checked:hover:bg-muted
          hover:bg-gray-100 text-base
        `}
                  >
                    {category.name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Collapsible
              defaultOpen
              open={collapsiIsOpen}
              onOpenChange={setIsOpen}
            >
              <CollapsibleTrigger asChild>
                <SidebarGroupLabel className="font-semibold text-lg flex justify-between mb-2">
                  Preço
                  <ChevronUp
                    className={cn(
                      "transition-transform ",
                      collapsiIsOpen && "rotate-180"
                    )}
                  />
                </SidebarGroupLabel>
              </CollapsibleTrigger>

              <CollapsibleContent className="pt-4 space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  min={0}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm border px-3 py-1 rounded">
                    $ {priceRange[0]}
                  </span>
                  <span className="text-sm border px-3 py-1 rounded">
                    ${priceRange[1]}
                  </span>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </div>
          <Separator />
        </SidebarContent>
      </aside>
    </>
  );
}
