// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navAnimation = useSpring({
    to: {
      background: isScrolled ? 'rgba(17, 24, 39, 0.95)' : 'rgba(17, 24, 39, 0)',
      boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : 'none',
      height: isScrolled ? '70px' : '90px',
    },
    config: { tension: 220, friction: 30 },
  });

  const links = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Certifications', 'Contact'];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId.toLowerCase());
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  const menuAnimation = useSpring({
    transform: mobileMenuOpen ? 'translateX(0%)' : 'translateX(100%)',
    opacity: mobileMenuOpen ? 1 : 0,
    config: { tension: 300, friction: 20 },
  });

  return (
    <animated.nav
      style={navAnimation}
      className="fixed top-0 left-0 w-full z-50 transition-all px-6"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center h-full">
        <animated.div
          className="text-xl font-bold cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          <span className="text-purple-400">Darshan</span>
          <span className="text-white"> Gowda</span>
        </animated.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="text-gray-300 hover:text-purple-400 transition-colors relative group text-sm uppercase tracking-wider"
            >
              {link}
              <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-purple-400 transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 hover:text-purple-400 transition-colors"
          >
            {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <animated.div
        style={menuAnimation}
        className="md:hidden fixed top-0 right-0 h-screen w-64 bg-gray-900 pt-20 px-6 shadow-lg"
      >
        <div className="flex flex-col space-y-6">
          {links.map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link)}
              className="text-gray-300 hover:text-purple-400 transition-colors text-lg py-2 border-b border-gray-800 uppercase tracking-wider"
            >
              {link}
            </button>
          ))}
        </div>
      </animated.div>
    </animated.nav>
  );
};

export default Navbar;
