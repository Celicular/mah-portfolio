import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function ServiceModal({ service, onClose, onDiscuss }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (service) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [service, onClose]);

  return (
    <AnimatePresence>
      {service && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
          />

          {/* Light Mode Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="relative bg-white rounded-[2.2rem] p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200/90 z-10 text-slate-900 my-auto overflow-hidden"
          >
            {/* Top accent line */}
            <div className="absolute top-0 left-8 right-8 h-[3px] bg-gradient-to-r from-transparent via-[#4884F5]/40 to-transparent" />

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Header Meta */}
            <div className="flex items-center gap-2.5 mb-3">
              <span className="font-display font-black text-xl text-[#4884F5]">
                {service.num}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#4884F5] px-3 py-1 rounded-full bg-[#4884F5]/10">
                {service.subtitle || 'Service Overview'}
              </span>
            </div>

            {/* Title & Short Description */}
            <h3 className="text-2xl sm:text-3xl font-black text-[#111111] font-display uppercase tracking-tight mb-2">
              {service.title}
            </h3>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
              {service.brief}
            </p>

            {/* Deliverables / Capabilities Grid */}
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-3">
                Key Deliverables
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {service.points?.map((point, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center gap-2.5"
                  >
                    <CheckCircle2 size={16} className="text-[#4884F5] shrink-0" />
                    <span className="text-xs font-semibold text-slate-700 leading-tight">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="mb-6 pb-5 border-b border-slate-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2.5">
                Technologies & Tools
              </span>
              <div className="flex flex-wrap gap-1.5">
                {service.tech?.map((item, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Footer */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={onDiscuss}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4884F5] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#3570E4] transition-all shadow-md shadow-[#4884F5]/25 cursor-pointer"
              >
                <span>Discuss Project</span>
                <ArrowUpRight size={15} />
              </button>

              <button
                onClick={onClose}
                className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-slate-700 transition-colors cursor-pointer px-3 py-2"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
