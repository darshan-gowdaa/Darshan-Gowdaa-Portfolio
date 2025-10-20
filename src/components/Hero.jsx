// src/components/Hero.jsx
import React, { memo, useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaArrowRight } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';



const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showExclamation, setShowExclamation] = useState(false);
  
  const fullText = useMemo(() => "Hey, I'm Darshan Gowda", []);



  // Handle scroll button visibility
  useEffect(() => {
    const handleScroll = () => setShowScrollButton(window.scrollY > 300);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Typewriter effect
  useEffect(() => {
    if (!isInView) return;
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setShowExclamation(true);
      }
    }, 70);
    return () => clearInterval(typingInterval);
  }, [isInView, fullText]);



  // Consolidated spring animations with GPU acceleration
  const createAnimation = useCallback((delay = 0, translateY = 30) => ({
    from: { opacity: 0, transform: `translate3d(0,${translateY}px,0)` },
    to: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translate3d(0,0,0)' : `translate3d(0,${translateY}px,0)`,
    },
    config: { tension: 280, friction: 22 },
    delay,
  }), [isInView]);



  const titleAnimation = useSpring(createAnimation(0, 50));
  const subtitleAnimation = useSpring(createAnimation(150, 30));
  const buttonAnimation = useSpring(createAnimation(300, 20));
  const socialAnimation = useSpring(createAnimation(450, 20));



  // Memoized blob data
  const blobs = useMemo(() => [
    { top: '10%', left: '5%', bg: 'bg-purple-600', delay: 0, size: 'w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64' },
    { top: '15%', right: '5%', bg: 'bg-blue-600', delay: 2000, size: 'w-40 h-40 sm:w-56 sm:h-56 md:w-64 md:h-64' },
    { bottom: '10%', left: '10%', bg: 'bg-pink-600', delay: 4000, size: 'w-36 h-36 sm:w-52 sm:h-52 md:w-64 md:h-64' }
  ], []);



  // Memoized social links
  const socialLinks = useMemo(() => [
    { href: "https://github.com/darshan-gowdaa", Icon: FaGithub, external: true },
    { href: "https://www.linkedin.com/in/Darshan-Gowda-G-S", Icon: FaLinkedin, external: true },
    { href: "mailto:darshangowdaa223@gmail.com", Icon: FaEnvelope, external: false }
  ], []);



  // Split text with animated gradient - faster animation
  const renderTypedText = useCallback(() => {
    const prefix = "Hey, I'm ";
    
    if (displayedText.length <= prefix.length) {
      return <span>{displayedText}</span>;
    }
    
    const coloredPart = displayedText.slice(prefix.length);
    return (
      <>
        <span>{prefix}</span>
        <span 
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400"
          style={{ 
            backgroundSize: '200% auto',
            animation: 'gradient 2s linear infinite'
          }}
        >
          {coloredPart}
        </span>
      </>
    );
  }, [displayedText]);



  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);



  return (
    <>
      {/* Scroll to Top Button - Outside Hero component for proper fixed positioning */}
      {showScrollButton && (
        <button
          onClick={scrollToTop}
          className="liquid-glass-icon !fixed !bottom-10 sm:!bottom-12 !right-6 sm:!right-8 !z-[9999] text-gray-300 hover:text-white transition-all p-3 sm:p-3.5 md:p-4 rounded-full transform hover:scale-110 duration-300 flex items-center justify-center group touch-manipulation select-none animate-fadeIn"
          style={{ position: 'fixed', bottom: '2.5rem', right: '1.5rem' }}
          aria-label="Scroll to top"
        >
          <FaArrowUp className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-y-[-2px] transition-transform" />
        </button>
      )}


      <div 
        id="home" 
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 md:pb-20" 
        ref={ref}
      >
        {/* Animated Background Blobs - Responsive */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {blobs.map((blob, i) => (
            <animated.div
              key={i}
              className={`absolute rounded-full ${blob.bg} ${blob.size} filter blur-2xl sm:blur-3xl animate-blob opacity-70`}
              style={{
                top: blob.top,
                left: blob.left,
                right: blob.right,
                bottom: blob.bottom,
                animationDelay: `${blob.delay}ms`,
                transform: isInView ? 'scale(1)' : 'scale(0.8)',
                transition: 'transform 0.5s ease-out',
              }}
            />
          ))}
        </div>



        {/* Content */}
        <div className="z-10 w-full max-w-xs sm:max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl text-center px-4 sm:px-6 md:px-8">
          <animated.div style={titleAnimation} className="mb-3 sm:mb-4">
            <span className="liquid-glass-badge inline-block bg-clip-text text-purple-200 bg-gradient-to-r from-purple-400 to-pink-400 font-medium px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-xs sm:text-sm">
              Full-Stack Developer
            </span>
          </animated.div>



          <animated.h1 
            style={titleAnimation} 
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 mt-4 sm:mt-6 md:mt-8 text-white leading-tight px-2"
          >
            {renderTypedText()}
            {showExclamation && (
              <span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400"
                style={{ 
                  backgroundSize: '200% auto',
                  animation: 'gradient 2s linear infinite'
                }}
              >!</span>
            )}
          </animated.h1>



          <animated.p 
            style={subtitleAnimation} 
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-6 sm:mb-8 md:mb-10 max-w-full sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-4 leading-relaxed"
          >
            I am a software developer and data analytics student with strong skills in the MERN stack, building full-stack web apps that solve real problems. My experience includes developing scalable systems and interactive platforms. I also have foundational knowledge in DevOps and cloud computing, helping deploy and manage applications efficiently. I enjoy working in teams and continuously learning to keep up with evolving technologies.
          </animated.p>



          <animated.div 
            style={buttonAnimation} 
            className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4"
          >
            <a
              href="#projects"
              className="liquid-glass-primary group relative overflow-hidden px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 rounded-full text-white text-sm sm:text-base font-medium transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-2 justify-center w-full sm:w-auto select-none"
            >
              <span className="relative z-10">View My Work</span>
              <FaArrowRight className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" size={14} />
            </a>
            <a
              href="#contact"
              className="liquid-glass-secondary px-6 py-2.5 sm:px-8 sm:py-3 md:px-10 md:py-3.5 rounded-full text-white text-sm sm:text-base font-medium transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 w-full sm:w-auto select-none"
            >
              Contact Me
            </a>
          </animated.div>



          <animated.div 
            style={socialAnimation} 
            className="flex justify-center items-center space-x-3 sm:space-x-4 md:space-x-6 mb-8 sm:mb-10 md:mb-12 px-2"
          >
            {socialLinks.map(({ href, Icon, external }, i) => (
              <a
                key={i}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="liquid-glass-icon text-gray-300 hover:text-white transition-all p-2 sm:p-2.5 md:p-3 rounded-full transform hover:scale-110 duration-300 select-none"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8" />
              </a>
            ))}
          </animated.div>
        </div>
      </div>
    </>
  );
};



export default memo(Hero);
