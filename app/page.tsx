import Navbar from '@/components/navbar';
import LandingPage from '@/components/landing-page';
import HeroSection from '@/components/hero-section';
import AboutSection from '@/components/about-section';
import StatsSection from '@/components/stats-section';
import CoreTeamSection from '@/components/core-team-section';
import TopPerformersSection from '@/components/top-performers-section';
import ProjectsPreview from '@/components/projects-preview';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="bg-black">
      <Navbar />
      <LandingPage />
      <HeroSection />
      <AboutSection />
      <StatsSection />
      <CoreTeamSection />
      <TopPerformersSection />
      <ProjectsPreview />
      <Footer />
    </main>
  );
}