"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/ModeToggle";

type LinkType = {
  url: string;
  label: string;
};

const links: LinkType[] = [
  { label: "Projects", url: "/projects" },
  { label: "Case Studies", url: "/case-studies" },
  { label: "About", url: "/#about" },
  { label: "Blog", url: "/blogs" },
  { label: "Contact", url: "/#contact" },
];

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
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = useCallback(
    (url: string) => {
      if (url.startsWith("/#")) return false;
      return pathname === url;
    },
    [pathname],
  );

  useEffect(() => {
    if (!toggle) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setToggle(false);
        menuButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !mobileMenuRef.current) return;
      const focusable = mobileMenuRef.current.querySelectorAll<HTMLElement>(
        'a, button, input, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-[var(--duration-normal)] ease-[var(--ease)] ${
        scrolled
          ? "py-3 bg-background/80 backdrop-blur-xl shadow-[var(--shadow-sm)]"
          : "py-5 bg-transparent"
      }`}
    >
      <nav className="container flex items-center justify-between">
        <Link href="/" className="relative group">
          <span className="text-lg font-semibold tracking-tight text-foreground space-x-[2px]">
            <span className="text-primary">{"{"}</span>
            <span>Mustafa Tawab</span>
            <span className="text-primary">{"}"}</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className={`relative text-sm transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] ${
                isActive(link.url)
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-[3px] left-0 right-0 h-[1.5px] bg-foreground/20 scale-x-0 transition-transform duration-[var(--duration-fast)] ease-[var(--ease)] hover:scale-x-100 ${isActive(link.url) ? "scale-x-100 bg-foreground" : ""}`}
              />
            </a>
          ))}
          <div className="flex items-center gap-3 pl-4 border-l border-border">
            <ModeToggle />
            <Link href="/#contact">
              <Button className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 text-sm h-9 px-4 shadow-[var(--shadow-xs)]">
                Hire Me
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <button
            ref={menuButtonRef}
            className="text-foreground p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-foreground/5 transition-colors"
            onClick={() => setToggle(!toggle)}
            aria-label={toggle ? "Close menu" : "Open menu"}
            aria-expanded={toggle}
          >
            {toggle ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {toggle && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute top-full left-4 right-4 mt-2 md:hidden z-[60]"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="bg-card border border-border rounded-xl shadow-[var(--shadow-lg)] p-5 flex flex-col gap-1">
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
                <Link href="/#contact" onClick={() => setToggle(false)}>
                  <Button className="w-full bg-primary text-primary-foreground rounded-lg text-sm shadow-[var(--shadow-xs)]">
                    Hire Me
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
