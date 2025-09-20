"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { FaLinkedinIn } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section id="hero" className="h-[70vh] w-full" >
      
      {/* <video className="w-screen h-screen" controls autoPlay>
        <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"/>
      </video> */}
      {/* Animated Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
      </div> */}

      {/* Content */}
      <div className="p-5 container   mx-auto  h-full flex ">
        <div className="flex flex-col justify-center items-start gap-4">
          <Badge className="bg-blue-200 text-blue-600 px-2">
            Available for work
          </Badge>
          <div className="text-xl sm:text-4xl md:text-6xl font-bold">
            <div className="">
              Welcome, I am 
              <h1 className="ml-3 text-nowrap text-blue-600 italic inline">
                 Mustafa Tawab
              </h1>
            </div>
            <h2>
               
              <TypeAnimation
                className="text-blue-600 text-lg sm:text-4xl  md:text-5xl "
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
          <p className="text-gray-500 w-full lg:w-2/3">
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
