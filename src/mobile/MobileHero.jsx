const MobileHero = () => {
  return (
    <section id="hero" className="relative h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20 bg-background z-0">
      
      {/* Static Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] bg-primary/20 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center h-full">
        <div className="flex flex-col items-center justify-center z-20 w-full mt-[-20px]">
          <h1 className="text-[28vw] font-mono font-black tracking-tighter leading-none relative z-10 flex items-center justify-center" style={{ paddingBottom: '10px' }}>
            <span className="text-slate-200">C</span>
            <span className="text-sky-400">€</span>
            <span className="text-slate-200">LI</span>
          </h1>

          <div className="mb-6 -mt-6 z-20">
            <h2 className="text-3xl font-mono font-bold tracking-tight leading-none text-white drop-shadow-lg">
              HIMADRI SHEKHAR
            </h2>
          </div>
          
          <div className="flex flex-col items-center gap-4 mt-2 relative z-30 w-full">
            <p className="w-full max-w-sm text-base text-text-muted font-light px-6 py-3 glass rounded-full border border-white/10 shadow-xl text-center leading-relaxed">
              Friendly neighborhood developer
            </p>
          </div>
        </div>

      </div>

      {/* Static Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[10px] uppercase tracking-widest text-primary font-mono font-bold">Scroll</span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent rounded-full animate-pulse"></div>
      </div>
    </section>
  );
};

export default MobileHero;
