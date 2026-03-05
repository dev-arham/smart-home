import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { getOrders } from "@/lib/queries/order.queries";
import Header from "@/components/blocks/header";
import Footer from "@/components/blocks/footer";
import OrderDetails from "@/components/blocks/OrderDetails";
import { headers } from "next/headers";

export const metadata = {
  title: "My Orders",
  description: "View all your orders and their status",
};

export default async function OrdersPage({ params }) {
  const { id } = await params;

  const session = await auth.api.getSession({
    headers: await headers()
  });

  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
  }

  if (id !== userId) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex flex-1 items-center justify-center pt-28 md:pt-32">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Unauthorized</h1>
            <p className="mt-2 text-muted-foreground">
              You do not have permission to view these orders.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const result = await getOrders({
    userId,
    page: 1,
    pageSize: 20,
  });

  return (
    <div className="flex min-h-screen flex-col mt-10">
      <Header />
      <main className="flex-1 pt-28 md:pt-32 pb-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <OrderDetails orders={result.data} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
