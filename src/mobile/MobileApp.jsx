import Navbar from '../components/Navbar';
import MobileHero from './MobileHero';
import MobileAbout from './MobileAbout';
import MobileSkills from './MobileSkills';
import MobilePortfolio from './MobilePortfolio';
import MobileProjects from './MobileProjects';
import MobileContact from './MobileContact';
import Footer from '../components/Footer';

const MobileApp = () => {
  return (
    <div className="relative min-h-screen bg-background text-text selection:bg-primary/30 selection:text-primary overflow-x-hidden">
      <Navbar />
      <main className="w-full">
        <MobileHero />
        <MobileAbout />
        <MobileSkills />
        <MobilePortfolio />
        <MobileProjects />
        <MobileContact />
      </main>
      <Footer />
    </div>
  );
};

export default MobileApp;
