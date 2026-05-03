import { useState, useEffect } from 'react';
import { Github } from 'lucide-react';
import { parseImageUrl } from '../utils/imageUtils';

const MobileProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/projects')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load projects');
        return r.json();
      })
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load project data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-24 relative bg-surface border-t border-white/5 flex flex-col items-center justify-center min-h-[50vh] gap-4">
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
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 relative bg-surface border-t border-white/5 flex items-center justify-center min-h-[50vh]">
        <p className="text-red-400 font-mono text-sm">{error}</p>
      </section>
    );
  }

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
            <div key={project.id || idx} className="glass p-5 rounded-3xl border border-white/10 shadow-2xl relative flex flex-col">
              
              {/* Image Preview */}
              <div className="relative overflow-hidden aspect-video rounded-2xl mb-6 shadow-xl border border-white/10">
                <img 
                  src={parseImageUrl(project.image)} 
                  alt={project.title} 
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent opacity-30 pointer-events-none rounded-2xl" />
                {project.under_development && (
                  <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-amber-500/90 text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg backdrop-blur-md">
                    Under Development
                  </div>
                )}
              </div>

              {/* Data */}
              <div className="flex flex-col flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/20 text-primary rounded-full border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                    {project.type}
                  </span>
                  {project.under_development && (
                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                      Under Development
                    </span>
                  )}
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
                    {(project.tech || []).map(t => (
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
