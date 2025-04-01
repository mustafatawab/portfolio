import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from '@/components/ui/badge'
import { projects } from '@/lib/project'
import { BsGithub } from 'react-icons/bs'
import Image from 'next/image'
import Link from 'next/link'
import { FaExternalLinkAlt } from "react-icons/fa";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ProjectCard = ({ project }) => {
  return (
    <Card className='p-0 shadow-md h-full'>
      <Image src={project.image} alt='' width={''} height={200} className=' rounded-t-2xl' />

      <CardContent className='space-y-2 pb-3'>
        <div className='flex justify-between items-center'>
          <h4 className='text-lg font-semibold'>{project.title}</h4>
          <div className='flex  gap-3'>
            <Link href={'#'}>
              <BsGithub className='text-gray-500' />
            </Link>
            <Link href={project.link}>
              <FaExternalLinkAlt className='text-gray-500' />
            </Link>
          </div>
        </div>
        {project.more && <MoreLinks links={project.more} />}
        <p className='text-gray-700 dark:text-gray-100 text-sm'>{project.description}</p>
        <div className='flex gap-2 flex-wrap py-2'>
          {project.tags.map((tag, i) => <Badge key={i} className='px-3 py-1 bg-transparent text-black dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-full'>{tag}</Badge>)}
        </div>

      </CardContent>
    </Card>
  )
}


const MoreLinks = ({ links }) => {
  return <>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>More</AccordionTrigger>
        <AccordionContent>
          <div className='flex flex-col'>

            {links && links.map((link) => <Link className='pl-3 hover:underline' href={link} key={link}>{link}</Link>)}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </>
}




export default ProjectCard