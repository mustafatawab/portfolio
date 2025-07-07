interface EduType  {
    school : String,
    from : String,
    to : String,
    field:String,
    description : String[]
}


export const education : EduType[] = [
    {
        school : "Univerisity of Lahore, Pakistan",
        from : "August 2019",
        to : "Jan 2024",
        field : 'Bachelor of Science',
        description : ["Completed 4 years of degree in Software Engineering with 3.12/4.00 CGPA" ," Acheived certification on good performance in Final Year Project",
            "Used Reactjs, Tailwind CSS, PHP and MySQL in the FYP"
        ]
    },

    {
        school : "PIAIC, Pakistan",
        from : "March 2023",
        to : "March 2024",
        field : 'Certified GenAI Engineer',
        description : [
            "Completed one year course with hands-on experience and projects.",
            "Next.js as full stack web framework with shadcn, tailwind css and other designing libraries.",
            "Generative AI and use of AI tools with deep understanding of how it works.",
            "Agentic Framework like Langchain, OpenRouter , Litellm , OpenAI Agent SDK and CrewAI"
        ]
    },
    
]

