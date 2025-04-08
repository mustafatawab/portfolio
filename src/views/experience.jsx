import React from "react";
import ExpericeCard from "@/components/ExperienceCard";
import { experiences } from "@/lib/experience";
const Experience = () => {
  return (
    <section id="experience" className="py-20 bg-[#f1f5f9] dark:bg-slate-900 ">
      <div className="p-5 w-full md:w-4/5  mx-auto">
        <main className="">
            
          <div className="space-y-2">
            <h2 className="text-xl font-bold px-5">Experience</h2>
            <div className=" md:2/3 xl:w-1/2 space-y-5">
                {experiences.map((experience, index) => <div className="w-full" key={index}>
                    <ExpericeCard experience={experience}/>
                    </div>
                    )}
              
            </div>
          </div>
        </main>
      </div>
    </section>
  );
};

export default Experience;
