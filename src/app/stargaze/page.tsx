import ConstellationBackground from '@/components/ConstellationBackground';
import Navigation from '@/components/Navigation';
import StargazeSection from '@/components/StargazeSection';
import Footer from '@/components/Footer';

export default function StargrazePage() {
  return (
    <main className="relative">
      <ConstellationBackground />
      <Navigation />
      <div className="relative z-10">
        <StargazeSection />
        <Footer />
      </div>
    </main>
  );
}
