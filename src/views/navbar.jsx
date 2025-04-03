"use client";
import React, { useState } from "react";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { Menu } from "lucide-react";
import Link from "next/link";
const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [toggle, setToggle] = useState(false);

  
  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
  };

  const links = [
    { label: "About", url: "#about" },
    { label: "Skills", url: "#skills" },
    { label: "Projects", url: "#projects" },
    { label: "Contact", url: "#contact" },
  ];
  return (
    <header id="header"
      className={`dark:bg-gray-950 dark:border-b-[1px] ${
        toggle && "bg-black text-white pb-5"
      } rounded-b-xl`}
    >
      <nav className="flex items-center justify-between p-5 w-full md:w-4/5  mx-auto">
        <Link href='/' className="text-2xl font-semibold">
          <span className="text-blue-600 font-bold text-3xl">M</span>ustafa
          Tawab
        </Link>
        <div className={` hidden md:flex gap-10 justify-center items-center`}>
          {links.map((link, i) => (
            <a
              className="py-2 px-4 dark:border-0 rounded-full hover:text-blue-600 hover:border hover:border-blue-600 duration-300 border border-white"
              key={i}
              href={link.url}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex gap-5">
          <div className="cursor-pointer" onClick={toggleTheme}>
            {dark ? <Moon /> : <Sun />}
          </div>
          <div className="block md:hidden" onClick={() => setToggle(!toggle)}>
            <Menu />
          </div>
        </div>
      </nav>

      {toggle && (
        <div className="block md:hidden transition delay-150 duration-300 ease-in-out">
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
