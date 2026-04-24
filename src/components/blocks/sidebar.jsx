'use client'
import {
    Home,
    Info,
    Phone,
    Zap,
    Lightbulb,
    Power,
    ShieldAlert,
    Component,
    Sparkles,
    LayoutGrid,
} from "lucide-react"

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
    useSidebar,
} from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"

const collectionItems = [
    {
        title: "Aqua Smart",
        url: "/aqua-smart",
        icon: Sparkles,
        tone: "primary",
    },
    {
        title: "Aqua Electrical",
        url: "/aqua-electrical",
        icon: Zap,
        tone: "accent",
    },
]

const mainNavItems = [
    { title: "Home", url: "/", icon: Home },
    // { title: "All Products", url: "/category", icon: LayoutGrid },
    { title: "About Us", url: "/about", icon: Info },
    { title: "Contact", url: "/contact", icon: Phone },
]

const categoryItems = [
    { title: "Small Switches", url: "/category/small-switches", icon: Power },
    { title: "LED Lights", url: "/category/led-lights", icon: Lightbulb },
    { title: "Circuit Breakers", url: "/category/circuit-breakers", icon: ShieldAlert },
    { title: "Accessories", url: "/category/accessories", icon: Component },
]

export function AppSidebar() {
    const { setOpenMobile } = useSidebar()

    return (
        <Sidebar className="border-r border-white/5 bg-sidebar text-sidebar-foreground shadow-[4px_0_24px_rgba(0,0,0,0.35)]">
            <SidebarHeader className="bg-sidebar pt-6 pb-4">
                <div className="px-4 flex items-center justify-center mb-2">
                    <Link href="/" onClick={() => setOpenMobile(false)}>
                        <Image
                            src="/images/aqua-logo-transparent.png"
                            alt="Aqua Electrical"
                            width={120}
                            height={60}
                            className="object-contain brightness-0 invert drop-shadow-sm transition-transform hover:scale-105"
                        />
                    </Link>
                </div>
            </SidebarHeader>

            <SidebarContent className="bg-sidebar px-2">

                {/* Collections */}
                <SidebarGroup>
                    <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/40 mb-2 px-4">
                        Collections
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {collectionItems.map((item) => {
                                const toneClasses =
                                    item.tone === "primary"
                                        ? "border-primary/30 bg-primary/10 hover:border-primary/60 hover:bg-primary/20 text-primary"
                                        : "border-accent/30 bg-accent/10 hover:border-accent/60 hover:bg-accent/20 text-accent"
                                return (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link
                                                href={item.url}
                                                onClick={() => setOpenMobile(false)}
                                                className={`group flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${toneClasses}`}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span className="text-[15px] font-semibold text-foreground">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Main Navigation */}
                <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/40 mb-2 px-4">
                        Menu
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {mainNavItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            onClick={() => setOpenMobile(false)}
                                            className="group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-foreground/70 hover:bg-white/5 hover:text-foreground"
                                        >
                                            <item.icon className="w-5 h-5 text-foreground/50 group-hover:text-foreground transition-colors" />
                                            <span className="text-[15px] font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Categories */}
                {/* <SidebarGroup className="mt-4">
                    <SidebarGroupLabel className="text-[11px] font-bold uppercase tracking-[0.22em] text-foreground/40 mb-2 px-4">
                        Categories
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1">
                            {categoryItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            onClick={() => setOpenMobile(false)}
                                            className="group flex items-center gap-3 px-4 py-2.5 rounded-xl text-foreground/60 hover:bg-white/5 hover:text-foreground transition-all duration-200"
                                        >
                                            <div className="w-8 h-8 rounded-lg border border-white/10 bg-white/[0.04] flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/10 transition-all">
                                                <item.icon className="w-4 h-4 text-foreground/50 group-hover:text-accent transition-colors" />
                                            </div>
                                            <span className="text-[14px] font-medium">{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup> */}

            </SidebarContent>

            <SidebarFooter className="bg-sidebar p-6 border-t border-white/5">
                <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-foreground/40">
                        Technical Support
                    </span>
                    <a
                        href="tel:+923045771313"
                        className="text-sm font-semibold text-accent hover:text-accent/80 transition-colors"
                    >
                        +92 304 577 1313
                    </a>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}
