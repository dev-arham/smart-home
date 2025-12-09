import { SidebarProvider } from "@/components/ui/sidebar";
import "./globals.css";
import { Montserrat, Open_Sans } from 'next/font/google';
import { AppSidebar } from "@/components/blocks/sidebar";
import { ThemeProvider } from "@/components/providers/theme-provider"

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });


export const metadata = {
  title: "Shargo Homes",
  description: "Kitchenware, Home Appliances and more",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider open={false}>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
