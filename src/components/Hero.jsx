// src/components/Hero.jsx
import React, { useRef, useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaArrowRight } from 'react-icons/fa';
import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'framer-motion';


const Hero = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [isScrolled, setIsScrolled] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showExclamation, setShowExclamation] = useState(false);
  const fullText = "Hey, I'm Darshan Gowda";


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };


    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  // Typewriter effect
  useEffect(() => {
    if (isInView) {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= fullText.length) {
          setDisplayedText(fullText.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setShowExclamation(true);
        }
      }, 70); // Adjust speed 


      return () => clearInterval(typingInterval);
    }
  }, [isInView]);


  const titleAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(50px)',
    },
    to: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(50px)',
    },
    config: { tension: 280, friction: 20 },
  });


  const subtitleAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(30px)',
    },
    to: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(30px)',
    },
    config: { tension: 280, friction: 20 },
    delay: 200,
  });


  const buttonAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(20px)',
    },
    config: { tension: 280, friction: 20 },
    delay: 400,
  });


  const socialAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    to: {
      opacity: isInView ? 1 : 0,
      transform: isInView ? 'translateY(0)' : 'translateY(20px)',
    },
    config: { tension: 280, friction: 20 },
    delay: 600,
  });


  const scrollIndicatorAnimation = useSpring({
    from: {
      opacity: 0,
      transform: 'translateY(0)',
    },
    to: {
      opacity: isScrolled ? 1 : 0,
      transform: 'translateY(0)',
      display: isScrolled ? 'block' : 'none'
    },
    config: { tension: 280, friction: 20 },
  });


  // Split text into white and colored parts
  const renderTypedText = () => {
    const prefix = "Hey, I'm ";
    const name = "Darshan Gowda";
    
    if (displayedText.length <= prefix.length) {
      return <span>{displayedText}</span>;
    } else {
      const coloredPart = displayedText.slice(prefix.length);
      return (
        <>
          <span>{prefix}</span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-500 transition-all duration-500">
            {coloredPart}
          </span>
        </>
      );
    }
  };


  return (
    <div id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden" ref={ref}>
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <animated.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-purple-600 filter blur-3xl animate-blob mt-10"
          style={{
            transform: isInView ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 0.5s ease-out',
          }}
        />
        <animated.div
          className="absolute top-40 right-10 w-64 h-64 rounded-full bg-blue-600 filter blur-3xl animate-blob animation-delay-2000 mt-5"
          style={{
            transform: isInView ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 0.5s ease-out',
          }}
        />
        <animated.div
          className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-pink-600 filter blur-3xl animate-blob animation-delay-4000"
          style={{
            transform: isInView ? 'scale(1)' : 'scale(0.8)',
            transition: 'transform 0.5s ease-out',
          }}
        />
      </div>


      {/* Content */}
      <div className="z-10 max-w-3xl text-center px-2 sm:px-4 mt-10 hero-content">
        <animated.div style={titleAnimation} className="mb-4 mt-10">
          <span className="liquid-glass-badge inline-block bg-clip-text text-purple-200 bg-gradient-to-r from-purple-400 to-pink-400 font-medium px-4 py-1 rounded-full text-sm">
            Full-Stack Developer
          </span>
        </animated.div>


        <animated.h1 style={titleAnimation} className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 mt-8 text-white">
          {renderTypedText()}
          {showExclamation && (
            <span className="inline-block animate-blink-slow">!</span>
          )}
        </animated.h1>


        <animated.p style={subtitleAnimation} className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-2">
          <br/>
        I am a software developer and data analytics student with strong skills in the MERN stack, building full-stack web apps that solve real problems. My experience includes developing scalable systems and interactive platforms. I also have foundational knowledge in DevOps and cloud computing, helping deploy and manage applications efficiently. I enjoy working in teams and continuously learning to keep up with evolving technologies.
        </animated.p>


        <animated.div style={buttonAnimation} className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 mb-12 px-2">
          <a
            href="#projects"
            className="liquid-glass-primary group relative overflow-hidden px-8 py-3 rounded-full text-white font-medium transform transition-all duration-300 hover:scale-105 hover:-translate-y-1 flex items-center gap-2"
          >
            <span className="relative z-10">View My Work</span>
            <FaArrowRight className="relative z-10 transform group-hover:translate-x-1 transition-transform duration-300" size={16} />
          </a>
          <a
            href="#contact"
            className="liquid-glass-secondary px-8 py-3 rounded-full text-white font-medium transform transition-all duration-300 hover:scale-105 hover:-translate-y-1"
          >
            Contact Me
          </a>
        </animated.div>


        <animated.div style={socialAnimation} className="flex justify-center space-x-4 sm:space-x-6 mb-12 px-2">
          <a
            href="https://github.com/darshan-gowdaa"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-icon text-gray-300 hover:text-white transition-all p-3 rounded-full"
          >
            <FaGithub size={32} />
          </a>
          <a
            href="https://www.linkedin.com/in/Darshan-Gowda-G-S"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-icon text-gray-300 hover:text-white transition-all p-3 rounded-full"
          >
            <FaLinkedin size={32} />
          </a>
          <a
            href="mailto:darshangowdaa223@gmail.com"
            className="liquid-glass-icon text-gray-300 hover:text-white transition-all p-3 rounded-full"
          >
            <FaEnvelope size={32} />
          </a>
        </animated.div>


        <animated.div
          style={scrollIndicatorAnimation}
          className="liquid-glass-scroll fixed bottom-8 right-8 z-50 p-3 rounded-full transition-all duration-300 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <FaArrowUp size={24} className="text-gray-300 hover:text-white transition-colors" />
        </animated.div>
      </div>


    </div>
  );
};


export default Hero;
