import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/views/navbar";
import Footer from "@/views/footer";
import WhatsAppButton from "@/components/whatsAppButton";
import Image from "next/image";
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
      <body className={` antialiased dark:bg-gray-950 relative`}>
      {/* <Image  src={'/bg.webp'} alt="" width={'400'} height={'400'} className="w-screen h-screen absolute top-0 left-0 -z-10 opacity-80 bg-black" /> */}

        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton
          phoneNumber="+923475300572"
          message="Hello! Can I get more info about your services?."
        />
      </body>
    </html>
  );
}
