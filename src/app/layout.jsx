import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import { Poppins } from 'next/font/google'
import { Toaster } from '@/components/ui/sonner';
import Providers from "./providers";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

export const metadata = {
  title: "Aqua Electrical — Smart & Traditional Electrical, Reimagined",
  description:
    "Premium smart-home and traditional electrical products engineered for modern living. Explore the Aqua Smart and Aqua Electrical collections.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${poppins.variable} dark`}>
      <body suppressHydrationWarning className={`${poppins.className} antialiased bg-background text-foreground`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Providers>
            {children}
            <Toaster position="top-right" />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
