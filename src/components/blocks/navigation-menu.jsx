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
          <NavigationMenuTrigger className={navigationMenuTriggerStyle()}>
            <span className={`bg-transparent text-[16px] font-normal text-black hover:bg-transparent`}>Categories</span>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid grid-cols-4 min-w-150 gap-3">
              <ListItem href="/category/small-switches" title="Small Switches" />
              <ListItem href="/category/led-lights" title="LED Lights" />
              <ListItem href="/category/circuit-breakers" title="Circuit Breakers" />
              <ListItem href="/category/accessories" title="Accessories" />
            </ul>
          </NavigationMenuContent>
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
