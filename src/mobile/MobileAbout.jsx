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

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MobileAbout = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const textBlocks = gsap.utils.toArray('.mobile-about-text');
      if (textBlocks.length) {
        textBlocks.forEach((block, index) => {
          gsap.fromTo(block, 
            { x: -50, opacity: 0 },
            { 
              scrollTrigger: {
                trigger: block,
                start: "top 85%", // Trigger exactly when the element enters 85% down the viewport
              },
              x: 0, 
              opacity: 1, 
              duration: 0.6,
              delay: index * 0.1, // Fake stagger based on index
              ease: "power2.out"
            }
          );
        });
      }
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-20 bg-surface border-t border-white/5 relative z-0 overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[80vw] h-[80vw] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-mono font-black mb-10 uppercase tracking-tighter text-center">
          About <span className="text-primary text-glow">Me</span>
        </h2>

        {/* Image */}
        <div className="w-full flex justify-center mb-10">
          <div className="relative w-full max-w-[250px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_0_80px_rgba(56,189,248,0.15)] border border-primary/20">
            <img 
              src="/celi3.png" 
              alt="Programming Workspace" 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* Stacked Phrases instead of animated ones */}
        <div className="flex flex-col gap-10 border-l-2 border-primary/30 pl-6 py-2">
          {textPhrases.map((phrase, idx) => (
            <div key={idx} className="flex flex-col mobile-about-text">
              <p className="text-white text-3xl font-mono font-bold leading-tight tracking-tight mb-3 text-glow">
                {phrase.highlight}.
              </p>
              <p className="text-text-muted text-base font-light leading-relaxed">
                {phrase.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a 
            href="#projects" 
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center justify-center px-8 py-4 w-full max-w-[280px] rounded-full mx-auto border border-primary/50 text-white font-bold bg-primary/10 tracking-wide text-base shadow-[0_0_20px_rgba(56,189,248,0.2)]"
          >
            Explore My Work
          </a>
        </div>
      </div>
    </section>
  );
};

export default MobileAbout;
