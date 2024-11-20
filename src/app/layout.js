import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { Inter, Merriweather } from "@next/font/google";
import siteMetadata from "@/utils/siteMetadata";

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
  openGraph: {
    title: "Jesuloluwa",
    description: "My Lazy Notes",
    url: siteMetadata.siteUrl,
    images: [
      {
        url: `${siteMetadata.siteUrl}/images/og-image.png`,
        alt: "Jesuloluwa's Blog",
      },
    ],
    siteName: "Jesuloluwa's Blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesuloluwa",
    description: "My Lazy Notes",
    images: [`${siteMetadata.siteUrl}/images/og-image.png`],
  },
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
