import React from "react";
import { NavigationMenuDemo } from "./navigation-menu";
import { Image } from "next/image";
import { Heart } from "lucide-react";
import { Button } from "../ui/button";
import { ShoppingBag } from "lucide-react";
import { Phone } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import UserAvatar from "./user-avatar";
import WishlistDrawer from "./wishlist-drawer";
import Link from "next/link";
import HeaderClient from "./header-client";
import NextImage from "next/image";
import TypingText from "../ui/typing-text";
import { ThemeToggle } from "./theme-toggle";

const Header = ({ fontColor = "gray-900" }) => {
  return (
    <HeaderClient>

      <div className="container mx-auto flex items-center justify-between text-center px-4 py-2 max-sm:px-5 max-sm:py-2 gap-8">
        <div className="logo max-sm:w-auto *:">
          <NextImage
            src="/images/aqua-logo-transparent.png"
            alt="Logo"
            width={100}
            height={50}
            className=""
          />
        </div>
        <nav className="menu max-lg:hidden">
          <NavigationMenuDemo />
        </nav>
        <div className="hidden max-lg:block ">
          <SidebarTrigger />
        </div>
        <div className="userActions flex items-center gap-4 ">
          <UserAvatar />
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer "
            asChild
          >
            <Link href="/cart">
              <ShoppingBag color="black" className="" />
            </Link>
          </Button>
          <WishlistDrawer>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Heart color="black" className="" />
            </Button>
          </WishlistDrawer>
          {/* <ThemeToggle  className="text-black"/> */}
        </div>
      </div>
    </HeaderClient>
  );
};

export default Header;
