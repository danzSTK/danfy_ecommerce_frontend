"use client";

import Link from "next/link";

import { useSidebarContext } from "@/hooks/useSidebarContext";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, User, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { SidebarGroup, SidebarGroupLabel } from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import { navigationMenuItems } from "@/app/(base)/page";

//TODO: Corrigir e achar outra forma de compartilhar esse elemento sem fazer o ternario por tipo, facilitando o uso e sua construção mais semantica \ fazer uma forma de centralizar os caminhos e rotas para nao mudar devido ao layout, lembrando que no mobile as rotas estao hight code / magic string
export function Sidebar(/* { children }: { children: React.ReactNode } */) {
  const { open, closeSidebar, type } = useSidebarContext();
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (backdropRef.current && e.target === backdropRef.current) {
        closeSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeSidebar]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  return (
    <div
      ref={backdropRef}
      className={cn(
        "fixed inset-0 z-50 bg-black/50 transition-opacity duration-300",
        open
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <aside
        className={cn(
          "absolute right-0 top-0 h-full w-md max-w-full bg-sidebar shadow-lg transition-transform duration-300",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        <header className="flex items-center justify-between p-4 ">
          <h2 className="uppercase font-bold font-mono ">Danfy Shopfy</h2>

          <button onClick={closeSidebar}>
            <X className="w-5 h-5" />
          </button>
        </header>

        {type === "menu" && (
          <main className="p-4 block">
            <section>
              <SidebarGroupLabel className="gap-2 font-bold text-base">
                <LayoutDashboard />
                Dashboard
              </SidebarGroupLabel>

              <SidebarGroup className="max-w-11/12 mx-auto my-0 flex gap-2">
                {navigationMenuItems.map((item) => (
                  <Button
                    asChild
                    variant="secondary"
                    key={item.label}
                    className=""
                  >
                    <Link href={item.href} className="flex gap-2">
                      {item.icon}
                      {item.label}
                    </Link>
                  </Button>
                ))}
              </SidebarGroup>
            </section>
            <section className="my-4">
              <SidebarGroupLabel className="">
                {/* TODO: usar algo mais semantico, criar um component para esse button drop down fazendo todo o esquema recebendo os argumentos tanto da function toggleDropdown quanto outras propriedades mantendo apenas o button como fixo e restante será o children do component */}
                <Button
                  onClick={toggleDropdown}
                  className="w-full flex items-center justify-between font-bold  rounded transition"
                  variant={isOpen ? "default" : "ghost"}
                  style={{ paddingInline: 0 }}
                >
                  <span className="flex items-end gap-2 font-bold text-base">
                    <User className="size-6" />
                    <span className="block" style={{ lineHeight: "22px" }}>
                      Profile
                    </span>
                  </span>
                  {isOpen ? (
                    <ChevronUp className="size-5" />
                  ) : (
                    <ChevronDown className="size-5" />
                  )}
                </Button>
              </SidebarGroupLabel>

              <SidebarGroup>
                <div className="w-full px-2">
                  <div
                    className={`ml-4 mt-1 space-y-1 overflow-hidden transition-all duration-300  ${
                      isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    <Button
                      variant="link"
                      className="block capitalize w-full text-left px-2 py-1 text-sm rounded"
                      asChild
                    >
                      <Link href="/profile">ver perfil</Link>
                    </Button>
                    <Button
                      variant="link"
                      className="block capitalize w-full text-left px-2 py-1 text-sm rounded"
                      asChild
                    >
                      <Link href="/profile/options">Configurações</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="block w-full text-left px-2 py-1 text-sm rounded text-destructive"
                    >
                      Sair
                    </Button>
                  </div>
                </div>
              </SidebarGroup>
            </section>
          </main>
        )}

        {type === "fixed" && <h2>Só sei que nada sei</h2>}
      </aside>
    </div>
  );
}
