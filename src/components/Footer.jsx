import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
  };

  const handleScrollTo = (e, href) => {
    e.preventDefault();
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
    <footer className="w-full bg-[#111111] pt-24 pb-12 px-6 rounded-t-[3rem] md:rounded-t-[5rem] relative z-20 mt-[-2rem]">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          <motion.div variants={itemVariants} className="col-span-1 md:col-span-2">
            <div 
              onClick={(e) => handleScrollTo(e, '#home')}
              className="flex items-center gap-3 mb-8 cursor-pointer select-none"
            >
              <div className="w-10 h-10 rounded-full bg-[#4884F5] flex items-center justify-center text-white font-black text-xl font-display">
                H
              </div>
              <span className="font-black text-3xl tracking-wide text-white font-display">Himadri.</span>
            </div>
            <p className="text-slate-400 text-lg max-w-sm mb-8 leading-relaxed">
              Crafting scalable technical architecture, high-impact product solutions, and robust digital platforms that deliver real business impact.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* GitHub */}
              <motion.a 
                whileHover={{ scale: 1.1, y: -4 }} 
                href="https://github.com/celicular" 
                target="_blank" 
                rel="noreferrer"
                title="GitHub"
                className="w-11 h-11 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white hover:bg-[#4884F5] transition-colors"
              >
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              </motion.a>

              {/* LinkedIn */}
              <motion.a 
                whileHover={{ scale: 1.1, y: -4 }} 
                href="https://www.linkedin.com/in/himadrishekhar-goswami-59b631335/" 
                target="_blank" 
                rel="noreferrer"
                title="LinkedIn"
                className="w-11 h-11 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white hover:bg-[#4884F5] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              </motion.a>

              {/* Instagram */}
              <motion.a 
                whileHover={{ scale: 1.1, y: -4 }} 
                href="https://instagram.com/da.narcissistic_guy" 
                target="_blank" 
                rel="noreferrer"
                title="Instagram"
                className="w-11 h-11 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white hover:bg-[#4884F5] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </motion.a>

              {/* WhatsApp */}
              <motion.a 
                whileHover={{ scale: 1.1, y: -4 }} 
                href="https://wa.me/919942868093" 
                target="_blank" 
                rel="noreferrer"
                title="WhatsApp"
                className="w-11 h-11 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white hover:bg-[#25D366] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg>
              </motion.a>

              {/* Email */}
              <motion.a 
                whileHover={{ scale: 1.1, y: -4 }} 
                href="mailto:hsg090907.jsr@gmail.com" 
                title="Email"
                className="w-11 h-11 rounded-full bg-[#1c1c1c] flex items-center justify-center text-white hover:bg-[#4884F5] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold text-xl mb-6 font-display">Quick Links</h4>
            <ul className="flex flex-col gap-4 text-slate-400 font-medium">
              <li><a href="#home" onClick={(e) => handleScrollTo(e, '#home')} className="hover:text-[#4884F5] transition-colors">Home</a></li>
              <li><a href="#services" onClick={(e) => handleScrollTo(e, '#services')} className="hover:text-[#4884F5] transition-colors">Services</a></li>
              <li><a href="#portfolio" onClick={(e) => handleScrollTo(e, '#portfolio')} className="hover:text-[#4884F5] transition-colors">Portfolio</a></li>
              <li><a href="#projects" onClick={(e) => handleScrollTo(e, '#projects')} className="hover:text-[#4884F5] transition-colors">Projects</a></li>
              <li><a href="#resume" onClick={(e) => handleScrollTo(e, '#resume')} className="hover:text-[#4884F5] transition-colors">Resume</a></li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants}>
            <h4 className="text-white font-bold text-xl mb-6 font-display">Direct Communication</h4>
            <ul className="flex flex-col gap-3.5 text-slate-400 font-medium">
              <li>
                <a href="mailto:hsg090907.jsr@gmail.com" className="hover:text-[#4884F5] transition-colors">
                  hsg090907.jsr@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+919942868093" className="hover:text-[#4884F5] transition-colors">
                  +91 99428 68093
                </a>
              </li>
              <li>
                <a href="https://wa.me/919942868093" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition-colors">
                  Chat on WhatsApp
                </a>
              </li>
              <li className="text-slate-500 pt-1 text-sm">
                Operating remotely from India
              </li>
            </ul>
          </motion.div>

        </div>

        <motion.div variants={itemVariants} className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 font-medium">© {new Date().getFullYear()} Himadri Shekhar. All rights reserved.</p>
          <div className="flex gap-6 text-slate-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}
