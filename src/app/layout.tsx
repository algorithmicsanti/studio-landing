import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import HamburgerMenu from "@/components/hamburger-menu";
import WhatsAppWidget from "@/components/whatsapp-widget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adnova Studio | Producción de Video Ads con IA",
  description: "Crea anuncios de video para tu producto, marca o servicio en días, no semanas con la IA de Adnova Studio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <HamburgerMenu />
        <Header />
        <WhatsAppWidget />
        {children}
      </body>
    </html>
  );
}
