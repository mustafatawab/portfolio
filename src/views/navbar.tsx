"use client";
import React, { useState, useEffect } from "react";
import { Moon } from "lucide-react";
import { Sun } from "lucide-react";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import logo from "../../public/mustafa_logo.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";
type LinkType = {
  url: string;
  label: string;
};

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setDark(!dark);
    localStorage.setItem("dark", JSON.stringify(dark));
  };

  const links: LinkType[] = [
    { label: "About", url: "/#about" },
    { label: "Work", url: "/projects" },
    { label: "Services", url: "/services" },
    { label: "Contact", url: "/#contact" },
  ];

  useEffect(() => {
    // document.documentElement.classList.toggle("dark");

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
      className={`dark:bg-gray-950 dark:border-b-[1px]  z-10  ${
        scrolled
          ? "bg-white/90 dark:bg-gray-900 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      } ${
        toggle && "bg-black text-white pb-5"
      } rounded-b-xl sticky top-0 z-50 transition-all duration-300`}
    >
      <nav className="flex items-center justify-between p-5 container  mx-auto ">
        {/* <Link
          href="/"
          className="text-2xl font-semibold text-black dark:text-white"
        >
          <span className="text-blue-600 font-bold text-3xl">M</span>ustafa
          Tawab
        </Link> */}
        <Link
          href="/"
          className="text-2xl font-semibold text-black dark:text-white"
        >
          <Image src={logo} width={150} height={50} alt="Mustafa Tawab" />
        </Link>
        <div className={` hidden md:flex gap-2 justify-center items-center`}>
          <div>
            {links.map((link: LinkType) => (
              <a
                className="mx-4 px-1  font-semibold hover:text-blue-600 hover:border-b-2 hover:border-blue-600 duration-500 border-b-2 border-transparent"
                key={link.label}
                href={link.url}
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link target="_blank" className="mx-3 px-1 font-semibold text-blue-600 cursor-pointer hover:border-b-2 hover:border-blue-600 duration-500 border-b-2 border-transparent" href={"https://mustafa-mko4.onrender.com/"}>Personal Bot</Link>
        </div>
        <div className="flex items-center gap-5">
          <div className="cursor-pointer" onClick={toggleTheme}>
            {dark ? <Moon /> : <Sun />}
          </div>
          <Link
            href={
              "https://www.fiverr.com/mustafatawab/create-interactive-ecommerce-store-with-react-js-next-js-tailwind-css"
            }
            target="_blank"
            className="hidden sm:block"
          >
            {" "}
            <Button
              className="dark:hover:border-blue-600 hover:border-blue-600 hover:text-blue-600 bg-blue-600 dark:bg-blue-600 dark:hover:text-blue-600 text-white cursor-pointer"
              variant={"outline"}
            >
              {" "}
              Hire Me
            </Button>
          </Link>

          <div className="block md:hidden" onClick={() => setToggle(!toggle)}>
            <Menu />
          </div>
        </div>
      </nav>

      {toggle && (
        <div className="container flex md:hidden transition delay-150 duration-300 ease-in-out text-black dark:text-white  flex-col">
          {links.map((link: LinkType) => (
            <Link
              className="block py-2 px-5 border-0   hover:text-blue-600 hover:border hover:border-blue-600 duration-30"
              key={link.label}
              href={link.url}
            >
              {link.label}
            </Link>
          ))}

          <div className="px-5 flex flex-col gap-3">
            
            <Link
              href={
                "https://www.fiverr.com/mustafatawab/create-interactive-ecommerce-store-with-react-js-next-js-tailwind-css"
              }
              target="_blank"
              className="w-full"
            >
              {" "}
              <Button
                className="dark:hover:border-blue-600 hover:border-blue-600 hover:text-blue-600 bg-blue-600 dark:bg-blue-600 dark:hover:text-blue-600 text-white cursor-pointer w-full"
                variant={"outline"}
              >
                {" "}
                Hire Me
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
