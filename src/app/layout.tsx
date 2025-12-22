import type { Metadata } from "next";
import { Geist, Geist_Mono, Comfortaa } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
  // weight: ["400", "500", "600", "700"], // choose weights you need
});

export const metadata: Metadata = {
  title: "Sky Adventures | Hot Air Balloon Rides",
  description: "Experience the sky like never before. Book your hot air balloon adventure today and soar above mountains and sunlit horizons.",
  openGraph: {
    title: "Sky Adventures",
    description: "Soar above mountains and sunlit horizons.",
    images:'/logo.png',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={comfortaa.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
