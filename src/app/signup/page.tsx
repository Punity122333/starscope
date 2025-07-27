import ConstellationBackground from '@/components/ConstellationBackground';
import Navigation from '@/components/Navigation';
import SignupSection from '@/components/SignupSection';
import ProfileSection from '@/components/ProfileSection';
import Footer from '@/components/Footer';

export default function SignupPage() {
  return (
    <main className="relative">
      <ConstellationBackground />
      <Navigation />
      <ProfileSection />
      <div className="relative z-10">
        <SignupSection />
        <Footer />
      </div>
    </main>
  );
}
