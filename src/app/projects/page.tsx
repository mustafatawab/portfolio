import React from 'react'
import { projects } from '@/lib/project'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
const page = () => {
  return (
    <section className="py-20">
      <div className="p-5 w-full md:w-4/5  mx-auto flex flex-col justify-center items-center gap-10">
        <h2 className='text-4xl tect-center font-bold text-center'>Projects</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
          {projects && projects.map((project, index) => {

            return <div key={index} className=''>
              <ProjectCard project={project} />
            </div>

          })}
        </div>
      </div>
    </section>
  )
}

export default page 