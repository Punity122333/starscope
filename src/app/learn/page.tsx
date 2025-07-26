import ConstellationBackground from '@/components/ConstellationBackground';
import Navigation from '@/components/Navigation';
import LearnSection from '@/components/LearnSection';
import Footer from '@/components/Footer';

export default function LearnPage() {
  return (
    <main className="relative">
      <ConstellationBackground />
      <Navigation />
      <div className="relative z-10">
        <LearnSection />
        <Footer />
      </div>
    </main>
  );
}
