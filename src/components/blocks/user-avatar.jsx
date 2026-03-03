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

export default function UserAvatar() {
  const [session, setSession] = useState(undefined); // undefined = loading

  useEffect(() => {
    fetch("/api/auth/get-session")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setSession(data?.user ?? null))
      .catch(() => setSession(null));
  }, []);

  // Loading state — render nothing to avoid layout shift
  if (session === undefined) {
    return <div className="h-10 w-24" />;
  }

  if (!session) {
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

  const role = session?.role ?? "user";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="lg"
          className="cursor-pointer text-gray-900 hover:bg-gray-100 rounded-full"
        >
          <UserCircle />
          {session?.name}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="font-bold">
          {session?.email}
        </DropdownMenuItem>
        {role === "admin" && (
          <DropdownMenuItem asChild>
            <Link href="/admin">Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem variant="destructive" onClick={signOut}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
