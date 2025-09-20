"use client";
import React, { useState, useEffect } from "react";
import {  Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { Menu } from "lucide-react";
import Link from "next/link";

type LinkType = {
  url : string,
  label : string
}

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
    localStorage.setItem("dark", JSON.stringify(dark));
  };

  const links : LinkType[] = [
    { label: "About", url: "/#about" },
    { label: "Work", url: "/projects" },
    { label: "Services", url: "/services" },
    { label: "Contact", url: "/#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      id="header"
      className={`dark:bg-gray-950 dark:border-b-[1px]  z-10 ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      } ${
        toggle && "bg-black text-white pb-5"
      } rounded-b-xl sticky top-0 z-50 transition-all duration-300`}
    >
      <nav className="flex items-center justify-between p-5 container  mx-auto">
        <Link
          href="/"
          className="text-2xl font-semibold text-black dark:text-white"
        >
          <span className="text-blue-600 font-bold text-3xl">M</span>ustafa
          Tawab
        </Link>
        <div className={` hidden md:flex gap-5 justify-center items-center`}>
          <div>
            {links.map((link : LinkType) => (
              <a
                className="py-1 px-4   hover:text-blue-600 hover:border-b-2 hover:border-blue-600 duration-500 border-b-2 border-transparent"
                key={link.label}
                href={link.url}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-5">
            <div className="cursor-pointer" onClick={toggleTheme}>
              {dark ? <Moon /> : <Sun />}
            </div>
            <div className="block md:hidden" onClick={() => setToggle(!toggle)}>
              <Menu />
            </div>
          </div>
        </div>
      </nav>

      {toggle && (
        <div className="block md:hidden transition delay-150 duration-300 ease-in-out text-black dark:text-white">
          {links.map((link : LinkType) => (
            <a
              className="block py-2 px-5 border-0   hover:text-blue-600 hover:border hover:border-blue-600 duration-30"
              key={link.label}
              href={link.url}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;
