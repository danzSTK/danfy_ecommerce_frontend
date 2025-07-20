import "./globals.css";

import { defaultMetadata } from "@/lib/metadata";
import BaseLayout from "@/components/baseLayout/BaseLayout";
import { ReduxProvider } from "@/lib/redux/provider";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("layout padrao carregado");
  return (
    <BaseLayout>
      <ReduxProvider>{children}</ReduxProvider>
    </BaseLayout>
  );
}
