import LoginSection from '@/components/LoginSection';
import ProfileSection from '@/components/ProfileSection';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ConstellationBackground from '@/components/ConstellationBackground';

export default function LoginPage() {
  return (
    <main className="relative">
      <ConstellationBackground />
      <Navigation />
      <ProfileSection />
      <div className="relative z-10">
        <LoginSection />
        <Footer />
      </div>
    </main>
  );
}
