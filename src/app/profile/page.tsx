import ProfilePageSection from '@/components/ProfilePageSection';
import Navigation from '@/components/Navigation';
import ConstellationBackground from '@/components/ConstellationBackground';
import Footer from '@/components/Footer';

export default function ProfilePage() {
  return (
    <main className="relative">
      <ConstellationBackground />
      <Navigation />
      <div className="relative z-10">
           <ProfilePageSection />
        <Footer />
      </div>
    </main>
  );
}
