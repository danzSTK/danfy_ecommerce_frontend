import { AuthInitializer } from "@/components/providers/AuthInitializer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("layout padrao carregado");
  return <AuthInitializer>{children}</AuthInitializer>;
}
