import "./globals.css";

import { defaultMetadata } from "@/lib/metadata";
import BaseLayout from "@/components/baseLayout/BaseLayout";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("layout padrao carregado");
  return <BaseLayout>{children}</BaseLayout>;
}
