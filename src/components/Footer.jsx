import { Mail, Phone, MapPin, Github, Instagram, MessageCircle, Heart, Coffee } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="pt-24 pb-12 bg-background border-t border-white/5 relative z-10 overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Quote Section */}
        <div className="mb-24 text-center">
          <h2 className="text-3xl md:text-5xl font-mono font-black text-white/10 uppercase tracking-tighter italic leading-tight max-w-4xl mx-auto select-none">
            "Talk is cheap... <span className="text-primary/10">Show me the Code</span>"
          </h2>
          <span className="text-[10px] md:text-xs font-mono text-white/20 uppercase tracking-[0.6em] block mt-6">
            — Linus Torvalds
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 mb-24 border-y border-white/5 py-16">
          
          {/* Identity */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-mono font-black tracking-tighter mb-6 flex items-center">
              C<span className="text-primary">€</span>LI
            </h1>
            <p className="text-text-muted text-lg font-light leading-relaxed max-w-[300px]">
              Crafting futuristic digital architectures through minimal design and high-performance engineering.
            </p>
          </div>

          {/* Direct Connect */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <h4 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Direct Communication</h4>
            <a href="mailto:hsg090907.jsr@gmail.com" className="flex items-center gap-4 text-white hover:text-primary transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-all">
                <Mail size={18} />
              </div>
              <span className="text-lg md:text-xl font-mono">hsg090907.jsr@gmail.com</span>
            </a>
            {/* Added social cluster for quick access */}
            <div className="flex flex-wrap gap-4 mt-6">
              {[
                { icon: <Github size={20} />, href: "https://github.com/celicular" },
                { icon: <Instagram size={20} />, href: "https://instagram.com/da.narcissistic_guy" },
                { icon: <MessageCircle size={20} />, href: "https://wa.me/919942868093" }
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-muted hover:text-white hover:border-primary/50 transition-all">
                  {s.icon}
                </a>
              ))}
              
              {/* Buy Me a Coffee */}
              <button 
                onClick={() => alert("not added yet...")}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-500 hover:bg-amber-500 hover:text-white transition-all duration-300 text-[10px] font-bold uppercase tracking-wider"
              >
                <Coffee size={14} /> Buy me a coffee
              </button>
            </div>
          </div>

          {/* Location / Current Orbit */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-4">Location</h4>
            <div className="flex items-start gap-4 text-text-muted">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <p className="text-lg md:text-xl font-mono leading-tight">
                Operating remotely from<br/>
                <span className="text-white">India</span>
              </p>
            </div>
            <div className="mt-10 flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Available for Collaborate</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/5 text-[11px] font-mono text-white/30 tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} Himadri Shekhar. All rights reserved.</p>
          <div className="flex gap-8">
            <p className="flex items-center gap-1.5">designed with <Heart size={12} className="text-primary fill-primary/20" /> by <span className="text-white">Himadri</span> with <span className="text-primary">React</span></p>
            <p>v2.4.0</p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
