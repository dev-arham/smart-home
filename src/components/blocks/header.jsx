import React from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
  Heart,
  ShoppingBag,
  Sparkles,
  Zap,
  Search,
} from "lucide-react";
import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import UserAvatar from "./user-avatar";
import HeaderClient from "./header-client";
import WishlistCount from "./wishlist-count";

const SECONDARY_NAV = [
  { label: "Home", href: "/" },
  // { label: "Categories", href: "/category" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  return (
    <HeaderClient>
      <div className="mx-auto flex w-full items-center justify-between gap-3 px-3 py-2 sm:gap-4 sm:px-5 lg:gap-6 lg:px-6">
        {/* ── Logo ── */}
        <Link href="/" className="logo shrink-0 flex items-center gap-2">
          <NextImage
            src="/images/aqua-logo-transparent.png"
            alt="Aqua Electrical"
            width={120}
            height={60}
            className="h-auto w-[72px] brightness-0 invert sm:w-[88px] md:w-[100px]"
            priority
          />
        </Link>

        {/* ── Collection switcher (desktop) ── */}
        <div className="hidden items-center gap-1.5 rounded-full border border-border bg-card/60 p-1 lg:flex">
          <Link
            href="/aqua-smart"
            className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-all duration-300 hover:bg-primary/15 hover:text-foreground"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/20 ring-1 ring-accent/40 transition group-hover:bg-accent/40">
              <Zap className="h-3.5 w-3.5 text-accent" strokeWidth={2.2} />
            </span>
            Aqua Smart
            <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-primary to-transparent transition-transform duration-500 group-hover:scale-x-100 will-change-transform" />
          </Link>

          <span className="h-5 w-px bg-border" />

          <Link
            href="/aqua-electrical"
            className="group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-foreground/80 transition-all duration-300 hover:bg-muted hover:text-foreground"
          >
            Aqua Electrical
            <span className="absolute inset-x-4 -bottom-0.5 h-px scale-x-0 bg-gradient-to-r from-transparent via-accent to-transparent transition-transform duration-500 group-hover:scale-x-100 will-change-transform" />
          </Link>
        </div>

        {/* ── Secondary nav links (xl+ only) ── */}
        <nav className="hidden items-center gap-5 xl:flex">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/60 transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ── User actions ── */}
        <div className="user-actions flex min-w-0 shrink items-center gap-1 sm:gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Search"
            className="cursor-pointer text-foreground/80 hover:bg-muted hover:text-foreground max-sm:hidden"
          >
            <Search className="h-5 w-5" />
          </Button>

          <WishlistCount className="text-foreground/80 hover:bg-muted hover:text-foreground" />

          <Button
            variant="ghost"
            size="icon"
            aria-label="Cart"
            className="cursor-pointer text-foreground/80 hover:bg-muted hover:text-foreground"
            asChild
          >
            <Link href="/cart">
              <ShoppingBag className="h-5 w-5" />
            </Link>
          </Button>

          <UserAvatar />

          <div className="hidden shrink-0 text-foreground max-lg:block">
            <SidebarTrigger />
          </div>
        </div>
      </div>

      {/* Mobile collection switcher — visible below lg */}
      <div className="flex items-center justify-center gap-2 border-t border-white/5 px-3 pb-2 pt-2 lg:hidden">
        <Link
          href="/aqua-smart"
          className="group flex flex-1 items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary/40 hover:bg-primary/20"
        >
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Aqua Smart
        </Link>
        <Link
          href="/aqua-electrical"
          className="group flex flex-1 items-center justify-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-accent/40 hover:bg-accent/20"
        >
          <Zap className="h-3.5 w-3.5 text-accent" />
          Aqua Electrical
        </Link>
      </div>
    </HeaderClient>
  );
};

export default Header;
