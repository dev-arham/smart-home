import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { Poppins } from 'next/font/google'
import { authClient } from '@/lib/auth/client';
import { NeonAuthUIProvider } from '@neondatabase/auth/react';
import { Toaster } from '@/components/ui/sonner';
import Providers from "./providers";

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
      <body className={`${poppins.className} antialiased`}>
        <NeonAuthUIProvider
          authClient={authClient}
          redirectTo="/account/settings"
          emailOTP
          toaster={false}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Providers>
            {children}
            {/* <Toaster  position="top-right" /> */}
            </Providers>
          </ThemeProvider>
        </NeonAuthUIProvider>
      </body>
    </html>
  );
}
