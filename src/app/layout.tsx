import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/views/navbar"
import Footer from "@/views/footer"
import WhatsAppButton from "@/components/whatsAppButton"
import { Toaster } from "react-hot-toast"

const fontSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
})

const fontMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
})

export const metadata: Metadata = {
    metadataBase: new URL("https://mustafatawab.com"),
    title: {
        default: "Mustafa Tawab - Software Engineer",
        template: "%s - Mustafa Tawab",
    },
    description:
        "Building modern custom software and web applications that solve real business problems. Specializing in full-stack development, system design, and SaaS architecture.",
    openGraph: {
        title: "Mustafa Tawab - Software Engineer",
        description:
            "Building modern custom software and web applications that solve real business problems.",
        url: "https://mustafatawab.com",
        siteName: "Mustafa Tawab",
        locale: "en_US",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Mustafa Tawab - Software Engineer",
        description:
            "Building modern custom software and web applications that solve real business problems.",
    },
    robots: {
        index: true,
        follow: true,
    },
}

import { ThemeProvider } from "@/components/theme-provider"
import { websiteSchema } from "@/lib/json-ld"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const personJsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Mustafa Tawab",
        jobTitle: "Software Engineer",
        url: "https://mustafatawab.com",
        sameAs: [
            "https://github.com/mustafatawab",
            "https://www.linkedin.com/in/mustafa-tawab/",
        ],
        knowsAbout: [
            "Software Engineering",
            "Full Stack Development",
            "System Design",
            "React",
            "Next.js",
            "TypeScript",
            "Node.js",
            "FastAPI",
            "PostgreSQL",
        ],
    }

    const webSiteJsonLd = websiteSchema()

    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/logo.png" sizes="any" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(personJsonLd),
                    }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify(webSiteJsonLd),
                    }}
                />
            </head>
            <body
                suppressHydrationWarning
                className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased bg-background text-foreground relative overflow-x-hidden`}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <a
                        href="#main-content"
                        className="fixed -top-40 left-4 z-[100] p-4 bg-background border border-accent text-accent font-mono text-sm tracking-wider rounded-xl transition-all focus:top-4 focus:outline-2 focus:outline-accent"
                    >
                        Skip to main content
                    </a>
                    <Navbar />
                    <main id="main-content" className="relative z-10">
                        {children}
                    </main>
                    <Footer />
                    <WhatsAppButton
                        phoneNumber="+923475300572"
                        message="Hello! Can I get more info about your services?"
                    />
                    <Toaster position="bottom-right" />
                </ThemeProvider>
            </body>
        </html>
    )
}
