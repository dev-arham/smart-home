import { requireAdmin } from "@/lib/auth/admin";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export const metadata = {
  title: "Admin | Smart Home",
};

export default async function AdminLayout({ children }) {
  const admin = await requireAdmin();

  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar admin={admin} />
      <SidebarInset>
        <AdminHeader admin={admin} />
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
