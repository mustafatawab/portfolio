import React from 'react'
import Link from 'next/link';
import { BsLinkedin , BsGithub } from 'react-icons/bs';
import { Mail } from 'lucide-react';
const Footer = () => {
    return (
        <footer className="py-20 bg-white dark:bg-slate-900 ">
            <div className="p-5 w-full md:w-4/5  mx-auto">
                <div className='flex justify-between items-center flex-wrap'>
                    <Link href='/' className="text-2xl font-semibold">
                        <span className="text-blue-600 font-bold text-3xl">M</span>ustafa
                        Tawab
                    </Link>


                    <div className='flex gap-2 items-center'>
                        <BsLinkedin size='20' className='text-gray-600'/>
                        <BsGithub size='20' className='text-gray-600'/>
                        <Mail  size='20' className='text-gray-600'/>
                    </div>
                </div>
            </div>
        </footer>
    )
}


export default Footer;
