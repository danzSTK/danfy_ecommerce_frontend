"use client";
import Link from "next/link";
import { SidebarProvider } from "@/hooks/useSidebarContext";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Ticket,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
interface NavItem {
  href: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  permission?: string;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  const location = usePathname();

  const navItems: NavItem[] = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    {
      href: "/admin/products",
      label: "Produtos",
      icon: Package,
      permission: "products.read",
    },
    {
      href: "/admin/categories",
      label: "Categorias",
      icon: Tags,
      permission: "categories.read",
    },
    {
      href: "/admin/orders",
      label: "Pedidos",
      icon: ShoppingCart,
      permission: "orders.read",
    },
    {
      href: "/admin/users",
      label: "Usuários",
      icon: Users,
      permission: "users.read",
    },
    {
      href: "/admin/coupons",
      label: "Cupons",
      icon: Ticket,
      permission: "coupons.read",
    },
  ];
  return (
    <main className="bg-sidebar h-screen">
      <SidebarProvider>
        {" "}
        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-3xs max-w-full bg-background shadow-lg transition-transform duration-300"
          )}
        >
          <header className="flex items-center justify-between p-4 border-b">
            <h2 className="capitalize text-xl font-bold font-sans ">
              Danfy Admin
            </h2>
          </header>
          <nav className="mt-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location === item.href;
              return (
                <Link
                  href={item.href}
                  key={item.href}
                  className={` flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? "bg-primary text-white border-r-4"
                      : "text-muted-foreground hover:bg-gray-100 hover:text-gray-900"
                  }
                `}
                >
                  <Icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        {children}
      </SidebarProvider>
    </main>
  );
}
