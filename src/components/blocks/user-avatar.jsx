import Link from "next/link";
import { User, UserCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { signOut } from "@/server/auth";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function UserAvatar() {

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    return (
      <Link href="/login">
        <Button
          size="sm"
          className="cursor-pointer bg-primary hover:bg-primary/90 text-primary-foreground rounded-full sm:h-10 sm:px-4 sm:text-sm shadow-[0_0_24px_-8px_var(--color-primary)]"
        >
          <User className="h-4 w-4" />
          <span className="max-sm:hidden">Login</span>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="cursor-pointer text-foreground hover:bg-white/5 rounded-full sm:h-10 sm:px-4 sm:text-sm"
        >
          <UserCircle className="h-4 w-4 shrink-0" />
          <span className="max-sm:hidden truncate max-w-[100px]">{user?.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="font-bold">
          {user?.email}
        </DropdownMenuItem>
        {user.role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin">Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/account/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/orders/${user?.id}`}>My Orders</Link>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={signOut}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
