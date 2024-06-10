import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(componentsUi)/navbar/page";
import Footer from "./(componentsUi)/footer/page";
import { ToastContainer } from 'react-toastify';
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });  
export const metadata: Metadata = {
  title: "SRIPANDIT | Your vedic astrology partner",
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
        <Navbar />
        {children}
        <Footer />
        <ToastContainer />
        <SpeedInsights/>
      </body>
    </html>
  );
}
