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

const Header = ({ fontColor = "gray-900" }) => {
  return (
    <HeaderClient>
      <div className="topBar bg-tertiary/80 text-tertiary-foreground py-2 text-center text-sm backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-1 max-sm:px-5 max-sm:py-2 md:justify-center max-xl:px-5">
          <div className="left max-sm:hidden w-full h-8 flex items-center justify-center">
            <p>
              Need help? Call us{" "}
              <a href="tel:+923368882782">
                <span className="font-bold underline">+92 336 8882782</span>
              </a>
            </p>
          </div>
          <div className="hidden max-sm:block">
            <a href="tel:+923368882782">
              <Phone className="text-white" />
            </a>
          </div>
          <div className="center w-full flex gap-2 justify-center max-xl:justify-end max-sm:items-start">
            <TypingText
              text={[
                "Winter Sale Upto 50% off!",
                "Get exclusive discounts now!",
                "Shop smart home products!",
              ]}
              typingSpeed={50}
              deletingSpeed={30}
              pauseDuration={2000}
              showCursor={true}
              cursorCharacter="|"
              loop={true}
              className="font-semibold"
            />
          </div>
          <div className="right hidden w-full xl:block"></div>
        </div>
      </div>
      <div className="container mx-auto flex items-center justify-start px-1 py-4 max-sm:px-5 max-sm:py-2 gap-8">
        <div className="logo max-sm:w-auto">
          <NextImage
            src="/images/aqua-logo-transparent.png"
            alt="Logo"
            width={100}
            height={50}
            className=""
          />
        </div>
        <nav className="menu max-lg:hidden">
          <NavigationMenuDemo fontColor={fontColor} />
        </nav>
        <div className="hidden max-lg:block ml-auto">
          <SidebarTrigger />
        </div>
        <div className="userActions flex items-center gap-4 ml-auto">
          <UserAvatar />
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer "
            asChild
          >
            <Link href="/cart">
              <ShoppingBag color="gray" className="" />
            </Link>
          </Button>
          <WishlistDrawer>
            <Button variant="ghost" size="icon" className="cursor-pointer">
              <Heart color="gray" className="" />
            </Button>
          </WishlistDrawer>
        </div>
      </div>
    </HeaderClient>
  );
};

export default Header;
