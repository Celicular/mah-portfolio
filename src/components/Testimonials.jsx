import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Testimonials() {
  const testimonials = [
    { 
      rating: 5.0, 
      text: 'Working with Himadri was an absolute pleasure. His engineering solutions transformed our product architecture and helped us scale seamlessly. Highly recommended for anyone looking for a world-class Product Engineer.', 
      name: 'Sandeep Shekhar', 
      role: 'Rely On Us Digitally' 
    },
    { 
      rating: 5.0, 
      text: 'The level of technical precision and product intuition brought to our project was outstanding. Everything functions reliably under load and looks incredible. A true professional who over-delivers every time.', 
      name: 'Syed Zohaib', 
      role: 'Al Gharbia' 
    },
    { 
      rating: 5.0, 
      text: 'Our platform speed and conversion rates have improved substantially since Himadri redesigned our core systems. Clean code, responsive communication, and deep product mindset.', 
      name: 'Rohan Sharma', 
      role: 'Founder, TechScale India' 
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 50, damping: 20 } }
  };

  return (
    <section id="testimonials" className="w-full bg-[#F9F9F9] pb-32 px-6">
      <div className="max-w-[1600px] mx-auto bg-[#1c1c1c] rounded-[3rem] md:rounded-[5rem] py-24 px-6 md:px-12 relative overflow-hidden shadow-2xl">

        <motion.div 
          initial={{ rotate: -45, scale: 0 }}
          whileInView={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 40, damping: 10, delay: 0.2 }}
          className="absolute top-20 left-20 text-[#4884F5] opacity-50 hidden md:block"
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
        </motion.div>
        <motion.div 
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 0.3 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="absolute top-16 right-32 text-slate-600 hidden md:block"
        >
           <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ type: 'spring', stiffness: 50 }}
          className="max-w-3xl mx-auto text-center mb-20 relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter font-display mb-6">
            Testimonials that <br/> Speak to <span className="text-[#4884F5]">My Results</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Don't just take my word for it. Here is what some of my recent clients have to say about the quality of my work and the impact it had on their business.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
        >
          {testimonials.map((test, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className={`bg-[#2a2a2a] p-8 md:p-10 rounded-[2rem] border border-white/5 flex flex-col justify-between ${index === 1 ? 'lg:-translate-y-8 shadow-[0_30px_60px_rgba(0,0,0,0.4)] ring-1 ring-white/10 bg-[#333333]' : 'opacity-80 hover:opacity-100 transition-opacity'}`}
            >
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex text-[#4884F5]">
                    {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                      >
                        <Star size={18} fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-white font-bold ml-2">{test.rating.toFixed(1)}</span>
                </div>
                <p className="text-slate-300 leading-relaxed mb-8 text-sm md:text-base">
                  "{test.text}"
                </p>
              </div>
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-white font-bold text-base">{test.name}</h4>
                <p className="text-slate-400 text-sm font-medium mt-0.5">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center items-center gap-3 mt-16 relative z-10"
        >
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors">
             <div className="w-2 h-2 rounded-full bg-slate-400"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-[#4884F5]/20 flex items-center justify-center cursor-pointer">
             <div className="w-3 h-3 rounded-full bg-[#4884F5]"></div>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-600 transition-colors">
             <div className="w-2 h-2 rounded-full bg-slate-400"></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
