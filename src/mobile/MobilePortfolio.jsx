import { useState, useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { parseImageUrl } from '../utils/imageUtils';

const MobilePortfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/portfolio')
      .then((r) => {
        if (!r.ok) throw new Error('Failed to load portfolio');
        return r.json();
      })
      .then((data) => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load portfolio data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="py-20 relative bg-background flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
        <p className="text-text-muted text-sm font-mono">Loading portfolio…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 relative bg-background flex items-center justify-center min-h-[50vh]">
        <p className="text-red-400 font-mono text-sm">{error}</p>
      </section>
    );
  }

  return (
    <section id="portfolio" className="py-20 relative overflow-hidden bg-background flex flex-col">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] bg-primary/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* Header */}
      <div className="container mx-auto px-6 relative z-10 mb-10 text-center">
        <h2 className="text-4xl font-mono font-black uppercase tracking-tighter">
          Professional <span className="text-primary text-glow">Portfolio</span>
        </h2>
        <p className="text-text-muted text-base mt-4 font-light">
          A showcase of my enterprise-grade work bridging design and functional reality.
        </p>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col gap-10">
        {portfolio.map((project, idx) => (
          <div key={project.id || idx} className="flex flex-col glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            
            {/* Image section */}
            <div className="w-full aspect-video relative">
              <img 
                src={parseImageUrl(project.image)} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-80"></div>
              {project.under_development && (
                <div className="absolute top-4 right-4 z-20 px-3 py-1.5 bg-amber-500/90 text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-lg backdrop-blur-md">
                  Under Development
                </div>
              )}
            </div>

            {/* Content section */}
            <div className="p-6 relative z-10 -mt-[100px] pt-0 flex flex-col">
               <div className="flex flex-wrap gap-2 mb-3">
                 <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-primary/30 text-white rounded-full border border-primary/50 shadow-sm backdrop-blur-md">
                   {project.category}
                 </span>
                 {project.under_development && (
                   <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/30 shadow-sm backdrop-blur-md">
                     Under Development
                   </span>
                 )}
               </div>
               <h3 className="text-2xl font-black font-mono text-white tracking-tight leading-none mb-3 drop-shadow-md">
                 {project.title}
               </h3>
               <p className="text-text-muted text-sm leading-relaxed mb-6">
                 {project.desc}
               </p>
               <a href={project.link} target="_blank" rel="noopener noreferrer" className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 bg-primary text-white text-sm font-bold rounded-xl active:bg-white active:text-background transition-colors shadow-lg shadow-primary/20">
                 View Details <ExternalLink size={16} />
               </a>
            </div>

          </div>
        ))}
      </div>
    </section>
  );
};

export default MobilePortfolio;
