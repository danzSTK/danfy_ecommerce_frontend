import BaseLayout from "@/components/baseLayout/BaseLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("layout padrao carregado");
  return <BaseLayout>{children}</BaseLayout>;
}
