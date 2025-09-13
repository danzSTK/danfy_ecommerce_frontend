"use client";
import { AlignRight, Heart, ShoppingCart, User } from "lucide-react";
import { NavContentType, NavMenu } from "../nav-menu/navMenu";
import { CardTitle } from "../ui/card";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { Button } from "../ui/button";
import { CartSidebar } from "../sidebar/cartSidebar";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { openCartSidebar } from "@/lib/redux/slices/cartSlice";

type Props = {
  navigationMenuItems: NavContentType[];
};

export default function Header({ navigationMenuItems }: Readonly<Props>) {
  const location = usePathname();
  const { openSidebar } = useSidebarContext();
  const dispatch = useAppDispatch();

  const handleOpenSidebar = () => {
    openSidebar("menu");
  };

  return (
    <header className="flex items-center justify-between px-4 py-3 shadow-md md:px-6 bg-popover fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <CardTitle className="md:text-2xl font-bold font-mono uppercase">
          DanfyShop
        </CardTitle>
        <NavMenu className="hidden md:block">
          {" "}
          {navigationMenuItems.map((item) => {
            const isActive = location === item.href;
            return (
              <li key={item.label}>
                <Button
                  className={cn(
                    "cursor-pointer hover:bg-muted",
                    isActive ? "bg-accent hover:bg-accent" : ""
                  )}
                  variant={"ghost"}
                  asChild
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              </li>
            );
          })}
        </NavMenu>
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

        <div className="flex space-x-1">
          <Button variant="ghost" className="hidden md:inline-flex">
            <User className="size-6" />
          </Button>

          <Button variant="ghost" className="">
            <Heart className="size-6" />
          </Button>

          <Button
            variant={"ghost"}
            className="relative"
            onClick={() => dispatch(openCartSidebar())}
          >
            <ShoppingCart className="size-6" />
            <span className="absolute top-0 right-0 text-xs bg-primary text-secondary rounded-full w-4 h-4 flex items-center justify-center">
              3
            </span>
          </Button>

          <Button
            className="flex justify-end md:hidden"
            variant="ghost"
            size="icon"
            type="button"
            onClick={handleOpenSidebar}
          >
            <AlignRight className="size-6" />
          </Button>
        </div>
      </div>

      <CartSidebar />
    </header>
  );
}
