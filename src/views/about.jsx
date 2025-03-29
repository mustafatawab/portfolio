import Image from "next/image";
import React from "react";
import me from "@/assets/me.png";
import "@/styles/card-animation.css";
const AboutSection = () => {
  return (
    <section className="py-20 bg-[#f1f5f9] dark:bg-slate-900 ">
      <div className="p-5 w-full md:w-4/5  mx-auto flex flex-wrap lg:flex-nowrap gap-32 justify-center items-start">
        <div className="card ">
          <Image src={me} width={"500"} height={500} className="" />
        </div>

        <div className="basis-full md:basis-1/2 flex flex-col gap-5 ">
          <h3 className="text-4xl font-bold mb-5">About Me</h3>
          <p className="text-gray-800 dark:text-gray-400 text-md">
            I'm a passionate Full Stack Developer with expertise in building
            modern web applications. With over 5 years of experience, I
            specialize in creating responsive, user-friendly interfaces and
            robust backend systems.
          </p>
          <p className="text-gray-800 dark:text-gray-400 text-md">
            My journey in web development started when I was in college, and
            since then, I've worked with various technologies and frameworks to
            deliver high-quality solutions for clients across different
            industries.
          </p>

          <p className="text-gray-800 dark:text-gray-400 text-md">
            When I'm not coding, you can find me hiking, reading tech blogs, or
            experimenting with new technologies to stay at the forefront of web
            development.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
