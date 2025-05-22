"use client"

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
  // Remove any non-numeric characters from the phone number
  const formattedNumber = phoneNumber.replace(/\D/g, "")

  // Create the WhatsApp URL with the phone number and pre-filled message
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`

  // Define position classes based on the position prop
  const positionClasses = {
    "bottom-right": "bottom-6 right-6",
    "bottom-left": "bottom-6 left-6",
    "top-right": "top-6 right-6",
    "top-left": "top-6 left-6",
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed ${positionClasses[position]} z-50 flex items-center justify-center bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-110 active:scale-90`}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  )
}
