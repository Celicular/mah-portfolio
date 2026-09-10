import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { resolveImageUrl, processApiItems } from '../utils/imageHelper';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.celi.me';

function Github({ size = 18, className = "" }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const initialProjects = [
  {
    id: "proj-1",
    title: "CensorAI",
    type: "AI / NLP Moderation System",
    tech: ["Python", "NLP", "Machine Learning", "Video Processing", "AI Moderation"],
    image: "/project/main.png",
    desc: "An AI-powered social media moderation prototype that detects and flags hate speech or offensive content in uploaded videos. Using Natural Language Processing and machine learning models, the system analyzes spoken and textual content in real time to maintain a safer online environment.",
    link: "https://github.com/Celicular/TechDx404-NLP-censorAI",
    order: 0,
    under_development: false
  },
  {
    id: "proj-2",
    title: "LetsLearn",
    type: "AI Learning Platform",
    tech: ["Python", "RAG", "Local LLM", "Vector Databases", "Document Processing"],
    image: "/project/1.png",
    desc: "An intelligent offline educational application that transforms documents into interactive learning tools. Built with Retrieval-Augmented Generation (RAG), it allows users to upload study materials and query them using AI—running completely locally without requiring internet access.",
    link: "https://github.com/Celicular/lets-learn",
    order: 1,
    under_development: false
  },
  {
    id: "proj-3",
    title: "Clarity ERP",
    type: "Enterprise Software",
    tech: ["Full Stack", "Monolithic Architecture", "Workflow Automation", "Database Systems"],
    image: "/project/2.png",
    desc: "An enterprise-grade ERP command center designed to centralize and automate workforce management. The platform replaces fragmented SaaS tools by providing a unified ecosystem for business operations, task orchestration, and data-driven decision making.",
    link: "https://github.com/Celicular/Clarity-ERP",
    order: 2,
    under_development: false
  },
  {
    id: "proj-4",
    title: "Cap2Easy",
    type: "AI Video Tool",
    tech: ["Python", "OpenAI Whisper", "Speech Recognition", "GPU Acceleration", "Video Rendering"],
    image: "/project/3.png",
    desc: "A powerful video captioning system that automatically generates accurate subtitles using OpenAI Whisper speech recognition. It supports custom fonts, multilingual transcription, real-time preview, and GPU acceleration for fast high-quality caption rendering.",
    link: "https://github.com/Celicular/Celi-Cap2Easy",
    order: 3,
    under_development: false
  }
];

export default function Projects() {
  const [projects, setProjects] = useState(initialProjects);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const visible = processApiItems(data);
          setProjects(visible);
        }
      })
      .catch((err) => {
        console.warn('Using seeded projects data:', err.message);
      });
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 50, damping: 18 }
    }
  };

  return (
    <section id="projects" className="w-full bg-[#F9F9F9] py-24 px-6 overflow-hidden relative">
      {/* Decorative background vectors */}
      <div className="absolute top-24 right-12 text-[#4884F5] opacity-15 hidden xl:block pointer-events-none">
        <svg width="140" height="140" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="50" cy="50" r="45" strokeDasharray="4 4" />
          <circle cx="50" cy="50" r="25" />
          <line x1="50" y1="5" x2="50" y2="95" />
          <line x1="5" y1="50" x2="95" y2="50" />
        </svg>
      </div>
      <div className="absolute bottom-20 left-10 text-slate-300 opacity-30 hidden lg:block pointer-events-none">
        <div className="grid grid-cols-4 gap-3">
          {[...Array(16)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          ))}
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Section Header with Spring Entrance Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 50, damping: 18 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-black text-[#111111] tracking-tighter font-display uppercase drop-shadow-sm">
              Notable <span className="text-[#4884F5]">Projects</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-medium mt-4 max-w-2xl leading-relaxed">
              Open-source software, intelligent AI tools, and enterprise platforms engineered for production.
            </p>
          </div>

          <a
            href="https://github.com/Celicular"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-[#111111] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-[#4884F5] transition-all shadow-lg hover:shadow-[#4884F5]/25 shrink-0"
          >
            <Github size={18} />
            <span>Explore All GitHub</span>
            <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.id || idx}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="group bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200/90 shadow-xl shadow-slate-200/50 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
            >
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-12 right-12 h-[3px] bg-gradient-to-r from-transparent via-[#4884F5]/40 to-transparent" />

              <div>
                {/* Header Meta Row */}
                <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <span className="font-display font-black text-2xl text-[#4884F5] tracking-tight">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-xs uppercase font-bold tracking-widest text-slate-500">
                      {project.type}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    {project.under_development ? (
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                        In Development
                      </span>
                    ) : (
                      <div className="flex items-center gap-2 bg-slate-100/80 px-3 py-1 rounded-full text-xs font-semibold text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>Active</span>
                      </div>
                    )}

                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center hover:bg-[#4884F5] hover:text-white transition-colors"
                        title="GitHub Repository"
                      >
                        <Github size={18} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Screenshot / Visual Preview (16:9 Aspect Ratio) */}
                {project.image && (
                  <div className="w-full aspect-video rounded-[1.8rem] overflow-hidden mb-6 bg-slate-100 border border-slate-100 relative group/img shadow-sm">
                    <img
                      src={resolveImageUrl(project.image)}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      onError={(e) => {
                        e.currentTarget.parentElement.style.display = 'none';
                      }}
                    />
                  </div>
                )}

                {/* Title & Description */}
                <h3 className="text-3xl md:text-4xl font-black text-[#111111] font-display mb-4 tracking-tight group-hover:text-[#4884F5] transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
                  {project.desc}
                </p>
              </div>

              {/* Tech Stack & Action Footer */}
              <div>
                {Array.isArray(project.tech) && project.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((item, i) => (
                      <span
                        key={i}
                        className="px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/70 text-slate-700 text-xs font-bold tracking-wide"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {project.link && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#4884F5] group-hover:text-[#3570E4] transition-colors"
                    >
                      <span>Inspect Repository</span>
                      <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                      GitHub Source
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
