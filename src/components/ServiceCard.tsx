"use client";
import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
  Package,
  CheckCircle2,
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
        return <Bot size={24} />;
      case "rocket":
        return <Rocket size={24} />;
      case "zap":
        return <Zap size={24} />;
      case "server":
        return <Server size={24} />;
      case "code":
        return <Code size={24} />;
      case "layout":
        return <Layout size={24} />;
      case "monitor":
        return <Monitor size={24} />;
      case "cpu":
        return <Cpu size={24} />;
      case "database":
        return <Database size={24} />;
      case "settings":
        return <Settings size={24} />;
      case "globe":
        return <Globe size={24} />;
      case "chart":
        return <LineChart size={24} />;
      case "shield":
        return <Shield size={24} />;
      case "smartphone":
        return <Smartphone size={24} />;
      case "box":
        return <Box size={24} />;
      case "package":
        return <Package size={24} />;
      default:
        return <Code size={24} />;
    }
  };

  return (
    <motion.div whileHover={{ y: -4 }} className="h-full">
      <Card className="card-hover h-full p-6">
        <CardHeader className="p-0 mb-5">
          <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-5 text-accent">
            {getIcon(icon)}
          </div>
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          <p className="text-foreground/50 text-sm leading-relaxed mt-2">
            {content}
          </p>
        </CardHeader>

        <CardContent className="p-0">
          <ul className="space-y-3">
            {points &&
              points.map((pt, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={14}
                    className="text-accent mt-0.5 shrink-0"
                  />
                  <span className="text-sm text-foreground/60">{pt}</span>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
