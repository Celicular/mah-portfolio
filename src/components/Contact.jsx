import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Github, Instagram, MessageCircle, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const socialRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {

      gsap.fromTo(textRef.current,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 1
          },
          opacity: 1,
          y: 0
        }
      );

      socialRef.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, scale: 0.95, y: 30 },
          {
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "bottom 80%",
              scrub: 1
            },
            opacity: 1,
            scale: 1,
            y: 0,
            delay: index * 0.1
          }
        );
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const socials = [
    { icon: <Github size={28} />, name: "GitHub", handle: "@celicular", href: "https://github.com/celicular" },
    { icon: <Instagram size={28} />, name: "Instagram", handle: "@da.narcissistic_guy", href: "https://instagram.com/da.narcissistic_guy" },
    { icon: <MessageCircle size={28} />, name: "WhatsApp", handle: "+91 99428 68093", href: "https://wa.me/919942868093" },
    { icon: <Mail size={28} />, name: "Email", handle: "hsg090907.jsr@gmail.com", href: "mailto:hsg090907.jsr@gmail.com" }
  ];

  return (
    <section ref={containerRef} id="contact" className="py-32 md:py-48 relative bg-surface border-t border-white/5 overflow-hidden">
      
      {/* Background glow for futuristic vibe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] bg-primary/5 blur-[150px] rounded-full pointer-events-none z-0 hover:bg-primary/10 transition-colors duration-1000"></div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
        
        <div ref={textRef} className="mb-20">
          <h2 className="text-5xl md:text-8xl font-mono font-black mb-6 tracking-tighter">
            Let's <span className="text-primary text-glow">Connect</span>
          </h2>
          <p className="text-xl md:text-2xl text-text-muted font-light max-w-2xl mx-auto leading-relaxed">
            Whether it's a new project, an opportunity, or just saying hi. <br className="hidden md:block"/> 
            I'm always open to talking about futuristic tech and web dev.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 w-full mx-auto max-w-4xl text-left">
          {socials.map((social, idx) => (
             <a 
              key={idx}
              href={social.href}
              target="_blank" 
              rel="noopener noreferrer"
              ref={el => socialRef.current[idx] = el}
              className="group relative flex items-center justify-between p-6 md:p-8 rounded-[2rem] glass border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.15)] hover:-translate-y-2 bg-background/50 hover:bg-background/80"
            >
              {/* Animated Background Highlight */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex items-center gap-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-text-muted group-hover:text-white group-hover:bg-primary/20 group-hover:border-primary/30 group-hover:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all duration-500 transform-gpu">
                  {social.icon}
                </div>
                <div className="flex flex-col items-start justify-center">
                  <span className="text-2xl font-mono font-bold text-white group-hover:text-primary transition-colors duration-500 tracking-tight">
                    {social.name}
                  </span>
                  <span className="text-sm md:text-base text-text-muted font-light transition-all duration-300">
                    {social.handle}
                  </span>
                </div>
              </div>
              
              <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 text-primary bg-primary/10">
                <ArrowUpRight size={24} />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Contact;
