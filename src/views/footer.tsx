"use client"
import React from "react"
import Link from "next/link"
import { Github, Linkedin, Mail, Heart } from "lucide-react"

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

const Footer = () => {
    return (
        <footer className="py-12 border-t border-border bg-background">
            <div className="container">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        {socials.map((social) => (
                            <Link
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all duration-[var(--duration-fast)] ease-[var(--ease)]"
                            >
                                <social.icon size={18} />
                            </Link>
                        ))}
                    </div>
                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Mustafa Tawab
                    </p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
