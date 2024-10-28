import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Jesuloluwa",
  description: "My Lazy Notes",
};

export default function RootLayout({ children }) {
  let header = (
    <header>
      <Header />
    </header>
  );

  let footer = (
    <header>
      <Footer />
    </header>
  );

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark:bg-gray-950 dark:text-gray-100`}
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
