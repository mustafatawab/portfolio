import React from 'react'
import { skills } from '@/lib/skills'
import SkillCard from '@/components/SkillCard'
const Skills = () => {
    
  return (
    <section id='skills' className="py-20">
      <div className="p-5 container  mx-auto">
            <h3 className='text-4xl font-bold text-center'>My Skills</h3>
            <SkillCard />
      </div>
    </section>
  )
}

export default Skills
