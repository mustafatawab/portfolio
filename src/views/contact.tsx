"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, SendIcon, Linkedin, Github } from "lucide-react";
import { BsGithub } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import Link from "next/link";
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

const socialLinks = [
  { icon: Mail, label: "Email", href: "mailto:tawab05@gmail.com" },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mustafa-tawab/",
  },
  { icon: Github, label: "GitHub", href: "https://github.com/mustafatawab" },
];

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [other, setOther] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    message: "",
    project_type: "",
    budget: "",
    company: "",
    other : ""
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setForm((pre) => ({
      ...pre,
      [name]: value,
    }));

    console.log(form);
  };
  const handleSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    await axios
      .post("/api/send", form)
      .then((res) => {
        console.log(res);
        setForm({
          first_name: "",
          last_name: "",
          email: "",
          message: "",
          project_type: "",
          budget: "",
          company: "",
          other : ""
        });
        toast.success("Thanks for contact me. We will get back to you asap");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(error);
      });
  };

  return (
    //bg-[#f1f5f9]
    <section id="contact" className="py-20 dark:bg-gray-950 ">
      <div className="p-5 container  mx-auto space-y-5">
        <div className="text-center space-y-5 my-5">
          <h3 className="text-center text-5xl font-bold">Contact</h3>
          <p className="text-gray-400">
            Ready to build the next generation of intelligent systems? Let's
            discuss your project
          </p>
        </div>

        <main className="contianer flex flex-wrap-reverse lg:flex-nowrap justify-center gap-20 items-center mt-20">
          <div className="space-y-5 lg:w-1/2 ">
            <h4 className="text-2xl font-bold">Let's connect</h4>
            <p className="text-gray-700 text-sm dark:text-gray-400">
              I'm always interested in hearing about new projects and
              opportunities. Whether you have a question or just want to say hi,
              feel free to reach out!
            </p>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="flex items-center gap-4 p-4 rounded-lg border hover:border-blue-600 border-border transition-smooth group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-smooth">
                    <link.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-foreground/90 group-hover:text-foreground transition-smooth">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          <Card className="p-10 dark:bg-gray-900/70 w-full lg:w-1/2">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col md:flex-row gap-3 justify-between">
                <span className="space-y-2 w-full">
                  <Label htmlFor="first_name">
                    First Name <span className="text-red-400">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="Enter your full name"
                    className=""
                    onChange={handleChange}
                    required
                    value={form.first_name}
                  />
                </span>

                <span className="space-y-2 w-full">
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    value={form.last_name}
                    type="text"
                    name="last_name"
                    id="last_name"
                    placeholder="Enter your full name"
                    className=""
                    onChange={handleChange}
                  />
                </span>
              </div>

              <span className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-red-400">*</span>
                </Label>
                <Input
                  value={form.email}
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email address"
                  onChange={handleChange}
                  required
                />
              </span>

              <span className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  value={form.company}
                  type="text"
                  name="company"
                  id="company"
                  placeholder="Enter your company"
                  onChange={handleChange}
                />
              </span>

              <div className="flex flex-col md:flex-row gap-3 justify-between">
                <span className="flex flex-col gap-2 w-full">
                  <Label htmlFor="proj-type">
                    Project Type <span className="text-red-400">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, project_type: value }))
                    }
                    required
                    name="project_type"
                    value={form.project_type}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Project Type" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectGroup>
                        <SelectLabel>Project Type</SelectLabel>
                        <SelectItem value="Simple Website">
                          Simple Website
                        </SelectItem>
                        <SelectItem value="Web Application">
                          Web Application
                        </SelectItem>
                        <SelectItem value="AI Integration">
                          AI Integration
                        </SelectItem>
                        <SelectItem value="Mobile App">Mobile App</SelectItem>
                        <SelectItem
                          value="Other"
                          onSelect={() => setOther(true)}
                        >
                          Other
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {form.project_type == "Other" && (
                    <Input
                      value={form.other}
                      type="text"
                      name="other"
                      id="other"
                      placeholder="Please Specify your project type"
                      onChange={handleChange}
                      required
                    />
                  )}
                </span>

                <span className="space-y-2 w-full">
                  <Label>Budget</Label>
                  <Select
                    name="budget"
                    value={form.budget}
                    onValueChange={(value) =>
                      setForm((prev) => ({ ...prev, budget: value }))
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Project Type" />
                    </SelectTrigger>
                    <SelectContent className="w-full">
                      <SelectGroup>
                        <SelectLabel>Budget Range</SelectLabel>
                        <SelectItem value="Less than 100$">
                          Less than 100$
                        </SelectItem>
                        <SelectItem value="101$ - 200$">101$ - 200$</SelectItem>
                        <SelectItem value="201$ - 300$">201$ - 300$</SelectItem>
                        <SelectItem value="301$ - 400$">301$ - 400$</SelectItem>
                        <SelectItem value="401$ - 500$">401$ - 500$</SelectItem>
                        <SelectItem value="Greater than 500$">
                          Greater than 500$
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </span>
              </div>
              <span className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  value={form.message}
                  placeholder="Type your message here."
                  id="message"
                  name="message"
                  onChange={handleChange}
                />
              </span>
              <Button
                disabled={loading}
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 cursor-pointer text-white font-semibold flex items-center justify-center shadow-2xl inset-shadow-transparent shadow-blue-600 hover:shadow-lg duration-500"
              >
                {loading ? (
                  "Sending...."
                ) : (
                  <>
                    <SendIcon />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </Card>
        </main>
      </div>
    </section>
  );
};

export default Contact;
