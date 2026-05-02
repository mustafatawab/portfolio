"use client";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import logo from "../../public/mustafa_logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/ModeToggle";

type LinkType = {
  url: string;
  label: string;
};

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links: LinkType[] = [
    { label: "ABOUT", url: "/#about" },
    { label: "WORK", url: "/projects" },
    { label: "TECH", url: "/#skills" },
    { label: "CONTACT", url: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4" : "py-8"
      }`}
    >
      <nav className={`container mx-auto px-6`}>
        <div className={`glass-card rounded-full px-8 py-3 flex items-center justify-between border-border shadow-2xl transition-all duration-500 ${
          scrolled ? "bg-background/60 scale-95" : "bg-transparent border-transparent shadow-none"
        }`}>
          <Link href="/" className="relative group">
            <div className="text-xl font-black font-display tracking-[0.2em] flex items-center gap-1 transition-all duration-300 group-hover:neon-glow-cyan p-2 rounded-lg text-foreground">
              <span className="text-neon-cyan font-mono">{`{`}</span>
              <span className="group-hover:text-neon-cyan transition-colors">MUSTAFA</span>
              <span className="text-neon-cyan font-mono">{`}`}</span>
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-neon-cyan group-hover:w-full transition-all duration-300" />
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.url}
                className="px-5 py-2 text-[10px] font-mono tracking-[0.2em] text-foreground/60 hover:text-neon-cyan transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="h-4 w-[1px] bg-foreground/10 mx-4" />
            <Link 
              href="https://mustafa-mko4.onrender.com/" 
              target="_blank"
              className="text-[10px] font-mono tracking-[0.2em] text-neon-purple hover:text-neon-purple/80 transition-colors"
            >
              NEURAL BOT
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <ModeToggle />
            <Link
              href="https://www.fiverr.com/mustafatawab/create-interactive-ecommerce-store-with-react-js-next-js-tailwind-css"
              target="_blank"
              className="hidden sm:block"
            >
              <Button
                variant="outline"
                className="rounded-full border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan hover:text-background transition-all duration-300 px-6 font-mono text-[10px] tracking-widest"
              >
                HIRE ENGINEER
              </Button>
            </Link>

            <button 
              className="md:hidden text-foreground p-2"
              onClick={() => setToggle(!toggle)}
            >
              {toggle ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-6 right-6 mt-4 md:hidden z-[60]"
          >
            <div className="glass-card bg-background/95 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border-border flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.label}
                  href={link.url}
                  onClick={() => setToggle(false)}
                  className="text-sm font-mono tracking-[0.3em] text-foreground/60 hover:text-neon-cyan transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="h-[1px] w-full bg-foreground/10" />
              <Link
                href="https://www.fiverr.com/mustafatawab"
                target="_blank"
                className="w-full"
              >
                <Button className="w-full bg-neon-cyan text-background font-bold rounded-xl">
                  HIRE ME
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
