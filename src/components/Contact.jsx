import React from 'react';
import { Check, Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Contact() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.2, delayChildren: 0.3 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } }
  };

  return (
    <section id="contact" className="w-full bg-[#F9F9F9] pt-32 pb-24 px-6 relative overflow-hidden">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={containerVariants}
        className="max-w-4xl mx-auto text-center relative z-10"
      >
        <motion.h2 
          variants={itemVariants}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] font-display mb-12 tracking-tighter"
        >
          Have An Awesome Project <br/> Idea? <span className="text-[#4884F5]">Let's Discuss</span>
        </motion.h2>

        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 50, damping: 15 } }
          }}
          className="relative max-w-2xl mx-auto bg-white rounded-full p-2 border border-slate-200 shadow-xl shadow-slate-200/50 flex items-center gap-2 mb-8"
        >
          <div className="w-12 h-12 bg-[#4884F5]/10 rounded-full flex items-center justify-center text-[#4884F5] shrink-0 ml-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          </div>
          <div className="flex-1 text-slate-800 text-lg px-4 text-left font-medium overflow-hidden text-ellipsis">
            hsg090907.jsr@gmail.com
          </div>
          <motion.a 
            href="mailto:hsg090907.jsr@gmail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#4884F5] text-white px-8 py-4 rounded-full font-bold hover:bg-[#3570E4] transition-colors shadow-lg shadow-[#4884F5]/25 whitespace-nowrap uppercase tracking-widest text-sm inline-block"
          >
            Send email
          </motion.a>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          className="flex flex-wrap justify-center items-center gap-5 sm:gap-8 md:gap-10 text-slate-600 font-bold text-sm mb-4"
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <Check size={18} className="text-[#4884F5]" strokeWidth={3} />
            4.9/5 Average Ratings
          </motion.div>
          <motion.div variants={itemVariants} className="flex items-center gap-2">
            <Check size={18} className="text-[#4884F5]" strokeWidth={3} />
            Certified Product Engineer
          </motion.div>
          <motion.a 
            href="tel:+919942868093"
            variants={itemVariants}
            className="flex items-center gap-2 hover:text-[#4884F5] transition-colors"
          >
            <Phone size={16} className="text-[#4884F5]" />
            +91 99428 68093
          </motion.a>
          <motion.a 
            href="https://wa.me/919942868093"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
          >
            <MessageCircle size={16} className="text-emerald-500" />
            WhatsApp
          </motion.a>
        </motion.div>

        <motion.p variants={itemVariants} className="text-slate-400 text-sm font-medium">
          Operating remotely from India
        </motion.p>
      </motion.div>

    </section>
  );
}
