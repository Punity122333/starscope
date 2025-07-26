'use client';

import { useEffect, useState, useRef } from 'react';

const ConnectSection = () => {
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

  const socialLinks = [
    {
      name: 'OBSERVATORY',
      description: 'Join our virtual observatory sessions',
      icon: '🔭',
      href: '#',
    },
    {
      name: 'COMMUNITY',
      description: 'Connect with fellow stargazers',
      icon: '🌟',
      href: '#',
    },
    {
      name: 'NEWSLETTER',
      description: 'Weekly cosmic discoveries',
      icon: '📡',
      href: '#',
    },
    {
      name: 'UPDATES',
      description: 'Latest astronomical events',
      icon: '🚀',
      href: '#',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="connect"
      className="relative min-h-screen flex items-center justify-center py-24 overflow-hidden"
      style={{ paddingTop: '6rem', marginBottom: '6rem' }}
    >
      <div className="max-w-5xl mx-auto px-8 sm:px-12 lg:px-16 w-full">
        <div className="text-center flex flex-col items-center justify-center">
          {/* Header */}
          <div className="text-center w-full max-w-4xl mx-auto" style={{ padding: '2rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
            <div
              className={`text-center ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.2s', padding: '0 1rem' }}
            >
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-extralight text-white leading-tight tracking-wider text-center mx-auto" style={{ textShadow: '0 0 24px #64ffda, 0 0 32px #fff, 0 0 8px #64ffda' }}>
                CONNECT WITH
                <span className="block text-[#64ffda]" style={{ textShadow: '0 0 24px #64ffda, 0 0 32px #fff, 0 0 8px #64ffda' }}>THE COSMOS</span>
              </h2>
            </div>

            <div
              className={`${isVisible ? 'fade-in-up' : 'opacity-0'}`}
              style={{ animationDelay: '0.4s', padding: '0 2rem' }}
            >
              <p className="text-xl text-white/70 font-light leading-relaxed max-w-3xl text-center mx-auto">
                Join a community of cosmic explorers and stay updated with the latest 
                astronomical discoveries and stargazing opportunities.
              </p>
            </div>
          </div>

          {/* Connection Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 px-4" style={{ marginTop: '4rem', marginBottom: '4rem' }}>
            {socialLinks.map((link, index) => (
              <div
                key={link.name}
                className={`group border border-white/10 rounded-lg hover:border-[#64ffda]/40 transition-all duration-300 cursor-pointer text-center ${
                  isVisible ? 'fade-in-up' : 'opacity-0'
                }`}
                style={{ 
                  animationDelay: `${0.6 + index * 0.1}s`, 
                  padding: '3rem',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(10, 10, 15, 0.3)'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
                  <div className="text-3xl group-hover:scale-110 transition-transform duration-300 mx-auto">
                    {link.icon}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', padding: '0 1rem' }}>
                    <h3 className="text-sm font-light text-[#64ffda] tracking-[0.15em] uppercase group-hover:text-white transition-colors duration-300">
                      {link.name}
                    </h3>
                    <p className="text-white/50 font-light text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-300">
                      {link.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div
            className={`max-w-2xl mx-auto ${isVisible ? 'fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '1.2s', padding: '0 1.5rem', marginTop: '4rem' }}
          >
            <div 
              className="border border-white/10 rounded-lg" 
              style={{ 
                padding: '4rem',
                backdropFilter: 'blur(10px)',
                background: 'rgba(10, 10, 15, 0.3)'
              }}
            >
              <h3 className="text-xl font-light text-white tracking-[0.15em] uppercase text-center" style={{ marginBottom: '4rem' }}>
                Stay Connected
              </h3>
              
              <form style={{ display: 'flex', flexDirection: 'column', gap: '3rem', padding: '0 1rem' }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                  <div className="relative" style={{ padding: '0 1rem' }}>
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:border-[#64ffda] focus:outline-none transition-colors duration-300 font-light text-base tracking-wide"
                      style={{ padding: '1.5rem 0' }}
                    />
                  </div>
                  <div className="relative" style={{ padding: '0 1rem' }}>
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:border-[#64ffda] focus:outline-none transition-colors duration-300 font-light text-base tracking-wide"
                      style={{ padding: '1.5rem 0' }}
                    />
                  </div>
                </div>
                
                <div className="relative" style={{ padding: '0 1rem' }}>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:border-[#64ffda] focus:outline-none transition-colors duration-300 font-light text-base tracking-wide"
                    style={{ padding: '1.5rem 0' }}
                  />
                </div>
                
                <div className="relative" style={{ padding: '0 1rem' }}>
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full bg-transparent border-0 border-b border-white/20 text-white placeholder-white/40 focus:border-[#64ffda] focus:outline-none transition-colors duration-300 font-light text-base tracking-wide resize-none"
                    style={{ padding: '1.5rem 0' }}
                  />
                </div>
                
                <div className="text-center" style={{ paddingTop: '2.5rem' }}>
                  <button
                    type="submit"
                    className="group relative text-base font-light text-white bg-transparent border border-[#64ffda]/30 rounded-lg hover:border-[#64ffda] transition-all duration-300 uppercase tracking-[0.15em] overflow-hidden"
                    style={{ padding: '1rem 2.5rem', minWidth: '200px' }}
                  >
                    <span className="relative z-10">Send Message</span>
                    <div className="absolute inset-0 bg-[#64ffda]/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-40 h-40 bg-[#64ffda]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#64ffda]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </section>
  );
};

export default ConnectSection;
