import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./navbar/page";
import Footer from "./footer/page";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Link from "next/link";
import "@/app/globals.css";
import LoaderWrapper from "./LoaderWrapper";
import { FaWhatsapp } from "react-icons/fa";
import { CartProvider } from "@/app/context/CartContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OKPUJA | Your Trusted Partner for Hindu Rituals and Astro Guidance",
  description: "Your vedic astrology partner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Ensure the entire layout is wrapped inside LoaderWrapper */}
        <LoaderWrapper>
          {/* Navbar, children, and Footer are hidden until the LoaderWrapper finishes loading */}
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
          <Footer />
        </LoaderWrapper>

        {/* Additional content that is not tied to loading */}
        <SpeedInsights />
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 5000,
            style: {
              background: "#363636",
              color: "#fff",
            },
            success: {
              duration: 3000,
              style: {
                background: "#22c55e",
              },
            },
            error: {
              duration: 4000,
              style: {
                background: "#ef4444",
              },
            },
          }}
        />
        <Link
          href="https://wa.me/918051555505"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: "fixed",
            width: "60px",
            height: "60px",
            bottom: "40px",
            right: "40px",
            backgroundColor: "#25d366",
            color: "#FFF",
            borderRadius: "50px",
            textAlign: "center",
            fontSize: "30px",
            boxShadow: "2px 2px 3px #999",
            zIndex: "100",
          }}
        >
          <FaWhatsapp style={{ marginTop: "16px", marginLeft: "15px" }} />
        </Link>
      </body>
    </html>
  );
}
