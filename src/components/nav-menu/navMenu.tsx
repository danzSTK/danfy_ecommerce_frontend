import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavContentType = {
  label: string;
  icon?: React.ReactElement;
  href: string;
};

/* type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";

type ButtonSize = "default" | "sm" | "lg" | "icon"; */

type NavMenuPropsType = {
  items: NavContentType[];
  hidden?: boolean;
  className?: string;
} & VariantProps<typeof buttonVariants>;

export function NavMenu({ className, items, size, variant }: NavMenuPropsType) {
  const location = usePathname();
  return (
    <nav className={className}>
      <ul className="flex items-center gap-2 md:flex-row">
        {items.map((item) => {
          const isActive = location === item.href;
          return (
            <li key={item.label}>
              <Button
                className={cn(
                  "cursor-pointer hover:bg-muted",
                  isActive ? "bg-accent" : ""
                )}
                variant={variant}
                size={size}
                asChild
              >
                <Link href={item.href}>
                  {size === "icon" ? item.icon : item.label}
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
