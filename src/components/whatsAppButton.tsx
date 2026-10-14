"use client"

import { useEffect, useState } from "react"
import { MessageCircle, X } from "lucide-react"

interface WhatsAppButtonProps {
    phoneNumber: string
    message?: string
    position?: "bottom-right" | "bottom-left" | "top-right" | "top-left"
}

export default function WhatsAppButton({
    phoneNumber,
    message = "Hello! I have a question about your courses.",
    position = "bottom-right",
}: WhatsAppButtonProps) {
    const [visible, setVisible] = useState(false)
    const [dismissed, setDismissed] = useState(false)

    useEffect(() => {
        const handleScroll = () =>
            setVisible(window.scrollY > window.innerHeight * 0.8)
        handleScroll()
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const formattedNumber = phoneNumber.replace(/\D/g, "")
    const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`

    const positionClasses = {
        "bottom-right": "bottom-24 md:bottom-8 right-6",
        "bottom-left": "bottom-24 md:bottom-8 left-6",
        "top-right": "top-6 md:top-8 right-6",
        "top-left": "top-6 md:top-8 left-6",
    }

    if (dismissed) return null

    return (
        <div
            className={`fixed ${positionClasses[position]} z-[var(--z-toast)] flex items-center gap-2`}
        >
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-full border border-primary/30 bg-card/90 backdrop-blur-md text-foreground shadow-[var(--shadow-lg)] hover:border-primary hover:shadow-[var(--glow-sm)] transition-all duration-300 transform hover:scale-105 active:scale-95 group ${
                    visible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-4 pointer-events-none"
                }`}
                aria-label="Chat on WhatsApp"
            >
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                <MessageCircle className="h-4 w-4 text-primary transition-transform group-hover:scale-110" />
                <span className="text-xs font-medium tracking-wide">Chat on WhatsApp</span>
            </a>
            {visible && (
                <button
                    onClick={() => setDismissed(true)}
                    className="bg-card/80 border border-border hover:border-border-strong text-muted-foreground hover:text-foreground p-2 rounded-full transition-colors backdrop-blur-md"
                    aria-label="Dismiss WhatsApp button"
                >
                    <X size={13} />
                </button>
            )}
        </div>
    )
}
