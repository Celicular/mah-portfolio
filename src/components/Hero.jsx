import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import FloatingLines from './FloatingLines';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const aliasRef = useRef(null);
  const textRef = useRef(null);
  const descRef = useRef(null);
  const heroContentRef = useRef(null);
  const imageLeftRef = useRef(null);
  const imageRightRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { opacity: 0, ease: "power3.out" } });

      // Entry animations
      tl.fromTo(aliasRef.current,
        { scale: 0.8, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 1.5, ease: "expo.out" }
      )
      .fromTo(textRef.current,
        { scale: 0.9, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 1.2, ease: "expo.out" },
        "-=1.2"
      )
      .fromTo(descRef.current,
        { y: 20 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=1"
      )
      .fromTo([imageLeftRef.current, imageRightRef.current],
        { scale: 0.8, filter: "blur(10px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out", stagger: 0.2 },
        "-=1"
      );

      // Scroll morph effect
      gsap.to(heroContentRef.current, 
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 200, 
          scale: 0.9,
          opacity: 0, 
          filter: "blur(20px)",
          skewX: -5,
        }
      );

      // Parallax for images
      gsap.to(imageLeftRef.current, 
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 100,
          x: -100,
          rotation: -30,
        }
      );

      gsap.to(imageRightRef.current, 
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
          y: 150,
          x: 100,
          rotation: 30,
        }
      );
      
    }, containerRef); // Scoper can be the ref itself

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <FloatingLines 
          enabledWaves={["bottom","middle"]}
          lineCount={6}
          lineDistance={58.5}
          bendRadius={26}
          bendStrength={15}
          interactive={true}
          parallax={true}
          linesGradient={['#8b5cf6', '#ffffff', '#8b5cf6']}
        />
      </div>


      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-start text-center h-full pt-[15vh] md:pt-[10vh]">
        
        {/* Left Side Portrait */}
        <div ref={imageLeftRef} className="absolute top-[25%] md:top-[20%] left-[5%] md:left-[8%] w-32 h-48 md:w-[280px] md:h-[400px] z-40 pointer-events-none transform -rotate-12 opacity-0">
          <div className="absolute inset-0 bg-surface border border-white/20 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(96,165,250,0.15)]">
            <div className="w-full h-full bg-[url('/celi1.png')] bg-cover bg-center opacity-80"></div>
          </div>
        </div>

        {/* Right Side Portrait */}
        <div ref={imageRightRef} className="absolute top-[35%] md:top-[25%] right-[5%] md:right-[8%] w-32 h-48 md:w-[280px] md:h-[400px] z-40 pointer-events-none transform rotate-12 opacity-0">
          <div className="absolute inset-0 bg-surface border border-white/20 rounded-2xl flex items-center justify-center overflow-hidden shadow-[0_0_50px_rgba(96,165,250,0.15)]">
            <div className="w-full h-full bg-[url('/celi2.png')] bg-cover bg-center opacity-90"></div>
          </div>
        </div>

        <div ref={heroContentRef} className="flex flex-col items-center justify-start z-20 w-full mt-[-30px] md:mt-[-50px]">
          <div className="overflow-visible perspective-[1000px] w-full max-w-5xl">
            <h1 
              ref={aliasRef} 
              className="text-[18vw] md:text-[20vw] font-mono font-black tracking-tighter leading-none relative z-10 flex items-center justify-center opacity-0"
              style={{ paddingBottom: '20px' }}
            >
              <span className="text-slate-200">C</span>
              <span className="text-violet-400">€</span>
              <span className="text-slate-200">LI</span>
            </h1>
          </div>

          <div className="overflow-visible mb-6 perspective-[1000px] mt-2 md:mt-4">
            <h2 
              ref={textRef} 
              className="text-4xl md:text-6xl font-mono font-bold tracking-tight leading-none text-white drop-shadow-lg relative z-20 opacity-0"
            >
              HIMADRI SHEKHAR
            </h2>
          </div>
          
          <div ref={descRef} className="flex flex-col items-center gap-4 mt-4 relative z-30 opacity-0">
            <p className="max-w-xl text-xl md:text-2xl text-text-muted font-light px-6 py-3 glass rounded-full border border-white/10 shadow-xl">
              Friendly neighborhood developer
            </p>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 cursor-default z-20">
        <span className="text-xs uppercase tracking-widest text-primary font-mono font-bold">Scroll</span>
        <div className="w-[2px] h-16 bg-gradient-to-b from-primary to-transparent animate-pulse rounded-full"></div>
      </div>
    </section>
  );
};

export default Hero;
