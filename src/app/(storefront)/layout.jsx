import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/blocks/sidebar";

export default function StorefrontLayout({ children }) {
  return (
    <SidebarProvider open={false}>
      <section className="w-full">
        <AppSidebar />
        <main>{children}</main>
      </section>
    </SidebarProvider>
  );
}
