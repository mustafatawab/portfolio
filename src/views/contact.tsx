"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, SendIcon, Linkedin, Github } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContactForm {
  first_name: string;
  last_name: string;
  email: string;
  message: string;
  project_type: string;
  budget: string;
  company: string;
  other: string;
}

const socialLinks = [
  { icon: Mail, label: "Neural Transmission", value: "tawab05@gmail.com", href: "mailto:tawab05@gmail.com" },
  {
    icon: Linkedin,
    label: "Professional Node",
    value: "mustafa-tawab",
    href: "https://www.linkedin.com/in/mustafa-tawab/",
  },
  { icon: Github, label: "Source Protocol", value: "mustafatawab", href: "https://github.com/mustafatawab" },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<ContactForm>({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
    project_type: "",
    budget: "",
    company: "",
    other: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/send", form);
      toast.success("Transmission Received. Standing by for response.");
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        message: "",
        project_type: "",
        budget: "",
        company: "",
        other: ""
      });
    } catch (error) {
      toast.error("Transmission Interrupted. Please retry.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-32 relative bg-background overflow-hidden transition-colors duration-500">
      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-20">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-sm font-mono tracking-[0.4em] text-neon-purple uppercase"
          >
            Communication Protocol
          </motion.h3>
          <h2 className="text-4xl md:text-7xl font-black font-display text-foreground uppercase tracking-tight">INITIATE <span className="text-gradient">CONTACT</span></h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <h4 className="text-3xl font-bold text-foreground">Secure Connection</h4>
              <p className="text-foreground/50 text-lg leading-relaxed max-w-md">
                Ready to architect the next generation of intelligent systems? 
                Open a channel to discuss your requirements.
              </p>
            </div>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-6 p-6 glass-card rounded-2xl hover:neon-glow-cyan transition-all duration-500 group"
                >
                  <div className="p-4 rounded-xl bg-foreground/5 text-neon-cyan group-hover:scale-110 transition-transform">
                    <link.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-foreground/30 uppercase tracking-[0.2em] mb-1">{link.label}</div>
                    <div className="text-foreground font-mono group-hover:text-neon-cyan transition-colors">{link.value}</div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="glass-card p-5 md:p-10 rounded-3xl border-border">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="first_name" className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">First Name</Label>
                    <Input
                      name="first_name"
                      id="first_name"
                      placeholder="Identified As"
                      className="bg-foreground/5 border-border focus:border-neon-cyan/50 h-12 rounded-xl text-foreground"
                      onChange={handleChange}
                      required
                      value={form.first_name}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label htmlFor="last_name" className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Last Name</Label>
                    <Input
                      name="last_name"
                      id="last_name"
                      placeholder="Sub-Identifier"
                      className="bg-foreground/5 border-border focus:border-neon-cyan/50 h-12 rounded-xl text-foreground"
                      onChange={handleChange}
                      value={form.last_name}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="email" className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Return Address (Email)</Label>
                  <Input
                    name="email"
                    id="email"
                    type="email"
                    placeholder="node@network.com"
                    className="bg-foreground/5 border-border focus:border-neon-cyan/50 h-12 rounded-xl text-foreground"
                    onChange={handleChange}
                    required
                    value={form.email}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Mission Type</Label>
                    <Select
                      onValueChange={(value) => setForm((prev) => ({ ...prev, project_type: value }))}
                      required
                      value={form.project_type}
                    >
                      <SelectTrigger className="bg-foreground/5 border-border focus:border-neon-cyan/50 h-12 rounded-xl text-foreground">
                        <SelectValue placeholder="Select Objective" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-border text-foreground">
                        <SelectItem value="AI Integration">Neural Integration</SelectItem>
                        <SelectItem value="Web Application">System Architecture</SelectItem>
                        <SelectItem value="Mobile App">Mobile Interface</SelectItem>
                        <SelectItem value="Other">Custom Protocol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Resource Allocation</Label>
                    <Select
                      value={form.budget}
                      onValueChange={(value) => setForm((prev) => ({ ...prev, budget: value }))}
                    >
                      <SelectTrigger className="bg-foreground/5 border-border focus:border-neon-cyan/50 h-12 rounded-xl text-foreground">
                        <SelectValue placeholder="Project Scale" />
                      </SelectTrigger>
                      <SelectContent className="glass-card border-border text-foreground">
                        <SelectItem value="Less than 1000$">&lt; 1,000 USD</SelectItem>
                        <SelectItem value="1000$ - 5000$">1k - 5k USD</SelectItem>
                        <SelectItem value="Greater than 5000$">&gt; 5k USD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="message" className="text-[10px] font-mono uppercase tracking-widest text-foreground/40">Briefing Message</Label>
                  <Textarea
                    name="message"
                    id="message"
                    placeholder="Enter mission details..."
                    className="bg-foreground/5 border-border focus:border-neon-cyan/50 min-h-[120px] rounded-xl text-foreground"
                    onChange={handleChange}
                    value={form.message}
                  />
                </div>

                <Button
                  disabled={loading}
                  type="submit"
                  className=" w-full py-4 px-6 bg-neon-cyan text-black font-bold text-xs tracking-[0.2em] uppercase rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,242,255,0.3)] hover:shadow-[0_0_30px_rgba(0,242,255,0.5)]"
                >
                  {loading ? "TRANSMITTING..." : (
                    <span className="flex items-center gap-2">
                      INITIATE TRANSMISSION <SendIcon size={16} />
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
