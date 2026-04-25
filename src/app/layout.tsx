import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/views/navbar";
import Footer from "@/views/footer";
import WhatsAppButton from "@/components/whatsAppButton";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mustafa Tawab | Senior Full Stack Engineer",
  description: "Specializing in high-performance digital architectures and AI-driven development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-black text-white relative overflow-x-hidden`}>
          <div className="noise-overlay" />
          <Navbar />
          <main className="relative z-10">
            {children}
          </main>
          <Footer />
          <WhatsAppButton
            phoneNumber="+923475300572"
            message="Hello! Can I get more info about your services?."
          />
          <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
