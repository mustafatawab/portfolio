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

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" sizes="any" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground relative overflow-x-hidden transition-colors duration-500`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
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
          </ThemeProvider>
      </body>
    </html>
  );
}
