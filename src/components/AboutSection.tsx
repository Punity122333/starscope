'use client';

import { useEffect, useState, useRef } from 'react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: 'REAL-TIME EXPLORATION',
      description: 'Experience live celestial events and track astronomical phenomena as they unfold across the cosmos.',
    },
    {
      title: 'IMMERSIVE VISUALIZATION',
      description: 'Journey through 3D star maps and interactive constellation guides that bring the universe to your fingertips.',
    },
    {
      title: 'PERSONALIZED DISCOVERY',
      description: 'Receive curated stargazing recommendations based on your location, preferences, and optimal viewing conditions.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
      style={{ paddingTop: '6rem', marginBottom: '6rem' }}
    >
      <div className="max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 w-full">
        <div className="text-center flex flex-col items-center justify-center">
          {/* Header */}
          <div className="max-w-4xl mx-auto text-center w-full" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div
              className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.2s', padding: '0 1.5rem' }}
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white leading-tight tracking-wider text-center mx-auto" style={{ textShadow: '0 0 24px #64ffda, 0 0 32px #fff, 0 0 8px #64ffda' }}>
                UNLOCK THE
                <span className="block text-[#64ffda]" style={{ textShadow: '0 0 24px #64ffda, 0 0 32px #fff, 0 0 8px #64ffda' }}>UNIVERSE</span>
              </h2>
            </div>

            <div
              className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.4s', padding: '0 2rem' }}
            >
              <p className="text-xl sm:text-2xl text-white/70 font-light leading-relaxed text-center mx-auto max-w-4xl">
                StarScope transforms the way you connect with the cosmos. Through cutting-edge 
                technology and intuitive design, we bridge the gap between Earth and the infinite 
                expanse above.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 w-full max-w-6xl mx-auto px-4" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group bg-transparent border border-white/10 rounded-lg hover:border-[#64ffda]/30 transition-all duration-500 text-center flex flex-col items-center justify-center ${
                  isVisible ? 'fade-in-up' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${0.6 + index * 0.2}s`, 
                  padding: '3rem',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(10, 10, 15, 0.3)'
                }}
              >
                <div className="text-center flex flex-col items-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                  <h3 className="text-base font-light text-[#64ffda] tracking-[0.15em] uppercase group-hover:text-white transition-colors duration-300 text-center">
                    {feature.title}
                  </h3>
                  <div className="w-16 h-px bg-[#64ffda]/30 group-hover:bg-[#64ffda] transition-colors duration-300"></div>
                  <p className="text-white/60 font-light leading-relaxed text-base group-hover:text-white/80 transition-colors duration-300 text-center" style={{ padding: '0 1.5rem' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '1.4s', marginTop: '3rem' }}
          >
            <button className="group relative text-base font-light text-white bg-transparent border border-[#64ffda]/30 rounded-lg hover:border-[#64ffda] transition-all duration-300 uppercase tracking-[0.15em] overflow-hidden" style={{ padding: '1.5rem 3rem' }}>

              <div className="absolute inset-0 bg-[#64ffda]/10 backdrop-blur z-0"></div>
              <span className="relative z-10">Discover Features</span>
              <div className="absolute inset-0 bg-[#64ffda]/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-10"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#64ffda]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-[#64ffda]/3 rounded-full blur-3xl"></div>
      </div>
    </section>
  );
};

export default AboutSection;
