"use client"
import React, { useState, useEffect, useCallback, useRef } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    motion,
    AnimatePresence,
    useScroll,
    useSpring,
    useMotionValueEvent,
} from "framer-motion"
import { ModeToggle } from "@/components/ModeToggle"

type LinkType = {
    url: string
    label: string
}

const links: LinkType[] = [
    { label: "Projects", url: "/projects" },
    { label: "Case Studies", url: "/case-studies" },
    { label: "About", url: "/#about" },
    { label: "Blog", url: "/blogs" },
    { label: "Contact", url: "/#contact" },
]

const mobileItemVariants = {
    hidden: { opacity: 0, x: -12 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.05 * i,
            duration: 0.25,
            ease: [0.25, 0.1, 0.25, 1] as const,
        },
    }),
}

const Navbar = () => {
    const [toggle, setToggle] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const mobileMenuRef = useRef<HTMLDivElement>(null)
    const menuButtonRef = useRef<HTMLButtonElement>(null)

    const { scrollY, scrollYProgress } = useScroll()
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    const [hidden, setHidden] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious()
        if (!previous) return
        if (latest > 150 && latest > previous) {
            setHidden(true)
        } else {
            setHidden(false)
        }
    })

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const isActive = useCallback(
        (url: string) => {
            if (url.startsWith("/#")) return false
            return pathname === url
        },
        [pathname]
    )

    useEffect(() => {
        if (!toggle) return
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setToggle(false)
                menuButtonRef.current?.focus()
                return
            }
            if (e.key !== "Tab" || !mobileMenuRef.current) return
            const focusable =
                mobileMenuRef.current.querySelectorAll<HTMLElement>(
                    'a, button, input, [tabindex]:not([tabindex="-1"])'
                )
            if (focusable.length === 0) return
            const first = focusable[0]
            const last = focusable[focusable.length - 1]
            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault()
                    last.focus()
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault()
                    first.focus()
                }
            }
        }
        document.addEventListener("keydown", handleKeyDown)
        return () => document.removeEventListener("keydown", handleKeyDown)
    }, [toggle])

    return (
        <motion.header
            variants={{
                visible: { y: 0, x: "-50%" },
                hidden: { y: "-150%", x: "-50%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-5 left-1/2 z-[var(--z-sticky)] w-max max-w-[95vw]`}
        >
            <nav
                className={`flex items-center justify-between gap-6 md:gap-10 px-6 py-2.5 rounded-full border transition-all duration-300 ${
                    scrolled
                        ? "border-border-strong bg-card/85 backdrop-blur-xl shadow-[var(--shadow-lg)]"
                        : "border-border/60 bg-card/60 backdrop-blur-md shadow-[var(--shadow-sm)]"
                }`}
            >
                <Link
                    href="/"
                    className="relative group flex items-center gap-2.5"
                >
                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
                    <span className="font-heading font-bold tracking-tight text-sm sm:text-base text-foreground">
                        MUSTAFA{" "}
                        <span className="text-primary font-extrabold">
                            TAWAB
                        </span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-7">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.url}
                            className={`relative text-xs tracking-wide uppercase transition-colors duration-[var(--duration-fast)] ${
                                isActive(link.url)
                                    ? "text-primary font-semibold"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {link.label}
                            <span
                                className={`absolute -bottom-[4px] left-0 right-0 h-[2px] bg-primary scale-x-0 transition-transform duration-[var(--duration-fast)] ${
                                    isActive(link.url)
                                        ? "scale-x-100"
                                        : "group-hover:scale-x-100"
                                }`}
                            />
                        </a>
                    ))}
                    <div className="flex items-center gap-3 pl-3 border-l border-border">
                        <ModeToggle />
                        <Link href="/#contact">
                            <Button className="rounded-full bg-primary text-primary-foreground font-semibold hover:bg-primary-hover text-xs tracking-wider uppercase h-8 px-4 shadow-[var(--shadow-xs)] hover:shadow-[var(--glow-sm)] transition-all duration-200">
                                Hire Me
                            </Button>
                        </Link>
                    </div>
                </div>

                <div className="flex md:hidden items-center gap-2">
                    <ModeToggle />
                    <button
                        ref={menuButtonRef}
                        className="text-foreground p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-full hover:bg-foreground/5 transition-colors"
                        onClick={() => setToggle(!toggle)}
                        aria-label={toggle ? "Close menu" : "Open menu"}
                        aria-expanded={toggle}
                    >
                        {toggle ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </nav>

            <AnimatePresence>
                {toggle && (
                    <motion.div
                        ref={mobileMenuRef}
                        initial={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                        transition={{
                            duration: 0.25,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="absolute top-full left-0 right-0 mt-2 md:hidden z-[var(--z-modal)] min-w-[260px]"
                        role="dialog"
                        aria-modal="true"
                        aria-label="Navigation menu"
                    >
                        <div className="glass-card p-5 flex flex-col gap-1 shadow-[var(--shadow-xl)]">
                            {links.map((link, i) => (
                                <motion.div
                                    key={link.label}
                                    custom={i}
                                    variants={mobileItemVariants}
                                    initial="hidden"
                                    animate="visible"
                                >
                                    <Link
                                        href={link.url}
                                        onClick={() => setToggle(false)}
                                        className={`block px-4 py-2.5 rounded-lg text-sm transition-colors ${
                                            isActive(link.url)
                                                ? "text-foreground bg-primary-light font-medium"
                                                : "text-muted-foreground hover:text-foreground hover:bg-foreground/5"
                                        }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2, duration: 0.3 }}
                                className="h-px bg-border my-2"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.25, duration: 0.3 }}
                            >
                                <Link
                                    href="/#contact"
                                    onClick={() => setToggle(false)}
                                >
                                    <Button className="w-full bg-primary text-primary-foreground rounded-lg text-sm shadow-[var(--shadow-xs)] hover:shadow-[var(--glow-sm)] transition-shadow duration-300">
                                        Hire Me
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    )
}

export default Navbar
