import Header from "@/components/header/header";
import { ProfileSidebar } from "@/components/sidebar/profileSidebar";
import { SidebarProvider } from "@/hooks/useSidebarContext";

export default function UserProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen">
        <Header navigationMenuItems={[]} className="sticky " />
        <div className="flex flex-1 min-h-[calc(100vh-60px)]">
          <ProfileSidebar />

          <main className="flex-1 p-6 overflow-y-auto ">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
