import { Github } from 'lucide-react';

const projects = [
  {
    title: "CensorAI",
    type: "AI / NLP Moderation System",
    tech: ["Python", "NLP", "Machine Learning", "Video Processing", "AI Moderation"],
    image: "/project/main.png",
    desc: "An AI-powered social media moderation prototype that detects and flags hate speech or offensive content in uploaded videos. Using Natural Language Processing and machine learning models, the system analyzes spoken and textual content in real time to maintain a safer online environment.",
    link: "https://github.com/Celicular/TechDx404-NLP-censorAI"
  },
  {
    title: "LetsLearn",
    type: "AI Learning Platform",
    tech: ["Python", "RAG", "Local LLM", "Vector Databases", "Document Processing"],
    image: "/project/1.png",
    desc: "An intelligent offline educational application that transforms documents into interactive learning tools. Built with Retrieval-Augmented Generation (RAG), it allows users to upload study materials and query them using AI—running completely locally without requiring internet access.",
    link: "https://github.com/Celicular/lets-learn"
  },
  {
    title: "Clarity ERP",
    type: "Enterprise Software",
    tech: ["Full Stack", "Monolithic Architecture", "Workflow Automation", "Database Systems"],
    image: "/project/2.png",
    desc: "An enterprise-grade ERP command center designed to centralize and automate workforce management. The platform replaces fragmented SaaS tools by providing a unified ecosystem for business operations, task orchestration, and data-driven decision making.",
    link: "https://github.com/Celicular/Clarity-ERP"
  },
  { 
    title: "Cap2Easy",
    type: "AI Video Tool",
    tech: ["Python", "OpenAI Whisper", "Speech Recognition", "GPU Acceleration", "Video Rendering"],
    image: "/project/3.png",
    desc: "A powerful video captioning system that automatically generates accurate subtitles using OpenAI Whisper speech recognition. It supports custom fonts, multilingual transcription, real-time preview, and GPU acceleration for fast high-quality caption rendering.",
    link: "https://github.com/Celicular/Celi-Cap2Easy"
  },
];

const MobileProjects = () => {
  return (
    <section id="projects" className="py-20 relative bg-surface border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-6">
        
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-mono font-black mb-4 uppercase tracking-tighter inline-block px-6 py-2 bg-primary/10 text-glow text-white">
            Personal <span className="text-primary">Projects</span>
          </h2>
          <p className="text-text-muted text-base mt-4 font-light">
            Passionate side-hustles, experiments, and open-source contributions.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          {projects.map((project, idx) => (
            <div key={idx} className="glass p-5 rounded-3xl border border-white/10 shadow-2xl relative flex flex-col">
              
              {/* Image Preview */}
              <div className="relative overflow-hidden aspect-video rounded-2xl mb-6 shadow-xl border border-white/10">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Data */}
              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary rounded-full border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    {project.type}
                  </span>
                </div>

                <h3 className="text-3xl font-black font-mono text-white mb-4 tracking-tight leading-none">
                  {project.title}
                </h3>
                
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  {project.desc}
                </p>

                {/* Tech Stack */}
                <div className="mb-8">
                  <h4 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">Tech Stack</h4>
                  <div className="flex flex-wrap items-start gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <div className="mt-auto pt-4 border-t border-white/10">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-bold rounded-xl active:bg-white active:text-background transition-colors shadow-lg shadow-primary/20">
                    <Github size={18} /> View on GitHub
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Global Projects CTA */}
        <div className="mt-20 flex flex-col items-center justify-center text-center px-4">
          <div className="w-16 h-[1px] bg-primary/30 mb-8"></div>
          <h4 className="text-xl font-mono font-bold text-white mb-6">
            Intrigued by my <span className="text-primary">Source Code</span>?
          </h4>
          <a 
            href="https://github.com/celicular" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl active:border-primary/50 transition-all shadow-lg shadow-black/20"
          >
            <Github className="text-primary" size={20} />
            <span className="text-white text-sm font-bold uppercase tracking-widest">Explore More on GitHub</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default MobileProjects;
