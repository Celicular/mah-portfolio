import React from 'react';
import { ArrowUpRight, Star, Sparkles, BadgeCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 12 } }
  };

  const textRevealVariants = {
    hidden: { y: '100%', rotate: 5, opacity: 0 },
    visible: { y: 0, rotate: 0, opacity: 1, transition: { type: 'spring', stiffness: 80, damping: 15 } }
  };

  const shapeVariants = {
    hidden: { scale: 0.2, borderRadius: "100%", opacity: 0, rotate: -45 },
    visible: { scale: 1, borderRadius: "50%", opacity: 1, rotate: 0, transition: { type: "spring", stiffness: 60, damping: 20, duration: 1.5 } }
  };

  return (
    <motion.section 
      initial="hidden" 
      animate="visible" 
      variants={containerVariants}
      id="home" 
      className="pt-32 pb-0 px-6 min-h-screen flex flex-col items-center relative overflow-hidden w-full font-sans"
    >

      <motion.div variants={itemVariants} className="relative mb-6 z-10 mt-2">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-slate-200 bg-white text-slate-800 font-bold text-lg shadow-sm transition-transform cursor-pointer"
        >
          <span>Hello!</span>
        </motion.div>
        <motion.div
          animate={{ rotate: [0, 15, -15, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute -top-4 -right-6 text-[#4884F5]"
        >
          <Sparkles size={32} />
        </motion.div>
      </motion.div>

      <h1 className="text-[4rem] md:text-[6rem] lg:text-[7.5rem] font-black text-center tracking-tighter text-[#111111] mb-4 z-10 leading-[0.9] font-display uppercase drop-shadow-sm flex flex-col items-center">
        <div className="overflow-hidden">
          <motion.div variants={textRevealVariants} className="origin-bottom-left">
            I'm <span className="text-[#4884F5]">Himadri,</span>
          </motion.div>
        </div>
        <div className="overflow-hidden">
          <motion.div variants={textRevealVariants} className="origin-bottom-left text-[#111111]">
            Product Engineer
          </motion.div>
        </div>
      </h1>

      <div className="relative w-full max-w-[1600px] mx-auto flex-1 flex items-center justify-between mt-0 md:mt-4 pb-20">

        <motion.div variants={itemVariants} className="hidden lg:flex flex-col gap-12 pl-8 w-80 z-20 mt-[-25vh]">
          <motion.div whileHover={{ x: 10 }}>
            <div className="text-8xl font-serif text-[#111111] mb-2 leading-none absolute -ml-6 -mt-8 opacity-10">“</div>
            <p className="text-lg text-slate-800 leading-snug font-bold border-l-4 border-[#4884F5] pl-4">
              Himadri's exceptional engineering and solutions ensured our product's success.<br/>Highly recommended!
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="mt-4 origin-left">
            <div className="flex items-center gap-3">
              <div className="font-black text-6xl text-[#111111] font-display tracking-tight">95+</div>
              <BadgeCheck className="text-[#4884F5] fill-[#4884F5]/10" size={36} strokeWidth={2.5} />
            </div>
            <div className="text-xl text-slate-600 font-bold mt-2 uppercase tracking-widest">Clients Served</div>
          </motion.div>
        </motion.div>

        <div className="relative flex-1 h-full flex justify-center items-center">

          <motion.div 
            variants={shapeVariants}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[450px] h-[450px] md:w-[650px] md:h-[650px] lg:w-[850px] lg:h-[850px] bg-[#4884F5] z-0"
            style={{ borderRadius: "50%" }}
          />

          <motion.img 
            variants={{
              hidden: { y: 200, opacity: 0 },
              visible: { 
                y: 0, 
                opacity: 1, 
                transition: { 
                  y: { type: 'spring', stiffness: 50, damping: 20, delay: 0.1 },
                  opacity: { duration: 0.25, ease: 'easeOut' }
                } 
              }
            }}
            src="/assets/cutout.png" 
            alt="Himadri Shekhar - Product Engineer and Full Stack Architect" 
            fetchPriority="high"
            decoding="async"
            className="relative z-10 h-[90vh] md:h-[110vh] max-h-[1200px] object-contain object-bottom drop-shadow-[0_30px_50px_rgba(0,0,0,0.35)] mt-[-40vh]"
          />

          <motion.div 
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { delay: 1 } }
            }}
            className="absolute bottom-[12vh] md:bottom-[28vh] left-1/2 -translate-x-[160px] md:-translate-x-[180px] z-40"
          >
            <motion.svg 
              width="70" height="80" viewBox="0 0 70 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#111111] drop-shadow-md"
            >
              <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }} d="M15 5 C 5 35, 10 65, 60 70" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="transparent" />
              <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }} d="M45 55 L 62 70 L 45 85" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="transparent" />
            </motion.svg>
          </motion.div>

          <motion.a 
            href="mailto:hsg090907.jsr@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-[8vh] md:bottom-[25vh] left-1/2 -translate-x-1/2 z-30 flex items-center bg-white/60 backdrop-blur-md p-2 rounded-full border border-white/80 shadow-2xl w-max cursor-pointer"
          >
            <div className="bg-[#4884F5] text-white px-10 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-[#3570E4] transition-colors shadow-lg text-lg uppercase tracking-wide font-display group">
              Hire Me <ArrowUpRight size={24} strokeWidth={2.5} className="group-hover:rotate-45 transition-transform duration-300" />
            </div>
          </motion.a>
        </div>

        <motion.div variants={itemVariants} className="hidden lg:flex flex-col gap-12 pr-8 w-80 text-right z-20 items-end mt-[-25vh]">
          <motion.div whileHover={{ x: -10 }}>
            <div className="flex gap-2 justify-end text-[#4884F5] mb-4">
              {[1,2,3,4,5].map((i, index) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                >
                  <Star size={28} fill="currentColor" />
                </motion.div>
              ))}
            </div>
            <div className="font-black text-6xl text-[#111111] font-display tracking-tight mt-6">5+ Years</div>
            <div className="text-xl text-slate-600 font-bold mt-2 uppercase tracking-[0.2em] border-b-2 border-slate-900 pb-2 inline-block">Experience</div>
          </motion.div>
        </motion.div>

      </div>
    </motion.section>
  );
}
