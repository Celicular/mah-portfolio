import { Code, Layout, Server, Database, Box, Terminal, Wrench, Brain, Lightbulb } from 'lucide-react';

const pages = [
  { title: "Core Languages", icon: <Code className="w-5 h-5 text-primary" />, skills: ["Python", "JavaScript", "C++", "Java"] },
  { title: "Frontend Arch.", icon: <Layout className="w-5 h-5 text-primary" />, skills: ["React", "Next.js", "Tailwind", "CSS"] },
  { title: "Backend Systems", icon: <Server className="w-5 h-5 text-primary" />, skills: ["Node.js", "Express.js", "PHP"] },
  { title: "Database Design", icon: <Database className="w-5 h-5 text-primary" />, skills: ["MySQL", "PostgreSQL", "MongoDB"] },
  { title: "3D & Animation", icon: <Box className="w-5 h-5 text-primary" />, skills: ["Three.js", "GSAP", "Framer"] },
  { title: "DevOps", icon: <Terminal className="w-5 h-5 text-primary" />, skills: ["Linux", "Git", "Docker", "Vercel"] },
  { title: "Workflow", icon: <Wrench className="w-5 h-5 text-primary" />, skills: ["VS Code", "Postman", "Figma"] },
  { title: "AI / ML", icon: <Brain className="w-5 h-5 text-primary" />, skills: ["LLMs", "Prompt Eng.", "Basic ML"] },
  { title: "Soft Skills", icon: <Lightbulb className="w-5 h-5 text-primary" />, skills: ["Agile", "Problem Solving", "UI/UX"] }
];

const MobileSkills = () => {
  return (
    <section id="skills" className="py-20 relative bg-surface border-t border-white/5 overflow-hidden">
      
      {/* Absolute Background element */}
      <div className="absolute top-0 w-full h-[60vw] bg-primary/10 rounded-full blur-[100px] pointer-events-none z-0"></div>

      <div className="container mx-auto px-4 w-full text-center mb-10 relative z-10">
        <h2 className="text-4xl font-mono font-black mb-4 uppercase tracking-tighter">
          My <span className="text-primary text-glow">Arsenal</span>
        </h2>
        <p className="text-text-muted text-base max-w-sm mx-auto font-light">
          A highly specialized toolset for crafting next-generation digital experiences.
        </p>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pages.map((card, j) => (
            <div 
              key={j} 
              className="skill-card w-full glass p-5 rounded-2xl border border-white/10 shadow-lg flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                {card.icon}
              </div>
              <h3 className="text-lg font-mono font-bold mb-4 text-white">
                {card.title}
              </h3>
              <div className="flex flex-wrap justify-center gap-2 mt-auto">
                {card.skills.map((skill, k) => (
                  <span 
                    key={k} 
                    className="px-2 py-1 text-xs font-medium bg-background border border-white/10 rounded-md text-text-muted"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default MobileSkills;
