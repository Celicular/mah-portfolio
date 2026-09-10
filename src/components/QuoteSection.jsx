import React from 'react';
import { motion } from 'framer-motion';

export default function QuoteSection() {
  return (
    <section className="w-full bg-[#F9F9F9] py-14 sm:py-20 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: 'spring', stiffness: 60, damping: 20 }}
          className="relative bg-white rounded-[2rem] sm:rounded-[2.5rem] p-8 sm:p-14 md:p-16 border border-slate-200/90 shadow-xl shadow-slate-200/40 text-center"
        >
          {/* Subtle top accent bar */}
          <div className="w-12 h-1 bg-[#4884F5] rounded-full mx-auto mb-8" />

          {/* Fancy handwriting quote */}
          <blockquote 
            style={{ fontFamily: "'Caveat', cursive" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#111111] leading-[1.15] max-w-3xl mx-auto"
          >
            “Talk is cheap... <span className="text-[#4884F5]">show me the code.</span>”
          </blockquote>

          {/* Clean author attribution */}
          <div className="mt-8 flex items-center justify-center gap-3 text-slate-500 font-bold text-xs sm:text-sm uppercase tracking-widest">
            <span className="w-8 h-[1px] bg-slate-300" />
            <span className="font-sans">Linus Torvalds</span>
            <span className="w-8 h-[1px] bg-slate-300" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
