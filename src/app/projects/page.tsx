import React from "react";
import { projects } from "@/lib/project";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import Image from "next/image";
const page = () => {
  return (
    <main>
      <section className=" text-white py-20 overflow-hidden relative md:h-[60vh] flex items-center justify-center text-center">
        {/*  Background Video */}
        <div className="absolute inset-0 -z-10 bg-black">
          <Image
            src={"/bg.webp"}
            width={500}
            height={500}
            alt=""
            className="w-full h-full object-cover opacity-55"
          />
        </div>

        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore my portfolio of web applications, mobile apps, and
            AI-powered solutions that solve real-world problems.
          </p>
        </div>
      </section>

      <section className="py-20 dark:bg-slate-950">
        <div className="p-5 container  mx-auto flex flex-col justify-center items-center gap-10">
          <h2 className="text-4xl tect-center font-bold text-center">
            Projects
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects &&
              projects.map((project, index) => {
                return (
                  <div key={index} className="h-full">
                    <ProjectCard project={project} />
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    </main>
  );
};

export default page;
