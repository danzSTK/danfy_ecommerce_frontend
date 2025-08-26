/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState, useEffect, useRef, useMemo, RefObject } from "react";

import { SidebarContent, SidebarGroupLabel } from "../ui/sidebar";
import { cn } from "@/lib/utils";
import { ChevronUp, SlidersHorizontal, X } from "lucide-react";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Slider } from "../ui/slider";
import { useFilterSidebarContext } from "@/hooks/useFilterSidebarContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { useOnClickOutside } from "usehooks-ts";

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
}: Readonly<CategoryFilterProps>) {
  const [selected, setSelected] = useState(defaultSelected || "");
  const [priceRange, setPriceRange] = useState<number[]>([200, 700]);
  const [collapsiIsOpen, setCollapsiIsOpen] = useState(true);
  const backdropRef = useRef<HTMLElement | null>(null);
  const { closeSidebar, openSidebar, open } = useFilterSidebarContext();

  const isMobile = useIsMobile();
  useOnClickOutside(
    backdropRef as never as RefObject<HTMLElement>,
    closeSidebar
  );

  const handleCategoryChange = (id: string) => {
    setSelected(id);
    onSelectCategory(id);
  };

  const shouldShowSidebar = useMemo(() => {
    if (!isMobile) return true;

    return open;
  }, [open, isMobile]);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 sm:hidden ",
          {
            "opacity-100 pointer-events-auto": shouldShowSidebar,
            "opacity-0 pointer-events-none": !shouldShowSidebar,
          }
        )}
      ></div>
      <aside
        className={cn(
          "p-4  md:pt-22 border fixed md:flex md:relative inset-0 rounded-md w-full max-w-xs bg-white border-y-0 z-50 md:z-0 transition-transform duration-300",
          className,
          {
            "translate-x-0": shouldShowSidebar,
            "-translate-x-full": !shouldShowSidebar,
          }
        )}
        ref={backdropRef}
      >
        <SidebarContent className="h-full">
          <SidebarGroupLabel className="font-semibold text-lg flex justify-between">
            Filtro
            <span className="hidden md:block">
              <SlidersHorizontal />
            </span>
            <span className="md:hidden">
              <Button variant="ghost" onClick={closeSidebar}>
                <X className="size-1" />
              </Button>
            </span>
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
                    className={cn(
                      "block px-4 py-2 rounded-lg cursor-pointer text-muted-foreground transition-all duration-200 ease-in-out capitalize peer-checked:bg-accent peer-checked:text-muted-foreground peer-checked:hover:bg-muted hover:bg-gray-100 text-base"
                    )}
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
              onOpenChange={setCollapsiIsOpen}
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
