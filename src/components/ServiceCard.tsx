import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

import {
  Bot,
  Rocket,
  Zap,
  Server,
  Code,
  Layout,
  Monitor,
  Cpu,
  Database,
  Settings,
  Globe,
  LineChart,
  Shield,
  Smartphone,
  Box,
   Package
} from "lucide-react";

interface ServiceCardProps {
  icon: string;
  title: string;
  content: string;
  points: string[];
}

const ServiceCard = ({ icon, title, content, points }: ServiceCardProps) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "bot":
        return <Bot size={32} />;
      case "rocket":
        return <Rocket size={32} />;
      case "zap":
        return <Zap size={32} />;
      case "server":
        return <Server size={32} />;
      case "code":
        return <Code size={32} />;
      case "layout":
        return <Layout size={32} />;
      case "monitor":
        return <Monitor size={32} />;
      case "cpu":
        return <Cpu size={32} />;
      case "database":
        return <Database size={32} />;
      case "settings":
        return <Settings size={32} />;
      case "globe":
        return <Globe size={32} />;
      case "chart":
        return <LineChart size={32} />;
      case "shield":
        return <Shield size={32} />;
      case "smartphone":
        return <Smartphone size={32} />;
      case "box":
         return <Box size={32} />;
      case "package":
         return <Package size={32} />;
      default:
        return <Code size={32} />;
    }
  };

  return (
    <>
      <Card className="shadow-none hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] p-5  hover:border-blue-600 duration-500 animate-fade-in ">
        <CardHeader>
          <CardTitle>
            <div className="w-16 h-16 rounded-full bg-blue-600/30 flex items-center justify-center mb-6 text-blue-600">
              {getIcon(icon)}
            </div>
            <div className="text-black font-semibold text-xl  dark:text-white">
              {title}
            </div>
          </CardTitle>
          <CardDescription>
            <div className="text-gray-600 dark:text-gray-400">{content}</div>
          </CardDescription>
        </CardHeader>

        <CardContent className=" flex flex-col">
          <ul>
            {points &&
              points.map((pt, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="">
                    <FaCheckCircle className="text-blue-600 " />
                  </span>
                  <p>{pt}</p>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </>
  );
};

export default ServiceCard;
