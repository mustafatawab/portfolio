import type { Metadata } from "next"

export const metadata: Metadata = {
    title: "Learn Skills",
    description:
        "Systematic learning paths engineered to master modern full-stack development and AI integration.",
    openGraph: {
        title: "Learn Skills | Mustafa Tawab",
        description:
            "Systematic learning paths engineered to master modern full-stack development and AI integration.",
    },
}

export default function LearnSkillsLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children
}
