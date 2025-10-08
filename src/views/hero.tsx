"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { FaLinkedinIn } from "react-icons/fa6";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
import Image from "next/image";
import { ArrowBigRight, ArrowRight, Download, DownloadIcon, SendIcon, ShareIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="hero" className="md:h-[80vh] w-full relative overflow-hidden" >
      
      {/*  Background Video */}
      <div className="absolute inset-0 -z-10 bg-black">
        <Image src={"/bg.webp"} width={500} height={500} alt="" className="w-full h-full object-cover opacity-55"/>
      </div>

      {/* Content */}
      <div className="p-5 container text-center   h-full flex z-10  ">
        <div className="flex flex-col justify-center items-center mx-auto gap-4">
          <Badge className="bg-blue-200 text-blue-600 px-2">
            Available for work
          </Badge>
          <div className="text-2xl sm:text-5xl md:text-7xl font-bold text-white">
            <div className="">
              Welcome here, I am 
              {/* <h1 className="ml-3 text-nowrap  inline">
                 Mustafa Tawab
              </h1> */}
            </div>
            <h2>
               
              <TypeAnimation
                className="text-blue-400  "
                sequence={[
                  "Agentic AI Developer",
                  1000,
                  "Modern Full Stack Developer",
                  1000
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </h2>
          </div>
          <p className="text-gray-300 w-full lg:w-2/3 text-sm md:text-lg">
          Crafting autonomous AI systems and modern full-stack applications that transform businesses with intelligent automation.
            </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <Link
              href="/projects"
              className=" animate-bounce bg-blue-600 hover:text-white hover:bg-transparent border border-blue-600 hover:border-white rounded-md text-white flex justify-content-center justify-center gap-2 items-center p-2"
            >
              Explore My Work <ArrowRight />
            </Link>
            <Link
              target="_blank"
              href={'https://docs.google.com/document/d/1hFqLu_I3RAWGwAgBD5rlCzXeCb2znjKzLJGglznKfaU/edit?usp=sharing'}
              className="px-3 py-2 border-[1px]   rounded-lg text-blue-600   bg-blue-100  flex items-center justify-center gap-3"
            >
           Download  CV  <DownloadIcon size={20} className="text-md"  />
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
