'use client'
import React from 'react';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import logo from '../../public/mustafa_logo.png'
import Image from 'next/image';
const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/mustafatawab', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/mustafa-tawab/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:tawab05@gmail.com', label: 'Email' },
  ];

  const quickLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="py-3 bg-[#f1f5f9] dark:bg-black  container">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              {/* bg-clip-text */}
               <Image src={logo} width={150} height={50} alt="Mustafa Tawab"/>
            </div>
            <p className="text-gray-700 dark:text-gray-400 leading-relaxed max-w-md">
              Creative developer passionate about building exceptional digital experiences. 
              Let's work together to bring your ideas to life with modern technology and thoughtful design.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 dark:text-white">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-700 dark:text-gray-400 hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 dark:text-white">Get In Touch</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-700 dark:text-gray-400">
                <span className="text-gray-500 ">Email:</span><br />
                tawab05@gmail.com
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                <span className="text-gray-500">Phone:</span><br />
                +92 347 530 0572
              </p>
              <p className="text-gray-700 dark:text-gray-400">
                <span className="text-gray-500">Location:</span><br />
                Pakistan
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 mb-4 md:mb-0">
            <span>© {currentYear} Mustafa Tawab. Made with</span>
            <Heart size={16} className="text-red-500 animate-pulse" />
            <span>and lots of coffee.</span>
          </div>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200"
          >
            <span>Back to top</span>
            <ArrowUp size={16} className="group-hover:-translate-y-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;