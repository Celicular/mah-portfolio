import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Code, Layout, Server, Database, Box, Terminal, Wrench, Brain, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const pages = [
  [
    { title: "Core Languages", icon: <Code className="w-6 h-6 text-primary" />, skills: ["Python", "JavaScript", "C++", "Java"] },
    { title: "Frontend Arch.", icon: <Layout className="w-6 h-6 text-primary" />, skills: ["React", "Next.js", "Tailwind", "CSS"] },
    { title: "Backend Systems", icon: <Server className="w-6 h-6 text-primary" />, skills: ["Node.js", "Express.js", "PHP"] }
  ],
  [
    { title: "Database Design", icon: <Database className="w-6 h-6 text-primary" />, skills: ["MySQL", "PostgreSQL", "MongoDB"] },
    { title: "3D & Animation", icon: <Box className="w-6 h-6 text-primary" />, skills: ["Three.js", "GSAP", "Framer Motion"] },
    { title: "DevOps", icon: <Terminal className="w-6 h-6 text-primary" />, skills: ["Linux", "Git", "Docker", "Vercel"] }
  ],
  [
    { title: "Workflow", icon: <Wrench className="w-6 h-6 text-primary" />, skills: ["VS Code", "Postman", "Figma"] },
    { title: "AI / ML", icon: <Brain className="w-6 h-6 text-primary" />, skills: ["LLMs", "Prompt Eng.", "Basic ML"] },
    { title: "Soft Skills", icon: <Lightbulb className="w-6 h-6 text-primary" />, skills: ["Agile", "Problem Solving", "UI/UX"] }
  ]
];

const Skills = () => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const pagesRefs = useRef([]);
  const [activePageIndex, setActivePageIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1.2, // Smoother scrub
          start: "top top", // Pins when fully on screen
          end: "+=3000",
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress < 0.33) setActivePageIndex(0);
            else if (progress < 0.66) setActivePageIndex(1);
            else setActivePageIndex(2);
          }
        }
      });

      // Initially, page 1 is visible, others are hidden via CSS, but let's make sure GSAP controls them
      pagesRefs.current.forEach((page, i) => {
        if (i !== 0) {
          gsap.set(page, { autoAlpha: 0, scale: 0.8, y: 100 });
        }
      });

      // Timeline for zoooop animations
      tl.to(pagesRefs.current[0], { autoAlpha: 0, scale: 1.2, y: -100, duration: 1, ease: "power2.inOut" })
        .to(pagesRefs.current[1], { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "power2.inOut" }, "-=0.5")
        .to({}, { duration: 0.5 }) 
        .to(pagesRefs.current[1], { autoAlpha: 0, scale: 1.2, y: -100, duration: 1, ease: "power2.inOut" })
        .to(pagesRefs.current[2], { autoAlpha: 1, scale: 1, y: 0, duration: 1, ease: "power2.inOut" }, "-=0.5")
        .to({}, { duration: 0.5 });

    }, sectionRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="h-screen flex flex-col justify-center relative bg-surface border-t border-white/5 overflow-hidden">
      
      {/* Absolute Background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[150px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 w-full text-center mb-12 relative z-10">
        <h2 className="text-5xl md:text-7xl font-mono font-black mb-4 uppercase tracking-tighter">
          My <span className="text-primary text-glow">Arsenal</span>
        </h2>
        <p className="text-text-muted text-lg md:text-xl max-w-2xl mx-auto font-light">
          A highly specialized, ever-expanding toolset for crafting next-generation digital experiences.
        </p>
      </div>
      
      <div className="relative w-full max-w-6xl mx-auto h-[450px] md:h-[350px] z-10 perspective-[1200px]" ref={containerRef}>
        
        {pages.map((pageGroup, i) => (
          <div 
            key={i} 
            ref={el => pagesRefs.current[i] = el}
            className="absolute inset-0 w-full h-full flex flex-col md:flex-row justify-center items-center gap-6 px-4"
          >
            {pageGroup.map((card, j) => (
              <div 
                key={j} 
                className="skill-card flex-1 w-full md:w-auto max-w-[320px] glass p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-all duration-300 shadow-2xl group flex flex-col items-center text-center transform-gpu"
              >
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  {card.icon}
                </div>
                <h3 className="text-xl md:text-2xl font-mono font-bold mb-6 text-white group-hover:text-primary transition-colors">
                  {card.title}
                </h3>
                <div className="flex flex-wrap justify-center gap-2 mt-auto">
                  {card.skills.map((skill, k) => (
                    <span 
                      key={k} 
                      className="px-3 py-1.5 text-xs md:text-sm font-medium bg-background border border-white/10 rounded-full text-text-muted group-hover:border-white/20 group-hover:text-white transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-10">
        {[0, 1, 2].map((dot) => (
          <div 
            key={dot} 
            className={`h-2 rounded-full transition-all duration-500 ${activePageIndex === dot ? 'w-8 bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>

    </section>
  );
};

export default Skills;
