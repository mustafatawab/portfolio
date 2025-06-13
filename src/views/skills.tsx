import React from "react";
import SkillCard from "@/components/SkillCard";
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
  SiFastapi
} from "react-icons/si";

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
    icon: <SiNextdotjs className="text-white" size={24} />,
    level: 85,
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
    name: "Python",
    icon: <SiPython className="text-yellow-500" size={24} />,
    level: 75,
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
  return (
    <section id="skills" className="py-20">
      <div className="p-5 container  mx-auto space-y-5">
        <h3 className="text-4xl font-bold text-center"> Skills and Technologies</h3>
        {/* <SkillCard /> */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <Card
              key={index}
              className="bg-blue-600/10 rounded-lg px-4 py-6 border border-blue-600"
            >
              <CardContent className="space-y-4">
                <div className="flex items-center ">
                  <div className="mr-3">{skill.icon}</div>
                  <h3 className="text-lg font-medium">{skill.name}</h3>
                </div>
                <div className={`w-full bg-blue-300 rounded-full h-2.5`}>
                  <div className={`bg-indigo-600 h-2.5 rounded-full`}></div>
                </div>
                <div className="flex justify-end mt-2">
                  <span className="text-sm text-gray-400">{skill.level}%</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
