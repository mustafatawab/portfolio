'use client'
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { projects } from "@/lib/project";
import { BsGithub } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProjectPropType {
    image : any,
    title : string,
    description : string,
    tags : string[],
    githubLink? : string,
    link : string,
    more? : string[] 

}

const ProjectCard = ({ project } : {project : ProjectPropType}) => {
  const [open, setIsOpen] = useState(false)

  return (
    <Card className="p-0 shadow-md h-full overflow-hidden">
      <Image
        src={project.image}
        alt=""
        width={200}
        height={200}
        className={` w-full h-1/2 max-h-1/2 object-fill`}
      />

      <CardContent className="space-y-2 pb-3">
        <div className="flex justify-between items-center">
          <h4 className="text-lg font-semibold">{project.title}</h4>
          <div className="flex  gap-3">
            <Link href={project.githubLink || "https://www.github.com/mustafatawab"}>
              <BsGithub className="text-gray-500" />
            </Link>
            <Link href={project.link}>
              <FaExternalLinkAlt className="text-gray-500" />
            </Link>
          </div>
        </div>
        

          <p className={`text-gray-700 dark:text-gray-100 text-sm ${open && project.title == 'Triton' ? 'hidden' : "block"}`}>
          {project.description}
        </p>
        
        {project.more && <MoreLinks open={open} setIsOpen={setIsOpen} links={project.more} />}
        <div className={`flex gap-2 flex-wrap py-2 ${open ? 'hidden' : 'flex'}`}>
          {project.tags.map((tag, i) => (
            <Badge
              key={i}
              className="px-3 py-1 bg-transparent text-black dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};



const MoreLinks = ({ links, open , setIsOpen } : { links : string[] , open : boolean , setIsOpen : Function}) => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger onClick={() => setIsOpen(!open)}>More</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-col">
              {links &&
                links.map((link) => (
                  <Link className="pl-3 hover:underline" href={link} key={link}>
                    {link}
                  </Link>
                ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default ProjectCard;
