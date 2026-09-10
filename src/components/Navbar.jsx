import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Resume', href: '#resume' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Projects', href: '#projects' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact Us', href: '#contact' },
  ];

  const handleScrollTo = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const targetId = href.replace('#', '');
    
    if (targetId === 'home') {
      if (window.lenis) {
        window.lenis.scrollTo(0, { duration: 1.5 });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      if (window.lenis) {
        window.lenis.scrollTo(targetElement, { offset: -40, duration: 1.5 });
      } else {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] md:w-[90%] max-w-5xl bg-[#0f0f0f] text-white/70 rounded-full px-6 md:px-10 py-3 md:py-4 flex items-center justify-between z-50 shadow-[0_20px_50px_rgba(0,0,0,0.2)] font-sans">

        <div className="hidden md:flex gap-8 lg:gap-10 text-sm font-semibold tracking-wide">
          <a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="text-[#4884F5] hover:text-[#4884F5] transition-colors">Home</a>
          <a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-white transition-colors">Services</a>
          <a href="#resume" onClick={(e) => handleScrollTo(e, '#resume')} className="hover:text-white transition-colors">Resume</a>
        </div>

        <div 
          onClick={(e) => handleScrollTo(e, '#home')}
          className="flex items-center gap-3 cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-full bg-[#4884F5] flex items-center justify-center text-white font-bold text-sm font-display">
            H
          </div>
          <span className="font-bold text-lg tracking-wide text-white font-display">Himadri</span>
        </div>

        <div className="hidden md:flex gap-7 lg:gap-9 text-sm font-semibold tracking-wide">
          <a href="#portfolio" onClick={(e) => handleScrollTo(e, '#portfolio')} className="hover:text-white transition-colors">Portfolio</a>
          <a href="#projects" onClick={(e) => handleScrollTo(e, '#projects')} className="hover:text-white transition-colors">Projects</a>
          <a href="#testimonials" onClick={(e) => handleScrollTo(e, '#testimonials')} className="hover:text-white transition-colors">Testimonials</a>
          <a href="#contact" onClick={(e) => handleScrollTo(e, '#contact')} className="hover:text-white transition-colors">Contact</a>
        </div>

        <button 
          className="md:hidden text-white hover:text-[#4884F5] transition-colors"
          onClick={toggleMenu}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {isOpen && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 w-[95%] bg-[#0f0f0f]/95 backdrop-blur-lg rounded-3xl p-6 z-40 shadow-2xl border border-white/10 md:hidden flex flex-col gap-6 items-center animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href} 
              onClick={(e) => handleScrollTo(e, link.href)}
              className={`text-lg font-bold tracking-wide transition-colors ${link.name === 'Home' ? 'text-[#4884F5]' : 'text-white/70 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
