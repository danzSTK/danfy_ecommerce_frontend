"use client";

import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { CreditCard, Heart, LogOut, Menu, Package, User } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { Button } from "../ui/button";
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import TitleComponent from "../titles/Title";
import SubtitleComponent from "../titles/Subtitle";

interface ILinksItems {
  label: string;
  href: string;
  icon: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}

const ProfileNavLink = ({
  label,
  href,
  icon,
  active,
  onClick,
}: ILinksItems) => {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-4 py-2 text-sm rounded-md transition-colors",
        active
          ? "bg-primary text-primary-foreground font-medium"
          : "hover:bg-muted text-foreground"
      )}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  );
};

export function ProfileSidebar() {
  const pathname = usePathname();
  const params = useParams();
  const { logoutUser } = useAuth();
  const userId = params.userId as string;
  const [open, setOpen] = React.useState(false);

  const navLinks = [
    {
      label: "Meus Dados",
      href: `/profile/${userId}`,
      icon: <User className="mr-2 size-4" />,
      exact: true,
    },
    {
      label: "Favoritos",
      href: `/profile/${userId}/favorites`,
      icon: <Heart className="mr-2 size-4" />,
      exact: false,
    },
    {
      label: "Meus Pedidos",
      href: `/profile/${userId}/orders`,
      icon: <Package className="mr-2 size-4" />,
      exact: false,
    },
    {
      label: "Métodos de pagamento",
      href: `/profile/${userId}/payments`,
      icon: <CreditCard className="mr-2 size-4" />,
      exact: false,
    },
  ];

  const isActive = (href: string, active: boolean) => {
    if (active) return pathname === href;
    return pathname.startsWith(href);
  };

  const closeSheet = () => setOpen(false);

  const navContent = (
    <div className="space-y-6 flex flex-col h-full">
      <header>
        <TitleComponent as="h2" className="text-xl md:text-xl">
          Área do Usuário
        </TitleComponent>
        <SubtitleComponent as="p" className="text-wrap">
          Central de dados do Usuário
        </SubtitleComponent>
      </header>

      <nav className="space-y-1">
        {navLinks.map((link) => (
          <ProfileNavLink
            key={link.href}
            href={link.href}
            label={link.label}
            icon={link.icon}
            active={isActive(link.href, link.exact)}
            onClick={closeSheet}
          />
        ))}
      </nav>
      <div className="mt-auto pt-6 px-4">
        <Button
          variant="outline"
          className="w-full justify-start text-destructive hover:text-destructive hover:border-destructive/30"
          onClick={() => {
            logoutUser();
            closeSheet();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <aside
        className="hidden md:flex md:flex-col border-r border-border bg-background px-4 py-6 w-64 h-full overflow-y-hidden"
        style={{ height: "calc(100vh -60px)" }}
      >
        {navContent}
      </aside>
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button size="icon" className="rounded-full shadow-lg">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <div className="flex flex-col h-full py-6 px-4">{navContent}</div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
