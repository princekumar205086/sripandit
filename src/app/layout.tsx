import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./(componentsUi)/navbar/page";
import Footer from "./(componentsUi)/footer/page";
import { ToastContainer } from 'react-toastify';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

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
        <Link href="https://wa.me/9471661636" target="_blank" rel="noopener noreferrer" style={{
          position: 'fixed',
          width: '60px',
          height: '60px',
          bottom: '40px',
          right: '40px',
          backgroundColor: '#25d366',
          color: '#FFF',
          borderRadius: '50px',
          textAlign: 'center',
          fontSize: '30px',
          boxShadow: '2px 2px 3px #999',
          zIndex: '100',
        }}>
          <FaWhatsapp style={{ marginTop: '16px', marginLeft: '15px' }} />
        </Link>
      </body>
    </html>
  );
}
