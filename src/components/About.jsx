import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const textPhrases = [
  {
    highlight: "developer",
    desc: "I have been building modern web experiences since 2021, working with 90+ clients across more than 60 successful projects, delivering reliable and high-quality solutions."
  },
  {
    highlight: "full-stack",
    desc: "I handle the entire development process — from designing and building interfaces to managing backend systems and deployment. I focus on creating efficient, scalable, and polished digital products."
  },
  {
    highlight: "collaboration",
    desc: "Currently pursuing a Diploma in Computer Science & Engineering, I continuously expand my technical skills and remain open to collaborations, teams, and exciting projects."
  }
];

const About = () => {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const textTriggerRef = useRef(null);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Much smoother entry animation for the image
      gsap.fromTo(imageWrapperRef.current, 
        { scale: 1.1, x: "20%", opacity: 0, filter: "blur(20px)" },
        { 
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top", // Triggers when the section completely loads
            end: "+=800", // Finishes after scrolling starts
            scrub: 1, // Smooth scrub
          },
          scale: 1, 
          x: "0%", 
          opacity: 1, 
          filter: "blur(0px)", 
          ease: "power3.out" 
        }
      );

      // We'll create a specialized ScrollTrigger spanning the whole container height to drive the active phrase index 
      ScrollTrigger.create({
        trigger: containerRef.current,
        pin: true,
        start: "top top", 
        end: "+=3000", // Wait for 3000px of scrolling
        onUpdate: (self) => {
          // Determine index based on progress
          const index = Math.min(
            textPhrases.length - 1,
            Math.floor(self.progress * textPhrases.length)
          );
          setActivePhraseIndex(index);
        }
      });

    }, containerRef);
    const handleScrollToProjects = (e) => {
      e.preventDefault();
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    };

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="h-screen flex flex-col justify-center relative bg-surface border-t border-white/5 overflow-hidden z-0">
      
      {/* Background glow behind text */}
      <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10 flex flex-col md:flex-row items-center gap-16 md:gap-24">
        
        {/* Left Side: Image */}
        <div className="md:w-5/12 flex justify-center w-full mb-10 md:mb-0 relative" ref={imageWrapperRef}>
          <div className="relative w-full max-w-sm aspect-[4/5] rounded-[2rem] overflow-hidden glass shadow-[0_0_80px_rgba(139,92,246,0.15)] border border-primary/20 transform-gpu">
            <img 
              src="/celi3.png" 
              alt="Programming Workspace" 
              className="w-full h-full object-cover opacity-80" 
            />
            {/* Futuristic purple overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-primary/20 to-transparent"></div>
          </div>
        </div>

        {/* Right Side: Morphing Text */}
        <div className="md:w-7/12 flex flex-col justify-center min-h-[400px]" ref={textTriggerRef}>
          
          <h2 className="text-4xl md:text-6xl font-mono font-black mb-10 uppercase tracking-tighter">
            About <span className="text-primary text-glow">Me</span>
          </h2>
          
          <div className="relative border-l-2 border-primary/30 pl-6 py-2 min-h-[250px] flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhraseIndex}
                initial={{ opacity: 0, y: 15, filter: "blur(5px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -15, filter: "blur(5px)" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="absolute w-[90%] left-6"
              >
                <p className="text-white text-3xl md:text-5xl font-mono font-bold leading-tight tracking-tight mb-4 text-glow">
                  {textPhrases[activePhraseIndex].highlight}.
                </p>
                <p className="text-text-muted text-xl md:text-2xl font-light leading-relaxed">
                  {textPhrases[activePhraseIndex].desc}
                </p>
              </motion.div>
            </AnimatePresence>

          </div>

          <div className="mt-12 flex items-center gap-4">
            <a 
              href="#projects" 
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-primary/50 text-white font-bold bg-primary/10 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 tracking-wide text-lg shadow-[0_0_20px_rgba(139,92,246,0.2)]"
            >
              Explore My Work
            </a>
            
            {/* Morphing index indicator */}
            <div className="flex gap-2 ml-4">
              {textPhrases.map((_, i) => (
                <div 
                  key={i} 
                  className={`h-1.5 rounded-full transition-all duration-500 ${activePhraseIndex === i ? 'w-8 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]' : 'w-2 bg-white/20'}`}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
