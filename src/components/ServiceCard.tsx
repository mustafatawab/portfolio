"use client"
import React from "react"
import { motion } from "framer-motion"

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
} from "lucide-react"

interface ServiceCardProps {
    icon: string
    title: string
    content: string
    points: string[]
}

const ServiceCard = ({ icon, title, content, points }: ServiceCardProps) => {
    const getIcon = (iconName: string) => {
        switch (iconName) {
            case "bot":
                return <Bot size={24} />
            case "rocket":
                return <Rocket size={24} />
            case "zap":
                return <Zap size={24} />
            case "server":
                return <Server size={24} />
            case "code":
                return <Code size={24} />
            case "layout":
                return <Layout size={24} />
            case "monitor":
                return <Monitor size={24} />
            case "cpu":
                return <Cpu size={24} />
            case "database":
                return <Database size={24} />
            case "settings":
                return <Settings size={24} />
            case "globe":
                return <Globe size={24} />
            case "chart":
                return <LineChart size={24} />
            case "shield":
                return <Shield size={24} />
            case "smartphone":
                return <Smartphone size={24} />
            case "box":
                return <Box size={24} />
            case "package":
                return <Package size={24} />
            default:
                return <Code size={24} />
        }
    }

    return (
        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="h-full">
            <div className="relative bg-background p-8 flex flex-col h-full transition-all duration-300 ease-[var(--ease)] hover:bg-muted/20 group">
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 pointer-events-none transition-colors duration-300 z-10" />
                
                <div className="w-12 h-12 rounded-none bg-primary/10 flex items-center justify-center mb-6 text-primary border border-primary/20">
                    {getIcon(icon)}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {content}
                </p>

                <div className="mt-auto">
                    <ul className="space-y-3 pt-6 border-t border-border/50">
                        {points &&
                            points.map((pt, i) => (
                                <li
                                    key={i}
                                    className="flex items-start gap-2.5"
                                >
                                    <CheckCircle2
                                        size={14}
                                        className="text-primary mt-0.5 shrink-0 opacity-70"
                                    />
                                    <span className="text-[13px] text-muted-foreground font-mono tracking-tight">
                                        {pt}
                                    </span>
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    )
}

export default ServiceCard
