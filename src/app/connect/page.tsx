import ConstellationBackground from '@/components/ConstellationBackground';
import Navigation from '@/components/Navigation';
import ConnectSection from '@/components/ConnectSection';
import ProfileSection from '@/components/ProfileSection';
import Footer from '@/components/Footer';

export default function ConnectPage() {
  return (
    <main className="relative">
      <ConstellationBackground />
      <Navigation />
      <ProfileSection />
      <div className="relative z-10">
        <ConnectSection />
        <Footer />
      </div>
    </main>
  );
}
