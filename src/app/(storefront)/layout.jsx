import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/blocks/sidebar";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

export default function StorefrontLayout({ children }) {
  return (
    <SmoothScrollProvider>
      <SidebarProvider open={false}>
        <section className="w-full">
          <AppSidebar />
          <main>{children}</main>
        </section>
      </SidebarProvider>
    </SmoothScrollProvider>
  );
}
