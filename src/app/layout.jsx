import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { Poppins } from 'next/font/google'
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/blocks/sidebar";
import { authClient } from '@/lib/auth/client';
import { NeonAuthUIProvider, UserButton } from '@neondatabase/auth/react';


const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Aqua Electrical",
  description: "Smart Home Accessories Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body
        className={`${poppins.className} antialiased`}
      >
        <NeonAuthUIProvider
          authClient={authClient}
          redirectTo="/account/settings"
          emailOTP
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
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}
