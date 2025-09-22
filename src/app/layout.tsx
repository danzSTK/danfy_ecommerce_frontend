import "./globals.css";

import { defaultMetadata } from "@/lib/metadata";
import BaseLayout from "@/components/baseLayout/BaseLayout";
import { ReduxProvider } from "@/lib/redux/provider";

import { Toaster } from "sonner";
import { USER_ROLES } from "@/interfaces/Constants";

export const metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log("layout padrao carregado");
  console.log(USER_ROLES.ADMIN);
  return (
    <BaseLayout>
      <ReduxProvider>
        {children}
        <Toaster richColors position="top-right" />
      </ReduxProvider>
    </BaseLayout>
  );
}
