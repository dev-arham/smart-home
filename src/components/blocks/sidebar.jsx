import { Home } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Store } from "lucide-react"
import { Coins } from "lucide-react"
import { Package } from "lucide-react"
import { Info } from "lucide-react"
import { Phone } from "lucide-react"
import { ShoppingBag } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

// Menu items - same as navigation menu
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "All Products",
        url: "/products",
        icon: Package,
    },
    {
        title: "Sale",
        url: "/sale",
        icon: Coins,
    },
    {
        title: "About",
        url: "/about",
        icon: Info,
    },
    {
        title: "Contact",
        url: "/contact",
        icon: Phone,
    },
    {
        title: "Shop",
        url: "#",
        icon: ShoppingBag,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarHeader>
                <div className="p-4 border-b border-gray-200">
                    <Image src="/images/aqua-logo.png" alt="Logo" width={100} height={50} />
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Menu</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url} className="flex gap-2 items-center">
                                            <item.icon width={19} />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}