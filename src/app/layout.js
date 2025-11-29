import "./globals.css";
import { Montserrat, Open_Sans } from 'next/font/google';

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' });
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });


export const metadata = {
  title: "MTRONIC",
  description: "Smart Home Accessories Store",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${openSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
