import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  ExternalLink, 
  Trophy, 
  Award, 
  Globe, 
  Code2, 
  Cpu, 
  Server, 
  Terminal, 
  Languages, 
  Eye, 
  X, 
  ArrowUpRight 
} from 'lucide-react';

function GithubIcon({ size = 18, className = "" }) {
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

function LinkedinIcon({ size = 18, className = "" }) {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Experience() {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const skills = [
    {
      category: 'Frontend & Mobile',
      icon: <Code2 size={18} className="text-[#4884F5]" />,
      items: ['React', 'Next.js', 'Flutter', 'Three.js', 'WebGL']
    },
    {
      category: 'Backend & APIs',
      icon: <Server size={18} className="text-[#4884F5]" />,
      items: ['Node.js', 'FastAPI', 'Python', 'SQL', 'MongoDB', 'WebSockets', 'REST APIs']
    },
    {
      category: 'AI & Machine Learning',
      icon: <Cpu size={18} className="text-[#4884F5]" />,
      items: ['NLP', 'RAG', 'LLM Integration', 'Computer Vision', 'PyTorch', 'Model Deployment']
    },
    {
      category: 'Infrastructure & DevOps',
      icon: <Terminal size={18} className="text-[#4884F5]" />,
      items: ['Docker', 'VPS Management', 'Linux', 'Git', 'CI/CD Pipelines']
    }
  ];

  const languages = [
    { name: 'English', level: 'Advanced' },
    { name: 'Hindi', level: 'Advanced' },
    { name: 'Bengali', level: 'Proficient' },
    { name: 'Oriya', level: 'Proficient' },
    { name: 'Japanese', level: 'JLPT N2' }
  ];

  const honors = [
    {
      title: 'Winner — <Code 300/>',
      date: '02/2026',
      place: '1st Place (Solo)',
      organization: 'Arka Jain University Jamshedpur, India',
      details: 'Secured 1st place as a solo participant in a competitive coding sprint, completing all challenges with 100% efficiency.'
    },
    {
      title: 'Winners — IDS Hackathon 2026',
      date: '03/2026',
      place: '1st Place',
      organization: 'Yi and Yuva Regional Level',
      details: 'Achieved 1st place for designing a real-time technical solution to optimize regional logistics networks.'
    }
  ];

  return (
    <section id="resume" className="w-full bg-[#F9F9F9] pt-24 pb-32 px-6 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Section Header with Spring Reveal Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 50, damping: 18 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-black text-[#111111] tracking-tighter font-display uppercase drop-shadow-sm">
              My <span className="text-[#4884F5]">Resume</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-medium mt-3 max-w-2xl leading-relaxed">
              Full-stack product engineering, competitive accolades, and verified technical credentials.
            </p>
          </div>

          <a
            href="/assets/Resume ATS Final.pdf"
            download="Himadri_Shekhar_Resume.pdf"
            className="group inline-flex items-center gap-3 bg-[#4884F5] text-white px-8 py-4 rounded-full font-bold uppercase tracking-wider text-xs hover:bg-[#3570E4] transition-all shadow-lg shadow-[#4884F5]/25 shrink-0 cursor-pointer"
          >
            <Download size={18} />
            <span>Download Resume PDF</span>
            <ArrowUpRight size={18} className="group-hover:rotate-45 transition-transform duration-300" />
          </a>
        </motion.div>

        {/* Balanced Grid: Generous Resume Left (5 cols), Readable & Sleek Credentials Right (7 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* LEFT COLUMN: Clear, Well-Sized Resume Document Preview with Spring Entry */}
          <motion.div 
            initial={{ opacity: 0, x: -50, scale: 0.98 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ type: 'spring', stiffness: 50, damping: 18, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col"
          >
            <div className="w-full bg-white rounded-[2.2rem] p-5 sm:p-6 shadow-xl shadow-slate-200/60 border border-slate-200/90 relative group">
              {/* Subtle top accent line */}
              <div className="absolute top-0 left-10 right-10 h-[3px] bg-gradient-to-r from-transparent via-[#4884F5]/40 to-transparent" />

              {/* Resume Preview Frame with Comfortable Dimensions */}
              <div className="relative w-full rounded-[1.5rem] overflow-hidden bg-slate-50 border border-slate-200 shadow-inner">
                <img
                  src="/assets/resume_image.png"
                  alt="Himadri Shekhar Resume Preview"
                  className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                />

                {/* Hover overlay to expand */}
                <div 
                  onClick={() => setIsPreviewOpen(true)}
                  className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer backdrop-blur-[2px]"
                >
                  <div className="bg-white text-slate-900 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-xl flex items-center gap-2">
                    <Eye size={16} className="text-[#4884F5]" />
                    <span>Enlarge Resume</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons underneath resume */}
              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <a
                  href="/assets/Resume ATS Final.pdf"
                  download="Himadri_Shekhar_Resume.pdf"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#4884F5] hover:bg-[#3570E4] text-white py-3.5 px-6 rounded-full font-bold uppercase text-xs tracking-wider transition-all shadow-md shadow-[#4884F5]/25"
                >
                  <Download size={16} />
                  <span>Download PDF</span>
                </a>

                <a
                  href="/assets/Resume ATS Final.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3.5 px-6 rounded-full font-bold uppercase text-xs tracking-wider transition-colors"
                >
                  <span>Open PDF</span>
                  <ExternalLink size={15} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Staggered Entrance for Credentials */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } }
            }}
            className="lg:col-span-7 flex flex-col gap-5"
          >
            {/* Quick Profiles Header Bar */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 18 } }
              }}
              className="bg-white rounded-[1.8rem] py-3.5 px-6 shadow-md shadow-slate-200/40 border border-slate-200/90 flex flex-wrap items-center justify-between gap-3"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Verified Profiles:
              </span>
              <div className="flex flex-wrap items-center gap-2.5">
                <a
                  href="https://celi.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-[#4884F5] hover:text-white text-slate-700 font-semibold text-xs transition-colors"
                >
                  <Globe size={15} />
                  <span>celi.me</span>
                </a>

                <a
                  href="https://github.com/celicular"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-[#4884F5] hover:text-white text-slate-700 font-semibold text-xs transition-colors"
                >
                  <GithubIcon size={15} />
                  <span>github.com/celicular</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/himadrishekhar-goswami-59b631335/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 hover:bg-[#4884F5] hover:text-white text-slate-700 font-semibold text-xs transition-colors"
                >
                  <LinkedinIcon size={15} />
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </motion.div>

            {/* Honors & Hackathon Victories */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 18 } }
              }}
              className="bg-white rounded-[2rem] p-6 sm:p-7 shadow-xl shadow-slate-200/40 border border-slate-200/90"
            >
              <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-slate-100">
                <Trophy className="text-[#4884F5]" size={22} />
                <h3 className="text-lg sm:text-xl font-bold text-[#111111] uppercase tracking-wider font-display">
                  Honors & Hackathon Victories
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {honors.map((honor, i) => (
                  <div
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full bg-[#4884F5]/10 text-[#4884F5] font-bold text-xs uppercase tracking-wider">
                          {honor.place}
                        </span>
                        <span className="text-xs font-mono font-semibold text-slate-400">
                          {honor.date}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-[#111111] font-display mb-1">
                        {honor.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#4884F5] font-semibold mb-2">
                        {honor.organization}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed font-normal">
                        {honor.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Technical Expertise Matrix */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 18 } }
              }}
              className="bg-white rounded-[2rem] p-6 sm:p-7 shadow-xl shadow-slate-200/40 border border-slate-200/90"
            >
              <div className="flex items-center gap-3 mb-5 pb-3.5 border-b border-slate-100">
                <Award className="text-[#4884F5]" size={22} />
                <h3 className="text-lg sm:text-xl font-bold text-[#111111] uppercase tracking-wider font-display">
                  Technical Expertise Matrix
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {skills.map((skill, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col"
                  >
                    <div className="flex items-center gap-2 mb-2.5">
                      {skill.icon}
                      <span className="font-bold text-xs uppercase tracking-wider text-slate-800">
                        {skill.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {skill.items.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium text-xs shadow-xs"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Spoken Languages */}
            <motion.div 
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 18 } }
              }}
              className="bg-white rounded-[1.8rem] py-4 px-6 shadow-md shadow-slate-200/40 border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <Languages className="text-[#4884F5]" size={20} />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Languages:
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {languages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200/80"
                  >
                    <strong className="text-slate-900 font-bold">{lang.name}</strong>{' '}
                    <span className="text-slate-500 font-normal">({lang.level})</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Full Size Resume Image Modal Preview */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="fixed inset-0 bg-slate-900/75 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-4xl max-h-[90vh] bg-white rounded-[2rem] p-4 sm:p-6 shadow-2xl z-10 overflow-y-auto"
            >
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <img
                src="/assets/resume_image.png"
                alt="Enlarged Resume"
                className="w-full h-auto rounded-xl border border-slate-200"
              />

              <div className="mt-4 flex justify-end gap-3">
                <a
                  href="/assets/Resume ATS Final.pdf"
                  download="Himadri_Shekhar_Resume.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4884F5] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#3570E4] transition-all shadow-md shadow-[#4884F5]/25"
                >
                  <Download size={15} />
                  <span>Download PDF</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
