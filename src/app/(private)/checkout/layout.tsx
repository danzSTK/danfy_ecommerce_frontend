import { ReactNode } from "react";

export const metadata = {
  title: "Checkout",
  description: "Finalize sua compra de forma rápida e segura.",
};

export default function CheckoutLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  // Este layout pode ser usado para um cabeçalho/rodapé simplificado na página de checkout
  return <main>{children}</main>;
}
