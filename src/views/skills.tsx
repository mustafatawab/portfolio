"use client";
import React, { useState } from "react";
import SkillCard from "@/components/SkillCard";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiMongodb,
  SiPostgresql,
  SiTailwindcss,
  SiDocker,
  SiAmazonwebservices,
  SiTensorflow,
  SiPytorch,
  SiFastapi,
  SiOpenai,
  SiShadcnui
} from "react-icons/si";
import { Button } from "@/components/ui/button";

interface SkillProps {
  name: string;
  icon: React.ReactNode;
  level: number;
}

const skills: SkillProps[] = [
  {
    name: "React",
    icon: <SiReact className="text-blue-400" size={24} />,
    level: 90,
  },
  {
    name: "Next.js",
    icon: <SiNextdotjs className="text-black dark:text-white" size={24} />,
    level: 85,
  },
  {
    name: "Python",
    icon: <SiPython className="text-yellow-500" size={24} />,
    level: 75,
  },
  {
    name : "Open AI",
    icon : <SiOpenai className="text-black dark:text-white" size={24} />,
    level : 92
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="text-blue-500" size={24} />,
    level: 80,
  },
  {
    name: "Node.js",
    icon: <SiNodedotjs className="text-green-500" size={24} />,
    level: 85,
  },
  {
    name: "MongoDB",
    icon: <SiMongodb className="text-green-400" size={24} />,
    level: 80,
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="text-blue-400" size={24} />,
    level: 75,
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="text-cyan-400" size={24} />,
    level: 90,
  },

  {
    name: "Shadcn UI",
    icon: <SiShadcnui className="text-black dark:text-white" size={24} />,
    level: 90,
  },
  {
    name: "Docker",
    icon: <SiDocker className="text-blue-500" size={24} />,
    level: 70,
  },
  {
    name: "AWS",
    icon: <SiAmazonwebservices className="text-yellow-400" size={24} />,
    level: 65,
  },
  {
    name: "FastAPI",
    icon: <SiFastapi className="text-orange-500" size={24} />,
    level: 60,
  },
  {
    name: "PyTorch",
    icon: <SiPytorch className="text-red-500" size={24} />,
    level: 55,
  },
];

const Skills = () => {
  const [viewMore, setViewMore] = useState(false);
  const displayedSkills = viewMore ? skills : skills.slice(0, 4);
  return (
    <section id="skills" className="py-20">
      <div className="p-5 container  mx-auto space-y-7">
        <h3 className="text-4xl font-bold text-center">
          Skills and Technologies
        </h3>
        {/* <SkillCard /> */}

        <div className="grid grid-cols-1 md:grid-cols-2 px-4 w-full lg:w-2/3 mx-auto gap-8 bg-blue-600/10   rounded-lg">
          {displayedSkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="  px-4 py-6 "
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="mr-3">{skill.icon}</div>
                    <h3 className="text-lg font-medium">{skill.name}</h3>
                  </div>
                  <div className="flex justify-end mt-2">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                      {skill.level}%
                    </span>
                  </div>
                </div>
                <div className={`w-full bg-blue-200 rounded-full h-2.5`}>
                  <motion.div
                    className={`bg-indigo-600 h-2.5 rounded-full`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          ))}
          
        </div>
        <div className="flex justify-center items-center">
          <Button onClick={() => setViewMore(!viewMore)} className="">
            {viewMore ? "View Less" : "View More"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Skills;
