import React from 'react';
import { ArrowUpRight, CheckCircle2, Zap, ShieldCheck, Terminal, Cpu, Award, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyHireMe() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.15 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 50, damping: 18 } 
    }
  };

  const pillars = [
    {
      icon: <Terminal size={20} className="text-[#4884F5]" />,
      title: 'Full-Cycle Product Ownership',
      desc: 'From initial schema design to cloud deployment and automated CI/CD pipelines, I own the entire engineering lifecycle.'
    },
    {
      icon: <ShieldCheck size={20} className="text-[#4884F5]" />,
      title: 'Business Systems Architecture',
      desc: 'Proven experience building enterprise ERP, CRM, and workflow automation platforms that eliminate operational bottlenecks.'
    },
    {
      icon: <Cpu size={20} className="text-[#4884F5]" />,
      title: 'Pragmatic AI & LLM Systems',
      desc: 'Hands-on engineering of production RAG pipelines, NLP moderation tools, vector search, and local model inference.'
    },
    {
      icon: <Zap size={20} className="text-[#4884F5]" />,
      title: 'High-Performance & Clean Code',
      desc: 'Sub-second interaction speed, type-safe architectures, and strict code hygiene designed for longevity and effortless scaling.'
    }
  ];

  const handleScrollToContact = (e) => {
    e.preventDefault();
    const el = document.getElementById('contact');
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -40, duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="w-full bg-[#F9F9F9] py-28 px-6 overflow-hidden relative">
      {/* Subtle ambient decorative accents */}
      <div className="absolute top-12 left-10 text-[#4884F5] opacity-10 hidden xl:block pointer-events-none">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="40" strokeDasharray="6 6" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
        {/* LEFT COLUMN: Visual Profile & Proof Badges with Original Fluid Circle Morph Animation */}
        <div className="w-full lg:w-5/12 relative flex justify-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative w-[340px] h-[340px] sm:w-[420px] sm:h-[420px] md:w-[480px] md:h-[480px]"
          >
            {/* Fluid Morphing Shape: scale 0, rotate -90, 20% -> scale 1, rotate 0, 50% */}
            <motion.div 
              variants={{
                hidden: { scale: 0, rotate: -90, borderRadius: "20%" },
                visible: { 
                  scale: 1, 
                  rotate: 0, 
                  borderRadius: "50%", 
                  transition: { type: 'spring', stiffness: 40, damping: 20, duration: 1.5 } 
                }
              }}
              className="absolute inset-0 bg-[#4884F5] shadow-2xl shadow-[#4884F5]/30"
            />

            {/* Cutout Photo */}
            <motion.img 
              initial={{ y: 100, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 60, delay: 0.3 }}
              src="/assets/cutout.png" 
              alt="Himadri Shekhar - Product Engineer" 
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[88%] object-contain drop-shadow-2xl z-10"
            />

            {/* Floating Proof Badge Top Right */}
            <motion.div 
              initial={{ opacity: 0, y: -25, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, type: 'spring', stiffness: 80, damping: 14 }}
              whileHover={{ scale: 1.05 }}
              className="absolute top-4 right-0 sm:-right-4 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-200/90 z-30 flex items-center gap-3 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Trophy size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Accolade</div>
                <div className="text-xs font-black text-slate-900 font-display">1st Place · Code 300</div>
              </div>
            </motion.div>

            {/* Floating Stats Badge Bottom Left */}
            <motion.div 
              initial={{ opacity: 0, y: 25, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: 'spring', stiffness: 80, damping: 14 }}
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-6 left-0 sm:-left-4 bg-white rounded-2xl p-3.5 shadow-xl border border-slate-200/90 z-30 flex items-center gap-3 cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Track Record</div>
                <div className="text-xs font-black text-slate-900 font-display">95+ Global Clients</div>
              </div>
            </motion.div>

            {/* Geometric Dot Grid Accents: Positioned cleanly on the top-left of the blue circle */}
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 0.45 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 1 }}
              className="absolute top-8 left-6 sm:top-10 sm:left-8 grid grid-cols-3 gap-2 w-16 pointer-events-none z-10"
            >
              {[...Array(9)].map((_, i) => (
                <motion.div 
                  key={i} 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 + i * 0.05 }}
                  className="w-1.5 h-1.5 rounded-full bg-white"
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Value Proposition, Pillars, and Stats */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="w-full lg:w-7/12 flex flex-col items-start text-left"
        >
          {/* Section Header */}
          <motion.h2 
            variants={itemVariants} 
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#111111] mb-5 tracking-tighter font-display uppercase leading-[1.08]"
          >
            Why Hire Me for Your <span className="text-[#4884F5]">Next Project?</span>
          </motion.h2>

          <motion.p 
            variants={itemVariants} 
            className="text-slate-600 text-base sm:text-lg font-medium leading-relaxed mb-8 max-w-2xl"
          >
            I combine rigorous systems engineering with strategic product architecture to build scalable, resilient digital solutions that don't just function reliably—they directly eliminate operational friction and generate business value.
          </motion.p>

          {/* 4 Value Pillars (2x2 Grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-10">
            {pillars.map((pillar, i) => (
              <motion.div 
                key={i}
                variants={itemVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-md shadow-slate-200/40 hover:shadow-xl hover:border-[#4884F5]/30 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center mb-3 group-hover:bg-[#4884F5]/10 transition-colors">
                    {pillar.icon}
                  </div>
                  <h3 className="font-bold text-base text-[#111111] font-display mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {pillar.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key Metrics Row */}
          <motion.div 
            variants={itemVariants} 
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 w-full py-6 mb-8 border-y border-slate-200/80"
          >
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#111111] font-display mb-1">95+</div>
              <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Clients Served</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#111111] font-display mb-1">50+</div>
              <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Products Shipped</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#111111] font-display mb-1">5+</div>
              <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black text-[#4884F5] font-display mb-1">100%</div>
              <div className="text-slate-500 font-bold uppercase tracking-wider text-xs">Sprint Efficiency</div>
            </div>
          </motion.div>

          {/* CTA Action */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4">
            <a 
              href="#contact"
              onClick={handleScrollToContact}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#4884F5] text-white font-bold tracking-wider uppercase text-xs hover:bg-[#3570E4] transition-all shadow-lg shadow-[#4884F5]/25 cursor-pointer"
            >
              <span>Let's Build Your Project</span>
              <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform duration-300" />
            </a>

            <a
              href="mailto:hsg090907.jsr@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full border border-slate-300 text-slate-700 font-bold tracking-wider uppercase text-xs hover:bg-slate-100 transition-colors"
            >
              <span>Direct Email</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
