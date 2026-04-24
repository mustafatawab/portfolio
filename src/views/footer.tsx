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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="py-20 bg-black border-t border-white/5 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
          
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="inline-block group">
              <div className="text-2xl font-bold font-display tracking-[0.2em] flex items-center gap-1 transition-all duration-300 group-hover:neon-glow-cyan p-2 rounded-lg">
                <span className="text-neon-cyan font-mono">{`{`}</span>
                <span className="text-white">MUSTAFA</span>
                <span className="text-neon-cyan font-mono">{`}`}</span>
              </div>
            </Link>
            <p className="text-white/40 leading-relaxed max-w-sm font-mono text-sm">
              Architecting high-performance digital environments and scalable full-stack ecosystems.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 glass-card rounded-xl flex items-center justify-center text-white/40 hover:text-neon-cyan hover:neon-glow-cyan transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-white/20 mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Work', 'Tech', 'Contact'].map((item) => (
                <li key={item}>
                  <a href={`/#${item.toLowerCase()}`} className="text-sm font-mono text-white/60 hover:text-neon-cyan transition-colors uppercase tracking-widest">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-white/20 mb-8">Base of Operations</h4>
            <div className="space-y-6 font-mono text-sm">
              <div className="space-y-1">
                <div className="text-white/20 uppercase text-[10px]">Transmission</div>
                <div className="text-white/60 hover:text-neon-cyan transition-colors">tawab05@gmail.com</div>
              </div>
              <div className="space-y-1">
                <div className="text-white/20 uppercase text-[10px]">Coordinate</div>
                <div className="text-white/60">Islamabad, PK</div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-white/20">
            <span>© {currentYear} MUSTAFA TAWAB</span>
            <span className="w-1 h-1 bg-neon-purple rounded-full mx-2" />
            <span>ENCRYPTED PORTFOLIO</span>
            <Heart size={12} className="text-neon-purple animate-pulse ml-2" />
          </div>
          
          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-white/40 hover:text-neon-cyan transition-colors"
          >
            Terminal Top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Background visual detail */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-neon-purple/5 blur-[120px] rounded-full -mb-48 -mr-48" />
    </footer>
  );
};

// Add Link to imports since I used it
import Link from 'next/link';

export default Footer;