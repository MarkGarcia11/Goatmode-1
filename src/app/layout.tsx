import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Manrope, Instrument_Serif, Yellowtail } from "next/font/google";

const script = Yellowtail({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-script",
  display: "swap",
});
import "./globals.css";
import Chrome from "@/components/Chrome";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.svg" },
  title: "Goat Mode — Built For Your Journey | Premium Fitness Apparel",
  description:
    "Goat Mode is a premium fitness apparel brand for men and women. Training essentials designed for movement, comfort and confidence. Feel good. Move better.",
  keywords: ["Goat Mode", "fitness apparel", "gym clothes", "activewear", "leggings", "training"],
  openGraph: {
    title: "Goat Mode — Built For Your Journey",
    description: "Premium fitness apparel for men and women. Feel good. Move better.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FCFBF8",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${instrument.variable} ${script.variable}`}>
      <body className="bg-cream text-charcoal antialiased">
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
