import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const portfolio = [
  {
    title: "Cruise Booking Desk",
    category: "React & PostgreSQL",
    image: "/portfolio/2.png",
    desc: "A large-scale cruise travel booking platform built with React and PostgreSQL, designed for high performance, seamless navigation, and real-time travel package management.",
    link: "https://cruisebookingdesk.com"
  },
  {
    title: "Book Holiday Rental",
    category: "React & PHP",
    image: "/portfolio/1.png",
    desc: "A vacation rental marketplace enabling property listings, booking inquiries, and dynamic property management. Built with React and PHP for reliable server-side functionality.",
    link: "https://bookholidayrental.com"
  },
  {
    title: "340 Real Estate",
    category: "Next.js & PostgreSQL",
    image: "/portfolio/3.png",
    desc: "A modern real estate platform powered by Next.js and PostgreSQL, featuring dynamic property listings, optimized performance, and scalable backend infrastructure.",
    link: "https://340realestate.com"
  },
  {
    title: "Algharbiaco",
    category: "React & PHP",
    image: "/portfolio/6.png",
    desc: "An international corporate website developed for a global client, delivering a professional digital presence with modern UI design and reliable backend integration.",
    link: "https://algharbiaco.com"
  },
  {
    title: "Australia Vacation Rental",
    category: "React + Vite & PHP",
    image: "/portfolio/4.png",
    desc: "A fast and scalable vacation rental platform built using React with Vite and PHP, optimized for property discovery, booking inquiries, and seamless user experience.",
    link: "https://australiavacationrental.com"
  },
  {
    title: "New Zealand Stays",
    category: "React + Vite & PHP",
    image: "/portfolio/5.png",
    desc: "A property rental platform tailored for the New Zealand market, featuring responsive UI, efficient property listings, and fast performance powered by React, Vite, and PHP.",
    link: "https://newzealandstays.com"
  }
];

const Portfolio = () => {
  const containerRef = useRef(null);
  const sliderRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const slides = gsap.utils.toArray('.portfolio-slide');
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => "+=" + (window.innerWidth * slides.length), // Scale scroll distance with number of items
          onUpdate: (self) => {
            // Calculate active index based on scroll progress
            const progress = self.progress;
            const index = Math.min(
              Math.floor(progress * slides.length),
              slides.length - 1
            );
            setActiveIndex(index);
          }
        }
      });

      tl.to(slides, {
        xPercent: -100 * (slides.length - 1),
        ease: "none",
      });

    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  const activeProject = portfolio[activeIndex];

  return (
    <section ref={containerRef} id="portfolio" className="h-screen w-full relative overflow-hidden bg-background flex flex-col pt-20 pb-10">
      {/* Background blobs for morphing aesthetics */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 blur-[100px] rounded-full pointer-events-none z-0"></div>

      {/* Header */}
      <div className="container mx-auto px-6 max-w-7xl relative z-10 shrink-0 mb-6">
        <h2 className="text-4xl md:text-5xl font-mono font-black uppercase tracking-tighter">
          Professional <span className="text-primary text-glow">Portfolio</span>
        </h2>
        <p className="text-text-muted text-lg max-w-2xl mt-2 border-l-2 border-primary/50 pl-4">
          A showcase of my enterprise-grade work bridging the gap between exceptional design and functional reality.
        </p>
      </div>

      {/* Main Content Area: Top (Images Slider) & Bottom (Sticky Description) */}
      <div className="flex-1 flex flex-col relative z-10 container mx-auto px-6 max-w-7xl overflow-hidden gap-6">
        
        {/* Top: Horizontal Image Slider */}
        <div className="flex-1 w-full relative overflow-hidden group">
          <div 
            ref={sliderRef} 
            className="flex h-full"
            style={{ width: `${portfolio.length * 100}%` }}
          >
            {portfolio.map((project, idx) => (
              <div 
                key={idx} 
                className="portfolio-slide h-full flex-shrink-0 flex items-center justify-center p-2 md:p-4"
                style={{ width: `${100 / portfolio.length}%` }}
              >
                  <div className="h-full w-auto aspect-video relative rounded-3xl overflow-hidden glass shadow-2xl border border-white/10 max-w-full">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-60"></div>
                  </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Sticky Description Box */}
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
              {/* Left Column in Description */}
              <div className="md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-6">
                <span className="px-4 py-1.5 text-[10px] md:text-xs font-bold uppercase tracking-widest bg-primary/20 text-primary rounded-full border border-primary/30 w-max mb-3 md:mb-4">
                  {activeProject.category}
                </span>
                <h3 className="text-2xl md:text-4xl font-black font-mono text-white tracking-tight leading-none">
                  {activeProject.title}
                </h3>
              </div>

              {/* Right Column in Description */}
              <div className="md:w-2/3 flex flex-col justify-center">
                <p className="text-text-muted text-sm md:text-base leading-relaxed mb-4 line-clamp-3 md:line-clamp-none">
                  {activeProject.desc}
                </p>
                <div>
                  <a href={activeProject.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-white text-sm md:text-base font-bold rounded-xl hover:bg-white hover:text-background transition-colors duration-300 shadow-lg shadow-primary/20 w-fit">
                    View Project Details <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
      </div>
    </section>
  );
};

export default Portfolio;
