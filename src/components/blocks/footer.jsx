"use client";

import Image from "next/image";

const LINKS = [
    {
        title: "Company",
        items: [
            { title: "About Us", href: "#" },
            { title: "Careers", href: "#" },
        ],
    },
    {
        title: "Pages",
        items: [
            { title: "Login", href: "#" },
            { title: "Register", href: "#" },
        ],
    },
    {
        title: "Legal",
        items: [
            { title: "Terms", href: "#" },
            { title: "Privacy", href: "#" },
        ],
    },
];

const YEAR = new Date().getFullYear();

export const title = "Company Footer";

export default function Footer() {
    return (
        <footer className="w-full border-t pb-4 pt-20">
            <div className="container mx-auto px-4">
                <div className="mb-12 grid grid-cols-1 items-start justify-between gap-8 md:grid-cols-2 lg:gap-12">
                    <div>
                        <Image src="/images/aqua-logo.png" alt="Logo" width={100} height={50} />
                        <p className="text-muted-foreground mt-3 max-w-md text-sm">
                            Aqua Electrical is your go-to destination for high-quality Electrical products and services. We are committed to providing exceptional customer service and expert advice to help you find the perfect solutions for your needs.
                        </p>
                    </div>
                    <div className="grid grid-cols-3 gap-x-8 gap-y-6 md:ml-auto">
                        {LINKS.map(({ title, items }) => (
                            <ul key={title} className="space-y-3">
                                <p className="mb-3 font-semibold">{title}</p>
                                {items.map(({ title, href }) => (
                                    <li key={title}>
                                        <a
                                            href={href}
                                            className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                                        >
                                            {title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
                <div className="w-full border-border flex flex-col items-start justify-center gap-6 border-t pt-4 md:flex-row md:items-center">
                    <p className="text-muted-foreground whitespace-nowrap text-sm text-center w-full">
                        &copy; {YEAR} Aqua Electrical. All Rights Reserved.
                    </p>
                </div>
        </footer>
    );
}
