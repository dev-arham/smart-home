import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export type AdminSession = {
  userId: string;
  name: string;
  email: string;
  role: "admin";
};

/**
 * Server-only helper that verifies the current user is an authenticated admin.
 * Redirects to /login when there is no session and to / when the user
 * is authenticated but does not hold the "admin" role.
 */
export async function requireAdmin(): Promise<AdminSession> {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as { id: string; name?: string; email?: string; role?: string };

  const role = user?.role ?? "customer"; // Default to "customer" if role is missing

  if (!user || role !== "admin") {
    redirect("/");
  }

  return {
    userId: user.id,
    name: user.name ?? "Admin",
    email: user.email ?? "",
    role: "admin",
  };
}
