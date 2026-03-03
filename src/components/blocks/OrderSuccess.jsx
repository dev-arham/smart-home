import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";

export default async function OrderSuccess() {
  const { data: session } = await auth.getSession();
  const userId = session?.user?.id;

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <Separator className="my-8" />

        {/* Heading + Subtext */}
        <h1 className="text-5xl font-bold tracking-tight text-foreground">
          Thank you for your order!
        </h1>
        <p className="mt-2 text-muted-foreground text-center">
          Your order has been placed successfully
        </p>

        <Separator className="my-8" />

        {/* Action Buttons */}
        <div className="w-full flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="flex-1">
            <Link href="/">Continue Shopping</Link>
          </Button>
          {userId && (
            <Button asChild variant="outline" size="lg" className="flex-1">
              <Link href={`/orders/${userId}`}>View Orders</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
