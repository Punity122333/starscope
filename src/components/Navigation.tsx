'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/connect', label: 'Connect' },
    { href: '/stargaze', label: 'Stargaze' },
    { href: '/learn', label: 'Learn' },
  ];

  return (
    <nav
      className={`absolute top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0a0a0f]/20 backdrop-blur-sm'
          : 'bg-transparent'
      }`}
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 50, 
        padding: '0.5rem 0',
        backdropFilter: 'blur(12px)',
        background: 'rgba(10, 10, 15, 0.3)'
      }}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between" style={{ minHeight: '3rem', padding: '0.25rem 0' }}>
          {/* Logo */}
          <div className="flex-shrink-0" style={{ marginLeft: '1rem' }}>
            <Link
              href="/"
              className="text-xl sm:text-2xl font-extralight text-white hover:text-[#64ffda] transition-colors duration-300 tracking-[0.2em] uppercase"
              style={{ textShadow: '0 0 10px rgba(0,0,0,0.8)' }}
            >
              StarScope
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block w-full" style={{ position: 'relative', height: '3rem' }}>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(0%, -50%)',
                display: 'flex',
                gap: '3rem',
              }}
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-light uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                    pathname === item.href
                      ? 'text-[#64ffda]'
                      : 'text-white/90 hover:text-[#64ffda]'
                  }`}
                  style={{ textShadow: '0 0 8px rgba(0,0,0,0.7)' }}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 w-full h-px bg-[#64ffda] transform transition-transform duration-300 ${
                      pathname === item.href
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenu navItems={navItems} pathname={pathname} />
          </div>
        </div>
      </div>
    </nav>
  );
};
const MobileMenu = ({
  navItems,
  pathname,
}: {
  navItems: { href: string; label: string }[];
  pathname: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="text-white p-2 rounded-md hover:text-[#64ffda] transition-colors duration-300"
        aria-label="Toggle mobile menu"
        style={{ textShadow: '0 0 8px rgba(0,0,0,0.7)' }}
      >
        <div className="w-6 h-6 flex flex-col justify-center items-center">
          <span
            className={`w-6 h-0.5 bg-current transform transition-all duration-300 ${
              isOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transform transition-all duration-300 mt-1 ${
              isOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-current transform transition-all duration-300 mt-1 ${
              isOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}
          />
        </div>
      </button>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0a0a0f]/85 backdrop-blur-lg z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}
      >
        <div style={{ paddingTop: '5rem', padding: '5rem 1.5rem 1.5rem 1.5rem' }}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block w-full text-left text-lg font-light uppercase tracking-wide transition-colors duration-300 ${
                pathname === item.href
                  ? 'text-[#64ffda]'
                  : 'text-white/90 hover:text-[#64ffda]'
              }`}
              style={{ padding: '0.75rem 0', marginBottom: '0.5rem' }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
