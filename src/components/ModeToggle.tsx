"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-9 h-9" />;

  const toggleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center rounded-full bg-foreground/5 border border-border hover:border-neon-cyan/50 hover:bg-foreground/10 transition-all duration-300 group"
      aria-label="Toggle Theme"
    >
      <AnimatePresence mode="wait">
        {theme === "light" && (
          <motion.div
            key="light"
            initial={{ opacity: 0, rotate: -90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-[18px] w-[18px] text-orange-500" />
          </motion.div>
        )}
        {theme === "dark" && (
          <motion.div
            key="dark"
            initial={{ opacity: 0, rotate: -90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-[18px] w-[18px] text-neon-cyan" />
          </motion.div>
        )}
        {(theme === "system" || !theme) && (
          <motion.div
            key="system"
            initial={{ opacity: 0, rotate: -90, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Monitor className="h-[18px] w-[18px] text-foreground/50 group-hover:text-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Tooltip hint */}
      <span className="absolute -bottom-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-foreground/80 text-[8px] font-mono tracking-widest text-background px-2 py-1 rounded border border-border whitespace-nowrap">
        MODE: {theme?.toUpperCase()}
      </span>
    </button>
  );
}
