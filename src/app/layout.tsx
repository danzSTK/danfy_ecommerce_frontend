import type { Metadata } from "next";
import { Inter, Poppins, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import { SidebarProvider } from "@/hooks/useSidebarContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const monoSpace = Roboto_Mono({
  variable: "--font-mono-space",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Danfy Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={` ${poppins.variable} ${inter.variable} ${monoSpace.variable}`}
    >
      <body className={`dark`}>
        <main>
          <SidebarProvider>
            <Header />
            {children}
          </SidebarProvider>
        </main>
      </body>
    </html>
  );
}
