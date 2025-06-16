import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/views/navbar";
import Footer from '@/views/footer'
import WhatsAppButton from "@/components/whatsAppButton";


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
          <WhatsAppButton
        phoneNumber="+923475300572"
        message="Hello! Can I get more info about your services?."
      />
        <Navbar />
        {children}
       <Footer />
      </body>
    </html>
  );
}
