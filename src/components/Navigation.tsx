'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProfileSection from './ProfileSection'; // Assuming this is in the same directory
import { usePathname } from 'next/navigation';
import './ui/navigation.css';

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
    { href: '/login', label: 'Login' },
    { href: '/signup', label: 'Signup' },
  ];

  return (
    <nav className={`nav-container${isScrolled ? ' scrolled' : ''}`}>
      <div className="nav-maxwidth">
        <div className="nav-flex">
          <div className="nav-logo">
            <Link href="/" className="nav-logo-link">StarScope</Link>
          </div>
          <div className="nav-links hidden md:flex flex-1 justify-center">
            <div className="nav-links-inner">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link${pathname === item.href ? ' active' : ''}`}
                >
                  {item.label}
                  <span className="nav-link-underline" />
                </Link>
              ))}
            </div>
          </div>
          <div className="nav-profile hidden md:flex items-center">
            <Link href="/profile" className="nav-profile-link" style={{ display: 'contents' }}>
              <ProfileSection />
            </Link>
          </div>
          <div className="md:hidden mobile-menu-btn">
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
        aria-label="Toggle mobile menu"
        className="mobile-menu-btn"
      >
        <div className="mobile-menu-icon">
          <span className={`mobile-menu-bar top${isOpen ? ' open' : ''}`} />
          <span className={`mobile-menu-bar middle${isOpen ? ' open' : ''}`} />
          <span className={`mobile-menu-bar bottom${isOpen ? ' open' : ''}`} />
        </div>
      </button>
      <div className={`mobile-menu-overlay${isOpen ? ' open' : ''}`} onClick={toggleMenu} />
      <div className={`mobile-menu-panel${isOpen ? ' open' : ''}`}>
        <div className="mobile-menu-panel-inner">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`mobile-menu-link${pathname === item.href ? ' active' : ''}`}
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