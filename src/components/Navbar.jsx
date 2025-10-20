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
    background: isScrolled 
      ? 'rgba(17, 24, 39, 0.75)' 
      : 'rgba(17, 24, 39, 0.4)',
    backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'blur(16px) saturate(150%)',
    borderBottom: isScrolled 
      ? '1px solid rgba(255, 255, 255, 0.15)' 
      : '1px solid rgba(255, 255, 255, 0.08)',
    boxShadow: isScrolled 
      ? '0 8px 32px rgba(139, 92, 246, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
      : '0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
    transform: isScrolled ? 'translate3d(0,0,0)' : 'translate3d(0,0,0)',
    height: isScrolled ? '64px' : '80px',
    config: { tension: 280, friction: 30 },
  });

  const links = useMemo(() => ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'], []);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.getElementById(sectionId.toLowerCase());
    if (section) {
      if (sectionId.toLowerCase() === 'home') {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      } else {
        // Find the heading (h2) inside the section for precise positioning
        const heading = section.querySelector('h2');
        const targetElement = heading || section;
        
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar ? navbar.offsetHeight : 80;
        
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight - 20;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
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
        className="fixed top-0 left-0 w-full z-50 px-4 sm:px-6"
      >
        {/* Liquid Glass Shine Effect - only visible when scrolled */}
        {isScrolled && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute top-0 left-0 w-full h-full opacity-30"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
                transform: 'translateX(-100%)',
                animation: 'navShine 8s ease-in-out infinite',
              }}
            />
          </div>
        )}

        <div className="max-w-6xl mx-auto flex justify-between items-center h-full relative z-10">
          <animated.div
            className="text-lg sm:text-xl font-bold cursor-pointer select-none relative group"
            onClick={() => scrollToSection('home')}
            style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
          >
            <span className="text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.5)]">Darshan</span>
            <span className="text-white"> Gowda</span>
            <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
          </animated.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {links.map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link)}
                className="relative text-gray-300 hover:text-white transition-all duration-300 group text-xs lg:text-sm uppercase tracking-wider py-2 select-none"
                style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
              >
                <span className="relative z-10">{link}</span>
                
                {/* Glassmorphic hover background */}
                <div className="absolute inset-0 -inset-x-3 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-purple-600/0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm" />
                
                {/* Bottom line indicator */}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                
                {/* Glow effect on hover */}
                <div className="absolute -inset-2 bg-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl -z-10" />
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden relative text-white p-2.5 hover:text-purple-400 transition-all duration-300 touch-manipulation active:scale-95 select-none group rounded-lg overflow-hidden"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{ outline: 'none', WebkitTapHighlightColor: 'transparent' }}
          >
            {/* Glassmorphic background for button */}
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 border border-white/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <span className="relative z-10">
              {mobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
            </span>
          </button>
        </div>
      </animated.nav>

      {/* Mobile Menu Backdrop with blur */}
      {mobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-all duration-300"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu with Liquid Glass Effect */}
      <animated.div
        style={menuAnimation}
        className="md:hidden fixed top-0 right-0 h-screen w-72 sm:w-80 pt-20 px-6 shadow-2xl z-50 overflow-hidden"
      >
        {/* Glassmorphic background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-purple-900/80 to-gray-900/95 backdrop-blur-2xl" />
        
        {/* Border with gradient */}
        <div className="absolute inset-0 border-l border-white/10" />
        
        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.2) 0%, transparent 50%, rgba(236, 72, 153, 0.2) 100%)',
          }}
        />

        {/* Menu items */}
        <div className="flex flex-col space-y-4 relative z-10">
          {links.map((link, index) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="relative text-gray-300 hover:text-white active:text-purple-400 transition-all duration-300 text-base sm:text-lg py-3 border-b border-gray-800/50 uppercase tracking-wider text-left touch-manipulation select-none group overflow-hidden"
              style={{ 
                outline: 'none', 
                WebkitTapHighlightColor: 'transparent',
                animationDelay: `${index * 50}ms`
              }}
            >
              {/* Glassmorphic hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 -z-10" />
              
              {/* Shine effect on tap */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-active:translate-x-[100%] transition-transform duration-500" />
              
              <span className="relative z-10">{link}</span>
            </button>
          ))}
        </div>
      </animated.div>

      {/* Add keyframe animation for navbar shine */}
      <style>{`
        @keyframes navShine {
          0%, 100% {
            transform: translateX(-100%);
          }
          50% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </>
  );
};

export default memo(Navbar);