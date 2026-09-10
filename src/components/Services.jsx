import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const servicesData = [
  {
    id: 'web-app-dev',
    num: '01',
    subtitle: 'Digital Engineering',
    title: 'Web & App Development',
    desc: 'Build modern digital products that are fast, scalable, and designed around your users.',
    brief: 'End-to-end engineering of high-performance web applications and mobile apps with clean code, sub-second load times, and intuitive interfaces.',
    image: '/assets/services/web_app_dev.jpg',
    includes: ['Web Apps', 'Mobile Apps', 'E-commerce', 'Custom Platforms'],
    points: [
      'Custom Web Applications',
      'Cross-Platform Mobile Apps',
      'E-Commerce Platforms',
      'Cloud APIs & Backends'
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind']
  },
  {
    id: 'business-systems',
    num: '02',
    subtitle: 'Enterprise Software',
    title: 'Business Systems',
    desc: 'Custom software that streamlines operations, manages data, and helps businesses work smarter.',
    brief: 'Purpose-built internal operating systems that eliminate messy spreadsheets and redundant SaaS tools to automate core workflows.',
    image: '/assets/services/business_systems.jpg',
    includes: ['CRM', 'ERP', 'EDMS', 'Management Systems', 'Business Automation'],
    points: [
      'Custom CRM Pipelines',
      'ERP Operations Dashboards',
      'EDMS Document Control',
      'Workflow Automation'
    ],
    tech: ['FastAPI', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'REST APIs']
  },
  {
    id: 'digital-growth',
    num: '03',
    subtitle: 'Acquisition & Analytics',
    title: 'Digital Growth',
    desc: 'Turn your digital presence into a growth engine with better visibility, traffic, and conversions.',
    brief: 'Data-driven growth strategies combining technical SEO, targeted Google Ads management, and behavioral conversion telemetry.',
    image: '/assets/services/digital_growth.jpg',
    includes: ['SEO', 'Google Ads', 'Performance Marketing', 'Analytics'],
    points: [
      'Technical & On-Page SEO',
      'Google Ads Management',
      'Conversion Optimization',
      'Behavioral Analytics'
    ],
    tech: ['Google Analytics 4', 'Search Console', 'Mixpanel', 'GTM', 'Semrush']
  }
];

export default function Services({ onSelectService }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 80, rotateX: 15 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { type: 'spring', stiffness: 50, damping: 16 } }
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } }
  };

  return (
    <section id="services" className="w-full bg-[#141414] min-h-[70vh] pt-40 pb-[220px] mt-[-15vh] md:mt-[-28vh] relative z-20 rounded-[3rem] md:rounded-[5rem]" style={{ perspective: 1000 }}>
      <div className="px-6 md:px-12 max-w-[1600px] mx-auto">
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.2 }}
          variants={headerVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6"
        >
          <div>
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter font-display uppercase drop-shadow-sm">
              My <span className="text-[#4884F5]">Services</span>
            </h2>
            <p className="text-slate-400 max-w-xl text-lg font-medium leading-relaxed mt-3">
              Architecting high-performance digital products, mission-critical business platforms, and data-driven growth engines.
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true, amount: 0.15 }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {servicesData.map((service, index) => (
            <motion.div 
              key={index} 
              variants={cardVariants}
              whileHover={{ y: -12 }}
              onClick={() => onSelectService && onSelectService(service)}
              className="group cursor-pointer bg-[#1c1c1c] rounded-[2.5rem] p-7 flex flex-col justify-between shadow-2xl border border-white/5 transition-all duration-300 relative overflow-hidden"
            >
              {/* Card Header */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-display font-black text-2xl text-[#4884F5] tracking-tight">
                    {service.num}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 group-hover:text-white transition-colors">
                    Click to explore →
                  </span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2 tracking-wide font-display uppercase">
                  {service.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed font-normal min-h-[44px]">
                  {service.desc}
                </p>
              </div>

              {/* Visual Collage Preview Box with signature corner cut-out */}
              <div className="relative w-full h-[250px] my-4">
                <div className="absolute top-0 left-[10%] right-[10%] h-full bg-[#262626] rounded-[2rem] -translate-y-3 group-hover:-translate-y-5 transition-transform duration-500 z-0"></div>
                <div className="absolute top-0 left-[5%] right-[5%] h-full bg-[#303030] rounded-[2rem] -translate-y-1.5 group-hover:-translate-y-3 transition-transform duration-500 z-10"></div>

                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[#0f172a] rounded-[2.2rem] overflow-hidden z-20 shadow-inner">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
                </div>

                {/* Corner cutout */}
                <div className="absolute bottom-0 right-0 w-[84px] h-[84px] bg-[#1c1c1c] rounded-tl-[1.75rem] rounded-br-[2.2rem] z-30 transition-colors duration-500"></div>

                <div 
                  className="absolute bottom-0 right-[83px] w-[20px] h-[20px] z-30"
                  style={{ background: 'radial-gradient(circle at 0 0, transparent 20px, #1c1c1c 20.5px)' }}
                ></div>

                <div 
                  className="absolute bottom-[83px] right-0 w-[20px] h-[20px] z-30"
                  style={{ background: 'radial-gradient(circle at 0 0, transparent 20px, #1c1c1c 20.5px)' }}
                ></div>

                <motion.div 
                  whileHover={{ rotate: 45 }}
                  className="absolute bottom-3 right-3 w-[56px] h-[56px] bg-[#2a2a2a] rounded-full flex items-center justify-center text-white z-40 group-hover:bg-[#4884F5] transition-colors shadow-lg cursor-pointer"
                >
                  <ArrowUpRight size={26} strokeWidth={2.5} />
                </motion.div>
              </div>

              {/* Includes pill tags */}
              <div className="mt-2 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Includes:
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {service.includes.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
