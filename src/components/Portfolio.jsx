import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseImageUrl } from '../utils/imageUtils';

gsap.registerPlugin(ScrollTrigger);

const Portfolio = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch portfolio data from API
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

  // GSAP scroll-driven slider — runs after data is ready
  useEffect(() => {
    if (portfolio.length === 0) return;

    let ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.portfolio-slide');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => '+=' + window.innerWidth * slides.length,
          onUpdate: (self) => {
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * slides.length),
              slides.length - 1
            );
            setActiveIndex(index);
          },
        },
      });

      tl.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: 'none',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [portfolio]);

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="h-screen w-full flex flex-col items-center justify-center bg-background gap-4">
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

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <section className="h-screen w-full flex items-center justify-center bg-background">
        <p className="text-red-400 font-mono text-sm">{error}</p>
      </section>
    );
  }

  const activeProject = portfolio[activeIndex] ?? {};

  return (
    <section
      ref={containerRef}
      id="portfolio"
      className="h-screen w-full relative overflow-hidden bg-background flex flex-col pt-20 pb-10"
    >
      {/* Background blob */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 blur-[100px] rounded-full pointer-events-none z-0" />

      {/* Header */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 shrink-0 mb-6">
        <h2 className="text-4xl md:text-5xl font-mono font-black uppercase tracking-tighter">
          Professional <span className="text-primary text-glow">Portfolio</span>
        </h2>
        <p className="text-text-muted text-lg max-w-2xl mt-2 border-l-2 border-primary/50 pl-4">
          A showcase of my enterprise-grade work bridging the gap between exceptional design and functional reality.
        </p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10 container mx-auto px-6 max-w-7xl overflow-hidden gap-6">

        {/* Horizontal Image Slider */}
        <div className="flex-1 w-full relative overflow-hidden group">
          <div
            ref={sliderRef}
            className="flex h-full"
            style={{ width: `${portfolio.length * 100}%` }}
          >
            {portfolio.map((project, idx) => (
              <div
                key={project.id ?? idx}
                className="portfolio-slide h-full flex-shrink-0 flex items-center justify-center p-2 md:p-4"
                style={{ width: `${100 / portfolio.length}%` }}
              >
                <div className="h-full w-auto aspect-video relative rounded-3xl overflow-hidden glass shadow-2xl border border-white/10 max-w-full">
                  <img
                    src={parseImageUrl(project.image)}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-60" />
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

        {/* Sticky Description Box */}
        <div className="h-[28vh] md:h-[30vh] shrink-0 w-full relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 glass p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl flex flex-col md:flex-row gap-4 md:gap-10 overflow-hidden"
            >
              {/* Left */}
              <div className="md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
                  <span className="px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-primary/20 text-primary rounded-full border border-primary/30 w-max">
                    {activeProject.category}
                  </span>
                  {activeProject.under_development && (
                    <span className="px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-amber-500/20 text-amber-500 rounded-full border border-amber-500/30 w-max">
                      Under Development
                    </span>
                  )}
                </div>
                <h3 className="text-2xl md:text-4xl font-black font-mono text-white tracking-tight leading-none">
                  {activeProject.title}
                </h3>
              </div>

              {/* Right */}
              <div className="md:w-2/3 flex flex-col justify-center">
                <p className="text-text-muted text-sm md:text-base leading-relaxed mb-4 line-clamp-3 md:line-clamp-none">
                  {activeProject.desc}
                </p>
                <a
                  href={activeProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-sm md:text-base font-bold rounded-xl hover:bg-white hover:text-background transition-colors duration-300 shadow-lg shadow-primary/20 w-fit"
                >
                  View Project Details <ExternalLink size={16} />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Portfolio;
