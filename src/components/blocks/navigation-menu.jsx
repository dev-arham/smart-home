"use client"

import * as React from "react"
import Link from "next/link"
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { ArrowRight } from "lucide-react"


export function NavigationMenuDemo({ }) {
  const isMobile = useIsMobile()



  return (
    <NavigationMenu viewport={isMobile}>
      <NavigationMenuList className="flex justify-center gap-4">
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/category" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>Categories</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/aqua-smart" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>Aqua Smart</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/about" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>About</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/product" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}> Products</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>




        <NavigationMenuItem className="hidden md:block">
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/contact" className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>Contact</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
