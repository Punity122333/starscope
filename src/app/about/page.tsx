import ConstellationBackground from '@/components/ConstellationBackground';
import Navigation from '@/components/Navigation';
import AboutSection from '@/components/AboutSection';
import ProfileSection from '@/components/ProfileSection';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <main className="relative">
      <ConstellationBackground />
      <Navigation />
      <ProfileSection />
      <div className="relative z-10">
        <AboutSection />
        <Footer />
      </div>
    </main>
  );
}
