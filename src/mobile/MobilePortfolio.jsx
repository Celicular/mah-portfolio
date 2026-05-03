import { ExternalLink } from 'lucide-react';

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

const MobilePortfolio = () => {
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
          <div key={idx} className="flex flex-col glass rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            
            {/* Image section */}
            <div className="w-full aspect-video relative">
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-80"></div>
            </div>

            {/* Content section */}
            <div className="p-6 relative z-10 -mt-[100px] pt-0">
               <span className="inline-block px-3 py-1 mb-3 text-[10px] font-bold uppercase tracking-widest bg-primary/30 text-white rounded-full border border-primary/50 shadow-sm backdrop-blur-md">
                 {project.category}
               </span>
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
