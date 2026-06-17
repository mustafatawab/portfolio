"use client"

import { useEffect, useState } from "react"
import { MessageCircle } from "lucide-react"

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

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const formattedNumber = phoneNumber.replace(/\D/g, "")
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`

  const positionClasses = {
    "bottom-right": "bottom-24 md:bottom-8 right-6 md:right-8",
    "bottom-left": "bottom-24 md:bottom-8 left-6 md:left-8",
    "top-right": "top-6 md:top-8 right-6 md:right-8",
    "top-left": "top-6 md:top-8 left-6 md:left-8",
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${positionClasses[position]} z-50 flex items-center justify-center bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 active:scale-90 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
