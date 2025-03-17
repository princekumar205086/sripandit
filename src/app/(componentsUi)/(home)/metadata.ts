import { Metadata, Viewport } from "next";

// Separate the viewport configuration
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1
};

// Update the metadata with metadataBase
export const metadata: Metadata = {
  title: "OKPUJA | Your Trusted Partner for Hindu Rituals and Astro Guidance",
  description: "Expert guidance for vedic rituals, pujas, and astrology services by qualified pandits",
  keywords: "puja, pandit, hindu rituals, vedic astrology, online puja booking",
  robots: "index, follow",
  metadataBase: new URL("https://okpuja.com"), // Update this with your actual production URL
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: "https://okpuja.com",
    title: "OKPUJA | Hindu Rituals & Astrology Services",
    description: "Book authentic pujas and get expert astrology consultations",
    siteName: "OKPUJA",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OKPUJA",
      },
    ],
  },
};