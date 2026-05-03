import { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import useMobileDetect from './hooks/useMobileDetect';
import MobileApp from './mobile/MobileApp';
import FloatingLogo from './components/FloatingLogo';

// Lazy-load admin panel so it doesn't bloat the main bundle
const AdminPanel = lazy(() => import('./pages/AdminPanel'));

const DesktopApp = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
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

const MainApp = () => {
  const isMobile = useMobileDetect();

  if (isMobile) {
    return (
      <>
        <MobileApp />
        <FloatingLogo />
      </>
    );
  }

  return (
    <>
      <DesktopApp />
      <FloatingLogo />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin panel — isolated route, no portfolio chrome */}
        <Route
          path="/celiadmin"
          element={
            <Suspense fallback={
              <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
                <div className="flex gap-2">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="w-3 h-3 rounded-full bg-violet-600 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              </div>
            }>
              <AdminPanel />
            </Suspense>
          }
        />
        {/* Main portfolio — catch all other routes */}
        <Route path="*" element={<MainApp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
