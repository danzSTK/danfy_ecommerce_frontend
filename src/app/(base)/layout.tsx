import Footer from "@/components/footer/footer";
import { SidebarProvider } from "@/hooks/useSidebarContext";
import { ReactNode } from "react";

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SidebarProvider>
        {children}
        <Footer />
      </SidebarProvider>
    </>
  );
}
