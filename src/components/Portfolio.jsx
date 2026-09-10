import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, ArrowUpRight, X, ChevronDown, ChevronUp } from 'lucide-react';
import { resolveImageUrl, processApiItems } from '../utils/imageHelper';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.celi.me';

const fallbackImages = [
  '/assets/projects/project_zenith_1783000074897.png',
  '/assets/projects/project_cyber_1783000065396.png',
  '/assets/projects/project_fashion_1783000053813.png',
  '/assets/projects/project_gym_1783000024407.png',
  '/assets/projects/project_beverage_1783000041641.png',
  '/assets/projects/project_database_1783000083778.png'
];

const initialPortfolio = [
  {
    id: "port-3",
    title: "340 Real Estate",
    category: "Next.js & PostgreSQL",
    image: "/portfolio/3.png",
    desc: "A modern real estate platform powered by Next.js and PostgreSQL, featuring dynamic property listings, optimized performance, and scalable backend infrastructure.",
    link: "https://340realestate.com",
    order: 0,
    under_development: false
  },
  {
    id: "port-4",
    title: "Algharbiaco",
    category: "React & PHP",
    image: "/portfolio/6.png",
    desc: "An international corporate website developed for a global client, delivering a professional digital presence with modern UI design and reliable backend integration.",
    link: "https://algharbiaco.com",
    order: 1,
    under_development: false
  },
  {
    id: "port-2",
    title: "Book Holiday Rental",
    category: "React & PHP",
    image: "/portfolio/1.png",
    desc: "A vacation rental marketplace enabling property listings, booking inquiries, and dynamic property management. Built with React and PHP for reliable server-side functionality.",
    link: "https://bookholidayrental.com",
    order: 2,
    under_development: false
  },
  {
    id: "d03ba7dc-a4b0-43d3-9c8b-35a6cdbd8cea",
    title: "Gayathri Sarees",
    category: "React + PHP + Elementor",
    image: "https://res.cloudinary.com/dkq58sjyy/image/upload/v1777811371/gayathri_xjjekh.png",
    desc: "Gayathri Sarees is an online platform offering a wide range of traditional and designer sarees, curated by Gayathri Reddy with high-performance responsive shopping.",
    link: "https://gayathrisarees.com/",
    order: 3,
    under_development: false
  },
  {
    id: "port-1",
    title: "Cruise Booking Desk",
    category: "React & PostgreSQL",
    image: "/portfolio/2.png",
    desc: "A large-scale cruise travel booking platform built with React and PostgreSQL, designed for high performance, seamless navigation, and real-time travel package management.",
    link: "https://cruisebookingdesk.com",
    order: 4,
    under_development: false
  },
  {
    id: "port-5",
    title: "Australia Vacation Rental",
    category: "React + Vite & PHP",
    image: "/portfolio/4.png",
    desc: "A fast and scalable vacation rental platform built using React with Vite and PHP, optimized for property discovery, booking inquiries, and seamless user experience.",
    link: "https://australiavacationrental.com",
    order: 5,
    under_development: true
  },
  {
    id: "port-6",
    title: "New Zealand Stays",
    category: "React + Vite & PHP",
    image: "/portfolio/5.png",
    desc: "A property rental platform tailored for the New Zealand market, featuring responsive UI, efficient property listings, and fast performance powered by React, Vite, and PHP.",
    link: "https://newzealandstays.com",
    order: 6,
    under_development: true
  }
];

export default function Portfolio() {
  const [projects, setProjects] = useState(initialPortfolio);
  const [[currentIndex, direction], setPage] = useState([0, 0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portfolio`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch portfolio');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const visible = processApiItems(data);
          setProjects(visible);
        }
      })
      .catch((err) => {
        console.warn('Using seeded portfolio data:', err.message);
      });
  }, []);

  const total = projects.length;

  const paginate = (newDirection) => {
    if (total === 0) return;
    setIsExpanded(false);
    setPage([(currentIndex + newDirection + total) % total, newDirection]);
  };

  const goToSlide = (targetIndex) => {
    if (targetIndex === currentIndex) return;
    setIsExpanded(false);
    const newDir = targetIndex > currentIndex ? 1 : -1;
    setPage([targetIndex, newDir]);
  };

  const currentProject = projects[currentIndex] || projects[0] || initialPortfolio[0];

  const getTags = (item) => {
    if (!item) return [];
    if (Array.isArray(item.tags)) return item.tags;
    if (item.category) {
      return item.category
        .split(/[&+,]/)
        .map((t) => t.trim())
        .filter(Boolean);
    }
    return ['Web App'];
  };

  const getImageSrc = (item, idx) => {
    if (!item) return fallbackImages[0];
    const resolved = resolveImageUrl(item.image);
    if (resolved) return resolved;
    return fallbackImages[idx % fallbackImages.length];
  };

  const imageVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (dir) => ({
      x: dir < 0 ? 60 : -60,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 260, damping: 28 },
        opacity: { duration: 0.25 },
        scale: { duration: 0.25 }
      }
    })
  };

  const textVariants = {
    enter: (dir) => ({
      y: dir > 0 ? 25 : -25,
      opacity: 0
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    exit: (dir) => ({
      y: dir < 0 ? 25 : -25,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    })
  };

  const handleDragEnd = (e, { offset, velocity }) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -100 || offset.x < -60) {
      paginate(1);
    } else if (swipe > 100 || offset.x > 60) {
      paginate(-1);
    }
  };

  const tags = getTags(currentProject);
  const currentImg = getImageSrc(currentProject, currentIndex);
  const isLongDesc = Boolean(currentProject?.desc && (currentProject.desc.length > 130 || currentProject.desc.includes('\n')));

  return (
    <section id="portfolio" className="w-full bg-[#F9F9F9] pt-24 pb-32 px-6 overflow-hidden relative">
      {/* Decorative ambient elements */}
      <div className="absolute top-28 left-8 text-[#4884F5] opacity-15 hidden lg:block pointer-events-none">
        <svg width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" />
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      </div>
      <div className="absolute top-16 right-16 text-slate-300 hidden xl:block pointer-events-none">
        <svg width="110" height="110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        {/* Section Header with Spring Entrance Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 50, damping: 18 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 lg:mb-16 gap-6"
        >
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-[#111111] tracking-tighter font-display leading-[1.05] max-w-2xl">
              Let's Have a Look at my <span className="text-[#4884F5]">Portfolio</span>
            </h2>
            <p className="text-slate-600 text-lg md:text-xl font-medium mt-4 max-w-xl">
              Production client solutions and web platforms engineered for business impact.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById('projects');
                if (el) {
                  if (window.lenis) {
                    window.lenis.scrollTo(el, { offset: -40, duration: 1.5 });
                  } else {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }
              }}
              className="group flex items-center justify-center gap-3 bg-[#4884F5] px-8 py-4 rounded-full text-white font-bold tracking-widest uppercase hover:bg-[#3570E4] transition-all shadow-lg shadow-[#4884F5]/25 shrink-0 cursor-pointer"
            >
              <span>See Notable Projects</span>
              <ArrowUpRight size={20} className="group-hover:rotate-45 transition-transform duration-300" />
            </button>
          </div>
        </motion.div>

        {/* Main Interactive Showcase Card: Spring Entrance Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 70, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 50, damping: 18, delay: 0.1 }}
          className="relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-6 sm:p-8 lg:p-12 border border-slate-200/90 shadow-2xl shadow-slate-200/60 overflow-hidden"
        >
          {/* Subtle top brand accent line */}
          <div className="absolute top-0 left-12 right-12 h-[3px] bg-gradient-to-r from-transparent via-[#4884F5]/50 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center min-h-[460px] lg:h-[500px]">
            {/* LEFT COLUMN: Animated Image Showcase */}
            <div className="lg:col-span-7 relative w-full h-[300px] sm:h-[380px] lg:h-full rounded-[2rem] md:rounded-[2.8rem] overflow-hidden bg-slate-100 border border-slate-200/80 shadow-inner group">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentProject.id || currentIndex}
                  custom={direction}
                  variants={imageVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={handleDragEnd}
                  className="w-full h-full cursor-grab active:cursor-grabbing relative"
                >
                  <img
                    src={currentImg}
                    alt={currentProject.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImages[currentIndex % fallbackImages.length];
                    }}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Status Badge */}
              <div className="absolute top-5 left-5 z-20 pointer-events-none">
                {currentProject.under_development ? (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-white shadow-lg shadow-amber-500/30">
                    Under Development
                  </span>
                ) : (
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    Live Production
                  </span>
                )}
              </div>

              {/* Index Watermark in Corner */}
              <div className="absolute bottom-5 right-5 z-20 pointer-events-none bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-mono font-bold tracking-wider border border-white/20">
                {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </div>
            </div>

            {/* RIGHT COLUMN: Project Details & Controls with Restricted Container Size */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full py-2 lg:py-4 overflow-hidden">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentProject.id || currentIndex}
                  custom={direction}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col overflow-hidden"
                >
                  {/* Category Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-xs font-bold font-mono text-[#4884F5] bg-[#4884F5]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      Project #{String(currentIndex + 1).padStart(2, '0')}
                    </span>
                    {tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wide"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#111111] font-display tracking-tight leading-[1.1] mb-3">
                    {currentProject.title}
                  </h3>

                  {/* Description: Controlled Size & Truncation with "More" toggle button */}
                  <div className="mb-4">
                    <p
                      className={`text-slate-600 text-sm sm:text-base leading-relaxed transition-all duration-300 ${
                        !isExpanded ? 'line-clamp-3' : 'max-h-[130px] overflow-y-auto pr-2'
                      }`}
                    >
                      {currentProject.desc}
                    </p>

                    {/* "More" / "View Details" Expand Toggle Button */}
                    {isLongDesc && (
                      <div className="mt-2.5 flex items-center gap-3">
                        <button
                          onClick={() => setIsExpanded((prev) => !prev)}
                          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#4884F5] hover:text-[#3570E4] transition-colors cursor-pointer py-0.5"
                        >
                          <span>{isExpanded ? 'Show Less' : 'More...'}</span>
                          {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                        </button>

                        <button
                          onClick={() => setIsModalOpen(true)}
                          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors cursor-pointer py-0.5"
                        >
                          <span>Full Overview</span>
                          <ArrowUpRight size={13} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Visit Live Website Button */}
                  {currentProject.link && (
                    <div className="mb-3">
                      <a
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#4884F5] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#3570E4] transition-all shadow-md shadow-[#4884F5]/25 group/btn"
                      >
                        <span>Visit Live Website</span>
                        <ArrowUpRight size={16} className="group-hover/btn:rotate-45 transition-transform duration-300" />
                      </a>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Slider Navigation Bar: Controls & Progress */}
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                {/* Dot / Pill Indicators */}
                <div className="flex items-center gap-2">
                  {projects.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      aria-label={`Go to project ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentIndex
                          ? 'w-8 bg-[#4884F5]'
                          : 'w-2.5 bg-slate-200 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>

                {/* Arrow Navigation Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => paginate(-1)}
                    aria-label="Previous project"
                    className="w-11 h-11 rounded-full bg-slate-100 text-slate-800 flex items-center justify-center hover:bg-[#4884F5] hover:text-white transition-all shadow-sm cursor-pointer active:scale-95"
                  >
                    <ArrowLeft size={18} />
                  </button>

                  <button
                    onClick={() => paginate(1)}
                    aria-label="Next project"
                    className="w-11 h-11 rounded-full bg-[#4884F5] text-white flex items-center justify-center hover:bg-[#3570E4] transition-all shadow-md shadow-[#4884F5]/25 cursor-pointer active:scale-95"
                  >
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Project Thumbnail Quick Switcher Strip with Scroll Reveal */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ type: 'spring', stiffness: 50, damping: 18, delay: 0.2 }}
          className="mt-8 flex items-center gap-3 overflow-x-auto pb-4 scrollbar-none"
        >
          {projects.map((proj, idx) => (
            <button
              key={proj.id || idx}
              onClick={() => goToSlide(idx)}
              className={`flex items-center gap-3 px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer border ${
                idx === currentIndex
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                  : 'bg-white text-slate-600 border-slate-200/90 hover:border-slate-400 hover:text-slate-900'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-[#4884F5]' : 'bg-slate-300'}`} />
              <span>{proj.title}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Full Details Modal for Extended Project Overviews */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="relative bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 sm:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-200 z-10"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-bold font-mono text-[#4884F5] bg-[#4884F5]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Project #{String(currentIndex + 1).padStart(2, '0')}
                </span>
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wide"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] font-display tracking-tight leading-tight mb-4">
                {currentProject.title}
              </h3>

              <div className="text-slate-600 text-base leading-relaxed whitespace-pre-line space-y-3 mb-8">
                {currentProject.desc}
              </div>

              {currentProject.link ? (
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={currentProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4884F5] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#3570E4] transition-all shadow-md shadow-[#4884F5]/20 group/modalBtn"
                  >
                    <span>Visit Live Website</span>
                    <ArrowUpRight size={16} className="group-hover/modalBtn:rotate-45 transition-transform duration-300" />
                  </a>

                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
