"use client"
import React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"

const socials = [
    {
        label: "GitHub",
        href: "https://github.com/waseem-mustafa-tawab",
        icon: Github,
    },
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mustafa-tawab-330278293/",
        icon: Linkedin,
    },
    {
        label: "Email",
        href: "mailto:waseemmustafatawab239@gmail.com",
        icon: Mail,
    },
]

const footerLinks = [
    { label: "Projects", url: "/projects" },
    { label: "Case Studies", url: "/case-studies" },
    { label: "Blog", url: "/blogs" },
    { label: "Services", url: "/services" },
    { label: "Contact", url: "/#contact" },
]

const Footer = () => {
    return (
        <footer className="py-12 border-t border-border bg-background">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-1">
                        {socials.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="group relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-[var(--duration-fast)] ease-[var(--ease)]"
                            >
                                <social.icon size={18} />
                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-[11px] font-medium rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                    {social.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                    <nav
                        className="flex items-center gap-4"
                        aria-label="Footer navigation"
                    >
                        {footerLinks.map((link) => (
                            <Link
                                key={link.url}
                                href={link.url}
                                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-[var(--duration-fast)]"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Mustafa Tawab. All
                        rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
