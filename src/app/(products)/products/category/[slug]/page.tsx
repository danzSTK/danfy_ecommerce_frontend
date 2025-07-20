import { SidebarProvider } from "@/components/ui/sidebar";
import CategoryList from "@/view/products/CategoryList";

export default function CategoryPage() {
  return (
    <>
      <SidebarProvider>
        <CategoryList />
      </SidebarProvider>
    </>
  );
}
