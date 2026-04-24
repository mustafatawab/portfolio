"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
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
  CheckCircle2
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
      case "bot": return <Bot size={28} />;
      case "rocket": return <Rocket size={28} />;
      case "zap": return <Zap size={28} />;
      case "server": return <Server size={28} />;
      case "code": return <Code size={28} />;
      case "layout": return <Layout size={28} />;
      case "monitor": return <Monitor size={28} />;
      case "cpu": return <Cpu size={28} />;
      case "database": return <Database size={28} />;
      case "settings": return <Settings size={28} />;
      case "globe": return <Globe size={28} />;
      case "chart": return <LineChart size={28} />;
      case "shield": return <Shield size={28} />;
      case "smartphone": return <Smartphone size={28} />;
      case "box": return <Box size={28} />;
      case "package": return <Package size={28} />;
      default: return <Code size={28} />;
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="glass-card border-white/5 h-full p-8 rounded-3xl group hover:neon-glow-cyan transition-all duration-500">
        <CardHeader className="p-0 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 text-neon-cyan group-hover:scale-110 group-hover:bg-neon-cyan/10 transition-all duration-500">
            {getIcon(icon)}
          </div>
          <h3 className="text-2xl font-bold group-hover:text-neon-cyan transition-colors">{title}</h3>
          <p className="text-white/40 text-sm leading-relaxed mt-2">{content}</p>
        </CardHeader>

        <CardContent className="p-0">
          <ul className="space-y-4">
            {points && points.map((pt, i) => (
              <li key={i} className="flex items-start gap-3 group/item">
                <CheckCircle2 size={16} className="text-neon-purple mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                <span className="text-sm text-white/60 group-hover/item:text-white transition-colors">{pt}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
