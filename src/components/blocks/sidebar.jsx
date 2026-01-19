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
import { File } from "lucide-react"
import { Info } from "lucide-react"
import { Phone } from "lucide-react"
import Image from "next/image"

// Menu items.
const items = [
    {
        title: "Home",
        url: "#",
        icon: Home,
    },
    {
        title: "Shop",
        url: "#",
        icon: Store,
    },
    {
        title: "Sale",
        url: "#",
        icon: Coins,
    },
    {
        title: "Blog",
        url: "#",
        icon: File,
    },
    {
        title: "Pages",
        url: "#",
        icon: Info,
    },
    {
        title: "Contact",
        url: "#",
        icon: Phone,
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
                                        <a href={item.url} className="flex gap-2 items-center">
                                            <item.icon width={19} />
                                            <span>{item.title}</span>
                                        </a>
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