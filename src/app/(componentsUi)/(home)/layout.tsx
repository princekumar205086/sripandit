import { Inria_Sans } from "next/font/google";
import Navbar from "./navbar/page";
import Footer from "./footer/page";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@/app/globals.css";
import LoaderWrapper from "./LoaderWrapper";
import { CartProvider } from "@/app/context/CartContext";
import { ToasterProvider, WhatsAppButton } from "./utility";
import { metadata, viewport } from "./metadata";

// Replace Inter with Inria Sans (matches your globals.css)
const inriaSans = Inria_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-inria-sans",
});

export { metadata, viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inriaSans.variable}>
      <body className="inria-sans-regular bg-cream">
        {/* Ensure the entire layout is wrapped inside LoaderWrapper */}
        <LoaderWrapper>
          {/* Navbar, children, and Footer are hidden until the LoaderWrapper finishes loading */}
          <CartProvider>
            <Navbar />
            <main className="min-h-screen">{children}</main>
          </CartProvider>
          <Footer />
        </LoaderWrapper>

        {/* Additional content that is not tied to loading */}
        <SpeedInsights />
        <ToasterProvider />
        <WhatsAppButton />
      </body>
    </html>
  );
}
