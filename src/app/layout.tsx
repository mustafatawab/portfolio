import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/views/navbar";
import Footer from '@/views/footer'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "Mustafa Tawab",
  description: "A Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  
  return (
    <html lang="en">
    <head>
        <link rel="icon" href="/me.png" sizes="any" />
    </head>
      <body
        className={` antialiased dark:bg-gray-950`}
      >
        <Navbar />
        {children}
       <Footer />
      </body>
    </html>
  );
}
