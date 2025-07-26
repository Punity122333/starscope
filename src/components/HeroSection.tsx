'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section
      id="home"
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ paddingTop: '4rem', marginBottom: '6rem' }}
    >
      <div className="relative z-10 text-center px-8 sm:px-12 lg:px-16 w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full">
        <div
          className={`flex flex-col items-center justify-center text-center ${
            isLoaded ? 'fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.5s', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3rem', padding: '2rem 1rem' }}
        >
          {/* Main Title */}
          <div className="text-center w-full" style={{ padding: '0 1.5rem' }}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-extralight text-white leading-[0.9] tracking-wider text-center mx-auto">
              <span className="block">EXPLORE</span>
              <span className="block text-[#64ffda] glow-text">THE COSMOS.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div
            className={`text-center w-full flex justify-center ${isLoaded ? 'fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '1s', padding: '0 2rem' }}
          >
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/70 font-light max-w-4xl mx-auto leading-relaxed text-center">
              Immerse yourself in the infinite beauty of the universe with StarScope.
            </p>
          </div>

          {/* Tagline */}
          <div
            className={`text-center w-full ${isLoaded ? 'fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '1.3s', padding: '0 1.5rem' }}
          >
            <p className="text-base sm:text-lg text-[#64ffda]/80 font-light tracking-[0.2em] uppercase text-center mx-auto">
              Where dreams meet the stars
            </p>
          </div>

          {/* CTA Buttons */}
          <div
            className={`flex flex-col sm:flex-row justify-center items-center w-full ${
              isLoaded ? 'fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '1.6s', gap: '2rem', padding: '2rem 1.5rem 0 1.5rem' }}
          >
            <Link
              href="/stargaze"
              className="group relative text-base font-light text-white bg-transparent border border-[#64ffda]/30 rounded-lg hover:border-[#64ffda] transition-all duration-300 uppercase tracking-[0.15em] overflow-hidden"
              style={{ 
                padding: '1.5rem 3rem', 
                minWidth: '200px', 
                display: 'inline-block', 
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                background: 'rgba(10, 10, 15, 0.4)'
              }}
            >
              <span className="relative z-10">Begin Journey</span>
              <div className="absolute inset-0 bg-[#64ffda]/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
            
            <Link
              href="/about"
              className="group relative text-base font-light text-[#64ffda] bg-transparent border border-[#64ffda]/20 rounded-lg hover:border-[#64ffda]/60 hover:text-white transition-all duration-300 uppercase tracking-[0.15em] overflow-hidden"
              style={{ 
                padding: '1.5rem 3rem', 
                minWidth: '200px', 
                display: 'inline-block', 
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                background: 'rgba(10, 10, 15, 0.4)'
              }}
            >
              <span className="relative z-10">Learn More</span>
              <div className="absolute inset-0 bg-[#64ffda]/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>
        </div>
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-white rounded-full opacity-60 float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-[#64ffda] rounded-full opacity-40 float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-white rounded-full opacity-50 float" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-0.5 h-0.5 bg-[#64ffda] rounded-full opacity-70 float" style={{ animationDelay: '0.5s' }}></div>
      </div>
    </section>
  );
};

export default HeroSection;
