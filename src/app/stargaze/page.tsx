import ConstellationBackground from '@/components/ConstellationBackground';
import Navigation from '@/components/Navigation';
import StargazeSection from '@/components/StargazeSection';
import ProfileSection from '@/components/ProfileSection';
import Footer from '@/components/Footer';

export default function StargrazePage() {
  return (
    <main className="relative">
      <ConstellationBackground />
      <Navigation />
      <ProfileSection />
      <div className="relative z-10">
        <StargazeSection />
        <Footer />
      </div>
    </main>
  );
}
