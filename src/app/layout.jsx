import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { Montserrat, Open_Sans } from 'next/font/google';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/blocks/sidebar";

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });


export const metadata = {
  title: "Aqua Electrical",
  description: "Smart Home Accessories Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
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
