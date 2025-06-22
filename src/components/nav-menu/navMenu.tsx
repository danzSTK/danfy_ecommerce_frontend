import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";

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
  return (
    <nav className={className}>
      <ul className="flex items-center gap-2 md:flex-row">
        {items.map((item) => (
          <li key={item.label}>
            <Button
              className="cursor-pointer"
              variant={variant}
              size={size}
              asChild
            >
              <Link href={item.href}>
                {size === "icon" ? item.icon : item.label}
              </Link>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
