"use client"
import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import MainNavigation from "@/components/general/MainNavigation";
import { AuthProvider } from '../contexts/authContext';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}

      >
        <AuthProvider>
          <MainNavigation />
          {children}
        </AuthProvider>
        <Toaster richColors={true} />

      </body>
    </html>
  );
}
