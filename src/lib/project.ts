import malblogs from '@/assets/project/car-finance.png'
import elygance from '@/assets/project/elygance.png'
import msp from '@/assets/project/msp-tech.png'
import myscribe from '@/assets/project/myscribe.png'
import triton from '@/assets/project/triton.png'
import trustpilot from '@/assets/project/trustpilot.png'
import portfolio from '@/assets/project/portfolio.png'
import nextron from '@/assets/project/nextron.png'

export const projects = [
    {
        image : malblogs,
        title : "Car Finance",
        description : "A blogging website where user can post the blogs from the admin dashboard.",
        tags : ['tailwind css' , 'nextjs' , 'typescript' , 'Contentfull'],
        githubLink : "",
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
        description : "A luxury e-commerce platform for premium fragrances with elegant design and seamless shopping experience.",
        tags : ['nexjts', 'typescript' , 'redux toolkit', 'tailwind css'],
        link : "https://elygance.vercel.app/",
    },
    
    {
        image: portfolio,
        title : "Portoflio Website",
        description : "A portofolio website for developers and designers to showcase their skills. It is just a landing page.",
        tags : ['nexjts', 'typescript', 'tailwind css'],
        link : "https://v0-stunning-portfolio.vercel.app/",
        
    },


    {
        image : myscribe,
        title : "My Scribe",
        description : "Transcribe, Summarize, and Streamline the medical notes to focus on what truly matters — patient care.",
        tags : ['bootstrap' , 'vuejs' , 'laravel' , 'ai' , 'php' ,'python'],
        link : "https://www.myscribe.us/",
    },

    {
        image : triton,
        title : "Triton",
        description : " ",
        tags : ['tailwind css' , 'nextjs' , 'Payload CMS', 'typescript' , 'node'],
        more : ["https://www.rollingvranchwcid1.com/", "https://www.rollingvranchwcid2.com/" , "https://www.rollingvranchwcid3.com/" , "https://www.rollingvranchwcid5.com/" , 'https://www.palomacreek.org/' , 'https://www.mud222.org/' ],
        link : "https://www.tritoncg.com/",
    },



    {
        image : trustpilot,
        title : "Truspilot Clone",
        description : "Trustpilot clone and still in progress. Some feature might not work right now but the UI is completed. ",
        tags : ['tailwind css' , 'nextjs' , 'typscript' , 'mongodb'],
        link : "https://trustpilot-xi.vercel.app/",
    },


]