import ConstellationBackground from '@/components/ConstellationBackground';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="relative">
      <ConstellationBackground />
      <Navigation />
      <div className="relative z-10">
        <AboutSection />
        <Footer />
      </div>
    </main>
  );
}
