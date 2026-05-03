import { Mail, Github, Instagram, MessageCircle } from 'lucide-react';

const MobileContact = () => {
  const socials = [
    { icon: <Github size={28} />, name: "GitHub", href: "https://github.com/celicular" },
    { icon: <Instagram size={28} />, name: "Instagram", href: "https://instagram.com/da.narcissistic_guy" },
    { icon: <MessageCircle size={28} />, name: "WhatsApp", href: "https://wa.me/919942868093" },
    { icon: <Mail size={28} />, name: "Email", href: "mailto:hsg090907.jsr@gmail.com" }
  ];

  return (
    <section id="contact" className="py-24 relative bg-surface border-t border-white/5 overflow-hidden">
      
      {/* Background glow for futuristic vibe */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-primary/10 blur-[100px] rounded-full pointer-events-none z-0"></div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        
        <div className="mb-12">
          <h2 className="text-4xl font-mono font-black mb-4">
            Let's <span className="text-primary text-glow">Connect</span>
          </h2>
          <p className="text-base text-text-muted px-4 font-light">
            Whether it's a new project, an opportunity, or just saying hi. 
            I'm always open to talking about futuristic tech and web dev.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
          {socials.map((social, idx) => (
            <a 
              key={idx}
              href={social.href}
              className="flex flex-col items-center justify-center gap-3 py-6 rounded-2xl glass border border-white/10 active:border-primary/50 active:bg-primary/10 transition-colors shadow-lg shadow-black/20"
            >
              <div className="text-white text-glow">
                {social.icon}
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/70">
                {social.name}
              </span>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MobileContact;
