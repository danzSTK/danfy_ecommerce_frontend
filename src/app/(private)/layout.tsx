import { AuthGuard } from "@/components/providers/AuthGuard";
import { AuthInitializer } from "@/components/providers/AuthInitializer";

export default function PrivateRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("layout privado carregado");
  return (
    <AuthInitializer>
      <AuthGuard>{children}</AuthGuard>
    </AuthInitializer>
  );
}
