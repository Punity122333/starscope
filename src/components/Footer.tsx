'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer 
      className="relative border-t border-white/10" 
      style={{ 
        background: 'rgba(10, 10, 15, 0.4)',
        backdropFilter: 'blur(8px)',
        textAlign: 'center',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div 
        className="max-w-6xl px-6 sm:px-8 lg:px-12" 
        style={{ width: '100%', maxWidth: '72rem', margin: '0 auto', padding: '3rem 1.5rem' }}
      >
        <div className="text-center" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Logo & Tagline */}
          <div style={{ padding: '0.25rem 0' }}>
            <h3 className="text-xl font-extralight text-white tracking-[0.2em] uppercase" style={{ marginBottom: '0.75rem' }}>
              StarScope
            </h3>
            <p className="text-white/40 text-xs font-light tracking-[0.15em] uppercase">
              Where dreams meet the stars
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center items-center" style={{ gap: '2rem', padding: '0.5rem 0', margin: '0 auto' }}>
            <Link href="/" className="text-white/50 hover:text-[#64ffda] transition-colors duration-300 text-xs font-light tracking-[0.15em] uppercase">
              Home
            </Link>
            <Link href="/about" className="text-white/50 hover:text-[#64ffda] transition-colors duration-300 text-xs font-light tracking-[0.15em] uppercase">
              About
            </Link>
            <Link href="/connect" className="text-white/50 hover:text-[#64ffda] transition-colors duration-300 text-xs font-light tracking-[0.15em] uppercase">
              Connect
            </Link>
            <Link href="/stargaze" className="text-white/50 hover:text-[#64ffda] transition-colors duration-300 text-xs font-light tracking-[0.15em] uppercase">
              Stargaze
            </Link>
            <Link href="/learn" className="text-white/50 hover:text-[#64ffda] transition-colors duration-300 text-xs font-light tracking-[0.15em] uppercase">
              Learn
            </Link>
           <Link href="/login" className="text-white/50 hover:text-[#64ffda] transition-colors duration-300 text-xs font-light tracking-[0.15em] uppercase">
             Login
           </Link>
           <Link href="/signup" className="text-white/50 hover:text-[#64ffda] transition-colors duration-300 text-xs font-light tracking-[0.15em] uppercase">
             Signup
           </Link>
          </div>

          {/* Divider */}
          <div className="w-24 h-px bg-white/20 mx-auto" style={{ margin: '1rem auto' }}></div>

          {/* Copyright */}
          <div style={{ padding: '0.5rem 0' }}>
            <p className="text-white/30 text-xs font-light tracking-wider">
              © 2025 StarScope. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Background stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-white rounded-full opacity-30 slow-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-0.5 h-0.5 bg-[#64ffda] rounded-full opacity-50 slow-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-2/3 w-1 h-1 bg-white rounded-full opacity-40 slow-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </footer>
  );
};

export default Footer;
