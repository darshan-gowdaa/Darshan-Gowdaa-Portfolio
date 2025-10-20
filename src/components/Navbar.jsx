// src/components/Navbar.jsx
import React, { memo, useState, useEffect, useCallback, useMemo } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navAnimation = useSpring({
    background: isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0)',
    boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 0 0 0 rgba(0, 0, 0, 0)',
    transform: isScrolled ? 'translate3d(0,0,0)' : 'translate3d(0,0,0)',
    height: isScrolled ? '64px' : '80px',
    config: { tension: 280, friction: 30 },
  });

  const links = useMemo(() => ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'], []);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId.toLowerCase());
    if (section) {
      const offset = sectionId.toLowerCase() === 'home' ? 0 : 80;
      window.scrollTo({
        top: section.offsetTop - offset,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen(prev => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  const menuAnimation = useSpring({
    transform: mobileMenuOpen ? 'translate3d(0,0,0)' : 'translate3d(100%,0,0)',
    opacity: mobileMenuOpen ? 1 : 0,
    config: { tension: 280, friction: 22 },
  });

  return (
    <>
      <animated.nav
        style={navAnimation}
        className="fixed top-0 left-0 w-full z-50 transition-all px-4 sm:px-6 backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center h-full">
          <animated.div
            className="text-lg sm:text-xl font-bold cursor-pointer select-none"
            onClick={() => scrollToSection('home')}
            style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
          >
            <span className="text-purple-400">Darshan</span>
            <span className="text-white"> Gowda</span>
          </animated.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="text-gray-300 hover:text-purple-400 transition-colors relative group text-xs lg:text-sm uppercase tracking-wider py-2 select-none"
                style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
              >
                {link}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden text-white p-2 hover:text-purple-400 transition-colors touch-manipulation active:scale-95 select-none"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
          >
            {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </animated.nav>

      {/* Mobile Menu Backdrop */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu */}
      <animated.div
        style={menuAnimation}
        className="md:hidden fixed top-0 right-0 h-screen w-72 sm:w-80 bg-gray-900/95 backdrop-blur-lg pt-20 px-6 shadow-2xl z-50"
      >
        <div className="flex flex-col space-y-4">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="text-gray-300 hover:text-purple-400 active:text-purple-500 transition-colors text-base sm:text-lg py-3 border-b border-gray-800 uppercase tracking-wider text-left touch-manipulation select-none"
              style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
            >
              {link}
            </button>
          ))}
        </div>
      </animated.div>
    </>
  );
};

export default memo(Navbar);
