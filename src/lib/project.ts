import malblogs from '@/assets/project/mal-blogs.png'
import elygance from '@/assets/project/elygance.png'
import msp from '@/assets/project/msp-tech.png'
import myscribe from '@/assets/project/myscribe.png'
import triton from '@/assets/project/triton.png'
import portfolio from '@/assets/project/portfolio.png'
import gallery from '@/assets/project/gallery.png'
import uswah from '@/assets/project/uswah-saeed.png'
import farsightsysmte from '@/assets/project/farsight.png'
import rukun from '@/assets/project/rukun.png'

interface ProjectType {
    image : any,
    title : string,
    description : string,
    tags : string[],
    githubLink? : string,
    link : string,
    more? : string[] 
}

export const projects : ProjectType[] = [
    {
        image : myscribe,
        title : "My Scribe",
        description : "MyScribe is a clinician-focused AI assistant designed to simplify medical documentation by automatically transcribing and summarizing patient interactions. The platform handles the minutiae of note-taking, enabling healthcare providers to prioritize patient care. It improves clinical efficiency and accuracy by reducing the administrative burden of patient note-taking. It reflects my deep interest in applying AI intelligently and ethically to solve real-world problems—especially in fast-paced, high-stakes environments like healthcare.",
        githubLink : "",
        tags : ['bootstrap' , 'vuejs' , 'laravel' , 'ai' , 'php' ,'python'],
        link : "https://www.myscribe.us/",
    },

    {
        image : triton,
        title : "Triton",
        description : "TritonCG is a large-scale web ecosystem powered by a robust CMS built with Pyload CMS. The platform is designed to manage and maintain a network of client websites efficiently, offering scalability, reliability, and seamless content management. TritonCG showcases the power of building a scalable CMS-driven ecosystem where dozens of live websites can be managed and updated efficiently. This project highlights my expertise in developing enterprise-grade solutions with a strong focus on scalability, maintainability, and client satisfaction.",
        githubLink : "",
        tags : ['tailwind css' , 'nextjs' , 'Payload CMS', 'typescript' , 'node'],
        more : ["https://www.rollingvranchwcid1.com/", "https://www.rollingvranchwcid2.com/" , "https://www.rollingvranchwcid3.com/" , "https://www.rollingvranchwcid5.com/" , 'https://www.palomacreek.org/' , 'https://www.mud222.org/' ],
        link : "https://www.tritoncg.com/",
    },
    {
        image: rukun,
        title: "Rukun Al Zuhab",
        description: "Rukun Al Zuhab Trading Co is a Saudi Arabian industrial supply company specializing in high-performance components and infrastructure solutions.",
        githubLink: "",
        tags: ['tailwind css', 'nextjs', "framer motion", "shadcn",'typescript'],
        link: "https://rukun-al-zuhab.vercel.app/",
    },
    {
        image : farsightsysmte,
        title : "Farsight System",
        description : "Software Agency who provides different solutions in the software industry. From AI-powered applications to custom web development, we help businesses transform their operations and achieve their digital goals with cutting-edge technology.",
        tags : ['tailwind css' , 'css' , "html" , "javascript"],
        githubLink : "https://github.com/mustafatawab/Nextjs_projects",
        link : "https://www.farsightsystem.com",
    },
    {
        image : uswah,
        title : "Portfolio - Uswah Saeed",
        description : "A landing page which is a portfolio website for a game designer  with a background in computer science and professional experience in game development and user experience and interface",
        tags : ['tailwind css' , 'css' , "html" , "javascript"],
        githubLink : "https://github.com/mustafatawab/Nextjs_projects",
        link : "https://uswah-saeed.vercel.app/",
    },
    {
        image : malblogs,
        title : "Car Finance",
        description : "MAL-Blogs is a minimalistic personal blog platform where I share my development journey, technical insights, and experiments with modern tools and frameworks. Built with a clean, distraction-free design, it allows me to focus on creating and publishing content using Markdown/MDX while providing readers with a smooth reading experience.",
        tags : ['tailwind css' , 'nextjs' , 'typescript' , 'Contentfull'],
        githubLink : "https://github.com/mustafatawab/Nextjs_projects/tree/main/mal-blogs",
        link : "https://mal-blogs.vercel.app",
    },

    {
        image : gallery,
        title : "Gallery",
        description : "This gallery is not just about displaying images—it elevates visual storytelling by combining clean design, metadata richness, and fast performance. It's a testament to creating intuitive, performant experiences for creative content.",
        tags : ['tailwind css' , 'nextjs' , 'typescript' , 'supabase'],
        githubLink : "",
        link : "https://user-gallery-website.vercel.app/",
    },
    {
        image : msp,
        title : "MSP Tech Stack",
        description : 'The app is Business to Business marketplace. It has user login system and company login system.',
        tags : ['nextjs' , 'typescript', 'mongodb' , 'nodejs' , "JWT Auth" , "Tailwind CSS"],
        githubLink : "https://github.com/mustafatawab/Nextjs_projects/tree/main/MSPTech_Stack",
        link : "https://msp-tech-stack.vercel.app/",
    },

    {
        image : elygance,
        title : "Elygance",
        description : "A luxury e-commerce platform for premium fragrances with elegant design and seamless shopping experience.",
        tags : ['nexjts', 'postreSQL ' , 'supabase', 'tailwind css'],
        githubLink : "https://github.com/mustafatawab/Nextjs_projects/tree/main/elygance",
        link : "https://elygance.vercel.app/",
    },
    
    {
        image: portfolio,
        title : "Portoflio Website",
        description : "A portofolio website for developers and designers to showcase their skills. It is just a landing page.",
        githubLink : "https://github.com/mustafatawab/Nextjs_projects",
        tags : ['nexjts', 'typescript', 'tailwind css'],
        link : "https://mustafatawab.vercel.app",
        
    },





]