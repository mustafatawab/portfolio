import React from 'react'
import Link from 'next/link';
import { BsLinkedin, BsGithub } from 'react-icons/bs';
import { Mail } from 'lucide-react';
const Footer = () => {
    return (
        <footer id='footer' className="py-10 bg-[#f1f5f9] dark:bg-black ">
            <div className="p-5 container  mx-auto">
                <div className='flex justify-between items-start  flex-wrap md:flex-nowrap gap-10 '>
                    <div className='md:basis-1/4'>

                    <Link href='/' className="text-2xl font-semibold">
                        <span className="text-blue-600 font-bold text-3xl">M</span>ustafa
                        Tawab
                    </Link>
                    <p className='text-gray-700'>I build exceptional and accessible digital experiences for the web , mobile and desktop.</p>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <strong className='mb-1'>Links</strong>
                        <Link className='hover:underline' href={'#contact'}>Contact</Link>
                        <Link className='hover:underline' href={'#about'}>About</Link>
                        <Link className='hover:underline' href={'/projects'}>Projects</Link>
                        <Link className='hover:underline' href={'#skills'}>Skills</Link>
                        <Link className='hover:underline' href={'#services'}>Services</Link>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <span className='flex gap-2 items-center'>

                            <BsLinkedin size='20' className='text-gray-600' />
                            <Link href={'https://www.linkedin.com/in/mustafa-tawab/'}>LinkedIn</Link>
                        </span>

                        <span className='flex gap-2 items-center'>

                            <BsGithub size='20' className='text-gray-600' />
                            <Link href={'https://github.com/mustafatawab'}>Github</Link>
                        </span>

                        <span className='flex gap-2 items-center'>

                            <Mail size='20' className='text-gray-600' />
                            <Link href={'mailto:tawab05@gmail.comm'}>Email</Link>
                        </span>
                    </div>
                </div>

                {/* <hr />

                <div className='mt-10 flex justify-center items-center text-center'>
                    <p>

                        © 2025 <strong> Mustafa Tawab</strong>. All rights reserved.
                    </p>
                </div> */}
            </div>
        </footer>
    )
}


export default Footer;
