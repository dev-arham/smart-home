import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { Open_Sans } from 'next/font/google'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/blocks/sidebar";

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: "Aqua Electrical",
  description: "Smart Home Accessories Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={openSans.variable}>
      <body
        className="antialiased"
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider open={false}>
            
            <section className="w-full">
            <AppSidebar />
              <main>
                {children}
              </main>
            </section>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
