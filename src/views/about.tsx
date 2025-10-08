import Image from "next/image";
import React from "react";
import me from "@/assets/me.jpg";
import wordprocess from "@/assets/workProcess.png";
import "@/styles/card-animation.css";
const AboutSection = () => {
  return (
    <section id="#about" className="py-20 bg-[#f1f5f9] dark:bg-gray-950 ">
      <div className="text-center py-10 mb-10">
        <h3 className="text-4xl font-bold mb-5 text-center">About Me</h3>
        <p className="text-gray-500">
          Passionate about creating intelligent systems that can think, learn,
          and act autonomously and make your life easier.
        </p>
      </div>
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
            <p className="text-gray-800 dark:text-gray-400 text-md">
              I'm a dedicated <b>Agentic AI Engineer</b> and{" "}
              <b>Full Stack Developer</b> with a focus on building intelligent,
              AI-powered applications. With 3+ years of experience in frontend
              and backend development, I now specialize in crafting{" "}
              <b>custom AI workflows, automation tools, and SaaS MVPs</b> using
              technologies like
              <b> OpenAI Agents SDK, FastAPI, Supabase, and Next.js.</b>
            </p>
            <p className="text-gray-800 dark:text-gray-400 text-md">
              My journey began in college with a passion for building on the
              web. Over time, that evolved into a mission to help businesses
              integrate AI into real-world products — from internal automation
              tools to production-ready AI dashboards.
            </p>

            <p className="text-gray-800 dark:text-gray-400 text-md">
              Beyond coding, I enjoy exploring new AI frameworks, reading
              technical blogs, and constantly leveling up my skills to stay
              ahead in this rapidly evolving space.
            </p>



            <div className="flex flex-wrap md:flex-nowrap gap-x-10 gap-y-3  justify-center">
              <div className=" flex flex-col justify-center items-center border-2 dark:border-blue-900  p-5 rounded-xl gap-3 w-full">
                <span className="text-3xl text-blue-600 font-bold">20+</span>
                <span>Projects Completed</span>
              </div>

              <div className=" flex flex-col border-2 justify-center items-center dark:border-blue-900 p-5 rounded-xl gap-3 w-full">
                <span className="text-3xl text-blue-600 font-bold">3+</span>
                <span>Years of Experience</span>
              </div>

              <div className=" flex flex-col justify-center items-center  border-2 dark:border-blue-900 p-5 rounded-xl gap-3 w-full">
                <span className="text-3xl text-blue-600 font-bold">25+</span>
                <span>Happy Clients</span>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col items-center justify-center gap-5 mt-10">
          <h2 className="text-4xl  font-bold">
            My <span className="text-blue-600">Work</span> Process
          </h2>
          <Image
            src={wordprocess}
            alt="Word Process"
            width={1000}
            height={1000}
          />
        </div> */}
      </div>
    </section>
  );
};

export default AboutSection;
