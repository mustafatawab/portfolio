"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { FaLinkedinIn } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section id="hero" className="md:h-[80vh] w-full relative overflow-hidden" >
      
      {/*  Background Video */}
      <div className="absolute inset-0 -z-10 ">
        <video loop autoPlay muted>
          <source src="./Generate_a_seamless.mp4" className="object-cover"/>
        </video>
      </div>

      {/* Content */}
      <div className="p-5 container   h-full flex z-10 ">
        <div className="flex flex-col justify-center items-center mx-auto gap-4">
          <Badge className="bg-blue-200 text-blue-600 px-2">
            Available for work
          </Badge>
          <div className="text-xl sm:text-4xl md:text-6xl font-bold text-white">
            <div className="">
              Welcome here, I am 
              {/* <h1 className="ml-3 text-nowrap  inline">
                 Mustafa Tawab
              </h1> */}
            </div>
            <h2>
               
              <TypeAnimation
                className="text-blue-400 text-lg sm:text-4xl  md:text-5xl "
                sequence={[
                  // Same substring at the start will only be typed out once, initially
                  "Software Engineer",
                  1000, // wait 1s before replacing "Mice" with "Hamsters"
                  "Agentic AI Engineer",
                  1000,
                  "Generative AI Engineer",
                  1000,
                  "Python Developer",
                  1000,
                  "Nextjs Developer",
                  1000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h2>
          </div>
          <p className="text-gray-300 w-full lg:w-2/3">
           I build custom AI tools, SaaS MVPs, and automation workflows using OpenAI, FastAPI, and Next.js.
           </p>
          <div className="flex gap-5">
            <Link
              href="#"
              className=" animate-bounce bg-blue-600 hover:text-blue-600 hover:bg-transparent border border-blue-600 rounded-md text-white flex justify-content-center justify-center gap-2 items-center p-2"
            >
              <FaLinkedinIn /> LinkedIn
            </Link>
            <Link
              target="_blank"
              href={'https://docs.google.com/document/d/1hFqLu_I3RAWGwAgBD5rlCzXeCb2znjKzLJGglznKfaU/edit?usp=sharing'}
              className="px-3 py-2 border-[1px] dark:text-blue-600 dark:bg-transparent dark:border-blue-600  rounded-lg text-blue-600  hover:border-[1px] hover:border-blue-600 bg-blue-100 hover:bg-white "
            >
              Resume
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
