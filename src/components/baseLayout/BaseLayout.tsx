import { inter, MonoSpace, poppins } from "@/lib/fonts";
import { ReactNode } from "react";

export default function BaseLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${inter.variable} ${MonoSpace.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
