import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Services from '../components/Services';
import ServiceModal from '../components/ServiceModal';
import Experience from '../components/Experience';
import WhyHireMe from '../components/WhyHireMe';
import Portfolio from '../components/Portfolio';
import Projects from '../components/Projects';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import QuoteSection from '../components/QuoteSection';
import Footer from '../components/Footer';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    // Disable automatic browser scroll restoration so it does not open scrolled down
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Reset hash on fresh load to prevent browser auto-jumping to anchor
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname);
    }

    // Force window to top before Lenis initialization
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      syncTouch: false,
      infinite: false,
      autoRaf: true,
      anchors: true,
      respectReducedMotion: false
    });

    // Expose lenis globally for seamless programmatic smooth scrolling from buttons
    window.lenis = lenis;

    // Immediately snap Lenis to the top
    lenis.scrollTo(0, { immediate: true });

    // Handle any delayed layout shift or rendering frames
    const rafId = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    });

    const timerId = setTimeout(() => {
      window.scrollTo(0, 0);
      lenis.scrollTo(0, { immediate: true });
    }, 50);

    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  const handleDiscussService = () => {
    setSelectedService(null);
    const el = document.getElementById('contact');
    if (el) {
      if (window.lenis) {
        window.lenis.scrollTo(el, { offset: -40, duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] text-slate-900 font-sans selection:bg-[#4884F5]/20 selection:text-slate-900">
      <Navbar />
      <main>
        <Hero />
        <Services onSelectService={setSelectedService} />
        <Experience />
        <WhyHireMe />
        <Portfolio />
        <Projects />
        <Testimonials />
        <Contact />
        <QuoteSection />
      </main>
      <Footer />

      {/* Global Light-Mode Service Explanation Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onDiscuss={handleDiscussService}
      />
    </div>
  );
}
