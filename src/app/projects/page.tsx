import React from 'react'
import { projects } from '@/lib/project'
import ProjectCard from '@/components/ProjectCard'
import Link from 'next/link'
const page = () => {
  return (

    <main>

      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">My Projects</h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Explore my portfolio of web applications, mobile apps, and AI-powered solutions that solve real-world
            problems.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="p-5 container  mx-auto flex flex-col justify-center items-center gap-10">
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
    </main>
  )
}

export default page 