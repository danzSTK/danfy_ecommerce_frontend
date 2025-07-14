import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import { SidebarProvider } from "@/hooks/useSidebarContext";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        <Header />
        {children}
        <Footer />
      </SidebarProvider>
    </>
  );
}
