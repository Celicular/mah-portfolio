import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Instagram, MessageCircle, Mail, Phone, X } from 'lucide-react';

const FloatingLogo = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socials = [
    { icon: <Github size={20} />, href: "https://github.com/celicular", label: "GitHub" },
    { icon: <Instagram size={20} />, href: "https://instagram.com/da.narcissistic_guy", label: "Instagram" },
    { icon: <MessageCircle size={20} />, href: "https://wa.me/919942868093", label: "WhatsApp" },
    { icon: <Mail size={20} />, href: "mailto:hsg090907.jsr@gmail.com", label: "Email" },
    { icon: <Phone size={20} />, href: "tel:+919942868093", label: "+91 99428 68093" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-center gap-4">
      <AnimatePresence>
        {isOpen && (
          <div className="flex flex-col items-center gap-3 mb-2">
            {socials.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                target={social.href.startsWith('http') ? "_blank" : "_self"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.5 }}
                transition={{ delay: (socials.length - 1 - idx) * 0.05, duration: 0.3 }}
                className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-xl border border-white/20 rounded-full text-white hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] transition-all duration-300 group relative"
                title={social.label}
              >
                {social.icon}
                <span className="absolute right-full mr-4 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-white/10">
                  {social.label}
                </span>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center bg-white/5 backdrop-blur-md rounded-full shadow-[0_0_30px_rgba(255,255,255,0.1)] hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500 overflow-hidden group ${!isOpen ? 'animate-[bounce_4s_infinite]' : ''}`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="logo"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              <img 
                src="/logo.png" 
                alt="Himadri Logo" 
                className="w-10 h-10 md:w-12 md:h-12 object-contain invert rounded-full group-hover:scale-110 transition-transform duration-500" 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
};

export default FloatingLogo;
