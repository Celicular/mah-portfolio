import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github } from 'lucide-react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { parseImageUrl } from '../utils/imageUtils';
import api from '../utils/axios';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const containerRef = useRef(null);
  const rightPanelsRef = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch projects from API
  useEffect(() => {
    api.get('/api/projects')
      .then((res) => {
        setProjects(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load project data.');
        setLoading(false);
      });
  }, []);

  // GSAP scroll triggers — runs after data is ready
  useEffect(() => {
    if (projects.length === 0) return;

    const ctx = gsap.context(() => {
      rightPanelsRef.current.forEach((panel, index) => {
        if (!panel) return;

        ScrollTrigger.create({
          trigger: panel,
          start: 'top 80%',
          end: 'bottom 20%',
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });

        const img = panel.querySelector('img');
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.2, filter: 'brightness(0.5) blur(5px)' },
            {
              scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'center center',
                scrub: 1,
              },
              scale: 1,
              filter: 'brightness(1) blur(0px)',
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="py-24 relative bg-surface border-t border-white/5 flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full bg-primary animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
          <p className="text-text-muted text-sm font-mono">Loading projects…</p>
        </div>
      </section>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <section className="py-24 relative bg-surface border-t border-white/5 flex items-center justify-center min-h-[50vh]">
        <p className="text-red-400 font-mono text-sm">{error}</p>
      </section>
    );
  }

  const activeProject = projects[activeIndex] ?? {};

  return (
    <section ref={containerRef} id="projects" className="py-24 relative bg-surface border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl">

        <div className="mb-16 md:mb-24">
          <h2 className="text-5xl md:text-6xl font-mono font-black mb-4 uppercase tracking-tighter inline-block px-8 py-4 bg-primary/10 text-glow text-white">
            Personal <span className="text-primary">Projects</span>
          </h2>
          <p className="text-text-muted text-xl max-w-2xl mt-4 border-l-2 border-primary/50 pl-4">
            Passionate side-hustles, experiments, and open-source contributions.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24 relative items-start">

          {/* Left Sidebar — Sticky */}
          <div className="w-full md:w-5/12 sticky top-32 z-20 flex flex-col pt-10">
            <div className="glass p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-500">

              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[60px] -z-10" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Badge */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-primary/20 text-primary rounded-full border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                      {activeProject.type}
                    </span>
                    {activeProject.under_development && (
                      <span className="px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                        Under Development
                      </span>
                    )}
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-4xl md:text-5xl font-black font-mono text-white mb-6 tracking-tight leading-none">
                    {activeProject.title}
                  </h3>
                  <p className="text-text-muted text-lg leading-relaxed mb-8 min-h-[120px]">
                    {activeProject.desc}
                  </p>

                  {/* Tech Stack */}
                  <div className="mb-10">
                    <h4 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Tech Stack utilized</h4>
                    <div className="flex flex-wrap items-start gap-2 min-h-[70px]">
                      {(activeProject.tech ?? []).map((t) => (
                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs md:text-sm text-text-muted hover:text-white transition-colors cursor-default">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={activeProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-white hover:text-background transition-colors duration-300 shadow-lg shadow-primary/20"
                    >
                      <Github size={18} /> View on GitHub
                    </a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Right Side — Scrolling Images */}
          <div className="w-full md:w-7/12 flex flex-col gap-[30vh] pb-[40vh] pt-10">
            {projects.map((project, idx) => (
              <div
                key={project.id ?? idx}
                ref={(el) => (rightPanelsRef.current[idx] = el)}
                className="w-full"
              >
                <div className="relative overflow-hidden aspect-video rounded-3xl shadow-2xl glass border border-white/10 group cursor-pointer block">
                  <div className="absolute top-4 left-4 z-20 px-4 py-1 bg-background/80 backdrop-blur-md rounded-full border border-white/10 text-xs font-mono font-bold text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity">
                    0{idx + 1} — {project.title}
                  </div>
                  <img
                    src={parseImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-3xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />
                  {project.under_development && (
                    <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-amber-500/90 text-black text-[10px] md:text-xs font-bold uppercase tracking-widest rounded-full shadow-lg backdrop-blur-md">
                      Under Development
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Global CTA */}
        <div className="mt-24 md:mt-32 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-[1px] bg-primary/30 mb-8" />
          <h4 className="text-2xl md:text-3xl font-mono font-bold text-white mb-6">
            Intrigued by my <span className="text-primary">Source Code</span>?
          </h4>
          <a
            href="https://github.com/celicular"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-4 px-10 py-5 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <Github className="text-primary group-hover:scale-110 transition-transform" size={24} />
            <span className="text-white text-lg font-bold tracking-tight">Explore More Repositories</span>
            <ExternalLink className="text-text-muted group-hover:text-white transition-colors" size={18} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Projects;
