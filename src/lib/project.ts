import malblogs from '@/assets/project/car-finance.png'
import elygance from '@/assets/project/elygance.png'
import msp from '@/assets/project/msp-tech.png'
import myscribe from '@/assets/project/myscribe.png'
import triton from '@/assets/project/triton.png'
import trustpilot from '@/assets/project/trustpilot.png'
import portfolio from '@/assets/project/portfolio.png'

export const projects = [
    {
        image : malblogs,
        title : "Car Finance",
        description : "A blogging website where user can post the blogs from the admin dashboard. This is all about Car Finance blogging.",
        tags : ['tailwind css' , 'nextjs' , 'typescript' , 'Contentfull'],
        link : "https://mal-blogs.vercel.app/blogs",
    },

    {
        image : msp,
        title : "MSP Tech Stack",
        description : 'The app is Business to Business marketplace. It has user login system and company login system.',
        tags : ['tailwind css', 'nextjs' , 'typescript', 'mongodb' , 'nodejs'],
        link : "https://msp-tech-stack.vercel.app/",
    },

    {
        image : elygance,
        title : "Elygance",
        description : "An e-commerce store for perfumes. It has all functionality of e-commerce.",
        tags : ['nexjts', 'typescript' , 'redux toolkit', 'tailwind css'],
        link : "https://elygance.vercel.app/",
    },
    
    {
        image: portfolio,
        title : "Portoflio Website",
        description : "A simple landing page for developers and designers to showcase their skills.",
        tags : ['nexjts', 'typescript', 'tailwind css'],
        link : "https://ezitech.vercel.app/",
        
    },


    {
        image : myscribe,
        title : "My Scribe",
        description : "At MyScribe, we transcribe, summarize, and streamline your medical notes, so you can focus on what truly matters — patient care.",
        tags : ['bootstrap' , 'vuejs' , 'laravel' , 'ai' , 'php' ,'python'],
        link : "https://www.myscribe.us/",
    }
]