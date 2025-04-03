import React from "react";
import { Badge } from "@/components/ui/badge";
import { FaLinkedinIn } from "react-icons/fa6";

import Link from "next/link";

const HeroSection = () => {
  return (
    <section id="hero" className="py-20">
      <div className="p-5 w-full md:w-4/5  mx-auto">
        <div className="flex flex-col items-start gap-4">
          <Badge className="bg-blue-200 text-blue-600 px-2">
            Available for work
          </Badge>
          <div className="text-xl sm:text-4xl md:text-6xl font-bold">
            <h2>
              Hi, I am
              <span className="text-nowrap text-blue-600"> Mustafa Tawab </span>
            </h2>
            <h2>
              Modern Full Stack Developer
            </h2>
          </div>
          <p className="text-gray-500">
            I build exceptional and accessible digital experiences for the web.
          </p>
          <div className="flex gap-5">
            <Link
              href="#"
              className=" animate-bounce bg-blue-600 hover:text-blue-600 hover:bg-transparent border border-blue-600 rounded-md text-white flex justify-content-center justify-center gap-2 items-center p-2"
            >
              <FaLinkedinIn /> LinkedIn
            </Link>
            <Link
              href="#projects"
              className="px-3 py-2 border-[1px] dark:text-blue-600 dark:bg-transparent dark:border-blue-600  rounded-lg text-blue-600  hover:border-[1px] hover:border-blue-600 bg-blue-100 hover:bg-white "
            >
              My Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
