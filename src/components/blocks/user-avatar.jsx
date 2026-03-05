"use client";

import React, { useState, useEffect } from "react";
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
import { authClient } from "@/lib/auth/client";

export default function UserAvatar() {

  const { data } = authClient.useSession();
  const user = data?.user ?? undefined;

  // Loading state — render nothing to avoid layout shift
  if (user === undefined) {
    return <div className="h-10 w-24" />;
  }

  if (!user) {
    return (
      <Link href="/login">
        <Button
          size="lg"
          className="cursor-pointer bg-gray-900 hover:bg-gray-800 text-white rounded-full"
        >
          <User />
          <span className="max-sm:hidden">Login/Register</span>
        </Button>
      </Link>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="cursor-pointer text-gray-300 hover:bg-gray-100 rounded-full"
        >
          <UserCircle />
          {user?.name}
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
        {/* <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem> */}
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
