import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Inter, Merriweather } from "@next/font/google";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
});

const merriweather = Merriweather({
  weight: ["400", "700"],
  subsets: ["latin"],
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
    <footer>
      <Footer />
    </footer>
  );

  return (
    <html lang="en">
      <body
        className={`antialiased dark:bg-gray-950 dark:text-gray-100 ${inter.className}`}
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
