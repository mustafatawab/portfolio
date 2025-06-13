"use client";
import React, { useState, useEffect } from "react";
import { Download, Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { BsDownload } from "react-icons/bs";
const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [toggle, setToggle] = useState(false);

  const [scrolled, setScrolled] = useState(false);


  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
    localStorage.setItem("dark", dark)
  };


  const links = [
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
    <header id="header"
      className={`dark:bg-gray-950 dark:border-b-[1px]  ${scrolled
        ? "bg-white/90 dark:bg-gray-900 shadow-md backdrop-blur-sm"
        : "bg-transparent"
        } ${toggle && "bg-black text-white pb-5"
        } rounded-b-xl sticky top-0 z-50 transition-all duration-300`}
    >
      <nav className="flex items-center justify-between p-5 container  mx-auto">
        <Link href='/' className="text-2xl font-semibold text-black dark:text-white">
          <span className="text-blue-600 font-bold text-3xl">M</span>ustafa
          Tawab
        </Link>
        <div className={` hidden md:flex gap-2 justify-center items-center`}>
          {links.map((link, i) => (
            <a
              className="py-2 px-4 dark:border-0 rounded-full hover:text-blue-600 hover:border hover:border-blue-600 duration-300 border border-transparent"
              key={i}
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
          <Link target="_blank" href={'https://docs.google.com/document/d/1hFqLu_I3RAWGwAgBD5rlCzXeCb2znjKzLJGglznKfaU/edit?usp=sharing'} className="flex items-center gap-2    text-blue-600 py-1 px-2 rounded-lg"><BsDownload />   Resume</Link>
          <div className="block md:hidden" onClick={() => setToggle(!toggle)}>
            <Menu />
          </div>
        </div>
      </nav>

      {toggle && (
        <div className="block md:hidden transition delay-150 duration-300 ease-in-out text-black dark:text-white">
          {links.map((link, i) => (
            <a
              className="block py-2 px-5 border-0   hover:text-blue-600 hover:border hover:border-blue-600 duration-30"
              key={i}
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
