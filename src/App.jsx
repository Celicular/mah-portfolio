import { useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Portfolio from './components/Portfolio';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import DebugLines from './pages/DebugLines';
import useMobileDetect from './hooks/useMobileDetect';
import MobileApp from './mobile/MobileApp';
import FloatingLogo from './components/FloatingLogo';

const DesktopApp = () => {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-text selection:bg-primary/30 selection:text-primary">
      <CustomCursor />
      <Navbar />
      
      <main className="w-full">
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

function App() {
  // Mobile router hook
  const isMobile = useMobileDetect();

  // Render static unified mobile site if phone detected
  if (isMobile) {
    return (
      <>
        <MobileApp />
        <FloatingLogo />
      </>
    );
  }

  // Otherwise return full GSAP 3D desktop site
  return (
    <>
      <DesktopApp />
      <FloatingLogo />
    </>
  );
}

export default App;
