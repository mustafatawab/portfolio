import React from 'react'
import { projects } from '@/lib/project'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
import { ArrowBigRight } from 'lucide-react'
const Projects = () => {
  return (
    <section className="py-20">
      <div className="p-5 w-full md:w-4/5  mx-auto flex flex-col justify-center items-center gap-10">
        <h2 className='text-4xl tect-center font-bold text-center'>Projects</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
          {projects && projects.map((project, index) => {
            if (index < 3) {
              return <div key={index} className=''>
                <ProjectCard project={project} />
              </div>
            }
          })}
        </div>
        <Link href='/projects' className='flex gap-2 rounded-md border-2 px-4 py-2 bg-black/90 text-white dark:bg-white/90 dark:text-black hover:bg-white hover:text-black '>Vew All Projects <ArrowBigRight /></Link>
      </div>
    </section>
  )
}



export default Projects