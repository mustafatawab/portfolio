import Image from "next/image";
import React from "react";
import me from "@/assets/me.jpg";
import wordprocess from "@/assets/workProcess.png";
import "@/styles/card-animation.css";
const AboutSection = () => {
  return (
    <section id="#about" className="py-20 bg-[#f1f5f9] dark:bg-slate-900 ">
      <div className="p-5 container mx-auto ">
        <div className=" flex flex-wrap lg:flex-nowrap gap-32 justify-center items-start">
          <div className="">
            <Image
            className="rounded-xl"
              src={me}
              width={400}
              height={400}
              alt="Mustafa Tawab"
            />
          </div>

          <div className="basis-full lg:basis-1/2 flex flex-col gap-5 ">
            <h3 className="text-4xl font-bold mb-5">About Me</h3>
            <p className="text-gray-800 dark:text-gray-400 text-md">
              I'm a passionate Full Stack Developer with expertise in building
              modern web applications. With over 2 years of experience in both
              front end and beckend development, I specialize in creating
              responsive, user-friendly interfaces and robust backend systems.
            </p>
            <p className="text-gray-800 dark:text-gray-400 text-md">
              My journey in web development started when I was in college, and
              since then, I've worked with various technologies and frameworks
              to deliver high-quality solutions for clients across different
              industries.
            </p>

            <p className="text-gray-800 dark:text-gray-400 text-md">
              When I'm not coding, you can find me hiking, reading tech blogs,
              or experimenting with new technologies to stay at the forefront of
              web development.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-5 mt-10">
        <h2 className="text-4xl  font-bold">My <span className="text-blue-600">Work</span> Process</h2>
        <Image src={wordprocess} alt="Word Process" width={1000} height={1000}/>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
